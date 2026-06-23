import { motion } from "framer-motion";
import { useState } from "react";

const cases = [
  { label: "Skin Rejuvenation", treatment: "Dermatology", beforeColor: "from-slate-600 to-slate-800", afterColor: "from-rose-400/60 to-pink-600/60" },
  { label: "Joint Replacement", treatment: "Orthopedics", beforeColor: "from-slate-700 to-gray-900", afterColor: "from-emerald-500/60 to-teal-600/60" },
  { label: "Cardiac Procedure", treatment: "Cardiology", beforeColor: "from-gray-700 to-slate-900", afterColor: "from-sky-500/60 to-blue-700/60" },
];

function BeforeAfterCard({ item }: { item: typeof cases[0] }) {
  const [position, setPosition] = useState(50);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden border border-white/10 shadow-xl"
    >
      <div className="relative h-48 select-none">
        {/* Before */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.beforeColor} flex items-center justify-center`}>
          <span className="text-slate-400 font-semibold text-sm">Before Treatment</span>
        </div>
        {/* After */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.afterColor} flex items-center justify-center overflow-hidden`}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <span className="text-white font-semibold text-sm">After Treatment</span>
        </div>
        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
          style={{ left: `${position}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg z-10 cursor-ew-resize"
          style={{ left: `calc(${position}% - 16px)` }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Drag handler */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>
      <div className="bg-slate-900/80 p-4 border-t border-white/10">
        <p className="font-display font-bold text-white text-sm">{item.label}</p>
        <p className="text-xs text-primary mt-0.5">{item.treatment}</p>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Treatment Results</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">
            Before & <span className="text-gradient">After</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            See the transformative results achieved by our specialist doctors. Drag the slider to compare.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <BeforeAfterCard key={c.label} item={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
