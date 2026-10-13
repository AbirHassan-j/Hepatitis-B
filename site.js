const ROOT='';
const pages=[['index.html','Mission Control','⌂'],['cells.html','Explore a Cell','◉'],['invasion.html','Virus Invasion','⚡'],['microscope.html','Tissue Detective','⌕'],['lab.html','Rescue Lab','⚗'],['finale.html','Final Challenge','★']];
const pic={virus:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hepatitis%20B%20virus%2001.jpg?width=1100',colorvirus:'https://upload.wikimedia.org/wikipedia/commons/f/ff/Hepatitis_b.jpg',healthy:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Liver-H%26E.jpg',infected:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hepatits%20B%20ground%20glass%20H%26E.jpg?width=1100',ground:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ground%20glass%20hepatocytes%20high%20mag%20cropped.jpg?width=1000',cell:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hepatocyte.svg?width=800'};
const fallback=(id)=>`<div class="img-fallback">📷 Image couldn't load on this network. <a target="_blank" rel="noopener" href="${pic[id]}">View scientific image source ↗</a></div>`;
const img=(id,alt,cls='')=>`<img class="${cls}" src="${pic[id]}" alt="${alt}" loading="lazy" onerror="this.outerHTML=${JSON.stringify('REPLACE')}" data-pic="${id}">`.replace('this.outerHTML="REPLACE"',`this.outerHTML=document.getElementById('fallback-${id}').innerHTML`);
const image=(id,alt,cls='')=>`<div class="photo ${cls}"><img src="${pic[id]}" alt="${alt}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="image-error" style="display:none">Image blocked? <a href="${pic[id]}" target="_blank" rel="noopener">Open the original ↗</a></div></div>`;
let stored={};try{stored=JSON.parse(localStorage.getItem('liver_rescue')||'{}')}catch(e){};
function save(k,v=true){stored[k]=v;try{localStorage.setItem('liver_rescue',JSON.stringify(stored))}catch(e){} updateProgress()}
function updateProgress(){const done=['cells','invasion','microscope','lab','finale'].filter(x=>stored[x]).length;document.querySelectorAll('.progress-fill').forEach(e=>e.style.width=done/5*100+'%');document.querySelectorAll('.progress-num').forEach(e=>e.textContent=done+'/5 missions');document.querySelectorAll('[data-complete]').forEach(e=>{if(stored[e.dataset.complete])e.classList.add('done')})}
function shell(title,subtitle,body,key){const current=location.pathname.split('/').pop()||'index.html';document.title=title+' | Mission Liver Rescue';document.querySelector('#app').innerHTML=`<div class="site"><header class="topbar"><a class="logo" href="index.html"><span class="logo-icon">✚</span> LIVER<span class="accent">QUEST</span><small>HEPATITIS B</small></a><nav aria-label="Main navigation">${pages.map(([url,label,ico],i)=>`<a class="${current===url?'active':''}" href="${url}">${ico} <span>${label}</span></a>`).join('')}</nav><div class="top-progress"><strong class="progress-num">0/5 missions</strong><div class="progress-track"><div class="progress-fill"></div></div></div></header><main><div class="pagehead"><div class="eyebrow">⚕ THE LIVER RESCUE ACADEMY · ${key||'MISSION HQ'}</div><h1>${title}</h1><p>${subtitle}</p></div>${body}</main><footer><strong>✚ LIVERQUEST</strong><span>For Grade 7–8 explorers · No accounts, chatbot, or tracking</span><a href="credits.html">Images & science sources ↗</a></footer></div>`;updateProgress()}
function goNext(url,key){if(key)save(key);location.href=url}
function toast(msg){let e=document.getElementById('toast');if(!e){e=document.createElement('div');e.id='toast';e.className='toast';document.body.append(e)}e.textContent=msg;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2600)}
function initHome(){shell('Your mission: save the liver.','A tiny virus has entered the body. Can YOU discover what happens inside liver cells and help the science team?',`<section class="hero-grid"><div class="hero-copy"><div class="pill">🕹 INTERACTIVE SCIENCE ADVENTURE</div><h2>SMALL VIRUS.<br><em>BIG MYSTERY.</em></h2><p>Explore real microscope pictures, investigate cells, run experiments, and earn your Science Defender badge.</p><a class="btn primary" href="cells.html">▶ START THE ADVENTURE <span>→</span></a><div class="hero-meta">⏱ About 15 minutes <b>·</b> 5 interactive missions <b>·</b> Ages 12–14</div></div><div class="hero-photo">${image('colorvirus','Color-enhanced real electron micrograph of hepatitis B particles')}<div class="floating-label">🔬 REAL VIRUS<br><small>Seen through an electron microscope</small></div></div></section><section class="section"><div class="sectionline"><div><div class="eyebrow">THE ADVENTURE MAP</div><h2>5 missions. One big discovery.</h2></div><span class="chip">Complete them in order →</span></div><div class="mission-grid">${[['01','cells.html','🧫','CELL CITY','Discover the liver’s microscopic workers.'],['02','invasion.html','🦠','THE INVASION','See how hepatitis B enters liver cells.'],['03','microscope.html','🔬','MICROSCOPE FILES','Investigate real healthy and infected tissue.'],['04','lab.html','⚗️','RESCUE LAB','Change the experiment and test prevention.'],['05','finale.html','🏆','FINAL SHOWDOWN','Prove your skills and earn a badge.']].map(([num,url,ico,name,desc],i)=>`<a class="mission-card" data-complete="${['cells','invasion','microscope','lab','finale'][i]}" href="${url}"><span class="mission-no">MISSION ${num}</span><span class="mission-icon">${ico}</span><h3>${name}</h3><p>${desc}</p><span class="card-arrow">↗</span></a>`).join('')}</div></section><section class="fact-banner"><div><span class="eyebrow">DID YOU KNOW?</span><h2>Your liver is a 24/7 super-helper.</h2><p>It processes nutrients, makes bile to help digest fats, and helps remove harmful substances. Hepatitis B can interfere with its important work.</p></div><div class="fact-figure">🩸 <span>→</span> 🫀 <span>→</span> ✨<small>Blood → liver → body support</small></div></section>`,'WELCOME')}
function initCells(){shell('Mission 01: Cell City','Meet the tiny parts that keep your liver working. Tap each hotspot, then complete your cell-building challenge.',`<section class="two-col"><div class="panel"><div class="panel-title"><span>🔎</span><div><strong>EXPLORE A LIVER CELL</strong><small>Tap all four glowing hotspots</small></div></div><div class="cell-stage"><div class="cell-body"><div class="cytoplasm"></div><button class="hotspot nucleus" data-part="nucleus" aria-label="Explore the nucleus">1</button><button class="hotspot membrane" data-part="membrane" aria-label="Explore the cell membrane">2</button><button class="hotspot mitochondria" data-part="mitochondria" aria-label="Explore mitochondria">3</button><button class="hotspot cyto" data-part="cyto" aria-label="Explore cytoplasm">4</button><span class="cell-nucleus"></span><span class="mito m1"></span><span class="mito m2"></span><span class="mito m3"></span></div></div><div class="micro-caption">Stylized hotspot activity · <a href="${pic.cell}" target="_blank" rel="noopener">See a real scientific hepatocyte illustration ↗</a></div></div><div class="panel info-panel"><div class="pill">CELL PARTS FIELD GUIDE</div><h2 id="part-title">👆 Choose a glowing number!</h2><p id="part-desc">Explore all four cell parts to learn how they help a real liver cell work.</p><div class="discovery-count" id="discovery">0 of 4 discovered</div>${image('cell','Scientific illustrated hepatocyte showing internal structures','mini-science')}<div class="caption">Real scientific cell illustration · NIAID BioArt, public domain</div></div></section><section class="panel challenge"><div class="sectionline"><div><div class="eyebrow">⚙️ BUILD-A-CELL CHALLENGE</div><h2>Match each part to its superpower</h2></div><span class="chip">+ 4 correct answers</span></div><div id="match-game" class="match-game"></div><p id="match-feedback" class="feedback" role="status">Select a cell part, then pick what it does!</p><button id="cell-next" class="btn primary" disabled>COMPLETE MISSION →</button></section>`,'01 / CELL EXPLORATION');const parts={nucleus:['🧠 Nucleus','The instruction centre. It stores DNA, the cell’s instruction book. Hepatitis B brings viral DNA into the nucleus, where the virus creates a long-lasting DNA template.'],membrane:['🛡️ Cell membrane','The protective outer boundary. It controls what enters and leaves. Hepatitis B first attaches to a special doorway on a liver cell’s membrane.'],mitochondria:['⚡ Mitochondria','The cell’s energy stations. They help make usable energy so liver cells can do their jobs.'],cyto:['🫧 Cytoplasm','The jelly-like space inside the membrane. It holds cell structures, and many chemical reactions happen here.']};let seen=new Set();document.querySelectorAll('.hotspot').forEach(b=>b.onclick=()=>{let p=b.dataset.part;seen.add(p);b.classList.add('visited');document.getElementById('part-title').textContent=parts[p][0];document.getElementById('part-desc').textContent=parts[p][1];document.getElementById('discovery').textContent=`${seen.size} of 4 discovered`;if(seen.size===4)toast('🔓 All cell parts discovered!')});let items=[['Nucleus','Stores DNA instructions'],['Cell membrane','Controls entry and exit'],['Mitochondria','Helps supply cell energy'],['Cytoplasm','Jelly-like space for cell activity']];let selected='',completed=new Set();document.getElementById('match-game').innerHTML=`<div>${items.map(x=>`<button class="match-choice" data-name="${x[0]}">${x[0]}</button>`).join('')}</div><div>${[items[2],items[0],items[3],items[1]].map(x=>`<button class="match-target" data-target="${x[0]}">${x[1]}</button>`).join('')}</div>`;document.querySelectorAll('.match-choice').forEach(b=>b.onclick=()=>{if(completed.has(b.dataset.name))return;selected=b.dataset.name;document.querySelectorAll('.match-choice').forEach(x=>x.classList.toggle('selected',x===b))});document.querySelectorAll('.match-target').forEach(b=>b.onclick=()=>{if(!selected||completed.has(b.dataset.target))return;if(selected===b.dataset.target){completed.add(selected);b.classList.add('correct');document.querySelector(`[data-name="${selected}"]`).classList.add('correct');document.getElementById('match-feedback').textContent=`✅ ${completed.size}/4 correct!`;selected='';if(completed.size===4){document.getElementById('cell-next').disabled=false;toast('🏅 Mission complete!')}}else{document.getElementById('match-feedback').textContent='Not quite! Try another cell superpower.'}});document.getElementById('cell-next').onclick=()=>goNext('invasion.html','cells')}
function initInvasion(){shell('Mission 02: Virus Invasion','Follow hepatitis B through a liver cell and stop for mini-checkpoints along the way.',`<section class="two-col"><div class="panel"><div class="panel-title"><span>🦠</span><div><strong>MEET THE REAL HEPATITIS B VIRUS</strong><small>An electron microscope captures particles too small to see with your eyes.</small></div></div>${image('virus','Real black and white electron micrograph of hepatitis B virus particles','large-photo')}<div class="caption">Real virus micrograph: CDC / Dr. Erskine Palmer, public domain.</div></div><div class="panel info-panel"><span class="pill">THE VILLAIN FILE</span><h2>What is hepatitis B?</h2><p>Hepatitis B is an infection caused by a virus called <strong>HBV</strong>. It targets the <strong>liver</strong>. Sometimes the immune system clears the infection. Other times it lasts for years and can harm liver tissue.</p><div class="callout"><b>IMPORTANT TWIST!</b><p>Much of the liver damage happens when the body’s immune defenders attack infected liver cells. The virus enters and uses the cells, while the immune response can cause inflammation.</p></div><p class="tiny">Hepatitis B does <strong>not</strong> spread through hugging, sharing food, or casual contact.</p></div></section><section class="panel challenge"><div class="sectionline"><div><div class="eyebrow">🎮 INTERACTIVE STORY</div><h2>Follow the virus: 5 steps</h2></div><span class="chip" id="step-label">STEP 1 / 5</span></div><div class="story-stage"><div class="story-art" id="story-art"></div><div><h3 id="story-title"></h3><p id="story-text"></p><div class="story-feedback" id="story-feedback"></div><button id="story-next" class="btn primary">NEXT STEP →</button></div></div></section>`,'02 / MICROSCOPIC INVASION');let steps=[['🦠 ➜ 🛡️','Step 1: Find the doorway','HBV travels through blood and can attach to a special doorway on liver cells. It does not infect every cell in the body.'],['🛡️ ➜ 🧫','Step 2: Enter the cell','The virus enters a liver cell, releases its contents, and sends its DNA toward the nucleus.'],['🧬 ➜ 🏭','Step 3: Copy the instructions','Inside the nucleus, viral DNA forms a stable template. The cell machinery helps make more viral parts.'],['🏭 ➜ 🦠 🦠','Step 4: More viruses appear','New virus particles are put together and can leave the cell to infect more liver cells.'],['🛡️ ⚔️ 🔥','Step 5: Immune defenders arrive','Immune cells recognize infected liver cells. Their attack and inflammation can injure liver tissue. Long-term injury may cause scarring.']];let step=0;function draw(){document.getElementById('story-art').textContent=steps[step][0];document.getElementById('story-title').textContent=steps[step][1];document.getElementById('story-text').textContent=steps[step][2];document.getElementById('step-label').textContent=`STEP ${step+1} / 5`;document.getElementById('story-next').textContent=step===4?'FINISH MISSION →':'NEXT STEP →'}draw();document.getElementById('story-next').onclick=()=>{if(step===4)goNext('microscope.html','invasion');else{step++;draw()}}}
function initMicroscope(){shell('Mission 03: Tissue Detective','Put your detective hat on. Examine REAL microscope photographs and find what hepatitis B can change in liver cells.',`<section class="panel challenge"><div class="sectionline"><div><div class="eyebrow">🔬 REAL MICROSCOPY LAB</div><h2>Spot the difference</h2></div><span class="chip">REAL HISTOLOGY PHOTOGRAPHS</span></div><p>Histology means looking closely at tissues. Both pictures below show real liver cells stained for viewing with a microscope. Tap each one to inspect it.</p><div class="tissue-grid"><button class="tissue-photo" data-tissue="healthy">${image('healthy','Microscope photograph of healthy liver tissue showing pink cytoplasm and purple cell nuclei')}<strong>SPECIMEN A</strong><span>Tap to inspect →</span></button><button class="tissue-photo" data-tissue="infected">${image('infected','Real microscope photograph showing ground glass liver cells associated with hepatitis B')}<strong>SPECIMEN B</strong><span>Tap to inspect →</span></button></div><div id="specimen-report" class="report">🔎 Select either specimen to read your detective report.</div><div class="quiz-mini"><h3>Detective question: Which photograph is from a liver with hepatitis B-associated cell changes?</h3><div class="answer-row"><button class="answer" data-correct="false">SPECIMEN A</button><button class="answer" data-correct="true">SPECIMEN B</button></div><p class="feedback" id="tissue-answer" role="status"></p></div><div class="divider-line"></div><h3>Zoom further: Ground-glass cells</h3><div class="two-col compact">${image('ground','High magnification image of ground glass hepatocytes in chronic hepatitis B')}<div><p>Some hepatitis B-infected liver cells have a <strong>smooth, cloudy-looking cytoplasm</strong> under the microscope. This is called a <em>ground-glass</em> appearance. It can happen when hepatitis B surface proteins build up inside the cell.</p><p>This is a specific clue scientists may see, but not every infected liver cell looks like this.</p><div class="callout"><b>CELLS → TISSUES → ORGANS → SYSTEMS</b><p>Many liver cells form liver tissue. Different tissues build the liver, an organ. The liver works with organs in your digestive system and supports many other body functions.</p></div></div></div><button id="tissue-next" class="btn primary" disabled>CONTINUE TO RESCUE LAB →</button></section>`,'03 / TISSUE INVESTIGATION');document.querySelectorAll('[data-tissue]').forEach(b=>b.onclick=()=>{document.getElementById('specimen-report').innerHTML=b.dataset.tissue==='healthy'?'🟢 <strong>Specimen A:</strong> Healthy-looking liver cells. You can see dark purple nuclei and pink cytoplasm. This shows what liver tissue can look like without the pictured hepatitis B changes.':'🟠 <strong>Specimen B:</strong> A hepatitis B liver sample. Some cells have cloudy, ground-glass cytoplasm linked to a buildup of viral surface proteins.';document.querySelectorAll('[data-tissue]').forEach(x=>x.classList.toggle('selected',x===b))});document.querySelectorAll('[data-correct]').forEach(b=>b.onclick=()=>{const good=b.dataset.correct==='true';document.getElementById('tissue-answer').textContent=good?'✅ Exactly! Ground-glass changes can be a clue of hepatitis B.':'↻ Not quite. Look for the picture with cloudy-looking liver cells.';if(good)document.getElementById('tissue-next').disabled=false});document.getElementById('tissue-next').onclick=()=>goNext('lab.html','microscope')}
function initLab(){shell('Mission 04: The Rescue Lab','Run safe virtual experiments: investigate tissue injury, then decide how to protect people from hepatitis B.',`<section class="two-col"><div class="panel"><span class="pill">EXPERIMENT 01 · TISSUE TIME MACHINE</span><h2>What happens when inflammation continues?</h2><p>Move the slider to explore a <strong>simplified illustration</strong> of liver tissue over time.</p><label class="slider-label" for="damage">Duration of repeated liver injury: <strong id="damage-text">Low</strong></label><input id="damage" type="range" min="0" max="3" step="1" value="0"><div class="stages"><span>Lower</span><span>Higher</span></div><div class="tissue-sim" id="tissue-sim"></div><p class="feedback" id="damage-caption">Many healthy liver cells can keep working.</p><p class="tiny">Model only: scarring does not happen on a fixed timeline. Not everyone with hepatitis B develops it, and medical care can reduce risks.</p></div><div class="panel"><span class="pill">EXPERIMENT 02 · TRANSMISSION MYTHBUSTERS</span><h2>How can hepatitis B spread?</h2><p>Choose <b>CAN SPREAD</b> or <b>DOES NOT SPREAD</b> for each card.</p><div id="myth-cards"></div><p id="myth-status" class="feedback" role="status">0/5 investigated</p></div></section><section class="panel challenge"><div class="sectionline"><div><div class="eyebrow">🛡️ THE PROTECTION POWER-UP</div><h2>Pick a real-world defence</h2></div></div><div class="choices"><button class="defence" data-def="vaccine">💉<br><b>Hepatitis B vaccine</b></button><button class="defence" data-def="hug">🤗<br><b>Avoid hugging friends</b></button><button class="defence" data-def="guess">🎲<br><b>Wait for obvious symptoms</b></button></div><p class="feedback" id="defence-feedback">Select one defence to learn why it works.</p><button class="btn primary" id="lab-next" disabled>FINAL MISSION →</button></section>`,'04 / SCIENCE EXPERIMENTS');const damage=document.getElementById('damage');function renderDamage(){let n=+damage.value,labels=['Low','Mild','Repeated','Advanced'],captions=['Healthy-looking tissue: many liver cells do their important jobs.','Inflammation can bring immune cells into liver tissue and injure cells.','With ongoing injury, the body can lay down scar tissue called fibrosis.','Extensive scarring, called cirrhosis, can make the liver less able to work normally.'];document.getElementById('damage-text').textContent=labels[n];document.getElementById('damage-caption').textContent=captions[n];document.getElementById('tissue-sim').innerHTML=`<div class="sim-cells">${Array.from({length:28},(_,i)=>`<span class="sim-cell ${i< n*6?'affected':''}" style="--rot:${(i%5)*14-25}deg">${i<n*6?'✕':'•'}</span>`).join('')}</div><div class="scar scar-${n}"></div>`}damage.oninput=renderDamage;renderDamage();const questions=[['Sharing a hug','no','Hugging and casual contact do not spread hepatitis B.'],['Blood entering an open wound','yes','Infected blood entering another person’s body can spread hepatitis B.'],['Sharing food at lunch','no','Hepatitis B does not spread by sharing food or utensils.'],['Sharing a used needle','yes','Used needles can carry infected blood, which can transmit hepatitis B.'],['From parent to baby during birth','yes','Hepatitis B can pass from a parent with the infection to a baby during birth.']];let answered=new Set();document.getElementById('myth-cards').innerHTML=questions.map((q,i)=>`<div class="myth"><span>${i+1}. ${q[0]}</span><div><button data-ans="yes" data-idx="${i}">CAN</button><button data-ans="no" data-idx="${i}">CANNOT</button></div><small id="myth-note-${i}" class="myth-note"></small></div>`).join('');document.querySelectorAll('[data-ans]').forEach(b=>b.onclick=()=>{let i=+b.dataset.idx,q=questions[i],good=b.dataset.ans===q[1];document.getElementById('myth-note-'+i).textContent=(good?'✅ ':'↻ ')+q[2];if(good){answered.add(i);b.closest('.myth').classList.add('solved')}document.getElementById('myth-status').textContent=`${answered.size}/5 investigated correctly`;checkLab()});let def=false;document.querySelectorAll('[data-def]').forEach(b=>b.onclick=()=>{def=b.dataset.def==='vaccine';document.getElementById('defence-feedback').textContent=def?'✅ Yes! The vaccine trains your immune system to protect you before exposure. Doctors also use testing and antiviral medicines to manage chronic hepatitis B.':b.dataset.def==='hug'?'❌ Hugs are safe. Hepatitis B is not spread through casual contact.':'❌ People can have hepatitis B without symptoms. Testing matters.';checkLab()});function checkLab(){document.getElementById('lab-next').disabled=!(answered.size===5&&def)}document.getElementById('lab-next').onclick=()=>goNext('finale.html','lab')}
function initFinale(){shell('Mission 05: Final Showdown','One last challenge! Answer five questions, see your score, and claim your Science Defender badge.',`<section class="final-layout"><div class="panel challenge"><div class="sectionline"><div><div class="eyebrow">🏁 THE FINAL BOSS</div><h2>Can you save Cell City?</h2></div><span class="chip" id="quiz-progress">QUESTION 1 / 5</span></div><div id="quiz-area"></div><div id="quiz-result" aria-live="polite"></div></div><div class="panel badge-panel"><div class="badge-emblem">✚<span>SCIENCE<br>DEFENDER</span>★</div><h3>YOUR DEFENDER BADGE</h3><p id="badge-text">Finish the challenge to unlock your badge.</p><div class="badges-earned"><b>Adventure progress</b><div class="progress-track"><div class="progress-fill"></div></div><span class="progress-num"></span></div></div></section>`,'05 / FINAL CHALLENGE');const Q=[['Which organ does hepatitis B mainly infect?',['Heart','Liver','Brain'],1,'HBV targets the liver.'],['Which cell part stores the cell’s DNA?',['Nucleus','Membrane','Mitochondria'],0,'The nucleus holds the cell’s genetic instructions.'],['What can cause much of the liver cell injury in hepatitis B?',['Your immune response attacking infected cells','Hugging a classmate','Eating bread'],0,'The immune response can damage infected liver cells and cause inflammation.'],['What can long-term liver injury sometimes lead to?',['Scar tissue','Extra bones','Green blood'],0,'Repeated injury can lead to fibrosis and, in some cases, cirrhosis.'],['What helps prevent hepatitis B?',['Sharing used needles','Vaccination','Waiting until you feel sick'],1,'Vaccination helps prevent hepatitis B.']];let i=0,score=0;function display(){if(i>=Q.length){save('finale');document.getElementById('quiz-area').innerHTML=`<div class="result-emoji">${score===5?'🏆':'🎉'}</div><h2>MISSION COMPLETE!</h2><p>You earned <strong>${score}/5</strong> correct answers. ${score===5?'A perfect score — incredible investigation!':'Every scientific mystery teaches us something. Try again to improve your score!'}</p><button class="btn primary" id="again">PLAY AGAIN ↺</button> <a class="btn secondary" href="index.html">MISSION MAP →</a>`;document.getElementById('quiz-progress').textContent='MISSION FINISHED';document.getElementById('badge-text').textContent=`UNLOCKED! Science Defender — ${score}/5 answers correct!`;document.getElementById('again').onclick=()=>{i=0;score=0;display()};return}let q=Q[i];document.getElementById('quiz-progress').textContent=`QUESTION ${i+1} / 5`;document.getElementById('quiz-area').innerHTML=`<h3 class="question">${q[0]}</h3><div class="quiz-options">${q[1].map((a,j)=>`<button class="quiz-option" data-qanswer="${j}"><span>${'ABC'[j]}</span>${a}</button>`).join('')}</div><p class="feedback" id="q-feedback" role="status">Choose the best answer.</p><button class="btn primary" id="q-next" disabled>${i===4?'SEE MY RESULTS →':'NEXT QUESTION →'}</button>`;document.querySelectorAll('[data-qanswer]').forEach(b=>b.onclick=()=>{if(document.getElementById('q-next').disabled===false)return;const good=+b.dataset.qanswer===q[2];if(good)score++;b.classList.add(good?'correct':'wrong');document.querySelectorAll('[data-qanswer]').forEach(x=>{x.disabled=true;if(+x.dataset.qanswer===q[2])x.classList.add('correct')});document.getElementById('q-feedback').textContent=(good?'✅ Nice work! ':'💡 Not quite. ')+q[3];document.getElementById('q-next').disabled=false});document.getElementById('q-next').onclick=()=>{i++;display()}}display()}
function initCredits(){shell('Behind the Science','Every real microscopic image has a source. Follow these links for credits, reuse rules, and further reading.',`<section class="panel challenge"><h2>Real scientific images used in this adventure</h2><p>All image URLs are from Wikimedia Commons. Please keep these credits visible on your published site and check each license before redistribution.</p><div class="credit-list"><p><b>Virus electron micrograph:</b> CDC / Dr. Erskine Palmer (public domain). <a target="_blank" href="https://commons.wikimedia.org/wiki/File:Hepatitis_B_virus_01.jpg">Original and license ↗</a></p><p><b>Colorized virus micrograph:</b> NIAID/CDC, Wikimedia Commons. <a target="_blank" href="https://commons.wikimedia.org/wiki/File:Hepatitis_b.jpg">Original and license ↗</a></p><p><b>Healthy liver cells:</b> Paulo Abrahamsohn. <a target="_blank" href="https://commons.wikimedia.org/wiki/File:Liver-H%26E.jpg">Original and license ↗</a></p><p><b>Hepatitis B ground-glass histology:</b> Mark ong (CC BY-SA 4.0). <a target="_blank" href="https://commons.wikimedia.org/wiki/File:Hepatits_B_ground_glass_H%26E.jpg">Original and license ↗</a></p><p><b>High magnification ground-glass cells:</b> Nephron (CC BY-SA 3.0). <a target="_blank" href="https://commons.wikimedia.org/wiki/File:Ground_glass_hepatocytes_high_mag_cropped.jpg">Original and license ↗</a></p><p><b>Hepatocyte illustration:</b> NIAID BioArt (public domain). <a target="_blank" href="https://commons.wikimedia.org/wiki/File:Hepatocyte.svg">Original and license ↗</a></p></div><h2>Science fact-check sources</h2><div class="credit-list"><p><a target="_blank" href="https://www.cdc.gov/hepatitis-b/hcp/clinical-overview/">CDC — Clinical Overview of Hepatitis B ↗</a></p><p><a target="_blank" href="https://www.niddk.nih.gov/health-information/liver-disease/viral-hepatitis/hepatitis-b">NIDDK — Hepatitis B ↗</a></p><p><a target="_blank" href="https://www.niddk.nih.gov/health-information/liver-disease/cirrhosis">NIDDK — Cirrhosis ↗</a></p></div><div class="callout"><strong>A note about the simulation</strong><p>Our simulated tissue is a teaching model, not a medical prediction or diagnostic tool. Real changes depend on many factors, and actual diagnosis requires a clinician.</p></div></section>`,'IMAGE & RESEARCH CREDITS')}
const entry=(location.pathname.split('/').pop()||'index.html');({ 'index.html':initHome,'cells.html':initCells,'invasion.html':initInvasion,'microscope.html':initMicroscope,'lab.html':initLab,'finale.html':initFinale,'credits.html':initCredits}[entry]||initHome)();

