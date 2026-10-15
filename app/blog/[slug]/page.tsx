import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
} from "@/app/data/blog";
import { SiteHeader } from "@/components/site-header";

export const revalidate = 3600;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Article not found — Bibek Adhikari" };
  }

  return {
    title: `${post.title} — Bibek Adhikari`,
    description: post.subtitle || post.excerpt,
  };
}

function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="blog-page">
      <div className="resume-page">
        <SiteHeader page="blog" />
        <div className="blog-content blog-article-page">
          <Link className="back-to-writing" href="/blog">
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3m4 4L3 8l4-4" />
            </svg>
            All writing
          </Link>
          <article className="blog-article">
            <header className="blog-article-header">
              <div className="blog-post-meta">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {formatPublishedDate(post.publishedAt)}
                  </time>
                )}
                <a href={post.url} target="_blank" rel="noreferrer">
                  OPEN ON SUBSTACK ↗
                </a>
              </div>
              <h1>{post.title}</h1>
              {post.subtitle && (
                <p className="blog-post-subtitle">{post.subtitle}</p>
              )}
              <p className="blog-author">By Bibek Adhikari</p>
            </header>
            <div
              className="blog-post-body blog-article-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
          <footer className="blog-footer">
            <Link href="/blog">← All writing</Link>
            <a href={post.url} target="_blank" rel="noreferrer">
              Read on Substack ↗
            </a>
          </footer>
        </div>
      </div>
    </main>
  );
}
