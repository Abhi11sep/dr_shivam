"use client";

import { motion } from "framer-motion";
import { BellRing, Calendar, Sparkles, Award, ExternalLink, MessageSquareQuote } from "lucide-react";

export default function NewsUpdates() {
  const newsItems = [
    {
      date: "Aug 2026",
      title: "Paper Accepted at IEEE TPAMI",
      category: "Publication",
      description:
        "Our journal paper on dynamic entropy minimization in high-dimensional neural spaces has been accepted for publication in IEEE TPAMI.",
      accent: "text-emerald-400",
      pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    },
    {
      date: "Jun 2026",
      title: "Invited Talk at AI Research Summit 2026",
      category: "Keynote Talk",
      description:
        "Delivered a virtual guest lecture on 'Trustworthy AI & Representation Learning' organized by the European AI Consortium.",
      accent: "text-sky-400",
      pillBg: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    },
    {
      date: "Mar 2026",
      title: "Awarded Doctoral Research Excellence Fellowship",
      category: "Honor & Award",
      description:
        "Recognized for outstanding doctoral contributions and research impact in computational computer science.",
      accent: "text-amber-400",
      pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    },
    {
      date: "Dec 2025",
      title: "NeurIPS Spotlight Presentation in Vancouver",
      category: "Conference Presentation",
      description:
        "Presented our paper on structured pruning for vision-language models at the main NeurIPS conference session.",
      accent: "text-indigo-400",
      pillBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    },
  ];

  return (
    <section id="news" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <BellRing className="w-3.5 h-3.5" />
            <span>Latest Developments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Academic <span className="text-gradient">News & Announcements</span>
          </h2>
          <p className="text-slate-400 text-base">
            Recent updates on paper acceptances, conferences, awards, and research milestones.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 sm:p-7 relative border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Date & Category */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{item.date}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${item.pillBg}`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-100 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 mt-4">
                <span>Lab Announcement</span>
                <Sparkles className={`w-4 h-4 ${item.accent}`} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
