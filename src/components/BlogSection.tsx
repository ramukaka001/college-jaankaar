import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  ArrowRight,
  Clock,
  BookOpen,
  Heart,
  Share2,
  Tag,
  Play,
  TrendingUp
} from 'lucide-react';
import { AnimatedSection, GlowCard, FloatingElement } from './ui/AnimationComponents';
import { useBlogPosts } from '../hooks/useAppwrite';

interface BlogPostCardProps {
  post: {
    $id: string;
    title: string;
    excerpt: string;
    author: string;
    publishDate: string;
    category: string;
    image?: string;
    readTime?: number;
    isVideo?: boolean;
    views?: number;
    likes?: number;
  };
  index: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(post.likes || Math.floor(Math.random() * 50) + 10);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const defaultImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  const getCategoryColor = (category: string) => {
    const colors = {
      'career-guidance': 'from-purple-500 to-pink-500',
      'university-tips': 'from-blue-500 to-cyan-500',
      'success-stories': 'from-green-500 to-emerald-500',
      'admissions': 'from-orange-500 to-red-500',
      'default': 'from-accent-500 to-primary-500'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Enhanced Glow Effect */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.02 : 1
          }}
        />

        <GlowCard className="relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-white/30 group-hover:shadow-2xl group-hover:shadow-accent-500/10">
          {/* Enhanced Image Section */}
          <div className="relative h-56 overflow-hidden">
            <motion.img
              src={post.image || defaultImage}
              alt={post.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.08 : 1,
                filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Animated Pattern Overlay */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
              animate={{
                opacity: isHovered ? 0.2 : 0.1,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Enhanced Category Badge */}
            <motion.div 
              className="absolute top-5 left-5"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <span className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20`}>
                <Tag size={12} className="mr-2" />
                {post.category.replace('-', ' ').toUpperCase()}
              </span>
            </motion.div>

            {/* Enhanced Video Play Button */}
            {post.isVideo && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated Pulse Rings */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-full"
                    animate={{ 
                      scale: isHovered ? [1, 1.4, 1] : 1,
                      opacity: isHovered ? [0.8, 0, 0.8] : 0.8
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: isHovered ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-full"
                    animate={{ 
                      scale: isHovered ? [1, 1.7, 1] : 1,
                      opacity: isHovered ? [0.6, 0, 0.6] : 0.6
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: isHovered ? Infinity : 0,
                      delay: 0.5,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="relative bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-xl rounded-full p-4 border-2 border-white/30 shadow-2xl">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Enhanced Action Buttons */}
            <motion.div 
              className="absolute top-5 right-5 flex space-x-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-3 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                  isLiked 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 border-red-400/50 text-white shadow-lg shadow-red-500/25' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
                }`}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Share2 size={16} />
              </motion.button>
            </motion.div>

            {/* Enhanced Stats Bar */}
            <motion.div 
              className="absolute bottom-5 left-5 right-5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/10">
                <div className="flex items-center justify-between text-white text-sm">
                  <div className="flex items-center space-x-4">
                    {post.views && (
                      <div className="flex items-center space-x-1">
                        <TrendingUp size={14} className="text-accent-400" />
                        <span className="font-medium">{post.views}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Heart size={14} className="text-red-400" />
                      <span className="font-medium">{likes}</span>
                    </div>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center space-x-1 text-accent-400">
                      <Clock size={14} />
                      <span className="font-medium">{post.readTime}m</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Content Section */}
          <div className="p-7">
            {/* Enhanced Author & Date */}
            <motion.div 
              className="flex items-center justify-between mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{post.author}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(post.publishDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              {post.readTime && (
                <div className="bg-accent-500/10 border border-accent-500/20 rounded-lg px-3 py-1">
                  <div className="flex items-center space-x-1 text-accent-400 text-xs font-medium">
                    <Clock size={12} />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Enhanced Title */}
            <motion.h3 
              className="text-xl font-bold text-white mb-4 line-clamp-2 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <motion.span
                className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-accent-400 group-hover:to-primary-400 transition-all duration-500"
              >
                {post.title}
              </motion.span>
            </motion.h3>

            {/* Enhanced Excerpt */}
            <motion.p 
              className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              {post.excerpt}
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn relative w-full bg-gradient-to-r from-accent-500/10 to-primary-500/10 hover:from-accent-500/20 hover:to-primary-500/20 border border-accent-500/30 hover:border-accent-500/50 rounded-xl px-6 py-4 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: isHovered ? ['0%', '100%'] : '0%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              
              <div className="relative flex items-center justify-between">
                <span className="font-semibold text-accent-400 group-hover/btn:text-accent-300 transition-colors">
                  {post.isVideo ? '🎥 Watch Now' : '📖 Read Article'}
                </span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight size={18} className="text-accent-400 group-hover/btn:text-accent-300 transition-colors" />
                </motion.div>
              </div>
            </motion.button>
          </div>
        </GlowCard>
      </div>
    </motion.div>
  );
};

const BlogSection: React.FC = () => {
  const { posts, loading, error } = useBlogPosts();
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'career-guidance', 'university-tips', 'success-stories', 'admissions'];

  const filteredPosts = filter === 'all'
    ? posts
    : posts.filter((post: any) => post.category === filter);

  return (
    <section className="relative bg-gradient-to-b from-gray-950 via-black to-gray-950 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full mb-6">
              <BookOpen size={32} className="text-white" />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest from Our{' '}
              <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
                Blog
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.3}>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Stay updated with the latest insights, tips, and success stories
              to help you navigate your educational journey.
            </p>
          </AnimatedSection>
        </div>

        {/* Category Filter */}
        <AnimatedSection animation="slideUp" delay={0.4}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${filter === category
                    ? 'bg-gradient-to-r from-accent-500 to-primary-500 text-white shadow-lg'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl h-[420px] border border-white/5" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
              <BookOpen size={64} className="text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Failed to load blog posts</h3>
              <p className="text-gray-400 mb-6">Something went wrong while fetching the latest articles.</p>
              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Try Again
              </motion.button>
            </div>
          </div>
        ) : (
          <>
            {/* Blog Posts Grid - Enhanced for better card display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
              {filteredPosts.slice(0, 6).map((post: any, index: number) => (
                <BlogPostCard key={post.$id} post={post} index={index} />
              ))}
            </div>

            {/* Load More Button */}
            {filteredPosts.length > 6 && (
              <AnimatedSection animation="slideUp" delay={0.6}>
                <div className="text-center mb-12">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative bg-gradient-to-r from-accent-500/10 to-primary-500/10 hover:from-accent-500/20 hover:to-primary-500/20 border border-accent-500/30 hover:border-accent-500/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-pulse" />
                    
                    <div className="relative flex items-center space-x-3">
                      <BookOpen size={20} className="text-accent-400" />
                      <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                        Load More Articles
                      </span>
                    </div>
                  </motion.button>
                </div>
              </AnimatedSection>
            )}
          </>
        )}

        {/* Newsletter CTA */}
        <AnimatedSection animation="slideUp" delay={0.8}>
          <div className="mt-20">
            <GlowCard className="bg-gradient-to-r from-accent-500/10 to-primary-500/10 border border-white/10 rounded-2xl p-8 text-center">
              <FloatingElement intensity={2} speed={3}>
                <BookOpen size={48} className="text-accent-500 mx-auto mb-4" />
              </FloatingElement>
              <h3 className="text-2xl font-bold text-white mb-4">
                Never Miss an Update
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Subscribe to our newsletter and get the latest career guidance,
                university tips, and success stories delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all backdrop-blur-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </GlowCard>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BlogSection;