import styles from "./StarRating.module.css";

function StarRating({ rating }) {
  const percentage = (rating / 5) * 100;

  return (
    <div className={styles.ratingWrapper}>
      <span className={styles.ratingNumber}>
        {rating ? rating.toFixed(1) : "0.0"}
      </span>
      <div className={styles.starsOuter}>
        ★★★★★
        <div className={styles.starsInner} style={{ width: `${percentage}%` }}>
          ★★★★★
        </div>
      </div>
    </div>
  );
}

export default StarRating;
