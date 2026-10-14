import { pageSeo, siteUrl, profileImage } from "@/lib/seo";

export default function sitemap() {
  return Object.keys(pageSeo).map(path => ({
    url: new URL(path, siteUrl).href,
    ...(path === "/" ? { images: [profileImage.url] } : {}),
  }));
}
