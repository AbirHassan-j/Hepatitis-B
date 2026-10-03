# Inside Your Cells

An interactive science lesson for Grade 7–8 students. Over time it will teach how Hepatitis B affects liver cells and tissues. It's being built one section at a time, and this first version covers the basics: cells, tissues, organs and organ systems, plus a cell-parts matching activity.

## What's here now

- **Home** (`index.html`): a short intro, a "Start Exploring" button, and a map of the whole lesson.
- **Cells → Tissues → Organs** (`cells-tissues-organs.html`): a step-by-step "zoom out" from one cell to an organ system, a drag-the-cards ordering challenge with friendly hints, and a "See It in Action" video area.
- **Explore a Cell** (`explore-a-cell.html`): "Can You Find the Cell Parts?", where students drag Nucleus, Mitochondria, Cytoplasm and Cell Membrane onto a cell diagram.

Plain HTML, CSS and JavaScript. No frameworks, no build step, no logins, and no outside services. The site remembers finished activities on that computer only (using `localStorage`).

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
netlify dev
```

## Common edits

| I want to… | Edit |
|---|---|
| Change the wording in the cell → organ system steps | `LEVELS` in `js/levels-explorer.js` |
| Change the ordering cards, hints or success message | `ORDER_ACTIVITY` in `js/order-activity.js` |
| Change the cell-part labels or explanations | `MATCHING_ACTIVITY` in `js/matching-activity.js` |
| Use my own cell diagram | Replace `img/cell-diagram.svg` (or change the `<img>` in `explore-a-cell.html`). Then open `explore-a-cell.html?spots`, click each part to get its x / y numbers, and copy them into `MATCHING_ACTIVITY.parts` |
| Add the video | Put an MP4 at `videos/cells-to-systems.mp4` (or change the `<source>` in the VIDEO SECTION of `cells-tissues-organs.html`) |
| Change colours or fonts | The `:root` variables at the top of `css/style.css` |
| Add a new section | Copy a page, set its `data-section`, and set `ready: true` for it in `SITE_SECTIONS` in `js/site.js` |

## Still to come

1. Meet the Liver: what the liver is and what it does
2. A zoom from the liver → liver tissue → liver cell
3. Hepatitis B: what it is
4. What Happens During Infection?: how the virus gets into liver cells, the immune response, and what happens to infected cells
5. How cell damage can affect liver tissue and the whole liver
6. Activities: interactive Hepatitis B activities
7. Final Challenge
