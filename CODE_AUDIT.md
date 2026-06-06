# Portfolio Code Audit — Issues & Standards Violations

Generated: 2026-06-07
Scope: All source files in kashribha.github.io/

---

## CRITICAL — Must Fix

### 1. Stray Python scripts inside images/
**Files:**
- images/update_html_projects.py
- images/update_images.py
- images/update_js_projects.py
- images/update_proj_detailed.py

**Problem:** Generator/patch scripts committed into the images/ asset directory. These are not website assets and will be publicly served by GitHub Pages. Exposes internal implementation logic.
**Fix:** Delete all four files. They serve no runtime purpose.

---

### 2. Modal system uses `display: none` + opacity — transitions are broken
**File:** projects.html (line 31)

**Problem:** `.modal-overlay` is defined with `display: none` in the inline `<style>` block, but transitions on `opacity` cannot fire when `display` jumps from `none` to `flex`. The JS then force-injects `style="display: flex"` and reads the override via an attribute selector `.modal-overlay[style*="display: flex"]`. This is fragile — it breaks if any other code sets inline style, and the open transition never actually plays because the element is invisible one frame and opaque the next.
**Fix:** Replace with the `.active` class pattern already defined in `style.css`. Set `display: flex` always, use `opacity: 0; pointer-events: none` for closed state, and toggle `.active` to reveal. This is what the CSS in `style.css` already expects.

---

### 3. CSS has three duplicate `#grid-trail` and `.grid-cell` rule blocks
**File:** assets/css/style.css

**Problem:** The selector `#grid-trail` is defined 3 times (lines ~310, ~340, ~360) and `.grid-cell` / `.grid-cell.active` are each defined 3 times with conflicting property values (border opacity changes from 0.04 → 0.05 → 0.08; active background from 0.25 → 0.25 → 0.4). Only the last definition wins. The earlier ones are dead code.
**Fix:** Keep only the final definition block. Delete the two earlier duplicate blocks.

---

### 4. Unused dead CSS rules — `interactive-face`, `eye`, `pupil`, `mouth`, `.marquee-wrapper`, `.marquee`
**File:** assets/css/style.css

**Problem:** Approximately 60 lines of CSS for `.interactive-face`, `.eye`, `.pupil`, `.mouth` (and all emotion variants: `.smile`, `.surprised`, `.neutral`, `.big-smile`, etc.) exist in `style.css` but there is no `.interactive-face` element anywhere in any HTML file. The emoji face was removed. Similarly `.marquee-wrapper` and `.marquee` CSS (and `@keyframes scrollMarquee`) are defined but no HTML uses these classes.
**Fix:** Delete all unused rule sets. Reduces CSS payload and eliminates confusion for future maintenance.

---

### 5. `#portfolio-grid` defined in both `style.css` and inline `<style>` in `projects.html`
**File:** projects.html (inline `<style>` block) + assets/css/style.css (PAGINATION section at bottom)

**Problem:** The grid layout is defined twice — once as `.projects-grid` in `style.css` and again as `#portfolio-grid` in the bottom of `style.css` and also implicitly relied on via the inline `<style>` in `projects.html`. The HTML uses `class="projects-grid" id="portfolio-grid"` meaning BOTH rule sets apply. The `gap` is 4rem in `.projects-grid` but 2rem in `#portfolio-grid`. Since ID specificity beats class, the 2rem wins but the 4rem rule is dead weight.
**Fix:** Remove the `.projects-grid` class definition from `style.css` (or unify both into one rule under `#portfolio-grid`).

---

### 6. Excessive `!important` abuse throughout inline `<style>` in `projects.html`
**File:** projects.html (lines 14–207)

**Problem:** Almost every single CSS property in the inline `<style>` block ends with `!important`. Counted ~65 uses. This is a symptom of specificity wars caused by rule duplication. `!important` on `display`, `width`, `height`, `overflow`, `padding`, `margin`, `z-index`, `transform`, `opacity`, `border-radius`, `font-size`, `line-height`, `color`, `background`, etc. makes overriding any style in future impossible without adding more `!important`.
**Fix:** Consolidate all modal styles into `style.css` as regular rules with proper specificity (`.modal-overlay`, `.modal-content`, `.modal-body`). The `style.css` file already has a modal section — merge and use that.

---

### 7. Hardcoded inline styles on every major element in `index.html` and `projects.html`
**Files:** index.html, projects.html, git_projects.html

