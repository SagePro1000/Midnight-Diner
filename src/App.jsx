import { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import MenuGrid from "./components/MenuGrid";
import RequestDish from "./components/RequestDish";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PastOrdersModal from "./components/PastOrdersModal";
import menuData from "./data/menu.json";

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  const filteredItems =
    activeCategory === "all"
      ? menuData
      : menuData.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-midnight relative">
      {/* Subtle noise texture overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar onOpenOrders={() => setIsOrdersModalOpen(true)} />

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        
        <div id="menu">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <MenuGrid items={filteredItems} />
        </div>
        
        <div id="request">
          <RequestDish onOpenOrders={() => setIsOrdersModalOpen(true)} />
        </div>
        
        <Footer />
      </div>

      {/* Scroll to top FAB */}
      <ScrollToTop />

      {/* Global Orders Modal */}
      <PastOrdersModal 
        isOpen={isOrdersModalOpen} 
        onClose={() => setIsOrdersModalOpen(false)} 
      />
    </div>
  );
}

export default App;
