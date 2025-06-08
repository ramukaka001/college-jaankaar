import React, { useState } from 'react';
import { Users, Target, Award, Calendar, ArrowRight, CheckCircle, Star, BookOpen, TrendingUp, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useConsultationServices } from '../hooks/useAppwrite';
import { AnimatedSection, GlowCard } from '../components/ui/AnimationComponents';

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

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  stats: { students: number; satisfaction: number };
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, image, color, stats, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group"
  >
    <GlowCard className="h-full overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500">
      <div className={`relative h-56 overflow-hidden ${color}`}>
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Stats overlay */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/30">
          <div className="flex items-center gap-2 text-white text-sm">
            <Users className="w-4 h-4" />
            <span>{stats.students}+ Students</span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{stats.satisfaction}% Satisfaction</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-white/70 mb-6 leading-relaxed">{description}</p>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            Book Now
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

const CareerCounselling: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { services: consultationServices, loading } = useConsultationServices();

  const serviceSteps = [
    {
      title: 'Initial Assessment',
      description: 'Complete a comprehensive assessment to help us understand your interests, strengths, and career aspirations.',
      icon: <Target size={32} />,
      color: 'bg-gradient-to-br from-red-500 to-pink-500',
      features: [
        'Personality & Interest Assessment',
        'Skills & Aptitude Evaluation',
        'Career Goals Analysis',
        'Detailed Report Generation'
      ]
    },
    {
      title: 'Personalized Consultation',
      description: 'Meet with our expert counselors who will analyze your assessment and provide tailored recommendations.',
      icon: <Users size={32} />,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      features: [
        'One-on-One Expert Session',
        'Customized Career Roadmap',
        'Industry Insights & Trends',
        'Q&A with Career Experts'
      ]
    },
    {
      title: 'Admission Support',
      description: 'Receive comprehensive assistance with applications and interview prep for your chosen institutions.',
      icon: <Award size={32} />,
      color: 'bg-gradient-to-br from-green-500 to-teal-500',
      features: [
        'Application Review & Optimization',
        'Interview Preparation',
        'Document Guidance',
        'Admission Strategy Planning'
      ]
    },
  ];

  const categories = [
    {
      title: 'Engineering',
      description: 'Comprehensive career guidance for aspiring engineers with industry-specific insights and opportunities.',
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      stats: { students: 2500, satisfaction: 95 }
    },
    {
      title: 'Arts & Humanities',
      description: 'Explore creative career paths and discover opportunities in arts, literature, and cultural studies.',
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      stats: { students: 1800, satisfaction: 92 }
    },
    {
      title: 'Business & Management',
      description: 'Navigate the corporate world with strategic career planning and business acumen development.',
      image: 'https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg',
      color: 'bg-gradient-to-br from-red-500 to-pink-500',
      stats: { students: 3200, satisfaction: 97 }
    },
    {
      title: 'Computer Science',
      description: 'Stay ahead in the tech industry with cutting-edge career guidance and skill development strategies.',
      image: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg',
      color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      stats: { students: 4100, satisfaction: 98 }
    },
    {
      title: 'Social Sciences',
      description: 'Make a difference in society with career paths in psychology, sociology, and public service.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      color: 'bg-gradient-to-br from-pink-500 to-rose-500',
      stats: { students: 1500, satisfaction: 93 }
    },
    {
      title: 'Medical & Healthcare',
      description: 'Pursue a rewarding career in healthcare with specialized guidance for medical professionals.',
      image: 'https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      stats: { students: 2800, satisfaction: 96 }
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

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-white/90 font-medium">Expert Career Guidance</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ELEVATE YOUR
              </span>
              <br />
              <span className="text-white">LEARNING EXPERIENCE</span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Unlock your potential with personalized career counseling, expert guidance, and comprehensive support to achieve your academic and professional goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

            {/* <div className="text-center">
              <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5000+</div>
                  <div className="text-white/60 text-sm">Students Guided</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-white/60 text-sm">Success Rate</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-white/60 text-sm">Expert Counselors</div>
                </div>
              </div>
            </div> */}
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

      {/* Services Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OUR COUNSELING
            </span>
            <br />
            <span className="text-white">PROCESS</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Follow our structured approach to unlock your career potential
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceSteps.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>

        {/* Dynamic Services from Appwrite */}
        {/* {!loading && consultationServices.length > 0 && (
          <div className="mt-20">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              Available Consultation Services
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultationServices.map((service, index) => (
                <motion.div
                  key={service.$id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlowCard className="h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 p-6">
                    <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                    <p className="text-white/70 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-400">{service.price}</span>
                      <span className="text-white/60">{service.duration}</span>
                    </div>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Book Now
                    </motion.button>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        )} */}

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

      {/* Categories Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EXPLORE OUR
            </span>
            <br />
            <span className="text-white">COUNSELING CATEGORIES</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover specialized career guidance tailored to your field of interest
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} index={index} />
          ))}
        </div>

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
            <BookOpen className="w-5 h-5" />
            Explore All Categories
          </motion.button>
        </motion.div>
      </AnimatedSection>

      {/* Consultation Form Section */}
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
                Let our expert counselors help you navigate your career path with personalized advice.
              </p>

              <div className="space-y-4">
                {[
                  'Personalized career roadmap',
                  'Industry expert guidance',
                  'Interview preparation support',
                  'Placement assistance'
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
                      placeholder="Tell us about your career goals and challenges..."
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
    </div>
  );
};

export default CareerCounselling;
