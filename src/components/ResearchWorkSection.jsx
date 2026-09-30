"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import {
  FlaskConical,
  Maximize2,
  X,
  ShieldCheck,
  Leaf,
  BrainCircuit,
  BookOpenCheck,
  Award,
} from "lucide-react";
import styles from "./ResearchWorkSection.module.css";

/* ─── Research Work Data ─────────────────────────────────── */
const RESEARCH_WORKS = [
  {
    id: "meaa",
    number: "01",
    title: "Monopolar Electrostatically Assisted Air (M-EAA) Filter",
    heading: "Monopolar Electrostatically Assisted Air (M-EAA) Filter",
    icon: ShieldCheck,
    accent: {
      gradient: "from-indigo-500/20 via-sky-500/10 to-transparent",
      text: "text-indigo-400",
      border: "border-indigo-500/30",
      badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      glow: "shadow-[0_0_50px_rgba(99,102,241,0.15)]",
      detailAccent: "#818cf8",
      detailAccentEnd: "#38bdf8",
    },
    overview:
      "I developed a monopolar electrostatically assisted air-filtration approach to enhance particle capture without relying solely on highly restrictive filter media. The system combines upstream aerosol charging with an electrically energised filter assembly to improve the collection of fine airborne particles.",
    note: { type: "patent", text: "Patent secured for the technology" },
    details: [
      {
        text: "Studied electrostatic enhancement using conventional as well as biodegradable filter media.",
      },
      { text: "Fabricated voltage multiplier circuit." },
    ],
    findings: [
      {
        text: "Investigated the influence of applied voltage, filter characteristics, particle size, pressure drop, and associated operational considerations.",
      },
      {
        text: "Results show enhanced filtration efficiency with no effect on the pressure drop of an air filter.",
      },
    ],
    highlight:
      "The monopole arrangement prevented any ozone production, which was a drawback of the electrostatically assisted air filtration system.",
    images: [
      {
        key: "RA1",
        src: "/research/ra1.png",
        alt: "M-EAA Filter Assembly Diagram",
        label: "Filter Assembly Design",
      },
      {
        key: "RA2",
        src: "/research/ra2.png",
        alt: "Experimental Test Setup",
        label: "Test Setup & Equipment",
      },
      {
        key: "RA3",
        src: "/research/ra3.gif",
        alt: "Filtration efficiency enhancement",
        label: "Efficiency & Pressure Drop",
      },
      {
        key: "RA4",
        src: "/research/ra4.gif",
        alt: "Ozone generation comparison for monopolar and dual-pole arrangements",
        label: "Ozone-Free Operation",
      },
    ],
  },
  {
    id: "sugarcane",
    number: "02",
    title: "Sustainable Air Filtration from Agricultural Waste",
    heading: "Biodegradable Sugarcane Bagasse Air Filter",
    icon: Leaf,
    accent: {
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      glow: "shadow-[0_0_50px_rgba(16,185,129,0.15)]",
      detailAccent: "#34d399",
      detailAccentEnd: "#2dd4bf",
    },
    overview:
      "I developed biodegradable fibrous air-filter media using sugarcane bagasse, an abundant agricultural residue. The work focused on converting waste biomass into functional filtration material and exploring its potential as a low-cost and environmentally sustainable alternative for particulate air filtration.",
    note: null,
    details: [
      {
        text: "Converted sugarcane bagasse into engineered fibrous filter media through controlled material processing.",
      },
    ],
    findings: [
      {
        text: "Investigated particulate filtration, airflow resistance, filter structure, and different material configurations.",
      },
      {
        text: "Evaluated the developed filters under laboratory filtration.",
      },
    ],
    highlight:
      "Developed a model and tested it under chamber-based air purification conditions.",
    images: [
      {
        key: "RB1",
        src: "/research/rb1.png",
        alt: "Sugarcane Bagasse Filter Media",
        label: "Bagasse Filter Media",
      },
      {
        key: "RB2",
        src: "/research/rb2.png",
        alt: "Material Processing",
        label: "Material Processing",
      },
      {
        key: "RB3",
        src: "/research/rb3.gif",
        alt: "Performance increment by filter processing and drying technique",
        label: "Laboratory Performance",
      },
      {
        key: "RB4",
        src: "/research/rb4.jpg",
        alt: "Chamber-Based Testing",
        label: "Chamber Testing",
      },
    ],
  },
  {
    id: "ml-health",
    number: "03",
    title: "Machine Learning for Air-Pollution Health Risk Assessment",
    heading: "ML-Based Prediction of Carcinogenic Risk",
    icon: BrainCircuit,
    accent: {
      gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
      text: "text-sky-400",
      border: "border-sky-500/30",
      badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      glow: "shadow-[0_0_50px_rgba(14,165,233,0.15)]",
      detailAccent: "#38bdf8",
      detailAccentEnd: "#22d3ee",
    },
    overview:
      "I developed a machine-learning framework for predicting the Incremental Lifetime Cancer Risk (ILCR) associated with airborne polycyclic aromatic hydrocarbons (PAHs). The approach uses readily measurable PM₂.₅ and meteorological parameters to provide a more scalable alternative to repeated laboratory-intensive PAH analysis. The model can predict ILCR in real time using data from low-cost sensors.",
    note: null,
    details: [
      {
        text: "Introduced a novel source-informed Pollution Source Method (PSM) to incorporate wind direction and nearby pollution-source information into model inputs.",
      },
    ],
    findings: [
      {
        text: "Developed and compared ANN, XGBoost, and Random Forest-based prediction models.",
      },
      {
        text: "Explored the potential for sensor-based, near-real-time estimation of air-pollution-associated carcinogenic risk.",
      },
    ],
    highlight:
      "Investigated the PAHs profile for different types of pollution sources.",
    images: [
      {
        key: "RC1",
        src: "/research/rc1.png",
        alt: "ML Framework Architecture",
        label: "ML Framework",
      },
      {
        key: "RC2",
        src: "/research/rc2.png",
        alt: "Pollution Source Method",
        label: "Source Method (PSM)",
      },
      {
        key: "RC3",
        src: "/research/rc3.png",
        alt: "Model Comparison Results",
        label: "Model Comparison",
      },
      {
        key: "RC4",
        src: "/research/rc4.jpg",
        alt: "PAH Source Profiles",
        label: "PAH Source Profiles",
      },
    ],
  },
  {
    id: "review-indoor",
    number: "04",
    title: "Review & Perspective | Indoor Air Purification Technologies",
    heading: "Review of Current and Future Indoor Air Purifying Technologies",
    icon: BookOpenCheck,
    accent: {
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      text: "text-amber-400",
      border: "border-amber-500/30",
      badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      glow: "shadow-[0_0_50px_rgba(245,158,11,0.15)]",
      detailAccent: "#f59e0b",
      detailAccentEnd: "#fb923c",
    },
    overview:
      "Indoor air pollution is a complex problem involving particulate matter, gaseous pollutants, biological contaminants, and pollutants entering from outdoor environments. In this comprehensive review, we examined the evolution of indoor air purification technologies—from widely used commercial systems to emerging approaches that could shape the next generation of air cleaners.",
    overviewExtra:
      "The work first connects indoor air pollution with its potential health implications and discusses how indoor environments differ from outdoor air-pollution scenarios. It then critically evaluates existing air-purification approaches, highlighting not only their pollutant-removal capabilities but also practical limitations that can restrict their effectiveness in real-world applications. A major focus of the review is on moving beyond conventional purification systems toward more efficient, sustainable, and multifunctional technologies. Emerging directions such as advanced filter-manufacturing techniques and regenerable photocatalytic approaches are discussed together with the technological and practical challenges that currently limit their widespread commercialization.",
    note: {
      type: "award",
      text: "Best Paper of the Year 2024 — ACS ES&T Engineering",
    },
    details: [
      {
        text: "Compared simultaneous indoor and outdoor air pollution data from all over the world.",
      },
      {
        text: "Health risk analysis shows a higher risk in indoor locations.",
      },
    ],
    findings: [
      {
        text: "Critical assessment of currently available commercial indoor air-purification technologies.",
      },
      {
        text: "Limitations and performance challenges associated with conventional purification approaches.",
      },
      { text: "Advanced air purification technologies were reviewed." },
    ],
    highlight: null,
    images: [
      {
        key: "RD1",
        src: "/research/rd1.png",
        alt: "Illustration of indoor pollutant sources and air purification",
        label: "Indoor Air Purification",
      },
      {
        key: "RD2",
        src: "/research/rd2.png",
        alt: "Worldwide comparisons of indoor and outdoor particulate and gaseous pollutants",
        label: "Indoor & Outdoor Comparison",
      },
      {
        key: "RD3",
        src: "/research/rd3.png",
        alt: "Indoor air pollution health risk analysis",
        label: "Health Risk Analysis",
      },
      {
        key: "RD4",
        src: "/research/rd4.png",
        alt: "Comparison of advanced filter-manufacturing technologies",
        label: "Technology Assessment",
      },
    ],
  },
];


