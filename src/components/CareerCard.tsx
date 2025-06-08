import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, TrendingUp } from 'lucide-react';
import { GlowCard } from './ui/AnimationComponents';

interface CareerCardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  index?: number;
}

const CareerCard: React.FC<CareerCardProps> = ({ 
  title, 
  description, 
  image, 
  color, 
  index = 0 
}) => {
  const gradientColors = {
    'bg-purple-500': 'from-purple-500 to-violet-600',
    'bg-pink-500': 'from-pink-500 to-rose-600',
    'bg-green-500': 'from-green-500 to-emerald-600',
    'bg-blue-500': 'from-blue-500 to-cyan-600',
    'bg-orange-500': 'from-orange-500 to-red-600',
  };

  const gradientClass = gradientColors[color as keyof typeof gradientColors] || 'from-accent-500 to-primary-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      className="group"
    >
      <GlowCard className="relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-accent-500/10 h-full">
        {/* Enhanced Image Section */}
        <div className="relative h-48 overflow-hidden">
          <motion.img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Enhanced Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${gradientClass} opacity-80 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Floating Stats */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/40 backdrop-blur-xl rounded-lg px-3 py-2 border border-white/20">
              <div className="flex items-center space-x-2 text-white text-xs">
                <Users size={12} />
                <span className="font-medium">{Math.floor(Math.random() * 500) + 100}+</span>
              </div>
            </div>
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.h3 
              className="text-2xl font-bold text-white mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {title}
            </motion.h3>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="p-6">
          {/* Description */}
          <motion.p 
            className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            {description}
          </motion.p>

          {/* Stats Row */}
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <TrendingUp size={14} className="text-green-400" />
                <span>High Demand</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen size={14} className="text-blue-400" />
                <span>5+ Programs</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced CTA Button */}
          <motion.button
            className="group/btn relative w-full bg-gradient-to-r from-accent-500/10 to-primary-500/10 hover:from-accent-500/20 hover:to-primary-500/20 border border-accent-500/30 hover:border-accent-500/50 rounded-xl px-6 py-4 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            {/* Button Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: "easeInOut" 
              }}
            />
            
            <div className="relative flex items-center justify-between">
              <span className="font-semibold text-accent-400 group-hover/btn:text-accent-300 transition-colors">
                📚 Explore Programs
              </span>
              <motion.div
                className="text-accent-400 group-hover/btn:text-accent-300 transition-colors"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </div>
          </motion.button>
        </div>

        {/* Enhanced Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.06), transparent 40%)`
          }}
        />
      </GlowCard>
    </motion.div>
  );
};

export default CareerCard;