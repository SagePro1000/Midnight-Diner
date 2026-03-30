import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[250] flex items-center gap-3 px-5 py-3 rounded-full bg-midnight-card/95 border border-emerald-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl min-w-max"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 size={16} />
          </div>
          <span className="text-sm font-medium text-cream tracking-wide">{message}</span>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button 
            onClick={onClose} 
            className="text-smoke hover:text-amber-glow transition-colors ml-1 p-1"
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
