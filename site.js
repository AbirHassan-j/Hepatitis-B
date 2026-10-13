
/* LIVERQUEST — CLEANED WEBSITE JAVASCRIPT */

const pages = [
  ["index.html", "Mission Control", "🏠"],
  ["cells.html", "Cell City", "🧫"],
  ["invasion.html", "Virus Invasion", "🦠"],
  ["microscope.html", "Tissue Detective", "🔬"],
  ["lab.html", "Rescue Lab", "⚗️"],
  ["finale.html", "Final Challenge", "🏆"]
];

const pictures = {
  virus: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hepatitis%20B%20virus%2001.jpg",
  color: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Hepatitis_b.jpg",
  healthy: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Liver-H%26E.jpg",
  infected: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hepatits%20B%20ground%20glass%20H%26E.jpg"
};

function photo(name, alt) {
  return `
    <div class="photo large-photo">
      <img src="${pictures[name]}" alt="${alt}"
           loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.hidden=false">
      <p hidden>Scientific photograph unavailable on this network.</p>
    </div>`;
}

let progress = {};
try {
  progress = JSON.parse(localStorage.getItem("liverquest") || "{}");
} catch (e) {}

function saveMission(name) {
  progress[name] = true;
  try {
    localStorage.setItem("liverquest", JSON.stringify(progress));
  } catch (e) {}
}

function nextPage(url, mission) {
  saveMission(mission);
  location.href = url;
}

function shell(title, description, content) {
  const current = location.pathname.split("/").pop() || "index.html";
  const completed = ["cells", "invasion", "microscope", "lab", "finale"]
    .filter(name => progress[name]).length;

  document.title = title + " | LiverQuest";

  document.getElementById("app").innerHTML = `
    <div class="site">
      <header class="topbar">
        <a href="index.html" class="logo">
          🧬 LIVER<span class="accent">QUEST</span>
          <small>HEPATITIS B ADVENTURE</small>
        </a>

        <nav>
          ${pages.map(([url, name, icon]) => `
            <a href="${url}" class="${current === url ? "active" : ""}">
              ${icon} ${name}
            </a>`).join("")}
        </nav>

        <div class="top-progress">
          <strong>${completed}/5 missions</strong>
          <div class="progress-track">
            <div class="progress-fill"
                 style="width:${completed * 20}%"></div>
          </div>
        </div>
      </header>

      <main>
        <div class="pagehead">
          <div class="eyebrow">🌈 THE LIVER RESCUE ACADEMY</div>
          <h1>${title}</h1>
          <p>${description}</p>
        </div>
        ${content}
      </main>

      <footer>
        <strong>🧬 LIVERQUEST</strong>
        <p>Interactive science for Grade 7 and 8 students</p>
        <a href="credits.html">Science and image credits</a>
      </footer>
    </div>`;
}

/* =========================================
   HOME PAGE
   ========================================= */

function initHome() {
  shell(
    "Your Mission: Save the Liver!",
    "Enter the microscopic world and discover how hepatitis B affects your liver.",
    `
    <section class="hero-grid">
      <div class="hero-copy">
        <span class="pill">🎮 SCIENCE ADVENTURE</span>
        <h2>SMALL VIRUS.<br><em>BIG MYSTERY!</em></h2>
        <p>
          Your liver is under attack from a tiny virus.
          Explore cells, solve mysteries, and discover
          how your immune system responds.
        </p>
        <a href="cells.html" class="btn primary">
          START THE ADVENTURE →
        </a>
        <p>⏱ Aim for 15 minutes · 5 missions · Ages 12–14</p>
      </div>

      <div class="hero-photo">
        ${photo("color", "Real colour-enhanced hepatitis B virus image")}
        <div class="floating-label">
          🔬 REAL HEPATITIS B VIRUS
        </div>
      </div>
    </section>

    <section class="section">
      <h2>🗺️ Choose Your Mission</h2>
      <div class="mission-grid">
        ${[
          ["cells.html", "🧫", "CELL CITY", "Explore a liver cell."],
          ["invasion.html", "🦠", "VIRUS INVASION", "Follow the virus."],
          ["microscope.html", "🔬", "TISSUE DETECTIVE", "Find the damage."],
          ["lab.html", "⚗️", "RESCUE LAB", "Run experiments."],
          ["finale.html", "🏆", "FINAL SHOWDOWN", "Earn your badge."]
        ].map((m, i) => `
          <a href="${m[0]}" class="mission-card">
            <span class="mission-no">MISSION 0${i + 1}</span>
            <span class="mission-icon">${m[1]}</span>
            <h3>${m[2]}</h3>
            <p>${m[3]}</p>
            <span class="card-arrow">→</span>
          </a>`).join("")}
      </div>
    </section>

    <section class="fact-banner">
      <div>
        <h2>🫀 Meet Your Super Liver!</h2>
        <p>
          Your liver processes nutrients, produces bile to help
          digest fats, stores energy, and helps remove harmful
          substances from your blood.
        </p>
        <p>
          Hepatitis B infects liver cells and can interfere
          with these important jobs.
        </p>
      </div>
      <div class="fact-figure">🧫 ➜ 🫀 ➜ 💪</div>
    </section>`
  );
}

/* =========================================
   MISSION 1 — CELL CITY
   ONE DIAGRAM, ONE BUTTON LIST
   ========================================= */

