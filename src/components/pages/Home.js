import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../styles/Home.module.css';

const defaultPosts = [
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
  const { user } = useAuth();
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('kwathu_posts');
    return saved ? JSON.parse(saved) : defaultPosts;
  });
  const [postContent, setPostContent] = useState('');
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('kwathu_liked');
    return saved ? JSON.parse(saved) : [];
  });
  const nextId = useRef(
    posts.reduce((max, post) => Math.max(max, post.id), 0) + 1
  );

  useEffect(() => {
    localStorage.setItem('kwathu_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('kwathu_liked', JSON.stringify(likedPosts));
  }, [likedPosts]);

  const handlePost = () => {
    if (!user) return;
    const text = postContent.trim();
    if (!text) return;
    const newPost = {
      id: nextId.current,
      author: user.fullName,
      avatar: '👤',
      time: 'Just now',
      content: text,
      likes: 0,
      comments: 0,
      shares: 0,
    };
    nextId.current += 1;
    setPosts([newPost, ...posts]);
    setPostContent('');
  };

  const handleLike = (id) => {
    if (!user) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: likedPosts.includes(id) ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user ? user.fullName : 'Guest'}</h3>
              <p className={styles.userHandle}>{user ? user.email : 'Sign in to participate'}</p>
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

          {user ? (
            <div className={styles.createPost}>
              <div className={styles.createAvatar}>👤</div>
              <div className={styles.createInputWrapper}>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What's happening in Balaka?"
                  className={styles.createInput}
                  rows={3}
                />
                <div className={styles.createActions}>
                  <button className={styles.createButton} onClick={handlePost}>Post</button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.loginPrompt}>
              <div className={styles.loginPromptIcon}>🔒</div>
              <h3 className={styles.loginPromptTitle}>Sign in to interact</h3>
              <p className={styles.loginPromptText}>Create an account to post, like, comment, and send messages.</p>
              <div className={styles.loginPromptActions}>
                <a href="/login" className={styles.loginPromptBtn}>Sign In</a>
                <a href="/register" className={styles.loginPromptBtnSecondary}>Create Account</a>
              </div>
            </div>
          )}

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
                  <button
                    className={`${styles.postAction} ${!user ? styles.postActionDisabled : ''}`}
                    onClick={() => handleLike(post.id)}
                    title={!user ? 'Sign in to like' : ''}
                  >
                    <span>❤️</span> {post.likes}
                  </button>
                  <button
                    className={`${styles.postAction} ${!user ? styles.postActionDisabled : ''}`}
                    title={!user ? 'Sign in to comment' : ''}
                  >
                    <span>💬</span> {post.comments}
                  </button>
                  <button
                    className={`${styles.postAction} ${!user ? styles.postActionDisabled : ''}`}
                    title={!user ? 'Sign in to share' : ''}
                  >
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
