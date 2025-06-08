import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  TrendingUp, 
  Users, 
  Star, 
  ArrowRight, 
  BookOpen,
  Briefcase,
  GraduationCap,
  Target,
  ChevronRight,
  Filter,
  X
} from 'lucide-react';
import { AnimatedSection, GlowCard, FloatingElement } from './ui/AnimationComponents';

// Enhanced category data with better icons and colors
const categories = [
  { 
    id: 'engineering', 
    name: 'Engineering & Technology', 
    icon: '⚙️', 
    color: 'from-blue-500 to-cyan-500',
    count: '1.2K+ paths',
    description: 'Software, Civil, Mechanical, Electrical & more'
  },
  { 
    id: 'business', 
    name: 'Business & Management', 
    icon: '💼', 
    color: 'from-green-500 to-emerald-500',
    count: '800+ paths',
    description: 'MBA, Finance, Marketing, Operations'
  },
  { 
    id: 'healthcare', 
    name: 'Healthcare & Medicine', 
    icon: '🏥', 
    color: 'from-red-500 to-pink-500',
    count: '650+ paths',
    description: 'MBBS, Nursing, Pharmacy, Physiotherapy'
  },
  { 
    id: 'arts', 
    name: 'Arts & Design', 
    icon: '🎨', 
    color: 'from-purple-500 to-violet-500',
    count: '450+ paths',
    description: 'Fine Arts, Graphic Design, Fashion'
  },
  { 
    id: 'science', 
    name: 'Science & Research', 
    icon: '🔬', 
    color: 'from-amber-500 to-orange-500',
    count: '750+ paths',
    description: 'Physics, Chemistry, Biology, Research'
  },
  { 
    id: 'law', 
    name: 'Law & Legal Studies', 
    icon: '⚖️', 
    color: 'from-indigo-500 to-blue-500',
    count: '320+ paths',
    description: 'LLB, Corporate Law, Criminal Law'
  },
  { 
    id: 'aviation', 
    name: 'Aviation & Aerospace', 
    icon: '✈️', 
    color: 'from-sky-500 to-blue-500',
    count: '180+ paths',
    description: 'Pilot Training, Aerospace Engineering'
  },
  { 
    id: 'agriculture', 
    name: 'Agriculture & Environment', 
    icon: '🌱', 
    color: 'from-green-600 to-lime-500',
    count: '280+ paths',
    description: 'Agricultural Science, Environmental Studies'
  },
];

const CategorySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-950 via-black to-gray-900 py-24 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(6,182,212,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl mb-8 shadow-lg">
              <Target size={40} className="text-white" />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.2}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Explore Career{' '}
              <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.3}>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of career paths across diverse fields. Find your passion, 
              explore opportunities, and get personalized guidance for your future.
            </p>
          </AnimatedSection>

          {/* Enhanced Stats */}
          {/* <AnimatedSection animation="slideUp" delay={0.4}>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { icon: Briefcase, value: '5,000+', label: 'Career Paths', color: 'from-blue-500 to-cyan-500' },
                { icon: Users, value: '50,000+', label: 'Students Guided', color: 'from-green-500 to-emerald-500' },
                { icon: Star, value: '4.9/5', label: 'Success Rate', color: 'from-yellow-500 to-orange-500' },
              ].map((stat, index) => (
                <FloatingElement key={stat.label} intensity={2} speed={4 + index}>
                  <motion.div
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center min-w-[140px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-3`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                </FloatingElement>
              ))}
            </div>
          </AnimatedSection> */}
        </div>

        {/* Enhanced Search & Filter Section */}
        <AnimatedSection animation="slideUp" delay={0.5}>
          <div className="mb-16">
            <div className="max-w-2xl mx-auto">
              {/* Search Bar */}
              <div className="relative mb-6">
                <GlowCard className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                    <input
                      type="search"
                      placeholder="Search career categories, fields, or interests..."
                      className="w-full bg-transparent text-white text-lg py-6 pl-16 pr-20 focus:outline-none placeholder-gray-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <motion.button
                        onClick={clearSearch}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={20} />
                      </motion.button>
                    )}
                  </div>
                </GlowCard>
              </div>

              {/* Filter Toggle */}
              <div className="text-center">
                <motion.button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter size={18} />
                  <span>Advanced Filters</span>
                  <motion.div
                    animate={{ rotate: isFilterOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Enhanced Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
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
              <GlowCard className="relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all duration-500 h-full">
                {/* Category Icon & Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-2xl">{category.icon}</span>
                    </motion.div>
                    
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight className="w-6 h-6 text-accent-400" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>
                </div>

                {/* Category Stats */}
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${category.color} bg-opacity-20 rounded-full`}>
                    <TrendingUp size={14} className="mr-2 text-accent-400" />
                    <span className="text-accent-400 text-sm font-medium">{category.count}</span>
                  </div>
                  
                  <motion.button
                    onClick={() => {/* Handle category selection */}}
                    className="text-sm text-gray-400 hover:text-accent-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Explore →
                  </motion.button>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-primary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <AnimatedSection animation="slideUp" delay={0.8}>
          <div className="text-center">
            <GlowCard className="bg-gradient-to-r from-accent-500/10 via-primary-500/10 to-accent-500/10 border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
              <FloatingElement intensity={2} speed={3}>
                <GraduationCap size={64} className="text-accent-500 mx-auto mb-6" />
              </FloatingElement>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Not Sure Which Path to Choose?
              </h3>
              
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Get personalized career counseling from our experts. We'll help you discover 
                your strengths, interests, and the perfect career path for your future.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent-500/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen size={20} />
                    <span>Book Free Consultation</span>
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
      </div>
    </section>
  );
};

export default CategorySection;