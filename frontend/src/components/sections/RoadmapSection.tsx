import { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useAnimation,
  AnimationControls,
  VariantLabels,
  TargetAndTransition,
} from 'framer-motion';
import useListItemStaggerAnimation from '../../helper/hooks/useListItemStaggerAnimation';

const Line = ({
  controls,
}: {
  controls:
    | boolean
    | AnimationControls
    | VariantLabels
    | TargetAndTransition
    | undefined;
}) => {
  const variants = {
    start: {
      height: '5rem',
      backgroundColor: '#000',
      transition: { duration: 0.7 },
    },
    initial: { height: 0 },
  };

  return (
    <div className='w-1 h-20 bg-transparent'>
      <motion.div
        className='h-1'
        initial={'initial'}
        variants={variants}
        animate={controls}
      ></motion.div>
    </div>
  );
};

const Circle = ({
  controls,
  alreadyFinish,
  index,
}: {
  controls?:
    | boolean
    | AnimationControls
    | VariantLabels
    | TargetAndTransition
    | undefined;
  alreadyFinish?: boolean;
  index: number;
}) => {
  const variants = {
    start: {
      backgroundColor: '#000',
      transition: { duration: alreadyFinish ? 0 : 0.7 },
      color: '#fff',
    },
    initial: alreadyFinish
      ? {}
      : { backgroundColor: 'transparent', color: '#000' },
  };

  return (
    <motion.div
      initial={'initial'}
      variants={variants}
      animate={alreadyFinish ? 'start' : controls}
      className='flex items-center justify-center rounded-full w-8 h-8 border-solid border-2'
    >
      {index}
    </motion.div>
  );
};

function RoadmapSection() {
  const ref = useRef(null);

  const isSectionInView = useInView(ref);
  const line = useAnimation();
  const secondLine = useAnimation();
  const thirdLine = useAnimation();
  const secondCircle = useAnimation();
  const thirdCircle = useAnimation();
  const fourthCircle = useAnimation();
  const scope = useListItemStaggerAnimation(isSectionInView);

  useEffect(() => {
    if (isSectionInView) {
      const sequence = async () => {
        await line.start('start');
        await secondCircle.start('start');
        await secondLine.start('start');
        await thirdCircle.start('start');
        await thirdLine.start('start');
        await fourthCircle.start('start');
      };
      sequence();
    }
  }, [
    isSectionInView,
    line,
    secondCircle,
    thirdCircle,
    fourthCircle,
    secondLine,
    thirdLine,
  ]);

  return (
    <section
      ref={scope}
      className='min-h-screen flex flex-col lg:flex-row justify-center gap-x-3 gap-y-16 content-center bg-secondary text-white'
    >
      <motion.div
        initial={{ opacity: 0, translateX: -100 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
        className='text-6xl md:text-7xl lg:text-9xl font-bold text-left w-100 lg:w-1/2 place-self-start lg:place-self-center px-12'
      >
        Roadmap
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateX: -20 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
        className='w-100 lg:w-1/2 flex flex-col justify-center content-center place-self-start lg:place-self-center px-12'
      >
        <p className='text-left italic text-2xl font-light pb-10'>
          Co-living spcae for like-minded web3 OG builders
        </p>

        <div className='flex flex-row items-start'>
          <motion.div layout className='flex items-center flex-col'>
            <Circle alreadyFinish={true} index={1} />
            <Line controls={line} />
            <Circle controls={secondCircle} index={2} />
            <Line controls={secondLine} />
            <Circle controls={thirdCircle} index={3} />
            <Line controls={thirdLine} />
            <Circle controls={fourthCircle} index={4} />
          </motion.div>

          <motion.div
            ref={ref}
            className='space-y-20 px-4 text-left text-2xl font-medium list-none'
          >
            <li>Make the NFT Live</li>
            <li>Token Sale Live (NFT Staking) + DAO</li>
            <li>Hipostel - Chimp House</li>
            <li>
              Chill place to vibe with like minded people (Governed by DAO)
            </li>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default RoadmapSection;
