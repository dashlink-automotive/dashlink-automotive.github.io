/* ============================================================
   DashLink — behaviour shared by every generated page.
   Loaded after analytics.js (both `defer`).
   ============================================================ */
(function () {
  'use strict';

  window.dashlinkReady = true;
  var html = document.documentElement;
  var PAGE = html.getAttribute('data-page') || 'home';
  var PILLAR = html.getAttribute('data-pillar') || PAGE;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function track(name, params) {
    var a = window.dashlinkAnalytics;
    if (a && a.track) a.track(name, params);
  }
  function variant() { return html.getAttribute('data-variant') || 'default'; }

  /* ---------- Play URL builder ----------
     Keep in step with src/play-url.mjs and src/config.mjs. */
  var APPS = { headunit: 'com.auto.dashlink.headunit', wireless: 'com.auto.dashlinkwireless' };
  // Countries where the apps aren't listed on Google Play. Head-unit buttons
  // fall back to the APK download page there; DashLink Wireless buttons hide.
  var NO_PLAY = ['PK', 'IL', 'DE'];
  var UTM_KEY = 'dashlink_utm_v1';

  function readUtm() {
    var q = new URLSearchParams(location.search);
    var u = { source: q.get('utm_source'), medium: q.get('utm_medium'), campaign: q.get('utm_campaign'), content: q.get('utm_content') };
    if (u.source || u.medium || u.campaign || u.content) {
      try { sessionStorage.setItem(UTM_KEY, JSON.stringify(u)); } catch (e) {}
      return u;
    }
    // came in on an ad, then clicked to another page: keep the original attribution
    try { return JSON.parse(sessionStorage.getItem(UTM_KEY) || 'null'); } catch (e) { return null; }
  }
  function referrer(page, u) {
    var p = u ? [['utm_source', u.source || 'website'], ['utm_medium', u.medium || 'referral'], ['utm_campaign', u.campaign || page], ['utm_content', u.content]]
              : [['utm_source', 'website'], ['utm_medium', 'organic'], ['utm_campaign', page]];
    p.push(['utm_term', page]);
    return p.filter(function (x) { return x[1]; }).map(function (x) { return x[0] + '=' + encodeURIComponent(x[1]); }).join('&');
  }
  function playUrl(app, page, u) {
    return 'https://play.google.com/store/apps/details?id=' + APPS[app] + '&referrer=' + encodeURIComponent(referrer(page, u));
  }
  window.dashlinkPlayUrl = playUrl;

  function country() {
    var TZ = { 'Asia/Karachi': 'PK', 'Europe/Berlin': 'DE', 'Europe/Busingen': 'DE', 'Asia/Jerusalem': 'IL', 'Asia/Tel_Aviv': 'IL' };
    var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (TZ[tz]) return TZ[tz];
    var l = (navigator.language || '').toUpperCase().split('-')[1] || '';
    return /^[A-Z]{2}$/.test(l) ? l : '';
  }

  var utm = readUtm();
  // ?noplay / ?forceplay let you preview either behaviour from anywhere
  var noPlay = /[?&]forceplay\b/.test(location.search) ? false : (NO_PLAY.indexOf(country()) !== -1 || /[?&]noplay\b/.test(location.search));
  document.querySelectorAll('a[data-play]').forEach(function (a) {
    if (noPlay) {
      var fb = a.getAttribute('data-fallback');
      if (fb) {
        a.href = fb; a.removeAttribute('target'); a.removeAttribute('rel');
        var l = a.querySelector('[data-label]'); if (l) l.textContent = a.getAttribute('data-fallback-label');
        a.setAttribute('data-play-fallback', '1');
      } else if (a.hasAttribute('data-fallback-hide')) {
        a.hidden = true; a.style.display = 'none';
      }
      return;
    }
    a.href = playUrl(a.getAttribute('data-play'), PAGE, utm);
  });

  /* ---------- cta_click ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-cta]');
    if (!a) return;
    var sec = a.closest('[id]');
    var dest = a.getAttribute('data-play') ? (a.getAttribute('data-play-fallback') ? 'apk_page' : 'play_' + a.getAttribute('data-play')) : (a.getAttribute('href') || '');
    var plan = a.getAttribute('data-plan') || 'none';
    track('cta_click', { pillar: PILLAR, page: PAGE, anchor: sec ? sec.id : 'page', variant: variant(), cta: a.getAttribute('data-cta'), destination: dest.slice(0, 100), plan: plan });
    if (/^plan_card_/.test(a.getAttribute('data-cta'))) track('plan_card_click', { page: PAGE, variant: variant(), plan: plan });
  }, true);

  /* ---------- plans_view: the /plans/ page, with the hero variant (?c=) it showed ---------- */
  if (PAGE === 'plans') track('plans_view', { variant: variant() });

  /* ---------- nav ---------- */
  var nav = document.getElementById('nav');
  var bar = document.getElementById('ctaBar');
  var fab = document.querySelector('.wa-fab');
  var hero = document.getElementById('hero');
  var heroEnd = 400, navTick = false, lastPast = null;
  function measureHero() { heroEnd = hero ? hero.offsetTop + hero.offsetHeight * 0.7 : 400; }
  function onScroll() {
    navTick = false;
    var y = window.scrollY, past = y > heroEnd;
    if (nav) nav.classList.toggle('scrolled', y > 30);
    if (past === lastPast) return; lastPast = past;
    if (bar) { bar.classList.toggle('on', past); bar.setAttribute('aria-hidden', past ? 'false' : 'true'); }
    if (fab) fab.classList.toggle('on', past);
  }
  measureHero(); onScroll();
  window.addEventListener('scroll', function () { if (!navTick) { navTick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', measureHero, { passive: true });
  window.addEventListener('load', measureHero);

  /* ---------- pause looping animations in sections that are off screen ---------- */
  if ('IntersectionObserver' in window) {
    var offObs = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('offview', !e.isIntersecting); }); }, { rootMargin: '150px 0px' });
    document.querySelectorAll('main > section, main > div, main > .fb').forEach(function (el) { offObs.observe(el); });
  }

  var menuBtn = document.querySelector('.menu-btn');
  var sheet = document.getElementById('sheet');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    sheet.hidden = !open;
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  }
  if (menuBtn && sheet) {
    menuBtn.addEventListener('click', function () { setMenu(sheet.hidden); });
    sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) { setMenu(false); menuBtn.focus(); } });
  }

  /* ---------- deep links (/racing/#dyno) ----------
     Ads land on #anchors. Browsers don't always jump there when images above
     are still loading, so do it once the page has settled. */
  function toHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var el = id && document.getElementById(id);
    if (!el || id === 'top') return;
    el.querySelectorAll('.reveal, .reveal-scale').forEach(function (r) { r.classList.add('in'); });
    // instant jump: CSS smooth scrolling would animate (and can stall in background tabs)
    html.style.scrollBehavior = 'auto';
    el.scrollIntoView({ block: 'start' });
    html.style.scrollBehavior = '';
  }
  if (location.hash) {
    toHash();
    window.addEventListener('load', function () { setTimeout(toHash, 50); });
  }

  /* ---------- reveal ---------- */
  var rv = document.querySelectorAll('.reveal, .reveal-scale');
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in'); else io.observe(el);
    });
  }

  /* ---------- anchor bar: highlight the section in view ---------- */
  var chips = document.querySelectorAll('.anchors a');
  if (chips.length && 'IntersectionObserver' in window) {
    var byId = {};
    chips.forEach(function (c) { byId[c.getAttribute('href').slice(1)] = c; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        chips.forEach(function (c) { c.classList.remove('on'); });
        var c = byId[e.target.id];
        if (c) { c.classList.add('on'); var p = c.parentElement; p.scrollTo({ left: c.offsetLeft - p.clientWidth / 2 + c.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' }); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.qa button').forEach(function (b) {
    b.addEventListener('click', function () {
      var qa = b.parentElement, ans = qa.querySelector('.ans');
      var open = qa.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
      if (open) track('faq_open', { pillar: PILLAR, page: PAGE, question: b.textContent.trim().slice(0, 100) });
    });
  });

  /* ---------- video_play (first play of each video) ---------- */
  document.querySelectorAll('video').forEach(function (v) {
    var sent = false;
    v.addEventListener('play', function () {
      if (sent) return; sent = true;
      track('video_play', { pillar: PILLAR, page: PAGE, video: (v.currentSrc || v.src || '').split('/').pop(), anchor: (v.closest('[id]') || {}).id || 'page' });
    });
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); }
  });

  /* ---------- showcase: swap screens as the sticky unit scrolls past ---------- */
  document.querySelectorAll('.showcase').forEach(function (sc) {
    var track = sc.querySelector('.sc-track');
    var n = parseInt(sc.getAttribute('data-scenes'), 10) || 1;
    var caps = sc.querySelectorAll('.cap'), scenes = sc.querySelectorAll('.sc-scene'), dots = sc.querySelectorAll('.sc-rail button');
    var cur = -1;
    function activate(i) {
      if (i === cur) return; cur = i;
      [caps, scenes, dots].forEach(function (list) { list.forEach(function (el, k) { el.classList.toggle('on', k === i); }); });
      scenes.forEach(function (el, k) {
        var v = el.querySelector('video'); if (!v) return;
        if (k === i && !reduce) { if (v.readyState === 0) v.load(); var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
      });
    }
    var ticking = false;
    function update() {
      ticking = false;
      var travel = track.offsetHeight - window.innerHeight;
      var p = travel > 0 ? Math.max(0, Math.min(1, -track.getBoundingClientRect().top / travel)) : 0;
      activate(Math.round(p * (n - 1)));
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        var travel = track.offsetHeight - window.innerHeight;
        window.scrollTo({ top: track.getBoundingClientRect().top + window.scrollY + travel * (+d.getAttribute('data-go')) / Math.max(1, n - 1), behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  });

  /* ---------- before / after slider ---------- */
  document.querySelectorAll('.ba').forEach(function (ba) {
    var after = ba.querySelector('.ba-after'), handle = ba.querySelector('.ba-handle'), drag = false;
    function set(pct) {
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = 'inset(0 0 0 ' + pct + '%)'; handle.style.left = pct + '%';
      ba.setAttribute('aria-valuenow', Math.round(pct));
    }
    function at(x) { var r = ba.getBoundingClientRect(); set((x - r.left) / r.width * 100); }
    ba.addEventListener('pointerdown', function (e) { drag = true; at(e.clientX); });
    window.addEventListener('pointermove', function (e) { if (drag) at(e.clientX); }, { passive: true });
    window.addEventListener('pointerup', function () { drag = false; });
    ba.addEventListener('keydown', function (e) {
      var v = +ba.getAttribute('aria-valuenow');
      if (e.key === 'ArrowLeft') set(v - 4); else if (e.key === 'ArrowRight') set(v + 4); else return;
      e.preventDefault();
    });
  });

  /* ---------- layout explorer ---------- */
  document.querySelectorAll('[data-explorer]').forEach(function (xp) {
    var tabs = [].slice.call(xp.querySelectorAll('.xp-tab')), shots = xp.querySelectorAll('.xp-shot');
    var cap = document.createElement('p'); cap.className = 'xp-caption'; xp.appendChild(cap);
    var i = 0, timer = null, DUR = 5000, stopped = reduce;
    xp.style.setProperty('--xp-dur', DUR + 'ms');
    function show(k) {
      i = k;
      tabs.forEach(function (t, n) { t.classList.toggle('on', n === k); t.setAttribute('aria-selected', n === k ? 'true' : 'false'); });
      shots.forEach(function (s, n) { s.classList.toggle('on', n === k); if (n === k) s.loading = 'eager'; });
      var key = tabs[k].getAttribute('data-xp');
      xp.querySelectorAll('.xp-spots').forEach(function (l) { l.classList.toggle('on', l.getAttribute('data-xp') === key); });
      xp.querySelectorAll('[data-xp-lift]').forEach(function (l) { l.classList.toggle('on', l.getAttribute('data-xp-lift') === key); });
      cap.textContent = tabs[k].querySelector('small').textContent;
      var row = tabs[k].parentElement;
      if (row.scrollWidth > row.clientWidth) {
        var tr = tabs[k].getBoundingClientRect(), rr = row.getBoundingClientRect();
        row.scrollTo({ left: row.scrollLeft + (tr.left - rr.left) - rr.width / 2 + tr.width / 2, behavior: reduce ? 'auto' : 'smooth' });
      }
      // restart the progress bar animation
      var bar = tabs[k].querySelector('.xp-bar'); if (bar) { bar.style.display = 'none'; void bar.offsetWidth; bar.style.display = ''; }
    }
    function play() { if (stopped || timer) return; xp.classList.add('auto'); timer = setInterval(function () { show((i + 1) % tabs.length); }, DUR); }
    function pause() { clearInterval(timer); timer = null; xp.classList.remove('auto'); }
    tabs.forEach(function (t, n) {
      t.addEventListener('click', function () {
        stopped = true; pause(); show(n);
        track('cta_click', { pillar: PILLAR, page: PAGE, anchor: xp.closest('[id]').id, variant: variant(), cta: 'layout_' + t.getAttribute('data-xp'), destination: 'in_page' });
      });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return; e.preventDefault(); var k = (n + d + tabs.length) % tabs.length; tabs[k].focus(); tabs[k].click();
      });
    });
    xp.addEventListener('xp:stop', function () { stopped = true; pause(); });
    show(0);
    // preload the rest once the explorer is near, and only auto-play while it's on screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { shots.forEach(function (s) { s.loading = 'eager'; }); play(); } else pause();
        });
      }, { threshold: 0.35 }).observe(xp);
    }
  });

  /* ---------- Corsa: faces, details, macro, loupe ---------- */
  document.querySelectorAll('[data-corsa]').forEach(function (cs) {
    var Z = parseFloat(cs.getAttribute('data-zoom')) || 3.2;
    var details = JSON.parse(cs.querySelector('[data-cs-details]').textContent);
    var spots = cs.querySelectorAll('.cs-spot'), faces = cs.querySelectorAll('.cs-face'), faceBtns = cs.querySelectorAll('.cs-faces button');
    var macro = cs.querySelector('.cs-macro-img'), loupe = cs.querySelector('.cs-loupe'), dial = cs.querySelector('.cs-dial');
    var nEl = cs.querySelector('[data-cs-n]'), tEl = cs.querySelector('[data-cs-title]'), pEl = cs.querySelector('[data-cs-text]'), fEl = cs.querySelector('[data-cs-face]');
    var cur = 0, src = faceBtns[0].getAttribute('data-src'), timer = null, stopped = reduce;
    function pos(p) { return Math.max(0, Math.min(100, ((p / 100) * Z - 0.5) / (Z - 1) * 100)) + '%'; }
    function detail(i) {
      cur = (i + details.length) % details.length;
      var d = details[cur];
      spots.forEach(function (s, k) { s.classList.toggle('on', k === cur); });
      macro.style.backgroundPosition = pos(d.x) + ' ' + pos(d.y);
      nEl.textContent = (cur < 9 ? '0' : '') + (cur + 1); tEl.innerHTML = d.title; pEl.innerHTML = d.text;
    }
    function face(btn) {
      var key = btn.getAttribute('data-face'); src = btn.getAttribute('data-src');
      faceBtns.forEach(function (b) { b.setAttribute('aria-checked', b === btn ? 'true' : 'false'); });
      faces.forEach(function (f) { var on = f.getAttribute('data-face') === key; f.classList.toggle('on', on); f.alt = on ? 'The Corsa speedometer with a ' + btn.getAttribute('data-name').toLowerCase() + ' face' : ''; });
      macro.style.backgroundImage = loupe.style.backgroundImage = 'url("' + src + '")';
      fEl.textContent = btn.getAttribute('data-name');
      track('cta_click', { pillar: PILLAR, page: PAGE, anchor: cs.closest('[id]').id, variant: variant(), cta: 'dial_face_' + key, destination: 'in_page' });
    }
    function stop() { stopped = true; clearInterval(timer); timer = null; }
    spots.forEach(function (s) { s.addEventListener('click', function () { stop(); detail(+s.getAttribute('data-i')); }); });
    cs.querySelector('[data-cs-prev]').addEventListener('click', function () { stop(); detail(cur - 1); });
    cs.querySelector('[data-cs-next]').addEventListener('click', function () { stop(); detail(cur + 1); });
    faceBtns.forEach(function (b, n) {
      b.addEventListener('click', function () { face(b); });
      b.addEventListener('keydown', function (e) {
        var d = /Right|Down/.test(e.key) ? 1 : /Left|Up/.test(e.key) ? -1 : 0;
        if (!d) return; e.preventDefault(); var k = (n + d + faceBtns.length) % faceBtns.length; faceBtns[k].focus(); face(faceBtns[k]);
      });
    });
    // warm the other faces once the visitor is near
    cs.addEventListener('pointerenter', function () { faces.forEach(function (f) { f.loading = 'eager'; }); }, { once: true });
    // loupe: fine pointers only
    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
      loupe.style.backgroundImage = 'url("' + src + '")';
      dial.addEventListener('pointermove', function (e) {
        if (e.target.closest('.cs-spot')) { cs.classList.remove('loupe-on'); return; }
        var r = dial.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, L = 2.6;
        cs.classList.add('loupe-on');
        loupe.style.left = x + 'px'; loupe.style.top = y + 'px';
        loupe.style.backgroundSize = (r.width * L) + 'px ' + (r.height * L) + 'px';
        loupe.style.backgroundPosition = (90 - x * L) + 'px ' + (90 - y * L) + 'px';
      });
      dial.addEventListener('pointerleave', function () { cs.classList.remove('loupe-on'); });
    }
    // walk through the details on its own while in view, until touched
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !stopped && !timer) timer = setInterval(function () { detail(cur + 1); }, 4200);
          else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
        });
      }, { threshold: 0.4 }).observe(cs);
    }
  });

  /* ---------- explorer detail spots ---------- */
  document.querySelectorAll('[data-explorer]').forEach(function (xp) {
    var tog = xp.querySelector('.xp-toggle');
    if (tog) tog.addEventListener('click', function () {
      var on = tog.getAttribute('aria-pressed') !== 'true';
      tog.setAttribute('aria-pressed', on ? 'true' : 'false'); xp.classList.toggle('no-spots', !on);
    });
    xp.querySelectorAll('.xp-spot').forEach(function (sp) {
      sp.addEventListener('click', function () {
        var was = sp.classList.contains('open');
        xp.querySelectorAll('.xp-spot.open').forEach(function (o) { o.classList.remove('open'); });
        if (!was) sp.classList.add('open');
        xp.dispatchEvent(new CustomEvent('xp:stop'));
      });
    });
  });

  /* ---------- detail points on single screenshots ---------- */
  document.querySelectorAll('[data-spotted]').forEach(function (box) {
    box.querySelectorAll('.xp-spot').forEach(function (sp) {
      sp.addEventListener('click', function () {
        var was = sp.classList.contains('open');
        box.querySelectorAll('.xp-spot.open').forEach(function (o) { o.classList.remove('open'); });
        if (!was) sp.classList.add('open');
      });
    });
  });

  /* ---------- live modes: Sport / Track / Race ---------- */
  document.querySelectorAll('[data-modes]').forEach(function (box) {
    var btns = [].slice.call(box.querySelectorAll('.md-seg button')), shots = box.querySelectorAll('.md-shot'), desc = box.querySelector('.md-desc');
    var i = 0, timer = null, stopped = reduce;
    function show(k) {
      i = k; var b = btns[k];
      btns.forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
      shots.forEach(function (s) { s.classList.toggle('on', s.getAttribute('data-mode') === b.getAttribute('data-mode')); });
      box.style.setProperty('--mc', b.getAttribute('data-color'));
      desc.textContent = b.getAttribute('data-desc');
    }
    btns.forEach(function (b, k) { b.addEventListener('click', function () { stopped = true; clearInterval(timer); timer = null; show(k); }); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { shots.forEach(function (s) { s.loading = 'eager'; }); if (!stopped && !timer) timer = setInterval(function () { show((i + 1) % btns.length); }, 4200); }
          else if (timer) { clearInterval(timer); timer = null; }
        });
      }, { threshold: 0.4 }).observe(box);
    }
  });

  /* ---------- recce call pad: tap a call, see it added ---------- */
  document.querySelectorAll('[data-calls]').forEach(function (pad) {
    var toast = pad.querySelector('.rc-toast'), t = null;
    pad.querySelectorAll('.rc-grid button').forEach(function (b) {
      b.addEventListener('click', function () {
        toast.textContent = b.textContent + ' added';
        toast.classList.remove('on'); void toast.offsetWidth; toast.classList.add('on');
        b.classList.add('hit'); setTimeout(function () { b.classList.remove('hit'); }, 180);
        clearTimeout(t); t = setTimeout(function () { toast.classList.remove('on'); }, 1600);
      });
    });
  });

  /* ---------- speed warning demo ---------- */
  document.querySelectorAll('[data-sw-demo]').forEach(function (d) {
    var range = d.querySelector('[data-swd-range]'), speedEl = d.querySelector('[data-swd-speed]'), limEl = d.querySelector('[data-swd-limit]');
    var badge = d.querySelector('[data-swd-badge]'), status = d.querySelector('[data-swd-status]'), chips = d.querySelectorAll('.swd-chips button');
    var limit = +d.getAttribute('data-limit');
    function update() {
      var v = +range.value, over = v > limit;
      speedEl.textContent = v; limEl.textContent = limit;
      d.classList.toggle('over', over);
      badge.textContent = '+' + (v - limit) + ' km/h';
      status.textContent = over ? 'Over your warning speed. The badge turns red and the chime plays, at most every 30 seconds.' : 'Within your warning speed. Nothing on screen but your drive.';
    }
    range.addEventListener('input', update);
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-checked', x === c ? 'true' : 'false'); });
        limit = +c.getAttribute('data-v'); update();
      });
    });
    update();
  });

  /* ---------- Browser view: link setup steps to the pins on the phone card ---------- */
  document.querySelectorAll('.cn').forEach(function (cn) {
    var steps = cn.querySelectorAll('.cn-steps li'), pins = cn.querySelectorAll('.cn-pin');
    function on(i) {
      steps.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      pins.forEach(function (p, k) { p.classList.toggle('on', k === i); });
    }
    steps.forEach(function (s, i) {
      s.addEventListener('mouseenter', function () { on(i); });
      s.addEventListener('focus', function () { on(i); });
      s.addEventListener('click', function () { on(i); });
    });
    on(0);
  });

  /* ---------- phone sensors: car GPS alone vs car + phone, through one corner ---------- */
  document.querySelectorAll('[data-ps-demo]').forEach(function (d) {
    var NS = 'http://www.w3.org/2000/svg';
    var path = d.querySelector('[data-psd-path]'), rec = d.querySelector('[data-psd-rec]'), dots = d.querySelector('[data-psd-dots]'), car = d.querySelector('[data-psd-car]');
    var range = d.querySelector('[data-psd-range]'), btns = d.querySelectorAll('[data-hz]');
    var out = {}; ['v', 'hz', 'gap', 'n', 'g'].forEach(function (k) { out[k] = d.querySelector('[data-psd-' + k + ']'); });
    var L = path.getTotalLength(), M = +d.getAttribute('data-metres') || 220;
    var hz = 1, v = 120, samples = [], shown = 0, t0 = 0, raf = 0, live = false;
    function build() {
      var fix = v / 3.6, step = fix / hz, phase = fix * 0.62; // first GPS fix lands mid-gap, the same for both modes
      dots.textContent = ''; samples = []; shown = 0; t0 = 0;
      for (var k = -Math.floor(phase / step); ; k++) {
        var m = phase + k * step; if (m > M) break; if (m < 0) continue;
        var p = path.getPointAtLength(m / M * L), isFix = ((k % hz) + hz) % hz === 0;
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('r', isFix ? 6 : 2.4);
        c.setAttribute('class', isFix ? 'psd-fix' : 'psd-fill');
        samples.push({ m: m, pt: p.x.toFixed(1) + ',' + p.y.toFixed(1), el: c });
      }
      // fixes on top of the phone's in-between readings
      samples.forEach(function (s) { if (s.el.getAttribute('class') === 'psd-fill') dots.appendChild(s.el); });
      samples.forEach(function (s) { if (s.el.getAttribute('class') === 'psd-fix') dots.appendChild(s.el); });
      out.v.textContent = v; out.hz.textContent = hz;
      out.gap.textContent = (step >= 10 ? Math.round(step) : step.toFixed(1)) + ' m';
      out.n.textContent = samples.length;
      out.g.textContent = hz > 1 ? 'Measured by the phone' : 'Estimated from GPS';
      d.classList.toggle('hz25', hz > 1);
      if (reduce || !live) draw(M);
    }
    function draw(cur) {
      var n = 0; while (n < samples.length && samples[n].m <= cur) n++;
      if (n !== shown) {
        samples.forEach(function (s, i) { s.el.classList.toggle('on', i < n); });
        rec.setAttribute('points', samples.slice(0, n).map(function (s) { return s.pt; }).join(' '));
        shown = n;
      }
      if (reduce || cur >= M) { car.setAttribute('cx', -20); car.setAttribute('cy', -20); return; }
      var p = path.getPointAtLength(cur / M * L); car.setAttribute('cx', p.x); car.setAttribute('cy', p.y);
    }
    function frame(ts) {
      if (!t0) t0 = ts;
      var ms = v / 3.6 * 1.6, cycle = M + ms * 1.4, dist = ((ts - t0) / 1000 * ms) % cycle;
      draw(Math.min(dist, M));
      raf = requestAnimationFrame(frame);
    }
    function run(on) {
      live = on && !reduce; cancelAnimationFrame(raf);
      if (live) { t0 = 0; shown = -1; raf = requestAnimationFrame(frame); } else draw(M);
    }
    range.addEventListener('input', function () { v = +range.value; build(); });
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        hz = +b.getAttribute('data-hz'); build();
        track('sensor_demo', { variant: hz > 1 ? 'phone' : 'car' });
      });
    });
    build();
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { run(es[0].isIntersecting); }, { threshold: 0.2 }).observe(d);
  });

  /* ---------- home: try the DashLink home screen ---------- */
  document.querySelectorAll('[data-connect]').forEach(function (cd) {
    var M = JSON.parse(cd.querySelector('[data-cd-modes]').textContent), cur = null, t = 0;
    var VIA = { usb: 'Connecting over USB&hellip;', wireless: 'Connecting over Wi-Fi&hellip;', self: 'Starting Android Auto&hellip;' };
    function set(k, user) {
      cur = k;
      cd.querySelectorAll('[data-mode]').forEach(function (b) { b.setAttribute('aria-checked', b.getAttribute('data-mode') === k ? 'true' : 'false'); });
      ['status', 'title', 'text', 'start'].forEach(function (f) { cd.querySelector('[data-cd="' + f + '"]').innerHTML = M[k][f]; });
      cd.querySelectorAll('[data-cd-glyph]').forEach(function (g) { g.classList.toggle('on', g.getAttribute('data-cd-glyph') === k); });
      back();
      if (user) track('cta_click', { pillar: PILLAR, page: PAGE, anchor: cd.closest('[id]').id, variant: variant(), cta: 'connect_mode_' + k, destination: 'in_page' });
    }
    function back() { clearTimeout(t); cd.classList.remove('aa-on', 'connecting'); }
    cd.querySelectorAll('[data-mode]').forEach(function (b) { b.addEventListener('click', function () { set(b.getAttribute('data-mode'), true); }); });
    cd.querySelector('[data-cd-start]').addEventListener('click', function () {
      cd.querySelector('[data-cd="connecting"]').innerHTML = VIA[cur] || VIA.wireless;
      cd.classList.add('aa-on', 'connecting');
      t = setTimeout(function () { cd.classList.remove('connecting'); }, reduce ? 0 : 1100);
      track('cta_click', { pillar: PILLAR, page: PAGE, anchor: cd.closest('[id]').id, variant: variant(), cta: 'connect_start_' + cur, destination: 'in_page' });
    });
    cd.querySelector('[data-cd-back]').addEventListener('click', back);
    cd.querySelectorAll('.cd-spot').forEach(function (sp) {
      sp.addEventListener('click', function () {
        var was = sp.classList.contains('open');
        cd.querySelectorAll('.cd-spot.open').forEach(function (o) { o.classList.remove('open'); });
        if (!was) sp.classList.add('open');
      });
    });
    var on = cd.querySelector('.cd-seg [aria-checked="true"]'); cur = on ? on.getAttribute('data-mode') : 'wireless';
  });

  /* ---------- 3D card: tilt toward the pointer ---------- */
  if (!reduce && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(function (st) {
      var cards = st.querySelectorAll('.cn-card3d'), raf = 0;
      st.addEventListener('pointermove', function (e) {
        var r = st.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          cards.forEach(function (card) {
            card.style.setProperty('--ry', ((card.classList.contains('mirror') ? 18 : -18) + dx * 26).toFixed(2) + 'deg');
            card.style.setProperty('--rx', (9 - dy * 16).toFixed(2) + 'deg');
            card.style.setProperty('--sx', (30 + dx * 60).toFixed(1) + '%');
            card.style.setProperty('--sy', (30 + dy * 60).toFixed(1) + '%');
          });
        });
      });
      st.addEventListener('pointerleave', function () { cards.forEach(function (card) { ['--ry', '--rx', '--sx', '--sy'].forEach(function (p) { card.style.removeProperty(p); }); }); });
    });
  }

  /* ---------- illustrations: paint + accent pickers ---------- */
  document.querySelectorAll('.showroom').forEach(function (m) {
    var name = m.querySelector('[data-paint-name]'), btns = m.querySelectorAll('button[data-car]'), cars = m.querySelectorAll('img[data-car]');
    var warmed = false;
    function warm() { if (warmed) return; warmed = true; cars.forEach(function (c) { c.loading = 'eager'; }); }
    m.addEventListener('pointerenter', warm); m.addEventListener('focusin', warm);
    btns.forEach(function (b, n) {
      b.addEventListener('click', function () {
        warm();
        var slug = b.getAttribute('data-car');
        btns.forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        cars.forEach(function (c) { var on = c.getAttribute('data-car') === slug; c.classList.toggle('on', on); c.alt = on ? 'Your car in ' + b.textContent.trim() + ', as shown on the DashLink dashboard' : ''; });
        m.style.setProperty('--paint', b.getAttribute('data-swatch'));
        if (name) name.textContent = b.textContent.trim();
      });
      b.addEventListener('keydown', function (e) {
        var d = /Right|Down/.test(e.key) ? 1 : /Left|Up/.test(e.key) ? -1 : 0;
        if (!d) return; e.preventDefault(); var k = (n + d + btns.length) % btns.length; btns[k].focus(); btns[k].click();
      });
    });
  });
  document.querySelectorAll('.mk-accents').forEach(function (m) {
    var dial = m.querySelector('.dial');
    m.querySelectorAll('[data-accent]').forEach(function (b) {
      b.addEventListener('click', function () {
        m.querySelectorAll('[data-accent]').forEach(function (x) { x.setAttribute('aria-checked', 'false'); });
        b.setAttribute('aria-checked', 'true');
        dial.style.setProperty('--acc', b.getAttribute('data-accent'));
      });
    });
  });
  if (reduce) document.querySelectorAll('svg').forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
})();
