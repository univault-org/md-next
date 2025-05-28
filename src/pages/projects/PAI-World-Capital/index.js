import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCloseLine,
  RiFullscreenLine,
  RiFullscreenExitLine,
  RiMapPin2Line,
  RiBuilding2Line,
  RiGlobalLine,
  RiStarLine,
  RiHandHeartLine,
  RiTrophyLine,
  RiRocketLine,
  RiHeartLine,
  RiTeamLine,
  RiLightbulbLine,
} from "react-icons/ri";

const slides = {
  introduction: {
    title: "PAI World's Capital",
    subtitle: "Where Personal AI Meets Global Innovation",
    summary: "The future of AI is personal, sovereign, and human-centered.",
    content: {
      title: "Introducing the Personal AI World's Capital Initiative",
      introduction: "We invite cities around the world to compete for the honor of becoming the first Personal AI World's Capital - a city that will lead humanity into an era of sovereign, privacy-first artificial intelligence.",
      sections: [
        {
          title: "Vision",
          description: "A city where Personal AI enhances human potential while preserving dignity, privacy, and autonomy.",
          points: [
            "Pioneer the world's first Personal AI ecosystem",
            "Create a model for sovereign AI development",
            "Establish global standards for privacy-first AI",
            "Build the future of human-AI collaboration"
          ]
        }
      ],
      conclusion: "This is more than technology - it's about creating a new paradigm where AI serves humanity's highest aspirations."
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1621603933126-6c216db10045?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Futuristic city skyline"
    }
  },
  
  vision: {
    title: "The Vision",
    subtitle: "Personal AI for Every Human",
    summary: "AI that knows you, protects you, and grows with you.",
    content: {
      title: "Personal AI: The Next Evolution of Human-Computer Interaction",
      introduction: "Personal AI represents a fundamental shift from centralized, surveillance-based AI to sovereign, privacy-first AI that truly serves individual human flourishing.",
      sections: [
        {
          title: "What Makes Personal AI Different",
          description: "Personal AI is trained on your data, runs on your devices, and serves only you.",
          points: [
            "Complete data sovereignty - your data never leaves your control",
            "Personalized understanding that grows with your experiences",
            "Privacy by design - no tracking, no surveillance, no data mining",
            "Human-centric AI that enhances rather than replaces human judgment"
          ]
        }
      ],
      conclusion: "The PAI Capital will be the birthplace of this revolutionary approach to artificial intelligence."
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
      alt: "Human hands interacting with holographic AI interface"
    }
  },

  opportunity: {
    title: "The Opportunity",
    subtitle: "Leading the $7 Trillion AI Revolution",
    summary: "Position your city at the center of the most important technological shift of our time.",
    content: {
      title: "Why Cities Should Compete for This Honor",
      introduction: "The Personal AI revolution represents the largest economic and technological opportunity of the 21st century. The chosen capital will lead this transformation.",
      sections: [
        {
          title: "Economic Impact",
          description: "The PAI Capital will become the global hub for Personal AI innovation and investment.",
          points: [
            "$50B+ in direct investment over the next decade",
            "100,000+ high-tech jobs in AI, privacy tech, and digital sovereignty",
            "World's first Personal AI research universities and institutes",
            "Global headquarters for Personal AI companies and startups"
          ]
        },
        {
          title: "Technological Leadership",
          description: "Lead the development of next-generation AI technologies.",
          points: [
            "First city with comprehensive Personal AI infrastructure",
            "Global testbed for privacy-preserving AI technologies",
            "Center for AI ethics and human-centered design research",
            "Hub for Personal AI standards and governance development"
          ]
        }
      ],
      conclusion: "This is a once-in-a-century opportunity to position your city as the global leader in the most important technology of our time."
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      alt: "Futuristic financial district with data visualization"
    }
  },

  requirements: {
    title: "What We're Looking For",
    subtitle: "Cities Ready to Pioneer the Future",
    summary: "Innovation mindset, technical infrastructure, and commitment to human values.",
    content: {
      title: "PAI Capital Requirements and Criteria",
      introduction: "We seek cities that combine technological readiness with deep commitment to human dignity and privacy rights.",
      sections: [
        {
          title: "Technical Infrastructure",
          description: "Essential technological foundations for Personal AI development.",
          points: [
            "Advanced telecommunications and edge computing infrastructure",
            "Commitment to digital sovereignty and data protection laws",
            "Existing tech ecosystem with AI/ML expertise",
            "High-speed, secure internet connectivity"
          ]
        },
        {
          title: "Cultural and Regulatory Environment",
          description: "The right environment for privacy-first AI innovation.",
          points: [
            "Strong privacy and human rights protections",
            "Progressive approach to AI governance and ethics",
            "Commitment to individual data sovereignty",
            "Culture of innovation balanced with human values"
          ]
        },
        {
          title: "Economic and Social Factors",
          description: "Conditions that support sustainable PAI ecosystem development.",
          points: [
            "Skilled workforce in technology and related fields",
            "Quality of life that attracts global talent",
            "Economic stability and long-term vision",
            "Commitment to education and research excellence"
          ]
        }
      ],
      conclusion: "The chosen city will demonstrate that advanced AI and human dignity can flourish together."
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1716107368227-3af7ea116260?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Modern city with advanced infrastructure"
    }
  },

  benefits: {
    title: "What Cities Gain",
    subtitle: "Transformational Benefits for the Chosen Capital",
    summary: "Economic growth, technological leadership, and global recognition.",
    content: {
      title: "Benefits of Becoming the PAI World's Capital",
      introduction: "The chosen city will receive unprecedented support to become the global center of Personal AI innovation and development.",
      sections: [
        {
          title: "Investment Package",
          description: "Comprehensive investment in infrastructure and development.",
          points: [
            "$10B initial investment in PAI infrastructure development",
            "World's first Personal AI Research Institute and University",
            "Global PAI Innovation Hub and Accelerator Program",
            "Advanced privacy-preserving computing infrastructure"
          ]
        },
        {
          title: "Global Recognition",
          description: "International status as the leader in human-centered AI.",
          points: [
            "Host city for annual Global Personal AI Summit",
            "Headquarters for International PAI Standards Organization",
            "Center for global PAI policy and governance development",
            "Tourist destination for AI ethics and privacy tourism"
          ]
        },
        {
          title: "Long-term Partnership",
          description: "Ongoing collaboration for sustained growth and innovation.",
          points: [
            "20-year partnership agreement with renewal options",
            "Continuous investment in talent development and education",
            "Priority access to breakthrough PAI technologies",
            "Global marketing and promotion as the PAI Capital"
          ]
        }
      ],
      conclusion: "This partnership will transform the chosen city into a beacon of human-centered technological progress."
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80",
      alt: "Successful business partnership celebration"
    }
  },

  paitax: {
    title: "PAI Tax & Open Space",
    subtitle: "Sustainable Revenue Model for Healthier Cities",
    summary: "Transform AI transactions into city revenue and green spaces for human flourishing.",
    content: {
      title: "The PAI Economic Ecosystem: From Digital Transactions to Physical Transformation",
      introduction: "Our Personal AI network creates a unique opportunity for cities to generate sustainable revenue while solving urban challenges. Through PAI transactions and strategic reinvestment, we can create healthier, more livable cities.",
      sections: [
        {
          title: "How Personal AI Networks Generate Value",
          description: "Users run PAI on personal devices and earn money by sharing computational resources.",
          points: [
            "Citizens run Personal AI on their own computers and mobile devices",
            "Users earn income by sharing spare computing power to help others train their PAIs",
            "Decentralized network creates local economic opportunities for residents",
            "Privacy-first architecture ensures data never leaves user control while enabling resource sharing"
          ]
        },
        {
          title: "PAI Tax: 10% Transaction Fee Model",
          description: "A modest transaction fee creates substantial city revenue from the AI economy.",
          points: [
            "10% tax on all PAI network transactions within city boundaries",
            "Estimated $500M+ annual revenue for major cities within 5 years",
            "Transparent, automated collection through blockchain technology",
            "Revenue directly tied to city's AI ecosystem growth and success"
          ]
        },
        {
          title: "Educational Investment: PAI Academy Scholarships",
          description: "Reinvest PAI tax revenue to build local AI expertise and support citizens.",
          points: [
            "Fund scholarships for PAI consultants and trainers at our academy",
            "Provide free PAI training programs for city residents",
            "Support local businesses in adopting Personal AI technologies",
            "Create pathway for citizens to become certified PAI professionals"
          ]
        },
        {
          title: "Open Space Initiative: Healing Urban Environments",
          description: "Use PAI tax revenue to purchase land and create green spaces throughout the city.",
          points: [
            "Systematic land acquisition program to increase urban green space",
            "Counter negative effects of industrial revolution's crowded urban living",
            "Create parks, community gardens, and recreational areas",
            "Improve air quality, mental health, and community well-being",
            "Long-term, efficient solution to urban density challenges"
          ]
        },
        {
          title: "The Virtuous Cycle",
          description: "PAI success creates better cities, which attract more PAI users and investment.",
          points: [
            "More green space attracts residents and businesses to the PAI Capital",
            "Better quality of life increases property values and economic activity",
            "Educated PAI workforce drives further innovation and growth",
            "Healthier, happier citizens become better PAI users and contributors"
          ]
        }
      ],
      conclusion: "The PAI Tax and Open Space model demonstrates how the AI revolution can solve problems created by the industrial revolution. By capturing value from digital transactions and reinvesting in physical spaces and human development, we create a sustainable model for 21st-century cities."
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1715143875558-2df2b9bc4151?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Beautiful urban park with city skyline in background"
    }
  },

  timeline: {
    title: "Implementation Timeline",
    subtitle: "5-Year Plan to PAI Capital Launch",
    summary: "Systematic development from selection to full PAI ecosystem deployment.",
    content: {
      title: "PAI Capital Development Timeline",
      introduction: "A carefully planned 5-year timeline to transform the chosen city into the world's first Personal AI Capital.",
      sections: [
        {
          title: "Year 1: Foundation (2025)",
          description: "City selection and initial infrastructure development.",
          points: [
            "Global competition launch and city applications",
            "Technical assessments and site visits",
            "Final city selection and partnership agreement",
            "Initial investment deployment and team establishment"
          ]
        },
        {
          title: "Years 2-3: Development (2026-2027)",
          description: "Core infrastructure and ecosystem building.",
          points: [
            "PAI Research Institute construction and launch",
            "Advanced computing infrastructure deployment",
            "Talent recruitment and education program launch",
            "First Personal AI pilot programs with local residents"
          ]
        },
        {
          title: "Years 4-5: Launch (2028-2029)",
          description: "Full PAI ecosystem activation and global expansion.",
          points: [
            "Grand opening as the official PAI World's Capital",
            "First Global Personal AI Summit hosting",
            "Commercial PAI services launch for global market",
            "Expansion planning for PAI regional centers worldwide"
          ]
        }
      ],
      conclusion: "By 2029, the PAI Capital will be the undisputed global leader in Personal AI innovation and deployment."
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
      alt: "Project timeline and planning visualization"
    }
  },

  candidates: {
    title: "Potential Candidates",
    subtitle: "Cities That Could Lead the PAI Revolution",
    summary: "Innovation hubs worldwide positioned to become the PAI Capital.",
    content: {
      title: "Cities We're Considering",
      introduction: "Several world-class cities have the potential to become the PAI World's Capital. Each brings unique strengths to the competition.",
      sections: [
        {
          title: "Silicon Valley & San Francisco",
          description: "The world's technology capital with unmatched AI expertise.",
          points: [
            "Global center of AI research and development",
            "Largest concentration of AI talent and companies",
            "Strong venture capital and startup ecosystem",
            "Progressive approach to technology governance"
          ]
        },
        {
          title: "Singapore",
          description: "Smart city leader with strong digital governance.",
          points: [
            "World-leading smart city infrastructure",
            "Strong data protection and privacy laws",
            "Strategic location connecting East and West",
            "Government commitment to AI and innovation"
          ]
        },
        {
          title: "Zurich & Switzerland",
          description: "Privacy excellence with world-class research institutions.",
          points: [
            "Global leader in privacy and data protection",
            "Home to world-renowned AI research institutions",
            "Strong tradition of technological innovation",
            "Stable political and economic environment"
          ]
        },
        {
          title: "Toronto",
          description: "AI research powerhouse with ethical AI leadership.",
          points: [
            "Home to leading AI research institutes",
            "Strong focus on ethical AI development",
            "Diverse, skilled technology workforce",
            "Progressive approach to AI governance"
          ]
        },
        {
          title: "Austin, Texas",
          description: "Emerging tech hub with entrepreneurial spirit and innovation culture.",
          points: [
            "Rapidly growing tech ecosystem with major company headquarters",
            "Strong startup culture and venture capital presence",
            "World-renowned universities (UT Austin) with AI research programs",
            "Business-friendly environment with no state income tax",
            "Creative culture that balances innovation with human values"
          ]
        },
        {
          title: "Salt Lake City, Utah",
          description: "Pioneer of Family PAI - where technology strengthens family bonds.",
          points: [
            "Unique opportunity to develop Family PAI - AI systems designed to enhance family connections and values",
            "Strong family-oriented culture providing ideal testing ground for family-centric AI",
            "Growing tech sector with companies like Adobe, Oracle, and numerous startups",
            "Excellent quality of life and education systems",
            "Mountain West location offering natural beauty and work-life balance",
            "Progressive tech policies combined with traditional family values"
          ]
        }
      ],
      conclusion: "The competition is open to all cities that meet our criteria and share our vision for human-centered AI. Each candidate city brings unique strengths that could shape the future of Personal AI in different but equally valuable ways."
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80",
      alt: "World map showing global city network"
    }
  },

  impact: {
    title: "Global Impact",
    subtitle: "Transforming Humanity's Relationship with AI",
    summary: "Creating a new model for AI that serves human flourishing.",
    content: {
      title: "The Broader Impact of the PAI Capital",
      introduction: "The PAI World's Capital will catalyze a global transformation in how humanity relates to artificial intelligence.",
      sections: [
        {
          title: "Societal Transformation",
          description: "Reshaping society's relationship with AI technology.",
          points: [
            "Demonstration that AI can enhance rather than replace human agency",
            "Model for digital sovereignty and data rights globally",
            "New standards for ethical AI development and deployment",
            "Template for human-centered technological progress"
          ]
        },
        {
          title: "Economic Revolution",
          description: "Creating new economic models based on personal data sovereignty.",
          points: [
            "Individuals retain economic value from their personal data",
            "New business models based on privacy and consent",
            "Reduced dependence on surveillance capitalism",
            "Democratization of AI benefits for all humanity"
          ]
        },
        {
          title: "Global Network Effect",
          description: "The PAI Capital will seed a worldwide network of Personal AI cities.",
          points: [
            "Template for PAI development in other cities",
            "Network of connected PAI-enabled communities",
            "Global standards for Personal AI interoperability",
            "Worldwide movement toward human-centered AI"
          ]
        }
      ],
      conclusion: "The PAI Capital represents the beginning of a new era where AI truly serves humanity's highest aspirations."
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
      alt: "Connected global network visualization"
    }
  },

  calltoaction: {
    title: "Join the Revolution",
    subtitle: "Apply to Become the PAI World's Capital",
    summary: "The future of AI starts with your city. The time to act is now.",
    content: {
      title: "How Cities Can Apply",
      introduction: "We invite visionary cities to join us in creating the future of Personal AI. The application process is designed to identify cities ready to lead this transformation.",
      sections: [
        {
          title: "Application Process",
          description: "A comprehensive evaluation to select the ideal PAI Capital.",
          points: [
            "Submit initial expression of interest and city profile",
            "Technical infrastructure assessment and site visits",
            "Meetings with city leadership and stakeholder presentations",
            "Final selection process with community engagement sessions"
          ]
        },
        {
          title: "What We Need from Cities",
          description: "Commitments that ensure successful PAI Capital development.",
          points: [
            "Long-term partnership commitment (minimum 20 years)",
            "Regulatory support for Personal AI development",
            "Local investment matching (minimum $1B over 5 years)",
            "Community support and engagement programs"
          ]
        },
        {
          title: "Next Steps",
          description: "Begin your journey to becoming the PAI World's Capital.",
          points: [
            "Contact our PAI Capital team for initial discussions",
            "Prepare comprehensive city application package",
            "Schedule technical assessment and leadership meetings",
            "Engage community leaders and citizens in the vision"
          ]
        }
      ],
      conclusion: "The PAI World's Capital competition represents a once-in-a-lifetime opportunity to lead humanity into a new era of AI. We invite bold, visionary cities to join us in making this future a reality.",
      callToAction: {
        primary: "Submit Your City's Application",
        secondary: "Schedule Initial Consultation",
        contact: "pai-capital@univault.org"
      }
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80",
      alt: "Diverse group of city leaders planning together"
    }
  }
};

