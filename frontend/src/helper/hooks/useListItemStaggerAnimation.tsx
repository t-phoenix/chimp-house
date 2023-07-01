import { useEffect } from 'react';
import { useAnimate, stagger } from 'framer-motion';

const staggerListItems = stagger(1, { startDelay: 0 });

const useListItemStaggerAnimation = (isInView: boolean) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'li',
      isInView
        ? { opacity: 1, filter: 'blur(0px)' }
        : { opacity: 0, filter: 'blur(20px)' },
      {
        duration: 1,
        delay: isInView ? staggerListItems : 0,
      }
    );
  }, [isInView]);

  return scope;
};

export default useListItemStaggerAnimation;
