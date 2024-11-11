import { useState, useEffect, useRef } from "react";
import { MDXRemote } from "next-mdx-remote";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCloseLine,
  RiFullscreenLine,
  RiFullscreenExitLine,
} from "react-icons/ri";

const answers = {
  chatgpt: {
    summary: `"Inner peace and enlightenment - a state that enables all other fulfillments to naturally follow."`,
    context: {
      title: "The Most Essential Question",
      subtitle:
        "We began our exploration by asking two leading AI models, trained on vast public datasets, to answer this question. Let's start with ChatGPT's response.",
      description:
        "In a world of endless questions, we asked AI models to identify the most fundamental human question:",
      question:
        "What is the ultimate wish for a person—one wish that, if granted, would fulfill all others?",
      why_ai:
        "AI models, trained on humanity's collective knowledge, offer unique insights into patterns of human wisdom across cultures and time.",
    },
    content: {
      title: "The Ultimate Human Wish: A Path to Complete Fulfillment",
      introduction:
        "The concept of an 'ultimate wish' that could fulfill all others leads us to examine the fundamental nature of human satisfaction and contentment.",
      sections: [
        {
          title: "The Nature of Inner Peace",
          description:
            "Inner peace represents a state of profound contentment that transcends external circumstances, serving as a foundation for all other forms of fulfillment.",
          points: [
            "Navigate challenges with grace and resilience, turning obstacles into opportunities for growth",
            "Cultivate deep relationships based on understanding and compassion, enriching both personal and communal life",
            "Embrace life's imperfections without constant anxiety or fear, leading to authentic living",
            "Maintain stability and clarity regardless of external circumstances",
          ],
        },
        {
          title: "Enlightenment and Self-Actualization",
          description:
            "Across various philosophical and spiritual traditions, enlightenment or self-actualization emerges as a ultimate goal, offering comprehensive fulfillment.",
          points: [
            "Develop a profound sense of purpose and meaning that guides all actions",
            "Live authentically and in complete alignment with one's deepest values",
            "Experience freedom from the limitations of ego, fear, and attachment",
            "Understand the interconnected nature of all existence",
          ],
        },
        {
          title: "Cascading Benefits",
          description:
            "When inner peace or enlightenment is achieved, other life aspects naturally fall into place:",
          points: [
            "Enhanced ability to experience love and maintain meaningful relationships",
            "Greater success in pursuits due to clarity of mind and purpose",
            "Increased creativity flowing from a state of inner freedom",
            "Improved physical and mental health through reduced stress and anxiety",
          ],
        },
        {
          title: "Universal Compassion",
          description:
            "The natural evolution from personal fulfillment often leads to a desire for universal well-being:",
          points: [
            "Recognition of the interconnectedness of all beings",
            "Spontaneous desire to alleviate suffering in others",
            "Active contribution to collective human flourishing",
            "Creation of positive ripple effects in communities and beyond",
          ],
        },
      ],
      conclusion:
        "The ultimate wish for inner peace or enlightenment represents not just an individual achievement, but a transformative state that naturally fulfills all other desires while contributing to collective human flourishing. It's a wish that transcends personal satisfaction to embrace universal well-being, making it truly ultimate in both scope and impact.",
      references: [
        {
          title: "The Nature of Human Fulfillment",
          author: "Journal of Consciousness Studies",
          year: "2024",
        },
        {
          title: "Paths to Complete Human Development",
          author: "Psychological Review",
          year: "2023",
        },
      ],
    },
    source: "ChatGPT-4",
    timestamp: "March 2024",
  },
  claude: {
    summary: `"To fully understand and realize one's true nature."`,
    content: {
      title: "The Ultimate Wish: Understanding Our True Nature",
      introduction:
        "The most fundamental wish that could fulfill all others is the complete understanding and realization of one's true nature. This insight goes beyond mere self-improvement to address the very root of human desire and fulfillment.",
      sections: [
        {
          title: "Source of All Desires",
          description:
            "Understanding the origin of our wishes reveals a profound truth:",
          points: [
            "All other wishes stem from a perceived lack or separation",
            "Understanding our true nature reveals our inherent completeness",
            "Most suffering comes from misidentification with limited concepts of self",
            "Desires arise from misunderstanding our fundamental nature",
          ],
        },
        {
          title: "Natural Fulfillment",
          description: "When we truly understand who we are:",
          points: [
            "Material desires naturally balance",
            "Relationships become authentic",
            "Fear and insecurity dissolve",
            "Actions flow from wisdom rather than want",
          ],
        },
        {
          title: "Root Solution",
          description:
            "This wish addresses the fundamental nature of wishing itself:",
          points: [
            "Instead of addressing individual wishes",
            "This addresses the source of all wishing",
            "Like watering the root to nourish all branches",
            "Resolves the underlying cause of all seeking",
          ],
        },
        {
          title: "Complete Understanding",
          description: "This realization encompasses:",
          points: [
            "Our relationship with existence",
            "Our role in the whole",
            "The nature of consciousness",
            "The source of happiness",
          ],
        },
        {
          title: "Practical Outcomes",
          description: "This understanding manifests as:",
          points: [
            "Clear decision-making",
            "Natural compassion",
            "Effortless action",
            "Inner peace",
            "Authentic relationships",
          ],
        },
      ],
      conclusion:
        "This wish is unique because it doesn't add anything—it reveals what's already there. It's not about getting something new, but about understanding what is.",
      philosophical_note:
        "Unlike wishes that seek to add or change something external, this wish points to the recognition of our inherent completeness. It suggests that all other desires are actually pointing to this fundamental understanding.",
    },
    source: "Claude-3 Sonnet",
    timestamp: "March 2024",
  },
  purpose: {
    summary: "Why we start with fundamental questions in the age of AI?",
    content: {
      title: "From AI Insights to Our Technology Research and Development",
      introduction:
        "In an age where AI can answer almost any question instantly, we face a crucial challenge: are we asking the right questions?",
      sections: [
        {
          title: "The Paradox of Infinite Answers",
          description:
            "With powerful AI models, we can get answers to countless questions - but this creates new challenges:",
          points: [
            "Information overload can distract us from essential questions",
            "Easy answers might prevent deeper contemplation",
            "We risk pursuing superficial knowledge over fundamental understanding",
            "Time and cognitive resources can be scattered across non-essential queries",
          ],
        },
        {
          title: "The Value of Essential Questions",
          description:
            "Why focusing on fundamental questions matters more than ever:",
          points: [
            "Core questions help us navigate the complexity of modern life",
            "Understanding our true nature becomes crucial as technology advances",
            "Essential questions lead to meaningful progress in both personal and collective development",
            "AI can be a powerful tool when guided by the right questions",
          ],
        },
      ],
    },
    source: "Research Framework 2024",
  },
  methodology: {
    summary: "Our Research Approach",
    content: {
      title: "Bridging AI Insights with Human Experience",
      introduction:
        "The remarkable alignment between ChatGPT and Claude's perspectives on human fulfillment isn't coincidental. It reflects a convergence of wisdom that guides our research methodology.",
      sections: [
        {
          title: "The Power of Convergent Insights",
          description: "Why the alignment between AI models matters:",
          points: [
            "When different AI models trained on human knowledge reach similar conclusions, it suggests universal patterns",
            "These patterns often align with wisdom traditions across cultures and time",
            "This convergence helps validate both ancient insights and modern approaches",
            "It suggests practical paths forward that honor both tradition and innovation",
          ],
        },
        {
          title: "Our Research Framework",
          description: "How we systematically explore essential questions:",
          points: [
            "Begin with fundamental questions about human nature and fulfillment",
            "Use multiple AI models to analyze historical and contemporary perspectives",
            "Identify patterns where AI insights align with human wisdom",
            "Focus on areas where understanding leads to practical applications",
          ],
        },
        {
          title: "From Theory to Practice",
          description: "How we translate insights into solutions:",
          points: [
            "Analyze where AI and human wisdom point to similar solutions",
            "Identify technological approaches that support natural human development",
            "Focus on solutions that enhance rather than replace human capabilities",
            "Develop tools that bridge philosophical understanding with daily life",
          ],
        },
        {
          title: "Personal Data as a Bridge",
          description: "Why our research led us to focus on personal data:",
          points: [
            "Personal data represents a tangible record of human experience",
            "It offers a practical way to apply AI insights to individual growth",
            "Proper data sovereignty aligns with human autonomy and dignity",
            "It creates a concrete path from understanding to implementation",
          ],
        },
      ],
      conclusion:
        "Our research methodology bridges the gap between timeless wisdom and modern technology, leading us to practical solutions that honor both. This approach has guided us to focus on personal data as a key to implementing these insights in daily life.",
      philosophical_note:
        "Just as ancient wisdom traditions emphasized self-knowledge, our research suggests that personal data, properly understood and utilized, can serve as a modern path to similar insights.",
    },
    source: "Research Framework 2024",
  },

  invitation: {
    summary: "From Essential Questions to Practical Solutions",
    content: {
      title: "From Understanding to Action",
      introduction:
        "While asking the most essential question is crucial, it's just the beginning. The next step is exploring practical solutions, and we have a core hypothesis that guides our research.",
      sections: [
        {
          title:
            "Our Hypothesis: Personal Data Plays a Key Role in Answering the Most Essential Questions",
          description:
            "We believe personal data mirrors an individual's evolving self-awareness and development over time.",
          points: [
            "Personalized AI models, built on personal data, can provide valuable insights for self-understanding and growth.",
            "Personalized AI models trained on personal data to assist users for self-understanding",
            "Protecting personal data enables people to express themselves genuinely and without compromise.",
            "Empowering individuals with control over their own data is key to achieving personal and societal autonomy.",
          ],
        },
        {
          title: "Our Three-Part Solution",
          description:
            "We're designing and propose a comprehensive ecosystem for personal data:",
          points: [
            "JoySpace.wiki - A example platform for natural and joyful personal data generation through daily activities",
            "Contribute to open-source technologies that promote transparency and empower personal data sovereignty. We believe transparency is essential to giving individuals true control over their data.",
            "eBequest - A framework designed to help individuals pass on their digital assets to future generations, ensuring that their digital legacy is preserved and respected.",
          ],
        },
        {
          title: "Join Us in This Journey",
          description: "We invite you to get involved in three key ways:",
          points: [
            "Try JoySpace.wiki, explore the platform and share how you'd create and help others 'Joyganize' their digital space.",
            "Contribute to our open source projects",
            "Share your thoughts on how we can build a more meaningful and secure system for digital inheritance.",
          ],
        },
      ],
      conclusion:
        "Understanding the most essential question has led us to develop practical tools for personal data sovereignty. Through JoySpace.wiki, our open source technologies, and the eBequest initiative, we're creating concrete paths for individuals to generate, protect, and pass on their personal data. We invite you to explore these tools, provide feedback, and help us refine these solutions.",
      call_to_action: {
        primary: "Explore JoySpace.wiki",
        secondary: [
          "Review our open source projects",
          "Learn about eBequest",
          "Join our research community",
        ],
        links: {
          joyspace: "/joyspace",
          github: "/github",
          ebequest: "/ebequest",
          community: "/community",
        },
      },
    },
    source: "Research Framework 2024",
    philosophical_note:
      "By connecting our most essential questions with practical tools for personal data sovereignty, we're building bridges between timeless wisdom and future technology.",
  },
};

