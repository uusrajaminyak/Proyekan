import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './DetailPage.module.css';
import StarRating from '../components/StarRating';

const API_URL = 'https://691ab9cd2d8d7855756fe42f.mockapi.io/resto';

function DetailPage() {
    const { id } = useParams();
    const [resto, setResto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetail() {
            try {
                const response = await axios.get(`${API_URL}/${id}`);
                setResto(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
                setLoading(false);
            }
        }
        fetchDetail();
    }, [id]);

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>Loading Detail...</p>;
    if (!resto) return <p style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>Resto not found</p>;

    const priceSymbols = "$".repeat(resto.price_range || 1);
    const category = resto.categories && resto.categories.length > 0 ? resto.categories[0] : 'Restaurant';
    const imageUrl = resto.photos && resto.photos.length > 0 ? resto.photos[0] : 'https://via.placeholder.com/400x300';

    return (
        <div className={styles.container}>
            <div className={styles.heroSection}> 
                <img src={imageUrl} alt={resto.name} className={styles.heroImage} />
                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{resto.name}</h1>
                    
                    <div className={styles.rating}>
                        <StarRating rating={resto.rating || 0} />
                    </div>
                    
                    <p className={styles.meta}>
                        {category} • {priceSymbols}
                    </p>
                    <p className={resto.isOpen ? styles.statusOpen : styles.statusClosed}>
                        {resto.isOpen ? "● Open Now" : "● Closed"}
                    </p>
                    <p style={{ marginTop: '20px', lineHeight: '1.6', color: '#ddd' }}>
                        {resto.desc || "Deskripsi restoran belum tersedia. Hubungi restoran untuk informasi lebih lanjut."}
                    </p>
                </div>
            </div>

            <div className={styles.reviewsSection}>
                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
                    Reviews ({resto.reviews ? resto.reviews.length : 0})
                </h2>

                {resto.reviews && resto.reviews.length > 0 ? (
                    resto.reviews.map((review, index) => (
                        <div key={index} className={styles.reviewCard}>
                            
                            <img
                                src={review.avatar || "https://via.placeholder.com/50"}
                                alt={review.name}
                                className={styles.avatar} 
                            />

                            <div>
                                <h4 style={{ margin: '0 0 5px 0' }}>{review.name}</h4>
                                <div style={{ marginBottom: '5px' }}>
                                    <StarRating rating={review.rating || 0} />
                                </div>
                                <p style={{ margin: 0, color: '#ccc', fontSize: '0.95rem' }}>
                                    "{review.text}"
                                </p>
                            </div>

                        </div>
                    ))
                ) : (
                    <p style={{ color: '#888' }}>Belum ada ulasan untuk restoran ini.</p>
                )}
            </div>
        </div>
    );
}

export default DetailPage;