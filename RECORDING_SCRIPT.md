# 5-Minute Screen Recording Cheat Sheet & Script

This guide provides the exact talking points and demonstration flow for your 5-minute video submission required for the Celebrare Frontend Internship.

---

## ⏱️ Video Breakdown (Total: ~4–5 minutes)

| Segment | Topic | Target Time | Key Files to Show |
|---|---|---|---|
| **Part 1** | App Demonstration | 0:00 – 1:15 (75s) | Browser (`http://localhost:5173`) |
| **Part 2** | `useFetchPhotos` Hook | 1:15 – 2:00 (45s) | `src/hooks/useFetchPhotos.js` |
| **Part 3** | `useReducer` for Favourites | 2:00 – 3:00 (60s) | `src/reducers/favouritesReducer.js` |
| **Part 4** | `useCallback` + `useMemo` | 3:00 – 4:00 (60s) | `src/components/Gallery.jsx` |
| **Part 5** | The Difficult Part & Solution | 4:00 – 4:45 (45s) | Code walkthrough / Browser DevTools |
| **Wrap-up** | Closing statement | 4:45 – 5:00 (15s) | Browser |

---

## 🎬 Minute-by-Minute Script

### Part 1: Show the App Working (0:00 - 1:15)
**Screen to show:** Browser at `http://localhost:5173`

> *"Hello everyone! Today I'm presenting my submission for the Celebrare Frontend React Internship pre-screening assignment. Here is our Photo Gallery Web App built with React, Vite, and Tailwind CSS."*

1. **Show Photos Loading & Grid:**
   - Refresh the page to demonstrate the initial fetch.
   - Mention: *"On load, we fetch 30 photos from the Picsum Photos API. The layout is fully responsive: on desktop we have 4 columns, on tablet 2 columns, and on mobile 1 column."*
2. **Demonstrate Real-Time Search:**
   - Type `"Alejandro"` into the search input at the top.
   - Mention: *"As I type, the photos filter in real-time by photographer name without any page reload or additional API calls. We can see 15 matching items. When I click the clear button, it immediately resets to all 30 photos."*
3. **Demonstrate Favourites & LocalStorage Persistence:**
   - Click the heart icon on the first card and the second card.
   - Mention: *"Clicking the heart icon marks a photo as favourite. The heart turns red, a 'Favourite' badge appears, and the header badge increments to 2."*
   - Refresh the browser page (`F5` or `Ctrl+R`).
   - Mention: *"Notice that after refreshing the page, both photos remain favorited and the counter stays at 2 because our state persists in localStorage."*

---

### Part 2: Open `useFetchPhotos` Hook (1:15 - 2:00)
**Screen to show:** `src/hooks/useFetchPhotos.js` in VS Code / IDE

**Question:** *Read out the hook and explain: what does it return, and what happens if the API fails?*

> *"Now let's look at the custom hook `useFetchPhotos`.
>
> 1. **What it returns:** It returns an object containing `photos` (the array of fetched items), `loading` (a boolean flag), and `error` (a string or null), plus a `refetch` callback for retries.
> 2. **What happens if the API fails:** If the fetch fails (for example, if the server returns a non-200 status or a network drop occurs), our `try...catch` block catches the error, sets `loading` to `false`, and stores the error message in the `error` state. In our UI, this immediately renders the `ErrorState` component with a clear alert message and a 'Try Again' button, ensuring the user is never left with a blank or broken screen."*

---

### Part 3: Open `useReducer` Code (2:00 - 3:00)
**Screen to show:** `src/reducers/favouritesReducer.js`

**Question:** *Explain: what actions does your reducer handle? Why did you choose useReducer instead of useState here?*

> *"Here is our `favouritesReducer.js`.
>
> 1. **Actions Handled:** Our reducer handles the `TOGGLE_FAVOURITE` action (which toggles an ID in the list: adding it if not present, filtering it out if present) and a `CLEAR_ALL` action.
> 2. **Why `useReducer` instead of `useState`:**
>    - **Separation of Concerns:** It decouples the state transition logic from the UI components. All business logic for adding, removing, and validating favourites lives in one pure reducer function.
>    - **Predictability & Scalability:** As our app grows with more complex state actions (such as bulk favoriting, sorting, or syncing with an external backend), `useReducer` makes state transitions completely predictable and easy to test.
>    - **Persistence Integration:** We use a lazy initializer function `initFavourites` passed to `useReducer` to safely read existing favourites from `localStorage` once on mount, and our reducer synchronizes updates directly to `localStorage`."*

---

### Part 4: Open `useCallback` and `useMemo` (3:00 - 4:00)
**Screen to show:** `src/components/Gallery.jsx`

**Question:** *Explain in plain words: what problem does each one solve in your code? What would break if you removed them?*

> *"In `src/components/Gallery.jsx`, we use both `useCallback` and `useMemo` for performance optimization:
>
> 1. **`useCallback` on `handleSearchChange`:**
>    - **Problem solved:** In React, functions defined inside a component are re-instantiated on every single render. Wrapping `handleSearchChange` in `useCallback` memoizes the function reference so it remains identical across renders.
>    - **What would happen if removed:** Every time `Gallery` re-renders (for example, when a user toggles a favourite), a brand new function reference would be passed to `SearchBar`, breaking reference equality and forcing the search bar to re-render unnecessarily.
>
> 2. **`useMemo` on `filteredPhotos`:**
>    - **Problem solved:** `useMemo` memoizes the computed array of filtered photos based on `[photos, searchQuery]`.
>    - **What would happen if removed:** Without `useMemo`, every single render of `Gallery` (such as clicking the heart icon on any photo) would force JavaScript to re-run the `.filter()` method over the 30-item array, even though the search query didn't change at all. `useMemo` guarantees that the filter only re-runs when the query or photos actually change."*

---

### Part 5: One Thing That Was Difficult & How You Solved It (4:00 - 4:45)
**Screen to show:** `src/reducers/favouritesReducer.js` or `src/components/PhotoCard.jsx`

**Question:** *Pick one part that took you time to figure out. Explain what the problem was and how you solved it.*

> *"One challenge was ensuring robust `localStorage` synchronization with `useReducer` without causing race conditions or hydration issues.
>
> - **The Problem:** If you initialize state synchronously without a lazy initializer, reading `localStorage` during every render slows down the initial mount. Furthermore, if invalid or corrupted JSON exists in the browser's storage, the app could crash with a JSON parse exception.
> - **How I Solved It:** I created a dedicated `initFavourites()` function and passed it as the 3rd argument (the lazy initializer) to `useReducer`. This ensures `localStorage` is only accessed once during initialization. I wrapped it in a safe `try...catch` block with a fallback to an empty array `[]`. Additionally, inside the reducer's `TOGGLE_FAVOURITE` case, we immediately persist the updated array back to `localStorage`, guaranteeing seamless state synchronization across page refreshes."*

---

### Closing (4:45 - 5:00)
> *"Thank you for your time and for reviewing my submission. I look forward to the next steps!"*
