
import React, { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, Info, Filter, ArrowUpRight, Sparkles } from 'lucide-react';
import { useSiteData } from '../hooks/useSiteData';

const ProductCard = ({ product, whatsapp }: any) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: y * -15 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div 
      className="group relative h-[600px] perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div 
        className="w-full h-full glass rounded-[3rem] overflow-hidden border-white/5 transition-all duration-300 ease-out shadow-2xl relative z-10"
        style={{ 
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          boxShadow: tilt.x !== 0 ? `${-tilt.x * 2}px ${tilt.y * 2}px 50px rgba(193, 154, 107, 0.2)` : 'none'
        }}
      >
        {/* Reflection Effect */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity bg-gradient-to-tr from-transparent via-white/40 to-transparent"
          style={{ transform: `translate(${tilt.x * 10}px, ${tilt.y * 10}px)` }}
        ></div>

        <div className="h-[65%] overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          />
          <div className="absolute top-8 right-8 glass-dark px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-wood">
            {product.category}
          </div>
        </div>

        <div className="p-10 flex flex-col h-[35%] justify-between">
          <div>
            <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-wood transition-colors">{product.name}</h3>
            <p className="text-white/40 text-sm font-medium line-clamp-2 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="flex items-end justify-between border-t border-white/5 pt-6">
            <div>
              <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-1">Architectural Pricing</p>
              <p className="text-2xl font-black text-white">{product.price}</p>
            </div>
            <a
              href={`https://wa.me/${whatsapp}?text=Inquiry: ${product.name}`}
              className="w-14 h-14 bg-wood rounded-2xl flex items-center justify-center text-black shadow-xl shadow-wood/20 hover:scale-110 transition-all active:scale-95"
            >
              <ArrowUpRight size={24} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Background shadow glow */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-wood/5 blur-3xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export const Products: React.FC = () => {
  const { products, config } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const categories = ['All', 'LVT Flooring', 'SPC Flooring', 'Artificial Turf', 'Wallpapers & PVC'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="fixed top-0 right-0 w-[60vw] h-[60vw] bg-wood/5 rounded-full blur-[180px] -z-0 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-wood text-[9px] font-black uppercase tracking-[0.3em]">
            <Sparkles size={12} /> The Interior Vault
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none italic md:not-italic">
            CURATED <br /> <span className="text-wood">FINISHES</span>
          </h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Every product in our catalog is architecturally vetted for durability, aesthetics, and superior performance in the Kenyan climate.
          </p>
        </header>

        {/* Cinematic Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all overflow-hidden ${
                activeCategory === cat 
                  ? 'bg-wood text-black shadow-2xl shadow-wood/30' 
                  : 'glass text-white/50 hover:text-white border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} whatsapp={config.whatsapp} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center glass rounded-[4rem] border-dashed border-white/10">
             <Filter size={64} className="mx-auto text-white/10 mb-8" />
             <p className="text-white/40 text-2xl font-bold">No masterpieces found in this category.</p>
             <button onClick={() => setActiveCategory('All')} className="text-wood font-black uppercase tracking-widest text-xs mt-6 hover:underline">View All Collections</button>
          </div>
        )}
      </div>
    </div>
  );
};
