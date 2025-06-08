import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Globe,
  Headphones,
  Calendar,
  Star,
  Users,
  Zap,
  Heart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AnimatedSection, GlowCard, FloatingElement } from '../components/ui/AnimationComponents';
import { SITE } from '../constants';

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredTime: 'morning'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const contactInfo: ContactInfo[] = [
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: 'Visit Our Office',
      description: 'Come meet our team in person',
      details: [
        'Flat NO-2, Ground Floor',
        'Lakeside Residency Rukmani Colony',
        'Arecavenny Mandal Road, Udoor'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: 'Call Us',
      description: 'Speak directly with our counselors',
      details: [
        '+91 98765 43210',
        '+91 87654 32109',
        'Mon-Sat: 9:00 AM - 8:00 PM'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: 'Email Us',
      description: 'Get detailed responses to your queries',
      details: [
        `support@${(SITE.name + SITE.sub).toLowerCase()}.in`,
        `info@${(SITE.name + SITE.sub).toLowerCase()}.in`,
        'Response within 24 hours'
      ],
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: 'Business Hours',
      description: 'We\'re here when you need us',
      details: [
        'Monday - Friday: 9:00 AM - 8:00 PM',
        'Saturday: 10:00 AM - 6:00 PM',
        'Sunday: Appointment Only'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: 'Do I need any prior knowledge of University to enroll in this course?',
      answer: 'No prior knowledge is required! Our counselors will guide you through everything from basics to advanced topics, ensuring you understand each step of the university selection and application process.'
    },
    {
      question: 'How long does it take to complete the Admission process?',
      answer: 'The admission process timeline varies depending on the university and program. Typically, it takes 3-6 months from application to admission. Our team ensures all deadlines are met efficiently.'
    },
    {
      question: 'What format is the Counselling content delivered in?',
      answer: 'We offer multiple formats including one-on-one sessions, group workshops, online video calls, interactive webinars, and comprehensive digital resources accessible 24/7.'
    },
    {
      question: 'How do I access the counselling services?',
      answer: 'You can access our services through our online platform, mobile app, in-person meetings, or virtual consultations. We provide flexible options to suit your schedule and preferences.'
    },
    {
      question: 'How is this counselling relevant to different industries?',
      answer: 'Our counselors have expertise across various industries including technology, healthcare, business, engineering, arts, and more. We tailor our guidance based on your specific career interests and industry requirements.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      preferredTime: 'morning'
    });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">

      {/* Enhanced Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
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
            className="inline-flex items-center justify-center mb-8"
          >
            <div className="bg-gradient-to-r from-accent-500/20 to-primary-500/20 backdrop-blur-xl border border-accent-500/30 rounded-full px-6 py-3">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-accent-400" />
                <span className="text-accent-300 font-semibold">Get In Touch</span>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Let's Start Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
              Journey Together
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Feel free to reach out to us with any questions, inquiries, or to schedule a consultation.
            We're here to help you navigate your academic journey and achieve your dreams.
          </motion.p>

          {/* Quick Stats */}
          {/* <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-400 text-sm">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-violet-500 bg-clip-text text-transparent mb-2">
                &lt;1hr
              </div>
              <div className="text-gray-400 text-sm">Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <div className="text-gray-400 text-sm">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                95%
              </div>
              <div className="text-gray-400 text-sm">Satisfaction</div>
            </div>
          </motion.div> */}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              className="group bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
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
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Multiple Ways to <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">Connect</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Choose the most convenient way to reach out to our expert counselors
              </p>
            </div>
          </AnimatedSection>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <GlowCard className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 hover:bg-white/10 hover:border-white/20">

                  {/* Icon */}
                  <motion.div
                    className={`bg-gradient-to-r ${info.color} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    {info.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white text-center mb-3 group-hover:text-accent-300 transition-colors">
                    {info.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-center text-sm mb-4 group-hover:text-gray-300 transition-colors">
                    {info.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 text-center">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-300 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${info.color}`} />
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative py-24 bg-gradient-to-r from-gray-900/50 to-black/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Contact Information */}
            <AnimatedSection animation="slideRight" delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Transform Your <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">Future?</span>
                  </h2>
                  <p className="text-xl text-gray-400 leading-relaxed mb-8">
                    Our team of experienced counselors is ready to provide personalized guidance and support.
                    Connect with us today to discuss your goals and how we can help you achieve them.
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2 mt-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Free Initial Consultation</h4>
                      <p className="text-gray-400">Get started with a complimentary 30-minute session to understand your needs.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 mt-1">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Expert Counselors</h4>
                      <p className="text-gray-400">Work with experienced professionals who understand your academic journey.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-full p-2 mt-1">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Quick Response</h4>
                      <p className="text-gray-400">Receive prompt responses and scheduled meetings within 24 hours.</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <GlowCard className="bg-gradient-to-r from-accent-500/10 to-primary-500/10 border border-accent-500/30 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-accent-300 font-semibold">Trusted by 10,000+ Students</span>
                  </div>
                  <p className="text-gray-300 italic">
                    "The counseling team helped me find the perfect university match. Their guidance was invaluable in shaping my career path."
                  </p>
                  <p className="text-accent-400 font-semibold mt-3">- Sarah Johnson, Stanford University</p>
                </GlowCard>
              </div>
            </AnimatedSection>

            {/* Enhanced Contact Form */}
            <AnimatedSection animation="slideLeft" delay={0.4}>
              <div id="contact-form">
                <GlowCard className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl p-4 mr-4">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Book A Consultation!</h3>
                  </div>

                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <p className="text-green-300 font-semibold">Message sent successfully! We'll get back to you soon.</p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Preferred Time</label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="morning" className="bg-gray-900">Morning (9 AM - 12 PM)</option>
                          <option value="afternoon" className="bg-gray-900">Afternoon (12 PM - 4 PM)</option>
                          <option value="evening" className="bg-gray-900">Evening (4 PM - 8 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                        placeholder="What would you like to discuss?"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your goals and how we can help you..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent-500/25 disabled:opacity-50"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      </div>
                    </motion.button>
                  </form>
                </GlowCard>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;