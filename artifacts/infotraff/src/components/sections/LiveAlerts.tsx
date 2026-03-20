import React, { useState } from "react";
import { AlertTriangle, Car, Construction, Info, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type AlertSeverity = 'Alta' | 'Media' | 'Baja';
type AlertType = 'Accidente' | 'Cierre' | 'Desvío' | 'Informativo';

interface TrafficAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  location: string;
  description: string;
  time: string;
}

const mockAlerts: TrafficAlert[] = [
  { id: '1', type: 'Accidente', severity: 'Alta', location: 'Panamericana Sur Km 15', description: 'Choque múltiple bloquea 2 carriles dirección sur.', time: 'Hace 5 min' },
  { id: '2', type: 'Cierre', severity: 'Alta', location: 'Vía Expresa Paseo de la República', description: 'Cierre total por trabajos de mantenimiento altura Av. Aramburú.', time: 'Hace 15 min' },
  { id: '3', type: 'Desvío', severity: 'Media', location: 'Av. Javier Prado c/ Av. Aviación', description: 'Tráfico lento por semáforo inoperativo. Tomar vías alternas.', time: 'Hace 22 min' },
  { id: '4', type: 'Accidente', severity: 'Alta', location: 'Carretera Central Km 22', description: 'Volcadura de camión de carga pesada. Tránsito restringido.', time: 'Hace 35 min' },
  { id: '5', type: 'Informativo', severity: 'Baja', location: 'Circuito de Playas', description: 'Neblina densa en la zona. Reducir velocidad.', time: 'Hace 1 hora' },
  { id: '6', type: 'Desvío', severity: 'Media', location: 'Av. Brasil c/ Av. La Marina', description: 'Congestión vehicular por evento masivo en los alrededores.', time: 'Hace 1.5 horas' },
];

const severityColors = {
  Alta: "destructive",
  Media: "warning",
  Baja: "success"
} as const;

const typeIcons = {
  Accidente: Car,
  Cierre: Construction,
  Desvío: AlertTriangle,
  Informativo: Info
};

export function LiveAlerts() {
  const [filter, setFilter] = useState<string>('Todos');

  const filters = ['Todos', 'Accidente', 'Cierre', 'Desvío'];

  const filteredAlerts = filter === 'Todos' 
    ? mockAlerts 
    : mockAlerts.filter(a => a.type === filter);

  return (
    <section id="incidentes" className="py-24 bg-background relative border-t border-border/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Alertas en <span className="text-gradient">Vivo</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Monitoreo constante de incidentes viales. Información verificada y actualizada al minuto por nuestra comunidad y centros de control.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.map(alert => {
            const Icon = typeIcons[alert.type];
            return (
              <div key={alert.id} className="bg-card rounded-xl border border-border p-6 hover-card-effect group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg bg-${severityColors[alert.severity]}/10 text-${severityColors[alert.severity]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant={severityColors[alert.severity]}>
                    Severidad {alert.severity}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{alert.location}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">{alert.description}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{alert.time}</span>
                  </div>
                  <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Ver Detalles →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredAlerts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
            <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-white font-medium">No hay incidentes de este tipo</p>
            <p className="text-muted-foreground">La vía parece estar despejada por ahora.</p>
          </div>
        )}
      </div>
    </section>
  );
}
