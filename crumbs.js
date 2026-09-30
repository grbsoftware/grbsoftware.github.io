/* grbsoftware breadcrumbs: a small "more from grbsoftware" footer for every public project.

   Put this where the footer should go (the link inside is what search engines and
   no-JS visitors see; the script swaps in the full footer):

     <grb-crumbs><a href="https://grbsoftware.github.io/">More from grbsoftware</a></grb-crumbs>
     <script src="https://grbsoftware.github.io/crumbs.js" defer></script>

   Options on the element:
     here="licorice"   hide this project from the list (auto-detected from the URL otherwise)
     tone="light" | "dark"   force colors; by default it inherits the page's text color

   To add a project or change the tip link, edit PROJECTS / TIP below. Every site
   picks the change up on its next page load. Keep index.html's list in step. */
(() => {
  const HUB = 'https://grbsoftware.github.io/';
  const TIP = { href: 'https://ko-fi.com/grbsoftware', label: 'Tip jar' };
  const PROJECTS = [
    { id: 'licorice', name: 'Licorice', line: 'a fresh coloring page every time', href: HUB + 'licorice/', dot: '#9447cf' },
    { id: 'radiance', name: 'Radiance', line: 'even color palettes', href: HUB + 'Radiance/', dot: '#e8743b' },
    { id: 'sjonis', name: 'Sjonis', line: 'themeable UI kit', href: HUB + 'Sjonis/', dot: '#3593da' },
    { id: 'flocker-core', name: 'Flocker', line: 'swarm optimizer', href: 'https://github.com/grbsoftware/flocker-core', dot: '#5fb544' },
  ];

  const CSS = `
grb-crumbs{display:block}
.grbc{--c:currentColor;font:inherit;font-size:14px;line-height:1.45;color:inherit;
  border-top:1px solid color-mix(in srgb,var(--c) 14%,transparent);margin-top:24px;padding:20px 0 28px}
.grbc[data-tone=light]{color:#17141c;background:#fff}
.grbc[data-tone=dark]{color:#eeeaf3;background:#15131a}
.grbc *{box-sizing:border-box}
.grbc-in{width:min(1080px,100% - 32px);margin-inline:auto;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px}
.grbc-head{flex:1 1 100%;display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}
.grbc-title{font-weight:700;opacity:.9}
.grbc a{color:inherit;text-decoration:none}
.grbc-all{opacity:.7;border-bottom:1px solid transparent}
.grbc-all:hover,.grbc-all:focus-visible{opacity:1;border-color:currentColor}
.grbc-list{flex:1 1 auto;display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.grbc-list a{display:inline-flex;align-items:center;gap:8px;padding:7px 13px 7px 11px;border-radius:999px;
  border:1px solid color-mix(in srgb,var(--c) 16%,transparent);transition:background .15s,border-color .15s}
.grbc-list a:hover,.grbc-list a:focus-visible{background:color-mix(in srgb,var(--c) 7%,transparent);border-color:color-mix(in srgb,var(--c) 32%,transparent)}
.grbc-dot{width:9px;height:9px;border-radius:50%;flex:none}
.grbc-name{font-weight:700}
.grbc-line{opacity:.65}
.grbc-tip{display:inline-flex;align-items:center;gap:8px;padding:8px 16px 8px 13px;border-radius:999px;font-weight:700;
  background:#17141c;color:#fff;transition:transform .15s}
.grbc-tip:hover,.grbc-tip:focus-visible{transform:translateY(-1px)}
.grbc a:focus-visible{outline:2px solid #3593da;outline-offset:3px}
.grbc-tip svg{width:18px;height:18px;flex:none}
@media (max-width:600px){.grbc-line{display:none}}
@media (prefers-reduced-motion:reduce){.grbc a{transition:none}.grbc-tip:hover{transform:none}}`;

  // The tip button is filled with the page's text color, so it reads as solid ink on
  // any site, light or dark; its label takes whichever of black/white contrasts.
  function inkOf(el) {
    const color = getComputedStyle(el).color;
    const m = color.match(/\d+(\.\d+)?/g);
    if (!m) return null;
    const [r, g, b] = m.map(Number);
    return { bg: color, fg: (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? '#17141c' : '#fff' };
  }

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cup = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V8zm13 1h1.5a2.5 2.5 0 0 1 0 5H17" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 3.5c0 1 1 1 1 2M13 3.5c0 1 1 1 1 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

  function hereId(el) {
    const set = (el.getAttribute('here') || '').toLowerCase();
    if (set) return set;
    const url = location.href.toLowerCase();
    const p = PROJECTS.find(p => url.startsWith(p.href.toLowerCase()));
    return p ? p.id : '';
  }

  function render(el) {
    const here = hereId(el);
    const tone = el.getAttribute('tone');
    const others = PROJECTS.filter(p => p.id !== here);
    const onHub = location.href.toLowerCase().replace(/index\.html$/, '') === HUB;
    el.innerHTML = `<nav class="grbc"${tone ? ` data-tone="${esc(tone)}"` : ''} aria-label="More from grbsoftware">
  <div class="grbc-in">
    <div class="grbc-head"><span class="grbc-title">More from grbsoftware</span>${onHub ? '' : `<a class="grbc-all" href="${HUB}">All projects &rarr;</a>`}</div>
    <ul class="grbc-list">${others.map(p => `<li><a href="${esc(p.href)}"><span class="grbc-dot" style="background:${esc(p.dot)}"></span><span class="grbc-name">${esc(p.name)}</span><span class="grbc-line">${esc(p.line)}</span></a></li>`).join('')}</ul>
    <a class="grbc-tip" href="${esc(TIP.href)}" target="_blank" rel="noopener">${cup}<span>${esc(TIP.label)}</span></a>
  </div>
</nav>`;
    const ink = inkOf(el.firstElementChild);
    if (ink) Object.assign(el.querySelector('.grbc-tip').style, { background: ink.bg, color: ink.fg });
  }

  if (!document.getElementById('grbc-css')) {
    const s = document.createElement('style');
    s.id = 'grbc-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  if (!customElements.get('grb-crumbs')) {
    customElements.define('grb-crumbs', class extends HTMLElement {
      connectedCallback() { render(this); }
    });
  }
})();
