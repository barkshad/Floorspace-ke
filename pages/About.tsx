import React from 'react';
import { MapPin, Target, Users, Sparkles, Shield, Award, PenTool } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="bg-black text-white">
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000"
            alt="Interior Design"
            className="w-full h-full object-cover opacity-40 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 glass px-6 py-2 rounded-full text-wood text-[10px] font-black uppercase tracking-[0.4em] mb-10">
            <Award size={14} /> The Floor Space Heritage
          </div>
          <h1 className="text-7xl md:text-[9rem] font-black text-white leading-none tracking-tighter mb-8 italic md:not-italic">
            OUR <span className="text-wood">STORY</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-medium leading-relaxed">
            Redefining the relationship between architecture and comfort since our inception.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">THE ART OF <br /> <span className="text-wood italic">SURFACE</span></h2>
              <div className="space-y-8 text-white/60 text-xl font-medium leading-relaxed">
                <p>
                  Floor Space Interiors Kenya emerged from a simple observation: <strong className="text-white">Kenya was ready for architectural-grade interiors</strong> that didn't sacrifice soul for utility.
                </p>
                <p>
                  Based in the heart of the bustling Thika Road at the <strong className="text-white">Magunas Supermarket Building</strong>, we have evolved from a material supplier to a strategic partner for the nation's most visionary developers and homeowners.
                </p>
                <p>
                  Our LVT, SPC, and wallpaper collections are curated not just for their aesthetics, but for their ability to withstand the unique rigors of the Kenyan environment while maintaining a silent, luxurious presence.
                </p>
              </div>
              
              <div className="glass p-10 rounded-[3rem] border-wood/20">
                <p className="text-2xl text-wood font-black italic leading-relaxed">
                  "Our mission is to ensure that your 'Floor Space' isn't just a surface—it's a sanctuary."
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-wood/10 rounded-[4rem] blur-3xl -z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200" 
                alt="Showroom Excellence" 
                className="rounded-[4rem] shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute -bottom-10 -left-10 glass p-12 rounded-[3rem] shadow-2xl z-20 max-w-xs hidden lg:block border-white/10">
                <div className="flex items-center gap-3 text-wood font-black mb-4">
                  <MapPin size={24} />
                  <span className="text-xs uppercase tracking-widest">Our HQ</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed font-medium">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Values */}
      <section className="py-40 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Target className="text-wood" />, title: 'Visionary Reach', text: 'Serving all 47 counties with the same level of logistical excellence and architectural care.' },
              { icon: <PenTool className="text-wood" />, title: 'Design Integrity', text: 'We source materials that respect the vision of the architect and the comfort of the dweller.' },
              { icon: <Shield className="text-wood" />, title: 'Uncompromising Quality', text: 'If it doesn’t meet our 7-layer durability standard, it doesn’t enter our catalog.' }
            ].map((v, i) => (
              <div key={i} className="glass p-12 rounded-[3rem] text-center border-white/5 hover:border-wood/30 transition-all group">
                <div className="inline-flex bg-white/5 w-20 h-20 rounded-3xl items-center justify-center mb-10 group-hover:bg-wood group-hover:text-black transition-all">
                  {/* Fixed TypeScript error by casting to any props */}
                  {React.cloneElement(v.icon as React.ReactElement<any>, { size: 40 })}
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tight">{v.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed font-medium">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};