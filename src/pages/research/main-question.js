import { useState, useEffect, useRef } from "react";
import { MDXRemote } from "next-mdx-remote";
import { motion, AnimatePresence } from "framer-motion";
import { BiPlay, BiPause, BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import {
  RiRobot2Line,
  RiBrainLine,
  RiArrowDownLine,
  RiArrowUpLine,
  RiCloseLine,
  RiFullscreenLine,
  RiFullscreenExitLine,
  RiCheckboxBlankLine,
  RiCheckboxFill,
} from "react-icons/ri";

export default function MainQuestion({ source, frontmatter }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 1, title: "ChatGPT's Perspective" },
    { id: 2, title: "Claude's Perspective" },
    { id: 3, title: "Claude's View" },
    { id: 4, title: "Comparison" },
    { id: 5, title: "Synthesis" },
  ];

  // Handle escape key to close expanded view
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      // Lock body and html scroll
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.touchAction = "none"; // Prevent mobile scrolling
  
      // Enable scroll on content container
      if (contentRef.current) {
        contentRef.current.style.overflowY = "auto";
        contentRef.current.style.height = "calc(100vh - 7rem)"; // Account for header
        contentRef.current.style.touchAction = "pan-y"; // Enable vertical touch scrolling
  
        // Handle scroll events for progress bar
        const handleScroll = () => {
          const container = contentRef.current;
          const progress = container.scrollTop / (container.scrollHeight - container.clientHeight);
          setScrollProgress(Math.min(Math.max(progress, 0), 1));
        };
  
        contentRef.current.addEventListener("scroll", handleScroll);
        return () => {
          if (contentRef.current) {
            contentRef.current.removeEventListener("scroll", handleScroll);
          }
          // Reset all scroll locks
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          document.body.style.height = "";
          document.body.style.touchAction = "";
        };
      }
    } else {
      // Reset everything when closed
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      
      if (contentRef.current) {
        contentRef.current.style.overflowY = "hidden";
        contentRef.current.style.height = "auto";
        contentRef.current.style.touchAction = "";
      }
    }
  }, [isExpanded]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await fullscreenContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const answers = {
    chatgpt: {
      summary:
        "Inner peace and enlightenment - a state that enables all other fulfillments to naturally follow.",
      content: {
        title: "The Ultimate Human Wish: A Path to Complete Fulfillment",
        introduction:
          "The concept of an 'ultimate wish' that could fulfill all others leads us to examine the fundamental nature of human satisfaction and contentment. Through careful analysis, we find that inner peace and enlightenment emerge as powerful candidates for such a wish, as they create the foundation from which all other forms of fulfillment can naturally arise.",
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
      summary: "To fully understand and realize one's true nature.",
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
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex flex-col items-center justify-center
        bg-gray-50 dark:bg-neutral-900
        ${isExpanded ? 'h-screen overflow-hidden' : ''}`} // Lock main container when expanded
    >
      <div className="w-full max-w-5xl">
        <motion.div
          className={`
    backdrop-blur-sm 
    rounded-lg 
    shadow-2xl
    transition-all duration-300
   ${
     isExpanded
       ? "fixed top-20 left-0 right-0 bottom-0 z-50 bg-white/98 dark:bg-neutral-900/98"
       : "bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/20"
   }
  `}
        >
          {/* Step Navigation - Replacing old RIIF controls */}
          <div className="py-6 border-b border-gray-200 dark:border-white/20">
            <div className="flex flex-col items-center gap-4">
              {/* Step Title */}
              <p className="text-gray-600 dark:text-white/60 text-sm font-medium">
                {activeAnswer
                  ? `${steps[activeAnswer === "chatgpt" ? 0 : 1].title}`
                  : ""}
              </p>

              {/* Step Dots */}
              <div className="flex items-center gap-3">
                {steps.map((step, index) => (
                  <motion.button
                    key={step.id}
                    onClick={() =>
                      setActiveAnswer(index === 0 ? "chatgpt" : "claude")
                    }
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
          (index === 0 && activeAnswer === "chatgpt") ||
          (index === 1 && activeAnswer === "claude")
            ? "bg-primary-500 border-primary-400 text-white" // Active state (same for both themes)
            : "bg-white hover:bg-gray-50 border-gray-200 text-gray-600 " + // Light mode
              "dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300" // Dark mode
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
            index === 0 && activeAnswer === "chatgpt"
              ? "bg-primary-500" // Active state (same for both themes)
              : "bg-gray-200 dark:bg-neutral-600" // Inactive state
          }
        `}
                      />
                    )}

                    {/* Tooltip */}
                    <div
                      className="
        absolute -bottom-8 left-1/2 -translate-x-1/2 
        whitespace-nowrap px-2 py-1 text-xs rounded
        bg-white dark:bg-neutral-800
        text-gray-700 dark:text-gray-200
        border border-gray-100 dark:border-neutral-700
        shadow-lg
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-200
      "
                    >
                      {step.title}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <motion.div className="px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 pb-10">
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
                  What is the ultimate wish for a person—one wish that, if
                  granted, would fulfill all others?
                </p>
              </div>
            </div>

            {/* Answer Display */}
            <AnimatePresence mode="wait">
              {activeAnswer && (
                <motion.div
                  ref={fullscreenContainerRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`relative mt-10 ${
                    isFullscreen ? "bg-white dark:bg-neutral-900" : ""
                  }`}
                >
                  {/* Preview Card */}
                  <div
                    className={`rounded-lg transition-all duration-300 ${
                      isExpanded
                        ? "fixed inset-0 z-50 bg-white dark:bg-neutral-900 min-h-screen"
                        : "bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 min-h-[400px]"
                    }`}
                  >
                    {/* Scrollable Content Container */}
                    <div
                      ref={contentRef}
                      className={`transition-all duration-300 ${
                        isExpanded
                          ? "h-[calc(100vh-7rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
                          : "max-w-4xl mx-auto p-6"
                      }`}
                    >
                      {/* Content Wrapper */}
                      <div
                        className={`
            relative max-w-7xl mx-auto 
            ${isExpanded ? "px-6 lg:px-12 py-8 pb-[10rem]" : ""}
          `}
                      >
                        {/* Controls for Expanded View */}
                        {isExpanded && (
                          <div className="fixed top-0 right-4 flex items-center gap-2 z-50">
                            {/* Fullscreen Toggle */}
                            <button
                              onClick={toggleFullscreen}
                              className="p-2 rounded-full 
                  bg-gray-100 hover:bg-gray-200 text-gray-600
                  dark:bg-white/10 dark:hover:bg-white/20 dark:text-white/80
                  transition-colors duration-200"
                            >
                              {isFullscreen ? (
                                <RiFullscreenExitLine className="w-6 h-6" />
                              ) : (
                                <RiFullscreenLine className="w-6 h-6" />
                              )}
                            </button>

                            {/* Close Button */}
                            <button
                              onClick={() => {
                                if (isFullscreen) {
                                  document.exitFullscreen();
                                }
                                setIsExpanded(false);
                              }}
                              className="p-2 rounded-full 
                  bg-gray-100 hover:bg-gray-200 text-gray-600
                  dark:bg-white/10 dark:hover:bg-white/20 dark:text-white/80
                  transition-colors duration-200"
                            >
                              <RiCloseLine className="w-6 h-6" />
                            </button>
                          </div>
                        )}

                        {/* Content Header with adjusted spacing */}
                        <div
                          className={`mb-6 ${isFullscreen ? "pt-16" : "pl-10"}`}
                        >
                          <h3 className="text-2xl lg:text-3xl font-serif text-gray-800 dark:text-white/90 mb-2">
                            {answers[activeAnswer].summary}
                          </h3>
                          <p className="text-gray-500 dark:text-white/60 text-sm lg:text-base">
                            Source: {answers[activeAnswer].source}
                          </p>
                        </div>

                        {/* Detailed Content with min-height */}
                        <div
                          className={`
      prose prose-lg lg:prose-xl max-w-none
      p-8 lg:p-12
      prose-headings:text-gray-800 dark:prose-headings:text-white/90
      prose-p:text-gray-700 dark:prose-p:text-white/80
      prose-li:text-gray-600 dark:prose-li:text-white/70
      bg-white/70 dark:bg-black/70
      rounded-lg
      ${
        isExpanded
          ? "min-h-[70vh] flex flex-col" // Taller content area
          : "max-h-[200px] overflow-hidden relative"
      }
    `}
                        >
                          {/* Introduction */}
                          <p className="text-xl text-gray-700 dark:text-white/80">
                            {answers[activeAnswer].content.introduction}
                          </p>

                          {/* Sections */}
                          {isExpanded &&
                            answers[activeAnswer].content.sections.map(
                              (section, index) => (
                                <section key={index} className="mt-12">
                                  <h3
                                    className="text-2xl font-semibold mb-4 
        text-gray-800 dark:text-white/90"
                                  >
                                    {section.title}
                                  </h3>
                                  <p className="mb-4 text-gray-700 dark:text-white/80">
                                    {section.description}
                                  </p>
                                  <ul className="space-y-3">
                                    {section.points.map((point, idx) => (
                                      <li
                                        key={idx}
                                        className="text-gray-600 dark:text-white/70"
                                      >
                                        {point}
                                      </li>
                                    ))}
                                  </ul>
                                </section>
                              )
                            )}

                          {/* Conclusion */}
                          {isExpanded && (
                            <div className="mt-12 border-t border-gray-200 dark:border-white/10 pt-8">
                              <p className="text-lg italic text-gray-600 dark:text-white/70">
                                {answers[activeAnswer].content.conclusion}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Gradient Overlay */}
                        {!isExpanded && (
                          <div
                            className="absolute bottom-0 left-0 right-0 h-32 
    bg-gradient-to-t from-white dark:from-neutral-900 to-transparent"
                          />
                        )}

                        {/* Read More Button */}
                        <button
                          onClick={() => setIsExpanded(!isExpanded)}
                          className={`
    flex items-center gap-2 px-4 py-2 rounded-full
    transition-all duration-200 shadow-lg z-10
    ${
      isExpanded
        ? "fixed bottom-8 right-8 z-60 bg-primary-500 hover:bg-primary-600 text-white"
        : "absolute bottom-4 left-1/2 -translate-x-1/2 " +
          "bg-gray-100 hover:bg-gray-200 text-gray-700 " +
          "dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
    }
  `}
                        >
                          {isExpanded ? (
                            <>
                              <RiArrowUpLine className="w-5 h-5" />
                              Close
                            </>
                          ) : (
                            <>
                              <RiArrowDownLine className="w-5 h-5" />
                              Read Full Analysis
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

                  {/* Floating Controls for Fullscreen */}
                  {isFullscreen && !isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="fixed bottom-8 right-8 flex items-center gap-4"
                    >
                      <button
                        onClick={toggleFullscreen}
                        className="p-3 rounded-full 
        bg-white hover:bg-gray-50 text-gray-700
        dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-white
        shadow-lg transition-colors duration-200
        ring-1 ring-gray-200 dark:ring-0"
                      >
                        <RiFullscreenExitLine className="w-6 h-6" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Progress Indicator */}
          <div className="w-full h-1 bg-gray-100 dark:bg-white/10">
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentSlide + 1) * 20}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
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
