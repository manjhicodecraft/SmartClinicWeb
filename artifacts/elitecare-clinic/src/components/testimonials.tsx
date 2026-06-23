import { motion } from "framer-motion";
import { useListTestimonials } from "@workspace/api-client-react";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Testimonials() {
  const { data: testimonials, isLoading } = useListTestimonials();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = testimonials ?? [];

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.max(items.length, 1));
    }, 4000);
  };

  useEffect(() => {
    if (items.length > 0) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [items.length]);

  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Patient Stories</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">
            What Our <span className="text-gradient">Patients Say</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse h-48" />
            ))}
          </div>
        ) : (
          <>
            {/* Desktop: grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-all duration-300"
                >
                  <Quote className="w-8 h-8 text-primary/50" />
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{t.review}"</p>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                      {t.patientName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.patientName}</div>
                      <div className="text-xs text-muted-foreground">{t.treatment}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile: carousel */}
            <div
              className="md:hidden"
              onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
              onMouseLeave={startTimer}
            >
              {items[current] && (
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-4"
                >
                  <Quote className="w-8 h-8 text-primary/50" />
                  <p className="text-muted-foreground text-sm leading-relaxed">"{items[current].review}"</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: items[current].rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="font-semibold text-sm">{items[current].patientName}</div>
                  <div className="text-xs text-muted-foreground">{items[current].treatment}</div>
                </motion.div>
              )}
              <div className="flex justify-center gap-2 mt-6">
                {items.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-white/20"}`} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
