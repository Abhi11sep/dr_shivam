# SEO setup and launch checklist

The homepage targets Shivam Singh with environmental engineering and IIT Kanpur context. Each of the five routes has a distinct title, description, canonical URL, Open Graph metadata and Twitter card. Person, ProfilePage and WebSite JSON-LD connects the homepage with the existing academic profiles. Google verification is preserved.

## Production domain

The default origin is https://dr-shivam-plum.vercel.app. If using a custom domain, set SITE_URL to its HTTPS origin in the deployment environment and rebuild. This updates canonical URLs, structured data, robots.txt and sitemap.xml together. Configure permanent redirects from old domains in the hosting provider when migrating. Do not use a preview deployment URL for SITE_URL.

## After deployment

1. Open /robots.txt and /sitemap.xml on the production domain. Ensure all five URLs are public, return 200, and have no hosting-level noindex header or authentication wall.
2. Verify ownership in Google Search Console using the preserved verification token, then submit /sitemap.xml. Use URL Inspection on the homepage and request indexing after checking its rendered content.
3. Add this website to your genuine IIT Kanpur, Google Scholar, LinkedIn and ResearchGate profiles where editing is available. Keep your name and current affiliation consistent.
4. Run PageSpeed Insights on the deployed site for mobile and desktop. Track LCP, INP and CLS in Search Console as field data becomes available. The local build is not a measurement of real-world Core Web Vitals.
5. Monitor clicks, impressions, indexing and average position for Shivam Singh and related research queries. Keep publications, awards and affiliation current.

## Performance changes

The biography retains its scroll-triggered typing animation. Its full text is included in server-rendered HTML and available to assistive technology; reduced-motion users see the completed text without animation. Hero text and portrait start visible. The portrait uses responsive image sizing and preload; below-the-fold award images use lazy loading and explicit sizes. Pages remain statically generated.

## Validation

Run npm run build and npm run lint. Inspect production HTML in .next/server/app for titles, descriptions, canonical URLs and JSON-LD, and check the generated sitemap.xml.body and robots.txt.body.

Ranking in Google's top three cannot be guaranteed by code changes. Google's SEO Starter Guide explains discovery, indexing, content quality and the time needed to evaluate results: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Google result portrait

The existing portrait is explicitly linked to the Person and ProfilePage as an ImageObject and primaryImageOfPage. Open Graph includes its actual dimensions, and the homepage sitemap entry lists its public image URL. These metadata changes do not change the UI. Large image previews were already allowed.

After deployment, use Search Console URL Inspection to test the live homepage and request indexing; resubmit the sitemap if needed. Google chooses search thumbnails automatically and may show no image even with valid metadata. See https://developers.google.com/search/docs/appearance/google-images.
