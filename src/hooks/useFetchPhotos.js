import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to fetch photos from Picsum Photos API.
 * 
 * Requirement 6:
 * - Must return: photos, loading, error.
 * - The Gallery component must use this hook — not fetch data directly.
 * 
 * Requirement 2:
 * - Fetches 30 photos on load from https://picsum.photos/v2/list?limit=30
 * - Handles loading and error states cleanly with abort cleanup.
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://picsum.photos/v2/list?limit=30', { signal });

      if (!response.ok) {
        throw new Error(`Failed to load photos (Status: ${response.status} ${response.statusText})`);
      }

      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      // Ignore AbortError when component unmounts
      if (err.name === 'AbortError') return;
      setError(err.message || 'Failed to fetch photos. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPhotos(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchPhotos]);

  // Also expose refetch so the error message UI can offer a retry button
  return { photos, loading, error, refetch: () => fetchPhotos() };
}

export default useFetchPhotos;
