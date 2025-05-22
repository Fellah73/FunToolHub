import CTASection from './components/CTASection';
import FeatureSection from './components/FeatureSection';
import FlappyBirdSection from './components/flappyBirdSection';
import HeroSection from './components/HeroSection';
import PrayerTimesSection from './components/PrayerTimesSection';
import SnakeGameSection from './components/SnakeGameSection';
import { TestimonialSection } from './components/TestimonialsSection';


export default function Page() {
  return (
    <div className="min-h-screen  text-white">
      
      <main>
        <HeroSection />
        <FeatureSection />
        <FlappyBirdSection />
        <SnakeGameSection />
        <PrayerTimesSection />
        <TestimonialSection />
        <CTASection />
      </main>

    </div>
  );
}