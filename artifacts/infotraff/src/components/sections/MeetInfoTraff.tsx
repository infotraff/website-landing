import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Brain, Zap } from "lucide-react";

/* ─── REASON coded visual ────────────────────────────────────────── */
function ReasonVisual() {
  const [step, setStep] = useState(0);
  const obs = ["4 guests in queue · Staff ID: 00044 active", "Longest wait: 12 m 05 s (limit: 10 min)", "Threshold exceeded — escalating alert"];

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s < obs.length ? s + 1 : 0)), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl" style={{ background: "#07090f" }}>
      <div className="flex" style={{ height: 280 }}>
        {/* Camera feed, detect-queue.png already has baked-in AI overlays; no CSS boxes added */}
        <div className="relative overflow-hidden flex-shrink-0 bg-[#07090f]" style={{ width: "60%" }}>
          <img
            src={`${import.meta.env.BASE_URL}images/detect-queue-fb.jpg`}
            alt="Queue detection camera feed"
            className="w-full h-full object-cover"
            style={{ objectPosition: "25% center", transform: "scale(1.04)", transformOrigin: "center" }}
          />
          {/* LIVE */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <span className="text-white text-[9px] font-bold tracking-wider">LIVE · CAM 04</span>
          </div>
        </div>

        {/* Reasoning panel, right 40%, fixed height so items don't resize the card */}
        <div className="flex-1 bg-[#0d1221] border-l border-white/[0.07] flex flex-col p-4 gap-2 overflow-hidden">
          <div className="rounded-lg px-3 py-2 flex items-center gap-2 flex-shrink-0" style={{ background: "#fbbf2420", border: "1px solid #fbbf2450" }}>
            <div className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#fbbf24", borderTopColor: "transparent" }} />
            <span className="text-[11px] font-bold tracking-widest" style={{ color: "#fbbf24" }}>Reasoning...</span>
          </div>
          {obs.map((o, i) => (
            <AnimatePresence key={i}>
              {step > i && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2"
                >
                  <span className="text-white/80 text-[11px]">{o}</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
          <div className="flex-1" />
          <AnimatePresence>
            {step >= obs.length && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-500/15 border border-amber-500/35 rounded-lg px-3 py-2"
              >
                <p className="text-amber-400 text-[10px] font-bold">⚠ Wait time alert triggered</p>
                <p className="text-white/40 text-[9px]">Notify F&B supervisor</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── ACT coded visual ───────────────────────────────────────────── */
function ActVisual() {
  const actions = [
    { icon: "💧", label: "Spill detected, CAM 07", action: "Maintenance team Telegram alert sent", color: "#ef4444", delay: 0 },
    { icon: "⚠️", label: "Hazard zone flagged, aisle 3", action: "Area cordoned off · supervisor notified", color: "#f59e0b", delay: 0.2 },
    { icon: "📋", label: "Incident report generated", action: "Auto-sent to safety compliance inbox", color: "#22c55e", delay: 0.4 },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl" style={{ background: "#07090f" }}>
      {/* Camera feed strip, warehouse spill detection */}
      <div className="relative overflow-hidden" style={{ height: 150 }}>
        <img
          src={`${import.meta.env.BASE_URL}images/step-act-spill2.png`}
          alt="warehouse camera feed, spill detected"
          className="w-full h-full object-cover opacity-85"
          style={{ objectPosition: "60% 55%" }}
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          <span className="text-white text-[9px] font-bold tracking-wider">LIVE · CAM 07</span>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)" }} />
      </div>

      {/* Action cards */}
      <div className="p-4 flex flex-col gap-2.5">
        {actions.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: a.delay, duration: 0.35 }}
            className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.07] px-3.5 py-2.5"
            style={{ borderLeftWidth: 3, borderLeftColor: a.color }}
          >
            <span className="text-base">{a.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[11px] font-semibold truncate">{a.label}</p>
              <p className="text-white/40 text-[10px]">{a.action}</p>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: a.color, background: `${a.color}18` }}>NOW</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Steps config ───────────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    label: "See",
    icon: Eye,
    colorRaw: "#22c55e",
    heading: "Perceive Everything, Miss Nothing",
    body: "Your AI agent ingests every frame from every camera simultaneously, tracking people, objects, vehicles, and environmental hazards across all your sites, 24 hours a day.",
    tags: ["Foot traffic & dwell time", "PPE & safety compliance", "Vehicle & dock activity", "Fire, smoke & spillage"],
    visual: (
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl">
        <img
          src={`${import.meta.env.BASE_URL}images/step-see.png`}
          alt="AI perceiving cameras"
          className="w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-white/80 text-xs font-semibold">12 feeds · all monitored</span>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    label: "Reason",
    icon: Brain,
    colorRaw: "#fbbf24",
    heading: "Understand Context in Real Time",
    body: "The agent doesn't just detect, it reasons. It distinguishes staff from visitors, slow queues from normal flow, genuine violations from brief blind spots, and low-priority events from critical alerts.",
    tags: ["Shopper vs staff classification", "Queue depth & wait analysis", "Compliance gap identification", "Role crossover & zone breach"],
    visual: <ReasonVisual />,
  },
  {
    num: "03",
    label: "Act",
    icon: Zap,
    colorRaw: "#e2e8f0",
    heading: "Automatic Action, Zero Delay",
    body: "The moment a threshold is crossed, your agent fires the right response, alerts, reports, and staff notifications dispatched in under two seconds. No human in the loop required.",
    tags: ["Telegram & email alerts", "Auto-generated reports", "Staff dispatch notifications", "Dashboard updated < 1 sec"],
    visual: <ActVisual />,
  },
];

/* ─── Section ────────────────────────────────────────────────────── */
export function MeetInfoTraff() {
  return (
    <section id="solutions" className="py-12 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.22em] mb-4">AI Agent Architecture</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            An AI Agent for <span className="text-gradient">Every Camera</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            InfoTraff runs as an autonomous agent, perceiving your cameras continuously, reasoning about what it sees, and responding before problems escalate.
          </p>
        </motion.div>

        {/* Steps, spot.ai style horizontal rows */}
        <div className="flex flex-col gap-14 md:gap-20">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Text side */}
                <div className={!isEven ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.colorRaw}14`, border: `1px solid ${s.colorRaw}30` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: s.colorRaw }} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em]" style={{ color: `${s.colorRaw}70` }}>{s.num}</span>
                      <span className="mx-2 text-white/20">/</span>
                      <span className="text-sm font-bold" style={{ color: s.colorRaw }}>{s.label}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">{s.heading}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed mb-7">{s.body}</p>

                  <div className="flex flex-col gap-2.5">
                    {s.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.colorRaw }} />
                        <span className="text-sm text-white/60">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual side */}
                <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                  {s.visual}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
