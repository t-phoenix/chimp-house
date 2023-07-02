import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const NFTPage = () => {
  return (
    <section>
      <h1 className='text-4xl font-extrabold tracking-tight lg:text-6xl text-accent drop-shadow-sm py-10'>
        NFTs
      </h1>
      <h3 className='pb-4 text-white'>Some description</h3>
      <div className='bg-accent mx-8 lg:mx-20 rounded-lg'>
        <div className='relative bg-gradient-to-b from-transparent to-black w-full h-full flex items-center justify-center py-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-6'>
            {[...Array(9).keys()].map((_, index) => {
              return (
                <div
                  key={index}
                  className='bg-black w-52 h-52 md:w-80 md:h-80 lg:w-52 lg:h-52 rounded-xl'
                >
                  0{index + 1}
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{
              scale: 1,
              backgroundColor: 'hsl(var(--primary))',
            }}
            whileHover={{
              scale: 1.3,
              backgroundColor: 'hsl(var(--accent))',
            }}
            layout
            className='absolute bottom-32 rounded-md'
          >
            <Button
              className='text-2xl lg:text-4xl px-16 py-8 uppercase'
              variant='default'
            >
              Buy NFT
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NFTPage;
