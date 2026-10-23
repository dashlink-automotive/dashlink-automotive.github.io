// Play URL builder — the build-time twin of playUrl() in assets/site.js.
// The generator writes the "organic" URL into every Play button's href so the
// link works without JavaScript; site.js rewrites it on load with the
// visitor's real UTMs.
//
//   playUrl('com.auto.dashlink.headunit', 'racing')
//   → https://play.google.com/store/apps/details?id=com.auto.dashlink.headunit
//       &referrer=utm_source%3Dwebsite%26utm_medium%3Dorganic%26utm_campaign%3Dracing%26utm_term%3Dracing
//
//   playUrl(id, 'racing', { source: 'google', medium: 'cpc', campaign: 'racing_trackday', content: 'ad_a' })
//   → …&referrer=utm_source%3Dgoogle%26utm_medium%3Dcpc%26utm_campaign%3Dracing_trackday%26utm_content%3Dad_a%26utm_term%3Dracing

export function referrer(page, utm) {
  const p = utm && (utm.source || utm.medium || utm.campaign || utm.content)
    ? [
        ['utm_source', utm.source || 'website'],
        ['utm_medium', utm.medium || 'referral'],
        ['utm_campaign', utm.campaign || page],
        ['utm_content', utm.content],
      ]
    : [['utm_source', 'website'], ['utm_medium', 'organic'], ['utm_campaign', page]];
  p.push(['utm_term', page]);
  return p.filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
}

export function playUrl(appId, page, utm) {
  return `https://play.google.com/store/apps/details?id=${appId}&referrer=${encodeURIComponent(referrer(page, utm))}`;
}
