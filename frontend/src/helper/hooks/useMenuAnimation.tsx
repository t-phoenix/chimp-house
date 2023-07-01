import { useEffect } from 'react';
import { useAnimate, stagger } from 'framer-motion';

const staggerListItems = stagger(0.1, { startDelay: 0.15 });

const useMenuAnimation = (isInView: boolean) => {
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
};

export default useMenuAnimation;
