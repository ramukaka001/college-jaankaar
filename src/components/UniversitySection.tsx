import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, ExternalLink, Star, Users, Award, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection, GradientButton, GlowCard } from './ui/AnimationComponents';
import { useUniversities } from '../hooks/useAppwrite';

interface UniversityCardProps {
  name: string;
  location: string;
  image: string;
  link?: string;
  rating?: number;
  students?: string;
  programs?: string;
  established?: string;
  index: number;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ 
  name, location, image, link, rating, students, programs, established, index 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group"
    >
      <GlowCard className="h-full overflow-hidden hover:shadow-2xl hover:shadow-primary-purple/20">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {!imageError ? (
            <img
              src={image}
              alt={`Campus of ${name}`}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-500/20 to-primary-500/20 flex items-center justify-center">
              <Building2 size={48} className="text-gray-400" />
            </div>
          )}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          {rating && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <Star size={14} className="text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-800">{rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-500 transition-colors">
                {name}
              </h3>
              <div className="flex items-center text-gray-400 mb-3">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">{location}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center shadow-lg">
              <Building2 size={20} className="text-white" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {students && (
              <div className="text-center">              <div className="flex items-center justify-center mb-1">
                <Users size={16} className="text-primary-500 mr-1" />
              </div>
                <div className="text-lg font-bold text-white">{students}</div>
                <div className="text-xs text-gray-400">Students</div>
              </div>
            )}
            {programs && (
              <div className="text-center">              <div className="flex items-center justify-center mb-1">
                <Award size={16} className="text-accent-500 mr-1" />
              </div>
                <div className="text-lg font-bold text-white">{programs}</div>
                <div className="text-xs text-gray-400">Programs</div>
              </div>
            )}
          </div>

          {/* Established */}
          {established && (
            <div className="text-center mb-6">
              <div className="text-sm text-gray-400">Established</div>
              <div className="text-lg font-semibold text-accent-500">{established}</div>
            </div>
          )}

          {/* Action Button */}
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-full bg-gradient-to-r from-accent-500 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-accent-500/25"
            >
              <span>Explore University</span>
              <ExternalLink size={16} className="ml-2" />
            </motion.a>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
};

const UniversitySection: React.FC = () => {
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { universities, loading, error } = useUniversities();
  const [currentPage, setCurrentPage] = useState(0);
  const universitiesPerPage = 3;
  const totalPages = Math.ceil(universities.length / universitiesPerPage);

  const getCurrentPageUniversities = () => {
    const startIndex = currentPage * universitiesPerPage;
    return universities.slice(startIndex, startIndex + universitiesPerPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full mb-6">
              <Building2 size={32} className="text-white" />
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slideUp" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Top Universities &{' '}
              <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
                Institutions
              </span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="slideUp" delay={0.3}>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover prestigious institutions where your academic journey can flourish. 
              Connect with top universities and make informed decisions about your future.
            </p>
          </AnimatedSection>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-800/60 rounded-xl h-96" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">Failed to load universities</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-primary-purple hover:text-primary-blue transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {getCurrentPageUniversities().map((university, index) => (
                <UniversityCard
                  key={university.$id}
                  name={university.name}
                  location={university.location || "Location not available"}
                  image={university.logo}
                  link={university.website}
                  rating={parseFloat(university.ranking) || 4.5}
                  students={university.students || "N/A"}
                  programs={university.programs || "N/A"}
                  established={university.established || "N/A"}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  onClick={prevPage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-accent-500/20 transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </motion.button>

                <div className="flex space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentPage
                          ? 'bg-accent-500'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextPage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-accent-500/20 transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <AnimatedSection animation="slideUp" delay={0.6}>
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-accent-500/10 to-primary-500/10 backdrop-blur-sm border border-white/10 rounded-2xl items-center flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Help Choosing the Right University?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Our expert counselors can help you find the perfect university that matches your 
              academic goals, career aspirations, and personal preferences.
            </p>
            <GradientButton>
              Get University Counseling
            </GradientButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default UniversitySection;