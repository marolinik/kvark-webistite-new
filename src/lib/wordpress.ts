import { graphqlRequest } from "./graphql";
import eventsPlaceholder from "@/assets/images/events-placeholder.svg";

interface WPFeaturedImage {
  node: {
    sourceUrl: string;
    altText: string | null;
  };
}

interface WPCategory {
  name: string;
  slug: string;
}

interface WPPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  featuredImage: WPFeaturedImage | null;
  categories: { nodes: WPCategory[] };
  authorName: string | null;
  authorTitle: string | null;
  authorImage: string | null;
  customDate: string | null;
  customDescription: string | null;
  isFeatured: boolean | null;
}

interface WPPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface PostsResponse {
  posts: {
    pageInfo: WPPageInfo;
    nodes: WPPost[];
  };
}

interface SinglePostResponse {
  post: WPPost | null;
}

export type NewsItem = {
  slug: string;
  type: "Events" | "News";
  title: string;
  description: string;
  content: string;
  authorName: string;
  authorTitle: string;
  authorImage: string | null;
  dateLabel: string;
  dateISO: string;
  image: string;
  isFeatured: boolean;
};

const POST_FIELDS = `
  id
  databaseId
  title
  slug
  date
  content
  excerpt
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
  authorName
  authorTitle
  authorImage
  customDate
  customDescription
  isFeatured
`;

const ALL_POSTS_QUERY = `
  query AllPosts($first: Int!) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC }, hasPassword: false, status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

const POST_BY_SLUG_QUERY = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_FIELDS}
    }
  }
`;

function parseDate(value: string): Date {
  if (/^\d{8}$/.test(value)) {
    const y = value.slice(0, 4);
    const m = value.slice(4, 6);
    const d = value.slice(6, 8);
    return new Date(`${y}-${m}-${d}`);
  }
  return new Date(value);
}

function formatDateLabel(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function resolveType(categories: WPCategory[]): "Events" | "News" {
  const match = categories.find(
    (c) => c.slug === "events" || c.slug === "news",
  );
  if (match?.slug === "events") return "Events";
  return "News";
}

function stripHtml(html: string): string {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent ?? tmp.innerText ?? "";
}

function isValidPost(post: unknown): post is WPPost {
  const p = post as Record<string, unknown>;
  return !!(p && p.slug && p.title && p.date);
}

function mapWPPostToNewsItem(post: WPPost): NewsItem {
  return {
    slug: post.slug,
    type: resolveType(post.categories?.nodes ?? []),
    title: post.title,
    description: post.customDescription ?? stripHtml(post.excerpt ?? "").trim(),
    content: post.content ?? "",
    authorName: post.authorName ?? "",
    authorTitle: post.authorTitle ?? "",
    authorImage: post.authorImage ?? null,
    dateLabel: formatDateLabel(post.customDate ?? post.date),
    dateISO: post.customDate ?? post.date,
    image: post.featuredImage?.node.sourceUrl ?? eventsPlaceholder,
    isFeatured: post.isFeatured ?? false,
  };
}

export async function fetchAllPosts(limit = 100): Promise<NewsItem[]> {
  const data = await graphqlRequest<PostsResponse>(ALL_POSTS_QUERY, {
    first: limit,
  });
  return data.posts.nodes
    .filter(isValidPost)
    .map((post) => {
      try {
        return mapWPPostToNewsItem(post);
      } catch (e) {
        console.warn(`[WP] Skipping broken post "${post.slug}":`, e);
        return null;
      }
    })
    .filter((item): item is NewsItem => item !== null)
    .sort(
      (a, b) => parseDate(b.dateISO).getTime() - parseDate(a.dateISO).getTime(),
    );
}

export async function fetchPostBySlug(slug: string): Promise<NewsItem | null> {
  const data = await graphqlRequest<SinglePostResponse>(POST_BY_SLUG_QUERY, {
    slug,
  });
  return data.post ? mapWPPostToNewsItem(data.post) : null;
}
