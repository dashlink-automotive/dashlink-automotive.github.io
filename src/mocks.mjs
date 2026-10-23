// Built-in illustrations (HTML + SVG) used where we don't have a real screenshot yet.
// Each is a stand-in: swap a block's `media: { mock: 'x' }` for
// `media: { img: '…webp', w, h, alt }` once the real screenshot exists.
// All figures shown are illustrative.

/* deterministic pseudo-random, so builds are stable */
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

/* one closed circuit, reused by the track mocks (viewBox 0 0 400 260) */
const TRACK = 'M70 205C44 205 30 186 40 164L88 72C99 50 126 46 142 62L176 100C186 112 202 112 212 99L250 46C263 29 291 30 302 46L362 140C374 160 364 186 342 190L232 206C216 208 206 216 200 226C191 242 174 246 159 238L120 216C104 208 92 205 70 205Z';

function trackSvg({ ghost = true, corners = true, cls = '' } = {}) {
  const seg = (color, off, len) => `<path d="${TRACK}" pathLength="100" stroke="${color}" stroke-dasharray="${len} ${100 - len}" stroke-dashoffset="${-off}" />`;
  return `<svg class="trk ${cls}" viewBox="0 0 400 260" role="img" aria-label="Circuit map with three coloured sectors">
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="${TRACK}" stroke="rgba(255,255,255,.06)" stroke-width="22"/>
    <path d="${TRACK}" stroke="#1b1d24" stroke-width="12"/>
    <g stroke-width="4">${seg('#b26bff', 0, 33)}${seg('#3ad29f', 33, 33)}${seg('#ffcc33', 66, 34)}</g>
  </g>
  <g class="sf"><rect x="66" y="195" width="8" height="20" fill="#fff"/><rect x="66" y="195" width="4" height="5" fill="#000"/><rect x="70" y="200" width="4" height="5" fill="#000"/><rect x="66" y="205" width="4" height="5" fill="#000"/><rect x="70" y="210" width="4" height="5" fill="#000"/></g>
  ${corners ? [[24, 160, 1], [128, 42, 2], [270, 24, 3], [382, 140, 4], [205, 250, 5]].map(([x, y, n]) => `<g class="cn"><circle cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${y + 3.5}">${n}</text></g>`).join('') : ''}
  ${ghost ? `<circle r="6" class="car-ghost"><animateMotion dur="7.4s" repeatCount="indefinite" path="${TRACK}"/></circle>
  <circle r="6.5" class="car-me"><animateMotion dur="7.6s" repeatCount="indefinite" path="${TRACK}"/></circle>` : ''}
</svg>`;
}

function trace() {
  const n = 80, W = 400, H = 120;
  const f = (i, ph) => 60 + 38 * Math.sin(i / 7 + ph) + 14 * Math.sin(i / 2.7 + ph * 2);
  const pts = (ph, dy) => Array.from({ length: n }, (_, i) => `${(i / (n - 1) * W).toFixed(1)},${(H - f(i, ph) * 0.9 - dy).toFixed(1)}`).join(' ');
  return `<svg class="chart" viewBox="0 0 400 130" role="img" aria-label="Speed trace of this lap against the best lap">
  ${[30, 60, 90].map((y) => `<line x1="0" x2="400" y1="${y}" y2="${y}" class="gridl"/>`).join('')}
  <polyline points="${pts(0, 0)}" class="ln-best"/>
  <polyline points="${pts(0.12, 4)}" class="ln-me"/>
</svg>`;
}

function ggPlot() {
  const rand = rng(7); let dots = '';
  for (let i = 0; i < 170; i++) {
    const a = rand() * Math.PI * 2, rr = Math.sqrt(rand()) * (0.55 + 0.4 * Math.abs(Math.sin(a)));
    const x = 100 + Math.cos(a) * rr * 80, y = 100 + Math.sin(a) * rr * (Math.sin(a) > 0 ? 88 : 64);
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9"/>`;
  }
  return `<svg class="gg" viewBox="0 0 200 200" role="img" aria-label="Grip plot: cornering, braking and acceleration">
  ${[30, 60, 90].map((rad) => `<circle cx="100" cy="100" r="${rad}" class="ring"/>`).join('')}
  <line x1="5" x2="195" y1="100" y2="100" class="ring"/><line y1="5" y2="195" x1="100" x2="100" class="ring"/>
  <g class="dots">${dots}</g>
  <text x="100" y="196" class="ax">BRAKE</text><text x="100" y="12" class="ax">ACCEL</text>
</svg>`;
}

