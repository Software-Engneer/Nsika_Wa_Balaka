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
      <div className={styles.card}>
        <div className={styles.icon}>👋</div>
        <h1 className={styles.title}>You have been signed out</h1>
        <p className={styles.subtitle}>Thank you for visiting Msika Wa Balaka.</p>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
}

export default SignOut;
