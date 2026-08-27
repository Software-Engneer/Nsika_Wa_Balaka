import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Categories.module.css';

const categoryData = {
  'Clothes and Shoes': {
    items: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Jewelry', 'Watches'],
  },
  Furniture: {
    items: ['Living Room', 'Bedroom', 'Office', 'Outdoor', 'Kitchen'],
  },
  'Phones & Electronics': {
    items: ['Smartphones', 'Laptops', 'Accessories', 'TV & Audio', 'Cameras'],
  },
  'Building Materials': {
    items: ['Cement', 'Tiles', 'Paints', 'Plumbing', 'Electrical'],
  },
};

function Categories() {
  const [openCategory, setOpenCategory] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>Your Name</h3>
              <p className={styles.userHandle}>@username</p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            <a href="/" className={`${styles.sidebarLink} ${styles.active}`}>
              <span>🏠</span> Feed
            </a>
            <a href="/explore" className={styles.sidebarLink}>
              <span>🔍</span> Explore
            </a>
            <a href="/news" className={styles.sidebarLink}>
              <span>📰</span> News
            </a>
            <a href="/categories" className={`${styles.sidebarLink} ${styles.active}`}>
              <span>🛒</span> Marketplace
            </a>
            <a href="/messages" className={styles.sidebarLink}>
              <span>💬</span> Messages
            </a>
            <a href="/notifications" className={styles.sidebarLink}>
              <span>🔔</span> Notifications
            </a>
            <a href="/profile" className={styles.sidebarLink}>
              <span>👤</span> Profile
            </a>
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Marketplace</h1>
            <p className={styles.subtitle}>Buy and sell in Balaka</p>
          </div>

          <div className={styles.dropdownContainer} ref={dropdownRef}>
        {Object.keys(categoryData).map((category) => (
          <div key={category} className={styles.dropdownItem}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setOpenCategory(openCategory === category ? null : category)}
              aria-expanded={openCategory === category}
            >
              <span>{category}</span>
              <svg
                className={`${styles.chevron} ${openCategory === category ? styles.chevronOpen : ''}`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {openCategory === category && (
              <div className={styles.dropdownMenu}>
                {categoryData[category].items.map((item) => (
                  <button
                    key={item}
                    className={styles.dropdownOption}
                    onClick={() => navigate(`/categories/${encodeURIComponent(category)}/${encodeURIComponent(item)}`)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}

export default Categories;
