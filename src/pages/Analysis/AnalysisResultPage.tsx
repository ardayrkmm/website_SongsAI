import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAnalysisResult } from '../../services/db/analysisService';
import type { AnalysisRecord } from '../../services/db/analysisService';
import { toggleFavoriteSong, checkIsFavorited } from '../../services/db/musicService';
import { getRecommendationsByArtist } from '../../services/api/spotifyService';
import type { SpotifyTrack } from '../../services/api/spotifyService';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AnalysisResultPage.module.css';

export const AnalysisResultPage = () => {
  const [data, setData] = useState<AnalysisRecord | null>(null);
  const [similarTracks, setSimilarTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnalysis = async () => {
      // 1. Prioritize data passed via React Router state (essential if Firebase save fails or guest mode)
      if (location.state?.analysisData) {
        const result = location.state.analysisData as AnalysisRecord;
        setData(result);
        if (user && result.id) {
          const fav = await checkIsFavorited(user.uid, result.trackId);
          setIsFavorite(fav);
        }
        const recs = await getRecommendationsByArtist(result.artistName, 3);
        setSimilarTracks(recs);
        setLoading(false);
        return;
      }

      // 2. Fallback to fetching from Firebase using ID
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      
      if (id) {
        try {
          const result = await getAnalysisResult(id);
          if (result) {
            setData(result);
            if (user) {
              const fav = await checkIsFavorited(user.uid, result.trackId);
              setIsFavorite(fav);
            }
            const recs = await getRecommendationsByArtist(result.artistName, 3);
            setSimilarTracks(recs);
          }
        } catch (err) {
          console.error("Failed to fetch analysis result from DB:", err);
        }
      }
      setLoading(false);
    };

    fetchAnalysis();
  }, [location, user]);

  const handleToggleFavorite = async () => {
    if (!user || !data) return;
    const trackData = {
      id: data.trackId,
      name: data.trackTitle,
      artist: data.artistName,
      album: 'Unknown',
      coverUrl: data.coverUrl || '',
      previewUrl: null,
      durationMs: 0
    };
    
    const newStatus = await toggleFavoriteSong(user.uid, trackData);
    setIsFavorite(newStatus);
  };

  if (loading) {
    return <div className={styles.container}>Loading analysis...</div>;
  }

  // Fallback to dummy data if not found in DB (for presentation)
  const displayData: AnalysisRecord = data || {
    userId: 'guest',
    trackId: 'blinding-lights',
    createdAt: new Date(),
    trackTitle: 'Blinding Lights',
    artistName: 'The Weeknd',
    vibe: 'ENERGETIC',
    confidence: 94,
    predictions: [
      { label: 'ENERGETIC', probability: 94 },
      { label: 'EUPHORIC', probability: 5 },
      { label: 'CHILL', probability: 1 }
    ],
    metrics: { energy: 90, danceability: 85, valence: 65, tempo: 100, acousticness: 25, instrumentalness: 10 },
    insights: {
      rhythm: 'Synthesizer-driven beat structure driving a consistent high tempo suitable for active listening.',
      movement: 'Prominent 4/4 kick pattern with clear syncopation makes this highly conducive to physical movement.',
      mood: 'High valence combined with minor key progressions creates a complex, bittersweet emotional response.'
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/analyze" className={styles.backLink}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        BACK TO ANALYSIS HISTORY
      </Link>
      
      <div className={styles.header}>
        <div>
          <div className={styles.subtitle}>AI Music Analysis</div>
          <h1 className={styles.title}>
            <span className={styles.highlight}>{displayData.trackTitle}</span> • {displayData.artistName}
          </h1>
          
          {/* Audio Preview Player */}
          {data?.previewUrl && (
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--color-surface-container-high)', padding: '8px 16px', borderRadius: '24px', width: 'fit-content' }}>
              <audio controls controlsList="nodownload noplaybackrate" src={data.previewUrl} style={{ height: '32px', outline: 'none' }}>
                Your browser does not support the audio element.
              </audio>
              <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                30s Preview
              </div>
            </div>
          )}
        </div>
        
        {user && data && (
          <button 
            onClick={handleToggleFavorite}
            style={{
              background: 'transparent', 
              border: '1px solid var(--color-outline-variant)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: isFavorite ? 'var(--color-primary)' : 'var(--color-on-surface)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {isFavorite ? 'Saved to Favorites' : 'Save Song'}
          </button>
        )}
      </div>

      <div className={styles.topSection}>
        <div className={styles.mainGrid}>
          {/* Top Predictions / Vibe Classification */}
          <div className={styles.vibeCard}>
            <h3>Top Predictions (AI Category Classification)</h3>
            <div className={styles.vibeMain}>
              <div className={styles.vibeLabel}>{displayData.vibe}</div>
              <div className={styles.confidence}>
                {displayData.confidence}% Confidence
              </div>
            </div>
            
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(displayData.predictions || []).slice(0,3).map((pred: {label: string; probability: number}, idx: number) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--color-on-surface)' }}>{pred.label}</span>
                    <span style={{ color: 'var(--color-on-surface-variant)' }}>{pred.probability}%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'var(--color-surface-container-high)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pred.probability}%`, backgroundColor: idx === 0 ? 'var(--color-primary)' : idx === 1 ? 'var(--color-secondary)' : 'var(--color-tertiary)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.dnaCard}>
          <div className={styles.cardHeader}>
            <div>
              <h3>Music DNA Profile</h3>
              <p>Multidimensional sonic analysis</p>
            </div>
            <div className={styles.infoIcon}>i</div>
          </div>
          
          <div className={styles.radarWrapper}>
            {/* Mock Radar Chart using SVG */}
            <svg viewBox="0 0 200 200" className={styles.radarChart}>
              <polygon points="100,20 180,60 180,140 100,180 20,140 20,60" className={styles.radarGrid} />
              <polygon points="100,50 150,75 150,125 100,150 50,125 50,75" className={styles.radarGrid} />
              <line x1="100" y1="100" x2="100" y2="20" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="180" y2="60" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="180" y2="140" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="100" y2="180" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="20" y2="140" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="20" y2="60" className={styles.radarAxis} />
              
              <polygon points="100,20 160,80 160,150 100,180 30,130 40,50" className={styles.radarData} />
              <circle cx="100" cy="20" r="4" className={styles.radarPoint} />
              <circle cx="160" cy="80" r="4" className={styles.radarPoint} />
              <circle cx="160" cy="150" r="4" className={styles.radarPoint} />
              <circle cx="100" cy="180" r="4" className={styles.radarPoint} />
              <circle cx="30" cy="130" r="4" className={styles.radarPoint} />
              <circle cx="40" cy="50" r="4" className={styles.radarPoint} />
            </svg>
            
            <span className={styles.radarLabel} style={{top: '0', left: '50%', transform: 'translate(-50%, -100%)'}}>ENERGY</span>
            <span className={styles.radarLabel} style={{top: '25%', right: '-10%'}}>DANCE</span>
            <span className={styles.radarLabel} style={{bottom: '25%', right: '-10%'}}>VALENCE</span>
            <span className={styles.radarLabel} style={{bottom: '0', left: '50%', transform: 'translate(-50%, 100%)'}}>TEMPO</span>
            <span className={styles.radarLabel} style={{bottom: '25%', left: '-10%'}}>ACOUSTIC</span>
            <span className={styles.radarLabel} style={{top: '25%', left: '-20%'}}>INSTRUMENTAL</span>
          </div>
        </div>
      </div>

      <section className={styles.insightsSection}>
        <h2>AI Insights</h2>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              RHYTHM
            </div>
            <h3>High-energy rhythmic profile</h3>
            <p>{displayData.insights.rhythm}</p>
          </div>
          
          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              MOVEMENT
            </div>
            <h3>Strong danceability</h3>
            <p>{displayData.insights.movement}</p>
          </div>
          
          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              MOOD
            </div>
            <h3>Emotional Complex</h3>
            <p>{displayData.insights.mood}</p>
          </div>
        </div>
      </section>

      <section className={styles.similarSection}>
        <h2>Songs with similar Music DNA</h2>
        <div className={styles.similarList}>
          {similarTracks.length > 0 ? (
            similarTracks.map((song, i) => (
              <div key={song.id + i} className={styles.similarItem}>
                <div className={styles.similarLeft}>
                  <div className={styles.similarThumb} style={{ backgroundImage: `url(${song.coverUrl})`, backgroundSize: 'cover' }}>
                    {!song.coverUrl && <div className={styles.miniWave}></div>}
                  </div>
                  <div className={styles.similarInfo}>
                    <h4>{song.name}</h4>
                    <p>{song.artist}</p>
                  </div>
                </div>
                <div className={styles.similarMatch}>
                  {90 - i * 3}% Match 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px' }}>Loading similar tracks...</div>
          )}
        </div>
      </section>
    </div>
  );
};
