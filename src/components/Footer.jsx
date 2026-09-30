"use client";

import { Mail, Phone, ArrowUp, GraduationCap } from "lucide-react";
import { WhatsappIcon } from "@/components/Icons";
import styles from "./Footer.module.css";

const contacts = [
  { icon: Phone, value: "8707718032", label: "Phone", href: "tel:+918707718032", accent: "#a5b4fc" },
  { icon: WhatsappIcon, value: "8090477289", label: "WhatsApp", href: "https://wa.me/918090477289", accent: "#6ee7b7", external: true },
  { icon: Mail, value: "shivamnov20@iitk.ac.in", label: "Academic email", href: "mailto:shivamnov20@iitk.ac.in", accent: "#67e8f9" },
  { icon: Mail, value: "Shivam.shivamsingh.singh@gmail.com", label: "Personal email", href: "mailto:Shivam.shivamsingh.singh@gmail.com", accent: "#c4b5fd" },
];

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <footer id="contact" aria-labelledby="contact-heading" className={styles.footer}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Contact & collaboration</span>
          <h2 id="contact-heading">Let’s <span className="text-gradient-accent">connect.</span></h2>
          <p>For research conversations, academic enquiries, and collaboration.</p>
        </div>
        <div className={styles.main}>
          <div className={styles.identity}>
            <span className={styles.institution}>IIT KANPUR <span aria-hidden="true">/</span> CESE</span>
            <div className={styles.nameRow}><span className={styles.scholarIcon}><GraduationCap size={28} aria-hidden="true" /></span><h3>Dr. Shivam<span aria-hidden="true">.</span></h3></div>
            <p className={styles.role}>Ph.D. Scholar & Researcher</p>
            <address className={styles.address}>
              <strong>Atmospheric Particle Technology Laboratory</strong>
              <span>(APTL; Lab - 209),</span>
              <span>Centre for Environmental Science & Engineering (CESE),</span>
              <span>Department of Civil Engineering,</span>
              <span>Indian Institute of Technology-Kanpur,</span>
              <span>Kanpur-208016 (UP), India.</span>
            </address>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelHeading}><h3>Get in touch</h3></div>
            <div className={styles.contacts}>
              {contacts.map(({ icon: Icon, value, label, href, accent, external }) => (
                <a key={href} href={href} aria-label={`${label}: ${value}`} title={`${label}: ${value}`} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={styles.contact} style={{ "--contact-accent": accent }}>
                  <span className={styles.icon}><Icon className="w-5 h-5" aria-hidden="true" /></span>
                  <span className={styles.value}>{value}</span>

                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Dr. Shivam. All rights reserved.</p>
          <nav aria-label="Footer navigation" className={styles.navigation}>
            <a href="#home">Home</a><a href="#research-work">Research</a><a href="#publications">Publications</a>
          </nav>
          <button type="button" onClick={scrollToTop} className={styles.backToTop} aria-label="Back to top"><ArrowUp size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </footer>
  );
}

