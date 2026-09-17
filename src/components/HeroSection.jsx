"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  Mail,
  Award,
  ChevronRight,
  BookOpen,
  Globe,
  MapPin,
  Building2,
  FlaskConical,
  GraduationCap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Text & Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Status / Affiliation Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium shadow-inner flex-wrap">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400">FARE Fellow</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Fellowship for Academic and Research Excellence</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
                Dr. Shivam <br />
                <span className="text-gradient">Atmospheric Particle</span> &{" "}
                <span className="text-gradient-accent">Environmental Science</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-indigo-200/90 leading-relaxed">
                FARE Fellow (Fellowship for Academic and Research Excellence)
              </p>
              <p className="text-sm sm:text-base text-slate-400 font-normal">
                Department of Civil Engineering &bull; IIT Kanpur
              </p>
            </div>

            {/* Research Abstract / Lab Overview */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Conducting advanced research at the{" "}
              <span className="text-indigo-300 font-semibold">
                Atmospheric Particle Technology Laboratory (APTL; Lab - 209)
              </span>
              , Centre for Environmental Science & Engineering, Department of Civil Engineering, Indian Institute of Technology Kanpur.
            </p>

            {/* Quick Details Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl glass-card text-xs">
                <FlaskConical className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 font-medium">Laboratory</div>
                  <div className="text-slate-200 font-semibold">
                    APTL (Lab - 209)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl glass-card text-xs">
                <Building2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 font-medium">Centre & Dept</div>
                  <div className="text-slate-200 font-semibold">
                    CESE | Dept. of Civil Engineering
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl glass-card text-xs">
                <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 font-medium">Institution</div>
                  <div className="text-slate-200 font-semibold">
                    IIT Kanpur, India
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl glass-card text-xs">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 font-medium">Location</div>
                  <div className="text-slate-200 font-semibold">
                    Kanpur-208016 (UP), India
                  </div>
                </div>
              </div>
            </div>

            {/* Key Research Focus Hashtags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "IndoorAirQuality",
                "AirFiltration",
                "Electrostatics",
                "AerosolScience",
                "MachineLearning",
                "HealthRiskAssessment",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono backdrop-blur-sm hover:border-indigo-400 hover:text-white hover:bg-indigo-500/20 transition-all shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#publications"
                className="px-6 py-3 rounded-full glass-button-primary text-white font-semibold text-sm flex items-center gap-2 group"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Publications</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-full glass-button-secondary text-slate-200 hover:text-white font-semibold text-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Contact Details</span>
              </a>
            </div>

            {/* Academic Social Profiles */}
            <div className="pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Academic Profiles:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://scholar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-pill text-slate-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
                  title="Google Scholar"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="https://orcid.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-pill text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
                  title="ORCID iD"
                >
                  <Award className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-pill text-slate-300 hover:text-white hover:border-white/30 transition-all"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-pill text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-all"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="mailto:shivam@iitk.ac.in"
                  className="p-2.5 rounded-full glass-pill text-slate-300 hover:text-rose-400 hover:border-rose-500/40 transition-all"
                  title="Academic Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Profile Card & Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative Glass Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>

              {/* Main Card Container */}
              <div className="relative glass-container rounded-3xl p-6 sm:p-8 space-y-6">
                
                {/* Profile Photo Display Frame */}
                <div className="relative mx-auto w-48 h-56 sm:w-56 sm:h-64 rounded-2xl p-1.5 glass-pill shadow-2xl overflow-hidden group">
                  <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-900 border border-indigo-500/40">
                    <Image
                      src="/profile.png"
                      alt="Dr. Shivam"
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute bottom-3 right-3 p-2 rounded-full bg-indigo-600 text-white shadow-lg border border-slate-900">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                {/* Quick Info Header */}
                <div className="space-y-1.5 text-center">
                  <h3 className="text-2xl font-bold text-slate-100">
                    Dr. Shivam
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                    FARE Fellow
                  </div>
                  <p className="text-xs text-slate-400 font-medium pt-1">
                    Fellowship for Academic and Research Excellence
                  </p>
                </div>

                {/* Institutional Details Card */}
                <div className="glass-card rounded-2xl p-4 text-xs space-y-2.5 border-white/5 text-slate-300">
                  <div className="flex flex-col gap-0.5 border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Laboratory</span>
                    <span className="font-semibold text-indigo-300">
                      Atmospheric Particle Technology Laboratory (APTL; Lab - 209)
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5 border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Centre</span>
                    <span className="font-semibold text-slate-200">
                      Centre for Environmental Science & Engineering
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5 border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Department</span>
                    <span className="font-semibold text-slate-200">
                      Department of Civil Engineering
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5 border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Institution</span>
                    <span className="font-semibold text-emerald-400">
                      Indian Institute of Technology-Kanpur
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Address</span>
                    <span className="font-semibold text-slate-300">
                      Kanpur-208016 (UP), India
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
