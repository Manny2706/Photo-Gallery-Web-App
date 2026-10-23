import React, { useState, memo } from 'react';

/**
 * PhotoCard component for Requirement 3.
 * Displays:
 * 1. The photo (with smooth loading skeleton)
 * 2. The author name
 * 3. The heart icon button (Requirement 5)
 * 
 * Wrapped in React.memo to prevent unnecessary re-renders when other cards update.
 */
function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Optimized image URL (600x400) for fast loading, fallback to download_url
  const primaryImageUrl = `https://picsum.photos/id/${photo.id}/600/400`;
  const fallbackImageUrl = photo.download_url;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col">
      {/* Photo Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {/* Loading skeleton placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
        )}

        <img
          src={imageError ? fallbackImageUrl : primaryImageUrl}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (!imageError) {
              setImageError(true);
            }
          }}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Floating Heart Button over image for quick access */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove photo by ${photo.author} from favourites` : `Add photo by ${photo.author} to favourites`}
          title={isFavourite ? 'Remove from favourites' : 'Mark as favourite'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400 ${
            isFavourite
              ? 'bg-white/95 text-rose-500 scale-105'
              : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white hover:scale-110'
          }`}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 active:scale-75 ${
              isFavourite ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-current'
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Card Details: Author Name and Favourite Status */}
      <div className="p-4 flex items-center justify-between gap-2 flex-1">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-0.5">
            Photographer
          </p>
          <h3
            className="text-base font-semibold text-slate-800 truncate group-hover:text-rose-600 transition-colors"
            title={photo.author}
          >
            {photo.author}
          </h3>
        </div>

        {/* Small badge indicating favourite state */}
        {isFavourite && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 bg-rose-50 px-2 py-1 rounded-full border border-rose-200/60 shrink-0">
            <svg className="w-3 h-3 fill-rose-500" viewBox="0 0 24 24">
              <path d="M12 21.23l-7.78-7.78a5.5 5.5 0 0 1 7.78-7.78L12 5.67l1.06-1.06a5.5 5.5 0 0 1 7.78 7.78L12 21.23z" />
            </svg>
            Favourite
          </span>
        )}
      </div>
    </div>
  );
}

export default memo(PhotoCard);
