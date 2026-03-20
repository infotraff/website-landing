import React from "react";
import { Calendar, ArrowRight } from "lucide-react";

export function NewsReports() {
  const news = [
    {
      id: 1,
      category: "Infraestructura",
      title: "Inician obras de ampliación en la Costa Verde: Plan de desvíos",
      date: "15 Oct 2023",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop", // traffic construction
      excerpt: "Conoce las rutas alternas establecidas durante los 3 meses que durarán las obras de mejoramiento en el circuito de playas."
    },
    {
      id: 2,
      category: "Seguridad Vial",
      title: "Nuevos límites de velocidad entran en vigencia a nivel nacional",
      date: "12 Oct 2023",
      image: "https://images.unsplash.com/photo-1574516369062-8176f577ebcd?w=800&h=400&fit=crop", // traffic signs
      excerpt: "Multas más severas para quienes excedan los 50 km/h en avenidas principales y 30 km/h en calles y jirones."
    },
    {
      id: 3,
      category: "Tecnología",
      title: "InfoTraff implementa IA para predecir congestiones en feriados",
      date: "08 Oct 2023",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop", // digital tech network
      excerpt: "Nuestro nuevo modelo algorítmico mejora en un 40% la precisión de predicción de tráfico durante horas pico y días festivos."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Noticias y <span className="text-gradient">Reportes</span>
            </h2>
            <p className="text-muted-foreground">Últimas actualizaciones sobre el ecosistema vial y nuestro desarrollo.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
            Ver todas <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="bg-card rounded-2xl border border-border overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="h-48 overflow-hidden relative">
                {/* fallback comments for unsplash images per requirements */}
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                  {item.excerpt}
                </p>
                <button className="text-sm font-semibold text-white flex items-center gap-2 group/btn">
                  Leer artículo 
                  <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
