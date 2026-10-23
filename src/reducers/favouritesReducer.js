/**
 * Reducer for managing the Favourites state.
 * 
 * Requirement 5:
 * - Manage favourites list using useReducer — not useState.
 * - Favourited photos must persist across page refreshes using localStorage.
 * 
 * Actions Handled:
 * - TOGGLE_FAVOURITE: Toggles a photo ID in the favourites list (adds if not present, removes if present).
 * - CLEAR_ALL: Optional action to clear all favourites.
 */

export const STORAGE_KEY = 'photo_gallery_favourites';

export const FAVOURITES_ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
  CLEAR_ALL: 'CLEAR_ALL',
};

/**
 * Lazy initializer function for useReducer.
 * Safely reads existing favourites from localStorage on component mount.
 */
export function initFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse favourites from localStorage:', error);
    return [];
  }
}

/**
 * Pure reducer function for favourites state management.
 * 
 * @param {Array<string|number>} state - Array of favourited photo IDs
 * @param {Object} action - Action with type and payload
 * @returns {Array<string|number>} New state array
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.TOGGLE_FAVOURITE: {
      const photoId = action.payload;
      const isAlreadyFavourite = state.includes(photoId);

      const updatedState = isAlreadyFavourite
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];

      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      } catch (err) {
        console.error('Failed to persist favourites to localStorage:', err);
      }

      return updatedState;
    }

    case FAVOURITES_ACTIONS.CLEAR_ALL: {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error('Failed to clear favourites from localStorage:', err);
      }
      return [];
    }

    default:
      return state;
  }
}
