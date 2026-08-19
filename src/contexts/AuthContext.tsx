import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { createUserProfile } from '../services/db/userService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot: () => void;
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Create user profile in Firestore if it doesn't exist
        try {
          await createUserProfile(currentUser);
          
          // Listen for theme changes
          unsubscribeSnapshot = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              if (data.theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
              } else {
                document.documentElement.removeAttribute('data-theme');
              }
            }
          });
        } catch (error) {
          console.error("Failed to initialize user profile", error);
        }
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
