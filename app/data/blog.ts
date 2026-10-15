import Parser from "rss-parser";
import sanitizeHtml from "sanitize-html";

const SUBSTACK_FEED_URL = "https://whybibek.substack.com/feed";
const FEED_REVALIDATE_SECONDS = 60 * 60;

type SubstackItem = {
  contentEncoded?: string;
  contentSnippet?: string;
  description?: string;
};

const parser = new Parser<object, SubstackItem>({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  url: string;
  publishedAt?: string;
  content: string;
};

const articleSanitizerOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "a",
    "blockquote",
    "br",
    "code",
    "em",
    "h2",
    "h3",
    "h4",
    "hr",
    "i",
    "li",
    "ol",
    "p",
    "pre",
    "strong",
    "ul",
  ],
  allowedAttributes: {
    a: ["href", "rel", "target"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "noopener noreferrer",
      target: "_blank",
    }),
  },
  exclusiveFilter: (frame) =>
    frame.attribs.class
      ?.split(/\s+/)
      .includes("subscription-widget-wrap-editor") ?? false,
};

function getPostSlug(url: string, index: number) {
  const segments = new URL(url).pathname.split("/").filter(Boolean);
  const postIndex = segments.indexOf("p");
  const slug = postIndex >= 0 ? segments[postIndex + 1] : undefined;

  if (!slug) {
    throw new Error(`Substack feed item ${index + 1} has an invalid post URL.`);
  }

  return slug;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const response = await fetch(SUBSTACK_FEED_URL, {
    next: { revalidate: FEED_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(
      `Unable to load Bibek's Substack feed (${response.status} ${response.statusText}).`,
    );
  }

  const feed = await parser.parseString(await response.text());

  return feed.items.map((item, index) => {
    if (!item.title || !item.link || !item.contentEncoded) {
      throw new Error(
        `Substack feed item ${index + 1} is missing a title, link, or article body.`,
      );
    }

    const content = sanitizeHtml(item.contentEncoded, articleSanitizerOptions);
    const firstParagraph = sanitizeHtml(item.contentEncoded, {
      allowedTags: ["p"],
      allowedAttributes: {},
    }).match(/<p>([\s\S]*?)<\/p>/i)?.[1];
    const excerpt = firstParagraph
      ? sanitizeHtml(firstParagraph, {
          allowedTags: [],
          allowedAttributes: {},
        })
          .replace(/\s+/g, " ")
          .trim()
      : "";

    return {
      id: item.guid || item.link,
      slug: getPostSlug(item.link, index),
      title: item.title,
      subtitle: item.contentSnippet?.trim() || item.description?.trim() || "",
      excerpt: excerpt.length > 240 ? `${excerpt.slice(0, 237).trimEnd()}…` : excerpt,
      url: item.link,
      publishedAt: item.isoDate || item.pubDate,
      content,
    };
  });
}

export async function getPublishedPostBySlug(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug);
}
