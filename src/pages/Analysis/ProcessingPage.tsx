import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProcessingPage.module.css';

export const ProcessingPage = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/analyze/result'), 500);
          return 100;
        }
        // Random increment between 1 and 15
        const increment = Math.floor(Math.random() * 15) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 300);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.spinnerWrapper}>
        <svg className={styles.spinner} viewBox="0 0 100 100">
          <circle className={styles.bgCircle} cx="50" cy="50" r="45" />
          <circle 
            className={styles.progressCircle} 
            cx="50" 
            cy="50" 
            r="45" 
            style={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
          />
        </svg>
        <div className={styles.percentage}>{progress}%</div>
      </div>
      <p className={styles.text}>Please wait while Sonora AI processes your track.</p>
    </div>
  );
};
