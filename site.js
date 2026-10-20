
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

/* ==================================================
   LIVERQUEST — MISSION 1 CELL CITY UPGRADE
   Paste once at the VERY END of site.js

   Adds:
   1. Dr. Binocs video at the top
   2. Cell City worker/building analogies
   3. Expanded Grade 7/8 explanations
   4. A six-question diagram identification quiz
   ================================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "cells.html") return;

  const explorer = document.querySelector(".clean-cell-visual");
  const buttons = document.getElementById("cell-parts");
  const title = document.getElementById("part-title");
  const description = document.getElementById("part-desc");
  const fact = document.getElementById("part-fact");
  const challenge = document.querySelector(".challenge");

  if (!explorer || !buttons || !title || !description || !challenge) {
    console.warn("Mission 1 explorer was not found.");
    return;
  }

  /* --------------------------------------------
     1. STYLING
     -------------------------------------------- */

  const css = document.createElement("style");

  css.textContent = `
    .city-video-section {
      background: linear-gradient(135deg, #f9edff, #e6f8ff);
      border: 3px solid #d8baf5;
      border-radius: 28px;
      padding: 26px;
      margin-bottom: 30px;
    }

    .city-video-section h2 {
      color: #6840b1;
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      margin: 0 0 12px;
    }

    .city-video-section p {
      color: #4c5068;
      font-size: 1.15rem;
      line-height: 1.7;
    }

    .city-video-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #222;
      overflow: hidden;
      border-radius: 20px;
      margin: 18px auto;
      max-width: 850px;
    }

    .city-video-wrapper iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .city-video-note {
      background: #fff5d8;
      border-radius: 15px;
      padding: 16px 20px;
      margin-top: 15px;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .city-video-note a {
      color: #6840b1;
      font-weight: 800;
    }

    .city-guide {
      background: #f4edff;
      border-radius: 18px;
      padding: 20px;
      margin: 18px 0;
      border: 2px solid #d8c3f8;
    }

    .city-guide h3 {
      font-size: 1.55rem;
      color: #6036b0;
      margin: 0 0 10px;
    }

    .city-guide p {
      font-size: 1.13rem;
      line-height: 1.8;
      margin: 10px 0;
      color: #45415f;
    }

    .city-guide .city-example {
      background: #ffffff;
      border-left: 6px solid #8d6be0;
      padding: 14px;
      border-radius: 12px;
      font-weight: 700;
    }

    .cell-choices button {
      font-size: 1.05rem;
      line-height: 1.5;
      min-height: 66px;
    }

    .cell-choices button.selected {
      background: #d8fbe8;
      border: 3px solid #27aa76;
    }

    .point-quiz {
      background: linear-gradient(135deg, #fff1f8, #e7faff);
      border: 3px solid #d7baf6;
      border-radius: 26px;
      padding: 25px;
      margin-top: 28px;
    }

    .point-quiz h2 {
      color: #6941b5;
      font-size: 1.85rem;
      margin: 0 0 12px;
    }

    .point-quiz p {
      font-size: 1.12rem;
      line-height: 1.65;
    }

    .point-quiz-image {
      background: #ffffff;
      border: 2px solid #e0c8f7;
      border-radius: 20px;
      max-width: 650px;
      margin: 18px auto;
      overflow: hidden;
    }

    .point-quiz-image svg {
      display: block;
      width: 100%;
      height: auto;
    }

    .point-quiz-answers {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin: 18px 0;
    }

    .point-quiz-answers button {
      border: 2px solid #b79ae8;
      border-radius: 15px;
      background: #ffffff;
      color: #54378f;
      padding: 16px;
      min-height: 65px;
      font-size: 1.07rem;
      font-weight: 800;
      cursor: pointer;
    }

    .point-quiz-answers button:hover:not(:disabled) {
      background: #f0e6ff;
    }

    .point-quiz-answers button.correct {
      border-color: #26a575;
      background: #d5f9e7;
    }

    .point-quiz-answers button.incorrect {
      border-color: #da6d76;
      background: #ffe1e4;
    }

    .point-quiz-feedback {
      background: #fff7df;
      border-radius: 14px;
      padding: 15px;
      margin: 15px 0;
      font-size: 1.1rem;
      min-height: 55px;
    }

    .point-quiz-progress {
      font-weight: 800;
      color: #6740b4;
    }

    .point-quiz-next {
      background: #7650c5;
      color: white;
      font-size: 1.1rem;
      font-weight: 800;
      border: 0;
      border-radius: 15px;
      padding: 15px 26px;
      cursor: pointer;
    }

    .point-quiz-next:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 650px) {
      .city-video-section,
      .point-quiz {
        padding: 17px;
      }

      .point-quiz-answers {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.appendChild(css);

  /* --------------------------------------------
     2. VIDEO AT THE TOP OF MISSION 1
     -------------------------------------------- */

  if (!document.getElementById("cell-city-video")) {
    const video = document.createElement("section");
    video.id = "cell-city-video";
    video.className = "city-video-section";

    video.innerHTML = `
      <span class="pill">🎬 WATCH FIRST!</span>

      <h2>Welcome to Cell City!</h2>

      <p>
        Imagine that your liver cell is a busy city.
        Just like a city needs workers, roads,
        power stations, and a mayor, your cells
        need different parts working together.
      </p>

      <p>
        Watch Dr. Binocs explore the human cell.
        Pay attention to what each part does.
        You'll become a Cell City detective afterward!
      </p>

      <div class="city-video-wrapper">
        <iframe
          src="https://www.youtube-nocookie.com/embed/8vo59AKzU4Q"
          title="Human Cell — The Dr. Binocs Show"
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      </div>

      <div class="city-video-note">
        💡 <strong>While watching:</strong>
        Can you discover which part makes energy,
        which part builds proteins, and which part
        controls the cell?

        <p style="margin:8px 0 0">
          If the player is blocked,
          <a
            href="https://www.youtube.com/watch?v=8vo59AKzU4Q"
            target="_blank"
            rel="noopener">
            open the video here
          </a>.
          School network permission may still be required.
        </p>
      </div>
    `;

    const firstSection = explorer.closest("section");
    if (firstSection) firstSection.before(video);
  }

  /* --------------------------------------------
     3. CITY WORKER ANALOGIES
     -------------------------------------------- */

  const cityParts = [
    {
      id: "nucleus",
      name: "🧠 Nucleus",
      city: "🏛️ City Hall — The Mayor",
      explanation:
        "Every city needs someone to help organize what happens. " +
        "The nucleus is like City Hall. It holds important instructions " +
        "that guide how the cell grows, works, and makes the things it needs.",
      analogy:
        "The mayor helps organize a city. The nucleus helps direct the cell.",
      hepatitis:
        "Hepatitis B sends its own instructions into the nucleus " +
        "so it can make more viruses.",
      x: 300, y: 228, r: 85
    },
    {
      id: "membrane",
      name: "🛡️ Cell Membrane",
      city: "🚪 City Gates — Security Guards",
      explanation:
        "Imagine a city surrounded by gates with security guards. " +
        "The cell membrane forms the outside boundary of the cell. " +
        "It helps control what comes in and what goes out, including " +
        "materials the cell needs and waste it wants to remove.",
      analogy:
        "Security guards check what enters and leaves a city. " +
        "The membrane controls what enters and leaves a cell.",
      hepatitis:
        "Hepatitis B can attach to a special doorway on a liver cell.",
      x: 300, y: 240, r: 205
    },
    {
      id: "mitochondria",
      name: "⚡ Mitochondria",
      city: "🏭 Power Stations — Energy Workers",
      explanation:
        "Cities need electricity to keep their buildings running. " +
        "Mitochondria are like little power stations inside the cell. " +
        "They help release useful energy from food so the cell " +
        "can stay active and carry out its jobs.",
      analogy:
        "A power station provides energy for a city. " +
        "Mitochondria help provide energy for the cell.",
      hepatitis:
        "Liver cells need energy to process nutrients and support the body.",
      x: 414, y: 320, r: 42
    },
    {
      id: "cytoplasm",
      name: "🫧 Cytoplasm",
      city: "🏙️ City Space — The Neighbourhood",
      explanation:
        "A city needs space for its buildings, roads, and workers. " +
        "Cytoplasm is the jelly-like material filling much of the cell. " +
        "The other cell parts sit inside it, and many useful " +
        "activities happen there every day.",
      analogy:
        "The city neighbourhood holds buildings and workers. " +
        "Cytoplasm surrounds and supports the organelles.",
      hepatitis:
        "Some steps in making new hepatitis B viruses happen " +
        "inside the infected cell.",
      x: 357, y: 320, r: 27
    },
    {
      id: "ribosomes",
      name: "🏗️ Ribosomes",
      city: "🏗️ Construction Workers — The Builders",
      explanation:
        "A growing city needs builders to make useful structures. " +
        "Ribosomes are tiny builders inside a cell. " +
        "They make proteins, which help cells grow, repair damage, " +
        "and do their important jobs.",
      analogy:
        "Construction workers build things a city needs. " +
        "Ribosomes build proteins the cell needs.",
      hepatitis:
        "Hepatitis B uses the cell's ribosomes to help build virus parts.",
      x: 181, y: 220, r: 36
    },
    {
      id: "er",
      name: "🛣️ Endoplasmic Reticulum (ER)",
      city: "🛣️ Highways — Transport Routes",
      explanation:
        "Think about highways connecting places around a city. " +
        "The endoplasmic reticulum, or ER, is a network of passages " +
        "inside the cell. It helps make and process materials " +
        "and helps move some of them through its network.",
      analogy:
        "Highways help transport things around a city. " +
        "The ER helps make, process, and move materials in the cell.",
      hepatitis:
        "Some materials used to form hepatitis B virus particles " +
        "are prepared in the ER.",
      x: 199, y: 243, r: 52
    },
    {
      id: "golgi",
      name: "📦 Golgi Apparatus",
      city: "📮 Post Office — Package Sorters",
      explanation:
        "When packages arrive at a post office, workers sort " +
        "and prepare them for delivery. " +
        "The Golgi apparatus works in a similar way. " +
        "It receives materials, makes changes when needed, " +
        "and sends them to the right places.",
      analogy:
        "The post office sorts and delivers packages. " +
        "The Golgi sorts and sends materials around the cell.",
      hepatitis:
        "The Golgi helps the liver cell organize and deliver " +
        "important materials.",
      x: 373, y: 376, r: 36
    },
    {
      id: "lysosomes",
      name: "♻️ Lysosomes",
      city: "♻️ Recycling Centre — Cleaning Workers",
      explanation:
        "A city produces waste and needs people to clean it up. " +
        "Lysosomes are like recycling centres inside the cell. " +
        "They break down old, damaged, or unwanted materials, " +
        "helping keep the cell tidy and working properly.",
      analogy:
        "Recycling workers break down unwanted materials. " +
        "Lysosomes help break down and recycle materials in cells.",
      hepatitis:
        "Cleaning and recycling help liver cells stay healthy.",
      x: 449, y: 220, r: 25
    }
  ];

  /* --------------------------------------------
     4. REFRESH THE INTERACTIVE CELL BUTTONS
     -------------------------------------------- */

  buttons.innerHTML = cityParts.map((p, i) => `
    <button data-city-part="${p.id}">
      ${i + 1}. ${p.name}
    </button>
  `).join("");

  let cityGuide = document.getElementById("city-worker-guide");

  if (!cityGuide) {
    cityGuide = document.createElement("div");
    cityGuide.id = "city-worker-guide";
    cityGuide.className = "city-guide";

    cityGuide.innerHTML = `
      <h3>🏙️ Who Works in Cell City?</h3>
      <p>
        Choose a cell part to meet its city worker
        and find out what job it does.
      </p>
    `;

    description.insertAdjacentElement("afterend", cityGuide);
  }

  const found = new Set();

  buttons.querySelectorAll("[data-city-part]").forEach(button => {
    button.addEventListener("click", () => {
      const part = cityParts.find(
        p => p.id === button.dataset.cityPart
      );

      if (!part) return;
      found.add(part.id);

      buttons.querySelectorAll("button").forEach(b => {
        b.classList.toggle("selected", b === button);
      });

      title.textContent = part.name;
      description.textContent = part.explanation;

      cityGuide.innerHTML = `
        <h3>${part.city}</h3>
        <p class="city-example">
          💡 ${part.analogy}
        </p>
      `;

      if (fact) {
        fact.textContent = "🦠 Hepatitis B Connection: " + part.hepatitis;
      }

      const count = document.getElementById("discovery");
      if (count) {
        count.textContent = `${found.size} of 8 parts explored`;
      }

      // Highlight the selected part in the existing SVG.
      const ring = explorer.querySelector("#organ-ring");
      const pointer = explorer.querySelector("#organ-pointer");
      const tagBackground = explorer.querySelector("#organ-tag-bg");
      const tag = explorer.querySelector("#organ-tag");

      if (ring) {
        ring.setAttribute("cx", part.x);
        ring.setAttribute("cy", part.y);
        ring.setAttribute("r", part.r);
        ring.setAttribute("visibility", "visible");
      }

      if (pointer) {
        pointer.setAttribute(
          "d",
          `M${part.x} ${part.y - part.r} L448 49`
        );
        pointer.setAttribute("visibility", "visible");
      }

      if (tagBackground) {
        tagBackground.setAttribute("visibility", "visible");
      }

      if (tag) {
        tag.textContent = part.name
          .replace(/^[^\w]+/, "");
      }
    });
  });

  /* --------------------------------------------
     5. NAME THE ORGANELLE — DIAGRAM QUIZ
     -------------------------------------------- */

  if (document.getElementById("cell-point-quiz")) return;

  const quiz = document.createElement("section");
  quiz.id = "cell-point-quiz";
  quiz.className = "point-quiz";

  quiz.innerHTML = `
    <span class="pill">🔎 CELL DETECTIVE CHALLENGE</span>

    <h2>🎯 Can You Name That Cell Part?</h2>

    <p>
      You've explored the city and matched its workers
      to their jobs. Now it's time for a real detective test!
    </p>

    <p>
      Look at the cell diagram below. A green circle
      will highlight one structure.
      <strong>Can you identify it?</strong>
    </p>

    <div class="point-quiz-progress" id="point-quiz-progress">
      QUESTION 1 / 6
    </div>

    <div class="point-quiz-image" id="point-quiz-image"></div>

    <h3 id="point-quiz-question">
      Which part of the cell is highlighted?
    </h3>

    <div class="point-quiz-answers" id="point-quiz-answers"></div>

    <p class="point-quiz-feedback"
       id="point-quiz-feedback"
       role="status">
      🔎 Look carefully at the green circle.
    </p>

    <button class="point-quiz-next"
            id="point-quiz-next"
            disabled>
      NEXT QUESTION →
    </button>
  `;

  challenge.insertAdjacentElement("afterend", quiz);

  // Six questions, with the four most important
  // curriculum organelles included.
  const quizParts = [
    "nucleus",
    "mitochondria",
    "membrane",
    "golgi",
    "lysosomes",
    "er"
  ];

  let questionNumber = 0;
  let quizScore = 0;
  let answered = false;

  const imageArea = document.getElementById("point-quiz-image");
  const answersArea = document.getElementById("point-quiz-answers");
  const feedback = document.getElementById("point-quiz-feedback");
  const next = document.getElementById("point-quiz-next");

  function drawQuizPicture(part) {
    const originalSVG = explorer.querySelector("svg");
    if (!originalSVG) {
      imageArea.textContent = "Cell diagram unavailable.";
      return;
    }

    // Copy the current cell illustration.
    const copy = originalSVG.cloneNode(true);

    // Remove duplicate IDs so the main explorer
    // and the quiz remain independent.
    copy.querySelectorAll("[id]").forEach(el => {
      el.removeAttribute("id");
    });

    // Hide the original explorer pointer and labels.
    const all = copy.querySelectorAll(
      '[visibility="visible"], [visibility="hidden"]'
    );

    all.forEach(el => {
      if (
        el.tagName.toLowerCase() === "circle" ||
        el.tagName.toLowerCase() === "path" ||
        el.tagName.toLowerCase() === "rect" ||
        el.tagName.toLowerCase() === "text"
      ) {
        if (el.hasAttribute("visibility")) {
          el.remove();
        }
      }
    });

    // Draw a new green pointer on the quiz picture.
    const ns = "http://www.w3.org/2000/svg";

    const ring = document.createElementNS(ns, "circle");
    ring.setAttribute("cx", part.x);
    ring.setAttribute("cy", part.y);
    ring.setAttribute("r", part.r);
    ring.setAttribute("fill", "none");
    ring.setAttribute("stroke", "#13b980");
    ring.setAttribute("stroke-width", "7");
    ring.setAttribute("stroke-dasharray", "13 7");

    const pointer = document.createElementNS(ns, "path");
    pointer.setAttribute(
      "d",
      `M${part.x} ${part.y - part.r} L490 55`
    );
    pointer.setAttribute("fill", "none");
    pointer.setAttribute("stroke", "#6540bf");
    pointer.setAttribute("stroke-width", "5");
    pointer.setAttribute("stroke-linecap", "round");

    const tag = document.createElementNS(ns, "rect");
    tag.setAttribute("x", "470");
    tag.setAttribute("y", "18");
    tag.setAttribute("width", "92");
    tag.setAttribute("height", "45");
    tag.setAttribute("rx", "15");
    tag.setAttribute("fill", "#ffffff");
    tag.setAttribute("stroke", "#6540bf");
    tag.setAttribute("stroke-width", "3");

    const question = document.createElementNS(ns, "text");
    question.setAttribute("x", "516");
    question.setAttribute("y", "49");
    question.setAttribute("text-anchor", "middle");
    question.setAttribute("font-size", "30");
    question.setAttribute("font-weight", "bold");
    question.setAttribute("fill", "#6540bf");
    question.textContent = "?";

    copy.append(ring, pointer, tag, question);

    imageArea.replaceChildren(copy);
  }

  function showQuestion() {
    if (questionNumber >= quizParts.length) {
      document.getElementById("point-quiz-progress")
        .textContent = "CHALLENGE COMPLETE!";

      imageArea.innerHTML = `
        <div style="text-align:center;padding:45px">
          <div style="font-size:80px">🏆</div>
          <h2>Cell City Detective!</h2>
          <p>
            You correctly identified ${quizScore}
            out of ${quizParts.length} cell parts!
          </p>
        </div>
      `;

      document.getElementById("point-quiz-question")
        .textContent = "Amazing work investigating Cell City!";

      answersArea.innerHTML = "";

      feedback.textContent =
        "You've learned how cell structures work together to keep a liver cell alive.";

      next.disabled = false;
      next.textContent = "TRY THE QUIZ AGAIN ↺";
      return;
    }

    answered = false;

    const id = quizParts[questionNumber];
    const correctPart = cityParts.find(p => p.id === id);

    document.getElementById("point-quiz-progress")
      .textContent =
        `QUESTION ${questionNumber + 1} / ${quizParts.length}`;

    document.getElementById("point-quiz-question")
      .textContent = "Which cell part is highlighted in green?";

    drawQuizPicture(correctPart);

    // Create four different answer choices.
    const wrongChoices = cityParts.filter(p => p.id !== id);

    // Rotate the distractors so questions differ.
    const offset = questionNumber % wrongChoices.length;
    const rotated = wrongChoices
      .slice(offset)
      .concat(wrongChoices.slice(0, offset));

    const choices = [
      correctPart,
      ...rotated.slice(0, 3)
    ];

    // Change the answer position each question.
    const correctPosition = questionNumber % 4;
    choices.splice(0, 1);
    choices.splice(correctPosition, 0, correctPart);

    answersArea.innerHTML = choices.map(p => `
      <button data-quiz-part="${p.id}">
        ${p.name}
      </button>
    `).join("");

    feedback.textContent =
      "🔎 Look at the green circle and choose the organelle.";

    next.disabled = true;
    next.textContent =
      questionNumber === quizParts.length - 1
        ? "SEE MY SCORE →"
        : "NEXT QUESTION →";

    answersArea.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        if (answered) return;
        answered = true;

        const good = button.dataset.quizPart === id;

        if (good) quizScore++;

        answersArea.querySelectorAll("button").forEach(b => {
          b.disabled = true;

          if (b.dataset.quizPart === id) {
            b.classList.add("correct");
          } else if (b === button) {
            b.classList.add("incorrect");
          }
        });

        feedback.textContent = good
          ? `✅ Correct! ${correctPart.city}. ${correctPart.analogy}`
          : `💡 The correct answer is ${correctPart.name}. ${correctPart.analogy}`;

        next.disabled = false;
      });
    });
  }

  next.addEventListener("click", () => {
    if (questionNumber >= quizParts.length) {
      questionNumber = 0;
      quizScore = 0;
    } else {
      questionNumber++;
    }

    showQuestion();
  });

  showQuestion();
})();

/* REPLACE YOUTUBE VIDEO WITH RECORDED VIDEO */

if (location.pathname.endsWith("cells.html")) {
  const videoBox = document.querySelector(".city-video-wrapper");

  if (videoBox) {
    videoBox.innerHTML = `
      <video
        controls
        playsinline
        preload="metadata"
        style="width:100%;height:100%;background:black;border-radius:18px"
      >
        <source src="cell-city-Video1.mp4" type="video/mp4">
        Your browser does not support this video.
      </video>
    `;
  }
}

/* =====================================================
   LIVERQUEST — IMPROVED MISSIONS 1–5
   Paste ONCE at the very bottom of site.js.
   Keeps your existing video and Mission 1 activities.
   ===================================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";

  // Shared helpers
  const $ = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  function addStyles() {
    if ($("#lq-new-styles")) return;

    const style = document.createElement("style");
    style.id = "lq-new-styles";
    style.textContent = `
      .lq-card {
        background: linear-gradient(135deg,#fff7fc,#effaff);
        border: 2px solid #e2c8f5;
        border-radius: 22px;
        padding: 22px;
        margin: 20px 0;
      }

      .lq-card h3 {
        color: #6842ad;
        font-size: 1.45rem;
        margin: 0 0 12px;
      }

      .lq-card p, .lq-story p {
        color: #45465c;
        font-size: 1.08rem;
        line-height: 1.75;
      }

      .lq-tag {
        display: inline-block;
        padding: 7px 13px;
        background: #e8dcff;
        color: #6540a8;
        font-size: .9rem;
        font-weight: 800;
        border-radius: 999px;
        margin-bottom: 12px;
      }

      .lq-visual {
        background: #f5faff;
        border: 2px solid #e1cafa;
        border-radius: 20px;
        overflow: hidden;
        margin: 16px 0;
      }

      .lq-visual svg {
        display: block;
        width: 100%;
        height: auto;
      }

      .lq-answers {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 12px;
        margin: 18px 0;
      }

      .lq-answers button, .lq-option {
        cursor: pointer;
        border: 2px solid #c8adef;
        border-radius: 15px;
        padding: 15px;
        min-height: 60px;
        background: #fff;
        color: #533a8c;
        font-size: 1.02rem;
        font-weight: 800;
        text-align: left;
      }

      .lq-answers button:hover:not(:disabled),
      .lq-option:hover:not(:disabled) {
        background: #eee4ff;
      }

      .lq-answers button.correct {
        background: #d9f8e9;
        border-color: #36b280;
      }

      .lq-answers button.wrong {
        background: #ffe3e3;
        border-color: #e38383;
      }

      .lq-feedback {
        background: #fff4dc;
        padding: 15px;
        border-radius: 14px;
        color: #55466b;
        line-height: 1.6;
        margin: 15px 0;
        min-height: 54px;
      }

      .lq-next {
        background: #7550c4;
        color: white;
        border: none;
        border-radius: 14px;
        padding: 15px 24px;
        font-size: 1rem;
        font-weight: 800;
        cursor: pointer;
      }

      .lq-next:disabled {
        opacity: .5;
        cursor: not-allowed;
      }

      .lq-story {
        display: grid;
        grid-template-columns: minmax(0,1.1fr) minmax(0,1fr);
        gap: 24px;
        align-items: center;
        margin-top: 20px;
      }

      .lq-story h3 {
        color: #6440aa;
        font-size: 1.5rem;
      }

      .lq-story-art {
        border-radius: 22px;
        padding: 8px;
        background: linear-gradient(135deg,#e8f7ff,#fff0f7);
      }

      .lq-story-art svg {
        display: block;
        width: 100%;
        height: auto;
      }

      .lq-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        margin: 12px 0;
      }

      .lq-chip {
        background: white;
        border: 2px solid #d9c5f5;
        color: #62419e;
        border-radius: 13px;
        padding: 9px 12px;
        font-weight: 750;
      }

      .lq-step-track {
        display: flex;
        gap: 9px;
        margin-bottom: 18px;
      }

      .lq-step-dot {
        flex: 1;
        height: 9px;
        border-radius: 99px;
        background: #e7d7f6;
      }

      .lq-step-dot.active {
        background: #8c62e0;
      }

      .lq-evidence {
        background: #fff;
        border: 2px solid #dac6f2;
        border-radius: 20px;
        padding: 18px;
      }

      .lq-evidence-picture {
        min-height: 170px;
        background: #fff3f8;
        border-radius: 18px;
        padding: 16px;
        display: grid;
        grid-template-columns: repeat(5,1fr);
        gap: 7px;
        margin: 14px 0;
      }

      .lq-mini-cell {
        aspect-ratio: 1;
        background: #f5a9c9;
        border: 2px solid #ce6f9a;
        border-radius: 38%;
        display: grid;
        place-items: center;
        color: #7c39a7;
        font-weight: 900;
      }

      .lq-mini-cell.hurt {
        background: #ffbd80;
        border-color: #eb865b;
        color: #b8324b;
      }

      .lq-mini-cell.immune {
        background: #a3def8;
        border-color: #449bd1;
        border-radius: 50%;
        color: #256aab;
      }

      .lq-mini-cell.scar {
        background: repeating-linear-gradient(
          45deg,#e7b56d 0 7px,#fff1b8 7px 14px
        );
        border-color: #c99e52;
      }

      .lq-highlight {
        font-weight: 850;
        color: #643fbc;
      }

      .lq-lab-explain {
        background: #eff9ff;
        border: 2px solid #b8e0f6;
        border-radius: 16px;
        padding: 17px;
        margin: 14px 0;
        color: #37526d;
        line-height: 1.7;
      }

      .lq-game-heading {
        font-size: 1.7rem;
        color: #613bb1;
      }

      .lq-score {
        font-weight: 850;
        color: #6543a8;
        margin: 12px 0;
      }

      @media(max-width:760px) {
        .lq-story {
          grid-template-columns: 1fr;
        }
        .lq-answers {
          grid-template-columns: 1fr;
        }
        .lq-card {
          padding: 17px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  addStyles();

  /* =================================================
     SHARED SCIENCE ILLUSTRATIONS
     These are teaching models, not actual micrographs.
     ================================================= */

  function virusShape(x, y, scale = 1) {
    return `
      <g transform="translate(${x} ${y}) scale(${scale})">
        <circle r="31" fill="#fac6df"
                stroke="#d365a6" stroke-width="6"/>
        <circle r="15" fill="#9562d9"/>
        <path d="M-9 -4 Q0 -18 9 -4 Q0 9 -9 -4"
              fill="none" stroke="#f2e2ff" stroke-width="3"/>
        ${Array.from({length:10},(_,i)=>{
          const a=i*Math.PI/5;
          const x1=Math.cos(a)*31, y1=Math.sin(a)*31;
          const x2=Math.cos(a)*45, y2=Math.sin(a)*45;
          return `<line x1="${x1}" y1="${y1}"
                        x2="${x2}" y2="${y2}"
                        stroke="#b959a6" stroke-width="5"
                        stroke-linecap="round"/>
                  <circle cx="${x2}" cy="${y2}" r="5"
                          fill="#ed86ba"/>`;
        }).join("")}
      </g>`;
  }

  function cellShape(x, y, radius = 105, infected = false) {
    return `
      <g>
        <circle cx="${x}" cy="${y}" r="${radius}"
                fill="${infected ? "#ffd9b3" : "#ffc9e2"}"
                stroke="${infected ? "#e38d5a" : "#dd79b0"}"
                stroke-width="8"/>
        <circle cx="${x}" cy="${y}" r="${radius*.32}"
                fill="#a97adc" stroke="#794ab5" stroke-width="5"/>
        <circle cx="${x}" cy="${y}" r="${radius*.1}"
                fill="#7640a4"/>
        <ellipse cx="${x-radius*.47}" cy="${y+radius*.4}"
                 rx="${radius*.23}" ry="${radius*.11}"
                 fill="#f6b55f" stroke="#d28238" stroke-width="3"/>
        <ellipse cx="${x+radius*.45}" cy="${y-radius*.3}"
                 rx="${radius*.23}" ry="${radius*.11}"
                 fill="#f6b55f" stroke="#d28238" stroke-width="3"/>
      </g>`;
  }

  function storyImage(step) {
    const arrow = `
      <path d="M230 140 L355 140" stroke="#7549c9"
            stroke-width="9" stroke-linecap="round"/>
      <path d="M338 126 L358 140 L338 154"
            fill="none" stroke="#7549c9"
            stroke-width="9" stroke-linecap="round"/>`;

    const frameStart = `
      <svg viewBox="0 0 600 300" role="img"
           aria-label="Illustrated stage of hepatitis B infection">
        <rect width="600" height="300" rx="25" fill="#f5faff"/>
        <circle cx="60" cy="45" r="23" fill="#e8d9ff"/>
        <circle cx="553" cy="257" r="19" fill="#d7f6f3"/>
    `;

    let content = "";

    switch(step) {
      case 0:
        content = `
          ${virusShape(132,145,1.15)}
          ${arrow}
          ${cellShape(477,146,95)}
          <circle cx="386" cy="146" r="13"
                  fill="#63c6a4" stroke="#299875" stroke-width="4"/>
          <text x="300" y="45" font-size="22" fill="#573ca2"
                text-anchor="middle" font-weight="800">
            Finding the Cell Doorway
          </text>`;
        break;

      case 1:
        content = `
          ${cellShape(300,153,114)}
          ${virusShape(214,145,.55)}
          ${virusShape(322,182,.36)}
          <path d="M222 146 Q255 130 277 147"
                fill="none" stroke="#7549c9"
                stroke-width="7" stroke-dasharray="10 8"/>
          <text x="300" y="37" font-size="22" fill="#573ca2"
                text-anchor="middle" font-weight="800">
            The Virus Enters
          </text>`;
        break;

      case 2:
        content = `
          ${cellShape(300,160,113,true)}
          <path d="M190 154 Q236 92 282 124"
                fill="none" stroke="#744bc1"
                stroke-width="7" stroke-dasharray="9 7"/>
          <rect x="393" y="190" width="76" height="52"
                rx="13" fill="#89dccc" stroke="#2b9d8e" stroke-width="4"/>
          <text x="430" y="223" font-size="20" text-anchor="middle"
                fill="#235e65" font-weight="800">BUILD</text>
          ${virusShape(196,147,.33)}
          <text x="300" y="36" font-size="22" fill="#573ca2"
                text-anchor="middle" font-weight="800">
            Using the Cell's Workers
          </text>`;
        break;

      case 3:
        content = `
          ${cellShape(210,153,103,true)}
          ${virusShape(405,95,.58)}
          ${virusShape(483,173,.55)}
          ${virusShape(380,228,.45)}
          <path d="M310 154 L372 154" stroke="#7549c9"
                stroke-width="7" stroke-dasharray="10 8"/>
          <text x="300" y="36" font-size="22" fill="#573ca2"
                text-anchor="middle" font-weight="800">
            More Virus Particles
          </text>`;
        break;

      case 4:
        content = `
          ${cellShape(305,157,103,true)}
          ${virusShape(302,157,.3)}
          <g>
            <circle cx="100" cy="144" r="58"
                    fill="#b8e4ff" stroke="#4c9bd0"
                    stroke-width="7"/>
            <text x="100" y="155" font-size="23" fill="#25649a"
                  text-anchor="middle" font-weight="800">
              IMMUNE
            </text>
          </g>
          <path d="M165 145 L197 145" stroke="#4b9bd0"
                stroke-width="7" stroke-dasharray="8 7"/>
          <path d="M402 146 L449 105" stroke="#e79946"
                stroke-width="7"/>
          <path d="M404 164 L467 194" stroke="#e79946"
                stroke-width="7"/>
          <text x="300" y="36" font-size="22" fill="#573ca2"
                text-anchor="middle" font-weight="800">
            Immune Defenders Respond
          </text>`;
        break;
    }

    return frameStart + content + "</svg>";
  }

  /* =================================================
     MISSION 1 — HOW HBV AFFECTS THE CELL
     Keeps original video, analogies and games.
     ================================================= */

  if (page === "cells.html") {
    const factBox = $("#part-fact");

    if (factBox && !$("#lq-cell-connection")) {
      const connection = document.createElement("div");
      connection.id = "lq-cell-connection";
      connection.className = "lq-card";

      connection.innerHTML = `
        <span class="lq-tag">🦠 CELL CITY CONNECTION</span>
        <h3>What happens when hepatitis B enters a liver cell?</h3>
        <p>
          Remember that every organelle has a special job.
          A liver cell is like a busy city where everyone
          works together.
        </p>
        <p>
          Hepatitis B is a virus that can enter liver cells.
          It brings instructions that trick some of the
          cell's workers into helping make more viruses.
        </p>
        <p>
          <strong>The nucleus</strong> receives viral instructions.
          <strong>Ribosomes</strong> can be used to make virus proteins,
          and <strong>the ER</strong> helps prepare some of those proteins.
        </p>
        <p>
          This doesn't mean every organelle immediately
          stops working. The cell may still do many of
          its normal jobs. However, the body's immune
          system may recognize infected liver cells and
          respond, which can cause inflammation and injury.
        </p>
      `;

      factBox.insertAdjacentElement("afterend", connection);
    }
  }

  /* =================================================
     MISSION 2 — VIRUS INVASION
     Clear cartoon introduction and interactive story
     ================================================= */

  if (page === "invasion.html") {
    const introPanel = $(".two-col .panel");
    const explanationPanel = $(".two-col .info-panel");
    const story = $(".story-stage");

    // Replace confusing full-size micrograph as main image.
    // Preserve actual scientific image as an optional bonus.
    if (introPanel && !$("#lq-virus-intro")) {
      introPanel.innerHTML = `
        <div id="lq-virus-intro">
          <span class="lq-tag">🦠 MEET THE VIRUS</span>
          <h2>What Does Hepatitis B Look Like?</h2>

          <p>
            Hepatitis B is caused by a tiny virus called HBV.
            It's so small that we need powerful microscopes
            to see it.
          </p>

          <div class="lq-visual">
            <svg viewBox="0 0 600 330" role="img"
                 aria-label="Simple labelled hepatitis B virus model">
              <rect width="600" height="330" rx="25" fill="#f3faff"/>
              ${virusShape(290,160,2.25)}

              <line x1="366" y1="107" x2="425" y2="64"
                    stroke="#6245b0" stroke-width="4"/>
              <rect x="420" y="30" width="160" height="57"
                    rx="14" fill="white" stroke="#af92e6"
                    stroke-width="3"/>
              <text x="500" y="53" text-anchor="middle"
                    font-size="16" fill="#54398e" font-weight="800">
                Outer coating
              </text>
              <text x="500" y="73" text-anchor="middle"
                    font-size="13" fill="#54398e">
                and surface parts
              </text>

              <line x1="258" y1="170" x2="166" y2="244"
                    stroke="#6245b0" stroke-width="4"/>
              <rect x="20" y="240" width="190" height="62"
                    rx="14" fill="white" stroke="#af92e6"
                    stroke-width="3"/>
              <text x="115" y="266" text-anchor="middle"
                    font-size="16" fill="#54398e" font-weight="800">
                Inside the virus
              </text>
              <text x="115" y="287" text-anchor="middle"
                    font-size="13" fill="#54398e">
                are its instructions
              </text>
            </svg>
          </div>

          <p class="caption">
            Simplified drawing of a virus.
            Not to scale or an actual microscope photo.
          </p>

          <div class="lq-card">
            <h3>💡 How Small Is It?</h3>
            <p>
              You cannot see hepatitis B with your eyes.
              Even an ordinary classroom microscope isn't
              powerful enough to clearly show individual
              virus particles.
            </p>
          </div>

          <details>
            <summary style="cursor:pointer;font-weight:800">
              🔬 Bonus: See a real electron microscope photo
            </summary>

            <p>
              Scientists use electron microscopes to
              study things that are too small for
              ordinary microscopes.
              The tiny round shapes in this photo
              include hepatitis B-related particles.
            </p>

            <div class="lq-visual">
              <img
                src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Hepatitis%20B%20virus%2001.jpg"
                alt="Electron microscope photograph of hepatitis B particles"
                loading="lazy"
                style="width:100%;display:block">
            </div>
          </details>
        </div>`;
    }

    if (explanationPanel && !$("#lq-inflammation")) {
      const note = document.createElement("div");
      note.id = "lq-inflammation";
      note.className = "lq-card";
      note.innerHTML = `
        <h3>🔥 What Does Inflammation Mean?</h3>

        <p>
          When you scrape your knee, the area might become
          red, swollen, warm, or sore. That's one example
          of inflammation.
        </p>

        <p>
          <strong>Inflammation is part of your body's
          response to injury or infection.</strong>
          Immune defenders travel to the area and
          try to deal with the problem.
        </p>

        <p>
          When hepatitis B infects liver cells, immune
          defenders may attack those infected cells.
          This can cause inflammation inside the liver.
          Because the liver is inside your body,
          you cannot always see or feel it happening.
        </p>

        <p>
          If inflammation continues for a long time,
          it may injure liver tissue. The good news is
          that vaccines help prevent hepatitis B,
          and medical care can help people who have it.
        </p>
      `;
      explanationPanel.appendChild(note);
    }

    // Replace the emoji-only story, keeping five steps.
    if (story) {
      const storySteps = [
        {
          title: "Step 1: Find the Doorway",
          text:
            "The hepatitis B virus travels through the bloodstream. " +
            "When it reaches a liver cell, it attaches to a special " +
            "doorway on the cell's outer membrane.",
          prompt: "Cell City connection: the membrane acts like a security gate.",
          answers: ["Cell membrane", "Mitochondria"],
          correct: 0,
          feedback: "Correct! The cell membrane controls what enters and leaves."
        },
        {
          title: "Step 2: Enter the Cell",
          text:
            "The virus enters the liver cell and releases its " +
            "instructions. These instructions move toward " +
            "the nucleus, the cell's control centre.",
          prompt: "Which organelle acts like City Hall?",
          answers: ["Lysosome", "Nucleus"],
          correct: 1,
          feedback: "Yes! The nucleus is the cell's control centre."
        },
        {
          title: "Step 3: Use the Cell Workers",
          text:
            "The virus makes use of the liver cell's own workers. " +
            "Ribosomes help make viral proteins, while the ER helps " +
            "prepare some of these materials. " +
            "These are the same cell parts that normally help " +
            "the liver cell do its everyday jobs.",
          prompt: "Which organelles are the protein builders?",
          answers: ["Ribosomes", "Cell membrane"],
          correct: 0,
          feedback: "Exactly! Ribosomes build proteins."
        },
        {
          title: "Step 4: More Viruses Are Made",
          text:
            "New virus particles can be assembled and leave " +
            "the infected liver cell. Some may reach more " +
            "liver cells and repeat the process.",
          prompt: "What is the virus using to make more copies?",
          answers: ["The cell's machinery", "A person's bones"],
          correct: 0,
          feedback: "Right! It uses machinery inside liver cells."
        },
        {
          title: "Step 5: Immune Defenders Respond",
          text:
            "The immune system notices that liver cells are " +
            "infected and responds. Immune defenders can " +
            "attack infected cells, causing inflammation " +
            "and sometimes injury. If this continues, " +
            "scar tissue may develop over time.",
          prompt: "What does inflammation mean here?",
          answers: [
            "The body is responding to infection",
            "The liver has turned into a virus"
          ],
          correct: 0,
          feedback:
            "Correct! Inflammation is part of the body's response to infection."
        }
      ];

      story.classList.add("lq-story");
      story.innerHTML = `
        <div class="lq-story-art">
          <div id="lq-story-illustration"></div>
          <p class="caption">
            Colourful teaching illustrations, not real photographs.
          </p>
        </div>

        <div>
          <div class="lq-step-track" id="lq-story-track"></div>
          <h3 id="lq-story-title"></h3>
          <p id="lq-story-description"></p>

          <div class="lq-card">
            <strong id="lq-story-prompt"></strong>
            <div class="lq-answers" id="lq-story-answers"></div>
            <p id="lq-story-feedback" class="lq-feedback">
              Choose an answer to continue.
            </p>
          </div>

          <button id="lq-story-next" class="lq-next" disabled>
            NEXT STEP →
          </button>
        </div>
      `;

      let stepIndex = 0;

      function renderStoryStep() {
        const item = storySteps[stepIndex];

        $("#lq-story-illustration").innerHTML =
          storyImage(stepIndex);

        $("#lq-story-title").textContent = item.title;
        $("#lq-story-description").textContent = item.text;
        $("#lq-story-prompt").textContent = item.prompt;

        $("#lq-story-track").innerHTML =
          storySteps.map((_,i) => `
            <span class="lq-step-dot ${
              i <= stepIndex ? "active" : ""
            }"></span>
          `).join("");

        const answerArea = $("#lq-story-answers");
        const feedback = $("#lq-story-feedback");
        const next = $("#lq-story-next");

        feedback.textContent = "Choose an answer to continue.";
        next.disabled = true;
        next.textContent =
          stepIndex === 4 ? "FINISH MISSION →" : "NEXT STEP →";

        answerArea.innerHTML = item.answers.map((answer,i) => `
          <button data-story-answer="${i}">${answer}</button>
        `).join("");

        all("[data-story-answer]", answerArea).forEach(button => {
          button.onclick = () => {
            const choice = Number(button.dataset.storyAnswer);
            const correct = choice === item.correct;

            feedback.textContent = correct
              ? "✅ " + item.feedback
              : "💡 Look at the explanation and try again.";

            if (correct) {
              all("button", answerArea).forEach(b => b.disabled = true);
              button.classList.add("correct");
              next.disabled = false;
            } else {
              button.classList.add("wrong");
            }
          };
        });
      }

      $("#lq-story-next").onclick = () => {
        if (stepIndex === 4) {
          nextPage("microscope.html", "invasion");
        } else {
          stepIndex++;
          renderStoryStep();
        }
      };

      renderStoryStep();
    }
  }

  /* =================================================
     MISSION 3 — TISSUE DETECTIVE
     Organized learning and a new spot-the-clue game
     ================================================= */

  if (page === "microscope.html") {
    const comparison = $(".kid-tissue-grid");
    const question = $("#tissue-feedback");

    // Place a learning guide before the tissue comparison.
    if (comparison && !$("#lq-tissue-guide")) {
      const guide = document.createElement("div");
      guide.id = "lq-tissue-guide";
      guide.className = "lq-card";
      guide.innerHTML = `
        <span class="lq-tag">🔬 TISSUE DETECTIVE GUIDE</span>
        <h3>From One Cell to a Whole Liver</h3>

        <p>
          <strong>Cells</strong> are tiny living building blocks.
          Many similar cells work together to form
          <strong>tissues</strong>.
        </p>

        <p>
          Different tissues work together to build
          an <strong>organ</strong>, like the liver.
          The liver helps the digestive system and
          performs other important jobs for the body.
        </p>

        <div class="lq-chips">
          <span class="lq-chip">🧫 Cells</span>
          <span class="lq-chip">→ 🧩 Tissues</span>
          <span class="lq-chip">→ 🫀 Liver organ</span>
          <span class="lq-chip">→ 🧍 Body systems</span>
        </div>

        <p>
          In our activity, pink cells represent
          healthy-looking cells. Orange cells with an X
          represent cells that have been injured.
          Blue circles represent immune defenders.
        </p>
      `;
      comparison.before(guide);
    }

    // Add a new detective game before the existing quiz.
    if (question && !$("#lq-tissue-game")) {
      const game = document.createElement("section");
      game.id = "lq-tissue-game";
      game.className = "lq-card";

      game.innerHTML = `
        <span class="lq-tag">🎮 BONUS DETECTIVE GAME</span>
        <h3>🔎 Spot the Tissue Clue!</h3>

        <p>
          Study each tissue picture. Your job is to
          discover what the picture is teaching you.
          There are four rounds.
        </p>

        <div class="lq-score" id="lq-tissue-progress"></div>

        <div class="lq-evidence">
          <h3 id="lq-tissue-title"></h3>
          <div class="lq-evidence-picture"
               id="lq-tissue-picture"></div>

          <p id="lq-tissue-prompt"></p>

          <div class="lq-answers" id="lq-tissue-answers"></div>

          <div class="lq-feedback" id="lq-tissue-response"
               role="status"></div>

          <button class="lq-next" id="lq-tissue-game-next"
                  disabled>NEXT CLUE →</button>
        </div>
      `;

      const originalQuiz = question.closest(".quiz-mini") ||
        question.previousElementSibling;

      if (originalQuiz && originalQuiz.parentElement) {
        originalQuiz.before(game);
      } else {
        question.before(game);
      }

      const clues = [
        {
          title: "Clue 1: Healthy Tissue",
          types: [],
          question: "What do the purple dots represent?",
          answers: ["Cell nuclei", "Hepatitis B viruses"],
          correct: 0,
          feedback:
            "The purple dots represent nuclei. Most of the illustrated cells are healthy-looking."
        },
        {
          title: "Clue 2: Injured Cells",
          types: [2,7,12,18],
          question: "What do the orange cells with X marks represent?",
          answers: ["Cells getting bigger", "Injured liver cells"],
          correct: 1,
          feedback:
            "The orange X-marked cells represent injury. The X is not the nucleus."
        },
        {
          title: "Clue 3: Immune Defenders",
          types: [1,6,9,15],
          immune: true,
          question: "What might the blue circles represent?",
          answers: ["Immune cells responding to infection", "Bubbles of drinking water"],
          correct: 0,
          feedback:
            "The blue circles represent immune defenders that respond to infected cells."
        },
        {
          title: "Clue 4: Possible Scarring",
          types: [3,8,13,18],
          scar: true,
          question: "What can the yellow-striped areas represent?",
          answers: ["New bones growing", "Scar tissue after repeated injury"],
          correct: 1,
          feedback:
            "Scar tissue can develop after repeated liver injury. Not everyone develops it."
        }
      ];

      let clueIndex = 0;
      let clueScore = 0;

      function showClue() {
        if (clueIndex === clues.length) {
          $("#lq-tissue-progress").textContent = "ALL CLUES SOLVED";
          $("#lq-tissue-title").textContent =
            "🏆 You Are a Tissue Detective!";
          $("#lq-tissue-picture").innerHTML =
            `<div style="grid-column:1/-1;text-align:center;font-size:65px">
              🔬🏆
            </div>`;
          $("#lq-tissue-prompt").textContent =
            `You answered ${clueScore}/4 clues correctly on the first try.`;
          $("#lq-tissue-answers").innerHTML = "";
          $("#lq-tissue-response").textContent =
            "You can now explain how healthy tissue and injured tissue may look different.";
          $("#lq-tissue-game-next").textContent = "PLAY AGAIN ↺";
          $("#lq-tissue-game-next").disabled = false;
          return;
        }

        const clue = clues[clueIndex];
        let chosen = false;

        $("#lq-tissue-progress").textContent =
          `CLUE ${clueIndex+1} OF 4`;

        $("#lq-tissue-title").textContent = clue.title;
        $("#lq-tissue-prompt").textContent = clue.question;
        $("#lq-tissue-response").textContent =
          "Look carefully and choose the best answer.";

        $("#lq-tissue-picture").innerHTML =
          Array.from({length:20},(_,i) => {
            let className = "lq-mini-cell";
            let symbol = "●";

            if (clue.types.includes(i)) {
              className += " hurt";
              symbol = "✕";
            }

            if (clue.immune && [4,14].includes(i)) {
              className = "lq-mini-cell immune";
              symbol = "+";
            }

            if (clue.scar && [5,10,15].includes(i)) {
              className = "lq-mini-cell scar";
              symbol = "";
            }

            return `<span class="${className}">${symbol}</span>`;
          }).join("");

        const answers = $("#lq-tissue-answers");
        const next = $("#lq-tissue-game-next");

        next.disabled = true;
        next.textContent = "NEXT CLUE →";

        answers.innerHTML = clue.answers.map((a,i) =>
          `<button data-clue="${i}">${a}</button>`
        ).join("");

        all("[data-clue]", answers).forEach(button => {
          button.onclick = () => {
            const correct = Number(button.dataset.clue) === clue.correct;

            if (correct) {
              if (!chosen) clueScore++;
              $("#lq-tissue-response").textContent =
                "✅ " + clue.feedback;

              all("button", answers).forEach(b => b.disabled = true);
              button.classList.add("correct");
              next.disabled = false;
            } else {
              chosen = true;
              button.classList.add("wrong");
              $("#lq-tissue-response").textContent =
                "Not quite. Check the legend and try again.";
            }
          };
        });
      }

      $("#lq-tissue-game-next").onclick = () => {
        if (clueIndex === clues.length) {
          clueIndex = 0;
          clueScore = 0;
        } else {
          clueIndex++;
        }
        showClue();
      };

      showClue();
    }
  }

  /* =================================================
     MISSION 4 — RESCUE LAB
     More explanations for slider and prevention activity
     ================================================= */

  if (page === "lab.html") {
    const slider = $("#damage");
    const firstPanel = slider ? slider.closest(".panel") : null;
    const mythPanel = $("#myth-cards")?.closest(".panel");

    if (firstPanel && !$("#lq-lab-guide")) {
      const guide = document.createElement("div");
      guide.id = "lq-lab-guide";
      guide.className = "lq-lab-explain";

      guide.innerHTML = `
        <strong>🧪 What Are We Testing?</strong>
        <p>
          We're exploring how repeated liver injury
          might affect tissue over time.
          Moving the slider does not make
          real injuries happen. It simply shows
          possible changes using an educational model.
        </p>
      `;

      slider.before(guide);

      const detail = document.createElement("div");
      detail.id = "lq-lab-stage-detail";
      detail.className = "lq-lab-explain";
      $("#damage-caption")?.insertAdjacentElement("afterend", detail);

      const stages = [
        {
          title: "😊 Healthy-looking tissue",
          explanation:
            "Liver cells can work together to process nutrients, " +
            "make bile, and help clean the blood. " +
            "The pink cell model represents many cells doing their usual jobs."
        },
        {
          title: "🛡️ Immune response",
          explanation:
            "When the immune system recognizes infected liver cells, " +
            "it responds to the infection. This can cause inflammation, " +
            "which means the body's defenses are active in that area. " +
            "Some liver cells can be injured during this response."
        },
        {
          title: "🩹 Repeated injury",
          explanation:
            "If liver injury continues over a long time, " +
            "the liver may start forming scar tissue. " +
            "This is called fibrosis. Scar tissue doesn't " +
            "perform all the jobs that healthy liver cells do."
        },
        {
          title: "⚠️ Extensive scarring",
          explanation:
            "In some people, severe long-term scarring can " +
            "develop. This is called cirrhosis. It may make " +
            "the liver less able to work normally. " +
            "This does not happen to everyone with hepatitis B, " +
            "and medical care can reduce risks."
        }
      ];

      function explainSlider() {
        const n = Number(slider.value);
        detail.innerHTML = `
          <strong>${stages[n].title}</strong>
          <p>${stages[n].explanation}</p>
        `;
      }

      slider.addEventListener("input", explainSlider);
      explainSlider();
    }

    if (mythPanel && !$("#lq-myth-guide")) {
      const note = document.createElement("div");
      note.id = "lq-myth-guide";
      note.className = "lq-lab-explain";

      note.innerHTML = `
        <strong>🔎 How Does Hepatitis B Spread?</strong>
        <p>
          Hepatitis B can spread when certain infected
          body fluids enter another person's body.
          Examples include blood exposure, sharing
          used needles, and transmission during birth.
        </p>
        <p>
          It <strong>does not spread</strong> through
          hugging, sharing a desk, or eating lunch
          together. People with hepatitis B should
          be treated with kindness and respect.
        </p>
        <p>
          Vaccination is an important way to prevent
          hepatitis B. Testing and medical treatment
          also help protect people's health.
        </p>
      `;

      mythPanel.insertBefore(note, $("#myth-cards"));
    }
  }

  /* =================================================
     MISSION 5 — FINAL SHOWDOWN
     Five MCQs plus two different interactive games
     ================================================= */

  if (page === "finale.html") {
    const area = $("#quiz-area");
    const badge = $("#badge-text");
    const progressLabel = $("#quiz-progress");

    if (area) {
      const questions = [
        {
          q: "Which organ does hepatitis B mainly infect?",
          a: ["Heart", "Liver", "Brain"],
          c: 1,
          why: "Hepatitis B mainly infects liver cells."
        },
        {
          q: "Which cell part acts like City Hall?",
          a: ["Nucleus", "Mitochondria", "Golgi apparatus"],
          c: 0,
          why: "The nucleus contains important instructions that help guide the cell."
        },
        {
          q: "Which Cell City workers build proteins?",
          a: ["Cell membrane", "Ribosomes", "Lysosomes"],
          c: 1,
          why: "Ribosomes build proteins, including some that the virus uses."
        },
        {
          q: "What does inflammation mean?",
          a: [
            "The liver disappears",
            "The body is responding to injury or infection",
            "The cell turns into a bone"
          ],
          c: 1,
          why: "Inflammation is part of the body's response to infection or injury."
        },
        {
          q: "How can people help prevent hepatitis B?",
          a: [
            "Get vaccinated",
            "Avoid friendly hugs",
            "Wait for obvious symptoms"
          ],
          c: 0,
          why: "Vaccination helps protect against hepatitis B."
        }
      ];

      let quizIndex = 0;
      let quizScore = 0;
      let riskyIndex = 0;
      let riskyScore = 0;
      let orderIndex = 0;
      let orderMistake = false;

      function showFinal() {
        area.innerHTML = `
          <div class="lq-card">
            <h2>🏆 Science Defender!</h2>
            <p>
              You've explored Cell City, followed the virus,
              investigated tissue, and tested how to protect people.
            </p>

            <p class="lq-score">
              Multiple-choice score: ${quizScore}/5
            </p>

            <p class="lq-score">
              Safe or Risky score: ${riskyScore}/3
            </p>

            <p>
              Infection story:
              ${orderMistake ? "Completed with hints" : "Completed in the correct order"}
            </p>

            <p>
              Remember: learning the science helps us
              protect ourselves and treat others kindly.
            </p>

            <button id="lq-replay" class="lq-next">
              PLAY AGAIN ↺
            </button>

            <a href="index.html" class="btn secondary">
              BACK TO MISSION CONTROL →
            </a>
          </div>
        `;

        progressLabel.textContent = "MISSION COMPLETE";
        badge.textContent =
          "🏆 SCIENCE DEFENDER UNLOCKED!";

        saveMission("finale");

        $("#lq-replay").onclick = () => {
          quizIndex = 0;
          quizScore = 0;
          riskyIndex = 0;
          riskyScore = 0;
          orderIndex = 0;
          orderMistake = false;
          showMCQ();
        };
      }

      /* GAME 3 — PUT THE STORY IN ORDER */

      function showOrderGame() {
        const steps = [
          {
            name: "The virus attaches to a liver cell",
            options: [
              "The virus attaches to a liver cell",
              "The liver becomes a bone",
              "Immune cells turn into viruses"
            ]
          },
          {
            name: "The virus uses the cell's machinery",
            options: [
              "The liver stops needing energy",
              "The virus uses the cell's machinery",
              "The cell becomes an organ by itself"
            ]
          },
          {
            name: "Immune defenders respond",
            options: [
              "Hugging causes hepatitis B",
              "The nucleus leaves the body",
              "Immune defenders respond"
            ]
          }
        ];

        if (orderIndex === steps.length) {
          showFinal();
          return;
        }

        const item = steps[orderIndex];

        progressLabel.textContent = "ACTIVITY 3 OF 3";

        area.innerHTML = `
          <div class="lq-card">
            <span class="lq-tag">🧩 GAME 3 — STORY BUILDER</span>
            <h2 class="lq-game-heading">
              Put the Infection Story in Order
            </h2>

            <p>
              Choose what happens next.
              Build the story from the first step
              to the immune response.
            </p>

            <div class="lq-chips">
              <span class="lq-chip">🦠 Virus arrives</span>
              <span class="lq-chip">→ ?</span>
              <span class="lq-chip">→ 🛡️ Response</span>
            </div>

            <h3>Story step ${orderIndex+1} of 3</h3>

            <div class="lq-answers" id="lq-order-answers">
              ${item.options.map((option,i) => `
                <button data-order-answer="${i}">
                  ${option}
                </button>
              `).join("")}
            </div>

            <p id="lq-order-feedback" class="lq-feedback">
              Which event belongs here?
            </p>

            <button id="lq-order-next" class="lq-next"
                    disabled>
              ${orderIndex === 2 ? "FINISH ADVENTURE →" : "NEXT STEP →"}
            </button>
          </div>
        `;

        all("[data-order-answer]").forEach(b => {
          b.onclick = () => {
            const good = b.textContent.trim() === item.name;

            if (!good) {
              orderMistake = true;
              b.classList.add("wrong");
              $("#lq-order-feedback").textContent =
                "Not quite. Think about what happened in Mission 2.";
              return;
            }

            b.classList.add("correct");
            all("[data-order-answer]").forEach(x => x.disabled = true);

            $("#lq-order-feedback").textContent =
              "✅ Correct! You've placed this event in the story.";

            $("#lq-order-next").disabled = false;
          };
        });

        $("#lq-order-next").onclick = () => {
          orderIndex++;
          showOrderGame();
        };
      }

      /* GAME 2 — SAFE OR RISKY */

      const situations = [
        {
          situation: "Sharing lunch with a classmate",
          answer: "safe",
          why: "Sharing food does not spread hepatitis B."
        },
        {
          situation: "Sharing a used needle",
          answer: "risky",
          why: "Used needles can carry infected blood."
        },
        {
          situation: "Giving a friend a hug",
          answer: "safe",
          why: "Hugging does not spread hepatitis B."
        }
      ];

      function showRiskGame() {
        if (riskyIndex === situations.length) {
          showOrderGame();
          return;
        }

        const item = situations[riskyIndex];
        progressLabel.textContent = "ACTIVITY 2 OF 3";

        area.innerHTML = `
          <div class="lq-card">
            <span class="lq-tag">🛡️ GAME 2 — HEALTH DETECTIVE</span>

            <h2 class="lq-game-heading">Safe or Risky?</h2>

            <p>
              Decide whether each situation can
              spread hepatitis B.
            </p>

            <div class="lq-score">
              Situation ${riskyIndex+1} of 3
            </div>

            <div class="lq-card" style="text-align:center">
              <div style="font-size:60px">
                ${riskyIndex===0 ? "🥪" : riskyIndex===1 ? "💉" : "🤗"}
              </div>
              <h3>${item.situation}</h3>
            </div>

            <div class="lq-answers">
              <button data-risk="safe">
                ✅ Safe — Does not spread HBV
              </button>
              <button data-risk="risky">
                ⚠️ Risky — Can spread HBV
              </button>
            </div>

            <p class="lq-feedback" id="lq-risk-feedback">
              Choose your answer.
            </p>

            <button id="lq-risk-next" class="lq-next" disabled>
              NEXT SITUATION →
            </button>
          </div>
        `;

        let attempted = false;

        all("[data-risk]").forEach(b => {
          b.onclick = () => {
            const good = b.dataset.risk === item.answer;

            if (!good) attempted = true;

            b.classList.add(good ? "correct" : "wrong");

            $("#lq-risk-feedback").textContent =
              (good ? "✅ " : "💡 ") + item.why;

            if (good) {
              if (!attempted) riskyScore++;
              all("[data-risk]").forEach(x => x.disabled = true);
              $("#lq-risk-next").disabled = false;
            }
          };
        });

        $("#lq-risk-next").onclick = () => {
          riskyIndex++;
          showRiskGame();
        };
      }

      /* GAME 1 — FIVE MULTIPLE CHOICE QUESTIONS */

      function showMCQ() {
        if (quizIndex === questions.length) {
          showRiskGame();
          return;
        }

        const item = questions[quizIndex];
        progressLabel.textContent = "ACTIVITY 1 OF 3";

        area.innerHTML = `
          <div class="lq-card">
            <span class="lq-tag">🎯 GAME 1 — SCIENCE QUIZ</span>

            <h2 class="lq-game-heading">
              The Five-Question Challenge
            </h2>

            <div class="lq-score">
              Question ${quizIndex+1} of 5
            </div>

            <h3>${item.q}</h3>

            <div class="lq-answers" id="lq-final-answers">
              ${item.a.map((answer,i) => `
                <button data-final-answer="${i}">
                  ${answer}
                </button>
              `).join("")}
            </div>

            <p class="lq-feedback" id="lq-final-feedback">
              Pick your answer to continue!
            </p>

            <button id="lq-final-next" class="lq-next" disabled>
              ${quizIndex===4 ? "PLAY NEXT GAME →" : "NEXT QUESTION →"}
            </button>
          </div>
        `;

        all("[data-final-answer]").forEach(b => {
          b.onclick = () => {
            const good = Number(b.dataset.finalAnswer) === item.c;
            if (good) quizScore++;

            all("[data-final-answer]").forEach(x => {
              x.disabled = true;

              if (Number(x.dataset.finalAnswer) === item.c) {
                x.classList.add("correct");
              } else if (x === b) {
                x.classList.add("wrong");
              }
            });

            $("#lq-final-feedback").textContent =
              (good ? "✅ Great work! " : "💡 Let's learn! ") +
              item.why;

            $("#lq-final-next").disabled = false;
          };
        });

        $("#lq-final-next").onclick = () => {
          quizIndex++;
          showMCQ();
        };
      }

      showMCQ();
    }
  }

})();

/* SHORTER, MORE VISUAL SCIENCE EXPLANATIONS */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";

  const style = document.createElement("style");
  style.textContent = `
    .visual-story {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:12px;
      margin:18px 0;
    }
    .visual-step {
      background:#fff;
      border:2px solid #e4cafa;
      border-radius:18px;
      padding:16px 10px;
      text-align:center;
    }
    .visual-step .picture {
      font-size:clamp(38px,5vw,65px);
      margin-bottom:10px;
    }
    .visual-step strong {
      display:block;
      color:#6540b3;
      font-size:1.05rem;
    }
    .visual-step p {
      margin:8px 0 0;
      font-size:.95rem;
      line-height:1.45;
    }
    @media(max-width:650px) {
      .visual-story {
        grid-template-columns:1fr;
      }
    }
  `;
  document.head.appendChild(style);

  // MISSION 1: Short picture-based explanation
  if (page === "cells.html") {
    const section = document.getElementById("lq-cell-connection");

    if (section) {
      section.innerHTML = `
        <h3>🦠 How Does Hepatitis B Use a Liver Cell?</h3>

        <div class="visual-story">
          <div class="visual-step">
            <div class="picture">🦠 ➜ 🧫</div>
            <strong>1. Enters</strong>
            <p>The virus enters a liver cell.</p>
          </div>

          <div class="visual-step">
            <div class="picture">🧠 🏭</div>
            <strong>2. Uses Workers</strong>
            <p>Cell parts help make virus pieces.</p>
          </div>

          <div class="visual-step">
            <div class="picture">🦠 🦠 🦠</div>
            <strong>3. Makes Copies</strong>
            <p>New viruses can infect other liver cells.</p>
          </div>
        </div>

        <p>
          💡 <strong>Remember:</strong> The immune system
          can injure infected cells while fighting the virus.
        </p>
      `;
    }
  }

  // MISSION 4: Don't reveal all Mythbusters answers
  if (page === "lab.html") {
    const section = document.getElementById("lq-myth-guide");

    if (section) {
      section.innerHTML = `
        <h3>🔎 How Does Hepatitis B Spread?</h3>

        <div class="visual-story">
          <div class="visual-step">
            <div class="picture">🩸</div>
            <strong>Blood</strong>
          </div>

          <div class="visual-step">
            <div class="picture">❓</div>
            <strong>Possible Exposure?</strong>
          </div>

          <div class="visual-step">
            <div class="picture">🕵️</div>
            <strong>You Decide!</strong>
          </div>
        </div>

        <p>
          Hepatitis B can spread when infected blood
          enters another person's body.
        </p>

        <p>
          <strong>Your mission:</strong>
          Decide which situations are risky
          and which are safe. Look for clues!
        </p>
      `;
    }
  }
})();

