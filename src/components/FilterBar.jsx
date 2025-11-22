// src/components/FilterBar.jsx
import styles from './FilterBar.module.css';

function FilterBar({
  filterOpen, setFilterOpen,
  filterRating, setFilterRating,
  filterCategory, setFilterCategory,
  searchQuery, setSearchQuery,
  allCategories
}) {

return (
    <div className={styles.filterContainer}>
        <span className={styles.label}>Filter By:</span>
    <div className={styles.filterGroup}>
        <input
            type="text"
            className={styles.searchInput}
            placeholder="Search Restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
    <div className={styles.filterGroup}>
        <select
            className={styles.select}
            value={filterOpen}
            onChange={(e) => setFilterOpen(e.target.value)}
        >
            <option value="all">Status: All</option>
            <option value="open">Open Now</option>
            <option value="closed">Closed</option>
        </select>
    </div>

    <div className={styles.filterGroup}>
        <select
            className={styles.select}
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
        >
            <option value="0">Rating: All</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
        </select>
    </div>

    <div className={styles.filterGroup}>
        <select
            className={styles.select}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
        >
            <option value="all">Categories: All</option>
            {allCategories.map(category => (
            <option key={category} value={category}>
            {category}
            </option>
        ))}
        </select>
        </div>
    </div>
  );
}

export default FilterBar;