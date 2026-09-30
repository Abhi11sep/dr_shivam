"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Menu, X, BookOpen } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Me", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Research Work", href: "#research-work" },
    { name: "Publications", href: "#publications" },
    { name: "Awards", href: "#awards" },
    { name: "Hobby", href: "#hobby" },
    { name: "Referees", href: "#referees" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Toggle navbar glass background styling when scrolled
      if (scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check if scrolled to the absolute bottom of the page
      const isAtBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        setActiveTab("Contact");
        return;
      }

      // Auto-switch active tab based on current scroll position
      const scrollPosition = scrollY + 200; // Account for top navbar offset

      const sections = navItems.map((item) => ({
        name: item.name,
        element: document.querySelector(item.href),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const { name, element } = sections[i];
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? "glass-container shadow-2xl border-white/10"
              : "bg-slate-900/30 backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Logo / Scholar Title */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-slate-100 tracking-tight block leading-none">
                Dr. Shivam
              </span>
              <span className="text-[11px] text-indigo-300 font-medium tracking-wide uppercase">
                FARE Fellow • IIT Kanpur
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-2 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === item.name
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#publications"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold glass-button-primary text-white"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View Papers</span>
            </a>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full text-slate-300 hover:text-white glass-pill"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-4 rounded-2xl glass-container border border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.name
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#publications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-semibold glass-button-primary text-white flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Papers</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
