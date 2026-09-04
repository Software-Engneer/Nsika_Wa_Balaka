import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
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

const initialNews = [
  {
    id: 1, title: 'Balaka Market Fire Destroys 10 Stalls',
    excerpt: 'A fire broke out early this morning at the main market in Balaka, destroying an estimated 10 stalls. Firefighters responded quickly and no injuries were reported.',
    content: 'A fire broke out early this morning at the main market in Balaka, destroying an estimated 10 stalls. Firefighters responded quickly and no injuries were reported. The cause of the fire is still under investigation, but officials suspect an electrical fault. Market authorities have assured traders that temporary spaces will be allocated while reconstruction takes place. Relief funds are being mobilized to support affected vendors.',
    category: 'Breaking', time: '2026-09-04T08:30:00', author: 'Kwathu News', image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=400&fit=crop', likes: 34, comments: 12, shares: 8, readTime: '3 min read',
  },
  {
    id: 2, title: 'New Road Construction Begins in Balaka Township',
    excerpt: 'The Ministry of Transport has announced the start of a major road rehabilitation project in Balaka township, expected to improve connectivity within the district.',
    content: 'The Ministry of Transport has announced the start of a major road rehabilitation project in Balaka township. The project, valued at MK 2.5 billion, will rehabilitate 45km of roads connecting key areas including the market, hospital, and schools. Construction is expected to take 18 months and will create over 200 local jobs. Residents are advised to use alternative routes during construction.',
    category: 'Development', time: '2026-09-03T14:00:00', author: 'Kwathu News', image: 'https://images.unsplash.com/photo-1515165592879-5a74da68cc3c?w=800&h=400&fit=crop', likes: 28, comments: 7, shares: 5, readTime: '4 min read',
  },
  {
    id: 3, title: 'Local Football Club Advances to Semi-Finals',
    excerpt: 'Balaka United FC has secured a spot in the semi-finals after a thrilling 2-1 victory over Mulanje FC at the Balaka Stadium.',
    content: 'Balaka United FC has secured a spot in the semi-finals after a thrilling 2-1 victory over Mulanje FC at the Balaka Stadium. The winning goal came in the 89th minute, sending the home crowd into a frenzy. Coach John Banda praised his team\'s resilience. The semi-final match is scheduled for next month at the national stadium.',
    category: 'Sports', time: '2026-09-02T18:00:00', author: 'Kwathu Sports', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop', likes: 67, comments: 23, shares: 15, readTime: '3 min read',
  },
  {
    id: 4, title: 'Community Health Initiative Launches in Balaka',
    excerpt: 'A new health outreach program has been launched to provide free medical checkups and malaria prevention supplies to residents in rural areas around Balaka.',
    content: 'A new health outreach program has been launched to provide free medical checkups and malaria prevention supplies to residents in rural areas around Balaka. The initiative, led by the District Health Office in partnership with local NGOs, aims to reach over 10,000 people in the first six months. Services will include HIV testing, malaria prophylaxis, maternal health checks, and nutrition counseling.',
    category: 'Health', time: '2026-09-01T10:00:00', author: 'Kwathu Health', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop', likes: 45, comments: 9, shares: 12, readTime: '5 min read',
  },
  {
    id: 5, title: 'Rainfall Warning Issued for Balaka and Surrounding Areas',
    excerpt: 'The Department of Climate Change has issued a heavy rainfall warning for Balaka and neighboring districts. Residents are advised to take necessary precautions.',
    content: 'The Department of Climate Change has issued a heavy rainfall warning for Balaka and neighboring districts. Heavy downpours accompanied by strong winds are expected over the next 72 hours. Residents in low-lying areas are advised to move to higher ground. District Disaster Management is on high alert and emergency shelters have been identified.',
    category: 'Weather', time: '2026-08-31T06:00:00', author: 'Kwathu News', image: 'https://images.unsplash.com/photo-1428592953211-077101b2021e?w=800&h=400&fit=crop', likes: 19, comments: 4, shares: 20, readTime: '2 min read',
  },
  {
    id: 6, title: 'Balaka Youth Group Wins National Entrepreneurship Award',
    excerpt: 'A local youth entrepreneurship group from Balaka has been recognized nationally for their innovative agricultural startup creating jobs for young people.',
    content: 'A local youth entrepreneurship group from Balaka has been recognized nationally for their innovative agricultural startup creating jobs for young people. The "Young Farmers Collective" received the National Youth Entrepreneurship Award at a ceremony in Lilongwe. The group has trained over 150 young people in modern farming techniques and created 30 direct jobs in the district.',
    category: 'Business', time: '2026-08-30T11:00:00', author: 'Kwathu Business', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop', likes: 52, comments: 14, shares: 18, readTime: '4 min read',
  },
  {
    id: 7, title: 'New School Block Inaugurated in Rural Balaka',
    excerpt: 'A new classroom block has been officially opened at Nankhaka Primary School, funded by a community-driven fundraising campaign.',
    content: 'A new classroom block has been officially opened at Nankhaka Primary School, funded by a community-driven fundraising campaign. The MK 15 million project added 8 new classrooms, reducing the student-to-teacher ratio significantly. Parents and teachers celebrated the milestone, which took 10 months to complete. The block includes a library and a computer lab.',
    category: 'Education', time: '2026-08-29T09:00:00', author: 'Kwathu Education', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop', likes: 38, comments: 6, shares: 9, readTime: '3 min read',
  },
  {
    id: 8, title: 'Tobacco Farmers Report Record Yields This Season',
    excerpt: 'Tobacco farmers in Balaka are celebrating record yields following improved farming practices and favorable weather conditions this season.',
    content: 'Tobacco farmers in Balaka are celebrating record yields following improved farming practices and favorable weather conditions this season. The Tobacco Control Commission reports that average yields per hectare have increased by 18% compared to last year. Farmers credit the gains to better seed varieties, timely rains, and extension services provided by the Ministry of Agriculture.',
    category: 'Agriculture', time: '2026-08-28T07:00:00', author: 'Kwathu Agriculture', image: 'https://images.unsplash.com/photo-1595854755620-681835b0d38a?w=800&h=400&fit=crop', likes: 41, comments: 11, shares: 7, readTime: '4 min read',
  },
];

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
  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('kwathu_news');
    return saved ? JSON.parse(saved) : initialNews;
  });
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

  useEffect(() => {
    localStorage.setItem('kwathu_news', JSON.stringify(news));
  }, [news]);

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

  const handleLike = (id, e) => {
    e.stopPropagation();
    if (!user) {
      showToast('Sign in to like articles', 'info');
      return;
    }
    setNews((prev) => prev.map((item) => item.id === id ? { ...item, likes: liked.includes(id) ? item.likes - 1 : item.likes + 1 } : item));
    setLiked((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]));
  };

  const handleSave = (id, e) => {
    e.stopPropagation();
    if (!user) {
      showToast('Sign in to save articles', 'info');
      return;
    }
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleShare = (article, e) => {
    if (e) e.stopPropagation();
    const text = `${article.title}\n\n${article.excerpt}\n\nRead more on Kwathu News.`;
    if (navigator.share) {
      navigator.share({ title: article.title, text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Article copied to clipboard');
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

  const breakingNews = filtered.filter((n) => n.category === 'Breaking');
  const regularNews = filtered.filter((n) => n.category !== 'Breaking');

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
            <a href="/notifications" className={styles.sidebarLink}><span>🔔</span> Notifications</a>
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

          {breakingNews.length > 0 && (
            <div className={styles.breakingBanner}>
              <span className={styles.breakingIcon}>🚨</span>
              <div className={styles.breakingContent}>
                <span className={styles.breakingLabel}>BREAKING</span>
                <span className={styles.breakingText}>{breakingNews.length} breaking story{breakingNews.length > 1 ? 'ies' : 'y'} — scroll down to read</span>
              </div>
            </div>
          )}

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

          <div className={styles.categoryTabs}>
            <button className={`${styles.categoryTab} ${activeCategory === 'all' ? styles.categoryTabActive : ''}`} onClick={() => setActiveCategory('all')}>
              All
            </button>
            {categories.map((cat) => {
              const config = categoryConfig[cat];
              return (
                <button
                  key={cat}
                  className={`${styles.categoryTab} ${activeCategory === cat ? styles.categoryTabActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  style={activeCategory === cat ? { background: config.bg, color: config.color, borderColor: config.color } : {}}
                >
                  <span>{config.icon}</span> {cat}
                  <span className={styles.categoryCount}>{categoryCounts[cat] || 0}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.tabContent}>
            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📰</div>
                <h3 className={styles.emptyTitle}>No articles found</h3>
                <p className={styles.emptyText}>Try adjusting your search or category filter.</p>
              </div>
            ) : (
              <div className={styles.newsList}>
                {breakingNews.map((article) => (
                  <article key={article.id} className={`${styles.newsCard} ${styles.breakingCard}`} onClick={() => setSelectedArticle(article)}>
                    <div className={styles.newsImage}>
                      <img src={article.image} alt={article.title} loading="lazy" />
                      <span className={styles.newsCategoryBadge} style={{ background: categoryConfig[article.category]?.bg, color: categoryConfig[article.category]?.color }}>
                        {categoryConfig[article.category]?.icon} {article.category}
                      </span>
                    </div>
                    <div className={styles.newsBody}>
                      <div className={styles.newsHeader}>
                        <span className={`${styles.badge} ${styles.breakingBadge}`}>Breaking</span>
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
                ))}
                {regularNews.map((article) => {
                  const catConfig = categoryConfig[article.category] || categoryConfig.Breaking;
                  return (
                    <article key={article.id} className={styles.newsCard} onClick={() => setSelectedArticle(article)}>
                      <div className={styles.newsImage}>
                        <img src={article.image} alt={article.title} loading="lazy" />
                        <span className={styles.newsCategoryBadge} style={{ background: catConfig.bg, color: catConfig.color }}>
                          {catConfig.icon} {article.category}
                        </span>
                      </div>
                      <div className={styles.newsBody}>
                        <div className={styles.newsHeader}>
                          <span className={`${styles.badge} ${styles.regularBadge}`}>{article.category}</span>
                          <span className={styles.time}>{getRelativeTime(article.time)}</span>
                        </div>
                        <h2 className={styles.newsTitle}>{article.title}</h2>
                        <p className={styles.newsExcerpt}>{article.excerpt}</p>
                        <div className={styles.newsMetaRow}>
                          <span className={styles.readTime}>⏱️ {article.readTime}</span>
                          <span className={styles.author}>✍️ {article.author}</span>
                        </div>
                        <div className={styles.newsFooter}>
                          <span className={styles.newsStats}>
                            <span>💬 {article.comments}</span>
                            <span>🔄 {article.shares}</span>
                          </span>
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
