import styles from './BottomNav.module.css';
import { HomeIcon, CompassIcon, BarChartIcon, GlobeIcon, UserIcon } from '../ui/Icons';

export const BottomNav = () => {
  return (
    <nav className={styles.bottomNav}>
      <a href="#" className={styles.navItem} data-active="true">
        <HomeIcon />
        <span>Home</span>
      </a>
      <a href="#" className={styles.navItem}>
        <CompassIcon />
        <span>Explore</span>
      </a>
      <a href="#" className={styles.navItem}>
        <BarChartIcon />
        <span>Analyze</span>
      </a>
      <a href="#" className={styles.navItem}>
        <GlobeIcon />
        <span>Universe</span>
      </a>
      <a href="#" className={styles.navItem}>
        <UserIcon />
        <span>Profile</span>
      </a>
    </nav>
  );
};

