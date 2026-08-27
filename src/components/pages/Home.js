import React from 'react';
import styles from '../styles/Home.module.css';

const posts = [
  {
    id: 1,
    author: 'Chifundo Banda',
    avatar: '👤',
    time: '2 hours ago',
    content: 'Just arrived in Balaka! The weather is beautiful today. 🌤️',
    likes: 24,
    comments: 5,
    shares: 2,
  },
  {
    id: 2,
    author: 'Grace Phiri',
    avatar: '👩',
    time: '4 hours ago',
    content: 'Community meeting at the local hall tomorrow at 10 AM. Everyone welcome! 📢',
    likes: 56,
    comments: 12,
    shares: 8,
  },
  {
    id: 3,
    author: 'James Kachali',
    avatar: '👨',
    time: '6 hours ago',
    content: 'New business opening in town - Kwathu Café! Come support local entrepreneurship. ☕',
    likes: 89,
    comments: 23,
    shares: 15,
  },
];

const stories = [
  { id: 1, name: 'Your Story', avatar: '➕' },
  { id: 2, name: 'Chifundo', avatar: '👤' },
  { id: 3, name: 'Grace', avatar: '👩' },
  { id: 4, name: 'James', avatar: '👨' },
  { id: 5, name: 'Mary', avatar: '👩‍🦰' },
];

function Home() {
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
            <a href="/categories" className={styles.sidebarLink}>
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
          <div className={styles.storiesRow}>
            {stories.map((story) => (
              <div key={story.id} className={styles.storyCard}>
                <div className={styles.storyAvatar}>{story.avatar}</div>
                <span className={styles.storyName}>{story.name}</span>
              </div>
            ))}
          </div>

          <div className={styles.createPost}>
            <div className={styles.createAvatar}>👤</div>
            <div className={styles.createInputWrapper}>
              <input
                type="text"
                placeholder="What's happening in Balaka?"
                className={styles.createInput}
              />
              <div className={styles.createActions}>
                <button className={styles.createButton}>Post</button>
              </div>
            </div>
          </div>

          <div className={styles.feed}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <div className={styles.postAvatar}>{post.avatar}</div>
                  <div className={styles.postMeta}>
                    <h4 className={styles.postAuthor}>{post.author}</h4>
                    <span className={styles.postTime}>{post.time}</span>
                  </div>
                </div>
                <p className={styles.postContent}>{post.content}</p>
                <div className={styles.postActions}>
                  <button className={styles.postAction}>
                    <span>❤️</span> {post.likes}
                  </button>
                  <button className={styles.postAction}>
                    <span>💬</span> {post.comments}
                  </button>
                  <button className={styles.postAction}>
                    <span>🔄</span> {post.shares}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightSidebar}>
          <div className={styles.trendingCard}>
            <h3 className={styles.trendingTitle}>Trending in Balaka</h3>
            <div className={styles.trendingItem}>
              <span className={styles.trendingTag}>#Community</span>
              <span className={styles.trendingCount}>128 posts</span>
            </div>
            <div className={styles.trendingItem}>
              <span className={styles.trendingTag}>#LocalBusiness</span>
              <span className={styles.trendingCount}>84 posts</span>
            </div>
            <div className={styles.trendingItem}>
              <span className={styles.trendingTag}>#Events</span>
              <span className={styles.trendingCount}>56 posts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
