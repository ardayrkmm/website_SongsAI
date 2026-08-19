import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.glitchBox}>
          <h1 className={styles.errorCode}>404</h1>
        </div>
        <h2 className={styles.title}>Track Not Found</h2>
        <p className={styles.description}>
          The frequency you are trying to tune into does not exist in our music universe. It might have been moved, deleted, or you just have a typo in the URL.
        </p>
        <Link to="/dashboard" className={styles.homeBtn}>
          Return to Dashboard
        </Link>
      </div>
      <div className={styles.backgroundWave}></div>
    </div>
  );
};
