import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do we need to buy new cameras?",
    a: "No new cameras needed. InfoTraff provides an AI edge device that connects directly to your existing CCTV system. It installs in minutes and immediately starts analysing your live feeds, no ripping out infrastructure, no additional cameras.",
  },
  {
    q: "What insights do we get?",
    a: "You get two layers: Live Alerts (defects, bottlenecks, unattended customers, violations, fights, theft) and Insights (traffic patterns, conversion rates, dwell time, product interactions, and more), all tailored to your specific operations.",
  },
  {
    q: "Can we customize the features to fit our needs?",
    a: "Absolutely. InfoTraff technology is built in-house using our own proprietary AI models, giving us the flexibility to tailor detections and dashboards to your exact operational requirements.",
  },
  {
    q: "How is customer privacy protected?",
    a: "We use zero facial recognition and zero personal identification. Our system only analyzes anonymous movement patterns, fully compliant with international privacy regulations.",
  },
  {
    q: "Can InfoTraff integrate with our existing software?",
    a: "Yes. We offer open API integrations with dashboards, ERP systems, access control hardware, messaging platforms (Slack, Teams, Telegram), and more.",
  },
  {
    q: "What types of facilities do you support?",
    a: "We serve retail, manufacturing, hospitality, healthcare, and government facilities. Our AI models are trained for diverse environments and can be customized for any unique operational context.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 md:py-24 bg-card border-y border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Got Questions?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left gap-4"
              >
                <span className="font-semibold text-white text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-primary" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
