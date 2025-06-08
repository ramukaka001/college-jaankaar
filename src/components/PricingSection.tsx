import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { API_URL, RAZORPAY_KEY, SITE } from '../constants';
import { AnimatedSection, GlowCard, GradientButton } from './ui/AnimationComponents';

interface PricingPlanProps {
  title: string;
  price: string;
  features: string[];
  description?: string;
  isPopular?: boolean;
  icon: React.ComponentType<any>;
  onSelectPlan: (price: string) => void;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  features,
  description,
  isPopular = false,
  icon: Icon,
  onSelectPlan
}) => {
  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10 }}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </div>
        </div>
      )}

      <GlowCard className={`relative h-full p-8 ${isPopular
        ? 'bg-gradient-to-br from-primary-900/50 to-secondary-900/50 border-primary-500/50'
        : 'bg-neutral-800/50 border-neutral-700/50'
        } backdrop-blur-lg border rounded-2xl transition-all duration-300`}>

        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isPopular ? 'bg-primary-500/20' : 'bg-neutral-700/50'
            }`}>
            <Icon className={`w-8 h-8 ${isPopular ? 'text-primary-400' : 'text-neutral-400'}`} />
          </div>

          <h3 className={`text-2xl font-heading font-bold mb-2 ${isPopular ? 'text-white' : 'text-white'
            }`}>
            {title}
          </h3>

          {description && (
            <p className="text-neutral-400 text-sm mb-4">{description}</p>
          )}

          <div className="mb-6">
            <span className="text-4xl font-bold text-white">₹{price}</span>
            <span className="text-neutral-400 ml-2">one-time</span>
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${isPopular ? 'bg-primary-500/20' : 'bg-green-500/20'
                }`}>
                <Check className={`w-3 h-3 ${isPopular ? 'text-primary-400' : 'text-green-400'}`} />
              </div>
              <span className="text-neutral-300 text-sm leading-relaxed">
                <strong className="text-white">{feature.split(' - ')[0]}</strong>
                {feature.includes(' - ') && (
                  <span className="text-neutral-400"> - {feature.split(' - ')[1]}</span>
                )}
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto">
          {isPopular ? (
            <GradientButton
              size="lg"
              className="w-full group"
              onClick={() => onSelectPlan(price)}
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </GradientButton>
          ) : (
            <motion.button
              className="w-full bg-neutral-700/50 hover:bg-neutral-600/50 text-white font-semibold py-4 px-6 rounded-lg border border-neutral-600/50 hover:border-neutral-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPlan(price)}
            >
              Choose Plan
            </motion.button>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
};

const PRICING_OPTIONS = {
  "999": "starter",
  "4999": "silver",
  "9999": "gold",
};

const PricingSection: React.FC = () => {
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState(false);

  // Razorpay SDK loader
  useEffect(() => {
    const loadScript = (src: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadScript("https://checkout.razorpay.com/v1/checkout.js").then((loaded) => {
      setSdkReady(loaded);
      if (!loaded) console.error("Failed to load Razorpay SDK");
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPlan = (price: string) => {
    const cleanedPrice = price.replace(/,/g, "");
    setSelectedPrice(cleanedPrice);
    setFormVisible(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedPrice || !sdkReady) {
      alert("Please wait, Razorpay is loading...");
      return;
    }

    const packageType = PRICING_OPTIONS[selectedPrice as keyof typeof PRICING_OPTIONS];
    if (!packageType) {
      alert("Invalid package selection.");
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/payment/paymentForm`, {

        name: formData.name,
        email: formData.email,
        phoneNo: formData.phone,
        whatsappNo: formData.whatsapp,
        packageType,
      });

      const amountInPaise = data.order.amount * 100;

      const rzp = new (window as any).Razorpay({
        key: RAZORPAY_KEY,
        amount: amountInPaise,
        currency: "INR",
        name: `${SITE.name} ${SITE.sub}`,
        description: `Payment for ${packageType} package`,
        order_id: data.order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#16a34a",
        },
        handler: async function (response: any) {
          const verifyRes = await axios.post(`${API_URL}/payment/verifyPayment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            alert("Payment successful!");
            setFormVisible(false);
          } else {
            alert("Payment verification failed.");
          }
        },
      });

      rzp.open();
      setLoading(false); // Stop loading when Razorpay opens
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment could not be initiated. Try again.");
      setLoading(false); // Stop loading on error
    }

  };

  return (
    <section id="pricing" className="relative bg-gradient-to-br from-neutral-900 via-primary-900/10 to-secondary-900/10 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-300 text-sm font-medium backdrop-blur-sm mb-6">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Choose Your Success Path
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Investment Plans for
              <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Your Future Success
              </span>
            </h2>

            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Choose the perfect package that aligns with your goals and budget.
              Every plan is designed to maximize your chances of success.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AnimatedSection animation="slideUp" delay={0.4}>
            <PricingPlan
              title="Starter Package"
              price="999"
              description="Guidance chahiye, toh basic se shuru karo!"
              icon={Zap}
              features={[
                "Full admission guidance - Phone pe support milega",
                "College list + course details PDF - Complete information at your fingertips",
                "Help milegi jab tak seat allot nahi hoti - Support till final allotment",
                "Best for CUET / IISER / State Govt. colleges aspirants",
                "Perfect for first-time admission seekers",
              ]}
              onSelectPlan={handleSelectPlan}
            />
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.6}>
            <PricingPlan
              title="Silver Package"
              price="4,999"
              description="Mummy-papa bhi khush, aur admission bhi confirm!"
              icon={Star}
              isPopular
              onSelectPlan={handleSelectPlan}
              features={[
                "Detailed college options - Central + State government colleges",
                "Option for personal college visit with team - Get first-hand experience",
                "One-on-one parent + student counselling - Personalized guidance session",
                "Process explanation + documentation support - Step-by-step assistance",
                "End-to-end guidance till final allotment - Complete support journey",
                "For serious families who want personal touch",
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.8}>
            <PricingPlan
              title="Golden Package"
              price="9,999"
              description="100% Government Seat ya Paisa Wapas – Bas Itna Hi Simple Hai!"
              icon={Crown}
              onSelectPlan={handleSelectPlan}
              features={[
                "Guaranteed Govt. College Allotment - CUET, IISER, etc.",
                "100% Money-Back Guarantee if not allotted - Zero risk guarantee",
                "Personal mentorship + best-fit career planning - Tailored guidance",
                "Guided visit to best recommended colleges - Expert-led college tours",
                "In-depth discussion with parents - Family consultation sessions",
                "Full support until you hold that allotment letter in hand",
                "For toppers, dreamers, and serious candidates who want nothing but the best!",
              ]}
            />
          </AnimatedSection>
        </div>

        {formVisible && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[10000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-2xl border border-neutral-700/50 rounded-3xl shadow-2xl overflow-x-hidden h-[80vh] flex flex-col"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >

              {/* Floating background elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-primary-500/20 rounded-full blur-xl" />
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-secondary-500/20 rounded-full blur-xl" />

              <div className="relative z-10 p-8">
                {/* Close button */}
                <motion.button
                  disabled={loading}
                  onClick={() => setFormVisible(false)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>

                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-3xl font-heading font-bold text-white mb-2">
                      Complete Your
                      <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                        Investment
                      </span>
                    </h3>
                    <p className="text-neutral-400">Secure your future with expert guidance</p>
                  </motion.div>
                </div>

                {/* Form */}
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {["name", "email", "phone", "whatsapp"].map((field, index) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <label htmlFor={field} className="block text-sm font-medium text-neutral-300 mb-2 capitalize">
                        {field === "whatsapp" ? "WhatsApp Number" : field.charAt(0).toUpperCase() + field.slice(1)}
                        <span className="text-red-400 ml-1">*</span>
                      </label>
                      <input
                        id={field}
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder={`Enter your ${field === "whatsapp" ? "WhatsApp number" : field}`}
                        className="w-full bg-neutral-700/50 border border-neutral-600/50 rounded-xl px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300 backdrop-blur-sm"
                      />
                    </motion.div>
                  ))}

                  {/* Price summary */}
                  <motion.div
                    className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-xl p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-300 text-sm">Total Investment</p>
                        <p className="text-neutral-400 text-xs">One-time payment</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                          ₹{Number(selectedPrice).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <GradientButton
                      size="lg"
                      className="w-full group relative overflow-hidden"
                      disabled={loading}
                      onClick={handleFormSubmit as any}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.907l2-2.616zm10-5.291a7.962 7.962 0 01-2 5.291l2 2.616A7.962 7.962 0 0120 12h-4z"></path>
                          </svg>
                          Processing Payment...
                        </span>
                      ) : (
                        <>
                          <span>Proceed to Payment</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </GradientButton>
                  </motion.div>

                  {/* Security note */}
                  <motion.p
                    className="text-center text-xs text-neutral-500 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    🔒 Secured by Razorpay • 256-bit SSL encryption
                  </motion.p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;