function initCells() {
  shell(
    "Mission 01: Explore Cell City",
    "Discover the structures inside a liver cell. Select a part to highlight its location.",
    `
    <section class="two-col">

      <div class="panel">
        <h2>🧫 Inside a Liver Cell</h2>
        <p>Click a numbered part. Watch the pointer move to it!</p>

        <div class="clean-cell-visual">
          <svg viewBox="0 0 600 440"
               role="img"
               aria-label="Interactive illustrated liver cell">

            <defs>
              <radialGradient id="pinkCell">
                <stop offset="0%" stop-color="#ffe4f1"/>
                <stop offset="100%" stop-color="#f6add2"/>
              </radialGradient>
            </defs>

            <!-- Cell membrane -->
            <ellipse cx="300" cy="220" rx="242" ry="174"
                     fill="url(#pinkCell)"
                     stroke="#e76aa9" stroke-width="12"/>

            <ellipse cx="300" cy="220" rx="225" ry="157"
                     fill="none" stroke="#fff2b2"
                     stroke-width="5" stroke-dasharray="10 9"/>

            <!-- Endoplasmic reticulum -->
            <g fill="none" stroke="#8470d5"
               stroke-width="12" stroke-linecap="round">
              <path d="M195 115 Q120 95 125 155 T200 180"/>
              <path d="M195 185 Q110 170 125 227 T210 260"/>
              <path d="M385 130 Q480 98 480 162 T420 208"/>
            </g>

            <!-- Ribosomes -->
            <g fill="#7848b7">
              <circle cx="126" cy="138" r="6"/>
              <circle cx="160" cy="174" r="6"/>
              <circle cx="136" cy="234" r="6"/>
              <circle cx="455" cy="148" r="6"/>
              <circle cx="462" cy="198" r="6"/>
              <circle cx="198" cy="327" r="5"/>
            </g>

            <!-- Nucleus -->
            <circle cx="295" cy="218" r="94"
                    fill="#b783ed"
                    stroke="#7439b2" stroke-width="8"/>

            <circle cx="299" cy="220" r="23" fill="#7139ad"/>

            <!-- DNA -->
            <g stroke="#edd9ff" fill="none" stroke-width="5">
              <path d="M266 167 Q338 215 269 274"/>
              <path d="M326 167 Q255 215 330 274"/>
              <path d="M273 183 L322 183"/>
              <path d="M275 253 L321 253"/>
            </g>

            <!-- Mitochondria -->
            <g fill="#ffbf73" stroke="#d77a39" stroke-width="5">
              <ellipse cx="440" cy="304" rx="55" ry="29"
                       transform="rotate(-20 440 304)"/>
              <ellipse cx="164" cy="315" rx="53" ry="28"
                       transform="rotate(18 164 315)"/>
              <ellipse cx="426" cy="104" rx="49" ry="25"/>
            </g>

            <g stroke="#bf7136" stroke-width="4" fill="none">
              <path d="M401 305 l16 -15 15 20 15 -20 17 15"/>
              <path d="M129 316 l15 -13 14 18 15 -16 15 17"/>
              <path d="M390 102 l12 -12 14 20 12 -16 17 14"/>
            </g>

            <!-- Golgi apparatus -->
            <g stroke="#33bfa9" stroke-width="10"
               stroke-linecap="round" fill="none">
              <path d="M365 365 Q427 393 491 357"/>
              <path d="M384 383 Q427 403 475 377"/>
              <path d="M400 398 Q435 413 459 393"/>
            </g>

            <!-- Lysosomes -->
            <g fill="#ffdb69" stroke="#d8a43c" stroke-width="5">
              <circle cx="115" cy="104" r="20"/>
              <circle cx="505" cy="241" r="20"/>
            </g>

            <!-- Dynamic highlight and pointer -->
            <circle id="organ-ring" cx="295" cy="218" r="105"
                    fill="none" stroke="#13ba84"
                    stroke-width="8" visibility="hidden"/>

            <path id="organ-pointer" d=""
                  fill="none" stroke="#673fc2"
                  stroke-width="5" stroke-linecap="round"
                  visibility="hidden"/>

            <rect id="organ-tag-bg"
                  x="315" y="5" width="265" height="44"
                  rx="14" fill="white"
                  stroke="#8b61e8" stroke-width="3"
                  visibility="hidden"/>

            <text id="organ-tag"
                  x="448" y="34" text-anchor="middle"
                  font-size="21" font-weight="bold"
                  fill="#6540bb"></text>
          </svg>
        </div>

        <p class="caption">
          Simplified educational cell model.
          The coloured shapes represent organelles.
        </p>

        <div class="cell-choices" id="cell-parts"></div>
      </div>

      <div class="panel info-panel">
        <span class="pill">🔬 CELL PARTS FIELD GUIDE</span>

        <h2 id="part-title">👆 Choose a cell part!</h2>

        <p id="part-desc">
          Tap the buttons to learn how each organelle
          helps your liver cells.
        </p>

        <div class="callout" id="part-fact">
          🦠 Hepatitis B uses the cell's machinery
          to make new virus particles.
        </div>

        <p id="discovery" class="feedback">
          0 of 8 parts discovered
        </p>
      </div>
    </section>

    <section class="panel challenge">
      <h2>🎮 Build-a-Cell Challenge</h2>
      <p>Match the four main cell parts to their jobs.</p>
      <div class="match-game" id="match-game"></div>
      <p id="match-feedback" class="feedback"></p>
      <button id="cell-next" class="btn primary" disabled>
        COMPLETE MISSION →
      </button>
    </section>`
  );

  const parts = [
    {
      id:"nucleus", name:"🧠 Nucleus",
      job:"Stores DNA instructions",
      desc:"The nucleus stores DNA, the instructions that help a cell work.",
      fact:"Hepatitis B forms a viral DNA template inside the nucleus.",
      x:295,y:218,r:105
    },
    {
      id:"membrane", name:"🛡️ Cell Membrane",
      job:"Controls entry and exit",
      desc:"The membrane protects the cell and controls what enters and leaves.",
      fact:"Hepatitis B attaches to a special protein on the liver cell's surface.",
      x:300,y:220,r:244
    },
    {
      id:"mitochondria", name:"⚡ Mitochondria",
      job:"Help provide cell energy",
      desc:"Mitochondria help provide usable energy for a liver cell.",
      fact:"Liver cells need energy to perform their important jobs.",
      x:440,y:304,r:43
    },
    {
      id:"cytoplasm", name:"🫧 Cytoplasm",
      job:"Jelly-like cell interior",
      desc:"Cytoplasm is the jelly-like substance surrounding the cell's structures.",
      fact:"Many steps involved in producing viral material happen inside cells.",
      x:205,y:335,r:36
    },
    {
      id:"ribosomes", name:"🏭 Ribosomes",
      desc:"Ribosomes build proteins from instructions.",
      fact:"Hepatitis B uses the cell's ribosomes to produce viral proteins.",
      x:136,y:164,r:28
    },
    {
      id:"er", name:"🛤️ Endoplasmic Reticulum",
      desc:"The ER helps make and process proteins and fats.",
      fact:"Some hepatitis B surface proteins are processed in the ER.",
      x:168,y:215,r:52
    },
    {
      id:"golgi", name:"📦 Golgi Apparatus",
      desc:"The Golgi sorts and packages materials.",
      fact:"It acts like the cell's delivery centre.",
      x:430,y:381,r:48
    },
    {
      id:"lysosomes", name:"♻️ Lysosomes",
      desc:"Lysosomes recycle unwanted materials in the cell.",
      fact:"Recycling helps cells maintain a healthy environment.",
      x:505,y:241,r:29
    }
  ];

  let discovered = new Set();

  document.getElementById("cell-parts").innerHTML =
    parts.map((part,i) => `
      <button data-part="${part.id}">
        ${i+1}. ${part.name}
      </button>
    `).join("");

  document.querySelectorAll("[data-part]").forEach(button => {
    button.onclick = () => {
      const part = parts.find(p => p.id === button.dataset.part);

      discovered.add(part.id);

      document.querySelectorAll("[data-part]").forEach(b => {
        b.classList.toggle("selected", b === button);
      });

      document.getElementById("part-title").textContent = part.name;
      document.getElementById("part-desc").textContent = part.desc;
      document.getElementById("part-fact").textContent = "🦠 " + part.fact;
      document.getElementById("discovery").textContent =
        `${discovered.size} of 8 parts discovered`;

      const ring = document.getElementById("organ-ring");
      ring.setAttribute("cx", part.x);
      ring.setAttribute("cy", part.y);
      ring.setAttribute("r", part.r);
      ring.setAttribute("visibility", "visible");

      const pointer = document.getElementById("organ-pointer");
      pointer.setAttribute(
        "d", `M${part.x} ${part.y-part.r} L448 49`
      );
      pointer.setAttribute("visibility", "visible");

      document.getElementById("organ-tag-bg")
        .setAttribute("visibility", "visible");

      document.getElementById("organ-tag").textContent =
        part.name.replace(/^\S+\s/, "");
    };
  });

  // Matching game uses the four curriculum cell parts.
  const mainParts = parts.slice(0,4);
  const mixed = [2,0,3,1];

  document.getElementById("match-game").innerHTML = `
    <div>
      ${mainParts.map((p,i) => `
        <button class="match-choice" data-match="${i}">
          ${p.name}
        </button>
      `).join("")}
    </div>
    <div>
      ${mixed.map(i => `
        <button class="match-target" data-answer="${i}">
          ${mainParts[i].job}
        </button>
      `).join("")}
    </div>`;

  let selected = null;
  const solved = new Set();

  document.querySelectorAll("[data-match]").forEach(b => {
    b.onclick = () => {
      if (solved.has(Number(b.dataset.match))) return;
      selected = Number(b.dataset.match);
      document.querySelectorAll("[data-match]").forEach(x => {
        x.classList.toggle("selected", x === b);
      });
    };
  });

  document.querySelectorAll("[data-answer]").forEach(b => {
    b.onclick = () => {
      const answer = Number(b.dataset.answer);
      if (selected === null || solved.has(answer)) return;

      if (selected === answer) {
        solved.add(answer);
        b.classList.add("correct");
        document.querySelector(`[data-match="${answer}"]`)
          .classList.add("correct");

        document.getElementById("match-feedback").textContent =
          `✅ ${solved.size}/4 correct!`;

        selected = null;

        if (solved.size === 4) {
          document.getElementById("cell-next").disabled = false;
        }
      } else {
        document.getElementById("match-feedback").textContent =
          "Not quite! Try another answer.";
      }
    };
  });

  document.getElementById("cell-next").onclick =
    () => nextPage("invasion.html", "cells");
}

