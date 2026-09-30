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
  const [activeTab, setActiveTab] = useState("egu-2025");

  // Dot-Tracking World Camera Flight State
  const [isMapPlaying, setIsMapPlaying] = useState(true); // Auto-starts automatically on mount
  const [cameraZoomMode, setCameraZoomMode] = useState("focused"); // 'focused' or 'overview'
  const [flightPos, setFlightPos] = useState({ x: 436.39, y: 117.87 }); // Starts at Vienna, Austria
  const [activeMapStep, setActiveMapStep] = useState(0); // 0: Vienna, 1: Singapore, 2: Virtual, 3: Pune, 4: Navi Mumbai

  const animRef = useRef(null);
  const startTimeRef = useRef(null);

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
    const pVienna = { x: 436.39, y: 117.87 };     // Vienna, Austria
    const pSingapore = { x: 630.71, y: 222 };  // Singapore
    const pVirtual = { x: 480, y: 45 };     // No physical venue
    const pPune = { x: 564.12, y: 183.84 };       // Pune, India
    const pMumbai = { x: 562.29, y: 182.7 };     // Navi Mumbai, India

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
        // Stop 3: Online conference (IGAC 2025)
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
      logo: "/conferences/logo1.png",
      alt: "EGU 2025 General Assembly Poster Presentation in Vienna, Austria",
      badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      geo: { city: "Vienna, Austria", coords: { x: 436.39, y: 117.87 }, lat: "48.2082° N | 16.3738° E", stepIndex: 0 }
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
      logo: "/conferences/logo2.png",
      alt: "Indoor Air 2026 Conference Poster in Singapore",
      badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      geo: { city: "Singapore", coords: { x: 630.71, y: 222 }, lat: "1.3521° N | 103.8198° E", stepIndex: 1 }
    },
    {
      id: "igac-2025",
      name: "IGAC–iCACGP ECR Conference 2025",
      code: "IGAC 2025",
      title:
        "Monopolar Electrostatically Enhanced Air Filtration: A Safe and Efficient Approach to Electrostatic Particle Capture",
      link: null,
      venue: "Virtual (Online)",
      type: "International ECR Conference",
      year: "2025",
      image: "/conferences/con3.jpg",
      logo: "/conferences/logo3.png",
      alt: "IGAC–iCACGP ECR Online Conference 2025",
      badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      geo: { city: "Virtual Cloud Node", coords: { x: 480, y: 45 }, lat: "No physical venue", stepIndex: 2 }
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
      logo: "/conferences/logo4.png",
      alt: "INTROMET 2025 International Symposium on Tropical Meteorology in Pune",
      badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      geo: { city: "Pune, India", coords: { x: 564.12, y: 183.84 }, lat: "18.5204° N | 73.8567° E", stepIndex: 3 }
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
      image: "/conferences/con5.jpg",
      logo: "/conferences/logo5.png",
      alt: "IASTA 2023 Aerosol Conference",
      badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      geo: { city: "Navi Mumbai, India", coords: { x: 562.29, y: 182.7 }, lat: "19.0330° N | 73.0297° E", stepIndex: 4 }
    },
  ];

  // Geographically Aligned Venue Nodes
  const globalNodes = [
    { id: "egu-2025", label: "Vienna (Austria)", city: "Vienna, Austria", coords: { x: 436.39, y: 117.87 }, labelOffset: { dx: 0, dy: -14 }, step: 0, color: "#38bdf8", confId: "egu-2025", lat: "48.2082° N | 16.3738° E" },
    { id: "indoor-air-2026", label: "Singapore (SE Asia)", city: "Singapore", coords: { x: 630.71, y: 222 }, labelOffset: { dx: 0, dy: 16 }, step: 1, color: "#818cf8", confId: "indoor-air-2026", lat: "1.3521° N | 103.8198° E" },
    { id: "igac-2025", label: "Online (virtual)", city: "Virtual Cloud Node", coords: { x: 480, y: 45 }, labelOffset: { dx: 0, dy: -14 }, step: 2, color: "#34d399", confId: "igac-2025", lat: "No physical venue" },
    { id: "intromet-2025", label: "Pune (INTROMET 2025)", city: "Pune, India", coords: { x: 564.12, y: 183.84 }, labelOffset: { dx: 58, dy: 27 }, step: 3, color: "#fbbf24", confId: "intromet-2025", lat: "18.5204° N | 73.8567° E" },
    { id: "iasta-2023", label: "Navi Mumbai (IASTA 2023)", city: "Navi Mumbai, India", coords: { x: 562.29, y: 182.7 }, labelOffset: { dx: -65, dy: -4 }, step: 4, color: "#f43f5e", confId: "iasta-2023", lat: "19.0330° N | 73.0297° E" },
  ];

  const currentGlobalNode = globalNodes[activeMapStep] || globalNodes[0];

  // Dynamically tracked camera viewBox follows flightPos with smooth zoom
  const trackedViewBox =
    cameraZoomMode === "overview"
      ? "350 0 370 280"
      : `${Math.round(flightPos.x - 140)} ${Math.round(flightPos.y - 95)} 280 190`;

  return (
    <section id="conferences" className="conference-section relative py-28 bg-slate-950/90 overflow-hidden">
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
            Sharing research and exchanging ideas across borders: from <strong className="text-cyan-300">Vienna, Austria</strong> to <strong className="text-indigo-300">Singapore</strong>, <strong className="text-amber-300">Pune</strong> & <strong className="text-rose-300">Navi Mumbai</strong>.
          </p>


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
                Research across <span className="text-gradient">the world</span>
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
                    <span>Travel Route Overview</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Equal-height compact map and scrollable conference details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4 relative z-10">
            
            {/* Left: Realistic World Map Canvas */}
            <div className="lg:col-span-7 flex">
              <div className="relative w-full h-[360px] rounded-2xl bg-[#020617] border border-cyan-500/30 overflow-hidden shadow-2xl flex items-center justify-center p-1">
                
                {/* Realtime Telemetry Overlay */}
                <div className="absolute top-2.5 left-2.5 z-30 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg glass-container border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-md bg-slate-950/90">
                    <Crosshair className="w-3 h-3 text-cyan-400 animate-spin" />
                    <span>FLIGHT CAM: <strong className="text-white font-bold uppercase">{currentGlobalNode.city}</strong></span>
                  </div>
                </div>

                <div className="absolute top-2.5 right-2.5 z-30">
                  <span className="px-2.5 py-1 rounded-lg glass-container border border-cyan-500/30 text-[9px] font-mono text-cyan-400 uppercase tracking-wider bg-slate-950/90 shadow-md">
                    {cameraZoomMode === "overview" ? "EUROPE–ASIA" : "TRANSCONTINENTAL 2.2x"}
                  </span>
                </div>

                {/* Spherical Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none"></div>

                {/* SVG Viewport with Realistic World Map Geometries */}
                <svg
                  viewBox={trackedViewBox}
                  role="img" aria-label="World map showing conference venues in Vienna, Singapore, Pune and Navi Mumbai, with a separate symbolic online conference marker" className="w-full h-full pt-12 pb-20 sm:pb-12"
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

                  {/* Equirectangular coastlines and venue coordinates use the same projection. */}
                  <g stroke="#38bdf8" strokeOpacity="0.1" strokeWidth="0.6">
                    {[60, 120, 180, 240, 300].map(lon => <line key={lon} x1={lon * 800 / 360} x2={lon * 800 / 360} y1="25" y2="425" />)}
                    {[60, 120, 180, 240, 300, 360].map(y => <line key={y} x1="0" x2="800" y1={25+y} y2={25+y} />)}
                  </g>
                  <image href="/conferences/world-land.svg" x="0" y="0" width="800" height="450" />
                  <line x1="0" y1="225" x2="800" y2="225" stroke="#38bdf8" strokeOpacity="0.22" strokeDasharray="4 5" />

                  {/* Satellite Orbit Ring */}
                  <ellipse cx="480" cy="45" rx="45" ry="14" fill="none" stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                  {/* TRANSCONTINENTAL FLIGHT PATH (Vienna -> Singapore -> Orbit -> Pune -> Navi Mumbai) */}
                  <path
                    d="M 436.39 117.87 Q 550 110 630.71 222 Q 600 100 480 45 Q 500 120 564.12 183.84 L 562.29 182.7"
                    fill="none"
                    stroke="url(#transcontinentalGrad)"
                    strokeWidth="1.5"
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
                          r={isNodeActive ? "4" : "2.5"}
                          fill={node.color}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />

                        <line x1={node.coords.x} y1={node.coords.y} x2={node.coords.x + node.labelOffset.dx} y2={node.coords.y + node.labelOffset.dy - 5} stroke={node.color} strokeWidth="0.7" opacity="0.7" />
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
                    <circle r="9" fill="url(#satelliteNodeGlow)" />
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
                    <circle r="3" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
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
                    {isMapPlaying ? "Conference tour" : "Paused"}
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
                    className="glass-card rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col gap-3 h-[360px] bg-slate-950/90 shadow-2xl relative overflow-y-auto"
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

                      <div className="space-y-2">
                        <div className="relative h-20 w-full rounded-xl bg-white"><Image src={matchedConf.logo} alt={matchedConf.name + " logo"} fill sizes="400px" className="object-contain p-2" /></div>
                        <h4 className="text-xl font-bold text-white">{matchedConf.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{matchedConf.title}</p>
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
                          <span className="text-[9px] text-slate-400 font-medium block">Coordinates</span>
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
        {(
          <div className="conference-grid">
            <div className="conference-collection-heading"><div><span>FIELD NOTES & PRESENTATIONS</span><h3>Conferences in focus</h3></div><p>05 conferences · A shared pursuit of cleaner air</p></div>
            {conferences.map((conf, idx) => (
              <article key={conf.id} className="conference-card group" style={{ "--conference-accent": ["#38bdf8", "#a5b4fc", "#6ee7b7", "#fcd34d", "#fda4af"][idx] }}>
                <div className="conference-identity">
                <div className="conference-card-top">
                  <span className="conference-index">{String(idx + 1).padStart(2, "0")} / CONFERENCE</span>
                  <span className="conference-year">{conf.year}</span>
                </div>
                <div className="conference-logo-panel">
                  <Image src={conf.logo} alt={conf.name + " logo"} fill sizes="(max-width: 767px) 85vw, 420px" className="object-contain p-3" />
                </div>
                <div className="conference-card-body">
                  <div className="flex items-center gap-2 text-xs text-slate-400"><MapPin className="w-3.5 h-3.5" />{conf.venue}</div>
                  <h3 className="conference-name">{conf.name}</h3>
                  <span className="conference-type">{conf.type}</span>
                  <div className="conference-topic">
                    <span>Presented research</span>
                    <p>{conf.title}</p>
                  </div>
                </div>
                {conf.link && <a href={conf.link} target="_blank" rel="noopener noreferrer" className="conference-paper flex items-center gap-2 mx-4 mb-4 text-xs"><ExternalLink className="w-4 h-4" />View research on Google Scholar</a>}
                </div>
                <button onClick={() => setSelectedImage(conf)} className="conference-photo" aria-label={"Enlarge conference photo for " + conf.name}>
                  <span className="conference-photo-frame" style={{ aspectRatio: "655 / 380" }}><Image src={conf.image} alt={conf.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1280px) 55vw, 680px" className="object-cover" style={{ objectPosition: idx === 1 || idx === 2 ? "center 30%" : "center" }} /></span>
                  <span className="conference-photo-caption">View full image <Maximize2 className="w-4 h-4" /></span>
                </button>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Fullscreen Modal Portaled to Document Body (z-[9999]) */}
      {typeof document !== "undefined" &&
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
