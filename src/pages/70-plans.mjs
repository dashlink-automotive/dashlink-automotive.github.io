import { hero, steps, faq, ctaFinal, planCards, plansTable } from '../components.mjs';

const page = {
  key: 'plans',
  slug: 'plans',
  pillar: 'plans',
  title: 'DashLink plans — Free, Drive and Pro. Try everything free',
  description: 'Try every DashLink feature free. Afterwards DashLink stays free, and Drive (Android Auto) or Pro (everything, including DashLink Racing) unlock more. Pay once.',
  hero: {
    layout: 'center',
    eyebrow: 'Free &middot; Drive &middot; Pro',
    title: 'Try everything free. <span class="grad-text">Then keep what you love.</span>',
    sub: 'Every feature is unlocked during your free trial. When it ends, DashLink stays free, and Drive or Pro unlock more.',
    secondary: { href: '#choose', label: 'Compare the plans', arrow: false },
    note: 'No account &middot; One purchase per head unit &middot; Pay once',
    variants: {
      upgrade: { match: ['upgrade', 'driveowner', 'topro'], eyebrow: 'Already on Drive?', title: 'Add Racing and the rest. <span class="grad-text">Upgrade to Pro.</span>', sub: 'Keep Android Auto and add DashLink Racing, the Corsa, Sport and Hyper speedometers, themes, widgets, wheel keys and phone sensors. Upgrade any time from the app.' },
      drive: { match: ['drive', 'androidauto', 'carplay'], eyebrow: 'DashLink Drive', title: 'Android Auto on your head unit. <span class="grad-text">Try it free.</span>', sub: 'Every feature is unlocked during the trial. Keep Android Auto afterwards with Drive: pay once, for this head unit.' },
      pro: { match: ['racing', 'laptimer', 'dials', 'corsa', 'everything'], eyebrow: 'DashLink Pro', title: 'Racing, premium dials, <span class="grad-text">everything.</span>', sub: 'Lap timing, rally pace notes, the Corsa, Sport and Hyper speedometers, themes and phone sensors. Try them all free, then keep them with Pro. Pay once.' },
    },
  },
  body() {
    return [
      hero(this.hero),
      steps({ id: 'how-it-works', eyebrow: 'How it works', title: 'Try it. Keep it free. <span class="grad-text">Or unlock more.</span>', items: [
        { icon: 'play', title: 'Install and try every feature free.', body: 'Android Auto, DashLink Racing, every dial and theme. Nothing is locked, and there&rsquo;s no account.' },
        { icon: 'check', title: 'When the trial ends, DashLink stays free.', body: 'Your dashboard, trips, fuel, music and 0&ndash;100 tests keep working, for good.' },
        { icon: 'unit', title: 'Pick Drive or Pro to unlock more. Pay once.', body: 'Drive keeps Android Auto. Pro keeps everything. One purchase per head unit.' },
      ] }),
      planCards({ id: 'choose', eyebrow: 'Choose your plan', title: 'Start with everything. <span class="grad-text">Try it free now.</span>', sub: 'Every plan starts the same way: the full app, free. Decide later what you want to keep.', items: {
        free: ['Dock mode with Digital, Chrono and Minimal speedometers', 'Trips, logbook, fuel estimates and car care', 'Bluetooth music on the dashboard', 'Performance tests: 0&ndash;100, braking, 80&ndash;120, road dyno and stats'],
        drive: ['Android Auto: USB, wireless and self mode', 'Auto-start when the car starts', 'Everything in Free'],
        pro: ['Android Auto and auto-start', 'DashLink Racing: track day, rally, recce + pace notes, regularity, coach and session analysis', 'Corsa, Sport and Hyper speedometers', 'Theme presets and accent colours', 'Home-screen widgets, steering-wheel keys and phone sensors'],
      }, after: '<p class="plan-up reveal">Have Drive? <b>Upgrade to Pro any time from the app.</b></p><p class="fine center">Drive and Pro are pay-once. In some countries Pro is also offered as a subscription.</p>' }),
      plansTable({ id: 'compare', here: true, eyebrow: 'Compare', title: 'Free, Drive and Pro, <span class="grad-text">side by side.</span>' }),
      steps({ id: 'how-to-buy', eyebrow: 'How to buy', title: 'Two ways to pay.', items: [
        { icon: 'unit', title: 'On the head unit', body: 'Buy through Google Play right in DashLink: open <b>Go Premium</b>, if your unit has Google Play.' },
        { icon: 'qr', title: 'Or on your phone', body: 'Scan the QR code on the head unit and pay on your phone with <a href="../wireless-app/">DashLink Wireless</a>. A phone purchase is switched on within 24 hours.' },
        { icon: 'check', title: 'Then tap Restore', body: 'With the head unit connected to the internet, tap <b>Restore</b>. After that your plan works offline. <a href="../premium/">Step by step</a>.' },
      ] }),
      faq({ items: [
        ['What happens when the trial ends?', 'DashLink stays free: your dashboard, trips, fuel, music and performance tests keep working. Android Auto, DashLink Racing and the Pro features lock until you pick a plan.'],
        ['Is it a subscription?', 'No. Drive and Pro are pay-once. In some countries Pro is also offered as a subscription.'],
        ['Is a plan per head unit?', 'Yes. One purchase covers one head unit.'],
        ['How do I restore my purchase?', 'Connect the head unit to the internet, open <b>Go Premium</b> and tap <b>Restore purchase</b>.'],
        ['Does it work offline?', 'Yes. After activation your plan works without internet.'],
        ['Do I need an account?', 'No. There&rsquo;s no account or sign-up. Your plan belongs to the head unit.'],
        ['Can I go from Drive to Pro later?', 'Yes. Upgrade to Pro any time from the app.'],
        ['Google Play isn&rsquo;t available in my country', 'We can switch your plan on for you directly. See <a href="../premium/">activation</a>.'],
      ] }),
      ctaFinal({ title: 'Try it in your car <span class="grad-text">first.</span>', sub: 'Every feature, free, for the whole trial. No account.', secondary: false }),
    ].join('');
  },
};
export default page;
