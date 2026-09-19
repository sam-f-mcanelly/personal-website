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
  blocks: PostBlock[];
  charts: Record<string, ChartSpec>;
}

// A post body is Markdown rendered to HTML, split around chart markers.
export type PostBlock = { type: 'html'; html: string } | { type: 'chart'; id: string };

interface Series {
  name: string;
  values: number[];
}

export type ChartSpec = { title?: string; subtitle?: string } & (
  | { type: 'stats'; items: { label: string; value: number }[] }
  // Stacked columns over evenly spaced time buckets (ISO timestamps).
  | { type: 'columns'; x: string[]; series: Series[] }
  // Step lines over commit timestamps (ISO), one per series.
  | { type: 'lines'; x: string[]; series: Series[] }
  // One bar per row from start to end (ISO); `series` indexes the series names.
  | {
      type: 'gantt';
      series: string[];
      rows: { label: string; title: string; start: string; end: string; series: number }[];
    }
  // One horizontal bar split into ordered segments.
  | { type: 'bar'; segments: { label: string; value: number }[] }
);

// A line containing only `<!-- chart: id -->` places the chart `id` from the post's
// `<slug>.json` data file. An id missing from that file fails the build.
const CHART_MARKER = /^<!--\s*chart:\s*([\w-]+)\s*-->$/m;

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

function readCharts(slug: string): Record<string, ChartSpec> {
  const file = path.join(POSTS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, 'utf8')).charts ?? {};
}

function toBlocks(body: string, charts: Record<string, ChartSpec>): PostBlock[] {
  // split() with a capture group alternates: markdown, chart id, markdown, ...
  return body.split(CHART_MARKER).flatMap((part, i): PostBlock[] => {
    if (i % 2 === 1) {
      if (!charts[part]) throw new Error(`Chart "${part}" has no entry in the post's data file`);
      return [{ type: 'chart', id: part }];
    }
    return part.trim() ? [{ type: 'html', html: marked.parse(part, { async: false }) }] : [];
  });
}

function readPost(slug: string): Post {
  const source = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf8');
  const { data, body } = parseFrontmatter(source);
  const charts = readCharts(slug);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    summary: data.summary ?? '',
    draft: data.draft === 'true',
    blocks: toBlocks(body, charts),
    charts,
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
