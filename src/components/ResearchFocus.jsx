"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Zap, Eye, ArrowUpRight, Network } from "lucide-react";

export default function ResearchFocus() {
  const researchAreas = [
    {
      icon: Cpu,
      title: "Deep Learning & Neural Architectures",
      category: "Core Methodology",
      description:
        "Developing scalable neural network architectures, attention mechanisms, and efficient transformer models for computational efficiency and lower hardware footprint.",
      tags: ["Transformers", "Model Compression", "Optimization", "PyTorch"],
      color: "from-indigo-500/20 to-sky-500/10",
      accent: "text-indigo-400",
      borderAccent: "hover:border-indigo-500/50",
    },
    {
      icon: ShieldCheck,
      title: "Trustworthy & Explainable AI (XAI)",
      category: "Ethics & Security",
      description:
        "Investigating algorithmic interpretability, robustness against adversarial attacks, and fairness-aware learning paradigms in high-stakes domain applications.",
      tags: ["Interpretability", "Adversarial Robustness", "Fairness", "Uncertainty"],
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-400",
      borderAccent: "hover:border-emerald-500/50",
    },
    {
      icon: Zap,
      title: "Distributed & Parallel Computing",
      category: "Systems & Infrastructure",
      description:
        "Architecting distributed training pipelines, multi-GPU orchestration, and federated learning strategies to handle large-scale scientific datasets.",
      tags: ["Distributed Training", "CUDA", "Federated Learning", "MPI"],
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-400",
      borderAccent: "hover:border-amber-500/50",
    },
    {
      icon: Eye,
      title: "Computer Vision & Medical Imaging",
      category: "Applied AI",
      description:
        "Applying advanced computer vision models to multi-modal medical diagnostics, automated lesion detection, and synthetic data generation.",
      tags: ["Medical AI", "Segmentation", "Generative Models", "Multi-modal"],
      color: "from-sky-500/20 to-indigo-500/10",
      accent: "text-sky-400",
      borderAccent: "hover:border-sky-500/50",
    },
  ];

  return (
    <section id="research" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            <span>Research Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Primary <span className="text-gradient">Research Domains</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Exploring fundamental questions at the intersection of machine learning theory, systems optimization, and societal impacts.
          </p>
        </div>

        {/* Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card rounded-3xl p-8 relative overflow-hidden group border border-white/10 ${area.borderAccent} transition-all duration-300`}
              >
                {/* Subtle Radial Gradient Overlay */}
                <div
                  className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-br ${area.color} blur-2xl group-hover:scale-125 transition-transform duration-500`}
                ></div>

                <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl glass-pill border border-white/15 text-slate-200 group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${area.accent}`} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-slate-900/60 text-slate-300 border border-slate-700/60">
                      {area.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors flex items-center gap-2">
                      <span>{area.title}</span>
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>

                  {/* Tag List */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {area.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950/40 text-slate-300 text-xs font-medium border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
