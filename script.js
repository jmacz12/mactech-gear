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

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Smooth scroll with nav offset ── */
const SCROLL_TARGETS = ['#top', '#mission', '#features', '#gallery', '#shop'];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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

/* ── Feature image lightbox ── */
function initFeatureLightbox() {
  const lightbox = document.getElementById('feature-lightbox');
  if (!lightbox) return;

  const panel = lightbox.querySelector('.lightbox-panel');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const triggers = document.querySelectorAll('.feature-img[data-lightbox-src]');
  let lastFocus = null;

  const focusable = () => lightbox.querySelectorAll(
    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
  );

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

  function openLightbox(src, label, trigger) {
    lastFocus = trigger;
    img.src = src;
    img.alt = label;
    title.textContent = label;

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

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openLightbox(
        trigger.dataset.lightboxSrc,
        trigger.dataset.lightboxTitle || 'Feature image',
        trigger
      );
    });
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  panel.addEventListener('click', (event) => {
    if (event.target === panel) closeLightbox();
  });
}

initFeatureLightbox();

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

const heroVideo = document.querySelector('.hero-video');
const heroMedia = document.querySelector('.hero-media');

if (heroVideo && heroMedia) {
  const setHeroPosterFromVideo = () => {
    if (!heroVideo.videoWidth) return;

    const canvas = document.createElement('canvas');
    canvas.width = heroVideo.videoWidth;
    canvas.height = heroVideo.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(heroVideo, 0, 0);
    const poster = canvas.toDataURL('image/jpeg', 0.88);
    heroVideo.setAttribute('poster', poster);
    heroMedia.style.backgroundImage = `url(${poster})`;
  };

  heroVideo.addEventListener('loadeddata', setHeroPosterFromVideo, { once: true });
}

function normalizeInstagramPosts(posts) {
  return posts
    .map((post) => ({
      permalink: post.permalink,
      image: post.image || post.mediaUrl,
      caption: post.caption || '',
    }))
    .filter((post) => (
      post.permalink?.startsWith('https://') && post.image?.startsWith('https://')
    ));
}

function renderInstagramGallery(grid, posts) {
  const count = Number(grid.dataset.count || 4);
  const tiles = normalizeInstagramPosts(posts).slice(0, count);
  if (!tiles.length) return false;

  grid.innerHTML = tiles.map((post) => {
    const label = post.caption
      ? post.caption.replace(/[<>"']/g, '').slice(0, 100)
      : 'View on Instagram';

    return `<a href="${post.permalink}" target="_blank" rel="noopener noreferrer" class="gallery-item gallery-item--live" style="background-image:url('${post.image.replace(/'/g, '%27')}')" aria-label="${label}"></a>`;
  }).join('');

  grid.classList.add('gallery-grid--live');
  return true;
}

function mapBeholdPosts(data) {
  return (data.posts || []).map((post) => ({
    permalink: post.permalink,
    image: post.sizes?.medium?.mediaUrl || post.sizes?.large?.mediaUrl || post.mediaUrl,
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
