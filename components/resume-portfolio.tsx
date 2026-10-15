"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  credentials,
  languages,
  profile,
  resumeItems,
  skillGroups,
  type ResumeItem,
} from "@/app/data/resume";
import { SiteHeader } from "@/components/site-header";

const sectionLabels = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "credentials", label: "Credentials" },
  { id: "skills", label: "Skills" },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10m-4-4 4 4-4 4" />
    </svg>
  );
}

function ItemCard({
  item,
  onSelect,
  index,
}: {
  item: ResumeItem;
  onSelect: (item: ResumeItem) => void;
  index: number;
}) {
  return (
    <button
      className="resume-item"
      type="button"
      onClick={() => onSelect(item)}
      style={{ animationDelay: `${index * 55}ms` }}
      aria-label={`View details for ${item.title} at ${item.organization}`}
    >
      <span className="resume-item-copy">
        <span className="item-eyebrow">{item.eyebrow}</span>
        <span className="item-title">{item.title}</span>
        <span className="item-organization">{item.organization}</span>
      </span>
      <span className="item-meta">
        <span>{item.date}</span>
        <span className="item-arrow">
          <ArrowIcon />
        </span>
      </span>
    </button>
  );
}

function ResumeSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="resume-section" id={id}>
      <div className="section-heading">
        <span className="section-index">{String(sectionLabels.findIndex((section) => section.id === id) + 1).padStart(2, "0")}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function ResumePortfolio() {
  const [selectedItem, setSelectedItem] = useState<ResumeItem | null>(null);

  const closeDetails = useCallback(() => setSelectedItem(null), []);

  useEffect(() => {
    if (!selectedItem) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDetails();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDetails, selectedItem]);

  const experiences = resumeItems.filter((item) => item.type === "experience");
  const projects = resumeItems.filter((item) => item.type === "project");
  const education = resumeItems.filter((item) => item.type === "education");

  return (
    <main className={`portfolio-shell${selectedItem ? " has-detail" : ""}`}>
      <div className="resume-pane">
        <div className="resume-page">
          <SiteHeader page="resume" />

          <div className="resume-body" id="top">
            <aside className="side-rail" aria-label="Resume navigation">
              <span className="rail-caption">ON THIS PAGE</span>
              <nav>
                {sectionLabels.map((section) => (
                  <a href={`#${section.id}`} key={section.id}>
                    {section.label}
                  </a>
                ))}
              </nav>
              <Link className="blog-nav-link" href="/blog">
                <span>Read my blog</span>
                <ArrowIcon diagonal />
              </Link>
              <div className="rail-footer">
                <span className="rail-location">{profile.location}</span>
                <a href={`mailto:${profile.email}`}>Email ↗</a>
              </div>
            </aside>

            <div className="resume-content">
              <section className="hero" id="about">
                <div className="hero-kicker">
                  <span className="kicker-line" />
                  <span>THE WORK & THINKING OF</span>
                </div>
                <h1>
                  Bibek
                  <br />
                  <span>Adhikari.</span>
                </h1>
                <div className="hero-bottom">
                  <p>{profile.introduction}</p>
                  <span className="hero-location">Lalitpur, Nepal</span>
                </div>
                <div className="hero-links">
                  <a href={`mailto:${profile.email}`}>
                    {profile.email} <ArrowIcon diagonal />
                  </a>
                  <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}>
                    {profile.phone} <ArrowIcon diagonal />
                  </a>
                </div>
              </section>

              <ResumeSection id="experience" title="Experience">
                <div className="resume-list">
                  {experiences.map((item, index) => (
                    <ItemCard
                      item={item}
                      index={index}
                      key={item.id}
                      onSelect={setSelectedItem}
                    />
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection id="projects" title="Selected work">
                <div className="resume-list">
                  {projects.map((item, index) => (
                    <ItemCard
                      item={item}
                      index={index + experiences.length}
                      key={item.id}
                      onSelect={setSelectedItem}
                    />
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection id="education" title="Education">
                <div className="resume-list">
                  {education.map((item, index) => (
                    <ItemCard
                      item={item}
                      index={index + experiences.length + projects.length}
                      key={item.id}
                      onSelect={setSelectedItem}
                    />
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection id="credentials" title="Credentials">
                <div className="credential-list">
                  {credentials.map((credential) => (
                    <article className="credential-row" key={credential.name}>
                      <div>
                        <h3>{credential.name}</h3>
                        <p>{credential.issuer}</p>
                      </div>
                      <span>{credential.detail}</span>
                    </article>
                  ))}
                </div>
                <div className="language-row">
                  {languages.map((language) => (
                    <div className="language-item" key={language.name}>
                      <span>{language.name}</span>
                      <p>{language.detail}</p>
                    </div>
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection id="skills" title="Skills">
                <div className="skill-groups">
                  {skillGroups.map((group) => (
                    <div className="skill-group" key={group.name}>
                      <h3>{group.name}</h3>
                      <div className="skill-chips">
                        {group.skills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ResumeSection>
            </div>
          </div>

          <footer className="site-footer">
            <span>© {new Date().getFullYear()} Bibek Adhikari</span>
            <a href="#top">Back to top ↑</a>
          </footer>
        </div>
      </div>

      <div
        className={`detail-backdrop${selectedItem ? " is-visible" : ""}`}
        onClick={closeDetails}
        aria-hidden="true"
      />
      <aside
        className={`detail-pane${selectedItem ? " is-open" : ""}`}
        aria-hidden={!selectedItem}
        aria-labelledby="detail-title"
      >
        {selectedItem && (
          <div className="detail-content">
            <div className="detail-topbar">
              <span>RESUME / {selectedItem.type.toUpperCase()}</span>
              <button
                className="close-detail"
                type="button"
                onClick={closeDetails}
                aria-label="Close details"
              >
                <span />
                <span />
              </button>
            </div>
            <div className="detail-main">
              <span className="detail-eyebrow">{selectedItem.eyebrow}</span>
              <h2 id="detail-title">{selectedItem.title}</h2>
              <p className="detail-organization">{selectedItem.organization}</p>
              <div className="detail-meta">
                <span>{selectedItem.date}</span>
                {selectedItem.location && <span>{selectedItem.location}</span>}
              </div>
              <div className="detail-rule" />
              <h3>Overview</h3>
              <p className="detail-summary">{selectedItem.summary}</p>
              <div className="detail-description">
                {selectedItem.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
              {selectedItem.technologies && (
                <div className="detail-tech">
                  <h3>Tools & focus</h3>
                  <div className="skill-chips">
                    {selectedItem.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="detail-bottom">
              <span>MORE ABOUT MY WORK</span>
              <a href={`mailto:${profile.email}`}>
                Start a conversation <ArrowIcon diagonal />
              </a>
            </div>
          </div>
        )}
      </aside>
    </main>
  );
}
