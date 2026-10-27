// Site-wide settings used by the generator (src/build.mjs).
// The browser-side copies of APPS / NO_PLAY live in assets/site.js — keep them in step.

export const SITE = {
  base: 'https://dashlink-automotive.github.io',
  name: 'DashLink',
  email: 'dashlink.support@gmail.com',
  whatsapp: 'https://wa.me/923229914024',
  year: 2026,
};

// Google Play package ids.
export const APPS = {
  headunit: 'com.auto.dashlink.headunit',
  wireless: 'com.auto.dashlinkwireless',
};

// Main navigation (order = order on screen). `racing` gets the red treatment.
export const NAV = [
  { key: 'android-auto', label: 'Android Auto', href: 'android-auto/', blurb: 'USB, wireless and self mode on your head unit' },
  { key: 'dashboard', label: 'Dashboard', href: 'dashboard/', blurb: 'Dock mode, 7 layouts, 6 speedometers' },
  { key: 'trips-fuel-maintenance', label: 'Trips & fuel', href: 'trips-fuel-maintenance/', blurb: 'Trip computer, fuel estimates, service reminders' },
  { key: 'diagnostics', label: 'Diagnostics', href: 'diagnostics/', blurb: 'Fault codes, engine gauges and live data' },
  { key: 'racing', label: 'Racing', href: 'racing/', blurb: 'Lap timing, rally stages, performance tests', racing: true },
  { key: 'wireless-app', label: 'Wireless app', href: 'wireless-app/', blurb: 'The companion app for your phone' },
  { key: 'plans', label: 'Plans', href: 'plans/', blurb: 'Free, Drive or Pro. Try everything free' },
  { key: 'support', label: 'Support', href: 'support/', blurb: 'Compatibility, troubleshooting, contact' },
];

// Plans. Every feature is unlocked during the free trial; afterwards DashLink stays
// free and Drive or Pro unlock more. Never state prices, the trial length or
// "lifetime / monthly" anywhere on the site.
export const PLANS = {
  free: { name: 'DashLink Free', short: 'Free', promise: 'Your car&rsquo;s dashboard: dock, dials, trips, fuel, music, 0&ndash;100 tests. Free forever.' },
  drive: { name: 'DashLink Drive', short: 'Drive', promise: 'Android Auto on your head unit, wired and wireless. Everything in Free.' },
  pro: { name: 'DashLink Pro', short: 'Pro', promise: 'Everything: Android Auto, DashLink Racing, premium speedometers, themes and every Pro feature.', label: 'Everything' },
};

// The comparison table (/plans, home, and the strip on each pillar page).
// [key, label, free, drive, pro]
export const PLAN_ROWS = [
  ['dashboard', 'Dashboard (Dock), trips, fuel, logbook, car care', true, true, true],
  ['dials', 'Speedometers: Digital, Chrono, Minimal', true, true, true],
  ['performance', 'Performance tests: 0&ndash;100, braking, 80&ndash;120, dyno, stats', true, true, true],
  ['music', 'Bluetooth music on the dashboard', true, true, true],
  ['diagnostics', 'Diagnostics: fault codes in plain words and engine gauges (with an OBD-II adapter)', true, true, true],
  ['android-auto', 'Android Auto (USB, wireless, self mode) and auto-start', false, true, true],
  ['racing', 'DashLink Racing: track day, rally, recce + pace notes, regularity (TSD), saved-track sessions, coach, session analysis', false, false, true],
  ['premium-dials', 'Premium speedometers: Corsa, Sport, Hyper', false, false, true],
  ['diagnostics-pro', 'Diagnostics Pro: live data for every sensor, boost, AFR and oil gauges, pending codes, freeze frame, clearing codes, engine clusters', false, false, true],
  ['themes', 'Theme presets (all except Signature) and accent colours', false, false, true],
  ['extras', 'Home-screen widgets, steering-wheel key mapping, phone sensors', false, false, true],
];

// Pages that are hand-written (not generated) but still belong in the sitemap.
export const STATIC_PAGES = ['download/', 'premium/', 'privacy/'];
