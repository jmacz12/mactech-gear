/* ── Site config ── */
const LINKS = {
  amazon: 'https://www.amazon.ca/dp/B09GM92D7X',
  instagram: 'https://www.instagram.com/mactechgear/',
  facebook: 'https://www.facebook.com/MacTechOfficial',
};

/* Paste your Behold JSON feed URL here after setup (see README).
   Example: 'https://feeds.behold.so/YourFeedId' */
const BEHOLD_FEED_URL = 'https://feeds.behold.so/wJQrdjRP6Nb3JsYTxNwK';

const PRODUCT_VIDEO_SRC = 'assets/video/product.mp4';

const HERO_SPEC_SETS = [
  [
    { value: '40L', label: 'Capacity' },
    { value: '100%', label: 'Waterproof' },
    { value: 'Dual', label: 'Carry modes' },
  ],
  [
    { value: 'Air', label: 'Purge valve' },
    { value: 'Multi', label: 'Tie-downs' },
    { value: 'Pro', label: 'Zippers' },
  ],
  [
    { value: '3', label: 'Pocket zones' },
    { value: 'Safe', label: 'Zipper pull' },
    { value: 'Float', label: 'Capable' },
  ],
];

document.querySelectorAll('[data-link]').forEach((el) => {
  const url = LINKS[el.dataset.link];
  if (url) el.href = url;
});

const nav = document.querySelector('.nav');
const scrollProgressFill = document.getElementById('scroll-progress-fill');
const backToTop = document.getElementById('back-to-top');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateScrollUi() {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;

  if (scrollProgressFill) {
    scrollProgressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  if (backToTop) {
    const showBackToTop = window.scrollY > Math.min(window.innerHeight * 0.55, 480);
    backToTop.classList.toggle('is-visible', showBackToTop);
    backToTop.setAttribute('aria-hidden', showBackToTop ? 'false' : 'true');
    backToTop.tabIndex = showBackToTop ? 0 : -1;
  }
}

window.addEventListener('scroll', updateScrollUi, { passive: true });
updateScrollUi();

/* ── Smooth scroll with nav offset ── */
const SCROLL_TARGETS = ['#top', '#mission', '#features', '#gallery', '#shop'];

function getNavOffset() {
  if (!nav) return 72;
  return nav.getBoundingClientRect().height + 12;
}

function scrollToTarget(target, behavior) {
  if (!target) return;

  if (target.id === 'top' || target === document.body) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const offset = getNavOffset();
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

function initSmoothScroll() {
  document.documentElement.style.setProperty('--nav-offset', `${getNavOffset()}px`);

  document.querySelectorAll(`a[href^="#"]`).forEach((link) => {
    const hash = link.getAttribute('href');
    if (!hash || !SCROLL_TARGETS.includes(hash)) return;

    link.addEventListener('click', (event) => {
      const target = hash === '#top'
        ? document.getElementById('top')
        : document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth';
      scrollToTarget(target, behavior);

      if (hash !== '#top') {
        history.pushState(null, '', hash);
      } else {
        history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
      }
    });
  });

  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--nav-offset', `${getNavOffset()}px`);
  }, { passive: true });
}

initSmoothScroll();

if (backToTop) {
  backToTop.addEventListener('click', () => {
    const top = document.getElementById('top');
    const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth';
    scrollToTarget(top, behavior);
    history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
  });
}

/* ── Hero highlight rotation ── */
function initHeroSpecRotation() {
  const list = document.getElementById('hero-specs');
  if (!list || prefersReducedMotion.matches) return;

  const items = [...list.querySelectorAll('li')];
  if (items.length !== 3) return;

  let index = 0;
  let timer = null;
  const INTERVAL = 4200;
  const FADE_MS = 380;

  function renderSet(setIndex) {
    HERO_SPEC_SETS[setIndex].forEach((spec, i) => {
      items[i].querySelector('.hero-spec-value').textContent = spec.value;
      items[i].querySelector('.hero-spec-label').textContent = spec.label;
    });
  }

  function nextSet() {
    list.classList.add('is-fading');

    window.setTimeout(() => {
      index = (index + 1) % HERO_SPEC_SETS.length;
      renderSet(index);
      list.classList.remove('is-fading');
    }, FADE_MS);
  }

  function startRotation() {
    if (timer) return;
    timer = window.setInterval(nextSet, INTERVAL);
  }

  function stopRotation() {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
    list.classList.remove('is-fading');
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopRotation();
    else startRotation();
  });

  startRotation();
}

