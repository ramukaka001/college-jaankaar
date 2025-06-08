import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce';
  delay?: number;
  duration?: number;
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  bounce: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1 }
  }
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={animations[animation]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredAnimationProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  className = '',
  staggerDelay = 0.1
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

interface CounterAnimationProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  from,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className = ''
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    const startValue = from;
    const endValue = to;
    const totalDuration = duration * 1000;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;
      
      setCount(Math.round(currentValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, from, to, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {`${prefix}${count}${suffix}`}
    </motion.span>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  intensity = 20,
  speed = 6
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-intensity, intensity, -intensity],
        rotate: [-1, 1, -1]
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  className = '',
  speed = 0.5
}) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform: inView ? `translateY(${speed * -100}px)` : 'translateY(0px)'
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export const GradientButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md'
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600',
    secondary: 'bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600',
    accent: 'bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        text-white font-semibold rounded-lg shadow-lg
        transform transition-all duration-300 ease-in-out
        hover:shadow-xl hover:scale-105
        active:scale-95
        focus:outline-none focus:ring-4 focus:ring-primary-300/50
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export const GlowCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}> = ({
  children,
  className = '',
  glowColor = 'primary'
}) => {
  return (
    <motion.div
      className={`
        relative p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20
        ${className}
      `}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 20px 40px rgba(59, 130, 246, 0.3)`
      }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-${glowColor}-500/20 to-secondary-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
