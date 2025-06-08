import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Users, 
  GraduationCap, 
  Search, 
  HandHelping, 
  Target, 
  TrendingUp,
  Sparkles,
  Award
} from 'lucide-react';
import { SITE } from '../constants';
import { AnimatedSection, StaggeredAnimation, GlowCard } from './ui/AnimationComponents';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
          delay: index * 0.1,
          duration: 0.8,
          ease: [0.25, 0.25, 0, 1]
        }
      } : {}}
      className="group"
    >
      <GlowCard className="h-full transform-gpu">
        <motion.div
          className="relative overflow-hidden pt-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))",
                "linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Icon container with floating animation */}
          <motion.div
            className="relative flex items-center justify-center mb-6"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.2
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {icon}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Title with typewriter effect on hover */}
          <motion.h3 
            className="text-xl font-bold text-white text-center mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text"
            whileHover={{ 
              backgroundImage: "linear-gradient(45deg, #3b82f6, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          {/* Description with reveal animation */}
          <motion.p 
            className="text-gray-300 text-center text-sm leading-relaxed relative"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {description}
          </motion.p>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 text-primary-400 opacity-20 group-hover:opacity-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={16} />
          </motion.div>
        </motion.div>
      </GlowCard>
    </motion.div>
  );
};

const FeatureSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      id: 1,
      icon: <GraduationCap size={28} className="text-white drop-shadow-lg" />,
      title: 'Expert Guidance that Matters',
      description: 'Tap into the wisdom of top mentors and industry veterans. We don\'t just advise — we empower you with clarity and confidence.',
    },
    {
      id: 2,
      icon: <Users size={28} className="text-white drop-shadow-lg" />,
      title: 'Mentorship Made for You',
      description: 'Every student is unique. Our mentors walk with you step by step, turning confusion into clarity and dreams into action plans.',
    },
    {
      id: 3,
      icon: <Search size={28} className="text-white drop-shadow-lg" />,
      title: 'Tailored Consultation',
      description: 'Course? Country? Career path? We decode every option and help you make choices that align with your future, not just your present.',
    },
    {
      id: 4,
      icon: <HandHelping size={28} className="text-white drop-shadow-lg" />,
      title: 'Admission Support',
      description: 'From form-filling to follow-ups, we handle the stress so you can focus on success. Your dream college is now just a process away.',
    },
    {
      id: 5,
      icon: <Target size={28} className="text-white drop-shadow-lg" />,
      title: 'Strategic Planning',
      description: 'Every goal needs a roadmap. We create personalized strategies that transform your aspirations into achievable milestones.',
    },
    {
      id: 6,
      icon: <TrendingUp size={28} className="text-white drop-shadow-lg" />,
      title: 'Career Acceleration',
      description: 'We go beyond the classroom. With skill-building insights and future-proof strategies, we prepare you to thrive in a changing world.',
    },
  ];

  const stats = [
    { number: '20K+', label: 'Students Guided' },
    { number: '99.99%', label: 'Success Rate' },
    { number: '500+', label: 'Universities' },
    { number: '100%', label: 'Career Counselling' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-primary-900/20 to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <AnimatedSection>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Trusted by Thousands
              </span>
            </motion.div>

            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Dream.
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Our Mission.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-primary-300 mb-4">
                Why Thousands Trust {SITE.name} {SITE.sub}
              </h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                At {SITE.name} {SITE.sub}, we\'re not just an admission provider — we\'re your academic allies, your
                career compass, and your go-to growth partners. Whether you're chasing a top university
                seat or exploring future career paths, we make the journey smoother, smarter, and successful.
              </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              ref={ref}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </StaggeredAnimation>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white font-semibold text-lg shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 flex items-center justify-center">
              Start Your Journey Today
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles size={20} />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureSection;