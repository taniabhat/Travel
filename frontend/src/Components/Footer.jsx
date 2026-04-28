import React from 'react';
import { Globe, Leaf, User, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-screen bg-slate-50 pb-3 sm:pb-4 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1D32] rounded-[2.5rem] text-white p-10 sm:p-12 md:p-16 lg:p-20">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 mb-12">
          
          {/* Left: Globe */}
          <div className="flex items-center gap-2 self-start md:self-start">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/5">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium opacity-60">IN</span>
          </div>

          {/* Center: Logo & Nav */}
          <div className="flex flex-col items-center gap-6">
            <Leaf className="w-8 h-8 text-white" />
            <div className="flex items-center gap-6 sm:gap-8 text-sm sm:text-base font-medium text-white/90">
              <a href="#" className="hover:text-white transition-colors">Tours</a>
              <a href="#" className="hover:text-white transition-colors">Countries</a>
              <a href="#" className="hover:text-white transition-colors">For Tourists</a>
            </div>
          </div>

          {/* Right: User */}
          <div className="self-end md:self-start">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/5">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Row: Info Pills */}
        <div className="flex flex-wrap justify-center md:justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-white/80">
          
          {/* Location */}
          <div className="flex items-center gap-3 bg-white/5 px-4 sm:px-5 py-3 rounded-full backdrop-blur-sm border border-white/5">
            <MapPin className="w-4 h-4 opacity-60" />
            <span>Delhi, India</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-white/5 px-4 sm:px-5 py-3 rounded-full backdrop-blur-sm border border-white/5">
            <Mail className="w-4 h-4 opacity-60" />
            <span>info@travel.in</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 bg-white/5 px-4 sm:px-5 py-3 rounded-full backdrop-blur-sm border border-white/5">
            <Phone className="w-4 h-4 opacity-60" />
            <span className="tracking-wide">+91 6201925034</span>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Way.Farer. All rights reserved.
        </div>

      </div>
      </div>
    </footer>
  );
};

export default Footer;
