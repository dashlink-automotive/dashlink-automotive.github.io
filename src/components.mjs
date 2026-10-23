// DashLink site components. Every page in src/pages/ is an arrangement of these.
// Each returns an HTML string. Copy is trusted (authored by us) and may contain
// inline tags like <b>; attribute values go through esc().

import { SITE, APPS, NAV, PLANS, PLAN_ROWS } from './config.mjs';
import { playUrl } from './play-url.mjs';
import { mock } from './mocks.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const strip = (s = '') => String(s).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

/* Render context, set by the builder for each page (root path, page key, pillar). */
let ctx = { root: '', key: 'home', pillar: 'home' };
export const setContext = (c) => { ctx = c; };
const r = (p) => ctx.root + p;

/* ---------------- icons ---------------- */
const I = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  play: '<path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  usb: '<path d="M12 3v14M8 7l4-4 4 4M7 13v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2M12 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>',
  wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01M2 9a14.5 14.5 0 0 1 20 0"/>',
  unit: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M6 15h4"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2.4"/><path d="M11 18h2"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 14.5V21M9.6 11.2 3.4 9.6M14.4 11.2l6.2-1.6"/>',
  pin: '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  power: '<path d="M12 3v8M6.3 6.8a8 8 0 1 0 11.4 0"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  gauge: '<path d="M12 14l4-4"/><path d="M3.3 19a9 9 0 1 1 17.4 0"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  cloudoff: '<path d="M3 3l18 18M8.5 8.5A5 5 0 0 0 6 18h11M19.5 16.5A4 4 0 0 0 17 9h-.5A6 6 0 0 0 11 5.1"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  flag: '<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
  fuel: '<path d="M4 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14M3 20h12M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H17a3 3 0 0 0 0-6H7a3 3 0 0 1 0-6h8.5"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1.2-1.8-.5-1-.1-2.2 1.1-2.2H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7" r="1.2"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0M16 4.5a3.2 3.2 0 0 1 0 6.3M21 20a6 6 0 0 0-4-5.6"/>',
  laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
  mic: '<path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3"/>',
  pencil: '<path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/>',
  bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  start: '<path d="M8 5.5v13l10.5-6.5z"/>',
};
export const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${I[n] || I.check}</svg>`;

/* ---------------- badges ---------------- */
// Plan badges: features with no badge are free. Drive = Drive and Pro; Pro = Pro only.
export const proBadge = () => `<span class="badge badge-pro" title="Included in DashLink Pro">Pro</span>`;
export const driveBadge = () => `<span class="badge badge-drive" title="Included in DashLink Drive and Pro">Drive</span>`;
export const freeBadge = () => `<span class="badge badge-free" title="Free in DashLink">Free</span>`;
export const newBadge = () => `<span class="badge badge-new" title="New in DashLink">New</span>`;
const badges = (o) => (o.free ? freeBadge() : '') + (o.drive ? driveBadge() : '') + (o.pro ? proBadge() : '') + (o.isNew ? newBadge() : '');
export const tierBadge = (t) => (t === 'pro' ? proBadge() : t === 'drive' ? driveBadge() : t === 'free' ? freeBadge() : '');

/* ---------------- brand ---------------- */
export const wordmark = () => `<span class="wm">DashLink<span class="wm-dot">.</span></span>`;
let gid = 0;
export const racingMark = (cls = '') => { const g = 'rmg' + (++gid); return `<svg class="rmark ${cls}" viewBox="0 0 44 28" aria-hidden="true" focusable="false"><defs><linearGradient id="${g}" x1="0" x2="1" y1="1" y2="0"><stop offset="0" stop-color="#5b1820"/><stop offset=".55" stop-color="#e63946"/><stop offset="1" stop-color="#ffb4a8"/></linearGradient></defs><path fill="url(#${g})" d="M3 27 9 17h6L9 27zM14 27 22 10h6l-8 17zM25 27 36 1h6L31 27z"/></svg>`; };
export const racingLockup = (cls = '') => `<span class="lockup ${cls}">${wordmark()}<span class="lk-div" aria-hidden="true"></span>${racingMark()}<span class="lk-racing">Racing</span></span>`;

/* ---------------- buttons ----------------
   cta: { play: 'headunit' | 'wireless', label }  → Google Play button carrying UTMs
        { href: 'download/', label, ghost }       → internal link (root-relative) */
export function button(cta, opts = {}) {
  if (!cta) return '';
  const cls = `btn ${cta.ghost || opts.ghost ? 'btn-ghost' : 'btn-primary'} ${opts.cls || ''}`.trim();
  const ctaName = esc(cta.name || opts.name || (cta.play ? `play_${cta.play}` : 'link'));
  const plan = cta.plan ? ` data-plan="${esc(cta.plan)}"` : '';
  if (cta.play) {
    const app = APPS[cta.play];
    const fb = cta.play === 'headunit'
      ? ` data-fallback="${r('download/')}" data-fallback-label="${esc(cta.fallbackLabel || cta.label || 'Try DashLink free')}"`
      : ` data-fallback-hide`;
    return `<a class="${cls}" href="${esc(playUrl(app, ctx.key))}" data-play="${cta.play}" data-cta="${ctaName}"${plan}${fb} target="_blank" rel="noopener">${icon('play')}<span data-label>${cta.label || (cta.play === 'headunit' ? 'Try DashLink free' : 'Get it on Google Play')}</span></a>`;
  }
  const href = /^(https?:|mailto:|#)/.test(cta.href) ? cta.href : r(cta.href);
  const ext = /^https?:/.test(cta.href) ? ' target="_blank" rel="noopener"' : '';
  return `<a class="${cls}" href="${esc(href)}" data-cta="${ctaName}"${plan}${ext}>${cta.icon ? icon(cta.icon) : ''}<span>${cta.label}</span>${cta.arrow === false || cta.icon ? '' : icon('arrow', 'ic-arrow')}</a>`;
}

/* ---------------- media ----------------
   { img, w, h, alt, frame: 'hu' | 'photo' | 'bare' }  screenshot or photo (path under assets/images/)
   { mock: 'lap', ...props }                           a built-in illustration (src/mocks.mjs) */
export function media(m, opts = {}) {
  if (!m) return '';
  if (m.mock) return `<div class="mk-wrap">${mock(m.mock, m)}</div>`;
  const lazy = opts.eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  const img = `<img src="${r('assets/images/' + m.img)}" alt="${esc(m.alt)}"${m.w ? ` width="${m.w}" height="${m.h}"` : ''} ${lazy}>`;
  if (m.frame === 'float') return `<div class="cn-stage" data-tilt><span class="cn-glow" aria-hidden="true"></span><div class="cn-float"><div class="cn-card3d${m.mirror ? ' mirror' : ''}"${m.width ? ` style="width:min(${m.width}px,100%)"` : ''}><span class="cn-depth" aria-hidden="true"></span><span class="cn-edge" aria-hidden="true"></span>${img}<span class="cn-sheen" aria-hidden="true"></span></div></div></div>`;
  if (m.frame === 'stack') {
    const card = (c, i) => `<div class="cn-card3d st-card st-${i ? 'front' : 'back'}${i ? '' : ' mirror'}"><span class="cn-depth" aria-hidden="true"></span><span class="cn-edge" aria-hidden="true"></span><img src="${r('assets/images/' + c.img)}" alt="${esc(c.alt)}" width="${c.w}" height="${c.h}" loading="lazy" decoding="async"><span class="cn-sheen" aria-hidden="true"></span>${(c.tags || []).map((t) => `<span class="st-tag t-${t.tone || 'note'}" style="left:${t.x}%;top:${t.y}%"><i></i>${t.label}</span>`).join('')}</div>`;
    return `<div class="cn-stage st-stage" data-tilt><span class="cn-glow" aria-hidden="true"></span><div class="cn-float st-float">${m.cards.map(card).join('')}</div></div>`;
  }
  if (m.modes) {
    const m0 = m.modes[0];
    return `<div class="modes" data-modes style="--mc:${m0.color}">
      <div class="md-seg" role="tablist" aria-label="Live modes">${m.modes.map((md, i) => `<button type="button" role="tab" aria-selected="${i ? 'false' : 'true'}" data-mode="${md.key}" data-color="${md.color}" data-desc="${esc(md.desc)}">${md.name}</button>`).join('')}</div>
      <div class="hu md-hu"><div class="hu-screen" style="aspect-ratio:2000/1250">${m.modes.map((md, i) => `<img class="md-shot${i ? '' : ' on'}" data-mode="${md.key}" src="${r('assets/images/' + md.img)}" alt="${esc(md.alt)}" width="2000" height="1250" loading="lazy" decoding="async">`).join('')}</div></div>
      <p class="md-desc" aria-live="polite">${m0.desc}</p>
    </div>`;
  }
  if (m.spots) return `<div class="spotted" data-spotted><div class="spotted-in">${img}${m.spots.map((sp) => `<button type="button" class="xp-spot${sp.x > 70 ? ' sp-r' : sp.x < 30 ? ' sp-l' : ''}" style="left:${sp.x}%;top:${sp.y}%" aria-label="${esc(sp.label)}"><i></i><span>${sp.label}</span></button>`).join('')}</div></div>`;
  if (m.frame === 'phone') return phoneStage(m, '', opts.eager);
  // one screen, tilted, with its key parts lifted off it in 3D
  if (m.frame === 'exploded') return `<div class="lx-stage xl"><div class="lx-planes"><div class="lx-plane on">${img.replace('<img ', '<img class="lx-base" ')}${m.lifts.map((l, k) => `<figure class="lx-card${l.below ? ' below' : ''}${l.cls ? ' ' + l.cls : ''}" style="left:${l.x}%;top:${l.y}%;width:${l.w}%;--d:${k}"><img src="${r('assets/images/' + l.img)}" alt="" decoding="async"${opts.eager ? '' : ' loading="lazy"'}>${l.label ? `<figcaption>${l.label}</figcaption>` : ''}</figure>`).join('')}</div></div></div>`;
  // several screens stacked in depth, the front one with lifted parts
  if (m.frame === 'cascade') return `<div class="cs3"><div class="cs3-in">${m.screens.map((sc, i) => `<div class="cs3-scr cs3-${i}" style="--i:${i}"><img src="${r('assets/images/' + sc.img)}" alt="${esc(sc.alt)}" width="2000" height="1250" decoding="async"${opts.eager && i === m.screens.length - 1 ? ' fetchpriority="high"' : ' loading="lazy"'}><span class="cs3-tag">${sc.tag}</span>${(sc.lifts || []).map((l, k) => `<figure class="lx-card${l.below ? ' below' : ''}" style="left:${l.x}%;top:${l.y}%;width:${l.w}%;--d:${k}"><img src="${r('assets/images/' + l.img)}" alt="" decoding="async">${l.label ? `<figcaption>${l.label}</figcaption>` : ''}</figure>`).join('')}</div>`).join('')}</div></div>`;
  if (m.frame === 'phoneTabs') return phoneTabs(m);
  if (m.frame === 'sensorDemo') return sensorDemo(m);
  if (m.frame === 'phones') return `<div class="cn-stage ph-stage ph-fan" data-tilt><span class="cn-glow" aria-hidden="true"></span>${m.phones.map((p, i) => `<div class="cn-float ph-fan-${i}">${phone3d({ ...p, mirror: i === 0 })}</div>`).join('')}</div>`;
  if (m.frame === 'photo') return `<div class="photo">${img}</div>`;
  if (m.frame === 'browser') return `<div class="bs-window bs-mini">${browserChrome(m.url || '192.168.0.109:8765')}<div class="bs-view">${img}</div></div>`;
  if (m.frame === 'bare') return img;
  return `<div class="hu"><div class="hu-screen"${m.w ? ` style="aspect-ratio:${m.w}/${m.h}"` : ''}>${img}</div></div>`;
}

/* ---------------- hero ----------------
   Variants: { key: { match: ['trackday','track-day'], eyebrow?, title?, sub?, media? } }
   ?c=<key or alias> wins; otherwise utm_campaign is matched by substring
   (lower-cased, punctuation removed). Applied by an inline script before first
   paint, so there is no flash of the default headline. */
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
export function hero(h) {
  const vs = h.variants || {};
  const table = {};
  let templates = '';
  for (const [k, v] of Object.entries(vs)) {
    table[k] = { m: [...new Set([k, ...(v.match || [])].map(norm))] };
    for (const f of ['eyebrow', 'title', 'sub']) if (v[f] != null) table[k][f] = v[f];
    if (v.media) { table[k].media = 1; templates += `<template data-hv="${k}">${media(v.media, { eager: true })}</template>`; }
  }
  const script = Object.keys(vs).length ? `<script>(function(V){var q=new URLSearchParams(location.search),n=function(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'')},c=n(q.get('c')),u=n(q.get('utm_campaign')),k=null,x,i;if(c){for(x in V){if(V[x].m.indexOf(c)>-1){k=x;break}}}if(!k&&u){for(x in V){for(i=0;i<V[x].m.length;i++){if(u.indexOf(V[x].m[i])>-1){k=x;break}}if(k)break}}document.documentElement.setAttribute('data-variant',k||'default');if(!k)return;var v=V[k],H=document.getElementById('hero');['eyebrow','title','sub'].forEach(function(f){var e=H.querySelector('[data-h='+f+']');if(e&&v[f]!=null)e.innerHTML=v[f]});if(v.media){var t=H.querySelector('template[data-hv="'+k+'"]'),s=H.querySelector('[data-h=media]');if(t&&s)s.innerHTML=t.innerHTML}})(${JSON.stringify(table)});</script>` : '';

  const layout = h.layout || 'split';
  return `
