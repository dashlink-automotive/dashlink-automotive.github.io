import { hero, anchorBar, feature, explorer, cards, faq, ctaFinal, safety, head, section, media, pitWall, plansTable, proBadge, freeBadge } from '../components.mjs';
import { F, FIND_TIME, RACING_FAQ, RACING_BAR, RACING_TRY, RACING_TIER, subnav, PIT_WALL } from '../racing.mjs';

const up = '../';
const f = F(up);

const page = {
  key: 'racing',
  slug: 'racing',
  pillar: 'racing',
  racing: true,
  bar: RACING_BAR,
  title: 'DashLink Racing — lap timing, rally stages and performance tests',
  description: 'Lap timing, rally stages and performance tests on the screen already in your car. Live delta, ghost car, pace notes, 0–100 and a road dyno. Closed courses only.',
  hero: {
    top: subnav('racing', up),
    eyebrow: 'Motorsport timing suite',
    title: 'Lap timing on the screen <span class="grad-text">already in your car.</span>',
    sub: 'Lap timing, rally stages and performance tests. Live delta, ghost car, pace notes, 0&ndash;100 and a road dyno. Built for closed courses.',
    primary: RACING_TRY,
    note: 'Inside DashLink &middot; No extra hardware &middot; Closed courses only',
    tier: RACING_TIER(proBadge()),
    media: { frame: 'cascade', screens: [
      { img: 'v7/perf-screen.webp', tag: 'Performance', alt: '0 to 100 km/h in 16.22 seconds, and a road dyno curve' },
      { img: 'v9/stage-drive.webp', tag: 'Rally', alt: 'Driving a rally stage with pace notes on the map' },
      { img: 'v8/mode-track.webp', tag: 'Track day', alt: 'Track mode: lap time, sectors, pace notes and a chase map', lifts: [
        { img: 'v13/track-ready.webp', x: 19.9, y: 24.6, w: 41.9, label: 'Stage recognised, pace notes ready' },
        { img: 'v13/track-sectors.webp', x: 3, y: 74.1, w: 44, label: 'Sector times, best in yellow', below: true },
        { img: 'v13/track-best.webp', x: 50.6, y: 74.1, w: 20.9, label: 'Your best lap', below: true },
      ] },
    ] },
    variants: {
      trackday: { match: ['track', 'trackday', 'laptimer', 'laptiming', 'circuit'], eyebrow: 'Track day lap timer', title: 'Your lap times. <span class="grad-text">Your delta. Your ghost.</span>', sub: 'Timed to the line between GPS fixes, with sectors, live delta and a ghost car of your best lap.', media: { img: 'v8/mode-track.webp', w: 2000, h: 1250, alt: 'Track mode' } },
      rally: { match: ['rally', 'stage', 'pacenotes', 'recce'], eyebrow: 'Rally &amp; recce', title: 'Drive the recce. <span class="grad-text">Get pace notes.</span>', sub: 'Stage timing, generated pace notes with a co-driver voice, and regularity. For rallies on closed roads.', media: { img: 'v9/recce-screen.webp', w: 2000, h: 1250, alt: 'Recce screen' } },
      performance: { match: ['performance', '0100', '060', 'quartermile', 'dragtimer', 'acceleration'], eyebrow: 'Performance tests', title: '0&ndash;100. &frac14; mile. <span class="grad-text">Every split.</span>', sub: '0&ndash;100 km/h with splits, 60 ft, &#8539; and &frac14; mile with trap speed, braking and rolling tests.', media: { img: 'v7/perf-screen.webp', w: 2000, h: 1250, alt: 'Performance screen: 0 to 100 launch and road dyno' } },
      dyno: { match: ['dyno', 'horsepower', 'power'], eyebrow: 'Road dyno', title: 'A power curve <span class="grad-text">from one pull.</span>', sub: 'Gear changes detected, wheel power estimated, your cars kept in a garage.', media: { img: 'v7/perf-dyno.webp', w: 960, h: 1040, alt: 'Road dyno power curve', frame: 'photo' } },
    },
  },
  body() {
    return [
      hero(this.hero),
      anchorBar([['disciplines', 'Menu'], ['track-day', 'Track day'], ['ghost', 'Ghost car'], ['rally', 'Rally'], ['recce', 'Pace notes'], ['regularity', 'Regularity'], ['performance', 'Performance'], ['dyno', 'Dyno'], ['live', 'Live'], ['coach', 'Coach'], ['analysis', 'Analysis'], ['find-time', 'Time gaps'], ['replay', 'Replay'], ['debrief', 'Debrief'], ['tracks', 'Tracks'], ['import', 'Import'], ['phone-sensors', 'Phone sensors'], ['wheel', 'Wheel'], ['safety', 'Safety']]),
      section(`${head({ eyebrow: 'The Racing menu', title: 'One menu. <span class="grad-text">Every discipline.</span>', sub: 'Track day, rally stage, recce and regularity, one tap each. Your circuits and stages sit beside them, ready to drive, with every recent session a tap away.', center: true })}
        <div class="menu-shot reveal-scale d1">${media({ img: 'v9/racing-menu.webp', w: 2000, h: 1250, alt: 'The DashLink Racing menu: Track day, Rally stage, Recce and Regularity, your circuits and stages, and recent sessions', spots: [
          { x: 15.5, y: 32, label: 'Track day: laps, sectors, live delta' }, { x: 42, y: 32, label: 'Rally stage: point to point, every run compared' }, { x: 15.5, y: 72, label: 'Recce: pace notes written for you' }, { x: 42, y: 72, label: 'Regularity: hold the set average' },
          { x: 90, y: 11.6, label: 'Phone sensors, garage, wheel buttons, colours' }, { x: 97.2, y: 16.2, label: 'Import a GPX or KML route' }, { x: 66, y: 34, label: 'Drive it, or edit its pace notes' }, { x: 86.5, y: 50.5, label: 'Your best time there' }, { x: 97.2, y: 66.8, label: 'Send progress to your phone' } ] })}</div>
        <div class="cards cols-3 race-cards">
          <a class="card reveal" href="track-day/"><h3>Track day${proBadge()}</h3><p>Lap timer, sectors, delta, ghost car, coach and deep session analysis.</p><span class="card-link">Track day<svg class="ic" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
          <a class="card reveal d1" href="rally/"><h3>Rally${proBadge()}</h3><p>Stage timer, recce to pace notes, a co-driver voice and regularity.</p><span class="card-link">Rally<svg class="ic" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
          <a class="card reveal d2" href="performance/"><h3>Performance${freeBadge()}</h3><p>0&ndash;100, 60 ft, &#8539; and &frac14; mile, braking, rolling and a road dyno.</p><span class="card-link">Performance<svg class="ic" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
        </div>`, 'id="disciplines"'),
      feature(f.trackDay),
      feature({ ...f.ghost, flip: true }),
      feature(f.rally),
      feature({ ...f.recce, flip: true, cta: { href: 'racing/rally/#recce', label: 'How recce works' } }),
      feature(f.regularity),
      feature({ ...f.performance, flip: true }),
      feature(f.dyno),
      feature({ ...f.live, flip: true }),
      feature(f.analysis),
      explorer(FIND_TIME),
      feature({ ...f.replay, flip: true }),
      pitWall(PIT_WALL()),
      cards({ cols: 3, eyebrow: 'And the rest', title: 'Everything a race weekend needs.', items: [
        { id: 'coach', icon: 'chat', pro: true, title: 'Coach', body: f.coach.body },
        { id: 'tracks', icon: 'flag', title: 'Track library', body: f.tracks.body + ' Import and view free; drive a session with Pro.' },
        { id: 'import', icon: 'route', title: 'Import any track', body: f.import.body + ' Import and view free; drive a session with Pro.' },
        { id: 'phone-sensors', icon: 'phone', pro: true, isNew: true, title: 'Phone sensors', body: f.sensors.body, link: { href: 'racing/track-day/#phone-sensors', label: 'How it works' } },
        { id: 'wheel', icon: 'wheel', pro: true, title: 'Steering-wheel buttons', body: f.wheel.body + ' Hands stay on the wheel.' },
        { id: 'send', icon: 'phone', title: 'Sessions on your phone', body: 'Send sessions, laps, tracks and pace notes to your phone and export GPX or CSV. <a href="../wireless-app/">DashLink Wireless</a>.' },
      ] }),
      safety(),
      plansTable({ strip: true, eyebrow: 'Plans', title: 'DashLink Racing is <span class="grad-text">part of Pro.</span>', sub: 'Try every Racing feature free during your trial. The performance tests stay free for good.', hl: ['racing', 'performance', 'extras'] }),
      faq({ items: RACING_FAQ(up) }),
      ctaFinal({ top: subnav('', up).replace('race-top reveal', 'race-top center reveal'), title: 'Your car is <span class="grad-text">already wired for it.</span>', sub: 'Try all of DashLink Racing free now. Keep it with Pro.', primary: RACING_TRY, note: 'Closed courses only.' }),
    ].join('');
  },
};
export default page;
