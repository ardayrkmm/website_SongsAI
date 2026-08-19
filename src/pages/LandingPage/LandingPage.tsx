import { Navbar } from '../../components/layout/Navbar';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { Footer } from '../../components/layout/Footer';
import { BottomNav } from '../../components/layout/BottomNav';
import styles from './LandingPage.module.css';

export const LandingPage = () => {
  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

