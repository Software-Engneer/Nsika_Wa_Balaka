import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/header.module.css";
import Contact from "./Contact";
import Modal from "../Modal";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(3);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const navRef = useRef(null);
  const accountRef = useRef(null);

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
        <a href="/" className={styles.logo} title="Msika Wa Balaka - Home">
          <span className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoHighlight}>Nsika</span> Wa Balaka
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <a href="/" className={`${styles.navLink} ${isActive('/')}`}>
            <span className={styles.linkText}>Home</span>
            <span className={styles.linkUnderline}></span>
          </a>
          <a href="/products" className={`${styles.navLink} ${isActive('/products')}`}>
            <span className={styles.linkText}>Products</span>
            <span className={styles.linkUnderline}></span>
          </a>
          <a href="/categories" className={`${styles.navLink} ${isActive('/categories')}`}>
            <span className={styles.linkText}>Categories</span>
            <span className={styles.linkUnderline}></span>
          </a>
          <a href="/deals" className={`${styles.navLink} ${isActive('/deals')}`}>
            <span className={styles.linkText}>Deals</span>
            <span className={styles.linkUnderline}></span>
          </a>
          <a href="/about" className={`${styles.navLink} ${isActive('/about')}`}>
            <span className={styles.linkText}>About</span>
            <span className={styles.linkUnderline}></span>
          </a>
          <a href="/contact" className={`${styles.navLink} ${isActive('/contact')}`}>
            <span className={styles.linkText}>Contact</span>
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
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
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
          <button className={styles.iconButton} aria-label="Shopping cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>

          <div className={styles.accountWrapper} ref={accountRef}>
            <button
              className={styles.iconButton}
              aria-label="Account"
              aria-expanded={isAccountOpen}
              onClick={() => setIsAccountOpen((prev) => !prev)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {isAccountOpen && (
              <div className={styles.accountDropdown}>
                <a href="/login" className={styles.accountLink}>Sign In</a>
                <a href="/register" className={styles.accountLink}>Register</a>
                <button className={styles.accountSignOut}>Sign Out</button>
              </div>
            )}
          </div>

          <button
            className={styles.ctaButton}
            onClick={() => setShowContact(true)}
            aria-label="Open contact form"
          >
            GET IN TOUCH
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
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
        </form>

        <div className={styles.mobileNavList}>
          <a href="/" className={`${styles.navLink} ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Home</span>
          </a>
          <a href="/products" className={`${styles.navLink} ${isActive('/products')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Products</span>
          </a>
          <a href="/categories" className={`${styles.navLink} ${isActive('/categories')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Categories</span>
          </a>
          <a href="/deals" className={`${styles.navLink} ${isActive('/deals')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Deals</span>
          </a>
          <a href="/about" className={`${styles.navLink} ${isActive('/about')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>About</span>
          </a>
          <a href="/contact" className={`${styles.navLink} ${isActive('/contact')}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.linkText}>Contact</span>
          </a>
          <div className={styles.mobileAccount}>
            <a href="/login" className={styles.mobileAccountLink} onClick={() => setIsMenuOpen(false)}>Sign In</a>
            <a href="/register" className={styles.mobileAccountLink} onClick={() => setIsMenuOpen(false)}>Register</a>
            <button className={styles.mobileSignOut} onClick={() => setIsMenuOpen(false)}>Sign Out</button>
          </div>
          <button
            className={styles.getInTouchButton}
            onClick={() => {
              setShowContact(true);
              setIsMenuOpen(false);
            }}
            aria-label="Open contact form"
          >
            GET IN TOUCH
          </button>
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
