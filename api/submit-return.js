function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 6_000_000) {
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

function imageDimensions(buffer) {
  if (buffer.length < 24) return null;

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length - 8) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        return {
          width: buffer.readUInt16BE(offset + 7),
          height: buffer.readUInt16BE(offset + 5),
        };
      }
      const segmentLength = buffer.readUInt16BE(offset + 2);
      if (segmentLength < 2) break;
      offset += 2 + segmentLength;
    }
    return null;
  }

  if (buffer.toString('ascii', 1, 4) === 'PNG') {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  return null;
}

function looksLikeScreenshot({ buffer, width, height }) {
  if (buffer.length < 25_000) return 'Photo looks too small — take a live picture of the duffle with your camera.';

  const ratio = width / height;
  const screenRatios = [16 / 9, 9 / 16, 4 / 3, 3 / 4, 19.5 / 9, 9 / 19.5];
  const matchesScreen = screenRatios.some((target) => Math.abs(ratio - target) < 0.002);
  const commonWidths = [1280, 1366, 1440, 1536, 1920, 2048, 2560, 3840];
  const exactScreenSize = commonWidths.includes(width) || commonWidths.includes(height);

  if (matchesScreen && exactScreenSize) {
    return 'This looks like a phone or desktop screenshot. Use the camera button to take a live photo of your duffle.';
  }

  return null;
}

function decodePhoto(photo) {
  if (!photo || typeof photo !== 'string') return null;
  const match = photo.match(/^data:image\/(jpeg|png);base64,(.+)$/i);
  if (!match) return null;

  const buffer = Buffer.from(match[2], 'base64');
  if (!buffer.length) return null;

  return { mime: `image/${match[1].toLowerCase()}`, buffer };
}

function makeReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MTG-${stamp}-${rand}`;
}

async function forwardToMissionControl({ reference, email, orderRef, reason, photo }) {
  const url = process.env.MISSION_CONTROL_RETURN_WEBHOOK_URL;
  const secret = process.env.MISSION_CONTROL_RETURN_WEBHOOK_SECRET;
  if (!url || !secret) return false;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference,
        email,
        orderRef,
        reason,
        photo,
        photoSource: 'camera',
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Mission Control return forward failed:', error.message);
    return false;
  }
}

async function notifyOwner({ reference, email, orderRef, reason, buffer, mime }) {
  const to = process.env.RETURN_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!to || !apiKey) return false;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RETURN_FROM_EMAIL || 'MacTech Gear <returns@mactechgear.ca>',
      to: [to],
      reply_to: email,
      subject: `Return request ${reference}`,
      html: `
        <p><strong>Return request</strong> — ${reference}</p>
        <p>Email: ${email}<br>Order ref: ${orderRef}<br>Reason: ${reason}</p>
        <p>Verification photo attached (live camera capture from mactechgear.ca).</p>
      `,
      attachments: [
        {
          filename: `${reference}.${mime === 'image/png' ? 'png' : 'jpg'}`,
          content: buffer.toString('base64'),
        },
      ],
    }),
  });

  return response.ok;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await parseBody(req);
    const email = String(body.email || '').trim().toLowerCase();
    const orderRef = String(body.orderRef || '').trim();
    const reason = String(body.reason || '').trim();
    const photoSource = String(body.photoSource || '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Enter the email you used at checkout.' });
    }

    if (!orderRef || orderRef.length < 6) {
      return res.status(400).json({ error: 'Enter the order number from your order confirmation email.' });
    }

    if (!reason) {
      return res.status(400).json({ error: 'Choose a reason for your return.' });
    }

    if (photoSource !== 'camera') {
      return res.status(400).json({
        error: 'Take a live verification photo with the camera button — uploaded screenshots are not accepted.',
      });
    }

    const photo = decodePhoto(body.photo);
    if (!photo) {
      return res.status(400).json({ error: 'Take a live verification photo before submitting.' });
    }

    const dimensions = imageDimensions(photo.buffer);
    if (!dimensions || dimensions.width < 320 || dimensions.height < 320) {
      return res.status(400).json({ error: 'Photo is too small. Move closer and capture the full duffle.' });
    }

    const screenshotIssue = looksLikeScreenshot({ buffer: photo.buffer, ...dimensions });
    if (screenshotIssue) {
      return res.status(400).json({ error: screenshotIssue });
    }

    const reference = makeReference();
    const [emailed, forwarded] = await Promise.all([
      notifyOwner({
        reference,
        email,
        orderRef,
        reason,
        buffer: photo.buffer,
        mime: photo.mime,
      }),
      forwardToMissionControl({
        reference,
        email,
        orderRef,
        reason,
        photo: body.photo,
      }),
    ]);

    if (!forwarded) {
      console.warn(`Return ${reference} saved for customer but Mission Control forward skipped or failed.`);
    }

    return res.status(200).json({
      ok: true,
      reference,
      emailed,
      message: emailed
        ? 'We will email you within two business days with return instructions.'
        : 'Keep your reference number — we will reply to the email you entered within two business days with return instructions.',
    });
  } catch (error) {
    console.error('Return request error:', error.message);
    return res.status(500).json({ error: 'Could not submit your return request. Please try again.' });
  }
};
