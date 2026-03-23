import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight, ChevronLeft, Bed, Tent, Palmtree, Check } from 'lucide-react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2665&auto=format&fit=crop",
    name: "Fihalhohi Maldives"
  },
  {
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop",
    name: "Kuredu Island Resort"
  },
  {
    image: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2664&auto=format&fit=crop",
    name: "Hurawalhi Island Resort"
  }
];

const MaldivesCard = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleBooking = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <section className="w-full bg-[#faf9f6]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Space+Mono&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-space { font-family: 'Space Mono', monospace; }
      `}</style>
      <div className="w-full">
        {/* Card Content */}
        <div className="flex items-center justify-start">
          <div className="w-full bg-white rounded-[3rem] p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center shadow-xl relative overflow-hidden">
        
        {/* Notification Toast */}
        {showNotification && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md text-slate-800 px-6 py-3 rounded-full shadow-lg border border-white/50 flex items-center gap-2 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
            <div className="bg-green-100 p-1 rounded-full text-green-600">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="font-medium text-sm">Tour selected: {slides[activeSlide].name}</span>
          </div>
        )}

        {/* Decorative background blur (subtle) */}
        <div className="absolute top-[-20%] left-[20%] w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none" />

        {/* Left Content Section */}
        <div className="flex-1 space-y-6 z-10">
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-playfair font-light tracking-tight text-slate-900">
              Maldives
            </h1>
            <p className="text-slate-600 leading-relaxed max-w-md text-xs md:text-sm font-space">
              The perfect place to feel like Robinson Crusoe, but in comfortable conditions and with a high level of service.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-4 text-xs md:text-sm font-medium text-slate-500 font-space">
            <span className="bg-white/50 px-3 py-1 rounded-full">#Visa Free</span>
            <span className="bg-white/50 px-3 py-1 rounded-full">#Perfect Weather</span>
          </div>

          {/* CTA Button */}
          <button 
            onClick={handleBooking}
            className="group bg-white pl-6 pr-2 py-2 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-3 active:scale-95 cursor-pointer"
          >
            <span className="font-semibold text-slate-800 text-sm md:text-base font-space">Select Tour</span>
            <div className="bg-[#1e40af] text-white p-2 rounded-full transition-transform group-hover:rotate-45">
              <ArrowUpRight size={20} />
            </div>
          </button>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 w-full max-w-lg lg:max-w-xl relative group">
          
          {/* Image Container - The "Pill" Shape */}
          <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border-8 border-white/30 shadow-2xl bg-slate-200">
            <img 
              src={slides[activeSlide].image}
              alt={slides[activeSlide].name} 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Floating UI Elements inside the image */}
            
            {/* Left Icons Column */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <Bed size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <Palmtree size={18} />
              </div>
            </div>

            {/* Center Hotel Name Pill */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 text-white font-medium text-sm md:text-base whitespace-nowrap shadow-lg transition-all duration-300 font-space">
                {slides[activeSlide].name}
              </div>
            </div>

            {/* Right Edge Navigation Buttons */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
               <button 
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors active:scale-95 cursor-pointer"
               >
                  <ChevronLeft size={20} />
               </button>
               <button 
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-[#1e40af] flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors active:scale-95 cursor-pointer"
               >
                  <ChevronRight size={20} />
               </button>
            </div>

          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaldivesCard;