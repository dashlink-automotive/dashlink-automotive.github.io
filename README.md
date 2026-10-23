# DashLink website

Marketing site for **DashLink** (head-unit app, works with Android Auto), **DashLink Racing** and the companion phone app **DashLink Wireless**. Static HTML on GitHub Pages at **https://dashlink-automotive.github.io/**.

The site has one landing page per campaign pillar, a stable anchor on every feature block, hero variants picked by `?c=` or `utm_campaign`, and Play Store buttons that carry the visitor's UTMs into the install referrer.

## Pages

| Path | Source | What |
|---|---|---|
| `/` | `src/pages/00-home.mjs` | "Try DashLink free" hero, pillar cards with plan badges, Android Auto showcase, DashLink Racing band, three ways to connect, plans table |
| `/android-auto/` | `10-android-auto.mjs` | USB, wireless, self mode, cheap units, wheel keys… |
| `/dashboard/` | `20-dashboard.mjs` | Dock mode, layouts, speedometers, car paint… |
| `/trips-fuel-maintenance/` | `30-trips.mjs` | Trip computer, logbook, fuel estimates, reminders |
| `/racing/` | `50-racing.mjs` | DashLink Racing overview (red theme) |
| `/racing/track-day/` · `/racing/rally/` · `/racing/performance/` | `51…53-racing-*.mjs` | Racing sub-pages for big campaigns |
| `/wireless-app/` | `60-wireless-app.mjs` | DashLink Wireless (its buttons go to the *phone* app) |
| `/plans/` | `70-plans.mjs` | Free / Drive / Pro: steps, plan cards, comparison table, how to buy |
| `/support/` | `80-support.mjs` | Compatibility, troubleshooting, contact |
| `/terms/` | `90-terms.mjs` | Terms of use (draft: have it legally reviewed) |
| `/download/`, `/premium/`, `/privacy/` | hand-written HTML | APK install guide (Google Ads final URL), activation, privacy |
| `/features/` | generated redirect | Old page; forwards `#dock`, `#care` and `#fuel` to the new pillars |
| `/pro/` | generated redirect | Old Pro page; forwards to `/plans/#pro`, keeping the query string (UTMs, `?c=`) and hash. GitHub Pages can't send a real 301 |

`docs/hero-variants.md` lists every page's anchors and hero variants. It is generated, so don't edit it by hand.

## Build

There are no dependencies; you need Node 18 or newer.

```bash
node src/build.mjs
```

This writes every `…/index.html`, `sitemap.xml`, `features/index.html` and `docs/hero-variants.md`. **Edit `src/`, never the generated HTML**: the next build overwrites it.

To preview locally (this binds to this machine only):

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

You can add these flags to any URL:
- `?forceplay` shows the Google Play buttons even from a country where Play is hidden.
- `?noplay` shows the APK fallback.
- `?ga_debug` sends GA4 hits to DebugView.

Share images live in `assets/images/og/<page>.jpg` (1200×630). To regenerate them, run `python3 src/og.py` (needs Pillow and macOS fonts). You can also drop in designed ones with the same names.

## How it fits together

```
src/
  config.mjs       app ids, nav, base URL, plans and the plans-table rows
  play-url.mjs     Play URL builder (build-time twin of the one in assets/site.js)
  components.mjs   hero, feature block, cards, gallery, showcase (sticky scroll), before/after slider,
                   steps, compare table, plans table, plan cards, pillar cards, FAQ, CTA bar,
                   Free/Drive/Pro/New badges, prose, layout
  mocks.mjs        HTML/SVG illustrations used until real screenshots arrive
  racing.mjs       DashLink Racing feature blocks shared by /racing/ and its sub-pages
  pages/*.mjs      one file per page = an arrangement of components
  build.mjs        renders everything
  og.py            share images
assets/
  site.css         all styles (racing pages add .t-racing, which swaps the accent to red)
  site.js          variants, Play links, region fallback, events, nav, FAQ, reveal
  analytics.js     GA4 + consent (unchanged rules, plus pillar/variant on page_view)
```

## Add a campaign variant (2 minutes)

1. Open the page's file, for example `src/pages/50-racing.mjs`.
2. Add an entry under `hero.variants`:

   ```js
   hillclimb: {
     match: ['hillclimb', 'hill-climb'],          // also matched inside utm_campaign
     eyebrow: 'Hillclimb',
     title: 'Every run, <span class="grad-text">timed to the line.</span>',
     sub: 'Standing starts, finish at the line, every run compared.',
     media: { mock: 'rally' },                    // optional: { img: 'v3/x.webp', w, h, alt }
   },
   ```

3. Run `node src/build.mjs` and test `/racing/?c=hillclimb` locally.
4. In the ad, use the final URL `https://dashlink-automotive.github.io/racing/?c=hillclimb`, or just put `hillclimb` in `utm_campaign`.

**Matching rules.** `?c=` is checked first and must equal a key or an alias. If it doesn't match, `utm_campaign` is checked: it's lower-cased with punctuation removed, and the first variant whose key or alias appears inside it wins. So `PK_Racing_Rally_Search` picks `rally`. With no match, the default hero shows. The swap happens before first paint, and the chosen variant is sent with `page_view` and every `cta_click`.

**Keep the trailing slash** in ad URLs (`/racing/`, not `/racing`). GitHub Pages redirects the bare form, which costs a round trip.

