import React from "react";
import { 
  Radio, 
  MessageSquareWarning, 
  Map, 
  BellRing, 
  BarChart4, 
  Smartphone 
} from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Radio,
      title: "Monitoreo en Tiempo Real",
      description: "Seguimiento 24/7 del flujo vehicular en las principales arterias de la ciudad usando cámaras y sensores IoT."
    },
    {
      icon: MessageSquareWarning,
      title: "Reporte Ciudadano",
      description: "Plataforma participativa donde usuarios reportan accidentes, huecos o fallas en semáforos instantáneamente."
    },
    {
      icon: Map,
      title: "Planificación de Rutas",
      description: "Algoritmos inteligentes que sugieren vías alternas basadas en las condiciones actuales del tráfico."
    },
    {
      icon: BellRing,
      title: "Alertas de Emergencia",
      description: "Notificaciones push inmediatas sobre accidentes graves o cierres viales inesperados en tu zona."
    },
    {
      icon: BarChart4,
      title: "Analítica de Tráfico",
      description: "Reportes estadísticos para instituciones y empresas de logística para optimización de tiempos."
    },
    {
      icon: Smartphone,
      title: "App Móvil Integrada",
      description: "Toda la potencia de InfoTraff en tu bolsillo, con modo conducción segura y comandos de voz."
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-card border-y border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Nuestros <span className="text-gradient">Servicios</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Soluciones integrales para la gestión inteligente del tráfico, diseñadas tanto para ciudadanos como para autoridades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div 
                key={i} 
                className="bg-background border border-border p-8 rounded-2xl hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                
                <div className="w-14 h-14 bg-card border border-border rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/30 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
