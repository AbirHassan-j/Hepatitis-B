
(()=>{'use strict';
const $=s=>document.querySelector(s), root=$('#maze-app');
const CANVAS_W=1000, CANVAS_H=680;
const levels=[
 {
  name:'Virus Invasion', theme:'cell', color:'#9d79f6', dark:'#4b2f95', enemyDelay:520, bonusTime:70,
  subtitle:'See how HBV gets into a liver cell and starts the infection story.',
  map:[
'#########################',
'#P....#.....#....1....A.#',
'#.###.#.###.#.#####.##..#',
'#.....#...#.#.....#.....#',
'#.#####.#.#.###.#.###.#.#',
'#...#...#...#...#...#.#.#',
'###.#.#######.###.#.#.#.#',
'#...#.....2...#...#.#...#',
'#.#######.#####.###.###.#',
'#.....#...#.....#...#...#',
'#.###.#.###.#####.###.#.#',
'#.#...#.....#...#...#.#.#',
'#.#.#######.#.#.###.#.#.#',
'#...#..3....#.#...#.#...#',
'###.#.#####.#.###.#.###.#',
'#....B....#....4....E...#',
'#########################'],
  clues:[
   {title:'HBV arrives', brief:'HBV travels toward a liver cell.', detail:'HBV can move through infected blood. In this first step, the virus reaches the outside of a liver cell.', remember:'First, HBV gets close to the liver cell.', art:'arrive', say:'HBV has reached the liver cell. The infection story is starting.'},
   {title:'HBV attaches', brief:'HBV sticks to the cell membrane.', detail:'HBV attaches to the cell membrane so it can enter the liver cell. This is the doorway into the cell.', remember:'Next, HBV attaches to the cell membrane.', art:'attach', say:'The virus is attaching to the cell membrane so it can get inside.'},
   {title:'HBV gets inside', brief:'HBV enters the liver cell.', detail:'After attaching, HBV gets inside the liver cell and moves deeper into it.', remember:'Then, HBV enters the cell.', art:'enter', say:'Now HBV is inside the liver cell and heading deeper into the cell.'},
   {title:'The cell helps HBV', brief:'One virus can lead to many more.', detail:'Inside the infected cell, HBV tricks the cell into helping make more viruses. Those new viruses can leave and infect other liver cells.', remember:'Finally, the infected cell helps make more viruses.', art:'copies', say:'Uh oh! One virus can turn into many more viruses.'}
  ],
  catch:[
   {q:'What happens after HBV reaches the outside of a liver cell?', opts:['It attaches to the cell membrane','It turns into food','It leaves the body right away'], a:0, why:'Right. HBV attaches to the cell membrane before it can enter the cell.'},
   {q:'Why is HBV dangerous once it gets inside the cell?', opts:['It can use the cell to help make more viruses','It paints the cell purple','It turns the cell into bone'], a:0, why:'Correct. HBV can use a liver cell to help make more viruses.'}
  ],
  bonus:{q:'Put these in order: attach, get inside, make more viruses.', opts:['Attach → get inside → make more viruses','Make more viruses → attach → get inside','Get inside → attach → make more viruses'], a:0, why:'Nice! That is the correct infection order.'}
 },
 {
  name:'Tissue Detective', theme:'tissue', color:'#ff7faa', dark:'#8a3562', enemyDelay:500, bonusTime:75,
  subtitle:'Now zoom out and discover what happens to groups of liver cells.',
  map:[
'#########################',
'#P...#..1....#....A.....#',
'#.#.#.#####.#.#.#####.#.#',
'#.#.#.....#.#.#.....#.#.#',
'#.#.#####.#.#.#####.#.#.#',
'#.#.....#.#...#.....#...#',
'#.#####.#.#####.#######.#',
'#.....#.#..2..#.....#...#',
'#####.#.#####.#####.#.###',
'#...#.#.....#.....#.#...#',
'#.#.#.#####.#####.#.###.#',
'#.#.#...#...#...#.#...#.#',
'#.#.###.#.###.#.#.###.#.#',
'#.#...#.#..3..#.#...#.#.#',
'#.###.#.#######.###.#.#.#',
'#...B....#..4..C....#..E#',
'#########################'],
  clues:[
   {title:'Healthy tissue', brief:'Many liver cells work together.', detail:'A tissue is a group of cells working together. Healthy liver tissue is made of many healthy liver cells.', remember:'Healthy liver cells work together in tissue.', art:'healthy', say:'This is what healthy liver tissue can look like.'},
   {title:'The body reacts', brief:'The immune system notices infected cells.', detail:'The body tries to fight infected liver cells. This is part of the immune response.', remember:'The body reacts when it notices infected cells.', art:'immune', say:'The immune system is trying to deal with the infection.'},
   {title:'Inflammation', brief:'The tissue becomes irritated.', detail:'Inflammation means the body is reacting to a problem. The tissue can become red, irritated, or injured.', remember:'Inflammation is the body reacting to a problem.', art:'inflammation', say:'This irritated area shows inflammation.'},
   {title:'Scar tissue', brief:'Long-lasting injury can leave scars.', detail:'If injury keeps happening for a long time, scar tissue can build up. This can make it harder for the liver to work well.', remember:'Long-lasting injury can lead to scar tissue.', art:'scar', say:'Too much repeated injury can sometimes leave scar tissue.'}
  ],
  catch:[
   {q:'What is tissue?', opts:['A group of cells working together','A kind of virus','A single atom'], a:0, why:'Yes. Tissue is a group of cells working together.'},
   {q:'What does inflammation mean here?', opts:['The body is reacting to a problem','The liver turned into a muscle','The virus disappeared'], a:0, why:'Right. Inflammation means the body is reacting to a problem.'}
  ],
  bonus:{q:'What can happen if liver tissue is injured again and again over time?', opts:['Scar tissue can build up','The liver becomes a heart','Nothing changes at all'], a:0, why:'Exactly. Repeated injury can lead to scar tissue.'}
 },
 {
  name:'Rescue Lab', theme:'lab', color:'#5cd4dc', dark:'#1c6786', enemyDelay:480, bonusTime:75,
  subtitle:'Learn how hepatitis B spreads and how people protect themselves.',
  map:[
'#########################',
'#P....#1....#....A......#',
'#.###.#.##..#.#####.###.#',
'#...#.#..#..#.....#...#.#',
'###.#.###.#######.###.#.#',
'#...#...#.....#...#...#.#',
'#.#####.#####.#.###.###.#',
'#.....#...2...#.....#...#',
'#.###.#####.#######.#.###',
'#.#...#...#.....#...#...#',
'#.#.###.#.#####.#.#####.#',
'#.#...#.#..3..#.#.....#.#',
'#.###.#.#####.#.#####.#.#',
'#...#.#.....#.#.....#.#.#',
'#.#.#.#####.#.#####.#.#.#',
'#.B....#..4....C....#..E#',
'#########################'],
  clues:[
   {title:'How HBV spreads', brief:'HBV can spread through infected blood.', detail:'Hepatitis B can spread when infected blood or certain body fluids enter another person\'s body.', remember:'HBV can spread through infected blood.', art:'spread', say:'This clue shows one real way HBV can spread.'},
   {title:'What does NOT spread HBV', brief:'Everyday contact is safe.', detail:'HBV does not spread through hugging, sharing a desk, or eating lunch together.', remember:'HBV does not spread through everyday classroom contact.', art:'nospread', say:'Good news: everyday contact like hugging or sharing lunch is safe.'},
   {title:'Vaccination', brief:'Vaccines help prevent HBV.', detail:'The hepatitis B vaccine helps protect people before they are infected.', remember:'Vaccination helps prevent hepatitis B.', art:'vaccine', say:'Vaccination is one of the best ways to prevent hepatitis B.'},
   {title:'Testing and care', brief:'Testing can find infection.', detail:'A blood test can help find hepatitis B. Some people also need regular medical care.', remember:'Testing and medical care are important.', art:'test', say:'Testing helps people know if they have hepatitis B.'}
  ],
  catch:[
   {q:'Which is a real way HBV can spread?', opts:['Infected blood entering another person\'s body','Sharing lunch at school','Sitting beside a friend'], a:0, why:'Correct. HBV can spread through infected blood.'},
   {q:'Which helps prevent hepatitis B?', opts:['Vaccination','Avoiding handshakes','Wearing a winter coat'], a:0, why:'Correct. Vaccination helps prevent hepatitis B.'}
  ],
  bonus:{q:'Which action best matches hepatitis B care?', opts:['Get tested and get medical care if needed','Ignore it because everyone feels sick right away','Avoid classrooms forever'], a:0, why:'Right. Testing and medical care are important.'}
 },
 {
  name:'Save Liver City', theme:'final', color:'#ffc861', dark:'#8a5b25', enemyDelay:450, bonusTime:80,
  subtitle:'Put the whole story together and protect Liver City.',
  map:[
'#########################',
'#P...#1....#....A.....#.#',
'#.#.#.###.#.###.#####.#.#',
'#.#...#...#...#.....#...#',
'#.#####.#####.#####.###.#',
'#.....#.....#...#...#...#',
'###.#.#####.###.#.###.#.#',
'#...#...2.#.....#...#.#.#',
'#.#####.#.#########.#.#.#',
'#.....#.#.....#.....#...#',
'#.###.#.#####.#.#####.###',
'#.#...#..3..#.#.....#...#',
'#.#.#######.#.#####.###.#',
'#.#.....#...#...#...#...#',
'#.#####.#.#####.#.###.#.#',
'#..B....#...4...C...E.#.#',
'#########################'],
  clues:[
   {title:'Cells → tissues → organ', brief:'Small parts build the whole liver.', detail:'Liver cells work together to form liver tissue. Liver tissue helps make the liver, which is an organ.', remember:'Cells make tissues, and tissues help make organs.', art:'cellsToLiver', say:'The story starts small with cells but affects the whole liver.'},
   {title:'HBV can harm the liver', brief:'Infection can affect how the liver works.', detail:'HBV infects liver cells. The virus and the body\'s response can both affect the liver over time.', remember:'HBV can affect the liver by harming its cells and tissues.', art:'harm', say:'What starts in one cell can affect liver tissue and the whole liver.'},
   {title:'Protect Liver City', brief:'Prevention matters.', detail:'Vaccination, safer contact with blood, and getting tested when needed help protect people.', remember:'Prevention helps protect the liver.', art:'protect', say:'We can protect Liver City with prevention and smart health choices.'},
   {title:'Final message', brief:'Kindness matters too.', detail:'People with hepatitis B should be treated with kindness and respect. A virus does not change someone\'s value.', remember:'Treat people with kindness and respect.', art:'kindness', say:'We learned the science—and we should always respond with kindness too.'}
  ],
  catch:[
   {q:'What is the best summary of the HBV story?', opts:['HBV infects liver cells, can affect tissues, and prevention helps','HBV only lives on school desks','HBV spreads by smiling'], a:0, why:'Exactly. HBV infects liver cells, can affect tissues, and prevention helps.'},
   {q:'How should we treat people with hepatitis B?', opts:['With kindness and respect','With fear and exclusion','By avoiding every shared space'], a:0, why:'Yes. People with hepatitis B should be treated with kindness and respect.'}
  ],
  bonus:{q:'Which answer best protects Liver City?', opts:['Vaccination, safe choices around blood, testing, and care','Never talking to anyone with HBV','Ignoring symptoms and never testing'], a:0, why:'Perfect. Prevention, testing, and care are the best protection plan.'}
 }
];
const faces={scientist:{name:'Nova the Scientist',skin:'#ffd8b7',suit:'#65d9da'},robot:{name:'Bolt the Robot',skin:'#caeef6',suit:'#ffc85a'},creature:{name:'Pip the Micro-Creature',skin:'#e3c1ff',suit:'#b285ff'}};
let level=0, chosen='scientist', overlay=true, paused=true, canvas,ctx;
let mapGrid=[], W=25,H=17,T=40, player={x:1,y:1}, playerStart={x:1,y:1}, exit={x:1,y:1}, clues=[], enemies=[];
let dots=new Set(), studied=new Set(), score=0, catches=0, roundTime=0, invulnUntil=0, enemyTick=0, speechUntil=0;
const ui={};
const rootHTML=`<header class="top"><a class="brand" href="index.html">🧬 LIVER<span>QUEST</span></a><nav><a href="index.html">Mission Control</a><a href="cells.html">Cell City</a><a class="active" href="invasion.html">HBV Maze Quest</a></nav><button id="help" class="textbutton">How to play</button></header>
<main class="layout"><div class="heading"><div><span class="eyebrow">PAC-MAN STYLE · 4 LEVELS · LEARN IN ORDER</span><h1>HBV <em>MAZE QUEST</em></h1><p>Move through each maze, avoid the HBV attackers, and unlock the science clues in order. If HBV catches you, answer a quick question and continue the same level.</p></div><div class="level-pills" id="levels"></div></div>
<div class="play-layout"><section class="game-box"><div class="hud"><span id="hud-level">LEVEL 1 / 4</span><span id="hud-score">✦ 0 ENERGY</span><span id="hud-health">CAUGHT 0 TIMES</span><span id="hud-goal">CLUES 0 / 4</span></div><div class="board" id="board"><canvas id="mazeCanvas" width="${CANVAS_W}" height="${CANVAS_H}" aria-label="HBV maze game"></canvas><div class="speech" id="speech" hidden></div></div><div class="underbar"><span>MOVE: ARROWS / WASD · FIND CLUES 1 → 4 · REACH THE EXIT</span><button id="pause" class="textbutton">Pause</button></div><div class="touch"><button data-dir="up">▲</button><div><button data-dir="left">◀</button><button data-dir="down">▼</button><button data-dir="right">▶</button></div></div></section>
<aside class="objectives"><div class="obj-top"><span class="eyebrow">CURRENT LEVEL</span><h2 id="objective-title"></h2><p id="objective-sub"></p></div><div id="objective-list"></div><div class="obj-legend"><div><span class="gem">✦</span> Energy dots</div><div><span class="gem station">?</span> Clue stations in order</div><div><span class="gem exit">⇥</span> Exit opens after all clues</div></div><p class="guide">Different maps. Different routes. Different clues. If your group finishes a level super cleanly, a bonus question will appear before the next level unlocks.</p></aside></div></main>
<div class="modal" id="modal" hidden><div class="modal-card" id="modal-card"></div></div>`;
root.innerHTML=rootHTML; canvas=$('#mazeCanvas'); ctx=canvas.getContext('2d');
ui.levels=$('#levels'); ui.modal=$('#modal'); ui.modalCard=$('#modal-card'); ui.speech=$('#speech');
const dirs=[[1,0],[-1,0],[0,1],[0,-1]]; const pass=(x,y)=> y>=0 && y<H && x>=0 && x<W && mapGrid[y][x]!== '#'; const key=(x,y)=>`${x},${y}`;
function portrait(type){const c=faces[type]||faces.scientist; return `<div class="face face-${type}" style="--skin:${c.skin};--suit:${c.suit}"><i class="hair"></i><i class="head"></i><i class="eye a"></i><i class="eye b"></i><i class="smile"></i><i class="torso"></i></div>`;}
function virusIcon(){return '<div class="viricon"><i class="veye left"></i><i class="veye right"></i><i class="vmouth"></i></div>';}
function showModal(html){ui.modal.hidden=false; ui.modalCard.innerHTML=html; overlay=true; paused=true;}
function closeModal(){ui.modal.hidden=true; overlay=false; paused=false; ui.modalCard.innerHTML='';}
function say(text,ms=2400){ui.speech.textContent=text; ui.speech.hidden=false; speechUntil=performance.now()+ms;}
function makePills(){ui.levels.innerHTML=levels.map((lv,i)=>`<span class="${i<level?'done':i===level?'current':''}">LEVEL ${i+1} · ${lv.name}</span>`).join('');}
function buildLevel(){const lv=levels[level]; mapGrid=lv.map.map(r=>r.split('')); H=mapGrid.length; W=mapGrid[0].length; T=Math.min(CANVAS_W/W,CANVAS_H/H); clues=[]; enemies=[]; studied=new Set(); dots=new Set(); score=0; catches=0; roundTime=0; invulnUntil=0; enemyTick=0;
  for(let y=0;y<H;y++) for(let x=0;x<W;x++){
    const ch=mapGrid[y][x];
    if(ch==='P'){playerStart={x,y}; player={x,y}; mapGrid[y][x]=' ';}
    else if(ch==='E'){exit={x,y}; mapGrid[y][x]=' ';}
    else if(/[1-4]/.test(ch)){clues[Number(ch)-1]={x,y}; mapGrid[y][x]=' ';}
    else if(/[A-D]/.test(ch)){enemies.push({x,y,home:{x,y}}); mapGrid[y][x]=' ';}
  }
  for(let y=0;y<H;y++) for(let x=0;x<W;x++){
    if(pass(x,y) && key(x,y)!==key(playerStart.x,playerStart.y) && key(x,y)!==key(exit.x,exit.y) && !clues.some(c=>c&&c.x===x&&c.y===y) && !enemies.some(e=>e.x===x&&e.y===y)) dots.add(key(x,y));
  }
  updateSidebar(); updateHud(); makePills();
}
function updateSidebar(){const lv=levels[level]; $('#objective-title').textContent=lv.name; $('#objective-sub').textContent=lv.subtitle; $('#objective-list').innerHTML=lv.clues.map((c,i)=>`<div class="obj ${studied.has(i)?'done':''}"><span>${i+1}</span><div><strong>${c.title}</strong><small>${studied.has(i)?c.remember:c.brief}</small></div></div>`).join('');}
function updateHud(){ $('#hud-level').textContent=`LEVEL ${level+1} / ${levels.length}`; $('#hud-score').textContent=`✦ ${score} ENERGY`; $('#hud-health').textContent=`CAUGHT ${catches} ${catches===1?'TIME':'TIMES'}`; $('#hud-goal').textContent=`CLUES ${studied.size} / ${levels[level].clues.length}`; }
function help(){showModal(`<span class="modal-eyebrow">HOW TO PLAY</span><h2>Easy to learn. Fun to follow.</h2><div class="how"><div><strong>1. MOVE</strong><p>Use the arrow keys or WASD. On mobile, tap the arrow buttons.</p></div><div><strong>2. FOLLOW THE ORDER</strong><p>Find the glowing stations in order: 1, 2, 3, 4. Each clue teaches the next part of the story.</p></div><div><strong>3. AVOID HBV</strong><p>The purple HBV enemies slowly chase you through the maze. If they catch you, answer a quick question and keep going.</p></div><div><strong>4. FINISH THE LEVEL</strong><p>After all four clues, go to the exit. If you do really well, you may get a bonus quiz.</p></div></div><button id="startgame" class="primary">${level===0 && roundTime===0 ? 'CHOOSE MY CHARACTER' : 'BACK TO GAME'} →</button>`); $('#startgame').onclick=()=>{ if(level===0 && roundTime===0) chooseCharacter(); else closeModal();}; }
function chooseCharacter(){showModal(`<span class="modal-eyebrow">CHOOSE A CHARACTER</span><h2>Who will explore Liver City?</h2><div class="chargrid">${Object.keys(faces).map(type=>`<button class="charpick" data-char="${type}">${portrait(type)}<strong>${faces[type].name}</strong></button>`).join('')}</div><p class="subnote">All characters play the same. Pick the one your group likes best.</p>`); document.querySelectorAll('[data-char]').forEach(b=>b.onclick=()=>{chosen=b.dataset.char; closeModal(); say('Find station 1 first. The clues will appear in order.',2600);}); }
function move(dx,dy){ if(paused||overlay) return; const nx=player.x+dx, ny=player.y+dy; if(!pass(nx,ny)) return; player={x:nx,y:ny}; const k=key(nx,ny); if(dots.delete(k)){ score+=5; if(score%100===0) say('Nice! Keep following the science clues in order.',1900); }
  clues.forEach((p,i)=>{ if(p.x===nx&&p.y===ny && !studied.has(i)){ if(i===studied.size) openClue(i); else say(`Find station ${studied.size+1} first!`,1800); }});
  if(nx===exit.x && ny===exit.y){ if(studied.size===levels[level].clues.length) finishLevel(); else say('The exit opens after you find all four clues.',1800); }
  updateHud();
}
function bfsStep(start,target){ const q=[start], prev=new Map([[key(start.x,start.y),null]]); for(let qi=0; qi<q.length; qi++){ const cur=q[qi]; if(cur.x===target.x && cur.y===target.y) break; for(const [dx,dy] of dirs){ const nx=cur.x+dx, ny=cur.y+dy, k=key(nx,ny); if(pass(nx,ny) && !prev.has(k)){ prev.set(k,cur); q.push({x:nx,y:ny}); } } }
  if(!prev.has(key(target.x,target.y))) return null; let cur=target; while(prev.get(key(cur.x,cur.y)) && key(prev.get(key(cur.x,cur.y)).x,prev.get(key(cur.x,cur.y)).y)!==key(start.x,start.y)){ cur=prev.get(key(cur.x,cur.y)); } return cur; }
function advanceEnemies(){ const lv=levels[level]; enemies.forEach((e,idx)=>{ let next=null; const direct=bfsStep({x:e.x,y:e.y},{x:player.x,y:player.y}); if(direct && Math.random()<0.78) next=direct; else {
    const opts=dirs.map(([dx,dy])=>({x:e.x+dx,y:e.y+dy})).filter(p=>pass(p.x,p.y));
    if(opts.length){ opts.sort((a,b)=> (Math.abs(a.x-player.x)+Math.abs(a.y-player.y)) - (Math.abs(b.x-player.x)+Math.abs(b.y-player.y))); next=opts[Math.floor(Math.random()*Math.min(2,opts.length))]; }
  }
  if(next){ e.x=next.x; e.y=next.y; }
 }); checkCatch(); }
function checkCatch(){ if(performance.now()<invulnUntil || overlay) return; if(enemies.some(e=>e.x===player.x && e.y===player.y)){ catches++; player={...playerStart}; enemies.forEach(e=>{e.x=e.home.x; e.y=e.home.y;}); updateHud(); invulnUntil=performance.now()+2500; catchQuiz(); } }
function catchQuiz(){ const bank=levels[level].catch; const q=bank[Math.floor(Math.random()*bank.length)]; showModal(`<div class="catch-hero">${virusIcon()}<div><span class="modal-eyebrow">HBV CAUGHT YOU</span><h2>Quick check before you jump back in!</h2><p class="subnote">You keep your clues. Answer this question to return to the same maze.</p></div></div><div class="catch-question">${q.q}</div><div class="catch-options">${q.opts.map((opt,i)=>`<button class="catch-option" data-opt="${i}">${opt}</button>`).join('')}</div><div class="catch-feedback" id="catch-feedback"></div>`);
  document.querySelectorAll('[data-opt]').forEach(btn=>btn.onclick=()=>{ const i=Number(btn.dataset.opt); if(i===q.a){ btn.classList.add('correct'); $('#catch-feedback').innerHTML=`<strong>Correct!</strong> ${q.why}<div style="margin-top:13px"><button class="primary" id="resume-game">BACK TO THE MAZE →</button></div>`; document.querySelectorAll('[data-opt]').forEach(b=>b.disabled=true); $('#resume-game').onclick=()=>{closeModal();}; } else { btn.classList.add('wrong'); $('#catch-feedback').textContent='Try again. Think about what the level has already taught you.'; } }); }
function openClue(i){ const data=levels[level].clues[i]; studied.add(i); updateHud(); updateSidebar(); showModal(`<span class="modal-eyebrow">CLUE ${i+1} OF ${levels[level].clues.length}</span><h2>${data.title}</h2><div class="lesson"><div class="science-anim ${data.art}">${sceneArt(data.art)}</div><div><p class="large">${data.brief}</p><p>${data.detail}</p><p><strong>Remember:</strong> ${data.remember}</p><button id="continue-lesson" class="primary">KEEP PLAYING →</button></div></div>`); $('#continue-lesson').onclick=()=>{closeModal(); say(data.say,2600); if(studied.size===levels[level].clues.length) say('All clues found! Head for the glowing exit.',2600);}; }
function finishLevel(){ const lv=levels[level]; const levelSeconds=Math.round(roundTime/1000); const qualify = catches===0 || levelSeconds<lv.bonusTime; if(qualify && !lv._bonusDone){ lv._bonusDone=true; const q=lv.bonus; showModal(`<span class="modal-eyebrow">BONUS CHALLENGE</span><h2>Wow — your group moved through that level fast!</h2><p class="subnote">Answer one extra question to unlock the next maze.</p><div class="catch-question">${q.q}</div><div class="catch-options">${q.opts.map((opt,i)=>`<button class="catch-option" data-bonus="${i}">${opt}</button>`).join('')}</div><div class="catch-feedback" id="bonus-feedback"></div>`); document.querySelectorAll('[data-bonus]').forEach(btn=>btn.onclick=()=>{ const i=Number(btn.dataset.bonus); if(i===q.a){ btn.classList.add('correct'); $('#bonus-feedback').innerHTML=`<strong>Great job!</strong> ${q.why}<div style="margin-top:13px"><button class="primary" id="next-level-btn">NEXT LEVEL →</button></div>`; document.querySelectorAll('[data-bonus]').forEach(b=>b.disabled=true); $('#next-level-btn').onclick=nextLevel; } else { btn.classList.add('wrong'); $('#bonus-feedback').textContent='Try again. Use what the level just taught you.'; } }); return; }
  showModal(`<span class="modal-eyebrow">LEVEL COMPLETE</span><h2>You finished ${lv.name}!</h2><div class="level-win">★<span>LEVEL ${level+1} COMPLETE</span></div><p>You found all four clues, escaped the HBV attackers, and completed the level story in order.</p><button id="next-level" class="primary">${level<levels.length-1?'NEXT LEVEL':'SEE FINAL MESSAGE'} →</button>`); $('#next-level').onclick=nextLevel; }
function nextLevel(){ if(level<levels.length-1){ level++; buildLevel(); closeModal(); say(`Welcome to ${levels[level].name}!`,2000); } else { showEnding(); } }
function showEnding(){ showModal(`<span class="modal-eyebrow">MISSION COMPLETE</span><h2>You protected Liver City!</h2><div class="lesson"><div class="science-anim protect">${sceneArt('protect')}</div><div><p class="large">You followed the HBV story from cell entry to liver protection.</p><p>You learned that HBV attaches to a liver cell, gets inside, can lead to more viruses, may cause inflammation and scarring over time, and can be prevented with vaccination and managed with testing and care.</p><p><strong>Most important:</strong> science helps us understand disease, and kindness helps us support people.</p><div><button id="play-again" class="primary">PLAY AGAIN</button><button id="back-home" class="secondary">MISSION CONTROL</button></div></div></div>`); $('#play-again').onclick=()=>{ levels.forEach(l=>delete l._bonusDone); level=0; buildLevel(); closeModal(); chooseCharacter(); }; $('#back-home').onclick=()=>location.href='index.html'; }
function sceneArt(kind){
  const commonCell = `<div class="scene-cell"><div class="cell-core"></div><div class="cell-nucleus"></div><div class="cell-mito m1"></div><div class="cell-mito m2"></div><div class="cell-mito m3"></div></div>`;
  switch(kind){
    case 'arrive': return `<div class="scene-wrap arrive"><div class="scene-caption">HBV is reaching the liver cell.</div>${commonCell}<div class="hbv hbv-arrive"></div></div>`;
    case 'attach': return `<div class="scene-wrap attach"><div class="scene-caption">HBV attaches to the cell membrane.</div>${commonCell}<div class="hbv hbv-attach"></div></div>`;
    case 'enter': return `<div class="scene-wrap enter"><div class="scene-caption">HBV enters the cell.</div>${commonCell}<div class="hbv hbv-enter"></div></div>`;
    case 'copies': return `<div class="scene-wrap copies"><div class="scene-caption">One infected cell can help make many viruses.</div>${commonCell}<div class="hbv hbv-copy a"></div><div class="hbv hbv-copy b"></div><div class="hbv hbv-copy c"></div><div class="hbv hbv-copy d"></div></div>`;
    case 'healthy': return `<div class="scene-wrap tissue"><div class="scene-caption">Healthy liver cells working together.</div><div class="tissue-grid">${'<span class="tissue-cell"></span>'.repeat(12)}</div></div>`;
    case 'immune': return `<div class="scene-wrap immune"><div class="scene-caption">Immune defenders move toward infected cells.</div><div class="tissue-grid immune-grid">${'<span class="tissue-cell"></span>'.repeat(8)}<span class="tissue-cell infected"></span>${'<span class="tissue-cell"></span>'.repeat(3)}</div><div class="defender d1"></div><div class="defender d2"></div></div>`;
    case 'inflammation': return `<div class="scene-wrap inflammation"><div class="scene-caption">Inflammation means the body is reacting to a problem.</div><div class="tissue-grid hot-grid">${'<span class="tissue-cell warm"></span>'.repeat(4)}<span class="tissue-cell hot"></span><span class="tissue-cell hot"></span>${'<span class="tissue-cell warm"></span>'.repeat(6)}</div></div>`;
    case 'scar': return `<div class="scene-wrap scar"><div class="scene-caption">Long-lasting injury can leave scar tissue.</div><div class="tissue-grid scar-grid">${'<span class="tissue-cell scarred"></span>'.repeat(12)}</div></div>`;
    case 'spread': return `<div class="scene-wrap spread"><div class="scene-caption">A real spread route: infected blood.</div><div class="spread-lane"><div class="person left"></div><div class="blood-arrow"></div><div class="person right"></div></div></div>`;
    case 'nospread': return `<div class="scene-wrap nospread"><div class="scene-caption">HBV does NOT spread through everyday contact.</div><div class="spread-lane safe"><div class="person left hug"></div><div class="person right hug"></div><div class="safe-badge">SAFE</div></div></div>`;
    case 'vaccine': return `<div class="scene-wrap vaccine"><div class="scene-caption">Vaccination helps the body get ready.</div><div class="shield-shot"><div class="shield"></div><div class="hbv hbv-bump"></div></div></div>`;
    case 'test': return `<div class="scene-wrap test"><div class="scene-caption">A blood test can help find HBV.</div><div class="lab-strip"><div class="tube"></div><div class="scope"></div><div class="check"></div></div></div>`;
    case 'cellsToLiver': return `<div class="scene-wrap organscale"><div class="scene-caption">Cells → tissue → liver.</div><div class="scale-row"><div class="mini-cell"></div><div class="arrow-right"></div><div class="mini-tissue"></div><div class="arrow-right"></div><div class="mini-liver"></div></div></div>`;
    case 'harm': return `<div class="scene-wrap harm"><div class="scene-caption">HBV can harm liver cells and tissues.</div><div class="mini-liver sad"></div><div class="hbv hbv-orbit a"></div><div class="hbv hbv-orbit b"></div></div>`;
    case 'protect': return `<div class="scene-wrap protect"><div class="scene-caption">Vaccination, testing, and care help protect Liver City.</div><div class="city-shield"><div class="mini-liver"></div><div class="big-shield"></div><div class="check check1"></div><div class="check check2"></div></div></div>`;
    case 'kindness': return `<div class="scene-wrap kindness"><div class="scene-caption">Science + kindness = a better response.</div><div class="spread-lane safe"><div class="person left"></div><div class="heart-badge">❤</div><div class="person right"></div></div></div>`;
    default: return `<div class="scene-wrap">${commonCell}</div>`;
  }
}
function draw(now){ const lv=levels[level]; ctx.clearRect(0,0,CANVAS_W,CANVAS_H); const g=ctx.createLinearGradient(0,0,CANVAS_W,CANVAS_H); const themes={cell:['#ffdff0','#e2d2ff'],tissue:['#ffd9e9','#f0b9d2'],lab:['#dbfbff','#b7dfff'],final:['#fff0c4','#f9d2ea']}; g.addColorStop(0,themes[lv.theme][0]); g.addColorStop(1,themes[lv.theme][1]); ctx.fillStyle=g; ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
 // richer background
 if(lv.theme==='cell') drawCellBackground(now); else if(lv.theme==='tissue') drawTissueBackground(now); else if(lv.theme==='lab') drawLabBackground(now); else drawFinalBackground(now);
 // maze walls
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){ if(mapGrid[y][x]!=='#') continue; const px=x*T, py=y*T; const wallGrad=ctx.createLinearGradient(px,py,px,py+T); wallGrad.addColorStop(0,lv.dark); wallGrad.addColorStop(1,'#32265c'); ctx.fillStyle='rgba(40,25,74,.25)'; ctx.fillRect(px,py,T,T); ctx.fillStyle=wallGrad; roundRect(ctx,px+2,py+2,T-4,T-4,10,true,false); ctx.fillStyle='rgba(255,255,255,.2)'; ctx.fillRect(px+5,py+4,T-10,4); }
 // dots
 dots.forEach(k=>{ const [x,y]=k.split(',').map(Number); const cx=x*T+T/2, cy=y*T+T/2; const pulse=1+Math.sin(now/240+x+y)*.15; ctx.beginPath(); ctx.arc(cx,cy,4.2*pulse,0,Math.PI*2); ctx.fillStyle='#fff8a8'; ctx.shadowColor='#ffcf54'; ctx.shadowBlur=10; ctx.fill(); ctx.shadowBlur=0; });
 // clues & exit
 clues.forEach((c,i)=>{ if(studied.has(i)) return; const active=i===studied.size; const cx=c.x*T+T/2, cy=c.y*T+T/2; const pulse=15 + Math.sin(now/210+i)*2; ctx.beginPath(); ctx.arc(cx,cy,pulse,0,Math.PI*2); ctx.fillStyle=active?'#fff6c7':'#ddd4ef'; ctx.shadowColor=active?'#ffef7d':'#9586b9'; ctx.shadowBlur=active?22:8; ctx.fill(); ctx.shadowBlur=0; ctx.lineWidth=4; ctx.strokeStyle=active?'#e99e63':'#877ba4'; ctx.stroke(); ctx.fillStyle=active?'#6d398f':'#6d6680'; ctx.font='bold 17px Nunito'; ctx.textAlign='center'; ctx.fillText(String(i+1),cx,cy+6); });
 // exit
 const ex=exit.x*T+T/2, ey=exit.y*T+T/2; const open=studied.size===levels[level].clues.length; ctx.fillStyle=open?'#5fe8c7':'#b2a2c3'; ctx.shadowColor=open?'#64ffe6':'transparent'; ctx.shadowBlur=open?18:0; roundRect(ctx,ex-16,ey-16,32,32,8,true,false); ctx.shadowBlur=0; ctx.fillStyle='#fff'; ctx.font='bold 22px Nunito'; ctx.fillText('⇥',ex,ey+8);
 // enemies
 enemies.forEach((e,i)=>drawVirus(e.x*T+T/2,e.y*T+T/2,now,i));
 // player
 drawPlayer(player.x*T+T/2,player.y*T+T/2,now);
}
function drawCellBackground(now){ const tt=now/1000; ctx.beginPath(); ctx.ellipse(CANVAS_W*0.48,CANVAS_H*0.5,430,260,0,0,Math.PI*2); ctx.fillStyle='rgba(255,233,245,.88)'; ctx.fill(); ctx.lineWidth=22; ctx.strokeStyle='rgba(212,96,161,.85)'; ctx.stroke(); ctx.lineWidth=6; ctx.strokeStyle='rgba(255,255,255,.85)'; ctx.stroke(); ctx.beginPath(); ctx.ellipse(760,290,105,95,0,0,Math.PI*2); ctx.fillStyle='rgba(153,109,213,.8)'; ctx.fill(); ctx.lineWidth=8; ctx.strokeStyle='rgba(92,55,155,.9)'; ctx.stroke(); [[170,150],[320,520],[770,500],[600,150]].forEach(([x,y],i)=>drawMito(x,y,0.3*i)); for(let i=0;i<24;i++){ const x=(i*71+55)%CANVAS_W,y=(i*89+35)%CANVAS_H; ctx.beginPath(); ctx.arc(x,y,3+Math.sin(tt+i)*1.2,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,.5)'; ctx.fill(); }}
function drawTissueBackground(now){ for(let r=0;r<7;r++) for(let c=0;c<10;c++){ const x=80+c*95+(r%2)*20,y=65+r*86; ctx.save(); ctx.translate(x,y); ctx.rotate((c+r)%3*.12); ctx.beginPath(); ctx.ellipse(0,0,36,27,0,0,Math.PI*2); ctx.fillStyle='rgba(247,170,197,.55)'; ctx.fill(); ctx.lineWidth=3; ctx.strokeStyle='rgba(195,100,145,.45)'; ctx.stroke(); ctx.beginPath(); ctx.arc(2,0,8,0,Math.PI*2); ctx.fillStyle='rgba(129,97,174,.55)'; ctx.fill(); ctx.restore(); } }
function drawLabBackground(now){ for(let i=0;i<8;i++){ const x=70+i*115; ctx.fillStyle='rgba(255,255,255,.35)'; roundRect(ctx,x,42,70,560,18,true,false); ctx.strokeStyle='rgba(75,174,196,.35)'; ctx.lineWidth=4; roundRect(ctx,x,42,70,560,18,false,true); } }
function drawFinalBackground(now){ for(let i=0;i<10;i++){ const x=(i%5)*180+90, y=Math.floor(i/5)*220+120; ctx.beginPath(); ctx.arc(x,y,74,0,Math.PI*2); ctx.fillStyle='rgba(255,243,198,.4)'; ctx.fill(); } }
function drawMito(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0,0,54,24,0,0,Math.PI*2); ctx.fillStyle='rgba(237,176,98,.88)'; ctx.fill(); ctx.lineWidth=5; ctx.strokeStyle='rgba(173,104,54,.9)'; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-36,0); for(let i=0;i<6;i++) ctx.lineTo(-36+i*14, i%2? -10: 10); ctx.strokeStyle='rgba(160,92,45,.9)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); }
function drawVirus(cx,cy,now,i){ ctx.save(); const bob=Math.sin(now/180+i)*2; ctx.translate(cx,cy+bob); for(let j=0;j<10;j++){ const a=j*Math.PI*2/10; ctx.strokeStyle='#edb3e5'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(Math.cos(a)*12,Math.sin(a)*12); ctx.lineTo(Math.cos(a)*18,Math.sin(a)*18); ctx.stroke(); } ctx.beginPath(); ctx.arc(0,0,13,0,Math.PI*2); ctx.fillStyle='#9f5fc9'; ctx.shadowColor='#eca6ef'; ctx.shadowBlur=12; ctx.fill(); ctx.shadowBlur=0; ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(-5,-3,3.3,0,Math.PI*2); ctx.arc(5,-3,3.3,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#2b1a42'; ctx.beginPath(); ctx.arc(-4,-3,1.5,0,Math.PI*2); ctx.arc(6,-3,1.5,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#5a287e'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,4,5,0,Math.PI); ctx.stroke(); ctx.restore(); }
function drawPlayer(cx,cy,now){ if(performance.now()<invulnUntil && Math.floor(performance.now()/130)%2===0) return; ctx.save(); ctx.translate(cx,cy+Math.sin(now/250)*1.2); ctx.beginPath(); ctx.arc(0,0,15,0,Math.PI*2); ctx.fillStyle=faces[chosen].suit; ctx.shadowColor='#ffffff'; ctx.shadowBlur=10; ctx.fill(); ctx.shadowBlur=0; ctx.beginPath(); ctx.arc(0,-5,10.5,0,Math.PI*2); ctx.fillStyle=faces[chosen].skin; ctx.fill(); ctx.fillStyle='#2e244a'; ctx.beginPath(); ctx.arc(-4,-6,1.8,0,Math.PI*2); ctx.arc(4,-6,1.8,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#ae5677'; ctx.beginPath(); ctx.arc(0,-2,4,0,Math.PI); ctx.stroke(); if(chosen==='scientist'){ ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.strokeRect(-12,4,24,8);} if(chosen==='robot'){ ctx.fillStyle='#839db0'; ctx.fillRect(-10,-14,20,4);} if(chosen==='creature'){ ctx.fillStyle='#be8af3'; ctx.beginPath(); ctx.arc(-10,-13,5,0,Math.PI*2); ctx.arc(10,-13,5,0,Math.PI*2); ctx.fill(); } ctx.restore(); }
function roundRect(c,x,y,w,h,r,fill,stroke){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); if(fill)c.fill(); if(stroke)c.stroke(); }
function loop(now){ if(!window._last) window._last=now; const dt=Math.min(60,now-window._last); window._last=now; if(!paused && !overlay){ roundTime += dt; enemyTick += dt; if(enemyTick > levels[level].enemyDelay){ enemyTick=0; advanceEnemies(); } } draw(now); if(speechUntil && now>speechUntil){ ui.speech.hidden=true; speechUntil=0; } requestAnimationFrame(loop); }
function input(dir){ const m={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[dir]; if(m) move(m[0],m[1]); }
let lastKey=0; window.addEventListener('keydown',e=>{ const k=e.key.toLowerCase(); const map={arrowup:'up',w:'up',arrowdown:'down',s:'down',arrowleft:'left',a:'left',arrowright:'right',d:'right'}; if(map[k]){ e.preventDefault(); if(performance.now()-lastKey>80){ input(map[k]); lastKey=performance.now(); } } else if(e.key==='Escape' && !overlay){ paused=!paused; $('#pause').textContent=paused?'Resume':'Pause'; } }); document.querySelectorAll('[data-dir]').forEach(btn=>btn.onclick=()=>input(btn.dataset.dir)); $('#help').onclick=help; $('#pause').onclick=()=>{ if(overlay)return; paused=!paused; $('#pause').textContent=paused?'Resume':'Pause'; };
buildLevel(); paused=true; chooseCharacter(); requestAnimationFrame(loop);
})();
