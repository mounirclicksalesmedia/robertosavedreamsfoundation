'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import VideoPlayer from './components/ui/VideoPlayer';

// Define content interface
interface HomeContent {
  hero: {
    title: string;
    description: string;
    buttons: Array<{
      text: string;
      href: string;
      isPrimary: boolean;
    }>;
  };
  missionVision: {
    title: string;
    mission: {
      title: string;
      description: string;
    };
    vision: {
      title: string;
      description: string;
    };
  };
  programs: {
    title: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      image: string;
    }>;
  };
  impact: {
    title: string;
    description: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  testimonials: {
    title: string;
    description: string;
    items: Array<{
      name: string;
      role: string;
      quote: string;
      image: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    button: {
      text: string;
      url: string;
    };
  };
  loanCalculator: {
    title: string;
    description: string;
    interestRate: number;
  };
}

interface Level {
  amount: number;
  label: string;
}

interface Hero {
  title: string;
  subtitle: string;
  description: string;
  buttons: Array<{
    text: string;
    href: string;
  }>;
}

interface MissionVision {
  title: string;
  description: string;
  mission: {
    title: string;
    description: string;
  };
  items: Array<{
    title: string;
    description: string;
  }>;
}

interface Stat {
  value: string;
  label: string;
  color: string;
}

interface Impact {
  title: string;
  description: string;
  stats: Stat[];
  items: Array<{
    title: string;
    description: string;
  }>;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

interface TestimonialsSection {
  title: string;
  description: string;
  items: Testimonial[];
}

interface CTA {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

interface DonateContent {
  levels: Level[];
  hero: Hero;
  missionVision: MissionVision;
  impact: Impact;
  testimonials: TestimonialsSection;
  cta: CTA;
}

const defaultLevels: Level[] = [
  { amount: 10, label: 'Supporter' },
  { amount: 25, label: 'Friend' },
  { amount: 50, label: 'Champion' },
  { amount: 100, label: 'Advocate' },
  { amount: 250, label: 'Benefactor' },
  { amount: 500, label: 'Patron' },
  { amount: 1000, label: 'Visionary' }
];

const defaultTestimonials: Testimonial[] = [
  {
    quote: "The foundation's support changed my life. I was able to start my own business and provide for my family.",
    author: "Sarah Johnson",
    role: "Small Business Owner",
    image: "/images/testimonials/sarah.jpg"
  },
  {
    quote: "Thanks to the education program, I can now pursue my dreams of becoming a teacher.",
    author: "Michael Banda",
    role: "Student",
    image: "/images/testimonials/michael.jpg"
  }
];

const defaultHero: Hero = {
  title: "Empowering Dreams<br/>Building Futures",
  subtitle: "Together we can make a difference",
  description: "The Roberto Save Dreams Foundation is dedicated to transforming lives through education, microloans, and sustainable development initiatives.",
  buttons: [
    {
      text: "Donate Now",
      href: "/donate"
    },
    {
      text: "Learn More",
      href: "/about"
    }
  ]
};

const defaultCTA: CTA = {
  title: "Help Write the Next Success Story",
  description: "Your support can help create more inspiring stories of transformation and empowerment across Africa.",
  buttonText: "Make a Difference",
  buttonUrl: "/donate"
};

export default function Home() {
  // Content state
  const [content, setContent] = useState<DonateContent | null>(null);
  const [contentLoading, setContentLoading] = useState(true);
  
  // Loan calculator state
  const [loanAmount, setLoanAmount] = useState(1000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [interestRate, setInterestRate] = useState(4.68); // Default until content loads
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  
  // Donation state
  const [donationAmount, setDonationAmount] = useState(50);
  const [donationFrequency, setDonationFrequency] = useState('one-time');
  const [customAmount, setCustomAmount] = useState('');
  
  // Fetch content from JSON file
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Add cache-busting timestamp to prevent caching
        const timestamp = new Date().getTime();
        const response = await fetch(`/data/home-content.json?t=${timestamp}`);
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        console.log('Content loaded:', data); // Log content for debugging
        setContent(data);
        // Update interest rate from content
        if (data.loanCalculator && data.loanCalculator.interestRate) {
          setInterestRate(data.loanCalculator.interestRate);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setContentLoading(false);
      }
    };

    fetchContent();
  }, []);
  
  // Calculate loan repayment
  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    const monthlyPayment = 
      loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    setMonthlyPayment(isNaN(monthlyPayment) ? 0 : monthlyPayment);
    setTotalRepayment(monthlyPayment * numPayments);
  }, [loanAmount, loanTerm, interestRate]);
  
  // Handle preset donation amount selection
  const handlePresetAmount = (amount: number | string) => {
    if (amount === 'Custom') {
      // Focus on custom input
      document.getElementById('customAmount')?.focus();
    } else {
      setDonationAmount(amount as number);
      setCustomAmount('');
    }
  };
  
  // Handle custom donation amount
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setDonationAmount(numValue);
    }
  };

  // If content is loading, we could show a loading state
  if (contentLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render the home page with content
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-[#1D942C] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-white/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.05, 0.1],
              rotate: [0, 45, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">
            {/* Text Content */}
            <motion.div 
              className="md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                    dangerouslySetInnerHTML={{ __html: content?.hero?.title || defaultHero.title }}
                />
                <p className="text-xl md:text-2xl text-white leading-relaxed max-w-2xl mb-8">
                  {content?.hero?.description || defaultHero.description}
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {(content?.hero?.buttons || defaultHero.buttons).map((button: { text: string; href: string }, index: number) => {
                  // Ensure we have a valid href
                  const href = button.href || '/';
                  return (
                    <Link
                      key={index}
                      href={href}
                      className={`${
                        index === 0
                          ? 'bg-[#1D942C] text-white hover:bg-[#167623]'
                          : 'bg-white text-[#1D942C] hover:bg-[#1D942C]/10'
                      } px-8 py-4 rounded-lg font-medium transition-colors duration-200`}
                    >
                      {button.text}
                    </Link>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Hero Image/Stats - Updated to be lighter */}
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
        <Image
                  src="/images/hero/hero.jpg"
                  alt="Empowering communities"
                  fill
                  className="object-cover"
          priority
        />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                
                {/* Floating Stats - Updated to be more visible */}
                <motion.div 
                  className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-lg"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <p className="text-3xl font-bold text-[#1D942C]">10+</p>
                  <p className="text-sm text-gray-600">Years of Impact</p>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <p className="text-sm text-gray-600 mb-1">Communities Supported</p>
                  <p className="text-2xl font-bold text-[#1D942C]">500+</p>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-6 right-6 bg-white rounded-xl p-4 shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <p className="text-sm text-gray-600 mb-1">Lives Changed</p>
                  <p className="text-2xl font-bold text-[#ffc500]">5000+</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Updated to be more visible */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center bg-white/10"
          >
            <motion.div
              animate={{ height: [6, 14, 6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Update background to be lighter */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-[#1D942C]/5">
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#ffc500]/5 blur-[80px]"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.1, 0.2],
                rotate: [0, 45, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#1D942C]/5 blur-[80px]"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{content?.missionVision.title || 'Our Purpose'}</h2>
            <div className="w-20 h-1 bg-[#1D942C] mx-auto rounded-full mb-4" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated to empowering communities and transforming lives across Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1D942C]/5 via-transparent to-[#ffc500]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#1D942C]/10 flex items-center justify-center mr-4 group-hover:bg-[#1D942C]/20 transition-colors duration-300">
                      <svg className="w-6 h-6 text-[#1D942C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{content?.missionVision.mission.title || 'Our Mission'}</h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {content?.missionVision.mission.description || 'We empower women and young girls in Zambia and Angola by providing them with the resources to overcome poverty, discrimination, and lack of access to education and healthcare.'}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#1D942C]/5 to-transparent rounded-xl p-4 group-hover:from-[#1D942C]/10 transition-colors duration-300">
                      <div className="text-[#1D942C] font-semibold mb-2">Education</div>
                      <div className="text-sm text-gray-600">Providing access to quality education</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#ffc500]/5 to-transparent rounded-xl p-4 group-hover:from-[#ffc500]/10 transition-colors duration-300">
                      <div className="text-[#1D942C] font-semibold mb-2">Healthcare</div>
                      <div className="text-sm text-gray-600">Ensuring access to essential healthcare</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffc500]/5 via-transparent to-[#1D942C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#ffc500]/10 flex items-center justify-center mr-4 group-hover:bg-[#ffc500]/20 transition-colors duration-300">
                      <svg className="w-6 h-6 text-[#1D942C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    A future where every woman and girl can rise above challenges and fulfill her potential.
                  </p>
                  <div className="space-y-4">
                    {['Equal Opportunities', 'Economic Independence', 'Community Leadership'].map((item) => (
                      <div key={item} className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                        <div className="w-2 h-2 rounded-full bg-[#1D942C]" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* About Us Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1D942C] to-[#167623] text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="text-lg font-semibold">Learn More About Us</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Microloan Impact Calculator</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              See how your contribution can empower entrepreneurs and communities across Africa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-[#1D942C]/5 to-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#ffc500]/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Impact</h3>
                
                {/* Loan Amount Slider */}
                <div className="mb-8 relative z-10">
                  <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount
                  </label>
                  <input
                    type="range"
                    id="loanAmount"
                    min="100"
                    max="5000"
                    step="100"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1D942C] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:bg-[#1D942C]"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">$100</span>
                    <span className="text-lg font-semibold text-[#1D942C]">${loanAmount.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">$5,000</span>
                  </div>
                </div>
                
                {/* Loan Term Selector */}
                <div className="mb-8 relative z-10">
                  <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term (Months)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[6, 12, 24].map((months) => (
                      <button
                        key={months}
                        type="button"
                        onClick={() => setLoanTerm(months)}
                        className={`py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                          months === loanTerm
                            ? 'border-[#1D942C] bg-[#1D942C]/10 text-[#1D942C] font-medium'
                            : 'border-gray-200 text-gray-700 hover:border-[#1D942C]/20'
                        }`}
                      >
                        {months} months
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Interest Rate */}
                <div className="mb-8 relative z-10">
                  <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <div className="block w-full rounded-lg border-gray-300 bg-white py-2 px-3 shadow-sm">
                      4.68% (Fixed Rate)
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12 bg-gradient-to-br from-[#ffc500]/5 to-white relative">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#1D942C]/5 blur-3xl -translate-y-1/2 -translate-x-1/2" />
                <h3 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Your Impact Summary</h3>
                
                <div className="space-y-6 relative z-10">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Monthly Repayment</p>
                    <p className="text-3xl font-bold text-[#1D942C]">${monthlyPayment.toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Repayment</p>
                    <p className="text-3xl font-bold text-[#1D942C]">${totalRepayment.toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-[#1D942C]/5 p-6 rounded-xl border border-[#1D942C]/10">
                    <p className="text-sm text-[#1D942C] mb-1">Potential Entrepreneurs Supported</p>
                    <p className="text-3xl font-bold text-[#1D942C]">
                      {Math.ceil(loanAmount / 500)}-{Math.ceil(loanAmount / 300)} Businesses
                    </p>
                  </div>
                  
                  <div className="bg-[#ffc500]/5 p-6 rounded-xl border border-[#ffc500]/10">
                    <p className="text-sm text-[#1D942C] mb-1">Estimated Jobs Created</p>
                    <p className="text-3xl font-bold text-[#ffc500]">
                      {Math.ceil(loanAmount / 200)}-{Math.ceil(loanAmount / 150)} Jobs
                    </p>
                  </div>

                  <Link 
                    href={`/loanapplication?amount=${loanAmount}&term=${loanTerm}`}
                    className="block w-full text-center px-8 py-4 bg-[#1D942C] text-white rounded-xl font-bold text-lg hover:bg-[#167623] transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Apply for This Loan
                  </Link>
                </div>
                
                <div className="mt-8 p-6 rounded-xl bg-gray-50 border border-gray-100 relative z-10">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1D942C] mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 text-sm text-gray-600">
                      This calculator provides estimates based on our historical data. Actual impact may vary based on local economic conditions and individual business performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Video Section */}
      <section className="py-20 relative overflow-hidden bg-[#1D942C]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-multiply z-10" />
          <video 
            className="w-full h-full object-cover opacity-30"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/videos/impact.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                See Our Impact <br />
                <span className="text-[#ffc500]">In Action</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Watch how your support transforms lives and builds stronger communities across Africa. Every contribution creates ripples of positive change.
              </p>
              <div className="flex items-center gap-6">
                <button 
                  className="flex items-center gap-3 group"
                  onClick={() => {
                    // Add video play logic here
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#ffc500] flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-[#1D942C] transform translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white group-hover:text-[#ffc500] transition-colors duration-300">
                    Watch Video
                  </span>
                </button>
                <Link
                  href="/impact"
                  className="text-lg font-medium text-white/80 hover:text-white flex items-center gap-2 group"
                >
                  Learn More
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <VideoPlayer 
                videoSrc="/videos/impact.mp4"
                thumbnailSrc="/images/videos/thumbnail.jpg"
                thumbnailAlt="NGO Roberto save dreams foundation"
                className="bg-white/10 border border-white/20"
              />

              {/* Video Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                  <p className="text-[#ffc500] text-3xl font-bold mb-1">2M+</p>
                  <p className="text-white/80 text-sm">Views</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                  <p className="text-[#ffc500] text-3xl font-bold mb-1">50+</p>
                  <p className="text-white/80 text-sm">Success Stories</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-gradient-to-br from-[#1D942C]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Make a Difference Today</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your donation helps us empower communities and create lasting change across Africa.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 relative"
          >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#ffc500]/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#1D942C]/5 blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              <div className="lg:col-span-3">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Donation Amount</h3>
                
                {/* Preset Amounts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {(content?.levels || defaultLevels).map((level: Level) => (
                    <button
                      key={level.amount}
                      type="button"
                      onClick={() => handlePresetAmount(level.amount)}
                      className={`py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                        level.amount === donationAmount && customAmount === ''
                          ? 'border-[#1D942C] bg-[#1D942C]/10 text-[#1D942C] font-medium'
                          : 'border-gray-200 text-gray-700 hover:border-[#1D942C]/20'
                      }`}
                    >
                      <span className="block text-2xl font-bold text-[#1D942C]">${level.amount}</span>
                      <span className="text-sm text-gray-600">{level.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Custom Amount Input */}
              <div className="mb-8">
                <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="customAmount"
                    id="customAmount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="block w-full rounded-lg border-gray-300 pl-7 pr-12 focus:border-[#1D942C] focus:ring-[#1D942C]"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm" id="price-currency">USD</span>
                  </div>
                </div>
              </div>
              
              {/* Donation Frequency */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDonationFrequency('one-time')}
                    className={`py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                      donationFrequency === 'one-time'
                        ? 'border-[#1D942C] bg-[#1D942C]/10 text-[#1D942C] font-medium'
                        : 'border-gray-200 text-gray-700 hover:border-[#1D942C]/20'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationFrequency('monthly')}
                    className={`py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                      donationFrequency === 'monthly'
                        ? 'border-[#1D942C] bg-[#1D942C]/10 text-[#1D942C] font-medium'
                        : 'border-gray-200 text-gray-700 hover:border-[#1D942C]/20'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              
              {/* Donation Slider */}
              <div className="mb-8">
                <label htmlFor="donationSlider" className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount
                </label>
                <input
                  type="range"
                  id="donationSlider"
                  min="10"
                  max="100000"
                  step="10"
                  value={donationAmount}
                  onChange={(e) => {
                    setDonationAmount(Number(e.target.value));
                    setCustomAmount('');
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1D942C] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:bg-[#1D942C]"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">$10</span>
                  <span className="text-lg font-semibold text-[#1D942C]">${donationAmount.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">$100k</span>
                </div>
              </div>
              
              <button
                type="button"
                className="w-full py-4 px-6 bg-[#1D942C] text-white rounded-lg shadow-md hover:bg-[#167623] transition-colors duration-200 text-lg font-medium"
              >
                {donationFrequency === 'one-time' ? 'Donate Now' : 'Start Monthly Donation'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 relative overflow-hidden">
        {/* Update animated background to be lighter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#ffc500] blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-10" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#1D942C] blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-10" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{content?.impact.title || "Our Impact"}</h2>
            <div className="w-20 h-1 bg-[#1D942C] mx-auto rounded-full mb-4" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content?.impact.description || "Together, we're creating lasting change in communities across Africa"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Impact Stats */}
            {content?.impact.stats.map((stat: Stat, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1D942C]/5 via-transparent to-[#ffc500]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold text-[#1D942C] mb-2">{stat.value}</h3>
                  <p className="text-gray-700">{stat.label}</p>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#1D942C]/5 rounded-full -mb-16 -mr-16 group-hover:bg-[#1D942C]/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-gradient-to-br from-white to-[#1D942C]/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#ffc500]/5 blur-[80px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.05, 0.1],
              rotate: [0, 45, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#1D942C]/5 blur-[80px]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <div className="w-20 h-1 bg-[#1D942C] mx-auto rounded-full mb-4" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We focus on sustainable solutions that empower individuals and communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/programs/education.jpeg"
                    alt="Education Program"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1D942C] transition-colors duration-300">Education</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Providing access to quality education and learning resources for children and adults.
                  </p>
                  <Link 
                    href="/programs#education" 
                    className="inline-flex items-center text-[#1D942C] font-medium group-hover:text-[#167623] transition-colors duration-300"
                  >
                    Learn more 
                    <svg 
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/programs/loan.jpeg"
                    alt="Microloans Program"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1D942C] transition-colors duration-300">Microloans</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Empowering entrepreneurs with small loans to start or grow their businesses.
                  </p>
                  <Link 
                    href="/programs#microloans" 
                    className="inline-flex items-center text-[#1D942C] font-medium group-hover:text-[#167623] transition-colors duration-300"
                  >
                    Learn more 
                    <svg 
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/programs/health.jpeg"
                    alt="Sustainable Development Program"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1D942C] transition-colors duration-300">Sustainable Development</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Creating long-term solutions for community growth and environmental sustainability.
                  </p>
                  <Link 
                    href="/programs#sustainable" 
                    className="inline-flex items-center text-[#1D942C] font-medium group-hover:text-[#167623] transition-colors duration-300"
                  >
                    Learn more 
                    <svg 
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1D942C] text-white rounded-xl font-bold text-lg hover:bg-[#167623] transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View All Programs
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-20 bg-gradient-to-br from-[#1D942C]/5 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#ffc500]/5 blur-[80px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.05, 0.1],
              rotate: [0, 45, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#1D942C]/5 blur-[80px]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{content?.testimonials.title || "Success Stories"}</h2>
            <div className="w-20 h-1 bg-[#1D942C] mx-auto rounded-full mb-4" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content?.testimonials.description || "Hear from the people whose lives have been impacted by our programs"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {(content?.testimonials?.items || defaultTestimonials).map((testimonial: Testimonial, index: number) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="p-8 md:p-10 relative">
                  <div className="absolute top-4 left-4 text-[#1D942C]/10 z-0">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-[#1D942C]/10 rounded-full flex items-center justify-center mr-4">
                        <span className="text-xl font-bold text-[#1D942C]">
                          {testimonial.author?.split(' ').map(name => name[0]).join('') || 'NA'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{testimonial.author}</h3>
                        <p className="text-[#1D942C]">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 text-lg">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/success-stories"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1D942C] text-white rounded-xl font-bold text-lg hover:bg-[#167623] transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Read More Stories
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1D942C] to-[#167623] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0">
              <motion.div 
                className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#ffc500]/20 blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.1, 0.2],
                  rotate: [0, 45, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {content?.cta?.title || defaultCTA.title}
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {content?.cta?.description || defaultCTA.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={content?.cta?.buttonUrl || defaultCTA.buttonUrl}
                  className="inline-flex items-center px-8 py-4 bg-[#1D942C] text-white rounded-lg font-medium hover:bg-[#167623] transition-colors duration-200"
                >
                  {content?.cta?.buttonText || defaultCTA.buttonText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}