import styles from './Navbar.module.css';
import { SearchIcon, BellIcon, SettingsIcon, UserIcon } from '../ui/Icons';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.mobileSearch}>
          <SearchIcon />
        </div>
        
        <div className={styles.brand}>
          SONORA AI
        </div>

        <div className={styles.desktopLinks}>
          <a href="#" className={styles.active}>Home</a>
          <a href="#">Explore</a>
          <a href="#">Analyze</a>
          <a href="#">Music Universe</a>
        </div>

        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Notifications">
            <BellIcon />
          </button>
          <button className={`${styles.iconButton} ${styles.desktopOnly}`} aria-label="Profile">
            <UserIcon />
          </button>
          <button className={`${styles.iconButton} ${styles.mobileOnly}`} aria-label="Settings">
            <SettingsIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

