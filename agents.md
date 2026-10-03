# AGENTS.md

## What this is
A static, multi-page educational site for Grade 7–8 students ("Inside Your Cells"). The lesson will eventually explain how Hepatitis B affects liver cells and tissues. It is being built **section by section at the owner's request**. Only build the section you are asked for. Don't add Hepatitis B content early.

## Stack and rules
- Plain HTML, CSS and vanilla JS. No framework, bundler or build step. `netlify.toml` publishes the repo root.
- No logins, no accounts, no Google products, no social media, no external services or CDNs (no web fonts either). No AI chatbot.
- Progress is kept only in `localStorage` (`Lesson.markDone(id)` in `js/site.js`).

## Layout
- `index.html`, `cells-tissues-organs.html`, `explore-a-cell.html`: one page per lesson section. Each `<body>` has `data-section="<id>"`, which matches `SITE_SECTIONS`.
- `js/site.js`: **`SITE_SECTIONS`** is the source of truth for the nav and the home "journey" map. Sections with `ready: false` show as "soon". Also has the `Lesson` helpers (`markDone`, `pop`). Load it first on every page.
- `js/levels-explorer.js` (`LEVELS`), `js/order-activity.js` (`ORDER_ACTIVITY`), `js/matching-activity.js` (`MATCHING_ACTIVITY`), `js/video.js`: one file per interactive piece. Its editable content/config object sits at the top of the file, and the logic is in an IIFE that only runs if its `data-*` root element exists on the page.
- `css/style.css`: a single stylesheet. Theme tokens live in `:root`. The look is a "sticker/notebook" style: flat colours, 3px ink borders, offset solid shadows. Avoid gradients, glassy effects or flashy motion.
- `img/`: hand-made SVG illustrations. `img/cell-diagram.svg` is a **placeholder** the owner will replace. Drop-spot positions are percentages in `MATCHING_ACTIVITY.parts`, and `?spots` on the page turns on a click-to-get-coordinates helper.
- `videos/`: the owner adds MP4s here. The video frame shows a "coming soon" placeholder until metadata loads.

## Conventions
- Big section comments in ALL CAPS (`// ORGANELLE MATCHING ACTIVITY`, `<!-- VIDEO SECTION -->`) so the owner can find things.
- Keep student-facing text short, friendly and conversational, at a Grade 7–8 level. Explain any science word in plain language.
- Drag interactions use Pointer Events (mouse + touch + pen). Always give a non-drag alternative (up/down buttons, tap-to-select then tap a spot).
- Wrong answers get a friendly hint, never just "Wrong", and never reveal the answer straight away.

## Adding the next section
Copy an existing page, set `data-section`, flip `ready: true` in `SITE_SECTIONS`, and update the "next stop" link at the bottom of the previous page (`explore-a-cell.html` currently says "Meet the Liver (coming soon)"). The planned order is listed in README.md under "Still to come".