function dynoSvg() {
  const pts = [], tq = [];
  for (let i = 0; i <= 40; i++) {
    const x = i / 40, p = Math.sin(Math.min(1, x * 1.15) * Math.PI / 2) * (1 - Math.max(0, x - 0.85) * 1.6);
    const t = 0.78 + 0.22 * Math.sin(x * Math.PI * 0.9) - x * 0.18;
    pts.push(`${(20 + x * 360).toFixed(1)},${(150 - p * 120).toFixed(1)}`);
    tq.push(`${(20 + x * 360).toFixed(1)},${(150 - t * 95).toFixed(1)}`);
  }
  return `<svg class="chart" viewBox="0 0 400 165" role="img" aria-label="Estimated power and torque curves from a road dyno pull">
  ${[40, 80, 120].map((y) => `<line x1="20" x2="380" y1="${y}" y2="${y}" class="gridl"/>`).join('')}
  <polyline points="${tq.join(' ')}" class="ln-best"/>
  <polyline points="${pts.join(' ')}" class="ln-me"/>
  ${[2, 3, 4, 5, 6, 7].map((k, i) => `<text x="${20 + i * 72}" y="163" class="ax">${k}k</text>`).join('')}
</svg>`;
}

const panel = (inner, cls = '', label = '') => `<div class="mk ${cls}"${label ? ` role="img" aria-label="${label}"` : ''}>${inner}</div>`;
const bar = (l, r = '') => `<div class="mk-bar"><span>${l}</span><span>${r}</span></div>`;

