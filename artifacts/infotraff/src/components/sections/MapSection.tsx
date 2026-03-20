import React from "react";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";

export function MapSection() {
  const cities = [
    { name: "Lima", top: "50%", left: "30%", count: 42, severity: "destructive" },
    { name: "Callao", top: "48%", left: "28%", count: 18, severity: "warning" },
    { name: "Arequipa", top: "75%", left: "45%", count: 8, severity: "success" },
    { name: "Trujillo", top: "35%", left: "20%", count: 12, severity: "warning" },
    { name: "Piura", top: "25%", left: "15%", count: 5, severity: "success" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Mapa de <span className="text-gradient">Riesgo</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Visualización interactiva de zonas con mayor concentración de incidentes a nivel nacional.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2">
            <Maximize2 className="w-4 h-4" /> Expandir Mapa
          </Button>
        </div>

        <div className="relative w-full h-[600px] rounded-2xl border border-border overflow-hidden bg-card">
          {/* Stylized Map Background */}
          <img 
            src={`${import.meta.env.BASE_URL}images/map-peru-bg.png`} 
            alt="Map of Peru" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          {/* Map Points */}
          {cities.map((city) => (
            <div 
              key={city.name}
              className="absolute flex flex-col items-center gap-2 group cursor-pointer"
              style={{ top: city.top, left: city.left }}
            >
              {/* Point Label - Shows on hover */}
              <div className="bg-popover border border-border rounded-lg p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:-translate-y-4 absolute bottom-full whitespace-nowrap z-20">
                <p className="text-white font-bold text-sm">{city.name}</p>
                <p className="text-xs text-muted-foreground">{city.count} alertas activas</p>
              </div>

              {/* The Dot */}
              <div className="relative flex items-center justify-center">
                <div className={`absolute w-8 h-8 rounded-full bg-${city.severity}/20 map-point-pulse z-0`} />
                <div className={`w-3 h-3 rounded-full bg-${city.severity} z-10 shadow-[0_0_10px_rgba(var(--${city.severity}),0.8)]`} />
              </div>
            </div>
          ))}

          {/* Floating Legend */}
          <div className="absolute bottom-6 right-6 bg-background/80 backdrop-blur-md border border-border p-4 rounded-xl">
            <h4 className="text-sm font-semibold text-white mb-3">Nivel de Alerta</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive shadow-[0_0_5px_rgba(255,0,0,0.5)]" />
                <span>Alto (&gt;30 incidentes)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning shadow-[0_0_5px_rgba(255,165,0,0.5)]" />
                <span>Medio (10-30 incidentes)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success shadow-[0_0_5px_rgba(0,255,0,0.5)]" />
                <span>Bajo (&lt;10 incidentes)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
