import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import Navbar from '../Components/Navbar';
import ScrollFloat from '../Components/ScrollFloat';
import HotTours from '../Components/HotTours';
import ScrollStack from '../Components/ScrollStack';
import Footer from '../Components/Footer';

const WayFarer = () => {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#faf9f6] font-playfair text-slate-900">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-24 sm:pt-28 md:pt-32">

        {/* Hero Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 pt-8 sm:pt-12 lg:pt-16 xl:pt-20 items-end">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-light tracking-tight leading-[1.1] text-slate-900">
              Your Next <br />
              Adventure Awaits
            </h1>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start gap-4 sm:gap-6 pb-1 sm:pb-2">
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md font-space">
              Explore stunning destinations, unique experiences, and unforgettable journeys with WayFarer.
            </p>
            <Link to="/products" className="bg-slate-800 hover:bg-slate-900 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-colors shadow-lg shadow-slate-900/20 text-sm sm:text-base font-space inline-block text-center">
              Explore Now
            </Link>
          </div>
        </div>

        {/* Hero Image & Floating Card Container */}
        <div className="relative w-full flex-1 min-h-[400px] sm:min-h-[500px] flex flex-col justify-end pb-4 sm:pb-6 lg:pb-8">
          {/* Large Landscape Image */}
          <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Mountain Landscape"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for better text contrast if needed, though design is clean */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Floating Search/Booking Bar */}
          <div className="relative mt-[-2.5rem] sm:mt-[-3rem] lg:mt-[-3.5rem] mx-2 sm:mx-4 lg:mx-auto lg:max-w-5xl xl:max-w-6xl bg-white rounded-xl sm:rounded-2xl lg:rounded-[2rem] shadow-xl p-3 sm:p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-0 z-10">

            {/* Location Item */}
            <div className="flex items-start gap-3 sm:gap-4 w-full md:w-auto md:px-2 lg:px-4">
              <div className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 bg-slate-50 rounded-full shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[0.65rem] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Location</span>
                <span className="font-medium text-slate-800 text-sm sm:text-base truncate">Rinjani, Indonesia</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-10 lg:h-12 bg-slate-100"></div>

            {/* Check In Item */}
            <div className="flex items-start gap-3 sm:gap-4 w-full md:w-auto md:px-2 lg:px-4">
              <div className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 bg-slate-50 rounded-full shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[0.65rem] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Check In</span>
                <span className="font-medium text-slate-800 text-sm sm:text-base truncate">27, January 2025</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-10 lg:h-12 bg-slate-100"></div>

            {/* Check Out Item */}
            <div className="flex items-start gap-3 sm:gap-4 w-full md:w-auto md:px-2 lg:px-4">
              <div className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 bg-slate-50 rounded-full shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[0.65rem] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Check Out</span>
                <span className="font-medium text-slate-800 text-sm sm:text-base truncate">30, January 2025</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-10 lg:h-12 bg-slate-100"></div>

            {/* People Item */}
            <div className="flex items-start gap-3 sm:gap-4 w-full md:w-auto md:px-2 lg:px-4">
              <div className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 bg-slate-50 rounded-full shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[0.65rem] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">People</span>
                <span className="font-medium text-slate-800 text-sm sm:text-base truncate">4 People, 1 Child</span>
              </div>
            </div>

            {/* Search Button */}
            <Link to="/products" className="w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white p-3 sm:p-4 rounded-full transition-colors shadow-lg flex items-center justify-center md:ml-2 lg:ml-4">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>

          </div>
        </div>
      </main>

      {/* Scroll Reveal Section */}
      <section className="w-full py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-0 sm:space-y-1">
            <ScrollFloat
              containerClassName="text-center"
              textClassName="font-medium text-slate-900 tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              animationDuration={1.2}
              ease="back.inOut(2)"
              scrollStart="top bottom-=20%"
              scrollEnd="center center"
              stagger={0.04}
            >
              Welcome to
            </ScrollFloat>
            <ScrollFloat
              containerClassName="text-center"
              textClassName="font-medium text-slate-900 tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              animationDuration={1.2}
              ease="back.inOut(2)"
              scrollStart="top bottom-=20%"
              scrollEnd="center center"
              stagger={0.04}
            >
              North-East Tourism
            </ScrollFloat>
          </div>
        </div>
      </section>

      {/* Hot Tours Section */}
      <HotTours />

      {/* Scroll Stack Section */}
      <ScrollStack />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default WayFarer;