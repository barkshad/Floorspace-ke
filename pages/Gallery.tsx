
import React, { useState } from 'react';
import { useSiteData } from '../hooks/useSiteData';
import { Sparkles, ArrowUpRight, Camera, Grid, Maximize2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery } = useSiteData();
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'LVT', 'SPC', 'Wall Decor', 'Turf'];

  const filtered = activeTab === 'All' 
    ? gallery 
    : gallery.filter(img => img.category === activeTab);

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-6">
           <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-wood text-[9px] font-black uppercase tracking-[0.3em]">
            <Camera size={12} /> Live Installations
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none">
            THE <span className="text-wood italic">SHOWROOM</span>
          </h1>
          <p className="text-white/30 text-xl max-w-2xl mx-auto font-medium">
            A visceral look at how Floor Space transforms raw architecture into luxury living environments.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 mb-20 border-b border-white/5 pb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[11px] font-black uppercase tracking-[0.4em] transition-all relative py-2 ${
                activeTab === tab ? 'text-wood' : 'text-white/30 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wood shadow-[0_0_15px_rgba(193,154,107,1)]"></div>}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filtered.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-[2.5rem] glass border-white/5 break-inside-avoid shadow-2xl">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              
              {/* Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                 <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                   <p className="text-wood font-black text-[10px] uppercase tracking-[0.4em] mb-3">{img.category}</p>
                   <h3 className="text-white text-3xl font-black tracking-tight mb-4">{img.title}</h3>
                   <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white">
                     <Maximize2 size={20} />
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-40 relative group">
          <div className="absolute inset-0 bg-wood/5 rounded-[4rem] blur-3xl -z-0"></div>
          <div className="relative z-10 glass rounded-[4rem] p-16 md:p-24 text-center border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Sparkles size={300} />
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 italic">YOUR TURN?</h2>
            <p className="mb-12 text-white/40 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Every masterpiece in this gallery started with a single conversation. Let's design your legacy floor space today.
            </p>
            <a
              href="/#/contact"
              className="inline-flex items-center gap-6 bg-white text-black px-16 py-8 rounded-full font-black text-[14px] uppercase tracking-[0.3em] hover:bg-wood transition-all shadow-2xl active:scale-95"
            >
              Start Your Project <ArrowUpRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
