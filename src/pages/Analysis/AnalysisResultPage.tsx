import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAnalysisResult, AnalysisRecord } from '../../services/db/analysisService';
import styles from './AnalysisResultPage.module.css';

export const AnalysisResultPage = () => {
  const [data, setData] = useState<AnalysisRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchAnalysis = async () => {
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      
      if (id) {
        const result = await getAnalysisResult(id);
        if (result) {
          setData(result);
        }
      }
      setLoading(false);
    };

    fetchAnalysis();
  }, [location]);

  if (loading) {
    return <div className={styles.container}>Loading analysis...</div>;
  }

  // Fallback to dummy data if not found in DB (for presentation)
  const displayData = data || {
    trackTitle: 'Blinding Lights',
    artistName: 'The Weeknd',
    vibe: 'ENERGETIC',
    confidence: 94,
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
        <div className={styles.subtitle}>AI Music Analysis</div>
        <h1 className={styles.title}>
          <span className={styles.highlight}>{displayData.trackTitle}</span> • {displayData.artistName}
        </h1>
      </div>

      <div className={styles.topSection}>
        <div className={styles.vibeCard}>
          <div className={styles.cardLabel}>PRIMARY VIBE</div>
          <div className={styles.vibeIconWrapper}>
            <div className={styles.vibeIconInner}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
          </div>
          <h2 className={styles.vibeTitle}>{displayData.vibe}</h2>
          <div className={styles.confidenceBadge}>
            <span className={styles.dot}></span> {displayData.confidence}% Confidence
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
          {[
            { title: "Save Your Tears", artist: "The Weeknd", match: "94%" },
            { title: "Take On Me", artist: "a-ha", match: "88%" },
            { title: "Midnight City", artist: "M83", match: "82%" }
          ].map((song, i) => (
            <div key={i} className={styles.similarItem}>
              <div className={styles.similarLeft}>
                <div className={styles.similarThumb}>
                  <div className={styles.miniWave}></div>
                </div>
                <div className={styles.similarInfo}>
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                </div>
              </div>
              <div className={styles.similarMatch}>
                {song.match} Match 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
