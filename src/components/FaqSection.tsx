import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus, HelpCircle, MessageCircle, Search } from 'lucide-react';
import { AnimatedSection, GlowCard } from './ui/AnimationComponents';
import { useFAQs } from '../hooks/useAppwrite';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
    >
      <motion.button
        onClick={onClick}
        className="flex items-center justify-between w-full p-6 text-left hover:bg-white/5 transition-all duration-300"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${isOpen
              ? 'bg-gradient-to-r from-accent-500 to-primary-500'
              : 'bg-white/10 border border-white/20'
            }`}>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <Minus size={20} className="text-white" />
              ) : (
                <Plus size={20} className="text-white" />
              )}
            </motion.div>
          </div>
          <span className="text-white font-semibold text-lg">{question}</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-20">
              <p className="text-gray-300 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqSection: React.FC = () => {
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { faqs, loading, error } = useFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full mb-6">
              <HelpCircle size={32} className="text-white" />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.3}>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Find answers to common questions about our counseling services,
              university admissions, and career guidance programs.
            </p>
          </AnimatedSection>

          {/* Search Bar */}
          <AnimatedSection animation="slideUp" delay={0.4}>
            <div className="relative max-w-md mx-auto">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all backdrop-blur-sm"
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-800/60 rounded-xl h-20" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <MessageCircle size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-red-400 mb-4">Failed to load FAQs</p>
            <button
              onClick={() => window.location.reload()}
              className="text-accent-500 hover:text-primary-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <Search size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No FAQs found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <FaqItem
                key={faq.$id}
                question={faq.question}
                answer={faq.answer}
                isOpen={index === openIndex}
                onClick={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Contact CTA */}
        {/* <AnimatedSection animation="slideUp" delay={0.6}>
          <div className="text-center mt-16">
            <GlowCard className="inline-block">
              <div className="p-8">
                <MessageCircle size={48} className="text-accent-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Can't find the answer you're looking for? Our support team is here to help you.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-accent-500/25 transition-all duration-300"
                >
                  Contact Support
                </motion.button>
              </div>
            </GlowCard>
          </div>
        </AnimatedSection> */}
      </div>
    </section>
  );
};

export default FaqSection;
