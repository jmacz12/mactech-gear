function loadLocalEnvFile() {
  if (process.env.STRIPE_SECRET_KEY) return;

  try {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) return;

    for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
      if (!line || line.startsWith('#')) continue;
      const index = line.indexOf('=');
      if (index === -1) continue;

      const name = line.slice(0, index).trim();
      let value = line.slice(index + 1).trim();
      if (!name || process.env[name]) continue;

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      process.env[name] = value;
    }
  } catch {
    /* Local preview only */
  }
}

function getStripe() {
  loadLocalEnvFile();
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return require('stripe')(key);
}

function envCents(name, fallback) {
  const parsed = Number(process.env[name]);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

const PRODUCT = {
  name: 'MacTech Gear 40L Waterproof Duffle',
  description: 'Commercial-grade waterproof duffle. Designed in Canada.',
  image: 'https://mactechgear.ca/assets/images/feature-waterproof.png',
  unitAmount: envCents('PRODUCT_PRICE_CENTS', 11989),
  currency: 'cad',
};

function siteOrigin(req) {
  const configured = (process.env.SITE_URL || '').trim().replace(/\/$/, '');
  if (configured && /^https?:\/\//i.test(configured)) return configured;

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'http';
  return `${proto}://${host}`;
}

function shippingOptions() {
  const ca = envCents('SHIPPING_CA_CENTS', 1500);
  const us = envCents('SHIPPING_US_CENTS', 2500);

  return [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: ca, currency: 'cad' },
        display_name: 'Standard shipping — Canada',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 3 },
          maximum: { unit: 'business_day', value: 10 },
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: us, currency: 'cad' },
        display_name: 'Standard shipping — United States',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 5 },
          maximum: { unit: 'business_day', value: 14 },
        },
      },
    },
  ];
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({
      error: 'Checkout is not configured yet. Add STRIPE_SECRET_KEY in Vercel.',
    });
  }

  const origin = siteOrigin(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: PRODUCT.currency,
            unit_amount: PRODUCT.unitAmount,
            product_data: {
              name: PRODUCT.name,
              description: PRODUCT.description,
              images: [PRODUCT.image],
            },
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['CA', 'US'],
      },
      shipping_options: shippingOptions(),
      phone_number_collection: { enabled: true },
      customer_creation: 'always',
      billing_address_collection: 'required',
      success_url: `${origin}/shop/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#shop`,
      metadata: {
        source: 'mactechgear.ca',
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
};
