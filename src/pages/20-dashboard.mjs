import { hero, anchorBar, feature, cards, faq, ctaFinal, explorer, dials, tripCards, corsa, speedWarning, plansTable, freeBadge, proBadge } from '../components.mjs';

const page = {
  key: 'dashboard',
  slug: 'dashboard',
  pillar: 'dashboard',
  title: 'Dock mode — a full car dashboard for your head unit | DashLink',
  description: 'A full-screen car dashboard for your Android head unit: 7 layouts, 6 custom speedometers, speed warning, Bluetooth music, pinned apps and automatic night mode.',
  hero: {
    layout: 'center',
    eyebrow: 'Dock mode',
    title: 'Your car&rsquo;s dashboard, <span class="grad-text">redrawn.</span>',
    sub: 'When Android Auto isn&rsquo;t running, Dock mode turns the screen into a full car dashboard: speed, time, music, trip and apps, laid out for a glance.',
    primary: { play: 'headunit' },
    tier: `${freeBadge()}${proBadge()}`,
    media: { img: 'v4/dock-cockpit.webp', w: 2000, h: 1250, alt: 'The Cockpit layout: a red Corsa dial between speed and car panels' },
    variants: {
      speedometer: { match: ['speedo', 'gauge', 'dial', 'corsa'], eyebrow: 'Custom speedometers', title: 'Six speedometers. <span class="grad-text">Pick yours.</span>', sub: 'Digital, Corsa, Chrono, Sport, Hyper and Minimal, with five dial faces and a red zone from your own speed warning.', media: { img: 'v4/dock-style-speedos.webp', w: 2000, h: 1250, alt: 'Choosing a speedometer: Corsa selected, with Digital, Chrono and Sport' } },
      layouts: { match: ['layout', 'dock'], eyebrow: '7 layouts', title: 'Seven layouts. <span class="grad-text">Live previews.</span>', sub: 'Classic, Cockpit, Cluster, Twin dials, Focus, Journey and Night. See each one live before you pick.', media: { img: 'v4/dock-style-layouts.webp', w: 2000, h: 1250, alt: 'The Dock style picker with live layout previews' } },
      night: { match: ['night', 'oled', 'dark'], eyebrow: 'Automatic night mode', title: 'Dims itself <span class="grad-text">at sunset.</span>', sub: 'Night mode follows sunset and sunrise, offline. Or go pure black on OLED screens.' },
    },
  },
  body() {
    return [
      hero(this.hero),
      anchorBar([['layouts', 'Layouts'], ['corsa', 'Corsa'], ['speedometers', 'Speedometers'], ['engine', 'Engine clusters'], ['dock-style', 'Live preview'], ['speed-warning', 'Speed warning'], ['trip', 'Trip &amp; fuel'], ['dock', 'Dock'], ['music', 'Music'], ['apps', 'Apps'], ['night', 'Night'], ['screensaver', 'Screensaver'], ['dock-keys', 'Wheel keys'], ['large-controls', 'Large controls']]),
      explorer({ id: 'layouts', eyebrow: '7 layouts', title: 'One screen. Seven ways to drive.', sub: 'Pick the layout that suits the drive. Tap one to see it.', more: 'Every layout is free; the Corsa, Sport and Hyper dials need Pro after the trial.', items: [
        { key: 'cockpit', name: 'Cockpit', desc: 'The Corsa dial between two screens: speed, max and average on one side, your car, heading and range on the other.', img: 'v5/dock-cockpit.webp', alt: 'Cockpit layout with a yellow Corsa dial', spots: [
          { x: 15, y: 48, label: 'Speed, max and average' }, { x: 24.4, y: 25, label: 'Your speed warning' }, { x: 50, y: 49, label: 'Corsa dial, yellow face' }, { x: 79, y: 46, label: 'Your car and heading' }, { x: 82.5, y: 68, label: 'Range estimate' }, { x: 50, y: 92, label: 'Pinned apps' } ] },
        { key: 'classic', name: 'Classic', desc: 'A big dial beside the time, the date, your range and this trip.', img: 'v5/dock-classic.webp', alt: 'Classic layout with the Sport dial', spots: [
          { x: 22.5, y: 52, label: 'Sport dial with a live arc' }, { x: 39, y: 11, label: 'Heading' }, { x: 71.8, y: 31, label: 'Time, date and sunrise' }, { x: 70, y: 46, label: 'Range estimate' }, { x: 71.5, y: 79, label: 'This trip' } ] },
        { key: 'cluster', name: 'Cluster', desc: 'One centre dial with trip stats, fuel and heading around it, like an instrument cluster.', img: 'v5/dock-cluster.webp', alt: 'Cluster layout with the Hyper dial', spots: [
          { x: 17, y: 47, label: 'This trip: distance, time, average, top speed' }, { x: 50, y: 48, label: 'Hyper dial with odometer' }, { x: 76, y: 52, label: 'Fuel estimate' }, { x: 89.5, y: 52, label: 'Heading' }, { x: 11.5, y: 81, label: 'Odometer' } ] },
        { key: 'twin', name: 'Twin dials', desc: 'Speedometer and compass either side of the clock and range.', img: 'v5/dock-twin-dials.webp', alt: 'Twin dials layout: Corsa and compass', spots: [
          { x: 17.8, y: 48, label: 'Corsa speedometer' }, { x: 50, y: 16, label: 'Your speed warning' }, { x: 50, y: 40, label: 'Time, date and sunrise' }, { x: 82, y: 48, label: 'Compass dial' }, { x: 50, y: 79, label: 'This trip' } ] },
        { key: 'focus', name: 'Focus', desc: 'Just the speed, big and calm.', img: 'v4/dock-focus.webp', alt: 'Focus layout', spots: [
          { x: 50, y: 48, label: 'Just your speed' }, { x: 8, y: 50, label: 'Your speed warning' }, { x: 92.5, y: 48, label: 'Heading' }, { x: 50, y: 15, label: 'Time and range' } ] },
        { key: 'journey', name: 'Journey', desc: 'For long drives: estimated range, trip cost, distance and average.', img: 'v4/dock-journey.webp', alt: 'Journey layout', spots: [
          { x: 22.7, y: 63, label: 'Your car, in its paint' }, { x: 71.5, y: 50, label: 'Range estimate' }, { x: 58, y: 66, label: 'Estimated trip cost' }, { x: 84.5, y: 66, label: 'Distance' } ] },
        { key: 'night', name: 'Night', desc: 'Black and dim, in a warm red: no glare on dark roads. Just speed, your warning and the time.', img: 'v14/dock-night.webp', alt: 'Night layout: 61 km/h in dim red on black, with a 50 speed warning and the time', spots: [
          { x: 49.5, y: 57.6, label: 'Your speed, dim and warm' }, { x: 9, y: 56.4, label: 'Your speed warning' }, { x: 49.5, y: 20.4, label: 'The time' } ] },
      ] }),
      corsa({ id: 'corsa', eyebrow: 'The Corsa dial ' + proBadge(), title: 'Finished like a fine watch.', sub: 'A sunray face, a railway chapter ring and a lit window, in five faces. Hover to look closer, or step through the details.', faces: [
        { key: 'red', name: 'Red', swatch: '#c8102e', img: 'v5/corsa-red.webp' },
        { key: 'yellow', name: 'Yellow', swatch: '#f2b705', img: 'v5/corsa-yellow.webp' },
        { key: 'white', name: 'White', swatch: '#ecebe6', img: 'v5/corsa-white.webp' },
        { key: 'black', name: 'Black', swatch: '#1b1c20', img: 'v5/corsa-black.webp' },
        { key: 'accent', name: 'Accent', swatch: '#a87373', img: 'v5/corsa-accent.webp' },
      ], details: [
        { x: 62, y: 36, title: 'Sunray face', text: 'Fine radial brushing that catches the light, in your choice of five faces.' },
        { x: 37, y: 32, title: 'Railway chapter ring', text: 'An engraved inner track, set inside the figures like a watch&rsquo;s minute ring.' },
        { x: 50, y: 24, title: 'Figures &times;10', text: 'Wide sport numerals, read in tens: 14 means 140 km/h.' },
        { x: 54.5, y: 54.5, title: 'Needle and domed hub', text: 'A slim two-tone needle on a polished, domed centre cap.' },
        { x: 76, y: 62, title: 'Lit window', text: 'Your exact speed in a chamfered window, lit like an aperture.' },
        { x: 92, y: 38, title: 'Red zone', text: 'The red arc starts at your own speed warning, not a fixed number.' },
        { x: 7, y: 64, title: 'Steel bezel', text: 'A brushed metal bezel with a polished edge, catching the cabin light.' },
      ] }),
      dials({ id: 'speedometers', plain: true, eyebrow: 'Five more dials', title: 'Or pick another mood.', sub: 'Digital, Chrono and Minimal are free. Sport, Hyper and Corsa come with Pro, and you can try them all free. Every dial&rsquo;s red zone starts at your speed warning.', items: [
        { name: 'Digital', free: true, desc: 'Big numerals over your car on the road.', img: 'v4/speedo-digital.webp', alt: 'The Digital speedometer' },
        { name: 'Chrono', free: true, desc: 'A chronograph dial with a speed window.', img: 'v5/speedo-chrono.webp', alt: 'The Chrono speedometer' },
        { name: 'Minimal', free: true, desc: 'A thin arc and one big number.', img: 'v4/speedo-minimal.webp', alt: 'The Minimal speedometer' },
        { name: 'Sport', pro: true, desc: 'A live arc with the speed big in the middle.', img: 'v5/speedo-sport.webp', alt: 'The Sport speedometer' },
        { name: 'Hyper', pro: true, desc: 'Italic figures, a sweeping inner arc and the odometer.', img: 'v5/speedo-hyper.webp', alt: 'The Hyper speedometer' },
      ] }),
      feature({ id: 'engine', pro: true, isNew: true, kicker: 'Engine clusters', title: 'Plug in an adapter. <span class="grad-text">Get a real cluster.</span>',
        body: 'Add a small OBD-II adapter and Dock mode reads your engine: a tachometer, coolant, oil, boost, battery and fault codes, in five clusters styled after real sports cars. Grand Tourer, Flat-Six, V12, Toro and Trio.',
        media: { img: 'v14/eng-gt.webp', w: 1552, h: 668, alt: 'The Grand Tourer engine cluster: tachometer, speedometer and a centre display with fault codes, coolant, fuel, oil and boost' },
        cta: { href: 'diagnostics/#clusters', label: 'See all five clusters' } }),
      feature({ id: 'dock-style', flip: true, kicker: 'Live preview', title: 'Try it before you pick it.', body: 'Dock style shows each layout and speedometer live, with your real speed and trip, before you choose. Then pick a dial face: Accent, Red, Yellow, White or Black.', media: { img: 'v4/dock-style-layouts.webp', w: 2000, h: 1250, alt: 'The Dock style screen with live layout previews' } }),
      speedWarning({ id: 'speed-warning', eyebrow: 'Safety', title: 'A warning at the speed you choose.', sub: 'Set the speed you don&rsquo;t want to go over. DashLink keeps an eye on it so you can keep yours on the road.', start: 50, presets: [30, 40, 50, 60, 80, 100, 120, 140],
        shot: { img: 'v5/dock-overspeed.webp', alt: 'Over the warning speed: the panel turns red with a +34 km/h badge' },
        sheet: { img: 'v5/speed-warning-settings.webp', alt: 'Speed warning settings: warning speed, presets and warning chime' },
        points: [
          ['shield', 'A red badge when you go over', 'The dial panel turns red and shows how far over you are. It&rsquo;s also shown on top of Android Auto.'],
          ['bell', 'A gentle chime', 'A short double beep, at most every 30 seconds, so it reminds without nagging.'],
          ['gauge', 'Your speed, your rules', 'Pick a preset from 30 to 140 km/h or fine-tune with + and &minus;. Every dial&rsquo;s red zone starts there.'],
        ],
        note: 'DashLink warns at the speed you set. It doesn&rsquo;t read road signs, so always follow the posted limit.' }),
      tripCards({ id: 'trip', eyebrow: 'Trip, fuel &amp; car care', title: 'Every number that matters, <span class="grad-text">at a glance.</span>',
        sub: 'Range, fuel left, what this trip cost and when the next service is due. Right on the dashboard, worked out from the distance you drive.',
        groups: [
          { cls: 'tc-a', cards: [
            { img: 'v12/fuel-left.webp', w: 830, h: 574, alt: 'Fuel estimate: about 20 litres left, 240 km range, with an I filled up button', label: 'Fuel left, estimated', z: 50 },
            { img: 'v12/care-next.webp', w: 738, h: 212, alt: 'Next up: oil change in 4,912 km, by April 15, 2027', label: 'Next service, counted down', z: 85 } ] },
          { cls: 'tc-b', cards: [
            { img: 'v12/trip-range.webp', w: 1046, h: 162, alt: 'Fuel gauge with about 83 km of range', label: 'Range', z: 80 },
            { img: 'v12/trip-cost.webp', w: 512, h: 140, alt: 'Trip cost: about $1.17', label: 'This trip, and what it cost', z: 70, cls: 'half' },
            { img: 'v12/trip-distance.webp', w: 514, h: 140, alt: 'Distance: 5.8 km', z: 30, cls: 'half' },
            { img: 'v12/trip-time.webp', w: 512, h: 138, alt: 'Driving time: 6 minutes', z: 30, cls: 'half' },
            { img: 'v12/trip-average.webp', w: 514, h: 138, alt: 'Average: 58 km/h', z: 45, cls: 'half' } ] },
          { cls: 'tc-c', cards: [
            { img: 'v12/care-odometer.webp', w: 738, h: 488, alt: 'Odometer: 227,506 km', label: 'Odometer', z: 40 },
            { img: 'v12/care-reminders.webp', w: 1108, h: 452, alt: 'Reminders: oil change and tyre rotation, both on track', label: 'Reminders by km or months', z: 75 } ] },
        ],
        note: 'Fuel, range and cost are estimates from the distance you drive and the consumption you set. DashLink doesn&rsquo;t read your car&rsquo;s fuel sensor.',
        cta: { href: 'trips-fuel-maintenance/', label: 'Trips, fuel &amp; car care' } }),
      cards({ cols: 4, eyebrow: 'Made for the cabin', title: 'The small things that make it yours.', items: [
        { id: 'dock', icon: 'gauge', title: 'Dock mode', body: 'A full-screen dashboard whenever Android Auto isn&rsquo;t running: speed, time, music, trip and apps, laid out for a glance.' },
        { id: 'heading', icon: 'pin', title: 'Heading &amp; compass', body: 'Your direction and bearing on every layout, from the head unit&rsquo;s GPS.' },
        { id: 'music', icon: 'music', title: 'Bluetooth music', body: 'Title, artist, play, pause and skip from your phone over Bluetooth. Depends on your head unit&rsquo;s Bluetooth system.' },
        { id: 'apps', icon: 'grid', title: 'Pinned apps', body: 'Your favourite head-unit apps one tap away. DashLink isn&rsquo;t a launcher and doesn&rsquo;t replace your home screen.' },
        { id: 'night', icon: 'moon', title: 'Automatic night mode', body: 'Follows sunset and sunrise, even offline. Plus a pure-black option for OLED screens.' },
        { id: 'screensaver', icon: 'screen', title: 'Screensaver', body: 'Turns an idle screen into the dashboard. Never while Android Auto is running.' },
        { id: 'dock-keys', icon: 'wheel', pro: true, title: 'Steering-wheel keys', body: 'Control the dashboard from your steering-wheel buttons.' },
        { id: 'large-controls', icon: 'bolt', title: 'Large controls', body: 'Bigger targets, easy to reach while parked.' },
      ] }),
      plansTable({ strip: true, eyebrow: 'Plans', title: 'Your dashboard <span class="grad-text">stays free.</span>', sub: 'Dock mode, trips, fuel and music are free for good. Pro adds the premium dials and themes.', hl: ['dashboard', 'dials', 'music', 'premium-dials', 'themes'] }),
      faq({ items: [
        ['Is Dock mode free?', 'Yes. Dock mode, the layouts and the Digital, Chrono and Minimal speedometers stay free after the trial. The Corsa, Sport and Hyper dials, theme presets and accent colours are in Pro.'],
        ['Does Dock mode replace my home screen?', 'No. DashLink is not a launcher. Dock mode is a screen inside DashLink, and your home screen stays as it is.'],
        ['Why don&rsquo;t I see song titles?', 'Music info comes from your phone over Bluetooth, through the head unit&rsquo;s own Bluetooth system. Some units don&rsquo;t pass it on.'],
        ['Can I choose the colours?', 'Yes. Pick one of five <a href="#corsa">dial faces</a> and show your car in its own paint. Accent colours and theme presets (all but Signature) come with <a href="../plans/#pro">Pro</a>; try them free during the trial.'],
        ['Does night mode need internet?', 'No. Sunset and sunrise are worked out on the unit.'],
      ] }),
      ctaFinal({ title: 'Make the screen <span class="grad-text">yours.</span>', sub: 'Dock mode is free. Try every dial and theme free now.', primary: { play: 'headunit' } }),
    ].join('');
  },
};
export default page;