const SLIDE_MAPPING = {
  0: "introduction",
  1: "vision", 
  2: "opportunity",
  3: "requirements",
  4: "benefits",
  5: "paitax",
  6: "timeline",
  7: "candidates",
  8: "impact",
  9: "calltoaction"
};

export default function PAICapitalPresentation() {
  // State Management
  const [activeSlide, setActiveSlide] = useState("introduction");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Refs
  const fullscreenContainerRef = useRef(null);
  const contentRef = useRef(null);

  // Constants
  const steps = [
    { id: 1, title: "Introduction", icon: <RiRocketLine /> },
    { id: 2, title: "Vision", icon: <RiLightbulbLine /> },
    { id: 3, title: "Opportunity", icon: <RiTrophyLine /> },
    { id: 4, title: "Requirements", icon: <RiBuilding2Line /> },
    { id: 5, title: "Benefits", icon: <RiStarLine /> },
    { id: 6, title: "PAI Tax & Open Space", icon: <RiGlobalLine /> },
    { id: 7, title: "Timeline", icon: <RiMapPin2Line /> },
    { id: 8, title: "Candidates", icon: <RiTeamLine /> },
    { id: 9, title: "Impact", icon: <RiHeartLine /> },
    { id: 10, title: "Apply Now", icon: <RiHandHeartLine /> }
  ];

  // Effects
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Event Handlers
  const handleStepClick = (index) => {
    setActiveSlide(SLIDE_MAPPING[index]);
    setCurrentSlide(index);
    setIsExpanded(false);
  };

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // Render Step Navigation
  const renderStepNavigation = () => (
    <div className="py-6 border-b border-gray-200 dark:border-white/20">
      <div className="flex flex-col items-center gap-4">
        <p className="text-gray-600 dark:text-white/60 text-sm font-medium">
          {activeSlide && steps[currentSlide].title}
        </p>
        
        <div className="flex items-center gap-2 overflow-x-auto px-4 max-w-full">
          {steps.map((step, index) => (
            <motion.button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className="group relative flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                border transition-all duration-200
                ${currentSlide === index
                  ? "bg-primary-500 border-primary-400 text-white"
                  : "bg-white hover:bg-gray-50 border-gray-200 text-gray-600 " +
                    "dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300"
                }
              `}>
                {step.icon}
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  absolute top-1/2 -right-2 w-2 h-px
                  ${index < currentSlide ? "bg-primary-500" : "bg-gray-200 dark:bg-neutral-600"}
                `} />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Main Content
  const renderMainContent = () => {
    const currentSlideData = slides[activeSlide];
    
    return (
      <motion.div className="px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 pb-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4"
          >
            {currentSlideData.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-white/80 mb-6"
          >
            {currentSlideData.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-serif italic text-primary-600 dark:text-primary-400"
          >
            {currentSlideData.summary}
          </motion.div>
        </div>

        {/* Media Section */}
        {currentSlideData.media && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative h-64 sm:h-80 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={currentSlideData.media.url}
              alt={currentSlideData.media.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        )}

        {/* Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className={`
              rounded-lg transition-all duration-300 
              ${isExpanded 
                ? "fixed inset-0 z-50 bg-white dark:bg-neutral-900 min-h-screen"
                : "bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 min-h-[400px]"
              }
            `}>
              <div className={`transition-all duration-300 relative 
                ${isExpanded 
                  ? "h-[calc(100vh-2rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
                  : "max-w-6xl mx-auto"
                }`}>
                
                <div className={`relative max-w-7xl mx-auto ${isExpanded ? "px-6 lg:px-12 py-8" : "p-8"}`}>
                  {/* Close Button */}
                  {isExpanded && (
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600
                        dark:bg-white/10 dark:hover:bg-white/20 dark:text-white/80
                        transition-colors duration-200"
                    >
                      <RiCloseLine className="w-6 h-6" />
                    </button>
                  )}

                  {/* Content Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white/90 mb-4">
                      {currentSlideData.content.title}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-white/80">
                      {currentSlideData.content.introduction}
                    </p>
                  </div>

                  {/* Detailed Content */}
                  <div className={`
                    prose prose-lg lg:prose-xl max-w-none
                    prose-headings:text-gray-800 dark:prose-headings:text-white/90
                    prose-p:text-gray-700 dark:prose-p:text-white/80
                    prose-li:text-gray-600 dark:prose-li:text-white/70
                    ${!isExpanded ? "max-h-[300px] overflow-hidden relative" : ""}
                  `}>
                    
                    {/* Sections */}
                    {currentSlideData.content.sections.map((section, index) => (
                      <section key={index} className="mb-8">
                        <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white/90">
                          {section.title}
                        </h4>
                        <p className="mb-4 text-gray-700 dark:text-white/80">
                          {section.description}
                        </p>
                        <ul className="space-y-2">
                          {section.points.map((point, idx) => (
                            <li key={idx} className="text-gray-600 dark:text-white/70 flex items-start">
                              <RiStarLine className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}

                    {/* Conclusion */}
                    {isExpanded && (
                      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
                        <p className="text-lg font-medium text-gray-800 dark:text-white/90 italic">
                          {currentSlideData.content.conclusion}
                        </p>
                        
                        {/* Call to Action */}
                        {currentSlideData.content.callToAction && (
                          <div className="mt-8 text-center">
                            <button className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200 mr-4">
                              {currentSlideData.content.callToAction.primary}
                            </button>
                            <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-200">
                              {currentSlideData.content.callToAction.secondary}
                            </button>
                            {currentSlideData.content.callToAction.contact && (
                              <p className="mt-4 text-gray-600 dark:text-white/60">
                                Contact: <a href={`mailto:${currentSlideData.content.callToAction.contact}`} className="text-primary-500 hover:text-primary-600">{currentSlideData.content.callToAction.contact}</a>
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Gradient Overlay for non-expanded view */}
                    {!isExpanded && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/90 dark:via-black/30 dark:to-black/90 pointer-events-none" />
                    )}
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={toggleExpanded}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full
                      transition-all duration-200 shadow-lg
                      ${isExpanded
                        ? "fixed bottom-20 right-4 bg-primary-500 hover:bg-primary-600 text-white"
                        : "absolute -bottom-6 left-1/2 -translate-x-1/2 z-[60] cursor-pointer " +
                          "bg-gray-100 hover:bg-gray-200 text-gray-700 " +
                          "dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
                      }
                    `}
                  >
                    {isExpanded ? (
                      <RiArrowUpLine className="w-5 h-5" />
                    ) : (
                      <>
                        <RiArrowDownLine className="w-5 h-5" />
                        Read Full Details
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Backdrop */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-500/60 dark:bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setIsExpanded(false)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <>
      <Head>
        <title>PAI World's Capital - The Future of Personal AI | Univault</title>
        <meta name="description" content="Cities compete to become the world's first Personal AI Capital. Leading the revolution in sovereign, privacy-first artificial intelligence." />
        <meta name="keywords" content="Personal AI, AI capital, privacy AI, sovereign AI, city development, AI innovation" />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-blue-900/20 dark:to-purple-900/20 py-1
          ${isExpanded ? "h-screen overflow-hidden" : "h-auto"} relative`}
      >
        <div className="w-full max-w-7xl mx-auto">
          <motion.div className={`
            backdrop-blur-sm rounded-lg shadow-2xl transition-all duration-300
            ${isExpanded 
              ? "fixed top-[4rem] left-0 right-0 bottom-0 z-50 bg-white/98 dark:bg-neutral-900/98"
              : "bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/20"
            }
          `}>
            {/* Step Navigation */}
            {renderStepNavigation()}

            {/* Main Content */}
            {renderMainContent()}

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center py-4 sm:py-6 border-t border-gray-200 dark:border-white/10"
            >
              <p className="text-gray-600 dark:text-white/50 text-sm font-serif">
                Slide {currentSlide + 1} of 10 • PAI World's Capital
              </p>
              <p className="text-gray-500 dark:text-white/30 text-xs mt-2 font-serif italic">
                "Building the future of human-centered AI"
              </p>
            </motion.footer>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
} 