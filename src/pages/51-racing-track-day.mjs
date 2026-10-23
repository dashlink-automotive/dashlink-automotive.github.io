import { hero, anchorBar, feature, faq, ctaFinal, safety, sensorStory, pitWall , plansTable, proBadge } from '../components.mjs';
import { F, RACING_FAQ, RACING_BAR, RACING_TRY, RACING_TIER, subnav, PIT_WALL } from '../racing.mjs';

const up = '../../';
const f = F(up);

const page = {
  key: 'racing-track-day',
  slug: 'racing/track-day',
  pillar: 'racing',
  racing: true,
  bar: RACING_BAR,
  title: 'Track day lap timer with live delta and ghost car | DashLink Racing',
  description: 'A track day lap timer on your head unit: line-crossing timing, sectors, live delta, ghost car, coach and session analysis with speed traces and a grip plot.',
  hero: {
    top: subnav('track-day', up),
    eyebrow: 'Track day',
    title: 'Find the time <span class="grad-text">you&rsquo;re leaving out there.</span>',
    sub: 'Lap timing to the line, automatic sectors, live delta and a ghost car of your best lap. Then a debrief that tells you which corners cost you.',
    primary: RACING_TRY,
    tier: RACING_TIER(proBadge(), up),
    note: 'Closed courses only',
    media: { img: 'v8/mode-track.webp', w: 2000, h: 1250, alt: 'Track mode: lap time, live delta, sectors and chase map' },
    variants: {
      ghost: { match: ['ghost', 'delta'], eyebrow: 'Ghost car &amp; live delta', title: 'Chase <span class="grad-text">your best lap.</span>', sub: 'Your best lap drives with you on the map, and the delta tells you live whether you&rsquo;re up or down.', media: f.ghost.media },
      analysis: { match: ['analysis', 'data', 'telemetry', 'coach'], eyebrow: 'Session analysis', title: 'Where the time goes, <span class="grad-text">in plain words.</span>', sub: 'Theoretical best, speed traces, gap to best, a grip plot, and the corners that cost you.', media: { img: 'v6/web-overview.webp', w: 1600, h: 1123, alt: 'Session analysis in a web browser', frame: 'browser' } },
    },
  },
  body() {
    return [
      hero(this.hero),
      anchorBar([['track-day', 'Lap timer'], ['ghost', 'Ghost car'], ['live', 'Live'], ['analysis', 'Analysis'], ['debrief', 'Debrief'], ['coach', 'Coach'], ['tracks', 'Tracks'], ['import', 'Import'], ['phone-sensors', 'Phone sensors'], ['wheel', 'Wheel'], ['safety', 'Safety']]),
      feature(f.trackDay),
      feature({ ...f.ghost, flip: true }),
      feature(f.live),
      feature({ ...f.analysis, flip: true }),
      pitWall(PIT_WALL()),
      feature(f.coach),
      feature({ ...f.tracks, flip: true }),
      feature(f.import),
      sensorStory(f.sensors),
      feature(f.wheel),
      safety(),
      plansTable({ strip: true, eyebrow: 'Plans', title: 'DashLink Racing is <span class="grad-text">part of Pro.</span>', sub: 'Try every Racing feature free during your trial. The performance tests stay free for good.', hl: ['racing', 'performance', 'extras'] }),
      faq({ items: RACING_FAQ(up).filter(([q]) => !/dyno/.test(q)) }),
      ctaFinal({ title: 'Next track day, <span class="grad-text">bring data.</span>', primary: RACING_TRY, note: 'Closed courses only.' }),
    ].join('');
  },
};
export default page;
