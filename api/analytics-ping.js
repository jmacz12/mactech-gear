function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 16_384) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function sanitizeSessionKey(raw) {
  const key = typeof raw === 'string' ? raw.trim() : '';
  if (!key || !/^[a-zA-Z0-9_-]{16,64}$/.test(key)) return null;
  return key;
}

function sanitizePath(raw) {
  const path = typeof raw === 'string' ? raw.trim() : '';
  if (!path || !path.startsWith('/') || path.length > 512) return null;
  return path;
}

const http = require('http');
const https = require('https');

async function forwardToMissionControl(body) {
  const url = process.env.MISSION_CONTROL_ANALYTICS_URL;
  const secret = process.env.MISSION_CONTROL_ANALYTICS_SECRET;
  if (!url || !secret) return { ok: false, skipped: true };

  const payload = JSON.stringify(body);

  return new Promise((resolve) => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch (error) {
      console.error('Mission Control analytics forward failed:', error.message);
      resolve({ ok: false, skipped: false });
      return;
    }

    const lib = parsed.protocol === 'https:' ? https : http;
    const req = lib.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path: `${parsed.pathname}${parsed.search}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secret}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        res.resume();
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, skipped: false });
      }
    );

    req.on('error', (error) => {
      console.error('Mission Control analytics forward failed:', error.message);
      resolve({ ok: false, skipped: false });
    });

    req.write(payload);
    req.end();
  });
}

function sanitizeEvent(raw) {
  const event = typeof raw === 'string' ? raw.trim() : '';
  if (!event || event.length > 64) return null;
  if (!/^[a-z0-9_]+$/.test(event)) return null;
  return event;
}

function sanitizePlacement(raw) {
  const placement = typeof raw === 'string' ? raw.trim() : '';
  if (!placement || placement.length > 64) return null;
  if (!/^[a-z0-9_-]+$/.test(placement)) return null;
  return placement;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await parseBody(req);
    const sessionKey = sanitizeSessionKey(body.session_key || body.sessionKey);
    const path = sanitizePath(body.path);
    const event = sanitizeEvent(body.event);

    if (!sessionKey || !path) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const forwardBody = {
      session_key: sessionKey,
      path,
      ...(event ? { event } : {}),
    };

    if (event === 'amazon_click' || event === 'mactech_click') {
      const placement = sanitizePlacement(body.placement);
      if (placement) forwardBody.placement = placement;
    }

    const result = await forwardToMissionControl(forwardBody);

    if (result.skipped) {
      return res.status(200).json({ ok: true, stored: false });
    }

    if (!result.ok) {
      return res.status(502).json({ error: 'Could not record analytics ping' });
    }

    return res.status(200).json({ ok: true, stored: true });
  } catch (error) {
    console.error('Analytics ping error:', error.message);
    return res.status(500).json({ error: 'Could not record analytics ping' });
  }
};
