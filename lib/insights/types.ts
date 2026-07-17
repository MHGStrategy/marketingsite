export type InsightLink = { text: string; href: string };

export type InsightParagraph = string | Array<string | InsightLink>;

export type InsightSection = {
  heading: string;
  paragraphs: InsightParagraph[];
  bullets?: InsightParagraph[];
  callout?: string;
};

export type InsightArticleContent = {
  slug: string;
  lede: string;
  sections: InsightSection[];
  cta: { body: string; label: string; href: string };
};