const M = {
  /* ---------- racing ---------- */
  lap: () => panel(`
    ${bar('<b class="mk-mode">TRACK</b> Lap 7', '<span class="mk-live">LIVE</span>')}
    <div class="lap-main">
      <div class="lap-time num">1:42.318</div>
      <div class="lap-delta good num">&minus;0.214</div>
    </div>
    <div class="delta-bar"><span style="--d:62%"></span></div>
    <div class="sectors">
      <div class="sec s-pb"><small>S1</small><b class="num">31.902</b></div>
      <div class="sec s-up"><small>S2</small><b class="num">38.115</b></div>
      <div class="sec s-dn"><small>S3</small><b class="num">32.301</b></div>
    </div>
    <div class="mk-foot"><span>Best <b class="num">1:41.977</b></span><span>Theoretical <b class="num">1:41.402</b></span></div>`, 'mk-lap', 'Lap timer: lap 7, 1:42.318, minus 0.214 to best, three sector times'),

  track: () => panel(`${bar('<b>Your home circuit</b>', '<span class="mk-chip">Ghost: best lap</span>')}${trackSvg()}
    <div class="mk-legend"><span><i style="background:#b26bff"></i>Sector 1</span><span><i style="background:#3ad29f"></i>Sector 2</span><span><i style="background:#ffcc33"></i>Sector 3</span><span><i class="ghost"></i>Ghost</span></div>`, 'mk-track'),

  analysis: () => panel(`
    ${bar('<b>Session analysis</b>', '9 laps')}
    <div class="an-grid">
      <div class="an-l">
        <h5>Where the time goes</h5>
        <ul class="loss">
          <li><b>Turn 4</b><span>Braking early</span><em class="num">+0.31s</em></li>
          <li><b>Turn 2</b><span>Slow apex</span><em class="num">+0.18s</em></li>
          <li><b>Turn 5</b><span>Late on the throttle</span><em class="num">+0.12s</em></li>
        </ul>
        <h5>Speed trace &middot; lap vs best</h5>${trace()}
      </div>
      <div class="an-r"><h5>Grip (g-g)</h5>${ggPlot()}<div class="mk-foot col"><span>Corner <b class="num">1.04 g</b></span><span>Brake <b class="num">0.98 g</b></span></div></div>
    </div>`, 'mk-analysis', 'Session analysis: time lost per corner, speed trace and grip plot'),

  live: () => panel(`
    <div class="seg"><span>Sport</span><span class="on">Track</span><span>Race</span></div>
    <div class="live-grid">
      <div class="speed num">148<small>km/h</small></div>
      <div class="live-r"><div class="lap-delta good num">&minus;0.18</div><small>to best &middot; S2</small></div>
    </div>
    <div class="chase">${trackSvg({ corners: false, cls: 'trk-chase' })}</div>`, 'mk-cluster gaining', 'Live cluster in Track mode with a chase map'),

  pacenotes: () => panel(`
    ${bar('<b>Pace notes</b> &middot; Stage 2', '<span class="mk-chip">Co-driver voice</span>')}
    <ol class="notes">
      <li><span class="num">120</span><b>4 Left</b><em>tightens</em></li>
      <li><span class="num">60</span><b>Crest</b><em class="warn">caution</em></li>
      <li><span class="num">150</span><b>6 Right</b><em>opens</em></li>
      <li><span class="num">40</span><b>2 Left</b><em>long</em><i class="memo">${'<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3"/></svg>'}memo 0:04</i></li>
    </ol>`, 'mk-notes', 'Generated pace notes with a voice memo'),

  rally: () => panel(`
    ${bar('<b class="mk-mode">STAGE</b> Hillside test stage', 'Standing start')}
    <div class="lap-main"><div class="lap-time num">4:07.62</div><div class="lap-delta num" style="color:var(--ink-dim)">7.84 km</div></div>
    <div class="stage-line"><span style="--p:72%"></span><i>Start</i><i>Stop control</i></div>
    <div class="mk-foot"><span>Next <b>3 Right into crest</b></span><span class="num">220 m</span></div>`, 'mk-rally', 'Rally stage timer'),

  regularity: () => panel(`
    ${bar('<b class="mk-mode">TSD</b> Section 3 of 5', 'Calibrated')}
    <div class="reg">
      <div><small>Target</small><b class="num">48.0</b><em>km/h avg</em></div>
      <div class="late"><small>Status</small><b class="num">+1.4 s</b><em>late</em></div>
      <div><small>Distance</small><b class="num">12.84</b><em>km</em></div>
    </div>
    <div class="delta-bar warn"><span style="--d:58%"></span></div>`, 'mk-reg', 'Regularity: target average speed and early or late'),

  perf: () => panel(`
    ${bar('<b class="mk-mode">PERFORMANCE</b> 0&ndash;100 km/h', 'Launch detected')}
    <div class="lap-main"><div class="lap-time num">7.42<small>s</small></div></div>
    <ul class="splits">
      <li><span>0&ndash;60 km/h</span><b class="num">3.11 s</b></li>
      <li><span>60 ft</span><b class="num">2.48 s</b></li>
      <li><span>&#8539; mile</span><b class="num">10.9 s @ 104</b></li>
      <li><span>&frac14; mile</span><b class="num">16.2 s @ 132</b></li>
      <li><span>100&ndash;0 braking</span><b class="num">38.6 m</b></li>
      <li><span>80&ndash;120 rolling</span><b class="num">6.05 s</b></li>
    </ul>`, 'mk-perf', 'Performance test results: 0 to 100, 60 foot, eighth and quarter mile, braking and rolling'),

  dyno: () => panel(`
    ${bar('<b>Road dyno</b> &middot; Garage: hatchback, 1,050 kg', '3rd gear')}
    ${dynoSvg()}
    <div class="mk-legend"><span><i style="background:var(--ac)"></i>Wheel power (estimate)</span><span><i style="background:rgba(255,255,255,.5)"></i>Torque (estimate)</span></div>`, 'mk-dyno', 'Estimated power curve from a road dyno pull'),

  coach: () => panel(`
    ${bar('<b>Coach</b>', 'Debrief')}
    <div class="bubbles">
      <p class="bub">Sector two, two tenths up.</p>
      <p class="bub">Turn four: you're braking early. Try the 100 board.</p>
      <p class="bub me">Session best 1:41.977. Theoretical 1:41.402.</p>
    </div>`, 'mk-coach', 'Spoken coach calls and debrief'),

  wheel: () => panel(`
    <div class="keys">
      <span><b>Mark</b><small>Drop a note</small></span>
      <span><b>Voice</b><small>Record memo</small></span>
      <span><b>Repeat</b><small>Last call</small></span>
      <span><b>Mode</b><small>Sport &middot; Track &middot; Race</small></span>
    </div>`, 'mk-wheel', 'Steering-wheel buttons: mark, voice, repeat, mode'),

  library: () => panel(`
    ${bar('<b>Track library</b>', '6 venues')}
    <div class="lib">
      <div class="lib-map">${trackSvg({ ghost: false })}</div>
      <ul class="lib-stats">
        <li><small>Corners</small><b class="num">5</b></li>
        <li><small>Longest straight</small><b class="num">640 m</b></li>
        <li><small>Best lap</small><b class="num">1:41.977</b></li>
        <li><small>Sessions</small><b class="num">9</b></li>
      </ul>
    </div>`, 'mk-lib', 'Track page with map, corners, longest straight and best lap'),

  import: () => panel(`
    ${bar('<b>Import a track</b>', 'GPX &middot; KML')}
    <ul class="imp">
      <li><span class="file">circuit.gpx</span><i>&rarr;</i><b>Circuit</b><small>closed loop &middot; START/FINISH sets the line</small></li>
      <li><span class="file">stage.kml</span><i>&rarr;</i><b>Stage</b><small>with generated pace notes</small></li>
    </ul>`, 'mk-imp', 'GPX and KML import'),

  sensors: () => panel(`
    <div class="sens">
      <div class="phone-mini"><div class="pm-screen"><small>DashLink Wireless</small><b class="num">25<span>Hz</span></b><em>Sensors streaming</em></div></div>
      <div class="sens-r">
        <div class="gnum num">1.12<small>g</small></div><small class="dim">measured lateral</small>
        <div class="mk-chip" style="margin-top:14px">Car GPS standby</div>
      </div>
    </div>`, 'mk-sens', 'Phone sensors streaming at 25 times a second'),

  /* ---------- dashboard / themes ---------- */
  accents: () => {
    const a = [['Electric', '#2f9dff'], ['Crimson', '#ff2b3a'], ['Emerald', '#2fd27a'], ['Amber', '#ffb020'], ['Violet', '#9b6bff'], ['Glacier', '#7fe3f0']];
    return panel(`
    <div class="dial" style="--acc:${a[0][1]}">${dialSvg()}</div>
    <div class="acc-row" role="radiogroup" aria-label="Accent colour">${a.map(([n, h], i) => `<button type="button" role="radio" aria-checked="${i === 0}" style="--sw:${h}" data-accent="${h}"><i></i>${n}</button>`).join('')}</div>`, 'mk-accents');
  },

  presets: () => {
    const p = [['Signature', '#2f9dff', '#ecebe6'], ['Midnight', '#7aa2ff', '#15161a'], ['Racing', '#ff2b3a', '#c8102e'], ['Grand Tour', '#ffb020', '#1f4d36'], ['Sunset', '#ff7a3d', '#ef6a2b'], ['Aurora', '#2fd27a', '#6b3fa0'], ['Arctic', '#7fe3f0', '#b9bec6']];
    return `<div class="presets">${p.map(([n, ac, paint]) => `<div class="preset" style="--acc:${ac};--paint:${paint}"><div class="pr-vis">${dialSvg(true)}<span class="pr-car">${carTop()}</span></div><b>${n}</b></div>`).join('')}</div>`;
  },

  speedos: () => panel(`<div class="speedos">${['Digital', 'Corsa', 'Chrono', 'Sport', 'Hyper', 'Minimal'].map((n, i) => `<div class="sp sp-${i}"><div class="sp-face">${i === 0 ? '<b class="num">72</b>' : dialSvg(true)}</div><small>${n}</small></div>`).join('')}</div>`, 'mk-speedos', 'Six speedometer styles'),

  /* ---------- trips ---------- */
  logbook: () => panel(`
    ${bar('<b>Logbook</b>', '<span class="mk-chip">Export CSV</span>')}
    <table class="lb"><thead><tr><th>Date</th><th>Distance</th><th>Time</th><th>Cost (est.)</th></tr></thead><tbody>
      <tr><td>Mon 14</td><td class="num">23.4 km</td><td class="num">38 min</td><td class="num">312</td></tr>
      <tr><td>Mon 14</td><td class="num">22.9 km</td><td class="num">41 min</td><td class="num">305</td></tr>
      <tr><td>Tue 15</td><td class="num">8.1 km</td><td class="num">17 min</td><td class="num">108</td></tr>
      <tr><td>Wed 16</td><td class="num">146.0 km</td><td class="num">2 h 06</td><td class="num">1,946</td></tr>
    </tbody></table>`, 'mk-log', 'Logbook of drives with CSV export'),

  trip: () => panel(`
    <div class="seg"><span class="on">Trip A</span><span>Trip B</span><span>This drive</span></div>
    <div class="trip-grid">
      <div><small>Distance</small><b class="num">412.6<span>km</span></b></div>
      <div><small>Moving time</small><b class="num">7:48<span>h</span></b></div>
      <div><small>Average</small><b class="num">53<span>km/h</span></b></div>
      <div><small>Top speed</small><b class="num">118<span>km/h</span></b></div>
    </div>`, 'mk-trip', 'Trip computer: distance, moving time, average and top speed'),

  /* ---------- wireless app ---------- */
  phoneLibrary: () => `<div class="phone"><div class="phone-screen">
    <div class="ps-head"><b>Library</b><span class="mk-chip">Offline</span></div>
    <div class="ps-card"><small>Home circuit &middot; personal best</small><svg viewBox="0 0 200 50" class="spark"><polyline points="0,40 25,36 50,38 75,28 100,30 125,22 150,18 175,16 200,9"/></svg><b class="num">1:41.977</b></div>
    <ul class="ps-list">
      <li><b>Track day</b><span>9 laps &middot; best 1:41.977</span></li>
      <li><b>0&ndash;100 km/h</b><span>7.42 s &middot; history</span></li>
      <li><b>Stage 2</b><span>Pace notes &middot; 4:07.62</span></li>
      <li><b>Road dyno</b><span>3rd gear pull &middot; estimate</span></li>
    </ul>
  </div></div>`,

  pair: () => panel(`
    <div class="pair">
      <div class="pair-ic">${'<svg viewBox="0 0 24 24"><rect x="2" y="5" width="13" height="10" rx="2"/><rect x="17" y="8" width="5" height="11" rx="1.2"/><path d="M6 19h5"/></svg>'}</div>
      <small>Confirm this code on both screens</small>
      <div class="code num">K7Q2</div>
      <div class="mk-foot"><span>Direct link &middot; encrypted</span><span>No internet needed</span></div>
    </div>`, 'mk-pair', 'Pairing code K7Q2 shown on car and phone'),

  browser: () => panel(`
    <div class="br-top"><i></i><i></i><i></i><span>http://phone.local &middot; access key required</span></div>
    <div class="br-body">
      <div class="br-map">${trackSvg({ ghost: false, corners: false })}</div>
      <div class="br-chart"><small>Lap times</small><svg viewBox="0 0 200 80" class="bars">${[62, 54, 50, 47, 49, 45, 44, 46, 43].map((h, i) => `<rect x="${i * 22 + 2}" y="${80 - h}" width="16" height="${h}" rx="3"/>`).join('')}</svg></div>
    </div>`, 'mk-browser', 'The library opened in a web browser on a computer'),

  qr: () => {
    const rand = rng(42); let cells = '';
    for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      if (finder) continue;
      if (rand() > 0.52) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
    const f = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="none" stroke="#000" stroke-width="1" transform="translate(.5 .5)" /><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
    return panel(`<div class="qrw"><svg viewBox="-2 -2 25 25" class="qrsvg" aria-hidden="true"><rect x="-2" y="-2" width="25" height="25" fill="#fff"/>${cells}${f(0, 0)}${f(14, 0)}${f(0, 14)}</svg><div><b>Scan with your phone</b><small>Opens DashLink Wireless on Google Play</small></div></div>`, 'mk-qr', 'A QR code on the car screen (illustration)');
  },

  buy: () => panel(`
    <div class="buy">
      <div class="buy-unit"><small>On the head unit</small><b>Go Premium</b><span class="qr-mini"></span></div>
      <div class="buy-arrow">&rarr;</div>
      <div class="buy-phone"><small>On your phone</small><b>Pay on Google Play</b><span class="mk-chip">Drive or Pro &middot; pay once</span></div>
    </div>`, 'mk-buy', 'Buy on the head unit or scan a QR code to pay on your phone'),
};

