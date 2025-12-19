
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock, Instagram } from 'lucide-react';
// Fixed: Removed ProductCategory from the constants import as it is not exported there and is unused in this file.
import { PRODUCTS, TESTIMONIALS, CONTACT_INFO } from '../constants';

const Hero = () => (
  <section className="relative h-[80vh] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src="https://picsum.photos/seed/hero/1920/1080"
        alt="Modern Interior with Premium Flooring"
        className="w-full h-full object-cover brightness-50"
      />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Premium Flooring & <span className="text-wood">Interior</span> Finishes
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-200">
          Transform your space with Kenya's most trusted partner for LVT, SPC, Wallpapers & Decor. 
          Quality finishes with Kenya-wide delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="bg-wood hover:bg-[#6F4B30] text-white px-8 py-4 rounded-full font-bold text-center transition-all flex items-center justify-center gap-2"
          >
            Browse Collections <ArrowRight size={20} />
          </Link>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
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

const CategoryPreview = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-2">Our Core Categories</h2>
          <p className="text-gray-600">Elevate every corner of your room.</p>
        </div>
        <Link to="/products" className="text-wood font-bold flex items-center gap-1 hover:underline">
          View All <ArrowRight size={18} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'LVT Flooring', img: 'https://picsum.photos/seed/cat1/600/600', link: '/products?cat=LVT' },
          { title: 'SPC Rigid Vinyl', img: 'https://picsum.photos/seed/cat2/600/600', link: '/products?cat=SPC' },
          { title: 'Artificial Turf', img: 'https://picsum.photos/seed/cat3/600/600', link: '/products?cat=Turf' },
        ].map((cat, i) => (
          <Link key={i} to={cat.link} className="group relative overflow-hidden rounded-2xl h-96">
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <h3 className="text-white text-2xl font-bold">{cat.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const SocialSection = () => (
  <section className="py-20 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-pink-600 font-bold mb-4">
          <Instagram size={24} />
          <span>Follow @floorspaceke</span>
        </div>
        <h2 className="text-4xl font-bold mb-4">Real Spaces, Real People</h2>
        <p className="text-gray-600">Check out our latest installations from Instagram.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square relative group cursor-pointer overflow-hidden rounded-xl">
            <img
              src={`https://picsum.photos/seed/insta${i}/500/500`}
              alt="Social Post"
              className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Instagram className="text-white" size={40} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const faqs = [
    { q: "Do you deliver across Kenya?", a: "Yes! We offer countrywide delivery using trusted logistics partners. Whether you're in Nairobi, Mombasa, Kisumu, or smaller towns like Kiserian or Syokimau, we've got you covered." },
    { q: "What are your payment modes?", a: "We accept M-Pesa, Bank Transfers (EFT/RTGS), and Card Payments (Visa/Mastercard)." },
    { q: "Do you provide installation services?", a: "While we are primarily suppliers, we have a list of certified professional installers we can recommend to ensure your flooring is laid perfectly." },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-2 text-wood">{f.q}</h4>
              <p className="text-gray-600">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <CategoryPreview />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
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
      <SocialSection />
      <FAQ />
    </div>
  );
};
