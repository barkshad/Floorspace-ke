
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ArrowDown, Play, Sparkles, Layers, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useSiteData } from '../hooks/useSiteData';

const Hero = ({ config }: any) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Parallax Layer */}
      <div 
        className="absolute inset-0 z-0 scale-110 opacity-70"
        style={{ 
          transform: `translateY(${scrollY * 0.3}px) translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.2s cubic-bezier(0.1, 0.1, 0.1, 1)' 
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400"
          className="w-full h-full object-cover filter brightness-50 contrast-125"
          alt="Luxury Architecture"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
        <div className="space-y-12 mb-20">
          <div className="inline-flex items-center gap-4 glass px-8 py-3 rounded-full text-wood text-[11px] font-black uppercase tracking-[0.5em] spring-up shadow-2xl">
            <Sparkles size={14} className="animate-pulse" /> Established in Excellence
          </div>
          
          <h1 className="text-7xl md:text-[11rem] font-black text-white leading-[0.85] tracking-tighter spring-up [animation-delay:0.2s]">
            THE <span className="italic text-wood">ART</span> OF <br /> LIVING.
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed spring-up [animation-delay:0.4s]">
            {config.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 spring-up [animation-delay:0.6s]">
            <Link
              to="/products"
              className="group relative bg-white text-black px-16 py-8 rounded-full font-black text-[13px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-4">
                Explore The Vault <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            
            <Link
              to="/gallery"
              className="glass px-16 py-8 rounded-full font-black text-[13px] uppercase tracking-[0.3em] text-white hover:bg-white/10 transition-all"
            >
              View Showroom
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-wood to-transparent"></div>
      </div>
    </section>
  );
};

const SectionHeader = ({ subtitle, title }: { subtitle: string, title: string }) => (
  <div className="text-center mb-32 space-y-6">
    <p className="text-[10px] font-black text-wood uppercase tracking-[0.6em]">{subtitle}</p>
    <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">{title}</h2>
  </div>
);

export const Home: React.FC = () => {
  const { config, testimonials } = useSiteData();

  return (
    <div className="bg-[#080808] selection:bg-wood selection:text-black">
      <Hero config={config} />

      {/* Philosophy Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
            <div className="relative group">
               <div className="absolute -inset-4 bg-wood/5 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative rounded-[4rem] overflow-hidden glass border-white/5 p-4">
                 <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-auto rounded-[3rem] grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    alt="Interior Craft"
                 />
               </div>
            </div>

            <div className="space-y-12">
              <p className="text-wood font-black text-[11px] uppercase tracking-[0.5em]">01. Architectural Integrity</p>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
                SURFACES THAT <br /> <span className="italic text-wood/80">RESONATE.</span>
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed">
                We believe flooring is the foundation of architecture. Every plank and tile in our collection is selected based on light absorption, acoustic dampening, and tactile soul.
              </p>
              <ul className="space-y-6 pt-6">
                {[
                  { icon: <Layers size={20} />, text: "7-Layer Rigid Core Tech" },
                  { icon: <ShieldCheck size={20} />, text: "Diamond-Grade UV Armor" },
                  { icon: <Truck size={20} />, text: "Nationwide Logistics Matrix" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-6 text-white/80 group">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-wood group-hover:bg-wood group-hover:text-black transition-all">
                      {item.icon}
                    </div>
                    <span className="text-sm font-black uppercase tracking-[0.2em]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="section-padding bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader subtitle="The Catalog" title="CURATED COLLECTIONS" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "LVT Flooring", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c3f30?q=80&w=1200", tag: "Warmth" },
              { title: "SPC Rigid", img: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?q=80&w=1200", tag: "Durability" },
              { title: "Wall Finishes", img: "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1200", tag: "Elegance" }
            ].map((col, i) => (
              <div key={i} className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden glass border-white/5 hover:border-wood/40 transition-all cursor-pointer">
                <img src={col.img} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                   <p className="text-wood font-black text-[10px] uppercase tracking-[0.4em] mb-4">{col.tag}</p>
                   <h3 className="text-4xl font-black text-white tracking-tighter mb-6">{col.title}</h3>
                   <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      <ArrowRight size={20} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-wood/5 rounded-full blur-[200px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader subtitle="Global Reputation" title="CLIENT DISCOURSE" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.slice(0, 2).map((t: any, i: number) => (
              <div key={t.id} className="glass p-16 rounded-[4rem] border-white/5 space-y-10 hover:bg-white/5 transition-all group">
                <div className="flex gap-1 text-wood">
                   {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-3xl font-black text-white italic tracking-tight leading-snug">"{t.text}"</p>
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-[1.5rem] bg-wood flex items-center justify-center text-black font-black text-2xl group-hover:rotate-12 transition-transform">
                      {t.name[0]}
                   </div>
                   <div>
                      <p className="text-xl font-black text-white tracking-tight">{t.name}</p>
                      <p className="text-[11px] font-black text-wood uppercase tracking-[0.3em]">{t.location}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call */}
      <section className="section-padding bg-black relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.85] mb-16">
             ELEVATE YOUR <br /> <span className="text-wood">FOUNDATION.</span>
           </h2>
           <a 
              href={`https://wa.me/${config.whatsapp}`}
              className="inline-flex items-center gap-6 bg-wood text-black px-20 py-10 rounded-full font-black text-[14px] uppercase tracking-[0.4em] shadow-2xl shadow-wood/20 hover:scale-105 active:scale-95 transition-all"
           >
             Book Architectural Consult
           </a>
        </div>
      </section>
    </div>
  );
};
