import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Chart from '@/components/blog/charts';
import { formatDate, getAllPosts, getPost } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };

// Every post is rendered at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} - Sam McAnelly`,
    description: post.summary,
  };
}

export default async function BlogPost({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <main className="container px-4 md:px-6 py-6 relative z-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-neutral-accent hover:text-neutral-heading transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All posts
      </Link>

      <article className="mt-4 rounded-lg border bg-black/60 backdrop-blur-xs p-4 md:p-6">
        <header className="mb-6">
          <time dateTime={post.date} className="text-sm text-neutral-accent">
            {formatDate(post.date)}
          </time>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1 text-neutral-heading">
            {post.title}
          </h1>
        </header>
        {post.blocks.map((block, i) =>
          block.type === 'chart' ? (
            <Chart key={i} spec={post.charts[block.id]} />
          ) : (
            <div
              key={i}
              className="prose prose-invert max-w-none prose-a:text-sky-400 prose-pre:bg-black/60 prose-code:before:content-none prose-code:after:content-none"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          )
        )}
      </article>
    </main>
  );
}
