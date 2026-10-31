/* LiverQuest: HBV Maze Quest. A standalone, accessible arcade game. */
(()=>{'use strict';
const $=s=>document.querySelector(s), root=$('#maze-app');
const MAP=[
'#######################',
'#P...#.......#...1....#',
'#.##.#.#####.#.###.##.#',
'#....#...#...#...#....#',
'####.###.#.#####.#.##.#',
'#....#...#.....#.#....#',
'#.####.#####.#.#.####.#',
'#......2....#.#.......#',
'#.##.#####.##.#####.#.#',
'#..#.....#....#.....#.#',
'##.#.###.####.#.###.#.#',
'#....#...#....#...#...#',
'#.####.###.######.#.#.#',
'#3......#.....E....#..#',
'#######################'
];
const W=23,H=15,S=40;
// Procedural map is verified/normalized and important locations are carved with pathways.
const stages=[
 {name:'Virus Invasion',color:'#af92ff',dark:'#44318e',subtitle:'Follow what HBV does inside a liver cell.',theme:'cell',goals:[
  {title:'HBV attaches',brief:'The virus finds a way into a liver cell.',detail:'HBV travels in infected blood. It can attach to a specific protein on the surface of a liver cell and enter.',art:'attach',say:'There it is! HBV attaches to the cell membrane so it can get inside.'},
  {title:'Virus instructions',brief:'The virus sends instructions toward the nucleus.',detail:'Once inside, HBV releases its instructions, which travel toward the nucleus. The virus relies on a living liver cell to make more copies.',art:'nucleus',say:'Its instructions are moving toward the nucleus—now the cell is at risk.'},
  {title:'One becomes many',brief:'New virus particles leave the cell.',detail:'The infected cell helps make new HBV parts. The parts come together to form more viruses, which can leave and infect other liver cells.',art:'copies',say:'Whoa! The infected cell is making more viruses, and they can spread.'}
 ]},
 {name:'Tissue Detective',color:'#ff8aaf',dark:'#763269',subtitle:'What happens when liver cells are infected?',theme:'tissue',goals:[
  {title:'Healthy liver tissue',brief:'These liver cells are working together.',detail:'A tissue is a group of cells working together. Healthy liver tissue helps the liver do its jobs.',art:'healthy',say:'Look closely! Many liver cells join together to make tissue.'},
  {title:'The body fights back',brief:'Immune defenders target infected cells.',detail:'The immune system tries to remove HBV-infected cells. This response can also hurt liver cells and cause inflammation.',art:'immune',say:'Those blue defenders are part of the immune system. Fighting HBV can also cause injury.'},
  {title:'When injury lasts',brief:'Repeated injury can leave scars.',detail:'If inflammation continues for a long time, scar tissue may build up. This is called fibrosis. More severe scarring is called cirrhosis. It does not happen to everyone.',art:'scar',say:'A long-lasting infection can sometimes leave scar tissue behind.'}
 ]},
 {name:'Rescue Lab',color:'#64d8df',dark:'#16698b',subtitle:'Discover how infection spreads and how people stay safer.',theme:'lab',goals:[
  {title:'How HBV spreads',brief:'HBV spreads through infected blood and some body fluids.',detail:'HBV can spread through contact with infected blood, shared needles, and from parent to baby during birth. It does not spread through hugs, sharing food, or sitting together.',art:'spread',say:'Everyday friendship is safe. HBV does not spread through hugs or shared lunches.'},
  {title:'Vaccination protects',brief:'A vaccine can help prevent HBV infection.',detail:'The hepatitis B vaccine teaches the immune system to protect you before infection. Vaccination is one of the best ways to prevent hepatitis B.',art:'vaccine',say:'A vaccine helps the body get ready to protect against hepatitis B.'},
  {title:'Testing and care',brief:'Blood tests can find HBV.',detail:'Some people with hepatitis B do not feel sick. A blood test can find an infection. People with long-lasting HBV may need regular checkups and treatment.',art:'test',say:'People may look healthy and still have HBV. Testing and care matter.'}
 ]},
 {name:'Save Liver City',color:'#ffd16d',dark:'#93612d',subtitle:'Connect everything you discovered.',theme:'final',goals:[
  {title:'From cells to liver',brief:'Cells make tissues. Tissues make organs.',detail:'Liver cells work together to form tissue, and different tissues help make the liver—an organ that processes nutrients, stores energy, and helps clean the blood.',art:'scale',say:'One tiny cell matters because many cells work together to keep the whole liver working.'},
  {title:'Why HBV matters',brief:'Virus growth and immune responses can hurt the liver.',detail:'HBV can make more viruses inside liver cells. The immune response may injure infected cells. Ongoing injury can lead to scarring over time.',art:'cycle',say:'HBV can affect cells first, then tissues, and eventually how well the liver works.'},
  {title:'Protect the future',brief:'Prevention, testing, and medical care help.',detail:'Vaccines prevent many HBV infections. Safer contact with blood, testing when needed, and proper medical care help people protect their livers.',art:'shield',say:'You solved the mystery! Prevention and medical care help protect Liver City.'}
 ]}
];
const faces={scientist:{name:'Nova the Scientist',skin:'#ffdbba',suit:'#68d9d8'},robot:{name:'Bolt the Robot',skin:'#b2f2ff',suit:'#f8c562'},creature:{name:'Pip the Micro-Creature',skin:'#e4b4ff',suit:'#b681ff'}};
let level=0,chosen='scientist',cells=[],player={x:1,y:1},enemies=[],dots=new Set(),studied=new Set(),hearts=3,score=0,paused=true,overlay=true,last=0,elapsed=0,invuln=0,roundStarts=0,walkTimer=0, enemyTimer=0, animationFrame=0,dialogue='',talkUntil=0,sound=false,wallIsOpen=false;
let canvas,ctx;
const key=(x,y)=>y*W+x; const tile=k=>({x:k%W,y:Math.floor(k/W)});
function portrait(type){let c=faces[type]||faces.scientist;return `<div class="face face-${type}" style="--skin:${c.skin};--suit:${c.suit}"><i class="hair"></i><i class="head"></i><i class="eye a"></i><i class="eye b"></i><i class="smile"></i><i class="torso"></i></div>`}
function virusIcon(){return '<div class="viricon"><i class="veye left"></i><i class="veye right"></i><i class="vmouth"></i></div>'}
root.innerHTML=`<header class="top"><a class="brand" href="index.html">🧬 LIVER<span>QUEST</span></a><nav><a href="index.html">Mission Control</a><a href="cells.html">Cell City</a><a class="active" href="invasion.html">Play Maze Game</a></nav><button id="help" class="textbutton">How to play</button></header>
<main class="layout"><div class="heading"><div><span class="eyebrow">THE HBV ADVENTURE · 4 ARCADE LEVELS</span><h1>MAZE <em>QUEST</em></h1><p>Explore, discover, escape the viruses. Follow three science clues in order, avoid HBV, and see the infection story unfold!</p></div><div class="level-pills" id="levels"></div></div>
<div class="play-layout"><section class="game-box"><div class="hud"><span id="hud-level">LEVEL 1 / 4</span><span id="hud-score">✦ 0 ENERGY</span><span id="hud-health">♥ ♥ ♥</span><span id="hud-goal">CLUES 0 / 3</span></div><div class="board" id="board"><canvas id="mazeCanvas" width="920" height="600" aria-label="Pac-Man-style maze game with hepatitis B enemies"></canvas><div class="speech" id="speech" hidden></div></div><div class="underbar"><span>MOVE: ARROWS / WASD · EXPLORE THE GLOWING STATIONS</span><button id="pause" class="textbutton">Pause</button></div><div class="touch"><button data-dir="up" aria-label="Move up">▲</button><div><button data-dir="left" aria-label="Move left">◀</button><button data-dir="down" aria-label="Move down">▼</button><button data-dir="right" aria-label="Move right">▶</button></div></div></section>
<aside class="objectives"><div class="obj-top"><span class="eyebrow">YOUR CURRENT MISSION</span><h2 id="objective-title"></h2><p id="objective-sub"></p></div><div id="objective-list"></div><div class="obj-legend"><div><span class="gem">✦</span> Energy dots</div><div><span class="gem station">?</span> Discoveries</div><div><span class="gem exit">⇥</span> Exit once all clues are found</div></div><p class="guide">HBV is chasing you! If caught, answer one short question. You keep your clues and stay in the same level.</p></aside></div></main>
<div class="modal" id="modal" hidden><div class="modal-card" id="modal-card"></div></div>`;
canvas=$('#mazeCanvas');ctx=canvas.getContext('2d');
const baseMap=MAP.map(row=>row.split(''));
function makeCells(){cells=baseMap.map(r=>r.map(c=>c));const start=tile(key(1,1));cells[start.y][start.x]=' '; for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){if(cells[y][x]==='P'||cells[y][x]==='E'||'123'.includes(cells[y][x]))cells[y][x]=' ';} // Expand key routes to make maze fair.
  [[1,1],[18,1],[7,7],[1,13],[14,13]].forEach(([x,y])=>{cells[y][x]=' ';});}
const spots=[{x:18,y:1},{x:7,y:7},{x:1,y:13}];const exit={x:14,y:13};
function pass(x,y){return x>=0&&y>=0&&x<W&&y<H&&cells[y][x]!=='#';}
function neighbors(a){return [[0,1],[1,0],[0,-1],[-1,0]].map(([dx,dy])=>({x:a.x+dx,y:a.y+dy})).filter(t=>pass(t.x,t.y));}
function reachable(start){const seen=new Set([key(start.x,start.y)]),q=[start];for(let i=0;i<q.length;i++){for(const n of neighbors(q[i])){let k=key(n.x,n.y);if(!seen.has(k)){seen.add(k);q.push(n)}}}return seen;}
function findRouteFix(){// carve shortest safe corridors if hand-built map happens to isolate a station
 for(const s of [...spots,exit]){if(reachable({x:1,y:1}).has(key(s.x,s.y)))continue;let x=s.x,y=s.y;while(x>1){cells[y][x]=' ';x--;}while(y>1){cells[y][x]=' ';y--;}cells[1][1]=' ';}}
function initLevel(n){level=n;makeCells();findRouteFix();player={x:1,y:1};const locations=[{x:20,y:3},{x:19,y:11},{x:10,y:9},{x:4,y:12}];enemies=locations.slice(0,n===0?1:n===1?2:n===2?2:3).filter(e=>pass(e.x,e.y)).map((e,i)=>({...e,home:{...e},prev:null,offset:i*370}));if(!enemies.length)enemies=[{x:20,y:3,home:{x:20,y:3},prev:null,offset:0}];dots=new Set();studied=new Set();hearts=3;wallIsOpen=false;roundStarts=0;walkTimer=0;enemyTimer=0;elapsed=0;invuln=0;for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(pass(x,y)&&Math.random()>.27&&!spots.some(s=>s.x===x&&s.y===y)&&!(exit.x===x&&exit.y===y))dots.add(key(x,y));paused=false;overlay=false;setUI();say(['Watch what HBV does as it enters a liver cell!','Now investigate what happens to liver tissue!','Find the ways HBV spreads—and how to stay protected.','Connect cells, tissues, and prevention to save Liver City!'][n],6500);}
function setUI(){const s=stages[level];$('#hud-level').textContent=`LEVEL ${level+1} / 4`;$('#hud-score').textContent=`✦ ${score} ENERGY`;$('#hud-health').textContent='♥ '.repeat(hearts).trim();$('#hud-goal').textContent=`CLUES ${studied.size} / 3`;$('#objective-title').textContent=s.name;$('#objective-sub').textContent=s.subtitle;$('#levels').innerHTML=stages.map((v,i)=>`<span class="${i===level?'current':i<level?'done':''}">${i+1} ${v.name}</span>`).join('');$('#objective-list').innerHTML=s.goals.map((g,i)=>`<div class="obj ${studied.has(i)?'done':''}"><span>${studied.has(i)?'✓':i+1}</span><div><strong>${g.title}</strong><small>${studied.has(i)?g.brief:(i===studied.size?'Find glowing station '+(i+1):'Unlock after station '+i)}</small></div></div>`).join('');}
function say(t,d=3800){dialogue=t;talkUntil=performance.now()+d;$('#speech').textContent=t;$('#speech').hidden=false;}
function showModal(inner){overlay=true;paused=true;$('#modal-card').innerHTML=inner;$('#modal').hidden=false;}
function closeModal(){overlay=false;paused=false;$('#modal').hidden=true;}
function scienceArt(kind){const item=(x,y,shade='#f7b3c7')=>`<g transform="translate(${x} ${y})"><ellipse rx="30" ry="24" fill="${shade}" stroke="#d77d9e" stroke-width="3"/><circle r="9" fill="#9869cc"/></g>`;
 const vir=(x,y,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><circle r="29" fill="#a868d0" stroke="#653b9c" stroke-width="5"/>${Array.from({length:9},(_,i)=>{let a=i*Math.PI*2/9;return `<path d="M${Math.cos(a)*28} ${Math.sin(a)*28}L${Math.cos(a)*39} ${Math.sin(a)*39}" stroke="#c27bdc" stroke-width="6" stroke-linecap="round"/>`}).join('')}<circle cx="-9" cy="-4" r="4" fill="white"/><circle cx="9" cy="-4" r="4" fill="white"/><path d="M-8 11Q0 17 8 11" fill="none" stroke="#522b75" stroke-width="3"/></g>`;
 let a=''; if(kind==='healthy')a=Array.from({length:12},(_,i)=>item(60+i%4*88,55+Math.floor(i/4)*62)).join('');
 else if(kind==='immune')a=Array.from({length:9},(_,i)=>item(65+i%3*125,50+Math.floor(i/3)*66,i%4===0?'#f8b28c':'#f6bbce')).join('')+Array.from({length:4},(_,i)=>`<circle cx="${130+i*60}" cy="${80+(i%2)*70}" r="19" fill="#64cff2" stroke="#3c9bbf" stroke-width="5"/>`).join('');
 else if(kind==='scar')a=Array.from({length:10},(_,i)=>item(60+i%5*75,70+Math.floor(i/5)*93,i%3===0?'#d9bb8b':'#f2b1bf')).join('')+'<path d="M20 190Q130 100 240 170T415 135M40 55Q185 160 380 45" fill="none" stroke="#e0c68d" stroke-width="14" opacity=".9"/>';
 else if(kind==='attach')a=`<ellipse cx="250" cy="120" rx="150" ry="90" fill="#ffd0e8" stroke="#e679b8" stroke-width="12"/>${vir(76,120)}<path d="M108 120L154 120" stroke="#7f64cd" stroke-width="7" stroke-dasharray="8 9"/><text x="220" y="235">LIVER CELL</text>`;
 else if(kind==='nucleus')a=`<ellipse cx="210" cy="125" rx="132" ry="93" fill="#f9c0df" stroke="#ed7eab" stroke-width="10"/><circle cx="280" cy="120" r="66" fill="#ab80db" stroke="#764ea9" stroke-width="7"/>${vir(92,122,.6)}<path d="M145 125H220" stroke="#ffef7d" stroke-width="7" stroke-dasharray="10 8"/><path d="M215 110L230 125L215 140" fill="none" stroke="#ffef7d" stroke-width="7"/>`;
 else if(kind==='copies')a=`<ellipse cx="210" cy="125" rx="170" ry="98" fill="#f5bfdb" stroke="#df7da9" stroke-width="8"/>${vir(135,122,.65)}${vir(245,82,.46)}${vir(270,156,.47)}${vir(355,127,.48)}`;
 else if(kind==='spread')a=`${vir(95,100,.75)}<path d="M130 100H255" stroke="#e676a8" stroke-width="8" stroke-dasharray="12 8"/><rect x="250" y="65" width="100" height="80" rx="22" fill="#ffb4c1"/><text x="300" y="115" font-size="30">BLOOD</text><text x="210" y="215">NOT HUGGING OR SHARING FOOD</text>`;
 else if(kind==='vaccine')a='<path d="M210 38L305 82V144Q295 205 210 238Q125 205 115 144V82Z" fill="#b3f5ed" stroke="#39a9b9" stroke-width="9"/><path d="M156 136L190 172L260 100" stroke="#30a38d" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
 else if(kind==='test')a='<rect x="172" y="40" width="86" height="170" rx="24" fill="#d7e7ff" stroke="#649dcf" stroke-width="8"/><rect x="184" y="63" width="62" height="110" rx="16" fill="#fff"/><path d="M213 85Q180 126 213 155Q244 126 213 85" fill="#f2859d"/><path d="M140 232H292" stroke="#70b7d0" stroke-width="10" stroke-linecap="round"/>';
 else if(kind==='scale')a=item(85,105)+Array.from({length:5},(_,i)=>item(180+(i%3)*53,70+Math.floor(i/3)*65,'#f1aebe')).join('')+'<path d="M315 92Q350 30 385 90Q399 145 370 172Q325 170 315 92" fill="#a5c97f" stroke="#6c9652" stroke-width="7"/>';
 else if(kind==='cycle')a=`${vir(90,120,.75)}<path d="M145 120H280" stroke="#efb561" stroke-width="8" stroke-dasharray="12 10"/>${vir(312,83,.5)}${vir(355,135,.5)}${vir(300,175,.45)}`;
 else if(kind==='shield')a='<path d="M205 30L305 76V145Q296 212 205 249Q114 212 105 145V76Z" fill="#c6f4ec" stroke="#47b9a5" stroke-width="10"/><path d="M150 130L186 168L261 92" fill="none" stroke="#37a992" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>';
 return `<svg class="science-svg" viewBox="0 0 420 270" role="img" aria-label="Illustration of ${kind}"><defs><radialGradient id="discBg"><stop stop-color="#fffbff"/><stop offset="1" stop-color="#edc0ed"/></radialGradient><filter id="discGlow"><feGaussianBlur stdDeviation="5"/></filter></defs><rect width="420" height="270" rx="24" fill="url(#discBg)"/><circle cx="70" cy="35" r="95" fill="#fff9ff" opacity=".55"/><circle cx="360" cy="240" r="125" fill="#b79deb" opacity=".22"/><path d="M18 226Q210 190 400 225" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="12 12" opacity=".6"/><g font-family="Arial" fill="#684b80" font-size="15" font-weight="800" text-anchor="middle">${a}</g></svg>`;}
function openDiscovery(i){if(studied.has(i)||i!==studied.size)return;let s=stages[level],g=s.goals[i];studied.add(i);say(g.say,4500);showModal(`<span class="modal-eyebrow">LEVEL ${level+1} · DISCOVERY ${i+1} / 3</span><div class="lesson"><div>${scienceArt(g.art)}</div><div class="lesson-copy"><h2>${g.title}</h2><p class="large">${g.brief}</p><p>${g.detail}</p><button class="primary" id="continue">GOT IT — KEEP EXPLORING →</button></div></div>`);$('#continue').onclick=()=>{closeModal();setUI();if(studied.size===3)say('Great work! All three discoveries found. Head to the glowing EXIT gate!',4800)};}
function help(){showModal(`<span class="modal-eyebrow">HOW TO PLAY</span><h2>Everyone can play!</h2><div class="how"><div><strong>1. MOVE</strong><p>Use the arrow keys or WASD. On phones, use the direction buttons.</p></div><div><strong>2. DISCOVER</strong><p>Reach the three glowing numbered stations. Each one shows a picture and teaches something important about HBV.</p></div><div><strong>3. AVOID HBV</strong><p>Purple HBV enemies follow you. If caught, answer one quick science question and continue this same level. Your clues stay saved.</p></div><div><strong>4. FINISH THE LEVEL</strong><p>After all three discoveries, head to the EXIT gate. Four levels tell the full story.</p></div></div><button id="startgame" class="primary">${roundStarts===0&&level===0?'CHOOSE MY CHARACTER':'BACK TO GAME'} →</button>`);$('#startgame').onclick=()=>{if(roundStarts===0&&level===0){chooseCharacter()}else closeModal()};}
function chooseCharacter(){showModal(`<span class="modal-eyebrow">CHOOSE YOUR PLAYER</span><h2>Who will explore Liver City?</h2><p>Every character has the same easy controls. Pick your favorite!</p><div class="chargrid">${Object.entries(faces).map(([id,c])=>`<button data-char="${id}" class="charpick">${portrait(id)}<strong>${c.name}</strong></button>`).join('')}</div><p class="subnote">Purple viruses will follow you. Move with arrow keys or WASD.</p>`);document.querySelectorAll('[data-char]').forEach(b=>b.onclick=()=>{chosen=b.dataset.char;score=0;closeModal();initLevel(0);roundStarts=1;});}
function levelDone(){paused=true;overlay=true;let isFinal=level===3;showModal(`<div class="level-win">${isFinal?'🏅':'✦'}<span>LEVEL ${level+1} COMPLETE</span></div><h2>${isFinal?'You saved Liver City!':'All three discoveries found!'}</h2><p class="large">${isFinal?'You learned how HBV enters liver cells, affects liver tissue, and how people can protect themselves.':'You explored '+stages[level].name+' and unlocked the next chapter.'}</p><div class="win-graphic">${scienceArt(isFinal?'shield':stages[level].goals[2].art)}</div><button class="primary" id="nextlevel">${isFinal?'PLAY AGAIN':'NEXT LEVEL →'}</button>${isFinal?'<a class="secondary" href="index.html">BACK TO MISSION CONTROL</a>':''}`);$('#nextlevel').onclick=()=>{closeModal();if(isFinal){score=0;initLevel(0)}else initLevel(level+1)};if(isFinal){try{let p=JSON.parse(localStorage.getItem('liverquest')||'{}');p.invasion=true;localStorage.setItem('liverquest',JSON.stringify(p))}catch(e){}}}
function step(dx,dy){if(paused||overlay)return;let nx=player.x+dx,ny=player.y+dy;if(!pass(nx,ny))return;player={x:nx,y:ny};const k=key(nx,ny);if(dots.delete(k)){score+=5;if(score%100===0)say('Energy collected! Keep looking for the glowing science stations.',1900);}spots.forEach((p,i)=>{if(p.x===nx&&p.y===ny&&!studied.has(i)){if(i===studied.size)openDiscovery(i);else say('Follow the glowing numbers in order! Find station '+(studied.size+1)+' first.',2300)}});if(nx===exit.x&&ny===exit.y&&studied.size===3)levelDone();setUI();if(!overlay)checkCatch(performance.now());}
function advanceEnemy(e){const options=neighbors(e);if(!options.length)return;let move;if(Math.random()<.60){const d=options.map(p=>({...p,d:Math.abs(p.x-player.x)+Math.abs(p.y-player.y)})).sort((a,b)=>a.d-b.d);move=d[0]}else move=options[Math.floor(Math.random()*options.length)];e.x=move.x;e.y=move.y;}
const reviewQuestions=[
 [{q:'How does HBV first get into a liver cell?',a:'It attaches to the cell surface',opts:['It attaches to the cell surface','It enters through a hug','It grows inside mitochondria'],why:'HBV attaches to a specific protein on the liver cell surface, then enters.'},
  {q:'Where do HBV instructions travel after entry?',a:'Toward the nucleus',opts:['Toward the nucleus','Out through the skin','Into the stomach'],why:'After entering, HBV carries instructions toward the nucleus.'},
  {q:'Why do more HBV particles appear?',a:'The infected cell helps make them',opts:['The infected cell helps make them','Mitochondria turn into viruses','The liver makes them to digest food'],why:'HBV uses a living liver cell to help create more virus particles.'}],
 [{q:'What makes up a tissue?',a:'Many cells working together',opts:['Many cells working together','Only one virus','A single nucleus'],why:'Groups of cells working together make tissues.'},
  {q:'Why can hepatitis B cause swelling and injury?',a:'The body fights infected cells',opts:['The body fights infected cells','A virus turns into scar tissue immediately','Healthy cells stop needing energy'],why:'Immune defenders attack infected cells. This can also injure liver tissue.'},
  {q:'What can happen after repeated injury over time?',a:'Scar tissue may build up',opts:['Scar tissue may build up','All infections cause instant scarring','Cells turn into viruses'],why:'Long-lasting inflammation can sometimes lead to scarring; this does not happen to everyone.'}],
 [{q:'Which situation can spread HBV?',a:'Contact with infected blood',opts:['Contact with infected blood','Sharing a sandwich','Sitting beside a friend'],why:'HBV can spread through infected blood, but not normal classroom contact.'},
  {q:'What helps prevent hepatitis B?',a:'Vaccination',opts:['Vaccination','A blood test after every meal','Avoiding hugs'],why:'Vaccines help your immune system protect you from hepatitis B.'},
  {q:'How can someone find out if they have HBV?',a:'A blood test',opts:['A blood test','Looking at their face','Checking their height'],why:'A blood test can detect HBV, even when someone feels well.'}],
 [{q:'How do cells connect to the liver?',a:'Cells form tissues that help make organs',opts:['Cells form tissues that help make organs','Cells only exist by themselves','Tissues are made of viruses'],why:'Cells work together in tissues; tissues help build organs such as the liver.'},
  {q:'Why might an HBV infection hurt the liver?',a:'The immune response can injure infected cells',opts:['The immune response can injure infected cells','Mitochondria stop moving','Sharing lunch damages liver cells'],why:'The body fights infected liver cells, sometimes causing inflammation and injury.'},
  {q:'Which plan best protects liver health?',a:'Vaccines, testing and medical care',opts:['Vaccines, testing and medical care','Avoiding handshakes','Never sharing a classroom'],why:'Vaccination helps prevent infection; testing and care help manage it.'}]
];
let catchCount=0;
function catchQuiz(){
  const questions=reviewQuestions[level];
  const q=questions[(catchCount++)%questions.length];
  const opts=q.opts.map((o,i)=>({o,sort:Math.sin(catchCount*11+i*7)})).sort((a,b)=>a.sort-b.sort).map(v=>v.o);
  showModal(`<span class="modal-eyebrow">HBV CAUGHT YOU · QUICK COMEBACK</span>
   <div class="catch-hero">${virusIcon()}<div><h2>You've been spotted!</h2><p>No restart! Answer one quick question and continue from the last checkpoint.</p></div></div>
   <div class="catch-question">${q.q}</div><div class="catch-options">${opts.map((o,i)=>`<button data-review="${i}" class="catch-option">${o}</button>`).join('')}</div><div class="catch-feedback" id="catch-feedback" aria-live="polite"></div>`);
  document.querySelectorAll('[data-review]').forEach(b=>b.onclick=()=>{
    const correct=opts[Number(b.dataset.review)]===q.a;
    if(correct){b.classList.add('correct');$('#catch-feedback').innerHTML=`<strong>That's it!</strong> ${q.why}<div style="margin-top:13px"><button class="primary" id="resume-game">BACK TO THE MAZE →</button></div>`;
      document.querySelectorAll('[data-review]').forEach(o=>o.disabled=true);
      $('#resume-game').onclick=()=>{closeModal();invuln=performance.now()+3200;setUI();};
    } else {b.classList.add('wrong');$('#catch-feedback').textContent='Try another answer. Think about what you just discovered in the game.';}
  });
}
function checkCatch(now){
 if(now<invuln||overlay)return;
 for(const e of enemies){
  if(e.x===player.x&&e.y===player.y){
    hearts=Math.max(1,hearts-1);
    player={x:1,y:1};
    enemies.forEach((enemy,i)=>{enemy.x=enemy.home.x;enemy.y=enemy.home.y});
    enemyTimer=0;
    invuln=now+2500;
    setUI();
    catchQuiz();
    break;
  }
 }
}
function draw(now){const dpr=1;ctx.clearRect(0,0,920,600);const s=stages[level];const bg=ctx.createLinearGradient(0,0,920,600);bg.addColorStop(0,s.theme==='cell'?'#fbd6ef':s.theme==='lab'?'#c4f3f6':s.theme==='final'?'#fce8ae':'#fbd0e0');bg.addColorStop(1,s.theme==='cell'?'#e7c1ff':s.theme==='lab'?'#9ed6ed':s.theme==='final'?'#f0b5d1':'#ebafd3');ctx.fillStyle=bg;ctx.fillRect(0,0,920,600);
 // richer illustrated biology environment under the maze walls
 const tt=now/1000;
 ctx.save();
 if(s.theme==='cell'){
  const glow=ctx.createRadialGradient(480,280,30,480,280,510);glow.addColorStop(0,'#ffeef8');glow.addColorStop(1,'#e9a5d1');
  ctx.fillStyle=glow;ctx.beginPath();ctx.ellipse(460,300,425,267,0,0,7);ctx.fill();
  ctx.strokeStyle='#cf529e';ctx.lineWidth=24;ctx.stroke();ctx.strokeStyle='#ffedf5';ctx.lineWidth=7;ctx.stroke();
  ctx.fillStyle='#9a6bcb';ctx.beginPath();ctx.ellipse(718,285,111,102,-.2,0,7);ctx.fill();ctx.strokeStyle='#683f9e';ctx.lineWidth=13;ctx.stroke();
  ctx.fillStyle='#c7a1ed';ctx.beginPath();ctx.ellipse(718,285,88,79,-.2,0,7);ctx.fill();
  ctx.strokeStyle='#7147aa';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(690,244);ctx.bezierCurveTo(750,270,690,314,741,335);ctx.stroke();
  [[170,140,-.4],[305,470,.45],[830,446,-.3]].forEach(([x,y,r])=>{
    ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle='#eeb36c';ctx.strokeStyle='#ae6538';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(0,0,62,29,0,0,7);ctx.fill();ctx.stroke();
    ctx.strokeStyle='#ad673b';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-42,0);for(let j=0;j<7;j++)ctx.lineTo(-42+j*14,j%2?-13:12);ctx.stroke();ctx.restore();
  });
  for(let i=0;i<24;i++){let x=(i*71+60)%870,y=(i*113+40)%560;ctx.fillStyle='#fff9ff88';ctx.beginPath();ctx.arc(x,y,2.5+1.4*Math.sin(tt+i),0,7);ctx.fill();}
 } else if(s.theme==='tissue'){
  for(let row=0;row<8;row++)for(let col=0;col<11;col++){
    let x=col*88+31+(row%2)*28,y=row*83+10;
    ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(col*3+row)*.3);
    ctx.fillStyle=(col>7&&row>3)?'#efbb92':'#f2a7c5';ctx.strokeStyle='#d076a5';ctx.lineWidth=4;
    ctx.beginPath();ctx.ellipse(0,0,35,29,0,0,7);ctx.fill();ctx.stroke();
    ctx.fillStyle='#8862a7';ctx.beginPath();ctx.ellipse(4,-1,10,8,0,0,7);ctx.fill();ctx.restore();
  }
  ctx.strokeStyle='#efd4ad88';ctx.lineWidth=13;ctx.beginPath();ctx.moveTo(670,460);ctx.bezierCurveTo(750,290,840,520,930,320);ctx.stroke();
 } else if(s.theme==='lab'){
  for(let i=0;i<9;i++){const x=i*125-15;ctx.fillStyle='#ffffff44';ctx.fillRect(x,0,55,600);ctx.strokeStyle='#2caec455';ctx.lineWidth=7;ctx.strokeRect(x+15,30,80,540);}
  for(let i=0;i<7;i++){let x=90+i*125,y=175+(i%3)*130;ctx.fillStyle='#ffffff99';ctx.beginPath();ctx.arc(x,y,32,0,7);ctx.fill();ctx.strokeStyle='#46bfca';ctx.lineWidth=4;ctx.stroke();ctx.fillStyle='#e68bb0';ctx.beginPath();ctx.arc(x,y,12,0,7);ctx.fill();}
 } else {
  for(let i=0;i<12;i++){let x=(i%4)*245+120,y=Math.floor(i/4)*220+100;ctx.fillStyle='#fff4cc77';ctx.beginPath();ctx.arc(x,y,80,0,7);ctx.fill();ctx.strokeStyle='#e5a86255';ctx.lineWidth=12;ctx.stroke();}
 }
 ctx.restore();
 // detailed patterned environment beneath maze
 for(let i=0;i<70;i++){let x=((i*137+41)%920),y=((i*83+27)%600);ctx.beginPath();ctx.arc(x,y,6+i%5,0,Math.PI*2);ctx.fillStyle=i%3?'#fff7ff35':'#a565ab18';ctx.fill();}
 if(s.theme==='tissue'){for(let y=30;y<600;y+=70)for(let x=35;x<920;x+=87){ctx.beginPath();ctx.ellipse(x+(y%5)*2,y,35,27,.13,0,7);ctx.fillStyle='#ffb0ce66';ctx.fill();ctx.strokeStyle='#c575a23d';ctx.lineWidth=3;ctx.stroke();ctx.beginPath();ctx.arc(x,y,9,0,7);ctx.fillStyle='#a873bf50';ctx.fill()}}
 if(s.theme==='cell'){ctx.beginPath();ctx.ellipse(470,300,440,278,0,0,7);ctx.fillStyle='#ffe2ef66';ctx.fill();ctx.strokeStyle='#d67bbbaa';ctx.lineWidth=17;ctx.stroke();ctx.beginPath();ctx.ellipse(747,270,105,94,0,0,7);ctx.fillStyle='#9871c86d';ctx.fill();ctx.strokeStyle='#6e49aa88';ctx.lineWidth=6;ctx.stroke();for(let i=0;i<4;i++){let x=130+i*170,y=160+(i%2)*280;ctx.save();ctx.translate(x,y);ctx.rotate(.35);ctx.beginPath();ctx.ellipse(0,0,56,25,0,0,7);ctx.fillStyle='#e6a56180';ctx.fill();ctx.strokeStyle='#bc693caa';ctx.lineWidth=5;ctx.stroke();ctx.restore();}}
 const grad=ctx.createLinearGradient(0,0,0,600);grad.addColorStop(0,s.dark);grad.addColorStop(1,'#312d69');for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(cells[y][x]!=='#')continue;let px=x*S,py=y*S;ctx.fillStyle='#392d6f66';ctx.fillRect(px,py,S,S);ctx.fillStyle=grad;ctx.beginPath();ctx.roundRect(px+2,py+2,S-4,S-4,9);ctx.fill();ctx.fillStyle='#ffffff30';ctx.fillRect(px+5,py+4,S-10,4);ctx.fillStyle='#110b3922';ctx.fillRect(px+5,py+S-8,S-10,4);ctx.strokeStyle='#e1c1ff33';ctx.lineWidth=1;ctx.strokeRect(px+3,py+3,S-6,S-6);}
 // soft floor gloss; dots and clue stations
 for(const k of dots){const p=tile(k);let pulse=1+Math.sin(now/350+k)*.12;ctx.beginPath();ctx.arc(p.x*S+20,p.y*S+20,4.3*pulse,0,7);ctx.fillStyle='#fef5a6';ctx.shadowColor='#ffc85e';ctx.shadowBlur=9;ctx.fill();ctx.shadowBlur=0;}
 spots.forEach((p,i)=>{if(studied.has(i))return;let locked=i!==studied.size;let px=p.x*S+20,py=p.y*S+20,rad=15+Math.sin(now/310+i)*2;ctx.shadowColor=locked?'#897d9d':'#fff7a0';ctx.shadowBlur=locked?3:28;ctx.beginPath();ctx.arc(px,py,rad,0,7);ctx.fillStyle=locked?'#c4bdd9':'#fff8c2';ctx.fill();ctx.shadowBlur=0;ctx.lineWidth=4;ctx.strokeStyle=locked?'#877ca4':'#e49a5a';ctx.stroke();ctx.fillStyle=locked?'#706380':'#6c388b';ctx.font='bold 17px Arial';ctx.textAlign='center';ctx.fillText(String(i+1),px,py+6)});
 // Exit
 {let x=exit.x*S+20,y=exit.y*S+20;let active=studied.size===3;ctx.fillStyle=active?'#51edcf':'#ac9aba';ctx.shadowColor=active?'#53ffd7':'transparent';ctx.shadowBlur=active?24:0;ctx.beginPath();ctx.roundRect(x-17,y-17,34,34,7);ctx.fill();ctx.shadowBlur=0;ctx.textAlign='center';ctx.font='bold 21px Arial';ctx.fillStyle='#fff';ctx.fillText('⇥',x,y+8)}
 // Enemies have spikes, expressive faces, animated wobble
 enemies.forEach((e,i)=>{const x=e.x*S+20,y=e.y*S+20,bob=Math.sin(now/165+i)*2;ctx.save();ctx.translate(x,y+bob);ctx.rotate(Math.sin(now/330+i)*.14);for(let j=0;j<10;j++){let a=j*2*Math.PI/10;ctx.strokeStyle='#f2aedb';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(Math.cos(a)*13,Math.sin(a)*13);ctx.lineTo(Math.cos(a)*19,Math.sin(a)*19);ctx.stroke();}ctx.beginPath();ctx.arc(0,0,14,0,7);ctx.fillStyle='#9c59c9';ctx.shadowColor='#e39cf0';ctx.shadowBlur=12;ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-5,-4,3.4,0,7);ctx.arc(5,-4,3.4,0,7);ctx.fill();ctx.beginPath();ctx.arc(-4,-3,1.6,0,7);ctx.arc(6,-3,1.6,0,7);ctx.fillStyle='#2a1940';ctx.fill();ctx.strokeStyle='#542273';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,5,5,Math.PI,0);ctx.stroke();ctx.restore();});
 // Player drawn with expressive face
 {const x=player.x*S+20,y=player.y*S+20;if(invuln>now&&Math.floor(now/120)%2===0){}else{ctx.save();ctx.translate(x,y+Math.sin(now/240)*1.4);ctx.shadowColor='#fff';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(0,0,16,0,7);ctx.fillStyle=faces[chosen].suit;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.arc(0,-5,11,0,7);ctx.fillStyle=faces[chosen].skin;ctx.fill();ctx.fillStyle='#2d2753';ctx.beginPath();ctx.arc(-4,-6,2,0,7);ctx.arc(5,-6,2,0,7);ctx.fill();ctx.strokeStyle='#a35072';ctx.beginPath();ctx.arc(0,-2,4,0,Math.PI);ctx.stroke();if(chosen==='scientist'){ctx.strokeStyle='#ffffff';ctx.lineWidth=3;ctx.strokeRect(-14,4,28,9)}if(chosen==='robot'){ctx.fillStyle='#759da7';ctx.fillRect(-10,-14,20,4)}if(chosen==='creature'){ctx.fillStyle='#bd83f0';ctx.beginPath();ctx.arc(-11,-12,6,0,7);ctx.arc(11,-12,6,0,7);ctx.fill()}ctx.restore();}}
 }
