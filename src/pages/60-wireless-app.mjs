import { hero, anchorBar, feature, cards, faq, ctaFinal, bigScreen, newBadge, sensorStory, steps, driveBadge, proBadge } from '../components.mjs';
import { SENSORS, PIT_WALL_PHOTO } from '../racing.mjs';

const page = {
  key: 'wireless-app',
  slug: 'wireless-app',
  pillar: 'wireless-app',
  playApp: 'wireless',
  navCta: { play: 'wireless', label: 'Get the app' },
  bar: { title: 'DashLink Wireless', sub: 'Free companion app for your phone', cta: { play: 'wireless', label: 'Get it' } },
  title: 'DashLink Wireless — the free companion app for your phone',
  description: 'DashLink Wireless helps start wireless Android Auto, takes your Racing sessions to your phone over an encrypted offline link, exports GPX and CSV, and can time you with your phone’s sensors.',
  hero: {
    eyebrow: 'DashLink Wireless &middot; free phone app',
    title: 'Your car, <span class="grad-text">in your pocket.</span>',
    sub: 'The free companion app. It helps your phone start wireless Android Auto, carries your Racing sessions home, and can time you with your phone&rsquo;s sensors.',
    primary: { play: 'wireless', label: 'Get DashLink Wireless' },
    note: 'Free &middot; Android 7.0+ phones',
    media: { frame: 'phone', img: 'v10/wl-home.webp', alt: 'DashLink Wireless home: receive sessions from the car, send routes to the car, and your Racing library' },
    variants: {
      wireless: { match: ['connect', 'android-auto'], eyebrow: 'Wireless Android Auto', title: 'Wireless, <span class="grad-text">started for you.</span>', sub: 'DashLink Wireless helps your phone start wireless Android Auto with your head unit.' },
      sensors: { match: ['sensor', 'phonesensor', '25hz', 'gforce'], eyebrow: 'Phone sensors', title: 'Your phone, <span class="grad-text">as a timing sensor.</span>', sub: 'Its GPS and motion sensors time you up to 25 times a second, with measured g-forces.', media: { frame: 'phone', img: 'v10/ps-live.webp', alt: 'DashLink Wireless using the phone as a timing sensor at 25 Hz', lifts: [{ img: 'v10/ps-rate.webp', x: 60, y: 70, w: 50, label: 'Up to 25 a second', right: true }] } },
      browser: { match: ['browser', 'debrief', 'pitwall', 'laptop', 'bigscreen'], eyebrow: 'Browser view', title: 'Your laptop becomes <span class="grad-text">the pit wall.</span>', sub: 'Open every session on a laptop or tablet: big charts, every lap, every corner. Made for debriefs with your coach and crew.', media: { img: 'v6/web-overview.webp', w: 1600, h: 1123, alt: 'Session overview in a web browser', frame: 'browser' } },
      library: { match: ['library', 'export', 'gpx', 'sessions'], eyebrow: 'Racing library', title: 'Every session, <span class="grad-text">on your phone.</span>', sub: 'Analysis, personal-best timelines per track and 0&ndash;100 history. Export GPX or CSV.' },
    },
  },
  body() {
    return [
      hero(this.hero),
      anchorBar([['start-wireless', 'Start wireless'], ['send-to-phone', 'Send to phone'], ['library', 'Library'], ['export', 'Export'], ['send-to-car', 'Send to car'], ['browser', 'Big-screen debrief'], ['phone-sensors', 'Phone sensors'], ['plans', 'Buy a plan'], ['qr', 'Install by QR']]),
      feature({ id: 'start-wireless', kicker: 'Wireless Android Auto', title: 'Helps your phone go wireless.', body: 'DashLink Wireless helps your phone start a wireless Android Auto connection with your head unit running DashLink.', media: { img: 'aa_home_maps.webp', w: 2400, h: 1080, alt: 'Wireless Android Auto on the head unit' } }),
      feature({ id: 'send-to-phone', flip: true, kicker: 'Send to phone', title: 'Direct. Encrypted. Offline.', body: 'Sessions, laps, tracks and pace notes go from the head unit to your phone over a direct, encrypted link. No internet, no cloud. Confirm a 4-character code once.', media: { mock: 'pair' } }),
      feature({ id: 'library', isNew: true, kicker: 'Racing library', title: 'Your progress, over time.', body: 'Every session with the car&rsquo;s analysis, personal-best timelines per track, 0&ndash;100 history and your tracks.', note: 'Track and rally sessions need Pro on the head unit.', media: { frame: 'phones', phones: [
        { img: 'v10/wl-map.webp', alt: 'A session map in DashLink Wireless, every corner numbered, with lap 2 highlighted' },
        { img: 'v10/wl-overview.webp', alt: 'Session overview in DashLink Wireless: best lap, theoretical best, consistency, top speed, g-forces and best sectors', lifts: [{ img: 'v10/wl-time.webp', x: -30, y: 62, w: 110, label: 'Where the time goes', below: true }] },
      ] } }),
      bigScreen({ id: 'browser', url: '192.168.0.109:8765', eyebrow: 'Browser view ' + newBadge(), title: 'Your laptop becomes <span class="grad-text">the pit wall.</span>',
        sub: 'Turn on Browser view in DashLink Wireless and open your sessions on any laptop or tablet: big charts, every lap, every corner. Made for debriefs with your coach and crew. Track and rally sessions need Pro on the head unit.',
        tabs: [
          { key: 'overview', name: 'Overview', q: 'Best lap, theoretical best, consistency and where the time is.', img: 'v6/web-overview.webp', alt: 'Session overview: best lap, theoretical best, consistency, peaks and where the time is' },
          { key: 'map', name: 'Map', q: 'Your line, coloured by speed, every corner numbered.', img: 'v6/web-map.webp', alt: 'Track map coloured by speed with numbered corners' },
          { key: 'laps', name: 'Laps', q: 'Every lap and sector, best in green, slowest in red.', img: 'v6/web-laps.webp', alt: 'Lap table with sector times coloured from best to slowest' },
          { key: 'corners', name: 'Corners', q: 'Best against typical through every corner, and the loss.', img: 'v6/web-corners.webp', alt: 'Corner table: best, typical and time lost per corner' },
          { key: 'speed', name: 'Speed', q: 'Two laps&rsquo; speed traces, and the time between them.', img: 'v6/web-speed.webp', alt: 'Speed along the lap for two laps, and the time delta' },
          { key: 'grip', name: 'Grip', q: 'Braking, cornering and acceleration on one g-g plot.', img: 'v6/web-grip.webp', alt: 'g-g diagram with peak braking, lateral and acceleration' },
        ],
        insights: { eyebrow: 'Every view answers a question', title: 'Stop guessing. Look at the lap.', items: [
          { size: 'tall', q: 'Where am I losing time?', a: 'DashLink ranks the corners that cost you most, says why in plain words, and what each is worth per lap.', img: 'v6/crop-time.webp', alt: 'Where the time is: T1 worth about 1.36 s a lap, T15 and T5 next' },
          { size: 'wide', q: 'Which corner do we work on first?', a: 'Best against typical for every corner. The bar is what you lose there on an average lap.', img: 'v6/crop-corners.webp', alt: 'Corner table with time lost per corner' },
          { size: 'wide', q: 'Was the new line faster?', a: 'Pick two laps. The traces show who carries more speed where; the delta shows exactly where time comes and goes.', img: 'v6/crop-delta.webp', alt: 'Time delta between two laps along the lap distance' },
          { size: 'full', q: 'Are we getting more consistent?', a: 'Every lap and sector side by side, coloured from best to slowest. Click a row to see that lap on the map.', img: 'v6/crop-laps.webp', alt: 'Lap and sector times for three laps' },
          { size: 'm', q: 'Is the driver using all the grip?', a: 'Braking, cornering and acceleration on one plot. Estimated from GPS when phone sensors weren&rsquo;t used.', img: 'v6/crop-grip.webp', alt: 'g-g diagram of the session' },
          { size: 'm', q: 'Where exactly on the track?', a: 'The line coloured by speed, with every corner numbered. Pick a lap to highlight it.', img: 'v6/crop-map.webp', alt: 'Track map coloured by speed' },
        ] },
        connect: { eyebrow: 'Three taps to the big screen', title: 'No cloud. No account. No cable.', sub: 'Your phone serves the pages itself, over your Wi-Fi or its own hotspot.',
          card: { img: 'v6/wireless-browser-card.webp', alt: 'DashLink Wireless Browser view card: address, 6-character code, QR code and keep-screen-on switch' },
          steps: [
            { x: 89.4, y: 5.4, title: 'Turn on Browser view', text: 'In DashLink Wireless on your phone. A fresh code every time you switch it on.' },
            { x: 0.5, y: 17.8, title: 'Type the address on the computer', text: 'Same Wi-Fi, or your phone&rsquo;s hotspot. No internet needed.' },
            { x: 0.5, y: 30.5, title: 'Enter the 6-character code', text: 'The computer stays signed in until you turn Browser view off.' },
            { x: 20.4, y: 61.7, title: 'Or scan the QR code', text: 'The link carries an access key. Without it, the page is refused.' },
            { x: 91.6, y: 85.2, title: 'Keep the screen on', text: 'Stops Android pausing the app while the team is looking.' },
          ] },
        team: { eyebrow: 'Built for the pit wall', title: 'Better driver. Better car.', photo: PIT_WALL_PHOTO, items: [
          ['users', 'Debrief as a team', 'Driver, coach and crew look at the same charts on a laptop or a big screen, minutes after the session.'],
          ['flag', 'Coach with evidence', 'Point at the corner and the number, &ldquo;T1, worth about 1.4 s a lap&rdquo;, instead of guessing.'],
          ['wrench', 'Test setup changes', 'Change pressures or setup, run again, and compare the laps side by side.'],
          ['timer', 'Track progress', 'Personal bests per track over time, so you can see the work paying off.'],
          ['lock', 'Private by design', 'Served by your phone, only while the app runs. No account, no cloud. Other devices need the code.'],
          ['laptop', 'Nothing to install', 'Any modern browser on a laptop or tablet. Export GPX or CSV when you want to keep it.'],
        ] } }),
      sensorStory(SENSORS('', { href: 'racing/', label: 'About DashLink Racing' }, true)),
      steps({ id: 'plans', eyebrow: 'Plans for your head unit ' + driveBadge() + proBadge(), title: 'Buy Drive or Pro <span class="grad-text">from your phone.</span>', sub: 'The phone app is free. When you want to keep Android Auto or everything after the trial, pay for the head unit right here. It&rsquo;s switched on within 24 hours.', items: [
        { icon: 'qr', title: 'Scan the code in the car', body: 'Open <b>Go Premium</b> on the head unit and scan its QR code with DashLink Wireless.' },
        { icon: 'phone', title: 'Pick Drive or Pro and pay', body: 'Checkout runs in Google Play on your phone. Pay once. <a href="../plans/">Compare plans</a>.' },
        { icon: 'check', title: 'Tap Restore on the head unit', body: 'Once it&rsquo;s switched on, tap <b>Restore</b> on the head unit while it&rsquo;s connected to the internet.' },
      ] }),
      cards({ cols: 3, eyebrow: 'Also in the app', title: 'Small jobs, done properly.', items: [
        { id: 'export', icon: 'route', title: 'Export &amp; share', body: 'GPX (opens in map and lap-timing apps), CSV for spreadsheets, and DashLink&rsquo;s own data files. Track and rally sessions need Pro on the head unit.' },
        { id: 'send-to-car', icon: 'unit', title: 'Send tracks to the car', body: 'A GPX or KML file, or a saved track with its pace notes, from your phone to the head unit.' },
        { id: 'qr', icon: 'qr', title: 'Install from the car', body: 'Scan the QR code on your car&rsquo;s screen to open DashLink Wireless on Google Play.' },
      ] }),
      faq({ items: [
        ['Is DashLink Wireless free?', 'Yes, the phone app is free. Track and rally sessions and phone sensors need DashLink Pro on the head unit. You can buy Drive or Pro for the head unit from the app, and it&rsquo;s switched on within 24 hours.'],
        ['Do I need it for Android Auto?', 'Not for USB. For wireless, DashLink Wireless helps phones start the connection.'],
        ['Does it upload my data?', 'No. Transfers go directly between your head unit and your phone over an encrypted link, with no account and no cloud.'],
        ['Which phones?', 'Android phones on Android 7.0 or newer.'],
        ['Does Browser view need the internet?', 'No. Your phone serves the pages over your Wi-Fi, or its own hotspot. It only runs while DashLink Wireless is open, and other devices need the 6-character code or the link with its key.'],
      ] }),
      ctaFinal({ title: 'Free for your phone. <span class="grad-text">Better in your car.</span>', primary: { play: 'wireless', label: 'Get DashLink Wireless' } }),
    ].join('');
  },
};
export default page;
