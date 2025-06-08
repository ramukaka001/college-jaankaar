import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Target, 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Send,
  ChevronRight,
  TrendingUp,
  Brain,
  MapPin,
  Calendar,
  Globe,
  Lightbulb
} from 'lucide-react';
import PricingSection from '../components/PricingSection';
import { AnimatedSection, GlowCard } from '../components/ui/AnimationComponents';
import { useUniversities } from '../hooks/useAppwrite';
import { SITE } from '../constants';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, color, features, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group"
  >
    <GlowCard className={`h-full text-white overflow-hidden ${color} relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="relative p-8">
        <motion.div 
          className="flex items-center justify-center mb-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mx-auto group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
        <p className="text-white/90 text-center mb-6 leading-relaxed">{description}</p>
        
        <div className="space-y-3">
          {features.map((feature, featureIndex) => (
            <motion.div
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: (index * 0.1) + (featureIndex * 0.05) }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span className="text-sm text-white/90">{feature}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </GlowCard>
  </motion.div>
);

interface UniversityCardProps {
  name: string;
  image: string;
  logo: string;
  location?: string;
  ranking?: number;
  programs?: number;
  index: number;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ 
  name, 
  image, 
  logo, 
  location = "India",
  ranking = Math.floor(Math.random() * 50) + 1,
  programs = Math.floor(Math.random() * 100) + 50,
  index 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group"
  >
    <GlowCard className="h-full overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500">
      <div className="relative h-56 overflow-hidden">
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Ranking Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/30">
          <div className="flex items-center gap-2 text-white text-sm">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Rank #{ranking}</span>
          </div>
        </div>

        {/* Logo */}
        <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md rounded-full w-16 h-16 flex items-center justify-center text-2xl border border-white/30">
          {logo}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <div className="flex items-center gap-2 text-white/60 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{programs}+</div>
            <div className="text-white/60 text-xs">Programs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">95%</div>
            <div className="text-white/60 text-xs">Placement</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-lg font-bold text-white">4.8</span>
            </div>
            <div className="text-white/60 text-xs">Rating</div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            Apply Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-all duration-300"
          >
            Info
          </motion.button>
        </div>
      </div>
    </GlowCard>
  </motion.div>
);

const AdmissionAssistant: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { universities, loading } = useUniversities();

  const services = [
    {
      title: 'AI-Powered Career Assessment',
      description: 'Leverage our advanced AI tools to discover the best-fit career paths aligned with your interests, skills, and aptitude.',
      icon: <Brain size={32} />,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      features: [
        'Comprehensive Personality Analysis',
        'Skills & Aptitude Evaluation',
        'Interest Mapping',
        'Career Path Recommendations'
      ]
    },
    {
      title: 'University & Course Matching',
      description: 'Navigate the vast landscape of universities and courses with our expert guidance, finding the perfect academic home.',
      icon: <GraduationCap size={32} />,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      features: [
        'University Database Access',
        'Course Compatibility Analysis',
        'Admission Requirements Guide',
        'Scholarship Opportunities'
      ]
    },
    {
      title: 'Application & Admission Support',
      description: 'Receive comprehensive assistance with crafting compelling applications, essays, and preparing for interviews.',
      icon: <Target size={32} />,
      color: 'bg-gradient-to-br from-green-500 to-teal-500',
      features: [
        'Application Review & Optimization',
        'Essay Writing Assistance',
        'Interview Preparation',
        'Document Verification'
      ]
    },
    {
      title: 'Expert Mentorship',
      description: 'Connect with experienced professionals and mentors who provide invaluable insights and guidance.',
      icon: <Users size={32} />,
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      features: [
        'One-on-One Mentoring Sessions',
        'Industry Expert Guidance',
        'Career Roadmap Planning',
        'Professional Network Access'
      ]
    },
  ];

  const universityData = [
    {
      name: 'IISc (Bangalore)',
      image: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg',
      logo: '🏛️',
      location: 'Bangalore, India',
      ranking: 1,
      programs: 150,
    },
    {
      name: 'Delhi University',
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg',
      logo: '🎓',
      location: 'New Delhi, India',
      ranking: 3,
      programs: 200,
    },
    {
      name: 'JNU (New Delhi)',
      image: 'https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg',
      logo: '🏫',
      location: 'New Delhi, India',
      ranking: 5,
      programs: 180,
    },
    {
      name: 'IIT Bombay',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
      logo: '🏭',
      location: 'Mumbai, India',
      ranking: 2,
      programs: 120,
    },
    {
      name: 'IIM Ahmedabad',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg',
      logo: '🏢',
      location: 'Ahmedabad, India',
      ranking: 4,
      programs: 80,
    },
    {
      name: 'AIIMS Delhi',
      image: 'https://images.pexels.com/photos/5214945/pexels-photo-5214945.jpeg',
      logo: '🏥',
      location: 'New Delhi, India',
      ranking: 1,
      programs: 100,
    },
  ];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setShowSuccessMessage(true);
      setFormData({ name: '', email: '', mobile: '', message: '' });
      setIsSubmitting(false);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      {/* Breadcrumb */}
      {/* <AnimatedSection className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div 
            className="flex items-center space-x-2 text-sm text-white/70"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-white transition-colors duration-300">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Admission Assistant</span>
          </motion.div>
        </div>
      </AnimatedSection> */}

      {/* Hero Section */}
      <AnimatedSection className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/90 to-pink-900/90" />
          <motion.div 
            className="absolute inset-0 opacity-30"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.4) 0%, transparent 50%)',
              backgroundSize: '200% 200%'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center mt-20 gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Lightbulb className="w-5 h-5 text-yellow-400 " />
                <span className="text-white/90 font-medium">Smart Admission Guidance</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  GUIDING YOU
                </span>
                <br />
                <span className="text-white">TO THE RIGHT</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  FUTURE
                </span>
              </h1>
              
              <p className="text-white/70 mb-8 leading-relaxed">
                At {SITE.name} {SITE.sub}, we understand that navigating your academic and career future can feel daunting. 
                Our AI-powered counselling services provide expert guidance, empowering you to make informed decisions and achieve your full potential.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Free Session
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  View Programs
                </motion.button>
              </div>

              {/* <div className="grid grid-cols-3 gap-6">
                {[
                  { number: '10K+', label: 'Students Guided' },
                  { number: '500+', label: 'Universities' },
                  { number: '95%', label: 'Success Rate' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div> */}
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <GlowCard className="overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
                <motion.img
                  src="https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg"
                  alt="Students discussing"
                  className="w-full h-96 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </GlowCard>
              
              {/* Floating Stats */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-bold">99.99%</div>
                    <div className="text-xs text-white/70">Success Rate</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center gap-2 text-white">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-bold">500+</div>
                    <div className="text-xs text-white/70">Universities</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OUR COMPREHENSIVE
            </span>
            <br />
            <span className="text-white">SERVICES</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From AI-powered assessments to expert mentorship, we provide end-to-end support for your academic journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </AnimatedSection>

      {/* Universities Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              TOP UNIVERSITIES
            </span>
            <br />
            <span className="text-white">WE SUPPORT</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Get admission guidance for India's most prestigious institutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universityData.map((university, index) => (
            <UniversityCard key={index} {...university} index={index} />
          ))}
        </div>

        {/* Dynamic Universities from Appwrite */}
        {!loading && universities.length > 0 && (
          <div className="mt-16">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              More Universities
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {universities.slice(0, 8).map((university, index) => (
                <motion.div
                  key={university.$id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlowCard className="h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 p-6 text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{university.name}</h4>
                    <p className="text-white/60 text-sm mb-4">{university.location}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-medium transition-all duration-300"
                    >
                      Learn More
                    </motion.button>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 mx-auto"
          >
            <Globe className="w-5 h-5" />
            Explore All Universities
          </motion.button>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"
            />
          </div>
        )}
      </AnimatedSection>

      {/* Consultation Form */}
      <AnimatedSection className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50" />
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            backgroundSize: '200% 200%'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-white/90 font-medium">Free Consultation</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EMPOWERING YOUR
                </span>
                <br />
                <span className="text-white">FUTURE</span>
              </h2>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Are you looking for career guidance? Do you have trouble getting placement? 
                Let our expert counselors help you navigate your academic path with personalized advice.
              </p>

              <div className="space-y-4">
                {[
                  'AI-powered career assessment',
                  'University admission guidance',
                  'Application support & review',
                  'Expert mentorship programs'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-white/90 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlowCard className="bg-white/10 backdrop-blur-md border border-white/20 p-8">
                <motion.h3 
                  className="text-2xl font-bold text-white mb-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Book A Free Consultation!
                </motion.h3>
                
                <AnimatePresence>
                  {showSuccessMessage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className="text-white font-medium">
                          Thank you! We'll contact you soon.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <textarea
                      name="message"
                      placeholder="Tell us about your academic goals and interests..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Book Free Consultation
                      </>
                    )}
                  </motion.button>
                </form>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Packages Section */}
      <PricingSection />

      {/* Benefits Section */}
      <AnimatedSection className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-pink-900/50" />
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)',
            backgroundSize: '200% 200%'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white/90 font-medium">Our Benefits</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  WE'RE HERE TO
                </span>
                <br />
                <span className="text-white">SIMPLIFY YOUR</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CAREER JOURNEY
                </span>
              </h2>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                From AI-Powered Insights To Real Human Support – We Guide You Every Step Of The Way.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <Brain className="w-6 h-6" />, title: 'AI-Powered', desc: 'Smart assessments' },
                  { icon: <Users className="w-6 h-6" />, title: 'Expert Support', desc: 'Human guidance' },
                  { icon: <Target className="w-6 h-6" />, title: 'Personalized', desc: 'Tailored approach' },
                  { icon: <Award className="w-6 h-6" />, title: 'Proven Results', desc: '98% success rate' }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{benefit.title}</h4>
                      <p className="text-white/60 text-sm">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link to="/#pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-white to-gray-100 text-blue-600 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-white/25 flex items-center gap-2"
                >
                  <Star className="w-5 h-5" />
                  View Our Plans
                </motion.button>
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <GlowCard className="overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
                <motion.img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                  alt="Students celebrating"
                  className="w-full h-96 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </GlowCard>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-bold">20K+</div>
                    <div className="text-xs text-white/70">Students</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center gap-2 text-white">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="font-bold">99.99%</div>
                    <div className="text-xs text-white/70">Success</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AdmissionAssistant;