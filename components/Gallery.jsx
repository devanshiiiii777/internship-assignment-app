import React, { useState, useReducer, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favoritesReducer, initialState } from "../favoritesReducer";

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos(); // [cite: 47]
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, dispatch] = useReducer(favoritesReducer, initialState); // [cite: 40]

  // Requirement: useCallback for search handler 
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Requirement: useMemo for filtering 
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => 
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]);

  if (loading) return <div className="text-center p-10 font-bold">Loading...</div>; // [cite: 20]
  if (error) return <div className="text-center p-10 text-red-500 font-bold">Error: {error}</div>; // [cite: 20]

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search Bar [cite: 35] */}
      <input
        type="text"
        placeholder="Search by author..."
        className="w-full p-3 mb-8 border border-gray-300 rounded-lg shadow-sm"
        onChange={handleSearch}
      />

      {/* Responsive Grid: Desktop 4, Tablet 2, Mobile 1  */}
     // The Grid Container (4 columns desktop, 2 tablet, 1 mobile)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {filteredPhotos.map(photo => (
    <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-md border">
      {/* The Image Container - Prevents massive images */}
      <div className="aspect-square w-full overflow-hidden bg-gray-200">
        <img 
          src={photo.download_url} 
          className="w-full h-full object-cover" 
          alt={photo.author} 
        />
      </div>
      <div className="p-4 flex justify-between items-center">
        <p className="truncate font-medium">{photo.author}</p>
        <button className="text-2xl">❤️</button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Gallery;