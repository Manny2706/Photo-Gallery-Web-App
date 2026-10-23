import React from 'react';

/**
 * SearchBar component for Requirement 4.
 * Real-time client-side search input filtering photos by author name.
 * 
 * Props:
 * - value: Current search query string
 * - onChange: Handler function (wrapped in useCallback in parent)
 * - onClear: Handler to reset search query
 * - totalCount: Total number of fetched photos
 * - filteredCount: Number of photos matching current filter
 */
export default function SearchBar({
  value,
  onChange,
  onClear,
  totalCount,
  filteredCount,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          id="author-search"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search photos by author name (e.g., Alejandro, Paul)..."
          className="w-full pl-11 pr-24 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 shadow-sm transition-all text-base"
        />

        {/* Right action area: Clear button & count */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
          {value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search query"
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Quick badge */}
          {totalCount > 0 && (
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg select-none">
              {filteredCount}/{totalCount}
            </span>
          )}
        </div>
      </div>

      {/* Helper text showing active filter info */}
      {value.trim() && (
        <p className="mt-2 text-xs text-slate-600 px-1">
          Filtering photos by author name containing{' '}
          <span className="font-semibold text-slate-700">"{value}"</span>
        </p>
      )}
    </div>
  );
}
