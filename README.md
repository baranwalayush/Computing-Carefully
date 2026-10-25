# Personal site and technical blog
My personal site and technical blog, powered by [Astro](https://astro.build/). It features a static blog, a project portfolio, and a public profile.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # type and content-schema checks
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
```

Requires Node 22 or newer.

## Edit your profile

All personal details live in `src/data/profile.ts` (name, headline, bio, education, experience, interests, email, social links, navigation). Learning topics and reading lists live in `src/data/learning.ts`. Set your real production URL as `site` in `astro.config.mjs`, since canonical URLs, the sitemap, and RSS depend on it.

## Change the theme

Design tokens (colours, fonts, type scale, spacing, widths) are CSS variables at the top of `src/styles/global.css`. Light values are in `:root`, dark values in `:root[data-theme='dark']` (and the matching `prefers-color-scheme` block). Change `--accent` to retint the site. Fonts are self-hosted through `@fontsource` packages imported in the same file.

## Add an article

Create `src/content/blog/my-post.md` (or `.mdx`). The filename becomes the URL: `/blog/my-post/`. No component changes are needed.

```yaml
---
title: My post
subtitle: Optional
description: One-sentence summary for lists, RSS, and SEO.
pubDate: 2026-10-19
updatedDate: 2026-10-25     # optional
category: Essays            # Technical Deep Dives | Engineering Notes | Learning Notes | Essays
tags: [writing]
series: Optional series name
featured: false
draft: false                # true hides it from lists, tags, RSS, and the sitemap
relatedProject: lantern-search   # optional project slug
---
```

Math uses KaTeX: `$x^2$` inline, `$$ ... $$` for display. Fenced code blocks are highlighted by Shiki and get a language label and copy button. For image captions, use MDX with `<figure>` and `<figcaption>` (see `bloom-filters-in-practice.mdx`). Tag pages are generated automatically. To change categories, edit the list in `src/content.config.ts`.

## Add a project

Create `src/content/projects/my-project.md` with the frontmatter fields defined in `src/content.config.ts` (`title`, `description`, `category`, `year`, `tech`, optional `repo`, `demo`, `featured`, `order`). Use `##` headings for Overview, Problem statement, Approach and architecture, Technical decisions and trade-offs, Implementation details, and Results and limitations. Articles link back to a project via `relatedProject`.

## Deployment

The workflow in `.github/workflows/ci.yml` runs type checks and a build on every push and pull request.

- **Cloudflare Pages:** connect the repo, build command `npm run build`, output directory `dist`, Node 22.
- **Netlify:** build command `npm run build`, publish directory `dist`.

## Project layout

```
src/content/      blog and projects (Markdown/MDX)
src/data/         profile and learning data
src/layouts/      BaseLayout, ArticleLayout
src/components/   Header, Footer, PostList, ProjectList, TableOfContents, CodeCopy
src/pages/        routes, RSS, 404
src/styles/       global.css (design tokens)
```

## Notes

Astro 7 uses a new default Markdown processor that does not run remark/rehype plugins. This project opts into `unified()` from `@astrojs/markdown-remark` in `astro.config.mjs` so KaTeX works. Search and category filtering on `/blog/` use a small client script and need JavaScript; the full list is visible without it.
