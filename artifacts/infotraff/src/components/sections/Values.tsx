import React from "react";
import { motion } from "framer-motion";
import { Database, Lightbulb, Link2 } from "lucide-react";

const values = [
  {
    icon: Database,
    label: "Data-Driven",
    description: "Real-time insight and predictions to optimize performance across every corner of your facility.",
  },
  {
    icon: Lightbulb,
    label: "Meaningful",
    description: "Discovery that empowers businesses to deliver unparalleled value to their customers and teams.",
  },
  {
    icon: Link2,
    label: "Interoperable",
    description: "Easily integrate and communicate across different systems, ERP, POS, access control, and more.",
  },
];

export function Values() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Our Values</p>
          <blockquote className="text-2xl md:text-3xl font-bold text-white italic leading-snug">
            "See what everybody else has seen, and think what nobody else has thought."
          </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide group-hover:text-primary transition-colors">{v.label}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
