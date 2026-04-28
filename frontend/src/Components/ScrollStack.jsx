import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from './Card';

gsap.registerPlugin(ScrollTrigger);

const ServicesScroll = () => {
  const containerRef = useRef(null);

  const services = [
    {
      id: "01",
      title: ["CUSTOM", "ITINERARIES"],
      description: "We craft personalized travel experiences tailored to your unique preferences and style.",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop"
    },
    {
      id: "02",
      title: ["LUXURY", "TRANSPORT"],
      description: "Travel in comfort and style with our premium fleet of vehicles and private jets.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&h=600&fit=crop"
    },
    {
      id: "03",
      title: ["GUIDED", "EXPEDITIONS"],
      description: "Explore the world's hidden gems with our expert local guides and curators.",
      image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&h=600&fit=crop"
    },
    {
      id: "04",
      title: ["CULTURAL", "IMMERSION"],
      description: "Connect deeply with local cultures through authentic and respectful interactions.",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&h=600&fit=crop"
    },
    {
      id: "05",
      title: ["24/7", "SUPPORT"],
      description: "Peace of mind with our round-the-clock concierge and emergency assistance.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop"
    },
    {
      id: "06",
      title: ["Ready to", "Explore?"],
      description: "Start your journey today. Browse our curated packages or contact us for a custom quote.",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=600&fit=crop",
      hasCard: true
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.service-row');

      rows.forEach((row, index) => {
        // Pin all cards except the last one
        // The last card (section 6) will scroll normally
        if (index < rows.length - 1) {
          gsap.to(row, {
            scale: 0.95,
            scrollTrigger: {
              trigger: row,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              pin: true,
              pinSpacing: false,
              scrub: 0.5,
              anticipatePin: 1
            }
          });
        }

        // Content reveal animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });

        // 1. Draw the line
        tl.from(row.querySelector('.separator'), {
          scaleX: 0,
          duration: 0.8,
          ease: "power2.inOut",
          transformOrigin: "left"
        })

          // 2. Lift the Content
          .from(row.querySelectorAll('.anim-text'), {
            y: '100%',
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
          }, "-=0.4");
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#faf9f6] text-black font-playfair opacity-0 animate-fade-in" style={{ opacity: 1, transition: 'opacity 0.5s ease' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Space+Mono&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-space { font-family: 'Space Mono', monospace; }
        .overflow-hidden { overflow: hidden; }
        .service-row {
          transform-origin: center top;
        }
      `}</style>

      {/* Header Spacer */}
      <div className="px-6 py-24 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <h1 className="font-space text-xs tracking-widest uppercase opacity-60">
          Our Services
        </h1>
      </div>

      {/* Stacking Cards Container */}
      <div className="relative w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-row w-full bg-[#faf9f6] flex flex-col justify-start overflow-hidden"
            style={{
              zIndex: index === services.length - 1 ? 999 : index + 1,
              minHeight: '50vh',
              paddingTop: '2rem',
              position: 'relative'
            }}
          >
            <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full h-full relative">

              {/* Separator Line (The only line remaining) */}
              <div className="separator absolute top-0 left-0 w-full h-[1px] bg-gray-300 transform origin-left"></div>

              {service.hasCard ? (
                /* Section 6 - Title and Card */
                <div className="w-full pt-2 md:pt-6">
                  <div className="mb-8 md:mb-12">
                    <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-black">
                      {service.title.map((line, i) => (
                        <div key={i} className="overflow-hidden">
                          <span className="anim-text block">
                            {line}
                          </span>
                        </div>
                      ))}
                    </h2>
                  </div>
                  <Card />
                </div>
              ) : (
                /* Other sections - Normal layout */
                <div className="flex flex-col md:flex-row items-start pt-2 md:pt-6">
                  {/* Number Column */}
                  <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <div className="overflow-hidden">
                      <span className="anim-text block font-playfair text-5xl md:text-7xl font-light tracking-tight text-black">
                        {service.id}
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="w-full md:w-3/4 flex flex-col pl-0 md:pl-10">

                    {/* Title */}
                    <div className="mb-6 md:mb-12">
                      <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-black">
                        {service.title.map((line, i) => (
                          <div key={i} className="overflow-hidden">
                            <span className="anim-text block">
                              {line}
                            </span>
                          </div>
                        ))}
                      </h2>
                    </div>

                    {/* Description */}
                    <div className="max-w-md overflow-hidden mt-auto pb-4">
                      <p className="anim-text font-space text-xs md:text-sm uppercase leading-relaxed tracking-wide text-gray-500">
                        {service.description}
                      </p>
                    </div>

                    {/* Horizontal Image - Only for non-last sections */}
                    {service.image && (
                      <div className="w-full mt-4 overflow-hidden rounded-2xl">
                        <img
                          src={service.image}
                          alt={service.title[0]}
                          className="w-full h-48 md:h-64 lg:h-80 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}      </div>
    </div>
  );
};

export default ServicesScroll;