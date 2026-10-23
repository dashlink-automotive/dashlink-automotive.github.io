import { hero, anchorBar, feature, cards, faq, ctaFinal, plansTable, freeBadge } from '../components.mjs';

const page = {
  key: 'trips-fuel-maintenance',
  slug: 'trips-fuel-maintenance',
  pillar: 'trips-fuel-maintenance',
  title: 'Trip computer, fuel costs and service reminders | DashLink',
  description: 'Trip A and B, a logbook you can export as CSV, estimated fuel, range and trip cost, and service reminders by distance or months, on your head unit.',
  hero: {
    eyebrow: 'Trips, fuel &amp; car care',
    title: 'Know every trip. <span class="grad-text">Miss no service.</span>',
    sub: 'A trip computer, a logbook of every drive, fuel and cost estimates, and reminders for oil, tyres and paperwork. All on your head unit, all offline.',
    primary: { play: 'headunit' },
    tier: `${freeBadge()}<span>Free. Trips, fuel and car care stay free after the trial.</span>`,
    media: { img: 'v2/fuel-costs.webp', w: 2000, h: 1250, alt: 'Fuel and costs: estimated fuel left, range and consumption' },
    variants: {
      fuel: { match: ['fuel', 'mileage', 'mpg', 'petrol', 'cost'], eyebrow: 'Fuel &amp; costs', title: 'What every trip <span class="grad-text">really costs.</span>', sub: 'Range, fuel left and each trip&rsquo;s cost, estimated from the distance you drive, in your units and currency.' },
      service: { match: ['service', 'maintenance', 'oil', 'carcare', 'reminder'], eyebrow: 'Service reminders', title: 'Your car, <span class="grad-text">looked after.</span>', sub: 'Oil change, service, tyre rotation, brakes, insurance and registration. Due by distance or months.', media: { img: 'v2/car-care.webp', w: 2000, h: 1250, alt: 'Car care reminders and maintenance log' } },
      logbook: { match: ['logbook', 'expenses', 'csv', 'business'], eyebrow: 'Logbook', title: 'Every drive, <span class="grad-text">logged.</span>', sub: 'Every drive recorded and exported as CSV, ready for expenses or mileage claims.', media: { mock: 'logbook' } },
    },
  },
  body() {
    return [
      hero(this.hero),
      anchorBar([['trip', 'Trip computer'], ['logbook', 'Logbook'], ['fuel', 'Fuel &amp; costs'], ['car-care', 'Service reminders'], ['odometer', 'Odometer']]),
      feature({ id: 'trip', kicker: 'Trip computer', title: 'Trip A, Trip B and this drive.', body: 'Distance, moving time, average and top speed for the current journey, plus two trips you reset when you like. The Journey layout puts it all on the dashboard, with the estimated trip cost.', media: { img: 'v4/dock-journey.webp', w: 2000, h: 1250, alt: 'The Journey layout: range, trip cost, distance, driving time and average' } }),
      feature({ id: 'logbook', flip: true, kicker: 'Logbook', title: 'Every drive, recorded.', body: 'Each drive goes in the logbook. Export it as CSV for expenses or mileage claims.', media: { mock: 'logbook' } }),
      feature({ id: 'fuel', kicker: 'Fuel &amp; costs', title: 'Range and cost, estimated honestly.', body: 'Range, fuel left and each trip&rsquo;s cost, all <b>estimated</b> from the distance you drive. Tap &ldquo;I filled up&rdquo; to keep the estimate on track.', bullets: ['km/L, mpg (US) or mpg (UK)', 'Your own fuel price and currency', 'No sensor or adapter needed'], media: { img: 'v2/fuel-costs.webp', w: 2000, h: 1250, alt: 'Estimated fuel left, range and consumption' } }),
      feature({ id: 'car-care', flip: true, kicker: 'Service &amp; maintenance', title: 'Reminders before it&rsquo;s overdue.', body: 'Oil change, service, tyre rotation, brake check, insurance, registration, or your own. Due by distance or by months, with &ldquo;due soon&rdquo; and &ldquo;overdue&rdquo; status and a maintenance log with date and odometer.', media: { img: 'v2/car-care.webp', w: 2000, h: 1250, alt: 'Service reminders and a maintenance log' } }),
      cards({ cols: 2, items: [
        { id: 'odometer', icon: 'gauge', title: 'Odometer', body: 'Set it once from your car. DashLink keeps it up to date while DashLink or Android Auto is on screen.' },
        { id: 'offline', icon: 'cloudoff', title: 'Offline and private', body: 'Trips, costs and reminders stay on your head unit. No account, no cloud.' },
      ] }),
      plansTable({ strip: true, eyebrow: 'Plans', title: 'Trips, fuel and car care <span class="grad-text">are free.</span>', sub: 'They keep working after the trial, on every plan.', hl: ['dashboard'] }),
      faq({ items: [
        ['Is this free?', 'Yes. The trip computer, logbook, fuel estimates and service reminders are in DashLink Free and keep working after the trial.'],
        ['How accurate is the fuel estimate?', 'It&rsquo;s an estimate based on distance and the consumption you set. Logging &ldquo;I filled up&rdquo; keeps it close to reality. DashLink doesn&rsquo;t read your car&rsquo;s fuel sensor.'],
        ['Can I export my drives?', 'Yes, the logbook exports as CSV.'],
        ['Does the odometer match my car?', 'You set it once from your car&rsquo;s reading. It then counts while DashLink or Android Auto is on screen, so set it again now and then.'],
      ] }),
      ctaFinal({ title: 'Every kilometre, <span class="grad-text">counted.</span>', sub: 'Free, and it stays free. Try DashLink now.', primary: { play: 'headunit' } }),
    ].join('');
  },
};
export default page;
