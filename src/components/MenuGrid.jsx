import { AnimatePresence } from "framer-motion";
import MenuItem from "./MenuItem";

export default function MenuGrid({ items }) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <MenuItem key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <div className="text-center py-20">
          <p className="text-smoke text-lg font-serif italic">
            "The Master has something else in mind for this moment..."
          </p>
          <p className="text-smoke/50 text-sm mt-2">
            No dishes found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
