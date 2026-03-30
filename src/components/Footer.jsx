export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        {/* Decorative kanji */}
        <p className="text-3xl text-amber-warm/20 mb-4 font-serif">深夜食堂</p>

        <p className="text-cream-muted text-sm mb-2">
          Midnight Diner &middot; Shinjuku, Tokyo
        </p>
        <p className="text-smoke text-xs mb-6">
          Open every night, midnight to 5 AM. No reservations.
          <br />
          Just come when you need to.
        </p>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mb-6" />

        <p className="text-smoke/50 text-xs">
          &copy; {new Date().getFullYear()} Midnight Diner. The Master awaits.
        </p>
      </div>
    </footer>
  );
}
