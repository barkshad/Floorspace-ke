
import React from 'react';
import { MapPin, Target, Users, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-wood text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Leading the transformation of spaces across Kenya with premium interior finishes and impeccable service.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-secondary">Floor Space Interiors Kenya</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Based in the heart of the bustling Thika Road at the <strong>Magunas Supermarket Building</strong>, Floor Space Interiors (Floor Space Kenya) has grown to become a beacon of quality for homeowners and commercial developers alike.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We specialize in supplying high-end Luxury Vinyl Tile (LVT), Rigid SPC flooring, sophisticated wallpapers, and versatile PVC marble sheets. Our mission is simple: to provide aesthetic, durable, and affordable interior finishes that make your "Floor Space" feel like a dream.
              </p>
              <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-wood">
                <p className="italic text-gray-700 font-medium">
                  "Whether you are in Nairobi, Syokimau, Kiserian, or anywhere across the 47 counties, we ensure your order reaches you in perfect condition."
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/store/800/1000" 
                alt="Floor Space Showroom" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden lg:block max-w-xs">
                <div className="flex items-center gap-2 text-wood font-bold mb-2">
                  <MapPin size={20} />
                  <span>Our Location</span>
                </div>
                <p className="text-sm text-gray-600">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Target className="text-wood" />, title: 'Mission', text: 'To redefine Kenyan interiors through innovation and accessibility.' },
              { icon: <Users className="text-wood" />, title: 'Customer First', text: 'We serve every client with personalized attention, regardless of project size.' },
              { icon: <Sparkles className="text-wood" />, title: 'Excellence', text: 'Sourcing only the best materials that stand the test of time.' }
            ].map((v, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex bg-white p-5 rounded-3xl shadow-sm mb-6">{v.icon}</div>
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-gray-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