/* =========================================
   MISSION 2 — VIRUS INVASION
   ========================================= */

function initInvasion() {
  shell(
    "Mission 02: Virus Invasion",
    "Follow hepatitis B as it enters a liver cell and uses its machinery.",
    `
    <section class="two-col">
      <div class="panel">
        <h2>🦠 Meet the Hepatitis B Virus</h2>
        ${photo("virus", "Real electron microscope photo of HBV")}
        <p class="caption">
          Scientific electron micrograph of hepatitis B.
        </p>
      </div>

      <div class="panel">
        <span class="pill">THE VIRUS FILE</span>
        <h2>What is hepatitis B?</h2>
        <p>
          Hepatitis B is a viral infection that targets
          the liver. It can cause inflammation and
          sometimes damage liver tissue.
        </p>
        <div class="callout">
          <strong>Important Discovery!</strong>
          <p>
            Much of the injury happens when immune
            defenders attack infected liver cells.
          </p>
        </div>
        <p>
          Hepatitis B does not spread through hugging,
          sharing meals, or ordinary friendship.
        </p>
      </div>
    </section>

    <section class="panel challenge">
      <h2>🎮 Follow the Virus: 5 Steps</h2>
      <span class="chip" id="step-label"></span>

      <div class="story-stage">
        <div class="story-art" id="story-art"></div>
        <div>
          <h3 id="story-title"></h3>
          <p id="story-text"></p>
          <button id="story-next" class="btn primary">
            NEXT STEP →
          </button>
        </div>
      </div>
    </section>`
  );

  const steps = [
    ["🦠 ➜ 🛡️", "Find the Doorway",
     "Hepatitis B travels through infected blood and attaches to a special protein on liver cells."],

    ["🛡️ ➜ 🧫", "Enter the Cell",
     "The virus enters the liver cell and sends its genetic material toward the nucleus."],

    ["🧬 ➜ 🏭", "Use the Machinery",
     "Viral DNA forms a template. The liver cell's machinery helps make viral proteins and genetic material."],

    ["🏭 ➜ 🦠", "Make More Viruses",
     "New virus particles are assembled and can leave the cell to infect other liver cells."],

    ["🛡️ ⚔️ 🔥", "Immune Defenders Arrive",
     "The immune response attacks infected cells. Inflammation may damage liver tissue."]
  ];

  let step = 0;

  function showStep() {
    document.getElementById("story-art").textContent = steps[step][0];
    document.getElementById("story-title").textContent =
      `Step ${step+1}: ${steps[step][1]}`;
    document.getElementById("story-text").textContent = steps[step][2];
    document.getElementById("step-label").textContent =
      `STEP ${step+1} / 5`;

    document.getElementById("story-next").textContent =
      step === 4 ? "FINISH MISSION →" : "NEXT STEP →";
  }

  showStep();

  document.getElementById("story-next").onclick = () => {
    if (step === 4) {
      nextPage("microscope.html", "invasion");
    } else {
      step++;
      showStep();
    }
  };
}

