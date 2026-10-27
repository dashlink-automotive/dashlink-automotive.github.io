// DashLink Racing building blocks, shared by /racing/ and its sub-pages.
// `up` is the relative path back to the site root ('../' or '../../').

import { racingLockup, icon } from './components.mjs';

export const RACING_BAR = { title: 'DashLink Racing', sub: 'Part of Pro. Try it free', cta: { play: 'headunit', label: 'Try free', plan: 'pro' } };

// Hero CTA and plan line for the Racing pages.
export const RACING_TRY = { play: 'headunit', label: 'Try DashLink Racing free', plan: 'pro' };
export const RACING_TIER = (pro) => pro;

export function subnav(current, up) {
  const items = [['racing', 'Overview', 'racing/'], ['track-day', 'Track day', 'racing/track-day/'], ['rally', 'Rally', 'racing/rally/'], ['performance', 'Performance', 'racing/performance/']];
  return `<div class="race-top reveal">${racingLockup('lg')}<nav class="race-tabs" aria-label="DashLink Racing">${items.map(([k, l, h]) => `<a href="${up}${h}"${k === current ? ' aria-current="page"' : ''}><span>${l}</span></a>`).join('')}</nav></div>`;
}

// Session analysis, toured on the phone (DashLink Wireless screens)
export const ANALYSIS_TOUR = { frame: 'phoneTabs', label: 'Session analysis screens', tabs: [
  { key: 'overview', name: 'Overview', q: 'Best lap, theoretical best, consistency, top speed and your g-force peaks.', img: 'v10/wl-overview.webp', alt: 'Session overview: best lap 2:56.240, theoretical best, consistency, top speed, peak g-forces and best sectors', lifts: [{ img: 'v10/wl-time.webp', x: -30, y: 60, w: 112, label: 'The corners that cost you', below: true }] },
  { key: 'map', name: 'Map', q: 'Your line coloured by speed, every corner numbered. Tap a lap to light it up.', img: 'v10/wl-map.webp', alt: 'Track map coloured by speed with 15 numbered corners and lap 2 highlighted', lifts: [{ img: 'v10/wl-lap-card.webp', x: 22, y: 72, w: 104, label: 'Tap a lap: time and sectors', right: true }] },
  { key: 'laps', name: 'Laps', q: 'Every lap and sector side by side. Gold is the best in each column.', img: 'v10/wl-laps.webp', alt: 'Lap table: three laps with sector times coloured from fastest to slowest', lifts: [{ img: 'v10/wl-lap-best.webp', x: -26, y: 16, w: 116, label: 'Best lap and sectors in gold' }] },
  { key: 'speed', name: 'Speed', q: 'Any lap against your best: who carries more speed where, and the time gained or lost.', img: 'v10/wl-speed.webp', alt: 'Speed trace of lap 3 against the best lap, and the time lost along the lap', lifts: [{ img: 'v10/wl-delta.webp', x: 20, y: 52, w: 104, label: 'Where the time goes, metre by metre', right: true }] },
  { key: 'grip', name: 'Grip', q: 'Braking, cornering and acceleration on one g-g plot. Measured when you use phone sensors.', img: 'v10/wl-grip.webp', alt: 'g-g plot of the session with peak braking, cornering and acceleration', lifts: [{ img: 'v10/wl-peaks.webp', x: -24, y: 72, w: 110, label: 'Your peaks, in g', below: true }] },
] };

