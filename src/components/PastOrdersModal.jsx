import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Trash2, ScrollText } from "lucide-react";

export default function PastOrdersModal({ isOpen, onClose }) {
  const [pastRequests, setPastRequests] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("midnight_diner_requests");
      if (saved) {
        try {
          setPastRequests(JSON.parse(saved));
        } catch (e) {
          console.error("Could not load past requests", e);
        }
      } else {
        setPastRequests([]);
      }
    }
  }, [isOpen]);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your past requests?")) {
      setPastRequests([]);
      localStorage.removeItem("midnight_diner_requests");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[210] w-full max-w-lg p-6"
          >
            <div className="relative bg-midnight border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Top accent line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-warm/30 to-transparent absolute top-0 left-0" />
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                <h3 className="font-serif text-xl text-cream flex items-center gap-2">
                  <ScrollText size={20} className="text-amber-warm" />
                  My Past Orders
                </h3>
                <button
                  onClick={onClose}
                  className="text-smoke hover:text-amber-warm transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {pastRequests.length === 0 ? (
                  <div className="text-center py-10">
                    <Clock size={48} className="mx-auto text-smoke/30 mb-4" />
                    <p className="text-cream-muted text-sm">
                      You haven't requested any dishes yet.
                    </p>
                    <p className="text-smoke text-xs mt-2 italic">
                      "Ask the Master for something special."
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-end mb-2">
                       <button
                        onClick={handleClearHistory}
                        className="text-xs text-smoke hover:text-rose-400 flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 size={14} />
                        <span>Clear History</span>
                      </button>
                    </div>
                    {pastRequests.map((req) => (
                      <motion.div
                        key={req.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-midnight-card border border-white/5 relative group"
                      >
                        <div className="flex justify-between items-start gap-3 mb-1">
                          <h4 className="font-medium text-cream text-lg">
                            {req.dishName}
                          </h4>
                          <span className="text-[10px] text-smoke whitespace-nowrap pt-1 uppercase tracking-widest">
                            {new Date(req.timestamp).toLocaleDateString([], {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        {req.details && (
                          <p className="text-sm text-cream-muted/70 italic leading-relaxed mt-2">
                            "{req.details}"
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
