import React from "react";
import { TrendingUp, ShieldCheck, Zap, ActivitySquare } from "lucide-react";

export function StatsDashboard() {
  const weeklyData = [
    { day: "Lun", value: 45 },
    { day: "Mar", value: 55 },
    { day: "Mié", value: 40 },
    { day: "Jue", value: 65 },
    { day: "Vie", value: 85 },
    { day: "Sáb", value: 90 },
    { day: "Dom", value: 30 },
  ];

  return (
    <section id="estadisticas" className="py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Panel de <span className="text-gradient">Datos</span>
          </h2>
          <p className="text-muted-foreground">Analítica predictiva e histórica del comportamiento del tráfico.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Metrics Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Incidentes este mes</p>
              </div>
              <h3 className="text-3xl font-display font-bold text-white">1,247</h3>
              <p className="text-xs text-destructive mt-2">↑ 8.4% vs mes anterior</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-success/10 text-success">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Rutas Monitoreadas</p>
              </div>
              <h3 className="text-3xl font-display font-bold text-white">89%</h3>
              <p className="text-xs text-success mt-2">Nivel óptimo de cobertura</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Tiempo de Respuesta</p>
              </div>
              <h3 className="text-3xl font-display font-bold text-white">&lt; 3 min</h3>
              <p className="text-xs text-success mt-2">Notificación a autoridades</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-warning/10 text-warning">
                  <ActivitySquare className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Monitoreo Activo</p>
              </div>
              <h3 className="text-3xl font-display font-bold text-white">24/7</h3>
              <p className="text-xs text-muted-foreground mt-2">Sistemas IA operando</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-background border border-border rounded-xl p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6">Tendencia Semanal</h3>
            
            <div className="flex-grow flex items-end gap-3 justify-between mt-auto">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-3 w-full group">
                  <div className="w-full relative bg-secondary rounded-t-sm h-40 flex items-end overflow-hidden">
                    <div 
                      className="w-full bg-gradient-to-t from-primary/40 to-primary/80 rounded-t-sm transition-all duration-500 ease-out group-hover:from-accent/50 group-hover:to-accent relative"
                      style={{ height: `${d.value}%` }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-white/40" />
                      
                      {/* Tooltip on hover */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {d.value} incid.
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
