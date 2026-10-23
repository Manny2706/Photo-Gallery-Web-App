import React from 'react';

/**
 * LoadingSpinner component for Requirement 2.
 * Displays while photos are being fetched from Picsum Photos API.
 */
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4" role="status" aria-live="polite">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-rose-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-base font-medium text-slate-600">Loading stunning photos...</p>
      <span className="sr-only">Loading photos...</span>
    </div>
  );
}
