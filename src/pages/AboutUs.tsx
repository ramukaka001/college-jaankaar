import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Laptop, 
  Network, 
  HandHelping, 
  LightbulbIcon, 
  BarChart2,
  Play,
  Award,
  Target,
  Heart,
  Zap,
  Globe,
  ArrowRight,
  Quote,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { AnimatedSection, GlowCard, FloatingElement } from '../components/ui/AnimationComponents';
import { SITE } from '../constants';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <GlowCard className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 hover:bg-white/10 hover:border-white/20">
        
        {/* Icon */}
        <motion.div
          className={`${color} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white text-center mb-4 group-hover:text-accent-300 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-center leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>

        {/* Hover Effect */}
        <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${color.replace('bg-gradient-to-r', 'bg-gradient-to-br')}`} />
      </GlowCard>
    </motion.div>
  );
};

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  bio: string;
  index: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, role, bio, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 80
      }}
      whileHover={{ y: -10, rotateY: 5 }}
      className="group"
    >
      <GlowCard className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden h-full">
        
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Floating Elements */}
          <FloatingElement intensity={2} speed={4}>
            <div className="absolute top-4 right-4 bg-accent-500/20 backdrop-blur-xl rounded-full p-3 border border-white/20">
              <Award className="w-5 h-5 text-accent-300" />
            </div>
          </FloatingElement>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (index * 0.2) + 0.3 }}
          >
            <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider">{role}</span>
            <h3 className="text-white text-2xl font-bold mb-3 group-hover:text-accent-300 transition-colors">
              {name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{bio}</p>
          </motion.div>

          {/* Social Links Placeholder */}
          <motion.div
            className="flex space-x-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            transition={{ delay: (index * 0.2) + 0.5 }}
          >
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent-500/20 transition-colors cursor-pointer">
              <Globe className="w-4 h-4 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </GlowCard>
    </motion.div>
  );
};

