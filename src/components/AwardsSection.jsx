"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Maximize2,
  X,
  FileCheck,
  Calendar,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function AwardsSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [activeTabs, setActiveTabs] = useState({
    award1: "1A", // '1A' (Letter) or '1B' (Poster)
    award2: "2A", // '2A' (Ceremony) or '2B' (Certificate)
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cycle through each award's documents automatically while keeping manual selectors available.
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTabs((previous) => ({
        award1: previous.award1 === "1A" ? "1B" : "1A",
        award2: previous.award2 === "2A" ? "2B" : "2A",
      }));
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  // ESC key listener to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const awards = [
    {
      id: "award1",
      title: "ACS ES&T Engineering 2024 Best Paper Award",
      organization: "American Chemical Society (ACS Publications)",
      presenter: "Prof. Wonyong Choi (Editor-in-Chief)",
      date: "November 2025",
      badge: "Best Paper Award",
      paperTitle: "Review of Current and Future Indoor Air Purifying Technologies",
      authors: "Shivam Singh, Pratibha Vishwakarma, & Tarun Gupta",
      description:
        "Selected as one of the winners of the journal's 2024 ACS ES&T Engineering Best Paper Awards for groundbreaking contributions to indoor air purifying technologies and health risk mitigation.",
      accentColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
      badgeBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      glow: "shadow-[0_0_50px_rgba(16,185,129,0.2)]",
      images: [
        {
          key: "1A",
          label: "Official Award Letter",
          sublabel: "From Editor-in-Chief Wonyong Choi",
          src: "/awards/award1A.png",
          alt: "ACS ES&T Engineering 2024 Best Paper Award Official Letter",
        },
        {
          key: "1B",
          label: "Award Poster & Announcement",
          sublabel: "ACS ES&T Engineering Recognition Graphic",
          src: "/awards/award1B.jpg",
          alt: "Best Paper Award Poster Mr. Shivam Singh",
        },
      ],
    },
    {
      id: "award2",
      title: "Envirotech GD Agrawal Award (2026)",
      organization: "Indian Institute of Technology Kanpur (IIT Kanpur)",
      presenter: "Academic Senate & Department of Civil Engineering",
      date: "July 15, 2026",
      badge: "Most Innovative Thesis Award",
      paperTitle: null,
      authors: "Shivam Singh (Roll No. 20103292)",
      description:
        "Conferred for the most innovative thesis in the field of Environmental Engineering among PG & PhD scholars in the Department of Civil Engineering at IIT Kanpur.",
      accentColor: "from-amber-500/20 via-orange-500/10 to-transparent",
      badgeBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      glow: "shadow-[0_0_50px_rgba(245,158,11,0.2)]",
      images: [
        {
          key: "2A",
          label: "Award Ceremony Photo",
          sublabel: "On Stage at IIT Kanpur Dept. of Civil Engineering",
          src: "/awards/award2A.png",
          alt: "Shivam Singh receiving GD Agrawal Award on stage at IIT Kanpur",
        },
        {
          key: "2B",
          label: "Official Senate Certificate",
          sublabel: "Signed by Chairperson, Academic Senate",
          src: "/awards/award2B.png",
          alt: "Official IIT Kanpur Envirotech GD Agrawal Award Certificate",
        },
      ],
    },
  ];

  return (
    <section id="awards" className="relative py-24 bg-slate-950/60 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-inner">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Honors & Prestigious Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            Academic & Research <span className="text-gradient">Awards</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Recognizing excellence in environmental engineering, innovative thesis research, and peer-reviewed scientific contributions.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="space-y-12">
          {awards.map((award, index) => {
            const currentTab = activeTabs[award.id];
            const currentImg = award.images.find((img) => img.key === currentTab) || award.images[0];

            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`glass-container rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden ${award.glow}`}
              >
                {/* Top Corner Radial Accent Glow */}
                <div
                  className={`absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br ${award.accentColor} blur-3xl pointer-events-none`}
                ></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  
                  {/* Left Side: Award Details & Copy */}
                  <div className="lg:col-span-6 space-y-6">
                    
                    {/* Badge & Date */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${award.badgeBg} flex items-center gap-1.5`}>
                        <Award className="w-4 h-4" />
                        <span>{award.badge}</span>
                      </span>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{award.date}</span>
                      </div>
                    </div>

                    {/* Award Title */}
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-tight">
                        {award.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-indigo-300 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>{award.organization}</span>
                      </p>
                    </div>

                    {/* Description & Impact */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                      {award.description}
                    </p>

                    {/* Paper Title or Specific Recipient Info */}
                    {award.paperTitle && (
                      <div className="p-3.5 rounded-xl glass-card text-xs space-y-1 border-white/5">
                        <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px] block">
                          Award-Winning Paper
                        </span>
                        <p className="font-semibold text-slate-200 leading-snug">
                          "{award.paperTitle}"
                        </p>
                        <p className="text-slate-400 text-[11px] pt-0.5">
                          Authors: <span className="text-indigo-300 font-medium">{award.authors}</span>
                        </p>
                      </div>
                    )}

                    {/* Presenter / Senate Info */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Conferred by: <strong className="text-slate-200 font-semibold">{award.presenter}</strong></span>
                    </div>

                    {/* Interactive Image Selector Pills */}
                    <div className="pt-2 space-y-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Select Document / Photo:
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {award.images.map((img) => (
                          <button
                            key={img.key}
                            onClick={() =>
                              setActiveTabs((prev) => ({
                                ...prev,
                                [award.id]: img.key,
                              }))
                            }
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                              currentTab === img.key
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/50"
                                : "glass-pill text-slate-300 hover:text-white hover:border-white/30"
                            }`}
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>{img.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Side: Dual Image Interactive Frame */}
                  <div className="lg:col-span-6 flex justify-center">
                    <div className="relative group w-full max-w-[520px]">
                      
                      {/* Decorative Frame Ambient Glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-amber-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>

                      {/* Main Image Display Box */}
                      <div className="relative rounded-2xl glass-card overflow-hidden border border-white/20 p-3 shadow-2xl bg-slate-950/80">
                        
                        <div
                          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group/img bg-slate-900/80 flex items-center justify-center border border-white/10"
                          onClick={() => setSelectedImage(currentImg)}
                        >
                          <Image
                            src={currentImg.src}
                            alt={currentImg.alt}
                            fill
                            priority
                            className="object-contain p-2 transition-transform duration-500 group-hover/img:scale-105"
                          />

                          {/* Hover Zoom Overlay Badge */}
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white backdrop-blur-[2px]">
                            <div className="p-3 rounded-full bg-indigo-600/90 shadow-lg border border-white/30">
                              <Maximize2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs font-semibold tracking-wider uppercase bg-slate-900/80 px-3 py-1 rounded-full border border-white/20">
                              Click to view full screen
                            </span>
                          </div>
                        </div>

                        {/* Caption & Thumbnail Switcher Bar */}
                        <div className="pt-3 px-1 flex items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-slate-100 block">
                              {currentImg.label}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              {currentImg.sublabel}
                            </span>
                          </div>

                          {/* Dual Thumbnail Quick Selectors */}
                          <div className="flex items-center gap-2 shrink-0">
                            {award.images.map((img) => (
                              <button
                                key={img.key}
                                onClick={() =>
                                  setActiveTabs((prev) => ({
                                    ...prev,
                                    [award.id]: img.key,
                                  }))
                                }
                                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                  currentTab === img.key
                                    ? "border-sky-400 scale-105 shadow-md shadow-sky-500/50"
                                    : "border-slate-700 opacity-60 hover:opacity-100"
                                }`}
                              >
                                <Image
                                  src={img.src}
                                  alt={img.label}
                                  fill
                                  className="object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Fullscreen Modal Portaled to Document Body (z-[9999]) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-xl"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-5xl w-full max-h-[92vh] glass-container rounded-3xl p-4 sm:p-6 border border-white/20 overflow-hidden flex flex-col items-center shadow-2xl bg-slate-950/90 z-[10000]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Prominent Modal Close Button - Elevated Above All Elements */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-[10001] p-2.5 rounded-full bg-slate-900 text-slate-200 hover:text-white border border-white/30 shadow-xl hover:scale-110 transition-all hover:bg-indigo-600 flex items-center gap-1.5 text-xs font-semibold"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-white" />
                    <span className="hidden sm:inline pr-1">Close</span>
                  </button>

                  {/* Lightbox High-Res Image Display */}
                  <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden bg-slate-950/80 flex items-center justify-center p-2 mt-8 sm:mt-2">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Image Description Footer */}
                  <div className="pt-3 text-center space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-slate-100">
                      {selectedImage.label}
                    </h4>
                    <p className="text-xs text-indigo-300 font-medium">
                      {selectedImage.sublabel} (Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">ESC</kbd> or click outside to close)
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