/* =========================================
   LIVERQUEST: CELL CITY + TISSUE UPGRADE
   Paste at the END of site.js
   ========================================= */

(function upgradeLiverQuest() {

  // These are real illustrations hosted by Wikimedia Commons.
  // You can download them locally later for school compatibility.

  const scientificImages = {
    detailedCell:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Animal_cell_structure_en.svg",

    simpleCell:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Simple_diagram_of_animal_cell_(en).svg",

    liver:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_Liver_(NIH_BioArt_230).svg"
  };

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  // =====================================
  // MISSION 01: IMPROVED CELL CITY
  // =====================================

  if (currentPage === "cells.html") {

    const oldCellStage = document.querySelector(".cell-stage");

    if (oldCellStage) {

      oldCellStage.outerHTML = `
        <div class="cell-city-visual">

          <img
            src="${scientificImages.detailedCell}"
            alt="Detailed scientific animal cell illustration
            showing the nucleus, mitochondria,
            cytoplasm, membrane, and other parts."
            loading="eager"
          >

          <p class="cell-city-caption">
            🔬 This is a detailed model of an animal cell.
            Liver cells have many of these same parts.
          </p>

          <h3>🏙️ Explore Cell City!</h3>

          <p>
            Imagine that each cell is a tiny city.
            Tap each location to find out what it does!
          </p>

          <div class="cell-part-buttons">

            <button data-city="nucleus">
              🧠 City Hall
              <br>
              <small>Nucleus</small>
            </button>

            <button data-city="membrane">
              🚪 City Gates
              <br>
              <small>Cell membrane</small>
            </button>

            <button data-city="mitochondria">
              ⚡ Power Stations
              <br>
              <small>Mitochondria</small>
            </button>

            <button data-city="cyto">
              🌊 City Space
              <br>
              <small>Cytoplasm</small>
            </button>

          </div>

        </div>
      `;

      const cellInformation = {

        nucleus: {
          name: "🧠 City Hall: The Nucleus",
          description:
            "The nucleus holds DNA, which contains the cell's instructions. " +
            "When hepatitis B infects a liver cell, viral DNA enters " +
            "the nucleus and forms a template that helps the virus reproduce."
        },

        membrane: {
          name: "🚪 City Gates: Cell Membrane",
          description:
            "The membrane surrounds the cell and controls what enters " +
            "and leaves. Hepatitis B attaches to a special doorway " +
            "on a liver cell before entering."
        },

        mitochondria: {
          name: "⚡ Power Stations: Mitochondria",
          description:
            "Mitochondria help provide energy for the cell. " +
            "Liver cells need energy to perform important jobs, " +
            "such as processing nutrients."
        },

        cyto: {
          name: "🌊 City Space: Cytoplasm",
          description:
            "Cytoplasm is the jelly-like material inside the cell. " +
            "It surrounds the cell parts. Hepatitis B uses machinery " +
            "inside infected cells to help produce viral components."
        }

      };

      const explored = new Set();

      document.querySelectorAll("[data-city]").forEach(button => {

        button.addEventListener("click", () => {

          const key = button.dataset.city;
          const part = cellInformation[key];

          explored.add(key);

          button.classList.add("visited");

          document.getElementById("part-title").textContent =
            part.name;

          document.getElementById("part-desc").textContent =
            part.description;

          document.getElementById("discovery").textContent =
            explored.size + " of 4 discovered";

          if (explored.size === 4) {
            toast("🎉 Amazing! You explored all four parts!");
          }

        });

      });

      // Replace the small side illustration with an easier diagram.

      const smallIllustration =
        document.querySelector(".mini-science img");

      if (smallIllustration) {
        smallIllustration.src = scientificImages.simpleCell;
        smallIllustration.alt =
          "Simple labelled animal cell diagram showing four main cell parts.";
      }
    }
  }


  // =====================================
  // MISSION 03: KID-FRIENDLY TISSUE LAB
  // =====================================

  if (currentPage === "microscope.html") {

    const originalGrid = document.querySelector(".tissue-grid");

    if (originalGrid) {

      const introduction = document.createElement("section");

      introduction.innerHTML = `
        <div class="tissue-explainer">

          <h2>🍪 Think of liver tissue like a cookie!</h2>

          <p>
            Imagine one chocolate chip is a cell.
            Lots of chocolate chips together are like
            a group of cells making tissue.
            Different tissues work together to form
            an organ, such as your liver!
          </p>

        </div>

        <div class="tissue-grid">

          <div class="tissue-kid-card">

            <img
              src="${scientificImages.simpleCell}"
              alt="Simple animal cell diagram"
            >

            <h3>😊 Healthy Liver Cells</h3>

            <p>
              Healthy liver cells work together to
              process nutrients, make bile, and
              support the body.
            </p>

            <button data-easy="healthy">
              Explore Healthy Cells
            </button>

          </div>

          <div class="tissue-kid-card">

            <img
              src="${scientificImages.liver}"
              alt="Scientific illustration of a human liver"
            >

            <h3>🦠 Liver With Hepatitis B</h3>

            <p>
              Hepatitis B infects liver cells.
              The immune system responds, and
              inflammation can injure these cells.
            </p>

            <button data-easy="infected">
              Explore Hepatitis B
            </button>

          </div>

        </div>

        <div class="tissue-discovery"
             id="easy-tissue-feedback"
             aria-live="polite">

          🔎 Select one of the cards to begin investigating!

        </div>

        <div class="tissue-explainer">

          <h3>🧩 From Tiny Cells to Your Whole Body</h3>

          <p>
            🧫 Liver cells
            ➜ 🧩 Liver tissue
            ➜ 🫀 Liver organ
            ➜ 🧍 Body systems
          </p>

          <p>
            Hepatitis B starts by infecting liver cells.
            When many cells are affected, the liver tissue
            may become inflamed or damaged.
          </p>

        </div>
      `;

      originalGrid.before(introduction);

      // Make the more advanced REAL microscope images optional.
      // They remain available for curious students.

      const details = document.createElement("details");

      details.style.margin = "25px 0";
      details.style.padding = "20px";
      details.style.background = "#f5edff";
      details.style.borderRadius = "18px";
      details.style.border = "2px solid #dbc8fa";

      details.innerHTML = `
        <summary style="
          cursor:pointer;
          font-weight:800;
          color:#6841cf;
          font-size:1.1rem;
        ">
          🔬 BONUS: Open the REAL microscope pictures!
        </summary>

        <p style="margin-top:15px">
          Scientists colour thin slices of liver tissue
          pink and purple so they can see the cells.
          Look for the darker dots: many are cell nuclei!
        </p>
      `;

      originalGrid.before(details);
      details.appendChild(originalGrid);

      // Move the original specimen report into the bonus section.

      const report =
        document.getElementById("specimen-report");

      if (report) {
        details.appendChild(report);
      }

      // Keep original detective quiz available,
      // because it teaches about real histology.

      const oldQuestion =
        document.querySelector(".quiz-mini");

      if (oldQuestion) {
        details.appendChild(oldQuestion);
      }

      // Move the advanced magnification section into bonus too.

      const zoomTitle = [...document.querySelectorAll("h3")]
        .find(h => h.textContent.includes("Ground-glass cells"));

      if (zoomTitle) {
        const zoomSection = zoomTitle.nextElementSibling;
        details.appendChild(zoomTitle);

        if (zoomSection) {
          details.appendChild(zoomSection);
        }
      }

      // Beginner activity responses.

      document.querySelectorAll("[data-easy]")
        .forEach(button => {

          button.addEventListener("click", () => {

            const output =
              document.getElementById("easy-tissue-feedback");

            if (button.dataset.easy === "healthy") {

              output.innerHTML = `
                ✅ <strong>Healthy Tissue!</strong>
                <p>
                  Imagine a team where everybody is doing
                  their job. Healthy liver cells work together
                  to keep the liver working properly.
                </p>
              `;

            } else {

              output.innerHTML = `
                🦠 <strong>Hepatitis B Investigation!</strong>
                <p>
                  The virus enters liver cells and uses their
                  machinery. Immune defenders can then attack
                  infected cells. This may cause inflammation,
                  meaning the liver tissue becomes irritated
                  and some cells are injured.
                </p>
                <p>
                  Over a long time, repeated damage can sometimes
                  create scar tissue, making it harder for the
                  liver to work.
                </p>
              `;

            }

          });

        });

      // Explain how to unlock the next mission.

      const next = document.getElementById("tissue-next");

      if (next) {

        const help = document.createElement("p");

        help.textContent =
          "⭐ Extra challenge: Open the real microscope pictures " +
          "and solve the detective question to unlock the next mission.";

        next.before(help);

      }
    }
  }

})();