**Problem:** Layout and positioning are controlled with inline `style="..."` attributes on `<header>`, `<section>`, `<div>`, `<h2>`, `<p>`, `<a>`. Examples:
- `index.html` line 11: `<section ... style="margin-top: 3rem;">`
- `index.html` line 12: `<header class="hero" style="display: flex; flex-direction: column; align-items: center; ...">`
- `contact.html` line 16: `<h2 class="section-title" style="text-align: center; display: block;">`
- `git_projects.html` line 18: `<section ... style="text-align: center; margin-top: 10vh;">`

Inline styles are untestable, non-overridable (without `!important`), and violate separation of concerns.
**Fix:** Move all layout/presentation concerns into named CSS classes in `style.css`.

---

### 8. projects.html — Missing active class on nav link
**File:** projects.html (lines 219–224)

**Problem:** None of the `<nav>` links has `class="active"` in `projects.html`. Every other page sets active on its own link (index.html sets active on "Intro", git_projects.html sets active on "Git Projects"). Projects page leaves all nav links without the active state, so navigation highlight is broken here.
**Fix:** Add `class="active"` to the Projects `<a>` tag in `projects.html`'s nav.

---

### 9. `experience.html` and `contact.html` — No active class on their nav links
**Files:** experience.html, contact.html

**Problem:** Same as above. Neither file marks its corresponding nav link as active. The JS in `main.js` tries to auto-detect this using `window.location.pathname`, which works correctly only when served from a real web server (not when opened as a local file). For GitHub Pages it should work, but the HTML-defined `class="active"` is the more robust fallback and is missing.
**Fix:** Add `class="active"` to the respective nav link in each page.

---

### 10. `<p>` wrapping `<h3>` — Invalid HTML nesting in projects.html
**File:** projects.html (line 479)

**Problem:**
```html
<p><h3><a href="...">GitHub - ...</a></h3></p>
```
A block-level element (`<h3>`) cannot be a child of a `<p>` element. This is invalid HTML5 and will cause browsers to auto-close the `<p>` before rendering the `<h3>`, creating an empty `<p>` and a detached `<h3>`.
**Fix:** Replace `<p><h3>...</h3></p>` with just `<h3>...</h3>`.

---

### 11. `nav a` indentation inconsistency in `style.css`
**File:** assets/css/style.css (approx. line 62)

**Problem:**
```css
nav a {
color: var(--text-bold);   /* ← no indentation */
  text-decoration: none;   /* ← 2-space indent */
```
The first property `color` has no leading indentation while all subsequent properties are indented with 2 spaces. Inconsistent formatting throughout the file mixes 2-space and 4-space indentation, and some multi-property rules are on single lines with no indentation at all.
**Fix:** Apply consistent 4-space indentation across the entire `style.css`. Run through a CSS formatter (e.g., Prettier).

---

### 12. `SASS` directory committed but unused
**Directory:** assets/sass/

**Problem:** The `assets/sass/` directory contains the full HTML5 UP template SASS source files (base, components, layout, libs). These are NOT the source for `assets/css/style.css` — that file was written from scratch. The SASS files describe an entirely different design system and produce CSS that conflicts with the custom theme. They are dead weight (~30 files).
**Fix:** Delete the entire `assets/sass/` directory. It has no build pipeline, is not compiled anywhere, and belongs to the old discarded template.

---

### 13. `LICENSE.txt` and `README.txt` belong to the old HTML5 UP template
**Files:** LICENSE.txt, README.txt

**Problem:** Both files reference the HTML5 UP template (Solid State / Dimension by html5up.net, CCA 3.0 license). The site no longer uses that template. Keeping them implies the site is still built on HTML5 UP, which it is not.
**Fix:** Replace with appropriate files — a custom `README.md` describing the portfolio, and either remove `LICENSE.txt` or replace it with the correct license for your own work.

---

### 14. `cert-rotation` card shares the same image (`server.jpg`) as `mcp-oauth` card
**File:** projects.html (lines 234, 242)

**Problem:** Both "MCP with OAuth2 & Monitoring" and "Emergency Certificate Rotation" use `images/server.jpg` as their card thumbnail. This makes the two most prominent 2026 projects visually indistinguishable at first glance.
**Fix:** Source a distinct image for one of the cards (e.g., a certificate/lock icon image for cert-rotation).

---

### 15. Pagination buttons use Font Awesome icon classes but FA is never loaded
**File:** projects.html (lines 353–354)

**Problem:**
```html
<i class="fa fa-chevron-up"></i>
<i class="fa fa-chevron-down"></i>
```
Font Awesome is not linked in any `<head>`. The `assets/webfonts/` directory contains FA font files, but no `<link rel="stylesheet">` for fontawesome-all.min.css exists in any HTML file. The icons will silently render as empty/broken.
**Fix:** Either add a `<link>` to `assets/css/fontawesome-all.min.css` in each HTML `<head>`, OR replace the icon tags with plain Unicode arrows (↑ / ↓) or SVG icons.

