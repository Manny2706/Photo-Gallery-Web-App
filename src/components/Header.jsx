import React from 'react';

/**
 * Header component displaying the app title, description, and favourites counter.
 */
export default function Header({ favouritesCount = 0 }) {
  return (
    <header className="pt-10 pb-6 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-4">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
        Celebrare Frontend Assignment
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">Gallery</span>
      </h1>

      <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto px-4">
        Explore high-resolution photographs, filter by photographer name in real-time, and save your favourite shots.
      </p>

      {/* Favourites Badge */}
      <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600 bg-white shadow-sm border border-slate-200/80 px-3.5 py-1.5 rounded-full">
        <svg
          className={`w-4 h-4 ${favouritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-400 fill-none'}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="font-semibold text-slate-800">{favouritesCount}</span>
        <span>{favouritesCount === 1 ? 'favourite' : 'favourites'} marked</span>
      </div>
    </header>
  );
}
