import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/blog';
import { siteMeta } from '../data/profile';

export async function GET(context: APIContext) {
  const posts = await getPosts(); // drafts already excluded
  return rss({
    title: siteMeta.title,
    description: siteMeta.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}/`,
      categories: [p.data.category, ...p.data.tags],
    })),
  });
}
