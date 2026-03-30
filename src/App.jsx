import { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import MenuGrid from "./components/MenuGrid";
import RequestDish from "./components/RequestDish";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import menuData from "./data/menu.json";

function App() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? menuData
      : menuData.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-midnight relative">
      {/* Subtle noise texture overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

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
          <RequestDish />
        </div>
        
        <Footer />
      </div>

      {/* Scroll to top FAB */}
      <ScrollToTop />
    </div>
  );
}

export default App;
