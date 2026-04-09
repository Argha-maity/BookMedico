import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { 
  Search, Filter, ShoppingCart, Plus, 
  ChevronRight, Pill, Thermometer, Heart, 
  Info, Star, Zap
} from "lucide-react";

const PharmacyStore = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Prescription", "Wellness", "Devices", "First Aid"];

  const products = [
    { id: 1, name: "Paracetamol 500mg", category: "Prescription", price: 45, rating: 4.8, stock: 120, image: "💊", desc: "Relief from fever and mild pain." },
    { id: 2, name: "Digital Thermometer", category: "Devices", price: 299, rating: 4.5, stock: 15, image: "🌡️", desc: "High precision infrared sensor." },
    { id: 3, name: "Vitamin C - 1000mg", category: "Wellness", price: 150, rating: 4.9, stock: 85, image: "🍊", desc: "Immune system support booster." },
    { id: 4, name: "Antiseptic Liquid", category: "First Aid", price: 85, rating: 4.7, stock: 50, image: "🧴", desc: "Effective wound cleaning solution." },
    { id: 5, name: "Amoxicillin Capsule", category: "Prescription", price: 120, rating: 4.6, stock: 0, image: "💊", desc: "Antibiotic for bacterial infections." },
  ];

  const filteredProducts = products.filter(p => 
    (activeCategory === "All" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="patient">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Medical Store</h2>
          <p className="text-slate-500 font-medium">Order genuine medicines delivered to your doorstep.</p>
        </div>

        <div className="relative w-full md:w-96 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search medicines, wellness..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 shadow-sm transition-all font-medium"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Ribbon */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-2xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 hover:shadow-2xl hover:border-primary/20 transition-all group relative flex flex-col">
            
            {/* Out of Stock Overlay */}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[2.5rem]">
                <span className="bg-slate-900 text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest">Out of Stock</span>
              </div>
            )}

            {/* Product Image Holder */}
            <div className="h-48 bg-slate-50 rounded-[2rem] mb-6 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
              {product.image}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase text-primary tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={12} className="fill-current"/>
                  <span className="text-xs font-bold text-slate-400">{product.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-xs text-slate-400 font-medium mb-4 line-clamp-2">{product.desc}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Price</p>
                <p className="text-2xl font-black text-slate-900">₹{product.price}</p>
              </div>
              <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-primary transition-all shadow-lg active:scale-90 cursor-pointer">
                <Plus size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Cart Floating Button (Optional) */}
      <div className="fixed bottom-10 right-10 z-50">
        <button className="flex items-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl hover:scale-105 transition-all active:scale-95 cursor-pointer border-4 border-white">
          <ShoppingCart size={24} className="text-primary"/>
          <span className="font-black text-lg">View Cart</span>
          <div className="bg-primary text-slate-900 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black">2</div>
        </button>
      </div>
    </DashboardLayout>
  );
};

export default PharmacyStore;