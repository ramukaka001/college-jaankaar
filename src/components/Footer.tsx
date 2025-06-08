import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Heart,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE } from '../constants';
import { AnimatedSection } from './ui/AnimationComponents';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Career Counselling', path: '/career-counselling' },
    { name: 'Admission Assistance', path: '/admission-assistant' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    { name: 'University Selection', icon: GraduationCap },
    { name: 'Career Guidance', icon: Users },
    { name: 'Scholarship Info', icon: Award },
    { name: 'Course Planning', icon: BookOpen }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-400' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="flex items-center mb-6">
                <div className="relative">
                  <span className="text-3xl font-bold bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
                    {SITE.name}
                  </span>
                  <div className="absolute -top-1 -right-2 bg-gradient-to-r from-accent-500 to-primary-500 px-2 py-1 rounded-md transform rotate-12 shadow-lg">
                    <span className="text-white text-sm font-bold">{SITE.sub}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.2}>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering students to make informed decisions about their educational journey through expert guidance and comprehensive resources.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.3}>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-400 hover:text-accent-500 transition-colors">
                  <Mail size={16} className="mr-3" />
                  <span className="text-sm">support@collegejaankaar.com</span>
                </div>
                <div className="flex items-center text-gray-400 hover:text-accent-500 transition-colors">
                  <Phone size={16} className="mr-3" />
                  <span className="text-sm">+91 8209441638</span>
                </div>
                <div className="flex items-center text-gray-400 hover:text-accent-500 transition-colors">
                  <MapPin size={16} className="mr-3 min-w-4" />
                  <span className="text-sm">Metro Station, 101, near Versova, Versova, Andheri West, Mumbai, Maharashtra 400061</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.4}>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm`}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Quick Links */}
          <div>
            <AnimatedSection animation="slideUp" delay={0.2}>
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="group flex items-center text-gray-400 hover:text-accent-500 transition-all duration-300"
                    >
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Services */}
          <div>
            <AnimatedSection animation="slideUp" delay={0.3}>
              <h4 className="text-xl font-bold text-white mb-6">Our Services</h4>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center text-gray-400 hover:text-accent-500 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-accent-500/10 group-hover:border-accent-500/30 transition-all duration-300">
                      <service.icon size={16} />
                    </div>
                    <span className="text-sm">{service.name}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.7}>
              <div className="mt-8 p-4 bg-gradient-to-r from-accent-500/10 to-primary-500/10 border border-white/10 rounded-xl backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <Heart size={16} className="text-accent-500 mr-2" />
                  <span className="text-sm font-semibold text-white">Trusted by 20,000+ Students</span>
                </div>
                <p className="text-xs text-gray-400">Join our community of successful students</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Newsletter */}
          <div>
            <AnimatedSection animation="slideUp" delay={0.4}>
              <h4 className="text-xl font-bold text-white mb-6">Stay Updated</h4>
              <p className="text-gray-400 mb-6 text-sm">
                Get the latest updates on university admissions, career opportunities, and educational insights.
              </p>
              
              <form onSubmit={handleNewsletter} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all backdrop-blur-sm"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubscribed}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isSubscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white shadow-lg hover:shadow-accent-500/25'
                  }`}
                >
                  {isSubscribed ? (
                    'Subscribed! ✓'
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Subscribe
                    </>
                  )}
                </motion.button>
              </form>
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <AnimatedSection animation="slideUp" delay={0.5}>
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} {SITE.name} {SITE.sub}. All rights reserved. Made with{' '}
                <Heart size={14} className="inline text-red-500 mx-1" />
                for students.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.6}>
              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <Link to="#" className="text-gray-400 hover:text-accent-500 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="#" className="text-gray-400 hover:text-accent-500 transition-colors">
                  Terms of Service
                </Link>
                <Link to="#" className="text-gray-400 hover:text-accent-500 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;