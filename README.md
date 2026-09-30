# grbsoftware.github.io

The hub for everything grbsoftware makes: https://grbsoftware.github.io/

- `index.html` — the link page (projects + tip jar).
- `crumbs.js` — the shared "More from grbsoftware" footer every public project loads.
- `robots.txt`, `sitemap.xml` — these cover the WHOLE grbsoftware.github.io domain, including every
  project site under it (/licorice/, /Radiance/, /Sjonis/). A project repo can't have its own.

## Add the footer to a project

Paste where the footer should go:

```html
<grb-crumbs><a href="https://grbsoftware.github.io/">More from grbsoftware</a></grb-crumbs>
<script src="https://grbsoftware.github.io/crumbs.js" defer></script>
```

The plain link inside is what search engines and no-JS visitors see. The footer takes the page's
text color, so it fits light and dark sites. Options: `here="licorice"` (hide the current project;
normally auto-detected), `tone="light"` / `tone="dark"` (force colors).

## Add a project

1. Add it to `PROJECTS` in `crumbs.js` (every site's footer updates on next load).
2. Add a card to `index.html` and an entry to its JSON-LD block.
3. Add its URL to `sitemap.xml`.
