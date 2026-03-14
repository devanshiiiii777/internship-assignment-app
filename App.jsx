import React, { useState, useReducer, useEffect, useMemo, useCallback } from 'react';

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      const exists = state.find(f => f.id === action.payload.id);
      const newState = exists ? state.filter(f => f.id !== action.payload.id) : [...state, action.payload];
      localStorage.setItem('intern_favs', JSON.stringify(newState));
      return newState;
    default: return state;
  }
};

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [favorites, dispatch] = useReducer(favoritesReducer, JSON.parse(localStorage.getItem('intern_favs')) || []);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?limit=30')
      .then(res => res.json())
      .then(data => { setPhotos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = useCallback((e) => setSearch(e.target.value), []);
  const filtered = useMemo(() => photos.filter(p => p.author.toLowerCase().includes(search.toLowerCase())), [photos, search]);

  if (loading) return <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px', fontSize: '24px'}}>Loading Gallery...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>Photo Gallery Assignment</h1>
        
        <input 
          type="text" 
          placeholder="Search by author..." 
          onChange={handleSearch}
          style={{ width: '100%', padding: '15px', marginBottom: '30px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />

        {/* This style forces the 4-column grid on your laptop */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {filtered.map(photo => (
            <div key={photo.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '100%', height: '250px', overflow: 'hidden' }}>
                <img 
                  src={photo.download_url} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  alt={photo.author} 
                />
              </div>
              <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                  {photo.author}
                </span>
                <button 
                  onClick={() => dispatch({type: 'TOGGLE', payload: photo})}
                  style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                >
                  {favorites.some(f => f.id === photo.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;