if (location.pathname.endsWith("microscope.html")) {
  const explored = new Set();

  document.querySelectorAll("[data-easy]").forEach(button => {
    button.addEventListener("click", () => {
      explored.add(button.dataset.easy);

      if (explored.size === 2) {
        const next = document.getElementById("tissue-next");

        if (next) {
          next.disabled = false;
        }

        const feedback =
          document.getElementById("easy-tissue-feedback");

        if (feedback) {
          feedback.insertAdjacentHTML(
            "beforeend",
            "<p>🏆 Great detective work! Both examples explored. You can now continue to the Rescue Lab!</p>"
          );
        }
      }
    });
  });
}

/* =========================================
   LIVERQUEST: CELL CITY + TISSUE UPGRADE
   Paste at the END of site.js
   ========================================= */

(function upgradeLiverQuest() {

  // These are real illustrations hosted by Wikimedia Commons.
  // You can download them locally later for school compatibility.

  const scientificImages = {
    detailedCell:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Animal_cell_structure_en.svg",

    simpleCell:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Simple_diagram_of_animal_cell_(en).svg",

    liver:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_Liver_(NIH_BioArt_230).svg"
  };

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  // =====================================
  // MISSION 01: IMPROVED CELL CITY
  // =====================================

  if (currentPage === "cells.html") {

    const oldCellStage = document.querySelector(".cell-stage");

    if (oldCellStage) {

      oldCellStage.outerHTML = `
        <div class="cell-city-visual">

          <img
            src="${scientificImages.detailedCell}"
            alt="Detailed scientific animal cell illustration
            showing the nucleus, mitochondria,
            cytoplasm, membrane, and other parts."
            loading="eager"
          >

          <p class="cell-city-caption">
            🔬 This is a detailed model of an animal cell.
            Liver cells have many of these same parts.
          </p>

          <h3>🏙️ Explore Cell City!</h3>

          <p>
            Imagine that each cell is a tiny city.
            Tap each location to find out what it does!
          </p>

          <div class="cell-part-buttons">

            <button data-city="nucleus">
              🧠 City Hall
              <br>
              <small>Nucleus</small>
            </button>

            <button data-city="membrane">
              🚪 City Gates
              <br>
              <small>Cell membrane</small>
            </button>

            <button data-city="mitochondria">
              ⚡ Power Stations
              <br>
              <small>Mitochondria</small>
            </button>

            <button data-city="cyto">
              🌊 City Space
              <br>
              <small>Cytoplasm</small>
            </button>

          </div>

        </div>
      `;

      const cellInformation = {

        nucleus: {
          name: "🧠 City Hall: The Nucleus",
          description:
            "The nucleus holds DNA, which contains the cell's instructions. " +
            "When hepatitis B infects a liver cell, viral DNA enters " +
            "the nucleus and forms a template that helps the virus reproduce."
        },

        membrane: {
          name: "🚪 City Gates: Cell Membrane",
          description:
            "The membrane surrounds the cell and controls what enters " +
            "and leaves. Hepatitis B attaches to a special doorway " +
            "on a liver cell before entering."
        },

        mitochondria: {
          name: "⚡ Power Stations: Mitochondria",
          description:
            "Mitochondria help provide energy for the cell. " +
            "Liver cells need energy to perform important jobs, " +
            "such as processing nutrients."
        },

        cyto: {
          name: "🌊 City Space: Cytoplasm",
          description:
            "Cytoplasm is the jelly-like material inside the cell. " +
            "It surrounds the cell parts. Hepatitis B uses machinery " +
            "inside infected cells to help produce viral components."
        }

      };

      const explored = new Set();

      document.querySelectorAll("[data-city]").forEach(button => {

        button.addEventListener("click", () => {

          const key = button.dataset.city;
          const part = cellInformation[key];

          explored.add(key);

          button.classList.add("visited");

          document.getElementById("part-title").textContent =
            part.name;

          document.getElementById("part-desc").textContent =
            part.description;

          document.getElementById("discovery").textContent =
            explored.size + " of 4 discovered";

          if (explored.size === 4) {
            toast("🎉 Amazing! You explored all four parts!");
          }

        });

      });

      // Replace the small side illustration with an easier diagram.

      const smallIllustration =
        document.querySelector(".mini-science img");

      if (smallIllustration) {
        smallIllustration.src = scientificImages.simpleCell;
        smallIllustration.alt =
          "Simple labelled animal cell diagram showing four main cell parts.";
      }
    }
  }


  // =====================================
  // MISSION 03: KID-FRIENDLY TISSUE LAB
  // =====================================

  if (currentPage === "microscope.html") {

    const originalGrid = document.querySelector(".tissue-grid");

    if (originalGrid) {

      const introduction = document.createElement("section");

      introduction.innerHTML = `
        <div class="tissue-explainer">

          <h2>🍪 Think of liver tissue like a cookie!</h2>

          <p>
            Imagine one chocolate chip is a cell.
            Lots of chocolate chips together are like
            a group of cells making tissue.
            Different tissues work together to form
            an organ, such as your liver!
          </p>

        </div>

        <div class="tissue-grid">

          <div class="tissue-kid-card">

            <img
              src="${scientificImages.simpleCell}"
              alt="Simple animal cell diagram"
            >

            <h3>😊 Healthy Liver Cells</h3>

            <p>
              Healthy liver cells work together to
              process nutrients, make bile, and
              support the body.
            </p>

            <button data-easy="healthy">
              Explore Healthy Cells
            </button>

          </div>

          <div class="tissue-kid-card">

            <img
              src="${scientificImages.liver}"
              alt="Scientific illustration of a human liver"
            >

            <h3>🦠 Liver With Hepatitis B</h3>

            <p>
              Hepatitis B infects liver cells.
              The immune system responds, and
              inflammation can injure these cells.
            </p>

            <button data-easy="infected">
              Explore Hepatitis B
            </button>

          </div>

        </div>

        <div class="tissue-discovery"
             id="easy-tissue-feedback"
             aria-live="polite">

          🔎 Select one of the cards to begin investigating!

        </div>

        <div class="tissue-explainer">

          <h3>🧩 From Tiny Cells to Your Whole Body</h3>

          <p>
            🧫 Liver cells
            ➜ 🧩 Liver tissue
            ➜ 🫀 Liver organ
            ➜ 🧍 Body systems
          </p>

          <p>
            Hepatitis B starts by infecting liver cells.
            When many cells are affected, the liver tissue
            may become inflamed or damaged.
          </p>

        </div>
      `;

      originalGrid.before(introduction);

      // Make the more advanced REAL microscope images optional.
      // They remain available for curious students.

      const details = document.createElement("details");

      details.style.margin = "25px 0";
      details.style.padding = "20px";
      details.style.background = "#f5edff";
      details.style.borderRadius = "18px";
      details.style.border = "2px solid #dbc8fa";

      details.innerHTML = `
        <summary style="
          cursor:pointer;
          font-weight:800;
          color:#6841cf;
          font-size:1.1rem;
        ">
          🔬 BONUS: Open the REAL microscope pictures!
        </summary>

        <p style="margin-top:15px">
          Scientists colour thin slices of liver tissue
          pink and purple so they can see the cells.
          Look for the darker dots: many are cell nuclei!
        </p>
      `;

      originalGrid.before(details);
      details.appendChild(originalGrid);

      // Move the original specimen report into the bonus section.

      const report =
        document.getElementById("specimen-report");

      if (report) {
        details.appendChild(report);
      }

      // Keep original detective quiz available,
      // because it teaches about real histology.

      const oldQuestion =
        document.querySelector(".quiz-mini");

      if (oldQuestion) {
        details.appendChild(oldQuestion);
      }

      // Move the advanced magnification section into bonus too.

      const zoomTitle = [...document.querySelectorAll("h3")]
        .find(h => h.textContent.includes("Ground-glass cells"));

      if (zoomTitle) {
        const zoomSection = zoomTitle.nextElementSibling;
        details.appendChild(zoomTitle);

        if (zoomSection) {
          details.appendChild(zoomSection);
        }
      }

      // Beginner activity responses.

      document.querySelectorAll("[data-easy]")
        .forEach(button => {

          button.addEventListener("click", () => {

            const output =
              document.getElementById("easy-tissue-feedback");

            if (button.dataset.easy === "healthy") {

              output.innerHTML = `
                ✅ <strong>Healthy Tissue!</strong>
                <p>
                  Imagine a team where everybody is doing
                  their job. Healthy liver cells work together
                  to keep the liver working properly.
                </p>
              `;

            } else {

              output.innerHTML = `
                🦠 <strong>Hepatitis B Investigation!</strong>
                <p>
                  The virus enters liver cells and uses their
                  machinery. Immune defenders can then attack
                  infected cells. This may cause inflammation,
                  meaning the liver tissue becomes irritated
                  and some cells are injured.
                </p>
                <p>
                  Over a long time, repeated damage can sometimes
                  create scar tissue, making it harder for the
                  liver to work.
                </p>
              `;

            }

          });

        });

      // Explain how to unlock the next mission.

      const next = document.getElementById("tissue-next");

      if (next) {

        const help = document.createElement("p");

        help.textContent =
          "⭐ Extra challenge: Open the real microscope pictures " +
          "and solve the detective question to unlock the next mission.";

        next.before(help);

      }
    }
  }

})();

