import { hero, anchorBar, feature, faq, ctaFinal, safety, cards, sensorStory , plansTable, freeBadge, proBadge } from '../components.mjs';
import { F, RACING_FAQ, RACING_BAR, subnav } from '../racing.mjs';

const up = '../../';
const f = F(up);

const page = {
  key: 'racing-performance',
  slug: 'racing/performance',
  pillar: 'racing',
  racing: true,
  bar: RACING_BAR,
  title: '0–100, quarter mile and road dyno on your head unit | DashLink Racing',
  description: '0–100 km/h with splits, 60 ft, eighth and quarter mile with trap speed, braking and rolling tests, plus a road dyno with an estimated power curve.',
  hero: {
    top: subnav('performance', up),
    eyebrow: 'Performance',
    title: 'How quick is it, <span class="grad-text">really?</span>',
    sub: '0&ndash;100 with splits, 60 ft, &#8539; and &frac14; mile with trap speed, braking and rolling tests, and a road dyno. The launch is detected precisely.',
    primary: { play: 'headunit', label: 'Try the tests free', plan: 'free' },
    tier: `${freeBadge()}${proBadge()}`,
    note: 'Closed courses and test venues only',
    media: { img: 'v7/perf-screen.webp', w: 2000, h: 1250, alt: 'Performance screen: 0 to 100 launch result beside the road dyno' },
    variants: {
      dyno: { match: ['dyno', 'horsepower', 'power', 'bhp', 'whp'], eyebrow: 'Road dyno', title: 'A power curve <span class="grad-text">from one pull.</span>', sub: 'Gear changes detected, wheel power estimated, all your cars in a garage.', media: { img: 'v7/perf-dyno.webp', w: 960, h: 1040, alt: 'Road dyno power curve', frame: 'photo' } },
      quartermile: { match: ['quarter', 'quartermile', 'drag', '14mile'], eyebrow: '&frac14; mile', title: 'Sixty foot <span class="grad-text">to the trap.</span>', sub: '60 ft, &#8539; and &frac14; mile with trap speed, timed from the moment you launch.', media: { img: 'v7/perf-splits.webp', w: 902, h: 876, alt: 'Last run splits', frame: 'float', width: 440 } },
    },
  },
  body() {
    return [
      hero(this.hero),
      anchorBar([['performance', 'Splits'], ['tests', 'Three tests'], ['in-gear', 'In gear'], ['dyno', 'Road dyno'], ['phone-sensors', 'Phone sensors'], ['live', 'Live'], ['safety', 'Safety']]),
      feature({ ...f.performance, title: 'Every split, every run.', media: { img: 'v7/perf-splits.webp', w: 902, h: 876, alt: 'Last run: 16.22 s, +0.57 s against best, with splits from 0 to 50 km/h up to a quarter mile', frame: 'float', width: 440 } }),
      cards({ id: 'tests', cols: 3, eyebrow: 'Three tests', title: 'Pick the test. Drive. It&rsquo;s timed.', items: [
        { id: 'launch', icon: 'bolt', title: '0&ndash;100 &middot; Launch', body: 'From a standstill to 100 km/h (0&ndash;60 mph), with splits, 60 ft, &#8539; and &frac14; mile.' },
        { id: 'braking', icon: 'shield', title: '100&ndash;0 &middot; Braking', body: 'How far and how long it takes to stop from 100 km/h.' },
        { id: 'overtake', icon: 'gauge', title: '80&ndash;120 &middot; Overtake', body: 'Rolling acceleration from 80 to 120 km/h, timed in gear. 60&ndash;100 is measured too.' },
      ] }),
      feature({ id: 'in-gear', free: true, flip: true, kicker: 'In-gear intervals', title: '60&ndash;100 and 80&ndash;120, in gear.', body: 'Every launch also gives you the in-gear intervals, the peak g, your top speed and a speed-over-time trace with each split marked on the curve. The GPS rate is shown with the result, so you know how fine the data is.', bullets: ['60&ndash;100 and 80&ndash;120 km/h from the same run', 'Peak g and top speed', 'Speed over time, splits marked'], note: 'A 10 Hz GPS gives finer intervals than a 1 Hz one.', media: { img: 'v7/perf-in-gear.webp', w: 903, h: 586, alt: 'In-gear intervals: 60 to 100 km/h in 10.17 s, 80 to 120 km/h in 12.71 s, peak 0.30 g, top speed 121 km/h, and speed over time', frame: 'float', width: 520, mirror: true } }),
      feature(f.dyno),
      sensorStory(f.sensors),
      feature(f.live),
      safety(),
      plansTable({ strip: true, eyebrow: 'Plans', title: 'Performance tests <span class="grad-text">are free.</span>', sub: '0&ndash;100, braking, 80&ndash;120, the road dyno and your stats keep working after the trial. Live modes and phone sensors come with Pro.', hl: ['performance', 'racing', 'extras'] }),
      faq({ items: RACING_FAQ(up) }),
      ctaFinal({ title: 'Put a number <span class="grad-text">on it.</span>', primary: { play: 'headunit', label: 'Try the tests free', plan: 'free' }, note: 'Closed courses only. Power figures are estimates.' }),
    ].join('');
  },
};
export default page;
