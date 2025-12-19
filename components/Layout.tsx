
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import { Logo, CONTACT_INFO, COLORS } from '../constants';

const Navbar = () => {
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

          {/* Desktop Nav */}
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
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              className="bg-[#8B5E3C] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-wood/20 hover:bg-[#6F4B30] transition-all transform hover:scale-105"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#8B5E3C]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                className="flex items-center justify-center gap-2 bg-[#8B5E3C] text-white px-4 py-4 rounded-lg font-bold"
              >
                <MessageCircle size={20} />
                Get Quote on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#2D2D2D] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Logo className="h-10 mb-6 brightness-0 invert" />
            <p className="text-sm leading-relaxed mb-6">
              Floor Space Interiors is Kenya's leading supplier of premium interior finishes. 
              Transforming homes and offices with high-quality flooring and decor solutions.
            </p>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.facebook} className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href={CONTACT_INFO.instagram} className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-[#D4A373] transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-[#D4A373] transition-colors">Browse Products</Link></li>
              <li><Link to="/about" className="hover:text-[#D4A373] transition-colors">About Our Story</Link></li>
              <li><Link to="/gallery" className="hover:text-[#D4A373] transition-colors">Project Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Products</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/products" className="hover:text-[#D4A373] transition-colors">LVT Flooring</Link></li>
              <li><Link to="/products" className="hover:text-[#D4A373] transition-colors">SPC Rigid Core</Link></li>
              <li><Link to="/products" className="hover:text-[#D4A373] transition-colors">Vinyl & Mkeka</Link></li>
              <li><Link to="/products" className="hover:text-[#D4A373] transition-colors">Artificial Grass</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-wood shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-wood shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-wood shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </li>
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

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
    title="Chat with us on WhatsApp"
  >
    <MessageCircle size={32} />
    <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
      Online
    </span>
  </a>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F5]">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
