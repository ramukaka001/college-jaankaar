import React, { useState } from 'react';
import { MoreHorizontal, Play, Calendar, User, Star, Upload, Plus, Filter, Search, BookOpen, Video, TrendingUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogPosts } from '../hooks/useAppwrite';
import { AnimatedSection, GlowCard } from '../components/ui/AnimationComponents';

interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  tags?: string[];
  readTime?: number;
  likes?: number;
  isVideo?: boolean;
  videoUrl?: string;
}

const BlogPost: React.FC<{ post: BlogPostProps; index: number }> = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group"
  >
    <GlowCard className="h-full overflow-hidden bg-white/5 backdrop-blur-md border border-white/10">
      <div className="relative h-56 overflow-hidden">
        <motion.img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Video play button */}
        {post.isVideo && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30 hover:bg-white/30 transition-all duration-300">
              <Play className="w-8 h-8 text-white" fill="currentColor" />
            </div>
          </motion.div>
        )}
        
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            <MoreHorizontal size={16} className="text-white" />
          </motion.button>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-500/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-blue-400/30">
            {post.category}
          </span>
        </div>
        
        {/* Date */}
        <div className="absolute bottom-4 left-4 flex items-center text-white text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-white/90 text-sm font-medium">{post.author}</span>
          {post.readTime && (
            <span className="ml-auto text-white/60 text-xs flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              {post.readTime} min read
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-white/70 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-white/10 px-2 py-1 rounded-full text-xs text-white/80 border border-white/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            {post.isVideo ? 'Watch Now' : 'Read More'}
          </motion.button>
          
          {post.likes && (
            <div className="flex items-center text-white/60 text-sm">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              {post.likes}
            </div>
          )}
        </div>
      </div>
    </GlowCard>
  </motion.div>
);

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    title: '',
    category: '',
    video: null as File | null,
  });

  const { posts: blogPosts, loading: postsLoading } = useBlogPosts();
  const categories = ['All', 'Career', 'Education', 'Technology', 'Health', 'Lifestyle'];

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Blog uploaded successfully!');
      setShowUploadForm(false);
      setFormData({ name: '', date: '', title: '', category: '', video: null });
      setLoading(false);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, video: file }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      {/* Hero Section */}
      <AnimatedSection className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/90 to-pink-900/90" />
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
              backgroundSize: '200% 200%'
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-white/90 font-medium">Latest Insights & Updates</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                BLOG
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Discover expert insights, career guidance, and educational content to help you navigate your academic and professional journey with confidence.
            </p>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </AnimatedSection>

      {/* Upload Form Modal */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Upload Content</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowUploadForm(false)}
                  className="text-white/60 hover:text-white"
                >
                  <Plus className="w-6 h-6 rotate-45" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Author Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-blue-400 transition-colors"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors"
                  required
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Post Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-blue-400 transition-colors"
                  required
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                  ))}
                </select>
                <input
                  type="file"
                  name="video"
                  accept="video/*,image/*"
                  onChange={handleFileChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  required
                />
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className='animate-spin'/> 
                    : 'Upload'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Latest Updates & Insights
            </motion.h2>
            <motion.p 
              className="text-white/70 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Stay informed with our curated collection of expert articles, career guidance, and educational insights.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Search and Upload Section */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/60 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            
            {/* Upload Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUploadForm(true)}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-green-500/25"
            >
              <Upload className="w-5 h-5" />
              Upload Content
            </motion.button>
          </div>
        </AnimatedSection>

        {/* Categories Filter */}
        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Blog Posts Grid */}
        <AnimatedSection>
          {postsLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className='animate-spin'/>
            </div>
          ) : (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {filteredPosts.map((post, index) => (
                  <BlogPost key={post.$id} post={post as any} index={index} />
                ))}
              </motion.div>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No posts found</h3>
                  <p className="text-white/60">Try adjusting your search or category filter.</p>
                </motion.div>
              )}

              {filteredPosts.length > 0 && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-blue-500/25"
                  >
                    Load More Articles
                  </motion.button>
                </div>
              )}
            </>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Blog;
