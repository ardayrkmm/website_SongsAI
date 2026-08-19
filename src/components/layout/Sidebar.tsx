import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Sidebar.module.css';
import { HomeIcon, CompassIcon, BarChartIcon, GlobeIcon, UserIcon, SettingsIcon } from '../ui/Icons';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    { id: 1, title: 'Analysis Complete', desc: 'DNA for "Blinding Lights" is ready.', time: '2m ago' },
    { id: 2, title: 'New Persona', desc: 'You are now "The Night Explorer".', time: '1h ago' },
  ];
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoIcon}>
          {/* Mock logo lines */}
          <div className={styles.logoLine}></div>
          <div className={styles.logoLine}></div>
          <div className={styles.logoLine}></div>
          <div className={styles.logoLine}></div>
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandTitle}>Sonora AI</span>
          <span className={styles.brandSubtitle}>Intelligence Platform</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <NavLink to="/dashboard" end className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <HomeIcon />
          <span>Home</span>
        </NavLink>
        <NavLink to="/explore" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <CompassIcon />
          <span>Explore</span>
        </NavLink>
        <NavLink to="/analyze" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <BarChartIcon />
          <span>Analyze</span>
        </NavLink>
        <NavLink to="/universe" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <GlobeIcon />
          <span>Music Universe</span>
        </NavLink>
        <NavLink to="/personality" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <UserIcon />
          <span>Personality</span>
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <button className={styles.upgradeBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
          Upgrade to Pro
        </button>
        <NavLink to="/settings" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <SettingsIcon />
          <span>Settings</span>
        </NavLink>
        <div style={{ position: 'relative' }}>
          <button 
            className={styles.navItem} 
            onClick={() => setShowNotifications(!showNotifications)} 
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', position: 'relative', outline: 'none' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span style={{flex: 1}}>Notifications</span>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: '50%'
            }}></div>
          </button>
          
          {showNotifications && (
            <div style={{
              position: 'absolute', bottom: '100%', left: '0', width: '100%', marginBottom: '8px',
              backgroundColor: 'var(--color-surface-container-high)', borderRadius: '12px',
              border: '1px solid var(--color-outline-variant)', overflow: 'hidden', zIndex: 100,
              boxShadow: 'var(--shadow-level-2)'
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-outline-variant)', fontWeight: 600, fontSize: '13px' }}>Notifications</div>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-surface-container-lowest)', cursor: 'pointer' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-on-surface)' }}>{n.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>{n.desc}</div>
                    <div style={{ fontSize: '10px', color: 'var(--color-primary)', marginTop: '6px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <NavLink to="/profile" className={styles.userProfile} style={{textDecoration: 'none'}}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.displayName || 'User'}</span>
            <span className={styles.userRole}>{user?.email || 'Pro Member'}</span>
          </div>
        </NavLink>
        <button onClick={logout} className={styles.logoutBtn} title="Sign Out">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      </div>
    </aside>
  );
};
