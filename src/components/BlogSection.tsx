import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
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
  const [likes, setLikes] = useState(post.likes || Math.floor(Math.random() * 50) + 10);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const defaultImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <GlowCard className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-500">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image || defaultImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-accent-500 to-primary-500 text-white text-xs font-semibold rounded-full">
              <Tag size={12} className="mr-1" />
              {post.category}
            </span>
          </div>

          {/* Video Play Button */}
          {post.isVideo && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-white/20 backdrop-blur-lg rounded-full p-3 border border-white/30">
                <Play className="w-6 h-6 text-white" fill="white" />
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              <Share2 size={16} />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white text-xs">
            {post.views && (
              <div className="flex items-center">
                <TrendingUp size={12} className="mr-1" />
                {post.views}
              </div>
            )}
            <div className="flex items-center">
              <Heart size={12} className="mr-1" />
              {likes}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
            </div>
            {post.readTime && (
              <div className="flex items-center text-accent-400">
                <Clock size={14} className="mr-1" />
                <span>{post.readTime} min</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-accent-400 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Read More Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between w-full bg-gradient-to-r from-accent-500/10 to-primary-500/10 hover:from-accent-500/20 hover:to-primary-500/20 border border-accent-500/20 text-accent-400 px-4 py-3 rounded-lg transition-all duration-300 group/btn"
          >
            <span className="font-medium">
              {post.isVideo ? 'Watch Now' : 'Read Article'}
            </span>
            <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </GlowCard>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-800/60 rounded-xl h-80" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-red-400 mb-4">Failed to load blog posts</p>
            <button
              onClick={() => window.location.reload()}
              className="text-accent-500 hover:text-primary-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {filteredPosts.slice(0, 8).map((post: any, index: number) => (
                <BlogPostCard key={post.$id} post={post} index={index} />
              ))}
            </div>

            {/* Load More Button */}
            {filteredPosts.length > 8 && (
              <AnimatedSection animation="slideUp" delay={0.6}>
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-accent-500/25 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <BookOpen size={20} className="mr-2" />
                      Load More Articles
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