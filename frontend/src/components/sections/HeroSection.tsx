import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

function HeroSection() {
  const [typingAnimationTextColor, setTypingAnimationTextColor] = useState('');

  return (
    <section className='min-h-[90vh] flex flex-col justify-center content-center bg-primary-gradient'>
      <div className='text-8xl py-4'>🦧</div>
      <div>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl text-accent drop-shadow-sm'>
          Chimp House
        </h1>
      </div>
      <div className='flex flex-row justify-center content-center text-xl sm:text-2xl md:text-3xl lg:text-5xl py-6 text-accent drop-shadow-sm font-normal'>
        <h2 className='font-light'>{`Club For\u00A0`}</h2>
        <h2 className='font-bold' style={{ color: typingAnimationTextColor }}>
          <TypeAnimation
            sequence={[
              'Artists',
              1000,
              () => setTypingAnimationTextColor('aqua'),
              'Creators',
              1000,
              () => setTypingAnimationTextColor('burlywood'),
              'Backpackers',
              1000,
              () => setTypingAnimationTextColor('chocolate'),
              'Influencers',
              1000,
              () => setTypingAnimationTextColor('darkcyan'),
              'Investors',
              1000,
              () => setTypingAnimationTextColor('darkorange'),
              'Musicians',
              1000,
              () => setTypingAnimationTextColor('darkslateblue'),
              'Technologists',
              1000,
              () => setTypingAnimationTextColor('firebrick'),
              'Dreamers',
              1000,
              () => setTypingAnimationTextColor('mediumvioletred'),
              'Builders',
              1000,
              () => setTypingAnimationTextColor('orangered'),
              'Believers',
              1000,
              () => setTypingAnimationTextColor('plum'),
            ]}
            speed={50}
            deletionSpeed={75}
            repeat={Infinity}
            wrapper='span'
            cursor
            preRenderFirstString={false}
            omitDeletionAnimation={false}
            className='inline-block'
          />
        </h2>
      </div>
    </section>
  );
}

export default HeroSection;
