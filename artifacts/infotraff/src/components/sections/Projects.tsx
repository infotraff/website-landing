import React from "react";
import { motion } from "framer-motion";
import { Award, Globe } from "lucide-react";

const projects = [
  {
    badge: "Government",
    title: "Egypt National Seatbelt Detection",
    description:
      "We created the first seatbelt violation detection software in Egypt, used to detect over 1 million violations on national highways. A landmark deployment in computer vision for road safety enforcement.",
    tags: ["Computer Vision", "Traffic Enforcement", "Scale Deployment"],
    icon: Award,
  },
  {
    badge: "MENA Region",
    title: "Arabic ANPR Solution",
    description:
      "The highest accuracy Automatic Number Plate Recognition (ANPR) solution for Arabic license plates in the MENA region. Deployed across multiple government and private sector clients.",
    tags: ["ANPR", "OCR", "MENA Region"],
    icon: Globe,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-12 md:py-24 bg-card border-y border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-14">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Our Track Record</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Machine Vision Is in{" "}
              <span className="text-gradient">InfoTraff DNA</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Years before AI became a buzzword, we were building production-grade computer vision systems at national scale.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="bg-background border border-border rounded-2xl p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full">
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
