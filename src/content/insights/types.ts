export type InsightCategory =
  | "Regulation"
  | "Open Models"
  | "Infrastructure"
  | "Guides"
  | "Briefing";

export interface InsightSection {
  /** Optional H2 heading; omit for a continuation block */
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  /** Optional emphasized pull-quote rendered between paragraphs and bullets */
  callout?: string;
}

export interface InsightSource {
  label: string;
  url: string;
}

export interface Insight {
  slug: string;
  title: string;
  category: InsightCategory;
  /** ISO date, e.g. "2026-07-07" — used for sorting and schema.org */
  dateISO: string;
  /** Human label, e.g. "July 2026" */
  dateLabel: string;
  readingMinutes: number;
  /** Card + meta description (≤160 chars ideal) */
  excerpt: string;
  /** 3-5 scannable takeaways shown in the TL;DR box */
  tldr: string[];
  sections: InsightSection[];
  sources: InsightSource[];
  featured?: boolean;
}
