import { useState, useEffect } from 'react';

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        // Requirement: Picsum API with 30 photos [cite: 18, 19]
        const response = await fetch('https://picsum.photos/v2/list?limit=30');
        if (!response.ok) throw new Error('Failed to fetch photos');
        const data = await response.ok ? await response.json() : [];
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error }; // Requirement: must return these three [cite: 47]
};

export default useFetchPhotos;