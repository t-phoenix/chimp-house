import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export const HERO_HEADING_DURATION = 1;
const HERO_HEADING_INITIAL_SCALE = 0.9;
const HERO_HEADING_FINAL_SCALE = 1;
export const HERO_HEADING_INITIAL_OPACITY = 0;
export const HERO_HEADING_FINAL_OPACITY = 1;

function HeroSection() {
  const [typingAnimationTextColor, setTypingAnimationTextColor] = useState('');

  return (
    <section className='min-h-[90vh] flex flex-col justify-center content-center bg-primary-gradient'>
      <motion.div
        animate={{
          scale: HERO_HEADING_FINAL_SCALE,
          opacity: HERO_HEADING_FINAL_OPACITY,
        }}
        initial={{
          scale: HERO_HEADING_INITIAL_SCALE,
          opacity: HERO_HEADING_INITIAL_OPACITY,
        }}
        transition={{ ease: 'easeOut', duration: HERO_HEADING_DURATION }}
        className='text-8xl py-4 scale-95'
      >
        🦧
      </motion.div>
      <motion.div
        animate={{
          scale: HERO_HEADING_FINAL_SCALE,
          opacity: HERO_HEADING_FINAL_OPACITY,
        }}
        initial={{
          scale: HERO_HEADING_INITIAL_SCALE,
          opacity: HERO_HEADING_INITIAL_OPACITY,
        }}
        transition={{ ease: 'easeInOut', duration: HERO_HEADING_DURATION }}
      >
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl text-accent drop-shadow-sm'>
          Chimp House
        </h1>
      </motion.div>
      <motion.div
        animate={{
          scale: HERO_HEADING_FINAL_SCALE,
          opacity: HERO_HEADING_FINAL_OPACITY,
        }}
        initial={{
          scale: HERO_HEADING_INITIAL_SCALE,
          opacity: HERO_HEADING_INITIAL_OPACITY,
        }}
        transition={{ ease: 'easeInOut', duration: HERO_HEADING_DURATION }}
        className='flex flex-row justify-center content-center text-xl sm:text-2xl md:text-3xl lg:text-5xl py-6 text-accent drop-shadow-sm font-normal'
      >
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
      </motion.div>
    </section>
  );
}

export default HeroSection;