/* =========================================
   MISSION 3 — TISSUE DETECTIVE
   ========================================= */

function initMicroscope() {
  shell(
    "Mission 03: Tissue Detective",
    "Compare healthy and injured liver cells. Can you find the clues?",
    `
    <section class="panel challenge">
      <h2>🔎 Healthy vs. Affected Liver Tissue</h2>

      <p>
        Pink shapes represent liver cells.
        Purple dots are nuclei.
        Orange cells with an X represent injury.
        Blue circles represent immune defenders.
      </p>

      <div class="kid-tissue-grid">

        <div class="kid-tissue-card">
          <h3>😊 Healthy-Looking Tissue</h3>
          <div class="kid-tissue-picture" id="healthy-tissue"></div>
          <button class="btn secondary" data-examine="healthy">
            Investigate Healthy Cells
          </button>
        </div>

        <div class="kid-tissue-card">
          <h3>🦠 Affected Tissue</h3>
          <div class="kid-tissue-picture" id="injured-tissue"></div>
          <button class="btn secondary" data-examine="injured">
            Investigate Cell Injury
          </button>
        </div>
      </div>

      <div class="callout" id="tissue-report" role="status">
        🔬 Investigate both pictures to discover what's happening.
      </div>

      <button class="btn secondary" id="show-scars">
        🩹 Reveal Possible Scar Tissue
      </button>

      <p class="tiny">
        This model is simplified. Not everyone with
        hepatitis B develops significant liver injury
        or scarring.
      </p>

      <h3>🎯 Detective Question</h3>
      <p>Which picture shows cell injury and immune defenders?</p>

      <div class="answer-row">
        <button class="answer" data-tissue-choice="healthy">
          Healthy Tissue
        </button>
        <button class="answer" data-tissue-choice="injured">
          Affected Tissue
        </button>
      </div>

      <p class="feedback" id="tissue-feedback"></p>

      <div class="callout">
        <strong>🧫 CELLS → TISSUES → ORGANS → SYSTEMS</strong>
        <p>
          Groups of cells form tissues.
          Different tissues build organs, including the liver.
          The liver supports digestion and other body functions.
        </p>
      </div>

      <details>
        <summary>🔬 Bonus: Real Microscope Images</summary>
        <p>
          These are real scientific tissue photographs.
          They are more difficult to understand than our
          colourful teaching model.
        </p>
        <div class="tissue-grid">
          <div>
            ${photo("healthy", "Healthy liver histology")}
            <p>Healthy-looking liver tissue</p>
          </div>
          <div>
            ${photo("infected", "Hepatitis B-associated histology")}
            <p>Hepatitis B-associated cell changes</p>
          </div>
        </div>
      </details>

      <button id="tissue-next" class="btn primary" disabled>
        CONTINUE TO RESCUE LAB →
      </button>
    </section>`
  );

  function drawTissue(id, affected) {
    const injured = [2,6,10,15,18];

    document.getElementById(id).innerHTML =
      Array.from({length:20}, (_,i) => `
        <span class="kid-cell ${
          affected && injured.includes(i) ? "hurt" : ""
        }">
          <i></i>
        </span>
      `).join("") +
      (affected ? `
        <span class="immune-marker"
              style="top:24%;left:20%">+</span>
        <span class="immune-marker"
              style="top:60%;left:72%">+</span>
        <span class="scar-marker" id="scar-marker"></span>
      ` : "");
  }

  drawTissue("healthy-tissue", false);
  drawTissue("injured-tissue", true);

  const investigated = new Set();
  let correct = false;

  function checkCompletion() {
    document.getElementById("tissue-next").disabled =
      !(investigated.size === 2 && correct);
  }

  document.querySelectorAll("[data-examine]").forEach(b => {
    b.onclick = () => {
      investigated.add(b.dataset.examine);

      document.getElementById("tissue-report").textContent =
        b.dataset.examine === "healthy"
        ? "✅ These liver cells are working together. Purple dots represent their nuclei."
        : "🦠 The orange shapes represent injured cells. The blue dots represent immune defenders responding to infection.";

      checkCompletion();
    };
  });

  document.getElementById("show-scars").onclick = () => {
    document.getElementById("scar-marker")
      .classList.toggle("visible");
  };

  document.querySelectorAll("[data-tissue-choice]").forEach(b => {
    b.onclick = () => {
      correct = b.dataset.tissueChoice === "injured";

      document.getElementById("tissue-feedback").textContent =
        correct
        ? "🎉 Correct! You spotted the signs of cell injury!"
        : "🔎 Try again. Look for orange cells and blue defenders.";

      checkCompletion();
    };
  });

  document.getElementById("tissue-next").onclick =
    () => nextPage("lab.html", "microscope");
}

/* =========================================
   MISSION 4 — RESCUE LAB
   ========================================= */

