
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Instagram, Facebook, Mail, MapPin, UserCheck } from 'lucide-react';
import { Logo } from '../constants';
import { useSiteData } from '../hooks/useSiteData';

const Navbar = ({ config }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <Logo className="h-10" />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-[#8B5E3C] ${
                  location.pathname === link.path ? 'text-[#8B5E3C]' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`https://wa.me/${config.whatsapp}`}
              className="bg-[#8B5E3C] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-wood/20 hover:bg-[#6F4B30] transition-all transform hover:scale-105"
            >
              Get a Quote
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-[#8B5E3C]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 rounded-lg">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ config }: any) => {
  return (
    <footer className="bg-[#2D2D2D] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Logo className="h-10 mb-6 brightness-0 invert" />
            <p className="text-sm leading-relaxed mb-6">
              Floor Space Interiors is Kenya's leading supplier of premium interior finishes. 
              Transforming homes and offices across the nation.
            </p>
            <div className="flex gap-4">
              <a href={config.facebookUrl} className="hover:text-white"><Facebook size={20} /></a>
              <a href={config.instagramUrl} className="hover:text-white"><Instagram size={20} /></a>
              <a href={`mailto:${config.email}`} className="hover:text-white"><Mail size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-wood">Home</Link></li>
              <li><Link to="/products" className="hover:text-wood">Products</Link></li>
              <li><Link to="/gallery" className="hover:text-wood">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-wood">Contact</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold mb-6">Support</h4>
             <ul className="space-y-4 text-sm">
                <li><Link to="/admin/login" className="flex items-center gap-2 hover:text-wood text-gray-500 font-bold">
                  <UserCheck size={16} /> Admin Access
                </Link></li>
             </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><MapPin size={18} className="text-wood shrink-0" /><span>{config.address}</span></li>
              <li className="flex gap-3"><Phone size={18} className="text-wood shrink-0" /><span>{config.phone}</span></li>
              <li className="flex gap-3"><Mail size={18} className="text-wood shrink-0" /><span>{config.email}</span></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-700 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Floor Space Interiors Kenya. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config } = useSiteData();
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F5]">
      <Navbar config={config} />
      <main className="grow">{children}</main>
      <Footer config={config} />
      <a href={`https://wa.me/${config.whatsapp}`} target="_blank" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center animate-bounce">
        <MessageCircle size={32} />
      </a>
    </div>
  );
};