initHeroSpecRotation();

/* ── Image lightbox (features + Instagram gallery) ── */
function initImageLightbox() {
  const lightbox = document.getElementById('feature-lightbox');
  if (!lightbox) return;

  const panel = lightbox.querySelector('.lightbox-panel');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const externalLink = document.getElementById('lightbox-link');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  let lastFocus = null;

  const focusable = () => lightbox.querySelectorAll(
    'button:not([disabled]), a[href]:not([hidden]), [tabindex]:not([tabindex="-1"])'
  );

  function resolveExternalHref(value) {
    if (!value) return null;
    if (value.startsWith('http')) return value;
    return LINKS[value] || null;
  }

  function trapFocus(event) {
    if (event.key !== 'Tab' || lightbox.hidden) return;

    const items = [...focusable()];
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setExternalLink(href) {
    if (!externalLink) return;

    if (href) {
      externalLink.href = href;
      externalLink.hidden = false;
    } else {
      externalLink.hidden = true;
      externalLink.removeAttribute('href');
    }
  }

  function openLightbox(src, label, trigger, externalHref) {
    lastFocus = trigger;
    img.src = src;
    img.alt = label;
    title.textContent = label;
    setExternalLink(externalHref);

    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keydown', trapFocus);
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    img.removeAttribute('src');
    setExternalLink(null);
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('keydown', trapFocus);

    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
    lastFocus = null;
  }

  function onKeydown(event) {
    if (event.key === 'Escape') closeLightbox();
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-lightbox-src]');
    if (!trigger) return;

    event.preventDefault();
    openLightbox(
      trigger.dataset.lightboxSrc,
      trigger.dataset.lightboxTitle || 'Image preview',
      trigger,
      resolveExternalHref(trigger.dataset.lightboxLink)
    );
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  panel.addEventListener('click', (event) => {
    if (event.target === panel) closeLightbox();
  });
}

initImageLightbox();

/* ── Product video (click to load + play with sound) ── */
function initProductVideo() {
  const video = document.getElementById('product-video');
  const playBtn = document.getElementById('video-play');
  const player = document.getElementById('product-video-player');
  const playLabel = playBtn?.querySelector('.video-play-label');
  if (!video || !playBtn || !player || !playLabel) return;

  let loaded = false;

  function ensureLoaded() {
    if (loaded) return;
    const source = document.createElement('source');
    source.src = PRODUCT_VIDEO_SRC;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.load();
    loaded = true;
  }

  function showPlayOverlay(replay = false) {
    player.classList.remove('is-playing');
    playLabel.textContent = replay ? 'Replay' : 'Play video';
    playBtn.setAttribute('aria-label', replay ? 'Replay product video' : 'Play product video');
  }

  playBtn.addEventListener('click', () => {
    ensureLoaded();

    if (video.ended) {
      video.currentTime = 0;
    }

    video.play().then(() => {
      player.classList.add('is-playing');
    }).catch(() => {
      showPlayOverlay(video.ended);
    });
  });

  video.addEventListener('play', () => {
    player.classList.add('is-playing');
  });

  video.addEventListener('ended', () => {
    showPlayOverlay(true);
  });
}

initProductVideo();

const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => observer.observe(el));
}

document.querySelectorAll('.feature-card.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 0.07, 0.42)}s`;
});

/* ── Hero background video (pause/play + reduced motion) ── */
function initHeroVideoToggle() {
  const video = document.querySelector('.hero-video');
  const media = document.querySelector('.hero-media');
  const hero = document.querySelector('.hero');
  const toggle = document.getElementById('hero-video-toggle');
  if (!video || !media || !hero || !toggle) return;

  const setHeroPosterFromVideo = () => {
    if (!video.videoWidth) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const poster = canvas.toDataURL('image/jpeg', 0.88);
    video.setAttribute('poster', poster);
    media.style.backgroundImage = `url(${poster})`;
  };

  video.addEventListener('loadeddata', setHeroPosterFromVideo, { once: true });

  let playing = !prefersReducedMotion.matches;

  function syncToggle() {
    toggle.classList.toggle('is-playing', playing);
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute(
      'aria-label',
      playing ? 'Pause background video' : 'Play background video',
    );
    hero.classList.toggle('is-video-paused', !playing);
    video.classList.toggle('is-user-playing', playing && prefersReducedMotion.matches);
  }

  function setPlaying(next) {
    playing = next;
    if (playing) {
      video.play().catch(() => {
        playing = false;
        syncToggle();
      });
    } else {
      video.pause();
    }
    syncToggle();
  }

  if (prefersReducedMotion.matches) {
    video.pause();
    video.removeAttribute('autoplay');
  }

  toggle.addEventListener('click', () => setPlaying(!playing));

  prefersReducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
      setPlaying(false);
      video.removeAttribute('autoplay');
    }
  });

  syncToggle();
}

