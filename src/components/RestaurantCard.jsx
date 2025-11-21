import { Link } from 'react-router-dom';
import styles from './RestaurantCard.module.css';
import StarRating from './StarRating';

function RestaurantCard({ resto }) {
  const priceSymbols = "$".repeat(resto.price_range || 1);
  const status = resto.isOpen ? "Open Now" : "Closed";
  const imageUrl = resto.photos && resto.photos.length > 0 ? resto.photos[0] : 'https://via.placeholder.com/300x200?text=No+Image';
  const category = resto.categories && resto.categories.length > 0 ? resto.categories[0] : 'Restaurant';

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={resto.name} className={styles.cardImage} />
      <h3 className={styles.cardName}>{resto.name || 'Nama Restoran'}</h3>
      
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