/* ===========================================================
   LIVERQUEST — MISSION 2: INSIDE THE INVASION
   Illustrated story mode, seven chapters, interactive choices
   PASTE ONCE AT THE VERY BOTTOM OF site.js
   =========================================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "invasion.html") return;

  const oldStory = document.querySelector(".story-stage");
  if (!oldStory) return;

  const section = oldStory.closest(".panel.challenge");
  if (!section) return;

  document.getElementById("virus-story-style")?.remove();

  const style = document.createElement("style");
  style.id = "virus-story-style";
  style.textContent = `
    #virus-adventure {
      --purple:#7144bb;
      --pink:#f5a6ce;
      --blue:#a9e1f9;
      --mint:#41bb9b;
      color:#493c65;
    }

    #virus-adventure * {
      box-sizing:border-box;
    }

    #virus-adventure h2 {
      color:#6842aa;
      font-size:clamp(1.6rem,4vw,2.2rem);
      margin:10px 0;
    }

    #virus-adventure h3 {
      color:#6842aa;
      margin:8px 0;
    }

    .vs-intro {
      text-align:center;
      max-width:740px;
      margin:auto;
    }

    .vs-pill {
      display:inline-block;
      padding:8px 15px;
      background:#e8dbff;
      color:#603c9f;
      border-radius:999px;
      font-weight:850;
      font-size:.9rem;
    }

    .vs-progress-info {
      display:flex;
      justify-content:space-between;
      align-items:center;
      flex-wrap:wrap;
      gap:8px;
      margin:20px 0 9px;
      font-weight:850;
      color:#6041a3;
    }

    .vs-track {
      display:flex;
      gap:7px;
      margin-bottom:20px;
    }

    .vs-track span {
      height:10px;
      flex:1;
      background:#e5d5f5;
      border-radius:999px;
    }

    .vs-track span.done {
      background:#53bfa3;
    }

    .vs-track span.current {
      background:#8e66de;
    }

    .vs-scene {
      background:linear-gradient(135deg,#edfaff,#fff0f8);
      border:3px solid #d8bef1;
      border-radius:24px;
      padding:9px;
      overflow:hidden;
    }

    .vs-scene svg {
      width:100%;
      display:block;
      height:auto;
    }

    .vs-scene.warning {
      border-color:#e3a077;
      background:#fff1e7;
      animation:vs-shake .3s ease;
    }

    .vs-scene.success {
      border-color:#52c49b;
      background:#ebfff5;
    }

    .vs-dialogue {
      display:grid;
      grid-template-columns:58px 1fr;
      align-items:start;
      gap:12px;
      padding:17px;
      margin:16px 0;
      border-radius:18px;
      background:#f5eeff;
    }

    .vs-avatar {
      font-size:35px;
      text-align:center;
    }

    .vs-dialogue strong {
      color:#6139a9;
    }

    .vs-dialogue p {
      line-height:1.55;
      margin:7px 0 0;
      font-size:1.06rem;
    }

    .vs-question {
      background:white;
      border:2px solid #e2cdf2;
      border-radius:20px;
      padding:20px;
      margin-top:16px;
    }

    .vs-question h3 {
      font-size:1.25rem;
      margin-bottom:15px;
    }

    .vs-choices {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:11px;
    }

    .vs-choice {
      cursor:pointer;
      background:#fbf7ff;
      color:#51358d;
      padding:15px 10px;
      border:2px solid #cfb5ed;
      border-radius:15px;
      font:inherit;
      font-weight:800;
      min-height:78px;
      transition:transform .15s,background .15s;
    }

    .vs-choice:hover:not(:disabled) {
      transform:translateY(-2px);
      background:#eee5ff;
    }

    .vs-choice.correct {
      background:#dcf8e9;
      border-color:#40b98d;
    }

    .vs-choice.wrong {
      background:#ffe0e3;
      border-color:#df7e88;
    }

    .vs-choice:disabled {
      cursor:default;
    }

    .vs-result {
      display:none;
      border:2px solid #edd19f;
      background:#fff1d5;
      border-radius:17px;
      padding:15px;
      margin:16px 0;
      line-height:1.6;
    }

    .vs-result.visible {
      display:block;
    }

    .vs-result.good {
      background:#e4f9ec;
      border-color:#7ccba6;
    }

    .vs-next {
      display:block;
      margin:18px auto 5px;
      background:#774dc6;
      color:#fff;
      border:0;
      border-radius:15px;
      padding:16px 26px;
      font-size:1.05rem;
      font-weight:850;
      cursor:pointer;
    }

    .vs-next:disabled {
      opacity:.45;
      cursor:not-allowed;
    }

    .vs-caption {
      text-align:center;
      font-size:.85rem;
      color:#6d637e;
      margin:10px 0;
    }

    .vs-finish {
      text-align:center;
      padding:24px;
      border-radius:24px;
      background:linear-gradient(145deg,#f4eaff,#e9fbf5);
      border:2px solid #d9bcec;
    }

    .vs-recap {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:12px;
      margin:20px 0;
    }

    .vs-recap div {
      background:white;
      border:2px solid #e2cff5;
      padding:15px 9px;
      border-radius:17px;
    }

    .vs-recap span {
      display:block;
      font-size:42px;
      margin-bottom:8px;
    }

    .vs-recap strong {
      display:block;
      color:#6041a6;
    }

    @keyframes vs-shake {
      0%,100% {transform:translateX(0)}
      25% {transform:translateX(-6px)}
      75% {transform:translateX(6px)}
    }

    @media(max-width:650px) {
      .vs-choices,
      .vs-recap {
        grid-template-columns:1fr;
      }

      .vs-dialogue {
        grid-template-columns:42px 1fr;
        padding:13px;
      }

      .vs-avatar {
        font-size:28px;
      }

      .vs-choice {
        min-height:58px;
      }
    }

    @media(prefers-reduced-motion:reduce) {
      #virus-adventure * {
        animation:none!important;
        transition:none!important;
      }
    }
  `;
  document.head.appendChild(style);

  // Replace ONLY the old story section.
  section.innerHTML = `
    <div id="virus-adventure">
      <div class="vs-intro">
        <span class="vs-pill">🎮 MISSION 2 — STORY MODE</span>
        <h2>🦠 Inside the Invasion</h2>
        <p>
          Follow a hepatitis B virus through a liver cell.
          Investigate seven scenes and unlock the science story!
        </p>
      </div>

      <div class="vs-progress-info">
        <span id="vs-chapter">CHAPTER 1 / 7</span>
        <span id="vs-score">⭐ 0 / 7 stars</span>
      </div>

      <div class="vs-track" id="vs-track"></div>

      <div class="vs-scene" id="vs-scene"></div>

      <p class="vs-caption">
        Simplified, fictional illustrations — not to scale.
      </p>

      <div class="vs-dialogue">
        <div class="vs-avatar">🤖</div>
        <div>
          <strong>MISSION GUIDE</strong>
          <p id="vs-narration"></p>
        </div>
      </div>

      <div class="vs-question">
        <h3 id="vs-question"></h3>
        <div class="vs-choices" id="vs-choices"></div>
        <div class="vs-result" id="vs-result"
             role="status" aria-live="polite"></div>
      </div>

      <button id="vs-next" class="vs-next" disabled>
        NEXT CHAPTER →
      </button>
    </div>
  `;

  const root = document.getElementById("virus-adventure");
  const $ = selector => root.querySelector(selector);

  // ------------------------------
  // ILLUSTRATION BUILDING BLOCKS
  // ------------------------------

  function virus(x,y,s=1) {
    return `
      <g transform="translate(${x} ${y}) scale(${s})">
        <circle r="25" fill="#f7a0c8"
                stroke="#bd6099" stroke-width="5"/>
        <circle r="12" fill="#9360ce"/>
        <path d="M-8 0 Q0 -13 8 0 Q0 13 -8 0"
              fill="none" stroke="#e9d9ff" stroke-width="3"/>

        ${Array.from({length:10},(_,i)=>{
          const angle=i*Math.PI/5;
          const x1=Math.cos(angle)*26;
          const y1=Math.sin(angle)*26;
          const x2=Math.cos(angle)*36;
          const y2=Math.sin(angle)*36;

          return `
            <line x1="${x1}" y1="${y1}"
                  x2="${x2}" y2="${y2}"
                  stroke="#c66a9f" stroke-width="4"/>
            <circle cx="${x2}" cy="${y2}" r="5"
                    fill="#f49ec6"/>
          `;
        }).join("")}
      </g>
    `;
  }

  function liverCell(injured=false) {
    return `
      <g>
        <circle cx="350" cy="165" r="111"
                fill="${injured?"#ffd6b9":"#ffd3e9"}"
                stroke="${injured?"#df8c60":"#df79b2"}"
                stroke-width="8"/>

        <circle cx="350" cy="165" r="40"
                fill="#ae87df" stroke="#8050ba"
                stroke-width="5"/>

        <circle cx="350" cy="165" r="13"
                fill="#7442ad"/>

        <g fill="#7946b5">
          <circle cx="294" cy="127" r="5"/>
          <circle cx="284" cy="192" r="5"/>
          <circle cx="408" cy="129" r="5"/>
          <circle cx="398" cy="221" r="5"/>
        </g>

        <g fill="none" stroke="#8876d3"
           stroke-width="8" stroke-linecap="round">
          <path d="M303 113 Q247 104 267 147 Q281 156 307 149"/>
          <path d="M309 206 Q260 201 277 234 Q291 240 315 224"/>
        </g>

        <ellipse cx="399" cy="236" rx="34" ry="17"
                 fill="#ffc179" stroke="#d48847"
                 stroke-width="4"/>

        <ellipse cx="299" cy="241" rx="26" ry="15"
                 fill="#ffc179" stroke="#d48847"
                 stroke-width="4"/>

        <g fill="none" stroke="#34bca5"
           stroke-width="7" stroke-linecap="round">
          <path d="M377 94 Q406 106 427 92"/>
          <path d="M382 107 Q409 118 421 105"/>
        </g>
      </g>
    `;
  }

  function immuneCell(x,y) {
    return `
      <g>
        <circle cx="${x}" cy="${y}" r="45"
                fill="#b4e7fb" stroke="#4b9bcf"
                stroke-width="6"/>
        <path d="M${x-17} ${y}
                 Q${x-6} ${y-27} ${x+8} ${y-5}
                 Q${x+27} ${y+20} ${x-8} ${y+18}Z"
              fill="#668dcf"/>
        <circle cx="${x+15}" cy="${y-18}" r="5"
                fill="white"/>
      </g>
    `;
  }

  function tissuePicture(injury=0,scars=false) {
    return `
      <g>
        <rect x="120" y="65" width="365" height="230"
              rx="20" fill="#fff3f8"
              stroke="#dfbdd2" stroke-width="5"/>

        ${Array.from({length:24},(_,i)=>{
          const x=157+(i%6)*59;
          const y=102+Math.floor(i/6)*52;
          const hurt=i<injury;

          return `
            <rect x="${x-23}" y="${y-21}"
                  width="47" height="42" rx="14"
                  fill="${hurt?"#ffbb82":"#f4a9ca"}"
                  stroke="${hurt?"#d98b56":"#cc78a0"}"
                  stroke-width="3"/>

            <circle cx="${x}" cy="${y}" r="7"
                    fill="#8f55b9"/>

            ${hurt?`
              <path d="M${x-12} ${y-13}
                       L${x+12} ${y+13}
                       M${x+12} ${y-13}
                       L${x-12} ${y+13}"
                    stroke="#cb4356" stroke-width="4"/>
            `:""}
          `;
        }).join("")}

        ${scars?`
          <path d="M238 77 L261 282 M393 77 L372 282"
                stroke="#e6bc79" stroke-width="16"
                stroke-dasharray="12 7"
                opacity=".88"/>
        `:""}
      </g>
    `;
  }

  function svgFrame(content,warning=false) {
    return `
      <svg viewBox="0 0 600 335"
           role="img"
           aria-label="Illustrated hepatitis B story scene">

        <rect width="600" height="335" rx="23"
              fill="${warning?"#fff0e4":"#f1faff"}"/>

        <circle cx="65" cy="46" r="24"
                fill="#e3d5ff" opacity=".8"/>

        <circle cx="538" cy="290" r="25"
                fill="#d7f5ef" opacity=".9"/>

        ${content}
      </svg>
    `;
  }

  // ------------------------------
  // SEVEN STORY CHAPTERS
  // ------------------------------

  const chapters = [
    {
      title:"An Unexpected Visitor",
      narration:
        "A tiny hepatitis B virus travels through the blood " +
        "and reaches the liver. It approaches a liver cell.",
      question:
        "Which part must the virus attach to before it can enter?",
      answers:[
        "🛡️ Cell membrane",
        "⚡ Mitochondria",
        "🧠 Nucleus"
      ],
      correct:0,
      success:
        "The virus attaches to a special protein on the cell membrane.",
      failure:
        "That structure is inside the cell. Look at the cell's outer boundary.",
      scene:0
    },
    {
      title:"Inside the Cell",
      narration:
        "The virus enters and releases its genetic instructions. " +
        "These instructions travel toward the cell's control centre.",
      question:
        "Where do the virus's DNA instructions go?",
      answers:[
        "📦 Golgi apparatus",
        "🧠 Nucleus",
        "♻️ Lysosomes"
      ],
      correct:1,
      success:
        "The viral DNA reaches the nucleus, where it helps direct the production of new viral material.",
      failure:
        "Remember Cell City Hall. Which organelle is the control centre?",
      scene:1
    },
    {
      title:"The Cell Workers",
      narration:
        "The virus cannot make all its parts on its own. " +
        "It uses some of the cell's protein-building machinery.",
      question:
        "Which cell workers help make the virus's proteins?",
      answers:[
        "🏗️ Ribosomes",
        "⚡ Mitochondria",
        "🛡️ Cell membrane"
      ],
      correct:0,
      success:
        "Ribosomes make proteins. Hepatitis B uses them to help produce viral proteins.",
      failure:
        "Think back to the Cell City construction workers.",
      scene:2
    },
    {
      title:"The Copying Factory",
      narration:
        "New viral parts are made and assembled. " +
        "More hepatitis B virus particles can then leave the cell.",
      question:
        "What could happen after new viruses leave?",
      answers:[
        "The liver instantly stops working",
        "They can reach other liver cells",
        "They turn into immune cells"
      ],
      correct:1,
      success:
        "New virus particles can travel to other liver cells and continue the infection.",
      failure:
        "Think about why viruses need to make more copies of themselves.",
      scene:3
    },
    {
      title:"The Immune Defenders",
      narration:
        "Your body's immune system notices infected liver cells. " +
        "Immune defenders arrive to respond to the infection.",
      question:
        "What can happen when immune cells attack infected liver cells?",
      answers:[
        "The cells may become injured",
        "The cells turn into viruses",
        "The liver grows a new nucleus"
      ],
      correct:0,
      success:
        "The immune response helps fight the infection, but it can injure liver cells.",
      failure:
        "Immune defenders fight infection, but their response can also affect nearby tissue.",
      scene:4
    },
    {
      title:"The Inflammation Alarm",
      narration:
        "Inflammation is part of your body's response to an " +
        "infection or injury. Inside the liver, it may damage cells.",
      question:
        "Which statement best describes inflammation?",
      answers:[
        "The body's response to injury or infection",
        "A new organelle made by the cell",
        "A sign that every liver cell is infected"
      ],
      correct:0,
      success:
        "Exactly. Inflammation means your body's defenses are responding. It does not always mean serious damage.",
      failure:
        "Think about what your body's defenses do when something is injured or infected.",
      scene:5
    },
    {
      title:"From Cells to the Liver",
      narration:
        "When liver cells are injured repeatedly over a long time, " +
        "scar tissue may form. Too much scarring can make it harder " +
        "for the liver to do its jobs.",
      question:
        "What might happen if liver injury continues for years?",
      answers:[
        "The liver becomes a muscle",
        "Scar tissue may develop",
        "Every injured cell instantly recovers"
      ],
      correct:1,
      success:
        "Scar tissue, called fibrosis, can develop after repeated injury. This does not happen to everyone with hepatitis B.",
      failure:
        "Remember the Tissue Time Machine: what can repeated injury leave behind?",
      scene:6
    }
  ];

  // ------------------------------
  // STORY ART FOR EACH CHAPTER
  // ------------------------------

  function drawScene(index,wrong=false) {
    let picture="";

    if(index===0) {
      picture=`
        ${liverCell()}

        ${virus(116,167,1)}

        <path d="M166 167 L219 167"
              stroke="#7047b8" stroke-width="7"
              stroke-dasharray="9 8"/>

        <circle cx="240" cy="167" r="13"
                fill="#4fc4a1" stroke="#289c7c"
                stroke-width="4"/>

        <text x="112" y="255" text-anchor="middle"
              font-size="19" font-weight="bold" fill="#6540a0">
          VIRUS
        </text>

        <text x="355" y="312" text-anchor="middle"
              font-size="20" font-weight="bold" fill="#6540a0">
          LIVER CELL
        </text>
      `;
    }

    if(index===1) {
      picture=`
        ${liverCell()}

        ${virus(245,162,.55)}

        <path d="M275 163 L305 163"
              stroke="#754abc" stroke-width="6"
              stroke-dasharray="8 6"/>

        <circle cx="350" cy="165" r="50"
                fill="none" stroke="#30b98c"
                stroke-width="6" stroke-dasharray="10 7"/>

        <text x="120" y="125" font-size="22"
              font-weight="bold" fill="#6440a1">
          INSTRUCTIONS
        </text>

        <path d="M176 138 L227 159"
              fill="none" stroke="#754abc"
              stroke-width="5"/>
      `;
    }

    if(index===2) {
      picture=`
        ${liverCell()}

        <g fill="#7541a9">
          <circle cx="292" cy="125" r="10"/>
          <circle cx="285" cy="190" r="10"/>
          <circle cx="404" cy="129" r="10"/>
          <circle cx="395" cy="221" r="10"/>
        </g>

        <rect x="38" y="92" width="160" height="90"
              rx="16" fill="#fff" stroke="#b99ce9"
              stroke-width="4"/>

        <text x="118" y="123" text-anchor="middle"
              font-size="19" fill="#6340a3"
              font-weight="bold">
          PROTEIN
        </text>

        <text x="118" y="149" text-anchor="middle"
              font-size="19" fill="#6340a3"
              font-weight="bold">
          BUILDERS
        </text>

        <path d="M198 143 L273 141"
              stroke="#754abc" stroke-width="5"
              stroke-dasharray="8 6"/>
      `;
    }

    if(index===3) {
      picture=`
        ${liverCell(true)}

        ${virus(499,85,.75)}
        ${virus(500,210,.65)}
        ${virus(145,165,.8)}
        ${virus(343,90,.3)}

        <path d="M450 152 L478 122"
              stroke="#754abc" stroke-width="6"
              stroke-dasharray="8 5"/>

        <path d="M444 193 L479 202"
              stroke="#754abc" stroke-width="6"
              stroke-dasharray="8 5"/>

        <text x="300" y="312" text-anchor="middle"
              font-size="20" fill="#6843a7"
              font-weight="bold">
          NEW VIRUS PARTICLES
        </text>
      `;
    }

    if(index===4) {
      picture=`
        ${liverCell(true)}

        ${virus(348,163,.35)}

        ${immuneCell(123,165)}

        <path d="M180 165 L225 165"
              stroke="#4c9ecb" stroke-width="7"
              stroke-dasharray="8 6"/>

        <path d="M438 128 L476 91 M441 182 L494 208"
              stroke="#e6a05c" stroke-width="7"
              stroke-linecap="round"/>

        <text x="124" y="251" text-anchor="middle"
              fill="#3779ae" font-size="20" font-weight="bold">
          DEFENDER
        </text>
      `;
    }

    if(index===5) {
      picture=`
        ${tissuePicture(6)}

        ${immuneCell(86,92)}
        ${immuneCell(519,253)}

        <path d="M154 86 L202 109
                 M475 235 L448 214"
              fill="none" stroke="#5b9dcb"
              stroke-width="5" stroke-dasharray="8 6"/>

        <text x="300" y="37" text-anchor="middle"
              font-size="21" font-weight="bold" fill="#6844aa">
          INFLAMMATION
        </text>
      `;
    }

    if(index===6) {
      picture=`
        ${tissuePicture(8,true)}

        <rect x="407" y="10" width="165" height="44"
              rx="14" fill="white" stroke="#e2bb76"
              stroke-width="3"/>

        <text x="490" y="37" text-anchor="middle"
              font-size="19" font-weight="bold" fill="#936a31">
          SCAR TISSUE
        </text>

        <path d="M464 55 L389 101"
              fill="none" stroke="#c39c5c"
              stroke-width="5"/>
      `;
    }

    if(wrong) {
      picture+=`
        <g>
          <rect x="14" y="14" width="160" height="44"
                rx="13" fill="#fff2dc"
                stroke="#e8a05c" stroke-width="3"/>

          <text x="94" y="42" text-anchor="middle"
                font-size="19" font-weight="bold" fill="#a86b34">
            CHECK AGAIN!
          </text>
        </g>
      `;
    }

    return svgFrame(picture,wrong);
  }

  // ------------------------------
  // GAME STATE
  // ------------------------------

  let chapter=0;
  let stars=0;
  let firstTry=true;

  function showChapter() {
    if(chapter===chapters.length) {
      showEnding();
      return;
    }

    firstTry=true;

    const item=chapters[chapter];

    $("#vs-chapter").textContent=
      `CHAPTER ${chapter+1} / ${chapters.length}`;

    $("#vs-score").textContent=
      `⭐ ${stars} / ${chapters.length} stars`;

    $("#vs-track").innerHTML=
      chapters.map((_,i)=>`
        <span class="${
          i<chapter?"done":i===chapter?"current":""
        }"></span>
      `).join("");

    $("#vs-scene").className="vs-scene";
    $("#vs-scene").innerHTML=drawScene(item.scene);

    $("#vs-narration").textContent=item.narration;
    $("#vs-question").textContent=item.question;

    const choices=$("#vs-choices");
    const result=$("#vs-result");
    const next=$("#vs-next");

    result.className="vs-result";
    result.textContent="";

    next.disabled=true;
    next.textContent=
      chapter===chapters.length-1
        ?"COMPLETE THE STORY →"
        :"NEXT CHAPTER →";

    choices.innerHTML=item.answers.map((answer,i)=>`
      <button type="button"
              class="vs-choice"
              data-story-choice="${i}">
        ${answer}
      </button>
    `).join("");

    choices.querySelectorAll("button").forEach(button=>{
      button.onclick=()=>{
        const selected=Number(button.dataset.storyChoice);
        const correct=selected===item.correct;

        if(!correct) {
          firstTry=false;

          $("#vs-scene").className="vs-scene warning";
          $("#vs-scene").innerHTML=
            drawScene(item.scene,true);

          button.classList.add("wrong");

          result.className="vs-result visible";
          result.innerHTML=`
            <strong>🔎 Investigation setback!</strong>
            <p>${item.failure}</p>
            <p>Try another answer to continue.</p>
          `;

          return;
        }

        if(firstTry) stars++;

        $("#vs-scene").className="vs-scene success";
        $("#vs-scene").innerHTML=drawScene(item.scene);

        button.classList.add("correct");

        choices.querySelectorAll("button").forEach(b=>{
          b.disabled=true;
        });

        $("#vs-score").textContent=
          `⭐ ${stars} / ${chapters.length} stars`;

        result.className="vs-result visible good";
        result.innerHTML=`
          <strong>✅ Story unlocked!</strong>
          <p>${item.success}</p>
          <p>${firstTry?"⭐ You earned a star!":"Great recovery!"}</p>
        `;

        next.disabled=false;
      };
    });
  }

  function showEnding() {
    root.innerHTML=`
      <div class="vs-finish">
        <div style="font-size:75px">🏆 🧬 🦠</div>

        <h2>Virus Invasion: Story Complete!</h2>

        <p>You followed hepatitis B from the
        cell membrane to the immune response.</p>

        <h3>⭐ ${stars} / 7 stars</h3>

        <div class="vs-recap">
          <div>
            <span>🦠</span>
            <strong>Virus enters</strong>
            The virus uses a doorway on the liver cell.
          </div>

          <div>
            <span>🏭</span>
            <strong>Cell machinery</strong>
            Cell workers help make more viruses.
          </div>

          <div>
            <span>🛡️</span>
            <strong>Immune response</strong>
            Inflammation can injure liver cells.
          </div>
        </div>

        <p>
          <strong>Next up:</strong> Investigate
          how these changes affect liver tissue!
        </p>

        <button type="button" id="vs-continue" class="vs-next">
          🔬 CONTINUE TO TISSUE DETECTIVE →
        </button>

        <button type="button" id="vs-replay"
                class="vs-choice"
                style="min-height:45px">
          PLAY STORY AGAIN ↺
        </button>
      </div>
    `;

    $("#vs-continue").onclick=()=>{
      if(typeof nextPage==="function") {
        nextPage("microscope.html","invasion");
      } else {
        location.href="microscope.html";
      }
    };

    $("#vs-replay").onclick=()=>{
      chapter=0;
      stars=0;
      location.reload();
    };
  }

  $("#vs-next").onclick=()=>{
    chapter++;
    showChapter();
  };

  showChapter();
})();

/* MISSION 2 — MORE VISUAL HEPATITIS B INTRO */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "invasion.html") return;

  const panels = document.querySelectorAll(".two-col > .panel");
  if (panels.length < 2) return;

  // LEFT PANEL: Remove repeated microscope explanation.
  const intro = document.getElementById("lq-virus-intro");

  if (intro) {
    const paragraphs = intro.querySelectorAll("p");

    paragraphs.forEach(p => {
      if (
        p.textContent.includes("powerful microscopes") ||
        p.textContent.includes("ordinary classroom microscope")
      ) {
        p.remove();
      }
    });

    intro.querySelectorAll(".lq-card").forEach(card => {
      if (card.textContent.includes("How Small Is It")) {
        card.remove();
      }
    });
  }

  // RIGHT PANEL: A colourful, visual introduction.
  panels[1].innerHTML = `
    <span class="pill">🦠 THE VIRUS FILE</span>

    <h2>What Is Hepatitis B?</h2>

    <p>
      Hepatitis B is a virus infection that mainly
      affects the liver.
    </p>

    <div class="hb-fact-grid">

      <div class="hb-fact">
        <div class="hb-fact-icon">🦠</div>
        <strong>THE VIRUS</strong>
        <p>HBV is the virus that causes hepatitis B.</p>
      </div>

      <div class="hb-fact">
        <div class="hb-fact-icon">🫀</div>
        <strong>THE TARGET</strong>
        <p>It enters liver cells and uses their machinery.</p>
      </div>

      <div class="hb-fact">
        <div class="hb-fact-icon">🛡️</div>
        <strong>THE DEFENDERS</strong>
        <p>Immune cells respond to infected liver cells.</p>
      </div>

      <div class="hb-fact">
        <div class="hb-fact-icon">🩹</div>
        <strong>THE EFFECT</strong>
        <p>Inflammation can injure liver tissue.</p>
      </div>

    </div>

    <div class="hb-inflammation">
      <div class="hb-fact-icon">🔥</div>
      <div>
        <strong>What's inflammation?</strong>
        <p>
          It's part of your body's response to infection
          or injury. Sometimes, this response can
          also damage healthy tissue.
        </p>
      </div>
    </div>

    <div class="hb-bottom">
      💡 <strong>Did you know?</strong> Many people with hepatitis B
      do not feel sick, and not everyone develops serious
      liver damage.
    </div>
  `;

  document.getElementById("hb-intro-styles")?.remove();

  const style = document.createElement("style");
  style.id = "hb-intro-styles";

  style.textContent = `
    .hb-fact-grid {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:13px;
      margin:18px 0;
    }

    .hb-fact {
      background:linear-gradient(135deg,#f5efff,#effaff);
      border:2px solid #d9c3f3;
      border-radius:19px;
      padding:18px 12px;
      text-align:center;
    }

    .hb-fact-icon {
      font-size:clamp(36px,5vw,54px);
      margin-bottom:10px;
    }

    .hb-fact strong {
      color:#6843ae;
      font-size:1rem;
      display:block;
    }

    .hb-fact p {
      font-size:.98rem;
      line-height:1.45;
      margin:9px 0 0;
      color:#50506a;
    }

    .hb-inflammation {
      display:flex;
      gap:18px;
      align-items:center;
      background:#fff2dd;
      border:2px solid #f0c98c;
      border-radius:18px;
      padding:16px;
      margin:15px 0;
    }

    .hb-inflammation strong {
      color:#96612a;
      font-size:1.15rem;
    }

    .hb-inflammation p {
      margin:6px 0 0;
      line-height:1.55;
    }

    .hb-inflammation .hb-fact-icon {
      flex-shrink:0;
      margin:0;
    }

    .hb-bottom {
      padding:15px;
      background:#e6f8f0;
      border:2px solid #addfc7;
      border-radius:16px;
      line-height:1.5;
      margin-top:15px;
    }

    @media(max-width:480px) {
      .hb-fact-grid {
        grid-template-columns:1fr 1fr;
        gap:8px;
      }

      .hb-fact {
        padding:12px 7px;
      }

      .hb-inflammation {
        flex-direction:column;
        text-align:center;
      }
    }
  `;

  document.head.appendChild(style);
})();

