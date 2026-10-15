import Link from "next/link";
import { profile } from "@/app/data/resume";
import { ThemeToggle } from "@/components/theme-toggle";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  );
}

export function SiteHeader({ page }: { page: "resume" | "blog" }) {
  return (
    <header className="site-header">
      <Link
        className="wordmark"
        href={page === "resume" ? "#top" : "/"}
        aria-label="Bibek Adhikari home"
      >
        BA<span>.</span>
      </Link>
      <div className="header-note">
        <span className="availability-dot" />
        <span>Software · Data · Systems</span>
      </div>
      <div className="header-actions">
        <ThemeToggle />
        {page === "resume" ? (
          <>
            <Link className="header-blog-link" href="/blog">
              Read my Blog <ArrowIcon />
            </Link>
            <a className="header-contact" href={`mailto:${profile.email}`}>
              Get in touch <ArrowIcon />
            </a>
          </>
        ) : (
          <Link className="header-contact" href="/">
            Back to resume <ArrowIcon />
          </Link>
        )}
      </div>
    </header>
  );
}
