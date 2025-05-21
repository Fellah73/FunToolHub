// app/page.tsx
import CTASection from './components/CTASection';
import FeatureSection from './components/FeatureSection';
import FlappyBirdSection from './components/flappyBirdSection';
import HeroSection from './components/HeroSection';
import PrayerTimesSection from './components/PrayerTimesSection';
import SnakeGameSection from './components/SnakeGameSection';


export default function Page() {
  return (
    <div className="min-h-screen  text-white">

      <main>
        <HeroSection />
        <FeatureSection />
        <FlappyBirdSection />
        <SnakeGameSection />
        <PrayerTimesSection />
        <CTASection />
      </main>

    </div>
  );
}