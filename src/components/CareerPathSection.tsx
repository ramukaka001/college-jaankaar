import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Star, 
  BookOpen,
  Target,
  Compass,
  Briefcase,
  ChevronRight,
  Play,
  Award,
  Clock,
  MapPin
} from 'lucide-react';
import { AnimatedSection, GlowCard, FloatingElement } from './ui/AnimationComponents';
import { useCareerPaths } from '../hooks/useAppwrite';

interface CareerPathCardProps {
  path: {
    $id: string;
    title: string;
    description: string;
    image?: string;
    requirements?: string;
    duration?: string;
    salaryRange?: string;
    popularity?: number;
    category?: string;
    skills?: string[];
  };
  index: number;
  isReversed?: boolean;
}

const CareerPathCard: React.FC<CareerPathCardProps> = ({ path, index, isReversed = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const defaultImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  
  const getCategoryColor = (category?: string) => {
    const colors = {
      'engineering': 'from-blue-500 to-cyan-500',
      'aviation': 'from-sky-500 to-blue-600',
      'maritime': 'from-teal-500 to-cyan-600',
      'technology': 'from-purple-500 to-violet-600',
      'healthcare': 'from-red-500 to-pink-600',
      'business': 'from-green-500 to-emerald-600',
      'default': 'from-accent-500 to-primary-500'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      className="mb-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
          
          {/* Enhanced Image Section */}
          <motion.div 
            className="lg:w-1/2 relative"
            animate={{ 
              scale: isHovered ? 1.02 : 1,
              rotateY: isHovered ? (isReversed ? -5 : 5) : 0
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Main Image Container */}
              <GlowCard className="relative overflow-hidden rounded-3xl">
                <div className="aspect-[4/3] relative">
                  <img
                    src={path.image || defaultImage}
                    alt={path.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(path.category)} opacity-20 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating Elements */}
                  <FloatingElement intensity={3} speed={4}>
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20">
                      <div className="flex items-center space-x-2 text-white">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold">{path.popularity || 95}%</span>
                      </div>
                    </div>
                  </FloatingElement>
                  
                  {/* Play Button for Interactive Content */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 group"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="bg-white/20 backdrop-blur-xl rounded-full p-4 border border-white/30">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </motion.div>
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-300">High Demand</p>
                        </div>
                        <div>
                          <Award className="w-4 h-4 text-green-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-300">Excellent Growth</p>
                        </div>
                        <div>
                          <Target className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-300">Future Ready</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowCard>

              {/* Decorative Elements */}
              <FloatingElement intensity={2} speed={6}>
                <div className={`absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r ${getCategoryColor(path.category)} rounded-full opacity-20 blur-xl`} />
              </FloatingElement>
              
              <FloatingElement intensity={3} speed={8}>
                <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r ${getCategoryColor(path.category)} rounded-full opacity-10 blur-2xl`} />
              </FloatingElement>
            </div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div 
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Category Badge */}
            {path.category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getCategoryColor(path.category)} rounded-full text-white text-sm font-semibold shadow-lg`}>
                  <Compass className="w-4 h-4 mr-2" />
                  {path.category.charAt(0).toUpperCase() + path.category.slice(1)}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                {path.title}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {path.description}
            </motion.p>

            {/* Career Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {path.duration && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-white font-semibold">{path.duration}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {path.salaryRange && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Salary Range</p>
                      <p className="text-white font-semibold">{path.salaryRange}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Skills Tags */}
            {path.skills && path.skills.length > 0 && (
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-sm text-gray-400 font-medium">Key Skills Required:</p>
                <div className="flex flex-wrap gap-2">
                  {path.skills.slice(0, 4).map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      className="px-3 py-1 bg-gradient-to-r from-accent-500/20 to-primary-500/20 border border-accent-500/30 rounded-lg text-accent-300 text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + skillIndex * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <motion.button
                className="group bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Explore This Path</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
              
              <motion.button
                className="group bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Book Consultation</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const CareerPathSection: React.FC = () => {
  const { careerPaths, loading, error } = useCareerPaths();
  const [visiblePaths, setVisiblePaths] = useState(3);

  const displayedPaths = careerPaths.slice(0, visiblePaths);

  const loadMore = () => {
    setVisiblePaths(prev => Math.min(prev + 3, careerPaths.length));
  };

  if (loading) {
    return (
      <section className="relative bg-gradient-to-b from-black via-gray-950 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="lg:w-1/2 animate-pulse">
                  <div className="aspect-[4/3] bg-gray-800/60 rounded-3xl" />
                </div>
                <div className="lg:w-1/2 space-y-6 animate-pulse">
                  <div className="h-4 bg-gray-800/60 rounded w-1/4" />
                  <div className="h-12 bg-gray-800/60 rounded" />
                  <div className="h-6 bg-gray-800/60 rounded w-3/4" />
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-16 bg-gray-800/60 rounded-xl" />
                    <div className="h-16 bg-gray-800/60 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-gradient-to-b from-black via-gray-950 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-lg mx-auto">
            <Target size={64} className="text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Failed to load career paths</h3>
            <p className="text-gray-400 mb-6">We're having trouble loading the career information.</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-950 to-black py-24 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-40 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(6,182,212,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Section Header */}
      <div className="relative text-center mb-20">
        <AnimatedSection animation="slideUp" delay={0.1}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl mb-8 shadow-lg">
            <MapPin size={40} className="text-white" />
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={0.2}>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover Your{' '}
            <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
              Career Path
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={0.3}>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore diverse career opportunities and find the perfect path that aligns with 
            your passions, skills, and aspirations. Your future starts here.
          </p>
        </AnimatedSection>
      </div>

      {/* Career Path Cards */}
      <div className="relative">
        {displayedPaths.map((path, index) => (
          <CareerPathCard
            key={path.$id}
            path={path}
            index={index}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>

      {/* Load More Section */}
      {visiblePaths < careerPaths.length && (
        <AnimatedSection animation="slideUp" delay={0.5}>
          <div className="text-center mt-16">
            <motion.button
              onClick={loadMore}
              className="group bg-gradient-to-r from-accent-500/10 to-primary-500/10 hover:from-accent-500/20 hover:to-primary-500/20 border border-accent-500/30 hover:border-accent-500/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <Compass size={20} className="text-accent-400" />
                <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                  Explore More Career Paths
                </span>
                <ChevronRight className="w-5 h-5 text-accent-400 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </div>
        </AnimatedSection>
      )}

      {/* Enhanced CTA Section */}
      <AnimatedSection animation="slideUp" delay={0.6}>
        <div className="mt-20 text-center">
          <GlowCard className="bg-gradient-to-r from-accent-500/10 via-primary-500/10 to-accent-500/10 border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <FloatingElement intensity={2} speed={3}>
              <Target size={64} className="text-accent-500 mx-auto mb-6" />
            </FloatingElement>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Still Exploring Your Options?
            </h3>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Our career counselors are here to help you navigate through various career paths 
              and find the one that's perfect for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <BookOpen size={20} />
                  <span>Get Personalized Guidance</span>
                </div>
              </motion.button>
              
              <motion.button
                className="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <Target size={20} />
                  <span>Take Career Assessment</span>
                </div>
              </motion.button>
            </div>
          </GlowCard>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default CareerPathSection;