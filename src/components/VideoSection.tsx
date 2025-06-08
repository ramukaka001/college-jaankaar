import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Star, Award, PlayCircle, Volume2 } from 'lucide-react';
import { AnimatedSection, GlowCard, FloatingElement } from './ui/AnimationComponents';

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    { icon: Users, value: "20,000+", label: "Students Guided", color: "from-blue-500 to-cyan-500" },
    { icon: Star, value: "4.9/5", label: "Rating", color: "from-yellow-500 to-orange-500" },
    { icon: Award, value: "99.99%", label: "Success Rate", color: "from-green-500 to-emerald-500" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-black via-gray-950 to-gray-900 py-20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full mb-6">
              <PlayCircle size={32} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See How We Transform
              <span className="block bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
                Students' Lives
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch real success stories and discover how our expert guidance
              has helped thousands of students achieve their dreams.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Video Player */}
          <AnimatedSection animation="slideLeft" delay={0.4}>
            <div className="relative">
              <GlowCard className="relative rounded-2xl overflow-hidden group">
                <div
                  className="aspect-video relative cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Video Thumbnail */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center p-8">
                      <PlayCircle size={64} className="text-accent-500 mx-auto mb-4" />
                      <h3 className="text-white text-xl font-semibold mb-2">Success Stories</h3>
                      <p className="text-gray-400">Watch how we've transformed careers</p>
                    </div>
                  </div>

                  {/* Enhanced Video Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-80'}`} />

                  {/* Enhanced Play Button */}
                  <motion.button
                    className="absolute inset-0 flex items-center justify-center group/play"
                    onClick={() => setIsPlaying(!isPlaying)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      {/* Animated rings */}
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-full"
                        animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-full"
                        animate={{ scale: isHovered ? [1, 1.6, 1] : 1 }}
                        transition={{ duration: 2, repeat: isHovered ? Infinity : 0, delay: 0.5 }}
                      />

                      {/* Main play button */}
                      <div className="relative bg-gradient-to-r from-accent-500 to-primary-500 backdrop-blur-lg rounded-full p-6 border border-white/30 group-hover/play:from-primary-500 group-hover/play:to-accent-500 transition-all duration-300 shadow-2xl">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </motion.button>

                  {/* Enhanced Overlay Text */}
                  <motion.div
                    className="absolute bottom-6 left-6 right-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-1">
                            "From Confusion to Clarity"
                          </h3>
                          <p className="text-gray-300 text-sm">
                            Discover transformative guidance stories
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Volume2 size={16} />
                          <span className="text-xs">5:32</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </GlowCard>

              {/* Floating video indicator */}
              <FloatingElement intensity={3} speed={4}>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  LIVE
                </div>
              </FloatingElement>
            </div>
          </AnimatedSection>

          {/* Enhanced Content */}
          <div className="space-y-8">
            <AnimatedSection animation="slideRight" delay={0.6}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent-500/10 to-primary-500/10 border border-accent-500/20 rounded-full text-accent-300 text-sm font-medium backdrop-blur-sm">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  Success Stories
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Real Results from
                  <span className="block bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">Real Students</span>
                </h3>

                <p className="text-lg text-gray-300 leading-relaxed">
                  Our proven methodology has helped thousands of students navigate their
                  academic journey with confidence. From career clarity to university
                  admission success, see how we make dreams reality.
                </p>
              </div>
            </AnimatedSection>

            {/* Enhanced Stats */}
            <AnimatedSection animation="slideUp" delay={0.8}>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <FloatingElement key={stat.label} intensity={3} speed={6 + index}>
                    <motion.div
                      className="text-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-3 shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                    </motion.div>
                  </FloatingElement>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={1.0}>
              <motion.button
                className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-accent-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center">
                  <PlayCircle size={20} className="mr-2" />
                  Watch Full Story
                </div>
              </motion.button>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;