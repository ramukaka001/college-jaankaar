import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '../constants';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Career Counselling', path: '/career-counselling' },
    { name: 'Admission Assistant', path: '/admission-assistant' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-neutral-900/80 backdrop-blur-xl border-b border-white/10 py-2' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {SITE.name}
              </span>
              <motion.div 
                className="absolute -top-1 -right-8 bg-gradient-to-r from-accent-500 to-primary-500 px-2 py-1 rounded-md transform rotate-12 text-xs font-bold text-white"
                animate={{ rotate: [12, 8, 12] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {SITE.sub}
              </motion.div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-primary-400'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400"
                    layoutId="activeTab"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* <Link
              to="/signin"
              className="text-neutral-300 hover:text-white font-medium transition-colors duration-300"
            >
              Sign In
            </Link> */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="bg-neutral-800/90 backdrop-blur-xl rounded-2xl mt-4 p-6 border border-white/10">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={toggleMenu}
                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                          location.pathname === item.path
                            ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                            : 'text-neutral-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-4 border-t border-white/10 space-y-3"
                  >
                    {/* <Link
                      to="/signin"
                      onClick={toggleMenu}
                      className="block text-center py-3 text-neutral-300 hover:text-white font-medium transition-colors duration-300"
                    >
                      Sign In
                    </Link> */}
                    <Link
                      to="/contact"
                      onClick={toggleMenu}
                      className="block text-center bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;