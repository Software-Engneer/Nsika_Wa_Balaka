import React, { useState } from 'react';
import styles from '../styles/Categories.module.css';

const categoryData = {
  'Clothes and Shoes': {
    items: [
      {
        id: 1,
        title: 'Cotton T-Shirts',
        description: 'Quality cotton t-shirts for both men and women. Various colors and sizes available.',
        price: 'MK 3,500',
        location: 'Nsika Waukulu, behind Nyanja',
        phone: '+265 999 123 456',
        whatsapp: '+265 999 123 456',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      },
      {
        id: 2,
        title: 'Denim Jeans',
        description: 'Classic denim jeans for men and women. Durable and comfortable for everyday wear.',
        price: 'MK 7,000',
        location: 'Ipindula Shop, Balaka Market',
        phone: '+265 988 765 432',
        whatsapp: '+265 988 765 432',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
      },
      {
        id: 3,
        title: 'Casual Sneakers',
        description: 'Trendy sneakers for both men and women. Perfect for casual outings and sports.',
        price: 'MK 12,000',
        location: 'Traven Market, closer to Tamac Road',
        phone: '+265 977 234 567',
        whatsapp: '+265 977 234 567',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
      },
      {
        id: 4,
        title: 'Traditional Wear',
        description: 'Beautiful traditional clothing for men and women. Perfect for cultural events and ceremonies.',
        price: 'MK 15,000',
        location: 'Balaka Town, near Main Bus Station',
        phone: '+265 966 345 678',
        whatsapp: '+265 966 345 678',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop',
      },
      {
        id: 5,
        title: 'Sports Shoes',
        description: 'Comfortable sports shoes for men and women. Available in different sizes and colors.',
        price: 'MK 9,500',
        location: 'Nsika Waukulu, opposite Community Hall',
        phone: '+265 955 456 789',
        whatsapp: '+265 955 456 789',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
      },
      {
        id: 6,
        title: 'Dresses and Blouses',
        description: 'Elegant dresses and blouses for women. Perfect for work, parties, and special occasions.',
        price: 'MK 8,500',
        location: 'Ipindula Shop, Balaka Market',
        phone: '+265 944 567 890',
        whatsapp: '+265 944 567 890',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=300&fit=crop',
      },
    ],
  },
  Furniture: {
    items: [
      {
        id: 7,
        title: 'Office Desk',
        description: 'Spacious office desk perfect for home or office use. Durable and modern design.',
        price: 'MK 45,000',
        location: 'Nsika Waukulu, behind Nyanja',
        phone: '+265 933 678 901',
        whatsapp: '+265 933 678 901',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop',
      },
      {
        id: 8,
        title: 'Dining Table Set',
        description: 'Elegant dining table with 6 chairs. Perfect for family meals and gatherings.',
        price: 'MK 85,000',
        location: 'Traven Market, closer to Tamac Road',
        phone: '+265 922 789 012',
        whatsapp: '+265 922 789 012',
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247000?w=400&h=300&fit=crop',
      },
      {
        id: 9,
        title: 'Bedroom Wardrobe',
        description: 'Large wardrobe with multiple compartments. Keep your clothes organized and stylish.',
        price: 'MK 65,000',
        location: 'Balaka Town, near Main Bus Station',
        phone: '+265 911 890 123',
        whatsapp: '+265 911 890 123',
        image: 'https://images.unsplash.com/photo-1595428774223-ef526241b0f7?w=400&h=300&fit=crop',
      },
      {
        id: 10,
        title: 'Living Room Sofa',
        description: 'Comfortable 3-seater sofa. Perfect for relaxing with family and friends.',
        price: 'MK 120,000',
        location: 'Ipindula Shop, Balaka Market',
        phone: '+265 900 901 234',
        whatsapp: '+265 900 901 234',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      },
    ],
  },
  'Phones & Electronics': {
    items: [
      {
        id: 11,
        title: 'Samsung Galaxy A14',
        description: 'Brand new Samsung Galaxy A14. 64GB storage, 4GB RAM, great camera.',
        price: 'MK 180,000',
        location: 'Nsika Waukulu, behind Nyanja',
        phone: '+265 899 012 345',
        whatsapp: '+265 899 012 345',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop',
      },
      {
        id: 12,
        title: 'Laptop HP 15',
        description: 'HP 15 laptop with Intel Core i3, 4GB RAM, 500GB HDD. Perfect for students.',
        price: 'MK 350,000',
        location: 'Traven Market, closer to Tamac Road',
        phone: '+265 888 123 456',
        whatsapp: '+265 888 123 456',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      },
      {
        id: 13,
        title: 'Wireless Earbuds',
        description: 'High-quality wireless earbuds with noise cancellation. Long battery life.',
        price: 'MK 25,000',
        location: 'Balaka Town, near Main Bus Station',
        phone: '+265 877 234 567',
        whatsapp: '+265 877 234 567',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
      },
      {
        id: 14,
        title: '32 inch Smart TV',
        description: 'Smart TV with Netflix and YouTube. Clear HD display, great for home entertainment.',
        price: 'MK 280,000',
        location: 'Ipindula Shop, Balaka Market',
        phone: '+265 866 345 678',
        whatsapp: '+265 866 345 678',
        image: 'https://images.unsplash.com/photo-1593359677879-a4cc92f8950f?w=400&h=300&fit=crop',
      },
    ],
  },
  'Building Materials': {
    items: [
      {
        id: 15,
        title: 'Cement Bags',
        description: 'High-quality cement bags available for construction. Bulk orders welcome.',
        price: 'MK 18,000',
        location: 'Nsika Waukulu, behind Nyanja',
        phone: '+265 855 456 789',
        whatsapp: '+265 855 456 789',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
      },
      {
        id: 16,
        title: 'Ceramic Tiles',
        description: 'Beautiful ceramic tiles for floors and walls. Various designs available.',
        price: 'MK 4,500',
        location: 'Traven Market, closer to Tamac Road',
        phone: '+265 844 567 890',
        whatsapp: '+265 844 567 890',
        image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop',
      },
      {
        id: 17,
        title: 'Interior Paint',
        description: 'Premium quality interior paint. Long-lasting and available in multiple colors.',
        price: 'MK 12,000',
        location: 'Balaka Town, near Main Bus Station',
        phone: '+265 833 678 901',
        whatsapp: '+265 833 678 901',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
      },
      {
        id: 18,
        title: 'PVC Pipes',
        description: 'Durable PVC pipes for plumbing. Various sizes available for different needs.',
        price: 'MK 2,500',
        location: 'Ipindula Shop, Balaka Market',
        phone: '+265 822 789 012',
        whatsapp: '+265 822 789 012',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      },
    ],
  },
};

function Categories() {
  const [activeTab, setActiveTab] = useState(null);
  const categories = Object.keys(categoryData);

  const allItems = categories.flatMap((category) =>
    categoryData[category].items.map((item) => ({
      ...item,
      category,
    }))
  );

  const displayItems = activeTab === null ? allItems : categoryData[activeTab].items;

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
            <a href="/sports" className={styles.sidebarLink}>
              <span>⚽</span> Sports
            </a>
            <a href="/events" className={styles.sidebarLink}>
              <span>🎉</span> Events
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

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === null ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(null)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.tab} ${activeTab === category ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            <div className={styles.listingsGrid}>
              {displayItems.map((item) => (
                <div key={item.id} className={styles.listingCard}>
                      <div className={styles.listingImage}>
                        <img src={item.image} alt={item.title} />
                        <span className={styles.listingPrice}>{item.price}</span>
                      </div>
                      <div className={styles.listingBody}>
                        <h3 className={styles.listingTitle}>{item.title}</h3>
                        <p className={styles.listingDescription}>{item.description}</p>
                        <div className={styles.listingMeta}>
                          <span className={styles.listingLocation}>📍 {item.location}</span>
                          <span className={styles.listingPhone}>📞 {item.phone}</span>
                        </div>
                      </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