function initLab() {
  shell(
    "Mission 04: The Rescue Lab",
    "Explore tissue injury and discover ways to prevent hepatitis B.",
    `
    <section class="two-col">

      <div class="panel">
        <span class="pill">⚗️ EXPERIMENT 1</span>
        <h2>Tissue Time Machine</h2>
        <p>
          Move the slider to explore what could happen
          if liver inflammation and injury continue.
        </p>

        <label for="damage">
          Repeated liver injury:
          <strong id="damage-text">Low</strong>
        </label>

        <input id="damage" type="range"
               min="0" max="3" step="1" value="0">

        <div class="tissue-sim" id="tissue-sim"></div>

        <p id="damage-caption" class="feedback"></p>

        <p class="tiny">
          This is a teaching model, not a prediction.
          Not everyone with hepatitis B develops scarring.
        </p>
      </div>

      <div class="panel">
        <span class="pill">🕵️ EXPERIMENT 2</span>
        <h2>Transmission Mythbusters</h2>

        <p>
          Decide whether hepatitis B can spread
          through each situation.
        </p>

        <div id="myth-cards"></div>
        <p class="feedback" id="myth-status">
          0/5 investigated
        </p>
      </div>
    </section>

    <section class="panel challenge">
      <h2>🛡️ Protection Power-Up</h2>
      <p>Which choice helps prevent hepatitis B?</p>

      <div class="choices">
        <button class="defence" data-def="vaccine">
          💉 Hepatitis B Vaccine
        </button>

        <button class="defence" data-def="hug">
          🤗 Avoid Hugging Friends
        </button>

        <button class="defence" data-def="wait">
          🎲 Wait Until Symptoms Appear
        </button>
      </div>

      <p class="feedback" id="defence-feedback">
        Choose the best protection!
      </p>

      <button class="btn primary" id="lab-next" disabled>
        FINAL MISSION →
      </button>
    </section>`
  );

  const slider = document.getElementById("damage");

  const stages = [
    {
      label: "Healthy-Looking",
      explanation: "Many liver cells are working normally."
    },
    {
      label: "Inflammation",
      explanation: "Immune cells respond to infected liver cells. Some cells may be injured."
    },
    {
      label: "Repeated Injury",
      explanation: "Ongoing injury may cause scar tissue called fibrosis."
    },
    {
      label: "Severe Scarring",
      explanation: "Extensive scar tissue, called cirrhosis, can affect liver function."
    }
  ];

  function updateDamage() {
    const level = Number(slider.value);

    document.getElementById("damage-text").textContent =
      stages[level].label;

    document.getElementById("damage-caption").textContent =
      stages[level].explanation;

    document.getElementById("tissue-sim").innerHTML = `
      <div class="sim-cells">
        ${Array.from({length:28}, (_,i) => `
          <span class="sim-cell ${i < level*6 ? "affected" : ""}"
                style="--rot:${(i%5)*14-25}deg">
            ${i < level*6 ? "✕" : "•"}
          </span>
        `).join("")}
      </div>
      <div class="scar scar-${level}"></div>
    `;
  }

  slider.oninput = updateDamage;
  updateDamage();

  const questions = [
    [
      "Sharing a hug",
      "no",
      "Hugging and casual contact do not spread hepatitis B."
    ],
    [
      "Infected blood entering an open wound",
      "yes",
      "Exposure to infected blood can transmit hepatitis B."
    ],
    [
      "Sharing food at lunch",
      "no",
      "Sharing food does not spread hepatitis B."
    ],
    [
      "Sharing a used needle",
      "yes",
      "Used needles can carry infected blood."
    ],
    [
      "From an infected parent to a baby during birth",
      "yes",
      "Hepatitis B can be transmitted during birth."
    ]
  ];

  const answered = new Set();
  let protectedChoice = false;

  document.getElementById("myth-cards").innerHTML =
    questions.map((q,i) => `
      <div class="myth">
        <span>${i+1}. ${q[0]}</span>
        <div>
          <button data-myth="${i}" data-answer="yes">
            CAN
          </button>
          <button data-myth="${i}" data-answer="no">
            CANNOT
          </button>
        </div>
        <small id="myth-feedback-${i}"></small>
      </div>
    `).join("");

  document.querySelectorAll("[data-myth]").forEach(button => {
    button.onclick = () => {
      const i = Number(button.dataset.myth);
      const good = button.dataset.answer === questions[i][1];

      document.getElementById(`myth-feedback-${i}`).textContent =
        (good ? "✅ " : "❌ ") + questions[i][2];

      if (good) {
        answered.add(i);
        button.closest(".myth").classList.add("solved");
      }

      document.getElementById("myth-status").textContent =
        `${answered.size}/5 investigated correctly`;

      checkLab();
    };
  });

  document.querySelectorAll("[data-def]").forEach(button => {
    button.onclick = () => {
      protectedChoice = button.dataset.def === "vaccine";

      const message = {
        vaccine:
          "✅ Correct! Vaccination helps your immune system protect you against hepatitis B.",
        hug:
          "❌ Hugging friends is safe. Hepatitis B does not spread through casual contact.",
        wait:
          "❌ Someone can have hepatitis B without symptoms. Blood testing can detect it."
      };

      document.getElementById("defence-feedback").textContent =
        message[button.dataset.def];

      checkLab();
    };
  });

  function checkLab() {
    document.getElementById("lab-next").disabled =
      !(answered.size === 5 && protectedChoice);
  }

  document.getElementById("lab-next").onclick =
    () => nextPage("finale.html", "lab");
}

/* =========================================
   MISSION 5 — FINAL SHOWDOWN
   ========================================= */

