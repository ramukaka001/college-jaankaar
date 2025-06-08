import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Star, Award } from 'lucide-react';
import { AnimatedSection, GlowCard, FloatingElement } from './ui/AnimationComponents';
import theImage from '../assets/two-people-speech-bubbles.png';

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const stats = [
    { icon: Users, value: "20,000+", label: "Students Guided" },
    { icon: Star, value: "4.9/5", label: "Rating" },
    { icon: Award, value: "99.99%", label: "Success Rate" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-neutral-900 via-primary-900/10 to-secondary-900/10 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              See How We Transform
              <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Students' Lives
              </span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Watch real success stories and discover how our expert guidance
              has helped thousands of students achieve their dreams.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <AnimatedSection animation="slideLeft" delay={0.4}>
            <GlowCard className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-video relative">
                <img
                  src={theImage}
                  alt="Success stories video"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button */}
                <motion.button
                  className="absolute inset-0 flex items-center justify-center group/play"
                  onClick={() => setIsPlaying(!isPlaying)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-xl" />
                    <div className="relative bg-white/20 backdrop-blur-lg rounded-full p-6 border border-white/30 group-hover/play:bg-white/30 transition-all duration-300">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </motion.button>

                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
                  >
                    <h3 className="text-white font-semibold text-lg mb-2">
                      "From Confusion to Clarity"
                    </h3>
                    <p className="text-neutral-200 text-sm">
                      Discover how personalized guidance transformed uncertainty into success
                    </p>
                  </motion.div>
                </div>
              </div>
            </GlowCard>
          </AnimatedSection>

          {/* Content */}
          <div className="space-y-8">
            <AnimatedSection animation="slideRight" delay={0.6}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-300 text-sm font-medium backdrop-blur-sm">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  Success Stories
                </div>

                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
                  Real Results from
                  <span className="block text-primary-400">Real Students</span>
                </h3>

                <p className="text-lg text-neutral-300 leading-relaxed">
                  Our proven methodology has helped thousands of students navigate their
                  academic journey with confidence. From career clarity to university
                  admission success, see how we make dreams reality.
                </p>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection animation="slideUp" delay={0.8}>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <FloatingElement key={stat.label} intensity={5} speed={6 + index}>
                    <motion.div
                      className="text-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                    >
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-500/20 rounded-lg mb-3">
                        <stat.icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-neutral-400">{stat.label}</div>
                    </motion.div>
                  </FloatingElement>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={1.0}>
              <motion.button
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Full Story
              </motion.button>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;