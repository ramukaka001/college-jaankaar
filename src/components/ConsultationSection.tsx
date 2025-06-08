import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  User,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AnimatedSection, GlowCard } from './ui/AnimationComponents';
import { useConsultationServices, submitConsultationRequest } from '../hooks/useAppwrite';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
  preferredTime: string;
  consultationType: string;
}

const ConsultationSection: React.FC = () => {
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });
  // const { services, loading } = useConsultationServices();
  // const [activeService, setActiveService] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    message: '',
    preferredTime: '',
    consultationType: 'career-discovery'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await submitConsultationRequest(formData);
      if (success) {
        toast.success('Thank you! We will contact you soon to schedule your consultation.');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          message: '',
          preferredTime: '',
          consultationType: 'career-discovery'
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast.error('Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Users, title: '20,000+ Students Guided', description: 'Successfully helped students achieve their career goals' },
    { icon: Award, title: 'Expert Counselors', description: 'Certified professionals with years of experience' },
    { icon: TrendingUp, title: '99.99% Success Rate', description: 'High success rate in university admissions' },
    { icon: Star, title: 'Personalized Approach', description: 'Tailored guidance based on individual needs' }
  ];

  return (
    <section
      ref={ref}
      id="consultation"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-accent-500/5 to-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full mb-6">
              <MessageCircle size={32} className="text-white" />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Unlock Your College Dreams with{' '}
              <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
                Expert Guidance
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.3}>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Feeling uncertain about your future? Our expert counselors are here to guide you
              from goal setting to choosing the best institutions and opportunities.
            </p>
          </AnimatedSection>
        </div>


        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Services Section */}
          {/* <AnimatedSection animation="slideLeft" delay={0.5}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Our Consultation Services</h3>
              
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-800/60 rounded-xl h-32" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.$id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                        activeService === index
                          ? 'bg-gradient-to-r from-accent-500/20 to-primary-500/20 border-accent-500/50'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                      onClick={() => setActiveService(index)}
                    >
                      {service.isPopular && (
                        <div className="absolute -top-3 left-6">
                          <span className="bg-gradient-to-r from-accent-500 to-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-white">{service.title}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-accent-500">{service.price}</div>
                          <div className="text-sm text-gray-400">{service.duration}</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 mb-4">{service.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                        {service.features.length > 3 && (
                          <span className="text-xs text-accent-500">+{service.features.length - 3} more</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection> */}

          {/* Benefits Section */}
          <div className="grid grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} animation="slideUp" delay={0.4 + index * 0.1}>
                <GlowCard className="text-center h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Right: Booking Form */}
          <AnimatedSection animation="slideRight" delay={0.6}>
            <GlowCard className="sticky top-8">
              <div className="flex items-center justify-center mb-6">
                <Calendar size={24} className="text-accent-500 mr-2" />
                <h3 className="text-2xl font-semibold text-white">Book Your Free Consultation</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Consultation Type
                  </label>
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                  >
                    <option value="career-discovery" className="bg-gray-800">Career Discovery</option>
                    <option value="university-admission" className="bg-gray-800">University Admission</option>
                    <option value="complete-counseling" className="bg-gray-800">Complete Counseling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="datetime-local"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tell us about your goals
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all resize-none"
                    placeholder="Share your career aspirations, preferred fields, or any specific questions..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-accent-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Book Free Consultation</span>
                      <ArrowRight size={20} className="ml-2" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-400">
                  <CheckCircle size={16} className="inline mr-1" />
                  100% Free • No Hidden Charges • Expert Guidance
                </p>
              </form>
            </GlowCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;