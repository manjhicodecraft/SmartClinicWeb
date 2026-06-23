import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Plus } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <section id="contact" className="py-24 bg-slate-950 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-2">
              Contact <span className="text-gradient">EliteCare</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {[
                { icon: MapPin, label: "Address", value: "123 Medical Center Road, BKC, Mumbai, Maharashtra 400051" },
                { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                { icon: Mail, label: "Email", value: "care@elitecare.in" },
                { icon: Clock, label: "Hours", value: "Mon–Sat: 9 AM–7 PM  |  Emergency: 24×7" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</p>
                    <p className="text-white font-medium mt-0.5">{value}</p>
                  </div>
                </div>
              ))}

              <div className="glass-card rounded-2xl p-6 mt-8">
                <h3 className="text-white font-display font-bold mb-3">Emergency Helpline</h3>
                <p className="text-slate-400 text-sm mb-4">Available 24 hours a day, 7 days a week for all medical emergencies.</p>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-lg font-bold text-destructive hover:text-red-400 transition-colors"
                >
                  <Phone className="w-5 h-5 animate-pulse" />
                  +91 98765 43210
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-4">
                <h3 className="text-white font-display font-bold text-xl mb-6">Send Us a Message</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1.5 block">Your Name</label>
                    <Input required placeholder="John Doe" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1.5 block">Email</label>
                    <Input type="email" required placeholder="john@email.com" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1.5 block">Subject</label>
                  <Input placeholder="How can we help?" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1.5 block">Message</label>
                  <Textarea required placeholder="Your message..." className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold">
                  {submitted ? "Message Sent!" : "Send Message"}
                </Button>
                {submitted && (
                  <p className="text-emerald-400 text-center text-sm">Thank you! We will get back to you within 24 hours.</p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <Plus className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-white font-display font-bold text-lg">EliteCare Clinic</span>
            </div>
            <p className="text-slate-500 text-sm">
              Advanced Healthcare with Compassion and Innovation
            </p>
            <p className="text-slate-600 text-xs">© 2024 EliteCare Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
