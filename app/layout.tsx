import type { Metadata } from "next";
import { VisitorPopup } from "@/components/visitor-popup";
import "./globals.css";

const themeInitScript = `
  (() => {
    const savedTheme = window.localStorage.getItem("bibek-portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : prefersDark
          ? "dark"
          : "light";
  })();
`;

export const metadata: Metadata = {
  title: "Bibek Adhikari — Software Engineer",
  description:
    "The portfolio and resume of Bibek Adhikari, a software engineer building data-intensive systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <VisitorPopup />
      </body>
    </html>
  );
}
