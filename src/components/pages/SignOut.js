import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SignOut.module.css';

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

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
          <div className={styles.card}>
            <div className={styles.icon}>👋</div>
            <h1 className={styles.title}>You have been signed out</h1>
            <p className={styles.subtitle}>Thank you for visiting Kwathu.</p>
            <div className={styles.loader}></div>
          </div>
        </div>
        </div>
      </div>
  );
}

export default SignOut;
