import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Map, Star, AlertCircle, Bell, Clock,
  ScanLine, GitMerge, Shield, Flame, Ban, Droplets,
  Building2, Timer, Lock, ShieldCheck, ArrowLeftRight, Package,
  Cog, Sparkles, AlertTriangle, Users, Navigation, BarChart2,
  UtensilsCrossed, Store, Package2, MousePointerClick, UserX, CreditCard,
  ChevronRight, ChevronLeft,
} from "lucide-react";

type Overlay = {
  label: string;
  color: string;
  top: string; left: string; width: string; height: string;
};

const industries: {
  id: string; label: string; tabIcon: React.ElementType; colorRaw: string;
  badge: string; image: string; video: string | null;
  headline: string; description: string;
  capabilities: { icon: React.ElementType; label: string; desc: string }[];
  overlays?: Overlay[];
}[] = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    tabIcon: Cog,
    colorRaw: "#fbbf24",
    badge: "MANUFACTURING",
    image: "detection-factory-ppe.webp",
    video: "hero-demo.mp4",
    headline: "Safety Enforcement and Quality Control, Automated",
    description: "Detect violations before injuries happen, track production throughput, and maintain compliance, all from your existing camera network, around the clock.",
    capabilities: [
      { icon: ScanLine, label: "Defect Detection", desc: "Identify product faults on the line" },
      { icon: GitMerge, label: "Assembly Line Counting", desc: "Track units & throughput per station" },
      { icon: Shield, label: "PPE Compliance", desc: "Helmet, vest, and glove detection" },
      { icon: Flame, label: "Fire & Smoke Detection", desc: "Early hazard alerts before escalation" },
      { icon: Ban, label: "Blocked Aisles", desc: "Obstruction in egress routes flagged instantly" },
      { icon: Droplets, label: "Spillage Detection", desc: "Immediate wet floor notifications sent" },
    ],
  },
  {
    id: "retail",
    label: "Retail",
    tabIcon: ShoppingCart,
    colorRaw: "#22c55e",
    badge: "RETAIL",
    image: "detection-retail-heatmap.webp",
    video: null,
    headline: "Turn Every Visit Into Actionable Intelligence",
    description: "Your existing cameras become a full retail analytics platform, foot traffic, service gaps, loss prevention, and VIP recognition, without storing a single identity.",
    capabilities: [
      { icon: ShoppingCart, label: "Foot Traffic Insights", desc: "Count visitors, track entry & exit flow" },
      { icon: Map, label: "Heatmaps", desc: "Visualise dwell zones and hotspots" },
      { icon: Star, label: "VIP Client Identify", desc: "Recognise returning high-value customers" },
      { icon: AlertCircle, label: "Theft Detection", desc: "Real-time concealment & exit alerts" },
      { icon: Bell, label: "Service Alerts", desc: "Unattended customers trigger staff notifications" },
      { icon: Clock, label: "Transaction Time", desc: "Measure checkout & service durations" },
    ],
  },
  {
    id: "warehouse",
    label: "Warehouses",
    tabIcon: Package,
    colorRaw: "#60a5fa",
    badge: "WAREHOUSE",
    image: "detection-warehouse.webp",
    video: null,
    headline: "Full Operational Visibility Across Every Dock",
    description: "From loading bay to storage floor, track vehicles, shipments, staff compliance, and security in one unified command centre.",
    capabilities: [
      { icon: Building2, label: "Digital Dock Twin", desc: "Live digital replica of bay activity" },
      { icon: Timer, label: "Loading Delays", desc: "Detect and alert on idle dock time" },
      { icon: Lock, label: "Security Checks", desc: "Access control and intruder detection" },
      { icon: ShieldCheck, label: "Uniform Compliance", desc: "Staff dress code enforcement" },
      { icon: ArrowLeftRight, label: "Roll Crossover", desc: "Wrong staff detected in restricted zones" },
      { icon: Package, label: "Shipment Tracking", desc: "Inbound & outbound parcel visibility" },
    ],
  },
  {
    id: "fb",
    label: "F&B",
    tabIcon: UtensilsCrossed,
    colorRaw: "#f97316",
    badge: "F & B",
    image: "detection-fb-tables.webp",
    video: null,
    headline: "Smarter Service, Fewer Complaints",
    description: "Monitor every table and service interaction in real time, reduce wait times, enforce hygiene standards, and maximise covers without adding staff.",
    capabilities: [
      { icon: Timer, label: "Wait Time Monitoring", desc: "Track time from seated to first service" },
      { icon: Sparkles, label: "Table Cleanliness", desc: "Detect uncleared tables between covers" },
      { icon: AlertTriangle, label: "Hygiene Alerts", desc: "Staff compliance with hygiene protocols" },
      { icon: Users, label: "Table Occupancy", desc: "Live seat utilisation across the floor" },
      { icon: UserX, label: "Dine & Dash Alerts", desc: "Detect customers leaving without paying" },
      { icon: Clock, label: "Staff Response Time", desc: "Measure response lag per table" },
    ],
  },
  {
    id: "supermarket",
    label: "Supermarkets",
    tabIcon: Store,
    colorRaw: "#06b6d4",
    badge: "SUPERMARKET",
    image: "detection-supermarket-stock.webp",
    video: null,
    headline: "Store Intelligence From Every Aisle",
    description: "Track shelf availability, shopper behaviour, and checkout performance in real time, turning your existing cameras into a full retail intelligence system.",
    capabilities: [
      { icon: Package2, label: "Shelf Gap Detection", desc: "Alert staff to empty or low-stock shelves" },
      { icon: CreditCard, label: "Checkout Lane Alerts", desc: "Open more lanes before queues form" },
      { icon: Navigation, label: "Customer Path", desc: "Analyse shopper routing through the store" },
      { icon: MousePointerClick, label: "Product Interaction", desc: "Track which products are picked up or replaced" },
      { icon: AlertCircle, label: "Theft Detection", desc: "Real-time concealment & exit monitoring" },
      { icon: BarChart2, label: "Crowd Management", desc: "Identify bottlenecks and congested zones" },
    ],
  },
];

