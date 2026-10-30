/* LIVERQUEST — one full-screen game. Loaded AFTER site.js. */
(() => {
'use strict';
const page=location.pathname.split('/').pop()||'index.html';
const targets=['index.html','cells.html','invasion.html'];
if(!targets.includes(page))return;
// Keep Mission Control and Cell City content intact; simplify all top-navigation copies.
function simplifyLinks(root=document){
  root.querySelectorAll('.topbar nav').forEach(nav=>{
    nav.querySelectorAll('a').forEach(a=>{
      const dest=a.getAttribute('href')||'';
      if(['microscope.html','lab.html','finale.html'].includes(dest))a.remove();
      if(dest==='invasion.html'){a.textContent='🎮 Play Game';}
    });
  });
  if(page==='index.html')root.querySelectorAll('.mission-grid a').forEach(a=>{
    const dest=a.getAttribute('href')||'';
    if(['microscope.html','lab.html','finale.html'].includes(dest))a.remove();
    if(dest==='invasion.html'){
      const h=a.querySelector('h3'); if(h)h.textContent='THE HBV ESCAPE GAME';
      const p=a.querySelector('p');if(p)p.textContent='Play the full four-stage interactive adventure.';
    }
  });
}
simplifyLinks();
// Redirect any older mission buttons to the consolidated game, even if old markup remains.
document.addEventListener('click', e => {
  const anchor=e.target.closest('a[href]');
  if (!anchor) return;
  const href=(anchor.getAttribute('href')||'').split('?')[0];
  if(['microscope.html','lab.html','finale.html'].includes(href)){
    e.preventDefault(); location.href='invasion.html';
  }
},true);
if(page!=='invasion.html')return;
document.title='LiverQuest — The HBV Escape';
document.body.classList.add('lq-fullscreen');
const site=document.querySelector('#app');if(!site)return;
site.innerHTML=`<div class="lqg" id="lqg"><header class="lqg-header"><a href="index.html" class="lqg-logo">LIVER<span>QUEST</span></a><span id="lqg-stage-label">EPISODE 1 / 4</span><div class="lqg-header-right"><a href="cells.html">Cell City</a><button id="lqg-guide">Science Files</button></div></header><main class="lqg-layout"><div class="lqg-viewport" id="lqg-viewport"><canvas id="lqg-canvas" width="1200" height="660"></canvas><div class="lqg-layer" id="lqg-layer"></div><div class="lqg-indicator" id="lqg-indicator"></div></div><div class="lqg-bottom"><div id="lqg-hud">Choose your explorer to begin</div><div class="lqg-controls"><button data-key="ArrowLeft">◀</button><button data-key="ArrowUp">▲</button><button data-key="ArrowDown">▼</button><button data-key="ArrowRight">▶</button><button data-key="Shift">SPRINT</button></div></div></main></div>`;
const g=document.querySelector('#lqg'),$=s=>g.querySelector(s),canvas=$('#lqg-canvas'),c=canvas.getContext('2d');
const W=1200,H=660;
let phase='select',hero=0,keys={},px=135,py=480,vx=-90,vy=340,lives=3,sprint=100,timer=0,anim=0,last=0,paused=false,completed=new Set(),scanner=new Set();
const heroes=[['THE SCIENTIST','#65e3d8','A curious researcher with a protective helmet'],['THE EXPLORER','#ffcd76','An adventurous traveler with a yellow backpack'],['THE MICRO-CREATURE','#bd94ff','A friendly imaginary microscopic creature']];
const facts={
 intro:'Hepatitis B is a viral infection that targets the liver. HBV travels through infected blood and attaches to a special protein on the surface of liver cells. It does not spread through hugging, sharing meals, or ordinary friendship.',
 membrane:'The cell membrane protects the liver cell and controls what enters and leaves. Hepatitis B attaches to a special protein on the cell surface before it can enter.',
 nucleus:'The nucleus stores DNA instructions that help a cell work. Hepatitis B sends its genetic material toward the nucleus, where a viral DNA template can form.',
 cytoplasm:'Cytoplasm is the jelly-like substance surrounding the cell structures. HBV uses the living cell’s machinery to make viral proteins and genetic material.',
 energy:'Mitochondria help provide usable energy. Liver cells use energy to process nutrients, store energy, and help remove harmful substances from the blood.',
 reproduce:'New virus particles can be assembled and leave the cell to infect other liver cells. Much of the injury during hepatitis B happens when immune defenders respond to infected liver cells.',
 tissue:'Groups of similar cells form tissues. Different tissues form organs, including the liver. The liver supports digestion and other important body functions.',
 healthy:'In our simplified tissue model, pink shapes represent liver cells and purple dots represent nuclei. Healthy-looking cells work together. Real microscope pictures are more complex.',
 affected:'In our simplified model, orange cells marked X represent cell injury; blue circles represent immune defenders. The immune response can cause inflammation and damage liver tissue.',
 scars:'Ongoing liver injury can cause scar tissue called fibrosis. Extensive scarring is called cirrhosis and can affect liver function. Not everyone with hepatitis B develops serious injury or scarring.',
 transmission:'HBV can spread through infected blood entering an open wound, sharing used needles, and from an infected parent to a baby during birth. Hugging, casual contact, and sharing food do not transmit HBV.',
 vaccine:'Vaccination helps the immune system protect against hepatitis B. A vaccine prevents infection; it does not cure an existing infection.',
 testing:'A person can have hepatitis B without symptoms. Blood tests can detect infection even if the person feels healthy.',
 care:'Some hepatitis B infections clear, but others last a long time. Long-term infections may require check-ups, monitoring, and sometimes medicine to reduce the risk of liver injury.'
};
const missions=[
 {title:'VIRUS INVASION',tag:'1 / 4 · THE CHASE'},
 {title:'TISSUE DETECTIVE',tag:'2 / 4 · SCANNER INVESTIGATION'},
 {title:'RESCUE LAB',tag:'3 / 4 · SAFETY SYSTEMS'},
 {title:'FINAL SHOWDOWN',tag:'4 / 4 · THE CONTROL ROOM'}
];
const obstacles=[[310,420,45],[485,275,48],[650,490,48],[810,245,45],[935,460,42]];
function layer(html){paused=true;$('#lqg-layer').innerHTML=`<div class="lqg-dialog">${html}</div>`;$('#lqg-layer').classList.add('on');}
function clear(){paused=false;$('#lqg-layer').classList.remove('on');$('#lqg-layer').innerHTML='';}
function title(t){$('#lqg-stage-label').textContent=t;}
function button(txt,id='lqg-next'){return `<button class="lqg-primary" id="${id}">${txt}</button>`;}
function explain(heading,body,nextLabel,go){layer(`<div class="lqg-kicker">DISCOVERY UNLOCKED</div><h2>${heading}</h2><p>${body}</p>${button(nextLabel)}`);$('#lqg-next').onclick=()=>{clear();go();};}
function scienceLibrary(){const html=Object.entries(facts).map(([id,s])=>`<details><summary>${id.toUpperCase().replace(/_/g,' ')}</summary><p>${s}</p></details>`).join('');layer(`<div class="lqg-kicker">COMPLETE SCIENCE LIBRARY</div><h2>Your original science, in one place</h2><div class="lqg-library">${html}</div>${button('RETURN TO GAME')}`);$('#lqg-next').onclick=clear;}
$('#lqg-guide').onclick=scienceLibrary;
function renderChoose(){phase='select';title('CHOOSE YOUR CHARACTER');layer(`<div class="lqg-kicker">WELCOME TO LIVERQUEST</div><h2>WHO ARE YOU TAKING INSIDE THE CELL?</h2><p>Pick a character. Your group can decide together. All three have the same abilities.</p><div class="lqg-heroes">${heroes.map((h,i)=>`<button class="lqg-hero" data-hero="${i}"><span class="lqg-avatar" style="--hero:${h[1]}">${i===2?'✦':'●'}</span><b>${h[0]}</b><small>${h[2]}</small></button>`).join('')}</div><p id="lqg-selected">Choose one of the explorers above.</p>${button('BEGIN THE STORY','lqg-start')}`);g.querySelectorAll('[data-hero]').forEach(b=>b.onclick=()=>{hero=+b.dataset.hero;g.querySelectorAll('[data-hero]').forEach(x=>x.classList.toggle('selected',x===b));$('#lqg-selected').textContent=heroes[hero][0]+' selected!';});$('#lqg-start').onclick=()=>{clear();startCutscene();};}
function startCutscene(){phase='cutscene';timer=0;title('1 / 4 · THE VIRUS APPROACHES');$('#lqg-hud').textContent='WATCH: HBV approaches, attaches to the cell membrane, and enters.';}
function startChase(){phase='chase';px=135;py=475;vx=150;vy=310;lives=3;sprint=100;timer=0;title('1 / 4 · REACH THE NUCLEUS');$('#lqg-hud').textContent='♥ ♥ ♥ · RUN TO THE GLOWING NUCLEUS · SHIFT TO SPRINT';}
function fail(){phase='failed';layer(`<div class="lqg-kicker">TRY AGAIN</div><h2>THE VIRUS CAUGHT UP</h2><p>Take another route around the cell structures. Use Shift to sprint and reach the nucleus gate!</p>${button('RETRY THE CHASE')}`);$('#lqg-next').onclick=()=>{clear();startChase();};}
function nucleusQuiz(){phase='nucleus';const question='Which cell part stores DNA instructions?';quiz('NUCLEUS SECURITY GATE',facts.nucleus,question,['Cell membrane','Nucleus','Mitochondria'],1,()=>ordering());}
function quiz(heading,info,q,choices,correct,next){layer(`<div class="lqg-kicker">SCIENCE CHECKPOINT</div><h2>${heading}</h2><p class="lqg-info">${info}</p><h3>${q}</h3><div class="lqg-choices">${choices.map((x,i)=>`<button data-answer="${i}">${x}</button>`).join('')}</div><p id="lqg-feedback" aria-live="polite"></p>`);g.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(+b.dataset.answer===correct){$('#lqg-feedback').textContent='✓ Correct! Gate unlocked.';g.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);$('#lqg-feedback').insertAdjacentHTML('afterend',button('CONTINUE'));$('#lqg-next').onclick=()=>{clear();next();};}else{$('#lqg-feedback').textContent='Not quite. Use the explanation above and try again.';b.classList.add('wrong');}});}
function ordering(){phase='sequence';const steps=[['HBV attaches to the cell membrane',facts.membrane],['HBV enters the liver cell',facts.intro],['Viral genetic material reaches the nucleus',facts.nucleus],['Cell machinery helps produce viral materials',facts.cytoplasm],['New virus particles are assembled',facts.reproduce],['Immune defenders respond to infected cells',facts.affected]];let pos=0;const draw=()=>{if(pos===steps.length){explain('ESCAPE COMPLETE',facts.reproduce+' '+facts.energy,'INVESTIGATE THE LIVER TISSUE',tissueStart);return;}const choices=[pos,(pos+2)%steps.length,(pos+4)%steps.length].sort((a,b)=>((a*7+pos*3)%11)-((b*7+pos*3)%11));layer(`<div class="lqg-kicker">INFECTION SEQUENCE · ${pos+1}/${steps.length}</div><h2>WHAT HAPPENS NEXT?</h2><p class="lqg-info">${steps[pos][1]}</p><div class="lqg-choices">${choices.map(i=>`<button data-seq="${i}">${steps[i][0]}</button>`).join('')}</div><p id="lqg-feedback"></p>`);g.querySelectorAll('[data-seq]').forEach(b=>b.onclick=()=>{if(+b.dataset.seq===pos){pos++;draw();}else{$('#lqg-feedback').textContent='Check the information above and try again.';b.classList.add('wrong');}});};draw();}
// Stage two: spot and scan actual changes in tissue illustrations, not another chase.
function tissueStart(){phase='tissue';scanner=new Set();title('2 / 4 · TISSUE DETECTIVE');drawTissueUI();}
function drawTissueUI(){const cards=[['healthy','HEALTHY-LOOKING TISSUE',facts.healthy],['injured','AFFECTED LIVER TISSUE',facts.affected],['scar','POSSIBLE SCARRING',facts.scars],['cells','CELLS → TISSUES → ORGANS',facts.tissue]];layer(`<div class="lqg-kicker">MISSION 2 · TISSUE DETECTIVE</div><h2>SCAN THE EVIDENCE</h2><p>Choose all four specimens. Compare the samples and collect evidence about immune defenders, injury, and scarring.</p><div class="lqg-specimens">${cards.map(([id,name])=>`<button data-scan="${id}" class="${scanner.has(id)?'done':''}"><span class="lqg-spec ${id}"></span>${name}${scanner.has(id)?' ✓':''}</button>`).join('')}</div><p>${scanner.size}/4 pieces of evidence collected</p>${scanner.size===4?button('SOLVE THE TISSUE MYSTERY','lqg-solve'):''}`);g.querySelectorAll('[data-scan]').forEach(b=>b.onclick=()=>{const id=b.dataset.scan,card=cards.find(x=>x[0]===id);scanner.add(id);explain(card[1],card[2],'BACK TO THE SCANNER',drawTissueUI);});const solve=$('#lqg-solve');if(solve)solve.onclick=()=>{clear();quiz('DETECTIVE REPORT',facts.affected,'Which model shows injury and immune defenders?',['Healthy-looking tissue with orderly cells','Affected tissue with injured cells and blue defenders','A microscope slide with no tissue'],1,labStart);};}
// Stage three: an interactive tissue time machine and five different transmission decisions.
let damage=0,mythIndex=0;
const stages=[['HEALTHY-LOOKING', 'Many liver cells are working normally.'],['INFLAMMATION','Immune cells respond to infected liver cells. Some cells may be injured.'],['REPEATED INJURY','Ongoing injury may cause scar tissue called fibrosis.'],['SEVERE SCARRING','Extensive scar tissue, called cirrhosis, can affect liver function.']];
const myths=[['Sharing a hug',false,'Hugging and casual contact do not spread hepatitis B.'],['Infected blood entering an open wound',true,'Exposure to infected blood can transmit hepatitis B.'],['Sharing food at lunch',false,'Sharing food does not spread hepatitis B.'],['Sharing a used needle',true,'Used needles can carry infected blood.'],['From an infected parent to a baby during birth',true,'Hepatitis B can be transmitted during birth.']];
function labStart(){phase='lab';title('3 / 4 · THE RESCUE LAB');damage=0;timeMachine();}
function timeMachine(){phase='machine';const cur=stages[damage];layer(`<div class="lqg-kicker">MISSION 3 · TISSUE TIME MACHINE</div><h2>OBSERVE REPEATED CELL INJURY</h2><p>This teaching model shows possible changes, not a prediction. Not everyone with hepatitis B develops significant damage.</p><div class="lqg-machine" id="lqg-machine">${Array.from({length:24},(_,i)=>`<span class="${i<damage*6?'hurt':''}">${i<damage*6?'×':'•'}</span>`).join('')}</div><label for="lqg-slider">INJURY STAGE: <b>${cur[0]}</b></label><input type="range" min="0" max="3" value="${damage}" id="lqg-slider"><p class="lqg-info">${cur[1]}</p>${button('RUN TRANSMISSION MYTHBUSTERS','lqg-run')}`);$('#lqg-slider').oninput=e=>{damage=+e.target.value;timeMachine();};$('#lqg-run').onclick=()=>{clear();mythIndex=0;mythRound();};}
function mythRound(){phase='myths';if(mythIndex>=myths.length){quiz('POWER UP THE PROTECTION SYSTEM',facts.vaccine+' '+facts.testing+' '+facts.care,'Which choice can help PREVENT hepatitis B?',['Avoid hugging friends','Wait for symptoms','Get the hepatitis B vaccine'],2,finalStart);return;}const item=myths[mythIndex];layer(`<div class="lqg-kicker">TRANSMISSION MYTHBUSTERS ${mythIndex+1} / 5</div><h2>CAN HBV SPREAD THIS WAY?</h2><div class="lqg-info"><h3>${item[0]}</h3></div><div class="lqg-choices"><button data-myth="yes">CAN SPREAD</button><button data-myth="no">CANNOT SPREAD</button></div><p id="lqg-feedback"></p>`);g.querySelectorAll('[data-myth]').forEach(b=>b.onclick=()=>{const val=b.dataset.myth==='yes';if(val===item[1]){g.querySelectorAll('[data-myth]').forEach(x=>x.disabled=true);$('#lqg-feedback').textContent='✓ '+item[2];$('#lqg-feedback').insertAdjacentHTML('afterend',button('NEXT CASE'));$('#lqg-next').onclick=()=>{mythIndex++;mythRound();};}else{$('#lqg-feedback').textContent='Try again. Think about whether infected blood or certain body fluids are involved.';b.classList.add('wrong');}});}
// Stage four: final choices apply knowledge across cell → tissue → organ → health.
const finalQuestions=[['What is the order from smallest to largest?',['Organ → tissue → cell','Cell → tissue → organ','Tissue → organ → cell'],1,facts.tissue],['Why can hepatitis B cause inflammation?',['Immune defenders respond to infected cells','The cell membrane becomes a cell wall','Mitochondria turn into viruses'],0,facts.affected],['Which statement about long-term HBV is accurate?',['It always causes cirrhosis','It always causes visible symptoms','Medical monitoring may be necessary'],2,facts.care],['Which statement is true?',['Vaccination can help prevent HBV','Sharing lunch transmits HBV','HBV infections can only last one day'],0,facts.vaccine]];
let finalIndex=0;
function finalStart(){phase='final';title('4 / 4 · FINAL SHOWDOWN');finalIndex=0;finalRound();}
function finalRound(){if(finalIndex>=finalQuestions.length){phase='victory';try{const state=JSON.parse(localStorage.getItem('liverquest')||'{}');state.invasion=true;state.microscope=true;state.lab=true;state.finale=true;localStorage.setItem('liverquest',JSON.stringify(state));}catch(e){}layer(`<div class="lqg-kicker">LIVERQUEST · MISSION COMPLETE</div><h2>YOU ESCAPED THE CELL AND SOLVED THE HBV MYSTERY!</h2><p>You've learned how HBV attaches to liver cells, uses cells to reproduce, and can trigger immune inflammation and tissue injury. You also investigated possible scarring, transmission, vaccination, testing, and medical care.</p><p>People living with hepatitis B deserve kindness and appropriate care.</p>${button('PLAY AGAIN','lqg-replay')}<a class="lqg-secondary" href="index.html">RETURN TO MISSION CONTROL</a>`);$('#lqg-replay').onclick=()=>{clear();renderChoose();};return;}const [q,opts,answer,fact]=finalQuestions[finalIndex];quiz(`FINAL CONTROL PANEL ${finalIndex+1}/4`,fact,q,opts,answer,()=>{finalIndex++;finalRound();});}
// Canvas game: draw graphics every frame, run chase only during chase.
function dot(x,y,r,color){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill();}
function oval(x,y,rx,ry,fill,stroke,lw=3){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
function txt(t,x,y,size=16,color='#fff'){c.font=`800 ${size}px system-ui`;c.textAlign='center';c.fillStyle=color;c.fillText(t,x,y);}
function background(){const grad=c.createLinearGradient(0,0,W,H);grad.addColorStop(0,'#251344');grad.addColorStop(1,'#12142c');c.fillStyle=grad;c.fillRect(0,0,W,H);oval(600,330,570,298,'#e7a2c8','#ffe2ef',16);oval(600,330,550,278,'#efaed0','#d77fac',5);for(let i=0;i<44;i++){const x=130+(i*173)%970,y=80+(i*119)%495;dot(x,y,2+(i%4),'#fff2f78a');}[[275,205],[470,525],[745,170]].forEach(([x,y])=>{oval(x,y,60,28,'#eea668','#cb7748',5);c.strokeStyle='#bf734b';c.lineWidth=4;c.beginPath();c.moveTo(x-32,y);c.lineTo(x-15,y-10);c.lineTo(x,y+9);c.lineTo(x+18,y-8);c.lineTo(x+34,y+7);c.stroke();});oval(1010,325,139,123,'#9562c7','#eed4ff',10);oval(1010,325,106,91,'#b181db','#7042ad',5);dot(1010,325,30,'#7046ae');txt('NUCLEUS',1010,183,21,'#4e3268');}
function drawVirus(x,y){for(let i=0;i<10;i++){const a=i*Math.PI/5;dot(x+Math.cos(a)*40,y+Math.sin(a)*40,8,'#fa9ed7');}dot(x,y,33,'#713cad');dot(x-11,y-6,6,'white');dot(x+11,y-6,6,'white');dot(x-10,y-5,3,'#231334');dot(x+12,y-5,3,'#231334');txt('HBV',x,y-54,15,'#562a82');}
function drawHero(){const color=heroes[hero][1];oval(px,py+30,27,8,'#49285477');if(hero===2){oval(px,py,27,30,color,'#64429f',5);oval(px-18,py-27,9,13,color);oval(px+18,py-27,9,13,color);}else{oval(px,py+14,21,25,color,'#fff',4);dot(px,py-15,27,'#c9f3ff');dot(px,py-15,21,'#ffdcba');if(hero===1){oval(px,py-34,28,8,'#ffc45b');}}dot(px-8,py-18,3,'#352344');dot(px+8,py-18,3,'#352344');txt('YOU',px,py-52,15,'#4d2e6b');}
function update(dt){let dx=(keys.ArrowRight||keys.d?1:0)-(keys.ArrowLeft||keys.a?1:0),dy=(keys.ArrowDown||keys.s?1:0)-(keys.ArrowUp||keys.w?1:0),len=Math.hypot(dx,dy)||1,speed=0.27;if(keys.Shift&&sprint>0){speed=.46;sprint=Math.max(0,sprint-dt*.05);}else sprint=Math.min(100,sprint+dt*.022);const proposedX=Math.min(1060,Math.max(90,px+dx/len*dt*speed)),proposedY=Math.min(568,Math.max(88,py+dy/len*dt*speed));function collides(x,y){return obstacles.some(([ox,oy,r])=>Math.hypot(x-ox,y-oy)<r+24);}if(!collides(proposedX,py))px=proposedX;if(!collides(px,proposedY))py=proposedY;let vx0=px-vx,vy0=py-vy,d=Math.hypot(vx0,vy0)||1;vx+=vx0/d*.145*dt;vy+=vy0/d*.145*dt;if(d<55){lives--;vx=150;vy=310;if(lives<=0){fail();return;}}if(Math.hypot(px-1010,py-325)<116){nucleusQuiz();return;}$('#lqg-hud').textContent=`${'♥ '.repeat(lives)} · BOOST ${Math.round(sprint)}% · REACH THE NUCLEUS FIRST`;}
function frame(t){let dt=Math.min(35,t-(last||t));last=t;anim+=dt;background();if(phase==='cutscene'&&!paused){timer+=dt;vx= -100+Math.min(timer/5500,1)*390;vy=330;if(timer>5700){phase='pre-chase';explain('THE VIRUS HAS ENTERED!',facts.intro+' It is moving toward the nucleus. You must race there first!','START THE CHASE',startChase);}}if(phase==='cutscene'){px=250;py=445;drawVirus(vx,vy);}else if(['chase','failed','nucleus','sequence'].includes(phase)){if(phase==='chase'&&!paused)update(dt);obstacles.forEach(([x,y,r])=>{oval(x,y,r,r*.72,'#c277a3','#ffe4ef',5);});drawVirus(vx,vy);}else{px=250;py=445;}drawHero();requestAnimationFrame(frame);}
function normalize(k){return k.length===1?k.toLowerCase():k;}
window.addEventListener('keydown',e=>{const k=normalize(e.key);if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Shift',' '].includes(k)&&phase==='chase')e.preventDefault();keys[k]=true;});window.addEventListener('keyup',e=>{keys[normalize(e.key)]=false;});window.addEventListener('blur',()=>keys={});g.querySelectorAll('[data-key]').forEach(b=>{const k=b.dataset.key;b.onpointerdown=e=>{e.preventDefault();keys[k]=true;b.setPointerCapture(e.pointerId);};['pointerup','pointercancel','lostpointercapture'].forEach(ev=>b.addEventListener(ev,()=>keys[k]=false));});
renderChoose();requestAnimationFrame(frame);
})();
