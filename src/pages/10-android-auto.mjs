import { hero, anchorBar, feature, cards, steps, faq, ctaFinal, gallery, beforeAfter, plansTable, driveBadge, proBadge } from '../components.mjs';

const page = {
  key: 'android-auto',
  slug: 'android-auto',
  pillar: 'android-auto',
  title: 'Android Auto on your head unit — USB, wireless and self mode | DashLink',
  description: 'DashLink works with Android Auto on aftermarket Android head units: USB, wireless or self mode, tuned automatically for cheap units and any screen.',
  hero: {
    eyebrow: 'Works with Android Auto',
    title: 'Android Auto on the screen <span class="grad-text">already in your car.</span>',
    sub: 'Plug in or go wireless. DashLink picks the right video settings for your head unit, so it runs smoothly on cheap units and big screens alike.',
    primary: { play: 'headunit', label: 'Try Android Auto free', plan: 'drive' },
    note: 'Android 6.0+ head units &middot; No account',
    tier: `${driveBadge()}${proBadge()}`,
    media: { img: 'v3/cabin-day.webp', w: 1100, h: 691, alt: 'A driver tapping Android Auto on an aftermarket head unit', frame: 'photo' },
    variants: {
      wireless: { match: ['wireless', 'wifi', 'cordless'], eyebrow: 'Wireless Android Auto', title: 'Wireless Android Auto, <span class="grad-text">no dongle.</span>', sub: 'Your phone connects over the head unit&rsquo;s own Wi-Fi and Bluetooth, the way factory wireless systems do.' },
      usb: { match: ['usb', 'wired', 'cable'], eyebrow: 'USB Android Auto', title: 'Plug in. <span class="grad-text">It connects.</span>', sub: 'DashLink switches your phone into the right mode by itself, and recovers cleanly when you unplug and plug back in.' },
      budget: { match: ['cheap', 'budget', 'lowend', 'smooth'], eyebrow: 'Built for cheap head units', title: 'Smooth on a <span class="grad-text">1 GB head unit.</span>', sub: 'DashLink chooses codec, resolution and renderer for your unit automatically. Performance mode keeps weak units smooth.' },
      selfmode: { match: ['self', 'selfmode', 'nophone'], eyebrow: 'Self mode', title: 'Android Auto, <span class="grad-text">straight from the head unit.</span>', sub: 'Got Android Auto installed on the unit? Self mode runs it from the head unit itself.' },
    },
  },
  body() {
    return [
      hero(this.hero),
      anchorBar([['everyday', 'Everyday'], ['usb', 'USB'], ['wireless', 'Wireless'], ['self-mode', 'Self mode'], ['smooth', 'Cheap units'], ['screens', 'Any screen'], ['wheel-keys', 'Wheel keys'], ['gps', 'GPS'], ['widgets', 'Widgets'], ['auto-start', 'Auto-start'], ['languages', '40 languages']]),
      feature({ id: 'usb', kicker: 'USB Android Auto', title: 'Plug the phone in. That&rsquo;s it.', body: 'DashLink switches the phone into the right mode by itself and connects. Unplug and plug back in, and it recovers cleanly.', bullets: ['No settings to find on the phone', 'Charges while you drive', 'The most stable link on any unit'], media: { img: 'aa_navigation_and_music.webp', w: 2400, h: 1080, alt: 'Android Auto navigation and music over USB' } }),
      feature({ id: 'wireless', flip: true, kicker: 'Wireless Android Auto', title: 'Leave the phone in your pocket.', body: 'The phone connects over the head unit&rsquo;s own Wi-Fi and Bluetooth, the same way factory wireless systems do. Works with current Android Auto versions.', bullets: ['No adapter or dongle to buy', 'Needs a head unit with Wi-Fi and Bluetooth', '<a href="../wireless-app/#start-wireless">DashLink Wireless</a> helps phones start the connection'], media: { img: 'aa_home.webp', w: 2400, h: 1080, alt: 'Android Auto running wirelessly on a head unit' } }),
      feature({ id: 'self-mode', kicker: 'Self mode', title: 'No phone needed.', body: 'For head units with Android Auto installed, self mode runs it from the head unit itself.', media: { img: 'after.webp', w: 2400, h: 1080, alt: 'Android Auto running directly on the head unit' } }),
      feature({ id: 'smooth', flip: true, kicker: 'Built for cheap head units', title: 'Smooth on the unit you already have.', body: 'DashLink picks the right video settings for your head unit automatically: codec, resolution and renderer. No tinkering.', bullets: ['<b>Performance mode</b> keeps weak units smooth', 'Recovers from a black screen automatically', 'Made for 1&ndash;2 GB units'], media: { img: 'v2/home-quick-settings.webp', w: 2000, h: 1250, alt: 'DashLink quick settings on the head unit' } }),
      gallery({ id: 'everyday', eyebrow: 'What you get', title: 'Everything that makes driving better.', items: [
        { id: 'navigation', kicker: 'Navigation', title: 'Turn-by-turn, sized for the dash', body: 'Live traffic, lane guidance and clear turns on a big, bright map.', media: { img: 'map_light.webp', alt: 'Turn-by-turn navigation in Android Auto' } },
        { id: 'calls', kicker: 'Calling', title: 'Hands-free calls', body: 'Answer and dial by voice, with the whole call on the big screen.', media: { img: 'aa_dialpad.webp', alt: 'The dial pad beside the map in Android Auto' } },
        { id: 'messages', kicker: 'Messaging', title: 'Messages read aloud', body: 'Hear messages as they arrive and reply by voice. No typing while driving.', media: { img: 'speak_aloud.webp', alt: 'A message read aloud in Android Auto' } },
        { id: 'voice', kicker: 'Voice', title: 'Just ask', body: 'Directions, music, a quick question: ask out loud and keep your hands on the wheel.', media: { img: 'gemini.webp', alt: 'Asking the voice assistant in Android Auto' } },
      ] }),
      beforeAfter({ id: 'difference', eyebrow: 'See the difference', title: 'Drag to transform your dashboard.', before: { img: 'before.webp', alt: 'A cluttered stock Android launcher' }, after: { img: 'after.webp', alt: 'Android Auto through DashLink on the same screen' } }),
      cards({ cols: 3, eyebrow: 'The details', title: 'Fits your car, not the other way round.', items: [
        { id: 'screens', icon: 'screen', title: 'Any screen', body: 'Landscape and portrait units, from 800&times;480 to large tablets. Resolution and orientation are applied automatically.' },
        { id: 'wheel-keys', icon: 'wheel', pro: true, title: 'Steering-wheel keys', body: 'Map your unit&rsquo;s steering-wheel and panel buttons to Android Auto actions.' },
        { id: 'gps', icon: 'pin', title: 'Head-unit GPS', body: 'The head unit&rsquo;s own GPS feeds Android Auto navigation.' },
        { id: 'widgets', icon: 'grid', pro: true, title: 'Home-screen widgets', body: 'One-tap USB and Wireless tiles on the head unit&rsquo;s home screen.' },
        { id: 'auto-start', icon: 'power', drive: true, title: 'Auto-start &amp; resume', body: 'A guide to opening DashLink when the car starts, and it reopens the last screen you used. It never connects on its own.' },
        { id: 'languages', icon: 'globe', title: '40 languages', body: 'Choose your language inside the app.' },
      ] }),
      steps({ id: 'setup', eyebrow: 'Get going', title: 'Three steps. A few minutes.', items: [
        { icon: 'play', title: 'Install on the head unit', body: 'From Google Play on the head unit, or follow our <a href="../download/">install guide</a>.' },
        { icon: 'usb', title: 'Pick USB, Wireless or Self', body: 'Choose how your phone connects. You can change it any time.' },
        { icon: 'bolt', title: 'Tap Start', body: 'Android Auto appears on your screen. Next time, it&rsquo;s one tap.' },
      ] }),
      plansTable({ strip: true, eyebrow: 'Plans', title: 'Android Auto is in <span class="grad-text">Drive and Pro.</span>', sub: 'Try it free with every other feature. When the trial ends, keep Android Auto with Drive, or everything with Pro.', hl: ['android-auto', 'extras'] }),
      faq({ items: [
        ['Is Android Auto free?', 'It&rsquo;s free during your trial, with every other feature. Afterwards it&rsquo;s part of DashLink Drive and DashLink Pro. DashLink itself stays free. See <a href="../plans/">plans</a>.'],
        ['What do I need?', 'An Android head unit running Android 6.0 or newer. For USB mode the unit needs USB host support; for wireless it needs Wi-Fi and Bluetooth. Your phone needs Android Auto.'],
        ['Is this the official Android Auto head unit app?', 'No. DashLink is an independent app that works with Android Auto. It is not made or endorsed by Google.'],
        ['The picture is black or stutters. What now?', 'DashLink recovers from a black screen automatically. If your unit is slow, switch on Performance mode in settings. See <a href="../support/#troubleshooting">troubleshooting</a>.'],
        ['Do I need root?', 'No.'],
        ['Does it replace my launcher?', 'No. DashLink is an app; your home screen stays as it is.'],
      ] }),
      ctaFinal({ title: 'Android Auto. <span class="grad-text">Your head unit.</span>', sub: 'Try it free now. Keep it with Drive or Pro.', primary: { play: 'headunit', label: 'Try Android Auto free', plan: 'drive' } }),
    ].join('');
  },
};
export default page;
