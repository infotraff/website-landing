import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const WORDS = ["Retail", "Manufacturing", "Supermarkets", "F&B", "Warehouses"];

function TypewriterWords() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 50);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <span className="text-gradient">
      {displayed}
      <span className="cursor-blink text-primary ml-0.5">|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.webp`}
          alt="AI Camera Network"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left, Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase">AI-Powered CCTV Analytics</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-4"
            >
              See Everything.<br />
              <span className="text-gradient">Miss Nothing.</span>
            </motion.h1>

            {/* Typewriter line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl sm:text-3xl font-bold mb-6 h-10 flex items-center"
            >
              Built for&nbsp;<TypewriterWords />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
            >
              Real-time alerts & insights from your{" "}
              <strong className="text-white">existing CCTV cameras</strong> via our AI edge device, no new cameras required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a href="#contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white text-base font-bold tracking-tight hover:brightness-110 transition-all">
                  Turn Your Cameras On
                </button>
              </a>
              <button
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.06] border border-primary/30 text-white text-base font-semibold tracking-tight hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center justify-center gap-2"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Live Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Right, Video */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, type: "spring", stiffness: 80 }}
            className="relative flex items-center justify-center animate-float"
          >
            <div className="glow-border relative w-full max-w-[580px] rounded-2xl overflow-hidden bg-black shadow-2xl shadow-primary/20">
              {/* LIVE badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                <span className="text-white text-[11px] font-bold tracking-wide">LIVE AI DETECTIONS</span>
              </div>
              <img
                src={`${import.meta.env.BASE_URL}images/hero-detections-grid.webp`}
                alt="InfoTraff AI Detections"
                className="w-full object-cover object-top rounded-2xl"
                style={{ aspectRatio: "1 / 0.75", display: "block" }}
              />
              {/* Scan line overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
                }}
              />
            </div>
            {/* Glow blob */}
            <div className="absolute inset-0 bg-primary/15 blur-[80px] rounded-full z-[-1]" />
          </motion.div>
        </div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16"
        >
          {[
            { icon: ShieldCheck, label: "No new cameras needed", sub: "Our AI edge device connects to your existing CCTV" },
            { icon: Zap, label: "Real-time live alerts", sub: "Defects, bottlenecks, theft, violations & more" },
            { icon: BarChart2, label: "Turn Video Data into Insights", sub: "Actionable intelligence from existing cameras" },
          ].map(({ icon: Icon, label, sub }, i) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-panel rounded-2xl px-6 py-5 flex items-center gap-4 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
