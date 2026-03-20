import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background } from "@/components/layout/Background";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { MeetInfoTraff } from "@/components/sections/MeetInfoTraff";
import { Stats } from "@/components/sections/Stats";
import { ShopTalk } from "@/components/sections/ShopTalk";
import { Detections } from "@/components/sections/Detections";
import { AiSearch } from "@/components/sections/AiSearch";
import { Projects } from "@/components/sections/Projects";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setWidth(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative z-0">
      <ScrollProgress />
      <div className="scan-line" />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <MeetInfoTraff />
        <TrustStrip />
        <Detections />
        <Stats />
        <ShopTalk />
        <AiSearch />
        <Projects />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
