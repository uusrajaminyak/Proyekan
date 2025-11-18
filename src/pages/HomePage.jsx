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

if (isLoading) {
    return <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '50px' }}>Loading data...</p>;
}

if (error) {
    return <p style={{ textAlign: 'center', color: 'red', fontSize: '1.5rem', marginTop: '50px' }}>Error: {error}</p>;
}

const filterredRestaurants = restaurants.filter(resto => {
    if (filterOpen === 'open' && !resto.isOpen) return false;
    if (filterOpen === 'closed' && resto.isOpen) return false;
    if (filterRating > 0 && (resto.rating || 0) < filterRating) return false;
    if (filterCategory !== 'all' && !(resto.categories || []).includes(filterCategory)) return false;
    return true;
});

return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <h1 style={{ textAlign: 'center' }}>Restaurants Encyclopedia</h1>
      
    <FilterBar
        filterOpen={filterOpen} setFilterOpen={setFilterOpen}
        filterRating={filterRating} setFilterRating={setFilterRating}
        filterCategory={filterCategory} setFilterCategory={setFilterCategory}
        allCategories={allCategories}
    />
      
    <div style={{ padding: '20px', backgroundColor: '#2e2929ff', margin: '20px 0', borderRadius: '8px' }}>
        <p>Cari Resto...</p>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filterredRestaurants.length > 0 ? (
        filterredRestaurants.map(resto => (
            <RestaurantCard key={resto.id} resto={resto} />
          ))
        ) : (
        <p>Tidak ada restoran ditemukan.</p>
        )}
    </div>

    <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}>LOAD MORE</button>
    </div>
    </div>
  );
}

export default HomePage;