## Add a feature block

In any page's `body()`:

```js
feature({
  id: 'launch-control',              // stable anchor: /racing/#launch-control. Never rename it once ads use it.
  kicker: 'Launch',
  title: 'Launch detected to the millisecond.',
  body: 'Plain-English copy. Say "estimate" for fuel, range, trip cost and power.',
  bullets: ['Optional', 'tick list'],
  media: { img: 'v3/launch.webp', w: 2000, h: 1250, alt: '…' },  // or { mock: 'perf' }
  pro: true, isNew: true,            // Pro badge / New badge
  flip: true,                        // image on the left
}),
```

Use `cards({ items: [{ id, icon, title, body, pro, isNew }] })` for a grid of smaller features. Each card is an anchor too. The build fails if a page has duplicate ids.

## Play URL builder

Every Play button is `button({ play: 'headunit' | 'wireless' })`. The builder works like this:

```
https://play.google.com/store/apps/details?id=<app id>&referrer=<URL-encoded>
  utm_source=…&utm_medium=…&utm_campaign=…&utm_content=…&utm_term=<page key>
```

- The UTMs come from the landing URL and are kept in `sessionStorage` while the visitor clicks around the site.
- With no UTMs the referrer is `utm_source=website&utm_medium=organic&utm_campaign=<page key>&utm_term=<page key>`.
- The page key is the path with `/` turned into `-`, for example `racing-track-day`.
- The HTML ships with the organic URL so links work without JavaScript, and `site.js` rewrites them on load.

**Region fallback.** Where the apps aren't listed on Google Play (`NO_PLAY` in `assets/site.js`, currently PK, IL and DE, detected from the timezone), head-unit buttons become "Download DashLink" and point to `/download/` (the APK). DashLink Wireless buttons are hidden there.

## Analytics events

GA4 property `G-M4ZK8N420L`, all in `assets/analytics.js` and `assets/site.js`. No personal data is sent.

| Event | When | Parameters |
|---|---|---|
| `page_view` | every page | `pillar`, `hero_variant` |
| `cta_click` | any button or card marked `data-cta` | `pillar`, `page`, `anchor` (section id), `variant`, `cta` (e.g. `hero_primary`, `cta_bar`, `nav`), `destination` (`play_headunit`, `play_wireless`, `apk_page` or the link), `plan` (`free`, `drive`, `pro` or `none`, from `data-plan`) |
| `plans_view` | the `/plans/` page loads | `variant` (the `?c=` hero variant, or `default`) |
| `plan_card_click` | the Try free button on a plan card | `page`, `variant`, `plan` |
| `faq_open` | an FAQ answer is opened | `pillar`, `page`, `question` |
| `video_play` | the first play of any `<video>` | `pillar`, `page`, `video`, `anchor` |
| `play_store_click` | any link to Google Play | `app_id`, `link_location`, `link_text` |
| `apk_download` | the APK download on `/download/` | `file_name`, `app_version` |
| `download_cta_click` | a link to `/download/` | `link_location`, `link_text` |
| `premium_purchase_intent` | a plan purchase request (WhatsApp or email, from `/premium/`) | `method` |
| `whatsapp_click`, `email_click` | support contact | `link_location`, `link_text` |

In GA4 → Admin → Custom definitions, register `pillar`, `hero_variant`, `variant`, `anchor`, `cta`, `destination` and `plan` as event-scoped dimensions.

**Consent.** Visitors with a European timezone see a banner, and GA4 loads only after they accept. To ask everyone (non-essential off by default everywhere), set `CONSENT_EVERYWHERE = true` in `assets/analytics.js`.

## Brand and legal rules (from the website brief)

- Names: **DashLink**, **DashLink Wireless**, **DashLink Racing**. Plans: **DashLink Free**, **DashLink Drive**, **DashLink Pro**.
- Model: try free (every feature unlocked during the trial); afterwards DashLink stays free and Drive or Pro unlock more. Both plans are "pay once". Never say the app stops working after the trial.
- Primary CTA everywhere: "Try DashLink free" (Play link). Secondary: "See plans" (`/plans/`). Both are the hero and final-CTA defaults.
- Badges: Drive or Pro; features with no badge are free. The rows of the plans table live in `PLAN_ROWS` in `src/config.mjs`.
- Say "works with Android Auto" only. Use no Google logos, and keep the trademark line in the footer.
- Don't state the trial length, prices, or "lifetime / monthly".
- No third-party brands in copy or visuals: no car makers, no music or map app names.
- Racing is for closed courses only. Rally and regularity pages say "Check your event's rules on electronic devices."
- Say "estimate" for fuel, range, trip cost and dyno power.
- Items flagged *(confirm)* in the brief carry a **New** badge until the dev has verified them on hardware.

## Deploy

The local folder isn't a git repo. Copy these into the Pages repo (`dashlink-automotive/dashlink-automotive.github.io`) and push `main`:

```
index.html  android-auto/  dashboard/  trips-fuel-maintenance/  racing/  wireless-app/  plans/  pro/  support/  terms/
features/  download/  premium/  privacy/  assets/  src/  docs/  sitemap.xml  robots.txt  README.md  .nojekyll  .gitignore
```

Never upload `.claude/`.

## Support

- Email: dashlink.support@gmail.com
- WhatsApp: https://wa.me/923229914024
