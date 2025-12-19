
import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'LVT', 'SPC', 'Wall Decor', 'Turf'];

  const filtered = activeTab === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeTab);

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Project Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a look at some of our recent installations. From cozy living rooms to modern office blocks, 
            Floor Space Kenya brings designs to life.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 text-sm font-bold transition-all border-b-2 ${
                activeTab === tab ? 'border-wood text-wood' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-200">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <div>
                  <p className="text-wood font-bold text-sm uppercase mb-1">{img.category}</p>
                  <h3 className="text-white text-xl font-bold">{img.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-wood rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Inspired by these designs?</h2>
          <p className="mb-8 opacity-90 max-w-xl mx-auto">Get in touch with us today for a free consultation and let's start your project.</p>
          <a
            href="/#/contact"
            className="bg-white text-wood px-10 py-4 rounded-full font-bold shadow-xl hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Transformation
          </a>
        </div>
      </div>
    </div>
  );
};
