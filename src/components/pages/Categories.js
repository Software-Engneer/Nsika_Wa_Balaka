import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../styles/Categories.module.css';

const categoryData = {
  'Clothes and Shoes': {
    items: [
      {
        id: 1, title: 'Cotton T-Shirts', description: 'Quality cotton t-shirts for both men and women. Various colors and sizes available.',
        price: 'MK 3,500', negotiable: true, condition: 'New', location: 'Nsika Waukulu, behind Nyanja',
        phone: '+265 999 123 456', whatsapp: '+265 999 123 456', seller: 'Chifundo B.', posted: '2 days ago',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      },
      {
        id: 2, title: 'Denim Jeans', description: 'Classic denim jeans for men and women. Durable and comfortable for everyday wear.',
        price: 'MK 7,000', negotiable: true, condition: 'New', location: 'Ipindula Shop, Balaka Market',
        phone: '+265 988 765 432', whatsapp: '+265 988 765 432', seller: 'Grace P.', posted: '5 hours ago',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
      },
      {
        id: 3, title: 'Casual Sneakers', description: 'Trendy sneakers for both men and women. Perfect for casual outings and sports.',
        price: 'MK 12,000', negotiable: false, condition: 'New', location: 'Traven Market, closer to Tamac Road',
        phone: '+265 977 234 567', whatsapp: '+265 977 234 567', seller: 'James K.', posted: '1 day ago',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
      },
      {
        id: 4, title: 'Traditional Wear', description: 'Beautiful traditional clothing for men and women. Perfect for cultural events and ceremonies.',
        price: 'MK 15,000', negotiable: true, condition: 'New', location: 'Balaka Town, near Main Bus Station',
        phone: '+265 966 345 678', whatsapp: '+265 966 345 678', seller: 'Mary T.', posted: '3 days ago',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop',
      },
      {
        id: 5, title: 'Sports Shoes', description: 'Comfortable sports shoes for men and women. Available in different sizes and colors.',
        price: 'MK 9,500', negotiable: true, condition: 'New', location: 'Nsika Waukulu, opposite Community Hall',
        phone: '+265 955 456 789', whatsapp: '+265 955 456 789', seller: 'Peter M.', posted: '4 hours ago',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
      },
      {
        id: 6, title: 'Dresses and Blouses', description: 'Elegant dresses and blouses for women. Perfect for work, parties, and special occasions.',
        price: 'MK 8,500', negotiable: true, condition: 'New', location: 'Ipindula Shop, Balaka Market',
        phone: '+265 944 567 890', whatsapp: '+265 944 567 890', seller: 'Linda S.', posted: '6 hours ago',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=300&fit=crop',
      },
    ],
  },
  Furniture: {
    items: [
      {
        id: 7, title: 'Office Desk', description: 'Spacious office desk perfect for home or office use. Durable and modern design.',
        price: 'MK 45,000', negotiable: true, condition: 'Used - Like New', location: 'Nsika Waukulu, behind Nyanja',
        phone: '+265 933 678 901', whatsapp: '+265 933 678 901', seller: 'David N.', posted: '1 day ago',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop',
      },
      {
        id: 8, title: 'Dining Table Set', description: 'Elegant dining table with 6 chairs. Perfect for family meals and gatherings.',
        price: 'MK 85,000', negotiable: true, condition: 'Used - Good', location: 'Traven Market, closer to Tamac Road',
        phone: '+265 922 789 012', whatsapp: '+265 922 789 012', seller: 'Ruth K.', posted: '2 days ago',
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247000?w=400&h=300&fit=crop',
      },
      {
        id: 9, title: 'Bedroom Wardrobe', description: 'Large wardrobe with multiple compartments. Keep your clothes organized and stylish.',
        price: 'MK 65,000', negotiable: false, condition: 'Used - Like New', location: 'Balaka Town, near Main Bus Station',
        phone: '+265 911 890 123', whatsapp: '+265 911 890 123', seller: 'Joseph B.', posted: '1 week ago',
        image: 'https://images.unsplash.com/photo-1595428774223-ef526241b0f7?w=400&h=300&fit=crop',
      },
      {
        id: 10, title: 'Living Room Sofa', description: 'Comfortable 3-seater sofa. Perfect for relaxing with family and friends.',
        price: 'MK 120,000', negotiable: true, condition: 'Used - Good', location: 'Ipindula Shop, Balaka Market',
        phone: '+265 900 901 234', whatsapp: '+265 900 901 234', seller: 'Susan M.', posted: '3 days ago',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      },
    ],
  },
  'Phones & Electronics': {
    items: [
      {
        id: 11, title: 'Samsung Galaxy A14', description: 'Brand new Samsung Galaxy A14. 64GB storage, 4GB RAM, great camera.',
        price: 'MK 180,000', negotiable: false, condition: 'New', location: 'Nsika Waukulu, behind Nyanja',
        phone: '+265 899 012 345', whatsapp: '+265 899 012 345', seller: 'Mike L.', posted: '2 days ago',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop',
      },
      {
        id: 12, title: 'Laptop HP 15', description: 'HP 15 laptop with Intel Core i3, 4GB RAM, 500GB HDD. Perfect for students.',
        price: 'MK 350,000', negotiable: true, condition: 'Used - Like New', location: 'Traven Market, closer to Tamac Road',
        phone: '+265 888 123 456', whatsapp: '+265 888 123 456', seller: 'Patience C.', posted: '5 days ago',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      },
      {
        id: 13, title: 'Wireless Earbuds', description: 'High-quality wireless earbuds with noise cancellation. Long battery life.',
        price: 'MK 25,000', negotiable: true, condition: 'New', location: 'Balaka Town, near Main Bus Station',
        phone: '+265 877 234 567', whatsapp: '+265 877 234 567', seller: 'Felix D.', posted: '1 day ago',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
      },
      {
        id: 14, title: '32 inch Smart TV', description: 'Smart TV with Netflix and YouTube. Clear HD display, great for home entertainment.',
        price: 'MK 280,000', negotiable: true, condition: 'New', location: 'Ipindula Shop, Balaka Market',
        phone: '+265 866 345 678', whatsapp: '+265 866 345 678', seller: 'Agnes P.', posted: '4 days ago',
        image: 'https://images.unsplash.com/photo-1593359677879-a4cc92f8950f?w=400&h=300&fit=crop',
      },
    ],
  },
  'Building Materials': {
    items: [
      {
        id: 15, title: 'Cement Bags', description: 'High-quality cement bags available for construction. Bulk orders welcome.',
        price: 'MK 18,000', negotiable: true, condition: 'New', location: 'Nsika Waukulu, behind Nyanja',
        phone: '+265 855 456 789', whatsapp: '+265 855 456 789', seller: 'Yohane S.', posted: '2 days ago',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
      },
      {
        id: 16, title: 'Ceramic Tiles', description: 'Beautiful ceramic tiles for floors and walls. Various designs available.',
        price: 'MK 4,500', negotiable: false, condition: 'New', location: 'Traven Market, closer to Tamac Road',
        phone: '+265 844 567 890', whatsapp: '+265 844 567 890', seller: 'Beatrice N.', posted: '6 hours ago',
        image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop',
      },
      {
        id: 17, title: 'Interior Paint', description: 'Premium quality interior paint. Long-lasting and available in multiple colors.',
        price: 'MK 12,000', negotiable: true, condition: 'New', location: 'Balaka Town, near Main Bus Station',
        phone: '+265 833 678 901', whatsapp: '+265 833 678 901', seller: 'Towera M.', posted: '3 days ago',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
      },
      {
        id: 18, title: 'PVC Pipes', description: 'Durable PVC pipes for plumbing. Various sizes available for different needs.',
        price: 'MK 2,500', negotiable: true, condition: 'New', location: 'Ipindula Shop, Balaka Market',
        phone: '+265 822 789 012', whatsapp: '+265 822 789 012', seller: 'Charles B.', posted: '1 day ago',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      },
    ],
  },
};

