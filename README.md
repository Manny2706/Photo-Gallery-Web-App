# Photo Gallery Web App — Celebrare Frontend Internship Assignment

A modern, responsive, and performant Photo Gallery Web Application built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Live Demo & Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation & Local Run
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```
Once started, visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✨ Implemented Requirements

| # | Requirement | Implementation Details |
|---|-------------|------------------------|
| **1** | **Project Setup** | Built with React + Vite, styled exclusively using Tailwind CSS (no external UI libraries like MUI, AntD, or Bootstrap). |
| **2** | **Fetch Photos from API** | Fetches 30 photos on load from `https://picsum.photos/v2/list?limit=30`. Features a smooth loading spinner during fetch and a resilient error banner with a retry button on failure. |
| **3** | **Responsive Grid** | Desktop: 4 columns (`lg:grid-cols-4`), Tablet: 2 columns (`md:grid-cols-2`), Mobile: 1 column (`grid-cols-1`). Each card displays the photo, author name, and an interactive heart icon. |
| **4** | **Search Filter** | Real-time client-side filter by author name as you type with zero page reload and zero redundant network calls. Includes an instant clear button and result counter. |
| **5** | **Favourites with useReducer** | Managed exclusively with `useReducer` (no `useState` for favourites state). Automatically persists to and initializes from `localStorage`. |
| **6** | **Custom Hook (`useFetchPhotos`)** | Encapsulates all data fetching, loading, and error state logic in `src/hooks/useFetchPhotos.js`. Returns `{ photos, loading, error }`. |
| **7** | **Performance Optimization** | `useCallback` memoizes the search handler reference. `useMemo` computes the filtered photo array to avoid recalculation during unrelated re-renders. |

---

## 🏛️ Project Structure

```
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Title, description & live favourites counter
│   │   ├── SearchBar.jsx       # Real-time search input with clear button
│   │   ├── Gallery.jsx         # Core gallery with useFetchPhotos, useReducer, useCallback & useMemo
│   │   ├── PhotoCard.jsx       # Card displaying photo, author, and heart button (React.memo)
│   │   ├── LoadingSpinner.jsx  # Loading spinner state
│   │   ├── ErrorState.jsx      # Error banner with retry mechanism
│   │   └── EmptyState.jsx      # Fallback UI when author search returns no matches
│   ├── hooks/
│   │   └── useFetchPhotos.js   # Custom hook returning { photos, loading, error }
│   ├── reducers/
│   │   └── favouritesReducer.js# Reducer handling TOGGLE_FAVOURITE + localStorage sync
│   ├── App.jsx                 # Root layout container
│   ├── index.css               # Tailwind CSS directives
│   └── main.jsx                # Application mount point
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.js              # Vite configuration
```

---

## 🧠 Technical Highlights

### 1. Custom Hook: `useFetchPhotos`
- Encapsulates network operations using `fetch` with an `AbortController` to prevent memory leaks and state updates if unmounted.
- Provides `{ photos, loading, error, refetch }`.

### 2. State Management with `useReducer`
- Utilizes an initializer function `initFavourites` for lazy initialization from `localStorage.getItem('photo_gallery_favourites')`.
- Handles `TOGGLE_FAVOURITE` predictably: adds the ID if absent, removes it if present, and synchronizes the change to `localStorage`.

### 3. Performance Optimization with `useCallback` & `useMemo`
- **`useCallback`**: Memoizes `handleSearchChange` and `handleToggleFavourite` to prevent recreating function instances across renders.
- **`useMemo`**: Wraps the `.filter()` operation on the photos array based on `searchQuery`, avoiding expensive recalculations when non-search states change.
