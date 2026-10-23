import React, { useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';

/**
 * Root App Component
 * 
 * Sets up the page structure, maintains the favourites counter for the header,
 * and renders the Gallery.
 */
export default function App() {
  const [favouritesCount, setFavouritesCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Header */}
      <Header favouritesCount={favouritesCount} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Gallery onFavouritesChange={setFavouritesCount} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-600">
        <p>Celebrare Frontend Intern Pre-Screening Assignment &bull; Built with React, Vite &amp; Tailwind CSS</p>
      </footer>
    </div>
  );
}
