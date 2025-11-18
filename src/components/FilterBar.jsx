import style from './FilterBar.module.css';

function FilterBar({
    filterOpen, setFilterOpen, 
    filterRating, setFilterRating, 
    filterCategory, setFilterCategory,
    allCategories
}) {
    return (
        <div className={StyleSheet.filterBar}>
            <div className={style.filtergroup}>
                <label htmlFor="openFilter">Status</label>
                <select
                    id="openFilter"
                    value={filterOpen}
                    onChange={(e) => setFilteropen(e.target.value)}
                >
                    <option value="all">Semua</option>
                    <option value="open">Buka Sekarang</option>
                    <option value="closed">Tutup</option>
                </select>
            </div>

        <div className={style.filterGroup}>
            <label htmlFor="categoryFilter">Kategori</label>
            <select
                id="categoryFilter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
            >
                <option value="all">Semua</option>
                {allCategories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>

        <div className={style.filterGroup}>
            <label htmlFor="ratingFilter">Rating Minimal</label>
            <select
                id="ratingFilter"
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
            >
                <option value="0">Semua</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐+</option>
                <option value="3">⭐⭐⭐+</option>
                <option value="2">⭐⭐+</option>
                <option value="1">⭐+</option>
            </select>
        </div>
        </div>
    );
}

export default FilterBar;