const STEP_MAPPING = {
  0: "chatgpt",
  1: "claude",
  2: "purpose",
  3: "methodology",
  4: "invitation",
};

export default function MainQuestion({ source, frontmatter }) {
  // ===============================
  // State Management
  // ===============================
  const [activeAnswer, setActiveAnswer] = useState("chatgpt");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // ===============================
  // Refs
  // ===============================
  const fullscreenContainerRef = useRef(null);
  const contentRef = useRef(null);

  // ===============================
  // Constants
  // ===============================
  const steps = [
    { id: 1, title: "ChatGPT's Perspective" },
    { id: 2, title: "Claude's Perspective" },
    { id: 3, title: "Why This Matters" },
    { id: 4, title: "Our Research Focus" },
    { id: 5, title: "Join Our Journey" },
  ];

  // ===============================
  // Effects
  // ===============================
  useEffect(() => {
    // Initialize default answer if none selected
    if (!activeAnswer) {
      setActiveAnswer("chatgpt");
      setCurrentStep(0);
      setCurrentSlide(0);
    }

    // Handle escape key
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // ===============================
  // Event Handlers
  // ===============================
  const handleStepClick = (index) => {
    setActiveAnswer(STEP_MAPPING[index]);
    setCurrentStep(index);
    setCurrentSlide(index);
    // Reset expanded state when changing steps
    setIsExpanded(false);
  };

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // ===============================
  // Component Sections
  // ===============================
  // ===============================
  // Component Sections
  // ===============================
  const renderStepNavigation = () => (
    <div className="py-6 border-b border-gray-200 dark:border-white/20">
      <div className="flex flex-col items-center gap-4">
        {/* Step Title */}
        <p className="text-gray-600 dark:text-white/60 text-sm font-medium">
          {activeAnswer && steps[currentStep].title}
        </p>

        {/* Step Dots */}
        <div className="flex items-center gap-3">
          {steps.map((step, index) => (
            <motion.button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className="group relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Step Dot */}
              <div
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  border transition-all duration-200
                  ${
                    currentStep === index
                      ? "bg-primary-500 border-primary-400 text-white"
                      : "bg-white hover:bg-gray-50 border-gray-200 text-gray-600 " +
                        "dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300"
                  }
                `}
              >
                <span className="text-sm font-medium">{step.id}</span>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    absolute top-1/2 -right-3 w-3 h-px
                    ${
                      index < currentStep
                        ? "bg-primary-500" // Completed state
                        : "bg-gray-200 dark:bg-neutral-600" // Inactive state
                    }
                  `}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    // ===============================
    // Helper Components
    // ===============================
    const renderMainQuestion = () => (
      <div className="prose prose-lg sm:prose-xl md:prose-2xl max-w-4xl mx-auto">
        <div className="text-gray-800 dark:text-white/90 text-3xl sm:text-4xl md:text-5xl leading-relaxed font-serif">
          <p
            className="first-letter:text-[4.5rem] sm:first-letter:text-[5.5rem] md:first-letter:text-[6.5rem] 
            first-letter:font-bold first-letter:float-left first-letter:-mt-3 
            sm:first-letter:-mt-4 md:first-letter:-mt-6 first-letter:leading-[0.8] 
            first-letter:text-primary-600 dark:first-letter:text-primary-400
            text-xl sm:text-3xl md:text-4xl
            leading-relaxed tracking-wide"
          >
            What is the ultimate wish for a person—one wish that, if granted,
            would fulfill all others?
          </p>
        </div>
      </div>
    );

    const renderContentHeader = () => (
      <div className="mt-4 md:mt-10 pl-4">
        {/* Show context title only for first step */}
        {activeAnswer === "chatgpt" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-gray-800 dark:text-white/90 mb-2">
              {answers.chatgpt.context.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60">
              {answers.chatgpt.context.subtitle}
            </p>
          </motion.div>
        )}
        <h3 className="text-2xl lg:text-3xl font-serif text-gray-800 dark:text-white/90 mb-2">
          {answers[activeAnswer].summary}
        </h3>
        <p className="text-gray-500 dark:text-white/60 text-sm lg:text-base">
          Source: {answers[activeAnswer].source}
        </p>
      </div>
    );

    const renderDetailedContent = () => (
      <div
        className={`
        prose prose-lg lg:prose-xl max-w-none
        p-8 lg:p-12 relative pointer-events-auto
        prose-headings:text-gray-800 dark:prose-headings:text-white/90
        prose-p:text-gray-700 dark:prose-p:text-white/80
        prose-li:text-gray-600 dark:prose-li:text-white/70
        bg-white/70 dark:bg-black/70 rounded-lg mt-4
        ${
          isExpanded
            ? "min-h-[70vh] flex flex-col"
            : "max-h-[200px] overflow-hidden"
        }
      `}
      >
        {/* Introduction */}
        <div className="text-xl text-gray-700 dark:text-white/80">
          {typeof answers[activeAnswer].content.introduction === "string" ? (
            <p>{answers[activeAnswer].content.introduction} </p>
          ) : (
            answers[activeAnswer].content.introduction
          )}
        </div>

        {/* Preview Content (shown when not expanded) */}
        {!isExpanded && (
          <div className="relative mt-6">
            {/* First Section Preview */}
            <div className="blur-[2px] opacity-60">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white/90">
                {answers[activeAnswer].content.sections[0].title}
              </h3>
              <p className="mb-4 text-gray-700 dark:text-white/80">
                {answers[activeAnswer].content.sections[0].description}
              </p>
              <ul className="space-y-3">
                {answers[activeAnswer].content.sections[0].points
                  .slice(0, 2)
                  .map((point, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-white/70">
                      {point}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/90 dark:via-black/30 dark:to-black/90 pointer-events-none" />
          </div>
        )}

        {/* Sections */}
        {isExpanded &&
          answers[activeAnswer].content.sections.map((section, index) => (
            <section key={index} className="mt-12">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white/90">
                {section.title}
              </h3>
              <p className="mb-4 text-gray-700 dark:text-white/80">
                {section.description}
              </p>
              <ul className="space-y-3">
                {section.points.map((point, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-white/70">
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          ))}

        {/* Conclusion */}
        {isExpanded && (
          <div className="mt-12 border-t border-gray-200 dark:border-white/10 pt-8">
            <p className="text-lg italic text-gray-600 dark:text-white/70">
              {answers[activeAnswer].content.conclusion}
            </p>
          </div>
        )}
      </div>
    );

    const renderExpandButton = () => (
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full
          transition-all duration-200 shadow-lg
          ${
            isExpanded
              ? "fixed bottom-[2.5rem] right-4 bg-primary-500 hover:bg-primary-600 text-white"
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
            Read Full Analysis
          </>
        )}
      </button>
    );

    const renderCloseButton = () =>
      isExpanded && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600
                dark:bg-white/10 dark:hover:bg-white/20 dark:text-white/80
                transition-colors duration-200"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>
          </div>
        </div>
      );

    // ===============================
    // Main Render
    // ===============================
    return (
      <motion.div className="px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 pb-10">
        {/* Main Question Display */}
        {renderMainQuestion()}

        {/* Answer Display */}
        <AnimatePresence mode="wait">
          {activeAnswer && (
            <motion.div
              ref={fullscreenContainerRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative mt-10"
            >
              {/* Content Card */}
              <div
                className={`rounded-lg transition-all duration-300 
                ${
                  isExpanded
                    ? "fixed inset-0 z-50 bg-white dark:bg-neutral-900 min-h-screen"
                    : "bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 min-h-[400px]"
                }`}
              >
                {/* Scrollable Container */}
                <div
                  ref={contentRef}
                  className={`transition-all duration-300 relative 
                    ${
                      isExpanded
                        ? "h-[calc(100vh-2rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
                        : "max-w-4xl mx-auto"
                    }`}
                >
                  {/* Content Wrapper */}
                  <div
                    className={`relative max-w-7xl mx-auto ${
                      isExpanded ? "px-6 lg:px-12 py-8" : ""
                    }`}
                  >
                    {renderCloseButton()}
                    {renderContentHeader()}
                    {renderDetailedContent()}
                  </div>
                  {renderExpandButton()}
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
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col
        bg-gray-50 dark:bg-neutral-900 py-1
        ${isExpanded ? "h-screen overflow-hidden" : "h-auto"} relative`}
    >
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          className={`
    backdrop-blur-sm 
    rounded-lg 
    shadow-2xl
    transition-all duration-300
   ${
     isExpanded
       ? "fixed top-[4rem] left-0 right-0 bottom-0 z-50 bg-white/98 dark:bg-neutral-900/98"
       : "bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/20"
   }
  `}
        >
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
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-600 dark:text-white/50 text-sm font-serif"
            >
              Slide {currentSlide + 1} of 5 • The Core Question
            </motion.p>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-gray-500 dark:text-white/30 text-xs mt-2 font-serif italic"
            >
              "Beginning with 'why' before exploring 'how'"
            </motion.p>
          </motion.footer>
        </motion.div>
      </div>
    </motion.div>
  );
}
