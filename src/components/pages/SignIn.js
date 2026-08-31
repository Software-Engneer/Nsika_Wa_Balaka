import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../styles/SignIn.module.css';

function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const result = signIn({
        identifier: formData.identifier,
        password: formData.password,
      });

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 400);
  };

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
            <div className={styles.header}>
              <h1 className={styles.title}>Welcome Back</h1>
              <p className={styles.subtitle}>Sign in to your Kwathu account</p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="identifier">Email or Phone</label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  className={styles.input}
                  placeholder="you@example.com or +265 999 123 456"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <label className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className={styles.checkboxText}>Remember me</span>
              </label>

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p className={styles.footerText}>
                Don't have an account? <a href="/register" className={styles.link}>Create account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
