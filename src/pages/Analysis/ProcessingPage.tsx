import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { saveAnalysisResult } from '../../services/db/analysisService';
import styles from './ProcessingPage.module.css';

export const ProcessingPage = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isSaving = useRef(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          if (!isSaving.current && user) {
            isSaving.current = true;
            
            const track = location.state?.track;
            
            // Generate dummy analysis data and save to DB
            const dummyData = {
              trackId: track?.id || 'blinding-lights',
              trackTitle: track?.name || 'Blinding Lights',
              artistName: track?.artist || 'The Weeknd',
              coverUrl: track?.coverUrl || '',
              vibe: 'ENERGETIC',
              confidence: 94,
              metrics: {
                energy: 90,
                danceability: 85,
                valence: 65,
                tempo: 100,
                acousticness: 25,
                instrumentalness: 10
              },
              insights: {
                rhythm: 'High-energy rhythmic profile',
                movement: 'Strong danceability',
                mood: 'Uplifting Melancholy'
              }
            };
            
            saveAnalysisResult(user.uid, dummyData).then((id) => {
              navigate(`/analyze/result?id=${id}`);
            }).catch(() => {
              // fallback
              navigate('/analyze/result');
            });
          } else if (!user) {
            navigate('/analyze/result');
          }
          
          return 100;
        }
        // Random increment between 1 and 15
        const increment = Math.floor(Math.random() * 15) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 300);

    return () => clearInterval(interval);
  }, [navigate, user]);

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
