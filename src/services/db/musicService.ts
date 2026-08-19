import { collection, doc, setDoc, deleteDoc, getDocs, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { SpotifyTrack } from '../api/spotifyService';

export interface SavedTrack extends SpotifyTrack {
  savedAt: string;
}

export const toggleFavoriteSong = async (userId: string, track: SpotifyTrack) => {
  const docRef = doc(db, 'users', userId, 'favorites', track.id);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    // Un-favorite
    await deleteDoc(docRef);
    return false;
  } else {
    // Favorite
    const savedTrack = {
      ...track,
      savedAt: Timestamp.now()
    };
    await setDoc(docRef, savedTrack);
    return true;
  }
};

export const checkIsFavorited = async (userId: string, trackId: string) => {
  const docRef = doc(db, 'users', userId, 'favorites', trackId);
  const snap = await getDoc(docRef);
  return snap.exists();
};

export const getFavoriteSongs = async (userId: string): Promise<SavedTrack[]> => {
  const favoritesRef = collection(db, 'users', userId, 'favorites');
  const snap = await getDocs(favoritesRef);
  
  return snap.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      // Handle timestamp conversion
      savedAt: data.savedAt?.toDate?.()?.toISOString() || new Date().toISOString()
    } as SavedTrack;
  });
};
