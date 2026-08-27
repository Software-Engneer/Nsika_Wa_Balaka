import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/header.module.css";
import Contact from "./Contact";
import Modal from "../Modal";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const navRef = useRef(null);
  const accountRef = useRef(null);
  const exploreRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path ? styles.active : "";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setIsExploreOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isAccountOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContent}>
        <a href="/" className={styles.logo} title="Kwathu - Home">
          <span className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoHighlight}>Kwathu</span>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <a href="/" className={`${styles.navLink} ${isActive('/')}`}>
            <span className={styles.linkText}>Feed</span>
            <span className={styles.linkUnderline}></span>
          </a>
          <div className={styles.navDropdown} ref={exploreRef}>
            <button
              className={`${styles.navLink} ${isActive('/explore')}`}
              onClick={() => setIsExploreOpen((prev) => !prev)}
              aria-expanded={isExploreOpen}
            >
              <span className={styles.linkText}>Explore</span>
              <svg className={`${styles.navChevron} ${isExploreOpen ? styles.navChevronOpen : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isExploreOpen && (
              <div className={styles.navDropdownMenu}>
                <button className={styles.navDropdownItem} onClick={() => { navigate('/explore'); setIsExploreOpen(false); }}>
                  <span className={styles.dropdownIcon}>🔥</span>
                  Trending
                </button>
                <button className={styles.navDropdownItem} onClick={() => { navigate('/news'); setIsExploreOpen(false); }}>
                  <span className={styles.dropdownIcon}>📰</span>
                  News
                </button>
                <button className={styles.navDropdownItem} onClick={() => { navigate('/events'); setIsExploreOpen(false); }}>
                  <span className={styles.dropdownIcon}>🎉</span>
                  Events
                </button>
                <button className={styles.navDropdownItem} onClick={() => { navigate('/sports'); setIsExploreOpen(false); }}>
                  <span className={styles.dropdownIcon}>⚽</span>
                  Sports
                </button>
                <button className={styles.navDropdownItem} onClick={() => { navigate('/categories'); setIsExploreOpen(false); }}>
                  <span className={styles.dropdownIcon}>🛒</span>
                  Marketplace
                </button>
              </div>
            )}
          </div>
          <a href="/messages" className={`${styles.navLink} ${isActive('/messages')}`}>
            <span className={styles.linkText}>Messages</span>
            <span className={styles.linkUnderline}></span>
          </a>
          <a href="/notifications" className={`${styles.navLink} ${isActive('/notifications')}`}>
            <span className={styles.linkText}>Notifications</span>
            <span className={styles.linkUnderline}></span>
          </a>
          <a href="/profile" className={`${styles.navLink} ${isActive('/profile')}`}>
            <span className={styles.linkText}>Profile</span>
            <span className={styles.linkUnderline}></span>
          </a>
        </nav>

        <form className={styles.searchBar} onSubmit={handleSearch}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search people, posts..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search people, posts"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </form>

        <div className={styles.headerActions}>
          <button className={styles.iconButton} aria-label="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className={styles.cartBadge}>3</span>
          </button>

          <div className={styles.accountWrapper} ref={accountRef}>
            <button
              className={styles.iconButton}
              aria-label="Account"
              aria-expanded={isAccountOpen}
              onClick={() => setIsAccountOpen((prev) => !prev)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {isAccountOpen && (
              <div className={styles.accountDropdown}>
                <a href="/profile" className={styles.accountLink}>Profile</a>
                <a href="/settings" className={styles.accountLink}>Settings</a>
                <a href="/login" className={styles.accountLink}>Sign In</a>
                <a href="/register" className={styles.accountLink}>Sign Up</a>
                <button className={styles.accountSignOut} onClick={() => navigate('/logout')}>Sign Out</button>
              </div>
            )}
          </div>

          <button
            className={styles.ctaButton}
            onClick={() => navigate('/create')}
            aria-label="Create post"
          >
            Create
          </button>
        </div>

        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
        </button>
      </div>

      <nav
        ref={navRef}
        className={`${styles.mobileNav} ${isMenuOpen ? styles.active : ""}`}
        aria-label="Mobile navigation"
      >
        <form className={styles.mobileSearch} onSubmit={handleSearch}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search people, posts..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search people, posts"
          />
        </form>

        <div className={styles.mobileNavList}>
          <a href="/" className={`${styles.navLink} ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Feed</span>
          </a>
          <a href="/explore" className={`${styles.navLink} ${isActive('/explore')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Explore</span>
          </a>
          <a href="/news" className={`${styles.navLink} ${isActive('/news')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>News</span>
          </a>
          <a href="/sports" className={`${styles.navLink} ${isActive('/sports')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Sports</span>
          </a>
          <a href="/events" className={`${styles.navLink} ${isActive('/events')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Events</span>
          </a>
          <a href="/categories" className={`${styles.navLink} ${isActive('/categories')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Marketplace</span>
          </a>
          <a href="/messages" className={`${styles.navLink} ${isActive('/messages')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Messages</span>
          </a>
          <a href="/notifications" className={`${styles.navLink} ${isActive('/notifications')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Notifications</span>
          </a>
          <a href="/profile" className={`${styles.navLink} ${isActive('/profile')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Profile</span>
          </a>
          <div className={styles.mobileAccount}>
            <a href="/login" className={styles.mobileAccountLink} onClick={() => setIsMenuOpen(false)}>Sign In</a>
            <a href="/register" className={styles.mobileAccountLink} onClick={() => setIsMenuOpen(false)}>Sign Up</a>
            <button className={styles.mobileSignOut} onClick={() => { navigate('/logout'); setIsMenuOpen(false); }}>Sign Out</button>
          </div>
        </div>
      </nav>

      {showContact && (
        <Modal open={showContact} onClose={() => setShowContact(false)}>
          <Contact />
        </Modal>
      )}
    </header>
  );
};

export default Header;
