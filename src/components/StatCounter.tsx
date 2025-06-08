import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color?: 'accent' | 'primary' | 'green' | 'blue' | 'purple' | 'orange';
  icon?: React.ReactNode;
  delay?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ 
  value, 
  label, 
  suffix = '', 
  prefix = '', 
  color = 'accent',
  icon,
  delay = 0
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorVariants = {
    accent: 'from-accent-500 to-accent-300',
    primary: 'from-primary-500 to-primary-300',
    green: 'from-green-500 to-green-300',
    blue: 'from-blue-500 to-blue-300',
    purple: 'from-purple-500 to-purple-300',
    orange: 'from-orange-500 to-orange-300',
  };

  const glowColors = {
    accent: 'shadow-accent-500/20',
    primary: 'shadow-primary-500/20',
    green: 'shadow-green-500/20',
    blue: 'shadow-blue-500/20',
    purple: 'shadow-purple-500/20',
    orange: 'shadow-orange-500/20',
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const duration = 2000; // ms
      const interval = 30; // ms
      const steps = duration / interval;
      const increment = value / steps;
      let currentCount = 0;
      
      const animationDelay = setTimeout(() => {
        const timer = setInterval(() => {
          currentCount += increment;
          if (currentCount >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(currentCount));
          }
        }, interval);

        setHasAnimated(true);
        return () => clearInterval(timer);
      }, delay);

      return () => clearTimeout(animationDelay);
    }
  }, [isInView, value, hasAnimated, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center group"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: delay / 1000,
        type: "spring",
        stiffness: 100
      }}
    >
      <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl ${glowColors[color]} group-hover:scale-105`}>
        
        {/* Icon */}
        {icon && (
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: (delay / 1000) + 0.3, type: "spring", stiffness: 200 }}
          >
            <div className={`p-3 rounded-xl bg-gradient-to-r ${colorVariants[color]} shadow-lg`}>
              {icon}
            </div>
          </motion.div>
        )}

        {/* Counter Value */}
        <motion.div
          className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${colorVariants[color]} bg-clip-text text-transparent mb-2`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: (delay / 1000) + 0.2 }}
        >
          {prefix}{count.toLocaleString()}{suffix}
        </motion.div>

        {/* Label */}
        <motion.div
          className="text-gray-400 font-medium text-sm md:text-base lg:text-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: (delay / 1000) + 0.4 }}
        >
          {label}
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colorVariants[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: (delay / 1000) + 0.5 }}
        />
        
        {/* Animated Border */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colorVariants[color]} opacity-20 blur-sm scale-105 group-hover:opacity-30 transition-opacity duration-500`} />
      </div>
    </motion.div>
  );
};

export default StatCounter;