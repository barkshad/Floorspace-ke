
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Mail, MapPin, UserCheck, MessageCircle, ChevronRight } from 'lucide-react';
import { Logo, CONTACT_INFO } from '../constants';
import { useSiteData } from '../hooks/useSiteData';

const Navbar = ({ config }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/products' },
    { name: 'Our Story', path: '/about' },
    { name: 'Showcase', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-500 rounded-[2rem] px-8 flex justify-between items-center ${
          scrolled ? 'glass-dark h-16 shadow-2xl' : 'h-20'
        }`}>
          <Link to="/" className="flex items-center">
            <Logo className="h-9" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[13px] font-bold uppercase tracking-widest transition-all hover:text-wood relative group ${
                  location.pathname === link.path ? 'text-wood' : 'text-white/70'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-wood transition-all group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            
            <a
              href={`https://wa.me/${config.whatsapp}`}
              className="bg-wood text-white px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl shadow-wood/20 hover:scale-105 active:scale-95 transition-all"
            >
              Consult Now
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 md:hidden transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-3xl font-bold text-white hover:text-wood transition-colors">
              {link.name}
            </Link>
          ))}
          <div className="pt-8 flex gap-6">
            <Facebook className="text-white/50" />
            <Instagram className="text-white/50" />
            <Mail className="text-white/50" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ config }: any) => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-wood/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <Logo className="h-10 mb-8" light />
            <p className="text-lg text-white/50 leading-relaxed mb-10 font-medium">
              We don't just supply flooring; we engineer atmospheres. Elevating Kenyan interiors through architectural precision and premium materials.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-wood hover:border-wood transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-wood mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Products', 'About Us', 'Project Gallery', 'Contact'].map((item, i) => (
                <li key={i}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="text-wood opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-wood mb-8">HQ Showroom</h4>
            <div className="space-y-6">
              <div className="flex gap-4 text-white/60">
                <MapPin size={20} className="text-wood shrink-0" />
                <p className="text-sm leading-relaxed">{config.address}</p>
              </div>
              <div className="flex gap-4 text-white/60">
                <MessageCircle size={20} className="text-wood shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">WhatsApp Direct</p>
                  <p className="text-lg font-bold text-white">{config.phone}</p>
                </div>
              </div>
              <Link to="/admin/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-wood transition-colors">
                <UserCheck size={14} /> Internal Management Access
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-[10px] font-medium text-white/30 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Floor Space Kenya. Designed for Excellence.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/20">
            <a href="#" className="hover:text-wood">Privacy</a>
            <a href="#" className="hover:text-wood">Terms</a>
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
      <main className="grow pt-0">{children}</main>
      <Footer config={config} />
      
      {/* Cinematic Floating WhatsApp */}
      <a 
        href={`https://wa.me/${config.whatsapp}`} 
        target="_blank" 
        className="fixed bottom-10 right-10 z-50 group"
      >
        <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 active:scale-95 group-hover:rotate-12">
          <MessageCircle size={32} />
        </div>
      </a>
    </div>
  );
};
