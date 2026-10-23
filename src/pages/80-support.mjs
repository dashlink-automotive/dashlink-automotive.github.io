import { hero, cards, faq, head, section, icon } from '../components.mjs';
import { SITE } from '../config.mjs';

const check = (items) => `<ul class="checklist">${items.map(([t, d]) => `<li class="reveal">${icon('check')}<div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ul>`;

const page = {
  key: 'support',
  slug: 'support',
  pillar: 'support',
  title: 'DashLink support — compatibility, troubleshooting and contact',
  description: 'Check if your head unit works with DashLink, fix common connection problems, and contact DashLink support.',
  hero: {
    layout: 'center',
    eyebrow: 'Support',
    title: 'Here to help.',
    sub: 'Check compatibility, fix the usual problems in a minute, or talk to us.',
    primary: { href: '#contact', label: 'Contact us', arrow: false },
    secondary: { href: '#compatibility', label: 'Will it work on my unit?', arrow: false },
  },
  body() {
    return [
      hero(this.hero),
      section(`${head({ eyebrow: 'Compatibility', title: 'Will it work on my head unit?' })}${check([
        ['Android 6.0 or newer on the head unit', 'Settings &rarr; About on the unit shows the Android version.'],
        ['USB host support, for USB mode', 'Most units have it. The phone plugs into the unit&rsquo;s USB port.'],
        ['Wi-Fi and Bluetooth, for wireless mode', 'The phone connects over the unit&rsquo;s own Wi-Fi and Bluetooth.'],
        ['Android Auto on your phone', 'For USB and wireless modes. Self mode needs Android Auto installed on the head unit instead.'],
        ['An Android 7.0+ phone for DashLink Wireless', 'Optional. Needed for sending sessions, the phone library and phone sensors.'],
      ])}<p class="fine">Not sure? Try DashLink free and see, or message us your unit&rsquo;s details.</p>`, 'id="compatibility"'),
      faq({ id: 'troubleshooting', eyebrow: 'Troubleshooting', title: 'Quick fixes.', items: [
        ['The phone doesn&rsquo;t connect over USB', 'Use a good data cable (not a charge-only one), plug into the head unit&rsquo;s main USB port, unlock the phone and accept any prompts. DashLink switches the phone into the right mode itself, so unplug and plug back in once.'],
        ['Wireless doesn&rsquo;t connect', 'Make sure Wi-Fi and Bluetooth are on, on the head unit. Open <a href="../wireless-app/">DashLink Wireless</a> on the phone to help start the connection. If it still won&rsquo;t connect, try USB to rule out the phone.'],
        ['Black screen or stuttering', 'DashLink recovers from a black screen automatically. On slower units, turn on <b>Performance mode</b> in settings.'],
        ['The picture is the wrong size or rotated', 'Resolution and orientation are applied automatically. If something looks off, tell us your unit&rsquo;s screen size and we&rsquo;ll help.'],
        ['No song titles on the dashboard', 'Music info comes from your phone through the head unit&rsquo;s Bluetooth system. Some units don&rsquo;t pass it on.'],
        ['My plan didn&rsquo;t unlock', 'A plan bought on your phone is switched on within 24 hours. Then connect the head unit to the internet, open <b>Go Premium</b> and tap <b>Restore purchase</b>. See <a href="../premium/">activation</a>.'],
        ['The trial ended. Does DashLink stop working?', 'No. DashLink stays free: the dashboard, trips, fuel, music and performance tests keep working. Android Auto needs Drive or Pro, and DashLink Racing needs Pro. See <a href="../plans/">plans</a>.'],
      ] }),
      cards({ cols: 2, items: [
        { id: 'diagnostics', icon: 'wrench', title: 'Built-in diagnostics', body: 'DashLink has diagnostics built in. If you contact us, we may ask you to open them so we can see what your unit is doing.' },
        { id: 'privacy', icon: 'shield', title: 'Privacy', body: 'No account, no cloud. Your data stays on your head unit and your own phone.', link: { href: 'privacy/', label: 'Privacy policy' } },
      ] }),
      section(`${head({ eyebrow: 'Contact', title: 'Talk to a person.', center: true })}
        <div class="contact reveal d1">
          <a class="contact-card" href="${SITE.whatsapp}?text=${encodeURIComponent('Hi DashLink! I need help.')}" target="_blank" rel="noopener">${icon('chat')}<b>WhatsApp</b><span>Fastest reply</span></a>
          <a class="contact-card" href="mailto:${SITE.email}?subject=${encodeURIComponent('DashLink support')}">${icon('mail')}<b>Email</b><span>${SITE.email}</span></a>
        </div>`, 'id="contact"'),
    ].join('');
  },
};
export default page;
