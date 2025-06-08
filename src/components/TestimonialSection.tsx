import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Star, 
  Quote,
  Heart,
  MessageCircle,
  Award,
  Sparkles
} from 'lucide-react';
import { SITE } from '../constants';
import { useTestimonials } from '../hooks/useAppwrite';
import { AnimatedSection, GlowCard, CounterAnimation } from './ui/AnimationComponents';

interface StarRatingProps {
  rating: number;
  showNumber?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, showNumber = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  
  return (
    <div className="flex items-center justify-center space-x-1">
      <div className="flex space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: i * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <Star 
              className={`w-4 h-4 ${
                i < fullStars 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : i === fullStars && hasHalfStar
                  ? 'text-yellow-400 fill-yellow-400/50'
                  : 'text-gray-600'
              }`}
            />
          </motion.div>
        ))}
      </div>
      {showNumber && (
        <motion.span 
          className="text-sm text-yellow-400 font-medium ml-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {rating.toFixed(1)}
        </motion.span>
      )}
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: any;
  index: number;
  isActive: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index, isActive }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? {
        opacity: 1,
        y: 0,
        scale: isActive ? 1.05 : 1,
        transition: {
          delay: index * 0.1,
          duration: 0.6,
          ease: [0.25, 0.25, 0, 1]
        }
      } : {}}
      className="group relative"
    >
      <GlowCard className={`h-full transition-all duration-500 ${
        isActive ? 'ring-2 ring-primary-400/50' : ''
      }`}>
        <div className="relative overflow-hidden">
          {/* Quote icon */}
          <motion.div
            className="absolute top-4 left-4 z-10"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            <Quote className="w-8 h-8 text-primary-400/30" />
          </motion.div>

          {/* Profile section */}
          <div className="flex items-center space-x-4 mb-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-lg opacity-30 group-hover:opacity-60"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary-400/50">
                <img
                  src={testimonial.image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            
            <div className="flex-1">
              <motion.h3 
                className="font-semibold text-white text-lg"
                initial={{ opacity: 0.8 }}
                whileHover={{ 
                  opacity: 1,
                  color: "#3b82f6"
                }}
                transition={{ duration: 0.2 }}
              >
                {testimonial.name}
              </motion.h3>
              <p className="text-gray-400 text-sm">{testimonial.occupation}</p>
              <div className="mt-1">
                <StarRating rating={testimonial.rating || 4.8} showNumber={false} />
              </div>
            </div>
          </div>

          {/* Testimonial content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
              "{testimonial.content || `${SITE.name} ${SITE.sub} helped me navigate the complex college application process with ease and confidence. Highly recommended!`}"
            </p>
            
            {/* Decorative gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-lg opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4 text-gray-500">
              <motion.div
                className="flex items-center space-x-1 cursor-pointer"
                whileHover={{ color: "#ef4444" }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm">{Math.floor(Math.random() * 50) + 10}</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-1 cursor-pointer"
                whileHover={{ color: "#3b82f6" }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{Math.floor(Math.random() * 20) + 5}</span>
              </motion.div>
            </div>
            
            {testimonial.hasVideo && (
              <motion.button
                className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-white text-sm hover:shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-3 h-3" />
                <span>Watch</span>
              </motion.button>
            )}
          </div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-6 right-6 text-primary-400/20"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>
      </GlowCard>
    </motion.div>
  );
};

const TestimonialSection: React.FC = () => {
  const {  testimonials, loading } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const testimonialsPerPage = 3;
  const maxIndex = Math.max(0, testimonials.length - testimonialsPerPage);
  
  // Auto-advance testimonials
  useEffect(() => {
    if (!autoPlay || testimonials.length <= testimonialsPerPage) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay, maxIndex, testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    setAutoPlay(false);
  };

  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + testimonialsPerPage);

  const averageRating = testimonials.length > 0 
    ? testimonials.reduce((sum, t) => sum + (t.rating || 4.8), 0) / testimonials.length 
    : 4.8;

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-primary-900/10 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 rounded-xl h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-primary-900/10 to-gray-900 py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-secondary-500/20 to-primary-500/20 border border-secondary-500/30 text-secondary-300 text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Student Success Stories
              </span>
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-secondary-200 to-primary-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              What Our Students Say
            </motion.h2>

            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hear from people from diverse backgrounds sharing their transformative experiences.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex items-center justify-center space-x-8 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <StarRating rating={averageRating} />
                </div>
                <p className="text-sm text-gray-400">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400 mb-1">
                  <CounterAnimation from={0} to={testimonials.length} />+
                </div>
                <p className="text-sm text-gray-400">Happy Students</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400 mb-1">98%</div>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {currentTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${currentIndex}-${index}`}
                  testimonial={testimonial}
                  index={index}
                  isActive={index === 1} // Middle card is active
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {testimonials.length > testimonialsPerPage && (
            <>
              <motion.button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 z-20"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 z-20"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {testimonials.length > testimonialsPerPage && (
          <motion.div
            className="flex justify-center space-x-2 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoPlay(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary-400 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </motion.div>
        )}

        {/* Auto-play indicator */}
        {autoPlay && testimonials.length > testimonialsPerPage && (
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <motion.div
                className="w-2 h-2 bg-primary-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>Auto-playing</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TestimonialSection;
