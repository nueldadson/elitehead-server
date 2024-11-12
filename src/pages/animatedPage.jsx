import React from 'react'
import { motion } from 'framer-motion'

const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
};

const AnimatedPage = ({ children }) => {

    const easingIn = [0.42, 0, 1, 1]; // Ease In
  const easingOut = [0, 0, 0.58, 1];

  return (
    <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{duration: 1, ease: easingIn}}
>
      {children}
    </motion.div>
  )
}

export default AnimatedPage;
