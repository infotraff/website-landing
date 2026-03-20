import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Camera } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

type Scenario = {
  query: string;
  cameras: { id: string; img: string }[];
  matches: number;
  totalCams: number;
  hours: number;
  time: string;
};

const scenarios: Scenario[] = [
  {
    query: "Person with red hoodie near exit",
    cameras: [
      { id: "CAM 04", img: "search-retail-1.png" },
      { id: "CAM 07", img: "search-retail-2.png" },
      { id: "CAM 12", img: "search-retail-3.png" },
    ],
    matches: 5,
    totalCams: 22,
    hours: 48,
    time: "1.8s",
  },
  {
    query: "Forklift entering restricted zone",
    cameras: [
      { id: "CAM 03", img: "search-warehouse-1.png" },
      { id: "CAM 11", img: "search-warehouse-2.png" },
      { id: "CAM 17", img: "search-warehouse-3.png" },
    ],
    matches: 4,
    totalCams: 18,
    hours: 24,
    time: "1.2s",
  },
  {
    query: "Worker without hard hat near machinery",
    cameras: [
      { id: "CAM 02", img: "search-factory-1.png" },
      { id: "CAM 06", img: "search-factory-2.png" },
      { id: "CAM 09", img: "search-factory-3.png" },
    ],
    matches: 3,
    totalCams: 14,
    hours: 8,
    time: "0.6s",
  },
  {
    query: "Overcrowding at store entrance",
    cameras: [
      { id: "CAM 01", img: "search-retail-3.png" },
      { id: "CAM 06", img: "search-retail-2.png" },
      { id: "CAM 11", img: "search-retail-1.png" },
    ],
    matches: 8,
    totalCams: 22,
    hours: 72,
    time: "0.9s",
  },
  {
    query: "Person in loading dock after hours",
    cameras: [
      { id: "CAM 08", img: "search-warehouse-2.png" },
      { id: "CAM 14", img: "search-warehouse-1.png" },
      { id: "CAM 19", img: "search-warehouse-3.png" },
    ],
    matches: 2,
    totalCams: 18,
    hours: 12,
    time: "0.7s",
  },
  {
    query: "Unauthorised entry to clean room",
    cameras: [
      { id: "CAM 01", img: "search-factory-2.png" },
      { id: "CAM 07", img: "search-factory-3.png" },
      { id: "CAM 12", img: "search-factory-1.png" },
    ],
    matches: 1,
    totalCams: 14,
    hours: 48,
    time: "1.1s",
  },
];

function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, done };
}

export function AiSearch() {
  const [idx, setIdx] = useState(0);
  const [showCams, setShowCams] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = scenarios[idx];
  const { displayed, done } = useTypewriter(scenario.query, 45);

  useEffect(() => {
    setShowCams(false);
    if (done) {
      const t = setTimeout(() => setShowCams(true), 300);
      return () => clearTimeout(t);
    }
  }, [done]);

  useEffect(() => {
    autoRef.current = setTimeout(() => {
      setIdx(i => (i + 1) % scenarios.length);
      setShowCams(false);
    }, 5500);
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [idx]);

  return (
    <section className="py-14 md:py-28 bg-card border-y border-border overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_hsl(var(--primary)/0.06),_transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — Search panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-2xl border border-border p-6 shadow-2xl shadow-black/60 font-mono order-2 lg:order-1"
          >
            {/* Search bar */}
            <div className="flex items-center gap-3 bg-secondary/50 border border-border rounded-xl px-4 py-3 mb-6">
              <Search className="w-4 h-4 text-primary shrink-0" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={scenario.query}
                  className="flex-1 text-sm text-white min-h-[1.25rem]"
                >
                  {displayed}
                  {!done && (
                    <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                  )}
                </motion.span>
              </AnimatePresence>
              <motion.div
                animate={done ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.95 }}
                className="flex items-center gap-1.5 bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-lg shrink-0"
              >
                <Search className="w-3 h-3" />
                Search
              </motion.div>
            </div>

            {/* Camera thumbnails */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {showCams
                ? scenario.cameras.map((cam, i) => (
                    <motion.div
                      key={cam.id + scenario.query}
                      initial={{ opacity: 0, scale: 0.85, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.35, type: "spring", stiffness: 200 }}
                      className="relative rounded-lg overflow-hidden aspect-[4/3] bg-black group cursor-pointer"
                    >
                      <img
                        src={`${BASE}images/${cam.img}`}
                        alt={cam.id}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1.5 left-1.5 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Camera className="w-2 h-2" />
                        {cam.id}
                      </div>
                      <div className="absolute bottom-1.5 right-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity border border-primary/40 rounded-lg" />
                    </motion.div>
                  ))
                : [0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg aspect-[4/3] bg-secondary/40 border border-border animate-pulse"
                    />
                  ))}
            </div>

            {/* Stats bar */}
            <div className="h-6 flex items-center">
              <motion.div
                animate={{ opacity: showCams ? 1 : 0 }}
                transition={{ duration: 0.3, delay: showCams ? 0.5 : 0 }}
                className="flex items-center gap-2 text-[11px] text-muted-foreground"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>
                  <span className="text-white font-bold">{scenario.matches} matches</span>
                  {" "}across{" "}
                  <span className="text-white font-bold">{scenario.totalCams} cameras</span>
                  {" · "}
                  <span className="text-white font-bold">{scenario.hours}h</span> searched
                  {" · "}found in{" "}
                  <span className="text-primary font-bold">{scenario.time}</span>
                </span>
              </motion.div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-5">
              {scenarios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (autoRef.current) clearTimeout(autoRef.current);
                    setIdx(i);
                    setShowCams(false);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Search className="w-3 h-3" />
              AI-Powered Search
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
              Describe it in plain English.<br />
              <span className="text-gradient">We find it instantly.</span>
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Just describe what you need. InfoTraff searches your live feeds instantly across every camera, finding <em className="text-white not-italic">employees, vests, forklifts, spills, crowding,</em> or <em className="text-white not-italic">unattended customers</em> in seconds.
            </p>

            <div className="space-y-4">
              {[
                { label: "Natural language queries", sub: "No learning curve, search like you think" },
                { label: "Searches all cameras simultaneously", sub: "100+ live feeds analysed in parallel" },
                { label: "Results in under 2 seconds", sub: "Real-time search across every camera" },
                { label: "Plug-in AI edge device", sub: "Connects to your existing cameras in minutes" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold">{item.label}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