<section class="hero hero-${layout}${h.cls ? ' ' + h.cls : ''}" id="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      ${h.top || ''}
      <span class="eyebrow reveal" data-h="eyebrow">${h.eyebrow || ''}</span>
      <h1 class="display reveal d1" data-h="title">${h.title}</h1>
      <p class="lead reveal d2" data-h="sub">${h.sub || ''}</p>
      <div class="hero-cta reveal d3">${button(h.primary || TRY_FREE, { name: 'hero_primary' })}${button(h.secondary === undefined ? SEE_PLANS : h.secondary, { ghost: true, name: 'hero_secondary' })}</div>
      ${h.note ? `<p class="hero-note reveal d3">${h.note}</p>` : ''}
      ${h.tier ? `<p class="page-tier reveal d3">${h.tier}</p>` : ''}
    </div>
    <div class="hero-media reveal-scale d2" data-h="media">${media(h.media, { eager: true })}</div>
  </div>
  ${templates}
</section>${script}`;
}

/* ---------------- anchor bar ----------------
   Sticky chip row that jumps to each feature block on the page. */
export function anchorBar(items) {
  return `<nav class="anchors" aria-label="On this page"><div class="anchors-in">${items
    .map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</div></nav>`;
}

/* ---------------- section head ---------------- */
export function head(s) {
  return `<div class="shead${s.center ? ' center' : ''}">
    ${s.eyebrow ? `<span class="eyebrow reveal">${s.eyebrow}</span>` : ''}
    <h2 class="h-xl reveal d1">${s.title}</h2>
    ${s.sub ? `<p class="lead reveal d2">${s.sub}</p>` : ''}
  </div>`;
}

/* ---------------- feature block (image left / right) ----------------
   { id, kicker, title, body, bullets: [], media, flip, pro, isNew, note, cta } */
export function feature(f) {
  return `
<section class="fb${f.flip ? ' flip' : ''}${f.cls ? ' ' + f.cls : ''}" id="${f.id}">
  <div class="wrap fb-in">
    <div class="fb-copy">
      <span class="kicker reveal">${f.kicker || ''}${badges(f)}</span>
      <h2 class="h-lg reveal d1">${f.title}</h2>
      <p class="fb-body reveal d2">${f.body}</p>
      ${f.bullets ? `<ul class="ticks reveal d2">${f.bullets.map((b) => `<li>${icon('check')}<span>${b}</span></li>`).join('')}</ul>` : ''}
      ${f.note ? `<p class="fb-note reveal d3">${f.note}</p>` : ''}
      ${f.cta ? `<div class="reveal d3" style="margin-top:26px">${button(f.cta, { ghost: true, name: 'feature_' + f.id })}</div>` : ''}
    </div>
    <div class="fb-media reveal-scale d1">${media(f.media)}</div>
  </div>
</section>`;
}

/* ---------------- feature cards (smaller features, still anchorable) ----------------
   items: [{ id, icon, title, body, pro, isNew, media? }] */
export function cards(c) {
  return `
<section class="block"${c.id ? ` id="${c.id}"` : ''}>
  <div class="wrap">
    ${c.title ? head(c) : ''}
    <div class="cards cols-${c.cols || 3}">
      ${c.items.map((it, i) => `
      <article class="card reveal d${i % 3}" id="${it.id}">
        ${it.media ? `<div class="card-media">${media(it.media)}</div>` : `<span class="card-ic">${icon(it.icon)}</span>`}
        <h3>${it.title}${badges(it)}</h3>
        <p>${it.body}</p>
        ${it.link ? `<a class="card-link" href="${esc(/^#/.test(it.link.href) ? it.link.href : r(it.link.href))}">${it.link.label}${icon('arrow')}</a>` : ''}
      </article>`).join('')}
    </div>
  </div>
</section>`;
}

/* ---------------- steps ---------------- */
export function steps(s) {
  return `
<section class="block"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${head(s)}
    <ol class="steps">
      ${s.items.map((it, i) => `
      <li class="step reveal-scale d${i % 4}">
        <span class="step-n">${String(i + 1).padStart(2, '0')}</span>
        <span class="card-ic">${icon(it.icon)}</span>
        <h3>${it.title}</h3>
        <p>${it.body}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>`;
}

/* ---------------- comparison table ----------------
   { cols: ['', 'A', 'B'], rows: [['Row', false, true]] } */
export function compare(c) {
  const cell = (v) => v === true ? `<td class="yes">${icon('check')}<span class="sr">Included</span></td>`
    : v === false ? `<td class="no"><span aria-hidden="true">&mdash;</span><span class="sr">Not included</span></td>` : `<td>${v}</td>`;
  return `
<section class="block"${c.id ? ` id="${c.id}"` : ''}>
  <div class="wrap">
    ${head(c)}
    <div class="table-wrap reveal d1"><table class="compare">
      <thead><tr>${c.cols.map((h, i) => `<th${i === c.cols.length - 1 ? ' class="hl"' : ''}>${h}</th>`).join('')}</tr></thead>
      <tbody>${c.rows.map((row) => `<tr><th scope="row">${row[0]}</th>${row.slice(1).map(cell).join('')}</tr>`).join('')}</tbody>
    </table></div>
    ${c.note ? `<p class="fine center">${c.note}</p>` : ''}
  </div>
</section>`;
}

/* ---------------- FAQ ---------------- */
export function faq(f) {
  return `
<section class="block" id="${f.id || 'faq'}">
  <div class="wrap">
    ${head({ eyebrow: f.eyebrow || 'Questions', title: f.title || 'Good to know.', center: true })}
    <div class="faq-list reveal d1">
      ${f.items.map(([q, a]) => `
      <div class="qa"><button type="button" aria-expanded="false"><span>${q}</span><span class="plus" aria-hidden="true"></span></button><div class="ans"><p>${a}</p></div></div>`).join('')}
    </div>
  </div>
</section>`;
}

/* ---------------- final CTA ---------------- */
export function ctaFinal(c) {
  return `
<section class="final" id="get">
  <div class="wrap">
    ${c.top || ''}
    <h2 class="display reveal d1">${c.title}</h2>
    ${c.sub ? `<p class="lead reveal d2">${c.sub}</p>` : ''}
    <div class="hero-cta center reveal d2">${button(c.primary || TRY_FREE, { name: 'final_primary' })}${button(c.secondary === undefined ? SEE_PLANS : c.secondary, { ghost: true, name: 'final_secondary' })}</div>
    ${c.note ? `<p class="hero-note reveal d3">${c.note}</p>` : ''}
  </div>
</section>`;
}

/* ---------------- sticky CTA bar (phones) ---------------- */
export function ctaBar(c) {
  return `
<div class="cta-bar" id="ctaBar" aria-hidden="true">
  <span class="cta-bar-txt"><b>${c.title}</b><small>${c.sub}</small></span>
  ${button(c.cta, { name: 'cta_bar', cls: 'btn-sm' })}
</div>`;
}

/* ---------------- racing safety block ---------------- */
export function safety(extra = '') {
  return `
<section class="block" id="safety">
  <div class="wrap">
    <div class="safety reveal">
      <span class="safety-flag" aria-hidden="true"></span>
      <div>
        <h2>Closed courses only.</h2>
        <p>DashLink Racing is for track days, rallies on closed roads, recce and private test venues. Never time yourself on public roads. On first use the app asks you to accept its safety terms.${extra}</p>
      </div>
    </div>
  </div>
</section>`;
}

/* ---------------- trust strip ---------------- */
export function trust(items) {
  return `<div class="trust reveal">${items.map(([ic, t]) => `<span>${icon(ic)}${t}</span>`).join('')}</div>`;
}

/* ---------------- showcase: sticky head unit, screens change as you scroll ----------------
   { eyebrow, scenes: [{ img | video, poster?, alt, title, sub }] } */
export function showcase(s) {
  const n = s.scenes.length;
  const scene = (sc, i) => sc.video
    ? `<div class="sc-scene${i ? '' : ' on'}"><video src="${r('assets/images/' + sc.video)}" poster="${r('assets/images/' + sc.poster)}" muted loop playsinline preload="none" aria-label="${esc(sc.alt)}"></video></div>`
    : `<div class="sc-scene${i ? '' : ' on'}"><img src="${r('assets/images/' + sc.img)}" alt="${esc(sc.alt)}" loading="lazy" decoding="async"></div>`;
  return `
<section class="showcase" id="${s.id || 'showcase'}" data-scenes="${n}">
  <div class="sc-track" style="height:${n * 100}svh">
    <div class="sc-sticky">
      <span class="eyebrow">${s.eyebrow || 'A closer look'}</span>
      <div class="sc-copy">${s.scenes.map((sc, i) => `<div class="cap${i ? '' : ' on'}"><h3>${sc.title}</h3><p>${sc.sub}</p></div>`).join('')}</div>
      <div class="sc-dash"><div class="sc-unit"><div class="sc-screen">${s.scenes.map(scene).join('')}</div></div></div>
      <div class="sc-rail" aria-hidden="true">${s.scenes.map((_, i) => `<button type="button" tabindex="-1"${i ? '' : ' class="on"'} data-go="${i}"></button>`).join('')}</div>
    </div>
  </div>
</section>`;
}

/* ---------------- before / after slider ---------------- */
export function beforeAfter(b) {
  return `
<section class="block" id="${b.id || 'before-after'}">
  <div class="wrap">
    ${head({ ...b, center: true })}
    <div class="ba reveal-scale d1" role="slider" tabindex="0" aria-label="Before and after comparison" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
      <div class="ba-layer"><img src="${r('assets/images/' + b.before.img)}" alt="${esc(b.before.alt)}" loading="lazy" decoding="async"></div>
      <div class="ba-layer ba-after"><img src="${r('assets/images/' + b.after.img)}" alt="${esc(b.after.alt)}" loading="lazy" decoding="async"></div>
      <div class="ba-handle"><span class="ba-knob"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M8 7l-4 5 4 5M16 7l4 5-4 5"/></svg></span></div>
      <span class="ba-lbl b">Before</span><span class="ba-lbl a">With DashLink</span>
    </div>
    <p class="fine center">Screens are illustrative. What you see depends on your head unit, phone and apps.</p>
  </div>
</section>`;
}

/* ---------------- media grid (text on top, screen below, seamless) ----------------
   items: [{ id, kicker, title, body, media }] */
export function gallery(g) {
  return `
<section class="block"${g.id ? ` id="${g.id}"` : ''}>
  <div class="wrap">
    ${head(g)}
    <div class="gal">
      ${g.items.map((it, i) => `
      <article class="gal-item reveal d${i % 2}"${it.id ? ` id="${it.id}"` : ''}>
        <span class="kicker">${it.kicker}${badges(it)}</span>
        <h3>${it.title}</h3>
        <p>${it.body}</p>
        <div class="gal-stage"><div class="gal-shot">${media({ ...it.media, frame: 'bare' })}</div></div>
      </article>`).join('')}
    </div>
  </div>
</section>`;
}

/* ---------------- layout explorer ----------------
   One big head-unit screen, a tab per layout. Auto-advances while in view,
   stops for good once the visitor picks one.
   { id, eyebrow, title, sub, items: [{ key, name, desc, img, alt }], more } */
export function explorer(x) {
  return `
<section class="block xp-sec" id="${x.id}">
  <div class="wrap">
    ${head(x)}
    <div class="xp reveal-scale d1" data-explorer>
      <div class="xp-stage">
        <div class="hu"><div class="hu-screen" style="aspect-ratio:2000/1250">
          ${x.items.map((it, i) => `<img class="xp-shot${i ? '' : ' on'}" src="${r('assets/images/' + it.img)}" alt="${esc(it.alt)}" width="2000" height="1250" ${i ? 'loading="lazy"' : ''} decoding="async" data-xp="${it.key}">`).join('')}
          ${x.items.map((it, i) => `<div class="xp-spots${i ? '' : ' on'}" data-xp="${it.key}">${(it.spots || []).map((sp) => `<button type="button" class="xp-spot${sp.x > 70 ? ' sp-r' : sp.x < 30 ? ' sp-l' : ''}" style="left:${sp.x}%;top:${sp.y}%" aria-label="${esc(sp.label)}"><i></i><span>${sp.label}</span></button>`).join('')}</div>`).join('')}
        </div></div>
        ${x.items.some((it) => it.spots) ? '<button type="button" class="xp-toggle" aria-pressed="true">Details</button>' : ''}
      </div>
      <div class="xp-tabs" role="tablist" aria-label="${esc(strip(x.title))}">
        ${x.items.map((it, i) => `<button type="button" role="tab" class="xp-tab${i ? '' : ' on'}" aria-selected="${i ? 'false' : 'true'}" data-xp="${it.key}"><span class="xp-bar" aria-hidden="true"></span><b>${it.name}</b><small>${it.desc}</small></button>`).join('')}
        ${x.more ? `<p class="xp-more">${x.more}</p>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

/* ---------------- speedometer gallery (bento) ----------------
   First item is the hero tile. { id, eyebrow, title, sub, items: [{ name, desc, img, alt }], faces } */
export function dials(d) {
  if (d.plain) {
    return `
<section class="block" id="${d.id}">
  <div class="wrap">
    ${head(d)}
    <div class="dial-row">${d.items.map((it, i) => `
      <figure class="bt reveal d${i % 3}">
        <div class="bt-img"><img src="${r('assets/images/' + it.img)}" alt="${esc(it.alt)}" loading="lazy" decoding="async"></div>
        <figcaption><h3>${it.name}${badges(it)}</h3><p>${it.desc}</p></figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>`;
  }
  const [hero, ...rest] = d.items;
  const face = (f) => `<span class="face"><i style="background:${f[1]}"></i>${f[0]}</span>`;
  return `
<section class="block" id="${d.id}">
  <div class="wrap">
    ${head(d)}
    <div class="bento">
      <figure class="bt bt-hero reveal-scale">
        <div class="bt-img"><img src="${r('assets/images/' + hero.img)}" alt="${esc(hero.alt)}" loading="lazy" decoding="async"></div>
        <figcaption>
          <span class="kicker">Signature dial</span>
          <h3>${hero.name}</h3>
          <p>${hero.desc}</p>
          ${d.faces ? `<div class="faces"><small>Dial face</small>${d.faces.map(face).join('')}</div>` : ''}
        </figcaption>
      </figure>
      ${rest.map((it, i) => `
      <figure class="bt reveal d${i % 3}">
        <div class="bt-img"><img src="${r('assets/images/' + it.img)}" alt="${esc(it.alt)}" loading="lazy" decoding="async"></div>
        <figcaption><h3>${it.name}</h3><p>${it.desc}</p></figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>`;
}

/* ---------------- showroom: the app's own car render in every paint ----------------
   One pre-rendered image per paint (src/car-paints.py), crossfaded on click.
   { id, eyebrow, title, sub, paints: [[name, swatch]], start, note } */
export function showroom(sr) {
  const slug = (n) => n.toLowerCase().replace(/[^a-z]+/g, '-');
  const startIdx = sr.start || 0;
  return `
<section class="block" id="${sr.id}">
  <div class="wrap">
    ${head(sr)}
    <div class="showroom reveal-scale d1" style="--paint:${sr.paints[startIdx][1]}">
      <div class="sr-stage">
        <span class="sr-spot" aria-hidden="true"></span>
        <span class="sr-floor" aria-hidden="true"></span>
        <div class="sr-car">
          ${sr.paints.map(([n], i) => `<img class="${i === startIdx ? 'on' : ''}" data-car="${slug(n)}" src="${r('assets/images/v4/car-' + slug(n) + '.webp')}" alt="${i === startIdx ? 'Your car in ' + esc(n) + ', as shown on the DashLink dashboard' : ''}" width="799" height="342" loading="lazy" decoding="async">`).join('')}
        </div>
        <p class="sr-name" aria-live="polite"><small>Paint</small><b data-paint-name>${sr.paints[startIdx][0]}</b></p>
      </div>
      <div class="sr-list" role="radiogroup" aria-label="Car paint">
        ${sr.paints.map(([n, sw], i) => `<button type="button" role="radio" aria-checked="${i === startIdx}" data-car="${slug(n)}" data-swatch="${sw}" style="--sw:${sw}"><i aria-hidden="true"></i><span>${n}</span></button>`).join('')}
      </div>
    </div>
    ${sr.note ? `<p class="fine center">${sr.note}</p>` : ''}
  </div>
</section>`;
}

/* ---------------- Corsa: a dial presented like a watch ----------------
   Face picker crossfades pre-cropped faces; numbered details open a macro
   close-up (and a loupe follows the pointer on desktop).
   { id, eyebrow, title, sub, faces: [{ key, name, swatch, img }], details: [{ x, y, title, text }] } (x/y in %) */
const ZOOM = 3.2;
const macroPos = (p) => `${Math.max(0, Math.min(100, ((p / 100) * ZOOM - 0.5) / (ZOOM - 1) * 100)).toFixed(2)}%`;
export function corsa(c) {
  const f0 = c.faces[0], d0 = c.details[0];
  const faceUrl = (f) => r('assets/images/' + f.img);
  return `
<section class="block corsa-sec" id="${c.id}">
  <div class="wrap">
    ${head({ ...c, center: true })}
    <div class="corsa reveal-scale d1" data-corsa data-zoom="${ZOOM}">
      <div class="cs-stage">
        <div class="cs-dial">
          ${c.faces.map((f, i) => `<img class="cs-face${i ? '' : ' on'}" src="${faceUrl(f)}" data-face="${f.key}" alt="${i ? '' : esc(`The Corsa speedometer with a ${f.name.toLowerCase()} face`)}" width="760" height="760" ${i ? 'loading="lazy"' : ''} decoding="async">`).join('')}
          ${c.details.map((d, i) => `<button type="button" class="cs-spot${i ? '' : ' on'}" style="left:${d.x}%;top:${d.y}%" data-i="${i}" data-x="${d.x}" data-y="${d.y}" aria-label="${esc(strip(d.title))}"><span>${i + 1}</span></button>`).join('')}
          <span class="cs-loupe" aria-hidden="true"></span>
        </div>
      </div>
      <div class="cs-side">
        <div class="cs-macro" aria-hidden="true"><span class="cs-macro-img" style="background-image:url('${faceUrl(f0)}');background-position:${macroPos(d0.x)} ${macroPos(d0.y)}"></span><span class="cs-macro-ring"></span></div>
        <div class="cs-copy" aria-live="polite">
          <span class="kicker"><b data-cs-n>01</b> / ${String(c.details.length).padStart(2, '0')} &middot; Detail</span>
          <h3 data-cs-title>${d0.title}</h3>
          <p data-cs-text>${d0.text}</p>
        </div>
        <div class="cs-nav"><button type="button" data-cs-prev aria-label="Previous detail">&larr;</button><button type="button" data-cs-next aria-label="Next detail">&rarr;</button></div>
        <div class="cs-faces">
          <small>Dial face &middot; <b data-cs-face>${f0.name}</b></small>
          <div role="radiogroup" aria-label="Dial face">${c.faces.map((f, i) => `<button type="button" role="radio" aria-checked="${i === 0}" data-face="${f.key}" data-src="${faceUrl(f)}" data-name="${esc(f.name)}" style="--sw:${f.swatch}" title="${esc(f.name)}"><i></i><span class="sr">${f.name}</span></button>`).join('')}</div>
        </div>
      </div>
      <script type="application/json" data-cs-details>${JSON.stringify(c.details.map((d) => ({ x: d.x, y: d.y, title: d.title, text: d.text })))}</script>
    </div>
  </div>
</section>`;
}

/* ---------------- speed warning: safety section with a live demo ----------------
   { id, eyebrow, title, sub, points: [[icon, title, text]], shot, sheet, presets, start, note } */
export function speedWarning(w) {
  return `
<section class="block sw-sec" id="${w.id}">
  <div class="wrap">
    ${head(w)}
    <div class="sw">
      <div class="sw-left">
        <ul class="sw-points">${w.points.map(([ic, t, d], i) => `<li class="reveal d${i % 3}"><span class="card-ic">${icon(ic)}</span><div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ul>
        <div class="sw-demo reveal d2" data-sw-demo data-limit="${w.start}">
          <div class="swd-top">
            <span class="sw-sign" aria-hidden="true"><b data-swd-limit>${w.start}</b></span>
            <div class="swd-read"><small>Your speed</small><b><span data-swd-speed>84</span><em>km/h</em></b></div>
            <span class="swd-badge" data-swd-badge>+34 km/h</span>
          </div>
          <label class="swd-slider"><span class="sr">Your speed</span><input type="range" min="0" max="160" step="1" value="84" data-swd-range></label>
          <div class="swd-chips" role="radiogroup" aria-label="Warning speed">${w.presets.map((p) => `<button type="button" role="radio" aria-checked="${p === w.start}" data-v="${p}">${p}</button>`).join('')}</div>
          <p class="swd-status" data-swd-status aria-live="polite">Over your warning speed. The badge turns red and the chime plays.</p>
        </div>
      </div>
      <div class="sw-right reveal-scale d1">
        <div class="hu"><div class="hu-screen" style="aspect-ratio:2000/1250"><img src="${r('assets/images/' + w.shot.img)}" alt="${esc(w.shot.alt)}" width="2000" height="1250" loading="lazy" decoding="async"></div></div>
        <figure class="sw-sheet"><img src="${r('assets/images/' + w.sheet.img)}" alt="${esc(w.sheet.alt)}" width="802" height="950" loading="lazy" decoding="async"></figure>
      </div>
    </div>
    ${w.note ? `<p class="sw-note reveal">${icon('shield')}<span>${w.note}</span></p>` : ''}
  </div>
</section>`;
}

/* ---------------- big-screen debrief (Browser view) ----------------
   { id, eyebrow, title, sub, url, tabs: [{ key, name, q, img, alt }],
     insights: { eyebrow, title, items: [{ q, a, img, alt, size }] },
     connect: { eyebrow, title, sub, card: { img, alt }, steps: [{ x, y, title, text }] },
     team: { eyebrow, title, items: [[icon, title, text]] } } */
const browserChrome = (url) => `<div class="bs-chrome"><span class="bs-dots"><i></i><i></i><i></i></span><span class="bs-url">${icon('lock')}<b>${url}</b><em>local Wi-Fi</em></span></div>`;
export function bigScreen(b) {
  return `
<section class="block bs-sec" id="${b.id}">
  <div class="wrap">
    ${head({ ...b, center: true })}
    <div class="bs" data-explorer>
      <div class="bs-window reveal-scale d1">
        ${browserChrome(b.url)}
        <div class="bs-view">${b.tabs.map((t, i) => `<img class="xp-shot${i ? '' : ' on'}" data-xp="${t.key}" src="${r('assets/images/' + t.img)}" alt="${esc(t.alt)}" width="1600" height="1120" ${i ? 'loading="lazy"' : ''} decoding="async">`).join('')}</div>
      </div>
      <div class="xp-tabs bs-tabs" role="tablist" aria-label="Browser view tabs">
        ${b.tabs.map((t, i) => `<button type="button" role="tab" class="xp-tab${i ? '' : ' on'}" aria-selected="${i ? 'false' : 'true'}" data-xp="${t.key}"><span class="xp-bar" aria-hidden="true"></span><b>${t.name}</b><small>${t.q}</small></button>`).join('')}
      </div>
    </div>
  </div>
</section>
<section class="block" id="${b.id}-insights">
  <div class="wrap">
    ${head(b.insights)}
    <div class="ins">${b.insights.items.map((it, i) => `
      <figure class="in-card in-${it.size || 'm'} reveal d${i % 3}">
        <figcaption><span class="in-q">${it.q}</span><p>${it.a}</p></figcaption>
        <div class="in-img"><img src="${r('assets/images/' + it.img)}" alt="${esc(it.alt)}" loading="lazy" decoding="async"></div>
      </figure>`).join('')}
    </div>
  </div>
</section>
<section class="block" id="${b.id}-connect">
  <div class="wrap">
    <div class="cn">
      <div class="cn-stage reveal-scale" data-tilt>
        <span class="cn-glow" aria-hidden="true"></span>
        <div class="cn-float">
          <div class="cn-card3d">
            <span class="cn-depth" aria-hidden="true"></span>
            <span class="cn-edge" aria-hidden="true"></span>
            <img src="${r('assets/images/' + b.connect.card.img)}" alt="${esc(b.connect.card.alt)}" width="945" height="1959" loading="lazy" decoding="async">
            <span class="cn-sheen" aria-hidden="true"></span>
            ${b.connect.steps.map((st, i) => `<span class="cn-pin" style="left:${st.x}%;top:${st.y}%" data-cn="${i}">${i + 1}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="cn-copy">
        ${head(b.connect)}
        <ol class="cn-steps">${b.connect.steps.map((st, i) => `<li class="reveal d${i % 3}" data-cn="${i}" tabindex="0"><span class="cn-n">${i + 1}</span><div><b>${st.title}</b><span>${st.text}</span></div></li>`).join('')}</ol>
      </div>
    </div>
  </div>
</section>
<section class="block" id="${b.id}-team">
  <div class="wrap">
    ${head({ ...b.team, center: true })}
    ${b.team.photo ? `<div style="margin-top:40px">${pitWallPhoto(b.team.photo)}</div>` : ''}
    <div class="team">${b.team.items.map(([ic, t, d], i) => `<article class="card reveal d${i % 3}"><span class="card-ic">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>
  </div>
</section>`;
}

/* ---------------- recce story: screens with their key cards lifted out in 3D ----------------
   { id, eyebrow, title, sub, steps: [{ key, n, name, text, img, alt, lifts: [{ img, x, y, w, label }] }],
     calls: { eyebrow, title, sub, items: [..], tip }, why: { eyebrow, title, items: [[icon, title, text]] }, note } */
export function recceStory(c) {
  const plane = (st, i) => `
        <div class="xp-shot lx-plane${i ? '' : ' on'}" data-xp="${st.key}">
          <img class="lx-base" src="${r('assets/images/' + st.img)}" alt="${esc(st.alt)}" width="2000" height="1250" ${i ? 'loading="lazy"' : ''} decoding="async">
          ${st.lifts.map((l, k) => `<figure class="lx-card${l.below ? ' below' : ''}" style="--x:${l.x}%;--y:${l.y}%;--w:${l.w}%;--d:${k}"><img src="${r('assets/images/' + l.img)}" alt="" loading="lazy" decoding="async"><figcaption>${l.label}</figcaption></figure>`).join('')}
        </div>`;
  return `
<section class="block lx-sec" id="${c.id}">
  <div class="wrap">
    ${head({ ...c, center: true })}
    <div class="lx" data-explorer>
      <div class="xp-tabs lx-steps" role="tablist" aria-label="${esc(strip(c.title))}">
        ${c.steps.map((st, i) => `<button type="button" role="tab" class="xp-tab${i ? '' : ' on'}" aria-selected="${i ? 'false' : 'true'}" data-xp="${st.key}"><span class="xp-bar" aria-hidden="true"></span><span class="lx-n">${st.n}</span><b>${st.name}</b><small>${st.text}</small></button>`).join('')}
      </div>
      <div class="lx-stage reveal-scale d1"><div class="lx-planes">${c.steps.map(plane).join('')}</div></div>
    </div>
    ${c.note ? `<p class="sw-note reveal">${icon('flag')}<span>${c.note}</span></p>` : ''}
  </div>
</section>
<section class="block" id="${c.id}-calls">
  <div class="wrap">
    <div class="rc">
      <div>${head(c.calls)}${c.calls.tip ? `<p class="rc-tip reveal d2">${icon('wheel')}<span>${c.calls.tip}</span></p>` : ''}</div>
      <div class="rc-pad reveal-scale d1" data-calls>
        <span class="rc-toast" aria-live="polite"></span>
        <div class="rc-grid">${c.calls.items.map((t) => `<button type="button">${t}</button>`).join('')}</div>
        <p class="rc-foot">Corners, stops and slow sections are found on their own.</p>
      </div>
    </div>
  </div>
</section>
<section class="block" id="${c.id}-why">
  <div class="wrap">
    ${head({ ...c.why, center: true })}
    <div class="team">${c.why.items.map(([ic, t, d], i) => `<article class="card reveal d${i % 3}"><span class="card-ic">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>
  </div>
</section>`;
}

/* ---------------- phone frame in 3D, with key cards hovering off the screen ----------------
   { img, alt, mirror, lifts: [{ img, x, y, w, label, below }] }  x/y/w are % of the phone */
export function phone3d(p, eager) {
  return `<div class="cn-card3d ph3d${p.mirror ? ' mirror' : ''}">
    <span class="cn-depth" aria-hidden="true"></span>
    <div class="ph-body"><span class="ph-island" aria-hidden="true"></span><div class="ph-screen${p.shots ? ' pt-screen' : ''}">${p.shots || `<img src="${r('assets/images/' + p.img)}" alt="${esc(p.alt)}" width="898" height="1830" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`}</div></div>
    <span class="cn-sheen ph-sheen" aria-hidden="true"></span>
    ${(p.lifts || []).map((l, k) => `<figure class="ph-lift${l.below ? ' below' : ''}${l.right ? ' cap-r' : ''}"${l.key ? ` data-xp-lift="${l.key}"` : ''} style="--x:${l.x}%;--y:${l.y}%;--w:${l.w}%;--d:${k}"><img src="${r('assets/images/' + l.img)}" alt="" loading="lazy" decoding="async">${l.label ? `<figcaption>${l.label}</figcaption>` : ''}</figure>`).join('')}
  </div>`;
}
/* ---------------- phone tour: one phone, its screen switched by tabs (uses the explorer script) ----------------
   { side, label, tabs: [{ key, name, q, img, alt, lifts }] }  side: tabs listed beside the phone, else chips below */
export function phoneTabs(m) {
  const shots = m.tabs.map((t, i) => `<img class="xp-shot${i ? '' : ' on'}" data-xp="${t.key}" src="${r('assets/images/' + t.img)}" alt="${esc(t.alt)}" width="898" height="1830" ${i ? 'loading="lazy"' : ''} decoding="async">`).join('');
  const lifts = m.tabs.flatMap((t) => (t.lifts || []).map((l) => ({ ...l, key: t.key })));
  const tabs = `<div class="xp-tabs pt-tabs" role="tablist" aria-label="${esc(m.label || 'App screens')}">${m.tabs.map((t, i) => `<button type="button" role="tab" class="xp-tab${i ? '' : ' on'}" aria-selected="${i ? 'false' : 'true'}" data-xp="${t.key}"><span class="xp-bar" aria-hidden="true"></span><b>${t.name}</b><small>${t.q}</small></button>`).join('')}</div>`;
  const stage = phoneStage({ shots, lifts, mirror: m.mirror }, 'pt-stage');
  return `<div class="pt${m.side ? ' pt-side' : ''}" data-explorer>${m.side ? tabs + stage : stage + tabs}</div>`;
}
const phoneStage = (p, cls = '', eager) => `<div class="cn-stage ph-stage ${cls}" data-tilt><span class="cn-glow" aria-hidden="true"></span><div class="cn-float">${phone3d(p, eager)}</div></div>`;

/* the 1 Hz vs 25 Hz corner demo; { path, metres, note, eyebrow, title, sub, compact } */
export const sensorDemo = (d) => `
    <div class="ps-demo ${d.compact ? ' psd-compact' : ' reveal-scale'}" data-ps-demo data-metres="${d.metres || 220}">
      ${d.compact ? '' : `<div class="psd-head">
        <span class="eyebrow">${d.eyebrow}</span>
        <h3 class="h-lg">${d.title}</h3>
        <p>${d.sub}</p>
      </div>`}
      <div class="psd-ctrl">
        <div class="md-seg psd-seg" role="radiogroup" aria-label="Timing source">
          <button type="button" role="radio" aria-checked="true" data-hz="1">Car GPS only</button>
          <button type="button" role="radio" aria-checked="false" data-hz="25">Car + phone</button>
        </div>
        <label class="psd-speed"><span>Speed <b data-psd-v>120</b> km/h</span><input type="range" min="60" max="220" step="10" value="120" data-psd-range aria-label="Speed through the corner, km/h"></label>
      </div>
      <div class="psd-view">
        <svg viewBox="0 0 640 360" role="img" aria-label="A corner, with the readings the timer gets through it">
          <path class="psd-road" d="${d.path}"/>
          <path class="psd-true" d="${d.path}" data-psd-path/>
          <polyline class="psd-rec" data-psd-rec points=""/>
          <g data-psd-dots></g>
          <circle class="psd-car" r="9" data-psd-car cx="-20" cy="-20"/>
        </svg>
        <div class="psd-legend"><span class="lg-true">The line you drove</span><span class="lg-rec">What the timer records</span><span class="lg-fix">GPS fix</span><span class="lg-fill">Filled in by the phone</span></div>
      </div>
      <dl class="psd-stats" aria-live="polite">
        <div><dt>Readings a second</dt><dd data-psd-hz>1</dd></div>
        <div><dt>Distance between readings</dt><dd data-psd-gap>33 m</dd></div>
        <div><dt>Readings in this corner</dt><dd data-psd-n>7</dd></div>
        <div><dt>g-forces</dt><dd data-psd-g>Estimated from GPS</dd></div>
      </dl>
      <p class="psd-note">${d.note}</p>
    </div>`;

/* ---------------- phone sensors: what the phone adds, a live 1 Hz vs 25 Hz demo, setup ----------------
   { id, kicker, title, lead, values: [[big, small, title, text]], live: phone3d, demo: { eyebrow, title, sub, note },
     setup: { eyebrow, title, phone: phone3d, steps: [[title, text]], fine }, link } */
export function sensorStory(s) {
  return `
<section class="block ps" id="${s.id}">
  <div class="wrap">
    <div class="ps-top">
      <div class="ps-copy">
        <span class="kicker reveal">${s.kicker}${badges(s)}</span>
        <h2 class="h-xl reveal d1">${s.title}</h2>
        <p class="lead reveal d2">${s.lead}</p>
        <ul class="ps-vals">${s.values.map(([big, small, t, d], i) => `
          <li class="reveal d${i % 3}"><span class="ps-big">${big}${small ? `<small>${small}</small>` : ''}</span><div><b>${t}</b><span>${d}</span></div></li>`).join('')}
        </ul>
      </div>
      <div class="reveal-scale d1">${phoneStage(s.live)}</div>
    </div>

    ${sensorDemo(s.demo)}

    <div class="ps-setup">
      <div class="reveal-scale">${phoneStage(s.setup.phone, 'ps-setup-stage')}</div>
      <div>
        ${head(s.setup)}
        <ol class="cn-steps ps-steps">${s.setup.steps.map(([t, d], i) => `<li class="reveal d${i % 3}"><span class="cn-n">${i + 1}</span><div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ol>
        <p class="fb-note reveal">${s.setup.fine}</p>
        ${s.link ? `<div class="reveal" style="margin-top:24px">${button(s.link, { ghost: true, name: 'feature_' + s.id })}</div>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

/* ---------------- pit wall: cinematic photo of a debrief, with tappable points on the screen ----------------
   { id, eyebrow, title, sub, isNew, photo: { img, w, h, alt, spots }, chips: [], cta, center } */
export const pitWallPhoto = (p) => `<div class="pw reveal-scale">${media({ ...p, spots: p.spots })}<span class="pw-fade" aria-hidden="true"></span></div>`;
export function pitWall(p) {
  return `
<section class="block pw-sec${p.cls ? ' ' + p.cls : ''}" id="${p.id}">
  <div class="wrap">
    ${head({ ...p, eyebrow: p.eyebrow + (p.pro ? ' ' + proBadge() : '') + (p.isNew ? ' ' + newBadge() : ''), center: true })}
    ${pitWallPhoto(p.photo)}
    ${p.chips ? `<ul class="pw-chips reveal">${p.chips.map((c) => `<li>${icon('check')}<span>${c}</span></li>`).join('')}</ul>` : ''}
    ${p.cta ? `<div class="hero-cta center reveal" style="margin-top:26px">${button(p.cta, { ghost: true, name: 'feature_' + p.id })}</div>` : ''}
  </div>
</section>`;
}

/* ---------------- upgrade, don't replace: new head unit vs DashLink ----------------
   { id, eyebrow, title, sub, replace: { title, items }, add: { title, items }, cta, note } */
export function upgrade(u) {
  const col = (c, good) => `<div class="ug-col ${good ? 'ug-add' : 'ug-rep'} reveal${good ? ' d1' : ''}">
      <span class="ug-tag">${good ? icon('check') : icon('close')}${c.tag}</span>
      <h3>${c.title}</h3>
      <ul>${c.items.map((t) => `<li>${good ? icon('check') : icon('close')}<span>${t}</span></li>`).join('')}</ul>
    </div>`;
  return `
<section class="block ug" id="${u.id}">
  <div class="wrap">
    ${head({ ...u, center: true })}
    <div class="ug-grid">${col(u.replace, false)}<span class="ug-vs reveal" aria-hidden="true">vs</span>${col(u.add, true)}</div>
    <div class="hero-cta center reveal" style="margin-top:34px">${button(u.cta, { name: 'home_upgrade' })}${u.cta2 ? button(u.cta2, { ghost: true, name: 'home_upgrade_more' }) : ''}</div>
    ${u.note ? `<p class="hero-note center reveal">${u.note}</p>` : ''}
  </div>
</section>`;
}

/* ---------------- try the DashLink home screen: pick a mode, tap Start ----------------
   { id, eyebrow, title, sub, img, modes: [{ key, icon, name, status, title, text, start, card: { title, need, text } }], spots, aa: { img, alt } } */
const blob = (() => { let d = ''; for (let i = 0; i <= 180; i++) { const t = (i / 180) * Math.PI * 2, rr = 46 + 3.2 * Math.cos(9 * t); d += (i ? 'L' : 'M') + (50 + rr * Math.cos(t)).toFixed(2) + ' ' + (50 + rr * Math.sin(t)).toFixed(2); } return d + 'Z'; })();
export function connectDemo(c) {
  const m0 = c.modes.find((m) => m.on) || c.modes[0];
  return `
<section class="block cd-sec" id="${c.id}">
  <div class="wrap">
    ${head({ ...c, center: true })}
    <div class="cd reveal-scale" data-connect>
      <div class="hu cd-unit"><div class="hu-screen cd-screen">
        <img class="cd-base" src="${r('assets/images/' + c.img)}" alt="${esc(c.alt)}" width="2000" height="1250" loading="lazy" decoding="async">
        <div class="cd-card" aria-live="polite">
          <span class="cd-status"><i></i><span data-cd="status">${m0.status}</span></span>
          <div class="cd-main">
            <span class="cd-blob"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="cdg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fe0b8"/><stop offset="1" stop-color="#8fb4ff"/></linearGradient></defs><path d="${blob}" fill="url(#cdg)"/></svg>${c.modes.map((m) => `<span class="cd-glyph${m === m0 ? ' on' : ''}" data-cd-glyph="${m.key}">${icon(m.icon)}</span>`).join('')}</span>
            <div><b data-cd="title">${m0.title}</b><p data-cd="text">${m0.text}</p></div>
          </div>
          <div class="cd-seg" role="radiogroup" aria-label="Connection mode">${c.modes.map((m) => `<button type="button" role="radio" aria-checked="${m === m0}" data-mode="${m.key}">${icon(m.icon)}<span>${m.name}</span></button>`).join('')}</div>
          <button type="button" class="cd-start" data-cd-start>${c.modes.map((m) => `<span class="cd-sg${m === m0 ? ' on' : ''}" data-cd-glyph="${m.key}">${icon(m.icon)}</span>`).join('')}<span data-cd="start">${m0.start}</span></button>
        </div>
        ${c.spots.map((sp) => `<button type="button" class="xp-spot cd-spot${sp.x > 70 ? ' sp-r' : ''}" style="left:${sp.x}%;top:${sp.y}%" aria-label="${esc(sp.label)}"><i></i><span>${sp.label}</span></button>`).join('')}
        <div class="cd-aa">
          <img src="${r('assets/images/' + c.aa.img)}" alt="" loading="lazy" decoding="async">
          <span class="cd-connecting"><i></i><span data-cd="connecting">Connecting&hellip;</span></span>
          <button type="button" class="cd-back" data-cd-back>${icon('arrow')}<span>Back to DashLink</span></button>
        </div>
      </div></div>
      <div class="cd-modes" role="radiogroup" aria-label="How your phone connects">${c.modes.map((m, i) => `
        <button type="button" role="radio" aria-checked="${m === m0}" class="cd-mode" data-mode="${m.key}">
          <span class="card-ic">${icon(m.icon)}</span><span class="mode-n">Mode 0${i + 1}</span>
          <b>${m.card.title}</b><span class="cd-need">${icon('check')}${m.card.need}</span><span class="cd-text">${m.card.text}</span>
        </button>`).join('')}
      </div>
      <script type="application/json" data-cd-modes>${JSON.stringify(Object.fromEntries(c.modes.map((m) => [m.key, { status: m.status, title: m.title, text: m.text, start: m.start }])))}</script>
    </div>
    ${c.after || ''}
  </div>
</section>`;
}

/* ---------------- trip cards: real dashboard cards, cut out and floating in 3D ----------------
   { id, eyebrow, title, sub, groups: [{ cls, cards: [{ img, w, h, alt, label, z }] }], note, cta } */
export function tripCards(t) {
  const card = (c, k) => `<figure class="tc-card${c.cls ? ' ' + c.cls : ''}" style="--z:${c.z || 40}px;--d:${k}"><img src="${r('assets/images/' + c.img)}" alt="${esc(c.alt)}" width="${c.w}" height="${c.h}" loading="lazy" decoding="async">${c.label ? `<figcaption>${c.label}</figcaption>` : ''}</figure>`;
  let k = 0;
  return `
<section class="block tc-sec" id="${t.id}">
  <div class="wrap">
    ${head({ ...t, center: true })}
    <div class="tc-stage reveal-scale"><span class="cn-glow" aria-hidden="true"></span>
      <div class="tc-plane">${t.groups.map((g) => `<div class="tc-col ${g.cls || ''}">${g.cards.map((c) => card(c, k++)).join('')}</div>`).join('')}</div>
    </div>
    ${t.note ? `<p class="sw-note reveal">${icon('fuel')}<span>${t.note}</span></p>` : ''}
    ${t.cta ? `<div class="hero-cta center reveal" style="margin-top:22px">${button(t.cta, { ghost: true, name: 'feature_' + t.id })}</div>` : ''}
  </div>
</section>`;
}

/* ---------------- long-form text (terms, policies) ---------------- */
export function prose(p) {
  return `
<section class="block prose-wrap">
  <div class="wrap prose-in">
    <nav class="toc" aria-label="Contents"><b>Contents</b>${p.sections.map(([id, t]) => `<a href="#${id}">${t}</a>`).join('')}</nav>
    <div class="prose">
      ${p.sections.map(([id, t, html]) => `<section id="${id}"><h2>${t}</h2>${html}</section>`).join('')}
    </div>
  </div>
</section>`;
}

/* ---------------- plans ----------------
   The two CTAs every page carries: try free (Play) and see plans. */
export const TRY_FREE = { play: 'headunit', label: 'Try DashLink free' };
export const SEE_PLANS = { href: 'plans/', label: 'See plans', ghost: true };
export const PLANS_NOTE = 'Every feature is unlocked during your free trial.';

/* Free / Drive / Pro table, no prices.
   { id, eyebrow, title, sub, strip, hl: [row keys to highlight], cta: false, fine } */
export function plansTable(p = {}) {
  const cell = (v) => v ? `<td class="yes">${icon('check')}<span class="sr">Included</span></td>` : `<td class="no"><span aria-hidden="true">&ndash;</span><span class="sr">Not included</span></td>`;
  const hl = new Set(p.hl || []);
  const rows = PLAN_ROWS.map(([k, label, ...v]) => `<tr${hl.has(k) ? ' class="pl-hl"' : ''}><th scope="row">${label}</th>${v.map(cell).join('')}</tr>`).join('');
  const col = (k) => `<th scope="col" class="pl-${k}"><a href="${r('plans/#' + k)}">${PLANS[k].short}</a></th>`;
  return `
<section class="block pl-sec${p.strip ? ' pl-strip' : ''}" id="${p.id || 'plans'}">
  <div class="wrap">
    ${head({ eyebrow: p.eyebrow || 'Plans', title: p.title || 'Try everything free. <span class="grad-text">Then keep what you love.</span>', sub: p.sub, center: true })}
    <div class="table-wrap reveal d1"><table class="compare plans-table">
      <thead><tr><th scope="col"><span class="sr">Feature</span></th>${['free', 'drive', 'pro'].map(col).join('')}</tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <p class="fine center">${PLANS_NOTE}${p.fine ? ' ' + p.fine : ''}</p>
    ${p.cta === false ? '' : `<div class="hero-cta center reveal" style="margin-top:26px">${button(TRY_FREE, { name: 'plans_try' })}${p.here ? '' : button(SEE_PLANS, { name: 'plans_see' })}</div>`}
  </div>
</section>`;
}

/* Three plan cards: name, one-line promise, what it includes, a Try free CTA.
   { id, eyebrow, title, sub, items: { free: [..], drive: [..], pro: [..] }, after } */
export function planCards(c) {
  const card = (k, i) => {
    const pl = PLANS[k];
    return `
      <article class="plan reveal d${i}${pl.label ? ' plan-hl' : ''}" id="${k}">
        ${pl.label ? `<span class="plan-label">${pl.label}</span>` : ''}
        <span class="plan-tier">${tierBadge(k)}</span>
        <h3>${pl.name}</h3>
        <p class="plan-promise">${pl.promise}</p>
        <ul class="ticks">${c.items[k].map((t) => `<li>${icon('check')}<span>${t}</span></li>`).join('')}</ul>
        <div class="plan-cta">${button({ ...TRY_FREE, label: 'Try free now', plan: k, ghost: !pl.label }, { name: 'plan_card_' + k, cls: 'plan-btn' })}</div>
      </article>`;
  };
  return `
<section class="block" id="${c.id || 'choose'}">
  <div class="wrap">
    ${head({ ...c, center: true })}
    <div class="plans">${['free', 'drive', 'pro'].map(card).join('')}</div>
    ${c.after || ''}
  </div>
</section>`;
}

/* Pillar cards (home): each pillar with its tier badge.
   items: [{ href, title, body, tier, media }] */
export function pillarCards(p) {
  return `
<section class="block" id="${p.id}">
  <div class="wrap">
    ${head({ ...p, center: true })}
    <div class="pcards${p.items.length === 4 ? ' pc4' : ''}">${p.items.map((it, i) => `
      <a class="pcard reveal d${i % 3}" href="${r(it.href)}" data-cta="pillar_${esc(it.href.replace(/\W+/g, '_').replace(/_$/, ''))}"${it.tier ? ` data-plan="${it.tier}"` : ''}>
        <div class="pc-media">${media({ ...it.media, frame: it.media.frame || 'hu' })}</div>
        <div class="pc-copy"><h3>${it.title}${tierBadge(it.tier)}</h3><p>${it.body}</p><span class="card-link">${it.link || 'Learn more'}${icon('arrow')}</span></div>
      </a>`).join('')}
    </div>
  </div>
</section>`;
}

/* ---------------- free-form section ---------------- */
export const section = (inner, attrs = '') => `<section class="block" ${attrs}><div class="wrap">${inner}</div></section>`;

/* ---------------- nav + footer ---------------- */
function nav(page) {
  const brand = page.racing ? racingLockup() : wordmark();
  const links = NAV.map((n) => `<a href="${r(n.href)}"${n.racing ? ' class="nl-racing"' : ''}${n.key === page.pillar ? ' aria-current="page"' : ''}>${n.label}</a>`).join('');
  const sheet = NAV.map((n) => `<a href="${r(n.href)}"${n.racing ? ' class="nl-racing"' : ''}><b>${n.label}</b><small>${n.blurb}</small></a>`).join('');
  return `
<header class="nav" id="nav">
  <a class="brand" href="${r('') || './'}" aria-label="DashLink home">${brand}</a>
  <nav class="nav-links" aria-label="Main">${links}</nav>
  <div class="nav-end">
    ${button(page.navCta || { play: 'headunit', label: 'Try free' }, { name: 'nav', cls: 'btn-sm nav-cta' })}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="sheet" aria-label="Menu">${icon('menu', 'i-open')}${icon('close', 'i-close')}</button>
  </div>
</header>
<div class="sheet" id="sheet" hidden><nav aria-label="Main">${sheet}</nav></div>`;
}

function footer() {
  const col = (title, links) => `<div class="fcol"><h4>${title}</h4>${links.map(([l, h]) => `<a href="${/^(https?:|mailto:)/.test(h) ? h : r(h)}"${/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : ''}>${l}</a>`).join('')}</div>`;
  return `
<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a href="${r('') || './'}" class="brand">${wordmark()}</a>
        <p>Adds Android Auto, a car dashboard and a motorsport timing suite to the Android head unit already in your car. Try it free.</p>
        <a href="${r('racing/')}" class="foot-racing">${racingLockup('sm')}</a>
      </div>
      ${col('Product', [['Android Auto', 'android-auto/'], ['Dashboard', 'dashboard/'], ['Trips, fuel &amp; car care', 'trips-fuel-maintenance/'], ['Plans', 'plans/']])}
      ${col('Racing', [['Overview', 'racing/'], ['Track day', 'racing/track-day/'], ['Rally', 'racing/rally/'], ['Performance', 'racing/performance/']])}
      ${col('Help', [['DashLink Wireless', 'wireless-app/'], ['Support', 'support/'], ['Download &amp; install', 'download/'], ['Activate your plan', 'premium/'], ['Email us', 'mailto:' + SITE.email]])}
    </div>
    <div class="foot-legal">
      <p>Android Auto and Android are trademarks of Google LLC. Google Play is a trademark of Google LLC. DashLink is an independent app and is not affiliated with or endorsed by Google.</p>
      <p>Screens are illustrative. Features and compatibility depend on your head unit, phone and software version. Fuel, range, trip cost and dyno power figures are estimates. DashLink Racing is for closed courses only.</p>
      <p class="foot-row"><span>&copy; ${SITE.year} DashLink</span><a href="${r('privacy/')}">Privacy</a><a href="${r('terms/')}">Terms</a><a href="#" data-cookie-settings>Cookie settings</a></p>
    </div>
  </div>
</footer>`;
}

/* ---------------- document ---------------- */
export function layout(page, body) {
  const url = SITE.base + '/' + (page.slug ? page.slug + '/' : '');
  const og = SITE.base + '/assets/images/og/' + (page.og || page.key) + '.jpg';
  const title = esc(strip(page.title));
  const desc = esc(strip(page.description));
  return `<!doctype html>
<html lang="en" data-page="${page.key}" data-pillar="${page.pillar}" class="${page.racing ? 't-racing' : ''}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="${page.racing ? '#0a0405' : '#050506'}">
<link rel="icon" href="${r('assets/favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${r('assets/apple-touch-icon.png')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="DashLink">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.dashlinkReady)document.documentElement.classList.add('no-reveal')},3000)</script>
<link rel="stylesheet" href="${r('assets/site.css')}?v=${page.version}">
<script src="${r('assets/analytics.js')}?v=${page.version}" defer></script>
<script src="${r('assets/site.js')}?v=${page.version}" defer></script>
</head>
<body>
<div class="ambient" aria-hidden="true"></div>
${nav(page)}
<main id="top">
${body}
</main>
${footer()}
${ctaBar(page.bar || { title: 'DashLink', sub: 'Try every feature free', cta: { play: 'headunit', label: 'Try free' } })}
<a class="wa-fab" href="${SITE.whatsapp}?text=${encodeURIComponent('Hi DashLink! I have a question.')}" target="_blank" rel="noopener" aria-label="Chat with DashLink on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M.06 24l1.69-6.16A11.87 11.87 0 0 1 .16 11.9C.16 5.34 5.5 0 12.05 0a11.82 11.82 0 0 1 8.41 3.49 11.82 11.82 0 0 1 3.48 8.41c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.68-1.45zm6.6-3.81c1.67 1 3.27 1.6 5.39 1.6 5.45 0 9.88-4.44 9.89-9.89 0-5.46-4.42-9.89-9.88-9.89-5.45 0-9.89 4.43-9.89 9.88 0 2.23.65 3.9 1.75 5.64l-1 3.65zm11.38-5.46c-.07-.13-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.41z"/></svg></a>
</body>
</html>
`;
}
