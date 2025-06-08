import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Users, 
  GraduationCap, 
  Search, 
  HandHelping, 
  Lightbulb, 
  TrendingUp,
  Sparkles,
  Target,
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
          className="relative overflow-hidden"
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
  const features = [
    {
      id: 1,
      icon: <GraduationCap size={24} className="text-white" />,
      title: 'Expert Guidance that Matters',
      description: 'Tap into the wisdom of top mentors and industry veterans. We don’t just advise — we empower you with clarity and confidence.',
    },
    {
      id: 2,
      icon: <Users size={24} className="text-white" />,
      title: 'Mentorship That’s Made for You',
      description: 'Every student is unique. That’s why our mentors walk with you, step by step, turning confusion into clarity and dreams into action plans.',
    },
    {
      id: 3,
      icon: <Search size={24} className="text-white" />,
      title: 'Tailored Consultation',
      description: 'Course? Country? Career path? We decode every option and help you make choices that align with your future, not just your present.',
    },
    {
      id: 4,
      icon: <HandHelping size={24} className="text-white" />, // Keep HandHelping for Admission Support
      title: 'Admission Support',
      description: 'From form-filling to follow-ups, we handle the stress so you can focus on success. Your dream college is now just a process away.',
    },
    {
      id: 5,
      icon: <Lightbulb size={24} className="text-white" />, // Keep Lightbulb for New Opportunity
      title: 'New Opportunity',
      description: 'Lorem ipsum dolor sit amet consectetur. Donec quis.',
    },
    {
      id: 6,
      icon: <TrendingUp size={24} className="text-white" />,
      title: 'Career Acceleration, Not Just Admission', // Keep BarChart2 or consider TrendingUp
      description: 'We go beyond the classroom. With skill-building insights and future-proof strategies, we prepare you to thrive in a changing world.',
    },
  ];

  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center ">
          Your Dream. Our Mission.
        </h2>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
            Why Thousands Trust {SITE.name} {SITE.sub}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            At {SITE.name} {SITE.sub}, we’re not just an admission provider — we’re your academic allies, your
            career compass, and your go-to growth partners. Whether you’re chasing a top university
            seat or exploring future career paths, we make the journey smoother, smarter, and
            successful.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              index={index}
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;