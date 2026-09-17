import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dr. Shivam | PhD Scholar & Academic Portfolio",
  description:
    "Official academic research portfolio of Dr. Shivam, PhD Scholar in Computer Science & Artificial Intelligence. Featuring publications, research domains, citations, and news.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
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
