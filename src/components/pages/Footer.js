import React from 'react';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>Kwathu</h3>
            <p className={styles.brandText}>
              Connect with Balaka. Share news, sports updates, marketplace listings, and community moments.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Platform</h4>
              <a href="/" className={styles.link}>Feed</a>
              <a href="/explore" className={styles.link}>Explore</a>
              <a href="/news" className={styles.link}>News</a>
              <a href="/sports" className={styles.link}>Sports</a>
              <a href="/categories" className={styles.link}>Marketplace</a>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Account</h4>
              <a href="/profile" className={styles.link}>Profile</a>
              <a href="/messages" className={styles.link}>Messages</a>
              <a href="/notifications" className={styles.link}>Notifications</a>
              <a href="/settings" className={styles.link}>Settings</a>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Legal</h4>
              <button type="button" className={styles.link}>Terms of Service</button>
              <button type="button" className={styles.link}>Privacy Policy</button>
              <button type="button" className={styles.link}>Community Guidelines</button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} Kwathu. All rights reserved.</p>
          <div className={styles.socials}>
            <button type="button" className={styles.social} aria-label="Facebook">FB</button>
            <button type="button" className={styles.social} aria-label="Twitter">TW</button>
            <button type="button" className={styles.social} aria-label="Instagram">IG</button>
            <button type="button" className={styles.social} aria-label="WhatsApp">WA</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
