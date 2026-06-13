(function () {
  const SESSION_STORAGE_KEY = 'mtg_site_sid';
  const HEARTBEAT_MS = 60_000;
  const PATH_DEDUPE_MS = 45_000;
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

    void fetch('/api/analytics-ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      keepalive: true,
      body: JSON.stringify({
        session_key: sessionKey,
        path,
      }),
    }).catch(function () {});
  }

  sendPing.last = null;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sendPing);
  } else {
    sendPing();
  }

  window.setInterval(sendPing, HEARTBEAT_MS);
})();
