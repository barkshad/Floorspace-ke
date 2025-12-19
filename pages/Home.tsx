import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ArrowDown, Play, Sparkles, Layers, ShieldCheck, Truck } from 'lucide-react';
import { useSiteData } from '../hooks/useSiteData';

const Hero = ({ config }: any) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background with Parallax */}
      <div 
        className="absolute inset-0 z-0 scale-110 transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollY * 0.4}px) translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Interior"
          className="w-full h-full object-cover opacity-60 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-3 glass-dark px-6 py-2.5 rounded-full text-wood text-[10px] font-black uppercase tracking-[0.4em] animate-reveal">
            <Sparkles size={14} /> The New Standard in Interiors
          </div>
          
          <h1 className="text-6xl md:text-[7rem] font-black text-white leading-[0.9] tracking-tighter animate-reveal stagger-1 italic md:not-italic">
            ELEVATE <span className="text-wood">YOUR</span> SPACE
          </h1>
          
          <p className="text-lg md:text-2xl text-white/60 font-medium max-w-2xl mx-auto animate-reveal stagger-2 leading-relaxed">
            {config.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 animate-reveal stagger-3">
            <Link
              to="/products"
              className="group relative bg-white text-black px-12 py-6 rounded-full font-black text-[12px] uppercase tracking-widest overflow-hidden transition-all hover:pr-16"
            >
              <span className="relative z-10">Explore Collections</span>
              <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
            </Link>
            
            <a
              href={`https://wa.me/${config.whatsapp}`}
              className="glass px-12 py-6 rounded-full font-black text-[12px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
            >
              Request a Sample
            </a>
          </div>
        </div>
      </div>

      {/* Floating Glass Stats */}
      <div className="absolute bottom-12 left-0 w-full px-6 flex justify-center animate-reveal stagger-3 hidden md:flex">
         <div className="glass h-24 rounded-[2rem] px-12 flex items-center gap-16">
            <div className="text-center">
              <p className="text-wood font-black text-xl">5,000+</p>
              <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Projects Done</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10"></div>
            <div className="text-center">
              <p className="text-wood font-black text-xl">47</p>
              <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Counties Served</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10"></div>
            <div className="text-center">
              <p className="text-wood font-black text-xl">15yr+</p>
              <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Warranty Coverage</p>
            </div>
         </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-wood animate-bounce">
        <ArrowDown size={32} strokeWidth={1} />
      </div>
    </section>
  );
};

const RevealOnScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}>
      {children}
    </div>
  );
};

const Features = () => (
  <section className="py-32 bg-black overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: <Layers className="text-wood" />, title: 'Architectural Layering', desc: 'Our SPC & LVT floorings feature 7-layer technology for sound reduction and comfort.' },
          { icon: <ShieldCheck className="text-wood" />, title: 'Unyielding Protection', desc: 'Diamond-grade wear layers ensure your surfaces remain pristine even in high-traffic zones.' },
          { icon: <Truck className="text-wood" />, title: 'Logistics Precision', desc: 'Secure, temperature-controlled delivery to ensure materials arrive in perfect architectural condition.' },
        ].map((f, i) => (
          <RevealOnScroll key={i}>
            <div className="group glass p-10 rounded-[2.5rem] h-full transition-all hover:bg-wood/5 border-white/5 hover:border-wood/20">
              <div className="mb-8 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-wood group-hover:text-black transition-all">
                {/* Fixed TypeScript error by casting to any props */}
                {React.cloneElement(f.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialSection = ({ testimonials }: any) => (
  <section className="py-32 bg-[#0A0A0A] relative">
    <div className="absolute top-0 right-0 w-96 h-96 bg-wood/5 rounded-full blur-[120px]"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">REPUTATION</h2>
        <p className="text-white/40 uppercase tracking-[0.4em] font-bold text-xs">The voices of Kenya's elite homes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.slice(0, 3).map((t: any, i: number) => (
          <RevealOnScroll key={t.id}>
            <div className="glass p-12 rounded-[3rem] border-white/5 relative">
              <div className="flex text-wood mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xl text-white/80 italic font-medium mb-12 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-wood rounded-2xl flex items-center justify-center text-black font-black text-xl rotate-3">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-xs text-wood font-black uppercase tracking-widest">{t.location}</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export const Home: React.FC = () => {
  const { config, testimonials } = useSiteData();

  return (
    <div className="bg-black">
      <Hero config={config} />
      <Features />
      
      {/* Visual Narrative Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealOnScroll>
              <div className="relative group overflow-hidden rounded-[3rem]">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full aspect-[4/5] object-cover transition-transform duration-[2s] group-hover:scale-110" 
                  alt="Craftsmanship" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <button className="absolute bottom-10 left-10 w-20 h-20 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Play fill="white" size={24} />
                </button>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll>
              <div className="space-y-8">
                <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">CRAFTED FOR THE <span className="text-wood">EXTRAORDINARY</span></h2>
                <p className="text-xl text-white/50 leading-relaxed font-medium">
                  We believe that every floor space is a canvas. Whether you are building a legacy home in Muthaiga or a modern loft in Westlands, our materials are selected to evoke emotion and endure time.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <p className="text-4xl font-black text-white mb-2 tracking-tighter">Premium</p>
                    <p className="text-xs text-wood font-bold uppercase tracking-widest">Sourcing</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-white mb-2 tracking-tighter">Bespoke</p>
                    <p className="text-xs text-wood font-bold uppercase tracking-widest">Finishes</p>
                  </div>
                </div>
                <div className="pt-8">
                  <Link to="/about" className="inline-flex items-center gap-4 text-white font-bold group">
                    <span className="text-xs uppercase tracking-[0.4em] group-hover:text-wood transition-colors">Our Design Philosophy</span>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-wood group-hover:border-wood transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <TestimonialSection testimonials={testimonials} />
      
      {/* Pre-footer CTA */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <RevealOnScroll>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 leading-none">
              READY TO <br /> <span className="text-wood">TRANSFORM?</span>
            </h2>
            <p className="text-white/40 uppercase tracking-[0.5em] font-black text-sm mb-12">Start your journey with a design expert</p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <a href={`https://wa.me/${config.whatsapp}`} className="bg-wood text-black px-16 py-8 rounded-full font-black text-[14px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-wood/20">
                Book Consultation
              </a>
            </div>
          </RevealOnScroll>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[50vh] bg-wood/5 blur-[150px] -z-0"></div>
      </section>
    </div>
  );
};