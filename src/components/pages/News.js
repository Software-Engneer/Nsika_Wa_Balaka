import React from 'react';
import styles from '../styles/News.module.css';

const newsItems = [
  {
    id: 1,
    title: 'Balaka Market Fire Destroys 10 Stalls',
    excerpt: 'A fire broke out early this morning at the main market in Balaka, destroying an estimated 10 stalls. Firefighters responded quickly and no injuries were reported.',
    category: 'Breaking',
    time: '2 hours ago',
    author: 'Kwathu News',
    isBreaking: true,
  },
  {
    id: 2,
    title: 'New Road Construction Begins in Balaka Township',
    excerpt: 'The Ministry of Transport has announced the start of a major road rehabilitation project in Balaka township, expected to improve connectivity within the district.',
    category: 'Development',
    time: '5 hours ago',
    author: 'Kwathu News',
    isBreaking: false,
  },
  {
    id: 3,
    title: 'Local Football Club Advances to Semi-Finals',
    excerpt: 'Balaka United FC has secured a spot in the semi-finals after a thrilling 2-1 victory over Mulanje FC at the Balaka Stadium.',
    category: 'Sports',
    time: '8 hours ago',
    author: 'Kwathu Sports',
    isBreaking: false,
  },
  {
    id: 4,
    title: 'Community Health Initiative Launches in Balaka',
    excerpt: 'A new health outreach program has been launched to provide free medical checkups and malaria prevention supplies to residents in rural areas around Balaka.',
    category: 'Health',
    time: '12 hours ago',
    author: 'Kwathu Health',
    isBreaking: false,
  },
  {
    id: 5,
    title: 'Rainfall Warning Issued for Balaka and Surrounding Areas',
    excerpt: 'The Department of Climate Change has issued a heavy rainfall warning for Balaka and neighboring districts. Residents are advised to take necessary precautions.',
    category: 'Weather',
    time: '1 day ago',
    author: 'Kwathu News',
    isBreaking: true,
  },
  {
    id: 6,
    title: 'Balaka Youth Group Wins National Entrepreneurship Award',
    excerpt: 'A local youth entrepreneurship group from Balaka has been recognized nationally for their innovative agricultural startup creating jobs for young people.',
    category: 'Business',
    time: '1 day ago',
    author: 'Kwathu Business',
    isBreaking: false,
  },
];

function News() {
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
            <a href="/news" className={`${styles.sidebarLink} ${styles.active}`}>
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
          <div className={styles.header}>
            <h1 className={styles.title}>Local News - Balaka</h1>
            <p className={styles.subtitle}>Stay updated with what is happening around Balaka</p>
          </div>

          <div className={styles.newsList}>
            {newsItems.map((item) => (
              <article key={item.id} className={styles.newsCard}>
                <div className={styles.newsHeader}>
                  <span className={`${styles.badge} ${item.isBreaking ? styles.breaking : styles.regular}`}>
                    {item.isBreaking ? 'Breaking' : item.category}
                  </span>
                  <span className={styles.time}>{item.time}</span>
                </div>
                <h2 className={styles.newsTitle}>{item.title}</h2>
                <p className={styles.newsExcerpt}>{item.excerpt}</p>
                <div className={styles.newsFooter}>
                  <span className={styles.author}>{item.author}</span>
                  <button className={styles.readMore}>Read More</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