const STAGE_TITLES = ["Overview", "Approach & Development", "Evaluation & Findings", "Research Outcome"];

const PROJECT_IDENTITIES = {
  meaa: { field: "Electrostatic filtration", statement: "Enhancing particle capture. Preserving airflow.", tags: ["Aerosol charging", "Filter engineering", "Ozone-free operation"] },
  sugarcane: { field: "Sustainable materials", statement: "From agricultural residue to cleaner air.", tags: ["Waste valorisation", "Biodegradable media", "Chamber validation"] },
  "ml-health": { field: "Environmental intelligence", statement: "Connecting air-quality data with health risk.", tags: ["Machine learning", "Source-informed prediction", "Low-cost sensing"] },
  "review-indoor": { field: "Review & perspective", statement: "Rethinking the future of indoor air purification.", tags: ["Global evidence", "Health implications", "Emerging technologies"] },
};

function ResearchCard({ work, onPreview, nextWork }) {
  const Icon = work.icon;
  const identity = PROJECT_IDENTITIES[work.id];
  const texts = work.id === "review-indoor"
    ? [[work.overview, work.overviewExtra], [work.details[0].text], [work.details[1].text], work.findings.map(item => item.text)]
    : [[work.overview], work.details.map(item => item.text), work.findings.map(item => item.text), [work.highlight]];
  return (
    <article id={work.id} aria-labelledby={work.id + "-title"} className={styles.work} style={{ "--accent": work.accent.detailAccent, "--accent-end": work.accent.detailAccentEnd }}>
      <div className={styles.chapterDivider}><span>Research Work {work.number}</span><span>{identity.field}</span></div>
      <header className={styles.workHeader}>
        <span className={styles.workNumber} aria-hidden="true">{work.number}</span>
        <div className={styles.identity}>
          <span className={styles.projectEyebrow}><Icon size={15} aria-hidden="true" />{identity.field}</span>
          <p className={styles.category}>{work.title !== work.heading ? work.title : "Monopolar electrostatically assisted air filtration"}</p>
          <h3 id={work.id + "-title"}>{work.heading}</h3>
          <p className={styles.statement}>{identity.statement}</p>
          <div className={styles.tags}>{identity.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
        {work.note && <span className={styles.noteBadge}>{work.note.type === "award" ? <Award size={16} aria-hidden="true" /> : <ShieldCheck size={16} aria-hidden="true" />}{work.note.text}</span>}
      </header>
      <div className={styles.journey}>
        <div className={styles.journeyHeading}><span>Research journey</span><span>Four connected steps</span></div>
      <div className={styles.panels}>
        {work.images.map((image, index) => (
          <div className={styles.panel} key={image.key}>
            {index < 3 && <span className={styles.stepConnector} aria-hidden="true"><svg viewBox="0 0 32 32"><path d={index === 1 ? "M 31 1 L 1 31" : "M 1 1 L 16 12 L 31 1"} /><circle cx="16" cy={index === 1 ? "16" : "12"} r="3" /></svg></span>}
            <figure className={styles.figure}>
              <button type="button" className={styles.imageButton} onClick={() => onPreview(image)} aria-label={"Enlarge " + image.label}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 90vw, 43vw" unoptimized={image.src.endsWith(".gif")} className={styles.figureImage} />
                <span className={styles.zoomBadge}><Maximize2 size={14} /> Enlarge</span>
              </button>
              <figcaption><span>{image.key}</span>{image.label}{image.src.endsWith(".gif") && <span className={styles.animationLabel}>GIF</span>}</figcaption>
            </figure>
            <div className={styles.panelContent}>
              <span className={styles.stage}>0{index + 1} / {STAGE_TITLES[index]}</span>
              {texts[index].map((text, i) => <p key={i}>{text}</p>)}
            </div>
          </div>
        ))}
      </div>
      </div>
      <footer className={styles.projectEnd}><span><Icon size={15} aria-hidden="true" /> End of Research Work {work.number}</span>{nextWork ? <a href={"#" + nextWork.id}>Up next · Work {nextWork.number}<span aria-hidden="true">↗</span></a> : <a href="#research-work">Back to research overview<span aria-hidden="true">↑</span></a>}</footer>
    </article>
  );
}

export default function ResearchWorkSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const dialogRef = useRef(null);
  const open = selectedImage !== null;
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [open]);
  return (
    <section id="research-work" className="relative py-24 sm:py-28" aria-labelledby="research-work-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={styles.sectionHeading + " text-center max-w-3xl mx-auto space-y-4"}>
          <div className={styles.researchEmblem} aria-hidden="true">
            <svg viewBox="0 0 320 320" className={styles.emblemOrbit}>
              <defs><path id="research-emblem-orbit" d="M160,160 m-126,0 a126,126 0 1,1 252,0 a126,126 0 1,1 -252,0" /></defs>
              <circle cx="160" cy="160" r="145" className={styles.emblemOuterRing} />
              <circle cx="160" cy="160" r="108" className={styles.emblemInnerRing} />
              <text className={styles.emblemText} textLength="791.7" lengthAdjust="spacing"><textPath href="#research-emblem-orbit">RESEARCH WORK · CLEAN AIR · INNOVATION · </textPath></text>
            </svg>
            <div className={styles.emblemCore}><FlaskConical strokeWidth={1} /></div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider"><FlaskConical size={16} /><span>Research Portfolio</span></div>
          <h2 id="research-work-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">Research <span className="text-gradient">Work</span></h2>
          <p className="text-slate-400 text-base sm:text-lg">Advancing cleaner air through filtration, sustainable materials, environmental intelligence, and critical review.</p>
        </div>
        <nav className={styles.navigation} aria-label="Research projects">
          {RESEARCH_WORKS.map(work => <a href={"#" + work.id} key={work.id}><span>{work.number}</span>{work.id === "meaa" ? "Electrostatic Filtration" : work.id === "sugarcane" ? "Sustainable Materials" : work.id === "ml-health" ? "Machine Learning" : "Review & Perspective"}</a>)}
        </nav>
        <div className={styles.collection}>{RESEARCH_WORKS.map((work, index) => <ResearchCard key={work.id} work={work} nextWork={RESEARCH_WORKS[index + 1]} onPreview={setSelectedImage} />)}</div>
      </div>
      <dialog ref={dialogRef} className={styles.dialog} aria-label="Research figure preview" onCancel={() => setSelectedImage(null)} onClick={event => { if (event.target === event.currentTarget) setSelectedImage(null); }}>
        {selectedImage && <div className={styles.preview}>
          <button type="button" autoFocus className={styles.close} onClick={() => setSelectedImage(null)} aria-label="Close preview"><X size={22} /></button>
          <div className={styles.previewImage}><Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="95vw" unoptimized={selectedImage.src.endsWith(".gif")} className={styles.figureImage} /></div>
          <p>{selectedImage.key} · {selectedImage.label}</p>
        </div>}
      </dialog>
    </section>
  );
}


