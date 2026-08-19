import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '../../services/db/userService';
import type { UserProfile } from '../../services/db/userService';
import styles from './SettingsPage.module.css';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const p = await getUserProfile(user.uid);
        if (p) {
          setProfile(p);
          setDisplayName(p.displayName || '');
          setBio(p.bio || '');
          setTheme(p.theme || 'dark');
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      // Update Firebase Auth
      await updateProfile(user, { displayName });
      
      // Update Firestore
      await updateUserProfile(user.uid, {
        displayName,
        bio,
        theme
      });
      // Optionally show a toast notification here
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings', error);
      alert('Failed to save settings.');
    }
    setSaving(false);
  };

  if (loading) return <div className={styles.container}>Loading settings...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account preferences and integrations.</p>
      </header>

      <div className={styles.contentLayout}>
        <nav className={styles.settingsNav}>
          <button className={`${styles.navItem} ${styles.active}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Account
          </button>
          <button className={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            Preferences
          </button>
        </nav>

        <form className={styles.settingsContent} onSubmit={handleSave}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Account Profile</h2>
              <p>Update your basic profile information and how others see you on the platform.</p>
            </div>
            
            <div className={styles.profileEdit}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>
                  {displayName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                <label>Display Name</label>
                <input 
                  type="text" 
                  value={displayName} 
                  onChange={e => setDisplayName(e.target.value)}
                  className={styles.input} 
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <div className={styles.inputIconWrap}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.inputIcon}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <input 
                  type="email" 
                  value={profile?.email || user?.email || ''} 
                  disabled 
                  className={`${styles.input} ${styles.inputWithIcon}`} 
                />
              </div>
              <p style={{fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '4px'}}>Email cannot be changed directly.</p>
            </div>

            <div className={styles.formGroup}>
              <label>Bio</label>
              <textarea 
                value={bio} 
                onChange={e => setBio(e.target.value)}
                placeholder="Tell us about your musical taste..."
                className={styles.textarea}
              ></textarea>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>
                Experience Preferences
              </h2>
              <p>Customize how Sonora AI looks and behaves.</p>
            </div>

            <div className={styles.formGroup}>
              <label>Interface Theme</label>
              <div className={styles.themeSelector}>
                <div 
                  className={`${styles.themeOption} ${theme === 'light' ? styles.themeActive : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <div className={styles.themeMockup} style={{backgroundColor: '#e0e0e0'}}>
                    <div className={styles.mockHeader} style={{backgroundColor: '#ccc'}}></div>
                  </div>
                  <span>Light</span>
                </div>
                <div 
                  className={`${styles.themeOption} ${theme === 'dark' ? styles.themeActive : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <div className={styles.themeMockup} style={{backgroundColor: '#0c0e12'}}>
                    <div className={styles.mockHeader} style={{backgroundColor: '#1a1d24'}}></div>
                  </div>
                  <span>Dark</span>
                </div>
              </div>
            </div>

            <div className={styles.formGroup} style={{marginTop: '24px'}}>
              <label>Default Analysis Model</label>
              <select className={styles.select}>
                <option>Sonora Multi-Modal V2 (Recommended)</option>
                <option>Sonora Multi-Modal V1</option>
                <option>Fast Audio Heuristics</option>
              </select>
            </div>
          </div>

          <div className={styles.actionsFooter}>
            <button type="button" className={styles.btnText}>Discard Changes</button>
            <button type="submit" className={styles.btnPrimary} disabled={saving}>
              {saving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
