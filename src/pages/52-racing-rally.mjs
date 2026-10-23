import { hero, anchorBar, feature, faq, ctaFinal, safety, recceStory , plansTable, proBadge } from '../components.mjs';
import { F, RACING_FAQ, RACING_BAR, RACING_TRY, RACING_TIER, subnav } from '../racing.mjs';

const up = '../../';
const f = F(up);
const RULES = ' For rallies and regularity events: check your event&rsquo;s rules on electronic devices.';

const page = {
  key: 'racing-rally',
  slug: 'racing/rally',
  pillar: 'racing',
  racing: true,
  bar: RACING_BAR,
  title: 'Rally stage timer, pace notes and regularity (TSD) | DashLink Racing',
  description: 'Rally stage timing, recce to pace notes with a co-driver voice, and regularity (TSD) on your head unit. For rallies on closed roads.',
  hero: {
    top: subnav('rally', up),
    eyebrow: 'Rally',
    title: 'Drive the recce. <span class="grad-text">Hear the notes.</span>',
    sub: 'Stage timing from start line to stop control, pace notes written from your recce and called by a co-driver voice, and regularity by section.',
    primary: RACING_TRY,
    tier: RACING_TIER(proBadge(), up),
    note: 'For rallies on closed roads. Check your event&rsquo;s rules on electronic devices.',
    media: { img: 'v9/recce-screen.webp', w: 2000, h: 1250, alt: 'Recce screen: the route, voice notes and one-tap calls' },
    variants: {
      stage: { match: ['stage', 'stagetimer'], eyebrow: 'Stage timer', title: 'Start line <span class="grad-text">to stop control.</span>', sub: 'Standing or flying start, finish at the line or the stop control. Known stages are recognised when you arrive.', media: { img: 'v9/stage-drive.webp', w: 2000, h: 1250, alt: 'Driving a stage' } },
      tsd: { match: ['tsd', 'regularity', 'averagespeed'], eyebrow: 'Regularity (TSD)', title: 'Hold the average, <span class="grad-text">section by section.</span>', sub: 'Live early/late, distance calibration and splits.', media: { mock: 'regularity' } },
    },
  },
  body() {
    return [
      hero(this.hero),
      anchorBar([['rally', 'Stage timer'], ['recce', 'Pace notes'], ['recce-calls', 'Calls'], ['regularity', 'Regularity'], ['tracks', 'Stages'], ['import', 'Import'], ['wheel', 'Wheel'], ['safety', 'Safety']]),
      feature(f.rally),
      recceStory({ id: 'recce', eyebrow: 'Recce &rarr; pace notes', title: 'Drive it once. <span class="grad-text">Get a co-driver.</span>',
        sub: 'Pace notes usually mean a co-driver with a notebook, or specialist rally kit. DashLink writes them from one slow recce drive, on the screen already in your car.',
        steps: [
          { key: 'recce', n: '01', name: 'Recce', text: 'Drive the stage slowly once. Tap a call at the spot or record a voice note. Corners are found on their own.', img: 'v9/recce-screen.webp', alt: 'Recce screen: the route so far, voice notes and one-tap calls', lifts: [
            { img: 'v9/lift-voice.webp', x: 55, y: 15, w: 43.25, label: 'Voice notes, recorded at the spot' },
            { img: 'v9/lift-toast.webp', x: 2.85, y: 13.3, w: 10.45, label: 'Added right where you are' } ] },
          { key: 'notes', n: '02', name: 'Pace notes', text: 'DashLink writes the notes: corner, severity, length and distance, plus your calls and memos. Edit any note before you drive.', img: 'v9/pace-notes.webp', alt: 'The pace notes for a stage, listed with distances beside the map', lifts: [
            { img: 'v9/lift-memo.webp', x: 50.75, y: 14.9, w: 46.5, label: 'Your voice memo, at 1.3 km' },
            { img: 'v9/lift-r3.webp', x: 50.75, y: 23.4, w: 46.5, label: 'R3, long, jump, narrows: written for you', below: true } ] },
          { key: 'stage', n: '03', name: 'Stage', text: 'On the stage, the co-driver voice calls each note ahead of time, with the distance, while the map and the clock run.', img: 'v9/stage-drive.webp', alt: 'Driving the stage: the next notes on top, the map and the stage time', lifts: [
            { img: 'v9/lift-note.webp', x: 1.75, y: 10.5, w: 42.15, label: 'Called before you get there' },
            { img: 'v9/lift-l2.webp', x: 44.8, y: 10.5, w: 26.25, label: 'Linked: opens, bumps, into' } ] },
        ],
        calls: { eyebrow: 'Ten calls, one tap each', title: 'Mark it as you see it.', sub: 'Caution, crest, jump, narrows, bumps and more, dropped on the route exactly where you are. Try it.', items: ['Caution', 'Double caution', 'Crest', 'Jump', 'Narrows', 'Bumps', 'Don&rsquo;t cut', 'Keep in', 'Slippy', 'Junction'], tip: 'Set up steering-wheel buttons to add calls and voice notes without touching the screen.' },
        why: { eyebrow: 'Why it matters', title: 'Proper pace notes, from your head unit.', items: [
          ['route', 'Notes from your own drive', 'Every corner measured on your recce: direction, severity and length, and the distance between notes.'],
          ['mic', 'Your voice, at the spot', 'Record a voice memo on the recce and it sits in the notes at exactly that spot.'],
          ['chat', 'A co-driver voice', 'Each note is called ahead of time, linked when corners run together: into, and, opens.'],
          ['pencil', 'Edit before you drive', 'Change a corner, add a warning or remove a note. Every note and its distance on one screen.'],
          ['wheel', 'Hands stay on the wheel', 'Steering-wheel buttons mark calls and record voice notes during the recce.'],
          ['cloudoff', 'Works with no signal', 'Recce, notes and stage all run on the head unit. No internet needed in the forest.'],
        ] },
        note: 'Recce at legal speeds and under your event&rsquo;s rules; time stages on closed roads only. Pace notes are generated and can be wrong, so check them before you rely on them. Check your event&rsquo;s rules on electronic devices.' }),
      feature(f.regularity),
      feature({ ...f.tracks, flip: true, title: 'Every stage, on its own page.' }),
      feature({ ...f.import, body: 'Import a GPX or KML of the route from your phone or a file. A route that isn&rsquo;t a closed loop becomes a stage, with pace notes generated for you.' }),
      feature({ ...f.wheel, flip: true }),
      safety(RULES),
      plansTable({ strip: true, eyebrow: 'Plans', title: 'DashLink Racing is <span class="grad-text">part of Pro.</span>', sub: 'Try every Racing feature free during your trial. The performance tests stay free for good.', hl: ['racing', 'performance', 'extras'] }),
      faq({ items: RACING_FAQ(up).filter(([q]) => !/dyno/.test(q)) }),
      ctaFinal({ title: 'Your co-driver, <span class="grad-text">in the dash.</span>', primary: RACING_TRY, note: 'Closed roads only. Check your event&rsquo;s rules on electronic devices.' }),
    ].join('');
  },
};
export default page;
