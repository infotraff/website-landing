import React from "react";
import { motion } from "framer-motion";
import { Shield, Layers, CheckCircle2 } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Privacy Always in Mind",
    description: "No faces stored. No identities tracked. InfoTraff reads movement, not people, GDPR compliant out of the box, zero configuration required.",
    badges: ["GDPR Compliant", "No Biometrics", "Anonymous Data"],
    color: "hsl(122 76% 42%)",
  },
  {
    icon: Layers,
    title: "Plugs into Your Existing Stack",
    description: "No rip-and-replace. InfoTraff connects to your ERP, POS, access control, Telegram, and dashboards via open APIs, live in days, not months.",
    badges: ["REST API", "Webhooks", "Telegram / SMS"],
    color: "hsl(48 96% 52%)",
  },
];

export function TrustStrip() {
  return (
    <section className="pt-2 pb-14 md:pt-4 md:pb-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,_hsl(var(--primary)/0.05),_transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.22em] mb-3">Built Right</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Enterprise-Ready, <span className="text-gradient">From Day One</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col md:flex-row gap-4 md:gap-5 p-6 md:p-7 rounded-2xl border border-border bg-card/60 backdrop-blur-sm card-hover group"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}35` }}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: item.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{item.description}</p>

                  {/* Badges: 3-col grid on mobile, flex row on desktop */}
                  <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:gap-2">
                    {item.badges.map((b) => (
                      <span
                        key={b}
                        className="flex items-center justify-center gap-1 text-[10px] md:text-[11px] font-bold px-2 md:px-2.5 py-1.5 md:py-1 rounded-full border text-center"
                        style={{ color: item.color, borderColor: `${item.color}40`, background: `${item.color}10` }}
                      >
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>{b}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
