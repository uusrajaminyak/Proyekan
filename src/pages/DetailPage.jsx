import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './DetailPage.module.css';
import StarRating from '../components/StarRating';
import toast from 'react-hot-toast';

const API_URL = 'https://691ab9cd2d8d7855756fe42f.mockapi.io/resto';

function DetailPage() {
  const { id } = useParams();
  const [resto, setResto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [inputName, setInputName] = useState('');
  const [inputRating, setInputRating] = useState(5);
  const [inputText, setInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!inputName || !inputText) return alert("Nama dan Komentar wajib diisi!");

    setIsSubmitting(true);

    const newReview = {
      name: inputName,
      rating: parseInt(inputRating),
      text: inputText,
      avatar: `https://ui-avatars.com/api/?name=${inputName}&background=random`
    };

    const currentReviews = resto.reviews || [];
    const updatedReviews = [...currentReviews, newReview];

    try {
      await axios.put(`${API_URL}/${id}`, {
        reviews: updatedReviews
      });
      setResto({ ...resto, reviews: updatedReviews });
      setInputName('');
      setInputText('');
      setInputRating(5);
      toast.success("Ulasan berhasil dikirim!");
    } catch (error) {
      console.error("Gagal mengirim ulasan:", error);
      toast.error("Gagal mengirim ulasan.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className={styles.reviewFormContainer}>
          <h3 className={styles.formTitle}>Tulis Ulasan Anda</h3>
          <form onSubmit={handleSubmitReview}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nama</label>
              <input 
                type="text" 
                className={styles.formInput} 
                placeholder="Nama Anda..." 
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Rating</label>
              <select 
                className={styles.formSelect}
                value={inputRating}
                onChange={(e) => setInputRating(e.target.value)}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5 - Sempurna)</option>
                <option value="4">⭐⭐⭐⭐ (4 - Bagus)</option>
                <option value="3">⭐⭐⭐ (3 - Oke)</option>
                <option value="2">⭐⭐ (2 - Kurang)</option>
                <option value="1">⭐ (1 - Buruk)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Komentar</label>
              <textarea 
                className={styles.formTextarea} 
                placeholder="Ceritakan pengalaman Anda..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
            </button>
          </form>
        </div>

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
          <p style={{ color: '#888' }}>Belum ada ulasan untuk restoran ini. Jadilah yang pertama mengulas!</p>
        )}
      </div>
    </div>
  );
}

export default DetailPage;