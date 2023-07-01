import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useMenuAnimation from '../../helper/hooks/useMenuAnimation';

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
      <div className='w-100 lg:w-1/2 flex flex-col justify-center content-center place-self-start lg:place-self-center px-12'>
        <motion.p
          initial={{ opacity: 0, translateX: -20 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1 }}
          className='text-left italic text-2xl font-light pb-10'
        >
          Co-living space for like-minded web3 OG builders
        </motion.p>
        <motion.div ref={ref}>
          <ul
            style={{
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
            }}
            className='list-check-circle list-disc list-outside text-left text-2xl font-medium leading-10 space-y-2'
          >
            <li>NFT Themed Space</li>
            <li>Co-working Zones</li>
            <li>NFT Themed Space</li>
            <li>Hub For Events</li>
            <li>In-house Cafe</li>
            <li>Exclusive Destinations</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default ChimpHouseIntroSection;
