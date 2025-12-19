
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock, Instagram } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { useSiteData } from '../hooks/useSiteData';

const Hero = ({ config }: any) => (
  <section className="relative h-[80vh] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src="https://picsum.photos/seed/hero/1920/1080"
        alt="Modern Interior"
        className="w-full h-full object-cover brightness-50"
      />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {config.heroTitle.split(' ').slice(0, -1).join(' ')} <span className="text-wood">{config.heroTitle.split(' ').slice(-1)}</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-200">
          {config.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="bg-wood hover:bg-[#6F4B30] text-white px-8 py-4 rounded-full font-bold text-center transition-all flex items-center justify-center gap-2"
          >
            Browse Collections <ArrowRight size={20} />
          </Link>
          <a
            href={`https://wa.me/${config.whatsapp}`}
            className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-bold text-center transition-all shadow-xl"
          >
            Get Quote (WhatsApp)
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: <Truck className="text-wood" />, title: 'Countrywide Delivery', desc: 'Fast delivery to Nairobi, Syokimau, Kiserian, & beyond.' },
          { icon: <Shield className="text-wood" />, title: 'Premium Quality', desc: 'Only the best LVT & SPC brands for your project.' },
          { icon: <Clock className="text-wood" />, title: 'Expert Advice', desc: 'Get professional guidance on the best finishes.' },
          { icon: <Star className="text-wood" />, title: 'Trusted Brand', desc: '5-star reviews from homeowners across Kenya.' },
        ].map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="mb-4 bg-wood/10 p-4 rounded-full">{f.icon}</div>
            <h3 className="font-bold mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Home: React.FC = () => {
  const { config, testimonials } = useSiteData();

  return (
    <div>
      <Hero config={config} />
      <Features />
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-500">Real feedback from homes across Kenya.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-wood rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.location} • {t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
