import { motion } from "framer-motion";
import { Flame, Moon, Star, UtensilsCrossed } from "lucide-react";

const categories = [
  { id: "all", label: "All Dishes", labelJp: "全品", icon: UtensilsCrossed },
  { id: "comfort", label: "Comfort Food", labelJp: "癒しの料理", icon: Flame },
  { id: "latenight", label: "Late Night Snacks", labelJp: "夜食", icon: Moon },
  { id: "specials", label: "Master's Specials", labelJp: "店主のおすすめ", icon: Star },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-12">
      {/* Section label */}
      <div className="divider-ornament text-sm tracking-[0.2em] uppercase text-smoke mb-8">
        <span>Filter by Vibe</span>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`
                relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium
                transition-colors duration-300 cursor-pointer border
                ${
                  isActive
                    ? "bg-amber-warm/15 border-amber-warm/40 text-amber-glow amber-glow"
                    : "bg-white/5 border-white/10 text-cream-muted hover:border-white/20 hover:bg-white/8 hover:text-cream"
                }
              `}
            >
              <Icon size={16} className={isActive ? "text-amber-warm" : ""} />
              <span>{cat.label}</span>
              <span className="text-xs opacity-50 hidden sm:inline">
                {cat.labelJp}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-xl border border-amber-warm/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
