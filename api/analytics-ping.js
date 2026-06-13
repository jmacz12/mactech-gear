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

async function forwardToMissionControl({ sessionKey, path }) {
  const url = process.env.MISSION_CONTROL_ANALYTICS_URL;
  const secret = process.env.MISSION_CONTROL_ANALYTICS_SECRET;
  if (!url || !secret) return { ok: false, skipped: true };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_key: sessionKey,
        path,
      }),
    });
    return { ok: response.ok, skipped: false };
  } catch (error) {
    console.error('Mission Control analytics forward failed:', error.message);
    return { ok: false, skipped: false };
  }
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

    if (!sessionKey || !path) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const result = await forwardToMissionControl({ sessionKey, path });

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
