import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, Camera, MessageSquare, Mail, Phone } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

type NotificationScenario = {
  alertType: string;
  severity: "critical" | "warning" | "info";
  recipient: string;
  channels: string[];
  cameras: { id: string; img: string }[];
  responseTime: string;
  location: string;
};

const scenarios: NotificationScenario[] = [
  {
    alertType: "Shoplifting Alert",
    severity: "critical",
    recipient: "Security Team",
    channels: ["Telegram", "SMS"],
    cameras: [
      { id: "CAM 04", img: "search-retail-1.png" },
      { id: "CAM 07", img: "search-retail-2.png" },
      { id: "CAM 12", img: "search-retail-3.png" },
    ],
    responseTime: "1.8s",
    location: "Exit — Zone B",
  },
  {
    alertType: "Restricted Zone Breach",
    severity: "critical",
    recipient: "Safety Manager",
    channels: ["Telegram", "Email"],
    cameras: [
      { id: "CAM 03", img: "search-warehouse-1.png" },
      { id: "CAM 11", img: "search-warehouse-2.png" },
      { id: "CAM 17", img: "search-warehouse-3.png" },
    ],
    responseTime: "1.2s",
    location: "Warehouse — Aisle 4",
  },
  {
    alertType: "PPE Violation",
    severity: "warning",
    recipient: "Floor Supervisor",
    channels: ["SMS", "Email"],
    cameras: [
      { id: "CAM 02", img: "search-factory-1.png" },
      { id: "CAM 06", img: "search-factory-2.png" },
      { id: "CAM 09", img: "search-factory-3.png" },
    ],
    responseTime: "0.6s",
    location: "Factory — Line 3",
  },
  {
    alertType: "Overcrowding Detected",
    severity: "warning",
    recipient: "Store Manager",
    channels: ["Telegram"],
    cameras: [
      { id: "CAM 01", img: "search-crowd-1.png" },
      { id: "CAM 06", img: "search-crowd-2.png" },
      { id: "CAM 11", img: "search-crowd-3.png" },
    ],
    responseTime: "0.9s",
    location: "Main Entrance",
  },
  {
    alertType: "After-Hours Intrusion",
    severity: "critical",
    recipient: "Security Team",
    channels: ["Telegram", "SMS", "Email"],
    cameras: [
      { id: "CAM 08", img: "search-warehouse-2.png" },
      { id: "CAM 14", img: "search-warehouse-1.png" },
      { id: "CAM 19", img: "search-warehouse-3.png" },
    ],
    responseTime: "0.7s",
    location: "Loading Dock",
  },
  {
    alertType: "Unauthorised Access",
    severity: "critical",
    recipient: "Operations Manager",
    channels: ["Telegram", "Email"],
    cameras: [
      { id: "CAM 01", img: "search-factory-2.png" },
      { id: "CAM 07", img: "search-factory-3.png" },
      { id: "CAM 12", img: "search-factory-1.png" },
    ],
    responseTime: "1.1s",
    location: "Clean Room — Level 2",
  },
];

const CHANNEL_ICON: Record<string, React.ReactNode> = {
  Telegram: <MessageSquare className="w-3 h-3" />,
  Email: <Mail className="w-3 h-3" />,
  SMS: <Phone className="w-3 h-3" />,
};

const SEVERITY_COLOR: Record<string, string> = {
  critical: "text-red-400 bg-red-500/10 border-red-500/30",
  warning: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  info: "text-blue-400 bg-blue-500/10 border-blue-500/30",
};

export function AiSearch() {
  const [idx, setIdx] = useState(1);
  const [showCams, setShowCams] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = scenarios[idx];

  useEffect(() => {
    setShowCams(false);
    const t = setTimeout(() => setShowCams(true), 600);
    return () => clearTimeout(t);
  }, [idx]);

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

          {/* Left — Notification panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-2xl border border-border p-6 shadow-2xl shadow-black/60 font-mono order-2 lg:order-1"
          >
            {/* Notification card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.alertType}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 mb-6 ${SEVERITY_COLOR[scenario.severity]}`}
              >
                <Bell className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold truncate">{scenario.alertType}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 shrink-0">
                      {scenario.severity}
                    </span>
                  </div>
                  <div className="text-[11px] mt-0.5 opacity-80">{scenario.location}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Camera thumbnails */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {showCams
                ? scenario.cameras.map((cam, i) => (
                    <motion.div
                      key={cam.id + scenario.alertType}
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

            {/* Stats + channels row */}
            <div className="h-6 flex items-center">
              <motion.div
                animate={{ opacity: showCams ? 1 : 0 }}
                transition={{ duration: 0.3, delay: showCams ? 0.5 : 0 }}
                className="flex items-center gap-3 text-[12px] text-muted-foreground w-full"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>
                    Sent to <span className="text-white font-semibold">{scenario.recipient}</span>
                    {" "}in <span className="text-primary font-bold">{scenario.responseTime}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  {scenario.channels.map(ch => (
                    <span key={ch} className="flex items-center gap-1 bg-secondary border border-border rounded px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {CHANNEL_ICON[ch]}
                      {ch}
                    </span>
                  ))}
                </div>
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
              <Bell className="w-3 h-3" />
              Dynamic Customized Notifications
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
              The right alert to the<br />
              <span className="text-gradient">right person, instantly.</span>
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Every event triggers a fully customised notification — routed to the right person, via the right channel, with camera evidence attached. No noise, no missed incidents.
            </p>

            <div className="space-y-4">
              {[
                { label: "Fully customisable rules", sub: "Set who gets notified, when, and how" },
                { label: "Multi-channel delivery", sub: "Telegram, SMS, and email — all supported" },
                { label: "Instant response times", sub: "Alerts dispatched in under 2 seconds" },
                { label: "Camera evidence included", sub: "Every alert carries a snapshot from the scene" },
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
