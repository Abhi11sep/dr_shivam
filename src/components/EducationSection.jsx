"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Building2,
  BookOpen,
  UserCheck,
  Award,
  Maximize2,
  X,
  Sparkles,
  ChevronRight,
  GitCommit,
  CheckCircle2,
  Compass,
} from "lucide-react";

export default function EducationSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState({});
  const [activeTab, setActiveTab] = useState("phd");
  const [viewMode, setViewMode] = useState("timeline"); // 'timeline' or 'spotlight'

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Handle ESC key press for closing modal
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

  const educationData = [
    {
      id: "phd",
      degree: "Doctor of Philosophy (PhD)",
      level: "Doctoral Degree",
      shortDegree: "Ph.D. Civil Engineering",
      score: "CPI: 10/10",
      scoreValue: "10/10",
      scoreMetric: "CPI",
      scoreLabel: "Perfect 10 CPI • Highest Distinction",
      isHighlightedScore: true,
      department: "Civil Engineering Department (Environmental Engineering Branch)",
      institution: "Indian Institute of Technology Kanpur",
      acronym: "IIT Kanpur",
      code: "IITK",
      address: "Kanpur, Uttar Pradesh, India – 208016",
      thesisTitle: "Development of Novel Indoor Air Purification Technology",
      supervisor: "Prof. Tarun Gupta",
      period: "2020 – 2026",
      location: "Kanpur, India",
      imageSrc: "/education/iit_kanpur.jpg",
      imageAlt: "Indian Institute of Technology Kanpur (IIT Kanpur) Campus",
      badgeBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
      glowColor: "shadow-[0_0_50px_rgba(16,185,129,0.2)]",
      gradientAccent: "from-emerald-500/25 via-teal-500/15 to-transparent",
      iconBg: "from-emerald-500 via-teal-500 to-cyan-600",
      tags: ["Indoor Air Quality", "Aerosol Science", "Air Filtration", "Electrostatics", "Patent Pending Tech"],
      svgGradient: { from: "#059669", to: "#0d9488" },
    },
    {
      id: "mtech",
      degree: "Master of Technology (MTech)",
      level: "Postgraduate Degree",
      shortDegree: "M.Tech Environmental Eng.",
      score: "CPI: 9/10",
      scoreValue: "9/10",
      scoreMetric: "CPI",
      scoreLabel: "First Class Distinction",
      isHighlightedScore: false,
      department: "Civil Engineering Department (Environmental Engineering Branch)",
      institution: "Motilal Nehru National Institute of Technology Allahabad",
      acronym: "MNNIT Allahabad",
      code: "MNNIT",
      address: "Prayagraj, Uttar Pradesh, India – 211004",
      thesisTitle: "Development of ANN and Fuzzy Based Models for Air Quality Prediction of Allahabad city",
      supervisor: "Prof. R. C. Vaishya",
      period: "2017 – 2019",
      location: "Prayagraj, India",
      imageSrc: "/education/mnnit_allahabad.jpg",
      imageAlt: "Motilal Nehru National Institute of Technology Allahabad (MNNIT) Campus",
      badgeBg: "bg-indigo-500/15 text-indigo-300 border-indigo-500/40",
      glowColor: "shadow-[0_0_50px_rgba(99,102,241,0.2)]",
      gradientAccent: "from-indigo-500/25 via-sky-500/15 to-transparent",
      iconBg: "from-indigo-500 via-sky-500 to-blue-600",
      tags: ["Air Quality Modeling", "Artificial Neural Networks (ANN)", "Fuzzy Logic", "Urban Pollution Forecasting"],
      svgGradient: { from: "#4f46e5", to: "#0284c7" },
    },
    {
      id: "btech",
      degree: "Bachelor of Technology (BTech)",
      level: "Undergraduate Degree",
      shortDegree: "B.Tech Civil Engineering",
      score: "77.12%",
      scoreValue: "77.12%",
      scoreMetric: "Marks",
      scoreLabel: "First Class with Honors",
      isHighlightedScore: false,
      department: "Civil Engineering Department",
      institution: "Babu Banarasi Das National Institute of Technology & Management",
      acronym: "BBDNITM Lucknow",
      code: "BBDNITM",
      address: "Lucknow, Uttar Pradesh, India – 226028",
      affiliation: "Affiliated by Dr. A. P. J. Abdul Kalam Technical University (AKTU), Uttar Pradesh, India",
      period: "2012 – 2016",
      location: "Lucknow, India",
      imageSrc: "/education/bbdnitm_lucknow.jpg",
      imageAlt: "Babu Banarasi Das National Institute of Technology & Management (BBDNITM) Lucknow Campus",
      badgeBg: "bg-sky-500/15 text-sky-300 border-sky-500/40",
      glowColor: "shadow-[0_0_50px_rgba(56,189,248,0.2)]",
      gradientAccent: "from-sky-500/25 via-purple-500/15 to-transparent",
      iconBg: "from-sky-500 via-purple-500 to-indigo-600",
      tags: ["Structural Mechanics", "Fluid Dynamics", "Environmental Impact Assessment", "Surveying & CAD"],
      svgGradient: { from: "#0284c7", to: "#7c3aed" },
    },
    {
      id: "12th",
      degree: "Higher Secondary Education (12th)",
      level: "Senior Secondary (CBSE)",
      shortDegree: "12th Science Stream",
      score: "89.4%",
      scoreValue: "89.4%",
      scoreMetric: "Marks",
      scoreLabel: "Distinction Record",
      isHighlightedScore: false,
      department: "Science Stream (PCM & Computer Science)",
      institution: "Rani Laxmi Bai Memorial School",
      acronym: "RLB Lucknow",
      code: "RLBMS",
      address: "Sarvoday Nagar, Lucknow, U.P., India – 226016",
      affiliation: "Central Board of Secondary Education (CBSE)",
      period: "2011 – 2012",
      location: "Lucknow, India",
      imageSrc: "/education/rlb_lucknow.jpg",
      imageAlt: "Rani Laxmi Bai Memorial School Lucknow Campus",
      badgeBg: "bg-purple-500/15 text-purple-300 border-purple-500/40",
      glowColor: "shadow-[0_0_50px_rgba(168,85,247,0.2)]",
      gradientAccent: "from-purple-500/25 via-pink-500/15 to-transparent",
      iconBg: "from-purple-500 via-pink-500 to-rose-600",
      tags: ["Physics", "Chemistry", "Mathematics", "Computer Science", "CBSE Excellence"],
      svgGradient: { from: "#9333ea", to: "#e11d48" },
    },
  ];

  const handleImageError = (id) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const activeItem = educationData.find((d) => d.id === activeTab) || educationData[0];

  return (
    <section id="education" className="relative py-28 bg-slate-950 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none animate-blob-1"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[140px] rounded-full pointer-events-none animate-blob-2"></div>
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none animate-blob-3"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-widest shadow-lg shadow-indigo-500/10">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Academic Qualifications & Pedigree</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-none">
            Educational <span className="text-gradient-accent">Background</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Academic progression starting from <strong className="text-purple-300">Lucknow</strong> (12th RLB & BTech BBDNITM) ➔ <strong className="text-indigo-300">Prayagraj</strong> (MTech MNNIT) ➔ <strong className="text-emerald-300">IIT Kanpur</strong> (PhD).
          </p>

          {/* View Mode Controllers */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="p-1.5 rounded-full glass-container border border-white/10 inline-flex flex-wrap items-center justify-center gap-1 shadow-inner">
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  viewMode === "timeline"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>Full Timeline</span>
              </button>

              <button
                onClick={() => setViewMode("spotlight")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  viewMode === "spotlight"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Spotlight View</span>
              </button>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: INTERACTIVE SPOTLIGHT MODE (3D Stage & Interactive Node Switcher) */}
        {/* ========================================================================= */}
        {viewMode === "spotlight" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Quick Degree Selector Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {educationData.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-2 ${
                      isActive
                        ? "glass-container border-indigo-400/60 shadow-xl shadow-indigo-500/20 scale-[1.02]"
                        : "glass-card border-white/5 opacity-70 hover:opacity-100 hover:border-white/20"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-500/30 to-transparent rounded-bl-full pointer-events-none"></div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {item.period}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg}`}>
                        {item.score}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-100 leading-snug">
                        {item.code}
                      </h4>
                      <p className="text-[11px] text-indigo-300 font-medium truncate">
                        {item.degree}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Active Spotlight Card */}
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`glass-container rounded-3xl p-6 sm:p-10 border border-white/20 relative overflow-hidden ${activeItem.glowColor}`}
            >
              <div className={`absolute -right-32 -top-32 w-96 h-96 rounded-full bg-gradient-to-br ${activeItem.gradientAccent} blur-3xl pointer-events-none`}></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                
                {/* Left side: Detailed Academic Overview */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Badges Bar */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${activeItem.badgeBg} flex items-center gap-1.5 shadow-sm`}>
                      <Award className="w-4 h-4" />
                      <span>{activeItem.scoreLabel}</span>
                    </span>

                    {activeItem.isHighlightedScore && (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-md">
                        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                        <span>Perfect 10/10 CPI</span>
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{activeItem.period}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{activeItem.location}</span>
                    </div>
                  </div>

                  {/* Degree & Institution */}
                  <div className="space-y-3">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                      {activeItem.level}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
                      {activeItem.degree}
                    </h3>

                    <div className="flex items-start gap-3 pt-2">
                      <div className={`p-3 rounded-2xl bg-gradient-to-tr ${activeItem.iconBg} text-white shadow-xl shrink-0`}>
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-indigo-200">
                          {activeItem.institution}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium">
                          {activeItem.department}
                        </p>
                        <p className="text-xs text-slate-400 pt-0.5">
                          {activeItem.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Affiliation notice */}
                  {activeItem.affiliation && (
                    <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 px-4 py-2.5 rounded-xl border border-white/10 shadow-inner">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{activeItem.affiliation}</span>
                    </div>
                  )}

                  {/* Thesis Box */}
                  {activeItem.thesisTitle && (
                    <div className="p-5 rounded-2xl glass-card border border-indigo-500/30 bg-slate-950/70 space-y-3 relative overflow-hidden shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-wider text-[11px]">
                          <BookOpen className="w-4 h-4 text-emerald-400" />
                          <span>Thesis & Research Monograph</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          Peer Reviewed Thesis
                        </span>
                      </div>

                      <p className="text-base font-semibold text-slate-100 leading-relaxed italic border-l-2 border-indigo-400 pl-3">
                        &ldquo;{activeItem.thesisTitle}&rdquo;
                      </p>

                      {activeItem.supervisor && (
                        <div className="flex items-center gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                          <UserCheck className="w-4 h-4 text-indigo-300 shrink-0" />
                          <span>
                            Doctoral Supervisor: <strong className="text-white font-bold">{activeItem.supervisor}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subject Focus Tags */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Core Academic Focus Domains:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 text-xs font-mono backdrop-blur-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right side: Institution Photo Frame */}
                <div className="lg:col-span-5">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    
                    <div className="relative rounded-3xl glass-card overflow-hidden border border-white/20 p-3 shadow-2xl bg-slate-950/90 space-y-3">
                      
                      <div
                        className="relative w-full h-72 rounded-2xl overflow-hidden cursor-pointer group/img bg-slate-900 flex flex-col items-center justify-center p-4 border border-white/10"
                        onClick={() =>
                          setSelectedImage({
                            src: activeItem.imageSrc,
                            title: activeItem.institution,
                            degree: activeItem.degree,
                            alt: activeItem.imageAlt,
                            isFailed: imageErrorMap[activeItem.id],
                            code: activeItem.code,
                            svgGradient: activeItem.svgGradient
                          })
                        }
                      >
                        {!imageErrorMap[activeItem.id] ? (
                          <Image
                            src={activeItem.imageSrc}
                            alt={activeItem.imageAlt}
                            fill
                            onError={() => handleImageError(activeItem.id)}
                            className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                          />
                        ) : (
                          /* Innovative Institution SVG Emblem Graphic Placeholder */
                          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <linearGradient id={`grad-${activeItem.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor={activeItem.svgGradient.from} />
                                  <stop offset="100%" stopColor={activeItem.svgGradient.to} />
                                </linearGradient>
                              </defs>
                              <rect width="100%" height="100%" fill={`url(#grad-${activeItem.id})`} />
                              <circle cx="50%" cy="50%" r="90" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                            </svg>

                            <div className="relative z-10 space-y-3 flex flex-col items-center">
                              <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-white/20 flex items-center justify-center shadow-xl group-hover/img:scale-110 transition-transform">
                                <Building2 className="w-8 h-8 text-indigo-300" />
                              </div>
                              <div>
                                <span className="text-base font-black text-white tracking-wide block">
                                  {activeItem.code}
                                </span>
                                <span className="text-xs font-semibold text-indigo-300 block">
                                  {activeItem.acronym}
                                </span>
                              </div>
                              <div className="pt-1">
                                <span className="text-[10px] font-mono text-emerald-300 bg-slate-950/80 px-3 py-1 rounded-full border border-emerald-500/40 block">
                                  Photo Slot Ready (`public{activeItem.imageSrc}`)
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white backdrop-blur-[2px]">
                          <div className="p-3.5 rounded-full bg-indigo-600/90 shadow-lg border border-white/30">
                            <Maximize2 className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-xs font-semibold tracking-wider uppercase bg-slate-900/90 px-3.5 py-1 rounded-full border border-white/20">
                            Click to View High-Res
                          </span>
                        </div>
                      </div>

                      {/* Card Caption */}
                      <div className="p-2 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-slate-100 block">
                            {activeItem.acronym}
                          </span>
                          <span className="text-xs text-indigo-300 font-medium">
                            {activeItem.shortDegree}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-emerald-400 block">
                            {activeItem.score}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {activeItem.period}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: FULL VERTICAL TIMELINE MODE                                      */}
        {/* ========================================================================= */}
        {viewMode === "timeline" && (
          <div className="relative space-y-12">
            
            {educationData.map((item, index) => {
              const isImageFailed = imageErrorMap[item.id];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`glass-container rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden ${item.glowColor}`}
                >
                  <div className={`absolute -right-28 -top-28 w-80 h-80 rounded-full bg-gradient-to-br ${item.gradientAccent} blur-3xl pointer-events-none`}></div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    
                    {/* Left Column: Degree & Details */}
                    <div className="lg:col-span-7 space-y-5">
                      
                      {/* Top Badges & Duration Bar */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${item.badgeBg} flex items-center gap-1.5 shadow-sm`}>
                          <Award className="w-4 h-4" />
                          <span>{item.score}</span>
                        </span>

                        {item.isHighlightedScore && (
                          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                            <span>CPI 10 / 10 Record</span>
                          </span>
                        )}

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold bg-slate-900/60 px-3 py-1 rounded-full border border-white/5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{item.period}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold bg-slate-900/60 px-3 py-1 rounded-full border border-white/5">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Degree Title & Institution */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
                          {item.level}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-tight">
                          {item.degree}
                        </h3>

                        <div className="flex items-start gap-3 pt-1">
                          <div className={`p-2.5 rounded-2xl bg-gradient-to-tr ${item.iconBg} text-white shadow-lg shrink-0 mt-0.5`}>
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-indigo-200">
                              {item.institution}
                            </h4>
                            <p className="text-xs text-slate-300">
                              {item.department}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium pt-0.5">
                              {item.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Affiliation info */}
                      {item.affiliation && (
                        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/50 px-3.5 py-2.5 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                          <span>{item.affiliation}</span>
                        </div>
                      )}

                      {/* Thesis Details (PhD & MTech) */}
                      {item.thesisTitle && (
                        <div className="p-4 rounded-2xl glass-card text-xs space-y-2 border border-indigo-500/20 bg-slate-950/60 shadow-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-indigo-300 font-bold uppercase tracking-wider text-[10px]">
                              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Thesis Title</span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400">Research Focus</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-100 leading-snug italic border-l-2 border-indigo-400 pl-2.5">
                            &ldquo;{item.thesisTitle}&rdquo;
                          </p>
                          {item.supervisor && (
                            <div className="flex items-center gap-1.5 text-slate-300 text-xs pt-1.5 border-t border-slate-800">
                              <UserCheck className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                              <span>
                                Supervisor: <strong className="text-white font-bold">{item.supervisor}</strong>
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Research Hashtags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-full bg-slate-950/60 border border-white/10 text-slate-400 text-[11px] font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Right Column: Institution Photo Display & Interactive Frame */}
                    <div className="lg:col-span-5">
                      <div className="relative group">
                        
                        {/* Frame Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>

                        <div className="relative rounded-2xl glass-card overflow-hidden border border-white/20 p-3 shadow-2xl bg-slate-950/90">
                          
                          <div
                            className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden cursor-pointer group/img bg-slate-900 flex flex-col items-center justify-center text-center p-4 border border-white/10"
                            onClick={() =>
                              setSelectedImage({
                                src: item.imageSrc,
                                title: item.institution,
                                degree: item.degree,
                                alt: item.imageAlt,
                                isFailed: isImageFailed,
                                code: item.code,
                                svgGradient: item.svgGradient
                              })
                            }
                          >
                            {!isImageFailed ? (
                              <Image
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                fill
                                onError={() => handleImageError(item.id)}
                                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                              />
                            ) : (
                              /* Bespoke SVG Emblem Placeholder */
                              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                                <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="50%" cy="50%" r="70" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                                </svg>
                                <div className="relative z-10 space-y-2 flex flex-col items-center">
                                  <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-white/20 flex items-center justify-center text-indigo-300 shadow-md group-hover/img:scale-110 transition-transform">
                                    <Building2 className="w-6 h-6 text-indigo-300" />
                                  </div>
                                  <div>
                                    <span className="text-sm font-black text-slate-100 block">
                                      {item.code}
                                    </span>
                                    <span className="text-[11px] text-slate-400 block">
                                      {item.acronym}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-800/50">
                                    public{item.imageSrc}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Hover Zoom Overlay Badge */}
                            <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white backdrop-blur-[2px]">
                              <div className="p-3 rounded-full bg-indigo-600/90 shadow-lg border border-white/30">
                                <Maximize2 className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-xs font-semibold tracking-wider uppercase bg-slate-900/90 px-3 py-1 rounded-full border border-white/20">
                                Expand Institution Photo
                              </span>
                            </div>
                          </div>

                          {/* Image Caption Footer */}
                          <div className="pt-3 px-1 flex items-center justify-between">
                            <div>
                              <span className="text-xs font-bold text-slate-200 block truncate max-w-[200px]">
                                {item.institution}
                              </span>
                              <span className="text-[11px] text-indigo-300 block font-medium">
                                {item.shortDegree}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-800/50">
                              {item.score}
                            </span>
                          </div>

                        </div>

                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>
        )}

      </div>

      {/* Lightbox Fullscreen Modal Portaled to Body (z-[9999]) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-2xl"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-5xl w-full max-h-[92vh] glass-container rounded-3xl p-4 sm:p-6 border border-white/20 overflow-hidden flex flex-col items-center shadow-2xl bg-slate-950/90 z-[10000]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Modal Button */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-[10001] p-2.5 rounded-full bg-slate-900 text-slate-200 hover:text-white border border-white/30 shadow-xl hover:scale-110 transition-all hover:bg-indigo-600 flex items-center gap-1.5 text-xs font-semibold"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-white" />
                    <span className="hidden sm:inline pr-1">Close</span>
                  </button>

                  {/* Modal Image Box */}
                  <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden bg-slate-950/90 flex items-center justify-center p-4 mt-8 sm:mt-2 border border-white/10">
                    {!selectedImage.isFailed ? (
                      <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt || selectedImage.title}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="text-center p-6 space-y-4 max-w-md">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-300">
                          <Building2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-100">{selectedImage.title}</h3>
                        <p className="text-sm text-indigo-300 font-semibold">{selectedImage.degree}</p>
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-400 space-y-2">
                          <p className="font-medium text-slate-300">Photo Slot Details:</p>
                          <p>Drop your high-resolution campus image into your project directory at:</p>
                          <code className="text-emerald-400 bg-slate-950 px-2.5 py-1 rounded border border-emerald-500/30 font-mono text-[11px] block text-center">
                            public{selectedImage.src}
                          </code>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div className="pt-3 text-center space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-slate-100">
                      {selectedImage.title}
                    </h4>
                    <p className="text-xs text-indigo-300 font-medium">
                      {selectedImage.degree} (Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">ESC</kbd> or click outside to close)
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

