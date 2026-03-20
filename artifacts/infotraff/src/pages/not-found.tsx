import React from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-destructive/20 shadow-[0_0_30px_rgba(255,0,0,0.1)]">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-6xl font-display font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Página no encontrada</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto mb-8">
          La ruta que intentas acceder no existe o ha sido movida. Verifica la URL o regresa al inicio.
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
