import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturesSection from '@/components/FeaturesSection';
import VisualBreakSection from '@/components/VisualBreakSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TechniciansSection from '@/components/TechniciansSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0f] text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <VisualBreakSection />
      <HowItWorksSection />
      <TechniciansSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