---

## WARNINGS — Should Fix

### W1. No `<meta name="description">` on any page
All HTML files are missing SEO meta descriptions. GitHub Pages sites are indexed by search engines.
**Fix:** Add a relevant `<meta name="description" content="...">` to each page's `<head>`.

### W2. No `<meta property="og:*">` Open Graph tags
No social sharing preview metadata on any page.
**Fix:** Add at minimum `og:title`, `og:description`, `og:image` to `index.html`.

### W3. All pages have identical `<title>` tag
`index.html`, `experience.html`, `contact.html`, `projects.html` all share the same title: "K Shrinidhi Bhagavath | Software Engineer". Only `git_projects.html` has a distinct title.
**Fix:** Give each page a unique, descriptive title (e.g., "K Shrinidhi Bhagavath | Experience", "K Shrinidhi Bhagavath | Projects").

### W4. Form in `contact.html` has no client-side validation feedback
The form submits to Formspree but there is no JS feedback for success/failure states. The user gets redirected away from your portfolio.
**Fix:** Use Formspree's AJAX API and show an inline success/error message without a page redirect.

### W5. `git_projects.html` is a permanent placeholder — no content
The page has been "Work In Progress" since creation with no actual content. This is a dead link in the nav visible to all visitors.
**Fix:** Either populate it with actual GitHub repos or remove the nav link until it's ready.

### W6. Images have no `width`/`height` attributes
All `<img>` tags in project cards lack explicit `width` and `height` attributes, causing layout shift (CLS) as the page loads.
**Fix:** Add `width` and `height` attributes matching the intrinsic image dimensions.

### W7. No `rel="noopener noreferrer"` on external links
`target="_blank"` links (LinkedIn, GitHub, LTree GitHub) are missing `rel="noopener noreferrer"`, which is a minor security risk (tab-napping).
**Fix:** Add `rel="noopener noreferrer"` to all `target="_blank"` anchors.

### W8. `main.js` uses `var` throughout instead of `const`/`let`
The entire `main.js` uses function-scoped `var` declarations. This is ES5-style code — inconsistent with modern ES6+ standards used for everything else.
**Fix:** Replace `var` with `const` (for non-reassigned) or `let` (for reassigned variables). Use arrow functions consistently.

### W9. Modal content for `cert-rotation` is sparse — only 2 sentences
The cert-rotation modal has minimal detail compared to the project's importance as your flagship 2026 project.
**Fix:** Expand with technical details: what CPS is, how rotation is triggered, what the pipeline does, languages/tools used.

---

## SUMMARY TABLE

| # | Severity | File(s) | Issue |
|---|----------|---------|-------|
| 1 | CRITICAL | images/*.py | 4 stray Python scripts in asset dir |
| 2 | CRITICAL | projects.html | Modal display:none blocks CSS transitions |
| 3 | CRITICAL | style.css | 3 duplicate #grid-trail rule blocks |
| 4 | CRITICAL | style.css | ~60 lines dead CSS (emoji face, marquee) |
| 5 | CRITICAL | style.css + projects.html | Duplicate grid layout rules conflicting |
| 6 | CRITICAL | projects.html | ~65 `!important` declarations in inline style |
| 7 | CRITICAL | index.html, projects.html, contact.html | Inline styles everywhere |
| 8 | CRITICAL | projects.html | Active nav class missing |
| 9 | CRITICAL | experience.html, contact.html | Active nav class missing |
| 10 | CRITICAL | projects.html line 479 | Invalid HTML: `<p><h3>` nesting |
| 11 | HIGH | style.css | Inconsistent indentation |
| 12 | HIGH | assets/sass/ | Entire SASS dir is dead template code |
| 13 | HIGH | LICENSE.txt, README.txt | Wrong license/readme from old template |
| 14 | MEDIUM | projects.html | Duplicate thumbnail image on 2 cards |
| 15 | MEDIUM | projects.html | FA icons referenced but FA never loaded |
| W1 | WARN | All HTML | No SEO meta description |
| W2 | WARN | index.html | No Open Graph tags |
| W3 | WARN | All HTML | Identical page titles |
| W4 | WARN | contact.html | No AJAX form submission feedback |
| W5 | WARN | git_projects.html | Permanently empty nav page |
| W6 | WARN | projects.html | Images missing width/height attributes |
| W7 | WARN | All HTML | Missing rel="noopener noreferrer" |
| W8 | WARN | main.js | var instead of const/let throughout |
| W9 | WARN | projects.html | cert-rotation modal content too sparse |
