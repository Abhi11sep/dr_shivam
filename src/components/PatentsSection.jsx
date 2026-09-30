"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./PatentsSection.module.css";

/* ─── Patent data ─────────────────────────────────────────── */
const GRANTED = [
  {
    title:
      "Air Filter Assembly For Purifying Air With Increased Filtration Efficiency",
    inventors: ["Shivam Singh", "Tarun Gupta"],
    patentNumber: "541922",
    applicationNumber: "202311000530",
    dateOfGrant: "14/06/2024",
    url: "https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus",
  },
];

const SUBMITTED = [
  {
    title:
      "Sugarcane Bagasse-based Biodegradable Particulate Air-filter Media And Method Of Preparation",
    inventors: ["Shivam Singh", "Tarun Gupta"],
    applicationNumber: "202311000530",
    dateOfApplication: "14/06/2024",
    url: "https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus",
  },
];

const UNDER_SUBMISSION = [
  {
    title: "Passive Chimney Filtration and Airflow Enhancement System",
    inventors: ["Shivam Singh", "Tarun Gupta"],
    url: "https://iitk.ac.in/ipr/",
  },
  {
    title:
      "Aerosol Generator for Controlled Continuous Solid-Particle Aerosol Emission",
    inventors: [
      "Shivam Singh",
      "Gopal Ashok Gupta",
      "Tarun Gupta",
      "Janakarajan Ramkumar",
      "Sandip Patil",
    ],
    url: "https://iitk.ac.in/ipr/",
  },
  {
    title:
      "An Integrated Electrochemical Air Pollution Control And Ozone Conversion Device for Indoor Industrial Air Purification and Oxygen Generation.",
    inventors: ["Nazrul Islam", "Shivam Singh", "Tarun Gupta"],
    url: "https://iitk.ac.in/ipr/",
  },
];


/* ─── Carousel images ─────────────────────────────────────── */
const CAROUSEL_IMAGES = [
  { src: "/patents/filter-paper.jpg", alt: "Pleated filter paper prototype" },
  {
    src: "/patents/air-filter-diagram.png",
    alt: "Air filter assembly diagram",
  },
  {
    src: "/patents/chimney-system.png",
    alt: "Passive chimney filtration system",
  },
];
/* ─── Status badge config ─────────────────────────────────── */
const STATUS = {
  granted: {
    label: "Patent Granted",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/40",
    badge: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
    dot: "bg-emerald-400",
    glow: "shadow-emerald-500/10",
    icon: "✦",
  },
  submitted: {
    label: "Patent Submitted",
    color: "from-sky-500/20 to-sky-600/10",
    border: "border-sky-500/40",
    badge: "bg-sky-500/20 text-sky-300 border border-sky-500/40",
    dot: "bg-sky-400",
    glow: "shadow-sky-500/10",
    icon: "◈",
  },
  under_submission: {
    label: "Under Submission",
    color: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/40",
    badge: "bg-violet-500/20 text-violet-300 border border-violet-500/40",
    dot: "bg-violet-400",
    glow: "shadow-violet-500/10",
    icon: "◎",
  },
};

