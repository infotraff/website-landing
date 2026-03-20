import React from "react";
import { motion } from "framer-motion";
import { Users, Bell, ShoppingCart, BarChart2, Shield, Layers } from "lucide-react";

const solutions = [
  {
    icon: Users,
    title: "Foot Traffic Analytics",
    description: "Distinguish between visitor and employee footfall. Understand peak hours and optimise staffing based on real demand.",
    image: "ai-retail-analytics.png",
  },
  {
    icon: Bell,
    title: "Real-Time Live Alerts",
    description: "Instantly flag unattended customers, overcrowding, violations, fights, theft, production defects, or operational bottlenecks, all from your existing cameras.",
    image: "detection-factory-ppe.png",
  },
  {
    icon: ShoppingCart,
    title: "Queue Management",
    description: "Receive alerts when wait times exceed thresholds. Reduce missed opportunities and ensure customer satisfaction.",
    image: "detection-warehouse.jpg",
  },
  {
    icon: BarChart2,
    title: "Conversion & Dwell Time",
    description: "Track traffic patterns, conversion rates, dwell time, and product interactions to optimise store layouts.",
    image: "detection-cctv-comparison.jpg",
  },
  {
    icon: Shield,
    title: "Privacy-First by Design",
    description: "No facial recognition. No personal identification. Only anonymous movement patterns, fully compliant.",
    image: null,
  },
  {
    icon: Layers,
    title: "Open API Integrations",
    description: "Seamlessly connect with your ERP, dashboards, access control, POS systems, and messaging platforms.",
    image: null,
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="py-12 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Don't Underestimate the Potential of{" "}
            <span className="text-gradient">Your CCTVs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From foot traffic to POS, gain a comprehensive view of your business, all from infrastructure you already own.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-2xl overflow-hidden card-hover group"
              >
                {/* Image */}
                {s.image ? (
                  <div className="relative h-44 overflow-hidden bg-black">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${s.image}`}
                      alt={s.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    {/* AI badge */}
                    <div className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-widest">
                      AI LIVE
                    </div>
                  </div>
                ) : (
                  <div className="h-44 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative overflow-hidden">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    {/* Decorative grid */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-white">{s.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
