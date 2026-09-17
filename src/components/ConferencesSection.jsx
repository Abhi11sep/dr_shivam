"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  MapPin,
  ExternalLink,
  Maximize2,
  X,
  Presentation,
  Target,
  Crosshair,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Map as MapIcon,
  ChevronRight,
  LayoutGrid,
  Compass,
  Radio,
  Plane,
} from "lucide-react";

export default function ConferencesSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid', 'spotlight', 'map'
  const [activeTab, setActiveTab] = useState("egu-2025");

  // Dot-Tracking World Camera Flight State
  const [isMapPlaying, setIsMapPlaying] = useState(true); // Auto-starts automatically on mount
  const [cameraZoomMode, setCameraZoomMode] = useState("focused"); // 'focused' or 'overview'
  const [flightPos, setFlightPos] = useState({ x: 436, y: 112 }); // Starts at Vienna, Austria
  const [activeMapStep, setActiveMapStep] = useState(0); // 0: Vienna, 1: Singapore, 2: Virtual, 3: Pune, 4: Navi Mumbai

  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    setMounted(true);
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

  // Quadratic Bezier Interpolation Helper
  const getQuadraticBezierPoint = (p0, p1, p2, t) => {
    const oneMinusT = 1 - t;
    const x = oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x;
    const y = oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y;
    return { x, y };
  };

  // Distinct Sequential Flight Schedule:
  // Vienna -> Singapore -> Virtual Node -> Pune (Dedicated Stop) -> Navi Mumbai (Dedicated Stop) -> Jump Restart to Vienna
  useEffect(() => {
    if (!isMapPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    const duration = 20000; // 20s full loop cycle allowing distinct time for both Pune & Navi Mumbai

    // Geographically Accurate World Waypoints (800x450 canvas projection)
    const pVienna = { x: 436, y: 112 };     // Vienna, Austria
    const pSingapore = { x: 635, y: 228 };  // Singapore
    const pVirtual = { x: 480, y: 45 };     // Global Satellite Orbit
    const pPune = { x: 555, y: 188 };       // Pune, India
    const pMumbai = { x: 546, y: 178 };     // Navi Mumbai, India

    // Bezier Control Points
    const pCtrlVieToSin = { x: 550, y: 110 };
    const pCtrlSinToVir = { x: 600, y: 100 };
    const pCtrlVirToPun = { x: 500, y: 120 };
    const pCtrlPunToMum = { x: 552, y: 180 };

    const animateFlight = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) % duration;
      const progress = elapsed / duration; // 0.0 to 1.0

      let currentPoint;
      let currentStep = 0;

      if (progress < 0.16) {
        // Stop 1: Vienna, Austria (EGU 2025)
        currentPoint = pVienna;
        currentStep = 0;
      } else if (progress < 0.36) {
        // Flight 1: Vienna -> Singapore
        const tLocal = (progress - 0.16) / 0.20;
        currentPoint = getQuadraticBezierPoint(pVienna, pCtrlVieToSin, pSingapore, tLocal);
        currentStep = tLocal < 0.5 ? 0 : 1;
      } else if (progress < 0.50) {
        // Stop 2: Singapore (Indoor Air 2026)
        currentPoint = pSingapore;
        currentStep = 1;
      } else if (progress < 0.64) {
        // Flight 2: Singapore -> Virtual Node
        const tLocal = (progress - 0.50) / 0.14;
        currentPoint = getQuadraticBezierPoint(pSingapore, pCtrlSinToVir, pVirtual, tLocal);
        currentStep = tLocal < 0.5 ? 1 : 2;
      } else if (progress < 0.74) {
        // Stop 3: Virtual Cloud Node (IGAC 2025)
        currentPoint = pVirtual;
        currentStep = 2;
      } else if (progress < 0.82) {
        // Flight 3: Virtual Node -> Pune, India
        const tLocal = (progress - 0.74) / 0.08;
        currentPoint = getQuadraticBezierPoint(pVirtual, pCtrlVirToPun, pPune, tLocal);
        currentStep = 3;
      } else if (progress < 0.90) {
        // Stop 4: DEDICATED STOP AT PUNE, INDIA (INTROMET 2025) - Clearly visible
        currentPoint = pPune;
        currentStep = 3;
      } else if (progress < 0.95) {
        // Flight 4: Short Flight from Pune to Navi Mumbai, India
        const tLocal = (progress - 0.90) / 0.05;
        currentPoint = getQuadraticBezierPoint(pPune, pCtrlPunToMum, pMumbai, tLocal);
        currentStep = tLocal < 0.5 ? 3 : 4;
      } else {
        // Stop 5: DEDICATED STOP AT NAVI MUMBAI, INDIA (IASTA 2023) & Jump Restart to Vienna
        currentPoint = pMumbai;
        currentStep = 4;
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

  const conferences = [
    {
      id: "egu-2025",
      name: "EGU-2025 General Assembly Conference",
      code: "EGU 2025",
      title:
        "Development of a Novel ANN-Based Predictive Model for Multi-Site ILCR Estimation Using Weather Parameters and PM2.5",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=jdU90D0AAAAJ&citation_for_view=jdU90D0AAAAJ:2osOgNQ5qMEC",
      venue: "Vienna, Austria",
      type: "International Conference",
      year: "2025",
      image: "/conferences/con1.jpg",
      alt: "EGU 2025 General Assembly Poster Presentation in Vienna, Austria",
      badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      geo: { city: "Vienna, Austria", coords: { x: 436, y: 112 }, lat: "48.2082° N | 16.3738° E", stepIndex: 0 }
    },
    {
      id: "indoor-air-2026",
      name: "Indoor Air 2026",
      code: "INDOOR AIR 2026",
      title:
        "Monopolar Electrostatically Enhanced Air Filtration: A Safe and Efficient Approach to Electrostatic Particle Capture",
      link: null,
      venue: "Singapore",
      type: "International Conference",
      year: "2026",
      image: "/conferences/con2.jpg",
      alt: "Indoor Air 2026 Conference Poster in Singapore",
      badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      geo: { city: "Singapore", coords: { x: 635, y: 228 }, lat: "1.3521° N | 103.8198° E", stepIndex: 1 }
    },
    {
      id: "igac-2025",
      name: "IGAC iCACCP ECR Conference 2025",
      code: "IGAC 2025",
      title:
        "Monopolar Electrostatically Enhanced Air Filtration: A Safe and Efficient Approach to Electrostatic Particle Capture",
      link: null,
      venue: "Virtual (Online)",
      type: "International ECR Conference",
      year: "2025",
      image: "/conferences/con3.png",
      alt: "IGAC iCACCP ECR Online Conference 2025",
      badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      geo: { city: "Virtual Cloud Node", coords: { x: 480, y: 45 }, lat: "Satellite Orbit Node", stepIndex: 2 }
    },
    {
      id: "intromet-2025",
      name: "INTROMET 2025",
      code: "INTROMET 2025",
      title:
        "A Novel ANN Approach for Predicting Multi-Site ILCR from Weather Parameters and PM2.5 Concentrations",
      link: null,
      venue: "Pune, India",
      type: "International Symposium",
      year: "2025",
      image: "/conferences/con4.jpg",
      alt: "INTROMET 2025 International Symposium on Tropical Meteorology in Pune",
      badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      geo: { city: "Pune, India", coords: { x: 555, y: 188 }, lat: "18.5204° N | 73.8567° E", stepIndex: 3 }
    },
    {
      id: "iasta-2023",
      name: "IASTA 2023",
      code: "IASTA 2023",
      title:
        "DEVELOPMENT OF A NOVEL DEVICE TO ENHANCE AEROSOL REMOVAL EFFICIENCY OF ANY NON-CONDUCTING AIR FILTER",
      link: null,
      venue: "Navi Mumbai, India",
      type: "National/International Conference",
      year: "2023",
      image: "/conferences/con5.png",
      alt: "IASTA 2023 Aerosol Conference",
      badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      geo: { city: "Navi Mumbai, India", coords: { x: 546, y: 178 }, lat: "19.0330° N | 73.0297° E", stepIndex: 4 }
    },
  ];

  // Geographically Aligned Venue Nodes
  const globalNodes = [
    { id: "egu-2025", label: "Vienna (Austria)", city: "Vienna, Austria", coords: { x: 436, y: 112 }, labelOffset: { dx: 0, dy: -14 }, step: 0, color: "#38bdf8", confId: "egu-2025", lat: "48.2082° N | 16.3738° E" },
    { id: "indoor-air-2026", label: "Singapore (SE Asia)", city: "Singapore", coords: { x: 635, y: 228 }, labelOffset: { dx: 0, dy: 16 }, step: 1, color: "#818cf8", confId: "indoor-air-2026", lat: "1.3521° N | 103.8198° E" },
    { id: "igac-2025", label: "Virtual (Global Cloud)", city: "Virtual Cloud Node", coords: { x: 480, y: 45 }, labelOffset: { dx: 0, dy: -14 }, step: 2, color: "#34d399", confId: "igac-2025", lat: "Global Satellite Orbit" },
    { id: "intromet-2025", label: "Pune (INTROMET 2025)", city: "Pune, India", coords: { x: 555, y: 188 }, labelOffset: { dx: 32, dy: 16 }, step: 3, color: "#fbbf24", confId: "intromet-2025", lat: "18.5204° N | 73.8567° E" },
    { id: "iasta-2023", label: "Navi Mumbai (IASTA 2023)", city: "Navi Mumbai, India", coords: { x: 546, y: 178 }, labelOffset: { dx: -42, dy: -14 }, step: 4, color: "#f43f5e", confId: "iasta-2023", lat: "19.0330° N | 73.0297° E" },
  ];

  const currentGlobalNode = globalNodes[activeMapStep] || globalNodes[0];

  // Dynamically tracked camera viewBox follows flightPos with smooth zoom
  const trackedViewBox =
    cameraZoomMode === "overview"
      ? "0 0 800 450"
      : `${Math.round(flightPos.x - 140)} ${Math.round(flightPos.y - 95)} 280 190`;

  return (
    <section id="conferences" className="relative py-28 bg-slate-950/90 overflow-hidden">
      {/* Background Cyberpunk Hologram Glow Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest shadow-lg shadow-cyan-500/10">
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span>Global Academic Presence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-none">
            International <span className="text-gradient">Conferences</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A transcontinental journey delivering research keynotes & posters across oceans: from <strong className="text-cyan-300">Vienna, Austria</strong> to <strong className="text-indigo-300">Singapore</strong>, <strong className="text-amber-300">Pune</strong> & <strong className="text-rose-300">Navi Mumbai</strong>.
          </p>

          {/* View Mode Controller */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="p-1.5 rounded-full glass-container border border-white/10 inline-flex flex-wrap items-center justify-center gap-1 shadow-inner">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  viewMode === "grid"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Conference Grid</span>
              </button>

              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  viewMode === "map"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/30 border border-sky-400/50"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Plane className="w-3.5 h-3.5 text-sky-300" />
                <span>Global Roaming Flight Map</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HOLOGRAPHIC WORLD MAP WITH REALISTIC GEOGRAPHIC CONTINENT OUTLINES        */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-container rounded-3xl p-5 sm:p-6 border border-cyan-500/20 relative overflow-hidden shadow-2xl bg-slate-950/95"
        >
          {/* Hologram Corner Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/20 via-sky-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 relative z-10">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400">
                  Sequential Flight Route • Vienna ➔ Singapore ➔ Virtual ➔ Pune ➔ Navi Mumbai
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-100">
                Global Symposia <span className="text-gradient">Transcontinental Roaming Map</span>
              </h3>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsMapPlaying(!isMapPlaying)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  isMapPlaying
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/30 border border-cyan-300/50"
                    : "glass-pill text-slate-200 hover:text-white"
                }`}
              >
                {isMapPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isMapPlaying ? "Pause Flight" : "Resume Global Flight"}</span>
              </button>

              <button
                onClick={() =>
                  setCameraZoomMode(cameraZoomMode === "overview" ? "focused" : "overview")
                }
                className="px-3 py-1.5 rounded-xl glass-pill text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1"
              >
                {cameraZoomMode === "overview" ? (
                  <>
                    <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Zoom In Camera</span>
                  </>
                ) : (
                  <>
                    <ZoomOut className="w-3.5 h-3.5 text-cyan-400" />
                    <span>World Map Overview</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dual Column Layout: Compact Canvas (~280px) & Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4 relative z-10">
            
            {/* Left: Realistic World Map Canvas */}
            <div className="lg:col-span-7 flex">
              <div className="relative w-full h-[280px] sm:h-[300px] rounded-2xl bg-[#020617] border border-cyan-500/30 overflow-hidden shadow-2xl flex items-center justify-center p-1">
                
                {/* Realtime Telemetry Overlay */}
                <div className="absolute top-2.5 left-2.5 z-30 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg glass-container border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-md bg-slate-950/90">
                    <Crosshair className="w-3 h-3 text-cyan-400 animate-spin" />
                    <span>FLIGHT CAM: <strong className="text-white font-bold uppercase">{currentGlobalNode.city}</strong></span>
                  </div>
                </div>

                <div className="absolute top-2.5 right-2.5 z-30">
                  <span className="px-2.5 py-1 rounded-lg glass-container border border-cyan-500/30 text-[9px] font-mono text-cyan-400 uppercase tracking-wider bg-slate-950/90 shadow-md">
                    {cameraZoomMode === "overview" ? "GLOBAL 1.0x" : "TRANSCONTINENTAL 2.2x"}
                  </span>
                </div>

                {/* Spherical Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none"></div>

                {/* SVG Viewport with Realistic World Map Geometries */}
                <svg
                  viewBox={trackedViewBox}
                  className="w-full h-full transition-all duration-300 ease-out drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                >
                  <defs>
                    <linearGradient id="transcontinentalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="40%" stopColor="#818cf8" />
                      <stop offset="70%" stopColor="#34d399" />
                      <stop offset="85%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>

                    <radialGradient id="satelliteNodeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </radialGradient>

                    <linearGradient id="landGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                  </defs>

                  {/* World Latitude / Longitude Lines & Tropics */}
                  <line x1="0" y1="225" x2="800" y2="225" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="6 4" />
                  <line x1="0" y1="165" x2="800" y2="165" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="0" y1="285" x2="800" y2="285" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="400" y1="0" x2="400" y2="450" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="6 4" />
                  <ellipse cx="400" cy="225" rx="380" ry="195" fill="none" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1" strokeDasharray="4 4" />

                  {/* ========================================================================= */}
                  {/* REALISTIC GEOGRAPHIC CONTINENT OUTLINES (NORTH AMERICA, EUROPE, ASIA, ETC) */}
                  {/* ========================================================================= */}

                  {/* 1. North America */}
                  <path
                    d="M 60,65 L 90,50 L 140,40 L 190,45 L 210,60 L 205,85 L 235,90 L 260,115 L 250,140 L 235,170 L 215,160 L 190,195 L 180,225 L 170,220 L 160,185 L 125,160 L 115,120 L 95,95 L 60,85 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.45)"
                    strokeWidth="1.3"
                  />

                  {/* 2. Greenland */}
                  <path
                    d="M 270,30 L 320,25 L 340,45 L 310,75 L 280,65 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.35)"
                    strokeWidth="1"
                  />

                  {/* 3. South America */}
                  <path
                    d="M 210,240 L 245,235 L 275,250 L 295,275 L 285,320 L 255,370 L 240,365 L 245,310 L 225,270 L 205,250 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.4)"
                    strokeWidth="1.2"
                  />

                  {/* 4. Europe & UK */}
                  <path
                    d="M 390,110 L 415,100 L 445,95 L 485,90 L 500,115 L 475,130 L 455,125 L 440,140 L 415,145 L 390,135 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.5)"
                    strokeWidth="1.3"
                  />
                  {/* UK & Ireland */}
                  <path d="M 385,85 L 395,80 L 400,95 L 390,105 Z" fill="url(#landGrad)" stroke="rgba(56,189,248,0.4)" strokeWidth="1" />
                  {/* Scandinavia */}
                  <path d="M 425,50 L 450,45 L 460,75 L 440,90 Z" fill="url(#landGrad)" stroke="rgba(56,189,248,0.4)" strokeWidth="1" />

                  {/* 5. Africa & Madagascar */}
                  <path
                    d="M 390,148 L 430,142 L 480,148 L 520,205 L 500,260 L 475,325 L 445,340 L 420,310 L 415,245 L 375,195 L 385,160 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.45)"
                    strokeWidth="1.3"
                  />
                  {/* Madagascar */}
                  <path d="M 515,270 L 530,280 L 520,315 L 508,300 Z" fill="url(#landGrad)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />

                  {/* 6. Middle East */}
                  <path
                    d="M 485,148 L 515,155 L 535,185 L 505,200 L 490,175 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.4)"
                    strokeWidth="1.2"
                  />

                  {/* 7. Asia & Siberia */}
                  <path
                    d="M 485,90 L 560,70 L 680,55 L 750,65 L 730,100 L 670,115 L 610,110 L 530,115 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.5)"
                    strokeWidth="1.4"
                  />

                  {/* 8. India Peninsula (Distinct Triangle with Pune & Navi Mumbai) */}
                  <path
                    d="M 535,155 L 555,150 L 585,155 L 595,175 L 570,225 L 550,190 L 538,165 Z"
                    fill="#1e293b"
                    stroke="#38bdf8"
                    strokeWidth="1.6"
                    className="drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                  />

                  {/* 9. East Asia / China */}
                  <path
                    d="M 610,115 L 680,110 L 720,145 L 680,185 L 630,170 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.45)"
                    strokeWidth="1.2"
                  />

                  {/* Japan Archipelago */}
                  <path d="M 725,115 L 740,120 L 735,145 L 720,135 Z" fill="url(#landGrad)" stroke="rgba(56,189,248,0.4)" strokeWidth="1" />

                  {/* 10. Southeast Asia & Indochina */}
                  <path
                    d="M 630,170 L 655,180 L 650,225 L 635,220 L 620,185 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.45)"
                    strokeWidth="1.2"
                  />
                  {/* Indonesia / Borneo */}
                  <path d="M 625,235 L 660,240 L 685,255 L 640,260 Z" fill="url(#landGrad)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />
                  <path d="M 660,225 L 690,220 L 680,245 Z" fill="url(#landGrad)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />

                  {/* 11. Australia & New Zealand */}
                  <path
                    d="M 670,285 L 745,280 L 760,320 L 735,365 L 675,350 L 660,315 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.45)"
                    strokeWidth="1.3"
                  />
                  {/* Tasmania */}
                  <path d="M 725,375 L 738,375 L 735,390 L 722,388 Z" fill="url(#landGrad)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />
                  {/* New Zealand */}
                  <path d="M 775,345 L 785,370 L 778,390 Z" fill="url(#landGrad)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />

                  {/* 12. Antarctica */}
                  <path
                    d="M 100,425 Q 400,410 750,425 L 770,445 L 30,445 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(56,189,248,0.3)"
                    strokeWidth="1"
                  />

                  {/* Satellite Orbit Ring */}
                  <ellipse cx="480" cy="45" rx="45" ry="14" fill="none" stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                  {/* TRANSCONTINENTAL FLIGHT PATH (Vienna -> Singapore -> Orbit -> Pune -> Navi Mumbai) */}
                  <path
                    d="M 436 112 Q 550 110 635 228 Q 600 100 480 45 Q 500 120 555 188 L 546 178"
                    fill="none"
                    stroke="url(#transcontinentalGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 8px rgba(56,189,248,0.5))"
                  />

                  {/* GLOBAL VENUE NODES (5 DISTINCT STOPS WITH NON-OVERLAPPING LABELS) */}
                  {globalNodes.map((node) => {
                    const isNodeActive = activeMapStep === node.step;

                    return (
                      <g key={node.id}>
                        {isNodeActive && (
                          <circle
                            cx={node.coords.x}
                            cy={node.coords.y}
                            r="18"
                            fill="none"
                            stroke={node.color}
                            strokeWidth="2"
                            opacity="0.8"
                          >
                            <animate
                              attributeName="r"
                              values="8;22;8"
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

                        {/* Non-overlapping Label Positioning */}
                        <g transform={`translate(${node.coords.x + node.labelOffset.dx}, ${node.coords.y + node.labelOffset.dy})`}>
                          <rect
                            x="-55"
                            y="-14"
                            width="110"
                            height="18"
                            rx="5"
                            fill="#020617"
                            fillOpacity="0.95"
                            stroke={isNodeActive ? node.color : "rgba(255,255,255,0.2)"}
                            strokeWidth="1.2"
                          />
                          <text
                            x="0"
                            y="-2"
                            fill={isNodeActive ? "#ffffff" : "#94a3b8"}
                            fontSize="8.5"
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

                  {/* CONTINUOUS MOVING FLIGHT DOT & RETICLE */}
                  <g transform={`translate(${flightPos.x}, ${flightPos.y})`}>
                    <circle r="22" fill="url(#satelliteNodeGlow)" />
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
                    <circle r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                  </g>

                </svg>

                {/* Bottom Bar */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 px-2.5 py-1 rounded-xl glass-container border border-white/10 text-[10px] bg-slate-950/90 shadow-md">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-slate-400 font-mono">Stops:</span>
                    {globalNodes.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          setIsMapPlaying(false);
                          setFlightPos(n.coords);
                          setActiveMapStep(n.step);
                          setActiveTab(n.confId);
                          setCameraZoomMode("focused");
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                          activeMapStep === n.step
                            ? "bg-cyan-600 text-white shadow-sm"
                            : "bg-slate-900 text-slate-300 hover:text-white"
                        }`}
                      >
                        {n.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  <span className="text-cyan-400 font-mono text-[9px]">
                    {isMapPlaying ? "Loop: Vienna ➔ Pune ➔ Navi Mumbai" : "Paused"}
                  </span>
                </div>

              </div>
            </div>

            {/* Right: Compact Detail Inspection Card */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              {(() => {
                const matchedConf = conferences.find((c) => c.id === currentGlobalNode.confId) || conferences[0];

                return (
                  <motion.div
                    key={matchedConf.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col justify-between h-[280px] sm:h-[300px] bg-slate-950/90 shadow-2xl relative overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                          <span className="text-xs font-black text-slate-100 uppercase tracking-wide">
                            Focus: {matchedConf.venue}
                          </span>
                        </div>
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                          Stop {currentGlobalNode.step + 1} of 5
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                          {matchedConf.name} ({matchedConf.year})
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-100 leading-snug line-clamp-2">
                          "{matchedConf.title}"
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Presentation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-semibold">{matchedConf.type}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 space-y-0.5">
                          <span className="text-[9px] text-slate-400 font-medium block">Venue Location</span>
                          <span className="font-extrabold text-cyan-300 block text-xs truncate">
                            {matchedConf.venue}
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 space-y-0.5">
                          <span className="text-[9px] text-slate-400 font-medium block">Satellite GPS</span>
                          <span className="font-bold text-slate-300 block text-[10px] font-mono truncate">
                            {currentGlobalNode.lat}
                          </span>
                        </div>
                      </div>

                      {matchedConf.link && (
                        <a
                          href={matchedConf.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 rounded-xl glass-button-primary text-white text-xs font-semibold flex items-center justify-center gap-1 group"
                        >
                          <span>View Paper on Google Scholar</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })()}
            </div>

          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CONFERENCES GRID VIEW                                                     */}
        {/* ========================================================================= */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conferences.map((conf, idx) => (
              <motion.div
                key={conf.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-container rounded-3xl p-6 border border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl bg-slate-950/60"
              >
                <div className="space-y-4">
                  
                  {/* Image Display Frame */}
                  <div
                    className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden cursor-pointer group/img bg-slate-900 border border-white/10 flex items-center justify-center p-2"
                    onClick={() => setSelectedImage(conf)}
                  >
                    <Image
                      src={conf.image}
                      alt={conf.alt}
                      fill
                      className={conf.image.endsWith(".png") ? "object-contain p-4" : "object-cover object-top transition-transform duration-500 group-hover/img:scale-105"}
                    />

                    {/* Year Tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-sky-300 shadow-md">
                      {conf.year}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white backdrop-blur-[2px]">
                      <div className="p-2.5 rounded-full bg-sky-600/90 shadow-lg border border-white/30">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-white/20">
                        View Photo / Poster
                      </span>
                    </div>
                  </div>

                  {/* Badge & Venue Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${conf.badgeColor}`}>
                      {conf.name}
                    </span>

                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{conf.venue}</span>
                    </div>
                  </div>

                  {/* Presentation Title */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Paper / Poster Title
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors leading-snug">
                      {conf.link ? (
                        <a
                          href={conf.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:underline decoration-sky-400 underline-offset-4"
                        >
                          <span>{conf.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        </a>
                      ) : (
                        <span>{conf.title}</span>
                      )}
                    </h3>
                  </div>

                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 mt-5">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-medium">
                    <Presentation className="w-3.5 h-3.5 text-sky-400" />
                    <span>{conf.type}</span>
                  </div>
                  {conf.link && (
                    <a
                      href={conf.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-white font-semibold flex items-center gap-1 text-[11px]"
                    >
                      <span>Google Scholar</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        )}

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
                  {/* Modal Close Button */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-[10001] p-2.5 rounded-full bg-slate-900 text-slate-200 hover:text-white border border-white/30 shadow-xl hover:scale-110 transition-all hover:bg-sky-600 flex items-center gap-1.5 text-xs font-semibold"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-white" />
                    <span className="hidden sm:inline pr-1">Close</span>
                  </button>

                  {/* High-Res Image Display */}
                  <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden bg-slate-950/80 flex items-center justify-center p-2 mt-8 sm:mt-2">
                    <Image
                      src={selectedImage.image}
                      alt={selectedImage.alt}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Image Description Footer */}
                  <div className="pt-3 text-center space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-slate-100">
                      {selectedImage.name} ({selectedImage.year})
                    </h4>
                    <p className="text-xs text-sky-300 font-medium">
                      {selectedImage.venue} &bull; {selectedImage.title}
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
