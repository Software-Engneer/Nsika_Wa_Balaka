import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import styles from '../styles/Categories.module.css';

const categories = ['Clothes and Shoes', 'Furniture', 'Phones & Electronics', 'Building Materials'];

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
  const [items, setItems] = useState([]);
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Clear old localStorage key on mount
  useEffect(() => {
    localStorage.removeItem('kwathu_marketplace');
  }, []);

  // Fetch listings from API on mount
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await api.listings.getAll();
        if (response.success && response.listings) {
          // Transform API data to match frontend format
          const transformed = response.listings.map((listing) => ({
            id: listing._id,
            title: listing.title,
            description: listing.description,
            price: `MK ${listing.price.toLocaleString()}`,
            negotiable: true,
            condition: listing.condition.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            location: listing.location,
            phone: listing.seller?.phone || '',
            whatsapp: listing.seller?.phone || '',
            category: listing.category.charAt(0).toUpperCase() + listing.category.slice(1).replace('_', ' '),
            image: listing.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
            seller: listing.seller?.fullName || 'Unknown',
            posted: new Date(listing.createdAt).toLocaleDateString(),
            _raw: listing, // Keep original for reference
          }));
          setItems(transformed);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error('Failed to fetch listings:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Keep favorites in localStorage only
  useEffect(() => {
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

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Sign in to post listings', 'info');
      return;
    }
    setSubmitting(true);
    try {
      // Map frontend categories to backend enum
      const categoryMap = {
        'Clothes and Shoes': 'clothes_and_shoes',
        'Furniture': 'furniture',
        'Phones & Electronics': 'phones_electronics',
        'Building Materials': 'building_materials',
      };
      // Map frontend conditions to backend enum
      const conditionMap = {
        'New': 'new',
        'Used - Like New': 'like_new',
        'Used - Good': 'good',
        'Used - Fair': 'fair',
      };
      const payload = {
        title: newItem.title,
        description: newItem.description,
        price: parseInt(newItem.price) || 0,
        category: categoryMap[newItem.category] || newItem.category.toLowerCase().replace(' ', '_'),
        condition: conditionMap[newItem.condition] || newItem.condition.toLowerCase().replace(' ', '_').replace('-', '_'),
        location: newItem.location,
        images: newItem.image ? [newItem.image] : [],
      };
      const response = await api.listings.create(payload);
      if (response.success && response.listing) {
        const listing = response.listing;
        const item = {
          id: listing._id,
          title: listing.title,
          description: listing.description,
          price: `MK ${listing.price.toLocaleString()}`,
          negotiable: true,
          condition: listing.condition.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          location: listing.location,
          phone: newItem.phone || user.phone,
          whatsapp: newItem.whatsapp || user.phone,
          category: listing.category.charAt(0).toUpperCase() + listing.category.slice(1).replace('_', ' '),
          image: listing.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
          seller: user.fullName,
          posted: 'Just now',
          _raw: listing,
        };
        setItems([item, ...items]);
        setNewItem(defaultNewItem);
        setShowCreateForm(false);
        showToast('Listing posted successfully');
      }
    } catch (error) {
      showToast(error.message || 'Failed to post listing', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Delete this listing?')) {
      try {
        await api.listings.delete(id);
        setItems((prev) => prev.filter((item) => item.id !== id));
        setSelectedItem(null);
        showToast('Listing deleted');
      } catch (error) {
        showToast(error.message || 'Failed to delete listing', 'error');
      }
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
              <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Listing'}
            </button>
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
            {loading ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>⏳</div>
                <h3 className={styles.emptyTitle}>Loading listings...</h3>
                <p className={styles.emptyText}>Please wait while we fetch the latest listings.</p>
              </div>
            ) : filteredItems.length === 0 ? (
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
