import { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard'; 
import FilterBar from '../components/FilterBar';

const API_URL = 'https://691ab9cd2d8d7855756fe42f.mockapi.io/resto'; 

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filterOpen, setFilterOpen] = useState('all');
  const [filterRating, setFilterRating] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');
  const [allCategories, setAllCategories] = useState([]);

  const [visibleCount, setVisibleCount] = useState(8);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); 
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        setRestaurants(data);
        const allCats = data.flatMap(resto => resto.categories || []);
        const uniqueCats = [...new Set(allCats)];
        setAllCategories(uniqueCats);
        setError(null); 
      } catch (err) {
        setError(err.message); 
        console.error("Gagal mengambil data:", err);
      } finally {
        setIsLoading(false); 
      }
    }
    fetchData();
  }, []); 

  useEffect(() => {
    setVisibleCount(8);
  }, [filterOpen, filterRating, filterCategory]);

  if (isLoading) {
    return <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '50px' }}>Loading data...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red', fontSize: '1.5rem', marginTop: '50px' }}>Error: {error}</p>;
  }

  const filteredRestaurants = restaurants.filter(resto => {
    if (filterOpen === 'open' && !resto.isOpen) return false;
    if (filterOpen === 'closed' && resto.isOpen) return false;
    if (filterRating > 0 && (resto.rating || 0) < filterRating) return false;
    if (filterCategory !== 'all' && !(resto.categories || []).includes(filterCategory)) return false;
    return true;
  });

  const restaurantsToDisplay = filteredRestaurants.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        paddingBottom: '20px', 
        marginBottom: '20px' 
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Restaurants</h1>
        <p style={{ maxWidth: '600px', lineHeight: '1.6', color: '#ccc' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <FilterBar
        filterOpen={filterOpen} setFilterOpen={setFilterOpen}
        filterRating={filterRating} setFilterRating={setFilterRating}
        filterCategory={filterCategory} setFilterCategory={setFilterCategory}
        allCategories={allCategories}
      />

      <h2 style={{ marginTop: '30px', marginBottom: '20px' }}>All Restaurants</h2>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center'
      }}>
        {restaurantsToDisplay.length > 0 ? (
          restaurantsToDisplay.map(resto => (
            <RestaurantCard key={resto.id} resto={resto} />
          ))
        ) : (
          <p style={{ marginTop: '20px', color: '#aaa' }}>Tidak ada restoran ditemukan dengan filter ini.</p>
        )}
      </div>

      {visibleCount < filteredRestaurants.length && (
        <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '50px' }}>
          <button 
            onClick={handleLoadMore}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ 
              padding: '12px 40px', 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              backgroundColor: isHovering ? '#003063ff' : '#0a244d',
              color: 'white', 
              border: 'none',
              letterSpacing: '1px',
              fontWeight: 'bold',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}
          >
            LOAD MORE
          </button>
        </div>
      )}

    </div>
  );
}

export default HomePage;