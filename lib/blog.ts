import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  draft: boolean;
}

export interface Post extends PostMeta {
  html: string;
}

// Parses a simple `key: value` frontmatter block delimited by `---` lines.
function parseFrontmatter(source: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { data: {}, body: source };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
    data[key] = value;
  }
  return { data, body: source.slice(match[0].length) };
}

function readPost(slug: string): Post {
  const source = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf8');
  const { data, body } = parseFrontmatter(source);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    summary: data.summary ?? '',
    draft: data.draft === 'true',
    html: marked.parse(body, { async: false }),
  };
}

// Drafts are visible in `npm run dev` but excluded from production builds.
function isPublished(post: PostMeta): boolean {
  return process.env.NODE_ENV !== 'production' || !post.draft;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => readPost(file.replace(/\.md$/, '')))
    .filter(isPublished)
    .map(({ slug, title, date, summary, draft }) => ({ slug, title, date, summary, draft }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  if (!getAllPosts().some((post) => post.slug === slug)) return null;
  return readPost(slug);
}

export function formatDate(date: string): string {
  if (!date) return '';
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
