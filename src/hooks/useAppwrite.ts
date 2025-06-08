import { useState, useEffect } from 'react';
import { getDocuments, COLLECTIONS, commonQueries } from '../lib/appwrite';

interface Testimonial {
  $id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

interface BlogPost {
  $id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  $createdAt: string;
}

interface University {
  $id: string;
  name: string;
  logo: string;
  ranking: string;
  description: string;
}

interface CareerPath {
  $id: string;
  title: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  skills: string[];
  icon: string;
}

interface FAQ {
  $id: string;
  question: string;
  answer: string;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getDocuments(COLLECTIONS.TESTIMONIALS, [
          commonQueries.published,
          commonQueries.orderByDate
        ]);
        setTestimonials(response.documents as unknown as Testimonial[]);
      } catch (err) {
        setError(err as Error);
        // Fallback data if Appwrite is not configured
        setTestimonials([
          {
            $id: '1',
            name: 'Sarah Johnson',
            role: 'University Student',
            content: 'The career counseling service helped me choose the perfect major and university. The guidance was invaluable!',
            rating: 5,
            image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=SarahJohnson'
          },
          {
            $id: '2',
            name: 'Michael Chen',
            role: 'High School Graduate',
            content: 'Thanks to their admission assistance, I got into my dream university. Highly recommended!',
            rating: 5,
            image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MichaelChen'
          },
          {
            $id: '3',
            name: 'Emily Rodriguez',
            role: 'Career Changer',
            content: 'The personalized counseling sessions helped me pivot my career successfully. Amazing support!',
            rating: 5,
            image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=EmilyRodriguez'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
};

export const useBlogPosts = (limit = 6) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getDocuments(COLLECTIONS.BLOG_POSTS, [
          commonQueries.published,
          commonQueries.orderByDate,
          commonQueries.limit(limit)
        ]);
        setPosts(response.documents as unknown as BlogPost[]);
      } catch (err) {
        setError(err as Error);
        // Fallback data
        setPosts([
          {
            $id: '1',
            title: 'How to Choose the Right Career Path',
            excerpt: 'Discover proven strategies to identify your passion and align it with market opportunities.',
            image: '/api/placeholder/400/250',
            category: 'Career Planning',
            readTime: '5 min read',
            $createdAt: new Date().toISOString()
          },
          {
            $id: '2',
            title: 'University Application Tips',
            excerpt: 'Essential tips to make your university application stand out from the crowd.',
            image: '/api/placeholder/400/250',
            category: 'Admissions',
            readTime: '7 min read',
            $createdAt: new Date().toISOString()
          },
          {
            $id: '3',
            title: 'Scholarship Opportunities 2024',
            excerpt: 'Complete guide to finding and applying for scholarships that match your profile.',
            image: '/api/placeholder/400/250',
            category: 'Financial Aid',
            readTime: '8 min read',
            $createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  return { posts, loading, error };
};

export const useUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await getDocuments(COLLECTIONS.UNIVERSITIES, [
          commonQueries.published,
          commonQueries.orderByDate
        ]);
        setUniversities(response.documents as unknown as University[]);
      } catch (err) {
        setError(err as Error);
        // Fallback data
        setUniversities([
          {
            $id: '1',
            name: 'Harvard University',
            logo: '/api/placeholder/120/60',
            ranking: '#1 in USA',
            description: 'Prestigious Ivy League university'
          },
          {
            $id: '2',
            name: 'Stanford University',
            logo: '/api/placeholder/120/60',
            ranking: '#2 in USA',
            description: 'Leading research university'
          },
          {
            $id: '3',
            name: 'MIT',
            logo: '/api/placeholder/120/60',
            ranking: '#3 in USA',
            description: 'Top technology institute'
          },
          {
            $id: '4',
            name: 'Oxford University',
            logo: '/api/placeholder/120/60',
            ranking: '#1 in UK',
            description: 'Historic academic excellence'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return { universities, loading, error };
};

export const useCareerPaths = () => {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        const response = await getDocuments(COLLECTIONS.CAREER_PATHS, [
          commonQueries.published,
          commonQueries.orderByDate
        ]);
        setCareerPaths(response.documents as unknown as CareerPath[]);
      } catch (err) {
        setError(err as Error);
        // Fallback data
        setCareerPaths([
          {
            $id: '1',
            title: 'Software Engineering',
            description: 'Build applications and systems that power the digital world',
            averageSalary: '$120,000',
            growthRate: '22%',
            skills: ['Programming', 'Problem Solving', 'System Design'],
            icon: 'Code'
          },
          {
            $id: '2',
            title: 'Data Science',
            description: 'Extract insights from data to drive business decisions',
            averageSalary: '$130,000',
            growthRate: '31%',
            skills: ['Python', 'Statistics', 'Machine Learning'],
            icon: 'BarChart'
          },
          {
            $id: '3',
            title: 'Digital Marketing',
            description: 'Create and execute marketing strategies in the digital age',
            averageSalary: '$85,000',
            growthRate: '18%',
            skills: ['SEO', 'Social Media', 'Analytics'],
            icon: 'TrendingUp'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerPaths();
  }, []);

  return { careerPaths, loading, error };
};

export const useFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await getDocuments(COLLECTIONS.FAQS, [
          commonQueries.published,
          commonQueries.orderByDate
        ]);
        setFaqs(response.documents as unknown as FAQ[]);
      } catch (err) {
        setError(err as Error);
        // Fallback data
        setFaqs([
          {
            $id: '1',
            question: 'What services do you offer?',
            answer: 'We offer comprehensive career counseling, university admission assistance, scholarship guidance, and personalized career planning sessions.'
          },
          {
            $id: '2',
            question: 'How long does the counseling process take?',
            answer: 'Our counseling process typically takes 4-6 sessions over 2-3 weeks, depending on your specific needs and goals.'
          },
          {
            $id: '3',
            question: 'Do you guarantee university admission?',
            answer: 'While we cannot guarantee admission, our expert guidance significantly improves your chances of getting into your desired universities.'
          },
          {
            $id: '4',
            question: 'What is the cost of your services?',
            answer: 'Our pricing varies based on the package you choose. We offer flexible payment options and scholarships for deserving students.'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return { faqs, loading, error };
};
