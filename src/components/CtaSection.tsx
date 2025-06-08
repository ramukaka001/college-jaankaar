import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MessageCircle, Sparkles, Target } from 'lucide-react';
import { AnimatedSection, GlowCard, FloatingElement } from './ui/AnimationComponents';

const CtaSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-black via-gray-950 to-black py-24 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05)_0%,transparent_50%)]" />
        
        {/* Decorative Corner Elements */}
        <FloatingElement intensity={2} speed={4}>
          <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-accent-500/30 rounded-tr-3xl" />
        </FloatingElement>
        <FloatingElement intensity={3} speed={6}>
          <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-primary-500/30 rounded-bl-3xl" />
        </FloatingElement>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp" delay={0.1}>
          <GlowCard className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 md:p-16 text-center">
            
            {/* Floating Icon */}
            <FloatingElement intensity={3} speed={5}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl mb-8 shadow-2xl">
                <Sparkles size={40} className="text-white" />
              </div>
            </FloatingElement>

            {/* Main Heading */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                ACCESS THE FIRST LESSON
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
                AND BUILD YOUR CAREER
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Sign up now to receive your first lesson absolutely free. Dive into the world 
              of endless possibilities and take the first step towards your dream career.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <BookOpen className="w-8 h-8 text-accent-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Free First Lesson</h3>
                <p className="text-gray-400 text-sm">Start your journey with a comprehensive introduction</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <Target className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Personalized Guidance</h3>
                <p className="text-gray-400 text-sm">Tailored career paths based on your interests</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-400 text-sm">24/7 access to career counseling professionals</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            {/* <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.a
                href="/#pricing"
                className="group bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-accent-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>View Plans</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="group bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Contact Us</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            </motion.div> */}

            {/* Trust Indicators */}
            {/* <motion.div
              className="mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-gray-500 text-sm mb-4">Trusted by thousands of students worldwide</p>
              <div className="flex justify-center space-x-8 opacity-60">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">10K+</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">500+</div>
                  <div className="text-xs text-gray-500">Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">95%</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
              </div>
            </motion.div> */}
          </GlowCard>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CtaSection;