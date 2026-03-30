import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Menu", href: "#menu" },
    { label: "Ask the Master", href: "#request" },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Small offset for the fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? "bg-midnight/90 backdrop-blur-md border-b border-white/5 py-3 shadow-lg" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div 
            className="flex flex-col cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="font-serif text-xl md:text-2xl font-bold text-cream tracking-tight group-hover:text-amber-warm transition-colors">
              Midnight <span className="text-amber-warm italic font-light">Diner</span>
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-smoke ml-0.5 group-hover:text-amber-warm/70 transition-colors">
              深夜食堂
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-smoke hover:text-amber-glow transition-colors relative group"
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-warm transition-all group-hover:w-full" />
              </a>
            ))}
            
            {/* Small subtle CTA button if needed, but keeping it minimal matches vibe better */}
            <a 
              href="#request"
              onClick={(e) => handleSmoothScroll(e, "#request")}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-glow border border-amber-warm/30 rounded-full hover:bg-amber-warm/10 transition-colors cursor-pointer"
            >
              Order Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-cream-muted hover:text-amber-warm focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-midnight/98 backdrop-blur-xl flex flex-col pt-24 px-8"
          >
            <button 
              className="absolute top-6 right-6 text-cream-muted hover:text-amber-warm focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-10 text-center mt-16">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  className="font-serif text-3xl text-cream hover:text-amber-glow transition-colors"
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-auto pb-16 text-center text-smoke/50 text-sm"
            >
              <div className="text-amber-warm/80 tracking-[0.4em] font-serif uppercase mb-3">深夜食堂</div>
              <p className="text-xs uppercase tracking-widest">Open midnight to 5 AM</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
