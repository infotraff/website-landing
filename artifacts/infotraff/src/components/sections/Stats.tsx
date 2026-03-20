import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1800;
        const startTime = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 1,   suffix: "M+", prefix: "",       label: "Events Analyzed Monthly",    sub: "Across all active client deployments" },
  { value: 100, suffix: "K+", prefix: "",       label: "Real-Time Alerts Generated", sub: "Automated, zero human review required" },
  { value: 35,  suffix: "%",  prefix: "",       label: "Retail Conversion Uplift",   sub: "Average across client deployments" },
  { value: 25,  suffix: "%",  prefix: "",       label: "Operational Delay Reduction",sub: "Measured across warehouse & factory sites" },
];

export function Stats() {
  return (
    <section className="py-10 md:py-20 bg-background border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight animate-glow-pulse">
                <Counter end={s.value} suffix={s.suffix} prefix={s.prefix} />
              </p>
              <p className="text-sm font-semibold text-primary mb-1">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
