/* ── Site config ── */
const LINKS = {
  amazon: 'https://www.amazon.ca/dp/B09GM92D7X',
  instagram: 'https://www.instagram.com/mactechgear/',
  facebook: 'https://www.facebook.com/MacTechOfficial',
};

/* Paste your Behold JSON feed URL here after setup (see README).
   Example: 'https://feeds.behold.so/YourFeedId' */
const BEHOLD_FEED_URL = 'https://feeds.behold.so/wJQrdjRP6Nb3JsYTxNwK';

document.querySelectorAll('[data-link]').forEach((el) => {
  const url = LINKS[el.dataset.link];
  if (url) el.href = url;
});

const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

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
