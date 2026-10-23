import React from 'react';

/**
 * EmptyState component displayed when the author search yields no matches.
 */
export default function EmptyState({ searchQuery, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 14a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-slate-800">No photos found</h3>
      <p className="mt-1 text-sm text-slate-600 max-w-sm">
        No photographers match <span className="font-medium text-slate-700">"{searchQuery}"</span>. Try searching with a different name.
      </p>

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
        >
          Clear search
        </button>
      )}
    </div>
  );
}
