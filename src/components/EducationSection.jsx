"use client";

import { useState, useEffect, useRef } from "react";
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
  Map as MapIcon,
  Play,
  Pause,
  RotateCcw,
  Navigation,
  ZoomIn,
  ZoomOut,
  Target,
  Crosshair,
} from "lucide-react";

export default function EducationSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState({});
  const [activeTab, setActiveTab] = useState("phd");
  const [viewMode, setViewMode] = useState("timeline"); // 'timeline', 'spotlight', 'map'

  // Dot-Tracking Camera Flight Engine State
  const [isMapPlaying, setIsMapPlaying] = useState(true); // Auto-starts automatically on mount
  const [cameraZoomMode, setCameraZoomMode] = useState("focused"); // 'focused' or 'overview'
  const [flightPos, setFlightPos] = useState({ x: 407, y: 244 }); // Starts at Lucknow RLB School
  const [activeMapStep, setActiveMapStep] = useState(0); // 0: 12th Lucknow, 1: BTech Lucknow, 2: MTech Prayagraj, 3: PhD Kanpur

  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    setMounted(true);
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

  // Quadratic Bezier Interpolation Helper
  const getQuadraticBezierPoint = (p0, p1, p2, t) => {
    const oneMinusT = 1 - t;
    const x = oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x;
    const y = oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y;
    return { x, y };
  };

  // 4-Phase Trajectory Engine: Lucknow (12th RLB) -> Lucknow (BTech BBDNITM) -> Prayagraj (MTech MNNIT) -> Kanpur (PhD IITK) -> Instant Jump Back to Lucknow
  useEffect(() => {
    if (!isMapPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    const duration = 14000; // 14 seconds full loop cycle

    // Waypoints
    const pLucknow12th = { x: 407, y: 244 }; // RLB School Lucknow
    const pLucknowBTech = { x: 420, y: 250 }; // BBDNITM Lucknow
    const pPrayagraj = { x: 486, y: 313 };   // MNNIT Allahabad
    const pKanpur = { x: 345, y: 261 };      // IIT Kanpur

    // Bezier control points
    const pCtrlLkoToPrg = { x: 460, y: 245 };
    const pCtrlPrgToKnp = { x: 410, y: 330 };

    const animateFlight = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) % duration;
      const progress = elapsed / duration; // 0.0 to 1.0

      let currentPoint;
      let currentStep = 0;

      if (progress < 0.20) {
        // Phase 1: Stop at Lucknow Schooling (12th RLB Memorial School)
        currentPoint = pLucknow12th;
        currentStep = 0;
      } else if (progress < 0.40) {
        // Phase 2: Micro-move to Lucknow Graduation (BTech BBDNITM)
        const tLocal = (progress - 0.20) / 0.20;
        currentPoint = {
          x: pLucknow12th.x + (pLucknowBTech.x - pLucknow12th.x) * tLocal,
          y: pLucknow12th.y + (pLucknowBTech.y - pLucknow12th.y) * tLocal,
        };
        currentStep = 1;
      } else if (progress < 0.65) {
        // Phase 3: Glide Flight from Lucknow to Prayagraj (MTech MNNIT)
        const tFlight1 = (progress - 0.40) / 0.25;
        currentPoint = getQuadraticBezierPoint(pLucknowBTech, pCtrlLkoToPrg, pPrayagraj, tFlight1);
        currentStep = tFlight1 < 0.5 ? 1 : 2;
      } else if (progress < 0.75) {
        // Phase 4: Stop at Prayagraj (MTech MNNIT Allahabad)
        currentPoint = pPrayagraj;
        currentStep = 2;
      } else if (progress < 0.92) {
        // Phase 5: Glide Flight from Prayagraj to Kanpur (PhD IIT Kanpur)
        const tFlight2 = (progress - 0.75) / 0.17;
        currentPoint = getQuadraticBezierPoint(pPrayagraj, pCtrlPrgToKnp, pKanpur, tFlight2);
        currentStep = tFlight2 < 0.5 ? 2 : 3;
      } else {
        // Phase 6: Final Stop at Kanpur (PhD IIT Kanpur) & Instant Jump Back to Lucknow (Start)
        currentPoint = pKanpur;
        currentStep = 3;
      }

      setFlightPos(currentPoint);
      setActiveMapStep(currentStep);

      animRef.current = requestAnimationFrame(animateFlight);
    };

    animRef.current = requestAnimationFrame(animateFlight);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isMapPlaying]);

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
      geo: {
        city: "Kanpur",
        coords: { x: 345, y: 261 },
        lat: "26.5123° N",
        lng: "80.2329° E",
        stepIndex: 3,
      }
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
      geo: {
        city: "Prayagraj",
        coords: { x: 486, y: 313 },
        lat: "25.4358° N",
        lng: "81.8463° E",
        stepIndex: 2,
      }
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
      geo: {
        city: "Lucknow",
        coords: { x: 420, y: 250 },
        lat: "26.8467° N",
        lng: "80.9462° E",
        stepIndex: 1,
      }
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
      geo: {
        city: "Lucknow",
        coords: { x: 407, y: 244 },
        lat: "26.8467° N",
        lng: "80.9462° E",
        stepIndex: 0,
      }
    },
  ];

  const handleImageError = (id) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const activeItem = educationData.find((d) => d.id === activeTab) || educationData[0];

  // Map nodes array (4 distinct academic stops across UP)
  const mapNodes = [
    {
      id: "lucknow_12th",
      city: "Lucknow (Schooling)",
      label: "RLB School (12th)",
      title: "12th CBSE (89.4%)",
      inst: "Rani Laxmi Bai Memorial School",
      period: "2011–2012",
      coords: { x: 407, y: 244 },
      step: 0,
      color: "#c084fc",
      eduId: "12th",
      lat: "26.8467° N",
      lng: "80.9462° E",
    },
    {
      id: "lucknow_btech",
      city: "Lucknow (BTech)",
      label: "BBDNITM (BTech)",
      title: "BTech (77.12%)",
      inst: "BBDNITM Lucknow (AKTU)",
      period: "2012–2016",
      coords: { x: 420, y: 250 },
      step: 1,
      color: "#38bdf8",
      eduId: "btech",
      lat: "26.8467° N",
      lng: "80.9462° E",
    },
    {
      id: "prayagraj_mtech",
      city: "Prayagraj",
      label: "MNNIT (MTech)",
      title: "MTech (CPI: 9/10)",
      inst: "MNNIT Allahabad",
      period: "2017–2019",
      coords: { x: 486, y: 313 },
      step: 2,
      color: "#818cf8",
      eduId: "mtech",
      lat: "25.4358° N",
      lng: "81.8463° E",
    },
    {
      id: "kanpur_phd",
      city: "Kanpur",
      label: "IIT Kanpur (PhD)",
      title: "PhD (CPI: 10/10)",
      inst: "IIT Kanpur",
      period: "2020–2026",
      coords: { x: 345, y: 261 },
      step: 3,
      color: "#34d399",
      eduId: "phd",
      lat: "26.5123° N",
      lng: "80.2329° E",
    },
  ];

  const currentNode = mapNodes[activeMapStep];
  
  // Tracked camera viewBox follows flightPos directly
  const trackedViewBox =
    cameraZoomMode === "overview"
      ? "0 0 800 450"
      : `${Math.round(flightPos.x - 130)} ${Math.round(flightPos.y - 95)} 260 190`;

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

              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  viewMode === "map"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-400/50"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-emerald-300" />
                <span>UP Dot-Flight Map</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPACT UTTAR PRADESH MAP WITH LUCKNOW SCHOOLING STOPS & DIRECT JUMP LOOP  */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-container rounded-3xl p-5 sm:p-6 border border-white/20 relative overflow-hidden shadow-2xl bg-slate-950/90"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/15 via-indigo-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 relative z-10">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
                  Sequential Flight Route • Lucknow Start ➔ Kanpur ➔ Jump Restart
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-100">
                UP Academic <span className="text-gradient">Flight Motion Route</span>
              </h3>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsMapPlaying(!isMapPlaying)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  isMapPlaying
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30 border border-emerald-300/50"
                    : "glass-pill text-slate-200 hover:text-white"
                }`}
              >
                {isMapPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isMapPlaying ? "Pause Tracking" : "Resume Flight"}</span>
              </button>

              <button
                onClick={() =>
                  setCameraZoomMode(cameraZoomMode === "overview" ? "focused" : "overview")
                }
                className="px-3 py-1.5 rounded-xl glass-pill text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1"
              >
                {cameraZoomMode === "overview" ? (
                  <>
                    <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Lock Camera</span>
                  </>
                ) : (
                  <>
                    <ZoomOut className="w-3.5 h-3.5 text-indigo-400" />
                    <span>State View</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dual Column Layout: Compact Canvas (~280px) & Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4 relative z-10">
            
            {/* Left: Dot-Locked Camera Panning Map Canvas */}
            <div className="lg:col-span-7 flex">
              <div className="relative w-full h-[280px] sm:h-[300px] rounded-2xl bg-slate-950 border border-white/15 overflow-hidden shadow-2xl flex items-center justify-center p-1">
                
                {/* Realtime Telemetry Overlay */}
                <div className="absolute top-2.5 left-2.5 z-30 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg glass-container border border-white/15 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-md bg-slate-950/90">
                    <Crosshair className="w-3 h-3 text-emerald-400 animate-spin" />
                    <span>CAM FOCUS: <strong className="text-white font-bold uppercase">{currentNode.label}</strong></span>
                  </div>
                </div>

                <div className="absolute top-2.5 right-2.5 z-30">
                  <span className="px-2.5 py-1 rounded-lg glass-container border border-emerald-500/30 text-[9px] font-mono text-emerald-400 uppercase tracking-wider bg-slate-950/90 shadow-md">
                    {cameraZoomMode === "overview" ? "OVERVIEW 1.0x" : "CAM LOCK 2.5x"}
                  </span>
                </div>

                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

                {/* SVG Viewport */}
                <svg
                  viewBox={trackedViewBox}
                  className="w-full h-full transition-all duration-300 ease-out drop-shadow-[0_0_25px_rgba(99,102,241,0.3)]"
                >
                  <defs>
                    <linearGradient id="gangesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
                    </linearGradient>

                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>

                    <radialGradient id="dotPulseGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Uttar Pradesh State Boundary Outline */}
                  <path
                    href="/education/uttar-pradesh.svg"
                    x="0"
                    y="0"
                    width="800"
                    height="450"
                    preserveAspectRatio="xMidYMid meet"
                  />

                  {/* Rivers */}
                  <path
                    d="M 150 150 Q 280 210 345 261 Q 420 290 486 313 Q 600 340 700 320"
                    fill="none"
                    stroke="url(#gangesGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Forward Route Path (Lucknow -> Prayagraj -> Kanpur) */}
                  <path
                    d="M 407 244 L 420 250 Q 460 245 486 313 Q 410 330 345 261"
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />

                  {/* INSTITUTION BEACON NODES (4 INSTITUTION STOPS) */}
                  {mapNodes.map((node) => {
                    const isNodeActive = activeMapStep === node.step;

                    return (
                      <g key={node.id}>
                        {isNodeActive && (
                          <circle
                            cx={node.coords.x}
                            cy={node.coords.y}
                            r="16"
                            fill="none"
                            stroke={node.color}
                            strokeWidth="2"
                            opacity="0.8"
                          >
                            <animate
                              attributeName="r"
                              values="8;20;8"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}

                        <circle
                          cx={node.coords.x}
                          cy={node.coords.y}
                          r={isNodeActive ? "8" : "5"}
                          fill={node.color}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />

                        {/* City Label */}
                        <g transform={`translate(${node.coords.x}, ${node.coords.y - 14})`}>
                          <rect
                            x="-50"
                            y="-16"
                            width="100"
                            height="18"
                            rx="5"
                            fill="#020617"
                            fillOpacity="0.9"
                            stroke={isNodeActive ? node.color : "rgba(255,255,255,0.2)"}
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="-4"
                            fill={isNodeActive ? "#ffffff" : "#94a3b8"}
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="sans-serif"
                          >
                            {node.label}
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* CONTINUOUS MOVING DOT & CAMERA TRACKER RETICLE */}
                  <g transform={`translate(${flightPos.x}, ${flightPos.y})`}>
                    <circle r="22" fill="url(#dotPulseGlow)" />
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#34d399" strokeWidth="1.2" opacity="0.8" />
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#34d399" strokeWidth="1.2" opacity="0.8" />
                    <circle r="6" fill="#34d399" stroke="#ffffff" strokeWidth="2" />
                  </g>

                </svg>

                {/* Bottom Bar */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 px-2.5 py-1 rounded-xl glass-container border border-white/10 text-[10px] bg-slate-950/90 shadow-md">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-slate-400 font-mono">Stops:</span>
                    {mapNodes.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          setIsMapPlaying(false);
                          setFlightPos(n.coords);
                          setActiveMapStep(n.step);
                          setActiveTab(n.eduId);
                          setCameraZoomMode("focused");
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                          activeMapStep === n.step
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-slate-900 text-slate-300 hover:text-white"
                        }`}
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>

                  <span className="text-emerald-400 font-mono text-[9px]">
                    {isMapPlaying ? "Start: LKO ➔ KNP Jump Loop" : "Paused"}
                  </span>
                </div>

              </div>
            </div>

            {/* Right: Compact Detail Inspection Card */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              {(() => {
                const matchedEdu = educationData.find((e) => e.id === currentNode.eduId);

                return (
                  <motion.div
                    key={currentNode.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col justify-between h-[280px] sm:h-[300px] bg-slate-950/90 shadow-2xl relative overflow-hidden"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                          <span className="text-xs font-black text-slate-100 uppercase tracking-wide">
                            Camera Focused: {currentNode.label}
                          </span>
                        </div>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/40 text-indigo-300">
                          Stop {currentNode.step + 1} of 4
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block">
                          {matchedEdu.level} • {matchedEdu.period}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                          {matchedEdu.degree}
                        </h4>
                        <p className="text-xs text-indigo-200 font-semibold truncate">
                          {matchedEdu.institution}
                        </p>
                      </div>

                      {matchedEdu.thesisTitle ? (
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-indigo-500/20 text-xs space-y-0.5">
                          <span className="text-[9px] text-emerald-400 font-semibold uppercase block">
                            Thesis Focus:
                          </span>
                          <p className="text-slate-200 italic font-medium text-[11px] line-clamp-2">
                            "{matchedEdu.thesisTitle}"
                          </p>
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-purple-500/20 text-xs space-y-0.5">
                          <span className="text-[9px] text-purple-400 font-semibold uppercase block">
                            Schooling Foundation:
                          </span>
                          <p className="text-slate-300 font-medium text-[11px]">
                            Central Board of Secondary Education (CBSE) High Academic Record
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 space-y-0.5">
                          <span className="text-[9px] text-slate-400 font-medium block">Academic Score</span>
                          <span className="font-extrabold text-emerald-400 block text-xs">
                            {matchedEdu.score}
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 space-y-0.5">
                          <span className="text-[9px] text-slate-400 font-medium block">Live GPS Position</span>
                          <span className="font-bold text-slate-300 block text-[10px] font-mono truncate">
                            {currentNode.lat}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab(matchedEdu.id);
                          setViewMode("spotlight");
                        }}
                        className="w-full py-2 rounded-xl glass-button-primary text-white text-xs font-semibold flex items-center justify-center gap-1 group"
                      >
                        <span>Explore {matchedEdu.code} Details</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })()}
            </div>

          </div>
        </motion.div>

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
                        "{activeItem.thesisTitle}"
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
                            "{item.thesisTitle}"
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