const defaultNewItem = {
  title: '',
  description: '',
  price: '',
  negotiable: true,
  condition: 'New',
  location: '',
  phone: '',
  whatsapp: '',
  category: 'Clothes and Shoes',
  image: '',
};

function Categories() {
  const { user } = useAuth();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('kwathu_marketplace');
    if (saved) return JSON.parse(saved);
    const all = Object.entries(categoryData).flatMap(([category, data]) =>
      data.items.map((item) => ({ ...item, category }))
    );
    return all;
  });
  const [activeTab, setActiveTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('kwathu_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newItem, setNewItem] = useState(defaultNewItem);
  const [toast, setToast] = useState(null);

  const categories = Object.keys(categoryData);

  React.useEffect(() => {
    localStorage.setItem('kwathu_marketplace', JSON.stringify(items));
  }, [items]);

  React.useEffect(() => {
    localStorage.setItem('kwathu_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    if (!user) {
      showToast('Sign in to save favorites', 'info');
      return;
    }
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const filteredItems = (() => {
    let result = activeTab === null ? items : items.filter((item) => item.category === activeTab);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }

    if (conditionFilter !== 'all') {
      result = result.filter((item) => item.condition === conditionFilter);
    }

    if (priceFilter !== 'all') {
      result = result.filter((item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
        if (priceFilter === 'under10k') return price < 10000;
        if (priceFilter === '10k-50k') return price >= 10000 && price < 50000;
        if (priceFilter === '50k-100k') return price >= 50000 && price < 100000;
        if (priceFilter === 'over100k') return price >= 100000;
        return true;
      });
    }

    if (sortBy === 'newest') {
      result = [...result].sort((a, b) => b.id - a.id);
    } else if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => (parseInt(a.price.replace(/[^0-9]/g, '')) || 0) - (parseInt(b.price.replace(/[^0-9]/g, '')) || 0));
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => (parseInt(b.price.replace(/[^0-9]/g, '')) || 0) - (parseInt(a.price.replace(/[^0-9]/g, '')) || 0));
    } else if (sortBy === 'favorites') {
      result = [...result].sort((a, b) => (favorites.includes(b.id) ? 1 : 0) - (favorites.includes(a.id) ? 1 : 0));
    }

    return result;
  })();

  const handleCreate = (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Sign in to post listings', 'info');
      return;
    }
    const item = {
      id: Date.now(),
      ...newItem,
      price: `MK ${parseInt(newItem.price || 0).toLocaleString()}`,
      seller: user.fullName,
      posted: 'Just now',
      phone: newItem.phone || user.phone,
      whatsapp: newItem.whatsapp || user.phone,
      image: newItem.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    };
    setItems([item, ...items]);
    setNewItem(defaultNewItem);
    setShowCreateForm(false);
    showToast('Listing posted successfully');
  };

  const handleDelete = (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Delete this listing?')) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedItem(null);
      showToast('Listing deleted');
    }
  };

  const handleContact = (item, type) => {
    if (!user) {
      showToast('Sign in to contact sellers', 'info');
      return;
    }
    if (type === 'phone') {
      window.location.href = `tel:${item.phone}`;
    } else if (type === 'whatsapp') {
      const num = item.whatsapp.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${num}?text=${encodeURIComponent(`Hi, I'm interested in "${item.title}" from Kwathu marketplace. Is it still available?`)}`, '_blank');
    } else if (type === 'sms') {
      window.location.href = `sms:${item.phone}`;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user ? user.fullName : 'Guest'}</h3>
              <p className={styles.userHandle}>{user ? user.email : 'Sign in to post'}</p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            <a href="/" className={styles.sidebarLink}><span>🏠</span> Feed</a>
            <a href="/explore" className={styles.sidebarLink}><span>🔍</span> Explore</a>
            <a href="/news" className={styles.sidebarLink}><span>📰</span> News</a>
            <a href="/sports" className={styles.sidebarLink}><span>⚽</span> Sports</a>
            <a href="/events" className={styles.sidebarLink}><span>🎉</span> Events</a>
            <a href="/categories" className={`${styles.sidebarLink} ${styles.active}`}><span>🛒</span> Marketplace</a>
            <a href="/messages" className={styles.sidebarLink}><span>💬</span> Messages</a>
            <a href="/notifications" className={styles.sidebarLink}><span>🔔</span> Notifications</a>
            <a href="/profile" className={styles.sidebarLink}><span>👤</span> Profile</a>
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Marketplace</h1>
              <p className={styles.subtitle}>Buy and sell in Balaka — {items.length} listings</p>
            </div>
            <button className={styles.createButton} onClick={() => setShowCreateForm(!showCreateForm)}>
              {showCreateForm ? '✕ Cancel' : '+ Post Listing'}
            </button>
          </div>

          {showCreateForm && (
            <form className={styles.createForm} onSubmit={handleCreate}>
              <h2 className={styles.formTitle}>Post a New Listing</h2>
              <div className={styles.formGrid}>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label className={styles.label}>Title</label>
                  <input type="text" required value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} className={styles.input} placeholder="What are you selling?" />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label className={styles.label}>Description</label>
                  <textarea required value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className={styles.textarea} rows="3" placeholder="Describe your item..." />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Category</label>
                  <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className={styles.input}>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Condition</label>
                  <select value={newItem.condition} onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })} className={styles.input}>
                    <option>New</option>
                    <option>Used - Like New</option>
                    <option>Used - Good</option>
                    <option>Used - Fair</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Price (MK)</label>
                  <input type="number" required value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className={styles.input} placeholder="0" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Negotiable</label>
                  <select value={newItem.negotiable ? 'yes' : 'no'} onChange={(e) => setNewItem({ ...newItem, negotiable: e.target.value === 'yes' })} className={styles.input}>
                    <option value="yes">Yes</option>
                    <option value="no">No (Fixed)</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Location</label>
                  <input type="text" required value={newItem.location} onChange={(e) => setNewItem({ ...newItem, location: e.target.value })} className={styles.input} placeholder="Where in Balaka?" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Phone</label>
                  <input type="tel" required value={newItem.phone} onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })} className={styles.input} placeholder="+265 999 123 456" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>WhatsApp</label>
                  <input type="tel" value={newItem.whatsapp} onChange={(e) => setNewItem({ ...newItem, whatsapp: e.target.value })} className={styles.input} placeholder="Same as phone?" />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label className={styles.label}>Image URL (optional)</label>
                  <input type="url" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} className={styles.input} placeholder="https://..." />
                </div>
              </div>
              <button type="submit" className={styles.submitButton}>Post Listing</button>
            </form>
          )}

          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by title, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>✕</button>}
          </div>

          <div className={styles.filtersRow}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Condition</label>
              <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} className={styles.filterSelect}>
                <option value="all">All</option>
                <option>New</option>
                <option>Used - Like New</option>
                <option>Used - Good</option>
                <option>Used - Fair</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Price</label>
              <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className={styles.filterSelect}>
                <option value="all">Any</option>
                <option value="under10k">Under MK 10,000</option>
                <option value="10k-50k">MK 10K - 50K</option>
                <option value="50k-100k">MK 50K - 100K</option>
                <option value="over100k">Over MK 100K</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Sort by</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.filterSelect}>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="favorites">Favorites first</option>
              </select>
            </div>
          </div>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === null ? styles.activeTab : ''}`} onClick={() => setActiveTab(null)}>
              All ({items.length})
            </button>
            {categories.map((category) => {
              const count = items.filter((i) => i.category === category).length;
              return (
                <button key={category} className={`${styles.tab} ${activeTab === category ? styles.activeTab : ''}`} onClick={() => setActiveTab(category)}>
                  {category} ({count})
                </button>
              );
            })}
          </div>

          <div className={styles.tabContent}>
            {filteredItems.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📦</div>
                <h3 className={styles.emptyTitle}>No listings found</h3>
                <p className={styles.emptyText}>Try adjusting your filters or post a new listing.</p>
              </div>
            ) : (
              <div className={styles.listingsGrid}>
                {filteredItems.map((item) => (
                  <div key={item.id} className={styles.listingCard} onClick={() => setSelectedItem(item)}>
                    <div className={styles.listingImage}>
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <button
                        className={`${styles.favoriteButton} ${favorites.includes(item.id) ? styles.favorited : ''}`}
                        onClick={(e) => toggleFavorite(item.id, e)}
                        aria-label="Save to favorites"
                      >
                        {favorites.includes(item.id) ? '❤️' : '🤍'}
                      </button>
                      <span className={styles.conditionBadge}>{item.condition}</span>
                    </div>
                    <div className={styles.listingBody}>
                      <h3 className={styles.listingTitle}>{item.title}</h3>
                      <p className={styles.listingDescription}>{item.description}</p>
                      <div className={styles.listingPriceRow}>
                        <span className={styles.listingPrice}>{item.price}</span>
                        {item.negotiable && <span className={styles.negotiableTag}>Negotiable</span>}
                      </div>
                      <div className={styles.listingMeta}>
                        <span className={styles.listingLocation}>📍 {item.location}</span>
                      </div>
                      <div className={styles.listingFooter}>
                        <span className={styles.sellerName}>👤 {item.seller}</span>
                        <span className={styles.postedTime}>{item.posted}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className={styles.modalOverlay} onClick={() => setSelectedItem(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedItem(null)}>✕</button>
            <div className={styles.modalImage}>
              <img src={selectedItem.image} alt={selectedItem.title} />
              <span className={styles.modalConditionBadge}>{selectedItem.condition}</span>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{selectedItem.title}</h2>
                <button
                  className={`${styles.modalFavorite} ${favorites.includes(selectedItem.id) ? styles.favorited : ''}`}
                  onClick={() => toggleFavorite(selectedItem.id)}
                >
                  {favorites.includes(selectedItem.id) ? '❤️ Saved' : '🤍 Save'}
                </button>
              </div>
              <div className={styles.modalPriceRow}>
                <span className={styles.modalPrice}>{selectedItem.price}</span>
                {selectedItem.negotiable && <span className={styles.negotiableTag}>Price negotiable</span>}
              </div>
              <p className={styles.modalDescription}>{selectedItem.description}</p>
              <div className={styles.modalDetails}>
                <div className={styles.modalDetailRow}>
                  <span className={styles.modalDetailLabel}>📍 Location</span>
                  <span className={styles.modalDetailValue}>{selectedItem.location}</span>
                </div>
                <div className={styles.modalDetailRow}>
                  <span className={styles.modalDetailLabel}>👤 Seller</span>
                  <span className={styles.modalDetailValue}>{selectedItem.seller}</span>
                </div>
                <div className={styles.modalDetailRow}>
                  <span className={styles.modalDetailLabel}>📂 Category</span>
                  <span className={styles.modalDetailValue}>{selectedItem.category}</span>
                </div>
                <div className={styles.modalDetailRow}>
                  <span className={styles.modalDetailLabel}>🕒 Posted</span>
                  <span className={styles.modalDetailValue}>{selectedItem.posted}</span>
                </div>
              </div>
              <div className={styles.contactActions}>
                <button className={styles.contactButton} onClick={() => handleContact(selectedItem, 'phone')}>
                  <span>📞</span> Call
                </button>
                <button className={styles.contactButtonWhatsapp} onClick={() => handleContact(selectedItem, 'whatsapp')}>
                  <span>💬</span> WhatsApp
                </button>
                <button className={styles.contactButtonSecondary} onClick={() => handleContact(selectedItem, 'sms')}>
                  <span>✉️</span> SMS
                </button>
              </div>
              {user && selectedItem.seller === user.fullName && (
                <button className={styles.deleteButton} onClick={(e) => handleDelete(selectedItem.id, e)}>
                  🗑️ Delete this listing
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Categories;
