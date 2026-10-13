import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteName = "Shivam Singh PhD Scholar";
const siteUrl = "https://dr-shivam-plum.vercel.app";
const description = "Academic portfolio of Shivam Singh, PhD Scholar and Environmental Engineering researcher at IIT Kanpur. Explore research, publications, patents, and awards.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description,
    images: [{ url: "/profile.png", alt: "Shivam Singh" }],
  },
  verification: {
    google: "XDKrRMwpfsSxtiDuKy5H8OPKuT3QmHrrerFycyqYTJE",
  },
  title: siteName,
  description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 relative selection:bg-indigo-500/30 selection:text-indigo-200">

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
        <main className="flex-1 z-10 relative">{children}</main>

        {/* Glass Footer */}
        <Footer />
      </body>
    </html>
  );
}
