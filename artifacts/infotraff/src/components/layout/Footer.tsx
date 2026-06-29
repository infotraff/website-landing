import React from "react";
import { Linkedin, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <img
              src={`${import.meta.env.BASE_URL}images/logo-trimmed.png`}
              alt="InfoTraff"
              className="h-9 w-auto"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Unique detections for unique problems. Real-time AI-powered insights from your existing CCTV infrastructure.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://www.instagram.com/infotraff?igsh=Nzh0aTJzaGhuNDdv" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/InfoTraff.org" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/infotraff/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5">Platform</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "AI Detections", href: "#detections" },
                { label: "ShopTalk AI", href: "#shoptalk" },
                { label: "Solutions", href: "#detections" },
                { label: "FAQ", href: "#faq" },
              ].map(item => (
                <li key={item.label}><a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Past Projects", href: "#projects" },
                { label: "Contact Us", href: "#contact" },
              ].map(item => (
                <li key={item.label}><a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>MENA Region</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Canada</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Tarragona, Spain</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@infotraff.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex justify-center items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InfoTraff. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
