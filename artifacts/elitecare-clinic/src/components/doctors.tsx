import { motion } from "framer-motion";
import { useListDoctors } from "@workspace/api-client-react";
import { Star, Clock, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function DoctorAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = [
    "from-sky-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-purple-500 to-violet-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-indigo-500 to-blue-600",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
      {initials}
    </div>
  );
}

export function Doctors({ onBookClick }: { onBookClick: () => void }) {
  const { data: doctors, isLoading } = useListDoctors();

  return (
    <section id="doctors" className="py-24 bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Specialists</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">
            Meet Our <span className="text-gradient">Expert Doctors</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Our team of board-certified specialists brings decades of expertise and genuine compassion to every consultation.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="w-20 h-20 rounded-2xl bg-muted mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(doctors ?? []).map((doctor, i) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl hover:border-primary/30"
              >
                <div className="flex items-start gap-4">
                  <DoctorAvatar name={doctor.name} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-foreground truncate">{doctor.name}</h3>
                    <p className="text-primary text-sm font-medium">{doctor.specialty}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{doctor.qualification}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                    <span className="font-semibold">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span>{(doctor.patientsCount ?? 0).toLocaleString()}+</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{doctor.experience}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    className={
                      doctor.availabilityStatus === "available"
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                        : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/30"
                    }
                    variant="outline"
                  >
                    <span
                      className={`mr-1.5 inline-block w-1.5 h-1.5 rounded-full ${
                        doctor.availabilityStatus === "available"
                          ? "bg-emerald-500 animate-pulse"
                          : "bg-amber-500"
                      }`}
                    />
                    {doctor.availabilityStatus === "available"
                      ? "Available Now"
                      : `Next: ${doctor.nextAvailableTime ?? "Today"}`}
                  </Badge>
                </div>

                <Button
                  className="w-full rounded-xl gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 transition-all"
                  variant="outline"
                  onClick={onBookClick}
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