// "Find the time": every way DashLink shows a time difference, from the live gap to other drivers' runs.
// Head-unit screens, 1600x938 (v14/). Used by /racing/ and /racing/track-day/ as an explorer.
export const FIND_TIME = { id: 'find-time', w: 1600, h: 938, eyebrow: 'Every tenth, accounted for', title: 'See exactly <span class="grad-text">where the time goes.</span>',
  sub: 'Live in the car, then lap against lap, corner by corner and against other drivers. Every difference in seconds and metres, on the head unit.',
  more: 'Laps, corners and the grip plot also open on your phone and laptop with <a href="#debrief">DashLink Wireless</a>.',
  items: [
    { key: 'live', name: 'The live gap', desc: 'Race mode: a huge gap to your best lap, readable without looking, and the metres between you and your ghost.', img: 'v14/live-race.webp', alt: 'Race mode: plus 0.02 seconds, 1 metre behind your best lap, the last lap flashed with plus 2.81', spots: [
      { x: 50, y: 53.3, label: 'The gap to your best, live' }, { x: 50, y: 74.2, label: 'Metres behind or ahead' }, { x: 50, y: 18.4, label: 'Last lap, with its gap' }, { x: 31, y: 83.7, label: 'Progress through the lap' }, { x: 91.5, y: 91.4, label: 'Your best lap' } ] },
    { key: 'gainloss', name: 'Gain / loss map', desc: 'Any lap against your best, painted on the track: green where you gain, red where you lose. Plus your theoretical best.', img: 'v14/rs-gainloss.webp', alt: 'Session overview: lap 2 on a gain/loss map, best lap 42.49, theoretical best 41.75, consistency and where the time goes', spots: [
      { x: 43.4, y: 31.8, label: 'Speed or gain/loss' }, { x: 26.9, y: 83.2, label: 'Green gaining, red losing' }, { x: 86, y: 33.6, label: '0.74 s still in you' }, { x: 62.8, y: 53.3, label: 'How consistent your laps are' }, { x: 56, y: 79.4, label: 'The costliest corner, and why' }, { x: 90, y: 71.4, label: 'Read aloud as a debrief' }, { x: 19.4, y: 90.8, label: 'Pick any lap' } ] },
    { key: 'laps', name: 'Lap against lap', desc: 'Two laps&rsquo; speed traces over each other, and the gap to your best metre by metre. Every sector, best in gold.', img: 'v14/rs-laps.webp', alt: 'Laps: four laps with sector times, and lap 2 against lap 1 as speed traces and a gap-to-best chart', spots: [
      { x: 9.4, y: 32, label: 'Each lap against your best' }, { x: 21.4, y: 53.8, label: 'Fastest sectors in gold' }, { x: 68.8, y: 48, label: 'Two laps, speed traced' }, { x: 71.9, y: 79, label: 'Gap to the best: green gains, red losses' } ] },
    { key: 'corners', name: 'Corner by corner', desc: 'Every corner with its direction, apex speed against your best, and the time it cost you.', img: 'v14/rs-corners.webp', alt: 'Corners: four corners on the map, each with apex speed against the best and the time lost', spots: [
      { x: 39.2, y: 36.9, label: 'Every corner on the map' }, { x: 61.9, y: 29.9, label: 'Direction and angle' }, { x: 68.8, y: 48.2, label: 'Apex speed against your best' }, { x: 92.5, y: 45.2, label: 'Time lost in that corner' } ] },
    { key: 'replay', name: 'Against your mates', desc: 'Several drivers&rsquo; runs of the same course, played together: who leads, by how many metres and seconds.', img: 'v14/replay.webp', alt: 'Replay: two runs of the same circuit on one map with the gap, delay and speed traces', spots: [
      { x: 51.7, y: 24.6, label: 'Every driver on the map' }, { x: 22.3, y: 50.5, label: 'Gap in metres' }, { x: 29.8, y: 50.5, label: 'Delay in seconds' }, { x: 70.6, y: 86.4, label: 'Speed traces, overlaid' }, { x: 89.4, y: 7, label: 'Add runs: GPX or from a phone' } ] },
  ] };

