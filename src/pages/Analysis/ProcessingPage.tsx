import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { saveAnalysisResult } from '../../services/db/analysisService';
import { predictionService } from '../../features/analysis/services/predictionService';
import { useMusicModel } from '../../features/analysis/hooks/useMusicModel';
import { getAudioFeaturesForTrack } from '../../features/analysis/utils/featureMapper';
import styles from './ProcessingPage.module.css';

export const ProcessingPage = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Preparing AI model...');
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isSaving = useRef(false);
  const { status: modelStatus, error: modelError } = useMusicModel();

  useEffect(() => {
    if (modelStatus === 'error') {
      setLoadingText(modelError || 'Error loading AI model. Please retry.');
      return;
    }
    
    if (modelStatus !== 'ready') {
      return; // wait for model
    }

    setLoadingText('Analyzing song characteristics...');
    
    const interval = setInterval(async () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          if (!isSaving.current && user) {
            isSaving.current = true;
            
            const track = location.state?.track;
            const trackId = track?.id || 'blinding-lights';
            
            // 1. Get Features
            const features = getAudioFeaturesForTrack(trackId);
            
            // 2. TFJS Prediction Inference
            predictionService.predict(features).then(predictionResult => {
              
              const analysisData = {
                trackId,
                trackTitle: track?.name || 'Blinding Lights',
                artistName: track?.artist || 'The Weeknd',
                coverUrl: track?.coverUrl || '',
                previewUrl: track?.previewUrl || '',
                vibe: predictionResult.predictedClass,
                confidence: predictionResult.confidence,
                predictions: predictionResult.predictions,
                metrics: {
                  energy: Math.round(features.energy * 100),
                  danceability: Math.round(features.danceability * 100),
                  valence: Math.round(features.valence * 100),
                  tempo: Math.round(features.tempo),
                  acousticness: Math.round(features.acousticness * 100),
                  instrumentalness: Math.round(features.instrumentalness * 100)
                },
                insights: {
                  rhythm: `Analyzed tempo at ${Math.round(features.tempo)} BPM.`,
                  movement: `Danceability score of ${Math.round(features.danceability * 100)}%.`,
                  mood: predictionResult.predictedClass + ' profile detected.'
                }
              };
              
              saveAnalysisResult(user.uid, analysisData).then((id) => {
                navigate(`/analyze/result?id=${id}`);
              }).catch(() => {
                navigate('/analyze/result');
              });
            });
          } else if (!user) {
            navigate('/analyze/result');
          }
          
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [navigate, user, modelStatus]);

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
      <p className={styles.text}>{loadingText}</p>
    </div>
  );
};