function initFinale() {
  shell(
    "Mission 05: Final Showdown",
    "Complete the final quiz to become a Science Defender!",
    `
    <section class="final-layout">

      <div class="panel challenge">
        <span class="pill" id="quiz-progress">
          QUESTION 1 / 5
        </span>

        <h2>🏁 Can You Save Cell City?</h2>
        <div id="quiz-area"></div>
      </div>

      <div class="panel badge-panel">
        <div class="badge-emblem">
          🏆
          <span>SCIENCE<br>DEFENDER</span>
        </div>

        <h3>Your Defender Badge</h3>
        <p id="badge-text">
          Complete the challenge to unlock your badge.
        </p>
      </div>
    </section>`
  );

  const questions = [
    {
      q:"Which organ does hepatitis B mainly infect?",
      answers:["Heart","Liver","Brain"],
      correct:1,
      explanation:"Hepatitis B mainly targets liver cells."
    },
    {
      q:"Which cell part stores DNA?",
      answers:["Nucleus","Membrane","Mitochondria"],
      correct:0,
      explanation:"The nucleus stores the cell's DNA instructions."
    },
    {
      q:"What can cause much of the liver-cell injury?",
      answers:[
        "The immune response to infected cells",
        "Hugging friends",
        "Eating bread"
      ],
      correct:0,
      explanation:"Immune responses to infected liver cells can cause inflammation and injury."
    },
    {
      q:"What can repeated liver injury sometimes cause?",
      answers:["Scar tissue","Extra bones","Green blood"],
      correct:0,
      explanation:"Repeated injury may lead to fibrosis or, in severe cases, cirrhosis."
    },
    {
      q:"Which choice helps prevent hepatitis B?",
      answers:[
        "Sharing used needles",
        "Vaccination",
        "Waiting for symptoms"
      ],
      correct:1,
      explanation:"Vaccination helps prevent hepatitis B."
    }
  ];

  let number = 0;
  let score = 0;

  function showQuestion() {
    if (number === questions.length) {
      saveMission("finale");

      document.getElementById("quiz-progress").textContent =
        "MISSION COMPLETE";

      document.getElementById("quiz-area").innerHTML = `
        <h2>🎉 Congratulations!</h2>
        <p>
          You scored <strong>${score}/5</strong>.
        </p>
        <p>
          You explored liver cells, investigated
          hepatitis B, and learned how the virus
          can affect liver tissue.
        </p>

        <button id="retry" class="btn primary">
          PLAY AGAIN ↺
        </button>

        <a href="index.html" class="btn secondary">
          RETURN TO MISSION MAP →
        </a>
      `;

      document.getElementById("badge-text").textContent =
        `🏆 Science Defender unlocked! Score: ${score}/5`;

      document.getElementById("retry").onclick = () => {
        number = 0;
        score = 0;
        showQuestion();
      };
      return;
    }

    const item = questions[number];

    document.getElementById("quiz-progress").textContent =
      `QUESTION ${number+1} / ${questions.length}`;

    document.getElementById("quiz-area").innerHTML = `
      <h3>${item.q}</h3>

      <div class="quiz-options">
        ${item.answers.map((answer,i) => `
          <button class="quiz-option" data-quiz="${i}">
            ${String.fromCharCode(65+i)}. ${answer}
          </button>
        `).join("")}
      </div>

      <p class="feedback" id="quiz-feedback">
        Choose the best answer.
      </p>

      <button class="btn primary" id="quiz-next" disabled>
        ${number === 4 ? "SEE MY RESULTS →" : "NEXT QUESTION →"}
      </button>
    `;

    let selected = false;

    document.querySelectorAll("[data-quiz]").forEach(button => {
      button.onclick = () => {
        if (selected) return;
        selected = true;

        const answer = Number(button.dataset.quiz);
        const good = answer === item.correct;

        if (good) score++;

        document.querySelectorAll("[data-quiz]").forEach(b => {
          b.disabled = true;

          if (Number(b.dataset.quiz) === item.correct) {
            b.classList.add("correct");
          } else if (b === button) {
            b.classList.add("wrong");
          }
        });

        document.getElementById("quiz-feedback").textContent =
          (good ? "✅ Correct! " : "💡 Not quite. ") +
          item.explanation;

        document.getElementById("quiz-next").disabled = false;
      };
    });

    document.getElementById("quiz-next").onclick = () => {
      number++;
      showQuestion();
    };
  }

  showQuestion();
}

/* =========================================
   IMAGE CREDITS
   ========================================= */

function initCredits() {
  shell(
    "Behind the Science",
    "Scientific references and image credits for LiverQuest.",
    `
    <section class="panel challenge">
      <h2>🔬 Scientific Image Sources</h2>

      <p>
        The simplified cell and tissue teaching models
        are made with SVG and CSS.
      </p>

      <p>
        The microscope photographs are from
        Wikimedia Commons. Check their individual
        author and licence information before reuse.
      </p>

      <div class="credit-list">
        <p>
          <a href="https://commons.wikimedia.org/wiki/File:Hepatitis_B_virus_01.jpg"
             target="_blank" rel="noopener">
            Hepatitis B virus electron micrograph
          </a>
        </p>

        <p>
          <a href="https://commons.wikimedia.org/wiki/File:Hepatitis_b.jpg"
             target="_blank" rel="noopener">
            Colour-enhanced hepatitis B virus image
          </a>
        </p>

        <p>
          <a href="https://commons.wikimedia.org/wiki/File:Liver-H%26E.jpg"
             target="_blank" rel="noopener">
            Liver histology photograph
          </a>
        </p>

        <p>
          <a href="https://commons.wikimedia.org/wiki/File:Hepatits_B_ground_glass_H%26E.jpg"
             target="_blank" rel="noopener">
            Hepatitis B ground-glass histology
          </a>
        </p>
      </div>

      <h2>📚 Scientific References</h2>

      <p>
        <a href="https://www.cdc.gov/hepatitis-b/hcp/clinical-overview/"
           target="_blank" rel="noopener">
          CDC — Hepatitis B Clinical Overview
        </a>
      </p>

      <p>
        <a href="https://www.niddk.nih.gov/health-information/liver-disease/viral-hepatitis/hepatitis-b"
           target="_blank" rel="noopener">
          NIDDK — Hepatitis B
        </a>
      </p>

      <p>
        <a href="https://www.niddk.nih.gov/health-information/liver-disease/cirrhosis"
           target="_blank" rel="noopener">
          NIDDK — Cirrhosis
        </a>
      </p>
    </section>`
  );
}

/* =========================================
   LOAD THE CORRECT PAGE
   ========================================= */

const currentPage =
  location.pathname.split("/").pop() || "index.html";

const routes = {
  "index.html": initHome,
  "cells.html": initCells,
  "invasion.html": initInvasion,
  "microscope.html": initMicroscope,
  "lab.html": initLab,
  "finale.html": initFinale,
  "credits.html": initCredits
};

(routes[currentPage] || initHome)();

/* MISSION 3 — ADD TISSUE COLOUR LEGEND */

