import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Users, Award, TrendingUp } from "lucide-react";
import { AnimatedSection, GradientButton, FloatingElement } from "./ui/AnimationComponents";
import heroImage from "../assets/hero-girl.png";

export default function HeroSection() {
  const stats = [
    { icon: Users, number: "5,000+", label: "Students Guided" },
    { icon: Award, number: "98%", label: "Success Rate" },
    { icon: TrendingUp, number: "300+", label: "Universities" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-neutral-900 via-primary-900/20 to-secondary-900/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <AnimatedSection animation="slideUp" delay={0.2}>
              <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-300 text-sm font-medium backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Trusted by 5,000+ Students Worldwide
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.4}>
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight">
                Shape Your
                <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Future with
                </span>
                Expert Guidance
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.6}>
              <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl">
                Unlock your potential with personalized counseling and comprehensive support 
                for your academic and career journey.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4">
                <GradientButton size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </GradientButton>
                
                <motion.button 
                  className="flex items-center justify-center px-8 py-4 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </motion.button>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection animation="slideUp" delay={1.0}>
              <div className="grid grid-cols-3 gap-8 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-lg mb-3">
                      <stat.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-neutral-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <AnimatedSection animation="slideRight" delay={0.8}>
              <FloatingElement intensity={15} speed={8}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl blur-2xl transform rotate-3" />
                  <img 
                    src={heroImage} 
                    alt="Student achieving success" 
                    className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </FloatingElement>
            </AnimatedSection>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 right-10 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">98% Success</div>
                  <div className="text-neutral-300 text-xs">Admission Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">24/7 Support</div>
                  <div className="text-neutral-300 text-xs">Expert Guidance</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
