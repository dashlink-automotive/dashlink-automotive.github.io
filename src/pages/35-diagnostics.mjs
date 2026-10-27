import { hero, anchorBar, feature, explorer, cards, faq, ctaFinal, plansTable, freeBadge, proBadge } from '../components.mjs';

// DashLink Diagnostics: OBD-II through an ELM327 adapter. Shots are 1600x938 (v14/, from the app's
// UI catalogue, 2026-10-27). Stored codes and the main gauges are free; live data, the extra gauges,
// pending/permanent codes, freeze frame, clearing and the engine clusters are Pro.
const S = { w: 1600, h: 938 };

const page = {
  key: 'diagnostics',
  slug: 'diagnostics',
  pillar: 'diagnostics',
  title: 'Car diagnostics on your head unit — fault codes and live engine gauges | DashLink',
  description: 'Plug an ELM327 OBD-II adapter in under the dash and your Android head unit reads fault codes in plain words, shows live engine gauges and charts every sensor.',
  hero: {
    eyebrow: 'DashLink Diagnostics',
    title: 'Check-engine light on? <span class="grad-text">Read it on your dash.</span>',
    sub: 'Plug a small OBD-II adapter in under the dashboard and the screen in your car becomes a scan tool: fault codes in plain words, live engine gauges and every sensor your car reports.',
    tier: `${freeBadge()}${proBadge()}`,
    note: 'Works with ELM327 adapters: Bluetooth, Bluetooth LE or Wi-Fi',
    media: { frame: 'exploded', img: 'v14/diag-gauges.webp', ...S, alt: 'DashLink Diagnostics gauges: an LED tachometer at 2,830 rpm and 110 km/h, coolant, battery, boost, intake, air-fuel ratio and oil gauges', lifts: [
      { img: 'v14/cut-diag-readout.webp', x: 15.6, y: 42.1, w: 16.9, label: 'Revs and speed' },
      { img: 'v14/cut-diag-coolant.webp', x: 47.5, y: 13.3, w: 16.25, label: 'Coolant, live' },
      { img: 'v14/cut-diag-code.webp', x: 46, y: 84, w: 47.5, label: 'Fault codes in plain words', below: true },
    ] },
    variants: {
      codes: { match: ['code', 'codes', 'checkengine', 'engineLight', 'dtc', 'scan', 'scanner', 'obd'], eyebrow: 'Fault codes', title: 'What does that <span class="grad-text">engine light mean?</span>', sub: 'Read the codes behind the check-engine light, explained in plain words with how serious each one is. Free.', media: { img: 'v14/diag-codes.webp', ...S, alt: 'Fault codes: P0301 cylinder 1 misfire and P0420 catalyst efficiency, check-engine light on' } },
      gauges: { match: ['gauge', 'gauges', 'boost', 'afr', 'tacho', 'rpm'], eyebrow: 'Engine gauges', title: 'Your engine, <span class="grad-text">live on the dash.</span>', sub: 'A tachometer with shift lights, coolant, battery, boost, intake, air-fuel ratio and oil, read straight from the car.' },
    },
  },
  body() {
    return [
      hero(this.hero),
      anchorBar([['connect', 'Connect'], ['codes', 'Fault codes'], ['gauges', 'Gauges'], ['live-data', 'Live data'], ['clusters', 'Engine clusters'], ['need', 'What you need']]),
      feature({ id: 'connect', isNew: true, kicker: 'Set up once', title: 'One adapter. <span class="grad-text">Four steps.</span>',
        body: 'Every car sold since the late nineties has an OBD-II port under the dashboard. Push a small ELM327 adapter into it, switch the ignition on and tap Connect. DashLink guides you through each step with an animation, and lists the likely adapter first.',
        bullets: ['<b>Bluetooth, Bluetooth LE or Wi-Fi</b> adapters', 'Reconnects to your adapter by itself next time', 'The engine can stay off to read fault codes'],
        media: { frame: 'float', img: 'v14/cut-diag-steps.webp', w: 1536, h: 411, width: 640, alt: 'Connect in four steps: find the port, plug in the adapter, ignition on, connect here' } }),
      feature({ id: 'codes', flip: true, free: true, kicker: 'Fault codes', title: 'Know why the light is on, <span class="grad-text">before the garage tells you.</span>',
        body: 'DashLink reads the codes behind the check-engine light and says what each one means in plain words, coloured by how serious it is. Walk into the workshop knowing whether it&rsquo;s a loose fuel cap or a misfire.',
        bullets: ['Stored codes and the check-engine light: <b>free</b>', 'Pending and permanent codes, freeze frame and clearing codes: <b>Pro</b>', 'Clearing only works with the engine off, and warns you first'],
        media: { img: 'v14/diag-codes.webp', ...S, alt: 'Fault codes: two stored, one pending and one permanent, with the check-engine light on', spots: [
          { x: 86, y: 23, label: 'Check-engine light: on or off' }, { x: 14, y: 48.8, label: 'What it means, in plain words' }, { x: 21, y: 43.5, label: 'Engine, body, chassis or network' },
          { x: 14, y: 61, label: 'Pending: seen once, not confirmed yet' }, { x: 30, y: 87, label: 'Permanent codes, explained' }, { x: 88, y: 7, label: 'Scan again any time' } ] } }),
      feature({ id: 'gauges', free: true, kicker: 'Engine gauges', title: 'Your engine, <span class="grad-text">live on the screen.</span>',
        body: 'A 54-segment LED tachometer with shift lights from your own redline, live revs and speed, and arc gauges for coolant and battery. Pro adds boost, intake temperature, air-fuel ratio and oil, plus bars for throttle, load and fuel.',
        bullets: ['Shift lights that start where <b>your</b> engine needs them', 'Peak revs held on screen', 'A reading your car doesn&rsquo;t report shows a dash, never a fake zero'],
        media: { img: 'v14/diag-gauges.webp', ...S, alt: 'Engine gauges: LED tachometer, coolant, battery, boost, intake, air-fuel ratio and oil', spots: [
          { x: 24, y: 40.7, label: 'Shift lights from your redline' }, { x: 24, y: 55, label: 'Revs and speed, live' }, { x: 24, y: 70.4, label: 'Peak revs' },
          { x: 55.5, y: 26.6, label: 'Coolant and battery' }, { x: 89.9, y: 26.6, label: 'Boost, intake, AFR, oil: Pro' }, { x: 72.5, y: 82.6, label: 'Throttle, load and fuel' }, { x: 88.7, y: 6.5, label: 'Set your redline' } ] } }),
      feature({ id: 'live-data', flip: true, pro: true, kicker: 'Live data', title: 'Every sensor, <span class="grad-text">charted.</span>',
        body: 'Every reading your car reports in one list, each with its own sparkline. Tap one to chart the last 60 seconds with its minimum, average and maximum, or lay a second reading over it to see how they move together.',
        bullets: ['Engine, air and fuel, temperatures, electrics', 'Minimum, average and maximum for each reading', 'Pause the chart to look closer'],
        media: { img: 'v14/diag-live.webp', ...S, alt: 'Live data: engine speed charted over the last 60 seconds, with a list of every sensor and its sparkline', spots: [
          { x: 9.4, y: 42.6, label: 'Every sensor your car reports' }, { x: 26.9, y: 24.2, label: 'A sparkline for each reading' }, { x: 41.6, y: 33, label: 'Add a second reading to the chart' },
          { x: 85, y: 26, label: 'Minimum, average and maximum' }, { x: 71.9, y: 64, label: 'The last 60 seconds' } ] } }),
      explorer({ id: 'clusters', w: 1552, h: 668, eyebrow: 'Engine clusters ' + proBadge(), title: 'Turn your dashboard into <span class="grad-text">a real instrument cluster.</span>',
        sub: 'With an adapter plugged in, Dock mode can show five full clusters driven by your engine: revs, temperatures, boost, fuel and fault codes, the way a sports car shows them.',
        more: 'Choose a cluster in Dock style. Without the adapter, the dashboard goes back to your usual layout by itself.',
        items: [
          { key: 'gt', name: 'Grand Tourer', desc: 'Tachometer and speedometer either side of a centre display, with a shift-up arrow near the redline.', img: 'v14/eng-gt.webp', alt: 'The Grand Tourer cluster: tachometer, speedometer and a centre display with fault codes, coolant, fuel, throttle, oil, battery and boost', spots: [
            { x: 19.5, y: 50, label: 'Tachometer, from your engine' }, { x: 41.4, y: 9, label: 'Warning lights' }, { x: 50, y: 30.7, label: 'Fault codes flagged on the dash' }, { x: 50, y: 52, label: 'Coolant, fuel, throttle, oil and boost' }, { x: 80.5, y: 50, label: 'Speedometer' } ] },
          { key: 'flat-six', name: 'Flat-Six', desc: 'Five round instruments around a big central tachometer, after the classic German sports car.', img: 'v14/eng-flat-six.webp', alt: 'The Flat-Six cluster: five overlapping round instruments with a large central tachometer' },
          { key: 'v12', name: 'V12', desc: 'A sunray tachometer between two screens, with F1-style shift lights that flash at the redline.', img: 'v14/eng-v12.webp', alt: 'The V12 cluster: a sunray tachometer between engine and fuel screens' },
          { key: 'toro', name: 'Toro', desc: 'All digital and angular: a segmented rev ring around a hexagon.', img: 'v14/eng-toro.webp', alt: 'The Toro cluster: a segmented rev ring around a hexagonal speed readout, with coolant, oil, battery, fuel, boost and throttle bars' },
          { key: 'trio', name: 'Trio', desc: 'Three chrome-ringed gauges on black: volts, water temperature and oil pressure.', img: 'v14/eng-trio.webp', alt: 'The Trio cluster: voltmeter, water temperature and oil pressure gauges with chrome rings' },
        ] }),
      cards({ id: 'need', cols: 3, eyebrow: 'What you need', title: 'A small adapter. <span class="grad-text">That&rsquo;s all.</span>', items: [
        { id: 'need-adapter', icon: 'bolt', title: 'An ELM327 adapter', body: 'Any OBD-II adapter that speaks ELM327, over Bluetooth, Bluetooth LE or Wi-Fi. They&rsquo;re small, cheap and sold everywhere.' },
        { id: 'need-car', icon: 'gauge', title: 'A car with an OBD-II port', body: 'Under the dashboard, near the steering column. Most cars from 1996 (US) or 2001 (Europe) onwards have one.' },
        { id: 'need-unit', icon: 'screen', title: 'DashLink on your head unit', body: 'Open Diagnostics from the DashLink home screen and tap Connect adapter. No account, nothing to sign up for.' },
      ] }),
      plansTable({ strip: true, eyebrow: 'Plans', title: 'Read your codes <span class="grad-text">for free.</span>', sub: 'Fault codes and the main gauges stay free. Pro adds live data, clearing codes and the engine clusters. Try all of it free during your trial.', hl: ['diagnostics', 'diagnostics-pro'] }),
      faq({ items: [
        ['What do I need to use DashLink Diagnostics?', 'An ELM327 OBD-II adapter (Bluetooth, Bluetooth LE or Wi-Fi) plugged into your car&rsquo;s diagnostic port, and DashLink on your head unit. For a Bluetooth adapter, pair it once in the head unit&rsquo;s Bluetooth settings (the PIN is usually 1234 or 0000).'],
        ['Is it free?', `Reading stored fault codes, the check-engine light and the main gauges is free. Live data, pending and permanent codes, freeze frame, clearing codes, the boost, intake, air-fuel and oil gauges and the engine clusters are in <a href="../plans/#pro">Pro</a>. Try everything free during your trial.`],
        ['Can I clear the check-engine light?', 'With Pro, yes. DashLink only clears codes with the engine off and warns you first: clearing also resets the car&rsquo;s readiness monitors, so an emissions test straight afterwards may fail. If the fault is still there, the light comes back.'],
        ['Does my car report every reading?', 'Cars report different sets of sensors. A reading your car doesn&rsquo;t report shows a dash, never a made-up zero.'],
        ['Does it replace a mechanic?', 'No. A fault code tells you where to look and how urgent it is, so you can decide what to do and talk to your garage knowing what&rsquo;s wrong.'],
        ['Can I leave the adapter plugged in?', 'Many people do. Some adapters draw a little power with the car off, so unplug it if the car will be parked for a long time.'],
      ] }),
      ctaFinal({ title: 'Your car has been talking. <span class="grad-text">Now you can listen.</span>', sub: 'Read your fault codes free. Try live data and the engine clusters free now.' }),
    ].join('');
  },
};
export default page;
