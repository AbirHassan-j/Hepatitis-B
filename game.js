(()=>{'use strict';
const root=document.querySelector('#app')||document.body;
const chapters=[
 {title:'ESCAPE THE CELL',sub:'HBV has entered Cell City. Reach all four cell parts before it catches you!',goal:'Explore four cell parts while avoiding HBV'},
 {title:'THE INVASION',sub:'Follow the clues to learn what the invading virus does.',goal:'Investigate the five stages of infection'},
 {title:'TISSUE DETECTIVE',sub:'Investigate what infection can mean for cells, tissues and organs.',goal:'Collect four tissue reports'},
 {title:'RESCUE LAB',sub:'Find the evidence. Restore the ways people can protect their health.',goal:'Unlock prevention, transmission and care files'},
 {title:'FINAL RESCUE',sub:'Bring everything you learned together to restore Liver City.',goal:'Recover the five science records'}
];
// These explanations preserve the user's original science material in accessible language.
const data=[
 [
 {name:'CELL MEMBRANE',x:3,y:3,kind:'gate',action:'Inspect the cell membrane',fact:'The cell membrane protects the cell and controls what enters and leaves.',more:'Hepatitis B attaches to a special protein on the liver cell’s surface before entering. Think of the membrane as the cell’s security boundary: it controls traffic, but a virus can sometimes find a way inside.',mission:'Locate the outside boundary of the cell. You just discovered why the membrane matters.'},
 {name:'NUCLEUS',x:9,y:3,kind:'core',action:'Enter the instruction archive',fact:'The nucleus stores DNA, the instructions that help a cell work.',more:'Hepatitis B carries genetic instructions. During infection, viral DNA reaches the nucleus and forms a template used in making more viruses. The cell’s own instructions are still important for normal liver work.',mission:'You found the instruction centre! The nucleus is not the same thing as the whole cell.'},
 {name:'CYTOPLASM',x:4,y:8,kind:'pool',action:'Explore the cytoplasm',fact:'Cytoplasm is the jelly-like substance surrounding the structures inside a cell.',more:'Many important cell activities happen in this interior space. Hepatitis B uses the infected cell’s machinery to help make viral material. A virus needs living cells to make copies of itself.',mission:'You explored the interior of the cell, not a separate organ.'},
 {name:'MITOCHONDRIA',x:15,y:8,kind:'power',action:'Restore the energy station',fact:'Mitochondria help provide usable energy for a liver cell.',more:'Liver cells need energy to perform their important jobs. Your liver processes nutrients, stores energy, and helps remove harmful substances from your blood.',mission:'You found the cell’s energy helpers. Mitochondria do not fight the virus directly.'}
 ],
 [
 {name:'FIND THE DOORWAY',x:3,y:3,kind:'virus',action:'Investigate how HBV arrives',fact:'Hepatitis B is a viral infection that targets the liver. It can cause inflammation and sometimes damage liver tissue.',more:'HBV can travel through infected blood or certain other body fluids. It attaches to a special protein on the surface of a liver cell. It does not spread through hugging, sharing meals, or ordinary friendship.'},
 {name:'ENTER THE CELL',x:9,y:3,kind:'gate',action:'Investigate the entry point',fact:'The virus enters the liver cell and sends its genetic material toward the nucleus.',more:'A liver cell has a membrane, cytoplasm and nucleus. Following the virus through these structures helps explain how an infection begins.'},
 {name:'USE THE MACHINERY',x:15,y:3,kind:'core',action:'Trace viral instructions',fact:'Viral DNA forms a template. The liver cell’s machinery helps make viral proteins and genetic material.',more:'Viruses cannot make new copies entirely on their own. Hepatitis B depends on living liver cells to help produce new virus parts.'},
 {name:'MAKE MORE VIRUSES',x:4,y:8,kind:'virus',action:'Track new virus particles',fact:'New virus particles are assembled and can leave the cell to infect other liver cells.',more:'The virus reproducing inside cells can lead to an ongoing infection. The impact on the liver can differ from one person to another.'},
 {name:'IMMUNE DEFENDERS ARRIVE',x:15,y:8,kind:'shield',action:'Observe the immune response',fact:'Much of the liver-cell injury happens when immune defenders respond to infected cells.',more:'The immune system helps protect us, but the response can also damage infected liver cells and cause inflammation. An infected cell does not necessarily stop working immediately.'}
 ],
 [
 {name:'HEALTHY-LOOKING TISSUE',x:3,y:3,kind:'sample',action:'Inspect healthy tissue',fact:'Groups of cells form tissues. Different tissues build organs, including the liver.',more:'In the original tissue model, pink shapes represent liver cells and purple dots represent nuclei. Many healthy-looking liver cells are working together. The liver supports digestion and other body functions.'},
 {name:'CELL INJURY',x:9,y:3,kind:'sample',action:'Find injured cells',fact:'The orange shapes in our teaching model represent injured liver cells.',more:'Blue circles represent immune defenders responding to infection. An immune response can injure infected liver cells, which may affect how the tissue functions.'},
 {name:'INFLAMMATION',x:15,y:8,kind:'sample',action:'Analyze inflammation',fact:'Inflammation can happen when immune defenders respond to infected liver cells.',more:'A tissue is a group of cells working together. Changes to many cells can affect how tissue works, and changes to tissues can affect an organ such as the liver.'},
 {name:'POSSIBLE SCAR TISSUE',x:4,y:8,kind:'sample',action:'Inspect possible scarring',fact:'Ongoing liver injury may cause scar tissue, called fibrosis.',more:'Severe scarring is called cirrhosis and can affect liver function. Not everyone with hepatitis B develops significant scarring. Our game shows a possible progression, not a prediction for any person.'}
 ],
 [
 {name:'TRANSMISSION FILE',x:3,y:3,kind:'sample',action:'Decode how HBV spreads',fact:'Hepatitis B can spread when infected blood enters another person’s body, through sharing used needles, or from an infected parent to a baby during birth.',more:'HBV does not spread from hugging, sharing food at lunch, sitting together or ordinary casual contact. Those were the situations in your original Transmission Mythbusters activity.'},
 {name:'VACCINATION',x:9,y:3,kind:'shield',action:'Activate the prevention shield',fact:'Hepatitis B vaccination helps your immune system protect you against infection.',more:'Vaccination helps prevent hepatitis B. It does not cure an existing infection. Avoiding hugs is not a prevention strategy because hugging does not transmit the virus.'},
 {name:'BLOOD TESTING',x:15,y:3,kind:'sample',action:'Use the testing scanner',fact:'Someone can have hepatitis B without showing symptoms.',more:'Blood testing can detect hepatitis B, even when a person feels healthy. Waiting for symptoms is not a reliable way to find out whether someone is infected.'},
 {name:'MEDICAL CARE',x:4,y:8,kind:'power',action:'Restore the care connection',fact:'People with long-lasting hepatitis B may need regular check-ups.',more:'Some people need medicine to lower the risk of serious liver damage. Some infections are short-term, while others can last a long time.'},
 {name:'TISSUE TIME MACHINE',x:15,y:8,kind:'core',action:'Review the tissue time machine',fact:'Healthy-looking cells → inflammation → repeated injury → possible severe scarring.',more:'Many liver cells can work normally. Immune cells may then respond to infected cells. Repeated injury may cause fibrosis. Extensive scarring, called cirrhosis, can affect liver function. Not everyone experiences all these stages.'}
 ],
 [
 {name:'CELLS',x:3,y:3,kind:'core',action:'Recover the cell record',fact:'The cell membrane controls entry and exit, the nucleus stores DNA instructions, the cytoplasm is jelly-like, and mitochondria help supply energy.',more:'These are the four cell parts you explored while escaping HBV.'},
 {name:'THE VIRUS',x:9,y:3,kind:'virus',action:'Recover the virus record',fact:'HBV enters liver cells and uses their machinery to make more viruses.',more:'The immune response to infected cells can cause inflammation and injury.'},
 {name:'TISSUES AND ORGANS',x:15,y:3,kind:'sample',action:'Recover the tissue record',fact:'Cells form tissues; tissues help form organs. The liver is an organ made of cells and tissues.',more:'Ongoing liver injury can sometimes cause scar tissue that affects liver function.'},
 {name:'PREVENTION',x:4,y:8,kind:'shield',action:'Recover the prevention record',fact:'Vaccination helps prevent hepatitis B. Testing can detect infection, including when there are no symptoms.',more:'Medical care and check-ups are important for people who have long-lasting hepatitis B.'},
 {name:'MYTHBUSTERS',x:15,y:8,kind:'power',action:'Restore the truth broadcast',fact:'Hepatitis B does not spread through hugs, food sharing or sitting beside someone.',more:'Infected blood, used needles, and transmission during birth are examples of actual risks. Students should treat people living with hepatitis B with kindness.'}
 ]
];
const file=location.pathname.split('/').pop();const route={'index.html':0,'cells.html':0,'invasion.html':1,'microscope.html':2,'lab.html':3,'finale.html':4};let level=Number(new URLSearchParams(location.search).get('level'));if(!Number.isInteger(level)||level<0||level>4)level=route[file]??0;
let earned={};try{earned=JSON.parse(localStorage.getItem('liverquest_game_earned')||'{}')}catch(e){}
const W=1026,H=594,T=54;let hero={x:513,y:410},enemy={x:790,y:160},found=new Set(),keys={},active=false,dialog=false,paused=false,last=0,shieldUntil=0,hits=0,frame=0,particles=[],invaderTick=0,notice='',noticeUntil=0,missionComplete=false;
root.innerHTML=`<div class="game-shell"><header class="game-top"><div class="brand"><span class="brand-star">✦</span> LIVERQUEST <span class="tag">THE HBV ESCAPE</span></div><div class="top-right"><span id="chapter-indicator">CHAPTER 01 / 05</span><button id="map-toggle" class="top-button" type="button">☰ CHAPTERS</button><button id="restart-btn" class="top-button" type="button">↺ RESTART</button><a class="top-button" href="original/index.html">ORIGINAL SCIENCE LIBRARY</a></div></header><div class="game-layout"><div class="game-stage"><canvas id="scene" width="${W}" height="${H}" aria-label="LiverQuest: move through the cell using arrow keys or WASD, run away from the pursuing hepatitis B character and press E near a glowing cell part to discover information."></canvas><div class="game-overlay" id="overlay"></div><div class="hud"><div class="hud-left"><span class="live-dot"></span><span id="mission-title"></span><small id="mission-goal"></small></div><div class="hud-right"><span id="danger">♥ ♥ ♥</span><span id="collection">0 / 4</span></div></div><div class="interaction-hint" id="interaction-hint" hidden></div><div class="toast" id="game-toast" hidden></div><div class="touch" id="touch"><div class="dpad"><button data-key="ArrowUp" class="up">↑</button><button data-key="ArrowLeft" class="left">←</button><button data-key="ArrowDown" class="down">↓</button><button data-key="ArrowRight" class="right">→</button></div><button id="touch-interact" class="action">INSPECT ✦</button></div><div class="dialogue" id="dialogue" hidden><div class="dialog-avatar" id="dialog-icon">◈</div><div class="dialog-text"><div class="dialog-speaker" id="dialog-speaker"></div><h3 id="dialog-head"></h3><p id="dialog-content"></p><p id="dialog-detail"></p><p id="dialog-tip"></p><button id="dialog-next" type="button">BACK TO GAME →</button></div></div></div><div class="game-bottom"><span>MOVE: WASD / ARROWS</span><span>INSPECT: E / SPACE</span><span id="chase-label">RUN FROM HBV • REACH THE GLOWING PARTS</span></div></div><p class="outside-note">Educational game: HBV is shown as a chase character for storytelling. In reality, viruses do not consciously chase people inside cells. <a href="credits.html">Sources and credits</a></p></div><div class="episode-modal" id="episode-modal" hidden><div class="episode-inner"><button class="close-modal" id="close-map">✕</button><div class="eyebrow">CHOOSE A CHAPTER</div><h2>LIVERQUEST MISSIONS</h2><p>One connected science adventure. The first level takes place inside a fictional liver cell.</p><div id="episodes" class="episode-grid"></div><p class="modal-foot">Cell parts are simplified game landmarks. Their positions are not to scale.</p></div></div>`;
const $=id=>document.getElementById(id),canvas=$('scene'),c=canvas.getContext('2d'),overlay=$('overlay'),dia=$('dialogue'),hint=$('interaction-hint');
const colors=[['#321744','#c16aaf','#f1b1d1','#ffdb95'],['#25203d','#6e569c','#e19cab','#ffd68d'],['#18374a','#41899e','#a2dce2','#f9d49d'],['#1b3148','#56849b','#a8d1ce','#ffd18d'],['#282047','#7e65ae','#b6a0e5','#ffdf9c']];
function rr(x,y,w,h,r,fill,stroke,width=1){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.lineWidth=width;c.strokeStyle=stroke;c.stroke()}}function ellipse(x,y,rx,ry,fill,stroke,w=1){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke()}}function circle(x,y,r,fill,stroke,w=1){c.beginPath();c.arc(x,y,r,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke()}}function line(x,y,xx,yy,color,w=3){c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.stroke()}function txt(s,x,y,size,color='#fff',bold='800'){c.font=`${bold} ${size}px system-ui,sans-serif`;c.fillStyle=color;c.textAlign='center';c.fillText(s,x,y)}
function stage(t){const p=colors[level];const grad=c.createLinearGradient(0,0,W,H);grad.addColorStop(0,p[0]);grad.addColorStop(1,'#11162b');c.fillStyle=grad;c.fillRect(0,0,W,H);
if(level===0){ellipse(510,298,483,259,'#d787bb','#ffd4e8',15);ellipse(510,298,462,238,'#f1b2d3','#d983ad',5);for(let i=0;i<35;i++){const a=i*2.4,x=510+Math.cos(a)*((i*39)%415),y=298+Math.sin(a)*((i*19)%205);circle(x,y,5,'#ffe3f25c')}ellipse(513,179,112,87,'#a979c4','#eac5ff',9);ellipse(513,179,74,57,'#835aad','#ad8bd0',3);for(let i=0;i<5;i++){const x=760+i*18,y=390+i*9;ellipse(x,y,37,17,'#e8a65d','#f8d59c',4);line(x-20,y,x+20,y,'#a76c57',3)}for(let i=0;i<5;i++){ellipse(227+i*22,390-i*9,27,13,'#d69669','#ffd6aa',3)}for(let i=0;i<7;i++){ellipse(162+i*35,205+Math.sin(i)*20,22,13,'#a1d7dc','#ecffff',2)}txt('CELL MEMBRANE',153,94,13,'#8e456e');txt('CYTOPLASM',315,480,15,'#864a7b');txt('NUCLEUS',512,170,15,'#ffe3ff');txt('MITOCHONDRIA',821,480,13,'#8e456e');}
else{for(let i=0;i<35;i++){const x=(i*167+50)%W,y=(i*107+20)%H;ellipse(x,y,25+(i%3)*9,17+(i%4)*4,p[1]+'5c',p[2]+'60',2)}for(let i=0;i<12;i++){const x=i*96+38,y=295+Math.sin(i*2)*80;circle(x,y,25,p[2]+'40',p[3]+'55',3)}}
for(let i=0;i<30;i++){const x=(i*193)%W,y=(i*127)%H;circle(x,y,2+Math.sin(t/500+i),p[3]+'77')}
}
function drawStation(o,i,t){const x=o.x*T+27,y=o.y*T+27,bob=Math.sin(t/320+i)*4,seen=found.has(i),p=colors[level];circle(x,y+17,38,'#25122a66');circle(x,y+bob,31,seen?'#397e78':p[1],seen?'#a9ffe3':p[3],4);circle(x,y+bob,23,'#221d43bb');const marks={gate:'▣',core:'✺',pool:'≈',power:'ϟ',virus:'✳',shield:'⬡',sample:'◈'};txt(seen?'✓':marks[o.kind],x,y+bob+11,34,seen?'#a9ffe3':'#fff4de');if(!seen){c.globalAlpha=.3+.2*Math.sin(t/250);circle(x,y+bob,41,null,p[3],3);c.globalAlpha=1}rr(x-81,y-53,162,23,8,'#231830ce');txt(o.name,x,y-36,11,'#fff7ed','900')}
function drawHero(t){const x=hero.x,y=hero.y,b=Math.sin(t/105)*2;ellipse(x,y+22,18,8,'#190f2688');circle(x,y-7+b,21,'#ffe8c9','#c1fcff',5);rr(x-20,y+10+b,40,28,12,'#55c7bd','#edffff',3);circle(x-7,y-8+b,3,'#46314a');circle(x+7,y-8+b,3,'#46314a');line(x-4,y+1+b,x+4,y+1+b,'#a8787f',2);txt('YOU',x,y-36,12,'#fff','900')}
function drawVirus(t){if(level!==0||missionComplete)return;let x=enemy.x,y=enemy.y,b=Math.sin(t/170)*4;ellipse(x,y+25,23,8,'#29103088');for(let i=0;i<9;i++){let a=i*Math.PI*2/9;line(x+Math.cos(a)*22,y+b+Math.sin(a)*22,x+Math.cos(a)*36,y+b+Math.sin(a)*36,'#af5df3',6);circle(x+Math.cos(a)*37,y+b+Math.sin(a)*37,6,'#f39ab9')}circle(x,y+b,27,'#8053b9','#eac2fb',5);circle(x-9,y-5+b,5,'white');circle(x+9,y-5+b,5,'white');circle(x-8,y-5+b,2,'#311441');circle(x+8,y-5+b,2,'#311441');txt('HBV',x,y-43+b,14,'#fff1a8','900')}
function near(){let best=-1,d=78;data[level].forEach((o,i)=>{if(found.has(i))return;const dist=Math.hypot(hero.x-o.x*T-27,hero.y-o.y*T-27);if(dist<d){best=i;d=dist}});return best}
function spawn(x,y){for(let i=0;i<20;i++){let a=i*.314;particles.push({x,y,vx:Math.cos(a)*(1+i%4),vy:Math.sin(a)*(1+i%4),life:45})}}
function hud(){ $('chapter-indicator').textContent=`CHAPTER ${String(level+1).padStart(2,'0')} / 05`;$('mission-title').textContent=chapters[level].title;$('mission-goal').textContent=chapters[level].goal;$('collection').textContent=`✦ ${found.size} / ${data[level].length}`;$('danger').textContent=level===0?'♥ '.repeat(Math.max(0,3-hits))+'♡ '.repeat(hits):'DISCOVERIES';$('chase-label').textContent=level===0?'RUN FROM HBV • SHIFT TO SPRINT • SOLVE STATION QUIZZES':'EXPLORE • PRESS E TO COLLECT A SCIENCE FILE'}
const questions=[
 [
 ['What does the cell membrane do?',['Controls what enters and leaves','Stores all of the cell energy','Creates a cell wall'],0],
 ['What does the nucleus store?',['Blood','DNA instructions','Digestive juices'],1],
 ['Where is the jelly-like material inside a cell?',['Cytoplasm','Cell wall','Outside the cell'],0],
 ['What helps supply usable energy to a liver cell?',['Mitochondria','The virus','Scar tissue'],0]
 ],
 [
 ['How can HBV reach a new liver cell?',['By touching clothes','Through infected blood or certain body fluids','Through a hug'],1],
 ['Where can HBV genetic material go after entering?',['Toward the nucleus','Into a cell wall','Out into the air'],0],
 ['Why does HBV need a living cell?',['To grow legs','To use cell machinery to make virus parts','To become an organ'],1],
 ['What can newly formed viruses do?',['Infect other liver cells','Become mitochondria','Turn into healthy tissue'],0],
 ['What can contribute to liver-cell injury?',['Immune response to infected cells','Sitting beside someone','A normal hug'],0]
 ],
 [
 ['What is a tissue?',['A group of cells working together','A single virus','A type of vaccine'],0],
 ['What can happen to infected liver cells?',['Immune defenders may injure them','They always become blood cells','They develop a cell wall'],0],
 ['What does inflammation involve here?',['An immune response','A type of food','A cell changing into a virus'],0],
 ['What can repeated injury sometimes cause?',['Scar tissue','New chloroplasts','Instant recovery for everyone'],0]
 ],
 [
 ['Which situation can spread HBV?',['Hugging a classmate','Sharing used needles','Sharing a desk'],1],
 ['What does hepatitis B vaccination do?',['Helps prevent infection','Cures every existing infection','Replaces a blood test'],0],
 ['How can HBV be detected without symptoms?',['With a blood test','With a thermometer only','By checking eye colour'],0],
 ['Why might someone need ongoing care?',['To monitor long-term infection','Because hugs spread HBV','Because every infection causes cirrhosis'],0],
 ['What may result from ongoing liver injury?',['Fibrosis or scarring','A cell wall','Healthy tissue in every case'],0]
 ],
 [
 ['Which cell part stores DNA?',['Nucleus','Membrane','Mitochondria'],0],
 ['What does HBV use to make more of itself?',['A liver cell’s machinery','A microscope lens','Scar tissue'],0],
 ['What do groups of cells make?',['Tissues','Vaccines','Viruses'],0],
 ['What helps prevent hepatitis B?',['Vaccination','Avoiding all friendships','Sharing used needles'],0],
 ['Does HBV spread through ordinary hugs?',['Yes','No','Only inside a classroom'],1]
 ]
];
let quizMistakes=0;let dashEnergy=100;let lastDash=0;
function say(o,done,i){
 dialog=true;dia.hidden=false;
 $('dialog-speaker').textContent=`SCIENCE FILE ${found.size+1} / ${data[level].length}`;
 $('dialog-head').textContent=o.name;
 $('dialog-content').textContent=o.fact;
 $('dialog-detail').textContent=o.more;
 $('dialog-tip').textContent='Read the information. Then unlock this station with a short quiz!';
 $('dialog-next').style.display='block';$('dialog-next').textContent='START STATION CHALLENGE →';
 $('dialog-next').onclick=()=>showQuiz(i,done);
}
function showQuiz(i,done){
 const q=questions[level][i];
 $('dialog-speaker').textContent='STATION SECURITY CHALLENGE';
 $('dialog-head').textContent='UNLOCK '+data[level][i].name;
 $('dialog-content').textContent=q[0];
 $('dialog-detail').innerHTML=q[1].map((option,n)=>`<button class="lq-quiz-option" data-answer="${n}">${String.fromCharCode(65+n)}. ${option}</button>`).join('');
 $('dialog-tip').textContent='Choose the correct answer to recover the science file.';
 $('dialog-next').style.display='none';
 dia.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{
  const n=Number(b.dataset.answer);
  if(n!==q[2]){quizMistakes++;b.classList.add('wrong');$('dialog-tip').textContent='Not quite! Look back at what the station taught you and try again.';return}
  found.add(i);spawn(data[level][i].x*T+27,data[level][i].y*T+27);
  missionComplete=found.size===data[level].length;
  if(missionComplete){earned[level]=true;try{localStorage.setItem('liverquest_game_earned',JSON.stringify(earned))}catch(e){}}
  hud();$('dialog-head').textContent='STATION UNLOCKED!';
  $('dialog-content').textContent='Great work! '+data[level][i].fact;
  $('dialog-detail').textContent=missionComplete?'All science files recovered! The exit to the next chapter is now open.':'You earned a science key. Find your next objective and keep moving!';
  $('dialog-tip').textContent='✦ SCIENCE KEY COLLECTED';
  $('dialog-next').style.display='block';
  $('dialog-next').textContent=missionComplete?(level===4?'FINISH ADVENTURE →':'ESCAPE TO NEXT CHAPTER →'):'RETURN TO THE GAME →';
  $('dialog-next').onclick=()=>{dia.hidden=true;dialog=false;if(missionComplete){if(level===4)finalScreen();else setLevel(level+1)}else{shieldUntil=performance.now()+2400;enemy={x:790,y:160}}};
 });
}
function finalScreen(){active=false;overlay.innerHTML=`<div class="chapter-card"><span class="chapter-kicker">ALL FIVE CHAPTERS COMPLETE</span><div class="chapter-big">LIVER CITY SAVED!</div><p>You collected the science files, solved the puzzles and escaped the HBV chase. Science protects people through vaccination, testing and medical care.</p><p>Quiz attempts needing a retry: ${quizMistakes}</p><button id="again">PLAY THE STORY AGAIN →</button><p><a href="original/index.html">Explore every activity from the original website</a></p></div>`;$('again').onclick=()=>setLevel(0)}
function interact(){if(!active||dialog)return;const i=near();if(i<0)return;if(found.has(i))return;const o=data[level][i];say(o,false,i)}
function intro(){const ch=chapters[level];overlay.innerHTML=`<div class="chapter-card"><span class="chapter-kicker">LIVERQUEST · CHAPTER ${String(level+1).padStart(2,'0')}</span><div class="chapter-big">${ch.title}</div><p>${ch.sub}</p><div class="chapter-line"></div><small>${ch.goal.toUpperCase()}</small>${level===0?'<p class="chapter-warning">⚠ HBV WILL CHASE YOU! Get near a glowing cell part and press E to read its science file. You have three hearts. The chase pauses while you read.</p>':''}<button id="enter-chapter">${level===0?'START THE CHASE':'ENTER THE CHAPTER'} →</button></div>`;$('enter-chapter').onclick=()=>{overlay.innerHTML='';active=true;last=performance.now()}}
function resetPositions(){hero={x:513,y:410};enemy={x:790,y:160};shieldUntil=performance.now()+3500;hits=0;invaderTick=0}
function setLevel(n){level=n;found=new Set();active=false;dialog=false;dia.hidden=true;missionComplete=false;resetPositions();hud();intro()}
function collision(t){if(level!==0||t<shieldUntil||missionComplete)return;const dist=Math.hypot(hero.x-enemy.x,hero.y-enemy.y);if(dist<48){hits++;shieldUntil=t+2400;enemy={x:790,y:160};spawn(hero.x,hero.y);hud();if(hits>=3){active=false;overlay.innerHTML='<div class="chapter-card"><span class="chapter-kicker">HBV CAUGHT UP!</span><div class="chapter-big">TRY AGAIN</div><p>You kept your discoveries. Find another route and reach all four cell parts!</p><button id="again">CONTINUE THE ESCAPE →</button></div>';$('again').onclick=()=>{hits=0;resetPositions();hud();overlay.innerHTML='';active=true;last=performance.now()}}}}
function loop(t){const dt=Math.min(38,t-last||16);last=t;frame++;if(active&&!dialog&&$('episode-modal').hidden){let dx=(keys.ArrowRight||keys.d?1:0)-(keys.ArrowLeft||keys.a?1:0),dy=(keys.ArrowDown||keys.s?1:0)-(keys.ArrowUp||keys.w?1:0);if(dx||dy){let norm=Math.hypot(dx,dy),speed=(keys.Shift&&dashEnergy>0?.48:.245);if(keys.Shift&&dashEnergy>0)dashEnergy=Math.max(0,dashEnergy-dt*.035);hero.x=Math.min(W-57,Math.max(57,hero.x+dx/norm*dt*speed));hero.y=Math.min(H-67,Math.max(67,hero.y+dy/norm*dt*speed));if(level===0){const ex=(hero.x-510)/442,ey=(hero.y-298)/222,n=Math.hypot(ex,ey);if(n>1){hero.x=510+(hero.x-510)/n;hero.y=298+(hero.y-298)/n}}}if(level===0&&!missionComplete){let d=Math.hypot(hero.x-enemy.x,hero.y-enemy.y);if(d>1){let speed=.14;enemy.x+=(hero.x-enemy.x)/d*dt*speed;enemy.y+=(hero.y-enemy.y)/d*dt*speed}collision(t)}}dashEnergy=Math.min(100,dashEnergy+dt*.006);stage(t);if(level===0){for(const [ox,oy] of [[340,310],[655,300],[335,160]]){circle(ox,oy,25,'#51294c','#ffdf95',5);txt('✦',ox,oy+8,25,'#ffdf95')}}data[level].forEach((o,i)=>drawStation(o,i,t));drawVirus(t);particles=particles.filter(p=>p.life-->0);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;circle(p.x,p.y,p.life/12,'#fff1a0')});if(t<shieldUntil&&level===0){c.globalAlpha=.5+.3*Math.sin(t/70);circle(hero.x,hero.y,33,null,'#99fff2',5);c.globalAlpha=1}drawHero(t);const n=near();hint.hidden=!(active&&!dialog&&n>=0);if(n>=0)hint.textContent=`PRESS E — ${data[level][n].action.toUpperCase()}`;requestAnimationFrame(loop)}
window.addEventListener('keydown',e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(k))e.preventDefault();keys[k]=true;if((k==='e'||k===' ')&&!e.repeat)interact();if(k==='Escape')$('episode-modal').hidden=true});window.addEventListener('keyup',e=>{keys[e.key.length===1?e.key.toLowerCase():e.key]=false});window.addEventListener('blur',()=>keys={});document.querySelectorAll('[data-key]').forEach(b=>{const k=b.dataset.key;b.addEventListener('pointerdown',e=>{e.preventDefault();keys[k]=true;b.setPointerCapture(e.pointerId)});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>keys[k]=false)});$('touch-interact').onclick=interact;$('restart-btn').onclick=()=>setLevel(level);
const modal=$('episode-modal');$('map-toggle').onclick=()=>{active=false;$('episodes').innerHTML=chapters.map((ch,i)=>`<button class="episode-button ${earned[i]?'completed':''}" data-episode="${i}"><span class="episode-no">0${i+1}</span><span><b>${ch.title}</b><small>${ch.sub}</small></span><span class="episode-status">${earned[i]?'✓':'→'}</span></button>`).join('');modal.hidden=false;modal.querySelectorAll('[data-episode]').forEach(b=>b.onclick=()=>{modal.hidden=true;setLevel(+b.dataset.episode)})};$('close-map').onclick=()=>{modal.hidden=true;if(!overlay.innerHTML&&!dialog)active=true};
setLevel(level);requestAnimationFrame(loop);
})();