const AboutUs: React.FC = () => {
  const features = [
    {
      icon: <Users size={28} className="text-white" />,
      title: 'Expert Guidance',
      description: 'Receive personalized guidance from seasoned professionals with years of experience in college counseling and career development.',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: <Laptop size={28} className="text-white" />,
      title: 'Mentorship',
      description: 'Connect with mentors who have walked the path before you and understand the challenges of academic and career transitions.',
      color: 'bg-gradient-to-r from-purple-500 to-violet-500',
      delay: 0.2
    },
    {
      icon: <Network size={28} className="text-white" />,
      title: 'Consultation',
      description: 'Get in-depth consultations to clarify your academic goals and create a roadmap for your future success.',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      delay: 0.3
    },
    {
      icon: <HandHelping size={28} className="text-white" />,
      title: 'Admission Support',
      description: 'Navigate the complexities of college admissions with ease through our comprehensive support system.',
      color: 'bg-gradient-to-r from-red-500 to-pink-500',
      delay: 0.4
    },
    {
      icon: <LightbulbIcon size={28} className="text-white" />,
      title: 'New Opportunities',
      description: 'Discover hidden opportunities that align with your aspirations and unlock your potential for success.',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      delay: 0.5
    },
    {
      icon: <BarChart2 size={28} className="text-white" />,
      title: 'Career Advancement',
      description: 'Build a strong foundation for career advancement with strategic planning and skill development guidance.',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      delay: 0.6
    },
  ];

  const teamMembers = [
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      name: 'Rajiv Dixit',
      role: 'CEO & Founder',
      bio: 'Visionary leader with over 15 years of experience in education technology and student counseling.',
      index: 0
    },
    {
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      name: 'Priya Sharma',
      role: 'Head of Counseling',
      bio: 'Expert counselor specializing in career guidance and college admissions with a passion for student success.',
      index: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      name: 'Arjun Patel',
      role: 'Technology Director',
      bio: 'Tech innovator focused on creating cutting-edge solutions to enhance the student counseling experience.',
      index: 2
    },
  ];

  const stats = [
    { value: '20,000+', label: 'Students Guided', color: 'from-accent-500 to-cyan-500' },
    { value: '500+', label: 'Partner Colleges', color: 'from-primary-500 to-violet-500' },
    { value: '5+', label: 'Years Experience', color: 'from-green-500 to-emerald-500' },
    { value: '99.99%', label: 'Success Rate', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </motion.div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0">
          <FloatingElement intensity={2} speed={8}>
            <div className="absolute top-20 left-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          </FloatingElement>
          <FloatingElement intensity={3} speed={6}>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          </FloatingElement>
        </div>

        {/* Hero Content */}
        <div className="relative text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-4 mt-20"
          >
            <div className="bg-gradient-to-r from-accent-500/20 to-primary-500/20 backdrop-blur-xl border border-accent-500/30 rounded-full px-6 py-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-accent-400" />
                <span className="text-accent-300 font-semibold">About Our Journey</span>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Empowering Dreams,
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
              Shaping Futures
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            At <span className="text-accent-400 font-semibold">{SITE.name} {SITE.sub}</span>, we are passionate about empowering students to achieve their academic and career dreams through comprehensive counseling and personalized guidance.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              className="group bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Our Mission</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
            
            <motion.button
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Meet Our Team</span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>
      {/* Mission & Vision Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-primary-500/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Mission */}
            <AnimatedSection animation="slideRight" delay={0.2}>
              <GlowCard className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-accent-500 to-cyan-500 rounded-2xl p-4 mr-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  To democratize access to quality education counseling and career guidance, ensuring every student has the opportunity to discover and pursue their true potential.
                </p>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Personalized Approach</h4>
                    <p className="text-gray-400">Every student receives tailored guidance based on their unique strengths and aspirations.</p>
                  </div>
                </div>
              </GlowCard>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection animation="slideLeft" delay={0.4}>
              <GlowCard className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl p-4 mr-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  To become the leading platform that bridges the gap between student aspirations and academic opportunities, creating a world where every student finds their perfect educational path.
                </p>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Global Impact</h4>
                    <p className="text-gray-400">Expanding our reach to help students worldwide achieve their educational dreams.</p>
                  </div>
                </div>
              </GlowCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-40 left-40 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-40 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">Us</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Discover what makes us the trusted choice for thousands of students worldwide
              </p>
            </div>
          </AnimatedSection>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="relative py-24 bg-gradient-to-r from-gray-900/50 to-black/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                From a small idea to a thriving community, our journey has been fueled by a commitment to helping students navigate the complex world of higher education and career development.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.3}>
            <div className="relative">
              <GlowCard className="relative rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
                  alt="Our Journey"
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Play Button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="bg-accent-500/20 backdrop-blur-xl border border-white/20 rounded-full p-8 cursor-pointer hover:bg-accent-500/30 transition-all duration-300">
                    <Play className="w-12 h-12 text-white ml-1" fill="white" />
                  </div>
                </motion.div>

                {/* Content Overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-4 mb-4">
                      <Quote className="w-6 h-6 text-accent-400" />
                      <span className="text-accent-300 font-semibold">Watch Our Story</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Building Dreams Together</h3>
                    <p className="text-gray-300">Discover how we've transformed the lives of thousands of students across the globe.</p>
                  </div>
                </div>
              </GlowCard>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-900" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Meet Our <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Meet the dedicated individuals behind {SITE.name} {SITE.sub}, committed to providing the best possible support for your academic journey and career success.
              </p>
            </div>
          </AnimatedSection>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>

          {/* Join Our Team CTA */}
          <AnimatedSection animation="slideUp" delay={0.8}>
            <div className="text-center mt-20">
              <GlowCard className="bg-gradient-to-r from-accent-500/10 via-primary-500/10 to-accent-500/10 border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
                <Heart className="w-16 h-16 text-accent-500 mx-auto mb-6" />
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Want to Join Our Mission?
                </h3>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  We're always looking for passionate individuals who share our vision of empowering students to achieve their dreams.
                </p>
                <motion.button
                  className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent-500/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Join Our Team</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.button>
              </GlowCard>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;