import { head, media, icon, racingLockup, button, showcase, feature, phoneTabs, pitWall, upgrade, connectDemo, hero, pillarCards, plansTable, proBadge, driveBadge, TRY_FREE } from '../components.mjs';
import { ANALYSIS_TOUR, SENSORS, PIT_WALL } from '../racing.mjs';

const S = SENSORS('');

// The home page: a "Try DashLink free" hero, pillar cards with their plan badges, the Android
// Auto showcase and the upgrade pitch, the DashLink Racing band with its debrief, the pit wall
// and phone sensors, DashLink Wireless, the three ways to connect, and the plans table.
// Each pillar page carries its own story.
const page = {
  key: 'home',
  slug: '',
  pillar: 'home',
  title: 'DashLink — add Android Auto to the head unit already in your car',
  description: 'No Android Auto on your Android head unit? DashLink adds it, plus a full car dashboard and motorsport timing. No new stereo, no new hardware, no account.',
  hero: {
    eyebrow: 'For the Android head unit already in your car',
    title: 'Add Android Auto to your head unit. <span class="grad-text">Try DashLink free.</span>',
    sub: 'DashLink brings Android Auto to head units that don&rsquo;t have it, plus a full car dashboard and motorsport timing. Every feature is unlocked during your trial, and afterwards DashLink stays free.',
    note: 'Android 6.0+ head units &middot; No account &middot; No new hardware',
    media: { frame: 'cascade', screens: [
      { img: 'v8/mode-race.webp', tag: 'Racing &middot; Pro', alt: 'DashLink Racing: a live delta to your best lap' },
      { img: 'v5/dock-cockpit.webp', tag: 'Dashboard &middot; Free', alt: 'Dock mode: the Cockpit layout with the Corsa dial' },
      { img: 'aa_home.webp', tag: 'Android Auto &middot; Drive', alt: 'Android Auto with a map and music on an aftermarket head unit' },
    ] },
  },
  body() {
    return [
      hero(this.hero),
      pillarCards({ id: 'explore', eyebrow: 'What&rsquo;s inside', title: 'One app. <span class="grad-text">Four upgrades for your car.</span>', sub: 'Try all of them free. Features with a Drive or Pro badge stay with those plans after the trial; the rest stay free.', items: [
        { href: 'android-auto/', tier: 'drive', title: 'Android Auto', body: 'Maps, music and calls on the screen you already have. USB, wireless or no phone at all.', media: { img: 'aa_home.webp', w: 2400, h: 1080, alt: 'Android Auto on a head unit' } },
        { href: 'dashboard/', tier: 'free', title: 'Dashboard', body: 'Dock mode turns the screen into a car dashboard: speed, time, music, trip and apps.', media: { img: 'v5/dock-cockpit.webp', w: 2000, h: 1250, alt: 'Dock mode, Cockpit layout' } },
        { href: 'trips-fuel-maintenance/', tier: 'free', title: 'Trips &amp; fuel', body: 'A trip computer, fuel and cost estimates, and service reminders before they&rsquo;re overdue.', media: { img: 'v2/fuel-costs.webp', w: 2000, h: 1250, alt: 'Fuel and costs on the head unit' } },
        { href: 'racing/', tier: 'pro', title: 'DashLink Racing', body: 'Lap timing, rally pace notes and performance tests. The performance tests are free.', media: { img: 'v8/mode-race.webp', w: 2000, h: 1250, alt: 'DashLink Racing in Race mode' } },
      ] }),
      showcase({ eyebrow: 'Android Auto for your head unit ' + driveBadge(), scenes: [
        { img: 'aa_home.webp', alt: 'Android Auto with a map and music side by side on an aftermarket head unit', title: 'No Android Auto? <span class="grad-text">Add it.</span>', sub: 'DashLink brings Android Auto to Android head units that don&rsquo;t have it built in. It&rsquo;s an app, not a new stereo.' },
        { img: 'navigation_light.webp', alt: 'Turn-by-turn navigation in Android Auto', title: 'Maps on the big screen.', sub: 'Full-screen navigation with clear, timely guidance, on the screen already in your dash.' },
        { video: 'aa-spotify.mp4', poster: 'aa_navigation_and_music.webp', alt: 'Music playing beside navigation in Android Auto', title: 'Your music, playing.', sub: 'Big controls you can hit without looking down.' },
        { img: 'dial_pad_light.webp', alt: 'A hands-free call with the map still in view', title: 'Calls, hands-free.', sub: 'Dial, answer and talk while navigation stays beside you. No new head unit needed.' },
      ] }),
      upgrade({ id: 'upgrade', eyebrow: 'The cheaper upgrade', title: 'Don&rsquo;t replace your head unit. <span class="grad-text">Upgrade it.</span>',
        sub: 'Many Android head units run apps but don&rsquo;t come with Android Auto. DashLink adds it to the screen you already have.',
        replace: { tag: 'Replace it', title: 'A new head unit', items: ['A new stereo with Android Auto built in', 'Fitting, wiring and often a new dash kit', 'Your current screen ends up in a drawer', 'You pay up front, before you know it suits you'] },
        add: { tag: 'Upgrade it', title: 'DashLink', items: ['An app on the head unit you already have', 'Installs in minutes. No tools, no wiring, no dongle', 'USB, wireless, or no phone at all', 'Try it free first. No account'] },
        cta: { play: 'headunit', label: 'Try DashLink free' }, cta2: { href: 'android-auto/', label: 'How it works', ghost: true },
        note: 'For Android head units on Android 6.0 or newer, even 1&ndash;2 GB ones. Not made or endorsed by Google.' }),
      // DashLink Racing: its own brand inside the site
      `<section class="band-racing t-racing" id="racing">
        <div class="br-stripes" aria-hidden="true"></div>
        <div class="wrap br-in">
          <div class="br-copy">
            ${racingLockup('lg reveal')}
            <h2 class="display reveal d1">Lap timing, rally stages and performance tests.</h2>
            <p class="lead reveal d2">On the screen already in your car. Live delta, ghost car, pace notes, 0&ndash;100 and a road dyno. Built for closed courses.</p>
            <div class="hero-cta reveal d3">${button({ href: 'racing/', label: 'Explore DashLink Racing' }, { name: 'home_racing' })}</div>
            <p class="page-tier reveal d3">${proBadge()}<span>Part of Pro. Try it free; the performance tests stay free.</span></p>
            <div class="br-subs reveal d3"><a href="racing/track-day/">Track day</a><a href="racing/rally/">Rally</a><a href="racing/performance/">Performance</a></div>
          </div>
          <div class="br-media reveal-scale d1">${media({ frame: 'exploded', img: 'v8/mode-race.webp', w: 2000, h: 1250, alt: 'DashLink Racing in Race mode: a huge live delta to your best lap, the next pace notes and your best time', lifts: [
              { img: 'v13/race-note.webp', x: 1.8, y: 10.7, w: 42, label: 'Next pace note, 160 m out' },
              { img: 'v13/race-delta.webp', x: 15, y: 44.8, w: 69, label: 'Live gap to your best lap' },
              { img: 'v13/race-best.webp', x: 82.5, y: 89.9, w: 15, label: 'Your best', below: true, cls: 'cap-r' },
              { img: 'v8/ghost-straight.webp', x: 79, y: 2, w: 28, label: 'Ghost car: your best lap', cls: 'xl-ghost' },
            ] })}</div>
        </div>
      </section>`,
      `<section class="block t-racing" id="debrief"><div class="wrap">
        ${head({ eyebrow: 'DashLink Racing &middot; Debrief ' + proBadge(), title: 'Where the time goes, <span class="grad-text">in plain words.</span>', sub: 'After the session, DashLink shows which corners cost you and what each is worth a lap. Every lap, sector, speed trace and g-force, on your phone.', center: true })}
        <div class="home-tour">${phoneTabs({ ...ANALYSIS_TOUR, side: true })}</div>
        <div class="hero-cta center" style="margin-top:30px">${button({ href: 'racing/track-day/#analysis', label: 'See the session analysis', ghost: true }, { name: 'home_analysis' })}</div>
      </div></section>`,
      pitWall({ ...PIT_WALL({ href: 'wireless-app/#browser', label: 'See Browser view' }), id: 'pit-wall', cls: 't-racing', eyebrow: 'Then, on the big screen' }),
      feature({ id: 'phone-sensors', cls: 't-racing home-sensors', flip: true, pro: true, isNew: true, kicker: 'Phone sensors', title: S.title, body: S.lead,
        bullets: ['Up to <b>25 readings a second</b> instead of about one', '<b>Real g-forces</b>, measured by the phone', 'Carries on with the car&rsquo;s GPS if the phone drops out'],
        media: { frame: 'sensorDemo', compact: true, ...S.demo }, cta: { href: 'racing/track-day/#phone-sensors', label: 'How phone sensors work' } }),
      feature({ id: 'wireless', kicker: 'DashLink Wireless &middot; free phone app', title: 'Your car, <span class="grad-text">in your pocket.</span>',
        body: 'The free companion app helps your phone start wireless Android Auto, carries your Racing sessions home over a direct, offline link, and turns a laptop into the pit wall.',
        bullets: ['Sessions, laps and pace notes. <b>No cloud, no account</b>', 'Export <b>GPX or CSV</b>', '<b>Browser view</b>: debrief on a laptop or tablet'],
        media: { frame: 'phones', phones: [
          { img: 'v10/ps-start.webp', alt: 'DashLink Wireless: your Racing library, Browser view and Use as sensor' },
          { img: 'v10/wl-home.webp', alt: 'DashLink Wireless home: receive sessions from the car and send routes to it' },
        ] }, cta: { href: 'wireless-app/', label: 'Explore DashLink Wireless' } }),
      connectDemo({ id: 'connect', eyebrow: 'How your phone connects', title: 'Three ways to get <span class="grad-text">Android Auto on screen.</span>',
        sub: 'Cable, wireless, or no phone at all. Try it below: pick a mode on the DashLink home screen and tap Start.',
        img: 'v2/home.webp', alt: 'The DashLink home screen on a head unit: connection modes, a Start button, this drive and your apps',
        modes: [
          { key: 'usb', icon: 'usb', name: 'USB', status: 'Ready for USB', title: 'USB Android Auto', text: 'Plug your phone in with a cable. DashLink switches it into Android Auto mode and connects.', start: 'Start USB',
            card: { title: 'Plug in a cable', need: 'A USB cable. Head unit with USB host', text: 'The most stable link on any unit, and your phone charges while you drive.' } },
          { key: 'wireless', on: true, icon: 'wifi', name: 'Wireless', status: 'Ready for Wireless', title: 'Wireless Android Auto', text: 'Pair your phone over Bluetooth once &mdash; after that, Android Auto connects over Wi-Fi by itself.', start: 'Start wireless',
            card: { title: 'Phone stays in your pocket', need: 'Head unit with Wi-Fi and Bluetooth', text: 'Pair once over Bluetooth. After that it connects over Wi-Fi by itself. No dongle to buy.' } },
          { key: 'self', icon: 'start', name: 'Self Mode', status: 'Ready for Self Mode', title: 'Self Mode', text: 'Android Auto installed on this head unit? Run it right here, with no phone at all.', start: 'Start Self Mode',
            card: { title: 'No phone at all', need: 'Android Auto installed on the head unit', text: 'Runs Android Auto from the head unit itself. Nothing to plug in or pair.' } },
        ],
        spots: [
          { x: 53.6, y: 3.6, label: 'Buy Drive or Pro, or restore a plan' }, { x: 79.6, y: 3.6, label: 'Dock mode: a full-screen dashboard' },
          { x: 64.5, y: 19.6, label: 'Speed and heading from GPS' }, { x: 95.5, y: 41.5, label: 'This trip: distance, time, average' }, { x: 91, y: 52, label: 'Your next service, counted down' }, { x: 85, y: 67, label: 'Pin your favourite apps' },
        ],
        aa: { img: 'aa_home.webp' },
        after: `<div class="hero-cta center" style="margin-top:34px">${button(TRY_FREE, { name: 'home_connect' })}${button({ href: 'android-auto/', label: 'More about Android Auto', ghost: true }, { name: 'home_aa' })}</div>` }),
      plansTable({ id: 'plans', sub: 'Every feature is yours to try. When the trial ends, DashLink stays free, and Drive or Pro unlock more.' }),
    ].join('');
  },
};
export default page;
