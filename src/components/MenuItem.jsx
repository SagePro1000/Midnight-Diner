import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Star, X } from "lucide-react";

// Rich gradient and decorative config for items without photos
const fallbackConfig = {
  8: {
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #2d1215 30%, #1a0f0a 60%, #0d0a0a 100%)",
    kanji: "味",
    emoji: "🍜",
    accentColor: "rgba(180, 80, 60, 0.15)",
  },
  9: {
    gradient: "linear-gradient(135deg, #0a1a0d 0%, #0d1f12 30%, #0a1a10 60%, #0a0d0a 100%)",
    kanji: "抹",
    emoji: "🍵",
    accentColor: "rgba(80, 160, 80, 0.12)",
  },
  10: {
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #12102d 30%, #1a0f1f 60%, #0a0a0d 100%)",
    kanji: "酒",
    emoji: "🍶",
    accentColor: "rgba(120, 100, 180, 0.12)",
  },
};

export default function MenuItem({ item, index }) {
  const [showBackstory, setShowBackstory] = useState(false);
  const config = fallbackConfig[item.id];

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group relative bg-midnight-card rounded-2xl overflow-hidden border border-white/5 card-hover"
      >
        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover img-zoom"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{ background: config?.gradient || "linear-gradient(135deg, #1a1a1a, #0d0d0d)" }}
            >
              {/* Decorative kanji watermark */}
              <span
                className="absolute text-[120px] font-serif font-bold select-none pointer-events-none"
                style={{ color: config?.accentColor || "rgba(255,255,255,0.04)" }}
              >
                {config?.kanji || "膳"}
              </span>
              {/* Centered emoji */}
              <span className="text-7xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                {config?.emoji || "🍽️"}
              </span>
              {/* Subtle radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${config?.accentColor || "rgba(212,160,83,0.06)"} 0%, transparent 70%)`,
                }}
              />
            </div>
          )}

          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-card via-transparent to-transparent" />

          {/* Special badge */}
          {item.isSpecial && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-warm/20 backdrop-blur-md border border-amber-warm/30 text-amber-glow text-xs font-medium">
              <Star size={12} fill="currentColor" />
              <span>Master's Pick</span>
            </div>
          )}

          {/* Price badge */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-cream text-sm font-semibold">
            ${item.price}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="font-serif text-xl font-semibold text-cream leading-tight">
                {item.name}
              </h3>
              <p className="text-amber-warm/60 text-sm mt-0.5 font-light">
                {item.nameJp}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-cream-muted/80 text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-white/5 text-smoke text-xs border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Backstory button */}
          <button
            onClick={() => setShowBackstory(true)}
            className="group/btn flex items-center gap-2 text-sm text-amber-warm/70 hover:text-amber-glow transition-colors cursor-pointer"
          >
            <BookOpen
              size={14}
              className="group-hover/btn:text-amber-warm transition-colors"
            />
            <span className="border-b border-dashed border-amber-warm/30 group-hover/btn:border-amber-warm/60 transition-colors">
              Read the Backstory
            </span>
          </button>
        </div>
      </motion.article>

      {/* Backstory Modal */}
      <AnimatePresence>
        {showBackstory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowBackstory(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-md w-full bg-midnight-lighter rounded-2xl border border-amber-warm/20 p-8 amber-glow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowBackstory(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-smoke hover:text-cream transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Content */}
              <div className="text-center">
                <p className="text-amber-warm/50 text-xs tracking-[0.2em] uppercase mb-3">
                  The Story Behind
                </p>
                <h4 className="font-serif text-2xl font-semibold text-cream mb-1">
                  {item.name}
                </h4>
                <p className="text-amber-warm/60 text-sm mb-6">{item.nameJp}</p>

                <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-warm/40 to-transparent mx-auto mb-6" />

                <p className="text-cream-muted leading-relaxed text-base italic font-serif">
                  "{item.backstory}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
