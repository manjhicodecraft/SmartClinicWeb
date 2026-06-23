import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Star, Building, Users } from "lucide-react";

export function Hero({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/30 text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-semibold tracking-wide uppercase">Accepting New Patients</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 text-foreground">
            Advanced Healthcare with <span className="text-gradient">Compassion</span> and Innovation
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Experience world-class medical care at EliteCare Clinic. Our cutting-edge facilities and expert specialists ensure you receive the precise treatment you deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="rounded-full text-base h-14 px-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={onBookClick}
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-base h-14 px-8 gap-2"
              onClick={() => (window.location.href = "tel:+919999999999")}
            >
              <Phone className="w-5 h-5 text-destructive" />
              Emergency 24x7
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[600px] hidden lg:block"
        >
          {/* Floating stat cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-20 right-10 glass p-4 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-accent fill-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">4.9</div>
              <div className="text-sm text-muted-foreground">Patient Rating</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute bottom-40 left-0 glass p-4 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute bottom-20 right-20 glass p-4 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">20k+</div>
              <div className="text-sm text-muted-foreground">Patients Treated</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