export const F = (up) => ({
  trackDay: { id: 'track-day', pro: true, kicker: 'Track day lap timer', title: 'Every lap, timed to the line.', body: 'Laps are timed by crossing the start/finish line, interpolated between GPS fixes rather than snapped to the nearest point. The line lays itself, or set it with one tap.', bullets: ['<b>Flying or standing starts</b>: stop on the grid and the clock starts as you pull away', 'Automatic sector lines after lap 1, with sector times', 'Live <b>delta</b> to your best lap', 'Upcoming pace notes on top, with the distance to the next one'], media: { img: 'v8/mode-track.webp', w: 2000, h: 1250, alt: 'Track mode at the start of a stage: next pace notes, lap time, best sectors, chase map and a Start now button', spots: [
    { x: 9, y: 16.5, label: 'Next pace note, with distance' }, { x: 60, y: 16.5, label: 'The two notes after it' }, { x: 10, y: 27.4, label: 'Standing or flying start' }, { x: 42, y: 27.4, label: 'Stage recognised, pace notes ready' }, { x: 31, y: 63, label: 'Live delta to your best' }, { x: 25, y: 78.5, label: 'Sector times, best in yellow' }, { x: 74, y: 45, label: 'Chase map, heading-up' }, { x: 63, y: 78.5, label: 'Last and best lap' }, { x: 86, y: 92, label: 'The clock starts by itself, or tap Start now' } ] } },
  ghost: { id: 'ghost', pro: true, kicker: 'Ghost car', title: 'Race your best lap.', body: 'The yellow arrow on the chase map is your best lap, driving with you. When it pulls ahead you&rsquo;re losing time; when you catch it, you&rsquo;re on a personal best. Pace notes ride along on the same map.', bullets: ['Your best lap, replayed in real time', 'See exactly where it pulls away', 'Pace notes marked on the road ahead'], media: { frame: 'stack', cards: [
    { img: 'v8/ghost-notes.webp', w: 915, h: 866, alt: 'Chase map with pace notes L3, R3 and a hairpin marked, and the ghost car just ahead', tags: [{ x: 57.9, y: 46.4, label: 'Pace notes on the map', tone: 'note' }] },
    { img: 'v8/ghost-straight.webp', w: 915, h: 866, alt: 'Chase map on a straight: the yellow ghost car of your best lap just ahead of you', tags: [{ x: 49, y: 63.4, label: 'Ghost: your best lap', tone: 'ghost' }, { x: 50.2, y: 67.7, label: 'You', tone: 'you' }] },
  ] } },
  rally: { id: 'rally', pro: true, kicker: 'Rally stage timer', title: 'Start line to stop control.', body: 'Standing start at the start line, or a flying start. Finish at the line or at the stop control. Known stages are recognised when you arrive, with the pace notes ready.', media: { img: 'v9/stage-drive.webp', w: 2000, h: 1250, alt: 'Driving a rally stage in Track mode with pace notes and warnings on the map', spots: [ { x: 10, y: 16.5, label: 'Next note, with distance' }, { x: 60, y: 16.5, label: 'Linked notes: opens, bumps, into' }, { x: 70.3, y: 62.5, label: 'Warnings on the map' }, { x: 17, y: 55, label: 'Stage time' }, { x: 73, y: 90, label: 'Start line' } ] }, note: 'For rallies on closed roads. Check your event&rsquo;s rules on electronic devices.' },
  recce: { id: 'recce', pro: true, kicker: 'Recce &rarr; pace notes', title: 'Drive it slowly once. Get pace notes.', body: 'On the recce, DashLink writes the <b>pace notes</b>: corner, severity, length, tightens and opens, crests and cautions. Add your own calls and <b>voice memos</b>. On the stage, a <b>co-driver voice</b> calls them. A pace-note editor is included.', media: { img: 'v9/pace-notes.webp', w: 2000, h: 1250, alt: 'Pace notes for a stage: 20 notes over 2.5 km, each with its distance', spots: [ { x: 73, y: 27.6, label: 'Corner, length and warnings' }, { x: 62, y: 18.6, label: 'Your voice memo' }, { x: 54, y: 55, label: 'Distance along the stage' }, { x: 25.2, y: 48.4, label: 'Every note on the map' }, { x: 10.5, y: 73.6, label: 'Start' }, { x: 62, y: 91.4, label: 'Finish' } ] }, note: 'Check your event&rsquo;s rules on electronic devices.' },
  regularity: { id: 'regularity', pro: true, kicker: 'Regularity (TSD)', title: 'Hold the average. Section by section.', body: 'Hold a set average speed by section. DashLink shows how early or late you are to a tenth of a second and the speed that gets you back on time, calls each speed change before it comes, and splits at every check. Calibrate the distance on a measured section first.', media: { img: 'v14/tsd-running.webp', w: 1600, h: 938, alt: 'Regularity: 9.2 seconds early, target 40 km/h, drive at 32 km/h to get back on time', spots: [
    { x: 16.5, y: 52.5, label: 'Early or late, to a tenth' }, { x: 27, y: 86, label: 'Drive at 32 km/h to get back on time' }, { x: 59.3, y: 24.3, label: 'Target average' }, { x: 93.4, y: 25.6, label: 'Your speed now' }, { x: 61.5, y: 44, label: 'Next speed change, counted down' }, { x: 83, y: 37, label: 'Section 1 of 3' }, { x: 68.6, y: 89.8, label: 'Split at each check' } ] }, note: 'For regularity events on closed or controlled routes. Check your event&rsquo;s rules on electronic devices.' },
  performance: { id: 'performance', free: true, kicker: 'Performance tests', title: '0&ndash;100, with every split.', body: 'Launch, braking and overtake tests, timed from the moment you move. Splits at 50, 60, 80, 100 and 120 km/h with the distance each took, plus 60 ft, &#8539; and &frac14; mile with trap speed. Every run is saved and compared with your best.', bullets: ['<b>0&ndash;100</b> launch, <b>100&ndash;0</b> braking, <b>80&ndash;120</b> overtake', 'The launch moment is detected precisely', '&ldquo;Saved, ready for the next run&rdquo;: no buttons between runs'], media: { img: 'v7/perf-launch.webp', w: 890, h: 1060, alt: '0 to 100 km/h launch result: 16.22 seconds', frame: 'photo' } },
  dyno: { id: 'dyno', free: true, kicker: 'Road dyno', title: 'A power curve from one pull.', body: 'Do a pull on a closed, level road and get your power at the wheels, with gear changes detected, the share lost to air drag and rolling, and your best run laid over the top. Power-to-weight puts the car in a class, and your <b>garage</b> keeps each car&rsquo;s weight and body type.', media: { img: 'v7/perf-dyno.webp', w: 960, h: 1040, alt: 'Road dyno: 115 hp estimated at the wheels, power-to-weight, peak thrust and tractive force, with a power curve', spots: [
    { x: 38.9, y: 25, label: 'Peak power at the wheels (estimate)' }, { x: 96.5, y: 17.8, label: 'Power-to-weight, with a class' }, { x: 96.5, y: 40, label: 'Tractive force' }, { x: 64.9, y: 63.5, label: 'Gear change detected' }, { x: 55, y: 57, label: 'Your best run, overlaid' }, { x: 84, y: 74.5, label: 'Air drag and rolling, separated' } ] },
    note: 'An estimate of power at the wheels, from GPS speed and your car&rsquo;s weight, on a level road with no wind. Engine power is usually 10 to 20 percent higher. A 10 Hz GPS gives a finer curve.' },
  live: { id: 'live', pro: true, kicker: 'Live modes', title: 'Sport. Track. Race.', body: 'Three live screens, one tap apart. Upcoming pace notes stay on top in every mode, with the distance to the next one, and the cabin tints as you gain or lose time.', media: { modes: [
    { key: 'track', name: 'TRACK', color: '#ff9c94', img: 'v8/mode-track.webp', alt: 'Track mode', desc: 'Track: lap time, live delta to your best and sector times, beside a heading-up chase map. Stop at the line or roll across it, and the clock starts by itself.' },
    { key: 'race', name: 'RACE', color: '#ff3b30', img: 'v8/mode-race.webp', alt: 'Race mode: plus 5.31 seconds, 110 metres behind your best', desc: 'Race: nothing but the gap. A huge live delta, how many metres behind or ahead of your best you are, and the progress of the run.' },
    { key: 'sport', name: 'SPORT', color: '#ffa21a', img: 'v8/mode-sport.webp', alt: 'Sport mode: 123 km/h with an LED bar and a live grip trace', desc: 'Sport: big speed with an LED bar, top speed, and a live grip trace with cornering and acceleration g.' },
  ] } },
  coach: { id: 'coach', pro: true, kicker: 'Coach', title: 'A voice in the car that knows your laps.', body: 'Sector calls while you drive, and a spoken debrief after the session: which corner costs the most, what it&rsquo;s worth a lap and what to change. Read aloud for the pits, so your eyes stay off the screen.', media: { frame: 'float', img: 'v14/cut-coach.webp', w: 718, h: 225, width: 560, alt: 'Where the time goes: T3 costs 1.12 seconds a lap, with a Debrief button that reads it aloud' } },
  wheel: { id: 'wheel', pro: true, kicker: 'Steering-wheel buttons', title: 'Hands stay on the wheel.', body: 'Teach four steering-wheel buttons: main action, mode, voice and repeat. Each does the obvious thing on each screen: the line or start on a track, a caution on a recce, a split at a regularity check.', media: { img: 'v14/wheel-keys.webp', w: 1600, h: 938, alt: 'Racing steering-wheel buttons: main action, mode, voice and repeat, with what each does when driving, on a recce and in regularity', spots: [
    { x: 21, y: 28.7, label: 'Press the button to teach it' }, { x: 54, y: 19.2, label: 'Main action: line, start or finish' }, { x: 64.5, y: 54, label: 'On a recce: caution, crest, voice note' }, { x: 82.5, y: 30, label: 'In regularity: split at a check' } ] } },
  replay: { id: 'replay', kicker: 'Replay &middot; compare drivers', title: 'Race your mates&rsquo; runs.', body: 'Load several drivers&rsquo; runs of the same circuit or stage and play them together. Everyone starts at once, and the table shows who leads, by how many metres and by how many seconds, with every speed trace laid over the others.', bullets: ['Runs arrive as <b>GPX</b> or from the DashLink Wireless app', 'Play at 1&times; up to 64&times;, or follow the pack', 'Gap in metres, delay in seconds, speed at every point'], media: { img: 'v14/replay.webp', w: 1600, h: 938, alt: 'Replay: two runs of the same circuit on one map, with the gap in metres, the delay in seconds and both speed traces', spots: [
    { x: 51.7, y: 24.6, label: 'Every driver on the map' }, { x: 22.3, y: 50.5, label: 'Gap in metres' }, { x: 29.8, y: 50.5, label: 'Delay in seconds' }, { x: 19.4, y: 19.4, label: 'Play at up to 64&times;' }, { x: 70.6, y: 86.4, label: 'Speed traces, laid over each other' }, { x: 89.4, y: 7, label: 'Add runs: GPX or from a phone' } ] } },
  analysis: { id: 'analysis', pro: true, kicker: 'Session analysis', title: 'Where the time goes, in plain words.', body: 'Best lap, <b>theoretical best</b> and consistency. The corners that cost you, and why: braking early, slow apex, late on the throttle. Lap and sector tables, <b>speed traces</b> against your best, <b>gap to best</b>, a map coloured by speed or gain/loss, a full-screen zoomable map, a <b>grip (g-g) plot</b> with cornering, braking and acceleration figures, and a corner-by-corner tab.', media: ANALYSIS_TOUR, note: 'Shown here in DashLink Wireless, with a session sent from the car.' },
  tracks: { id: 'tracks', kicker: 'Track library', title: 'Every circuit and stage, on its own page.', body: 'A map with coloured sectors, direction arrows and numbered corners. Length, corners left and right, the longest straight, your best lap, the pace notes and every session you&rsquo;ve driven there. Tap <b>Drive</b> to start.', note: 'Import and view tracks free; drive a session with Pro.', media: { img: 'v8/stage-page.webp', w: 2000, h: 1250, alt: 'A stage page: map with three coloured sectors and 13 corners, length, longest straight, best lap and pace notes', spots: [
    { x: 23, y: 17.5, label: 'Start and finish' }, { x: 40, y: 49, label: 'Sectors in colour, with direction' }, { x: 77.6, y: 18, label: 'Corners: left and right' }, { x: 91, y: 18, label: 'Longest straight, tap to show it' }, { x: 64.5, y: 31.5, label: 'Your best lap here' }, { x: 91, y: 31.5, label: 'Pace notes for the stage' }, { x: 78, y: 58, label: 'Every session you drove here' }, { x: 93, y: 6, label: 'Drive the stage' } ] } },
  import: { id: 'import', kicker: 'Import any track', title: 'GPX or KML, from your phone or a file.', body: 'A closed loop becomes a circuit (a START / FINISH waypoint sets the line). Anything else becomes a stage, with pace notes generated for you.', note: 'Import and view free; drive a session with Pro.', media: { mock: 'import' } },
  sensors: SENSORS(up),
});