if (location.pathname.endsWith("microscope.html")) {
  const tissueGrid = document.querySelector(".kid-tissue-grid");

  if (tissueGrid && !document.querySelector(".tissue-legend")) {
    tissueGrid.insertAdjacentHTML("afterend", `
      <div class="tissue-legend">
        <h3>🎨 What Do the Colours Mean?</h3>
        <p>Use this guide to investigate the liver tissue!</p>

        <div class="tissue-legend-grid">

          <div class="legend-item">
            <span class="legend-symbol healthy-symbol"></span>
            <div>
              <strong>Pink — Healthy-looking liver cell</strong>
              <p>A cell working normally.</p>
            </div>
          </div>

          <div class="legend-item">
            <span class="legend-symbol nucleus-symbol"></span>
            <div>
              <strong>Purple — Nucleus</strong>
              <p>Contains the cell's DNA instructions.</p>
            </div>
          </div>

          <div class="legend-item">
            <span class="legend-symbol injured-symbol">✕</span>
            <div>
              <strong>Orange + Red X — Injured liver cell</strong>
              <p>Shows injury that may happen during the immune response to hepatitis B.</p>
            </div>
          </div>

          <div class="legend-item">
            <span class="legend-symbol immune-symbol">+</span>
            <div>
              <strong>Blue — Immune defender</strong>
              <p>An immune cell responding to infection.</p>
            </div>
          </div>

          <div class="legend-item">
            <span class="legend-symbol scar-symbol"></span>
            <div>
              <strong>Yellow bands — Scar tissue</strong>
              <p>May develop after repeated liver injury over time.</p>
            </div>
          </div>

        </div>
      </div>
    `);
  }
}

