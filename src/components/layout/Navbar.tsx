import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';
import { SearchIcon, BellIcon, SettingsIcon, UserIcon } from '../ui/Icons';

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.mobileSearch}>
          <SearchIcon />
        </div>
        
        <Link to="/" className={styles.brand} style={{ textDecoration: 'none', color: 'inherit' }}>
          SONORA AI
        </Link>

        <div className={styles.desktopLinks}>
          <Link to="/" className={styles.active}>Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/analyze">Analyze</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div className={styles.actions}>
          {user ? (
            <>
              <button className={styles.iconButton} aria-label="Notifications" onClick={() => navigate('/dashboard')}>
                <BellIcon />
              </button>
              <button className={`${styles.iconButton} ${styles.desktopOnly}`} aria-label="Profile" onClick={() => navigate('/profile')}>
                <UserIcon />
              </button>
              <button className={`${styles.iconButton} ${styles.mobileOnly}`} aria-label="Settings" onClick={() => navigate('/settings')}>
                <SettingsIcon />
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  background: 'transparent', border: 'none', color: 'var(--color-on-surface)',
                  padding: '8px 16px', borderRadius: '24px', cursor: 'pointer', fontWeight: 500, fontSize: '14px'
                }}
              >
                Log In
              </button>
              <button 
                onClick={() => navigate('/register')}
                style={{
                  background: 'var(--color-primary)', border: 'none', color: 'white',
                  padding: '8px 20px', borderRadius: '24px', cursor: 'pointer', fontWeight: 500, fontSize: '14px'
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

