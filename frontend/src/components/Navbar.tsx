import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Web3Button } from '@web3modal/react';
import { Button } from './ui/button';
import {
  HERO_HEADING_DURATION,
  HERO_HEADING_INITIAL_OPACITY,
  HERO_HEADING_FINAL_OPACITY,
} from './sections/HeroSection';

export default function Navbar() {
  return (
    <motion.nav
      animate={{ translateY: 0, opacity: HERO_HEADING_FINAL_OPACITY }}
      initial={{ translateY: -100, opacity: HERO_HEADING_INITIAL_OPACITY }}
      transition={{
        ease: 'easeInOut',
        duration: HERO_HEADING_DURATION,
        delay: HERO_HEADING_DURATION,
      }}
      className='flex flex-row justify-between py-4 px-4 h-[10vh] text-primary bg-transparent'
    >
      <Link to='/' className='group'>
        <div className='text-left text-base group-hover:text-accent'>
          Chimp House
        </div>
        <div className='hidden lg:block text-left text-xs  group-hover:text-accent font-extralight'>
          by Hipostel & Equilabs
        </div>
      </Link>

      <div>
        <Button asChild variant='ghost' className='font-medium mx-1'>
          <Link to='/token-manager'>Token Manager</Link>
        </Button>
        <Button asChild variant='ghost' className='font-medium mx-1'>
          <Link to='/governor-manager'>DAO Manager</Link>
        </Button>
      </div>

      <Web3Button />
    </motion.nav>
  );
}
