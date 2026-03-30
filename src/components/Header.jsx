import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden pt-32 pb-16">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-warm/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Japanese intro text */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-smoke text-sm tracking-[0.3em] uppercase mb-6 font-light"
        >
          深夜食堂 — Open from Midnight
        </motion.p>

        {/* Main logo / title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-6xl md:text-8xl font-bold text-cream mb-4 text-glow tracking-tight"
        >
          Midnight
          <span className="block text-amber-warm">Diner</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif italic text-cream-muted text-lg md:text-xl max-w-md mx-auto mb-8"
        >
          "If you can find us, you belong here."
        </motion.p>

        {/* Ornamental divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-amber-warm to-transparent mx-auto mb-8"
        />

        {/* Info pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-cream-muted">
            <Clock size={14} className="text-amber-warm" />
            <span>12:00 AM — 5:00 AM</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-cream-muted">
            <MapPin size={14} className="text-amber-warm" />
            <span>Shinjuku, Third Alley</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
