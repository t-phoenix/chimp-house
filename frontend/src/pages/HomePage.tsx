import ChimpHouseIntroSection from '../components/sections/ChimpHouseIntroSection';
import HeroSection from '../components/sections/HeroSection';
import RoadmapSection from '../components/sections/RoadmapSection';

function HomePage() {
  return (
    <div className='divide-y-4 divide-slate-70'>
      <HeroSection />
      <ChimpHouseIntroSection />
      <RoadmapSection />
    </div>
  );
}

export default HomePage;
