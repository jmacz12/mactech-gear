(function () {
  const SESSION_STORAGE_KEY = 'mtg_site_sid';
  const HEARTBEAT_MS = 60_000;
  const PATH_DEDUPE_MS = 45_000;
  const SHOP_CLICK_DEDUPE_MS = 3_000;
  const SKIP_PREFIXES = ['/api/'];

  function shouldSkipPath(pathname) {
    if (!pathname) return true;
    return SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  }

  function readOrCreateSessionKey() {
    try {
      const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (existing && /^[a-zA-Z0-9_-]{16,64}$/.test(existing)) return existing;
      const key =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID().replace(/-/g, '')
          : `mtg${Date.now()}${Math.random().toString(36).slice(2, 12)}`;
      sessionStorage.setItem(SESSION_STORAGE_KEY, key);
      return key;
    } catch {
      return `mtg${Date.now()}${Math.random().toString(36).slice(2, 12)}`;
    }
  }

  function pagePath() {
    const path = `${window.location.pathname || '/'}${window.location.search || ''}`;
    return path.startsWith('/') ? path : `/${path}`;
  }

  function postAnalyticsPayload(payload) {
    const body = JSON.stringify(payload);
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon('/api/analytics-ping', blob)) return;
    }

    void fetch('/api/analytics-ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      keepalive: true,
      body,
    }).catch(function () {});
  }

  function sendPing() {
    const pathname = window.location.pathname || '/';
    if (shouldSkipPath(pathname)) return;

    const sessionKey = readOrCreateSessionKey();
    if (!sessionKey) return;

    const path = pagePath();
    const now = Date.now();
    const last = sendPing.last;
    if (last && last.path === path && now - last.at < PATH_DEDUPE_MS) return;
    sendPing.last = { path, at: now };

    postAnalyticsPayload({
      session_key: sessionKey,
      path,
    });
  }

  function trackShopClick(target, eventName) {
    const sessionKey = readOrCreateSessionKey();
    if (!sessionKey || !target) return;

    const path = pagePath();
    const placement =
      typeof target.dataset.shopPlacement === 'string'
        ? target.dataset.shopPlacement
        : typeof target.dataset.amazonPlacement === 'string'
          ? target.dataset.amazonPlacement
          : '';
    const now = Date.now();
    const dedupeKey = `${eventName}:${placement || 'shop'}:${path}`;
    const last = trackShopClick.last;
    if (last && last.key === dedupeKey && now - last.at < SHOP_CLICK_DEDUPE_MS) return;
    trackShopClick.last = { key: dedupeKey, at: now };

    postAnalyticsPayload({
      event: eventName,
      session_key: sessionKey,
      path,
      ...(placement ? { placement } : {}),
    });
  }

  function trackAmazonClick(link) {
    trackShopClick(link, 'amazon_click');
  }

  function trackMactechClick(button) {
    trackShopClick(button, 'mactech_click');
  }

  sendPing.last = null;
  trackShopClick.last = null;

  function initShopClickTracking() {
    document.querySelectorAll('[data-link="amazon"]').forEach(function (link) {
      link.addEventListener('click', function () {
        trackAmazonClick(link);
      });
    });

    document.querySelectorAll('[data-shop-checkout]').forEach(function (button) {
      button.addEventListener(
        'click',
        function () {
          trackMactechClick(button);
        },
        true
      );
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      sendPing();
      initShopClickTracking();
    });
  } else {
    sendPing();
    initShopClickTracking();
  }

  window.setInterval(sendPing, HEARTBEAT_MS);
})();
