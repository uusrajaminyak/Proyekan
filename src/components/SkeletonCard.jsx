import styles from "./SkeletonCard.module.css";

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeletonBox} ${styles.image}`}></div>

      <div className={`${styles.skeletonBox} ${styles.title}`}></div>

      <div className={`${styles.skeletonBox} ${styles.rating}`}></div>

      <div className={`${styles.skeletonBox} ${styles.text}`}></div>

      <div
        className={`${styles.skeletonBox} ${styles.text}`}
        style={{ width: "30%" }}
      ></div>

      <div className={`${styles.skeletonBox} ${styles.button}`}></div>
    </div>
  );
}

export default SkeletonCard;
