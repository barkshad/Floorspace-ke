
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Mail, MapPin, UserCheck, MessageCircle, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Logo, CONTACT_INFO } from '../constants';
import { useSiteData } from '../hooks/useSiteData';

const Navbar = ({ config }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', path: '/products' },
    { name: 'Philosophy', path: '/about' },
    { name: 'Showcase', path: '/gallery' },
    { name: 'Concierge', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
      scrolled ? 'py-6' : 'py-12'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-700 rounded-[3rem] px-10 flex justify-between items-center ${
          scrolled ? 'glass-dark h-20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]' : 'h-24 bg-transparent'
        }`}>
          <Link to="/" className="hover:scale-105 transition-transform active:scale-95">
            <Logo className="h-10" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:text-wood relative group ${
                  location.pathname === link.path ? 'text-wood' : 'text-white/60'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-wood transition-all group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            
            <a
              href={`https://wa.me/${config.whatsapp}`}
              className="bg-wood text-black px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-wood/20 hover:scale-105 active:scale-95 transition-all"
            >
              Consult
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 glass rounded-2xl">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/98 backdrop-blur-3xl z-40 md:hidden transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-12 px-8">
           <Logo className="h-12 mb-10" light />
           {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-4xl font-black text-white hover:text-wood transition-colors tracking-tighter">
              {link.name}
            </Link>
          ))}
          <a href={`https://wa.me/${config.whatsapp}`} className="bg-wood text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.4em]">
            Immediate Access
          </a>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ config }: any) => {
  return (
    <footer className="bg-black pt-40 pb-20 overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24 mb-32">
          <div className="md:col-span-6 space-y-12">
            <Logo className="h-12" light />
            <p className="text-2xl text-white/40 leading-relaxed font-light max-w-xl">
              Floor Space Kenya is the architectural choice for high-fidelity interiors. We engineer atmospheres that stand the test of luxury.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-white/30 hover:text-wood hover:border-wood/40 transition-all">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-wood mb-12">Directory</p>
            <ul className="space-y-6">
              {['Collections', 'Philosophy', 'Showroom', 'Concierge'].map((item, i) => (
                <li key={i}>
                  <Link to={`/${item.toLowerCase().replace('showroom', 'gallery').replace('concierge', 'contact').replace('philosophy', 'about')}`} className="text-lg text-white/60 hover:text-white transition-all flex items-center gap-4 group">
                    <span className="w-2 h-2 rounded-full bg-wood opacity-0 group-hover:opacity-100 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-wood mb-12">HQ Showroom</p>
            <div className="space-y-10">
              <div className="flex gap-6 text-white/50">
                <MapPin size={24} className="text-wood shrink-0" />
                <p className="text-lg font-light leading-relaxed">{config.address}</p>
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 mb-4">Priority Support</p>
                <p className="text-2xl font-black text-white">{config.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} Floor Space Interiors Kenya. The standard of Kenyan Luxury.
          </p>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            <Link to="/admin/login" className="hover:text-wood flex items-center gap-2">
               <UserCheck size={12} /> Management Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config } = useSiteData();
  return (
    <div className="min-h-screen flex flex-col bg-[#080808]">
      <Navbar config={config} />
      <main className="grow">{children}</main>
      <Footer config={config} />
      
      {/* Cinematic Floating Concierge */}
      <a 
        href={`https://wa.me/${config.whatsapp}`} 
        target="_blank" 
        className="fixed bottom-12 right-12 z-50 group"
      >
        <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative bg-green-500 text-white w-20 h-20 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 active:scale-95 group-hover:-rotate-12">
          <MessageCircle size={32} />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </div>
      </a>
    </div>
  );
};