if (location.pathname.endsWith("microscope.html")) {
  const explored = new Set();

  document.querySelectorAll("[data-easy]").forEach(button => {
    button.addEventListener("click", () => {
      explored.add(button.dataset.easy);

      if (explored.size === 2) {
        const next = document.getElementById("tissue-next");

        if (next) {
          next.disabled = false;
        }

        const feedback =
          document.getElementById("easy-tissue-feedback");

        if (feedback) {
          feedback.insertAdjacentHTML(
            "beforeend",
            "<p>🏆 Great detective work! Both examples explored. You can now continue to the Rescue Lab!</p>"
          );
        }
      }
    });
  });
}

/* ==========================================
   LIVERQUEST: NEW CELL + TISSUE ACTIVITIES
   Paste at the very bottom of site.js
   ========================================== */

(function () {
  const page = location.pathname.split("/").pop();

  // Add styles for both new activities.
  const styles = document.createElement("style");
  styles.textContent = `
    .new-science-image {
      position: relative;
      background: #fff2fa;
      border: 4px solid #e4baf5;
      border-radius: 24px;
      padding: 16px;
      overflow: hidden;
    }

    .new-science-image img {
      width: 100%;
      display: block;
      border-radius: 16px;
      background: white;
    }

    .cell-discover-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-top: 20px;
    }

    .cell-discover {
      background: #ffffff;
      color: #50358c;
      border: 3px solid #d9bdf9;
      padding: 15px;
      border-radius: 16px;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
    }

    .cell-discover:hover {
      background: #ffe2f1;
      border-color: #ff79b2;
    }

    .cell-discover.visited {
      background: #d9fbe8;
      border-color: #43be88;
    }

    .cell-discover .number {
      display: inline-grid;
      place-items: center;
      width: 29px;
      height: 29px;
      background: #8c64ef;
      color: white;
      border-radius: 50%;
      margin-right: 7px;
    }

    .science-note {
      background: #fff6d9;
      border: 2px solid #ffd77c;
      border-radius: 17px;
      padding: 15px;
      margin-top: 18px;
      line-height: 1.6;
      color: #4d4661;
    }

    .tissue-lesson {
      background: white;
      border: 3px solid #e5caf9;
      border-radius: 26px;
      padding: 25px;
    }

    .tissue-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }

    .kid-tissue {
      background: #fff7fc;
      padding: 18px;
      border: 3px solid #efc5de;
      border-radius: 22px;
      text-align: center;
    }

    .kid-tissue.sick {
      background: #fff2e8;
      border-color: #ffb88b;
    }

    .kid-tissue h3 {
      font-size: 1.35rem;
      margin: 10px 0;
    }

    .kid-tissue p {
      font-size: .95rem;
    }

    .tissue-picture {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 7px;
      position: relative;
      background: #fce5f2;
      border-radius: 18px;
      padding: 18px 9px;
      min-height: 240px;
      border: 3px solid #f3d0e6;
    }

    .sick .tissue-picture {
      background: #ffe7d8;
      border-color: #f2b99e;
    }

    .liver-cell {
      position: relative;
      min-width: 0;
      aspect-ratio: 1;
      background: #ff9fba;
      border: 3px solid #d96b98;
      border-radius: 34% 47% 38% 45%;
      display: grid;
      place-items: center;
      transition: .3s;
    }

    .liver-cell .cell-center {
      width: 37%;
      aspect-ratio: 1;
      background: #9259c9;
      border: 2px solid #6e35ab;
      border-radius: 50%;
    }

    .liver-cell.hurt {
      background: #ffca8f;
      border-color: #ed8059;
      transform: rotate(-12deg);
    }

    .liver-cell.hurt::after {
      content: "✕";
      position: absolute;
      color: #d83455;
      font-size: 27px;
      font-weight: 900;
    }

    .immune-dot {
      display: grid;
      place-items: center;
      position: absolute;
      background: #8bd6ff;
      border: 3px solid #3286cd;
      border-radius: 50%;
      width: 31px;
      height: 31px;
      color: #236ca3;
      font-size: 19px;
      font-weight: 900;
    }

    .scar-band {
      position: absolute;
      inset: 12px 48% 12px auto;
      width: 9px;
      background: repeating-linear-gradient(
        0deg, #dfac68 0 9px, #fff0bd 9px 17px
      );
      border-radius: 14px;
      transform: rotate(15deg);
      opacity: 0;
      transition: .3s;
      pointer-events: none;
    }

    .scar-band.show {
      opacity: 1;
    }

    .tissue-key {
      text-align: left;
      background: white;
      border-radius: 14px;
      padding: 13px;
      font-size: .85rem;
      line-height: 1.9;
      color: #454158;
      margin: 15px 0;
    }

    .tissue-activity-button {
      padding: 13px 18px;
      border: none;
      border-radius: 14px;
      background: #8c64ef;
      color: white;
      font-weight: 800;
      cursor: pointer;
    }

    .tissue-activity-button:hover {
      background: #a46df5;
    }

    .tissue-result {
      background: #edf9ff;
      padding: 18px;
      border: 2px solid #9cdff4;
      border-radius: 16px;
      margin: 20px 0;
      min-height: 75px;
    }

    .tissue-result p {
      margin: 8px 0 0;
    }

    .tissue-question {
      margin-top: 25px;
      padding: 20px;
      border-radius: 18px;
      background: #f5edff;
    }

    .tissue-answer-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .tissue-answer-buttons button {
      flex: 1;
      min-width: 120px;
      border: 2px solid #c7a8f5;
      background: white;
      color: #4b3381;
      border-radius: 14px;
      padding: 13px;
      font-weight: 800;
      cursor: pointer;
    }

    .tissue-answer-buttons button:hover {
      background: #e9dbff;
    }

    @media (max-width: 750px) {
      .tissue-comparison {
        grid-template-columns: 1fr;
      }

      .cell-discover-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;
  document.head.appendChild(styles);


  // ==========================================
  // MISSION 01: EXPLORE THE CELL
  // ==========================================

  if (page === "cells.html") {
    const oldCell = document.querySelector(
      ".cell-city-visual, .cell-stage"
    );

    if (oldCell) {
      oldCell.outerHTML = `
        <div>
          <div class="new-science-image">
            <img
              src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Animal_cell_structure_en.svg"
              alt="Detailed animal cell diagram with many organelles"
            >
          </div>

          <p class="caption">
            Scientific animal cell illustration:
            Mariana Ruiz Villarreal, Wikimedia Commons.
            A liver cell has many of these same structures.
          </p>

          <h3>🏙️ Explore the Cell City!</h3>
          <p>
            Each part of your cell has an important job.
            Click the numbers to explore!
          </p>

          <div class="cell-discover-grid">
            <button class="cell-discover" data-newpart="nucleus">
              <span class="number">1</span> Nucleus
            </button>

            <button class="cell-discover" data-newpart="membrane">
              <span class="number">2</span> Cell Membrane
            </button>

            <button class="cell-discover" data-newpart="mitochondria">
              <span class="number">3</span> Mitochondria
            </button>

            <button class="cell-discover" data-newpart="cyto">
              <span class="number">4</span> Cytoplasm
            </button>

            <button class="cell-discover" data-newpart="ribosomes">
              <span class="number">5</span> Ribosomes
            </button>

            <button class="cell-discover" data-newpart="er">
              <span class="number">6</span> Endoplasmic Reticulum
            </button>

            <button class="cell-discover" data-newpart="golgi">
              <span class="number">7</span> Golgi Apparatus
            </button>

            <button class="cell-discover" data-newpart="lysosome">
              <span class="number">8</span> Lysosomes
            </button>
          </div>

          <div class="science-note">
            ⭐ <strong>Hepatitis B connection:</strong>
            The virus infects liver cells and uses their
            machinery to make viral components. Understanding
            cell parts helps us understand how that happens.
          </div>
        </div>
      `;

      const parts = {
        nucleus: [
          "🧠 Nucleus",
          "The cell's control centre. It stores DNA, the " +
          "instructions for the cell. Hepatitis B brings " +
          "viral DNA here and forms a template to help " +
          "make more viruses."
        ],

        membrane: [
          "🚪 Cell Membrane",
          "The cell's protective outside layer. It " +
          "controls entry and exit. Hepatitis B attaches " +
          "to a special doorway on liver cells."
        ],

        mitochondria: [
          "⚡ Mitochondria",
          "Tiny power stations that help give the " +
          "cell usable energy."
        ],

        cyto: [
          "🌊 Cytoplasm",
          "The jelly-like material inside the cell. " +
          "Many important chemical reactions happen here."
        ],

        ribosomes: [
          "🏭 Ribosomes",
          "Tiny protein-making machines. Hepatitis B " +
          "uses the cell's ribosomes to help make " +
          "viral proteins."
        ],

        er: [
          "🛤️ Endoplasmic Reticulum",
          "A network that helps make and process " +
          "proteins and fats. Some hepatitis B " +
          "proteins are processed here."
        ],

        golgi: [
          "📦 Golgi Apparatus",
          "The cell's packaging and shipping centre. " +
          "It sorts and delivers materials."
        ],

        lysosome: [
          "♻️ Lysosomes",
          "The recycling centres. They break down " +
          "materials the cell no longer needs."
        ]
      };

      const seen = new Set();

      document.querySelectorAll("[data-newpart]")
        .forEach(button => {
          button.addEventListener("click", () => {
            const part = button.dataset.newpart;
            seen.add(part);
            button.classList.add("visited");

            document.getElementById("part-title")
              .textContent = parts[part][0];

            document.getElementById("part-desc")
              .textContent = parts[part][1];

            const core = [
              "nucleus",
              "membrane",
              "mitochondria",
              "cyto"
            ];

            const coreCount =
              core.filter(p => seen.has(p)).length;

            document.getElementById("discovery")
              .textContent =
              coreCount + "/4 main parts discovered · " +
              seen.size + "/8 total parts";

            if (seen.size === 8) {
              toast("🏆 Cell City fully explored!");
            }
          });
        });
    }
  }


  // ==========================================
  // MISSION 03: SIMPLE TISSUE DETECTIVE
  // ==========================================

  if (page === "microscope.html") {
    const originalPanel =
      document.querySelector("main .panel");

    if (!originalPanel) return;

    function createCells(sick) {
      return Array.from({length: 16}, (_, i) => {
        const hurt =
          sick && [2, 5, 9, 12, 14].includes(i);

        return `
          <div class="liver-cell ${hurt ? "hurt" : ""}">
            <span class="cell-center"></span>
          </div>
        `;
      }).join("");
    }

    originalPanel.innerHTML = `
      <div class="eyebrow">
        🔎 MISSION 03 · TISSUE DETECTIVE
      </div>

      <h2>Can you spot what's happening to the liver?</h2>

      <p>
        Your liver is made of millions of cells.
        When hepatitis B infects liver cells,
        the immune system responds and can
        accidentally injure infected cells.
        Let's see the difference!
      </p>

      <div class="tissue-comparison">

        <div class="kid-tissue">
          <h3>😊 HEALTHY LIVER TISSUE</h3>

          <div class="tissue-picture" id="healthy-picture">
            ${createCells(false)}
          </div>

          <div class="tissue-key">
            🩷 Pink = liver cells<br>
            🟣 Purple = cell nuclei<br>
            ✅ Cells working together
          </div>

          <p>
            These cells are working together
            to help your liver do its jobs.
          </p>

          <button
            class="tissue-activity-button"
            data-examine="healthy">
            🔍 Investigate Healthy Tissue
          </button>
        </div>

        <div class="kid-tissue sick">
          <h3>🦠 HEPATITIS B EFFECTS</h3>

          <div class="tissue-picture" id="infected-picture">
            ${createCells(true)}

            <span class="immune-dot"
              style="top:20%;left:15%">+</span>
            <span class="immune-dot"
              style="top:55%;left:70%">+</span>
            <span class="immune-dot"
              style="bottom:7%;left:34%">+</span>

            <div class="scar-band" id="scar-band"></div>
          </div>

          <div class="tissue-key">
            🟠 Orange = injured cells<br>
            ❌ Red X = cell injury<br>
            🔵 Blue = immune defenders<br>
            🟡 Yellow bands = scar tissue (if it develops)
          </div>

          <p>
            Immune cells may attack infected liver
            cells. Repeated injury over time can
            sometimes lead to scarring.
          </p>

          <button
            class="tissue-activity-button"
            data-examine="infected">
            🔍 Investigate Affected Tissue
          </button>
        </div>
      </div>

      <div class="tissue-result"
           id="tissue-discovery"
           aria-live="polite">
        🕵️ Detective challenge:
        Investigate both tissues to discover
        what's different!
      </div>

      <div class="tissue-question">
        <h3>⏳ What could happen after repeated liver injury?</h3>

        <p>
          Scar tissue may build up over time.
          Press the button to reveal an example
          of scarring in our teaching model.
        </p>

        <button class="tissue-activity-button"
                id="show-scars">
          SHOW SCAR TISSUE
        </button>

        <p id="scar-message" class="feedback"></p>
      </div>

      <div class="tissue-question">
        <h3>🎮 Mini Challenge: Spot the Problem!</h3>

        <p>
          Which picture shows signs of
          hepatitis B-related injury?
        </p>

        <div class="tissue-answer-buttons">
          <button data-kidanswer="healthy">
            😊 Healthy Tissue
          </button>

          <button data-kidanswer="infected">
            🦠 Affected Tissue
          </button>
        </div>

        <p id="kid-answer-feedback"
           class="feedback"
           role="status">
          Pick your answer!
        </p>
      </div>

      <div class="science-note">
        <strong>🧩 The Big Picture:</strong>

        <p>
          Cells → Tissues → Organs → Organ Systems
        </p>

        <p>
          Lots of liver cells make liver tissue.
          Different tissues make up the liver.
          The liver is an organ that helps
          with digestion and other body functions.
        </p>

        <p>
          <strong>Important:</strong> This is a simplified
          teaching illustration, not a real
          microscope photograph. Not everyone with
          hepatitis B develops serious liver damage.
        </p>
      </div>

      <button id="tissue-next"
              class="btn primary"
              disabled
              style="margin-top:25px">
        COMPLETE MISSION →
      </button>
    `;

    const examined = new Set();
    let correct = false;

    function updateNext() {
      document.getElementById("tissue-next")
        .disabled = !(correct && examined.size === 2);
    }

    document.querySelectorAll("[data-examine]")
      .forEach(button => {
        button.addEventListener("click", () => {
          const type = button.dataset.examine;
          examined.add(type);

          const output =
            document.getElementById("tissue-discovery");

          if (type === "healthy") {
            output.innerHTML = `
              ✅ <strong>Healthy Tissue!</strong>
              <p>
                The pink cells are working together.
                The purple dots represent nuclei,
                which contain DNA instructions.
              </p>
            `;
          } else {
            output.innerHTML = `
              🦠 <strong>You've found the injured cells!</strong>
              <p>
                Hepatitis B infects liver cells.
                The immune system tries to fight
                the infection, but its response can
                injure infected cells.
              </p>
              <p>
                Notice the orange cells with red X marks
                and the blue immune defenders.
              </p>
            `;
          }

          updateNext();
        });
      });

    document.getElementById("show-scars")
      .addEventListener("click", () => {
        document.getElementById("scar-band")
          .classList.toggle("show");

        document.getElementById("scar-message")
          .textContent =
          "🟡 Scar tissue can form after repeated injury " +
          "over time. In severe cases, scarring may " +
          "make it harder for the liver to work. " +
          "This doesn't happen to everyone with hepatitis B.";
      });

    document.querySelectorAll("[data-kidanswer]")
      .forEach(button => {
        button.addEventListener("click", () => {
          correct =
            button.dataset.kidanswer === "infected";

          document.getElementById("kid-answer-feedback")
            .textContent = correct
              ? "🎉 Correct! You spotted the injured cells " +
                "and immune defenders!"
              : "🔎 Try again! Look for orange injured " +
                "cells and blue immune defenders.";

          updateNext();
        });
      });

    document.getElementById("tissue-next")
      .addEventListener("click", () => {
        goNext("lab.html", "microscope");
      });
  }

})();

/* ==========================================
   LIVERQUEST - EXTRA INTERACTIVE CONTENT
   Paste at the END of site.js
   ========================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  const main = document.querySelector("main");

  if (!main) return;

  // Avoid adding the same content twice.
  if (document.getElementById("extended-science")) return;

  const activities = {
    "cells.html": {
      title: "🏙️ Cell City: Behind the Scenes",
      intro:
        "You've discovered the cell's main parts. But how do " +
        "these tiny structures work together? And how does " +
        "hepatitis B take advantage of them?",
      rounds: [
        {
          heading: "The Cell's Protein Factory",
          visual: ["🧬", "➡️", "🏭", "➡️", "📦"],
          text:
            "A cell uses instructions from DNA to help make " +
            "proteins. Ribosomes build proteins, while other " +
            "cell structures help process and move them. " +
            "Hepatitis B uses this machinery to make " +
            "proteins needed for new virus particles.",
          question:
            "Which cell structure actually builds proteins?",
          options: [
            "Ribosomes",
            "Cell membrane",
            "Nucleus"
          ],
          correct: 0,
          explanation:
            "Ribosomes are the protein builders! They read " +
            "instructions carried by messenger RNA and " +
            "join amino acids together."
        },
        {
          heading: "The DNA Control Room",
          visual: ["🦠", "➡️", "🚪", "➡️", "🧬"],
          text:
            "Hepatitis B attaches to a liver cell and enters. " +
            "Its genetic material reaches the nucleus, where " +
            "a special viral DNA template can form. That " +
            "template helps the virus continue making copies.",
          question:
            "Where does hepatitis B form its lasting DNA template?",
          options: [
            "Inside mitochondria",
            "Inside the nucleus",
            "Outside the cell"
          ],
          correct: 1,
          explanation:
            "Correct! The virus forms a DNA template in the " +
            "nucleus. The infected cell can then help make " +
            "more viral components."
        },
        {
          heading: "Powering the Liver",
          visual: ["🍎", "➡️", "⚡", "➡️", "💪"],
          text:
            "Liver cells do lots of important jobs. They " +
            "process nutrients, help regulate blood sugar, " +
            "and make useful substances. Mitochondria " +
            "help supply the energy these activities need.",
          question:
            "Why are mitochondria important in liver cells?",
          options: [
            "They are a virus",
            "They store all of the body's blood",
            "They help provide energy"
          ],
          correct: 2,
          explanation:
            "Exactly! Mitochondria help turn energy from " +
            "nutrients into a form the cell can use."
        }
      ]
    },

    "invasion.html": {
      title: "🦠 Inside the Hepatitis B Invasion",
      intro:
        "Now that you know what hepatitis B is, investigate " +
        "the steps of infection like a real scientist.",
      rounds: [
        {
          heading: "Step 1: Finding a Liver Cell",
          visual: ["🦠", "➡️", "🔒", "➡️", "🧫"],
          text:
            "Hepatitis B doesn't enter every cell equally. " +
            "It targets liver cells by recognizing a special " +
            "protein on their surface. Imagine a key " +
            "fitting into a particular lock.",
          question:
            "Why can hepatitis B enter certain liver cells?",
          options: [
            "They have a suitable entry protein",
            "They have no cell membrane",
            "They are always damaged"
          ],
          correct: 0,
          explanation:
            "Yes! Hepatitis B uses a particular protein " +
            "on liver cells to help it enter."
        },
        {
          heading: "Step 2: Making Viral Parts",
          visual: ["🧬", "➡️", "🏭", "➡️", "🦠"],
          text:
            "Once inside, hepatitis B uses the infected " +
            "cell's resources to produce viral proteins " +
            "and genetic material. These parts are then " +
            "assembled into new virus particles.",
          question:
            "How does hepatitis B make viral proteins?",
          options: [
            "It grows like a plant",
            "It uses the infected cell's machinery",
            "It turns into a human cell"
          ],
          correct: 1,
          explanation:
            "That's right! Viruses depend on living " +
            "cells to reproduce."
        },
        {
          heading: "Step 3: The Immune Response",
          visual: ["🦠", "➡️", "🛡️", "➡️", "🔥"],
          text:
            "Your immune system recognizes signs of " +
            "infection and tries to control the virus. " +
            "Some immune cells attack infected liver " +
            "cells. This helps fight infection but can " +
            "also cause inflammation and cell injury.",
          question:
            "What can cause much of the liver-cell damage?",
          options: [
            "Hugging a classmate",
            "Drinking water",
            "The immune response to infected cells"
          ],
          correct: 2,
          explanation:
            "Correct! The immune response to hepatitis B " +
            "can injure infected liver cells and cause " +
            "inflammation."
        }
      ]
    },

    "microscope.html": {
      title: "🔬 Tissue Detective: Follow the Evidence",
      intro:
        "You have compared healthy and affected tissues. " +
        "Now use the clues to understand how changes in " +
        "individual cells can affect the whole liver.",
      rounds: [
        {
          heading: "Clue 1: What Is a Tissue?",
          visual: ["🧫", "➡️", "🧩", "➡️", "🫀"],
          text:
            "A tissue is a group of cells working together. " +
            "The liver contains several kinds of cells " +
            "and tissues. When hepatitis B infects liver " +
            "cells, inflammation can disturb the tissue " +
            "and sometimes injure those cells.",
          question:
            "What is a tissue?",
          options: [
            "One single atom",
            "A group of cells working together",
            "A type of virus"
          ],
          correct: 1,
          explanation:
            "Exactly! Cells make tissues, and different " +
            "tissues work together in organs."
        },
        {
          heading: "Clue 2: Signs of Inflammation",
          visual: ["🧫", "➡️", "🛡️", "➡️", "🔥"],
          text:
            "In hepatitis B, immune cells can gather " +
            "in liver tissue and respond to infection. " +
            "This is part of inflammation. Some liver " +
            "cells may be injured in the process.",
          question:
            "Which is a sign of an immune response in liver tissue?",
          options: [
            "Immune cells gathering near affected cells",
            "Liver cells turning into bones",
            "All cell nuclei disappearing instantly"
          ],
          correct: 0,
          explanation:
            "Correct! Immune cells may gather around " +
            "infected tissue. This can be part of the " +
            "body's response to hepatitis B."
        },
        {
          heading: "Clue 3: When Scars Build Up",
          visual: ["🧫", "➡️", "🩹", "➡️", "🫀"],
          text:
            "When the liver experiences repeated injury, " +
            "scar tissue can sometimes form. This is " +
            "called fibrosis. Severe, widespread " +
            "scarring is called cirrhosis. Not everyone " +
            "with hepatitis B develops these problems.",
          question:
            "What is fibrosis?",
          options: [
            "A new kind of healthy organ",
            "An extra cell nucleus",
            "A buildup of scar tissue"
          ],
          correct: 2,
          explanation:
            "Yes! Fibrosis is scar tissue formation. " +
            "It can develop after ongoing liver injury."
        }
      ]
    },

    "lab.html": {
      title: "🛡️ Rescue Lab: Science in Real Life",
      intro:
        "You've learned how hepatitis B affects liver " +
        "cells. Test your knowledge of prevention, " +
        "testing, and treatment in everyday situations.",
      rounds: [
        {
          heading: "Scenario 1: A Friend Needs Support",
          visual: ["👧", "🤝", "👦"],
          text:
            "Imagine your friend tells you they have " +
            "hepatitis B. They worry that classmates " +
            "will avoid them. Remember: hepatitis B " +
            "does not spread through hugging, sharing " +
            "a classroom, or eating together.",
          question:
            "What should you do?",
          options: [
            "Stop being friends with them",
            "Treat them kindly and normally",
            "Tell everyone to stay away"
          ],
          correct: 1,
          explanation:
            "Exactly! People with hepatitis B deserve " +
            "respect and friendship. Everyday social " +
            "contact does not spread the infection."
        },
        {
          heading: "Scenario 2: Preventing Infection",
          visual: ["💉", "➡️", "🛡️", "➡️", "🙂"],
          text:
            "Vaccination helps train your immune " +
            "system to recognize hepatitis B before " +
            "infection occurs. It is an important " +
            "way to prevent hepatitis B.",
          question:
            "Which action can help prevent hepatitis B?",
          options: [
            "Getting vaccinated",
            "Avoiding all friends",
            "Waiting for obvious symptoms"
          ],
          correct: 0,
          explanation:
            "Correct! Hepatitis B vaccination " +
            "provides important protection."
        },
        {
          heading: "Scenario 3: Finding an Infection",
          visual: ["🩸", "➡️", "🔬", "➡️", "🩺"],
          text:
            "Some people with hepatitis B feel " +
            "completely healthy. Doctors use blood " +
            "tests to check for the infection. " +
            "People with chronic hepatitis B may " +
            "need medical monitoring and sometimes " +
            "antiviral treatment.",
          question:
            "Can someone have hepatitis B without symptoms?",
          options: [
            "No, everyone looks sick",
            "Only if they have a broken bone",
            "Yes, symptoms may be absent"
          ],
          correct: 2,
          explanation:
            "Yes! Someone can have hepatitis B and " +
            "feel well. Blood tests can detect it."
        }
      ]
    }
  };

  const lesson = activities[page];
  if (!lesson) return;

  const section = document.createElement("section");
  section.id = "extended-science";
  section.className = "science-expansion";

  // Add this section after the existing lesson.
  main.appendChild(section);

  let round = 0;
  let score = 0;

  function showRound() {
    if (round >= lesson.rounds.length) {
      section.innerHTML = `
        <div class="science-step">BONUS MISSION COMPLETE</div>

        <h2>🏆 Fantastic science detective work!</h2>

        <p>
          You've finished the extra challenge for
          this mission!
        </p>

        <div class="science-visual">
          <span>🔬</span>
          <span>🧬</span>
          <span>🏆</span>
        </div>

        <div class="science-highlight">
          <h3>Your score: ${score}/${lesson.rounds.length}</h3>

          <p>
            The important thing is that you
            now understand more about how
            hepatitis B affects liver cells
            and tissues.
          </p>
        </div>

        <button class="science-next"
                id="restart-science">
          🔄 Play Again
        </button>
      `;

      document.getElementById("restart-science")
        .addEventListener("click", () => {
          round = 0;
          score = 0;
          showRound();
        });

      return;
    }

    const item = lesson.rounds[round];

    section.innerHTML = `
      <div class="science-step">
        INTERACTIVE DISCOVERY ${round + 1}
        OF ${lesson.rounds.length}
      </div>

      <h2>${round === 0 ? lesson.title : item.heading}</h2>

      ${round === 0 ? `<p>${lesson.intro}</p>` : ""}

      ${round === 0 ? `<h3>${item.heading}</h3>` : ""}

      <div class="science-visual">
        ${item.visual.map(symbol =>
          `<span>${symbol}</span>`
        ).join("")}
      </div>

      <div class="science-highlight">
        <p>${item.text}</p>
      </div>

      <h3>🎯 Science Challenge</h3>
      <p><strong>${item.question}</strong></p>

      <div class="science-options">
        ${item.options.map((option, index) => `
          <button
            class="science-option"
            data-science-answer="${index}">
            ${String.fromCharCode(65 + index)}.
            ${option}
          </button>
        `).join("")}
      </div>

      <div class="science-response"
           id="science-response"
           role="status">
        🤔 Choose your answer to see what happens!
      </div>

      <button class="science-next"
              id="science-next"
              disabled>
        ${round === lesson.rounds.length - 1
          ? "SEE MY RESULTS 🏆"
          : "NEXT DISCOVERY →"}
      </button>
    `;

    let answered = false;

    section.querySelectorAll("[data-science-answer]")
      .forEach(button => {
        button.addEventListener("click", () => {
          if (answered) return;
          answered = true;

          const chosen = Number(
            button.dataset.scienceAnswer
          );

          const correct = chosen === item.correct;

          if (correct) score++;

          section.querySelectorAll("[data-science-answer]")
            .forEach(option => {
              option.disabled = true;

              if (
                Number(option.dataset.scienceAnswer) ===
                item.correct
              ) {
                option.classList.add("correct");
              } else if (option === button) {
                option.classList.add("wrong");
              }
            });

          document.getElementById("science-response")
            .textContent =
              (correct
                ? "✅ Correct! "
                : "💡 Good attempt! ") +
              item.explanation;

          document.getElementById("science-next")
            .disabled = false;
        });
      });

    document.getElementById("science-next")
      .addEventListener("click", () => {
        round++;
        showRound();
      });
  }

  showRound();
})();