/* ─── Wide horizontal card (for solo patents: Granted / Submitted) ── */
function PatentCardWide({ patent, statusKey }) {
  const s = STATUS[statusKey];
  const accentColor =
    statusKey === "granted"
      ? "text-emerald-300"
      : statusKey === "submitted"
      ? "text-sky-300"
      : "text-violet-300";

  return (
    <a
      href={patent.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group block rounded-2xl border ${s.border} bg-gradient-to-br ${s.color} backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${s.glow} cursor-pointer`}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />

      <div className="grid grid-cols-1 gap-0">
        {/* ── Left: main content ── */}
        <div className="p-5 sm:p-6">
          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${s.badge} mb-5`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
            {s.label}
          </span>

          {/* Title */}
          <h3 className="text-white font-bold text-lg sm:text-xl leading-snug mb-4 group-hover:text-slate-100 transition-colors max-w-2xl">
            {patent.title}
          </h3>

          {/* Meta grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-[13px]">
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Inventor(s)</p>
              <p className="text-slate-200 font-medium">{patent.inventors.join(", ")}</p>
            </div>

            {patent.patentNumber && (
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Patent Number</p>
                <p className={`font-mono font-bold text-base ${accentColor}`}>{patent.patentNumber}</p>
              </div>
            )}

            {patent.applicationNumber && (
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Application Number</p>
                <p className="text-slate-300 font-mono">{patent.applicationNumber}</p>
              </div>
            )}

            {patent.dateOfGrant && (
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Date of Grant</p>
                <p className="text-slate-200">{patent.dateOfGrant}</p>
              </div>
            )}

            {patent.dateOfApplication && (
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Date of Application</p>
                <p className="text-slate-200">{patent.dateOfApplication}</p>
              </div>
            )}
          </div>
        </div>


      </div>

      {/* Bottom accent strip */}
      <div
        className={`h-0.5 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${accentColor}`}
      />
    </a>
  );
}

/* ─── Compact card (for multi-patent groups like Under Submission) ── */
function PatentCard({ patent, statusKey, index }) {
  const s = STATUS[statusKey];
  return (
    <a
      href={patent.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group block rounded-2xl border ${s.border} bg-gradient-to-br ${s.color} backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${s.glow}`}

      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />

      {/* Card inner */}
      <div className="p-5 sm:p-6">
        {/* Status badge + link icon */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${s.badge}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`}
            />
            {s.label}
          </span>
          {/* External link icon in place of decorative icon */}
          <span className={`opacity-30 group-hover:opacity-80 transition-opacity ${
            statusKey === "granted" ? "text-emerald-300" : statusKey === "submitted" ? "text-sky-300" : "text-violet-300"
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-[15px] leading-snug mb-4 group-hover:text-slate-100 transition-colors">
          {patent.title}
        </h3>

        {/* Meta rows */}
        <div className="space-y-2 text-[12px]">
          <div className="flex gap-2">
            <span className="text-slate-500 shrink-0 w-28">Inventor(s)</span>
            <span className="text-slate-300">{patent.inventors.join(", ")}</span>
          </div>

          {statusKey === "under_submission" && (
            <div className="flex gap-2">
              <span className="text-slate-500 shrink-0 w-28">Filed at</span>
              <span className="text-slate-400 italic">IPR Cell, IIT Kanpur</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent strip */}
      <div
        className={`h-0.5 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${
          statusKey === "granted"
            ? "text-emerald-400"
            : statusKey === "submitted"
            ? "text-sky-400"
            : "text-violet-400"
        }`}
      />
    </a>
  );
}


/* ─── Section group (Granted / Submitted / Under Submission) ─ */
function PatentGroup({ statusKey, patents }) {
  const s = STATUS[statusKey];
  const isSolo = patents.length === 1;
  const groupRef = useRef(null);

  useEffect(() => {
    if (statusKey !== "submitted") return;
    const group = groupRef.current;
    const updateOffset = () => {
      group.style.setProperty("--submitted-offset", `${group.getBoundingClientRect().height * 0.16}px`);
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(group);
    return () => observer.disconnect();
  }, [statusKey]);

  return (
    <div ref={groupRef} className={styles.patentGroup}>
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${s.badge}`}
        >
          <span className={`w-2 h-2 rounded-full ${s.dot}`} />
          {s.label}
          <span className="ml-1 opacity-60">({patents.length})</span>
        </span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {isSolo ? (
        /* Full-width horizontal layout for single patents */
        <PatentCardWide patent={patents[0]} statusKey={statusKey} />
      ) : (
        /* Two-column grid for multiple patents */
        <div className={`${styles.patentCards} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
          {patents.map((p, i) => (
            <PatentCard key={i} patent={p} statusKey={statusKey} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}


/* Equal counter-rotation keeps every image upright. */
function PatentOrbit() {
  const [paused, setPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dialogRef = useRef(null);
  const previewOpen = selectedImage !== null;
  function navigateImage(direction) {
    setSelectedImage((current) => {
      if (!current) return current;
      const index = CAROUSEL_IMAGES.indexOf(current);
      return CAROUSEL_IMAGES[(index + direction + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length];
    });
  }
  useEffect(() => {
    if (!previewOpen) return;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = overflow; };
  }, [previewOpen]);
  return (
    <div className={styles.orbitPanel}>
      <div className={styles.controls}>
        <p>Ideas in motion</p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
      <div className={styles.orbitWindow} data-paused={paused}>
        <div className={styles.track} aria-hidden="true" />
        <div className={styles.earth} aria-hidden="true"><div className={styles.earthSurface} /></div>
        {CAROUSEL_IMAGES.map((img, index) => (
          <div key={img.src} className={styles.orbitArm} style={{ "--delay": (-index * 24 - 30) + "s" }}>
            <button type="button" className={styles.orbitCard} aria-label={`Open image: ${img.alt}`} aria-haspopup="dialog" onClick={() => setSelectedImage(img)}>
              <div className={styles.image}>
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 639px) 176px, 242px" className="object-contain" />
              </div>
              <span className={styles.caption}>{img.alt}</span>
            </button>
          </div>
        ))}
      </div>
      <dialog ref={dialogRef} className={styles.preview} aria-label="Patent image preview" onClose={() => setSelectedImage(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigateImage(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}>
        {selectedImage && <div className={styles.previewContent}>
          <button type="button" className={styles.closePreview} onClick={() => dialogRef.current.close()} aria-label="Close image preview" autoFocus>×</button>
          <div className={styles.previewImage}>
            <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="90vw" className="object-contain" />
            <button type="button" className={`${styles.previewArrow} ${styles.previousImage}`} onClick={() => navigateImage(-1)} aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
            </button>
            <button type="button" className={`${styles.previewArrow} ${styles.nextImage}`} onClick={() => navigateImage(1)} aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
            </button>
          </div>
          <p aria-live="polite">{selectedImage.alt} ({CAROUSEL_IMAGES.indexOf(selectedImage) + 1} / {CAROUSEL_IMAGES.length})</p>
        </div>}
      </dialog>
    </div>
  );
}

function PatentSeal() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={styles.headingSeal}
      aria-hidden="true"
      variants={{
        hidden: { opacity: 0, scale: 2.3, rotate: -24, y: -55 },
        visible: reduceMotion ? { opacity: 0.24, scale: 1, rotate: -10, y: 0 } : { opacity: [0, 0.95, 0.65, 0.24], scale: [2.3, 0.94, 1.04, 1], rotate: [-24, -9, -11, -10], y: [-55, 0, -3, 0] },
      }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.75, times: [0, 0.62, 0.8, 1], ease: "easeOut", delay: 0.15 }}
    >
      <Image src="/patents/patent-wax-seal.png" alt="" width={240} height={240} sizes="(max-width: 639px) 120px, 240px" />
    </motion.div>
  );
}

/* ─── Main exported section ───────────────────────────────── */
export default function PatentsSection() {
  const reduceMotion = useReducedMotion();
  const total =
    GRANTED.length + SUBMITTED.length + UNDER_SUBMISSION.length;

  return (
    <section
      id="patents"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, #818cf8 0%, #38bdf8 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Intellectual Property
          </span>

          <motion.div className={styles.headingRow}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
          >
            <PatentSeal />
            <motion.h2
              className={`${styles.headingTitle} text-4xl sm:text-5xl font-bold tracking-tight text-gradient`}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.95, ease: "easeOut" }}
            >
              Patents &amp; Innovations
            </motion.h2>
          <motion.p
            className={`${styles.headingSubtitle} text-slate-400 text-base max-w-xl mx-auto leading-relaxed`}
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 1.1, ease: "easeOut" }}
          >
            {total} patent{total !== 1 ? "s" : ""} spanning advanced air
            filtration, aerosol generation, and electrochemical pollution
            control technologies.
          </motion.p>
          </motion.div>
        </div>

        {/* ── Stats pill row ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { label: "Granted", count: GRANTED.length, key: "granted" },
            {
              label: "Submitted",
              count: SUBMITTED.length,
              key: "submitted",
            },
            {
              label: "Under Submission",
              count: UNDER_SUBMISSION.length,
              key: "under_submission",
            },
          ].map(({ label, count, key }) => {
            const s = STATUS[key];
            return (
              <div
                key={key}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border ${s.border} bg-gradient-to-br ${s.color} backdrop-blur-sm`}
              >
                <span
                  className={`text-2xl font-bold ${
                    key === "granted"
                      ? "text-emerald-300"
                      : key === "submitted"
                      ? "text-sky-300"
                      : "text-violet-300"
                  }`}
                >
                  {count}
                </span>
                <span className="text-slate-400 text-xs font-medium">
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Patent card groups ── */}
        <div className={styles.showcase}>
          <div className={styles.patentGroups}>
            <PatentGroup statusKey="granted" patents={GRANTED} />
            <PatentGroup statusKey="submitted" patents={SUBMITTED} />
          </div>
          <PatentOrbit />
        </div>
        <div className={styles.submissionGroup}>
          <PatentGroup
            statusKey="under_submission"
            patents={UNDER_SUBMISSION}
          />
        </div>
      </div>
    </section>
  );
}
