
(() => {
  "use strict";

  const app = document.getElementById("app");
  if (!app) return;

  const chapters = [
    {
      title: "ESCAPE THE CELL",
      subtitle: "HBV is chasing you! Explore the liver cell and recover four science files.",
      items: [
        {
          name: "CELL MEMBRANE",
          x: 135, y: 180,
          color: "#79e9d6",
          symbol: "GATE",
          fact: "The cell membrane protects the cell and controls what enters and leaves.",
          detail: "Hepatitis B attaches to a special protein on the liver cell's surface before entering. The membrane acts like a security boundary around the cell."
        },
        {
          name: "NUCLEUS",
          x: 510, y: 180,
          color: "#c4a0ff",
          symbol: "DNA",
          fact: "The nucleus stores DNA, the instructions that help a cell work.",
          detail: "Hepatitis B carries genetic instructions. During infection, viral DNA reaches the nucleus and forms a template used to help make more viruses."
        },
        {
          name: "CYTOPLASM",
          x: 280, y: 420,
          color: "#83cafa",
          symbol: "CELL",
          fact: "Cytoplasm is the jelly-like substance surrounding the structures inside a cell.",
          detail: "Many important activities happen inside the cytoplasm. Hepatitis B uses a living liver cell's machinery to help make viral material."
        },
        {
          name: "MITOCHONDRIA",
          x: 825, y: 390,
          color: "#ffd378",
          symbol: "POWER",
          fact: "Mitochondria help provide usable energy for a liver cell.",
          detail: "Liver cells need energy to perform their important jobs. Your liver processes nutrients, stores energy, and helps remove harmful substances from the blood."
        }
      ]
    },
    {
      title: "THE VIRUS INVASION",
      subtitle: "Investigate the five stages of hepatitis B infection.",
      items: [
        {
          name: "FIND THE DOORWAY", x: 135, y: 180,
          fact: "Hepatitis B is a viral infection that targets the liver.",
          detail: "HBV can travel through infected blood and attaches to a special protein on liver cells. It does not spread through hugging, sharing meals, or ordinary friendship."
        },
        {
          name: "ENTER THE CELL", x: 510, y: 180,
          fact: "The virus enters the liver cell and sends its genetic material toward the nucleus.",
          detail: "A liver cell has a cell membrane, cytoplasm, and nucleus. The virus passes through the membrane to begin the infection."
        },
        {
          name: "USE THE MACHINERY", x: 825, y: 180,
          fact: "Viral DNA forms a template. The liver cell's machinery helps make viral proteins and genetic material.",
          detail: "Viruses depend on living cells to reproduce. Hepatitis B uses the cell's machinery to produce its own components."
        },
        {
          name: "MAKE MORE VIRUSES", x: 280, y: 420,
          fact: "New virus particles are assembled and can leave the cell to infect other liver cells.",
          detail: "An ongoing infection may involve many liver cells. Not every person experiences the same effects."
        },
        {
          name: "IMMUNE DEFENDERS", x: 825, y: 390,
          fact: "Much of the liver-cell injury happens when immune defenders respond to infected cells.",
          detail: "The immune system helps protect the body, but this response can also damage infected liver cells and cause inflammation."
        }
      ]
    },
    {
      title: "TISSUE DETECTIVE",
      subtitle: "Travel through liver tissue and discover what can happen during infection.",
      items: [
        {
          name: "HEALTHY TISSUE", x: 135, y: 180,
          fact: "Groups of cells form tissues. Different tissues build organs, including the liver.",
          detail: "In our simplified model, pink shapes represent liver cells and purple dots represent nuclei. Healthy-looking cells can work together to help the liver function."
        },
        {
          name: "CELL INJURY", x: 510, y: 180,
          fact: "The orange shapes in the original tissue model represent injured liver cells.",
          detail: "The blue circles represent immune defenders responding to infection. These immune responses can injure infected cells."
        },
        {
          name: "INFLAMMATION", x: 825, y: 390,
          fact: "Inflammation can occur when immune defenders respond to infected liver cells.",
          detail: "Changes to many liver cells can affect how tissues work. Changes to tissues can eventually affect the whole liver."
        },
        {
          name: "SCAR TISSUE", x: 280, y: 420,
          fact: "Ongoing liver injury may cause scar tissue, called fibrosis.",
          detail: "Severe scarring is called cirrhosis and can affect liver function. Not everyone with hepatitis B develops significant scarring."
        }
      ]
    },
    {
      title: "THE RESCUE LAB",
      subtitle: "Collect the evidence needed to protect Liver City.",
      items: [
        {
          name: "TRANSMISSION", x: 135, y: 180,
          fact: "Hepatitis B can spread through infected blood and certain other body fluids.",
          detail: "Possible routes include sharing used needles and transmission from an infected parent to a baby during birth. HBV does not spread through hugging, sharing food, or sitting beside someone."
        },
        {
          name: "VACCINATION", x: 510, y: 180,
          fact: "The hepatitis B vaccine helps the immune system protect against infection.",
          detail: "Vaccination helps prevent hepatitis B, but it does not cure an existing infection."
        },
        {
          name: "BLOOD TESTING", x: 825, y: 180,
          fact: "Someone can have hepatitis B without showing symptoms.",
          detail: "A blood test can detect hepatitis B even when a person feels healthy."
        },
        {
          name: "MEDICAL CARE", x: 280, y: 420,
          fact: "People with long-lasting hepatitis B may need regular medical check-ups.",
          detail: "Some people need medicine to lower the risk of serious liver damage. Some infections are short-term, while others last a long time."
        },
        {
          name: "TISSUE TIME MACHINE", x: 825, y: 390,
          fact: "Repeated liver injury can sometimes lead to scar tissue.",
          detail: "Our original time-machine activity showed a possible progression from healthy-looking cells to inflammation, repeated injury, and significant scarring. This does not happen to everyone."
        }
      ]
    },
    {
      title: "FINAL RESCUE",
      subtitle: "Recover five records to complete your adventure.",
      items: [
        {
          name: "CELL STRUCTURES", x: 135, y: 180,
          fact: "The nucleus, membrane, cytoplasm, and mitochondria all help a liver cell function.",
          detail: "Each structure plays a different role in keeping the cell working."
        },
        {
          name: "HBV INFECTION", x: 510, y: 180,
          fact: "HBV infects liver cells and uses their machinery to make more viruses.",
          detail: "The immune response to infected cells can cause inflammation and injury."
        },
        {
          name: "CELLS TO ORGANS", x: 825, y: 180,
          fact: "Cells form tissues, and tissues help form organs.",
          detail: "The liver is an organ made of living cells and tissues that work together."
        },
        {
          name: "PROTECTION", x: 280, y: 420,
          fact: "Vaccination helps prevent HBV, while testing and care help identify and manage infection.",
          detail: "These tools have different jobs. Vaccination is preventive, and people with an infection may need monitoring or treatment."
        },
        {
          name: "MYTHBUSTERS", x: 825, y: 390,
          fact: "Hepatitis B does not spread through hugging, sharing meals, or ordinary friendship.",
          detail: "People living with hepatitis B should be treated with kindness and respect."
        }
      ]
    }
  ];

  const W = 1000;
  const H = 560;

  let level = 0;
  let player = { x: 500, y: 410 };
  let virus = { x: 800, y: 165 };
  let keys = {};
  let discovered = new Set();
  let hearts = 3;
  let running = false;
  let dialogue = false;
  let completed = false;
  let invulnerableUntil = 0;
  let lastTime = 0;

  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem("liverquest-chase-progress") || "{}");
    } catch {
      return {};
    }
  })();

  app.innerHTML = `
    <div class="lq-game">
      <header class="lq-header">
        <div class="lq-logo">LIVER<span>QUEST</span></div>
        <button id="lq-menu-button">CHAPTER SELECT</button>
      </header>

      <div class="lq-main">
        <div class="lq-heading">
          <div>
            <div class="lq-label" id="lq-chapter-label"></div>
            <h1 id="lq-title"></h1>
            <p id="lq-subtitle"></p>
          </div>
          <div class="lq-hud">
            <div id="lq-hearts"></div>
            <div id="lq-count"></div>
          </div>
        </div>

        <div class="lq-stage">
          <canvas id="lq-canvas" width="1000" height="560"></canvas>
          <div id="lq-prompt" class="lq-prompt" hidden></div>
        </div>

        <div class="lq-controls">
          <div class="lq-help">
            MOVE: WASD / ARROW KEYS
            <span>INTERACT: E / SPACE</span>
          </div>
          <div class="lq-mobile">
            <button data-dir="ArrowLeft">◀</button>
            <button data-dir="ArrowUp">▲</button>
            <button data-dir="ArrowDown">▼</button>
            <button data-dir="ArrowRight">▶</button>
            <button id="lq-action">E · OPEN</button>
          </div>
        </div>
      </div>

      <div class="lq-overlay" id="lq-overlay">
        <div class="lq-modal" id="lq-modal"></div>
      </div>
    </div>
  `;

  const $ = id => document.getElementById(id);
  const canvas = $("lq-canvas");
  const ctx = canvas.getContext("2d");

  function openModal(content) {
    dialogue = true;
    $("lq-modal").innerHTML = content;
    $("lq-overlay").classList.add("open");
  }

  function closeModal() {
    dialogue = false;
    $("lq-overlay").classList.remove("open");
    $("lq-modal").innerHTML = "";
  }

  function updateHUD() {
    $("lq-chapter-label").textContent = `CHAPTER ${level + 1} / 5`;
    $("lq-title").textContent = chapters[level].title;
    $("lq-subtitle").textContent = chapters[level].subtitle;

    $("lq-hearts").textContent =
      level === 0
        ? "♥ ".repeat(hearts) + "♡ ".repeat(3 - hearts)
        : "EXPLORATION MODE";

    $("lq-count").textContent =
      `${discovered.size} / ${chapters[level].items.length} FILES`;
  }

  function resetLevel(n) {
    level = n;
    player = { x: 500, y: 410 };
    virus = { x: 800, y: 165 };
    discovered = new Set();
    hearts = 3;
    completed = false;
    invulnerableUntil = performance.now() + 3000;
    running = false;
    updateHUD();

    openModal(`
      <div class="lq-kicker">LIVERQUEST · EPISODE ${level + 1}</div>
      <h2>${chapters[level].title}</h2>
      <p>${chapters[level].subtitle}</p>
      <p>
        ${level === 0
          ? "You're trapped inside a liver cell. HBV is following you! Reach the four glowing cell parts and collect their science files before losing all three hearts."
          : "Explore the microscopic world, approach the glowing science stations, and collect their information to complete this chapter."}
      </p>
      <button class="lq-primary" id="lq-begin">START MISSION →</button>
    `);

    $("lq-begin").onclick = () => {
      closeModal();
      running = true;
      lastTime = performance.now();
    };
  }

  function circle(x, y, r, fill, stroke, width = 1) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = width;
      ctx.stroke();
    }
  }

  function ellipse(x, y, rx, ry, fill, stroke, width = 1) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = width;
      ctx.stroke();
    }
  }

  function label(text, x, y, size = 14, color = "#fff") {
    ctx.textAlign = "center";
    ctx.font = `bold ${size}px Arial`;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  function background(time) {
    const gradient = ctx.createLinearGradient(0, 0, W, H);

    gradient.addColorStop(0, level === 0 ? "#452151" : "#263b58");
    gradient.addColorStop(1, "#101326");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    if (level === 0) {
      // A large simplified liver cell
      ellipse(500, 280, 475, 255, "#d980b4", "#ffd5e8", 13);
      ellipse(500, 280, 458, 238, "#f0add0", "#d681ac", 5);

      // Nucleus
      ellipse(510, 170, 120, 88, "#9b68bf", "#e4c2ff", 9);
      ellipse(510, 170, 85, 60, "#8152aa", "#b18ad5", 4);

      // Mitochondria
      for (let i = 0; i < 3; i++) {
        const x = 735 + i * 45;
        const y = 365 + i * 22;
        ellipse(x, y, 40, 19, "#efa85c", "#ffe2a2", 4);
      }

      // Cytoplasm details
      for (let i = 0; i < 18; i++) {
        const x = 200 + (i * 97) % 600;
        const y = 120 + (i * 67) % 315;
        circle(x, y, 5, "#ffe4f299");
      }

      label("CELL MEMBRANE", 150, 86, 13, "#763c64");
      label("NUCLEUS", 510, 140, 16);
      label("CYTOPLASM", 330, 480, 16, "#793d6a");
      label("MITOCHONDRIA", 820, 480, 13, "#793d6a");
    } else {
      // Different microscopic tissue environments
      for (let i = 0; i < 25; i++) {
        const x = 70 + (i * 157) % 900;
        const y = 50 + (i * 103) % 465;
        const r = 22 + (i % 4) * 8;
        circle(x, y, r, "#8c6cb444", "#d6a4dd55", 3);
        circle(x, y, r * 0.28, "#dbc1ee66");
      }
    }

    // Animated floating particles
    for (let i = 0; i < 28; i++) {
      const x = (i * 179 + time * 0.012) % W;
      const y = (i * 113 + Math.sin(time / 900 + i) * 20) % H;
      circle(x, y, 2.5, "#fff5cf88");
    }
  }

  function drawStations(time) {
    chapters[level].items.forEach((item, i) => {
      const collected = discovered.has(i);
      const bob = Math.sin(time / 300 + i) * 5;
      const color = collected ? "#78d7b2" : item.color || "#c6a0ff";

      circle(item.x, item.y + bob, 39, "#221838", color, 5);
      circle(item.x, item.y + bob, 27, color + "88");

      label(collected ? "✓" : "✦",
        item.x, item.y + bob + 11, 33);

      ctx.fillStyle = "#241631dd";
      ctx.fillRect(item.x - 87, item.y - 66, 174, 24);
      label(item.name, item.x, item.y - 49, 11);

      if (!collected) {
        circle(item.x, item.y + bob, 45, null, color + "88", 2);
      }
    });
  }

  function drawPlayer(time) {
    const x = player.x;
    const y = player.y;
    const bounce = Math.sin(time / 110) * 2;

    ellipse(x, y + 24, 21, 8, "#1a102777");

    // Scientist's suit
    circle(x, y + 8 + bounce, 23, "#4fd0c9", "#d8ffff", 4);

    // Helmet
    circle(x, y - 12 + bounce, 22, "#ffe2bf", "#e8ffff", 5);

    // Face
    circle(x - 7, y - 14 + bounce, 2.7, "#35253f");
    circle(x + 7, y - 14 + bounce, 2.7, "#35253f");

    label("YOU", x, y - 42, 13);
  }

  function drawVirus(time) {
    if (level !== 0 || completed) return;

    const x = virus.x;
    const y = virus.y;
    const bounce = Math.sin(time / 130) * 4;

    for (let i = 0; i < 10; i++) {
      const a = i * Math.PI / 5;
      const ax = x + Math.cos(a) * 25;
      const ay = y + bounce + Math.sin(a) * 25;
      const bx = x + Math.cos(a) * 38;
      const by = y + bounce + Math.sin(a) * 38;

      ctx.strokeStyle = "#b876f2";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();

      circle(bx, by, 6, "#f9a0c9");
    }

    circle(x, y + bounce, 27, "#7a4bb0", "#e3b8fb", 5);

    circle(x - 9, y - 5 + bounce, 6, "white");
    circle(x + 9, y - 5 + bounce, 6, "white");

    circle(x - 8, y - 5 + bounce, 3, "#281538");
    circle(x + 8, y - 5 + bounce, 3, "#281538");

    label("HBV", x, y - 47 + bounce, 15, "#fff0a6");
  }

  function nearestStation() {
    let best = -1;
    let distance = 80;

    chapters[level].items.forEach((item, i) => {
      if (discovered.has(i)) return;

      const d = Math.hypot(player.x - item.x, player.y - item.y);

      if (d < distance) {
        distance = d;
        best = i;
      }
    });

    return best;
  }

  function interact() {
    if (!running || dialogue || completed) return;

    const i = nearestStation();
    if (i < 0) return;

    const item = chapters[level].items[i];
    discovered.add(i);
    updateHUD();

    const isLast =
      discovered.size === chapters[level].items.length;

    if (isLast) {
      completed = true;
      saved[level] = true;
      try {
        localStorage.setItem(
          "liverquest-chase-progress",
          JSON.stringify(saved)
        );
      } catch {}
    }

    openModal(`
      <div class="lq-kicker">
        ${isLast ? "MISSION COMPLETE" : "SCIENCE FILE UNLOCKED"}
      </div>
      <h2>${item.name}</h2>
      <div class="lq-discovery">${item.fact}</div>
      <p>${item.detail}</p>
      <div class="lq-progress">
        DISCOVERIES: ${discovered.size} /
        ${chapters[level].items.length}
      </div>
      <button class="lq-primary" id="lq-continue">
        ${isLast
          ? (level === 4 ? "FINISH THE ADVENTURE →" : "NEXT CHAPTER →")
          : "KEEP EXPLORING →"}
      </button>
    `);

    $("lq-continue").onclick = () => {
      if (isLast) {
        if (level === 4) {
          showEnding();
        } else {
          closeModal();
          resetLevel(level + 1);
        }
      } else {
        closeModal();
        // Give the player some time to escape after reading.
        invulnerableUntil = performance.now() + 2600;
        virus = { x: 800, y: 165 };
      }
    };
  }

  function showEnding() {
    running = false;
    openModal(`
      <div class="lq-kicker">ALL FIVE CHAPTERS COMPLETE</div>
      <h2>YOU SAVED THE SCIENCE FILES!</h2>
      <div class="lq-discovery">
        LIVERQUEST CHAMPION
      </div>
      <p>
        You explored liver cells, learned how hepatitis B
        affects tissues, investigated infection, and discovered
        ways people can protect their health.
      </p>
      <p>
        Remember: people living with hepatitis B deserve
        kindness and proper medical care.
      </p>
      <button class="lq-primary" id="lq-replay">
        PLAY AGAIN →
      </button>
    `);

    $("lq-replay").onclick = () => {
      closeModal();
      resetLevel(0);
    };
  }

  function caught(time) {
    if (time < invulnerableUntil || level !== 0) return;

    const d = Math.hypot(
      player.x - virus.x,
      player.y - virus.y
    );

    if (d < 47) {
      hearts--;
      invulnerableUntil = time + 2400;
      virus = { x: 800, y: 165 };
      updateHUD();

      if (hearts <= 0) {
        running = false;

        openModal(`
          <div class="lq-kicker">HBV CAUGHT UP!</div>
          <h2>TRY AGAIN!</h2>
          <p>
            You've kept your science files. Run around the
            virus and reach the remaining cell parts.
          </p>
          <button class="lq-primary" id="lq-retry">
            CONTINUE THE ESCAPE →
          </button>
        `);

        $("lq-retry").onclick = () => {
          closeModal();
          hearts = 3;
          player = { x: 500, y: 410 };
          virus = { x: 800, y: 165 };
          invulnerableUntil = performance.now() + 3500;
          running = true;
          updateHUD();
        };
      }
    }
  }

  function frame(time) {
    const dt = Math.min(time - lastTime || 16, 40);
    lastTime = time;

    if (running && !dialogue) {
      let dx = Number(!!(keys.ArrowRight || keys.d)) -
               Number(!!(keys.ArrowLeft || keys.a));

      let dy = Number(!!(keys.ArrowDown || keys.s)) -
               Number(!!(keys.ArrowUp || keys.w));

      if (dx || dy) {
        const length = Math.hypot(dx, dy);
        const speed = 0.25;

        player.x += dx / length * speed * dt;
        player.y += dy / length * speed * dt;
      }

      player.x = Math.max(55, Math.min(W - 55, player.x));
      player.y = Math.max(55, Math.min(H - 55, player.y));

      // Keep the scientist inside the liver cell.
      if (level === 0) {
        const rx = (player.x - 500) / 430;
        const ry = (player.y - 280) / 213;
        const d = Math.hypot(rx, ry);

        if (d > 1) {
          player.x = 500 + (player.x - 500) / d;
          player.y = 280 + (player.y - 280) / d;
        }
      }

      // Virus follows the player in Chapter 1.
      if (level === 0 && !completed) {
        const dx = player.x - virus.x;
        const dy = player.y - virus.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 1) {
          const chaseSpeed = 0.10;
          virus.x += dx / distance * chaseSpeed * dt;
          virus.y += dy / distance * chaseSpeed * dt;
        }

        caught(time);
      }
    }

    background(time);
    drawStations(time);
    drawVirus(time);
    drawPlayer(time);

    // Invulnerability effect
    if (level === 0 && time < invulnerableUntil) {
      circle(player.x, player.y, 34,
        null, "#93fff0", 4);
    }

    const nearby = nearestStation();
    const prompt = $("lq-prompt");

    if (running && !dialogue && nearby >= 0) {
      prompt.hidden = false;
      prompt.textContent =
        "PRESS E — " + chapters[level].items[nearby].name;
    } else {
      prompt.hidden = true;
    }

    requestAnimationFrame(frame);
  }

  function showChapterMenu() {
    const wasRunning = running;
    running = false;

    openModal(`
      <div class="lq-kicker">EPISODE SELECT</div>
      <h2>CHOOSE A CHAPTER</h2>
      <div class="lq-chapters">
        ${chapters.map((chapter, i) => `
          <button data-chapter="${i}">
            <strong>0${i + 1}. ${chapter.title}</strong>
            <small>${saved[i] ? "✓ COMPLETED" : chapter.subtitle}</small>
          </button>
        `).join("")}
      </div>
      <button class="lq-secondary" id="lq-close-menu">
        BACK TO GAME
      </button>
    `);

    document.querySelectorAll("[data-chapter]").forEach(button => {
      button.onclick = () => {
        closeModal();
        resetLevel(Number(button.dataset.chapter));
      };
    });

    $("lq-close-menu").onclick = () => {
      closeModal();
      running = wasRunning;
      lastTime = performance.now();
    };
  }

  window.addEventListener("keydown", event => {
    const key = event.key.length === 1
      ? event.key.toLowerCase()
      : event.key;

    if (["ArrowUp", "ArrowDown", "ArrowLeft",
         "ArrowRight", " "].includes(key)) {
      event.preventDefault();
    }

    keys[key] = true;

    if ((key === "e" || key === " ") && !event.repeat) {
      interact();
    }
  });

  window.addEventListener("keyup", event => {
    const key = event.key.length === 1
      ? event.key.toLowerCase()
      : event.key;
    keys[key] = false;
  });

  window.addEventListener("blur", () => {
    keys = {};
  });

  document.querySelectorAll("[data-dir]").forEach(button => {
    const key = button.dataset.dir;

    button.addEventListener("pointerdown", event => {
      event.preventDefault();
      keys[key] = true;
      button.setPointerCapture(event.pointerId);
    });

    ["pointerup", "pointercancel", "lostpointercapture"]
      .forEach(type => {
        button.addEventListener(type, () => {
          keys[key] = false;
        });
      });
  });

  $("lq-action").onclick = interact;
  $("lq-menu-button").onclick = showChapterMenu;

  resetLevel(0);
  requestAnimationFrame(frame);
})();
