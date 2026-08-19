import { Outlet, Link } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
  return (
    <div className={styles.container}>
      {/* Ambient background effect */}
      <div className={styles.ambientTop}></div>
      <div className={styles.ambientBottom}></div>

      <div className={styles.content}>
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoIcon}>
              <div className={styles.logoLine}></div>
              <div className={styles.logoLine}></div>
              <div className={styles.logoLine}></div>
              <div className={styles.logoLine}></div>
            </div>
            <span className={styles.brandTitle}>SONORA AI</span>
          </Link>
        </div>
        
        <div className={styles.card}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
