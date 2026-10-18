"use client";

import { useEffect, useRef, useState } from "react";

type PopupTab = "disclaimer" | "greeting";

const tabs: { id: PopupTab; label: string; emoji: string }[] = [
  { id: "disclaimer", label: "Disclaimer", emoji: "🤖" },
  { id: "greeting", label: "Hey! Who is there?", emoji: "👋" },
];

export function VisitorPopup() {
  const [activeTab, setActiveTab] = useState<PopupTab>("disclaimer");
  const [isOpen, setIsOpen] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex + tabs.length - 1) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      const nextTab = tabs[nextIndex];
      setActiveTab(nextTab.id);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="visitor-popup-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <section
        className="visitor-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="visitor-popup-title"
      >
        <header className="visitor-popup-header">
          <h2 id="visitor-popup-title">Before you look around</h2>
          <button
            className="visitor-popup-close"
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close popup"
            ref={closeButtonRef}
          >
            <span />
            <span />
          </button>
        </header>

        <div className="visitor-popup-tabs" role="tablist" aria-label="A note from Bibek">
          {tabs.map((tab, index) => (
            <button
              aria-controls={`${tab.id}-panel`}
              aria-selected={activeTab === tab.id}
              className={`visitor-popup-tab${activeTab === tab.id ? " is-active" : ""}`}
              id={`${tab.id}-tab`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={handleTabKeyDown}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              tabIndex={activeTab === tab.id ? 0 : -1}
              type="button"
            >
              {tab.label} <span aria-hidden="true">{tab.emoji}</span>
            </button>
          ))}
        </div>

        <div className="visitor-popup-content">
          {activeTab === "disclaimer" ? (
            <div
              aria-labelledby="disclaimer-tab"
              className="visitor-popup-panel"
              id="disclaimer-panel"
              role="tabpanel"
              tabIndex={0}
            >
              <p>
                I am bullish on AI and its ability to supersede humankind in any
                and every possible way. So, I am transitioning all my software
                development to be AI heavy. This site, for example, is totally
                engineered and developed by co-pilot. I have not touched a
                single character of the code. From something as effortless as
                changing a static text to the herculean task of centering a div,
                everything has is done by AI. I have been very pedantic about
                only using AI for this site. 🦾
              </p>
              <p>
                Not my writings though, that&apos;s all me. Not because I am very
                good at it that I don&apos;t need to use it. But because I like
                to write every now and then and when I do, I like to be pedantic
                about my writing too. My writings go through the grammar checks
                by Grammarly (whatever of it I can get for free) but nothing
                else besides that. ✍️
              </p>
            </div>
          ) : (
            <div
              aria-labelledby="greeting-tab"
              className="visitor-popup-panel"
              id="greeting-panel"
              role="tabpanel"
              tabIndex={0}
            >
              <p>
                If you landed here because I have applied for a job or student
                position with you, then please realize that I have already done
                some unhealthy overthinking about the position. My hyperactive
                imagination prevents me from being able to apply to any thing
                thoughtlessly. So, I would love it if you would not dismiss me
                as an unserious candidate. I don&apos;t mind being rejected–that
                happens–but I would be very sad if I was just dismissed. 🙇
              </p>
              <p>
                If you came here from X, I won&apos;t be held accountable or
                liable for anything I wrote, liked or reposted there. I only go
                there to kill my brain cells.🙃
              </p>
              <p>
                And if you came here from any of my other socials, how you
                doin&apos;?😉
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