/* ==================================================
   MISSION 2 — SHOW REAL HEPATITIS B PHOTO IMMEDIATELY
   Paste at the VERY BOTTOM of site.js
   ================================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "invasion.html") return;

  const leftPanel = document.querySelector(".two-col > .panel");
  if (!leftPanel) return;

  // Remove any hidden bonus-photo sections.
  leftPanel.querySelectorAll("details").forEach(details => {
    if (
      /bonus|real|microscope|photo/i.test(
        details.querySelector("summary")?.textContent || ""
      )
    ) {
      details.remove();
    }
  });

  // Remove previous copies of this new display.
  document.getElementById("hb-real-photo-display")?.remove();
  document.getElementById("hb-real-photo-css")?.remove();

  const photoBox = document.createElement("div");
  photoBox.id = "hb-real-photo-display";

  photoBox.innerHTML = `
    <div class="hb-real-photo-heading">
      <span>🔬</span>
      <div>
        <h3>Real Hepatitis B Virus</h3>
        <p>This is a scientific image of hepatitis B virus particles.</p>
      </div>
    </div>

    <div class="hb-real-photo-frame">
      <img
        src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Hepatitis%20B%20virus%2001.jpg"
        alt="Scientific electron microscope image showing hepatitis B virus particles"
        loading="eager"
      >

      <p class="hb-real-photo-error" hidden>
        The real virus photograph could not load on this network.
      </p>
    </div>

    <p class="hb-real-photo-caption">
      🦠 Cartoon illustration vs. real scientific image.
      The real virus does not have cartoon colours or a face.
    </p>
  `;

  const image = photoBox.querySelector("img");
  image.onerror = function () {
    this.hidden = true;
    photoBox.querySelector(".hb-real-photo-error").hidden = false;
  };

  leftPanel.appendChild(photoBox);

  const css = document.createElement("style");
  css.id = "hb-real-photo-css";

  css.textContent = `
    #hb-real-photo-display {
      margin-top:20px;
      padding:18px;
      background:linear-gradient(135deg,#f2ecff,#e9f9ff);
      border:2px solid #d5bcf2;
      border-radius:22px;
    }

    .hb-real-photo-heading {
      display:flex;
      align-items:center;
      gap:13px;
      margin-bottom:14px;
    }

    .hb-real-photo-heading > span {
      font-size:40px;
    }

    .hb-real-photo-heading h3 {
      color:#6842ae;
      margin:0 0 5px;
      font-size:1.3rem;
    }

    .hb-real-photo-heading p {
      margin:0;
      line-height:1.5;
      color:#55536c;
    }

    .hb-real-photo-frame {
      overflow:hidden;
      border-radius:17px;
      background:white;
      border:3px solid #d5bfef;
      min-height:160px;
      display:grid;
      place-items:center;
    }

    .hb-real-photo-frame img {
      width:100%;
      max-height:340px;
      object-fit:contain;
      display:block;
    }

    .hb-real-photo-error {
      padding:20px;
      text-align:center;
      color:#855d72;
    }

    .hb-real-photo-caption {
      margin:13px 0 0;
      color:#675a7e;
      font-size:.94rem;
      line-height:1.5;
      text-align:center;
    }
  `;

  document.head.appendChild(css);
})();

/* MISSION 3 — SCAR REVEAL REDESIGN (paste at bottom of site.js) */
(() => {
  if (!location.pathname.endsWith('microscope.html')) return;
  const button = document.getElementById('show-scars');
  const report = document.getElementById('tissue-report');
  const injured = document.getElementById('injured-tissue');
  if (!button || !report || !injured) return;
  document.getElementById('lq-scar-upgrade')?.remove();
  const css = document.createElement('style');
  css.id = 'lq-scar-upgrade';
  css.textContent = `
    .lq-scar-area{margin:22px 0;padding:18px;border:2px solid #e2ccf5;border-radius:22px;background:linear-gradient(135deg,#f6eeff,#eafaff)}
    .lq-scar-heading{display:flex;align-items:center;gap:12px;margin-bottom:12px}
    .lq-scar-heading .lq-bubble{font-size:38px;background:#fff;border-radius:16px;padding:10px}
    .lq-scar-heading h3{margin:0;color:#6b44b0}
    .lq-scar-heading p{margin:4px 0 0}
    #show-scars.lq-scar-toggle{display:block;width:100%;border-radius:15px;background:#7754c8;color:white;border:0;padding:15px;font:inherit;font-weight:800;cursor:pointer}
    #show-scars.lq-scar-toggle:hover{background:#6440af}
    .lq-scar-status{margin-top:12px;padding:13px;background:white;border-radius:14px;border:2px solid #e6d6f7;line-height:1.5}
    .lq-scar-key{display:flex;gap:10px;align-items:center;margin-top:10px;font-size:.95rem}
    .lq-scar-swatch{height:19px;width:38px;flex:none;border-radius:6px;border:2px solid #c69b63;background:repeating-linear-gradient(45deg,#e6b56f 0 7px,#fff3ce 7px 14px)}
  `;
  document.head.append(css);
  const area = document.createElement('div');
  area.className = 'lq-scar-area';
  area.innerHTML = `<div class="lq-scar-heading"><div class="lq-bubble">🩹</div><div><h3>Scar Tissue Scanner</h3><p>What can repeated liver injury leave behind?</p></div></div><div class="lq-scar-status" id="lq-scar-status" role="status">🔍 Scanner ready. Reveal a <em>possible</em> change in affected tissue.</div><div class="lq-scar-key"><span class="lq-scar-swatch"></span><span>Yellow stripes = scar tissue (fibrosis)</span></div>`;
  button.parentNode.insertBefore(area,button);
  area.querySelector('.lq-scar-heading').after(button);
  button.classList.add('lq-scar-toggle');
  const marker = document.getElementById('scar-marker');
  // Existing site.js already installed the original toggle. Replace it so the
  // text and button state always match the actual tissue illustration.
  button.onclick = () => {
    if (!marker) return;
    const showing = marker.classList.toggle('visible');
    button.textContent = showing ? '🔄 HIDE SCAR TISSUE' : '🩹 REVEAL POSSIBLE SCAR TISSUE';
    button.setAttribute('aria-pressed',String(showing));
    document.getElementById('lq-scar-status').innerHTML = showing
      ? '✅ <strong>Scanner result:</strong> Yellow bands show scar tissue that <em>may</em> develop after repeated injury over time. It does not happen to everyone with hepatitis B.'
      : '🔍 Scanner ready. Reveal a <em>possible</em> change in affected tissue.';
  };
  button.setAttribute('aria-pressed',String(marker?.classList.contains('visible') || false));
})();

