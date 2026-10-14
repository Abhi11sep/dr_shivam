import { pageSeo, siteUrl } from "@/lib/seo";

export default function sitemap() {
  return Object.keys(pageSeo).map(path => ({ url: new URL(path, siteUrl).href }));
}
