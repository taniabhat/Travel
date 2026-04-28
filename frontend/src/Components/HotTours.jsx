import React, { useState, useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowRight, Sun, Cloud, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

// --- Reusable Card Component ---
const TourCard = ({ tour, className = "", style = {} }) => {
  if (!tour) return null;
  return (
    <div className={`relative overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-lg ${className}`} style={{ backgroundColor: '#faf9f6', ...style }}>
      <img
        src={tour.image}
        alt={tour.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Top Right Arrow */}
      <div className="absolute top-4 sm:top-4 md:top-5 right-4 sm:right-4 md:right-5 bg-white/20 backdrop-blur-md p-2 sm:p-2.5 rounded-full text-white">
        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-5 sm:left-6 md:left-8 text-white pr-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 uppercase tracking-wide leading-tight">
          {tour.name}
        </h3>
        <p className="text-white/80 text-xs sm:text-sm md:text-base mb-2 sm:mb-3">
          from {tour.price}
        </p>

        {/* Weather/Duration Icons */}
        {(tour.weather || tour.duration) && (
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/70">
            {tour.weather && (
              <div className="flex items-center gap-1.5">
                {tour.icon && React.createElement(tour.icon, { className: "w-3 h-3 sm:w-4 sm:h-4" })}
                <span>{tour.weather}</span>
              </div>
            )}
            {tour.duration && (
              <div className="flex items-center gap-1.5">
                {tour.duration}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const HotTours = () => {
  const navigate = useNavigate();
  // --- State & Data ---
  const [tours, setTours] = useState([
    {
      id: 1,
      name: "Classic Italy",
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$1,200",
      weather: "+24°",
      duration: "10 days",
      icon: Sun
    },
    {
      id: 2,
      name: "Discover Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$2,500",
      weather: "+18°",
      duration: "14 days",
      icon: Cloud
    },
    {
      id: 3,
      name: "Great Barrier Reef",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$3,400",
      weather: "+28°",
      duration: "9 days",
      icon: Sun
    },
    {
      id: 4,
      name: "Iceland Lights",
      image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$2,200",
      weather: "-5°",
      duration: "7 days",
      icon: Cloud
    },
    {
      id: 5,
      name: "Machu Picchu",
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$1,800",
      weather: "+20°",
      duration: "12 days",
      icon: Sun
    },
    {
      id: 6,
      name: "Thai Beaches",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$900",
      weather: "+30°",
      duration: "10 days",
      icon: Sun
    }
  ]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [animationLayer, setAnimationLayer] = useState([]);

  // Refs for the 4 static DOM slots
  const slotRefs = useRef([]);

  // --- Animation Logic ---

  const handleNext = () => {
    if (isAnimating) return;

    // 1. Measure current slots
    const slots = slotRefs.current;
    const rects = slots.map(slot => slot.getBoundingClientRect());

    // 2. Define the Actors
    const visible = tours.slice(0, 4);
    const nextTour = tours[4] || tours[0];

    const layerItems = [
      // Actor 0: Current First Card -> Exits Left
      {
        tour: visible[0],
        startRect: rects[0],
        endRect: { ...rects[0], left: rects[0].left - 400, opacity: 0 },
        key: 'exit-0'
      },
      // Actor 1: Current Second Card -> Moves to Slot 1
      {
        tour: visible[1],
        startRect: rects[1],
        endRect: rects[0],
        key: 'move-1'
      },
      // Actor 2: Current Third Card -> Moves to Slot 2
      {
        tour: visible[2],
        startRect: rects[2],
        endRect: rects[1],
        key: 'move-2'
      },
      // Actor 3: Current Fourth Card -> Moves to Slot 3
      {
        tour: visible[3],
        startRect: rects[3],
        endRect: rects[2],
        key: 'move-3'
      },
      // Actor 4: Incoming Card -> Moves into Slot 4
      {
        tour: nextTour,
        startRect: { ...rects[3], left: window.innerWidth + 100 },
        endRect: rects[3],
        key: 'enter-4'
      }
    ];

    // 3. Lock interactions and Show Overlay
    setIsAnimating(true);
    setAnimationLayer(layerItems);
  };

  const handlePrev = () => {
    if (isAnimating) return;

    // 1. Measure current slots
    const slots = slotRefs.current;
    const rects = slots.map(slot => slot.getBoundingClientRect());

    // 2. Define the Actors for Previous
    const visible = tours.slice(0, 4);
    const prevTour = tours[tours.length - 1];

    const layerItems = [
      // Actor 0: Incoming Card from Left -> Moves into Slot 0
      {
        tour: prevTour,
        startRect: { ...rects[0], left: -400 },
        endRect: rects[0],
        key: 'enter-0'
      },
      // Actor 1: Current First Card -> Moves to Slot 2
      {
        tour: visible[0],
        startRect: rects[0],
        endRect: rects[1],
        key: 'move-1'
      },
      // Actor 2: Current Second Card -> Moves to Slot 3
      {
        tour: visible[1],
        startRect: rects[1],
        endRect: rects[2],
        key: 'move-2'
      },
      // Actor 3: Current Third Card -> Moves to Slot 4
      {
        tour: visible[2],
        startRect: rects[2],
        endRect: rects[3],
        key: 'move-3'
      },
      // Actor 4: Current Fourth Card -> Exits Right
      {
        tour: visible[3],
        startRect: rects[3],
        endRect: { ...rects[3], left: window.innerWidth + 100, opacity: 0 },
        key: 'exit-4'
      }
    ];

    // 3. Lock interactions and Show Overlay
    setIsAnimating(true);
    setAnimationLayer(layerItems);
  };

  // --- Effect to Run GSAP Animations ---
  useLayoutEffect(() => {
    if (animationLayer.length === 0) return;

    const finishAnimation = () => {
      // Determine direction based on animation layer keys
      const isNext = animationLayer.some(item => item.key === 'exit-0');

      // Rotate Data
      setTours(prev => {
        const newTours = [...prev];
        if (isNext) {
          const first = newTours.shift();
          newTours.push(first);
        } else {
          const last = newTours.pop();
          newTours.unshift(last);
        }
        return newTours;
      });

      // Remove Overlay
      setAnimationLayer([]);
      setIsAnimating(false);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finishAnimation });
      animationLayer.forEach((item) => {
        const element = document.getElementById(`anim-card-${item.key}`);
        if (element) {
          tl.fromTo(
            element,
            {
              top: item.startRect.top,
              left: item.startRect.left,
              width: item.startRect.width,
              height: item.startRect.height,
              opacity: item.startRect.opacity ?? 1
            },
            {
              top: item.endRect.top,
              left: item.endRect.left,
              width: item.endRect.width,
              height: item.endRect.height,
              opacity: item.endRect.opacity ?? 1,
              duration: 0.8,
              ease: "power2.inOut"
            },
            0
          );
        }
      });
    });
    return () => ctx.revert();
  }, [animationLayer]);

  // --- Render ---
  const visibleTours = tours.slice(0, 4);

  return (
    <section className="min-h-screen font-sans text-slate-900 overflow-hidden relative selection:bg-blue-100 py-2 sm:py-4 md:py-6" style={{ backgroundColor: '#faf9f6' }}>

      {/* Background Dashed Line - Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path
            d="M-100,200 C200,100 400,300 600,250 S900,100 1200,150 S1500,400 1600,500"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="10,10"
          />
          <path
            d="M-100,800 C100,750 300,850 600,800 S1000,700 1500,850"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="10,10"
          />
        </svg>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">

        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12 relative">
          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-slate-800 flex flex-wrap items-center gap-3 sm:gap-4">
              <span>Hot</span>
              <span className="bg-white px-6 sm:px-8 py-2 rounded-full shadow-sm text-slate-900 inline-block transform -rotate-1">
                Tours
              </span>
            </h1>

            <div className="max-w-md">
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base md:text-lg">
                Discover amazing destinations with our curated hot tour packages
              </p>
            </div>
          </div>
        </div>

        {/* Cards Layout - Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-7 h-auto md:h-[500px] lg:h-[550px] items-center relative" style={{ opacity: isAnimating ? 0 : 1 }}>

          {/* Card 1 (Left, Tall) */}
          <div ref={el => slotRefs.current[0] = el} onClick={() => navigate(`/detail/${visibleTours[0]?.id}`)} className="md:col-span-3 h-[350px] sm:h-[380px] md:h-[450px] lg:h-[500px] self-end relative group cursor-pointer">
            <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2" style={{ backgroundColor: '#faf9f6' }}>
              <img
                src={visibleTours[0]?.image}
                alt={visibleTours[0]?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 sm:top-4 md:top-5 right-4 sm:right-4 md:right-5 bg-white/20 backdrop-blur-md p-2 sm:p-2.5 rounded-full text-white">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-5 sm:left-6 md:left-8 text-white">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 uppercase tracking-wide">{visibleTours[0]?.name}</h3>
                <p className="text-white/80 text-xs sm:text-sm md:text-base mb-2 sm:mb-3">from {visibleTours[0]?.price}</p>
                {visibleTours[0]?.weather && (
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/70">
                    <div className="flex items-center gap-1.5">
                      {visibleTours[0].icon && React.createElement(visibleTours[0].icon, { className: "w-4 h-4" })}
                      <span>{visibleTours[0].weather}</span>
                    </div>
                    {visibleTours[0]?.duration && <div className="flex items-center gap-1.5">{visibleTours[0].duration}</div>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle Cluster */}
          <div className="md:col-span-6 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 h-full relative">

            {/* Card 2 (Middle Left, Small Square, Lower) */}
            <div ref={el => slotRefs.current[1] = el} onClick={() => navigate(`/detail/${visibleTours[1]?.id}`)} className="flex-1 md:mt-24 h-[250px] sm:h-[280px] md:h-[320px] lg:h-[350px] relative group cursor-pointer">
              <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2" style={{ backgroundColor: '#faf9f6' }}>
                <img
                  src={visibleTours[1]?.image}
                  alt={visibleTours[1]?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 sm:top-4 md:top-5 right-4 sm:right-4 md:right-5 bg-white/20 backdrop-blur-md p-2 sm:p-2.5 rounded-full text-white">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="absolute bottom-5 sm:bottom-6 md:bottom-7 left-5 sm:left-6 md:left-7 text-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5">{visibleTours[1]?.name}</h3>
                  <p className="text-white/80 text-xs sm:text-sm mb-2">from {visibleTours[1]?.price}</p>
                  {visibleTours[1]?.weather && (
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/70">
                      {visibleTours[1].icon && React.createElement(visibleTours[1].icon, { className: "w-3 h-3 sm:w-4 sm:h-4" })}
                      <span>{visibleTours[1].weather}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card 3 (Middle Right, Landscape, Higher) */}
            <div ref={el => slotRefs.current[2] = el} onClick={() => navigate(`/detail/${visibleTours[2]?.id}`)} className="flex-1 md:mb-24 h-[250px] sm:h-[280px] md:h-[300px] lg:h-[330px] relative group cursor-pointer self-center md:self-start">
              <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2" style={{ backgroundColor: '#faf9f6' }}>
                <img
                  src={visibleTours[2]?.image}
                  alt={visibleTours[2]?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 sm:top-4 md:top-5 right-4 sm:right-4 md:right-5 bg-white/20 backdrop-blur-md p-2 sm:p-2.5 rounded-full text-white">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="absolute bottom-5 sm:bottom-6 md:bottom-7 left-5 sm:left-6 md:left-7 text-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5">{visibleTours[2]?.name}</h3>
                  <p className="text-white/80 text-xs sm:text-sm">from {visibleTours[2]?.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 (Right, Tall) */}
          <div ref={el => slotRefs.current[3] = el} onClick={() => navigate(`/detail/${visibleTours[3]?.id}`)} className="md:col-span-3 h-[350px] sm:h-[380px] md:h-[480px] lg:h-[530px] relative group cursor-pointer">
            <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2" style={{ backgroundColor: '#faf9f6' }}>
              <img
                src={visibleTours[3]?.image}
                alt={visibleTours[3]?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 sm:top-4 md:top-5 right-4 sm:right-4 md:right-5 bg-white/20 backdrop-blur-md p-2 sm:p-2.5 rounded-full text-white">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-5 sm:left-6 md:left-8 text-white">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5">{visibleTours[3]?.name}</h3>
                <p className="text-white/80 text-xs sm:text-base md:text-base">from {visibleTours[3]?.price}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Animation Overlay Layer */}
        {animationLayer.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {animationLayer.map((item) => (
              <div
                key={item.key}
                id={`anim-card-${item.key}`}
                className="absolute"
                style={{
                  position: 'fixed',
                  top: item.startRect.top,
                  left: item.startRect.left,
                  width: item.startRect.width,
                  height: item.startRect.height,
                  zIndex: 9999
                }}
              >
                <TourCard tour={item.tour} className="w-full h-full" />
              </div>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mt-8 sm:mt-10 md:mt-12">
          <button
            onClick={handlePrev}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-slate-800 shadow-md flex items-center justify-center text-white hover:bg-slate-700 hover:scale-105 transition-all"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>

      </main>
    </section>
  );
};

export default HotTours;
