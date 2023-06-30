import { useEffect, useRef } from 'react';
import { motion, useAnimate, stagger, useInView } from 'framer-motion';

const staggerListItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isInView: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'ul',
      {
        clipPath: isInView
          ? 'inset(0% 0% 0% 0% round 10px)'
          : 'inset(10% 50% 90% 50% round 10px)',
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      'li',
      isInView
        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.3,
        delay: isInView ? staggerListItems : 0,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return scope;
}

function ChimpHouseIntroSection() {
  const ref = useRef(null);
  const isListInView = useInView(ref);

  const scope = useMenuAnimation(isListInView);

  return (
    <section
      ref={scope}
      className='min-h-screen flex flex-col lg:flex-row justify-center gap-x-3 gap-y-16 content-center bg-accent'
    >
      <motion.div
        initial={{ opacity: 0, translateX: -100 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
        className='text-6xl md:text-7xl lg:text-9xl font-bold text-left w-100 lg:w-1/2 place-self-start lg:place-self-center px-12'
      >
        What is Chimp House?
      </motion.div>
      <motion.div
        ref={ref}
        className='w-100 lg:w-1/2 flex flex-col justify-center content-center place-self-start lg:place-self-center px-12'
      >
        <ul
          style={{
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
          }}
          className='list-check-circle list-disc list-outside text-left text-2xl font-medium leading-10'
        >
          <li> NFT Themed Space</li>
          <li> Co-working Zones</li>
          <li> NFT Themed Space</li>
          <li> Hub For Events</li>
          <li> In-house Cafe</li>
          <li> Exclusive Destinations</li>
        </ul>
      </motion.div>
    </section>
  );
}

export default ChimpHouseIntroSection;