initHeroVideoToggle();

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeInstagramPosts(posts) {
  return posts
    .map((post) => ({
      permalink: post.permalink,
      image: post.image || post.mediaUrl,
      lightboxImage: post.lightboxImage || post.image || post.mediaUrl,
      caption: post.caption || '',
    }))
    .filter((post) => (
      post.permalink?.startsWith('https://')
      && post.image?.startsWith('https://')
      && post.lightboxImage?.startsWith('https://')
    ));
}

function renderInstagramGallery(grid, posts) {
  const count = Number(grid.dataset.count || 4);
  const tiles = normalizeInstagramPosts(posts).slice(0, count);
  if (!tiles.length) return false;

  grid.innerHTML = tiles.map((post) => {
    const title = post.caption
      ? post.caption.replace(/[<>"']/g, '').slice(0, 120)
      : 'MacTech Gear on Instagram';
    const label = post.caption
      ? `View larger preview: ${post.caption.replace(/[<>"']/g, '').slice(0, 80)}`
      : 'View larger Instagram preview';

    return `<button type="button" class="gallery-item gallery-item--live" style="background-image:url('${post.image.replace(/'/g, '%27')}')" data-lightbox-src="${escapeAttr(post.lightboxImage)}" data-lightbox-title="${escapeAttr(title)}" data-lightbox-link="${escapeAttr(post.permalink)}" aria-label="${escapeAttr(label)}"></button>`;
  }).join('');

  grid.classList.add('gallery-grid--live');
  return true;
}

function mapBeholdPosts(data) {
  return (data.posts || []).map((post) => ({
    permalink: post.permalink,
    image: post.sizes?.medium?.mediaUrl || post.sizes?.large?.mediaUrl || post.mediaUrl,
    lightboxImage: post.sizes?.large?.mediaUrl || post.sizes?.medium?.mediaUrl || post.mediaUrl,
    caption: post.prunedCaption || post.caption || '',
  }));
}

async function fetchBeholdGallery() {
  if (!BEHOLD_FEED_URL) return null;

  const response = await fetch(BEHOLD_FEED_URL);
  if (!response.ok) throw new Error('Behold feed unavailable');

  const data = await response.json();
  return mapBeholdPosts(data);
}

async function fetchMetaGallery() {
  const response = await fetch('/api/instagram');
  if (!response.ok) return null;

  const data = await response.json();
  return data.posts || null;
}

async function loadInstagramGallery() {
  const grid = document.getElementById('instagram-gallery');
  if (!grid) return;

  try {
    const beholdPosts = await fetchBeholdGallery();
    if (beholdPosts?.length && renderInstagramGallery(grid, beholdPosts)) return;

    const metaPosts = await fetchMetaGallery();
    if (metaPosts?.length && renderInstagramGallery(grid, metaPosts)) return;
  } catch {
    /* Keep static fallback tiles until a feed is configured */
  }
}

loadInstagramGallery();

/* ── Direct shop (Stripe Checkout) ── */
function initShopCheckout() {
  const buttons = document.querySelectorAll('[data-shop-checkout]');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      if (button.disabled) return;

      const label = button.textContent;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.textContent = 'Opening checkout…';

      try {
        const response = await fetch('/api/create-checkout-session', { method: 'POST' });
        let data = {};
        try {
          data = await response.json();
        } catch {
          data = {};
        }

        if (!response.ok || !data.url) {
          throw new Error(data.error || 'Checkout unavailable');
        }

        window.location.href = data.url;
      } catch (error) {
        button.disabled = false;
        button.removeAttribute('aria-busy');
        button.textContent = label;

        const isLocalStatic =
          window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const message = isLocalStatic
          ? 'Checkout needs the Stripe API. Run npx vercel dev (not npx serve), with your test STRIPE_SECRET_KEY in .env.local — see README.'
          : error?.message ||
            'Checkout is not available right now. Please use Shop on Amazon, or try again in a few minutes.';

        window.alert(message);
      }
    });
  });
}

initShopCheckout();
