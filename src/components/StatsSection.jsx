"use client";

import { motion } from "framer-motion";
import { BookOpen, Award, TrendingUp, Users, FileCheck2, Presentation } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      label: "Total Citations",
      value: "350+",
      sub: "Google Scholar indexed",
      icon: TrendingUp,
      color: "from-sky-500 to-indigo-500",
      textColor: "text-sky-400",
    },
    {
      label: "Peer-Reviewed Papers",
      value: "14",
      sub: "IEEE, ACM, NeurIPS & Springer",
      icon: BookOpen,
      color: "from-indigo-500 to-purple-500",
      textColor: "text-indigo-400",
    },
    {
      label: "h-index / i10-index",
      value: "8 / 7",
      sub: "High academic impact ratio",
      icon: Award,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-400",
    },
    {
      label: "Keynote & Talks",
      value: "9",
      sub: "International Conferences",
      icon: Presentation,
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
    },
  ];

  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 relative overflow-hidden group border-white/10 hover:border-indigo-500/40"
              >
                {/* Ambient Top Glow Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`}
                ></div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </span>
                  <div className="p-2.5 rounded-xl glass-pill text-slate-300 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${stat.textColor}`} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className={`text-3xl font-extrabold ${stat.textColor}`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    {stat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