/* MISSION 5 — THE FINAL RESCUE: 10 DIFFERENT MINI-GAMES
   Paste at bottom of site.js, AFTER the tissue scanner block. */
(() => {
  if (!location.pathname.endsWith('finale.html')) return;
  const old = document.querySelector('.final-layout');
  if (!old) return;
  // Replace the original repeated five-question assessment and badge together.
  old.style.display = 'none';
  ['lq-final-rescue','liver-rescue-game','lq-rescue-10','lq-ultimate-rescue','lq-expert-arcade','lq-expert-2','lq-expert-3'].forEach(id => document.getElementById(id)?.remove());
  document.getElementById('lq-final-css')?.remove();
  const st = document.createElement('style');
  st.id = 'lq-final-css';
  st.textContent = `
    #lq-final-rescue{--plum:#623a9e;--pink:#f6b4d5;--mint:#41b995;color:#42375c;background:linear-gradient(145deg,#fff2fa,#eaf9ff);border:3px solid #d6b7ed;border-radius:28px;padding:clamp(14px,3vw,26px);margin:20px auto;max-width:1050px}
    #lq-final-rescue *{box-sizing:border-box}
    #lq-final-rescue h2,#lq-final-rescue h3{color:var(--plum);margin:8px 0 12px}
    .fr-header{text-align:center}.fr-tag{display:inline-block;background:#e8ddff;padding:7px 14px;border-radius:99px;font-weight:850;color:#5c3a99}
    .fr-board{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;font-weight:800;margin:20px 0 9px}
    .fr-track{height:15px;background:#e6d6f4;border-radius:99px;overflow:hidden}.fr-track div{height:100%;background:linear-gradient(90deg,#3ebd9a,#9161d3);transition:width .3s}
    .fr-hearts{letter-spacing:2px}.fr-panel{background:white;border:2px solid #e2ccef;border-radius:22px;padding:clamp(13px,3vw,22px);margin:17px 0}
    .fr-scene{background:linear-gradient(140deg,#eefaff,#fff1f8);border:2px solid #d9c3ee;border-radius:20px;padding:17px;margin:14px 0;text-align:center;min-height:150px}
    .fr-scene svg{display:block;width:100%;max-height:245px}
    .fr-scene.alert{background:#ffede8;border-color:#e08b80;animation:fr-shake .25s}
    .fr-scene.safe{background:#e3f9ed;border-color:#6ac69f}
    .fr-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:14px 0}
    .fr-option{background:#f8f3ff;border:2px solid #ccb3ea;border-radius:15px;padding:14px 9px;color:#56378e;font:inherit;font-weight:750;cursor:pointer;min-height:70px;overflow-wrap:anywhere}
    .fr-option:hover:not(:disabled){background:#eee3ff;transform:translateY(-1px)}
    .fr-option:disabled{cursor:default}.fr-option.correct{background:#dbf8e9;border-color:#38af87}.fr-option.wrong{background:#ffe0e2;border-color:#d97883}
    .fr-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:13px 0}
    .fr-main{background:#754ac0;color:white;border:0;border-radius:15px;font:inherit;font-weight:850;padding:15px 23px;cursor:pointer}.fr-main:disabled{opacity:.4;cursor:not-allowed}
    .fr-note{padding:13px 15px;background:#fff2d9;border:2px solid #ebd09f;border-radius:14px;line-height:1.5;min-height:55px}
    .fr-note.good{background:#e0faed;border-color:#7bcca8}
    .fr-dots{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;max-width:450px;margin:10px auto}
    .fr-dot{background:#f4afd2;border:3px solid #d37cab;border-radius:35%;aspect-ratio:1;display:grid;place-items:center;color:#9d56b4;font-size:24px;font-weight:900}
    .fr-dot.hurt{background:#ffc18b;border-color:#df8b55;color:#ba4751}.fr-dot.shield{background:#b8ecdc;border-color:#5bb69a}
    .fr-paper{display:inline-block;background:#fff9e9;padding:15px;border:2px dashed #c5ac85;border-radius:12px;text-align:left;line-height:1.8}
    .fr-code{font-weight:900;letter-spacing:2px;font-size:1.4rem;background:#f2e7ff;padding:12px;border-radius:12px}
    .fr-steps{display:flex;justify-content:center;gap:9px;flex-wrap:wrap}.fr-steps span{padding:9px;border-radius:12px;background:#f2e7ff;border:2px solid #d6bdea;font-weight:800}
    .fr-mission-label{font-size:.9rem;color:#655779}
    .fr-certificate{background:linear-gradient(145deg,#f9efff,#e1fff1);padding:22px;border:5px double #a888d7;border-radius:20px;text-align:center}
    @keyframes fr-shake{0%,100%{transform:translateX(0)}30%{transform:translateX(-6px)}70%{transform:translateX(6px)}}
    @media(max-width:640px){.fr-grid{grid-template-columns:1fr}.fr-option{min-height:52px}}
    @media(prefers-reduced-motion:reduce){#lq-final-rescue *{animation:none!important;transition:none!important}}
  `;
  document.head.append(st);
  const root=document.createElement('section');root.id='lq-final-rescue';old.after(root);
  const $=s=>root.querySelector(s), $$=s=>[...root.querySelectorAll(s)];
  let stage=0,stars=0,errors=0,solved=false;
  const titles=['Emergency Alert','Find the Impostor','Repair the Cell','Decode the Message','Block the Chain Reaction','Mystery Evidence','Science Escape Room',"Save the Liver's Jobs",'Rescue Decision','Final Boss: Virus Headquarters'];
  function scene(markup){$('#fr-scene').innerHTML=markup;}
  function note(t,good=false){const el=$('#fr-note');el.className='fr-note'+(good?' good':'');el.textContent=t;}
  function wrong(msg){if(solved)return;errors++;note('🔎 '+msg);$('#fr-scene').classList.remove('alert');void $('#fr-scene').offsetWidth;$('#fr-scene').classList.add('alert');}
  function success(msg){if(solved)return;solved=true;stars++;$('#fr-score').textContent='⭐ '+stars+'/10';$('#fr-next').disabled=false;$('#fr-scene').classList.remove('alert');$('#fr-scene').classList.add('safe');note('✅ '+msg,true);$$('.fr-option').forEach(b=>b.disabled=true);}
  function buttons(items,fn){$('#fr-controls').innerHTML='<div class="fr-grid">'+items.map((x,i)=>`<button type="button" class="fr-option" data-pick="${i}">${x}</button>`).join('')+'</div>';$$('[data-pick]').forEach(b=>b.onclick=()=>{if(!solved)fn(+b.dataset.pick,b);});}
  function question(items,correct,yes,hint,after){buttons(items,(i,b)=>{if(i===correct){b.classList.add('correct');if(after)after();success(yes);}else{b.classList.add('wrong');wrong(hint);}});}
  const tissue=(hurt=3)=>'<div class="fr-dots">'+Array.from({length:10},(_,i)=>`<div class="fr-dot ${i<hurt?'hurt':''}">${i<hurt?'×':'●'}</div>`).join('')+'</div>';
  const liverSvg=`<svg viewBox="0 0 500 230" role="img" aria-label="Liver city rescue scene"><rect width="500" height="230" rx="20" fill="#edfaff"/><path d="M108 90 Q136 22 286 53 Q390 70 400 111 Q367 141 270 155 Q216 208 137 173 Q103 157 108 90Z" fill="#db8b7b" stroke="#a45465" stroke-width="7"/><path d="M257 57 Q287 104 263 160" stroke="#ac5268" stroke-width="5" fill="none"/><circle cx="196" cy="108" r="8" fill="#5b355f"/><circle cx="232" cy="108" r="8" fill="#5b355f"/><path d="M195 135 Q212 145 235 135" stroke="#6a3b60" stroke-width="5" fill="none" stroke-linecap="round"/><text x="250" y="215" text-anchor="middle" font-size="20" fill="#623a9e" font-weight="bold">LIVER CITY RESCUE HQ</text></svg>`;
  function render(){solved=false;if(stage===10){finish();return;}root.innerHTML=`<div class="fr-header"><span class="fr-tag">🛡️ MISSION 5 · FINAL RESCUE</span><h2>🚨 Save Liver City!</h2><p>Ten different missions. Solve mysteries, repair problems, and unlock the Science Defender badge.</p></div><div class="fr-board"><span>LEVEL ${stage+1} / 10</span><span id="fr-score">⭐ ${stars}/10</span><span class="fr-hearts">🏙️ RESCUE ACTIVE</span></div><div class="fr-track"><div style="width:${stage*10}%"></div></div><div class="fr-panel"><p class="fr-mission-label">🗺️ NEW CHALLENGE UNLOCKED</p><h3>${titles[stage]}</h3><div id="fr-scene" class="fr-scene"></div><div id="fr-controls"></div><p id="fr-note" class="fr-note" role="status" aria-live="polite">🔍 Follow the mission instructions.</p></div><button id="fr-next" class="fr-main" disabled>${stage===9?'CLAIM MY BADGE 🏆':'UNLOCK NEXT LEVEL →'}</button><p class="fr-mission-label" style="text-align:center">You can retry any challenge. Incorrect answers only cost a try, not a life.</p>`;$('#fr-next').onclick=()=>{stage++;render();};games[stage]();}
  // 1: a fresh detective task rather than another organelle or tissue quiz.
  function emergency(){scene(`${liverSvg}<p><strong>Emergency:</strong> Liver City has received three reports. Which clue points most directly to hepatitis B?</p>`);question(['A laboratory test detects HBV','Someone has a headache','The person feels tired'],0,'Case identified! A test for HBV is the clearest clue.','Feeling tired or having a headache does not specifically identify hepatitis B.',()=>scene(`${liverSvg}<p>📁 CASE FILE: HBV DETECTED ✅</p>`));}
  // 2: spot the one scientific error in a report.
  function impostor(){scene(`<div class="fr-paper"><strong>SCIENTIST'S NOTES</strong><p>✅ Hepatitis B affects the liver.</p><p>✅ Some infected people feel completely fine.</p><p>❓ Hepatitis B always causes immediate symptoms.</p></div><p>Which statement must be corrected?</p>`);question(['The first statement','The second statement','The third statement'],2,'Report repaired! Infection can occur without symptoms.','One of these statements says “always,” but symptoms vary.',()=>scene('<div class="fr-paper">📋 REPORT CORRECTED ✅<p>Some infected people have no symptoms.</p></div>'));}
  // 3: choose a plan based on symptoms and organ needs, not match definitions.
  function repair(){scene('<div style="font-size:65px">🏭 ⚡ 📦</div><h3>Energy shortage!</h3><p>A liver cell needs energy to keep doing its jobs. Which repair plan makes sense?</p><div class="fr-track"><div style="width:18%;background:#e28977"></div></div>');question(['Help mitochondria supply usable energy','Replace the cell membrane with DNA','Tell ribosomes to store all the cell’s energy'],0,'The power is back! Mitochondria help provide usable energy.','The repair must address the energy shortage.',()=>scene('<div style="font-size:65px">⚡🏭✅</div><h3>Power restored</h3><div class="fr-track"><div style="width:100%"></div></div>'));}
  // 4: decode a short cipher using visible key, not memorized biology.
  function decode(){scene('<div style="font-size:52px">📡 🔐</div><p>A message from the cell is scrambled. Use the key to decode it.</p><div class="fr-code">3 - 1 - 2</div><p>KEY: 1 = CELL &nbsp; 2 = VIRUS &nbsp; 3 = LIVER</p><p>What is the decoded message?</p>');question(['LIVER · CELL · VIRUS','CELL · VIRUS · LIVER','VIRUS · LIVER · CELL'],0,'Signal decoded! HBV targets liver cells.','Read the numbered key one number at a time.',()=>scene('<div style="font-size:56px">📡 ✅</div><h3>MESSAGE: LIVER · CELL · VIRUS</h3>'));}
  // 5: pick missing causal step; not replaying the invasion chronology.
  function chain(){scene('<div class="fr-steps"><span>🦠 Infected cells</span><span>❓ Missing link</span><span>🩹 Possible tissue injury</span></div><p>What belongs in the middle of the chain?</p>');question(['The immune system responds to infected cells','The liver suddenly becomes a bone','All cells immediately turn into viruses'],0,'Chain repaired! The immune response may injure infected liver cells.','Remember what the body does when infected cells are detected.',()=>scene('<div class="fr-steps"><span>🦠 Infection</span><span>🛡️ Immune response</span><span>🩹 Possible injury</span></div>'));}
  // 6: distinguish observation from assertion without calculus or multi-select.
  function evidence(){scene(`${tissue(4)}<p><strong>Mystery file:</strong> An illustration shows four injured cells. A researcher says, “This proves hepatitis B caused it.”</p><p>What evidence is missing?</p>`);question(['A specific test for HBV','The number of pink cells','A brighter drawing'],0,'Good thinking! Appearance alone cannot confirm hepatitis B.','Cell injury has different possible causes.',()=>scene(`${tissue(4)}<p>🧪 Additional test required ✅</p>`));}
  // 7: genuinely interactive combination lock: choose symbol sequence using hints.
  function escape(){const pass=['🧫','🫀','🧍'];let pos=0;function draw(){scene(`<div style="font-size:57px">🔒 🚪</div><p><strong>Escape room:</strong> Unlock the door by selecting the order of the three clues.</p><p>Clue: Small cell → whole organ → whole person.</p><div class="fr-code">${pass.map((x,i)=>i<pos?x:'▢').join('  ')}</div>`);buttons(['🧍 Person','🧫 Cell','🫀 Liver'],(i,b)=>{const sym=['🧍','🧫','🫀'][i];if(sym===pass[pos]){pos++;if(pos===3){scene('<div style="font-size:65px">🚪🔓🎉</div><h3>Door unlocked!</h3><p>Cell → Organ → Person</p>');success('You found the correct scale, smallest to largest.');}else{draw();note('✅ Correct symbol. Keep going!',true);}}else{b.classList.add('wrong');wrong('Think about which is smaller: a cell, an organ, or a person.');}});}draw();}
  // 8: function use-case, not generic liver-identity question.
  function liverJob(){scene(`<div style="font-size:58px">🍕 → 🫀 → ?</div><p>The kitchen needs help understanding how the liver supports digestion. Which delivery belongs on the route?</p>`);question(['Bile, which helps digest fats','Oxygen, pumped by the heart','Nerve signals from the brain'],0,'Correct! The liver makes bile that helps digest fats.','Choose a substance the liver makes to help digestion.',()=>scene('<div style="font-size:65px">🫀 ➜ 💧 ➜ 🍕 ✅</div><p>Bile delivered!</p>'));}
  // 9: reconcile two clues and prevent stigma.
  function decision(){scene('<div class="fr-grid"><div class="fr-paper">🧪 TEST: HBV positive</div><div class="fr-paper">🙂 FEELING: fine</div><div class="fr-paper">🤔 CONFLICT?</div></div><p>A student feels fine, but a health professional confirms an HBV infection. What should the rescue team conclude?</p>');question(['The test must be wrong','Infection is possible without symptoms','The student is unsafe to sit beside'],1,'Mystery solved! Infection can exist without symptoms, and casual contact is safe.','You already learned that not everyone with HBV feels sick.',()=>scene('<div style="font-size:65px">🧪 ✅ 🤝</div><p>Two clues can both be true.</p>'));}
  // 10: three decisions in a new final boss encounter.
  function boss(){const rounds=[{t:'An alarm says the virus has reached liver cells. What can it use to make viral proteins?',a:['Ribosomes','Bones','Red blood cells'],c:0,h:'Think about protein factories inside a cell.'},{t:'An immune alarm sounds. What might happen to infected cells?',a:['They may be injured','They grow extra organs','All instantly disappear'],c:0,h:'Immune defenses can cause inflammation and injury.'},{t:'Repeated injury has affected tissue. What is one possible long-term result?',a:['Scar tissue','New brain cells','A second liver'],c:0,h:'Think about the scarring shown in the Tissue Time Machine.'}];let r=0;function draw(){const q=rounds[r];scene(`<div style="font-size:58px">🦠 ⚔️ 🛡️</div><h3>FINAL BOSS · ROUND ${r+1}/3</h3><p>${q.t}</p><div class="fr-steps">${rounds.map((_,i)=>`<span>${i<r?'✅':'🔒'} ${i+1}</span>`).join('')}</div>`);buttons(q.a,(i,b)=>{if(i!==q.c){b.classList.add('wrong');wrong(q.h);return;}r++;if(r===3){scene('<div style="font-size:75px">🏙️ 🛡️ 🏆</div><h3>LIVER CITY RESCUED!</h3><p>You connected infection, the immune response, and possible scarring.</p>');success('You defeated the final boss with science!');}else{draw();note('✅ Barrier cleared! One more science lock ahead.',true);}});}draw();}
  const games=[emergency,impostor,repair,decode,chain,evidence,escape,liverJob,decision,boss];
  function finish(){root.innerHTML=`<div class="fr-certificate"><div style="font-size:75px">🏆🫀✨</div><span class="fr-tag">LIVERQUEST COMPLETED</span><h2>SCIENCE DEFENDER</h2><p>You rescued Liver City by applying what you learned!</p><h3>⭐ ${stars}/10 missions finished</h3><p>Tries that taught you something: ${errors}</p><p>🧫 Cells → 🧩 Tissues → 🫀 Liver → 🧍 Body</p><button class="fr-main" id="fr-again">PLAY AGAIN ↺</button> <a class="fr-main" href="index.html" style="display:inline-block;text-decoration:none;margin-top:10px">MISSION MAP →</a></div>`;$('#fr-again').onclick=()=>{stage=0;stars=0;errors=0;render();};try{if(typeof saveMission==='function')saveMission('finale');}catch(e){}}
  render();
})();