// Phone sensors story (sensorStory in components.mjs). Shared by the Racing pages and /wireless-app/.
export const SENSORS = (up, link = { href: 'wireless-app/', label: 'Get DashLink Wireless' }, here = false) => ({
  id: 'phone-sensors', pro: true, isNew: true, kicker: 'Phone sensors',
  // short version, for cards
  body: 'Mount your phone and it becomes a timing sensor for the car: up to 25 readings a second instead of about one, and real g-forces.',
  title: 'Your phone becomes <span class="grad-text">a precision timing sensor.</span>',
  lead: `A typical head unit reads its GPS about once a second. At 120 km/h that&rsquo;s one reading every 33 metres, and a lot happens in a corner in 33 metres. Mount a phone running ${here ? 'DashLink Wireless' : `<a href="${up}wireless-app/">DashLink Wireless</a>`} and its GPS and motion sensors fill in the gaps.`,
  values: [
    ['25', '/s', 'Far more detail', 'Up to 25 readings a second instead of about one. Start lines, sectors and speed traces are pinned down far more precisely.'],
    ['g', '', 'Real g-forces', 'Braking, cornering and acceleration measured by the phone&rsquo;s motion sensors, not estimated from GPS.'],
    [icon('shield'), '', 'Nothing to lose', 'If the phone drops out, DashLink carries on with the car&rsquo;s GPS by itself. The data goes only to your car.'],
  ],
  live: { img: 'v10/ps-live.webp', alt: 'DashLink Wireless using the phone as a sensor: calibration steps, motion sensors running and the maximum rate set to 25 Hz', lifts: [
    { img: 'v10/ps-chips.webp', x: -34, y: 7, w: 100, label: 'Sent only to your car' },
    { img: 'v10/ps-motion.webp', x: -30, y: 59, w: 46, label: 'Motion sensors running', below: true },
    { img: 'v10/ps-rate.webp', x: 62, y: 70, w: 56, label: 'Up to 25 a second', right: true },
  ] },
  demo: {
    eyebrow: 'See the difference', title: 'What the car&rsquo;s GPS misses in a corner.',
    sub: 'Drag the speed, then switch between the car&rsquo;s GPS alone and the car with your phone.',
    path: 'M30 300 L300 300 C480 300 560 262 560 180 C560 98 480 60 380 60 L110 60', metres: 260,
    note: 'Illustration. Many head units&rsquo; GPS updates about once a second; yours may be faster. The phone sends up to 25 readings a second, at 10 or 25 Hz.',
  },
  setup: {
    eyebrow: 'Set up in a minute', title: 'Mount it. Pair it. Drive.',
    phone: { img: 'v10/ps-start.webp', mirror: true, alt: 'The Use as sensor card in DashLink Wireless with a Start button', lifts: [
      { img: 'v10/ps-calib.webp', x: 34, y: 33, w: 108, label: 'Calibrates itself in seconds' },
    ] },
    steps: [
      ['Mount the phone', 'In a holder on the dash or windscreen. Not in a hand, cup holder or pocket.'],
      ['Start Racing on the head unit', 'Tap the phone icon at the top and choose Auto. In DashLink Wireless, tap Start, then your car.'],
      ['Let it calibrate', 'Stopped, keep still for 2 seconds. Then on a straight, pull away firmly for 2 seconds above 20 km/h.'],
      ['Drive', 'Turn the phone&rsquo;s screen off if you like. The sensors keep running until the car closes Racing or you tap Stop.'],
    ],
    fine: 'Phone sensors are part of DashLink Pro on the head unit. DashLink Wireless is free, for Android 7.0+ phones.',
  },
  link,
});

