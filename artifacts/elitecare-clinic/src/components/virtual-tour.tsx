import { motion } from "framer-motion";

const areas = [
  {
    label: "Reception & Lobby",
    desc: "Welcoming space with modern design, comfortable seating, and friendly staff ready to assist you.",
    gradient: "from-sky-600/40 via-blue-700/30 to-slate-900",
    icon: "🏥",
  },
  {
    label: "Consultation Rooms",
    desc: "State-of-the-art consultation rooms equipped with the latest diagnostic tools and technology.",
    gradient: "from-emerald-600/40 via-teal-700/30 to-slate-900",
    icon: "🩺",
  },
  {
    label: "Diagnostic Laboratory",
    desc: "Advanced laboratory with automated analyzers delivering accurate results in record time.",
    gradient: "from-purple-600/40 via-violet-700/30 to-slate-900",
    icon: "🔬",
  },
  {
    label: "Patient Waiting Area",
    desc: "Calm, comfortable waiting areas with entertainment, refreshments, and calming ambiance.",
    gradient: "from-amber-600/40 via-orange-700/30 to-slate-900",
    icon: "☕",
  },
];

export function VirtualTour() {
  return (
    <section className="py-24 bg-slate-950 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Explore With Us</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-2">
            Virtual <span className="text-gradient">Clinic Tour</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Experience our world-class facilities before you visit us. Our clinic is designed with your comfort and well-being in mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${area.gradient} transition-transform duration-500 group-hover:scale-110`} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">{area.icon}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-display font-bold text-lg mb-2">{area.label}</h3>
                <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">{area.desc}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-2xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