/* ==========================================
   MISSION 1 — COMPLETE CELL CITY IMPROVEMENT
   Paste at the END of site.js
   ========================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "cells.html") return;

  const diagram = document.querySelector(".clean-cell-visual");
  const partTitle = document.getElementById("part-title");
  const partDesc = document.getElementById("part-desc");
  const partFact = document.getElementById("part-fact");
  const buttonArea = document.getElementById("cell-parts");

  if (!diagram || !partTitle || !partDesc || !buttonArea) return;

  // Bigger text and improved appearance.
  const style = document.createElement("style");
  style.textContent = `
    .clean-cell-visual {
      background: linear-gradient(135deg,#fff0fa,#e7faff);
      border: 3px solid #dab7f6;
      border-radius: 26px;
      padding: 16px;
    }

    .clean-cell-visual svg {
      width: 100%;
      display: block;
      height: auto;
    }

    .info-panel #part-title {
      font-size: 2rem;
      color: #7045bd;
      line-height: 1.3;
    }

    .info-panel #part-desc {
      font-size: 1.2rem;
      line-height: 1.8;
      color: #454b65;
    }

    .info-panel #part-fact {
      font-size: 1.12rem;
      line-height: 1.7;
      background: #fff2d9;
      border-left: 6px solid #ffac4c;
      border-radius: 16px;
      padding: 22px;
    }

    .cell-choices button {
      font-size: 1.05rem;
      padding: 16px 12px;
      font-weight: 800;
    }

    .cell-choices button.selected {
      background: #d8fae8;
      border-color: #36b884;
      box-shadow: 0 0 0 3px #a3efca;
    }
  `;
  document.head.appendChild(style);

  // Perfect circular cell with all organelles inside.
  diagram.innerHTML = `
    <svg viewBox="0 0 600 480"
         role="img"
         aria-label="Interactive circular liver cell with eight cell parts">

      <defs>
        <radialGradient id="newCellPink">
          <stop offset="0%" stop-color="#ffe8f3"/>
          <stop offset="100%" stop-color="#f8a8cd"/>
        </radialGradient>
      </defs>

      <!-- Circular cell membrane -->
      <circle cx="300" cy="240" r="205"
              fill="url(#newCellPink)"
              stroke="#e86eab"
              stroke-width="10"/>

      <circle cx="300" cy="240" r="193"
              fill="none"
              stroke="#fff3b8"
              stroke-width="5"/>

      <!-- Endoplasmic reticulum -->
      <g fill="none" stroke="#8d7bd9"
         stroke-width="10" stroke-linecap="round">
        <path d="M225 163 Q155 141 159 184 Q168 208 224 201"/>
        <path d="M218 219 Q145 210 160 249 Q178 273 228 257"/>
        <path d="M225 278 Q173 272 185 309 Q202 327 241 305"/>
      </g>

      <!-- Ribosomes -->
      <g fill="#713da8">
        <circle cx="173" cy="168" r="5"/>
        <circle cx="189" cy="183" r="5"/>
        <circle cx="162" cy="232" r="5"/>
        <circle cx="184" cy="267" r="5"/>
        <circle cx="213" cy="300" r="5"/>
        <circle cx="366" cy="110" r="5"/>
        <circle cx="452" cy="254" r="5"/>
      </g>

      <!-- Nucleus -->
      <circle cx="300" cy="228" r="78"
              fill="#b98de9"
              stroke="#783ab5"
              stroke-width="7"/>

      <circle cx="300" cy="228" r="19"
              fill="#69359b"/>

      <!-- Simple DNA shapes -->
      <g stroke="#eddcff" fill="none" stroke-width="4">
        <path d="M275 181 Q330 226 278 273"/>
        <path d="M325 181 Q271 226 326 273"/>
        <path d="M282 193 L318 193"/>
        <path d="M281 258 L320 258"/>
      </g>

      <!-- Mitochondria -->
      <g fill="#ffbf70" stroke="#d27b38"
         stroke-width="5">
        <ellipse cx="414" cy="320" rx="42" ry="24"
                 transform="rotate(-25 414 320)"/>
        <ellipse cx="208" cy="341" rx="39" ry="22"
                 transform="rotate(20 208 341)"/>
        <ellipse cx="410" cy="145" rx="37" ry="22"/>
      </g>

      <!-- Inner folds -->
      <g stroke="#b66b31" stroke-width="3" fill="none">
        <path d="M386 319 l11 -12 10 18 12 -15 12 13"/>
        <path d="M182 341 l9 -11 11 15 9 -11 12 12"/>
        <path d="M386 144 l9 -11 11 15 10 -12 12 12"/>
      </g>

      <!-- Golgi apparatus -->
      <g fill="none" stroke="#3bbfab"
         stroke-width="9" stroke-linecap="round">
        <path d="M331 359 Q370 381 408 355"/>
        <path d="M340 375 Q372 392 400 373"/>
        <path d="M349 389 Q375 400 392 389"/>
      </g>

      <!-- Small transport vesicles -->
      <g fill="#4cd8c4" stroke="#289c90"
         stroke-width="2">
        <circle cx="424" cy="381" r="7"/>
        <circle cx="319" cy="382" r="6"/>
      </g>

      <!-- Lysosomes -->
      <g fill="#f9dc6c" stroke="#d5a33d" stroke-width="4">
        <circle cx="449" cy="220" r="18"/>
        <circle cx="265" cy="385" r="15"/>
      </g>

      <!-- Interactive pointer -->
      <circle id="organ-ring"
              cx="300" cy="228" r="84"
              fill="none"
              stroke="#12bc85"
              stroke-width="7"
              visibility="hidden"/>

      <path id="organ-pointer"
            fill="none"
            stroke="#6743bd"
            stroke-width="5"
            stroke-linecap="round"
            visibility="hidden"/>

      <rect id="organ-tag-bg"
            x="315" y="5"
            width="265" height="44"
            rx="14"
            fill="white"
            stroke="#8b61e8"
            stroke-width="3"
            visibility="hidden"/>

      <text id="organ-tag"
            x="448" y="34"
            text-anchor="middle"
            font-size="21"
            font-weight="bold"
            fill="#6540bb">
      </text>
    </svg>
  `;

  // Longer, Grade 7/8-friendly explanations.
  const parts = [
    {
      id: "nucleus",
      name: "🧠 Nucleus",
      desc:
        "The nucleus is like the control centre of the cell. " +
        "It stores important instructions that help the cell " +
        "grow, work, and make the materials it needs. " +
        "Imagine a school office that keeps important " +
        "instructions and helps everything run smoothly.",
      fact:
        "Hepatitis B brings its own instructions into " +
        "the nucleus. This helps the virus make more " +
        "copies of itself using the liver cell.",
      x: 300, y: 228, r: 85
    },
    {
      id: "membrane",
      name: "🛡️ Cell Membrane",
      desc:
        "The cell membrane is the thin outer layer " +
        "that surrounds the cell. It works like a " +
        "security gate, helping control which materials " +
        "enter and leave. It also helps keep everything " +
        "inside the cell together and protected.",
      fact:
        "Hepatitis B attaches to a special doorway " +
        "on the liver cell's surface before entering.",
      x: 300, y: 240, r: 205
    },
    {
      id: "mitochondria",
      name: "⚡ Mitochondria",
      desc:
        "Mitochondria are the power stations of the cell. " +
        "They help turn energy from food into energy " +
        "the cell can use. Think of them like a battery " +
        "that helps power important activities. " +
        "Your liver cells need energy throughout the day.",
      fact:
        "Liver cells use energy to process nutrients " +
        "and perform their many important jobs.",
      x: 414, y: 320, r: 42
    },
    {
      id: "cytoplasm",
      name: "🫧 Cytoplasm",
      desc:
        "Cytoplasm is the jelly-like material that " +
        "fills much of the cell. It surrounds the " +
        "organelles and helps keep them in place. " +
        "Imagine pieces of fruit floating in jelly. " +
        "Many important activities happen here.",
      fact:
        "Some steps involved in making new hepatitis B " +
        "virus particles happen inside the cell.",
      x: 357, y: 320, r: 27
    },
    {
      id: "ribosomes",
      name: "🏭 Ribosomes",
      desc:
        "Ribosomes are tiny protein factories. " +
        "They build proteins, which help cells " +
        "grow, repair themselves, and do their jobs. " +
        "Imagine factory workers following instructions " +
        "to make useful products.",
      fact:
        "Hepatitis B uses the cell's ribosomes " +
        "to help make parts for new viruses.",
      x: 181, y: 220, r: 36
    },
    {
      id: "er",
      name: "🛤️ Endoplasmic Reticulum",
      desc:
        "The endoplasmic reticulum, or ER, is a " +
        "network of tiny passages inside the cell. " +
        "It helps make and prepare important materials. " +
        "Think of it like a factory with different " +
        "work areas connected by passageways.",
      fact:
        "Some proteins used by hepatitis B " +
        "are prepared in this part of the cell.",
      x: 199, y: 243, r: 52
    },
    {
      id: "golgi",
      name: "📦 Golgi Apparatus",
      desc:
        "The Golgi apparatus is the cell's " +
        "packaging and delivery centre. " +
        "It receives materials, prepares them, " +
        "and sends them to where they are needed. " +
        "Imagine a post office sorting packages " +
        "for delivery.",
      fact:
        "The Golgi helps liver cells organize " +
        "and deliver important materials.",
      x: 373, y: 376, r: 36
    },
    {
      id: "lysosomes",
      name: "♻️ Lysosomes",
      desc:
        "Lysosomes are the cell's cleaning and " +
        "recycling centres. They break down " +
        "old or unwanted materials so the cell " +
        "can stay organized and healthy. " +
        "Imagine a recycling team working inside " +
        "a busy city.",
      fact:
        "Recycling damaged materials helps " +
        "liver cells maintain a healthy environment.",
      x: 449, y: 220, r: 25
    }
  ];

  // Rebuild the same eight buttons.
  buttonArea.innerHTML = parts.map((part, index) => `
    <button data-new-cell="${part.id}">
      ${index + 1}. ${part.name}
    </button>
  `).join("");

  const discovered = new Set();

  document.querySelectorAll("[data-new-cell]").forEach(button => {
    button.addEventListener("click", () => {
      const part = parts.find(p => p.id === button.dataset.newCell);
      if (!part) return;

      discovered.add(part.id);

      document.querySelectorAll("[data-new-cell]").forEach(b => {
        b.classList.toggle("selected", b === button);
      });

      partTitle.textContent = part.name;
      partDesc.textContent = part.desc;

      if (partFact) {
        partFact.textContent = "🦠 " + part.fact;
      }

      const count = document.getElementById("discovery");
      if (count) {
        count.textContent =
          `${discovered.size} of 8 parts discovered`;
      }

      const ring = document.getElementById("organ-ring");
      ring.setAttribute("cx", part.x);
      ring.setAttribute("cy", part.y);
      ring.setAttribute("r", part.r);
      ring.setAttribute("visibility", "visible");

      const pointer = document.getElementById("organ-pointer");
      pointer.setAttribute(
        "d", `M${part.x} ${part.y - part.r} L448 49`
      );
      pointer.setAttribute("visibility", "visible");

      document.getElementById("organ-tag-bg")
        .setAttribute("visibility", "visible");

      document.getElementById("organ-tag").textContent =
        part.name.replace(/^\S+\s/, "");
    });
  });
})();
