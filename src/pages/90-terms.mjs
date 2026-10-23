import { hero, prose } from '../components.mjs';
import { SITE } from '../config.mjs';

const UPDATED = '23 October 2026';
const mail = `<a href="mailto:${SITE.email}">${SITE.email}</a>`;

const page = {
  key: 'terms',
  slug: 'terms',
  pillar: 'legal',
  title: 'Terms of use | DashLink',
  description: 'The terms for using DashLink, DashLink Racing, the Free, Drive and Pro plans, and DashLink Wireless.',
  bar: { title: 'DashLink', sub: 'Terms of use', cta: { href: 'support/#contact', label: 'Contact', arrow: false } },
  hero: {
    layout: 'center',
    eyebrow: 'Legal',
    title: 'Terms of use',
    sub: `The rules for using DashLink, in plain words. Last updated ${UPDATED}.`,
  },
  body() {
    return [
      hero(this.hero),
      prose({ sections: [
        ['agreement', 'Agreeing to these terms', `
          <p>These terms cover the DashLink app for Android head units (including <b>DashLink Racing</b> and the <b>DashLink Free</b>, <b>Drive</b> and <b>Pro</b> plans), the <b>DashLink Wireless</b> phone app, and this website. By installing or using them you agree to these terms. If you don&rsquo;t agree, please don&rsquo;t use them.</p>
          <p>How we handle your data is explained separately in our <a href="../privacy/">privacy policy</a>.</p>`],
        ['independent', 'DashLink is independent', `
          <p>DashLink is an independent app that works with Android Auto. It is not made, endorsed or supported by Google. Android, Android Auto and Google Play are trademarks of Google LLC.</p>
          <p>Android Auto, your phone, your head unit and the apps you use through them are provided by other companies under their own terms. We can&rsquo;t control them, and changes they make can affect how DashLink works.</p>`],
        ['licence', 'Your licence', `
          <p>We give you a personal, non-exclusive, non-transferable licence to use DashLink on your own devices for personal, non-commercial use, under these terms.</p>
          <p>You may not copy, resell, rent or redistribute the apps; reverse-engineer them except where the law allows; remove or get around licence checks; or use them to break any law.</p>`],
        ['trial-plans', 'Free trial and plans', `
          <ul>
            <li>DashLink starts with a free trial with every feature unlocked. What it includes is shown in the app and may change.</li>
            <li>When the trial ends, DashLink stays free to use (<b>DashLink Free</b>). Android Auto, DashLink Racing and other paid features lock until you choose a plan.</li>
            <li>Two plans unlock more: <b>DashLink Drive</b> (adds Android Auto) and <b>DashLink Pro</b> (everything). Both are a one-time purchase. In some countries Pro is also offered as a subscription, which renews until you cancel it in Google Play.</li>
            <li>What each plan includes is shown on our <a href="../plans/">plans page</a> and in the app, and may change as features are added or removed.</li>
            <li>A purchase covers <b>one head unit</b>. It is tied to that unit&rsquo;s device ID. You can upgrade from Drive to Pro in the app.</li>
            <li>Purchases made through Google Play are processed by Google under Google Play&rsquo;s terms, including its refund rules.</li>
            <li>A purchase made on your phone with DashLink Wireless is switched on within 24 hours. Where we switch a plan on for you directly (for example where Google Play isn&rsquo;t available), we confirm the payment details with you before you pay, and switch it on within 24 hours of payment.</li>
            <li>A one-time purchase lasts for as long as we offer and support DashLink on that head unit.</li>
            <li>To restore a plan, connect the head unit to the internet and tap <b>Restore purchase</b>. After activation, your plan works offline.</li>
          </ul>`],
        ['safe-use', 'Using DashLink safely', `
          <p>You are responsible for driving safely and obeying traffic laws. Only interact with the screen when it is safe and legal to do so. Set up DashLink, themes and Racing sessions while parked.</p>
          <p>Speed warnings, speed readings and reminders are aids only. Always rely on your car&rsquo;s own instruments, road signs and your own judgement.</p>`],
        ['racing', 'DashLink Racing: closed courses only', `
          <p class="callout"><b>Use DashLink Racing only on closed courses</b>: track days, rallies on closed roads, recce, and private test venues where you have permission. Never use lap timing, performance tests, the road dyno or any other Racing feature on public roads.</p>
          <p>Motorsport is dangerous. You take part at your own risk and are responsible for following the venue&rsquo;s and organiser&rsquo;s rules. Check your event&rsquo;s rules on electronic devices before using DashLink at a rally, regularity (TSD) or other event.</p>
          <p>Pace notes are generated automatically from your recce and can be wrong. Always check and edit them before relying on them. The co-driver voice, coach calls and timing are aids, not a replacement for your own judgement or an official timing system.</p>
          <p>On first use, DashLink Racing asks you to accept its safety terms. Those terms form part of these terms.</p>`],
        ['estimates', 'Figures are estimates', `
          <p>Fuel used, fuel left, range, trip cost and dyno power are <b>estimates</b> based on GPS, the distance you drive and the details you enter. They are not measurements from your car&rsquo;s sensors and may be inaccurate. Lap and test times depend on GPS and sensor quality. Don&rsquo;t rely on them for anything where accuracy matters, such as official results, tax or legal records.</p>`],
        ['compatibility', 'Compatibility', `
          <p>DashLink is built for Android head units running Android 6.0 or newer, but there are thousands of different units and phones. We don&rsquo;t guarantee that every feature works on every device. Bluetooth music control depends on your head unit&rsquo;s Bluetooth system, and phone sensors need DashLink Wireless on a compatible phone. Use the free trial to check before you buy.</p>`],
        ['your-data', 'Your data', `
          <p>DashLink doesn&rsquo;t need an account. Trips, sessions and settings are stored on your head unit and, if you choose, your own phone. You are responsible for keeping copies of anything you want to keep, for example by exporting it. See the <a href="../privacy/">privacy policy</a>.</p>`],
        ['changes-app', 'Updates and changes', `
          <p>We may update DashLink, add or remove features, or change these terms. If we make an important change to these terms, we&rsquo;ll update the date at the top of this page and, where appropriate, tell you in the app. Continuing to use DashLink after a change means you accept the updated terms.</p>`],
        ['warranty', 'No warranty', `
          <p>To the extent the law allows, DashLink is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, including fitness for a particular purpose, accuracy, or uninterrupted, error-free operation.</p>`],
        ['liability', 'Limits on our liability', `
          <p>To the extent the law allows, we are not liable for any indirect or consequential loss, or for loss of data, or for any damage, injury, fine or penalty arising from how you use DashLink, including use while driving or in motorsport. Our total liability to you is limited to the amount you paid us for DashLink plans in the 12 months before the claim.</p>
          <p>Nothing in these terms limits rights you have under consumer protection laws that can&rsquo;t be excluded.</p>`],
        ['ending', 'Ending your use', `
          <p>You can stop using DashLink at any time by uninstalling it. If you have a subscription, cancel it in Google Play. We may suspend or end your licence if you seriously or repeatedly break these terms.</p>`],
        ['contact', 'Contact', `
          <p>Questions about these terms: ${mail}, or <a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>.</p>`],
      ] }),
    ].join('');
  },
};
export default page;
