
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, ArrowUpRight, Check } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-wood/5 rounded-full blur-[200px] -z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          
          {/* Info Side */}
          <div className="space-y-16">
            <div className="space-y-6">
              <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter">LET'S <br /> <span className="text-wood">TALK</span></h1>
              <p className="text-white/40 text-2xl font-medium max-w-lg leading-relaxed">
                Our showroom is an open book. Visit us or send a digital carrier—we're ready for your project.
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-wood group-hover:bg-wood group-hover:text-black transition-all">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Showroom Location</h4>
                  <p className="text-xl font-bold text-white max-w-xs">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-wood group-hover:bg-wood group-hover:text-black transition-all">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Voice & WhatsApp</h4>
                  <p className="text-2xl font-black text-white mb-2">{CONTACT_INFO.phone}</p>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="text-wood font-black uppercase tracking-widest text-[11px] flex items-center gap-2 hover:translate-x-2 transition-transform">
                    Instant Channel <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-wood group-hover:bg-wood group-hover:text-black transition-all">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Email Desk</h4>
                  <p className="text-xl font-bold text-white">{CONTACT_INFO.email}</p>
                </div>
              </div>
            </div>

            {/* Cinematic Map Button */}
            <div className="group relative w-full h-80 rounded-[3rem] overflow-hidden glass border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                alt="Map Background" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                 <MapPin size={48} className="text-wood mb-6 group-hover:scale-125 transition-transform" />
                 <p className="text-lg font-bold text-white mb-6">Experience the materials in person.</p>
                 <a href={CONTACT_INFO.googleMapsLink} target="_blank" className="bg-white text-black px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-wood transition-colors">Open in Maps</a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="relative">
            <div className="absolute -inset-10 bg-wood/5 blur-[100px] -z-0"></div>
            <div className="glass p-12 md:p-16 rounded-[4rem] border-white/10 relative z-10 shadow-2xl">
              <h2 className="text-4xl font-black text-white mb-10 tracking-tight">THE INQUIRY DESK</h2>
              
              {sent ? (
                <div className="py-20 text-center space-y-6">
                   <div className="w-24 h-24 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-8 animate-bounce">
                     <Check size={48} />
                   </div>
                   <h3 className="text-3xl font-black text-white">Message Dispatched</h3>
                   <p className="text-white/40 text-lg">Our design team will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-8">
                    <div className="group">
                      <label className="block text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 ml-1 transition-colors group-focus-within:text-wood">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 px-8 py-6 rounded-[1.5rem] border border-white/5 focus:border-wood outline-none transition-all text-white placeholder:text-white/10"
                        placeholder="e.g. Architect Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 ml-1 transition-colors group-focus-within:text-wood">Email Address</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-white/5 px-8 py-6 rounded-[1.5rem] border border-white/5 focus:border-wood outline-none transition-all text-white placeholder:text-white/10"
                        placeholder="desk@studio.co.ke"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 ml-1 transition-colors group-focus-within:text-wood">Your Vision</label>
                      <textarea
                        rows={6}
                        required
                        className="w-full bg-white/5 px-8 py-6 rounded-[2rem] border border-white/5 focus:border-wood outline-none transition-all text-white placeholder:text-white/10 resize-none"
                        placeholder="Describe your project requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-wood text-black font-black py-8 rounded-[2rem] shadow-2xl shadow-wood/20 transition-all flex items-center justify-center gap-4 group active:scale-[0.98]"
                  >
                    <span className="text-sm uppercase tracking-[0.4em]">Dispatch Message</span>
                    <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </button>
                </form>
              )}
              
              <div className="mt-16 text-center pt-10 border-t border-white/5">
                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em] mb-8">Priority Channel</p>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  className="inline-flex items-center gap-4 bg-green-500 text-white px-12 py-6 rounded-full font-black shadow-2xl shadow-green-500/10 hover:scale-105 transition-all"
                >
                  <MessageCircle size={24} /> 
                  <span className="text-[12px] uppercase tracking-widest">Chat with an Expert</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
