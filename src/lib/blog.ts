import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** All published posts, newest first. Drafts are excluded from lists, RSS and static routes. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getProjects() {
  const items = await getCollection('projects', ({ data }) => !data.draft);
  return items.sort((a, b) => a.data.order - b.data.order);
}

export function readingTime(body: string | undefined): number {
  const words = (body ?? '').replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function relatedPosts(current: Post, all: Post[], limit = 3): Post[] {
  return all
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      p,
      score:
        p.data.tags.filter((t) => current.data.tags.includes(t)).length * 2 +
        (p.data.category === current.data.category ? 1 : 0) +
        (current.data.series && p.data.series === current.data.series ? 3 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
