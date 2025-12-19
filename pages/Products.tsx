
import React, { useState } from 'react';
import { ShoppingCart, MessageCircle, Info } from 'lucide-react';
import { PRODUCTS, CONTACT_INFO } from '../constants';
import { ProductCategory } from '../types';

export const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Object.values(ProductCategory)];

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Premium Catalog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of high-quality flooring and interior finishes. 
            Request samples or get a custom quote via WhatsApp.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-wood text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-wood">
                  {p.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 group-hover:text-wood transition-colors">{p.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{p.description}</p>
                
                {p.features && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.features.slice(0, 2).map((f, i) => (
                      <span key={i} className="bg-gray-100 text-[10px] text-gray-500 px-2 py-0.5 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Estimated Price</p>
                    <p className="font-bold text-wood">{p.price}</p>
                  </div>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hi, I am interested in ${p.name}`}
                    className="bg-green-500 text-white p-2.5 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Info size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">More products coming soon to this category!</p>
          </div>
        )}
      </div>
    </div>
  );
};
