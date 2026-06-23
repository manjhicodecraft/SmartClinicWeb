import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGetClinicStats, type ClinicStats } from "@workspace/api-client-react";
import { Users, Award, TrendingUp, Clock } from "lucide-react";
import { fallbackClinicStats } from "@/lib/mock-data";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const statsConfig: Array<{
  icon: typeof Users;
  label: string;
  key: keyof Pick<ClinicStats, "happyPatients" | "yearsExperience" | "successRate"> | null;
  suffix: string;
  fallback: number | null;
  color: string;
}> = [
  { icon: Users, label: "Happy Patients", key: "happyPatients", suffix: "+", fallback: 20000, color: "text-primary" },
  { icon: Award, label: "Years Experience", key: "yearsExperience", suffix: "+", fallback: 15, color: "text-accent" },
  { icon: TrendingUp, label: "Success Rate", key: "successRate", suffix: "%", fallback: 98, color: "text-emerald-500 dark:text-emerald-400" },
  { icon: Clock, label: "Emergency Support", key: null, suffix: "", fallback: null, color: "text-rose-500 dark:text-rose-400" },
];

export function Stats() {
  const { data: stats } = useGetClinicStats();
  const clinicStats = stats && typeof stats === "object" ? stats : fallbackClinicStats;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent pointer-events-none" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Achievements</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">
            Numbers That <span className="text-gradient">Define Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((stat, i) => {
            const Icon = stat.icon;
            const value = stat.key ? clinicStats[stat.key] : stat.fallback;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-4">
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className={`text-4xl md:text-5xl font-display font-bold ${stat.color} mb-2`}>
                  {stat.key === null ? (
                    <span>24<span className="text-2xl">×7</span></span>
                  ) : value !== null ? (
                    <AnimatedCounter target={value as number} suffix={stat.suffix} />
                  ) : "--"}
                </div>
                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
