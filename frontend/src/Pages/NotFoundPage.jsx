import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center px-4 font-playfair text-slate-900">
      {/* Decorative compass */}
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
        <Compass className="w-12 h-12 text-slate-400 animate-[spin_8s_linear_infinite]" />
      </div>

      {/* 404 number */}
      <h1 className="text-8xl sm:text-9xl font-light tracking-tight text-slate-200 select-none mb-2">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl sm:text-3xl font-medium text-slate-800 mb-3 text-center">
        Lost in the wilderness
      </h2>
      <p className="text-slate-500 text-base sm:text-lg max-w-md text-center mb-10 font-space">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg shadow-slate-900/20 text-sm font-space"
        >
          Back to Home
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-space"
        >
          <MapPin className="w-4 h-4" />
          Browse Tours
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
