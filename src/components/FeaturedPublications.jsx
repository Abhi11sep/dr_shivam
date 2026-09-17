"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  ExternalLink,
  Quote,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  CheckCircle2,
  Pause,
  Play,
} from "lucide-react";

export default function FeaturedPublications() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedBib, setExpandedBib] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const publications = [
    {
      id: 1,
      title: "Review of current and future indoor air purifying technologies",
      authors: ["Shivam Singh", "Pratibha Vishwakarma", "Tarun Gupta"],
      venue: "ACS ES&T Engineering",
      volume: "Volume 4, Issue 11, Pages 2607–2630",
      year: "2024",
      status: "Published",
      type: "Review Article",
      image: "/publications/pub1.png",
      doi: "https://pubs.acs.org/doi/10.1021/acsestengg.3c00483",
      bibtex: `@article{singh2024review,
  title={Review of current and future indoor air purifying technologies},
  author={Singh, Shivam and Vishwakarma, Pratibha and Gupta, Tarun},
  journal={ACS ES\\&T Engineering},
  volume={4},
  number={11},
  pages={2607--2630},
  year={2024},
  publisher={ACS Publications}
}`,
    },
    {
      id: 2,
      title:
        "Innovative integration of wind transformation in AI models for real-time carcinogenic risk assessment",
      authors: ["Shivam Singh", "Pratibha Vishwakarma", "Tarun Gupta"],
      venue: "npj Clean Air (Nature Portfolio)",
      volume: "Volume 1, Article number 34",
      year: "2025",
      status: "Published",
      type: "Original Article",
      image: "/publications/pub2.png",
      doi: "https://doi.org/10.1038/s44407-025-00035-4",
      bibtex: `@article{singh2025innovative,
  title={Innovative integration of wind transformation in AI models for real-time carcinogenic risk assessment},
  author={Singh, Shivam and Vishwakarma, Pratibha and Gupta, Tarun},
  journal={npj Clean Air},
  volume={1},
  number={1},
  pages={34},
  year={2025},
  publisher={Nature Portfolio}
}`,
    },
    {
      id: 3,
      title:
        "Atmospheric and health impact of fine particulate-bound organic pollutant: a probabilistic carcinogenic risk assessment with sensitivity analysis",
      authors: ["Pratibha Vishwakarma", "Shivam Singh", "Tarun Gupta"],
      venue: "Environmental Geochemistry and Health (Springer Nature)",
      volume: "Volume 48, Article number 66",
      year: "2026",
      status: "Published",
      type: "Original Article",
      image: "/publications/pub3.png",
      doi: "https://link.springer.com/journal/10653",
      bibtex: `@article{vishwakarma2026atmospheric,
  title={Atmospheric and health impact of fine particulate-bound organic pollutant: a probabilistic carcinogenic risk assessment with sensitivity analysis},
  author={Vishwakarma, Pratibha and Singh, Shivam and Gupta, Tarun},
  journal={Environmental Geochemistry and Health},
  volume={48},
  number={2},
  pages={66},
  year={2026},
  publisher={Springer Nature}
}`,
    },
    {
      id: 4,
      title:
        "Comprehensive Analysis of Spark Splashing, Particulate Metal Emissions, Associated Health Risk, and Ergonomic Load During Abrasive Chop Saw Metal Cutting: A Sustainable Emission Control Strategy for Green Manufacturing",
      authors: [
        "Gopal Ashok Gupta",
        "Shivam Singh",
        "Rohit Singh",
        "Janakarajan Ramkumar",
        "Sandip Patil",
        "Tarun Gupta",
      ],
      venue:
        "Springer Nature: International Journal of Precision Engineering and Manufacturing-Green Technology",
      volume: "Submitted & Under Review",
      year: "2026",
      status: "Under Review",
      type: "Journal Manuscript",
      image: null,
      doi: null,
      bibtex: null,
    },
    {
      id: 5,
      title:
        "Monopolar Electrostatically Assisted Air Filtration: Discharge-Free Electrostatic Enhancement for Efficient Submicron Particle Removal",
      authors: ["Shivam Singh", "Tarun Gupta"],
      venue: "ACS ES&T Engineering",
      volume: "Communicated",
      year: "2026",
      status: "Communicated",
      type: "Journal Manuscript",
      image: null,
      doi: null,
      bibtex: null,
    },
    {
      id: 6,
      title:
        "Engineering Blue-Emissive Nanocarbon from Atmospheric Particulate Matter (PM2.5) for Sustainable Agricultural Applications",
      authors: [
        "Nazrul Islam",
        "Indra Mohan Nigam",
        "Seema Prajapati",
        "Prerna Thepiyal",
        "Anupama Singh",
        "Shivam Singh",
        "Priyanka Gogoi",
        "Pragya Prasasti Goswami",
        "Binoy K Saikia",
        "Puja Khare",
        "Tarun Gupta",
      ],
      venue: "ACS Environmental Au",
      volume: "Communicated",
      year: "2026",
      status: "Communicated",
      type: "Journal Manuscript",
      image: null,
      doi: null,
      bibtex: null,
    },
    {
      id: 7,
      title:
        "Bagasse-Based Micro-cellulose Air Filter: A biodegradable and economical solution",
      authors: ["Shivam Singh", "Pratibha Vishwakarma", "Tarun Gupta"],
      venue: "Environmental Science & Technology / Filtration Journal",
      volume: "Under Process",
      year: "2026",
      status: "Under Process",
      type: "Journal Manuscript",
      image: null,
      doi: null,
      bibtex: null,
    },
  ];

  const carouselItems = publications.filter((p) => p.status === "Published");

  // Clockwise Auto-Rotation Timer for 3D Carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselItems.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused, carouselItems.length]);

  const filteredPublications = publications.filter((p) => {
    if (activeFilter === "published") return p.status === "Published";
    if (activeFilter === "review") return p.status !== "Published";
    return true;
  });

  const copyBibtex = (bibtex, id) => {
    if (!bibtex) return;
    navigator.clipboard.writeText(bibtex);
    setCopiedIdx(id);
    setTimeout(() => setCopiedIdx(null), 2500);
  };

  return (
    <section id="publications" className="relative py-24 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research Output</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Publications & <span className="text-gradient">Manuscripts</span>
            </h2>
            <p className="text-slate-400 text-base">
              Peer-reviewed high-impact journal publications and active research manuscripts from APTL Lab, IIT Kanpur.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-container border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All ({publications.length})
            </button>
            <button
              onClick={() => setActiveFilter("published")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === "published"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Published ({carouselItems.length})
            </button>
            <button
              onClick={() => setActiveFilter("review")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === "review"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Under Review ({publications.length - carouselItems.length})
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Publication List (Left) + Vertical Image Carousel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Publication List */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {filteredPublications.map((paper, idx) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card rounded-3xl p-6 sm:p-7 relative border-white/10 hover:border-indigo-500/40 transition-all"
              >
                <div className="space-y-4">
                  
                  {/* Status & Badges Bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {paper.year}
                    </span>

                    {paper.status === "Published" ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Published</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{paper.status}</span>
                      </span>
                    )}

                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 text-slate-300 border border-slate-700/60">
                      {paper.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-100 hover:text-indigo-300 transition-colors leading-snug">
                    {paper.doi ? (
                      <a href={paper.doi} target="_blank" rel="noopener noreferrer">
                        {paper.title}
                      </a>
                    ) : (
                      <span>{paper.title}</span>
                    )}
                  </h3>

                  {/* Authors List */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-normal">
                    <span className="text-slate-400 font-medium">Authors: </span>
                    {paper.authors.map((author, aIdx) => {
                      const isShivam =
                        author.includes("Shivam") || author.includes("Singh, S.");
                      return (
                        <span key={aIdx}>
                          <span
                            className={
                              isShivam
                                ? "font-bold text-indigo-300 underline decoration-indigo-500/60 underline-offset-4"
                                : "text-slate-300"
                            }
                          >
                            {author}
                          </span>
                          {aIdx < paper.authors.length - 1 ? ", " : ""}
                        </span>
                      );
                    })}
                  </p>

                  {/* Journal / Venue Information */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-400">
                    <span className="text-indigo-300">
                      Journal: <span className="text-slate-200">{paper.venue}</span>
                    </span>
                    {paper.volume && (
                      <span className="text-slate-400">
                        • <span className="text-slate-300 font-normal">{paper.volume}</span>
                      </span>
                    )}
                  </div>

                  {/* Actions & Links Bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {paper.doi && (
                      <a
                        href={paper.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl glass-button-primary text-xs font-semibold text-white flex items-center gap-1.5"
                      >
                        <span>View Publication / DOI</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {paper.bibtex && (
                      <button
                        onClick={() =>
                          setExpandedBib(expandedBib === paper.id ? null : paper.id)
                        }
                        className="px-4 py-2 rounded-xl glass-pill text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Quote className="w-3.5 h-3.5 text-indigo-400" />
                        <span>BibTeX</span>
                        {expandedBib === paper.id ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Collapsible BibTeX Box */}
                  {expandedBib === paper.id && paper.bibtex && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono text-indigo-300 uppercase">
                          BibTeX Citation
                        </span>
                        <button
                          onClick={() => copyBibtex(paper.bibtex, paper.id)}
                          className="px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          {copiedIdx === paper.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <span>Copy Citation</span>
                          )}
                        </button>
                      </div>
                      <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-2 bg-slate-900/60 rounded-xl">
                        {paper.bibtex}
                      </pre>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Normal Vertical Image Carousel (Moving Bottom to Top) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
            <div
              className="rounded-3xl glass-container border border-indigo-500/30 p-5 shadow-2xl space-y-4 relative overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Header Badge & Controls */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                    Published Previews
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Move Up Button */}
                  <button
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % carouselItems.length)
                    }
                    className="p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors"
                    title="Next (Move Up)"
                    aria-label="Next preview upward"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down Button */}
                  <button
                    onClick={() =>
                      setActiveIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
                    }
                    className="p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors"
                    title="Previous (Move Down)"
                    aria-label="Previous preview downward"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Pause / Play Toggle Button */}
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono hover:text-white transition-colors flex items-center gap-1"
                    title={isPaused ? "Play rotation" : "Pause rotation"}
                  >
                    {isPaused ? (
                      <Play className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Pause className="w-3 h-3 text-amber-400" />
                    )}
                    <span>{isPaused ? "Paused" : "Vertical Scroll"}</span>
                  </button>
                </div>
              </div>

              {/* Normal Vertical Bottom-to-Top Viewport Container */}
              <div className="relative h-[480px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950/60 border border-white/5">
                
                {carouselItems.map((paper, idx) => {
                  const total = carouselItems.length;
                  const diff = (idx - activeIndex + total) % total;

                  // Configure Clean Vertical Bottom-to-Top Positions (No 3D Tilts)
                  let yOffset = 0;
                  let scale = 1;
                  let zIndex = 10;
                  let opacity = 0.6;
                  let isFeatured = false;

                  if (diff === 0) {
                    // Center Active Card
                    yOffset = 0;
                    scale = 1;
                    zIndex = 30;
                    opacity = 1;
                    isFeatured = true;
                  } else if (diff === 1) {
                    // Bottom Card (moving upwards from bottom)
                    yOffset = 140;
                    scale = 0.88;
                    zIndex = 20;
                    opacity = 0.6;
                  } else {
                    // Top Card (moving upwards towards top)
                    yOffset = -140;
                    scale = 0.88;
                    zIndex = 20;
                    opacity = 0.6;
                  }

                  return (
                    <motion.div
                      key={paper.id}
                      animate={{
                        y: yOffset,
                        scale: scale,
                        opacity: opacity,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                      }}
                      style={{ zIndex }}
                      onClick={() => setActiveIndex(idx)}
                      className={`absolute w-64 sm:w-72 h-72 rounded-2xl p-3 cursor-pointer backdrop-blur-xl transition-all duration-300 ${
                        isFeatured
                          ? "bg-slate-900/95 border-2 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)] ring-2 ring-indigo-500/20"
                          : "bg-slate-900/75 border border-white/15 shadow-lg hover:border-slate-400"
                      }`}
                    >
                      {/* Inner Card Frame */}
                      <div className="w-full h-full rounded-xl overflow-hidden relative flex flex-col justify-between bg-slate-950 p-3">
                        {/* Journal Cover Screenshot */}
                        <div className="relative w-full h-36 rounded-lg overflow-hidden bg-slate-900 border border-white/10">
                          <Image
                            src={paper.image}
                            alt={paper.title}
                            fill
                            className="object-cover object-top"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/90 text-slate-950 text-[9px] font-extrabold uppercase shadow-md">
                            {paper.status}
                          </div>
                        </div>

                        {/* Journal Title & Name */}
                        <div className="space-y-1 pt-1.5">
                          <span className="text-[10px] font-mono text-indigo-400 font-bold block truncate">
                            {paper.venue}
                          </span>
                          <h4 className="text-xs font-bold text-slate-100 line-clamp-2 leading-tight">
                            {paper.title}
                          </h4>
                        </div>

                        {/* Bottom Footer */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-mono text-emerald-400 font-bold">
                            {paper.year}
                          </span>
                          {paper.doi ? (
                            <a
                              href={paper.doi}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-300 hover:text-white font-medium flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Read Article</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-indigo-300 font-medium flex items-center gap-1">
                              <span>Read Article</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

              </div>

              {/* Indicator Pills */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {carouselItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      activeIndex === idx
                        ? "w-6 bg-indigo-500 shadow-sm shadow-indigo-500"
                        : "w-1.5 bg-slate-700 hover:bg-slate-500"
                    }`}
                    aria-label={`Select paper preview ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
