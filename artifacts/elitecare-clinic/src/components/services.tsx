import { motion } from "framer-motion";
import { Heart, Bone, Stethoscope, Brain, Baby, Smile, Eye, Syringe, Activity, Wind } from "lucide-react";

const services = [
  { icon: Heart, label: "Cardiology", desc: "Expert heart care and cardiovascular treatments", color: "from-rose-500/20 to-rose-600/10 border-rose-500/30", iconColor: "text-rose-400" },
  { icon: Bone, label: "Orthopedics", desc: "Bone, joint and muscle specialist care", color: "from-amber-500/20 to-amber-600/10 border-amber-500/30", iconColor: "text-amber-400" },
  { icon: Stethoscope, label: "General Medicine", desc: "Comprehensive general health consultations", color: "from-sky-500/20 to-sky-600/10 border-sky-500/30", iconColor: "text-sky-400" },
  { icon: Brain, label: "Neurology", desc: "Brain and nervous system specialist", color: "from-purple-500/20 to-purple-600/10 border-purple-500/30", iconColor: "text-purple-400" },
  { icon: Baby, label: "Pediatrics", desc: "Specialized care for infants and children", color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30", iconColor: "text-emerald-400" },
  { icon: Smile, label: "Dental Care", desc: "Complete dental treatments and oral hygiene", color: "from-blue-500/20 to-blue-600/10 border-blue-500/30", iconColor: "text-blue-400" },
  { icon: Eye, label: "Ophthalmology", desc: "Eye care and vision correction specialists", color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30", iconColor: "text-indigo-400" },
  { icon: Syringe, label: "Dermatology", desc: "Skin, hair and nail specialist treatments", color: "from-pink-500/20 to-pink-600/10 border-pink-500/30", iconColor: "text-pink-400" },
  { icon: Activity, label: "Diagnostics", desc: "Advanced lab tests and health screenings", color: "from-teal-500/20 to-teal-600/10 border-teal-500/30", iconColor: "text-teal-400" },
  { icon: Wind, label: "Pulmonology", desc: "Lung and respiratory health specialist", color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30", iconColor: "text-cyan-400" },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">
            Our <span className="text-gradient">Specializations</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            World-class medical expertise across all major disciplines, delivered with compassion and the latest technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group rounded-2xl p-6 bg-gradient-to-br ${service.color} border backdrop-blur-sm transition-all duration-300 hover:shadow-2xl`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-sm md:text-base mb-1">{service.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
