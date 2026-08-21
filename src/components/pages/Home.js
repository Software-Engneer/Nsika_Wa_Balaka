import React from 'react';
import styles from '../styles/Home.module.css';

const categories = [
  { id: 1, name: 'Electronics', icon: '📱', count: 120 },
  { id: 2, name: 'Fashion', icon: '👕', count: 85 },
  { id: 3, name: 'Home & Garden', icon: '🏠', count: 64 },
  { id: 4, name: 'Vehicles', icon: '🚗', count: 42 },
  { id: 5, name: 'Jobs', icon: '💼', count: 33 },
  { id: 6, name: 'Services', icon: '🔧', count: 28 },
];

const featuredListings = [
  {
    id: 1,
    title: 'Samsung Galaxy S23 Ultra',
    price: 'MK 450,000',
    location: 'Lilongwe',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop',
    category: 'Electronics',
  },
  {
    id: 2,
    title: 'Toyota Corolla 2018',
    price: 'MK 12,500,000',
    location: 'Blantyre',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=400&h=300&fit=crop',
    category: 'Vehicles',
  },
  {
    id: 3,
    title: '2 Bedroom Apartment',
    price: 'MK 85,000/month',
    location: 'Mzuzu',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    category: 'Property',
  },
  {
    id: 4,
    title: 'MacBook Pro M2',
    price: 'MK 620,000',
    location: 'Lilongwe',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    category: 'Electronics',
  },
];

const stats = [
  { label: 'Active Listings', value: '2,500+' },
  { label: 'Verified Sellers', value: '1,200+' },
  { label: 'Happy Buyers', value: '5,000+' },
  { label: 'Cities Covered', value: '12+' },
];

function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Buy & Sell in <span className={styles.highlight}>Malawi</span>
          </h1>
          <p className={styles.heroSubtitle}>
            The trusted marketplace for electronics, vehicles, property, jobs, and more.
          </p>

          <form className={styles.searchBox} onSubmit={(e) => e.preventDefault()}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search products, services, jobs..."
              className={styles.searchInput}
            />
            <button className={styles.searchButton} type="submit">Search</button>
          </form>

          <div className={styles.heroTags}>
            <span className={styles.tag}>Popular: iPhone</span>
            <span className={styles.tag}>Toyota</span>
            <span className={styles.tag}>Apartments</span>
            <span className={styles.tag}>Jobs</span>
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Browse Categories</h2>
          <p className={styles.sectionSubtitle}>Find exactly what you need</p>
        </div>
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <a key={category.id} href="#" className={styles.categoryCard}>
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.categoryCount}>{category.count} listings</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Listings</h2>
          <p className={styles.sectionSubtitle}>Top picks from verified sellers</p>
        </div>
        <div className={styles.listingsGrid}>
          {featuredListings.map((listing) => (
            <div key={listing.id} className={styles.listingCard}>
              <div className={styles.listingImage}>
                <img src={listing.image} alt={listing.title} />
                <span className={styles.listingBadge}>{listing.category}</span>
              </div>
              <div className={styles.listingBody}>
                <h3 className={styles.listingTitle}>{listing.title}</h3>
                <p className={styles.listingPrice}>{listing.price}</p>
                <p className={styles.listingLocation}>📍 {listing.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Ready to start selling?</h2>
          <p className={styles.ctaText}>List your items in minutes and reach thousands of buyers across Malawi.</p>
          <button className={styles.ctaButton}>Create Free Listing</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