export function Detections() {
  const [active, setActive] = useState(0);
  const ind = industries[active];

  // Preload all industry images so tab switching is instant
  useEffect(() => {
    industries.forEach(({ image }) => {
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}images/${image}`;
    });
  }, []);

  return (
    <section id="detections" className="py-14 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,_hsl(var(--primary)/0.06),_transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.22em] mb-3">AI Detection Showcase</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Built for Your Industry
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every sector has unique problems. InfoTraff has detections trained specifically for each.
          </p>
        </motion.div>

        {/* Scrollable industry tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:justify-center">
            {industries.map((ind, i) => {
              const Icon = ind.tabIcon;
              const isActive = active === i;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(i)}
                  className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 whitespace-nowrap flex-shrink-0 border"
                  style={isActive ? {
                    background: `${ind.colorRaw}18`,
                    borderColor: `${ind.colorRaw}55`,
                    color: ind.colorRaw,
                    boxShadow: `0 0 16px ${ind.colorRaw}22`,
                  } : {
                    background: "transparent",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {ind.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full ml-0.5" style={{ background: ind.colorRaw }} />
                  )}
                </button>
              );
            })}
          </div>
            {/* Right fade — mobile scroll hint */}
            <div className="absolute right-0 top-0 bottom-1 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
          </div>
        </motion.div>

        {/* Main panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ind.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
          >
            {/* Left: camera feed */}
            <div className="flex flex-col gap-4">
              {/* Camera frame */}
              <div
                className="relative rounded-2xl overflow-hidden border border-border/60 shadow-xl"
                style={{ boxShadow: `0 8px 40px ${ind.colorRaw}14` }}
              >
                {/* LIVE badge */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                  </span>
                  <span className="text-white text-[10px] font-bold tracking-widest">LIVE</span>
                </div>
                {/* Industry badge */}
                <div
                  className="absolute top-3 right-3 z-20 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-widest"
                  style={{ background: `${ind.colorRaw}22`, color: ind.colorRaw, border: `1px solid ${ind.colorRaw}40` }}
                >
                  {ind.badge}
                </div>
                {ind.video ? (
                  <video key={ind.video} autoPlay muted loop playsInline
                    poster={`${import.meta.env.BASE_URL}images/${ind.image}`}
                    className="w-full aspect-video object-cover"
                  >
                    <source src={`${import.meta.env.BASE_URL}images/${ind.video}`} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={`${import.meta.env.BASE_URL}images/${ind.image}`}
                    alt={ind.label}
                    className="w-full aspect-video object-cover"
                    fetchPriority={active === 0 ? "high" : "auto"}
                    loading={active === 0 ? "eager" : "lazy"}
                  />
                )}
                {/* Detection overlays (e.g. F&B table boxes) */}
                {ind.overlays && ind.overlays.map((ov, oi) => (
                  <div
                    key={oi}
                    className="absolute pointer-events-none z-10"
                    style={{ top: ov.top, left: ov.left, width: ov.width, height: ov.height,
                      border: `1.5px solid ${ov.color}`,
                      boxShadow: `0 0 8px ${ov.color}55, inset 0 0 12px ${ov.color}10`,
                      borderRadius: "4px",
                    }}
                  >
                    <span
                      className="absolute top-0 left-0 text-[9px] font-bold px-1.5 py-0.5 leading-none"
                      style={{ background: ov.color, color: "#000", borderRadius: "0 0 4px 0" }}
                    >
                      {ov.label}
                    </span>
                  </div>
                ))}
                {/* Bottom gradient + label */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-4 pt-14" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 50%, transparent 100%)" }}>
                  <p className="text-white text-xs font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{ind.headline}</p>
                </div>
                <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.03) 3px,rgba(0,0,0,0.03) 4px)" }} />
              </div>

              {/* Description sits below the image, aligning with the left column */}
              <p className="text-muted-foreground text-sm leading-relaxed">{ind.description}</p>
            </div>

            {/* Right: capability cards */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                {ind.capabilities.map((cap, i) => {
                  const Icon = cap.icon;
                  return (
                    <motion.div
                      key={cap.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.28 }}
                      className="group relative rounded-xl border border-border/60 bg-card p-4 flex flex-col gap-3 overflow-hidden cursor-default transition-all duration-250 hover:border-opacity-100"
                      style={{ "--hover-color": ind.colorRaw } as React.CSSProperties}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${ind.colorRaw}40`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${ind.colorRaw}14`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = '';
                        (e.currentTarget as HTMLElement).style.boxShadow = '';
                      }}
                    >
                      {/* Top color strip */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                        style={{ background: `linear-gradient(90deg, transparent, ${ind.colorRaw}, transparent)` }}
                      />
                      {/* Icon */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-250 group-hover:scale-105"
                        style={{ background: `${ind.colorRaw}14`, border: `1px solid ${ind.colorRaw}28` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: ind.colorRaw }} />
                      </div>
                      {/* Text */}
                      <div>
                        <p className="text-white text-sm font-bold leading-snug mb-0.5">{cap.label}</p>
                        <p className="text-muted-foreground text-xs leading-snug">{cap.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Dot nav with prev/next arrows */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setActive((active - 1 + industries.length) % industries.length)}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {industries.map((ind, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={active === i
                  ? { width: 28, background: industries[active].colorRaw }
                  : { width: 8, background: "hsl(var(--border))" }
                }
              />
            ))}
          </div>

          <button
            onClick={() => setActive((active + 1) % industries.length)}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
