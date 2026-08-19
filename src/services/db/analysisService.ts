import { collection, doc, addDoc, getDocs, getDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface AnalysisRecord {
  id?: string;
  userId: string;
  trackId: string;
  trackTitle: string;
  artistName: string;
  coverUrl?: string;
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
