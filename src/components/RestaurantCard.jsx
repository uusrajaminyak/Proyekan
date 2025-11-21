import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './RestaurantCard.module.css';
import StarRating from './StarRating';

function RestaurantCard({ resto }) {
  const priceSymbols = "$".repeat(resto.price_range || 1);
  const status = resto.isOpen ? "Open Now" : "Closed";
  const imageUrl = resto.photos && resto.photos.length > 0 ? resto.photos[0] : 'https://via.placeholder.com/300x200?text=No+Image';
  const category = resto.categories && resto.categories.length > 0 ? resto.categories[0] : 'Restaurant';

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    if (favorites.includes(resto.id)) {
      setIsFavorite(true);
    }
  }, [resto.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== resto.id);
      localStorage.setItem('myFavorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(resto.id);
      localStorage.setItem('myFavorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={resto.name} className={styles.cardImage} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '5px' }}>
        <h3 className={styles.cardName} style={{ margin: 0, flex: 1 }}>{resto.name || 'Nama Restoran'}</h3>
        
        <button 
          onClick={toggleFavorite}
          title={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.1rem',
            marginLeft: '10px',
            flexShrink: 0,
            transition: 'all 0.2s'
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      
      <div style={{ marginBottom: '5px' }}>
        <StarRating rating={resto.rating || 0} />
      </div>

      <p className={styles.cardInfo}>{category} • {priceSymbols}</p>
      <p className={`${styles.cardStatus} ${resto.isOpen ? styles.statusOpen : styles.statusClosed}`}>
        {status}
      </p>
      <Link to={`/restaurant/${resto.id}`} style={{ textDecoration: 'none' }}>
        <button className={styles.learnMoreButton}>
          LEARN MORE
        </button>
      </Link>
    </div>
  );
}

export default RestaurantCard;