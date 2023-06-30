import ChimpHouseIntroSection from '../components/sections/ChimpHouseIntroSection';
import HeroSection from '../components/sections/HeroSection';

function HomePage() {
  return (
    <div className='divide-y-4 divide-slate-70'>
      <HeroSection />
      <ChimpHouseIntroSection />
    </div>
  );
}

export default HomePage;
