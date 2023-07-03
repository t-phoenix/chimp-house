import ChimpHouseIntroSection from '../components/sections/ChimpHouseIntroSection';
import Footer from '../components/sections/Footer';
import HeroSection from '../components/sections/HeroSection';
import RoadmapSection from '../components/sections/RoadmapSection';

function HomePage() {
  return (
    <div className='divide-y-4 divide-slate-70'>
      <HeroSection />
      <ChimpHouseIntroSection />
      <RoadmapSection />
      <Footer />
    </div>
  );
}

export default HomePage;
