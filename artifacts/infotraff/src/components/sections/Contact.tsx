import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, CalendarCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      toast({
        title: "Request received!",
        description: "Our team will reach out within 24 hours to schedule your demo.",
      });
      setForm({ name: "", company: "", email: "", phone: "", industry: "", message: "" });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at info@infotraff.org",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Ready to Start?</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Book Your Free{" "}
              <span className="text-gradient">Live Demo</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              See InfoTraff in action on a live feed. Our team will walk you through the platform customized for your industry and operational needs.
            </p>

            <div className="space-y-6">
              {[
                { icon: CalendarCheck, title: "30-Min Demo Call", desc: "We'll show you exactly what insights you'd get from your existing cameras." },
                { icon: Building2, title: "Enterprise & Government", desc: "Reach out for API access, bulk deployments, or institutional integrations." },
                { icon: Mail, title: "Email Us", desc: "info@infotraff.org" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{title}</h4>
                    <p className="text-muted-foreground text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Request a Demo</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Full Name</label>
                  <Input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Company / Organization</label>
                  <Input
                    required
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Carrefour, Mall of Arabia..."
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Work Email</label>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+20 10 0000 0000"
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Industry / Use Case</label>
                <Input
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder="e.g. Retail, Manufacturing, Hospitality..."
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Tell Us About Your Needs</label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How many cameras? What challenges are you looking to solve?"
                  className="min-h-[100px] bg-secondary/50 border-border"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Book My Demo →"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">No commitment required. We'll respond within 24 hours.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
