"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BlogPostLoading() {
  const params = useParams<{ slug: string }>();
  const title = titleFromSlug(params.slug);

  return (
    <main className="blog-page article-loading">
      <div className="resume-page">
        <SiteHeader page="blog" />
        <div
          className="article-loading-content"
          role="status"
          aria-label={`Loading ${title}`}
          aria-live="polite"
        >
          <Link className="article-loading-back" href="/blog">
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3m4 4L3 8l4-4" />
            </svg>
            All writing
          </Link>
          <div className="article-loading-header">
            <div className="article-loading-line article-loading-meta" />
            <h1 className="article-loading-title">{title}</h1>
            <div className="article-loading-line article-loading-subtitle" />
          </div>
          <div className="article-loading-paragraphs" aria-hidden="true">
            {Array.from({ length: 15 }, (_, index) => (
              <div className="article-loading-line" key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