let cid = 0;
function carTop() {
  const g = 'cg' + (++cid);
  return `<svg viewBox="0 0 120 240" class="car" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>
  <path class="body" d="M30 22C40 8 80 8 90 22c8 12 12 40 12 70v88c0 30-4 44-14 50-16 8-40 8-56 0-10-6-14-20-14-50V92c0-30 4-58 12-70z"/>
  <path d="M30 22C40 8 80 8 90 22c8 12 12 40 12 70v88c0 30-4 44-14 50-16 8-40 8-56 0-10-6-14-20-14-50V92c0-30 4-58 12-70z" fill="url(#${g})"/>
  <path d="M28 78c20-10 44-10 64 0l-6 30H34z" fill="#0b0d12" opacity=".9"/><path d="M34 168h52l5 26c-20 8-42 8-62 0z" fill="#0b0d12" opacity=".9"/>
  <rect x="33" y="110" width="54" height="56" rx="8" fill="#000" opacity=".12"/></svg>`;
}

function dialSvg(small = false) {
  const ticks = Array.from({ length: 27 }, (_, i) => {
    const a = (-225 + i * 10) * Math.PI / 180, r1 = i % 2 ? 78 : 72, r2 = 86;
    return `<line x1="${(100 + Math.cos(a) * r1).toFixed(1)}" y1="${(100 + Math.sin(a) * r1).toFixed(1)}" x2="${(100 + Math.cos(a) * r2).toFixed(1)}" y2="${(100 + Math.sin(a) * r2).toFixed(1)}" class="${i > 21 ? 'tk red' : 'tk'}"/>`;
  }).join('');
  return `<svg viewBox="0 0 200 200" class="dial-svg" aria-hidden="true">
  <circle cx="100" cy="100" r="94" class="d-bg"/>
  <path d="M38.5 161.5A87 87 0 1 1 161.5 161.5" class="d-arc"/>
  ${ticks}
  <line x1="100" y1="100" x2="${(100 + Math.cos(-0.5) * 70).toFixed(1)}" y2="${(100 + Math.sin(-0.5) * 70).toFixed(1)}" class="d-needle"/>
  <circle cx="100" cy="100" r="7" class="d-hub"/>
  ${small ? '' : '<text x="100" y="150" class="d-num">112</text><text x="100" y="168" class="d-unit">km/h</text>'}
</svg>`;
}

export function mock(name, props = {}) {
  const fn = M[name];
  if (!fn) throw new Error(`Unknown mock "${name}"`);
  return fn(props);
}
