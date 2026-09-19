import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Sam McAnelly',
  description: 'Writing by Sam McAnelly.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="container px-4 md:px-6 py-6 relative z-10">
      <h1 className="text-3xl font-bold mb-6 text-neutral-heading">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-neutral-subheading">No posts yet. Check back soon.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <Card className="bg-black/60 backdrop-blur-xs transition-all duration-300 ease-in-out hover:bg-black/80 hover:shadow-xl text-foreground">
                <CardContent className="p-6">
                  <time dateTime={post.date} className="text-xs text-neutral-accent">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="text-xl font-semibold mt-1 text-neutral-heading">
                    {post.title}
                    {post.draft && (
                      <span className="ml-2 align-middle text-xs font-normal text-amber-400">
                        Draft
                      </span>
                    )}
                  </h2>
                  {post.summary && (
                    <p className="text-sm text-neutral-subheading mt-2">{post.summary}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
