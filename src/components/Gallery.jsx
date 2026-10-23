import React, { useState, useReducer, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, initFavourites, FAVOURITES_ACTIONS } from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

/**
 * Gallery Component
 * 
 * Fulfills Requirements:
 * - Requirement 2: Displays loading spinner and error messages.
 * - Requirement 3: Responsive grid (desktop: 4 cols, tablet: 2 cols, mobile: 1 col).
 * - Requirement 4: Real-time search filter by author name without page reload or extra API calls.
 * - Requirement 5: useReducer for toggling favourites + persistence to localStorage.
 * - Requirement 6: Uses useFetchPhotos custom hook (does not fetch directly).
 * - Requirement 7: Uses useCallback on search handler and useMemo for filtered list.
 */
export default function Gallery({ onFavouritesChange }) {
  // Requirement 6: Fetch data using the custom hook
  const { photos, loading, error, refetch } = useFetchPhotos();

  // Requirement 5: Manage favourites via useReducer with localStorage initializer
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites);

  // Search filter state
  const [searchQuery, setSearchQuery] = useState('');

  // Notify parent of favourites count changes for Header badge
  React.useEffect(() => {
    if (onFavouritesChange) {
      onFavouritesChange(favourites.length);
    }
  }, [favourites, onFavouritesChange]);

  /**
   * Requirement 7: useCallback on the search filter handler.
   * 
   * Why: Preserves reference equality of this handler between renders.
   * Prevents unnecessary re-renders of the SearchBar component when other
   * states (like favourites) update.
   */
  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  /**
   * useCallback for clearing the search query.
   */
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  /**
   * useCallback for toggling favourites via dispatch.
   */
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({
      type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
      payload: photoId,
    });
  }, [dispatch]);

  /**
   * Requirement 7: useMemo to compute the filtered photo list.
   * 
   * Why: Avoids re-running the array filtering calculation on every render
   * (e.g. when toggling favourites on and off). It will only recompute when
   * either `photos` or `searchQuery` actually changes.
   */
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) {
      return photos;
    }
    const normalizedQuery = searchQuery.toLowerCase().trim();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedQuery)
    );
  }, [photos, searchQuery]);

  return (
    <div className="w-full">
      {/* Requirement 4: Search input at the top */}
      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        totalCount={photos.length}
        filteredCount={filteredPhotos.length}
      />

      {/* Requirement 2: Loading State */}
      {loading && <LoadingSpinner />}

      {/* Requirement 2: Error State */}
      {!loading && error && (
        <ErrorState message={error} onRetry={refetch} />
      )}

      {/* Loaded Content */}
      {!loading && !error && (
        <>
          {/* Empty Search Result State */}
          {filteredPhotos.length === 0 ? (
            <EmptyState searchQuery={searchQuery} onClear={handleClearSearch} />
          ) : (
            /* Requirement 3: Responsive Grid Layout */
            /* Desktop: 4 columns (lg:grid-cols-4)  */
            /* Tablet: 2 columns (md:grid-cols-2)   */
            /* Mobile: 1 column (grid-cols-1)       */
            <div
              id="photo-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favourites.includes(photo.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
