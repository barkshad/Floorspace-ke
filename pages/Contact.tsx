
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We'll get back to you shortly.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Info Side */}
          <div>
            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
            <p className="text-gray-600 mb-12 text-lg">
              Visit our showroom at Thika Road or reach out to us via any of the channels below. 
              Our team is ready to assist with your flooring needs.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-wood/10 p-4 rounded-2xl text-wood">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Our Location</h4>
                  <p className="text-gray-600">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-wood/10 p-4 rounded-2xl text-wood">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone & WhatsApp</h4>
                  <p className="text-gray-600">{CONTACT_INFO.phone}</p>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="text-wood font-bold hover:underline">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-wood/10 p-4 rounded-2xl text-wood">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-gray-600">{CONTACT_INFO.email}</p>
                </div>
              </div>
            </div>

            {/* Simulated Map Placeholder */}
            <div className="mt-12 rounded-3xl overflow-hidden h-64 bg-gray-100 border relative">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 p-8 text-center">
                 <div className="space-y-4">
                   <MapPin size={48} className="mx-auto opacity-20" />
                   <p className="font-medium">Located at Magunas Supermarket Building, Thika Road</p>
                   <button className="bg-wood text-white px-6 py-2 rounded-full text-sm">Open in Google Maps</button>
                 </div>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-gray-50 p-10 rounded-3xl shadow-inner border border-gray-100">
            <h2 className="text-2xl font-bold mb-8">Send an Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-wood focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-wood focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">How can we help?</label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-wood focus:border-transparent outline-none transition-all"
                  placeholder="I'm interested in LVT flooring for my 3-bedroom house in Syokimau..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-wood hover:bg-[#6F4B30] text-white font-bold py-5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]"
              >
                Send Message <Send size={20} />
              </button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-4 uppercase font-bold tracking-widest">Or skip the form</p>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-green-100 hover:bg-green-600 transition-all"
              >
                <MessageCircle size={22} /> Instant WhatsApp Quote
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