/* =====================================================
   CELL CITY — MOVE COMPLETE MISSION TO THE VERY BOTTOM
   Paste at the END of site.js
   ===================================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "cells.html") return;

  const completeButton = document.getElementById("cell-next");

  if (!completeButton) return;

  // Find the main page content.
  const main = document.querySelector("main");
  if (!main) return;

  // Remove a previous mission footer if this code was added twice.
  document.getElementById("cell-city-mission-footer")?.remove();

  // Create the new ending section.
  const footer = document.createElement("section");
  footer.id = "cell-city-mission-footer";

  footer.innerHTML = `
    <div class="cell-city-ending-icon">🏆 🧫 ✨</div>

    <h2>Cell City Mission Complete!</h2>

    <p>
      You've explored the structures inside a liver cell
      and learned how its different parts work together.
    </p>

    <p class="cell-city-ending-status" id="cell-city-ending-status">
      Finish the required activity to unlock the next mission.
    </p>

    <div id="cell-city-button-home"></div>
  `;

  // Put the ending after all other Cell City content.
  main.appendChild(footer);

  // MOVE the original button, preserving its existing click handler.
  document.getElementById("cell-city-button-home")
    .appendChild(completeButton);

  // Ensure it can be seen clearly.
  completeButton.style.display = "inline-block";
  completeButton.style.margin = "12px auto 0";

  // Add styles.
  document.getElementById("cell-city-ending-style")?.remove();

  const style = document.createElement("style");
  style.id = "cell-city-ending-style";

  style.textContent = `
    #cell-city-mission-footer {
      margin:32px 0 10px;
      padding:30px 20px;
      border:3px solid #d7b8ee;
      border-radius:26px;
      background:linear-gradient(135deg,#f8edff,#e7fbf3);
      text-align:center;
      color:#514167;
    }

    #cell-city-mission-footer h2 {
      color:#6c43ac;
      margin:12px 0;
      font-size:clamp(1.5rem,4vw,2rem);
    }

    .cell-city-ending-icon {
      font-size:52px;
    }

    #cell-city-mission-footer p {
      max-width:620px;
      margin:12px auto;
      line-height:1.6;
    }

    .cell-city-ending-status {
      color:#73518f;
      font-weight:700;
    }

    #cell-city-mission-footer #cell-next {
      padding:17px 28px;
      font-size:1.05rem;
      border-radius:15px;
    }

    #cell-city-mission-footer #cell-next:disabled {
      opacity:.5;
      cursor:not-allowed;
    }
  `;

  document.head.appendChild(style);

  // Update the text when the button unlocks.
  const status = document.getElementById("cell-city-ending-status");

  function updateStatus() {
    if (completeButton.disabled) {
      status.textContent =
        "🔒 Finish the required activity to unlock Mission 2.";
    } else {
      status.textContent =
        "✅ You're ready! Continue to Virus Invasion.";
    }
  }

  const observer = new MutationObserver(updateStatus);
  observer.observe(completeButton, {
    attributes:true,
    attributeFilter:["disabled"]
  });

  updateStatus();
})();

/* ==========================================================
   LIVERQUEST — MISSION 3 + 4 LAYOUT IMPROVEMENTS

   1. Rescue Lab: Clear slider instruction
   2. Tissue Detective: Compact legend
   3. Scar Tissue Scanner: Move under affected diagram
   4. Detective Question: Clarify and move near diagrams

   PASTE ONCE AT THE VERY BOTTOM OF site.js
   ========================================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";

  if (page !== "microscope.html" && page !== "lab.html") return;

  const style = document.createElement("style");
  style.id = "lq-layout-updates";

  document.getElementById("lq-layout-updates")?.remove();

  style.textContent = `

    /* ===================================
       MISSION 4: SLIDER INSTRUCTIONS
       =================================== */

    .lq-slide-instruction {
      background:linear-gradient(135deg,#fff0d5,#fff8ea);
      border:2px solid #efc477;
      border-radius:17px;
      padding:15px 18px;
      margin:16px 0;
      text-align:center;
    }

    .lq-slide-instruction strong {
      display:block;
      color:#8c5d26;
      font-size:1.07rem;
      line-height:1.5;
    }

    .lq-slide-arrow {
      color:#915cc3;
      font-size:27px;
      font-weight:900;
      letter-spacing:3px;
      margin-top:6px;
    }

    #damage {
      width:100%;
      accent-color:#8754c8;
      cursor:pointer;
      margin:13px 0;
    }

    /* ===================================
       MISSION 3: COMPACT LEGEND
       =================================== */

    .tissue-legend {
      max-width:660px !important;
      width:100%;
      margin:18px auto !important;
      padding:15px !important;
      border-radius:19px !important;
    }

    .tissue-legend h3 {
      margin:0 0 7px;
      font-size:1.12rem;
    }

    .tissue-legend > p {
      margin:0 0 12px;
      font-size:.92rem;
    }

    .tissue-legend-grid {
      display:grid !important;
      grid-template-columns:repeat(2,minmax(0,1fr)) !important;
      gap:8px 12px !important;
    }

    .tissue-legend .legend-item {
      display:flex;
      gap:9px;
      align-items:center;
      padding:9px !important;
      border-radius:12px;
      min-width:0;
    }

    .tissue-legend .legend-item strong {
      font-size:.91rem;
      line-height:1.35;
    }

    .tissue-legend .legend-item p {
      margin:3px 0 0;
      font-size:.82rem;
      line-height:1.35;
    }

    .tissue-legend .legend-symbol {
      flex-shrink:0;
    }

    /* ===================================
       MISSION 3: SCANNER UNDER DIAGRAM
       =================================== */

    .kid-tissue-card .lq-scar-area {
      margin:13px 0 0;
      padding:12px;
      border-radius:16px;
    }

    .kid-tissue-card .lq-scar-heading {
      margin-bottom:8px;
      gap:8px;
    }

    .kid-tissue-card .lq-scar-heading h3 {
      font-size:1.04rem;
    }

    .kid-tissue-card .lq-scar-heading p {
      font-size:.86rem;
      line-height:1.35;
    }

    .kid-tissue-card .lq-scar-heading .lq-bubble {
      font-size:25px;
      padding:6px;
      border-radius:10px;
    }

    .kid-tissue-card #show-scars {
      width:100%;
      padding:12px;
      font-size:.93rem;
    }

    .kid-tissue-card .lq-scar-status {
      padding:10px;
      font-size:.85rem;
    }

    .kid-tissue-card .lq-scar-key {
      font-size:.82rem;
      line-height:1.35;
    }

    .lq-diagram-highlight {
      outline:4px solid #ebc16b;
      outline-offset:4px;
      border-radius:15px;
    }

    /* ===================================
       MISSION 3: DETECTIVE QUESTION
       =================================== */

    .lq-detective-question {
      max-width:750px;
      margin:20px auto !important;
      padding:20px;
      border:2px solid #d5bdf0;
      border-radius:20px;
      background:linear-gradient(135deg,#f7eeff,#effaff);
      text-align:center;
    }

    .lq-detective-question h3 {
      color:#6843aa;
      margin:0 0 10px;
    }

    .lq-detective-question .lq-question-description {
      max-width:570px;
      margin:0 auto 15px;
      line-height:1.55;
    }

    .lq-detective-question .answer-row {
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
      gap:12px;
    }

    .lq-detective-question #tissue-feedback {
      margin:13px 0 0;
      font-weight:700;
    }

    @media(max-width:540px) {
      .tissue-legend-grid {
        grid-template-columns:1fr !important;
      }

      .tissue-legend {
        max-width:100% !important;
      }
    }
  `;

  document.head.appendChild(style);

  /* ===============================================
     MISSION 4 — THE RESCUE LAB
     =============================================== */

  if (page === "lab.html") {
    const slider = document.getElementById("damage");

    if (slider) {
      const existing = document.getElementById("lq-slide-guide");

      if (!existing) {
        const guide = document.createElement("div");
        guide.id = "lq-slide-guide";
        guide.className = "lq-slide-instruction";

        guide.innerHTML = `
          <strong>
            👆 Slide to the RIGHT to see how ongoing
            hepatitis B-related liver injury may
            change liver tissue!
          </strong>
          <div class="lq-slide-arrow" aria-hidden="true">
            ━━━━━━━ ➜
          </div>
        `;

        slider.insertAdjacentElement("beforebegin", guide);
      }

      slider.setAttribute(
        "aria-label",
        "Move right to explore increasing levels of liver injury"
      );
    }

    return;
  }

  /* ===============================================
     MISSION 3 — TISSUE DETECTIVE
     =============================================== */

  // Move the existing scanner directly under the
  // AFFECTED TISSUE diagram.

  const injuredDiagram = document.getElementById("injured-tissue");
  const affectedCard = injuredDiagram?.closest(".kid-tissue-card");
  const scanner = document.querySelector(".lq-scar-area");
  const scarButton = document.getElementById("show-scars");

  if (affectedCard && injuredDiagram && scarButton) {
    let scannerToMove = scanner;

    // If the previous scanner upgrade is missing,
    // make a simple matching wrapper.
    if (!scannerToMove) {
      scannerToMove = document.createElement("div");
      scannerToMove.className = "lq-scar-area";

      scannerToMove.innerHTML = `
        <div class="lq-scar-heading">
          <div class="lq-bubble">🩹</div>
          <div>
            <h3>Scar Tissue Scanner</h3>
            <p>Reveal possible scarring in the diagram above.</p>
          </div>
        </div>
      `;

      scannerToMove.appendChild(scarButton);
    }

    // If the scanner already exists, clarify its instruction.
    const scannerDescription =
      scannerToMove.querySelector(".lq-scar-heading p");

    if (scannerDescription) {
      scannerDescription.textContent =
        "Tap below to show possible scar tissue in the Affected Tissue diagram above.";
    }

    // Move the ORIGINAL scanner, not a duplicate.
    // This preserves the previous click handler.
    injuredDiagram.insertAdjacentElement("afterend", scannerToMove);

    // Add a visual highlight while scar tissue is visible.
    scarButton.addEventListener("click", function () {
      const marker = document.getElementById("scar-marker");
      const visible = marker?.classList.contains("visible");

      injuredDiagram.classList.toggle(
        "lq-diagram-highlight",
        Boolean(visible)
      );
    });
  }

  /* ===============================================
     MOVE AND CLARIFY THE DETECTIVE QUESTION
     =============================================== */

  const choices = document.querySelector(
    '.answer-row:has([data-tissue-choice])'
  );

  const tissueGrid = document.querySelector(".kid-tissue-grid");

  if (choices && tissueGrid) {
    // Find the existing heading and question.
    const answerContainer = choices.parentElement;

    const headings = [...answerContainer.querySelectorAll("h3")];

    const detectiveHeading = headings.find(h =>
      /detective question/i.test(h.textContent)
    );

    if (detectiveHeading) {
      const questionParagraph = detectiveHeading.nextElementSibling;
      const feedback = document.getElementById("tissue-feedback");

      const box = document.createElement("div");
      box.className = "lq-detective-question";

      // Move existing elements. Their click handlers stay active.
      box.appendChild(detectiveHeading);

      if (questionParagraph?.tagName === "P") {
        box.appendChild(questionParagraph);
        questionParagraph.classList.add("lq-question-description");

        questionParagraph.innerHTML = `
          🔬 Look at the <strong>two tissue diagrams above</strong>.
          Which one contains <strong>orange injured liver cells</strong>
          AND <strong>blue immune defenders</strong>?
        `;
      }

      box.appendChild(choices);

      if (feedback) {
        box.appendChild(feedback);
      }

      choices.querySelectorAll("[data-tissue-choice]").forEach(button => {
        const kind = button.dataset.tissueChoice;

        button.textContent =
          kind === "healthy"
            ? "😊 Healthy-Looking Tissue"
            : "🩹 Affected Tissue";
      });

      // Place it immediately after the two diagrams,
      // before the bonus activities farther down the page.
      tissueGrid.insertAdjacentElement("afterend", box);

      detectiveHeading.textContent =
        "🎯 Detective Check: Compare the Two Diagrams";
    }
  }
})();

/* ========================================================
   LIVERQUEST — FINAL RESCUE + TISSUE DETECTIVE FIXES

   1. Replace Final Rescue levels 2 and 4
   2. Move colour guide above tissue diagrams
   3. Move investigation results beside their buttons
   4. Reposition scar scanner neatly

   PASTE ONCE AT THE VERY BOTTOM OF site.js
   ======================================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";

  const css = document.createElement("style");
  css.id = "lq-oct-layout-fixes";
  document.getElementById(css.id)?.remove();

  css.textContent = `
    /* ---------- TISSUE DETECTIVE ---------- */

    .lq-top-guide {
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      align-items:center;
      gap:9px;
      max-width:820px;
      margin:14px auto 20px;
      padding:12px;
      background:#f5efff;
      border:2px solid #ddc9f2;
      border-radius:17px;
    }

    .lq-guide-label {
      flex-basis:100%;
      text-align:center;
      color:#6745a6;
      font-weight:850;
      margin-bottom:3px;
    }

    .lq-guide-item {
      display:flex;
      align-items:center;
      gap:7px;
      padding:7px 10px;
      border:1px solid #e4d8ef;
      background:white;
      border-radius:12px;
      font-size:.88rem;
      font-weight:700;
    }

    .lq-guide-swatch {
      width:20px;
      height:20px;
      flex:none;
      border-radius:7px;
      border:2px solid #ca83a9;
      background:#f6aece;
    }

    .lq-guide-swatch.nucleus {
      background:#945bb9;
      border-color:#7442a7;
      border-radius:50%;
    }

    .lq-guide-swatch.injured {
      background:#ffbf83;
      border-color:#d78a50;
      color:#ba384a;
      display:grid;
      place-items:center;
      font-weight:900;
    }

    .lq-guide-swatch.immune {
      background:#a8dff8;
      border-color:#529acb;
      border-radius:50%;
      color:#2476ab;
      display:grid;
      place-items:center;
      font-weight:900;
    }

    .lq-guide-swatch.scar {
      background:repeating-linear-gradient(
        45deg,#e5ba77 0 5px,#fff2cb 5px 10px
      );
      border-color:#c79f5d;
    }

    .lq-local-feedback {
      margin:11px 0 0;
      padding:12px 13px;
      border:2px solid #95d2bd;
      border-radius:13px;
      background:#e7faf0;
      color:#44566a;
      line-height:1.5;
      font-size:.94rem;
    }

    .kid-tissue-card .lq-scar-area {
      margin:12px 0;
      padding:12px;
      background:linear-gradient(135deg,#f2eaff,#fff8e9);
      border:2px solid #dcc5f0;
      border-radius:16px;
    }

    .kid-tissue-card .lq-scar-heading {
      margin:0 0 8px;
    }

    .kid-tissue-card .lq-scar-heading .lq-bubble {
      font-size:25px;
      padding:5px;
    }

    .kid-tissue-card .lq-scar-heading h3 {
      font-size:1.02rem;
      margin:0;
    }

    .kid-tissue-card .lq-scar-heading p {
      font-size:.86rem;
      margin:4px 0;
    }

    .kid-tissue-card #show-scars {
      padding:11px 12px;
      font-size:.9rem;
      width:100%;
    }

    .kid-tissue-card .lq-scar-status {
      margin-top:9px;
      padding:9px;
      font-size:.86rem;
    }

    .kid-tissue-card .lq-scar-key {
      display:none;
    }

    /* ---------- NEW FINAL RESCUE PUZZLES ---------- */

    .lq-puzzle-box {
      background:#f8f3ff;
      border:2px solid #d5bced;
      border-radius:17px;
      padding:17px;
      margin:12px 0;
    }

    .lq-puzzle-line {
      background:white;
      padding:12px;
      border:2px solid #e4d7f1;
      border-radius:12px;
      margin:9px 0;
    }

    .lq-puzzle-line strong {
      color:#6540a5;
    }

    .lq-puzzle-key {
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      gap:8px;
      margin:13px 0;
    }

    .lq-puzzle-key span {
      padding:9px 13px;
      background:#e8dfff;
      border:2px solid #c9b2e9;
      border-radius:12px;
      font-weight:850;
    }

    .lq-puzzle-slots {
      display:flex;
      justify-content:center;
      gap:9px;
      flex-wrap:wrap;
      margin:15px 0;
    }

    .lq-puzzle-slot {
      min-width:75px;
      padding:13px 10px;
      background:white;
      border:2px dashed #ae8dd3;
      border-radius:12px;
      font-weight:850;
      text-align:center;
    }

    .lq-puzzle-actions {
      display:flex;
      flex-wrap:wrap;
      gap:9px;
      justify-content:center;
      margin-top:14px;
    }

    .lq-puzzle-actions button {
      border:2px solid #c6abea;
      background:white;
      color:#5d3998;
      padding:12px 15px;
      border-radius:12px;
      cursor:pointer;
      font:inherit;
      font-weight:800;
    }

    .lq-puzzle-actions button:hover {
      background:#f0e6ff;
    }

    .lq-puzzle-actions button:disabled {
      opacity:.5;
      cursor:default;
    }

    @media(max-width:570px) {
      .lq-top-guide {
        justify-content:flex-start;
      }

      .lq-guide-item {
        font-size:.8rem;
      }
    }
  `;

  document.head.appendChild(css);

  /* =====================================================
     PART A — TISSUE DETECTIVE
     ===================================================== */

  if (page === "microscope.html") {
    const grid = document.querySelector(".kid-tissue-grid");
    const healthy = document.getElementById("healthy-tissue");
    const injured = document.getElementById("injured-tissue");

    if (!grid || !healthy || !injured) return;

    // Remove the previous large colour legend.
    document.querySelectorAll(".tissue-legend").forEach(el => el.remove());

    // Put a slim colour key directly above the two diagrams.
    document.getElementById("lq-top-guide")?.remove();

    const guide = document.createElement("div");
    guide.id = "lq-top-guide";
    guide.className = "lq-top-guide";

    guide.innerHTML = `
      <div class="lq-guide-label">🎨 DIAGRAM COLOUR GUIDE</div>

      <div class="lq-guide-item">
        <span class="lq-guide-swatch"></span>
        Pink = Liver cell
      </div>

      <div class="lq-guide-item">
        <span class="lq-guide-swatch nucleus"></span>
        Purple = Nucleus
      </div>

      <div class="lq-guide-item">
        <span class="lq-guide-swatch injured">×</span>
        Orange = Injured cell
      </div>

      <div class="lq-guide-item">
        <span class="lq-guide-swatch immune">+</span>
        Blue = Immune defender
      </div>

      <div class="lq-guide-item">
        <span class="lq-guide-swatch scar"></span>
        Yellow stripes = Scar tissue
      </div>
    `;

    grid.before(guide);

    // Each investigation button now displays its result locally,
    // rather than in a box far down the page.
    const originalReport = document.getElementById("tissue-report");

    document.querySelectorAll("[data-examine]").forEach(button => {
      const type = button.dataset.examine;

      let feedbackBox = button.parentElement.querySelector(
        ".lq-local-feedback"
      );

      if (!feedbackBox) {
        feedbackBox = document.createElement("div");
        feedbackBox.className = "lq-local-feedback";
        feedbackBox.hidden = true;
        feedbackBox.setAttribute("role", "status");
        button.insertAdjacentElement("afterend",feedbackBox);
      }

      button.addEventListener("click", () => {
        const message = type === "healthy"
          ? "✅ Healthy-looking tissue: The pink shapes represent liver cells. The purple dots represent their nuclei."
          : "🔬 Affected tissue: Orange cells represent injury. Blue immune defenders are responding nearby.";

        feedbackBox.textContent = message;
        feedbackBox.hidden = false;

        // Hide the old distant message.
        if (originalReport) {
          originalReport.style.display = "none";
        }
      });
    });

    if (originalReport) {
      originalReport.style.display = "none";
    }

    // Move the scar scanner ABOVE the affected tissue image.
    // This makes it clear which diagram will change.
    const affectedCard = injured.closest(".kid-tissue-card");
    const button = document.getElementById("show-scars");
    let scanner = document.querySelector(".lq-scar-area");

    if (affectedCard && button) {
      if (!scanner) {
        scanner = document.createElement("div");
        scanner.className = "lq-scar-area";

        scanner.innerHTML = `
          <div class="lq-scar-heading">
            <div class="lq-bubble">🩹</div>
            <div>
              <h3>Scar Tissue Scanner</h3>
              <p>Reveal possible scar tissue below.</p>
            </div>
          </div>
        `;

        scanner.appendChild(button);
      }

      const description = scanner.querySelector(
        ".lq-scar-heading p"
      );

      if (description) {
        description.textContent =
          "Press the button to reveal possible scarring in the diagram directly below.";
      }

      injured.before(scanner);

      // Keep the original scanner click action intact.
      // If the original update adds a highlighted outline,
      // the diagram will still update in place.
    }

    return;
  }

  /* =====================================================
     PART B — FINAL RESCUE: LEVELS 2 AND 4

     Replaces the visible controls for these two levels.
     Uses the existing game's original success mechanism,
     so stars and NEXT LEVEL still work.
     ===================================================== */

  if (page !== "finale.html") return;

  const game = document.getElementById("lq-final-rescue");
  if (!game) return;

  let busy = false;

  function upgradeLevel() {
    if (busy) return;

    const title = game.querySelector(".fr-panel h3");
    const scene = game.querySelector("#fr-scene");
    const controls = game.querySelector("#fr-controls");
    const next = game.querySelector("#fr-next");

    if (!title || !scene || !controls || !next) return;

    const levelName = title.textContent.trim();

    /* -----------------------------------------
       LEVEL 2 — SCIENTIST'S REPORT
       ----------------------------------------- */

    if (
      levelName === "Find the Impostor" &&
      !controls.dataset.lqUpgraded
    ) {
      busy = true;

      // Preserve original correct-answer action for scoring.
      const originalCorrect = controls.querySelector(
        '[data-pick="2"]'
      );

      controls.dataset.lqUpgraded = "2";

      scene.innerHTML = `
        <div class="lq-puzzle-box">
          <div style="font-size:52px">🕵️ 📋</div>

          <h3>Scientist's Report: Find the Mistake</h3>

          <p>
            A scientist wrote three notes about hepatitis B.
            One note contains a mistake.
          </p>

          <div class="lq-puzzle-line">
            <strong>Note A:</strong>
            Hepatitis B mainly affects liver cells.
          </div>

          <div class="lq-puzzle-line">
            <strong>Note B:</strong>
            A person can have hepatitis B without feeling sick.
          </div>

          <div class="lq-puzzle-line">
            <strong>Note C:</strong>
            If someone feels healthy, they cannot have hepatitis B.
          </div>

          <p><strong>Step 1:</strong> Which note is incorrect?</p>
        </div>
      `;

      controls.innerHTML = `
        <div class="lq-puzzle-actions" id="lq-report-choices">
          <button type="button" data-note="A">Note A</button>
          <button type="button" data-note="B">Note B</button>
          <button type="button" data-note="C">Note C</button>
        </div>
        <div id="lq-report-step2" hidden></div>
      `;

      const feedback = game.querySelector("#fr-note");

      controls.querySelectorAll("[data-note]").forEach(button => {
        button.onclick = () => {
          const selected = button.dataset.note;

          if (selected !== "C") {
            feedback.textContent =
              "🔎 That note is scientifically correct. Look for a statement that contradicts what you learned about symptoms.";
            return;
          }

          controls.querySelector("#lq-report-choices").hidden = true;

          const step2 = controls.querySelector(
            "#lq-report-step2"
          );

          step2.hidden = false;
          step2.innerHTML = `
            <h3>Step 2: Correct the mistake</h3>

            <p>Which replacement sentence should the scientist write?</p>

            <div class="lq-puzzle-actions">
              <button type="button" data-fix="0">
                Everyone with hepatitis B feels sick immediately.
              </button>

              <button type="button" data-fix="1">
                People may have hepatitis B even without symptoms.
              </button>

              <button type="button" data-fix="2">
                The virus only affects people who feel tired.
              </button>
            </div>
          `;

          feedback.textContent =
            "✅ You found the incorrect note. Now fix the report.";

          step2.querySelectorAll("[data-fix]").forEach(fix => {
            fix.onclick = () => {
              if (fix.dataset.fix !== "1") {
                feedback.textContent =
                  "🔎 That replacement is still incorrect. Can infection happen without symptoms?";
                return;
              }

              if (originalCorrect) {
                originalCorrect.click();
              }
            };
          });
        };
      });

      busy = false;
      return;
    }

    /* -----------------------------------------
       LEVEL 4 — SECRET VIRUS CODE
       ----------------------------------------- */

    if (
      levelName === "Decode the Message" &&
      !controls.dataset.lqUpgraded
    ) {
      busy = true;

      const originalCorrect = controls.querySelector(
        '[data-pick="0"]'
      );

      controls.dataset.lqUpgraded = "4";

      const code = [3,1,4,2];
      const words = {
        1:"LIVER",
        2:"PROTEINS",
        3:"VIRUS",
        4:"USES"
      };

      let selected = [];

      scene.innerHTML = `
        <div class="lq-puzzle-box">
          <div style="font-size:54px">📡 🔐 🧬</div>

          <h3>Secret Transmission from Cell City!</h3>

          <p>
            Decode the message to discover what the
            hepatitis B virus does inside a liver cell.
          </p>

          <div class="lq-puzzle-key">
            <span>1 = LIVER</span>
            <span>2 = PROTEINS</span>
            <span>3 = VIRUS</span>
            <span>4 = USES</span>
          </div>

          <p><strong>Secret code:</strong></p>
          <div class="fr-code">3 — 1 — 4 — 2</div>

          <p>
            Tap the words in the correct order to decode
            the transmission.
          </p>

          <div class="lq-puzzle-slots" id="lq-code-slots">
            <span class="lq-puzzle-slot">?</span>
            <span class="lq-puzzle-slot">?</span>
            <span class="lq-puzzle-slot">?</span>
            <span class="lq-puzzle-slot">?</span>
          </div>
        </div>
      `;

      controls.innerHTML = `
        <div class="lq-puzzle-actions" id="lq-code-words">
          <button type="button" data-word="1">LIVER</button>
          <button type="button" data-word="2">PROTEINS</button>
          <button type="button" data-word="3">VIRUS</button>
          <button type="button" data-word="4">USES</button>
        </div>

        <div class="lq-puzzle-actions">
          <button type="button" id="lq-code-reset">
            ↺ RESET CODE
          </button>
        </div>

        <div id="lq-code-meaning" hidden></div>
      `;

      const feedback = game.querySelector("#fr-note");

      function drawSlots() {
        scene.querySelector("#lq-code-slots").innerHTML =
          Array.from({length:4},(_,i) => `
            <span class="lq-puzzle-slot">
              ${selected[i] ? words[selected[i]] : "?"}
            </span>
          `).join("");
      }

      controls.querySelectorAll("[data-word]").forEach(button => {
        button.onclick = () => {
          const n = Number(button.dataset.word);

          if (selected.includes(n) || selected.length >= 4) return;

          selected.push(n);
          button.disabled = true;
          drawSlots();

          if (selected.length !== 4) return;

          if (selected.every((n,i)=>n===code[i])) {
            controls.querySelector("#lq-code-words").hidden = true;

            const meaning = controls.querySelector(
              "#lq-code-meaning"
            );

            meaning.hidden = false;
            meaning.innerHTML = `
              <h3>✅ Transmission decoded!</h3>
              <p><strong>VIRUS LIVER USES PROTEINS</strong></p>
              <p>
                What is the science idea behind this message?
              </p>

              <div class="lq-puzzle-actions">
                <button type="button" data-meaning="0">
                  HBV uses liver-cell machinery to help make viral proteins.
                </button>
                <button type="button" data-meaning="1">
                  HBV makes the liver produce bones.
                </button>
              </div>
            `;

            feedback.textContent =
              "✅ Code cracked! Now explain what it means.";

            meaning.querySelectorAll("[data-meaning]").forEach(b => {
              b.onclick = () => {
                if (b.dataset.meaning === "0") {
                  if (originalCorrect) originalCorrect.click();
                } else {
                  feedback.textContent =
                    "🔎 Think about the ribosomes and other cell workers from Cell City.";
                }
              };
            });
          } else {
            feedback.textContent =
              "🔎 The words are in the wrong order. Follow the code numbers carefully, then reset.";
          }
        };
      });

      controls.querySelector("#lq-code-reset").onclick = () => {
        selected = [];
        controls.querySelectorAll("[data-word]").forEach(b => {
          b.disabled = false;
        });
        drawSlots();
        feedback.textContent = "🔐 Code reset. Try decoding again.";
      };

      busy = false;
    }
  }

  // The Final Rescue rebuilds its level HTML on every level.
  // Watch for the level change and apply the custom puzzle.
  const observer = new MutationObserver(upgradeLevel);

  observer.observe(game, {
    childList:true,
    subtree:true
  });

  upgradeLevel();
})();

/* ======================================================
   LIVERQUEST — TISSUE DETECTIVE FINAL LAYOUT
   Symmetrical diagrams + centered scar scanner
   Removes the extra Detective Check
   PASTE AT THE VERY BOTTOM OF site.js
   ====================================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "microscope.html") return;

  const grid = document.querySelector(".kid-tissue-grid");
  const healthy = document.getElementById("healthy-tissue");
  const injured = document.getElementById("injured-tissue");
  const scarButton = document.getElementById("show-scars");

  if (!grid || !healthy || !injured || !scarButton) return;

  // 1. Remove the original Detective Check,
  // including its buttons and answer feedback.
  document.querySelectorAll(".lq-detective-question").forEach(el => {
    el.remove();
  });

  // Catch any older detective-question layout left behind.
  document.querySelectorAll("h3").forEach(heading => {
    if (/^🎯?\s*Detective Question$/i.test(heading.textContent.trim()) ||
        /Detective Check: Compare the Two Diagrams/i.test(heading.textContent)) {
      const parent = heading.parentElement;
      let next = heading.nextElementSibling;

      while (
        next &&
        (
          next.id === "tissue-feedback" ||
          next.classList.contains("answer-row") ||
          (next.tagName === "P" &&
           /which picture|look at the two tissue diagrams/i.test(next.textContent))
        )
      ) {
        const remove = next;
        next = next.nextElementSibling;
        remove.remove();
      }
      heading.remove();
    }
  });

  // 2. Find the original scanner wrapper.
  let scanner = document.querySelector(".lq-scar-area");

  // Fallback for older versions.
  if (!scanner) {
    scanner = document.createElement("div");
    scanner.className = "lq-scar-area";
    scarButton.before(scanner);
    scanner.appendChild(scarButton);
  }

  // 3. Move the scanner below BOTH diagrams.
  grid.insertAdjacentElement("afterend", scanner);

  scanner.classList.add("lq-centered-scanner");

  // Keep the existing actual button, which already
  // has its reveal/hide behaviour.
  if (!scanner.contains(scarButton)) {
    scanner.appendChild(scarButton);
  }

  // Update scanner heading and instructions.
  let heading = scanner.querySelector(".lq-scar-heading");

  if (!heading) {
    heading = document.createElement("div");
    heading.className = "lq-scar-heading";
    scanner.prepend(heading);
  }

  heading.innerHTML = `
    <div class="lq-bubble">🩹</div>
    <div>
      <h3>Scar Tissue Scanner</h3>
      <p>
        Reveal possible scar tissue in the
        <strong>Affected Tissue diagram above.</strong>
      </p>
    </div>
  `;

  // 4. Remove old duplicate explanatory sections
  // that would make the page look cluttered.
  const oldReport = document.getElementById("tissue-report");

  if (oldReport) {
    oldReport.style.display = "none";
  }

  // 5. Keep both cards the same height, even with
  // slightly different amounts of feedback.
  document.getElementById("lq-symmetric-tissue-css")?.remove();

  const style = document.createElement("style");
  style.id = "lq-symmetric-tissue-css";

  style.textContent = `
    /* Keep both tissue cards equal in layout. */
    .kid-tissue-grid {
      display:grid !important;
      grid-template-columns:repeat(2,minmax(0,1fr)) !important;
      gap:18px !important;
      align-items:stretch !important;
    }

    .kid-tissue-grid .kid-tissue-card {
      display:flex !important;
      flex-direction:column !important;
      height:100%;
      min-width:0;
      justify-content:flex-start;
    }

    .kid-tissue-grid .kid-tissue-card h3 {
      text-align:center;
      min-height:45px;
    }

    .kid-tissue-grid .kid-tissue-picture {
      width:100%;
      margin-bottom:12px;
    }

    .kid-tissue-grid .kid-tissue-card > button[data-examine] {
      margin-top:auto;
      width:100%;
      min-height:50px;
    }

    .kid-tissue-grid .lq-local-feedback {
      text-align:left;
      margin-top:12px;
      line-height:1.5;
      font-size:.9rem;
    }

    /* Scanner is no longer inside one card. */
    .lq-centered-scanner {
      max-width:680px !important;
      margin:20px auto 24px !important;
      padding:19px !important;
      border:2px solid #dcc4ef !important;
      border-radius:21px !important;
      background:linear-gradient(135deg,#f6ecff,#edfaff) !important;
      text-align:center;
    }

    .lq-centered-scanner .lq-scar-heading {
      display:flex;
      justify-content:center;
      align-items:center;
      gap:12px;
      margin-bottom:12px;
    }

    .lq-centered-scanner .lq-scar-heading h3 {
      margin:0 0 4px;
      color:#6a42ab;
      font-size:1.3rem;
    }

    .lq-centered-scanner .lq-scar-heading p {
      margin:0;
      line-height:1.45;
    }

    .lq-centered-scanner .lq-bubble {
      font-size:39px;
    }

    .lq-centered-scanner #show-scars {
      width:100%;
      max-width:450px;
      padding:14px 18px;
      background:#7650c6;
      color:white;
      border:0;
      border-radius:15px;
      font-size:1rem;
      font-weight:800;
      cursor:pointer;
      margin:10px auto;
    }

    .lq-centered-scanner #show-scars:hover {
      background:#623eab;
    }

    .lq-centered-scanner .lq-scar-status {
      max-width:520px;
      margin:12px auto;
      text-align:center;
    }

    .lq-centered-scanner .lq-scar-key {
      justify-content:center;
    }

    @media(max-width:650px) {
      .kid-tissue-grid {
        grid-template-columns:1fr !important;
      }

      .lq-centered-scanner {
        padding:15px !important;
      }
    }
  `;

  document.head.appendChild(style);
})();

/* TISSUE DETECTIVE — UNLOCK MISSION WITHOUT REMOVED QUIZ */
(function () {
  if (!location.pathname.endsWith("microscope.html")) return;

  const next = document.getElementById("tissue-next");
  if (!next) return;

  const clicked = new Set();

  document.querySelectorAll("[data-examine]").forEach(button => {
    button.addEventListener("click", () => {
      clicked.add(button.dataset.examine);

      if (clicked.has("healthy") && clicked.has("injured")) {
        next.disabled = false;
      }
    });
  });
})();

/* ============================================================
   LIVERQUEST NEWSROOM — BREAKING NEWS!
   Mission 3: Replaces "Spot the Tissue Clue"

   PASTE ONCE AT THE VERY BOTTOM OF site.js

   No external images, videos, libraries, or internet needed.
   Does not modify the existing tissue diagrams or scar scanner.
   ============================================================ */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "microscope.html") return;

  // Find the specific activity being replaced.
  let oldGame = document.getElementById("lq-tissue-game");

  if (!oldGame) {
    const heading = [...document.querySelectorAll("h2,h3")]
      .find(h => /spot the tissue clue/i.test(h.textContent));

    if (heading) {
      oldGame = heading.closest("section.lq-card, section, .lq-card");
    }
  }

  // Do not accidentally replace any other activity.
  if (!oldGame) return;

  document.getElementById("lq-newsroom-style")?.remove();

  const css = document.createElement("style");
  css.id = "lq-newsroom-style";
  css.textContent = `

    /* ========== MAIN NEWSROOM ========== */

    #lq-newsroom {
      --nr-purple:#6b43b2;
      --nr-dark:#282344;
      --nr-pink:#f5b5d5;
      --nr-green:#43bd91;
      background:linear-gradient(145deg,#f6edff,#eafaff);
      border:3px solid #d9c0f2;
      border-radius:26px;
      padding:clamp(13px,3vw,25px);
      margin:24px 0;
      color:#453858;
      font-family:inherit;
    }

    #lq-newsroom * {
      box-sizing:border-box;
    }

    #lq-newsroom button {
      font:inherit;
      cursor:pointer;
    }

    #lq-newsroom button:disabled {
      cursor:default;
    }

    .nr-intro {
      text-align:center;
      margin-bottom:18px;
    }

    .nr-tag {
      background:#e8d9ff;
      color:#6240a1;
      display:inline-block;
      border-radius:99px;
      padding:8px 14px;
      font-size:.85rem;
      font-weight:900;
    }

    .nr-intro h2 {
      font-size:clamp(1.65rem,4vw,2.3rem);
      color:#6844ad;
      margin:12px 0 6px;
    }

    .nr-intro p {
      line-height:1.5;
      margin:8px auto;
      max-width:650px;
    }

    /* ========== TELEVISION SCREEN ========== */

    .nr-tv {
      border:8px solid #333050;
      background:#262341;
      padding:10px;
      border-radius:25px;
      box-shadow:0 12px 0 #c7b5e2;
      overflow:hidden;
    }

    .nr-tv-top {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      padding:7px 10px 13px;
      color:#fff;
      font-weight:900;
      font-size:.85rem;
    }

    .nr-live {
      background:#d84b67;
      color:white;
      padding:6px 11px;
      border-radius:8px;
      animation:nr-blink 1.4s infinite;
    }

    .nr-live.offline {
      background:#786e91;
      animation:none;
    }

    .nr-screen {
      background:linear-gradient(140deg,#463465,#253755);
      color:white;
      border-radius:14px;
      overflow:hidden;
      min-height:285px;
      display:flex;
      flex-direction:column;
    }

    .nr-screen-top {
      text-align:center;
      padding:9px;
      font-size:.8rem;
      font-weight:900;
      color:#efe6ff;
      background:#2d2444;
      letter-spacing:1px;
    }

    .nr-screen-picture {
      flex:1;
      display:grid;
      place-items:center;
      min-height:195px;
      padding:8px;
    }

    .nr-screen-picture svg {
      width:100%;
      max-height:210px;
      display:block;
    }

    .nr-screen-picture .nr-big {
      font-size:clamp(55px,9vw,90px);
    }

    .nr-ticker {
      background:#db4c6c;
      color:white;
      padding:10px 14px;
      font-weight:850;
      font-size:.94rem;
      text-align:center;
      min-height:42px;
    }

    /* ========== PROGRESS ========== */

    .nr-progress {
      display:flex;
      justify-content:space-between;
      flex-wrap:wrap;
      gap:9px;
      margin:20px 0 9px;
      color:#6240a0;
      font-weight:850;
    }

    .nr-track {
      display:flex;
      gap:6px;
      margin-bottom:18px;
    }

    .nr-track span {
      height:11px;
      flex:1;
      border-radius:99px;
      background:#dfd1f1;
    }

    .nr-track span.done {
      background:#46ba94;
    }

    .nr-track span.active {
      background:#966cde;
    }

    /* ========== PRODUCER DESK ========== */

    .nr-desk {
      background:white;
      border:2px solid #dec8f3;
      border-radius:22px;
      padding:clamp(14px,3vw,22px);
      margin:14px 0;
    }

    .nr-desk h3 {
      color:#6842af;
      font-size:1.3rem;
      margin:0 0 10px;
    }

    .nr-instruction {
      font-size:1.03rem;
      line-height:1.55;
      margin:10px 0 18px;
    }

    .nr-grid {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:12px;
    }

    .nr-card {
      border:2px solid #d5beee;
      background:#faf7ff;
      color:#51378a;
      border-radius:17px;
      padding:14px 10px;
      min-height:110px;
      text-align:center;
      font-weight:800;
      transition:transform .15s,background .15s;
    }

    .nr-card:hover:not(:disabled) {
      background:#eee5ff;
      transform:translateY(-3px);
    }

    .nr-card.wrong {
      border-color:#df7c89;
      background:#ffe5e8;
      animation:nr-shake .3s;
    }

    .nr-card.correct {
      border-color:#48ba91;
      background:#e2f8ec;
    }

    .nr-card .nr-emoji {
      font-size:42px;
      display:block;
      margin-bottom:10px;
    }

    .nr-card svg {
      max-width:100%;
      height:98px;
      margin-bottom:8px;
    }

    .nr-message {
      background:#fff0d9;
      border:2px solid #e8cd9b;
      border-radius:14px;
      padding:14px;
      margin:16px 0;
      line-height:1.55;
      min-height:55px;
    }

    .nr-message.good {
      background:#e0f9eb;
      border-color:#82cfa8;
    }

    .nr-paper {
      background:#fff9ea;
      border:2px dashed #c9aa77;
      border-radius:14px;
      padding:17px;
      margin:12px 0;
      line-height:1.6;
    }

    .nr-primary {
      display:block;
      background:#754bc4;
      border:0;
      color:white;
      border-radius:15px;
      padding:15px 22px;
      font-weight:900;
      margin:18px auto 4px;
      min-width:190px;
      font-size:1rem;
    }

    .nr-primary:hover:not(:disabled) {
      background:#603ba8;
    }

    .nr-primary:disabled {
      opacity:.42;
    }

    .nr-meter {
      background:#e7d8f3;
      height:15px;
      border-radius:99px;
      overflow:hidden;
      margin:10px 0;
    }

    .nr-meter div {
      background:linear-gradient(90deg,#40b998,#8c66d7);
      height:100%;
      width:0;
      transition:width .3s;
    }

    .nr-end {
      text-align:center;
    }

    .nr-badge {
      font-size:75px;
      margin:16px 0;
    }

    .nr-report-row {
      background:#f7f1ff;
      border:2px solid #e2d2f2;
      border-radius:13px;
      padding:12px;
      margin:9px 0;
      line-height:1.45;
      text-align:left;
    }

    .nr-broadcast-in {
      animation:nr-entrance .45s both;
    }

    @keyframes nr-blink {
      50% {opacity:.6}
    }

    @keyframes nr-shake {
      25% {transform:translateX(-5px)}
      75% {transform:translateX(5px)}
    }

    @keyframes nr-entrance {
      from {opacity:0;transform:translateY(10px)}
      to {opacity:1;transform:translateY(0)}
    }

    @media(max-width:650px) {
      .nr-grid {
        grid-template-columns:1fr;
      }

      .nr-card {
        min-height:62px;
      }

      .nr-screen {
        min-height:250px;
      }
    }

    @media(prefers-reduced-motion:reduce) {
      #lq-newsroom * {
        animation:none!important;
        transition:none!important;
      }
    }
  `;

  document.head.appendChild(css);

  // Replace ONLY the old Spot the Tissue Clue activity.
  const newsroom = document.createElement("section");
  newsroom.id = "lq-newsroom";
  oldGame.replaceWith(newsroom);

  const $ = selector => newsroom.querySelector(selector);
  const $$ = selector => [...newsroom.querySelectorAll(selector)];

  let stage = 0;
  let mistakes = 0;
  let approved = false;

  const segments = [];

  const stageNames = [
    "Breaking News Headline",
    "Choose the News Footage",
    "Message from Cell City",
    "Live Tissue Report",
    "Stop the Fake News",
    "Public Safety Announcement"
  ];

  /* ====================================================
     BUILT-IN ILLUSTRATIONS
     ==================================================== */

  function frame(content) {
    return `
      <svg viewBox="0 0 460 210"
           role="img"
           aria-label="Colourful LiverQuest science illustration">
        <rect width="460" height="210" rx="18"
              fill="#f1eaff"/>
        <circle cx="45" cy="35" r="19"
                fill="#e7d6ff"/>
        <circle cx="419" cy="178" r="24"
                fill="#d4f6ec"/>
        ${content}
      </svg>
    `;
  }

  function cellIllustration(virus=false) {
    return frame(`
      <ellipse cx="246" cy="106" rx="110" ry="78"
               fill="#f5b1d1" stroke="#d277aa"
               stroke-width="7"/>

      <circle cx="251" cy="104" r="35"
              fill="#b38be0" stroke="#8556b6"
              stroke-width="5"/>

      <circle cx="251" cy="104" r="12"
              fill="#7241a3"/>

      <g fill="#ffbc7c" stroke="#ce894b" stroke-width="3">
        <ellipse cx="189" cy="78" rx="23" ry="13"/>
        <ellipse cx="301" cy="149" rx="23" ry="13"/>
      </g>

      <g fill="#7650ad">
        <circle cx="186" cy="131" r="6"/>
        <circle cx="210" cy="152" r="6"/>
        <circle cx="304" cy="74" r="6"/>
      </g>

      ${virus ? `
        <g transform="translate(78 105)">
          <circle r="26" fill="#cba9f1"
                  stroke="#7653b3" stroke-width="5"/>
          <circle r="12" fill="#8053b2"/>
          ${Array.from({length:8},(_,i)=>{
            const a=i*Math.PI/4;
            return `<circle
              cx="${Math.cos(a)*34}"
              cy="${Math.sin(a)*34}"
              r="7" fill="#eab1d8"/>`;
          }).join("")}
        </g>

        <path d="M119 105 L143 105"
              fill="none"
              stroke="#7751b4"
              stroke-width="5"
              stroke-dasharray="7 5"/>
      ` : ""}

      <text x="250" y="198" text-anchor="middle"
            fill="#6440a2" font-size="17" font-weight="bold">
        LIVER CELL
      </text>
    `);
  }

  function tissueIllustration() {
    return frame(`
      ${Array.from({length:18},(_,i)=>{
        const x=95+(i%6)*52;
        const y=49+Math.floor(i/6)*52;
        const injured=[2,8,14].includes(i);

        return `
          <rect x="${x}" y="${y}"
                width="45" height="45" rx="14"
                fill="${injured?"#ffba84":"#f5b0d0"}"
                stroke="${injured?"#d58d56":"#ce78a4"}"
                stroke-width="3"/>

          <circle cx="${x+22}" cy="${y+23}"
                  r="8" fill="#9160bc"/>

          ${injured ? `
            <path d="M${x+10} ${y+10} l24 24
                     m0 -24 l-24 24"
                  fill="none" stroke="#c84b55"
                  stroke-width="4"/>
          ` : ""}
        `;
      }).join("")}

      <circle cx="54" cy="108" r="21"
              fill="#a7dff6" stroke="#559ccc"
              stroke-width="4"/>
      <text x="54" y="116" font-size="25"
            font-weight="bold" text-anchor="middle"
            fill="#3479ab">+</text>
    `);
  }

  function liverIllustration() {
    return frame(`
      <path d="M93 83
               C117 17 263 23 328 61
               C372 79 391 104 374 132
               C341 149 314 137 275 159
               C211 202 114 181 94 135Z"
            fill="#d78e84"
            stroke="#a7556a"
            stroke-width="7"/>

      <path d="M261 51 Q290 105 264 161"
            fill="none" stroke="#a95a68"
            stroke-width="5"/>

      <circle cx="171" cy="106" r="7" fill="#70445d"/>
      <circle cx="207" cy="106" r="7" fill="#70445d"/>

      <path d="M173 128 Q188 140 207 128"
            fill="none" stroke="#70445d"
            stroke-width="5" stroke-linecap="round"/>

      <text x="231" y="201"
            text-anchor="middle" fill="#6240a0"
            font-size="17" font-weight="bold">
        LIVER CITY
      </text>
    `);
  }

  function studioIllustration() {
    return frame(`
      <rect x="74" y="34" width="312" height="122"
            rx="12" fill="#3e3267"/>

      <rect x="95" y="52" width="270" height="86"
            rx="8" fill="#7060a9"/>

      <text x="230" y="90" text-anchor="middle"
            font-size="27" font-weight="bold" fill="white">
        LIVERQUEST
      </text>

      <text x="230" y="119" text-anchor="middle"
            font-size="20" font-weight="bold"
            fill="#ffe0ec">
        NEWS
      </text>

      <rect x="65" y="165" width="330" height="25"
            rx="9" fill="#d48bae"/>

      <rect x="194" y="122" width="70" height="35"
            rx="7" fill="#f4c7a1"/>

      <circle cx="229" cy="115" r="25"
              fill="#f4c7a1"/>

      <path d="M202 106 Q229 69 254 107"
            fill="#7a5580"/>

      <rect x="216" y="147" width="25" height="37"
            rx="8" fill="#7753b8"/>
    `);
  }

  function illustration(type) {
    if (type === "virus") return cellIllustration(true);
    if (type === "cell") return cellIllustration(false);
    if (type === "tissue") return tissueIllustration();
    if (type === "liver") return liverIllustration();
    return studioIllustration();
  }

  /* ====================================================
     GAME ENGINE
     ==================================================== */

  function writeTV(type,caption) {
    const screen = $("#nr-picture");
    const ticker = $("#nr-ticker");

    if (screen) {
      screen.innerHTML = illustration(type);
      screen.classList.remove("nr-broadcast-in");
      void screen.offsetWidth;
      screen.classList.add("nr-broadcast-in");
    }

    if (ticker) ticker.textContent = caption;
  }

  function message(text,good=false) {
    const box=$("#nr-message");

    if (!box) return;

    box.className="nr-message"+(good?" good":"");
    box.textContent=text;
  }

  function mistake(button,hint) {
    mistakes++;

    if (button) {
      button.classList.add("wrong");
    }

    message("🔎 PRODUCER'S NOTE: "+hint);
    writeTV("studio","⚠️ EDITORIAL REVIEW — CHECK YOUR CHOICE");
  }

  function approve(text,type,caption) {
    if (approved) return;

    approved=true;

    writeTV(type,caption);
    message("✅ APPROVED! "+text,true);

    $$(".nr-card").forEach(button=>{
      button.disabled=true;
    });

    $("#nr-next").disabled=false;
    $("#nr-next").textContent =
      stage===5 ? "🔴 GO TO BROADCAST STUDIO →" :
                  "SEND TO THE NEXT DEPARTMENT →";
  }

  function cards(options,handler) {
    $("#nr-controls").innerHTML=`
      <div class="nr-grid">
        ${options.map((item,i)=>`
          <button type="button"
                  class="nr-card"
                  data-nr-choice="${i}">
            ${item.art ? `
              <span class="nr-emoji">${item.art}</span>
            `:""}
            ${item.visual || ""}
            <span>${item.label}</span>
          </button>
        `).join("")}
      </div>
    `;

    $$("[data-nr-choice]").forEach(button=>{
      button.onclick=()=>{
        if (!approved) {
          handler(Number(button.dataset.nrChoice),button);
        }
      };
    });
  }

  function correctSelection(items,right,successText,hint,type,caption) {
    cards(items,(i,button)=>{
      if (i!==right) {
        mistake(button,hint);
        return;
      }

      button.classList.add("correct");
      approve(successText,type,caption);
    });
  }

  function render() {
    approved=false;

    newsroom.innerHTML=`
      <div class="nr-intro">
        <span class="nr-tag">
          🎬 MISSION 3 — CREATIVE SCIENCE CHALLENGE
        </span>

        <h2>📺 LiverQuest Newsroom</h2>

        <p>
          You're the news director! Create an accurate
          broadcast about hepatitis B and the liver.
        </p>
      </div>

      <div class="nr-tv">
        <div class="nr-tv-top">
          <span>📡 LIVERQUEST NEWS</span>
          <span class="nr-live offline" id="nr-live">
            PREPARING
          </span>
        </div>

        <div class="nr-screen">
          <div class="nr-screen-top">
            SCIENCE NEWS • SPECIAL REPORT
          </div>

          <div class="nr-screen-picture" id="nr-picture"></div>

          <div class="nr-ticker" id="nr-ticker">
            BROADCAST PREPARATION IN PROGRESS
          </div>
        </div>
      </div>

      <div class="nr-progress">
        <span>PRODUCTION STAGE ${stage+1} / 6</span>
        <span>🎥 ${segments.length}/6 APPROVED</span>
      </div>

      <div class="nr-track">
        ${stageNames.map((_,i)=>`
          <span class="${
            i<stage?"done":i===stage?"active":""
          }"></span>
        `).join("")}
      </div>

      <div class="nr-desk">
        <h3 id="nr-title">${stageNames[stage]}</h3>

        <div id="nr-instructions"
             class="nr-instruction"></div>

        <div id="nr-controls"></div>

        <div id="nr-message" class="nr-message"
             role="status" aria-live="polite">
          🎙️ Your producer is waiting for your choice.
        </div>

        <button type="button"
                id="nr-next"
                class="nr-primary"
                disabled>
          NEXT DEPARTMENT →
        </button>
      </div>
    `;

    $("#nr-next").onclick=()=>{
      stage++;

      if(stage===6) {
        startBroadcast();
      } else {
        render();
      }
    };

    writeTV("studio","LIVERQUEST NEWS — BUILD YOUR REPORT");

    [
      stageHeadline,
      stageFootage,
      stageCellMessage,
      stageTissueReport,
      stageFactCheck,
      stageSafety
    ][stage]();
  }

  /* ====================================================
     STAGE 1 — HEADLINE DESK
     ==================================================== */

  function stageHeadline() {
    $("#nr-instructions").innerHTML=`
      🚨 <strong>Breaking news!</strong>
      A reporter has discovered hepatitis B in Liver City.
      Choose a headline that tells the truth without
      exaggerating.
    `;

    correctSelection([
      {
        art:"🦠",
        label:"Hepatitis B can infect liver cells"
      },
      {
        art:"🚨",
        label:"Every liver cell has stopped working!"
      },
      {
        art:"🫁",
        label:"Hepatitis B mainly attacks the lungs"
      }
    ],0,
      "Your headline is accurate without making the situation sound worse than it is.",
      "Remember which organ HBV affects. Avoid claiming that every cell has stopped working.",
      "liver",
      "BREAKING: HEPATITIS B CAN INFECT LIVER CELLS"
    );

    // Store the broadcast segment after successful approval.
    const next=$("#nr-next");
    next.addEventListener("click",()=>{
      segments.push({
        title:"BREAKING NEWS",
        type:"liver",
        caption:"Hepatitis B can infect liver cells."
      });
    },{once:true});
  }

  /* ====================================================
     STAGE 2 — FOOTAGE EDITOR
     ==================================================== */

  function stageFootage() {
    $("#nr-instructions").innerHTML=`
      🎥 <strong>Choose your footage.</strong>
      The reporter is explaining how the virus
      reaches a liver cell. Select the clip that
      best matches the story.
    `;

    correctSelection([
      {
        label:"Clip A: Virus approaches a liver cell",
        visual:illustration("virus")
      },
      {
        label:"Clip B: Healthy liver without a virus",
        visual:illustration("liver")
      },
      {
        label:"Clip C: A television presenter",
        visual:illustration("studio")
      }
    ],0,
      "This footage shows the virus approaching the cell it can infect.",
      "Look for the illustration showing both a virus and a liver cell.",
      "virus",
      "FOOTAGE: A VIRUS APPROACHES A LIVER CELL"
    );

    $("#nr-next").addEventListener("click",()=>{
      segments.push({
        title:"ON LOCATION",
        type:"virus",
        caption:"HBV attaches to liver cells before entering."
      });
    },{once:true});
  }

  /* ====================================================
     STAGE 3 — MESSAGE FROM CELL CITY
     ==================================================== */

  function stageCellMessage() {
    $("#nr-instructions").innerHTML=`
      📩 <strong>New message!</strong>
      A liver cell has contacted the newsroom.
      Choose the best caption for its message.
    `;

    const paper=document.createElement("div");
    paper.className="nr-paper";

    paper.innerHTML=`
      <strong>📨 INCOMING MESSAGE — CELL CITY</strong>
      <p>
        "A virus is using our protein-building workers
        to make its own parts!"
      </p>
      <em>— A worried liver cell</em>
    `;

    $("#nr-instructions").after(paper);

    correctSelection([
      {
        art:"🏭",
        label:"HBV can use the cell's ribosomes to make viral proteins"
      },
      {
        art:"⚡",
        label:"HBV turns mitochondria into new livers"
      },
      {
        art:"📦",
        label:"The virus makes the Golgi apparatus disappear"
      }
    ],0,
      "Ribosomes are protein builders. You used information from Cell City!",
      "Think about the protein factories you learned about in Mission 1.",
      "cell",
      "CELL CITY REPORT: HBV USES CELL MACHINERY"
    );

    $("#nr-next").addEventListener("click",()=>{
      segments.push({
        title:"CELL CITY UPDATE",
        type:"cell",
        caption:"HBV uses liver-cell machinery to help make viral proteins."
      });
    },{once:true});
  }

  /* ====================================================
     STAGE 4 — TISSUE LAB REPORT
     ==================================================== */

  function stageTissueReport() {
    $("#nr-instructions").innerHTML=`
      🔬 <strong>Live from the tissue laboratory!</strong>
      The reporter has sent footage of injured cells
      and immune defenders.

      What caption should appear on television?
    `;

    writeTV("tissue","LIVE FOOTAGE FROM THE TISSUE LAB");

    correctSelection([
      {
        art:"🛡️",
        label:"Immune defenders respond to infected cells and may cause injury"
      },
      {
        art:"💪",
        label:"The orange cells have become stronger"
      },
      {
        art:"🦠",
        label:"Every pink cell must contain the virus"
      }
    ],0,
      "Your caption explains the immune response without making unsupported claims.",
      "The orange X represents injury. Pink cells do not automatically prove whether HBV is present.",
      "tissue",
      "TISSUE REPORT: IMMUNE RESPONSES MAY CAUSE INJURY"
    );

    $("#nr-next").addEventListener("click",()=>{
      segments.push({
        title:"TISSUE LAB LIVE",
        type:"tissue",
        caption:"The immune response can contribute to liver-cell injury."
      });
    },{once:true});
  }

  /* ====================================================
     STAGE 5 — FACT-CHECK STUDIO
     ==================================================== */

  function stageFactCheck() {
    $("#nr-instructions").innerHTML=`
      🚨 <strong>False information alert!</strong>
      A rumour is about to appear on television.

      Choose the best corrected statement.
    `;

    const paper=document.createElement("div");
    paper.className="nr-paper";

    paper.innerHTML=`
      <strong>❌ UNVERIFIED RUMOUR</strong>
      <p>
        "Everyone who gets hepatitis B will
        develop serious liver damage."
      </p>
    `;

    $("#nr-instructions").after(paper);

    correctSelection([
      {
        art:"✅",
        label:"Not everyone with hepatitis B develops serious liver damage"
      },
      {
        art:"❌",
        label:"Everyone with HBV will definitely become seriously ill"
      },
      {
        art:"❓",
        label:"Hepatitis B cannot affect the liver"
      }
    ],0,
      "Rumour corrected! Your newsroom is reporting the science accurately.",
      "Avoid words like 'everyone' and 'definitely' when the outcome can vary.",
      "liver",
      "FACT CHECK: SERIOUS DAMAGE DOES NOT HAPPEN TO EVERYONE"
    );

    $("#nr-next").addEventListener("click",()=>{
      segments.push({
        title:"FACT CHECK VERIFIED",
        type:"liver",
        caption:"Not everyone with hepatitis B develops serious liver damage."
      });
    },{once:true});
  }

  /* ====================================================
     STAGE 6 — PUBLIC SAFETY ANNOUNCEMENT
     ==================================================== */

  function stageSafety() {
    $("#nr-instructions").innerHTML=`
      🛡️ <strong>One last job!</strong>
      The newsroom needs a clear and helpful
      public safety announcement.

      Which message should your broadcast share?
    `;

    correctSelection([
      {
        art:"💉",
        label:"Vaccination helps prevent hepatitis B"
      },
      {
        art:"🤗",
        label:"Avoid hugging anyone with hepatitis B"
      },
      {
        art:"🎲",
        label:"Wait for symptoms before thinking about prevention"
      }
    ],0,
      "Excellent! Your broadcast ends with a useful prevention message.",
      "Remember the Rescue Lab: vaccination helps prevent HBV, and hugging does not spread it.",
      "studio",
      "PUBLIC SAFETY: VACCINATION HELPS PREVENT HEPATITIS B"
    );

    $("#nr-next").addEventListener("click",()=>{
      segments.push({
        title:"PUBLIC SAFETY",
        type:"studio",
        caption:"Vaccination helps prevent hepatitis B."
      });
    },{once:true});
  }

  /* ====================================================
     FINAL STAGE — GO LIVE!
     ==================================================== */

  function startBroadcast() {
    let current=0;

    newsroom.innerHTML=`
      <div class="nr-intro">
        <span class="nr-tag">
          🎉 ALL SIX DEPARTMENTS APPROVED
        </span>

        <h2>🔴 You're Going LIVE!</h2>

        <p>
          Watch the science report you created.
          Press Next Scene to play through your broadcast.
        </p>
      </div>

      <div class="nr-tv">
        <div class="nr-tv-top">
          <span>📡 LIVERQUEST NEWS</span>
          <span class="nr-live">● ON AIR</span>
        </div>

        <div class="nr-screen">
          <div class="nr-screen-top" id="nr-broadcast-title">
            BREAKING NEWS
          </div>

          <div class="nr-screen-picture nr-broadcast-in"
               id="nr-broadcast-picture"></div>

          <div class="nr-ticker" id="nr-broadcast-caption"></div>
        </div>
      </div>

      <div class="nr-desk nr-end">
        <h3 id="nr-broadcast-progress">
          SCENE 1 OF 6
        </h3>

        <div class="nr-meter">
          <div id="nr-broadcast-meter"></div>
        </div>

        <button type="button"
                class="nr-primary"
                id="nr-broadcast-next">
          NEXT SCENE ▶
        </button>
      </div>
    `;

    function showSegment() {
      const item=segments[current];
      if (!item) return;

      $("#nr-broadcast-title").textContent=item.title;

      const picture=$("#nr-broadcast-picture");

      picture.innerHTML=illustration(item.type);
      picture.classList.remove("nr-broadcast-in");
      void picture.offsetWidth;
      picture.classList.add("nr-broadcast-in");

      $("#nr-broadcast-caption").textContent=item.caption;

      $("#nr-broadcast-progress").textContent=
        `SCENE ${current+1} OF ${segments.length}`;

      $("#nr-broadcast-meter").style.width=
        `${((current+1)/segments.length)*100}%`;

      $("#nr-broadcast-next").textContent =
        current===segments.length-1
          ? "🏆 FINISH BROADCAST →"
          : "NEXT SCENE ▶";
    }

    $("#nr-broadcast-next").onclick=()=>{
      current++;

      if(current===segments.length) {
        showReward();
      } else {
        showSegment();
      }
    };

    showSegment();
  }

  /* ====================================================
     REWARD SCREEN
     ==================================================== */

  function showReward() {
    newsroom.innerHTML=`
      <div class="nr-desk nr-end">
        <span class="nr-tag">
          ✅ BROADCAST COMPLETE
        </span>

        <div class="nr-badge">🎙️ 🏆 📺</div>

        <h2>Junior Science Reporter!</h2>

        <p>
          Congratulations! You produced an accurate
          science news broadcast for LiverQuest News.
        </p>

        <div class="nr-meter">
          <div style="width:100%"></div>
        </div>

        <h3>📰 Your Finished News Report</h3>

        <div id="nr-finished-report"></div>

        <p>
          <strong>Six news departments completed!</strong>
        </p>

        <p>
          Editorial corrections: ${mistakes}
        </p>

        <p>
          Remember: great reporters check their facts
          before sharing information.
        </p>

        <button type="button"
                id="nr-replay"
                class="nr-primary">
          🎬 PRODUCE ANOTHER BROADCAST ↺
        </button>
      </div>
    `;

    const report=$("#nr-finished-report");

    segments.forEach((item,i)=>{
      const row=document.createElement("div");
      row.className="nr-report-row";

      const strong=document.createElement("strong");
      strong.textContent=`${i+1}. ${item.title}`;

      const p=document.createElement("p");
      p.textContent=item.caption;

      row.append(strong,p);
      report.appendChild(row);
    });

    $("#nr-replay").onclick=()=>{
      stage=0;
      mistakes=0;
      segments.length=0;
      render();
    };
  }

  render();

})();

/* =====================================================
   TISSUE DETECTIVE — REMOVE REPEATED COLOUR EXPLANATIONS
   Keeps the compact legend above the diagrams.
   Paste at the VERY BOTTOM of site.js.
   ===================================================== */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "microscope.html") return;

  // 1. Remove the repeated colour explanation
  // from the Tissue Detective Guide.
  const guide = document.getElementById("lq-tissue-guide");

  if (guide) {
    guide.querySelectorAll("p").forEach(p => {
      const text = p.textContent.toLowerCase();

      if (
        text.includes("pink cells represent") ||
        text.includes("orange cells with an x")
      ) {
        p.remove();
      }
    });
  }

  // 2. Remove the repeated colour explanation directly
  // under "Healthy vs. Affected Liver Tissue".
  const title = [...document.querySelectorAll("h2")]
    .find(h =>
      /healthy vs\.? affected liver tissue/i.test(h.textContent)
    );

  if (title) {
    const next = title.nextElementSibling;

    if (
      next &&
      next.tagName === "P" &&
      /pink shapes represent|purple dots|orange cells/i
        .test(next.textContent)
    ) {
      next.remove();
    }
  }

  // 3. If the compact guide is already above the diagrams,
  // remove any leftover duplicate older legend.
  if (document.querySelector(".lq-top-guide")) {
    document.querySelectorAll(".tissue-legend")
      .forEach(el => el.remove());
  }
})();

/* =========================================================
   LIVERQUEST — REMOVE REPEATED HEPATITIS B REMINDERS
   Keep two main reminders:
   1. Virus Invasion
   2. Rescue Lab

   PASTE AT THE VERY BOTTOM OF site.js
   ========================================================= */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  const main = document.querySelector("main");

  if (!main) return;

  // Keep the existing reminder in Virus Invasion.
  const virusNote = page === "invasion.html"
    ? document.querySelector(".hb-bottom")
    : null;

  // Keep the existing reminder in Rescue Lab.
  const labNote = page === "lab.html"
    ? document.querySelector("#damage")
        ?.closest(".panel")
        ?.querySelector(".tiny")
    : null;

  // Different versions of the same repeated message.
  const repeats = [
    /\bNot everyone with (?:hepatitis B|HBV) (?:will )?develop(?:s)?[^.!?]*[.!?]?/gi,

    /\bNot everyone develops? (?:serious liver damage|significant liver injury|serious liver injury|scarring|fibrosis|it)[.!?]?/gi,

    /\b(?:This|That|It) does not happen to everyone(?: with (?:hepatitis B|HBV))?[.!?]?/gi,

    /\bNot all (?:people|patients) with (?:hepatitis B|HBV) develop[^.!?]*[.!?]?/gi
  ];

  // Don't modify interactive questions or game answers.
  const interactive =
    "button, a, option, label, script, style, " +
    "#lq-final-rescue, #lq-newsroom, #lq-expert-arcade, " +
    "#lq-expert-3, #lq-expert-2, #virus-adventure";

  // Find the website's visible text.
  const walker = document.createTreeWalker(
    main,
    NodeFilter.SHOW_TEXT
  );

  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(node => {
    const parent = node.parentElement;

    if (!parent || parent.closest(interactive)) return;

    // Protect the two reminders we're keeping.
    if (virusNote?.contains(node)) return;
    if (labNote?.contains(node)) return;

    let updated = node.textContent;
    let found = false;

    repeats.forEach(regex => {
      regex.lastIndex = 0;

      if (regex.test(updated)) {
        found = true;
        regex.lastIndex = 0;
        updated = updated.replace(regex, "");
      }
    });

    if (!found) return;

    // Clean up leftover spacing.
    updated = updated.replace(
      /,?\s+and\s*([.!?]|$)/gi,
      "$1"
    );

    updated = updated.replace(/\s+([,.!?])/g, "$1");
    updated = updated.replace(/[ \t]{2,}/g, " ");

    // Remove empty explanatory paragraphs.
    if (
      !updated.trim() &&
      parent.matches("p, small, .tiny, .caption")
    ) {
      parent.remove();
    } else {
      node.textContent = updated;
    }
  });
})();
/* ============================================================
   LIVERQUEST — THE SHRINKING SCIENTIST
   Mission 3 replacement activity for Tissue Detective

   Replaces: Spot the Tissue Clue / LiverQuest Newsroom
   Page: microscope.html

   PASTE AT THE VERY BOTTOM OF site.js
   ============================================================ */

(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page !== "microscope.html") return;

  // Try to find the section to replace.
  let target =
    document.getElementById("lq-newsroom") ||
    document.getElementById("lq-tissue-game");

  if (!target) {
    const heading = [...document.querySelectorAll("h2,h3")]
      .find(h =>
        /spot the tissue clue|liverquest newsroom/i.test(h.textContent)
      );
    if (heading) {
      target = heading.closest("section, .panel, .lq-card, .challenge, article");
    }
  }

  if (!target) return;

  document.getElementById("lq-shrinking-scientist-style")?.remove();

  const style = document.createElement("style");
  style.id = "lq-shrinking-scientist-style";
  style.textContent = `
    #lq-shrinking-scientist{
      --ss-purple:#6d44b2;
      --ss-purple-dark:#52328b;
      --ss-pink:#f5b3d4;
      --ss-pink-dark:#d57eaa;
      --ss-mint:#49ba98;
      --ss-blue:#9edcf7;
      --ss-gold:#f3c56a;
      --ss-bg:#f8efff;
      --ss-ink:#473b5b;
      margin:24px 0;
      padding:clamp(14px,3vw,24px);
      border:3px solid #d8c0f0;
      border-radius:26px;
      background:linear-gradient(145deg,#f7eeff,#eefaff);
      color:var(--ss-ink);
    }

    #lq-shrinking-scientist *{
      box-sizing:border-box;
    }

    .ss-top{
      text-align:center;
      margin-bottom:18px;
    }

    .ss-tag{
      display:inline-block;
      padding:8px 14px;
      border-radius:999px;
      background:#e9dcff;
      color:#5f3d9c;
      font-weight:900;
      font-size:.86rem;
    }

    .ss-top h2{
      color:var(--ss-purple);
      font-size:clamp(1.65rem,4vw,2.3rem);
      margin:10px 0 8px;
    }

    .ss-top p{
      max-width:760px;
      margin:8px auto;
      line-height:1.55;
      font-size:1.02rem;
    }

    .ss-layout{
      display:grid;
      grid-template-columns:1.1fr .9fr;
      gap:18px;
      align-items:start;
    }

    .ss-panel{
      background:white;
      border:2px solid #e0cef3;
      border-radius:22px;
      padding:16px;
    }

    .ss-panel h3{
      margin:0 0 10px;
      color:var(--ss-purple);
      font-size:1.18rem;
    }

    .ss-statusbar{
      display:flex;
      justify-content:space-between;
      flex-wrap:wrap;
      gap:10px;
      margin-bottom:12px;
      font-weight:850;
      color:#6340a3;
      font-size:.95rem;
    }

    .ss-track{
      display:flex;
      gap:6px;
      margin-bottom:14px;
    }

    .ss-track span{
      height:10px;
      flex:1;
      border-radius:999px;
      background:#e6d8f4;
    }

    .ss-track span.done{
      background:#49ba98;
    }

    .ss-grid-wrap{
      background:linear-gradient(145deg,#fff7fb,#f8efff);
      border:2px solid #e3d3f3;
      border-radius:20px;
      padding:14px;
    }

    .ss-grid{
      display:grid;
      grid-template-columns:repeat(7,1fr);
      gap:8px;
      max-width:500px;
      margin:0 auto;
      aspect-ratio:1/1;
    }

    .ss-tile{
      border-radius:18px;
      min-height:56px;
      display:grid;
      place-items:center;
      position:relative;
      font-size:1.25rem;
      font-weight:900;
      user-select:none;
    }

    .ss-wall{
      background:linear-gradient(145deg,#f6b0d1,#ee9ec6);
      border:3px solid var(--ss-pink-dark);
      box-shadow:inset 0 0 0 2px rgba(255,255,255,.3);
    }

    .ss-wall::before{
      content:"";
      width:58%;
      height:58%;
      border-radius:50%;
      background:#9862bf;
      opacity:.85;
    }

    .ss-path{
      background:#f9f4ff;
      border:2px dashed #ceb6ea;
    }

    .ss-player{
      background:#e9fbf4;
      border:3px solid #71c7a7;
    }

    .ss-player::after{
      content:"🧑‍🔬";
      font-size:1.6rem;
    }

    .ss-station{
      background:#fff7db;
      border:3px solid #e3bf68;
      cursor:pointer;
    }

    .ss-station::after{
      content:"🔎";
      font-size:1.35rem;
    }

    .ss-station.done{
      background:#e4faef;
      border-color:#6cc3a1;
    }

    .ss-station.done::after{
      content:"✅";
      font-size:1.2rem;
    }

    .ss-exit{
      background:#e7e4ff;
      border:3px solid #9d89d8;
    }

    .ss-exit::after{
      content:"🚪";
      font-size:1.35rem;
    }

    .ss-exit.ready{
      background:#def9eb;
      border-color:#57bc96;
      animation:ss-pulse 1.7s infinite;
    }

    .ss-controls{
      display:grid;
      grid-template-columns:repeat(3,64px);
      gap:8px;
      justify-content:center;
      margin:14px auto 8px;
    }

    .ss-btn{
      border:0;
      border-radius:14px;
      padding:12px;
      background:#7650c4;
      color:white;
      font:inherit;
      font-size:1.15rem;
      font-weight:900;
      cursor:pointer;
      box-shadow:0 4px 0 #603aa8;
    }

    .ss-btn:active{
      transform:translateY(2px);
      box-shadow:0 2px 0 #603aa8;
    }

    .ss-btn.blank{
      visibility:hidden;
    }

    .ss-direction-note{
      text-align:center;
      font-size:.92rem;
      color:#66597c;
      margin-top:6px;
    }

    .ss-journal{
      min-height:165px;
      background:linear-gradient(145deg,#fff8ea,#fffef8);
      border:2px dashed #d5bc84;
      border-radius:18px;
      padding:14px;
      line-height:1.55;
      margin-bottom:14px;
    }

    .ss-journal strong{
      color:#7a5b1c;
    }

    .ss-badges{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:10px;
      margin-top:12px;
    }

    .ss-badge{
      background:#f8f3ff;
      border:2px solid #dac7f1;
      border-radius:16px;
      padding:12px;
      min-height:84px;
      text-align:center;
      font-size:.92rem;
    }

    .ss-badge span{
      display:block;
      font-size:1.8rem;
      margin-bottom:6px;
    }

    .ss-badge.locked{
      opacity:.55;
    }

    .ss-badge.unlocked{
      background:#e4faee;
      border-color:#83cfad;
    }

    .ss-mini-card{
      background:#f4efff;
      border:2px solid #ddd0f2;
      border-radius:16px;
      padding:12px;
      margin-top:12px;
    }

    .ss-mini-visual{
      display:flex;
      justify-content:center;
      align-items:center;
      gap:10px;
      flex-wrap:wrap;
      margin-top:10px;
    }

    .ss-cell{
      width:42px;
      height:42px;
      border-radius:14px;
      background:#f5b0d0;
      border:3px solid #d57faa;
      position:relative;
    }

    .ss-cell::after{
      content:"";
      position:absolute;
      inset:11px;
      border-radius:50%;
      background:#9460bc;
    }

    .ss-window{
      width:90px;
      height:64px;
      border:3px solid #6a45ab;
      border-radius:10px;
      background:
        linear-gradient(90deg,transparent 0 28px,#ffffff77 28px 31px,transparent 31px 59px,#ffffff77 59px 62px,transparent 62px),
        linear-gradient(transparent 0 18px,#ffffff77 18px 21px,transparent 21px 43px,#ffffff77 43px 46px,transparent 46px),
        #fbeef6;
      position:relative;
      overflow:hidden;
    }

    .ss-window::after{
      content:"";
      position:absolute;
      inset:12px 24px;
      border:3px solid #ffbf84;
      border-radius:10px;
    }

    .ss-line{
      width:34px;
      height:4px;
      background:#8b6fc6;
      border-radius:99px;
    }

    .ss-liver{
      width:85px;
      height:52px;
      background:#d88d84;
      border:3px solid #a65568;
      border-radius:55px 28px 40px 45px / 34px 28px 30px 24px;
      position:relative;
    }

    .ss-liver::after{
      content:"";
      position:absolute;
      left:38px;
      top:6px;
      width:4px;
      height:36px;
      background:#a65568;
      border-radius:99px;
      transform:rotate(15deg);
    }

    .ss-slide{
      width:96px;
      height:42px;
      border-radius:12px;
      background:#dff6ff;
      border:3px solid #7bc0d8;
      position:relative;
    }

    .ss-slide::after{
      content:"";
      position:absolute;
      left:22px;
      top:8px;
      width:48px;
      height:22px;
      border-radius:10px;
      background:#f6b0d0;
      border:2px solid #d57faa;
    }

    .ss-overlay{
      position:fixed;
      inset:0;
      background:rgba(37,29,59,.55);
      display:none;
      align-items:center;
      justify-content:center;
      z-index:9999;
      padding:18px;
    }

    .ss-overlay.show{
      display:flex;
    }

    .ss-modal{
      width:min(720px,100%);
      background:white;
      border:3px solid #d8c2ef;
      border-radius:24px;
      padding:clamp(16px,3vw,24px);
      color:#483a5b;
      box-shadow:0 18px 48px rgba(30,22,44,.18);
    }

    .ss-modal h3{
      color:#6d44b2;
      margin:0 0 8px;
      font-size:1.4rem;
    }

    .ss-modal p{
      line-height:1.6;
      margin:8px 0;
    }

    .ss-fact{
      background:#fff8df;
      border:2px solid #eccd88;
      border-radius:16px;
      padding:14px;
      margin-top:12px;
    }

    .ss-fact strong{
      color:#7a5d1f;
    }

    .ss-modal-actions{
      display:flex;
      justify-content:center;
      gap:10px;
      flex-wrap:wrap;
      margin-top:16px;
    }

    .ss-close{
      border:0;
      background:#6e47b4;
      color:#fff;
      border-radius:14px;
      padding:13px 18px;
      font:inherit;
      font-weight:900;
      cursor:pointer;
    }

    .ss-recap{
      background:linear-gradient(145deg,#f7efff,#e7fbf2);
      border:2px solid #d8c5ee;
      border-radius:20px;
      padding:16px;
      margin-top:14px;
    }

    .ss-recap ul{
      margin:10px 0 0 18px;
      line-height:1.6;
    }

    .ss-end{
      text-align:center;
      padding:10px 4px 2px;
    }

    .ss-end-badge{
      font-size:4rem;
      margin:8px 0;
    }

    @keyframes ss-pulse{
      50%{transform:scale(1.04)}
    }

    @media(max-width:800px){
      .ss-layout{
        grid-template-columns:1fr;
      }

      .ss-grid{
        max-width:420px;
      }
    }

    @media(max-width:560px){
      .ss-grid{
        gap:6px;
      }

      .ss-tile{
        min-height:44px;
        border-radius:14px;
      }

      .ss-controls{
        grid-template-columns:repeat(3,56px);
      }

      .ss-badges{
        grid-template-columns:1fr;
      }
    }

    @media(prefers-reduced-motion:reduce){
      #lq-shrinking-scientist *{
        animation:none !important;
        transition:none !important;
      }
    }
  `;
  document.head.appendChild(style);

  const game = document.createElement("section");
  game.id = "lq-shrinking-scientist";
  target.replaceWith(game);

  const map = [
    ["W","W","W","W","W","W","W"],
    ["W","S","P","1","P","P","W"],
    ["W","P","W","P","W","P","W"],
    ["W","2","P","P","P","3","W"],
    ["W","P","W","P","W","P","W"],
    ["W","P","P","4","P","E","W"],
    ["W","W","W","W","W","W","W"]
  ];

  const discoveries = {
    "1": {
      title: "🧩 Discovery 1: Tissue Teamwork",
      badge: "🧩 Tissue Builder",
      short: "A tissue is made of many similar cells working together.",
      visual: `
        <div class="ss-mini-visual">
          <div class="ss-cell"></div>
          <div class="ss-line"></div>
          <div class="ss-cell"></div>
          <div class="ss-cell"></div>
          <div class="ss-cell"></div>
        </div>
      `,
      fact: "One cell is not a tissue. A tissue is a group of similar cells working together.",
      journal: "Badge collected: Tissue Builder! Many cells working together form a tissue."
    },
    "2": {
      title: "🔍 Discovery 2: Tiny Microscope View",
      badge: "🔍 Tiny View Expert",
      short: "A microscope shows only a tiny part of a tissue at one time.",
      visual: `
        <div class="ss-mini-visual">
          <div class="ss-window"></div>
        </div>
      `,
      fact: "When scientists look through a microscope, they only see a small area at one time.",
      journal: "Badge collected: Tiny View Expert! A microscope gives only a small window into tissue."
    },
    "3": {
      title: "🗺️ Discovery 3: Check More Than One Spot",
      badge: "🗺️ Careful Observer",
      short: "Scientists look at more than one area before making conclusions.",
      visual: `
        <div class="ss-mini-visual">
          <div class="ss-window"></div>
          <div class="ss-window"></div>
          <div class="ss-window"></div>
        </div>
      `,
      fact: "One small view may not show the whole story. Scientists often examine several areas of a sample.",
      journal: "Badge collected: Careful Observer! Scientists check several places, not just one tiny spot."
    },
    "4": {
      title: "✂️ Discovery 4: Tissue Slide",
      badge: "✂️ Slide Explorer",
      short: "A tissue slide is a very thin slice used for close observation.",
      visual: `
        <div class="ss-mini-visual">
          <div class="ss-liver"></div>
          <div class="ss-line"></div>
          <div class="ss-slide"></div>
        </div>
      `,
      fact: "A microscope slide is not the whole organ. It is a very thin slice that helps scientists look closely.",
      journal: "Badge collected: Slide Explorer! A tissue slide is only a thin slice of a much larger organ."
    }
  };

  let player = { r: 1, c: 1 };
  let found = new Set();
  let finished = false;
  let lastMessage =
    "Help Dr. Mini explore the tissue. Find the 4 discovery stations and unlock the exit door.";

  game.innerHTML = `
    <div class="ss-top">
      <span class="ss-tag">🕵️ MISSION 3 — EXPLORATION GAME</span>
      <h2>The Shrinking Scientist</h2>
      <p>
        Dr. Mini has accidentally shrunk and landed inside a giant liver tissue sample!
        Use the arrow buttons to explore, discover 4 new tissue facts, and unlock the exit.
      </p>
    </div>

    <div class="ss-layout">
      <div class="ss-panel">
        <div class="ss-statusbar">
          <span id="ss-progress-text">BADGES: 0 / 4</span>
          <span id="ss-exit-text">🚪 EXIT LOCKED</span>
        </div>

        <div class="ss-track" id="ss-track">
          <span></span><span></span><span></span><span></span>
        </div>

        <div class="ss-grid-wrap">
          <div class="ss-grid" id="ss-grid" aria-label="Shrinking Scientist map"></div>

          <div class="ss-controls" aria-label="Movement controls">
            <button type="button" class="ss-btn blank" tabindex="-1">•</button>
            <button type="button" class="ss-btn" id="ss-up" aria-label="Move up">⬆️</button>
            <button type="button" class="ss-btn blank" tabindex="-1">•</button>

            <button type="button" class="ss-btn" id="ss-left" aria-label="Move left">⬅️</button>
            <button type="button" class="ss-btn" id="ss-down" aria-label="Move down">⬇️</button>
            <button type="button" class="ss-btn" id="ss-right" aria-label="Move right">➡️</button>
          </div>

          <div class="ss-direction-note">
            You can also use your keyboard arrow keys.
          </div>
        </div>
      </div>

      <div class="ss-panel">
        <h3>📘 Dr. Mini's Discovery Journal</h3>

        <div class="ss-journal" id="ss-journal" role="status" aria-live="polite">
          <strong>Mission start:</strong><br>
          ${lastMessage}
        </div>

        <h3>🏅 Discovery Badges</h3>
        <div class="ss-badges" id="ss-badges">
          <div class="ss-badge locked" data-badge="1">
            <span>🧩</span>
            Tissue Builder
          </div>
          <div class="ss-badge locked" data-badge="2">
            <span>🔍</span>
            Tiny View Expert
          </div>
          <div class="ss-badge locked" data-badge="3">
            <span>🗺️</span>
            Careful Observer
          </div>
          <div class="ss-badge locked" data-badge="4">
            <span>✂️</span>
            Slide Explorer
          </div>
        </div>

        <div class="ss-recap">
          <strong>What this game teaches:</strong>
          <ul>
            <li>How cells form tissues</li>
            <li>Why microscope views are small</li>
            <li>Why scientists check more than one spot</li>
            <li>What a tissue slide really is</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="ss-overlay" id="ss-overlay" aria-hidden="true">
      <div class="ss-modal" id="ss-modal"></div>
    </div>
  `;

  const gridEl = game.querySelector("#ss-grid");
  const journalEl = game.querySelector("#ss-journal");
  const progressText = game.querySelector("#ss-progress-text");
  const exitText = game.querySelector("#ss-exit-text");
  const trackEl = game.querySelector("#ss-track");
  const overlay = game.querySelector("#ss-overlay");
  const modal = game.querySelector("#ss-modal");

  function setJournal(text) {
    lastMessage = text;
    journalEl.innerHTML = `<strong>Field note:</strong><br>${text}`;
  }

  function renderTrack() {
    trackEl.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      const dot = document.createElement("span");
      if (i < found.size) dot.classList.add("done");
      trackEl.appendChild(dot);
    }
  }

  function renderBadges() {
    game.querySelectorAll(".ss-badge").forEach((badge, index) => {
      const id = String(index + 1);
      badge.classList.toggle("locked", !found.has(id));
      badge.classList.toggle("unlocked", found.has(id));
    });
  }

  function renderMap() {
    gridEl.innerHTML = "";

    for (let r = 0; r < map.length; r++) {
      for (let c = 0; c < map[r].length; c++) {
        const code = map[r][c];
        const tile = document.createElement("div");
        tile.className = "ss-tile";

        if (r === player.r && c === player.c) {
          tile.classList.add("ss-player");
        } else if (code === "W") {
          tile.classList.add("ss-wall");
        } else if (code === "P" || code === "S") {
          tile.classList.add("ss-path");
        } else if (["1", "2", "3", "4"].includes(code)) {
          tile.classList.add("ss-station");
          if (found.has(code)) tile.classList.add("done");
        } else if (code === "E") {
          tile.classList.add("ss-exit");
          if (found.size === 4) tile.classList.add("ready");
        }

        gridEl.appendChild(tile);
      }
    }

    progressText.textContent = `BADGES: ${found.size} / 4`;
    exitText.textContent =
      found.size === 4 ? "🚪 EXIT UNLOCKED" : "🚪 EXIT LOCKED";

    renderTrack();
    renderBadges();
  }

  function showModal(html) {
    modal.innerHTML = html;
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  function discover(id) {
    const item = discoveries[id];
    if (!item) return;

    if (!found.has(id)) {
      found.add(id);
      setJournal(item.journal);
      renderMap();
    }

    showModal(`
      <h3>${item.title}</h3>
      <p>${item.short}</p>
      <div class="ss-mini-card">
        <strong>Visual idea:</strong>
        ${item.visual}
      </div>
      <div class="ss-fact">
        <strong>Remember this:</strong><br>
        ${item.fact}
      </div>
      <div class="ss-modal-actions">
        <button type="button" class="ss-close" id="ss-close-modal">
          COLLECT BADGE ✔
        </button>
      </div>
    `);

    modal.querySelector("#ss-close-modal").onclick = closeModal;
  }

  function finishGame() {
    finished = true;
    setJournal("Mission complete! Dr. Mini escaped the tissue sample.");

    showModal(`
      <div class="ss-end">
        <div class="ss-end-badge">🏆🧑‍🔬✨</div>
        <h3>You Escaped the Tissue!</h3>
        <p>
          Dr. Mini collected all 4 discovery badges and found the exit.
        </p>

        <div class="ss-fact" style="text-align:left">
          <strong>What you discovered:</strong>
          <ul style="margin:10px 0 0 18px;line-height:1.65">
            <li>A tissue is made of many similar cells working together.</li>
            <li>A microscope only shows a tiny part of a tissue at one time.</li>
            <li>Scientists examine more than one area before making conclusions.</li>
            <li>A slide is a thin slice of tissue, not the whole organ.</li>
          </ul>
        </div>

        <div class="ss-modal-actions">
          <button type="button" class="ss-close" id="ss-close-finish">
            AWESOME! 🎉
          </button>
        </div>
      </div>
    `);

    modal.querySelector("#ss-close-finish").onclick = closeModal;
  }

  function canMoveTo(r, c) {
    if (r < 0 || c < 0 || r >= map.length || c >= map[0].length) return false;
    return map[r][c] !== "W";
  }

  function tryMove(dr, dc) {
    if (overlay.classList.contains("show")) return;
    if (finished) return;

    const nr = player.r + dr;
    const nc = player.c + dc;

    if (!canMoveTo(nr, nc)) {
      setJournal("Bump! That path is blocked by giant liver cells. Try a different direction.");
      return;
    }

    player = { r: nr, c: nc };
    renderMap();

    const code = map[nr][nc];

    if (["1", "2", "3", "4"].includes(code)) {
      discover(code);
      return;
    }

    if (code === "E") {
      if (found.size < 4) {
        setJournal("The exit is still locked. Find all 4 discovery stations first.");
      } else {
        finishGame();
      }
      return;
    }

    setJournal("Dr. Mini is exploring the tissue pathways. Keep searching for discovery stations.");
  }

  game.querySelector("#ss-up").onclick = () => tryMove(-1, 0);
  game.querySelector("#ss-down").onclick = () => tryMove(1, 0);
  game.querySelector("#ss-left").onclick = () => tryMove(0, -1);
  game.querySelector("#ss-right").onclick = () => tryMove(0, 1);

  function keyHandler(e) {
    if (!game.isConnected) {
      window.removeEventListener("keydown", keyHandler);
      return;
    }

    if (overlay.classList.contains("show")) {
      if (e.key === "Escape") closeModal();
      return;
    }

    if (page !== (location.pathname.split("/").pop() || "index.html")) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      tryMove(-1, 0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      tryMove(1, 0);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      tryMove(0, -1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      tryMove(0, 1);
    } else if (e.key === "Escape") {
      closeModal();
    }
  }

  window.addEventListener("keydown", keyHandler);

  renderMap();
})();
