import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChefHat, Check, Sparkles, History } from "lucide-react";

export default function RequestDish({ onOpenOrders }) {
  const [dishName, setDishName] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    setIsAnimating(true);
    // Simulate a small delay for the "sending" animation
    setTimeout(() => {
      // Load current requests, append new, save
      let pastRequests = [];
      try {
        const saved = localStorage.getItem("midnight_diner_requests");
        if (saved) pastRequests = JSON.parse(saved);
      } catch (err) {}

      const newReq = {
        id: Date.now().toString(),
        dishName: dishName.trim(),
        details: details.trim(),
        timestamp: new Date().toISOString(),
      };
      
      const updated = [newReq, ...pastRequests];
      localStorage.setItem("midnight_diner_requests", JSON.stringify(updated));

      setIsSubmitted(true);
      setIsAnimating(false);
    }, 1200);
  };

  const handleReset = () => {
    setDishName("");
    setDetails("");
    setIsSubmitted(false);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 mb-20 lg:mb-32">
      <div className="divider-ornament text-sm tracking-[0.2em] uppercase text-smoke mb-10">
        <span>Request a Dish</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto"
      >
        {/* Ambient glow behind card */}
        <div className="absolute -inset-4 bg-amber-warm/5 rounded-3xl blur-2xl pointer-events-none" />

        <div className="relative bg-midnight-card rounded-2xl border border-white/10 overflow-hidden h-full">
          {/* Top accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-warm/30 to-transparent absolute top-0 left-0" />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-warm/10 border border-amber-warm/20 mb-4">
                <ChefHat size={24} className="text-amber-warm" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-cream mb-2">
                Ask the Master
              </h2>
              <p className="text-cream-muted text-sm max-w-md mx-auto leading-relaxed">
                Can't find what you're craving? Tell the Master what you'd like.
                If he has the ingredients, he'll make it happen.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Dish name input */}
                  <div>
                    <label
                      htmlFor="dish-name"
                      className="block text-sm font-medium text-cream-muted mb-2"
                    >
                      What dish are you craving?
                    </label>
                    <input
                      id="dish-name"
                      type="text"
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                      placeholder="e.g. Grandma's potato croquettes"
                      className="w-full px-4 py-3 rounded-xl bg-midnight-lighter border border-white/10 text-cream placeholder-smoke/50 text-sm focus:outline-none focus:border-amber-warm/40 focus:ring-1 focus:ring-amber-warm/20 transition-all"
                      required
                    />
                  </div>

                  {/* Details textarea */}
                  <div>
                    <label
                      htmlFor="dish-details"
                      className="block text-sm font-medium text-cream-muted mb-2"
                    >
                      Any special requests?{" "}
                      <span className="text-smoke">(optional)</span>
                    </label>
                    <textarea
                      id="dish-details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Allergies, spice level, or a memory you want it to taste like..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-midnight-lighter border border-white/10 text-cream placeholder-smoke/50 text-sm focus:outline-none focus:border-amber-warm/40 focus:ring-1 focus:ring-amber-warm/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isAnimating || !dishName.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold
                      transition-all duration-300 cursor-pointer
                      ${
                        isAnimating
                          ? "bg-amber-warm/30 text-amber-glow"
                          : "bg-amber-warm/20 border border-amber-warm/30 text-amber-glow hover:bg-amber-warm/30 hover:border-amber-warm/50"
                      }
                      disabled:opacity-40 disabled:cursor-not-allowed
                    `}
                  >
                    {isAnimating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <Sparkles size={16} />
                        </motion.div>
                        <span>Sending to the Master...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Request</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-6 h-full flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-5"
                  >
                    <Check size={28} className="text-emerald-400" />
                  </motion.div>

                  <h3 className="font-serif text-xl font-semibold text-cream mb-2">
                    The Master nods quietly.
                  </h3>
                  <p className="text-cream-muted text-sm mb-8 max-w-sm">
                    He's already reaching for the ingredients. Your{" "}
                    <span className="text-amber-warm font-medium">
                      {dishName}
                    </span>{" "}
                    will be ready soon.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                    <button
                      onClick={onOpenOrders}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-cream-muted hover:text-amber-glow hover:border-amber-warm/30 transition-all cursor-pointer"
                    >
                      <History size={16} />
                      <span className="text-sm font-medium">View My Orders</span>
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="text-sm text-smoke hover:text-cream-muted border-b border-dashed border-smoke/30 hover:border-cream-muted/50 transition-colors cursor-pointer"
                    >
                      Request another dish
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
