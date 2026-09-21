import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import CommentSection from '../CommentSection';
import styles from '../styles/News.module.css';

const categoryConfig = {
  Breaking: { icon: '🚨', color: '#dc2626', bg: '#fef2f2' },
  Development: { icon: '🏗️', color: '#0ea5e9', bg: '#f0f9ff' },
  Sports: { icon: '⚽', color: '#16a34a', bg: '#f0fdf4' },
  Health: { icon: '🏥', color: '#ec4899', bg: '#fdf2f8' },
  Weather: { icon: '🌧️', color: '#6366f1', bg: '#eef2ff' },
  Business: { icon: '💼', color: '#f59e0b', bg: '#fffbeb' },
  Education: { icon: '📚', color: '#8b5cf6', bg: '#f5f3ff' },
  Agriculture: { icon: '🌾', color: '#22c55e', bg: '#f0fdf4' },
};

function getRelativeTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function News() {
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [saved, setSaved] = useState(() => {
    const s = localStorage.getItem('kwathu_news_saved');
    return s ? JSON.parse(s) : [];
  });
  const [liked, setLiked] = useState(() => {
    const s = localStorage.getItem('kwathu_news_liked');
    return s ? JSON.parse(s) : [];
  });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  // Clear old localStorage key on mount
  useEffect(() => {
    localStorage.removeItem('kwathu_news');
  }, []);

  // Fetch news from API on mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await api.news.getAll({ sort: sortBy });
        if (response.success && response.news) {
          // Transform API data to match frontend format
          const transformed = response.news.map((article) => ({
            id: article._id,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            category: article.category,
            time: article.createdAt,
            author: article.author?.fullName || 'Kwathu News',
            image: article.image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=400&fit=crop',
            likes: article.likes || 0,
            comments: article.comments || 0,
            shares: article.shares || 0,
            readTime: article.readTime || '3 min read',
            _raw: article,
          }));
          setNews(transformed);
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [sortBy]);

  const fetchNotificationCount = useCallback(async () => {
    if (!user) return;
    try {
      const response = await api.notifications.getUnreadCount();
      if (response.success) {
        setNotificationCount(response.count);
      }
    } catch (error) {
      console.error('Failed to fetch notification count:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchNotificationCount();
  }, [user, fetchNotificationCount]);

  // Keep saved/liked in localStorage only (UI state)
  useEffect(() => {
    localStorage.setItem('kwathu_news_saved', JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem('kwathu_news_liked', JSON.stringify(liked));
  }, [liked]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLike = async (id, e) => {
    e.stopPropagation();
    if (!user) {
      showToast('Sign in to like articles', 'info');
      return;
    }
    const wasLiked = liked.includes(id);
    setNews((prev) => prev.map((item) => item.id === id ? { ...item, likes: wasLiked ? item.likes - 1 : item.likes + 1 } : item));
    setLiked((prev) => (wasLiked ? prev.filter((l) => l !== id) : [...prev, id]));
    try {
      await api.news.like(id);
    } catch (error) {
      // Revert on error
      setNews((prev) => prev.map((item) => item.id === id ? { ...item, likes: wasLiked ? item.likes + 1 : item.likes - 1 } : item));
      setLiked((prev) => (wasLiked ? [...prev, id] : prev.filter((l) => l !== id)));
      showToast('Failed to like article', 'error');
    }
  };

  const handleSave = (id, e) => {
    e.stopPropagation();
    if (!user) {
      showToast('Sign in to save articles', 'info');
      return;
    }
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleShare = async (article, e) => {
    if (e) e.stopPropagation();
    const text = `${article.title}\n\n${article.excerpt}\n\nRead more on Kwathu News.`;
    if (navigator.share) {
      navigator.share({ title: article.title, text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Article copied to clipboard');
    }
    try {
      await api.news.share(article.id);
      setNews((prev) => prev.map((item) => item.id === article.id ? { ...item, shares: item.shares + 1 } : item));
    } catch (error) {
      console.error('Failed to track share:', error);
    }
  };

  const categories = Object.keys(categoryConfig);
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = news.filter((n) => n.category === cat).length;
    return acc;
  }, {});

  let filtered = news;
  if (activeCategory !== 'all') {
    filtered = filtered.filter((n) => n.category === activeCategory);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.author.toLowerCase().includes(q));
  }
  if (sortBy === 'newest') {
    filtered = [...filtered].sort((a, b) => new Date(b.time) - new Date(a.time));
  } else if (sortBy === 'popular') {
    filtered = [...filtered].sort((a, b) => b.likes - a.likes);
  } else if (sortBy === 'saved') {
    filtered = [...filtered].sort((a, b) => (saved.includes(b.id) ? 1 : 0) - (saved.includes(a.id) ? 1 : 0));
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user ? user.fullName : 'Guest'}</h3>
              <p className={styles.userHandle}>{user ? user.email : 'Sign in to interact'}</p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            <a href="/" className={styles.sidebarLink}><span>🏠</span> Feed</a>
            <a href="/explore" className={styles.sidebarLink}><span>🔍</span> Explore</a>
            <a href="/news" className={`${styles.sidebarLink} ${styles.active}`}><span>📰</span> News</a>
            <a href="/sports" className={styles.sidebarLink}><span>⚽</span> Sports</a>
            <a href="/categories" className={styles.sidebarLink}><span>🛒</span> Marketplace</a>
            <a href="/messages" className={styles.sidebarLink}><span>💬</span> Messages</a>
            <a href="/notifications" className={styles.sidebarLink}><span>🔔</span> Notifications {notificationCount > 0 && <span className={styles.badge}>{notificationCount}</span>}</a>
            <a href="/profile" className={styles.sidebarLink}><span>👤</span> Profile</a>
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>News - Balaka</h1>
              <p className={styles.subtitle}>Stay updated with what is happening around Balaka — {news.length} articles</p>
            </div>
          </div>

          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search news by title, excerpt, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>✕</button>}
          </div>

          <div className={styles.filtersRow}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Category</label>
              <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className={styles.filterSelect}>
                <option value="all">All Categories ({news.length})</option>
                {categories.map((c) => <option key={c} value={c}>{c} ({categoryCounts[c] || 0})</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Sort by</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.filterSelect}>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="saved">Saved First</option>
              </select>
            </div>
          </div>

          <div className={styles.tabContent}>
            {loading ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>⏳</div>
                <h3 className={styles.emptyTitle}>Loading articles...</h3>
                <p className={styles.emptyText}>Please wait while we fetch the latest news.</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📰</div>
                <h3 className={styles.emptyTitle}>No articles found</h3>
                <p className={styles.emptyText}>Try adjusting your search or category filter.</p>
              </div>
            ) : (
              <div className={styles.newsList}>
                {filtered.map((article) => {
                  const catConfig = categoryConfig[article.category] || categoryConfig.Breaking;
                  const isBreaking = article.category === 'Breaking';
                  return (
                    <article key={article.id} className={`${styles.newsCard} ${isBreaking ? styles.breakingCard : ''}`} onClick={() => setSelectedArticle(article)}>
                      <div className={styles.newsImage}>
                        <img src={article.image} alt={article.title} loading="lazy" />
                        <span className={styles.newsCategoryBadge} style={{ background: catConfig.bg, color: catConfig.color }}>
                          {catConfig.icon} {article.category}
                        </span>
                      </div>
                      <div className={styles.newsBody}>
                        <div className={styles.newsHeader}>
                          {isBreaking && <span className={`${styles.badge} ${styles.breakingBadge}`}>Breaking</span>}
                          <span className={styles.time}>{getRelativeTime(article.time)}</span>
                        </div>
                        <h2 className={styles.newsTitle}>{article.title}</h2>
                        <p className={styles.newsExcerpt}>{article.excerpt}</p>
                        <div className={styles.newsFooter}>
                          <span className={styles.author}>✍️ {article.author}</span>
                          <div className={styles.newsActions}>
                            <button className={styles.likeButton} onClick={(e) => handleLike(article.id, e)} aria-label="Like">
                              <span>{liked.includes(article.id) ? '❤️' : '🤍'}</span>
                              <span className={styles.actionCount}>{article.likes}</span>
                            </button>
                            <button className={styles.actionButton} onClick={(e) => handleSave(article.id, e)} aria-label="Save">
                              <span>{saved.includes(article.id) ? '🔖' : '📑'}</span>
                            </button>
                            <button className={styles.actionButton} onClick={(e) => handleShare(article, e)} aria-label="Share">
                              ↗
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedArticle && (
        <div className={styles.modalOverlay} onClick={() => setSelectedArticle(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedArticle(null)}>✕</button>
            <div className={styles.modalImage}>
              <img src={selectedArticle.image} alt={selectedArticle.title} />
              <span className={styles.modalCategoryBadge} style={{ background: categoryConfig[selectedArticle.category]?.bg, color: categoryConfig[selectedArticle.category]?.color }}>
                {categoryConfig[selectedArticle.category]?.icon} {selectedArticle.category}
              </span>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalHeader}>
                <span className={styles.modalAuthor}>✍️ {selectedArticle.author}</span>
                <span className={styles.modalTime}>{getRelativeTime(selectedArticle.time)}</span>
              </div>
              <h2 className={styles.modalTitle}>{selectedArticle.title}</h2>
              <div className={styles.modalMeta}>
                <span className={styles.modalMetaItem}>⏱️ {selectedArticle.readTime}</span>
                <span className={styles.modalMetaItem}>💬 {selectedArticle.comments} comments</span>
                <span className={styles.modalMetaItem}>🔄 {selectedArticle.shares} shares</span>
              </div>
              <p className={styles.modalContent}>{selectedArticle.content}</p>
              <div className={styles.modalActions}>
                <button className={styles.modalLikeButton} onClick={() => handleLike(selectedArticle.id, { stopPropagation: () => {} })}>
                  <span>{liked.includes(selectedArticle.id) ? '❤️' : '🤍'}</span>
                  <span>{selectedArticle.likes} likes</span>
                </button>
                <button className={styles.modalSaveButton} onClick={() => handleSave(selectedArticle.id, { stopPropagation: () => {} })}>
                  {saved.includes(selectedArticle.id) ? '🔖 Saved' : '📑 Save'}
                </button>
                <button className={styles.modalShareButton} onClick={() => handleShare(selectedArticle)}>
                  ↗ Share
                </button>
              </div>
              <CommentSection commentableType="News" commentableId={selectedArticle.id} />
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`${styles.toast} ${styles[`toast${toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}`]}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default News;
