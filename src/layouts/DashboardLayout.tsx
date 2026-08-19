import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { BottomNav } from '../components/layout/BottomNav';
import { GlobalSearch } from '../components/ui/GlobalSearch';
import styles from './DashboardLayout.module.css';

export const DashboardLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <BottomNav />
      <GlobalSearch />
    </div>
  );
};
