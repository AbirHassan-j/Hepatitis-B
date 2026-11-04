
(()=>{'use strict';
const $=s=>document.querySelector(s), root=$('#maze-app');
const CANVAS_W=1000, CANVAS_H=680;
const levels=[{"name":"Virus Invasion","theme":"cell","color":"#9d79f6","dark":"#4b2f95","enemyDelay":565,"bonusTime":70,"subtitle":"Follow HBV from the outside of a liver cell to the making of new viruses.","map":["#########################","#P....#.....#.... ....A.#","#.###.#.###.#.#####.##..#","#.....#...#.#..4..#.....#","#.#####.#.#.###.#.###.#.#","#...#...#...#...#...#.#.#","###.#.#######.###.#.#.#.#","#...#.....1...#...#.#...#","#.#######.#####.###.###.#","#.....#.5.#.....#...#...#","#.###.#.###.#####.###.#.#","#.#...#.....#...#...#.#.#","#.#.#######.#.#.###.#.#.#","#...#..2....#.#...#.#...#","###.#.#####.#.###.#.###.#","#....B....#....3....E...#","#########################"],"clues":[{"title":"HBV attaches","brief":"HBV reaches a liver cell and attaches to its membrane.","detail":"HBV reaches the outside of a liver cell and attaches to its cell membrane. The membrane is the cell’s outer border. Attaching lets HBV begin entering the cell.","remember":"HBV attaches to the cell membrane first.","art":"attach","say":"HBV is attaching to the cell membrane."},{"title":"HBV enters the cell","brief":"The virus moves into the cell.","detail":"After attaching, HBV enters the cell and moves through the cytoplasm, the jelly-like inside of the cell.","remember":"HBV moves through the cytoplasm after it gets inside.","art":"enter","say":"HBV is now inside the liver cell."},{"title":"HBV heads to the nucleus","brief":"The virus moves toward the nucleus.","detail":"The nucleus is the control center of the cell. HBV moves toward it because it needs the cell’s instructions area to help it continue the infection.","remember":"HBV moves toward the nucleus.","art":"toNucleus","say":"HBV is moving toward the nucleus."},{"title":"HBV Sends Messages to the Cell","brief":"HBV uses the nucleus to send messages.","detail":"HBV brings messages to the nucleus. These messages tell the liver cell to help make the parts needed to build more viruses.","remember":"HBV uses messages to help the cell make new virus parts.","art":"dnaCopy","say":"The cell follows messages to help make new virus parts."},{"title":"Organelles help make more viruses","brief":"The cell helps build and release more viruses.","detail":"HBV uses a liver cell to make more viruses. The nucleus helps make messages. Ribosomes use those messages to make virus proteins, while the ER helps process some of them. The cell uses energy and other parts to put new virus particles together and release them.","remember":"Cell parts can be used to help make and release more viruses.","art":"assembly","say":"The infected cell is helping make and release more HBV."}],"catch":[{"q":"What does HBV attach to first?","opts":["The cell membrane","The mitochondria","The desk"],"a":0,"why":"Right. HBV first attaches to the cell membrane."},{"q":"What part does HBV move toward after entering the cell?","opts":["The nucleus","The lunch table","The skin"],"a":0,"why":"Correct. HBV moves toward the nucleus."}],"bonus":{"q":"Which order is correct?","opts":["Reach the cell → attach → enter → move to nucleus","Enter → leave → attach → disappear","Attach → jump out → become a tissue"],"a":0,"why":"Nice! That is the correct order."}},{"name":"Tissue Detective","theme":"tissue","color":"#ff7faa","dark":"#8a3562","enemyDelay":550,"bonusTime":75,"subtitle":"Zoom out from one liver cell to many liver cells working together as tissue.","map":["#########################","#P...#..1....#....A.....#","#.#.#.#####.#.#.#####.#.#","#.#.#.....#.#.#.....#.#.#","#.#.#####.#.#.#####.#.#.#","#.#.....#5#...#.....#...#","#.#####.#.#####.#######.#","#.....#.#..2..#.....#...#","#####.#.#####.#####.#.###","#...#.#.....#....6#.#...#","#.#.#.#####.#####.#.###.#","#.#.#...#...#...#.#...#.#","#.#.###.#.###.#.#.###.#.#","#.#...#.#..3..#.#...#.#.#","#.###.#.#######.###.#.#.#","#...B....#..4..C....#..E#","#########################"],"clues":[{"title":"One cell becomes tissue","brief":"Many cells together make tissue.","detail":"A tissue is a group of cells working together. Liver tissue is made of many liver cells.","remember":"Many liver cells together make tissue.","art":"tissueZoom","say":"Now we are zooming out from one cell to a whole tissue."},{"title":"The body reacts","brief":"The immune system notices infected cells.","detail":"The body tries to fight infected liver cells. This is the immune response.","remember":"The immune system reacts to infected cells.","art":"immune","say":"The immune system has noticed infected cells."},{"title":"Inflammation begins","brief":"The tissue becomes irritated.","detail":"Inflammation means the body is reacting to a problem. The tissue may become irritated or damaged.","remember":"Inflammation is the body reacting to a problem.","art":"inflammation","say":"This tissue is showing inflammation."},{"title":"Scar tissue can build up","brief":"Repeated injury can leave scars.","detail":"The liver can repair some damage. However, if injury keeps happening for a long time, scar tissue can build up. This is called fibrosis, and it can make it harder for the liver to work properly.","remember":"Repeated injury can lead to scar tissue.","art":"scar","say":"Long-lasting injury can leave scar tissue."},{"title":"Not every infection is the same","brief":"Some infections clear and some last longer.","detail":"Some people recover from hepatitis B, while others have a long-lasting infection. Not everyone develops serious liver damage.","remember":"Not every hepatitis B infection affects people the same way.","art":"outcomeSplit","say":"Different people can have different outcomes."},{"title":"Tissue changes can affect the liver organ","brief":"When many cells are affected, the organ is affected too.","detail":"When many liver cells are hurt, liver tissue changes. Because tissues build organs, the liver organ can be affected too.","remember":"Cell changes can spread into tissue and organ changes.","art":"organZoom","say":"Changes in cells and tissues can affect the whole liver."}],"catch":[{"q":"What is tissue?","opts":["A group of cells working together","A type of backpack","A single tiny atom"],"a":0,"why":"Yes. Tissue is a group of cells working together."},{"q":"What does inflammation mean?","opts":["The body is reacting to a problem","The virus turned into food","The liver became a bone"],"a":0,"why":"Right. Inflammation means the body is reacting to a problem."}],"bonus":{"q":"If injury keeps happening for a long time, what can build up?","opts":["Scar tissue","New hair","Extra teeth"],"a":0,"why":"Exactly. Repeated injury can lead to scar tissue."}},{"name":"Rescue Lab","theme":"lab","color":"#5cd4dc","dark":"#1c6786","enemyDelay":530,"bonusTime":75,"subtitle":"Learn how HBV spreads, what does not spread it, and how people stay protected.","map":["#########################","#P....#1....#....A......#","#.###.#.##..#.#####.###.#","#...#.#..#..#.....#...#.#","###.#.###.#######.###.#.#","#...#...#.....#...#...#.#","#.#####.#####.#.###.###.#","#.....#...2...#.....#...#","#.###.#####.#######.#.###","#.# ..#...#.....#...#...#","#.#.###.#.#####.#.#####.#","#.#...#.#..3..#.#.....#.#","#.###.#.#####.#.#####.#.#","#...#.#.....#.#..5..#.#.#","#.#.#.#####.#.#####.#.#.#","#.B....#..4....C....#..E#","#########################"],"clues":[{"title":"How hepatitis B can spread","brief":"HBV can spread through infected blood and certain body fluids.","detail":"HBV can spread when infected blood or certain body fluids enter another person’s body. Sharing used needles is one important risk. HBV can also spread through sexual contact or from a parent with HBV to a baby during birth. Never touch a discarded needle; tell a trusted adult.","remember":"Infected blood, including through shared used needles, can spread HBV.","art":"spreadBlood","say":"This is one real way HBV can spread."},{"title":"Everyday contact is safe","brief":"HBV does not spread through normal classroom contact.","detail":"HBV does not spread through hugging, sharing a desk, or eating lunch together.","remember":"Everyday classroom contact does not spread HBV.","art":"noSpread","say":"Everyday contact like sharing lunch is safe."},{"title":"Vaccination helps prevent HBV","brief":"Vaccines help protect people before infection.","detail":"The hepatitis B vaccine helps protect people before they are infected.","remember":"Vaccination helps prevent hepatitis B.","art":"vaccine","say":"Vaccination helps protect people from hepatitis B."},{"title":"Testing can find infection","brief":"A blood test can help find HBV.","detail":"A blood test can help find hepatitis B. Some people also need medical care after testing.","remember":"Testing and care are important.","art":"test","say":"Testing can help find hepatitis B."},{"title":"Someone can feel fine and still need testing","brief":"No symptoms does not always mean no infection.","detail":"Some people with hepatitis B may not feel sick right away. Testing can still be important.","remember":"A person can need testing even if they feel okay.","art":"quietTest","say":"A person can still need testing even if they feel fine."}],"catch":[{"q":"Which is a real way HBV can spread?","opts":["Infected blood entering another person’s body","Sharing lunch at school","Sitting in the same classroom"],"a":0,"why":"Correct. HBV can spread through infected blood."},{"q":"Which helps prevent hepatitis B?","opts":["Vaccination","Avoiding handshakes","Wearing boots indoors"],"a":0,"why":"Correct. Vaccination helps prevent hepatitis B."}],"bonus":{"q":"Which answer is true?","opts":["A person can feel fine and still need testing","HBV spreads by sharing a pencil","HBV spreads through a smile"],"a":0,"why":"Right. Someone can feel fine and still need testing."}},{"name":"Save Liver City","theme":"final","color":"#ffc861","dark":"#8a5b25","enemyDelay":550,"bonusTime":80,"subtitle":"Put the whole story together and protect Liver City.","map":["#########################","#P...#1....#....A.....#.#","#.#.#.###.#.###.#####.#.#","#.#...#...#...#.....#...#","#.#####.#####.#####.###.#","#.....#.....#...#...#...#","###.#.#####.###.#.###.#.#","#...#...2.#.....#...#.#.#","#.#####.#.#########.#.#.#","#.....#.#.....#4....#...#","#.###.#.#####.#.#####.###","#.#...#.. ..#.#.....#...#","#.#.#######.#.#####.###.#","#.#.....#...#...#..5#...#","#.#####.#.#####.#.###.#.#","#..B....#...3...C...E.#.#","#########################"],"clues":[{"title":"Cells, tissues, and organs connect","brief":"Small parts build the whole liver.","detail":"Liver cells form liver tissue, and tissues make up the liver organ. The liver processes nutrients, stores energy, makes bile that helps digest fats, and helps remove harmful substances from blood.","remember":"Cells build tissues, and tissues help build organs.","art":"cellsToLiver","say":"Small parts work together to make the liver."},{"title":"HBV can harm the liver","brief":"The infection can affect how the liver works.","detail":"HBV infects liver cells. The immune response to infected cells may cause inflammation and, over time, scarring. This can make it harder for the liver to do important jobs such as processing nutrients and helping remove harmful substances.","remember":"HBV can affect liver cells, tissues, and the liver.","art":"harm","say":"HBV can affect the liver over time."},{"title":"Kindness matters too","brief":"People with hepatitis B deserve respect.","detail":"People with hepatitis B should be treated with kindness and respect. A virus does not change someone’s value.","remember":"Treat people with kindness and respect.","art":"kindness","say":"Science matters, and kindness matters too."},{"title":"Healthy choices matter","brief":"Smart choices lower risk.","detail":"Avoid contact with other people’s blood, do not share needles, and follow medical advice about vaccination and testing.","remember":"Safe choices can lower risk.","art":"safeChoices","say":"Healthy choices help keep Liver City safer."},{"title":"The whole HBV journey","brief":"Put the story in order from start to finish.","detail":"HBV reaches a liver cell, attaches, enters, moves to the nucleus, uses messages to make virus parts and new virus particles. The body may react with inflammation, and prevention helps stop the infection story.","remember":"Reach the cell → attach → enter → nucleus → messages → new viruses → body reacts → prevention.","art":"journey","say":"You followed the whole HBV journey!"}],"catch":[{"q":"What is the best summary of HBV?","opts":["It infects liver cells and can affect tissues and the liver","It only lives on desks","It spreads through smiles"],"a":0,"why":"Exactly. HBV infects liver cells and can affect tissues and the liver."},{"q":"How should we treat people with hepatitis B?","opts":["With kindness and respect","With fear and exclusion","By avoiding every shared classroom"],"a":0,"why":"Yes. People with hepatitis B should be treated with kindness and respect."}],"bonus":{"q":"Which answer best protects Liver City?","opts":["Vaccination, safe choices around blood, testing, and care","Ignoring testing forever","Avoiding lunch tables"],"a":0,"why":"Perfect. Prevention, testing, and care are the best protection plan."}}];


// Three short, required challenges in each level. Questions follow the two
// discoveries most recently seen, so they check understanding in context.

/* SHORTER OBJECTIVE EXPLANATIONS */

// LEVEL 1 — CLUE 1
levels[0].clues[0].detail =
  "HBV reaches a liver cell and attaches to its membrane, " +
  "the cell's outer border. This allows HBV to begin entering.";

// LEVEL 1 — CLUE 5
levels[0].clues[4].detail =
  "HBV uses the nucleus to make messages that tell " +
  "ribosomes to produce virus proteins. Other cell parts, " +
  "including the ER, help build and release new viruses.";

// LEVEL 3 — CLUE 1
levels[2].clues[0].detail =
  "HBV can spread through infected blood, shared needles, " +
  "sexual contact, or from a parent to a baby during birth. " +
  "Never touch discarded needles; tell a trusted adult.";

// LEVEL 4 — CLUE 2
levels[3].clues[1].detail =
  "HBV infects liver cells, and the immune response can " +
  "cause inflammation and scarring. Over time, this may " +
  "make it harder for the liver to do its jobs.";

/* END SHORTER EXPLANATIONS */

const discoveryChallenges = [
 [
  {q:'What happens before HBV enters a liver cell?',opts:['HBV attaches to the cell membrane','HBV becomes a mitochondrion','HBV turns into liver tissue'],a:0,why:'HBV must first attach to the liver cell membrane.',hint:'Think back to the glowing attachment point on the outside of the cell.'},
  {q:'Where do HBV messages go after it enters the cell?',opts:['Toward the nucleus','Into a nearby bone','Straight to the stomach'],a:0,why:'HBV brings its genetic information to the nucleus as part of the infection process.',hint:'Remember the purple structure inside the large liver cell.'},
  {q:'How does one infected cell help make more HBV?',opts:['It uses its machinery and energy to make viral parts','It changes its mitochondria into new liver organs','It makes viruses simply by dividing in half'],a:0,why:'The virus relies on the cell to make viral parts and assemble new virus particles.',hint:'Look back at the small parts being built and released from the infected cell.'}
 ],
 [
  {q:'What is a tissue?',opts:['Many cells working together','One virus floating alone','A kind of cell membrane'],a:0,why:'Tissues are groups of cells working together.',hint:'Remember the animation zooming from one cell to many cells.'},
  {q:'What can happen if liver tissue stays injured for a long time?',opts:['Scar tissue may build up','It automatically turns into a different organ','Every cell becomes a virus'],a:0,why:'Long-term injury can lead to fibrosis, or scarring.',hint:'Remember the lines of scar tissue appearing across the cell group.'},
  {q:'Do all people with hepatitis B get severe liver damage?',opts:['No, outcomes differ from person to person','Yes, everyone does','Only people who share lunch do'],a:0,why:'Some infections clear and others last longer; serious damage does not happen to everyone.',hint:'The discovery showed two different possible outcomes.'}
 ],
 [
  {q:'Which situation can spread hepatitis B?',opts:['Infected blood entering a break in the skin','Sharing a pencil','Hugging a friend'],a:0,why:'HBV can spread through exposure to infected blood, not ordinary classroom contact.',hint:'Think of where the animated droplet moved.'},
  {q:'Which action helps prevent hepatitis B?',opts:['Getting vaccinated','Avoiding everyone with HBV','Sharing personal needles'],a:0,why:'Vaccination is a major way to prevent hepatitis B.',hint:'Think of the immune-protection shield.'},
  {q:'Why might someone need a hepatitis B blood test even if they feel well?',opts:['Some people have no noticeable symptoms','Everyone with HBV has a fever immediately','A blood test treats the infection instantly'],a:0,why:'An HBV infection may not cause noticeable symptoms, so testing can be important.',hint:'Remember the healthy-looking person beside the testing graphic.'}
 ],
 [
  {q:'Which order builds the liver?',opts:['Cells → tissues → organ','Organ → viruses → tissues','Tissues → blood droplets → cells'],a:0,why:'Cells form tissues, and tissues work together as parts of organs.',hint:'Recall the three illustrated pictures connected by arrows.'},
  {q:'Which plan best protects Liver City?',opts:['Vaccination, safer blood contact, testing, and care','Never sharing a classroom','Assuming every person with HBV feels sick'],a:0,why:'Prevention, testing, and medical care help protect liver health.',hint:'Think of the shield and the testing symbols.'},
  {q:'What happens after HBV attaches and enters a liver cell?',opts:['It uses the cell to make more virus parts','It immediately becomes a liver tissue','It spreads through hugs'],a:0,why:'HBV uses the living liver cell to produce viral components and new virus particles.',hint:'Remember the messages and assembly animations from Level 1.'}
 ]
];
let challengeSolved=0;

const scienceActivities=[
 [
  {type:'match',prompt:'Match each part of HBV’s first move to what you see.',pairs:[['HBV reaches the cell','The virus is outside the liver cell'],['HBV attaches','The virus sticks to the cell’s outer edge'],['HBV gets inside','The virus crosses into the cell']]},
  {type:'order',prompt:'Put the virus’s next moves in order.',steps:['HBV sticks to the cell','HBV gets inside the cell','HBV moves toward the nucleus']},
  {type:'match',prompt:'What happens as HBV uses the cell? Match each event to what it means.',pairs:[['Messages are sent','The cell gets instructions to make virus parts'],['Virus parts are made','The cell helps build pieces for new viruses'],['New viruses leave','New virus particles can move on to other cells']]}
 ],
 [
  {type:'match',prompt:'Match each change in the liver to what is happening.',pairs:[['One infected cell','HBV is inside a liver cell'],['A group of affected cells','Several liver cells in the tissue are affected'],['A liver with long-term injury','The whole organ may have trouble doing its jobs']]},
  {type:'order',prompt:'Put these possible changes in order. Not every person develops all of them.',steps:['The immune system fights infected cells','The liver tissue may become inflamed','Repeated injury may leave scars']},
  {type:'match',prompt:'Match each person’s situation to the right idea.',pairs:[['Someone recovers from HBV','The infection has cleared'],['Someone has HBV for a long time','The infection has not cleared'],['Someone has scarred liver tissue','Past injury has left scars']]}
 ],
 [
  {type:'match',prompt:'What should you know in each situation?',pairs:[['Infected blood reaches an open cut','This can spread HBV'],['Friends share a classroom desk','This cannot spread HBV'],['A student wants protection','Ask a healthcare professional about the HBV vaccine']]},
  {type:'order',prompt:'Build a smart plan to protect yourself.',steps:['Learn how HBV can spread','Get the hepatitis B vaccine if recommended','Ask about testing or care if you may have been exposed']},
  {type:'match',prompt:'Match the real-life situation to the right next step.',pairs:[['A baby is born to a parent with HBV','The healthcare team helps protect the baby'],['Someone finds a used needle','Do not touch it; tell a trusted adult'],['Someone feels fine but might have HBV','A blood test can help check for infection']]}
 ],
 [
  {type:'order',prompt:'Zoom out: how does one cell connect to a whole liver?',steps:['One liver cell','Many liver cells working together','The liver organ']},
  {type:'match',prompt:'Be a Liver City helper! Match the situation to a helpful choice.',pairs:[['You want to avoid HBV','Get vaccinated if recommended'],['You may have been exposed to HBV','Ask a healthcare professional about testing'],['A friend has hepatitis B','Treat them with kindness and include them'],['Someone is living with HBV','Medical care can help protect their health']]},
  {type:'order',prompt:'Tell the HBV story from start to finish.',steps:['HBV gets into a liver cell','The cell follows messages and makes virus parts','New virus particles can leave the cell','Vaccination, testing and care help protect people']}
 ]
];
function shuffleIndices(n){const arr=Array.from({length:n},(_,i)=>i);for(let i=n-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function makeScienceChallenge(i,onComplete){
 const activity=scienceActivities[level][Math.floor(i/2)];
 

const spotQuestions = {
 
  "3-2": {
    question: "Why is regular medical care important for someone with long-term hepatitis B?",
    choices: [
      ["🩺", "Doctors can monitor liver health and recommend treatment when needed"],
      ["💪", "Medical visits make the virus disappear immediately"],
      ["🦠", "People with hepatitis B always feel sick"]
    ],
    answer: 0,
    fact: "People with chronic hepatitis B may feel healthy but still need regular checkups. Doctors can monitor their liver and recommend antiviral treatment when needed."
  },

  "0-2": {
    question: "Which cell structure makes proteins that HBV needs?",
    choices: [
      ["🧬", "Nucleus"],
      ["⚙️", "Ribosomes"],
      ["🫧", "Cell membrane"]
    ],
    answer: 1,
    fact: "Ribosomes build proteins. HBV uses the cell's ribosomes to make virus proteins."
  },

  "1-0": {
    question: "What can happen when the immune system responds to infected liver cells?",
    choices: [
      ["🛡️", "The liver becomes immune to every virus"],
      ["🔬", "Inflammation can damage liver tissue"],
      ["🩷", "All liver cells stop working immediately"]
    ],
    answer: 1,
    fact: "The immune response can cause inflammation and damage liver tissue."
  },

  "1-2": {
    question: "How can hepatitis B affect different people?",
    choices: [
      ["⏳", "Every infection becomes long-term"],
      ["😷", "Only people with symptoms can have HBV"],
      ["🩺", "Some infections clear, while others continue"]
    ],
    answer: 2,
    fact: "Some people clear HBV. Others develop a long-term infection."
  },

  "2-2": {
    question: "Why might someone need an HBV blood test even if they feel healthy?",
    choices: [
      ["🧪", "HBV can be present without symptoms"],
      ["💉", "A blood test prevents HBV infection"],
      ["👀", "Everyone with HBV develops yellow eyes"]
    ],
    answer: 0,
    fact: "A person can have hepatitis B without noticeable symptoms. A blood test can detect infection."
  },

  "3-1": {
    question: "Why does HBV need to enter a liver cell?",
    choices: [
      ["⚡", "To collect energy and survive on its own"],
      ["🧫", "To use cell machinery to make more viruses"],
      ["🩷", "To help the liver process nutrients"]
    ],
    answer: 1,
    fact: "HBV depends on a host cell's machinery to produce more viruses."
  }
};

  const key = `${level}-${Math.floor(i / 2)}`;
  const q = spotQuestions[key];

  if (q) {
    const options = q.choices.map((item, n) => `
      <button type="button"
              class="lq-spot-option"
              data-spot="${n}">
        <span class="lq-spot-icon">${item[0]}</span>
        <span>${item[1]}</span>
      </button>
    `).join("");

    showModal(`
      <div class="challenge-titleline">
        <span class="challenge-icon">🔍</span>
        <div>
          <span class="modal-eyebrow">SCIENCE CHECKPOINT</span>
          <h2>Spot the Science!</h2>
          <p class="subnote">Tap the correct picture.</p>
        </div>
      </div>

      <div class="lq-spot-game">
        <h3>${q.question}</h3>

        <div class="lq-spot-choices">
          ${options}
        </div>

        <div id="science-feedback"
             class="lq-spot-feedback"
             aria-live="polite">
          Choose one picture!
        </div>
      </div>
    `);

    react("quiz");

    document.querySelectorAll("[data-spot]")
      .forEach(button => {

        button.onclick = () => {
          const choice = Number(button.dataset.spot);
          const feedback =
            document.getElementById("science-feedback");

          if (choice !== q.answer) {
            button.classList.add("is-error");
            feedback.textContent =
              "Not quite! Try another picture.";
            return;
          }

          button.classList.add("lq-spot-correct");

          document.querySelectorAll("[data-spot]")
            .forEach(b => b.disabled = true);

          challengeSolved++;
          score += 25;
          updateHud();
          react("correct");

          feedback.innerHTML = `
            <strong>✅ Great job!</strong>
            <p>${q.fact}</p>
            <button id="lq-spot-continue"
                    class="primary">
              CONTINUE THE ADVENTURE →
            </button>
          `;

          document.getElementById("lq-spot-continue")
            .onclick = onComplete;
        };
      });

    return;
  }

 const title=`<div class="challenge-titleline"><span class="challenge-icon">🧩</span><div><span class="modal-eyebrow">SCIENCE CHECKPOINT ${Math.floor(i/2)+1} / 3</span><h2>${activity.type==='match'?'Match the Science!':'Build the Sequence!'}</h2><p class="subnote">${activity.prompt} You can retry without losing progress.</p></div></div>`;
 const feedback='<div id="science-feedback" class="catch-feedback" aria-live="polite">Choose an item to begin.</div>';
 let finished=false;
 function success(){if(finished)return;finished=true;challengeSolved++;score+=25;updateHud();react('correct');const f=$('#science-feedback');f.innerHTML='<strong>✅ Correct! +25 SCIENCE ENERGY!</strong> You connected the ideas from the discoveries.<div style="margin-top:14px"><button id="science-resume" class="primary">CONTINUE THE ADVENTURE →</button></div>';$('#science-resume').onclick=onComplete;}
 if(activity.type==='order'){
   const steps=activity.steps;let chosenSteps=[];const perm=shuffleIndices(steps.length);
   showModal(title+`<div class="science-order-prompt">Tap each event in the order it happens:</div><div class="science-sequence" id="science-sequence"></div><div class="science-pick-grid" id="science-choices">${perm.map(k=>`<button class="science-pick" type="button" data-idx="${k}">${steps[k]}</button>`).join('')}</div><button class="science-reset" id="science-reset" type="button">↺ Start over</button>`+feedback);
   react('quiz');
   const chosenEl=$('#science-sequence'),hint=$('#science-feedback');
   const reset=()=>{chosenSteps=[];chosenEl.innerHTML='<span class="science-placeholder">Your sequence appears here →</span>';document.querySelectorAll('[data-idx]').forEach(b=>{b.disabled=false;b.classList.remove('is-error');});hint.textContent='Think about what happens first.';};
   reset();$('#science-reset').onclick=reset;
   document.querySelectorAll('[data-idx]').forEach(btn=>btn.onclick=()=>{
     if(finished)return;let idx=Number(btn.dataset.idx);
     if(idx!==chosenSteps.length){btn.classList.add('is-error');hint.textContent='Not quite! Which step happens next? Try another tile.';return;}
     btn.disabled=true;chosenSteps.push(idx);chosenEl.innerHTML=chosenSteps.map((k,j)=>`<div class="science-step"><b>${j+1}</b><span>${steps[k]}</span></div>`).join('');hint.textContent='Great! Keep building the sequence.';
     if(chosenSteps.length===steps.length)success();
   });
 }else{
   const pairs=activity.pairs,perm=shuffleIndices(pairs.length);let selected=null,done=new Set();
   showModal(title+`<div class="science-match-grid"><div><h3>FIRST CARD</h3><div class="science-match-column">${pairs.map((p,k)=>`<button type="button" class="science-match-tile" data-left="${k}">${p[0]}</button>`).join('')}</div></div><div><h3>MATCHING CARD</h3><div class="science-match-column">${perm.map(k=>`<button type="button" class="science-match-tile" data-right="${k}">${pairs[k][1]}</button>`).join('')}</div></div></div>`+feedback);
   react('quiz');const hint=$('#science-feedback');
   document.querySelectorAll('[data-left]').forEach(btn=>btn.onclick=()=>{if(finished||done.has(Number(btn.dataset.left)))return;document.querySelectorAll('[data-left]').forEach(b=>b.classList.remove('selected'));selected=Number(btn.dataset.left);btn.classList.add('selected');hint.textContent='Now choose the matching card on the right.';});
   document.querySelectorAll('[data-right]').forEach(btn=>btn.onclick=()=>{if(finished||selected===null)return;const idx=Number(btn.dataset.right);if(idx!==selected){btn.classList.add('is-error');hint.textContent='Not quite — try another card.';return;}done.add(idx);const left=$(`[data-left="${idx}"]`);left.classList.remove('selected');left.classList.add('matched');left.disabled=true;btn.classList.add('matched');btn.disabled=true;selected=null;hint.textContent=`Nice match! ${done.size} of ${pairs.length} complete.`;if(done.size===pairs.length)success();});
 }
}


/* Four quick hands-on activities replace one existing checkpoint in each level.
   They don't add extra tasks to the activity timeline. */
function makeHandsOnExperiment(onComplete){
 const prompts=[
  {name:'Attach HBV',intro:'Tap the glowing spot on the cell membrane to help HBV attach. Watch what happens!',caption:'HBV attaches to the outer cell membrane before entering.'},
  {name:'Tissue detective',intro:'Find and tap the TWO cells that look affected. Look for the orange cells with warning marks.',caption:'The immune response can hurt infected liver cells and cause inflammation.'},
  {name:'HBV: risk or safe?',intro:'Read each situation, then choose whether HBV can spread this way.',caption:'HBV can spread when infected blood enters a person’s body. Everyday contact is safe.'},
  {name:'Protect Liver City',intro:'Choose THREE helpful actions to build a protection shield around Liver City!',caption:'Vaccination, testing when needed, and avoiding shared needles help protect people.'}
 ];
 const data=prompts[level];
 const head=`<div class="hands-head"><span class="hands-icon">🔬</span><div><span class="modal-eyebrow">HANDS-ON SCIENCE · ${level+1} / 4</span><h2>${data.name}</h2><p>${data.intro}</p></div></div>`;
 const foot=`<div class="hands-feedback" id="hands-feedback" aria-live="polite">Try the activity above.</div><p class="hands-caption">💡 ${data.caption}</p>`;
 let complete=false;
 function done(){if(complete)return;complete=true;challengeSolved++;score+=25;updateHud();react('correct'); const f=$('#hands-feedback');f.classList.add('success');f.innerHTML=`<strong>Excellent investigation! +25 Science Energy.</strong><div class="hands-next"><button class="primary" id="hands-continue">CONTINUE THE ADVENTURE →</button></div>`;$('#hands-continue').onclick=onComplete;}
 if(level===0){
  showModal(head+`<div class="hands-stage"><svg viewBox="0 0 720 310" role="img" aria-label="HBV next to a liver cell with a highlighted membrane attachment point"><defs><radialGradient id="hc" cx="45%" cy="35%"><stop stop-color="#fff2fa"/><stop offset="1" stop-color="#f5afcd"/></radialGradient></defs><ellipse cx="473" cy="157" rx="210" ry="124" fill="url(#hc)" stroke="#b766a3" stroke-width="14"/><circle cx="532" cy="160" r="54" fill="#b18bdc" stroke="#7754b6" stroke-width="8"/><g opacity=".6"><ellipse cx="385" cy="112" rx="31" ry="14" fill="#ffdc8a" stroke="#c88e42" stroke-width="5" transform="rotate(-20 385 112)"/><ellipse cx="419" cy="210" rx="31" ry="14" fill="#ffdc8a" stroke="#c88e42" stroke-width="5" transform="rotate(25 419 210)"/></g><path d="M123 158H247" stroke="#cca9e9" stroke-width="7" stroke-dasharray="13 12"/><g id="hands-hbv" transform="translate(130 158)"><circle r="23" fill="#9865cf" stroke="#e3c3fb" stroke-width="6"/>${Array.from({length:10},(_,i)=>{let a=i*2*Math.PI/10;return `<path d="M${(Math.cos(a)*22).toFixed(1)} ${(Math.sin(a)*22).toFixed(1)}L${(Math.cos(a)*34).toFixed(1)} ${(Math.sin(a)*34).toFixed(1)}" stroke="#be83e3" stroke-width="5" stroke-linecap="round"/>`}).join('')}<circle cx="-7" cy="-5" r="4" fill="white"/><circle cx="8" cy="-5" r="4" fill="white"/></g><circle cx="266" cy="157" r="24" fill="#ffdb70" stroke="#b77c28" stroke-width="7"/><circle id="hands-dock-ring" cx="266" cy="157" r="39" fill="none" stroke="#ffe99c" stroke-width="6"/><text x="35" y="274" fill="#66418f" font-size="21" font-weight="900">HBV</text><text x="460" y="287" fill="#66418f" font-size="20" font-weight="900">Liver cell</text><text x="271" y="40" fill="#9d621e" font-size="17" font-weight="800">Attachment point</text></svg><button id="hands-attach" class="hands-target-button">✦ TAP TO ATTACH HBV</button></div>`+foot);
  $('#hands-attach').onclick=()=>{const v=$('#hands-hbv');v.classList.add('hands-move-to-cell');$('#hands-dock-ring').classList.add('hands-dock-pulse');$('#hands-attach').disabled=true;$('#hands-attach').textContent='✓ HBV ATTACHED';$('#hands-feedback').textContent='HBV has attached to the cell membrane!';setTimeout(done,750);};
 }else if(level===1){
  const damaged=new Set([2,5]);const found=new Set();
  const cells=Array.from({length:8},(_,i)=>`<button class="hands-cell ${damaged.has(i)?'damaged':''}" data-cell="${i}" aria-label="Inspect liver cell ${i+1}"><span class="hands-cell-nucleus"></span>${damaged.has(i)?'<span class="hands-cell-warning">!</span>':''}</button>`).join('');
  showModal(head+`<div class="hands-tissue"><div class="hands-tissue-grid">${cells}</div><div class="hands-discovered"><span>🔎 Affected cells found</span><strong id="hands-count">0 / 2</strong></div></div>`+foot);
  document.querySelectorAll('[data-cell]').forEach(b=>b.onclick=()=>{if(complete)return;const n=Number(b.dataset.cell);if(damaged.has(n)){if(found.has(n))return;found.add(n);b.classList.add('identified');$('#hands-count').textContent=`${found.size} / 2`;$('#hands-feedback').textContent='Good observation! You spotted a cell showing signs of damage.';if(found.size===2)done();}else{b.classList.add('checked-healthy');$('#hands-feedback').textContent='This pink cell looks healthy in our illustration. Look for orange cells with warning marks.';}});
 }else if(level===2){
  const cards=[{q:'Sharing a classroom desk',a:'safe',why:'Sharing a desk does not spread hepatitis B.'},{q:'Sharing a used needle',a:'risk',why:'Sharing needles can spread HBV through infected blood.'},{q:'Hugging a friend',a:'safe',why:'Hugging does not spread hepatitis B.'},{q:'Infected blood entering an open cut',a:'risk',why:'Infected blood entering another person’s body can spread HBV.'}];let n=0;
  showModal(head+`<div class="hands-sort"><div class="hands-sort-progress" id="hands-sort-progress">SITUATION 1 OF 4</div><div class="hands-situation" id="hands-situation">${cards[0].q}</div><div class="hands-choice-row"><button data-risk="risk" class="hands-risk-btn">⚠️ CAN SPREAD HBV</button><button data-risk="safe" class="hands-safe-btn">✓ EVERYDAY CONTACT IS SAFE</button></div></div>`+foot);
  const update=()=>{if(n>=cards.length){done();return;}$('#hands-sort-progress').textContent=`SITUATION ${n+1} OF ${cards.length}`;$('#hands-situation').textContent=cards[n].q;};
  document.querySelectorAll('[data-risk]').forEach(b=>b.onclick=()=>{if(complete)return;const item=cards[n];if(b.dataset.risk!==item.a){$('#hands-feedback').textContent='Try again. Think about whether infected blood could enter someone’s body.';return;}$('#hands-feedback').textContent=`Correct! ${item.why}`;n++;update();});
 }else{
  const actions=[{emoji:'💉',text:'Get the HBV vaccine',good:true},{emoji:'🧪',text:'Ask about testing after possible exposure',good:true},{emoji:'🤝',text:'Avoid a classmate who has HBV',good:false},{emoji:'🩹',text:'Never share needles',good:true},{emoji:'🍽️',text:'Stop sharing a classroom',good:false}];let found=0;
  showModal(head+`<div class="hands-protect"><div class="hands-liver"><svg viewBox="0 0 360 180" aria-label="Liver protected as you select healthy choices"><path d="M75 55Q125 9 231 37Q314 48 302 107Q290 164 224 155Q140 141 95 159Q38 157 49 105Z" fill="#d27b88" stroke="#91445a" stroke-width="9"/><path id="hands-shield-path" d="M175 3L290 42V107Q271 160 175 177Q83 160 62 107V42Z" fill="#77d9cb" fill-opacity=".05" stroke="#38ad9d" stroke-width="8" stroke-dasharray="18 12"/><text x="175" y="110" text-anchor="middle" fill="#fff" font-weight="900" font-size="25">LIVER CITY</text></svg><div class="hands-protect-meter"><span>Shield strength</span><strong id="hands-shield-count">0 / 3</strong></div></div><div class="hands-protect-actions">${actions.map((a,i)=>`<button data-protect="${i}" class="hands-protect-choice"><span>${a.emoji}</span><span>${a.text}</span></button>`).join('')}</div></div>`+foot);
  document.querySelectorAll('[data-protect]').forEach(b=>b.onclick=()=>{if(complete||b.disabled)return;const a=actions[Number(b.dataset.protect)];if(!a.good){b.classList.add('not-helpful');$('#hands-feedback').textContent='Not quite. HBV does not spread through normal classroom contact. Everyone deserves kindness.';return;}b.disabled=true;b.classList.add('helpful');found++;$('#hands-shield-count').textContent=`${found} / 3`;$('#hands-shield-path').setAttribute('fill-opacity',String(.05+found*.20));$('#hands-feedback').textContent='Great protection choice! The shield is getting stronger.';if(found===3)done();});
 }
}

const cellReview = [
 {q:'Which part of the cell holds the DNA instructions?', opts:['Nucleus','Cell membrane','Cytoplasm'], a:0, why:'The nucleus stores the cell’s DNA instructions.'},
 {q:'Which part helps give a cell energy?', opts:['Mitochondria','Cell membrane','Nucleus'], a:0, why:'Mitochondria help provide the energy that a cell uses.'},
 {q:'What surrounds a cell and controls what enters and leaves?', opts:['Cell membrane','Nucleus','Mitochondria'], a:0, why:'The cell membrane forms the boundary and helps control entry and exit.'},
 {q:'What is the jelly-like material inside a cell called?', opts:['Cytoplasm','Nucleus','Cell membrane'], a:0, why:'Cytoplasm is the jelly-like material inside cells.'},
 {q:'Which cell part builds proteins from messages?', opts:['Ribosomes','Cell membrane','Lysosomes'], a:0, why:'Ribosomes build proteins using cellular messages.'},
 {q:'Which organelle recycles unwanted materials?', opts:['Lysosomes','Nucleus','Golgi apparatus'], a:0, why:'Lysosomes recycle and break down unwanted cell materials.'}
];
let firstCatchEver = true;

const faces={scientist:{name:'Nova the Scientist',skin:'#ffd8b7',suit:'#65d9da'},robot:{name:'Bolt the Robot',skin:'#caeef6',suit:'#ffc85a'},creature:{name:'Pip the Micro-Creature',skin:'#e3c1ff',suit:'#b285ff'}};
let level=0, chosen='scientist', overlay=true, paused=true, canvas,ctx;
let mapGrid=[], W=25,H=17,T=40, player={x:1,y:1}, playerStart={x:1,y:1}, exit={x:1,y:1}, clues=[], enemies=[];
// Smooth drawing positions only; gameplay and collision stay on the grid.
let visualPlayer={x:1,y:1}, visualEnemies=[];
let dots=new Set(), studied=new Set(), score=0, catches=0, roundTime=0, invulnUntil=0, enemyTick=0, speechUntil=0;
const ui={};
const rootHTML=`<header class="top"><a class="brand" href="index.html">🧬 LIVER<span>QUEST</span></a><nav><a href="index.html">Mission Control</a><a href="cells.html">Cell City</a><a class="active" href="invasion.html">HBV Maze Quest</a></nav><button id="help" class="textbutton">How to play</button></header>
<main class="layout"><div class="heading"><div><span class="eyebrow">PAC-MAN STYLE · 4 LEVELS · LEARN IN ORDER</span><h1>HBV <em>MAZE QUEST</em></h1><p>Move through each maze, avoid the HBV attackers, and unlock the science clues in order. If HBV catches you, answer a quick question and continue the same level.</p></div><div class="level-pills" id="levels"></div></div>
<div class="play-layout"><section class="game-box"><div class="hud"><span id="hud-level">LEVEL 1 / 4</span><span id="hud-score">✦ 0 ENERGY</span><span id="hud-health">CAUGHT 0 TIMES</span><span id="hud-goal">CLUES 0 / 5</span></div><div class="board" id="board"><canvas id="mazeCanvas" width="${CANVAS_W}" height="${CANVAS_H}" aria-label="HBV maze game"></canvas><div class="speech" id="speech" hidden></div></div><div class="underbar"><span>MOVE: ARROWS / WASD · FIND THE CLUES IN ORDER · REACH THE EXIT</span><button id="pause" class="textbutton">Pause</button></div><div class="touch"><button data-dir="up">▲</button><div><button data-dir="left">◀</button><button data-dir="down">▼</button><button data-dir="right">▶</button></div></div></section>
<aside class="objectives"><div class="obj-top"><span class="eyebrow">CURRENT LEVEL</span><h2 id="objective-title"></h2><p id="objective-sub"></p></div><div id="objective-list"></div><div class="obj-legend"><div><span class="gem">✦</span> Energy dots</div><div><span class="gem station">?</span> Clue stations in order</div><div><span class="gem exit">⇥</span> Exit opens after all clues</div></div><p class="guide">Different maps. Different routes. Different clues. Complete a matching, sequencing, or hands-on science challenge after every two discoveries. Catch quizzes and bonus challenges are still part of the adventure.</p></aside></div></main>
<div class="modal" id="modal" hidden><div class="modal-card" id="modal-card"></div></div>`;
root.innerHTML=rootHTML; canvas=$('#mazeCanvas'); ctx=canvas.getContext('2d');
ui.levels=$('#levels'); ui.modal=$('#modal'); ui.modalCard=$('#modal-card'); ui.speech=$('#speech');
const dirs=[[1,0],[-1,0],[0,1],[0,-1]]; const pass=(x,y)=> y>=0 && y<H && x>=0 && x<W && mapGrid[y][x]!== '#'; const key=(x,y)=>`${x},${y}`;

const characterLines={
 scientist:{start:'Nova: Ready to investigate? Find the first clue!',clue:'Nova: Excellent observation! That clue teaches us something new.',quiz:'Nova: Think about what happened in the story!',caught:'Nova: Good effort! Let’s review and keep investigating.',correct:'Nova: Great reasoning! You earned Science Energy.',win:'Nova: Mission complete! You discovered how the science connects.'},
 robot:{start:'Bolt: Science mission activated. Begin exploring!',clue:'Bolt: Discovery saved! New science information added.',quiz:'Bolt: Pattern puzzle detected! Find the pairs!',caught:'Bolt: Virus contact detected. Review mode activated!',correct:'Bolt: Correct! Science knowledge confirmed.',win:'Bolt: Level complete. Science systems operational!'},
 creature:{start:'Pip: Woohoo! Let’s explore Liver City!',clue:'Pip: Ooooh! That is a cool discovery!',quiz:'Pip: A puzzle! I love figuring these out!',caught:'Pip: Oops! We can answer and try again!',correct:'Pip: Yay! We got it!',win:'Pip: Hooray! We did it!'}
};
function react(type,ms=2700){const phrase=(characterLines[chosen]||characterLines.scientist)[type];if(!phrase)return;const faces={scientist:'🔬',robot:'🤖',creature:'✨'};const line=faces[chosen]+' '+phrase;if(!ui.modal.hidden){let bubble=$('#modal-reaction');if(!bubble){ui.modalCard.insertAdjacentHTML('afterbegin','<div class="modal-reaction" id="modal-reaction" aria-live="polite"></div>');bubble=$('#modal-reaction');}bubble.textContent=line;}else say(line,ms);}

function portrait(type){const c=faces[type]||faces.scientist; return `<div class="face face-${type}" style="--skin:${c.skin};--suit:${c.suit}"><i class="hair"></i><i class="head"></i><i class="eye a"></i><i class="eye b"></i><i class="smile"></i><i class="torso"></i></div>`;}
function virusIcon(){return '<div class="viricon"><i class="veye left"></i><i class="veye right"></i><i class="vmouth"></i></div>';}
function showModal(html){ui.modal.hidden=false; ui.modalCard.innerHTML=html; overlay=true; paused=true;}
function closeModal(){ui.modal.hidden=true; overlay=false; paused=false; ui.modalCard.innerHTML='';}
function say(text,ms=2400){ui.speech.textContent=text; ui.speech.hidden=false; speechUntil=performance.now()+ms;}
function makePills(){ui.levels.innerHTML=levels.map((lv,i)=>`<span class="${i<level?'done':i===level?'current':''}">LEVEL ${i+1} · ${lv.name}</span>`).join('');}
function buildLevel(){const lv=levels[level]; mapGrid=lv.map.map(r=>r.split('')); H=mapGrid.length; W=mapGrid[0].length; T=Math.min(CANVAS_W/W,CANVAS_H/H); clues=[]; enemies=[]; studied=new Set(); dots=new Set(); score=0; catches=0; challengeSolved=0; roundTime=0; invulnUntil=0; enemyTick=0;
  for(let y=0;y<H;y++) for(let x=0;x<W;x++){
    const ch=mapGrid[y][x];
    if(ch==='P'){playerStart={x,y}; player={x,y}; mapGrid[y][x]=' ';}
    else if(ch==='E'){exit={x,y}; mapGrid[y][x]=' ';}
    else if(/[1-6]/.test(ch)){clues[Number(ch)-1]={x,y}; mapGrid[y][x]=' ';}
    else if(/[A-D]/.test(ch)){enemies.push({x,y,home:{x,y}}); mapGrid[y][x]=' ';}
  }
  enemies=enemies.slice(0,2);
  // Guarantee all required stations AND the exit are connected to the starting tile.
  // Reopen the smallest number of walls necessary when an old maze has islands.
  function reachableCells(){
    const seen=new Set([key(playerStart.x,playerStart.y)]), q=[playerStart];
    for(let i=0;i<q.length;i++) for(const [dx,dy] of dirs){
      const x=q[i].x+dx,y=q[i].y+dy,k=key(x,y);
      if(pass(x,y)&&!seen.has(k)){seen.add(k);q.push({x,y});}
    }
    return seen;
  }
  function joinTarget(target){
    if(reachableCells().has(key(target.x,target.y)))return;
    // Find the shortest wall-carving route from any connected tile to the target.
    const connected=reachableCells(), dist=new Map(), prev=new Map(), frontier=[];
    for(const k of connected){dist.set(k,0);const [x,y]=k.split(',').map(Number);frontier.push({x,y,cost:0});}
    while(frontier.length){
      frontier.sort((a,b)=>a.cost-b.cost);
      const current=frontier.shift(), here=key(current.x,current.y);
      if(current.cost!==dist.get(here))continue;
      if(here===key(target.x,target.y))break;
      for(const [dx,dy] of dirs){
        const x=current.x+dx,y=current.y+dy,k=key(x,y);
        if(x<1||x>=W-1||y<1||y>=H-1)continue;
        const cost=current.cost+(mapGrid[y][x]==='#'?5:1);
        if(cost<(dist.get(k)??Infinity)){dist.set(k,cost);prev.set(k,here);frontier.push({x,y,cost});}
      }
    }
    let k=key(target.x,target.y), guard=0;
    while(!connected.has(k)&&prev.has(k)&&guard++<W*H){
      const [x,y]=k.split(',').map(Number);mapGrid[y][x]=' ';
      k=prev.get(k);
    }
  }
  for(const target of [...clues,exit])joinTarget(target);
  // Open a few additional inner walls to form alternative routes and shortcuts.
  // This also makes the game less punishing for inexperienced players.
  for(let y=2;y<H-2;y++) for(let x=2;x<W-2;x++){
    if(mapGrid[y][x]!=='#'||(x+y+level*3)%11!==0)continue;
    const horizontal=pass(x-1,y)&&pass(x+1,y);
    const vertical=pass(x,y-1)&&pass(x,y+1);
    if(horizontal||vertical)mapGrid[y][x]=' ';
  }
  // Place two additional learning stations in accessible open maze sections.
  // Prefer distinct branches, not cramped corridors beside an existing station.
  const accessible=new Set([key(playerStart.x,playerStart.y)]), queue=[playerStart];
  for(let qi=0;qi<queue.length;qi++) for(const [dx,dy] of dirs){
    const x=queue[qi].x+dx,y=queue[qi].y+dy,k=key(x,y);
    if(pass(x,y)&&!accessible.has(k)){accessible.add(k);queue.push({x,y});}
  }
  while(clues.length<lv.clues.length){
    const used=[playerStart,exit,...clues,...enemies];
    const candidates=queue.filter(p=> !used.some(u=>u.x===p.x&&u.y===p.y));
    candidates.sort((a,b)=> {
      const dist=p=>Math.min(...used.map(u=>Math.abs(p.x-u.x)+Math.abs(p.y-u.y)));
      return dist(b)-dist(a);
    });
    if(!candidates.length)break;
    clues.push({...candidates[0]});
  }
  for(let y=0;y<H;y++) for(let x=0;x<W;x++){
    if(pass(x,y) && key(x,y)!==key(playerStart.x,playerStart.y) && key(x,y)!==key(exit.x,exit.y) && !clues.some(c=>c&&c.x===x&&c.y===y) && !enemies.some(e=>e.x===x&&e.y===y)) dots.add(key(x,y));
  }
   visualPlayer={...player}; visualEnemies=enemies.map(e=>({x:e.x,y:e.y}));
   updateSidebar(); updateHud(); makePills();
}
function updateSidebar(){const lv=levels[level]; $('#objective-title').textContent=lv.name; $('#objective-sub').textContent=lv.subtitle; $('#objective-list').innerHTML=lv.clues.map((c,i)=>`<div class="obj ${studied.has(i)?'done':''}"><span>${i+1}</span><div><strong>${c.title}</strong><small>${studied.has(i)?c.remember:c.brief}</small></div></div>`).join('');}
function updateHud(){ $('#hud-level').textContent=`LEVEL ${level+1} / ${levels.length}`; $('#hud-score').textContent=`✦ ${score} ENERGY`; $('#hud-health').textContent=`CAUGHT ${catches} ${catches===1?'TIME':'TIMES'}`; $('#hud-goal').textContent=`CLUES ${studied.size} / ${levels[level].clues.length}`; }
function help(){showModal(`<span class="modal-eyebrow">HOW TO PLAY</span><h2>Easy to learn. Fun to follow.</h2><div class="how"><div><strong>1. MOVE</strong><p>Use the arrow keys or WASD. On mobile, tap the arrow buttons.</p></div><div><strong>2. FOLLOW THE ORDER</strong><p>Find the glowing stations in number order. Each clue teaches the next part of the story. Complete short science activities as you progress.</p></div><div><strong>3. AVOID HBV</strong><p>The purple HBV enemies slowly chase you through the maze. If they catch you, answer a quick question and keep going.</p></div><div><strong>4. FINISH THE LEVEL</strong><p>After you find every clue in the level, go to the exit.</p></div></div><button id="startgame" class="primary">${level===0 && roundTime===0 ? 'CHOOSE MY CHARACTER' : 'BACK TO GAME'} →</button>`); $('#startgame').onclick=()=>{ if(level===0 && roundTime===0) chooseCharacter(); else closeModal();}; }
function chooseCharacter(){showModal(`<span class="modal-eyebrow">CHOOSE A CHARACTER</span><h2>Who will explore Liver City?</h2><div class="chargrid">${Object.keys(faces).map(type=>`<button class="charpick" data-char="${type}">${portrait(type)}<strong>${faces[type].name}</strong></button>`).join('')}</div><p class="subnote">All characters play the same. Pick the one your group likes best.</p>`); document.querySelectorAll('[data-char]').forEach(b=>b.onclick=()=>{chosen=b.dataset.char; closeModal(); react('start',3000); say('Find station 1 first. The clues will appear in order.',2600);}); }
function move(dx,dy){ if(paused||overlay) return; const nx=player.x+dx, ny=player.y+dy; if(!pass(nx,ny)) return; player={x:nx,y:ny}; const k=key(nx,ny); if(dots.delete(k)){ score+=5; if(score%100===0) say('Nice! Keep following the science clues in order.',1900); }
  clues.forEach((p,i)=>{ if(p.x===nx&&p.y===ny && !studied.has(i)){ if(i===studied.size) openClue(i); else say(`Find station ${studied.size+1} first!`,1800); }});
  if(nx===exit.x && ny===exit.y){ if(studied.size===levels[level].clues.length) finishLevel(); else say(`The exit opens after you find all ${levels[level].clues.length} clues.`,1800); }
  updateHud();
}
function bfsStep(start,target){ const q=[start], prev=new Map([[key(start.x,start.y),null]]); for(let qi=0; qi<q.length; qi++){ const cur=q[qi]; if(cur.x===target.x && cur.y===target.y) break; for(const [dx,dy] of dirs){ const nx=cur.x+dx, ny=cur.y+dy, k=key(nx,ny); if(pass(nx,ny) && !prev.has(k)){ prev.set(k,cur); q.push({x:nx,y:ny}); } } }
  if(!prev.has(key(target.x,target.y))) return null; let cur=target; while(prev.get(key(cur.x,cur.y)) && key(prev.get(key(cur.x,cur.y)).x,prev.get(key(cur.x,cur.y)).y)!==key(start.x,start.y)){ cur=prev.get(key(cur.x,cur.y)); } return cur; }
function advanceEnemies(){ const lv=levels[level]; enemies.forEach((e,idx)=>{ let next=null; const direct=bfsStep({x:e.x,y:e.y},{x:player.x,y:player.y}); if(direct && Math.random()<0.82) next=direct; else {
    const opts=dirs.map(([dx,dy])=>({x:e.x+dx,y:e.y+dy})).filter(p=>pass(p.x,p.y));
    if(opts.length){ opts.sort((a,b)=> (Math.abs(a.x-player.x)+Math.abs(a.y-player.y)) - (Math.abs(b.x-player.x)+Math.abs(b.y-player.y))); next=opts[Math.floor(Math.random()*Math.min(2,opts.length))]; }
  }
  if(next){ e.x=next.x; e.y=next.y; }
 }); checkCatch(); }
function checkCatch(){ if(performance.now()<invulnUntil || overlay) return; if(enemies.some(e=>e.x===player.x && e.y===player.y)){ catches++; const safe = studied.size ? clues[studied.size-1] : playerStart;
   player={...safe}; enemies.forEach(e=>{e.x=e.home.x; e.y=e.home.y;});
   visualPlayer={...player}; visualEnemies=enemies.map(e=>({x:e.x,y:e.y}));
  updateHud(); invulnUntil=performance.now()+7000; catchQuiz(); } }
function catchQuiz(){ const first=firstCatchEver; firstCatchEver=false;
 const bank=level===0?cellReview:levels[level-1].catch; const source=bank[Math.floor(Math.random()*bank.length)];
 const order=[0,1,2].sort(()=>Math.random()-.5);
 const q={...source,opts:order.map(i=>source.opts[i]),a:order.indexOf(source.a)}; showModal(`<div class="catch-hero">${virusIcon()}<div><span class="modal-eyebrow">HBV CAUGHT YOU</span><h2>${level===0?'Quick Cell City review!':'Previous level review!'}</h2><p class="subnote">You keep your clues and return near your last discovery. Answer to continue.</p></div></div><div class="catch-question">${q.q}</div><div class="catch-options">${q.opts.map((opt,i)=>`<button class="catch-option" data-opt="${i}">${opt}</button>`).join('')}</div><div class="catch-feedback" id="catch-feedback"></div>`);
  react('caught'); document.querySelectorAll('[data-opt]').forEach(btn=>btn.onclick=()=>{ const i=Number(btn.dataset.opt); if(i===q.a){ btn.classList.add('correct'); $('#catch-feedback').innerHTML=`<strong>Correct!</strong> ${q.why}<div style="margin-top:13px"><button class="primary" id="resume-game">BACK TO THE MAZE →</button></div>`; document.querySelectorAll('[data-opt]').forEach(b=>b.disabled=true); $('#resume-game').onclick=()=>{closeModal();react('correct');}; } else { btn.classList.add('wrong'); $('#catch-feedback').textContent='Try again. Think about what the level has already taught you.'; } }); }
function openClue(i){ const data=levels[level].clues[i]; studied.add(i); updateHud(); updateSidebar(); showModal(`<span class="modal-eyebrow">CLUE ${i+1} OF ${levels[level].clues.length}</span><h2>${data.title}</h2><div class="lesson"><div class="science-anim ${data.art}" id="animated-science">${sceneArt(data.art)}</div><div><p class="large">${data.brief}</p><p>${data.detail}</p><p><strong>Remember:</strong> ${data.remember}</p><p class="visual-scale-note">Drawings are enlarged so you can see them. A real HBV particle is much smaller than a liver cell.</p><button type="button" id="replay-science" class="secondary">↻ REPLAY ANIMATION</button><button id="continue-lesson" class="primary">KEEP PLAYING →</button></div></div>`); $('#replay-science').onclick=()=>{ const box=$('#animated-science'); box.innerHTML=sceneArt(data.art); }; $('#continue-lesson').onclick=()=>{
   const resume=()=>{closeModal(); react('clue',2200); if(studied.size===levels[level].clues.length) say('All clues found! Head for the glowing exit.',2600);};
   if(i%2===1 || (levels[level].clues.length===5 && i===4)){if((level===0&&i===1)||(level===1&&i===3)||(level===2&&i===1)||(level===3&&i===3))makeHandsOnExperiment(resume);else makeScienceChallenge(i,resume);} else resume();
  }; }
function finishLevel(){ const lv=levels[level]; const levelSeconds=Math.round(roundTime/1000); const qualify = false; if(qualify && !lv._bonusDone){ lv._bonusDone=true; const q=lv.bonus; showModal(`<span class="modal-eyebrow">BONUS CHALLENGE</span><h2>Wow — your group moved through that level fast!</h2><p class="subnote">Answer one extra question to unlock the next maze.</p><div class="catch-question">${q.q}</div><div class="catch-options">${q.opts.map((opt,i)=>`<button class="catch-option" data-bonus="${i}">${opt}</button>`).join('')}</div><div class="catch-feedback" id="bonus-feedback"></div>`); document.querySelectorAll('[data-bonus]').forEach(btn=>btn.onclick=()=>{ const i=Number(btn.dataset.bonus); if(i===q.a){ btn.classList.add('correct'); $('#bonus-feedback').innerHTML=`<strong>Great job!</strong> ${q.why}<div style="margin-top:13px"><button class="primary" id="next-level-btn">NEXT LEVEL →</button></div>`; document.querySelectorAll('[data-bonus]').forEach(b=>b.disabled=true); $('#next-level-btn').onclick=nextLevel; } else { btn.classList.add('wrong'); $('#bonus-feedback').textContent='Try again. Use what the level just taught you.'; } }); return; }
  showModal(`<span class="modal-eyebrow">LEVEL COMPLETE</span><h2>You finished ${lv.name}!</h2><div class="level-win">★<span>LEVEL ${level+1} COMPLETE</span></div><p>You found all ${lv.clues.length} clues, escaped the HBV attackers, and completed the level story in order.</p><button id="next-level" class="primary">${level<levels.length-1?'NEXT LEVEL':'SEE FINAL MESSAGE'} →</button>`); $('#next-level').onclick=nextLevel; react('win'); }
function nextLevel(){ if(level<levels.length-1){ level++; buildLevel(); closeModal(); react('start',3000); } else { showEnding(); } }
function showEnding(){ showModal(`<span class="modal-eyebrow">MISSION COMPLETE</span><h2>You protected Liver City!</h2><div class="lesson"><div class="science-anim protect">${sceneArt('protect')}</div><div><p class="large">You followed the HBV story from cell entry to liver protection.</p><p>You learned that HBV attaches to a liver cell, gets inside, can lead to more viruses, may cause inflammation and scarring over time, and can be prevented with vaccination and managed with testing and care.</p><p><strong>Most important:</strong> science helps us understand disease, and kindness helps us support people.</p><div><button id="play-again" class="primary">PLAY AGAIN</button><button id="back-home" class="secondary">MISSION CONTROL</button></div></div></div>`); $('#play-again').onclick=()=>{ levels.forEach(l=>delete l._bonusDone); level=0; buildLevel(); closeModal(); chooseCharacter(); }; $('#back-home').onclick=()=>location.href='index.html'; }


/* Six purpose-built Stage 1 scenes. SVG's native timeline avoids competing CSS transforms. */
function stage1Scene(kind){
 const name={arrive:'1 · A virus approaches a liver cell',attach:'1 · The virus docks on a membrane receptor',enter:'2 · The virus enters the cytoplasm',toNucleus:'3 · HBV brings its messages toward the nucleus',dnaCopy:'4 · Messages tell the cell to make virus parts',assembly:'5 · Cell components assemble and release new HBV'}[kind];
 const dur='6.8s';
 const defs=`<defs>
 <radialGradient id="s1cyto" cx="40%" cy="30%" r="72%"><stop stop-color="#fff4fb"/><stop offset=".7" stop-color="#f9c6df"/><stop offset="1" stop-color="#eda3c9"/></radialGradient>
 <radialGradient id="s1nuc" cx="32%" cy="28%" r="75%"><stop stop-color="#e8d6ff"/><stop offset="1" stop-color="#9870cf"/></radialGradient>
 <radialGradient id="s1virus" cx="30%" cy="25%" r="75%"><stop stop-color="#d7b0f6"/><stop offset="1" stop-color="#8248b9"/></radialGradient>
 <linearGradient id="s1mito" x2="1" y2="1"><stop stop-color="#ffe0a1"/><stop offset="1" stop-color="#eaa059"/></linearGradient>
 <clipPath id="s1cellclip"><ellipse cx="416" cy="226" rx="242" ry="164"/></clipPath>
 <marker id="s1arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#479cb8"/></marker>
 </defs>`;
 const cell=`<g class="s1-cell"><ellipse cx="416" cy="226" rx="250" ry="172" fill="url(#s1cyto)" stroke="#b95b98" stroke-width="14"/>
 <ellipse cx="416" cy="226" rx="237" ry="159" fill="none" stroke="#ffeafd" stroke-width="4" opacity=".9"/>
 <g opacity=".78" fill="none" stroke="#bc82c7" stroke-width="7" stroke-linecap="round"><path d="M272 178q-32 16 0 32t1 38"/><path d="M290 316q-35-17-28-44t43-22"/><path d="M433 317q28 17 57-9"/></g>
 <g transform="translate(292 302) rotate(-22)"><ellipse rx="43" ry="20" fill="url(#s1mito)" stroke="#b36a36" stroke-width="5"/><path d="M-29 0l10 -10 12 19 13-18 12 13 12-9" stroke="#b36a36" stroke-width="4" fill="none"/></g>
 <g transform="translate(565 316) rotate(19)"><ellipse rx="43" ry="20" fill="url(#s1mito)" stroke="#b36a36" stroke-width="5"/><path d="M-29 0l10 -10 12 19 13-18 12 13 12-9" stroke="#b36a36" stroke-width="4" fill="none"/></g>
 <g class="s1-nucleus"><circle cx="527" cy="212" r="73" fill="url(#s1nuc)" stroke="#6b409f" stroke-width="9"/><circle cx="527" cy="212" r="55" fill="none" stroke="#e5d0ff" stroke-width="3" opacity=".9"/><path d="M501 183q26 20 5 58m41-57q-24 24 0 57m-40-38h40m-40 22h40" stroke="#fff2ff" stroke-width="4" fill="none"/></g></g>`;
 const virus=(s=11)=>`<g class="s1-hbv"><circle r="${s}" fill="url(#s1virus)" stroke="#f5d8ff" stroke-width="3"/>${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<path d="M${(Math.cos(a)*(s+1)).toFixed(1)} ${(Math.sin(a)*(s+1)).toFixed(1)}L${(Math.cos(a)*(s+7)).toFixed(1)} ${(Math.sin(a)*(s+7)).toFixed(1)}" stroke="#c486e8" stroke-width="3" stroke-linecap="round"/>`}).join('')}<circle cx="-4" cy="-3" r="2.4" fill="#fff"/><circle cx="4" cy="-3" r="2.4" fill="#fff"/></g>`;
 const move=(path,delay='0s',duration=dur)=>`<animateMotion dur="${duration}" begin="${delay}" repeatCount="indefinite" calcMode="linear" path="${path}"/>`;
 const fade=(values='0;1;1;0',keyTimes='0;.22;.86;1',begin='0s')=>`<animate attributeName="opacity" values="${values}" keyTimes="${keyTimes}" dur="${dur}" begin="${begin}" repeatCount="indefinite"/>`;
 const label=(x,y,title,color='#65458d')=>`<g class="s1-chip"><rect x="${x-10}" y="${y-24}" rx="11" width="${Math.max(105,title.length*9+28)}" height="38" fill="white" stroke="#e3c9f2" stroke-width="2"/><text x="${x}" y="${y}" font-weight="900" font-size="17" fill="${color}">${title}</text></g>`;
 let art='';
 if(kind==='arrive'){
   art=`${cell}<path d="M50 225H155" stroke="#e2ab64" stroke-width="7" stroke-dasharray="10 13" fill="none"/>${label(42,124,'HBV particle')}${label(280,415,'Liver cell')}
   <g transform="translate(55 225)">${virus(10)}${move('M0 0 L80 0 L80 0 L0 0')}</g>
   <circle cx="166" cy="225" r="24" fill="none" stroke="#ffdd7b" stroke-width="4"><animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".3;1;.3" dur="2s" repeatCount="indefinite"/></circle>`;
 }
 if(kind==='attach'){
   art=`${cell}${label(28,120,'Cell membrane')}${label(192,413,'Attachment point')}
   <g class="s1-receptor"><path d="M171 208q-20 15 0 34" fill="none" stroke="#f3cf69" stroke-width="12" stroke-linecap="round"/><circle cx="168" cy="226" r="11" fill="#ffec96" stroke="#b58338" stroke-width="3"/></g>
   <g transform="translate(80 226)">${virus(10)}${move('M0 0 L72 0 L72 0 L0 0')}</g>
   <circle cx="169" cy="226" r="22" fill="none" stroke="#ffc846" stroke-width="5" opacity="0">${fade()}</circle>`;
 }

if(kind==='enter'){
  art=`${cell}
    ${label(42,120,'Outside')}
    ${label(286,415,'Inside: cytoplasm')}

    <!-- Glowing membrane opening -->
    <ellipse cx="170" cy="226" rx="22" ry="36"
      fill="#fff1c6" stroke="#e9b94e" stroke-width="5"/>

    <circle cx="170" cy="226" r="27"
      fill="none" stroke="#ffd65c" stroke-width="4">
      <animate attributeName="opacity"
        values=".3;1;.3" dur="1.5s"
        repeatCount="indefinite"/>
    </circle>

    <!-- Virus 1: approaches from above -->
    <g transform="translate(65 180)">
      ${virus(15)}
      <animateMotion
        path="M0 0 C50 0 75 28 105 46 S175 30 245 5"
        dur="6.8s"
        repeatCount="indefinite"/>
    </g>

    <!-- Virus 2: approaches from below -->
    <g transform="translate(65 280)">
      ${virus(15)}
      <animateMotion
        path="M0 0 C55 0 75 -30 105 -54 S180 -25 250 10"
        dur="6.8s"
        begin="1.2s"
        repeatCount="indefinite"/>
    </g>

    <!-- Entry direction -->
    <path d="M205 226 Q250 226 315 230"
      fill="none" stroke="#4eb6d0"
      stroke-width="5"
      stroke-dasharray="12 9"
      marker-end="url(#s1arr)"/>
  `;
}

 if(kind==='toNucleus'){
   art=`${cell}${label(205,414,'Inside the cell')}${label(555,115,'Nucleus')}
   <path d="M265 226Q350 240 432 217T498 213" stroke="#f8c95e" stroke-width="6" stroke-dasharray="12 10" fill="none"/>
   <g transform="translate(265 226)"><g opacity="1">${virus(9)}</g>${move('M0 0 Q90 12 167 -8 T232 -13 L232 -13 L0 0')}</g>
   <circle cx="527" cy="212" r="88" fill="none" stroke="#f5d76b" stroke-width="5" opacity=".6"><animate attributeName="r" values="82;92;82" dur="2.3s" repeatCount="indefinite"/></circle>`;
 }
 if(kind==='dnaCopy'){
   // No virus particle leaves nucleus. Blue instructions flow outward; proteins emerge later in the cytoplasm.
   const message=`<g><rect x="-17" y="-11" width="34" height="22" rx="5" fill="#fff3a8" stroke="#c79d3f" stroke-width="3"/><path d="M-10 -4h20M-10 3h14" stroke="#9c762d" stroke-width="2"/></g>`;
   art=`${cell}${label(535,114,'Nucleus')}${label(238,412,'Viral instructions → virus parts')}
   <g><path d="M470 255Q419 288 370 260T305 238" fill="none" stroke="#459fc1" stroke-width="6" stroke-dasharray="13 10"/></g>
   <g transform="translate(470 255)">${message}${move('M0 0 Q-45 35 -95 5 T-165 -17')}</g>
   <g transform="translate(470 255)" opacity="0">${message}${move('M0 0 Q-45 35 -95 5 T-165 -17','2s')}${fade('0;0;1;1;0','0;.12;.25;.82;1','2s')}</g>
   <g opacity="0">${fade('0;0;1;1;0','0;.3;.52;.85;1')}<circle cx="304" cy="210" r="16" fill="#4cbec3" stroke="#2f859b" stroke-width="4"/><circle cx="340" cy="188" r="12" fill="#6ab4db" stroke="#378da9" stroke-width="4"/><circle cx="275" cy="260" r="10" fill="#66d0bb" stroke="#379b8c" stroke-width="4"/></g>`;
 }
 if(kind==='assembly'){
   const part=(x,y,col,delay)=>`<g opacity="0" transform="translate(${x} ${y})"><circle r="10" fill="${col}" stroke="#fff" stroke-width="3"/>${fade('0;0;1;1;0','0;.2;.44;.87;1',delay)}</g>`;
   art=`${cell}${label(220,115,'Virus parts')}${label(466,415,'Mitochondria supply energy')}
   <g><circle cx="417" cy="227" r="34" fill="none" stroke="#9c71bf" stroke-width="4" stroke-dasharray="7 7"/></g>
   ${part(350,204,'#64c6ce','0s')}${part(369,254,'#86d6d1','1s')}${part(465,198,'#74b7e5','1.8s')}
   <g transform="translate(417 227)" opacity="0">${virus(14)}${fade('0;0;1;1;0','0;.36;.56;.8;1')}</g>
   <path d="M450 227Q525 215 647 213" stroke="#5aaecf" stroke-width="6" stroke-dasharray="12 11" fill="none"/>
   <g transform="translate(417 227)" opacity="0">${virus(12)}${move('M0 0 Q110 -12 245 -15')}${fade('0;0;0;1;0','0;.3;.53;.8;1')}</g>
   <g transform="translate(417 227)" opacity="0">${virus(11)}${move('M0 0 Q90 26 240 42','1.5s')}${fade('0;0;0;1;0','0;.3;.53;.8;1','1.5s')}</g>
   <path d="M328 300Q358 267 400 240" stroke="#ffce67" stroke-width="5" stroke-dasharray="8 9" fill="none"/><g transform="translate(348 288)"><path d="M0 -13L-8 3H0L-7 18L13 -5H4L10 -13Z" fill="#ffd456" stroke="#c39434" stroke-width="2"/></g>`;
 }
 return `<div class="lesson-animation-wrap s1-wrap"><svg class="lesson-svg s1-svg" viewBox="0 0 800 450" role="img" aria-label="${name}">${defs}<rect width="800" height="450" fill="#fff4fc"/><circle cx="718" cy="50" r="110" fill="#e8f6ff" opacity=".6"/><circle cx="65" cy="370" r="110" fill="#fce5f2"/>${art}</svg><div class="animation-caption">${name}</div><div class="animation-progress"><span></span></div></div>`;
}


// Individually storyboarded Level 3 and 4 animations; all positions use the SVG viewBox.
function detailedScienceArt(kind){
 const virus=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="12" fill="#8556c7" stroke="#542c91" stroke-width="2.6"/>${Array.from({length:10},(_,i)=>{let a=i*2*Math.PI/10;return `<path d="M${(Math.cos(a)*12).toFixed(1)} ${(Math.sin(a)*12).toFixed(1)}L${(Math.cos(a)*18).toFixed(1)} ${(Math.sin(a)*18).toFixed(1)}" stroke="#bd8ee3" stroke-linecap="round" stroke-width="3"/>`}).join('')}<circle cx="-4" cy="-3" r="2.5" fill="#fff"/><circle cx="4" cy="-3" r="2.5" fill="#fff"/></g>`;
 const human=(x,y,shirt='#6bc6c7',scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cy="-36" rx="28" ry="34" fill="#f2c4a6" stroke="#bb876b" stroke-width="3"/><path d="M-35 -42q-5 -45 33 -38q38 -3 33 37q-22 -22 -66 1" fill="#453858"/><circle cx="-10" cy="-37" r="2.5" fill="#3d3150"/><circle cx="10" cy="-37" r="2.5" fill="#3d3150"/><path d="M-6 -22q6 6 13 0" stroke="#b46e79" stroke-width="2.5" fill="none"/><path d="M-39 7q-8 -18 8 -23h65q19 6 10 25l-8 90h-64z" fill="${shirt}" stroke="#fff" stroke-width="4"/><path d="M-37 22l-12 66m88 -66 12 66" stroke="#e6ad91" stroke-width="14" stroke-linecap="round"/><path d="M-20 96l-6 40m50 -40 6 40" stroke="#5f6687" stroke-width="17" stroke-linecap="round"/></g>`;
 const drop=(x,y,s=1,cls='')=>`<path class="${cls}" transform="translate(${x} ${y}) scale(${s})" d="M0 -19C6 -9 14 0 14 9A14 14 0 1 1 -14 9C-14 0 -6 -9 0 -19Z" fill="#df465f" stroke="#a92b48" stroke-width="2.5"/>`;
 const liver=`<path d="M-128 -40C-87 -114 15 -108 91 -79C164 -52 166 26 100 82C61 107 12 90 -16 79C-77 106 -126 74 -141 25C-151 -5 -145 -21 -128 -40Z" fill="url(#liver34)" stroke="#8c4052" stroke-width="8"/><path d="M-107 -15Q-20 -62 97 -32" stroke="#edabac" stroke-width="7" opacity=".38" fill="none"/>`;
 const miniCell=(x,y,r=31,damaged=false)=>`<g transform="translate(${x} ${y})"><ellipse rx="${r}" ry="${r*.78}" fill="${damaged?'#ed9b8b':'#ffc3d3'}" stroke="${damaged?'#c66b65':'#ce82a5'}" stroke-width="4"/><circle r="${r*.25}" fill="#9069bd"/>${damaged?`<path d="M-${r*.72} -4l${r*.4} -9m5 21l${r*.4} -8" stroke="#ba5858" stroke-width="4"/>`:''}</g>`;
 const needle=(x,y,sc=1)=>`<g transform="translate(${x} ${y}) scale(${sc})"><rect x="-62" y="-12" width="96" height="24" rx="5" fill="#dbf3fb" stroke="#679eb2" stroke-width="4"/><rect x="-35" y="-9" width="38" height="18" rx="3" fill="#e5a8bd"/><rect x="-73" y="-19" width="12" height="38" rx="3" fill="#97b9c8"/><path d="M34 0H105" stroke="#8195a7" stroke-width="5"/><path d="M105 0l23 -4" stroke="#657b89" stroke-width="2"/></g>`;
 const shield=(x,y,sc=1)=>`<g transform="translate(${x} ${y}) scale(${sc})"><path d="M0 -82L70 -56L66 16Q46 74 0 96Q-55 68 -68 16L-69 -56Z" fill="url(#shield34)" stroke="#3d9b92" stroke-width="9"/><path d="M-36 4l24 25 49 -55" stroke="#f9fffb" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
 let a='',h='';
 if(kind==='spreadBlood'){
 h='Infected blood can spread HBV if it enters a break in the skin';
 a=`<g class="exposure-source"><rect x="88" y="85" width="224" height="262" rx="30" fill="#fff9fd" stroke="#e4b9d0" stroke-width="6"/><path d="M130 143q40 -25 82 0t60 0" stroke="#d76e79" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M130 187q30 18 55 0" stroke="#f1aeab" stroke-width="12" fill="none"/><path d="M178 250v-30" stroke="#b86578" stroke-width="6" stroke-linecap="round"/>${drop(180,269,.9)}<text x="200" y="314" text-anchor="middle" font-size="18" font-weight="900" fill="#864962">INFECTED BLOOD</text></g><path d="M330 232h125" stroke="#d39ec0" stroke-width="9" stroke-dasharray="14 14"/><g class="exposure-skin"><rect x="480" y="85" width="240" height="262" rx="30" fill="#fff9fd" stroke="#e4b9d0" stroke-width="6"/><path d="M500 193H700" stroke="#dc9a83" stroke-width="32" stroke-linecap="round"/><path d="M500 221H700" stroke="#f5c5ab" stroke-width="24"/><path d="M574 177l13 24 13 -24 13 24 13 -24" stroke="#bd5269" fill="none" stroke-width="7"/><path d="M560 265q40 22 80 0" stroke="#e6a1ad" fill="none" stroke-width="14"/><text x="600" y="314" text-anchor="middle" font-size="18" font-weight="900" fill="#864962">BREAK IN SKIN</text></g><g class="blood-traveler">${drop(0,0,.78)}<animateMotion dur="5.5s" repeatCount="indefinite" path="M180 269 C280 300 430 225 585 191" keyTimes="0;1" calcMode="linear"/></g><circle cx="588" cy="191" r="21" fill="none" stroke="#fa8f61" stroke-width="5" class="infection-target"/>`;
 }
 else if(kind==='noSpread'){
 h='Hugs, shared lunches, and classroom contact do not spread HBV';
 a=`${human(245,220,'#69cace',1.12)}${human(350,220,'#e7b76a',1.12)}<g class="shared-safe"><path d="M225 237q75 35 140 0" fill="none" stroke="#d5a487" stroke-width="18" stroke-linecap="round"/><path d="M220 354h190" stroke="#9b75c8" stroke-width="12"/><rect x="285" y="324" width="64" height="26" rx="11" fill="#f0d4a4"/><circle cx="305" cy="323" r="9" fill="#d96775"/><circle cx="327" cy="323" r="9" fill="#80b582"/></g>${shield(606,214,.9)}<path d="M565 360q41 21 84 0" stroke="#60bbaa" stroke-width="6" fill="none"/>`;
 }
 else if(kind==='vaccine'){
 h='The hepatitis B vaccine prepares immune protection before exposure';
 a=`${needle(188,208,1.1)}<path d="M334 209h125m-20 -15 20 15 -20 15" stroke="#8dbac7" stroke-width="8" fill="none" stroke-linecap="round"/><g class="shield-building">${shield(556,209,.92)}</g>${virus(703,207,.8)}<path class="stop-line" d="M644 145l33 32m0 -32 -33 32" stroke="#d35e77" stroke-width="8" stroke-linecap="round"/><g class="immune-spark"><circle cx="556" cy="210" r="110" fill="none" stroke="#7edac7" stroke-width="4" stroke-dasharray="13 15"/></g>`;
 }
 else if(kind==='test'){
 h='A blood sample is tested to look for hepatitis B infection';
 a=`<g class="blood-tube"><rect x="143" y="108" width="97" height="236" rx="29" fill="#f2fcff" stroke="#75b2c7" stroke-width="7"/><rect x="155" y="220" width="72" height="112" rx="22" fill="#c9536a"/><rect x="143" y="105" width="97" height="34" rx="10" fill="#8a72c3"/><rect x="163" y="167" width="57" height="29" rx="6" fill="#fff"/></g><path d="M270 216h113m-18 -17 18 17 -18 17" stroke="#a99dd0" stroke-width="9" fill="none"/><g class="lab-card"><rect x="412" y="109" width="272" height="237" rx="22" fill="#fff" stroke="#b8a5dd" stroke-width="7"/><rect x="447" y="146" width="198" height="61" rx="13" fill="#e4f7f9"/><g class="test-lines"><path d="M472 173h70" stroke="#a277c1" stroke-width="8"/><path d="M472 190h125" stroke="#cc6587" stroke-width="8"/></g><circle cx="551" cy="274" r="49" fill="#d8f3e8" stroke="#63bd9a" stroke-width="7"/><path d="M527 276l17 16 33 -35" stroke="#258d69" stroke-width="10" stroke-linecap="round" fill="none"/></g>`;
 }
 else if(kind==='birthNeedle'){
 h='HBV can pass during birth or through shared needles';
 a=`<rect x="35" y="65" width="348" height="307" rx="25" fill="#fff9fd" stroke="#ecc7dc" stroke-width="5"/><rect x="420" y="65" width="345" height="307" rx="25" fill="#f8fbff" stroke="#bdd9e7" stroke-width="5"/><text x="209" y="106" text-anchor="middle" font-size="22" font-weight="900" fill="#865273">DURING BIRTH</text><text x="592" y="106" text-anchor="middle" font-size="22" font-weight="900" fill="#526f8e">SHARED NEEDLES</text>${human(165,239,'#e9a6c5',.82)}<g class="baby"><circle cx="270" cy="234" r="24" fill="#f3c9ac"/><path d="M245 264q24 -23 52 0l14 58h-76z" fill="#f3d58d" stroke="#fff" stroke-width="4"/></g><path d="M226 233q19 -20 41 -8" stroke="#ce7892" stroke-width="7" fill="none" stroke-linecap="round"/><circle class="source-pulse" cx="267" cy="226" r="43" fill="none" stroke="#db91aa" stroke-width="5"/>${needle(576,230,.85)}<g transform="translate(580 310)"><circle r="32" fill="#fff1e7" stroke="#d48e82" stroke-width="5"/>${drop(0,-5,.42)}</g><path d="M649 194l58 58m0 -58 -58 58" stroke="#d86174" stroke-width="10" stroke-linecap="round"/>`;
 }
 else if(kind==='quietTest'){
 h='A person can feel healthy and still have hepatitis B';
 a=`${human(200,228,'#65c6ce',1.1)}<g class="hidden-viruses">${virus(302,183,.52)}${virus(334,231,.43)}${virus(309,259,.48)}</g><path d="M367 217h105m-17 -17 17 17 -17 17" fill="none" stroke="#a39bcb" stroke-width="9"/><g class="quiet-lab"><rect x="525" y="130" width="100" height="185" rx="25" fill="#effcff" stroke="#80b9cd" stroke-width="7"/><rect x="538" y="230" width="74" height="75" rx="16" fill="#c85068"/><rect x="528" y="127" width="95" height="29" rx="8" fill="#8d73c7"/></g><g class="lab-check"><circle cx="671" cy="209" r="47" fill="#def8eb" stroke="#63ba98" stroke-width="7"/><path d="M649 211l17 16 31 -35" stroke="#258d69" stroke-width="10" fill="none" stroke-linecap="round"/></g>`;
 }
 else if(kind==='cellsToLiver'){
 h='Individual cells work together to form tissue and the liver organ';
 a=`${miniCell(118,225,65)}<path d="M207 226h86m-19 -15 19 15 -19 15" stroke="#a890d1" stroke-width="9" fill="none"/><g class="cell-tissue">${[0,1,2,3,4,5].map(i=>miniCell(340+(i%3)*67,188+Math.floor(i/3)*77,32)).join('')}</g><path d="M558 226h70m-19 -15 19 15 -19 15" stroke="#a890d1" stroke-width="9" fill="none"/><g transform="translate(700 222) scale(.43)">${liver}</g><text x="114" y="335" text-anchor="middle" font-size="18" fill="#764d98" font-weight="900">CELL</text><text x="411" y="340" text-anchor="middle" font-size="18" fill="#764d98" font-weight="900">TISSUE</text><text x="694" y="338" text-anchor="middle" font-size="18" fill="#764d98" font-weight="900">ORGAN</text>`;
 }
 else if(kind==='harm'){
 h='Immune responses to infected liver cells can injure tissue over time';
 a=`<g transform="translate(275 215) scale(.83)">${liver}</g><g class="injury-cells">${[0,1,2,3,4,5].map((i)=>miniCell(490+(i%3)*76,156+Math.floor(i/3)*95,31,i===2||i===4)).join('')}</g><g class="immune-attack"><circle cx="521" cy="100" r="27" fill="#76d4e7" stroke="#348aab" stroke-width="6"/><circle cx="657" cy="105" r="27" fill="#76d4e7" stroke="#348aab" stroke-width="6"/></g><path class="damage-trail" d="M555 178Q592 188 617 208" stroke="#d8737d" stroke-width="9" stroke-dasharray="13 10" fill="none"/>`;
 }
 else if(kind==='protect'){
 h='Vaccination, testing, and care help protect liver health';
 a=`<g class="protected-liver" transform="translate(382 224) scale(.95)">${liver}</g><g class="guarding">${shield(408,215,1.16)}</g><g class="care-icons"><circle cx="145" cy="185" r="63" fill="#fff3c6" stroke="#e5bc65" stroke-width="7"/>${needle(145,183,.45)}<circle cx="651" cy="185" r="63" fill="#edf8ff" stroke="#8dbcd3" stroke-width="7"/><rect x="633" y="146" width="36" height="69" rx="10" fill="#dceef5" stroke="#80b1c4" stroke-width="4"/><rect x="639" y="181" width="24" height="29" rx="5" fill="#c84c6c"/></g><g class="care-links"><path d="M216 193q70 -70 122 -25M590 170q-60 -50 -119 0" stroke="#b8a4d5" stroke-width="7" stroke-dasharray="11 10" fill="none"/></g>`;
 }
 else if(kind==='kindness'){
 h='People living with hepatitis B deserve kindness and respect';
 a=`${human(235,220,'#75cacf',1.12)}${human(554,220,'#bca2e8',1.12)}<g class="friendship-heart"><path d="M357 172C357 136 398 128 420 158C442 128 482 136 482 172C482 213 420 254 420 254S357 213 357 172Z" fill="#ef7f9e" stroke="#c35a84" stroke-width="6"/></g><g class="friendship-line"><path d="M294 251Q390 288 493 251" fill="none" stroke="#d19b83" stroke-width="17" stroke-linecap="round"/></g>`;
 }
 else if(kind==='safeChoices'){
 h='Keep blood exposures safe, do not share needles, and seek testing';
 a=`<g class="choice-card"><rect x="46" y="95" width="216" height="249" rx="24" fill="#fff7f9" stroke="#e9c0d1" stroke-width="6"/><path d="M98 171q43 -28 91 0" stroke="#c97782" stroke-width="14" fill="none" stroke-linecap="round"/>${drop(145,199,.7)}<g transform="translate(210 260)"><circle r="28" fill="#fbe3e8" stroke="#d76d80" stroke-width="5"/><path d="M-14 -14l28 28m0 -28 -28 28" stroke="#bd4d65" stroke-width="6"/></g></g><g class="choice-card"><rect x="293" y="95" width="216" height="249" rx="24" fill="#f5fbff" stroke="#c2dae7" stroke-width="6"/>${needle(395,210,.68)}<path d="M345 159l113 103m0 -103 -113 103" stroke="#d56c80" stroke-width="10" stroke-linecap="round"/></g><g class="choice-card"><rect x="540" y="95" width="216" height="249" rx="24" fill="#f5fff9" stroke="#bde1d1" stroke-width="6"/><rect x="609" y="146" width="75" height="126" rx="20" fill="#f3fbff" stroke="#76b8cc" stroke-width="6"/><rect x="619" y="220" width="55" height="42" rx="12" fill="#c9556a"/><circle cx="687" cy="282" r="29" fill="#b7f2d9" stroke="#5abb90" stroke-width="5"/><path d="M674 282l10 10 19 -23" stroke="#278d69" stroke-width="7" fill="none"/></g>`;
 }
 else if(kind==='journey'){
 h='From the liver cell to protection: the complete hepatitis B story';
 a=`<g class="journey-icons">${[0,1,2,3,4,5].map((i)=>`<g class="journey-icon stage-${i}" transform="translate(${92+i*123} 213)"><circle r="49" fill="${['#ffe1ec','#ffebbb','#cceef8','#dcc9ff','#fbe5bf','#d1f3e5'][i]}" stroke="${['#d888a7','#d5ac4f','#73b6d0','#9b78ca','#daa95f','#68b69a'][i]}" stroke-width="7"/>${i===0?virus(0,0,.9):i===1?`<path d="M-15 -14v28m30 -28v28" stroke="#b97295" stroke-width="11"/>${virus(0,0,.55)}`:i===2?miniCell(0,0,35):i===3?`<circle r="25" fill="#aa8cdb"/><path d="M-15 0h30M0 -15v30" stroke="#fff" stroke-width="5"/>`:i===4?`<g transform="scale(.22)">${liver}</g>`:shield(0,0,.42)}</g>`).join('')}</g><path class="journey-trace" d="M145 213H658" stroke="#a38bc7" stroke-width="6" stroke-dasharray="11 10" fill="none"/><g class="journey-arrow"><path d="M668 196l18 17 -18 17" stroke="#a38bc7" stroke-width="7" fill="none"/></g><g class="journey-order">${[1,2,3,4,5,6].map((n,i)=>`<text x="${92+i*123}" y="306" text-anchor="middle" fill="#684f9a" font-size="20" font-weight="900">${n}</text>`).join('')}</g>`;
 }
 else return '';
 const defs=`<defs><linearGradient id="liver34" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d47e87"/><stop offset="1" stop-color="#923f56"/></linearGradient><linearGradient id="shield34" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#9cedd4"/><stop offset="1" stop-color="#53bdae"/></linearGradient></defs>`;
 return `<div class="lesson-animation-wrap detail-scene scene-${kind}"><svg class="lesson-svg" viewBox="0 0 800 450" role="img" aria-label="${h}">${defs}<rect width="800" height="450" rx="24" fill="#faf4ff"/><circle cx="80" cy="60" r="86" fill="#fff" opacity=".8"/><circle cx="741" cy="385" r="95" fill="#e6f7ff" opacity=".8"/>${a}</svg><div class="animation-caption">${h}</div><div class="animation-progress"><span></span></div></div>`;
}

function sceneArt(kind){
 if(['spreadBlood','noSpread','vaccine','test','birthNeedle','quietTest','cellsToLiver','harm','protect','kindness','safeChoices','journey'].includes(kind)) return detailedScienceArt(kind);
 if(['arrive','attach','enter','toNucleus','dnaCopy','assembly'].includes(kind))return stage1Scene(kind);
 const heading={arrive:'HBV approaches the liver cell',attach:'HBV attaches to the cell membrane',enter:'HBV enters the liver cell',toNucleus:'HBV moves toward the nucleus',dnaCopy:'HBV uses messages in the nucleus',assembly:'Cell parts help build and release more HBV',tissueZoom:'One liver cell zooms out to many cells in a tissue',immune:'Immune defenders notice infected cells',inflammation:'The tissue becomes inflamed',scar:'Repeated injury may lead to scar tissue',outcomeSplit:'Not every hepatitis B infection is the same',organZoom:'Cell and tissue changes can affect the liver organ',spreadBlood:'HBV can spread through infected blood',noSpread:'Everyday contact does not spread HBV',vaccine:'Vaccination helps prevent HBV',test:'A blood test can find infection',birthNeedle:'Birth and shared needles are other real spread routes',quietTest:'Someone can feel fine and still need testing',cellsToLiver:'Cells make tissues, and tissues help make the liver',harm:'HBV can affect the liver over time',protect:'Prevention helps protect Liver City',kindness:'People with hepatitis B deserve kindness and respect',safeChoices:'Safe choices lower the chance of spread',journey:'The full HBV journey'}[kind] || 'Explore liver health';
 const vir=(cx,cy,size=12,cl='')=>`<g class="${cl}" transform="translate(${cx} ${cy})"><g class="vir-body"><circle r="${size}" fill="#9552c7" stroke="#f3dbff" stroke-width="3"/>${Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;const c=Math.cos(a),s=Math.sin(a);return `<path d="M${(c*size).toFixed(2)} ${(s*size).toFixed(2)}L${(c*(size+7)).toFixed(2)} ${(s*(size+7)).toFixed(2)}" stroke="#d89af0" stroke-width="3.2" stroke-linecap="round"/>`;}).join('')}<circle cx="-4" cy="-2" r="2.4" fill="#fff"/><circle cx="4" cy="-2" r="2.4" fill="#fff"/></g></g>`;
 const mito=(x,y,r=0)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="44" ry="19" fill="#ffca73" stroke="#b9743c" stroke-width="5"/><path d="M-30 0l12 -10 13 18 12 -18 15 12" fill="none" stroke="#b9743c" stroke-width="4"/></g>`;
 const cell = `<g class="lesson-cell"><ellipse cx="410" cy="225" rx="252" ry="172" fill="url(#cellShade)" stroke="#c66eab" stroke-width="15"/><ellipse cx="410" cy="225" rx="237" ry="158" fill="none" stroke="#fff1fa" stroke-width="4" stroke-dasharray="11 11"/><g opacity=".7" stroke="#8e84d9" stroke-width="7" fill="none" stroke-linecap="round"><path d="M275 158q-65 -14 -56 34t74 42"/><path d="M322 304q-70 0 -71 39t74 19"/><path d="M472 130q65 -32 103 24"/></g>${mito(292,286,-18)}${mito(520,318,18)}<g class="nucleus-glow"><circle cx="527" cy="208" r="74" fill="#ac80d7" stroke="#7b4aad" stroke-width="10"/><circle cx="527" cy="208" r="53" fill="#c8a6ee" stroke="#8f61bd" stroke-width="4"/><path d="M513 172q34 28 1 67m31 -63q-31 29 -1 63m-31 -35h31m-31 24h31" stroke="#f5e7ff" stroke-width="4" fill="none"/></g></g>`;
 const tissueCells=(mode='healthy')=>{
   let out='';
   for(let i=0;i<12;i++){
     const x=170+i%4*148, y=118+Math.floor(i/4)*96;
     let fill='#f7aec3', stroke='#cb789e', extra='';
     if(mode==='injury' && [5,6].includes(i)){fill='#ef9376'; extra='<circle class="damage-ring" r="36" fill="none" stroke="#e55e5e" stroke-width="5"/>';}
     if(mode==='scar' && i>=6){fill='#d6c18d'; stroke='#a68d60'; extra='<path class="scar-growing" d="M-28 0q16 -18 32 0t30 0" fill="none" stroke="#8c7443" stroke-width="5"/>';}
     if(mode==='mixed' && i in {2:1,7:1}){fill='#ef9376'; extra='<circle class="damage-ring" r="36" fill="none" stroke="#e55e5e" stroke-width="5"/>';}
     out += `<g transform="translate(${x} ${y})"><ellipse rx="50" ry="40" fill="${fill}" stroke="${stroke}" stroke-width="5"/><ellipse cx="5" cy="-2" rx="14" ry="12" fill="#a16bb8"/>${extra}</g>`;
   }
   return out;
 };
 const miniLiver=`<path d="M270 155q74 -95 218 -43q107 31 128 108q24 95 -72 141q-64 31 -128 -18q-108 43 -156 -26q-66 -90 10 -162z" fill="url(#liverShade)" stroke="#873f54" stroke-width="9"/>`;
 let art='';
 if(kind==='arrive') art=`${cell}<g class="outside-zone"><path class="stage1-route" d="M95 225H235" stroke="#f2bb57" stroke-width="8" fill="none" stroke-dasharray="14 12"/><circle cx="95" cy="225" r="16" fill="#eef9ff" stroke="#8ed0e5" stroke-width="4"/><text x="95" y="231" text-anchor="middle" font-size="18" font-weight="900" fill="#52839b">L</text></g>${vir(95,225,10,'virus-arriving')}<circle class="focus-ping" cx="160" cy="225" r="24" fill="none" stroke="#f2bb57" stroke-width="5"/>`;
 else if(kind==='attach') art=`${cell}<g class="membrane-site"><circle class="entry-receptor" cx="161" cy="226" r="12" fill="#f8df74" stroke="#b67941" stroke-width="4"/><circle class="focus-ping" cx="161" cy="226" r="24" fill="none" stroke="#f2bb57" stroke-width="5"/></g><path class="stage1-route" d="M105 226H152" stroke="#f2bb57" stroke-width="7" fill="none" stroke-dasharray="10 10"/>${vir(105,226,10,'virus-attaching')}`;
 else if(kind==='enter') art=`${cell}<g class="entry-open"><circle class="entry-receptor" cx="161" cy="226" r="12" fill="#f8df74" stroke="#b67941" stroke-width="4"/><path class="membrane-door" d="M155 206q-9 18 0 40" stroke="#ffec96" stroke-width="7" fill="none" stroke-linecap="round"/></g>${vir(112,226,10,'virus-entering')}<path class="cyto-arrow" d="M192 226Q260 235 336 230" stroke="#58b9d9" stroke-width="7" fill="none" stroke-dasharray="12 11"/><circle class="focus-ping" cx="250" cy="230" r="18" fill="none" stroke="#58b9d9" stroke-width="4"/>`;
 else if(kind==='toNucleus') art=`${cell}${vir(300,226,10,'virus-to-nucleus')}<path class="path-to-nucleus" d="M315 228Q382 210 442 212T520 210" stroke="#ffcb67" stroke-width="8" fill="none" stroke-dasharray="14 11"/><circle class="nucleus-target" cx="527" cy="208" r="88" fill="none" stroke="#f7d76d" stroke-width="8"/><g class="path-dots"><circle cx="360" cy="220" r="8" fill="#ffe8a3"/><circle cx="425" cy="214" r="8" fill="#ffe8a3"/></g>`;
 else if(kind==='dnaCopy') art=`${cell}<g class="instruction-zone"><g class="nucleus-message"><path d="M490 188q20 -20 40 0t40 0" stroke="#fff4b0" stroke-width="7" fill="none"/><path d="M490 222q20 20 40 0t40 0" stroke="#fff4b0" stroke-width="7" fill="none"/><path d="M500 191v28m20 -26v28m20 -26v26m20 -27v25" stroke="#7146a5" stroke-width="4"/></g><path class="viral-message-route" d="M478 238Q430 268 380 262T275 228" stroke="#6cb7e3" stroke-width="8" fill="none" stroke-dasharray="12 12"/><g class="viral-message a instruction-card" transform="translate(440 255)"><rect x="-22" y="-14" width="44" height="28" rx="8" fill="#fff1aa" stroke="#dbac41" stroke-width="4"/><path d="M-12 -2h24M-12 6h18" stroke="#a7751c" stroke-width="3"/></g><g class="viral-message b instruction-card" transform="translate(385 266)"><rect x="-22" y="-14" width="44" height="28" rx="8" fill="#fff1aa" stroke="#dbac41" stroke-width="4"/><path d="M-12 -2h24M-12 6h18" stroke="#a7751c" stroke-width="3"/></g><g class="protein-factory"><circle cx="285" cy="214" r="20" fill="#7bd3e8" stroke="#3f96af" stroke-width="5"/><circle cx="330" cy="186" r="20" fill="#7bd3e8" stroke="#3f96af" stroke-width="5"/></g><g class="viral-protein a protein-part"><circle cx="260" cy="212" r="11" fill="#9b74d9" stroke="#62439b" stroke-width="4"/></g><g class="viral-protein b protein-part"><circle cx="314" cy="168" r="11" fill="#9b74d9" stroke="#62439b" stroke-width="4"/></g><circle class="focus-ping" cx="298" cy="198" r="34" fill="none" stroke="#6cb7e3" stroke-width="4"/></g>`;
 else if(kind==='assembly') art=`${cell}<g class="organelle-icons"><circle cx="168" cy="120" r="24" fill="#fff4c2" stroke="#e3b456" stroke-width="5"/><text x="168" y="126" text-anchor="middle" font-size="12" font-weight="900" fill="#9a6b19">mem</text><circle cx="245" cy="95" r="24" fill="#e6f7ff" stroke="#79bfd4" stroke-width="5"/><text x="245" y="101" text-anchor="middle" font-size="12" font-weight="900" fill="#367c91">cyto</text><circle cx="520" cy="360" r="24" fill="#ffec9b" stroke="#d19636" stroke-width="5"/><text x="520" y="366" text-anchor="middle" font-size="11" font-weight="900" fill="#9a6519">energy</text></g><g class="assembly-zone"><circle cx="315" cy="204" r="18" fill="#67c7d7"/><circle cx="355" cy="188" r="18" fill="#67c7d7"/><circle cx="286" cy="244" r="18" fill="#67c7d7"/><path d="M302 196l39 17m-21 33 25 -17m16 -34 42 14" stroke="#2f8599" stroke-width="5"/></g><path class="assembly-flow" d="M365 208Q422 206 470 216" stroke="#f6c362" stroke-width="8" fill="none" stroke-dasharray="14 11"/><path class="assembly-release" d="M560 215Q615 208 675 216" stroke="#7fcbdd" stroke-width="8" fill="none" stroke-dasharray="14 11"/><path class="energy-stream" d="M500 330Q450 288 385 238" stroke="#ffd354" stroke-width="8" fill="none" stroke-dasharray="12 10"/><polygon class="energy-bolt" points="500,315 486,340 501,340 492,366 520,333 504,333 514,315" fill="#ffd354" stroke="#ba7c19" stroke-width="3"/>${vir(404,220,9,'assemble-piece one')}${vir(432,247,9,'assemble-piece two')}${vir(458,198,9,'assemble-piece three')}${vir(607,195,10,'release-virus a')}${vir(650,236,10,'release-virus b')}<circle class="focus-ping" cx="620" cy="216" r="28" fill="none" stroke="#7fcbdd" stroke-width="4"/>`;
 else if(kind==='tissueZoom') art=`<g class="zoom-left"><ellipse cx="175" cy="225" rx="80" ry="68" fill="#f6abc4" stroke="#c9759e" stroke-width="10"/><ellipse cx="190" cy="225" rx="23" ry="20" fill="#9f73c8"/></g><g class="zoom-ring"></g><path class="zoom-arrow" d="M275 225H365m-22 -18 22 18 -22 18" stroke="#9e7ed0" stroke-width="10" fill="none" stroke-linecap="round"/><g class="zoom-many">${tissueCells('healthy')}</g>`;
 else if(kind==='immune') art=`<g>${tissueCells('injury')}</g><g class="immune-defender a"><circle cx="110" cy="285" r="28" fill="#75dff2" stroke="#278ea7" stroke-width="6"/></g><g class="immune-defender b"><circle cx="675" cy="95" r="28" fill="#75dff2" stroke="#278ea7" stroke-width="6"/></g>`;
 else if(kind==='inflammation') art=`<g>${tissueCells('injury')}</g><ellipse class="inflame-field" cx="408" cy="220" rx="170" ry="115" fill="#ff6d5a" opacity=".17"/><path class="heat-wave" d="M300 120q12 16 0 32m36 -28q12 16 0 32m36 -28q12 16 0 32m36 -28q12 16 0 32" stroke="#ff7e51" stroke-width="6" fill="none" stroke-linecap="round"/>`;
 else if(kind==='scar') art=`<g>${tissueCells('scar')}</g><path class="scar-growing" d="M205 138q58 32 116 0t116 0t116 0t116 0" fill="none" stroke="#927643" stroke-width="9"/><path class="scar-growing" d="M195 236q58 -30 116 0t116 0t116 0t116 0" fill="none" stroke="#927643" stroke-width="9" style="animation-delay:.8s"/>`;
 else if(kind==='outcomeSplit') art=`<path d="M400 125v170" stroke="#d6c4e9" stroke-width="12" stroke-linecap="round"/><path class="fork-left" d="M400 185Q315 145 225 150" stroke="#77d59b" stroke-width="9" fill="none"/><path class="fork-right" d="M400 185Q500 145 595 150" stroke="#e48d7d" stroke-width="9" fill="none"/><g class="split-good"><circle cx="215" cy="160" r="72" fill="#dff8e8" stroke="#6cc491" stroke-width="9"/><path d="M175 160l24 24 50 -54" stroke="#2c8a5f" stroke-width="12" fill="none"/></g><g class="split-bad"><path d="M520 100q54 -44 121 -12q57 26 67 82q10 58 -39 96q-34 27 -77 11q-57 29 -88 -6q-39 -44 16 -171z" fill="#cd8080" stroke="#8d4346" stroke-width="8"/><ellipse cx="585" cy="165" rx="55" ry="34" fill="#ef8a7d" opacity=".75"/></g>`;
 else if(kind==='organZoom') art=`<g>${tissueCells('mixed')}</g><path class="zoom-arrow organ" d="M502 332Q560 318 622 285" stroke="#9e7ed0" stroke-width="10" fill="none" stroke-linecap="round"/><g class="organ-liver" transform="translate(420 10) scale(.62)">${miniLiver}</g>`;
 else if(kind==='spreadBlood') art=`<g class="spread-person left"><circle cx="150" cy="185" r="35" fill="#ffd8b8"/><rect x="106" y="225" width="88" height="115" rx="25" fill="#72d5d6" stroke="#fff" stroke-width="5"/></g><g class="spread-person right"><circle cx="650" cy="185" r="35" fill="#ffd8b8"/><rect x="606" y="225" width="88" height="115" rx="25" fill="#72d5d6" stroke="#fff" stroke-width="5"/></g><path d="M240 232H545" stroke="#e37c92" stroke-width="12" stroke-linecap="round"/><path d="M520 214l28 18 -28 18" fill="none" stroke="#e37c92" stroke-width="12" stroke-linecap="round"/><g class="droplet-fly"><path d="M0 -18Q12 -3 12 8A12 12 0 1 1 -12 8Q-12 -3 0 -18z" fill="#d34c62"/></g>`;
 else if(kind==='noSpread') art=`<g class="spread-person left"><circle cx="220" cy="185" r="35" fill="#ffd8b8"/><rect x="176" y="225" width="88" height="115" rx="25" fill="#72d5d6" stroke="#fff" stroke-width="5"/></g><g class="spread-person right"><circle cx="440" cy="185" r="35" fill="#ffd8b8"/><rect x="396" y="225" width="88" height="115" rx="25" fill="#f8c45b" stroke="#fff" stroke-width="5"/></g><rect x="282" y="246" width="92" height="20" rx="10" fill="#b38fd7"/><g class="safe-mark"><circle cx="620" cy="210" r="75" fill="#e5faef" stroke="#6ec597" stroke-width="10"/><path d="M585 210l25 25 46 -50" stroke="#2a8b5f" stroke-width="12" fill="none"/></g>`;
 else if(kind==='vaccine') art=`<g class="guard-shield"><path d="M375 118l92 0l25 53l-71 118l-71 -118z" fill="#79ddc8" stroke="#41af9a" stroke-width="8"/></g><g class="syringe-arrive"><rect x="180" y="206" width="115" height="26" rx="12" fill="#cfe6ee" stroke="#6ea2b2" stroke-width="5"/><path d="M295 219h65" stroke="#6ea2b2" stroke-width="7"/><path d="M160 219h20" stroke="#6ea2b2" stroke-width="7"/><path d="M355 219l26 26" stroke="#6ea2b2" stroke-width="5"/></g>${vir(615,218,12,'virus-blocked')}`;
 else if(kind==='test') art=`<g class="test-tube"><rect x="192" y="112" width="72" height="188" rx="28" fill="#eafcff" stroke="#75c6d7" stroke-width="6"/><rect x="202" y="210" width="52" height="70" rx="18" fill="#ef9eb1"/></g><g class="scanner-moving"><circle cx="530" cy="205" r="68" fill="#8f73cf"/><circle cx="530" cy="205" r="42" fill="#fefefe"/><path d="M502 205l22 24 36 -45" fill="none" stroke="#8f73cf" stroke-width="11"/></g>`;
 else if(kind==='birthNeedle') art=`<g class="birth-side"><circle cx="185" cy="160" r="34" fill="#ffd8b8"/><rect x="138" y="198" width="94" height="120" rx="26" fill="#f3a6c2" stroke="#fff" stroke-width="5"/><circle cx="280" cy="250" r="32" fill="#ffd8b8"/><rect x="248" y="280" width="64" height="48" rx="18" fill="#f8cf77" stroke="#fff" stroke-width="5"/></g><path d="M345 230h95m-28 -18 28 18 -28 18" stroke="#e191b0" stroke-width="10" fill="none" stroke-linecap="round"/><g class="needle-side"><rect x="505" y="150" width="120" height="28" rx="13" fill="#cfe6ee" stroke="#6ea2b2" stroke-width="5"/><path d="M625 164h60" stroke="#6ea2b2" stroke-width="8"/><path d="M685 164l26 26" stroke="#6ea2b2" stroke-width="5"/><rect x="520" y="238" width="90" height="55" rx="14" fill="#c9b4f1"/><path d="M533 266h54" stroke="#7145ad" stroke-width="8" stroke-linecap="round"/></g>`;
 else if(kind==='quietTest') art=`<g class="quiet-person"><circle cx="210" cy="184" r="40" fill="#ffd8b8"/><rect x="158" y="230" width="104" height="118" rx="28" fill="#72d5d6" stroke="#fff" stroke-width="5"/><path d="M194 192q16 14 32 0" stroke="#a85976" stroke-width="5" fill="none"/></g>${vir(348,180,8,'hidden-virus')}${vir(390,210,8,'hidden-virus two')}<path d="M430 250h95m-28 -18 28 18 -28 18" stroke="#8d74c9" stroke-width="10" fill="none" stroke-linecap="round"/><g class="scanner-moving"><circle cx="620" cy="228" r="64" fill="#8f73cf"/><circle cx="620" cy="228" r="40" fill="#fefefe"/><path d="M592 228l22 24 36 -45" fill="none" stroke="#8f73cf" stroke-width="11"/></g>`;
 else if(kind==='cellsToLiver') art=`<g class="scale-1"><circle cx="142" cy="225" r="68" fill="#f5b0d0" stroke="#c970a3" stroke-width="11"/><circle cx="160" cy="225" r="25" fill="#ad7bd2"/></g><g class="scale-arrow"><path d="M235 225h65m-18 -16 18 16 -18 16" stroke="#a17dcb" stroke-width="9" fill="none"/></g><g class="scale-2"><ellipse cx="375" cy="188" rx="39" ry="32" fill="#f6b0c4" stroke="#ce78a2" stroke-width="5"/><circle cx="375" cy="188" r="10" fill="#a17bcb"/><ellipse cx="445" cy="188" rx="39" ry="32" fill="#f6b0c4" stroke="#ce78a2" stroke-width="5"/><circle cx="445" cy="188" r="10" fill="#a17bcb"/><ellipse cx="375" cy="263" rx="39" ry="32" fill="#f6b0c4" stroke="#ce78a2" stroke-width="5"/><circle cx="375" cy="263" r="10" fill="#a17bcb"/><ellipse cx="445" cy="263" rx="39" ry="32" fill="#f6b0c4" stroke="#ce78a2" stroke-width="5"/><circle cx="445" cy="263" r="10" fill="#a17bcb"/></g><g class="scale-arrow"><path d="M495 225h65m-18 -16 18 16 -18 16" stroke="#a17dcb" stroke-width="9" fill="none"/></g><g class="scale-3" transform="translate(410 0) scale(.55)">${miniLiver}</g>`;
 else if(kind==='harm') art=`${miniLiver}<ellipse class="harm-spot" cx="490" cy="235" rx="74" ry="52" fill="#ee8b8d" opacity=".85"/>${vir(336,206,10,'virus-small-pulse')}<g class="immune-defender a"><circle cx="160" cy="250" r="28" fill="#75dff2" stroke="#278ea7" stroke-width="6"/></g>`;
 else if(kind==='protect') art=`<g transform="translate(60 5) scale(.9)">${miniLiver}</g><g class="guard-shield"><path d="M560 105l78 0l22 49l-61 103l-61 -103z" fill="#79ddc8" stroke="#41af9a" stroke-width="8"/></g><circle cx="560" cy="305" r="36" fill="#fff3b7" stroke="#ebb654" stroke-width="6"/><path d="M545 305l10 10 18 -22" stroke="#a47016" stroke-width="7" fill="none"/><circle cx="640" cy="305" r="36" fill="#e4efff" stroke="#7c99da" stroke-width="6"/><path d="M624 305h32" stroke="#7c99da" stroke-width="7"/><path d="M640 289v32" stroke="#7c99da" stroke-width="7"/>`;
 else if(kind==='kindness') art=`<g class="spread-person left"><circle cx="245" cy="185" r="35" fill="#ffd8b8"/><rect x="201" y="225" width="88" height="115" rx="25" fill="#72d5d6" stroke="#fff" stroke-width="5"/></g><g class="spread-person right"><circle cx="515" cy="185" r="35" fill="#ffd8b8"/><rect x="471" y="225" width="88" height="115" rx="25" fill="#c6b0f0" stroke="#fff" stroke-width="5"/></g><g class="heart-pulse"><path d="M385 180c0-22 27-34 43-16c16-18 43-6 43 16c0 33-43 58-43 58s-43-25-43-58z" fill="#f37ba2"/></g>`;
 else if(kind==='safeChoices') art=`<circle cx="180" cy="150" r="60" fill="#fff1c0" stroke="#e8b955" stroke-width="9"/><path d="M180 120v60m-26 -26h52" stroke="#ac7417" stroke-width="10" stroke-linecap="round"/><path d="M260 150h78" stroke="#cdbbe5" stroke-width="10"/><circle cx="445" cy="150" r="60" fill="#e8f9ef" stroke="#71c998" stroke-width="9"/><path d="M416 150l20 22 39 -43" stroke="#2a8b5f" stroke-width="12" fill="none"/><path d="M520 150h78" stroke="#cdbbe5" stroke-width="10"/><circle cx="655" cy="150" r="60" fill="#fce8ef" stroke="#e596b0" stroke-width="9"/><path d="M625 180l60 -60" stroke="#b94d6d" stroke-width="10"/><path d="M625 120l60 60" stroke="#b94d6d" stroke-width="10"/><rect x="598" y="250" width="110" height="44" rx="16" fill="#c8b1f0"/><path d="M610 272h84" stroke="#7242b0" stroke-width="8" stroke-linecap="round"/>`;
 else if(kind==='journey') art=`<g class="journey-nodes"><circle cx="90" cy="225" r="34" fill="#f3b6d4" stroke="#c96fa4" stroke-width="8"/><circle cx="200" cy="225" r="34" fill="#ffeaa5" stroke="#e0b450" stroke-width="8"/><circle cx="310" cy="225" r="34" fill="#b8eff7" stroke="#68bdd2" stroke-width="8"/><circle cx="420" cy="225" r="34" fill="#d2b6f4" stroke="#8b63c0" stroke-width="8"/><circle cx="530" cy="225" r="34" fill="#ffd388" stroke="#e1a04b" stroke-width="8"/><circle cx="640" cy="225" r="34" fill="#a6efd7" stroke="#4dbb98" stroke-width="8"/></g><path class="journey-line" d="M90 225H640" stroke="#f4be5d" stroke-width="8" stroke-dasharray="18 17"/><path d="M90 225H640" stroke="#f5dcb0" stroke-width="22" opacity=".4"/><text x="78" y="231" font-size="18" font-weight="900" fill="#6f4ba9">1</text><text x="188" y="231" font-size="18" font-weight="900" fill="#6f4ba9">2</text><text x="298" y="231" font-size="18" font-weight="900" fill="#6f4ba9">3</text><text x="408" y="231" font-size="18" font-weight="900" fill="#6f4ba9">4</text><text x="518" y="231" font-size="18" font-weight="900" fill="#6f4ba9">5</text><text x="628" y="231" font-size="18" font-weight="900" fill="#6f4ba9">6</text>`;
 return `<div class="lesson-animation-wrap" aria-label="Animated science illustration: ${heading}"><svg class="lesson-svg" viewBox="0 0 800 450" role="img" aria-label="${heading}"><defs><radialGradient id="cellShade"><stop stop-color="#ffeaf5"/><stop offset="1" stop-color="#f3a3ca"/></radialGradient><linearGradient id="liverShade"><stop stop-color="#c76a75"/><stop offset="1" stop-color="#873b50"/></linearGradient></defs><rect width="800" height="450" rx="24" fill="#fff3fb"/><circle cx="690" cy="95" r="120" fill="#f9e1ff" opacity=".65"/><circle cx="140" cy="330" r="120" fill="#e9f7ff" opacity=".7"/>${art}</svg><div class="animation-caption">${heading}</div><div class="animation-progress"><span></span></div></div>`;
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
 enemies.forEach((e,i)=>{const p=visualEnemies[i]||e;drawVirus(p.x*T+T/2,p.y*T+T/2,now,i);});
 // player
 drawPlayer(visualPlayer.x*T+T/2,visualPlayer.y*T+T/2,now);
}
function drawCellBackground(now){ const tt=now/1000; ctx.beginPath(); ctx.ellipse(CANVAS_W*0.48,CANVAS_H*0.5,430,260,0,0,Math.PI*2); ctx.fillStyle='rgba(255,233,245,.88)'; ctx.fill(); ctx.lineWidth=22; ctx.strokeStyle='rgba(212,96,161,.85)'; ctx.stroke(); ctx.lineWidth=6; ctx.strokeStyle='rgba(255,255,255,.85)'; ctx.stroke(); ctx.beginPath(); ctx.ellipse(760,290,105,95,0,0,Math.PI*2); ctx.fillStyle='rgba(153,109,213,.8)'; ctx.fill(); ctx.lineWidth=8; ctx.strokeStyle='rgba(92,55,155,.9)'; ctx.stroke(); [[170,150],[320,520],[770,500],[600,150]].forEach(([x,y],i)=>drawMito(x,y,0.3*i)); for(let i=0;i<24;i++){ const x=(i*71+55)%CANVAS_W,y=(i*89+35)%CANVAS_H; ctx.beginPath(); ctx.arc(x,y,3+Math.sin(tt+i)*1.2,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,.5)'; ctx.fill(); }}
function drawTissueBackground(now){ for(let r=0;r<7;r++) for(let c=0;c<10;c++){ const x=80+c*95+(r%2)*20,y=65+r*86; ctx.save(); ctx.translate(x,y); ctx.rotate((c+r)%3*.12); ctx.beginPath(); ctx.ellipse(0,0,36,27,0,0,Math.PI*2); ctx.fillStyle='rgba(247,170,197,.55)'; ctx.fill(); ctx.lineWidth=3; ctx.strokeStyle='rgba(195,100,145,.45)'; ctx.stroke(); ctx.beginPath(); ctx.arc(2,0,8,0,Math.PI*2); ctx.fillStyle='rgba(129,97,174,.55)'; ctx.fill(); ctx.restore(); } }
function drawLabBackground(now){ for(let i=0;i<8;i++){ const x=70+i*115; ctx.fillStyle='rgba(255,255,255,.35)'; roundRect(ctx,x,42,70,560,18,true,false); ctx.strokeStyle='rgba(75,174,196,.35)'; ctx.lineWidth=4; roundRect(ctx,x,42,70,560,18,false,true); } }
function drawFinalBackground(now){ for(let i=0;i<10;i++){ const x=(i%5)*180+90, y=Math.floor(i/5)*220+120; ctx.beginPath(); ctx.arc(x,y,74,0,Math.PI*2); ctx.fillStyle='rgba(255,243,198,.4)'; ctx.fill(); } }
function drawMito(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0,0,54,24,0,0,Math.PI*2); ctx.fillStyle='rgba(237,176,98,.88)'; ctx.fill(); ctx.lineWidth=5; ctx.strokeStyle='rgba(173,104,54,.9)'; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-36,0); for(let i=0;i<6;i++) ctx.lineTo(-36+i*14, i%2? -10: 10); ctx.strokeStyle='rgba(160,92,45,.9)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); }
function drawVirus(cx,cy,now,i){ ctx.save(); const bob=Math.sin(now/180+i)*2; ctx.translate(cx,cy+bob); for(let j=0;j<10;j++){ const a=j*Math.PI*2/10; ctx.strokeStyle='#edb3e5'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(Math.cos(a)*12,Math.sin(a)*12); ctx.lineTo(Math.cos(a)*18,Math.sin(a)*18); ctx.stroke(); } ctx.beginPath(); ctx.arc(0,0,13,0,Math.PI*2); ctx.fillStyle='#9f5fc9'; ctx.shadowColor='#eca6ef'; ctx.shadowBlur=12; ctx.fill(); ctx.shadowBlur=0; ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(-5,-3,3.3,0,Math.PI*2); ctx.arc(5,-3,3.3,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#2b1a42'; ctx.beginPath(); ctx.arc(-4,-3,1.5,0,Math.PI*2); ctx.arc(6,-3,1.5,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#5a287e'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,4,5,0,Math.PI); ctx.stroke(); ctx.restore(); }
function drawPlayer(cx,cy,now){ if(performance.now()<invulnUntil && Math.floor(performance.now()/130)%2===0) return; ctx.save(); ctx.translate(cx,cy+Math.sin(now/250)*1.2); ctx.beginPath(); ctx.arc(0,0,15,0,Math.PI*2); ctx.fillStyle=faces[chosen].suit; ctx.shadowColor='#ffffff'; ctx.shadowBlur=10; ctx.fill(); ctx.shadowBlur=0; ctx.beginPath(); ctx.arc(0,-5,10.5,0,Math.PI*2); ctx.fillStyle=faces[chosen].skin; ctx.fill(); ctx.fillStyle='#2e244a'; ctx.beginPath(); ctx.arc(-4,-6,1.8,0,Math.PI*2); ctx.arc(4,-6,1.8,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#ae5677'; ctx.beginPath(); ctx.arc(0,-2,4,0,Math.PI); ctx.stroke(); if(chosen==='scientist'){ ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.strokeRect(-12,4,24,8);} if(chosen==='robot'){ ctx.fillStyle='#839db0'; ctx.fillRect(-10,-14,20,4);} if(chosen==='creature'){ ctx.fillStyle='#be8af3'; ctx.beginPath(); ctx.arc(-10,-13,5,0,Math.PI*2); ctx.arc(10,-13,5,0,Math.PI*2); ctx.fill(); } ctx.restore(); }
function roundRect(c,x,y,w,h,r,fill,stroke){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); if(fill)c.fill(); if(stroke)c.stroke(); }
// Frame-rate-independent interpolation: no new collision or pathfinding rules.
function updateVisualPositions(dt){
 const playerBlend=1-Math.exp(-dt/48); // responsive glide between adjacent tiles
 const enemyBlend=1-Math.exp(-dt/175); // smoother, continuous HBV pursuit
 visualPlayer.x+=(player.x-visualPlayer.x)*playerBlend;
 visualPlayer.y+=(player.y-visualPlayer.y)*playerBlend;
 enemies.forEach((enemy,i)=>{
  if(!visualEnemies[i])visualEnemies[i]={x:enemy.x,y:enemy.y};
  const display=visualEnemies[i];
  display.x+=(enemy.x-display.x)*enemyBlend;
  display.y+=(enemy.y-display.y)*enemyBlend;
 });
}
function loop(now){ if(!window._last) window._last=now; const dt=Math.min(60,now-window._last); window._last=now; if(!paused && !overlay){ roundTime += dt; enemyTick += dt; if(enemyTick > levels[level].enemyDelay){ enemyTick=0; advanceEnemies(); } updateVisualPositions(dt); } draw(now); if(speechUntil && now>speechUntil){ ui.speech.hidden=true; speechUntil=0; } requestAnimationFrame(loop); }
function input(dir){ const m={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[dir]; if(m) move(m[0],m[1]); }
let lastKey=0; window.addEventListener('keydown',e=>{ const k=e.key.toLowerCase(); const map={arrowup:'up',w:'up',arrowdown:'down',s:'down',arrowleft:'left',a:'left',arrowright:'right',d:'right'}; if(map[k]){ e.preventDefault(); if(performance.now()-lastKey>80){ input(map[k]); lastKey=performance.now(); } } else if(e.key==='Escape' && !overlay){ paused=!paused; $('#pause').textContent=paused?'Resume':'Pause'; } }); document.querySelectorAll('[data-dir]').forEach(btn=>btn.onclick=()=>input(btn.dataset.dir)); $('#help').onclick=help; $('#pause').onclick=()=>{ if(overlay)return; paused=!paused; $('#pause').textContent=paused?'Resume':'Pause'; };

/* =========================================
   LIVERQUEST - LEVEL 4 SCIENCE UPGRADE
   Updates the remaining long-term and final HBV discoveries.
   ========================================= */

{
  const finalLevel = levels[3];

  // OBJECTIVE 4: Short-term and long-term infection
  Object.assign(finalLevel.clues[3], {
    title: "When HBV Stays",
    brief: "Some infections clear. Others last.",
    detail: "Some people clear HBV. Others develop a long-term infection. Testing and medical care help protect their liver.",
    remember: "Long-term hepatitis B needs medical follow-up.",
    art: "lqLongTerm",
    say: "Hepatitis B can affect people differently."
  });

  // OBJECTIVE 5: Why Does Hepatitis B Matter?
  Object.assign(finalLevel.clues[4], {
    title: "Why Does Hepatitis B Matter?",
    brief: "HBV can affect your liver, even when you feel healthy.",
    detail: "Hepatitis B can cause long-term liver inflammation and scarring. Some people may develop cirrhosis or liver cancer. Vaccination helps prevent infection, while testing and medical care help people manage hepatitis B. Not everyone develops serious liver problems.",
    remember: "Understanding hepatitis B helps us protect ourselves and others.",
    art: "lqLongTerm",
    say: "Learning about hepatitis B helps us protect our liver health!"
  });

  // Keep existing checkpoint mechanics,
  // but make questions match the new lessons.
  scienceActivities[3][1] = {
    type: "match",
    prompt: "Connect each idea to its meaning.",
    pairs: [
      ["HBV alone", "Cannot make copies by itself"],
      ["HBV inside a liver cell", "Can use the cell to make more viruses"],
      ["A friend has hepatitis B", "Treat them with kindness"]
    ]
  };

  scienceActivities[3][2] = {
    type: "order",
    prompt: "How can long-term liver damage affect health?",
    steps: [
      "HBV infection may continue",
      "Ongoing inflammation can injure liver tissue",
      "Repeated injury may cause scarring",
      "Serious liver damage can affect the body"
    ]
  };

  // Three new illustrated animations.
  const originalSceneArt = sceneArt;

  const animations = {

    /* OBJECTIVE 4 - Infection outcomes */
    lqLongTerm: `
      <div class="lq-new-animation">
        <div class="lq-animation-heading">
          Two possible infection outcomes
        </div>

        <svg viewBox="0 0 360 195"
             class="lq-new-svg"
             role="img"
             aria-label="Some infections clear. Others continue and can cause liver injury, making medical follow-up important.">

          <rect x="4" y="4" width="170" height="185"
                rx="17" fill="#ecfaef"
                stroke="#b3dec1" stroke-width="2"/>

          <rect x="186" y="4" width="170" height="185"
                rx="17" fill="#fff2f6"
                stroke="#ebbbcf" stroke-width="2"/>

          <text x="89" y="27"
                font-size="15" font-weight="bold"
                text-anchor="middle" fill="#367d57">
            INFECTION CLEARS
          </text>

          <text x="271" y="27"
                font-size="15" font-weight="bold"
                text-anchor="middle" fill="#a35a76">
            INFECTION STAYS
          </text>

          <!-- Clearing infection -->
          <g class="lq-clear-viruses"
             fill="#9863c9">
            <circle cx="55" cy="68" r="10"/>
            <circle cx="82" cy="89" r="10"/>
            <circle cx="113" cy="67" r="10"/>
          </g>

          <g class="lq-clear-shield">
            <path d="M88 48l36 12v29
                     q-4 27 -36 42
                     q-32 -15 -36 -42V60Z"
                  fill="#6dc89b"
                  stroke="#409667"
                  stroke-width="4"/>
            <path d="M70 86l13 13 27 -29"
                  stroke="white" stroke-width="6"
                  fill="none"
                  stroke-linecap="round"/>
          </g>

          <!-- Persistent infection -->
          <g class="lq-persistent-virus">
            <circle cx="228" cy="70" r="13"
                    fill="#9855c8"/>
            <circle cx="228" cy="70" r="5"
                    fill="#e9c8ff"/>
          </g>

          <path d="M264 61q34 -9 47 18
                   q13 29 -11 48
                   q-37 19 -51 -9
                   q-10 -25 15 -57Z"
                fill="#ed97af"
                stroke="#c86889"
                stroke-width="4"/>

          <g class="lq-long-scars">
            <path d="M273 75l18 40
                     M296 74l-18 44"
                  stroke="#a46c56"
                  stroke-width="5"
                  stroke-linecap="round"/>
          </g>

          <g class="lq-calendar">
            <rect x="231" y="137" width="80" height="33"
                  rx="7" fill="#fff"
                  stroke="#b58cc6" stroke-width="3"/>
            <text x="271" y="159"
                  text-anchor="middle"
                  font-weight="bold" font-size="12"
                  fill="#865da8">FOLLOW-UP</text>
          </g>

          <text x="88" y="163"
                text-anchor="middle"
                font-size="13" font-weight="bold"
                fill="#367d57">RECOVERY</text>
        </svg>

        <p class="lq-one-takeaway">
          Some infections clear. Long-term HBV needs medical care.
        </p>
      </div>
    `,

    /* OBJECTIVE 6 - Effects on whole body */
    lqBodyHealth: `
      <div class="lq-new-animation">
        <div class="lq-animation-heading">
          Why your liver matters
        </div>

        <svg viewBox="0 0 360 195"
             class="lq-new-svg"
             role="img"
             aria-label="The liver helps process nutrients, manage energy and handle waste. Liver damage can interfere with these important jobs.">

          <rect x="5" y="5" width="350" height="184"
                rx="19" fill="#fff4fa"/>

          <!-- Liver -->
          <g class="lq-healthy-liver">
            <path d="M94 84
                     C107 46 196 42 258 75
                     C289 94 266 139 240 143
                     C206 148 191 119 158 125
                     C126 133 110 151 91 129
                     C79 116 82 96 94 84Z"
                  fill="#ed8fae"
                  stroke="#bb5f88"
                  stroke-width="5"/>

            <circle cx="157" cy="87" r="4"
                    fill="#78426c"/>
            <circle cx="182" cy="87" r="4"
                    fill="#78426c"/>
            <path d="M158 103q12 10 24 0"
                  stroke="#78426c"
                  stroke-width="3"
                  fill="none"/>
          </g>

          <!-- Three jobs -->
          <g class="lq-liver-functions">
            <g>
              <circle cx="55" cy="47" r="24"
                      fill="#d7f2ad"/>
              <text x="55" y="55"
                    text-anchor="middle"
                    font-size="25">🍎</text>
            </g>

            <g>
              <circle cx="307" cy="46" r="24"
                      fill="#ffe8a4"/>
              <text x="307" y="54"
                    text-anchor="middle"
                    font-size="25">⚡</text>
            </g>

            <g>
              <circle cx="305" cy="146" r="24"
                      fill="#c5edf7"/>
              <text x="305" y="154"
                    text-anchor="middle"
                    font-size="25">🧹</text>
            </g>
          </g>

          <!-- Possible damage -->
          <g class="lq-damage-mark">
            <circle cx="173" cy="105" r="29"
                    fill="#d88b53" opacity=".88"/>
            <text x="173" y="116"
                  text-anchor="middle"
                  font-size="32"
                  font-weight="bold"
                  fill="white">!</text>
          </g>

          <text x="180" y="179"
                text-anchor="middle"
                font-weight="bold"
                font-size="12"
                fill="#805294">
            NUTRIENTS • ENERGY • WASTE
          </text>
        </svg>

        <p class="lq-one-takeaway">
          Serious liver damage can affect the whole body.
        </p>
      </div>
    `
  };

  // Keep every original animation available.
  // Only use the new animations for three new objectives.
  sceneArt = function(kind) {
    if (animations[kind]) return animations[kind];
    return originalSceneArt(kind);
  };
}

/* TWO SHORT VISUAL LESSONS: vaccine protection and acute/chronic outcomes.
   Existing levels, stations, checkpoints, and game mechanics remain unchanged. */
{
  const vaccineClue = levels[2].clues[2];
  Object.assign(vaccineClue, {
    brief: 'The vaccine trains your immune system.',
    detail: 'A harmless HBV surface protein teaches your immune system to recognize the virus and make protective antibodies.',
    remember: 'Vaccination helps your body recognize HBV.',
    art: 'lqVaccineVisual'
  });
  const outcomesClue = levels[3].clues[3];
  Object.assign(outcomesClue, {
    brief: 'Acute clears for many people. Chronic lasts.',
    detail: 'Acute hepatitis B is a short-term infection. Chronic hepatitis B lasts 6 months or longer and needs regular medical monitoring.',
    remember: 'Acute: short-term. Chronic: 6 months or longer.',
    art: 'lqOutcomesVisual'
  });

  const previousSceneArt = sceneArt;
  const visual = (title,svg,caption) => `<div class="lq-mini-visual">
    <svg viewBox="0 0 740 420" class="lq-mini-visual-svg" role="img" aria-label="${title}">
      <defs>
        <radialGradient id="lq-v-bg"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#f7e5fa"/></radialGradient>
        <linearGradient id="lq-v-shield" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a4f7d5"/><stop offset="1" stop-color="#49bba8"/></linearGradient>
        <radialGradient id="lq-v-hbv"><stop stop-color="#dfb9ff"/><stop offset="1" stop-color="#9257ce"/></radialGradient>
      </defs>
      <rect width="740" height="420" rx="23" fill="url(#lq-v-bg)"/>
      <circle cx="60" cy="65" r="70" fill="#ffcae4" opacity=".28"/>
      <circle cx="680" cy="340" r="95" fill="#d6f6f8" opacity=".4"/>
      ${svg}
    </svg>
    <div class="lq-mini-caption">${caption}</div>
  </div>`;
  const virus = (x,y,s=1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle r="23" fill="url(#lq-v-hbv)" stroke="#7542b2" stroke-width="4"/>
    ${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<path d="M${(24*Math.cos(a)).toFixed(1)} ${(24*Math.sin(a)).toFixed(1)}L${(34*Math.cos(a)).toFixed(1)} ${(34*Math.sin(a)).toFixed(1)}" stroke="#b47bdd" stroke-width="5" stroke-linecap="round"/>`;}).join('')}
    <circle r="7" fill="#fbebff"/>
  </g>`;
  const ant = (x,y,rot=0) => `<g transform="translate(${x} ${y}) rotate(${rot})" fill="none" stroke="#2aaba4" stroke-width="7" stroke-linecap="round"><path d="M0 16V-4M0 -4L-13 -19M0 -4L13 -19"/></g>`;
  const vaccineArt = visual('The hepatitis B vaccine trains the immune system to recognize HBV and helps prevent infection.',`
    <text x="118" y="54" fill="#6e4795" text-anchor="middle" font-size="25" font-weight="900">VACCINE</text>
    <text x="379" y="54" fill="#428d84" text-anchor="middle" font-size="25" font-weight="900">IMMUNE MEMORY</text>
    <text x="634" y="54" fill="#7444ae" text-anchor="middle" font-size="25" font-weight="900">HBV BLOCKED</text>
    <g transform="translate(106 197) rotate(-12)">
      <rect x="-24" y="-86" width="49" height="130" rx="10" fill="#eafaff" stroke="#76b2c4" stroke-width="6"/>
      <rect x="-17" y="-20" width="35" height="55" rx="5" fill="#bca2e6"/>
      <path d="M0 44V95" stroke="#789aab" stroke-width="5"/>
      <rect x="-32" y="-104" width="64" height="20" rx="5" fill="#9876c7"/>
      <rect x="-37" y="-116" width="74" height="10" rx="5" fill="#c6acd9"/>
    </g>
    <g><circle cx="205" cy="164" r="10" fill="#b27edb"><animateMotion dur="4.8s" repeatCount="indefinite" path="M0 0 Q60 -26 107 10"/></circle>
      <circle cx="193" cy="212" r="7" fill="#c995ef"><animateMotion dur="4.8s" begin=".5s" repeatCount="indefinite" path="M0 0 Q72 20 121 -16"/></circle>
    </g>
    <path d="M318 110L406 139V228Q387 280 362 294Q335 279 318 227Z" fill="url(#lq-v-shield)" stroke="#329e92" stroke-width="8"/>
    <path d="M339 202L356 219 385 180" fill="none" stroke="white" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
    <g opacity="0">${ant(330,111,-28)}${ant(416,181,22)}${ant(321,284,10)}${ant(425,271,-20)}
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.25;.53;1" dur="4.8s" repeatCount="indefinite"/>
    </g>
    <path d="M470 206H522" stroke="#be95df" stroke-width="6" stroke-dasharray="9 11"/>
    <g>${virus(631,204,1.22)}<animateTransform attributeName="transform" type="translate" values="60 0;0 0;0 0;60 0" keyTimes="0;.42;.82;1" dur="4.8s" repeatCount="indefinite"/></g>
    <g opacity="0"><circle cx="553" cy="202" r="48" fill="none" stroke="#ee7b92" stroke-width="7"/>
      <path d="M523 170L584 235" stroke="#ee7b92" stroke-width="9" stroke-linecap="round"/>
      <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.34;.58;.8;1" dur="4.8s" repeatCount="indefinite"/>
    </g>
    <text x="110" y="366" fill="#80678f" text-anchor="middle" font-size="17" font-weight="800">HARMLESS PROTEIN</text>
    <text x="365" y="366" fill="#378d80" text-anchor="middle" font-size="18" font-weight="800">ANTIBODIES</text>
    <text x="624" y="366" fill="#8654b1" text-anchor="middle" font-size="18" font-weight="800">PROTECTED</text>
  `,'Recognize HBV → build protection');
  const outcomesArt = visual('Acute infection often clears, while chronic infection persists for 6 months or longer and needs medical monitoring.',`
    <rect x="30" y="68" width="325" height="283" rx="26" fill="#ebfbf3" stroke="#afe0cb" stroke-width="4"/>
    <rect x="386" y="68" width="325" height="283" rx="26" fill="#fff1fa" stroke="#e4c2ec" stroke-width="4"/>
    <text x="192" y="112" font-size="30" font-weight="900" text-anchor="middle" fill="#28866e">ACUTE</text>
    <text x="549" y="112" font-size="30" font-weight="900" text-anchor="middle" fill="#8551b5">CHRONIC</text>
    <text x="192" y="140" font-size="17" font-weight="800" text-anchor="middle" fill="#4c9680">Short-term</text>
    <text x="549" y="140" font-size="17" font-weight="800" text-anchor="middle" fill="#936cb5">6+ months</text>
    <g transform="translate(185 228)">
      <path d="M-87 -27Q-48 -72 22 -51Q86 -48 85 10Q64 65 6 44Q-61 70 -87 18Q-100 -7 -87 -27Z" fill="#ed9ab0" stroke="#ba607f" stroke-width="6"/>
      <path d="M-52 -18Q5 -41 55 -15" fill="none" stroke="#ffd8e5" stroke-width="6"/>
    </g>
    <g opacity="1">${virus(154,203,.49)}${virus(234,228,.48)}${virus(182,268,.45)}
      <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.22;.5;.9;1" dur="5.6s" repeatCount="indefinite"/>
    </g>
    <g opacity="0"><path d="M149 242L178 266 227 203" fill="none" stroke="#35aa8a" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.4;.55;.9;1" dur="5.6s" repeatCount="indefinite"/>
    </g>
    <g transform="translate(541 228)">
      <path d="M-87 -27Q-48 -72 22 -51Q86 -48 85 10Q64 65 6 44Q-61 70 -87 18Q-100 -7 -87 -27Z" fill="#e7a0b7" stroke="#ba607f" stroke-width="6"/>
      <path d="M-34 -39L-6 22 31 -20M9 34L43 1" stroke="#ac6f6d" stroke-width="5" stroke-linecap="round" fill="none" stroke-dasharray="8 5"/>
    </g>
    <g>${virus(501,201,.48)}${virus(584,245,.51)}${virus(541,287,.4)}
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="2s" repeatCount="indefinite"/>
    </g>
    <g transform="translate(624 303)"><rect x="-31" y="-26" width="62" height="51" rx="8" fill="#fff" stroke="#af91cf" stroke-width="4"/>
      <rect x="-31" y="-26" width="62" height="14" rx="5" fill="#ab8bd4"/>
      <path d="M-16 0H16M-16 12H8" stroke="#8c6ab6" stroke-width="4" stroke-linecap="round"/>
      <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.08;1" dur="2.4s" repeatCount="indefinite"/>
    </g>
    <text x="192" y="324" font-size="18" text-anchor="middle" font-weight="900" fill="#21856a">CAN CLEAR</text>
    <text x="501" y="324" font-size="17" text-anchor="middle" font-weight="900" fill="#8b57b4">CHECKUPS</text>
    <text x="371" y="391" font-size="18" text-anchor="middle" font-weight="800" fill="#735b92">Not everyone develops serious liver damage.</text>
  `,'Acute may clear · Chronic needs follow-up');
  sceneArt = function(kind) {
    if (kind === 'lqVaccineVisual') return vaccineArt;
    if (kind === 'lqOutcomesVisual') return outcomesArt;
    return previousSceneArt(kind);
  };
  const style=document.createElement('style');
  style.textContent=`
    .lq-mini-visual{width:100%;height:100%;min-height:300px;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(145deg,#fff8fd,#f1e9fa)}
    .lq-mini-visual-svg{width:100%;height:auto;max-height:395px;display:block}
    .lq-mini-caption{text-align:center;padding:12px 8px;color:#74459d;font-size:16px;font-weight:900;background:#fff2fc;border-top:2px solid #ead7f5}
    @media(max-width:700px){.lq-mini-visual{min-height:220px}.lq-mini-caption{font-size:13px;padding:7px}}
  `;
  document.head.appendChild(style);
}

buildLevel(); paused=true; chooseCharacter(); requestAnimationFrame(loop);

/* TEST MODE — CLICKABLE LEVELS */

const testLevelBar = document.getElementById("levels");

testLevelBar.addEventListener("click", function(event) {
  const pill = event.target.closest("span");
  if (!pill) return;

  const match = pill.textContent.match(/LEVEL\s+(\d+)/i);
  if (!match) return;

  const selectedLevel = Number(match[1]) - 1;

  if (selectedLevel < 0 || selectedLevel >= levels.length) return;

  // Jump directly to selected level
  level = selectedLevel;

  // Reset the maze and clues for that level
  buildLevel();

  // Close any open popup and continue playing
  closeModal();

  say("TEST MODE: Level " + (level + 1) + " loaded!", 2500);
});

// Make level tabs look clickable
const testStyle = document.createElement("style");
testStyle.textContent = `
  .level-pills span {
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
  }

  .level-pills span:hover {
    transform: translateY(-3px);
    background: #d7b7ff;
    color: #603cac;
  }
`;
document.head.appendChild(testStyle);

/* END TEST MODE */

})();

/* EXTRA ACTIVITY: HOW HBV AFFECTS THE BODY */

(function () {
  function addBodyActivity() {
    const modal = document.getElementById("modal-card");
    if (!modal) return;

    // Only show this at Level 4: HBV can harm the liver
    const heading = modal.querySelector("h2");
    if (!heading ||
        heading.textContent.trim() !== "HBV can harm the liver") return;

    // Prevent duplicates
    if (modal.querySelector(".body-effects-activity")) return;

    const activity = document.createElement("section");
    activity.className = "body-effects-activity";

    activity.innerHTML = `
      <h3>🩺 How Can HBV Affect Your Body?</h3>
      <p>Tap each picture to discover possible symptoms!</p>

      <div class="body-effects-options">
        <button type="button" data-effect="tired">
          <span>😴</span>
          Feeling tired
        </button>

        <button type="button" data-effect="yellow">
          <span>👀</span>
          Yellow eyes or skin
        </button>

        <button type="button" data-effect="sick">
          <span>🤢</span>
          Feeling sick
        </button>
      </div>

      <div class="body-effects-answer" aria-live="polite">
        Choose a picture to learn what might happen.
      </div>

      <p class="body-effects-note">
        💡 Some people with hepatitis B have no
        noticeable symptoms at all!
      </p>
    `;

    const lesson = modal.querySelector(".lesson");
    if (lesson) {
      lesson.insertAdjacentElement("afterend", activity);
    } else {
      modal.appendChild(activity);
    }

    const explanations = {
      tired: "😴 Hepatitis B can make a person feel unusually tired or weak.",
      yellow: "👀 This is called jaundice. It can happen when bilirubin builds up in the body.",
      sick: "🤢 Some people may feel nauseated, lose their appetite, or have pain in the upper-right belly."
    };

    activity.querySelectorAll("[data-effect]").forEach(button => {
      button.addEventListener("click", () => {
        activity.querySelector(".body-effects-answer")
          .textContent = explanations[button.dataset.effect];

        activity.querySelectorAll("[data-effect]").forEach(b => {
          b.classList.toggle("selected", b === button);
        });
      });
    });
  }

  function start() {
    const modal = document.getElementById("modal-card");
    if (!modal) return;

    const observer = new MutationObserver(addBodyActivity);
    observer.observe(modal, { childList: true });
    addBodyActivity();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();


/* LIVERQUEST - SHORTER LESSONS + UNIQUE LEVEL VISUALS */

(function () {
  const levelVisuals = [
    `
      <strong>🧬 Infection Timeline</strong>
      <div class="lq-mini-steps">
        <span>🦠 Attach</span>
        <span>➡️ Enter</span>
        <span>🧬 Messages</span>
        <span>🧩 Virus parts</span>
      </div>
      <small>HBV uses cell machinery to help make more viruses.</small>
    `,
    `
      <strong>🔬 Tissue Comparison</strong>
      <div class="lq-mini-compare">
        <span>🩷 Healthy tissue<br><small>Cells working together</small></span>
        <span>🟠 Affected tissue<br><small>Inflammation or damage</small></span>
      </div>
      <small>Long-lasting injury can lead to scarring.</small>
    `,
    `
      <strong>🛡️ Safety Snapshot</strong>
      <div class="lq-mini-compare">
        <span>⚠️ Possible spread<br><small>Infected blood, shared needles</small></span>
        <span>✅ Everyday contact<br><small>Hugging, sharing desks</small></span>
      </div>
      <small>Vaccination and testing are important tools.</small>
    `,
    `
      <strong>❤️ Why the Liver Matters</strong>
      <div class="lq-mini-steps">
        <span>🍎 Processes nutrients</span>
        <span>⚡ Stores energy</span>
        <span>🧹 Processes waste</span>
      </div>
      <small>Serious liver damage can affect these jobs and a person's health.</small>
    `
  ];

  function simplifyLesson() {
    const modal = document.getElementById("modal-card");
    if (!modal || !modal.querySelector(".lesson")) return;

    const eyebrow = modal.querySelector(".modal-eyebrow");
    if (!eyebrow || !/^CLUE\s+\d+\s+OF\s+[56]/i.test(
      eyebrow.textContent.trim()
    )) return;

    if (modal.dataset.lqSimplified === "yes") return;
    modal.dataset.lqSimplified = "yes";

    const lesson = modal.querySelector(".lesson");

    // Remove repeated introduction, but keep detailed explanation.
    const brief = lesson.querySelector("p.large");
    if (brief) brief.remove();

    // Remove repeated "Remember" paragraph.
    lesson.querySelectorAll("p").forEach(p => {
      if (/^Remember:/i.test(p.textContent.trim())) {
        p.remove();
      }
    });

    // Add a different visual recap at discovery 6 of each level.
    if (!/^CLUE\s+(5\s+OF\s+5|6\s+OF\s+6)/i.test(
      eyebrow.textContent.trim()
    )) return;

    const hud = document.getElementById("hud-level");
    const match = hud?.textContent.match(/LEVEL\s+(\d+)/i);
    const levelIndex = match ? Number(match[1]) - 1 : -1;

    if (levelIndex < 0 || levelIndex > 3) return;

    const visual = document.createElement("div");
    visual.className = "lq-quick-visual";
    visual.innerHTML = levelVisuals[levelIndex];

    const replay = lesson.querySelector("#replay-science");
    if (replay) {
      replay.parentElement.insertBefore(visual, replay);
    } else {
      lesson.appendChild(visual);
    }
  }

  function init() {
    const modal = document.getElementById("modal-card");
    if (!modal) return;

    const observer = new MutationObserver(simplifyLesson);
    observer.observe(modal, { childList: true, subtree: true });
    simplifyLesson();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


/* LIVERQUEST: ANIMATED SCIENCE RECAPS
   Replaces the four static Objective 6 recap boxes.
   Does not change gameplay or existing lessons.
*/

(function () {
  const scenes = [
    // LEVEL 1: How HBV uses a liver cell
    `
    <h3>🦠 How HBV Makes More Viruses</h3>
    <svg class="lq-scene lq-virus-scene"
         viewBox="0 0 360 190"
         role="img"
         aria-label="HBV attaches to a liver cell, enters,
         uses the cell to produce virus parts,
         and new viruses are released.">

      <!-- Liver cell -->
      <ellipse cx="215" cy="91" rx="125" ry="72"
               fill="#ffd6e9" stroke="#cb83c5"
               stroke-width="5"/>

      <!-- Nucleus -->
      <circle cx="238" cy="88" r="36"
              fill="#bd94e7" stroke="#915bbd"
              stroke-width="3"/>
      <path d="M220 86 Q238 66 251 84 T251 99"
            fill="none" stroke="#7850ae"
            stroke-width="3"/>

      <!-- Incoming HBV -->
      <g class="lq-incoming-virus">
        <circle r="15" fill="#9857cb"
                stroke="#69369f" stroke-width="3"/>
        <g stroke="#69369f" stroke-width="3">
          <path d="M0 -24V-15 M0 15V24
                   M-24 0H-15 M15 0H24
                   M-17 -17L-11 -11
                   M17 17L11 11
                   M17 -17L11 -11
                   M-17 17L-11 11"/>
        </g>
        <circle r="6" fill="#edcaff"/>
      </g>

      <!-- Cell messages -->
      <g class="lq-cell-messages">
        <path d="M170 75L192 75L184 85L205 85"
              stroke="#9e56cc" stroke-width="5"
              fill="none" stroke-linecap="round"/>
        <path d="M265 113L286 120L272 136"
              stroke="#9e56cc" stroke-width="5"
              fill="none" stroke-linecap="round"/>
      </g>

      <!-- New virus particles -->
      <g class="lq-new-viruses" fill="#9652c4"
         stroke="#68339a" stroke-width="2">
        <circle cx="302" cy="57" r="10"/>
        <circle cx="320" cy="103" r="10"/>
        <circle cx="284" cy="135" r="10"/>
      </g>

      <text x="180" y="177" text-anchor="middle"
            fill="#68428f" font-size="12"
            font-weight="bold">LIVER CELL</text>
    </svg>
    <div class="lq-animation-steps">
      <span>1. Attach</span>
      <span>2. Enter</span>
      <span>3. Make parts</span>
      <span>4. Release</span>
    </div>
    <p>HBV uses a liver cell to help make new viruses.</p>
    `,

    // LEVEL 2: Healthy tissue versus affected tissue
    `
    <h3>🔬 What Happens to Liver Tissue?</h3>
    <svg class="lq-scene lq-tissue-scene"
         viewBox="0 0 360 185"
         role="img"
         aria-label="Healthy liver cells become inflamed,
         and repeated long-term injury can produce
         scar tissue.">

      <rect x="10" y="10" width="340" height="153"
            rx="20" fill="#fff1fa"
            stroke="#e8b8dc" stroke-width="2"/>

      <g class="lq-tissue-cells">
        <g transform="translate(80 60)">
          <circle r="29"/>
          <circle r="9" class="lq-nucleus"/>
        </g>
        <g transform="translate(151 60)">
          <circle r="29"/>
          <circle r="9" class="lq-nucleus"/>
        </g>
        <g transform="translate(222 60)">
          <circle r="29"/>
          <circle r="9" class="lq-nucleus"/>
        </g>
        <g transform="translate(115 119)">
          <circle r="29"/>
          <circle r="9" class="lq-nucleus"/>
        </g>
        <g transform="translate(187 119)">
          <circle r="29"/>
          <circle r="9" class="lq-nucleus"/>
        </g>
        <g transform="translate(259 119)">
          <circle r="29"/>
          <circle r="9" class="lq-nucleus"/>
        </g>
      </g>

      <!-- Scarring appears last -->
      <g class="lq-scar-lines" stroke="#b57e52"
         stroke-width="7" stroke-linecap="round"
         fill="none">
        <path d="M42 42 Q100 95 164 145"/>
        <path d="M185 20 Q230 72 309 145"/>
        <path d="M33 145 Q150 90 322 70"/>
      </g>

      <text x="180" y="179" text-anchor="middle"
            fill="#68428f" font-size="12"
            font-weight="bold">
        HEALTHY → INFLAMMATION → POSSIBLE SCARRING
      </text>
    </svg>
    <p>Ongoing inflammation can damage tissue. Over time, repeated injury may cause scarring.</p>
    `,

    // LEVEL 3: How HBV spreads
    `
    <h3>🛡️ How Does HBV Spread?</h3>
    <svg class="lq-scene lq-safety-scene"
         viewBox="0 0 360 188"
         role="img"
         aria-label="Infected blood entering another
         person's body can transmit HBV.
         Hugging and everyday contact do not.">

      <!-- Exposure lane -->
      <rect x="8" y="10" width="167" height="164"
            rx="18" fill="#fff0f3"
            stroke="#edb1bf" stroke-width="2"/>

      <text x="91" y="34" text-anchor="middle"
            font-size="13" font-weight="bold"
            fill="#9f476f">BLOOD EXPOSURE</text>

      <path d="M65 58C65 58 43 85 43 102
               A22 22 0 0 0 87 102
               C87 85 65 58 65 58Z"
            fill="#e9708c"/>

      <g class="lq-blood-virus">
        <circle r="12" fill="#9950c5"/>
        <circle r="5" fill="#efccff"/>
      </g>

      <text x="91" y="151" text-anchor="middle"
            font-size="12" font-weight="bold"
            fill="#9f476f">POSSIBLE RISK</text>

      <!-- Everyday-contact lane -->
      <rect x="185" y="10" width="167" height="164"
            rx="18" fill="#edfbea"
            stroke="#afd7ad" stroke-width="2"/>

      <text x="269" y="34" text-anchor="middle"
            font-size="13" font-weight="bold"
            fill="#387b5a">EVERYDAY CONTACT</text>

      <g class="lq-safe-people">
        <circle cx="245" cy="71" r="16" fill="#b48dda"/>
        <circle cx="290" cy="71" r="16" fill="#f2a9ca"/>
        <path d="M225 116Q244 84 262 113"
              fill="none" stroke="#b48dda"
              stroke-width="15"
              stroke-linecap="round"/>
        <path d="M275 113Q292 84 310 116"
              fill="none" stroke="#f2a9ca"
              stroke-width="15"
              stroke-linecap="round"/>
      </g>

      <g class="lq-safe-check">
        <circle cx="269" cy="116" r="20"
                fill="#62bf94"/>
        <path d="M257 115L266 124L282 105"
              stroke="white" stroke-width="5"
              fill="none" stroke-linecap="round"/>
      </g>

      <text x="269" y="151" text-anchor="middle"
            font-size="12" font-weight="bold"
            fill="#387b5a">NO HBV SPREAD</text>
    </svg>
    <p>HBV can spread through infected blood entering the body—not through hugs or shared desks.</p>
    `,

    // LEVEL 4: Why liver health matters
    `
    <h3>💗 Why Does Your Liver Matter?</h3>
    <svg class="lq-scene lq-liver-scene"
         viewBox="0 0 360 195"
         role="img"
         aria-label="The liver processes nutrients,
         stores energy, and helps clear waste.
         Liver damage can interfere with these jobs.">

      <!-- Liver -->
      <g class="lq-liver-shape">
        <path d="M92 65
                 C120 24 217 32 270 68
                 C298 88 279 130 251 132
                 C207 137 192 107 162 111
                 C137 114 128 148 101 132
                 C75 117 76 84 92 65Z"
              fill="#e98ab4" stroke="#b85b94"
              stroke-width="5"/>
        <circle cx="167" cy="78" r="5" fill="#784876"/>
        <circle cx="193" cy="78" r="5" fill="#784876"/>
        <path d="M169 94Q181 104 194 94"
              stroke="#784876"
              stroke-width="3" fill="none"
              stroke-linecap="round"/>
      </g>

      <!-- Jobs appear around liver -->
      <g class="lq-liver-job job-one">
        <circle cx="55" cy="52" r="26" fill="#d7f3b3"/>
        <text x="55" y="59" text-anchor="middle"
              font-size="24">🍎</text>
      </g>

      <g class="lq-liver-job job-two">
        <circle cx="306" cy="45" r="26" fill="#fff0b1"/>
        <text x="306" y="52" text-anchor="middle"
              font-size="24">⚡</text>
      </g>

      <g class="lq-liver-job job-three">
        <circle cx="308" cy="153" r="26" fill="#c5ecf5"/>
        <text x="308" y="160" text-anchor="middle"
              font-size="24">🧹</text>
      </g>

      <!-- Damage indicator -->
      <g class="lq-liver-warning">
        <circle cx="182" cy="88" r="32"
                fill="#f2b14e" opacity=".9"/>
        <text x="182" y="100" text-anchor="middle"
              font-size="35" font-weight="bold"
              fill="white">!</text>
      </g>

      <text x="180" y="187" text-anchor="middle"
            font-size="12" font-weight="bold"
            fill="#68428f">
        NUTRIENTS • ENERGY • WASTE
      </text>
    </svg>
    <p>Liver damage can make its important jobs harder.</p>
    `
  ];

  function updateRecaps() {
    const modal = document.getElementById("modal-card");
    if (!modal) return;

    const recap = modal.querySelector(".lq-quick-visual");

    if (!recap || recap.dataset.animated === "yes") return;

    const hud = document.getElementById("hud-level");
    const match = hud?.textContent.match(/LEVEL\s+(\d+)/i);
    if (!match) return;

    const levelIndex = Number(match[1]) - 1;

    if (levelIndex < 0 || levelIndex >= scenes.length) return;

    recap.dataset.animated = "yes";
    recap.classList.add("lq-animated-recap");
    recap.innerHTML = scenes[levelIndex];
  }

  function initialize() {
    const modal = document.getElementById("modal-card");
    if (!modal) return;

    const observer = new MutationObserver(updateRecaps);

    observer.observe(modal, {
      childList: true,
      subtree: true
    });

    updateRecaps();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
