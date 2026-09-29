# DashLink — website

The marketing site for DashLink, the app that turns an Android panel in your car
into an Android Auto receiver.

Plain static HTML. No build step, no framework, no server. Hosted free on
GitHub Pages.

## Structure

```
index.html            home
download/index.html   install guide — APK + Google Play, USB steps, troubleshooting
premium/index.html    how to unlock Premium after the free trial
privacy/index.html    privacy policy
assets/images/        screenshots and photos
CNAME                 custom domain for GitHub Pages
.nojekyll             stops GitHub running Jekyll over the files
```

Each page is self-contained: its CSS and JS are inline. That means one request
per page and nothing to build — edit the HTML, commit, done.

## Editing

Open the `.html` file and edit it. Everything is ordinary HTML.

The values most likely to need changing:

| What | Where |
|---|---|
| APK download link | `download/index.html` — search `releases/download` |
| App version / size | `download/index.html` — the `.meta` block |
| Google Play links | `download/index.html`, `premium/index.html` — search `play.google.com` |
| WhatsApp number | all pages — search `wa.me/` |
| Support email | all pages — search `dashlink.support` |
| Trial length | all pages — search `7 day` |

There is no database and no admin screen. That is deliberate: the site's only
job is to get people to the app and into WhatsApp.

## Hosting the APK

The `.apk` is **not** in this repo. It lives in GitHub **Releases** on the app
repo, and the download button links to it. Releases give free CDN bandwidth and
proper version history, and keep this repo small.

Important: publish the **Play-signed universal APK** exported from
Play Console → App Bundle Explorer → Downloads. An APK signed with your local
upload key has a different signature from the Play build, and users cannot
install one over the other.

## Deploying

Push to `main`. GitHub Pages rebuilds in under a minute.

First-time setup:

1. **Settings → Pages** → Source: *Deploy from a branch* → `main` / `/ (root)`
2. Wait a minute, then open the URL Pages shows you

If the repo is named `<username>.github.io` the site serves at the root of that
address; any other repo name puts it in a `/<repo-name>/` subfolder.

There is **no custom domain yet** — and deliberately no `CNAME` file. Adding one
before the DNS exists makes Pages redirect to a dead address.

### Adding a custom domain later

1. Add a file named `CNAME` at the repo root containing just the domain
2. **Settings → Pages → Custom domain** → enter the same domain → Save
3. DNS at the registrar — apex `A` records to GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   plus a `CNAME` for `www` → `<user>.github.io`
4. Tick **Enforce HTTPS** once the certificate is issued
5. Search the HTML for `TODO` — `download/index.html` has one line telling
   users the address to type into their panel's browser

## Region handling

Two things vary by country, both decided in the browser:

- **Google Play badges** are hidden where the app isn't listed (IL, PK, DE) —
  a Play link there is a dead end.
- **The purchase route** on `premium/` switches between the Play Billing flow
  and manual activation. Google Play Billing only works in an app installed
  from Play, so Pakistan — where DashLink Wireless isn't available — gets the
  manual device-ID route instead.

Country is inferred from the browser's timezone, falling back to its locale.
Search `BLOCKED` in the page JS to change the lists.
