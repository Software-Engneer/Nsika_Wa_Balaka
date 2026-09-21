import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import CommentSection from '../CommentSection';
import styles from '../styles/Home.module.css';

const stories = [
  { id: 1, name: 'Your Story', avatar: '➕' },
  { id: 2, name: 'Chifundo', avatar: '👤' },
  { id: 3, name: 'Grace', avatar: '👩' },
  { id: 4, name: 'James', avatar: '👨' },
  { id: 5, name: 'Mary', avatar: '👩‍🦰' },
];

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('kwathu_liked_posts');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.posts.getAll({ limit: 20 });
      if (response.success && response.posts) {
        setPosts(response.posts);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

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
    fetchPosts();
    fetchNotificationCount();
  }, [user, fetchNotificationCount]);

  useEffect(() => {
    localStorage.setItem('kwathu_liked_posts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  const handlePost = async () => {
    if (!user || !postContent.trim() || posting) return;

    setPosting(true);
    try {
      const response = await api.posts.create({ content: postContent.trim() });
      if (response.success && response.post) {
        setPosts(prev => [response.post, ...prev]);
        setPostContent('');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to post. Please try again.');
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user) return;

    const wasLiked = likedPosts.includes(postId);
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, likes: wasLiked ? p.likes - 1 : p.likes + 1 } : p
    ));
    setLikedPosts(prev => wasLiked ? prev.filter(l => l !== postId) : [...prev, postId]);

    try {
      await api.posts.like(postId);
    } catch (error) {
      // Revert on error
      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, likes: wasLiked ? p.likes + 1 : p.likes - 1 } : p
      ));
      setLikedPosts(prev => wasLiked ? [...prev, postId] : prev.filter(l => l !== postId));
      console.error('Failed to like post:', error);
    }
  };

  const handleComment = (post) => {
    if (!user) return;
    setSelectedPost(post);
  };

  const handleShare = async (post) => {
    if (!user) return;
    try {
      await api.posts.share(post.id);
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, shares: p.shares + 1 } : p));
      if (navigator.share) {
        navigator.share({ title: 'Kwathu Post', text: post.content });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(post.content);
        alert('Post copied to clipboard!');
      }
    } catch (error) {
      console.error('Failed to share post:', error);
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
              <span>🔔</span> Notifications {notificationCount > 0 && <span className={styles.badge}>{notificationCount}</span>}
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
                  disabled={posting}
                />
                <div className={styles.createActions}>
                  <button className={styles.createButton} onClick={handlePost} disabled={posting || !postContent.trim()}>
                    {posting ? 'Posting...' : 'Post'}
                  </button>
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
            {loading ? (
              <div className={styles.loading}>Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className={styles.emptyFeed}>
                <p>No posts yet. Be the first to share something!</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>{post.avatar}</div>
                    <div className={styles.postMeta}>
                      <h4 className={styles.postAuthor}>{post.author}</h4>
                      <span className={styles.postTime}>{formatRelativeTime(post.time)}</span>
                    </div>
                  </div>
                  <p className={styles.postContent}>{post.content}</p>
                  <div className={styles.postActions}>
                    <button
                      className={`${styles.postAction} ${!user ? styles.postActionDisabled : ''} ${likedPosts.includes(post.id) ? styles.liked : ''}`}
                      onClick={() => handleLike(post.id)}
                      title={!user ? 'Sign in to like' : ''}
                    >
                      <span>{likedPosts.includes(post.id) ? '❤️' : '🤍'}</span> {post.likes}
                    </button>
                    <button
                      className={`${styles.postAction} ${!user ? styles.postActionDisabled : ''}`}
                      onClick={() => handleComment(post)}
                      title={!user ? 'Sign in to comment' : ''}
                    >
                      <span>💬</span> {post.comments}
                    </button>
                    <button
                      className={`${styles.postAction} ${!user ? styles.postActionDisabled : ''}`}
                      onClick={() => handleShare(post)}
                      title={!user ? 'Sign in to share' : ''}
                    >
                      <span>🔄</span> {post.shares}
                    </button>
                  </div>
                </div>
              ))
            )}
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

      {selectedPost && (
        <div className={styles.modalOverlay} onClick={() => setSelectedPost(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedPost(null)}>✕</button>
            <div className={styles.modalBody}>
              <div className={styles.modalPost}>
                <div className={styles.modalPostHeader}>
                  <div className={styles.modalPostAvatar}>{selectedPost.avatar}</div>
                  <div>
                    <h4 className={styles.modalPostAuthor}>{selectedPost.author}</h4>
                    <span className={styles.modalPostTime}>{formatRelativeTime(selectedPost.time)}</span>
                  </div>
                </div>
                <p className={styles.modalPostContent}>{selectedPost.content}</p>
              </div>
              <CommentSection commentableType="Post" commentableId={selectedPost.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;