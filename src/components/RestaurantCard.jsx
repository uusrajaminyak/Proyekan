import { Link } from 'react-router-dom';
import styles from './RestaurantCard.module.css'; 
function RestaurantCard({ resto }) {
const ratingStars = "⭐".repeat(Math.round(resto.rating || 0));
const priceSymbols = "$".repeat(resto.price_range || 1);
const status = resto.isOpen ? "Open Now" : "Closed";
const imageUrl = resto.photos && resto.photos.length > 0 ? resto.photos[0] : 'https://via.placeholder.com/300x200?text=No+Image';
const category = resto.categories && resto.categories.length > 0 ? resto.categories[0] : 'Restaurant';

return (
    <div className={styles.card}>
        <img src={imageUrl} alt={resto.name} className={styles.cardImage} />
        <h3 className={styles.cardName}>{resto.name || 'Nama Restoran'}</h3>
        <p style={{ margin: '0 0 5px 0' }}>{ratingStars} ({resto.rating || 'N/A'})</p>
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