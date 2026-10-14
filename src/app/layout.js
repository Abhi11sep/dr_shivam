import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteUrl, siteName, pageSeo } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: pageSeo["/"].title,
  description: pageSeo["/"].description,
  authors: [{ name: "Shivam Singh", url: siteUrl }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: { google: "XDKrRMwpfsSxtiDuKy5H8OPKuT3QmHrrerFycyqYTJE" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 relative selection:bg-indigo-500/30 selection:text-indigo-200">

        <a href="#main-content" className="skip-link">Skip to main content</a>
        {/* Floating Ambient Glass Background Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Orb 1: Indigo/Navy Top Left */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-700/20 blur-[130px] animate-blob-1"></div>
          {/* Orb 2: Sky/Cyan Middle Right */}
          <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] rounded-full bg-sky-600/15 blur-[140px] animate-blob-2"></div>
          {/* Orb 3: Emerald/Teal Bottom Left */}
          <div className="absolute bottom-[10%] left-[10%] w-[450px] h-[450px] rounded-full bg-emerald-600/10 blur-[120px] animate-blob-3"></div>
        </div>

        {/* Sticky Glass Navbar */}
        <Navbar />

        {/* Page Main Content */}
        <main id="main-content" tabIndex={-1} className="flex-1 z-10 relative">{children}</main>

        {/* Glass Footer */}
        <Footer />
      </body>
    </html>
  );
}
