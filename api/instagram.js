const MEDIA_FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_url',
  'permalink',
  'thumbnail_url',
  'timestamp',
].join(',');

async function fetchCarouselCover(post, token) {
  const response = await fetch(
    `https://graph.instagram.com/${post.id}/children?fields=media_type,media_url,thumbnail_url&access_token=${token}`
  );
  const data = await response.json();
  if (data.error) return null;

  const children = data.data || [];
  const image = children.find((child) => child.media_type === 'IMAGE') || children[0];
  if (!image) return null;

  return image.media_type === 'VIDEO'
    ? image.thumbnail_url || image.media_url
    : image.media_url;
}

function pickImageUrl(post) {
  if (post.media_type === 'VIDEO') {
    return post.thumbnail_url || post.media_url || null;
  }
  return post.media_url || post.thumbnail_url || null;
}

module.exports = async (req, res) => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const fetchLimit = Number(process.env.INSTAGRAM_MEDIA_LIMIT || 12);
  const displayCount = Number(process.env.INSTAGRAM_DISPLAY_COUNT || 4);

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (!token) {
    return res.status(503).json({
      posts: [],
      configured: false,
      message: 'Add INSTAGRAM_ACCESS_TOKEN in Vercel environment variables.',
    });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=${MEDIA_FIELDS}&limit=${fetchLimit}&access_token=${token}`
    );
    const payload = await response.json();

    if (payload.error) {
      throw new Error(payload.error.message || 'Instagram API error');
    }

    const rawPosts = payload.data || [];
    const posts = [];

    for (const post of rawPosts) {
      if (!['IMAGE', 'CAROUSEL_ALBUM', 'VIDEO'].includes(post.media_type)) continue;

      let image = pickImageUrl(post);

      if (!image && post.media_type === 'CAROUSEL_ALBUM') {
        image = await fetchCarouselCover(post, token);
      }

      if (!image || !post.permalink) continue;

      posts.push({
        id: post.id,
        permalink: post.permalink,
        image,
        caption: post.caption || '',
        timestamp: post.timestamp,
      });

      if (posts.length >= displayCount) break;
    }

    return res.status(200).json({
      posts,
      configured: true,
      username: 'mactechgear',
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      posts: [],
      configured: true,
      message: error.message,
    });
  }
};
