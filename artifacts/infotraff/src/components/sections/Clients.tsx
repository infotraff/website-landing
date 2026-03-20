import React from "react";

const logos = [
  { src: "client-electrolux.png",  alt: "Electrolux Group" },
  { src: "client-elaraby.png",     alt: "ElAraby" },
  { src: "client-arafa.png",       alt: "Arafa Group" },
  { src: "client-mensclub.png",    alt: "Men's Club" },
  { src: "client-tiehouse.png",    alt: "Tie House" },
  { src: "client-concrete.png",    alt: "Concrete" },
  { src: "client-2s.png",          alt: "2S Homewear" },
  { src: "client-carina.png",      alt: "Carina" },
  { src: "client-tbs.png",         alt: "TBS Holding" },
  { src: "client-barkotel.png",    alt: "BarkoTel" },
];

export function Clients() {
  const all = [...logos, ...logos];

  return (
    <section className="py-6 border-y border-border/40 bg-card/30 overflow-hidden">
      <p className="text-center text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-[0.22em] mb-5">
        Trusted by leading organisations worldwide
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-card/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-card/30 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee">
          {all.map((logo, i) => (
            <div
              key={i}
              className="mx-8 shrink-0 flex items-center justify-center"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/${logo.src}`}
                alt={logo.alt}
                style={{
                  height: 38,
                  width: "auto",
                  maxWidth: 155,
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.55,
                }}
                onError={e => {
                  const parent = e.currentTarget.parentElement;
                  if (parent) parent.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
