import React, { useState } from 'react';
import styles from '../styles/SignIn.module.css';

function SignIn() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in submitted:', formData);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your Msika Wa Balaka account</p>
        </div>

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

          <button type="submit" className={styles.submitButton}>Sign In</button>

          <p className={styles.footerText}>
            Don't have an account? <a href="/register" className={styles.link}>Create account</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
