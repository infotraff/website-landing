import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const features = [
  "Distinguish between visitor & employee footfall",
  "Divide personnel strategically based on customer flow",
  "Receive alerts when wait times exceed thresholds",
  "Reduce missed opportunities & ensure satisfaction",
  "Integrates with POS and ERP systems",
  "AI chat interface for on-demand facility insights",
];

const hourlyData = [
  { h: "9am", v: 28 },
  { h: "10am", v: 54 },
  { h: "11am", v: 79 },
  { h: "12pm", v: 95 },
  { h: "1pm", v: 87 },
  { h: "2pm", v: 62 },
  { h: "3pm", v: 70 },
  { h: "4pm", v: 110 },
  { h: "5pm", v: 130 },
  { h: "6pm", v: 98 },
];

const zones = [
  { name: "Entrance", heat: 92, color: "#ef4444" },
  { name: "Aisle A", heat: 67, color: "#f97316" },
  { name: "Aisle B", heat: 45, color: "#eab308" },
  { name: "Checkout", heat: 88, color: "#ef4444" },
  { name: "Café", heat: 55, color: "#f97316" },
  { name: "Storage", heat: 12, color: "#22c55e" },
  { name: "Aisle C", heat: 38, color: "#22c55e" },
  { name: "Exit", heat: 71, color: "#f97316" },
  { name: "Fitting", heat: 29, color: "#22c55e" },
];

function heatColor(v: number) {
  if (v >= 80) return { bg: "rgba(239,68,68,0.22)", border: "rgba(239,68,68,0.55)", text: "#ef4444" };
  if (v >= 55) return { bg: "rgba(249,115,22,0.18)", border: "rgba(249,115,22,0.45)", text: "#f97316" };
  if (v >= 35) return { bg: "rgba(234,179,8,0.15)", border: "rgba(234,179,8,0.4)", text: "#eab308" };
  return { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.35)", text: "#22c55e" };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#0d1221] border border-white/10 rounded-lg px-3 py-2 text-xs">
        <p className="text-white/50 mb-0.5">{label}</p>
        <p className="text-primary font-bold">{payload[0].value} visitors</p>
      </div>
    );
  }
  return null;
};

export function ShopTalk() {
  return (
    <section id="shoptalk" className="py-12 md:py-24 bg-card border-y border-border relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Flagship Product</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Meet <span className="text-gradient">ShopTalk</span> -<br />Your AI Facility Assistant
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Unlock the full magic of your CCTV infrastructure. ShopTalk provides real-time dashboards and alerts customized for each client, with AI you can actually talk to.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a href="#contact">
              <Button size="lg" className="gap-2 group">
                Try ShopTalk Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>

          {/* Dashboard visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
              className="relative z-10 bg-[#070b14] rounded-3xl border border-white/[0.08] p-5 shadow-2xl shadow-primary/10 animate-float"
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-3 text-[11px] text-white/30 font-mono">ShopTalk · Live Dashboard</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  </span>
                  <span className="text-[10px] text-green-400 font-bold">LIVE</span>
                </div>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {[
                  { label: "Visitors", value: "247", delta: "+12%", up: true },
                  { label: "Dwell", value: "8.4m", delta: "+2m", up: true },
                  { label: "Queue", value: "2.1m", delta: "-0.5m", up: false },
                ].map((k) => (
                  <div key={k.label} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3">
                    <p className="text-[10px] text-white/40 mb-1">{k.label}</p>
                    <p className="text-lg font-extrabold text-white leading-none">{k.value}</p>
                    <p className={`text-[10px] font-semibold mt-1 ${k.up ? "text-green-400" : "text-red-400"}`}>
                      {k.delta} vs yesterday
                    </p>
                  </div>
                ))}
              </div>

              {/* Bar chart, hourly footfall */}
              <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3 mb-3">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Hourly Footfall</p>
                <ResponsiveContainer width="100%" height={90}>
                  <BarChart data={hourlyData} barCategoryGap="30%">
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                      dataKey="h"
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                    <Bar dataKey="v" fill="hsl(122 76% 42%)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Heatmap grid, zone activity */}
              <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3 mb-3">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Zone Heatmap</p>
                  <div className="flex items-center gap-1.5 text-[9px] text-white/30">
                    <span className="w-2 h-2 rounded-sm bg-green-500/40 inline-block" />Low
                    <span className="w-2 h-2 rounded-sm bg-yellow-500/40 inline-block ml-1" />Med
                    <span className="w-2 h-2 rounded-sm bg-red-500/40 inline-block ml-1" />High
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {zones.map((z) => {
                    const c = heatColor(z.heat);
                    return (
                      <div
                        key={z.name}
                        className="rounded-lg px-2 py-1.5 flex items-center justify-between"
                        style={{ background: c.bg, border: `1px solid ${c.border}` }}
                      >
                        <span className="text-[9px] text-white/60 truncate">{z.name}</span>
                        <span className="text-[9px] font-bold ml-1 flex-shrink-0" style={{ color: c.text }}>{z.heat}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI chat bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                className="bg-primary/15 border border-primary/25 rounded-2xl p-3.5 flex gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
                  <Smartphone className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-primary font-bold mb-0.5">ShopTalk AI</p>
                  <p className="text-[11px] text-white/70">Entrance & Checkout are at peak load. Open lane 4 and redirect promoter to Zone B. 🛒</p>
                </div>
              </motion.div>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
