// Keep canonical URLs, crawler endpoints, and structured data on one origin.
export const siteUrl = new URL(process.env.SITE_URL || "https://dr-shivam-plum.vercel.app").origin;
export const profileImage = {
  url: new URL("/profile.png", siteUrl).href,
  width: 537,
  height: 537,
  type: "image/png",
  alt: "Dr. Shivam Singh, FARE Fellow at IIT Kanpur",
};
export const siteName = "Dr. Shivam Singh";
export const pageSeo = {
  "/": {
    title: "Shivam Singh | Environmental Engineering Researcher, IIT Kanpur",
    description: "Dr. Shivam Singh, FARE Fellow at IIT Kanpur, researches air quality, sustainable filtration and aerosol science. Explore publications, patents and awards.",
  },
  "/skills": {
    title: "Research & Engineering Skills | Shivam Singh",
    description: "Explore Shivam Singh's expertise in machine learning, air filtration, electrostatics, experimental research, Python, MATLAB and engineering prototyping.",
  },
  "/conferences": {
    title: "Conferences & Research Presentations | Shivam Singh",
    description: "Explore Shivam Singh's academic conferences and research presentations on environmental engineering, air quality and aerosol science in India and abroad.",
  },
  "/hobby": {
    title: "Photography & Hobbies | Shivam Singh",
    description: "Discover Shivam Singh's interests beyond environmental engineering research, including photography, sports and cooking, with a collection of personal photographs.",
  },
  "/gallery": {
    title: "Photo Gallery | Shivam Singh",
    description: "Browse Dr. Shivam Singh's personal photo gallery: people, places and memorable moments from his academic journey and life beyond research at IIT Kanpur.",
  },
};
export function pageMetadata(path) {
  const { title, description } = pageSeo[path];
  const images = [profileImage];
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_IN", siteName, title, description, url: path, images },
    twitter: { card: "summary", title, description, images },
  };
}
export const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ImageObject", "@id": siteUrl + "/#portrait",
      url: profileImage.url, contentUrl: profileImage.url,
      width: profileImage.width, height: profileImage.height,
      encodingFormat: profileImage.type, caption: profileImage.alt,
      representativeOfPage: true,
    },
    {
      "@type": "WebSite", "@id": siteUrl + "/#website",
      name: siteName, alternateName: "Shivam Singh", url: siteUrl + "/",
      publisher: { "@id": siteUrl + "/#person" },
    },
    {
      "@type": "Person", "@id": siteUrl + "/#person",
      name: "Shivam Singh", honorificPrefix: "Dr.", url: siteUrl + "/",
      image: { "@id": siteUrl + "/#portrait" }, jobTitle: "FARE Fellow",
      description: pageSeo["/"].description,
      affiliation: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Kanpur", url: "https://www.iitk.ac.in/" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Kanpur" },
      knowsAbout: ["Environmental engineering", "Indoor air quality", "Sustainable air filtration", "Electrostatics", "Aerosol science", "Machine learning"],
      sameAs: [
        "https://scholar.google.com/citations?user=jdU90D0AAAAJ&hl=en",
        "https://www.researchgate.net/profile/Shivam-Singh-165",
        "https://www.linkedin.com/in/shivam-singh-41927b267/",
      ],
    },
    {
      "@type": "ProfilePage", "@id": siteUrl + "/#profile",
      url: siteUrl + "/", name: pageSeo["/"].title,
      image: { "@id": siteUrl + "/#portrait" },
      primaryImageOfPage: { "@id": siteUrl + "/#portrait" },
      mainEntity: { "@id": siteUrl + "/#person" },
      isPartOf: { "@id": siteUrl + "/#website" },
    },
  ],
};
