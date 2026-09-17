"use client";

import { GraduationCap, Mail, Award, Globe, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative pt-20 pb-12 border-t border-white/10 bg-slate-950/60 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Abstract */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-slate-100 block leading-none">
                  Dr. Shivam
                </span>
                <span className="text-xs text-indigo-300">Ph.D. Scholar & Researcher</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Dedicated to advancing the frontiers of artificial intelligence, trustworthy representations, and computational efficiency through rigorous academic research and open-source collaboration.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full glass-pill text-slate-300 hover:text-indigo-400 transition-colors"
                title="Google Scholar"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://orcid.org"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full glass-pill text-slate-300 hover:text-emerald-400 transition-colors"
                title="ORCID"
              >
                <Award className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full glass-pill text-slate-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full glass-pill text-slate-300 hover:text-sky-400 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:shivam@university.edu"
                className="p-2 rounded-full glass-pill text-slate-300 hover:text-rose-400 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-indigo-300 transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-indigo-300 transition-colors">
                  Research Domains
                </a>
              </li>
              <li>
                <a href="#publications" className="hover:text-indigo-300 transition-colors">
                  Featured Publications
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-indigo-300 transition-colors">
                  News & Announcements
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Affiliation Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Academic Office & Contact
            </h4>
            <div className="glass-card p-4 rounded-2xl border-white/5 space-y-2 text-xs text-slate-300">
              <p className="font-semibold text-slate-100">
                Department of Computer Science
              </p>
              <p className="text-slate-400">School of Engineering & Applied Sciences</p>
              <p className="text-indigo-300 font-mono pt-1">shivam@university.edu</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dr. Shivam. All rights reserved. Designed for Academic & Research Excellence.</p>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full glass-pill text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
