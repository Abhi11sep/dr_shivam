"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDownToLine, Check, Copy, GraduationCap, Mail, Phone } from "lucide-react";
import styles from "./RefereesSection.module.css";
const professors = [
  { name: "Prof. Tarun Gupta", institution: "Indian Institute of Technology Kanpur", shortInstitution: "IIT Kanpur", address: "Kanpur, India – 208016", email: "tarun@iitk.ac.in", phone: "(+91) 0512-259-7128", phoneHref: "+915122597128", image: "/referees/tarun-gupta.jpg", accent: "#a5b4fc" },
  { name: "Prof. Rakesh Chandra Vaishya", institution: "Motilal Nehru National Institute of Technology Allahabad", shortInstitution: "MNNIT Allahabad", address: "Prayagraj, India – 211004", email: "rcvaishya@mnnit.ac.in", phone: "(+91) 0532-227-1308", phoneHref: "+915322271308", image: "/referees/rakesh-chandra-vaishya-updated.jpg", accent: "#67e8f9" },
  { name: "Prof. Abhas Singh", institution: "Indian Institute of Technology Kanpur", shortInstitution: "IIT Kanpur", address: "Kanpur, India – 208016", email: "abhas@iitk.ac.in", phone: "(+91) 0512-259-7665", phoneHref: "+915122597665", image: "/referees/abhas-singh.jpg", accent: "#6ee7b7" },
];

function ProfessorCard({ professor }) {
  const [copyStatus, setCopyStatus] = useState("");
  function moveLight(event) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--light-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--light-y", `${event.clientY - bounds.top}px`);
  }
  function resetLight(event) {
    event.currentTarget.style.removeProperty("--light-x");
    event.currentTarget.style.removeProperty("--light-y");
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(professor.email);
      setCopyStatus("Email copied");
    } catch {
      setCopyStatus("Please select and copy the email above.");
    }
  }
  const nameParts = professor.name.replace("Prof. ", "").split(" ");
  const vcard = ["BEGIN:VCARD", "VERSION:3.0", "N:" + nameParts.at(-1) + ";" + nameParts.slice(0, -1).join(" ") + ";;Prof.;", "FN:" + professor.name, "ORG:" + professor.institution + ";Department of Civil Engineering", "TITLE:Professor", "EMAIL;TYPE=WORK:" + professor.email, "TEL;TYPE=WORK:" + professor.phoneHref, "END:VCARD", ""].join("\r\n");
  return (
    <article className={styles.card} style={{ "--referee-accent": professor.accent }} onPointerMove={moveLight} onPointerLeave={resetLight}>
      <div className={styles.portrait}>
        <Image src={professor.image} alt={professor.name} fill sizes="(max-width: 767px) 220px, (max-width: 1100px) 25vw, 270px" className={styles.photo} />
      </div>
      <span className={styles.role}>Professor · Academic referee</span>
      <h3>{professor.name}</h3>
      <div className={styles.details}>
        <p>Department of Civil Engineering</p>
        <p>{professor.institution}</p>
        <p>{professor.address}</p>
      </div>
      <address className={styles.contact}>
        <a href={"mailto:" + professor.email}>{professor.email}</a>
        <a href={"tel:" + professor.phoneHref}>{professor.phone}</a>
      </address>
      <div className={styles.actions}>
        <a href={"mailto:" + professor.email} aria-label={"Email " + professor.name} title="Send email"><Mail size={19} aria-hidden="true" /></a>
        <a href={"tel:" + professor.phoneHref} aria-label={"Call " + professor.name} title="Call office"><Phone size={18} aria-hidden="true" /></a>
        <a href={"data:text/vcard;charset=utf-8," + encodeURIComponent(vcard)} download={professor.name.replaceAll(" ", "-") + ".vcf"} aria-label={"Save contact for " + professor.name} title="Save contact"><ArrowDownToLine size={19} aria-hidden="true" /></a>
        <button type="button" onClick={copyEmail} aria-label={"Copy email for " + professor.name} title="Copy email">{copyStatus === "Email copied" ? <Check size={19} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}</button>
      </div>
      <span className={styles.copyStatus} role="status">{copyStatus}</span>
    </article>
  );
}

export default function RefereesSection() {
  return (
    <section id="referees" aria-labelledby="referees-heading" className={styles.section}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-widest shadow-lg shadow-indigo-500/10">
            <GraduationCap className="w-4 h-4 text-indigo-400" aria-hidden="true" />
            <span>Academic References</span>
          </div>
          <h2 id="referees-heading" className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-none">
            Referee <span className="text-gradient-accent">Professors</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Distinguished academics from <strong className="text-indigo-300">IIT Kanpur</strong> and <strong className="text-cyan-300">MNNIT Allahabad</strong>, connected through civil engineering.
          </p>
        </div>
        <div className={styles.grid}>
          {professors.map((professor) => <ProfessorCard key={professor.email} professor={professor} />)}
        </div>
      </div>
    </section>
  );
}





