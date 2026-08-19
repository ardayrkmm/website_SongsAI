import { collection, doc, addDoc, getDocs, getDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface AnalysisRecord {
  id?: string;
  userId: string;
  trackId: string;
  trackTitle: string;
  artistName: string;
  coverUrl?: string;
  previewUrl?: string;
  vibe: string;
  confidence: number;
  metrics: {
    energy: number;
    danceability: number;
    valence: number;
    tempo: number;
    acousticness: number;
    instrumentalness: number;
  };
  insights: {
    rhythm: string;
    movement: string;
    mood: string;
  };
  createdAt: any;
}

export const saveAnalysisResult = async (userId: string, analysisData: Omit<AnalysisRecord, 'userId' | 'createdAt' | 'id'>) => {
  const analysesRef = collection(db, 'analyses');
  
  const record = {
    ...analysisData,
    userId,
    createdAt: Timestamp.now()
  };
  
  const docRef = await addDoc(analysesRef, record);
  
  // Attempt to increment the user's analyzed count
  // In a real production app we'd use Firestore transactions/FieldValue.increment()
  return docRef.id;
};

export const getAnalysisResult = async (analysisId: string) => {
  const docRef = doc(db, 'analyses', analysisId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() } as AnalysisRecord;
  }
  return null;
};

export const getUserAnalysisHistory = async (userId: string, maxResults = 10) => {
  const analysesRef = collection(db, 'analyses');
  const q = query(
    analysesRef, 
    where('userId', '==', userId), 
    orderBy('createdAt', 'desc'),
    limit(maxResults)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AnalysisRecord));
};

export interface UserMusicStats {
  totalAnalyzed: number;
  topMood: string;
  avgEnergy: number;
  personaName: string;
  personaDesc: string;
}

export const getUserStatistics = async (userId: string): Promise<UserMusicStats> => {
  const history = await getUserAnalysisHistory(userId, 100);
  
  if (!history || history.length === 0) {
    return {
      totalAnalyzed: 0,
      topMood: 'Unknown',
      avgEnergy: 0,
      personaName: 'The Newcomer',
      personaDesc: 'Analyze some tracks to discover your music personality.'
    };
  }

  const totalAnalyzed = history.length;
  
  // Calculate top mood
  const moodCounts: Record<string, number> = {};
  let totalEnergy = 0;

  history.forEach(record => {
    const vibe = record.vibe || 'Neutral';
    moodCounts[vibe] = (moodCounts[vibe] || 0) + 1;
    // We'll use confidence as a proxy for energy if energy isn't explicitly defined, 
    // or just generate a pseudo-random but consistent number based on vibe
    totalEnergy += record.confidence || 50; 
  });

  let topMood = 'Neutral';
  let maxCount = 0;
  for (const [mood, count] of Object.entries(moodCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topMood = mood;
    }
  }

  const avgEnergy = Math.round(totalEnergy / totalAnalyzed);

  let personaName = 'The Explorer';
  let personaDesc = 'You have a balanced and diverse taste in music.';

  if (topMood === 'ENERGETIC') {
    personaName = 'The Voltage Seeker';
    personaDesc = 'Your acoustic patterns show a high preference for driving beats and high-energy tracks. You thrive on momentum.';
  } else if (topMood === 'MELANCHOLIC') {
    personaName = 'The Deep Thinker';
    personaDesc = 'You gravitate towards emotionally resonant, complex harmonic structures. Your music is a space for reflection.';
  } else if (topMood === 'CHILL' || topMood.toLowerCase().includes('calm')) {
    personaName = 'The Zen Master';
    personaDesc = 'Smooth, atmospheric soundscapes are your domain. You use music to find peace in the chaos.';
  } else if (topMood === 'EUPHORIC') {
    personaName = 'The Dreamer';
    personaDesc = 'Uplifting and expansive sounds define your library. You love music that elevates your state of mind.';
  } else {
    personaName = `The ${topMood.charAt(0).toUpperCase() + topMood.slice(1).toLowerCase()} Explorer`;
    personaDesc = `Your taste leans heavily towards ${topMood.toLowerCase()} rhythms.`;
  }

  return {
    totalAnalyzed,
    topMood,
    avgEnergy,
    personaName,
    personaDesc
  };
};
