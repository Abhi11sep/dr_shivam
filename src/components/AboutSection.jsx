import { Wind, Leaf, Zap, BrainCircuit } from "lucide-react";
import TypingText from "@/components/TypingText";

const interests = [
  { label: "Air Quality", icon: Wind },
  { label: "Sustainable Filtration", icon: Leaf },
  { label: "Electrostatics", icon: Zap },
  { label: "Machine Learning", icon: BrainCircuit },
];

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-300">
              <Leaf className="h-4 w-4" aria-hidden="true" /> Research & purpose
            </span>
            <h2 id="about-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-xl sm:text-2xl leading-relaxed font-semibold tracking-tight text-slate-200">
              Environmental Engineering Researcher working at the intersection of Air Quality, Sustainable Filtration, Electrostatics, and Machine Learning
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {interests.map(({ label, icon: Icon }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                  <Icon className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />{label}
                </span>
              ))}
            </div>
          </div>
          <TypingText className="glass-container rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl text-sm sm:text-base leading-relaxed text-slate-300 [&_strong]:font-semibold [&_strong]:text-slate-100">
            <p>
              I am an Environmental Engineering researcher and currently a <strong>FARE Fellow at the Indian Institute of Technology Kanpur (IIT Kanpur)</strong>. I completed my Ph.D. from IIT Kanpur, where my doctoral research focused on the <strong>development of novel indoor air purification technologies</strong> for improving air quality through sustainable and engineering-driven solutions.
            </p>
            <p>
              My research lies at the intersection of <strong>air pollution control, sustainable filtration, electrostatic technologies, aerosol science, and machine learning</strong>. During my doctoral work, I developed biodegradable air-filter media from agricultural waste, explored electrostatically assisted filtration for enhanced submicron particle removal, and developed machine-learning frameworks for predicting air-pollution-associated carcinogenic risk.
            </p>
            <p>
              I enjoy taking research beyond theoretical analysis by combining <strong>experimental design, instrumentation, prototyping, modelling, and data-driven approaches</strong> to develop practical environmental engineering solutions. My broader research interests include indoor air quality, advanced air-cleaning technologies, exposure and health-risk assessment, sustainable materials, and intelligent environmental monitoring.
            </p>
          </TypingText>
        </div>
      </div>
    </section>
  );
}