// The pit-wall debrief photo (Browser view on a team monitor). Shared by /racing/, track-day and /wireless-app/.
export const PIT_WALL_PHOTO = { img: 'v11/pit-wall.webp', w: 1672, h: 700, alt: 'A team engineer reviewing a DashLink Racing session in Browser view on a big monitor: every corner with best, typical and time lost, and where the time is', spots: [
  { x: 48.4, y: 12.6, label: 'Served by your phone, on local Wi-Fi' },
  { x: 54, y: 30, label: 'Overview, map, laps, corners, speed, grip' },
  { x: 47, y: 52, label: 'Every corner: best, typical and the loss' },
  { x: 80, y: 40, label: 'Where the time is, in plain words' },
  { x: 81, y: 76, label: 'Session details, down to the GPS rate' },
] };
export const PIT_WALL = (cta = { href: 'wireless-app/#browser', label: 'See Browser view' }) => ({
  id: 'debrief', eyebrow: 'Big-screen debrief', isNew: true, pro: true, title: 'Take the session <span class="grad-text">to the pit wall.</span>',
  sub: 'Open every session on a laptop or a big screen with DashLink Wireless: corner losses, lap and sector tables, speed traces and the grip plot, big enough for the whole team.',
  photo: PIT_WALL_PHOTO, chips: ['No cloud or account: your phone serves it', 'Over Wi-Fi or the phone&rsquo;s hotspot', 'Made for driver and coach debriefs'], cta,
});

export const RACING_FAQ = (up) => [
  ['Can I use DashLink Racing on public roads?', 'No. DashLink Racing is for closed courses only: track days, rallies on closed roads, recce and private test venues. Never time yourself on public roads.'],
  ['Do I need extra hardware?', 'No. DashLink uses your head unit&rsquo;s GPS. For faster, more precise timing you can pair a phone running DashLink Wireless (phone sensors, Pro).'],
  ['Is it allowed at my event?', 'Check your event&rsquo;s rules on electronic devices. Rules differ between organisers, especially for rallies and regularity events.'],
  ['Can I get my sessions off the car?', `Yes. Send sessions, laps, tracks and pace notes to your phone over a direct, encrypted link, then export GPX or CSV. See <a href="${up}wireless-app/#send-to-phone">DashLink Wireless</a>.`],
  ['Is DashLink Racing free?', `Try all of it free during your trial. Afterwards DashLink Racing is part of <a href="${up}plans/#pro">Pro</a>. The performance tests (0&ndash;100, braking, 80&ndash;120 and the road dyno) stay free.`],
  ['Are the dyno numbers real horsepower?', 'They are estimates from GPS and your car&rsquo;s mass and body type, useful for comparing your own runs. They are not a chassis-dyno measurement.'],
];
