import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';
import { HomeIcon, CompassIcon, BarChartIcon, GlobeIcon, UserIcon } from '../ui/Icons';

export const BottomNav = () => {
  return (
    <nav className={styles.bottomNav}>
      <NavLink to="/dashboard" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
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
        <span>Universe</span>
      </NavLink>
      <NavLink to="/personality" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
        <UserIcon />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};
