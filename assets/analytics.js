/* ============================================================
   DashLink — Google Analytics 4 + consent
   One file, included on every page. On localhost nothing is sent
   (events are only logged to the console) unless ?ga_debug is in
   the URL, which sends them to GA4 DebugView.
   ============================================================ */
(function(){
  "use strict";

  var GA_ID = 'G-M4ZK8N420L'; // ← your GA4 Measurement ID (Admin → Data streams → Web)

  var CONSENT_KEY = 'dashlink_consent_v1';
  // Local previews don't send data (so testing doesn't pollute the reports)
  // unless the URL has ?ga_debug, which also routes hits to GA4 DebugView.
  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$|\.(localhost|test)$/.test(location.hostname);
  var debug = /[?&]ga_debug\b/.test(location.search);
  var configured = /^G-[A-Z0-9]{4,}$/.test(GA_ID) && GA_ID !== 'G-XXXXXXXXXX' && (!isLocal || debug);
  var loaded = false;

  /* ---------- consent ----------
     Google's EU user consent policy applies to the EEA, UK and Switzerland.
     We use the browser timezone as a stand-in for location (the same signal
     the rest of the site uses). It errs on the side of asking: anyone with a
     European timezone, or no timezone at all, gets the banner. */
  function needsConsent(){
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch(e) {}
    if(!tz) return true;
    return /^Europe\//.test(tz) ||
      /^(Atlantic\/(Canary|Madeira|Azores|Reykjavik|Faroe)|Asia\/(Nicosia|Famagusta)|Arctic\/Longyearbyen)$/.test(tz);
  }
  function getChoice(){ try { return localStorage.getItem(CONSENT_KEY); } catch(e) { return null; } }
  function setChoice(v){ try { localStorage.setItem(CONSENT_KEY, v); } catch(e) {} }

  /* ---------- GA4 ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }

  function load(){
    if(loaded) return;
    loaded = true;
    if(!configured) return;
    window.gtag = gtag;
    // Consent Mode v2 signals: Google Ads needs these to use the data for ads.
    gtag('consent', 'default', {
      ad_storage: 'granted', ad_user_data: 'granted',
      ad_personalization: 'granted', analytics_storage: 'granted'
    });
    gtag('js', new Date());
    gtag('config', GA_ID, debug ? { debug_mode: true } : {});
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }

  // Before consent (or without an ID) events are dropped, never queued.
  function track(name, params){
    if(!configured){ if(window.console) console.info('[analytics]', name, params || {}); return; }
    if(!loaded) return;
    if(debug){ params = params || {}; params.debug_mode = true; }
    gtag('event', name, params || {});
  }

  /* ---------- what counts as an action ----------
     Classified by where the link goes, so new buttons are tracked
     automatically as long as they point at the same places. */
  function locationOf(a){
    if(a.closest('nav, .nav')) return 'nav';
    if(a.closest('footer, .site-foot')) return 'footer';
    if(a.closest('.dl-fab')) return 'floating_button';
    var sec = a.parentElement && a.parentElement.closest('section[id]');
    return sec ? sec.id : 'page';
  }
  function textOf(a){
    return (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  }
  function classify(a){
    var href = a.getAttribute('href') || '';
    var url;
    try { url = new URL(href, location.href); } catch(e) { return null; }
    var full = url.href;

    if(/github\.com\/dashlink-automotive\/.+\/releases|\.apk(\?|$)/i.test(full)){
      var v = document.getElementById('apk-version');
      return ['apk_download', { file_name: url.pathname.split('/').pop(), app_version: v ? v.textContent.replace(/^Version\s*/i, '') : undefined }];
    }
    if(/(^|\.)wa\.me$/i.test(url.hostname) || /whatsapp\.com\/send/i.test(full)){
      return /buy(%20|\s|\+)premium/i.test(full) ? ['premium_purchase_intent', { method: 'whatsapp' }] : ['whatsapp_click', {}];
    }
    if(url.protocol === 'mailto:'){
      return /premium/i.test(full) ? ['premium_purchase_intent', { method: 'email' }] : ['email_click', {}];
    }
    if(/play\.google\.com$/i.test(url.hostname)){
      return ['play_store_click', { app_id: url.searchParams.get('id') || undefined }];
    }
    if(url.origin === location.origin && /\/download\/?$/.test(url.pathname) && !/\/download\/?$/.test(location.pathname)){
      return ['download_cta_click', {}];
    }
    return null;
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if(!a || a.hasAttribute('data-cookie-settings')) return;
    var hit = classify(a);
    if(!hit) return;
    var p = hit[1];
    p.link_location = locationOf(a);
    p.link_text = textOf(a);
    track(hit[0], p);
  }, true);

  /* ---------- consent banner ---------- */
  var CSS = '' +
    '.dl-consent{position:fixed;left:16px;bottom:16px;z-index:200;max-width:420px;padding:18px 18px 16px;border-radius:18px;' +
    'background:rgba(14,16,21,.94);border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 70px -20px #000;color:#f4f6fb;' +
    'font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Inter,system-ui,sans-serif;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);' +
    'transform:translateY(12px);opacity:0;transition:opacity .35s,transform .35s}' +
    '.dl-consent.on{transform:none;opacity:1}' +
    '.dl-consent h2{font-size:15px;font-weight:650;margin:0 0 6px}' +
    '.dl-consent p{margin:0;color:#a3a9b8}' +
    '.dl-consent a{color:#5db6ff;text-decoration:underline}' +
    '.dl-consent .row{display:flex;gap:8px;margin-top:14px}' +
    '.dl-consent button{flex:1;font:inherit;font-weight:650;padding:10px 14px;border-radius:100px;cursor:pointer;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#f4f6fb}' +
    '.dl-consent button:hover{background:rgba(255,255,255,.11)}' +
    '.dl-consent button:focus-visible{outline:2px solid #5db6ff;outline-offset:2px}' +
    '@media(max-width:520px){.dl-consent{left:12px;right:12px;bottom:12px;max-width:none}}' +
    '@media(prefers-reduced-motion:reduce){.dl-consent{transition:none}}';

  function privacyHref(){
    var l = document.querySelector('a[href$="privacy/"]');
    return l ? l.getAttribute('href') : '/privacy/';
  }

  var banner = null;
  function openBanner(){
    if(banner) return;
    if(!document.getElementById('dl-consent-css')){
      var st = document.createElement('style'); st.id = 'dl-consent-css'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    banner = document.createElement('div');
    banner.className = 'dl-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'dl-consent-title');
    banner.innerHTML =
      '<h2 id="dl-consent-title">Cookies</h2>' +
      '<p>We\'d like to use Google Analytics cookies to see how visitors use this site and to measure our Google ads. ' +
      'Nothing is set unless you accept. <a href="' + privacyHref() + '#cookies">Privacy policy</a></p>' +
      '<div class="row"><button type="button" data-v="denied">Decline</button><button type="button" data-v="granted">Accept</button></div>';
    banner.addEventListener('click', function(e){
      var v = e.target.getAttribute && e.target.getAttribute('data-v');
      if(!v) return;
      var changedToDenied = v === 'denied' && loaded;
      setChoice(v);
      closeBanner();
      if(v === 'granted') load();
      // Already-loaded tags can't be unloaded; a reload starts clean without them.
      if(changedToDenied) location.reload();
    });
    document.body.appendChild(banner);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ banner && banner.classList.add('on'); }); });
  }
  function closeBanner(){
    if(!banner) return;
    var b = banner; banner = null;
    b.classList.remove('on');
    setTimeout(function(){ b.remove(); }, 400);
  }

  // Any element with data-cookie-settings reopens the banner (privacy page, footers).
  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-cookie-settings]');
    if(!t) return;
    e.preventDefault();
    openBanner();
  });

  /* ---------- start ---------- */
  var ask = needsConsent();
  var choice = getChoice();
  if(!ask || choice === 'granted'){
    load();
  } else if(choice !== 'denied'){
    if(document.body) openBanner();
    else document.addEventListener('DOMContentLoaded', openBanner);
  }

  window.dashlinkAnalytics = { track: track, openConsent: openBanner };
})();