function loop(now){if(!last)last=now;let dt=Math.min(70,now-last);last=now;if(!paused&&!overlay){elapsed+=dt;enemyTimer+=dt;const speed=level===0?710:level===1?670:level===2?640:610;if(enemyTimer>speed){enemyTimer=0;enemies.forEach(advanceEnemy);checkCatch(now)}}draw(now);if(talkUntil&&now>talkUntil){$('#speech').hidden=true;talkUntil=0;}animationFrame=requestAnimationFrame(loop)}
function onDirection(dir){if(overlay)return;const delta={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[dir];if(delta)step(...delta)}
let keyLast=0;window.addEventListener('keydown',e=>{const mapping={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};const dir=mapping[e.key]||mapping[e.key.toLowerCase()];if(dir){e.preventDefault();if(performance.now()-keyLast>85){onDirection(dir);keyLast=performance.now()}}else if(e.key==='Escape'&&!overlay){paused=!paused;$('#pause').textContent=paused?'Resume':'Pause'}});
document.querySelectorAll('[data-dir]').forEach(b=>{const dir=b.dataset.dir;b.addEventListener('click',()=>onDirection(dir));});$('#help').onclick=()=>help();$('#pause').onclick=()=>{if(overlay)return;paused=!paused;$('#pause').textContent=paused?'Resume':'Pause'};
initLevel(0);paused=true;chooseCharacter();requestAnimationFrame(loop);
})();
