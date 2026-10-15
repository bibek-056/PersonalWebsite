import type { Metadata } from "next";
import { getPublishedPosts } from "@/app/data/blog";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Writing — Bibek Adhikari",
  description:
    "Essays and notes by Bibek Adhikari, published on Bibek's Substack.",
};

function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="blog-page">
      <div className="resume-page">
        <SiteHeader page="blog" />
        <div className="blog-content">
          <section className="blog-intro">
            <div className="hero-kicker">
              <span className="kicker-line" />
              <span>IDEAS, IN PROGRESS</span>
            </div>
            <h1>Writing<span>.</span></h1>
            <p>
              Essays and notes on people, technology, and the systems we live
              in.
            </p>
          </section>

          <div className="blog-post-list">
            {posts.map((post, index) => (
              <article className="blog-card" key={post.id}>
                <Link
                  className="blog-card-link"
                  href={`/blog/${post.slug}`}
                  prefetch={false}
                  aria-label={`Read ${post.title}`}
                  style={{ animationDelay: `${index * 65}ms` }}
                >
                  <div className="blog-card-main">
                    <div className="blog-post-meta">
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt}>
                          {formatPublishedDate(post.publishedAt)}
                        </time>
                      )}
                      <span>ESSAY</span>
                    </div>
                    <h2>{post.title}</h2>
                    {post.subtitle && (
                      <p className="blog-post-subtitle">{post.subtitle}</p>
                    )}
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                  </div>
                  <span className="blog-card-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10m-4-4 4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </article>
            ))}
          </div>
          <footer className="blog-footer">
            <span>MORE WRITING ON SUBSTACK</span>
            <a
              href="https://whybibek.substack.com"
              target="_blank"
              rel="noreferrer"
            >
              Visit Bibek&apos;s Substack ↗
            </a>
          </footer>
        </div>
      </div>
    </main>
  );
}
