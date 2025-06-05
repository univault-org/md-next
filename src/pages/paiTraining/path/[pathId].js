import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BiChevronLeft,
  BiPlay,
  BiPause,
  BiCircle,
  BiTime,
  BiBook,
  BiUser,
  BiAward,
  BiTarget,
  BiLightbulb,
  BiCode,
  BiMath,
  BiHeart,
  BiTrendingUp,
  BiRocket,
  BiHome,
  BiCheck
} from "react-icons/bi";
import TutorialReader from "@/components/learning/TutorialReader";
import { getPAITrainingBySlug } from "@/lib/api";

// Icon mapping function
const getIcon = (iconName) => {
  return <div className="w-6 h-6 bg-blue-500 rounded"></div>;
};

const getSectionTypeIcon = (type) => {
  return <div className="w-4 h-4 bg-gray-500 rounded"></div>;
};

const getSectionTypeColor = (type) => {
  switch (type) {
    case 'reading':
      return 'text-blue-500';
    case 'video':
      return 'text-red-500';
    case 'interactive':
      return 'text-yellow-500';
    case 'coding':
      return 'text-green-500';
    case 'exercise':
      return 'text-purple-500';
    case 'mathematical':
      return 'text-indigo-500';
    case 'case-study':
      return 'text-orange-500';
    default:
      return 'text-neutral-500';
  }
};

// Learning path data (in a real app, this would come from a CMS or database)
const learningPathsData = {
  foundations: {
    id: "foundations",
    title: "Mathematical Foundations Mastery",
    description: "Build the core mathematical muscles needed to train sophisticated AI systems",
    iconName: "★",
    difficulty: "Foundation",
    duration: "8 weeks",
    modules: 6,
    color: "from-blue-500 to-blue-600",
    topics: ["Linear Algebra", "Calculus", "Statistics", "Optimization"],
    trainerLevel: "Beginner Trainer",
    analogy: "Like learning anatomy before becoming a fitness trainer",
    sections: [
      {
        id: "mindset",
        title: "The Personal AI Trainer's Mindset",
        duration: "45 min",
        type: "reading",
        content: "trainer_mindset_guide",
        completed: false,
      },
      {
        id: "intro",
        title: "Introduction to Mathematical Foundations",
        duration: "45 min",
        type: "reading",
        content: "sample_tutorial",
        completed: false,
      },
      {
        id: "linear-algebra",
        title: "Linear Algebra for AI Trainers",
        duration: "60 min",
        type: "interactive",
        content: null,
        completed: false,
      },
      {
        id: "calculus",
        title: "Calculus and Optimization Fundamentals",
        duration: "50 min",
        type: "video",
        content: null,
        completed: false,
      },
      {
        id: "statistics",
        title: "Statistics for AI Training",
        duration: "55 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "practice",
        title: "Mathematical Foundation Practice",
        duration: "90 min",
        type: "exercises",
        content: null,
        completed: false,
      },
    ],
  },
  "signal-processing": {
    id: "signal-processing",
    title: "Signal Processing & FFT Certification",
    description: "Master the art of reading and interpreting AI signals and biosignals",
    iconName: "★",
    difficulty: "Intermediate",
    duration: "6 weeks",
    modules: 5,
    color: "from-purple-500 to-purple-600",
    topics: ["Fourier Transform", "Digital Filters", "Biosignals", "Spectral Analysis"],
    trainerLevel: "Specialized Trainer",
    analogy: "Like learning to read heart rate monitors and body signals",
    sections: [
      {
        id: "intro",
        title: "Understanding Signals in AI Training",
        duration: "40 min",
        type: "reading",
        content: null,
        completed: false,
      },
      {
        id: "fft",
        title: "Fast Fourier Transform Mastery",
        duration: "60 min",
        type: "interactive",
        content: null,
        completed: false,
      },
      {
        id: "biosignals",
        title: "Reading Biosignals for Personal AI",
        duration: "50 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "filters",
        title: "Digital Signal Filtering Techniques",
        duration: "45 min",
        type: "video",
        content: null,
        completed: false,
      },
      {
        id: "project",
        title: "Signal Processing Certification Project",
        duration: "120 min",
        type: "exercises",
        content: null,
        completed: false,
      },
    ],
  },
  "ai-training": {
    id: "ai-training",
    title: "Neural Network Training Bootcamp",
    description: "Intensive hands-on training to build and optimize neural networks from scratch",
    iconName: "★",
    difficulty: "Intermediate",
    duration: "10 weeks",
    modules: 8,
    color: "from-green-500 to-green-600",
    topics: ["Neural Networks", "Backpropagation", "Optimization", "Regularization"],
    trainerLevel: "Certified AI Trainer",
    analogy: "Like learning advanced workout programming and periodization",
    sections: [
      {
        id: "neural-basics",
        title: "Neural Network Training Fundamentals",
        duration: "50 min",
        type: "reading",
        content: null,
        completed: false,
      },
      {
        id: "backprop",
        title: "Mastering Backpropagation",
        duration: "70 min",
        type: "interactive",
        content: null,
        completed: false,
      },
      {
        id: "optimization",
        title: "Training Optimization Techniques",
        duration: "60 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "regularization",
        title: "Preventing Overfitting in AI Training",
        duration: "45 min",
        type: "video",
        content: null,
        completed: false,
      },
      {
        id: "architectures",
        title: "Designing Neural Architectures",
        duration: "65 min",
        type: "interactive",
        content: null,
        completed: false,
      },
      {
        id: "personal-ai",
        title: "Training Your First Personal AI",
        duration: "90 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "evaluation",
        title: "Evaluating AI Training Success",
        duration: "40 min",
        type: "reading",
        content: null,
        completed: false,
      },
      {
        id: "bootcamp-project",
        title: "Neural Network Bootcamp Final Project",
        duration: "180 min",
        type: "exercises",
        content: null,
        completed: false,
      },
    ],
  },
  "convex-optimization": {
    id: "convex-optimization",
    title: "Decision Intelligence Mastery",
    description: "Advanced training in optimization techniques for intelligent decision-making",
    iconName: "★",
    difficulty: "Advanced",
    duration: "8 weeks",
    modules: 6,
    color: "from-orange-500 to-orange-600",
    topics: ["Convex Functions", "Lagrange Multipliers", "KKT Conditions", "Interior Point"],
    trainerLevel: "Expert Trainer",
    analogy: "Like mastering nutrition science and metabolic optimization",
    sections: [
      {
        id: "convex-intro",
        title: "Introduction to Convex Optimization",
        duration: "60 min",
        type: "reading",
        content: "convex_optimization_intro",
        completed: false,
      },
      {
        id: "lagrange",
        title: "Lagrange Multipliers for AI Trainers",
        duration: "70 min",
        type: "interactive",
        content: null,
        completed: false,
      },
      {
        id: "kkt",
        title: "KKT Conditions in Practice",
        duration: "55 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "interior-point",
        title: "Interior Point Methods",
        duration: "65 min",
        type: "video",
        content: null,
        completed: false,
      },
      {
        id: "decision-ai",
        title: "Building Decision-Making AI Systems",
        duration: "80 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "mastery-project",
        title: "Decision Intelligence Mastery Project",
        duration: "150 min",
        type: "exercises",
        content: null,
        completed: false,
      },
    ],
  },
  "personal-ai": {
    id: "personal-ai",
    title: "Personal AI Coaching Certification",
    description: "Complete certification program to train sovereign, privacy-first AI systems",
    iconName: "★",
    difficulty: "Advanced",
    duration: "12 weeks",
    modules: 10,
    color: "from-red-500 to-red-600",
    topics: ["Fine-tuning", "Privacy", "Edge Computing", "Deployment"],
    trainerLevel: "Master AI Coach",
    analogy: "Like becoming a master personal trainer with your own methodology",
    sections: [
      {
        id: "coaching-philosophy",
        title: "Personal AI Coaching Philosophy",
        duration: "50 min",
        type: "reading",
        content: null,
        completed: false,
      },
      {
        id: "privacy-training",
        title: "Privacy-Preserving AI Training",
        duration: "75 min",
        type: "interactive",
        content: null,
        completed: false,
      },
      {
        id: "fine-tuning",
        title: "Advanced Fine-tuning Techniques",
        duration: "90 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "edge-deployment",
        title: "Edge Computing for Personal AI",
        duration: "60 min",
        type: "video",
        content: null,
        completed: false,
      },
      {
        id: "personalization",
        title: "Deep Personalization Strategies",
        duration: "70 min",
        type: "interactive",
        content: null,
        completed: false,
      },
      {
        id: "ethics-practice",
        title: "Ethical AI Training in Practice",
        duration: "45 min",
        type: "reading",
        content: null,
        completed: false,
      },
      {
        id: "monitoring",
        title: "Monitoring and Maintaining Personal AI",
        duration: "55 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "scaling",
        title: "Scaling Personal AI Training",
        duration: "65 min",
        type: "video",
        content: null,
        completed: false,
      },
      {
        id: "certification-prep",
        title: "Certification Preparation",
        duration: "40 min",
        type: "reading",
        content: null,
        completed: false,
      },
      {
        id: "final-certification",
        title: "Master AI Coach Certification Project",
        duration: "240 min",
        type: "exercises",
        content: null,
        completed: false,
      },
    ],
  },
  "quantum-computing": {
    id: "quantum-computing",
    title: "Quantum AI Training Specialization",
    description: "Cutting-edge specialization in quantum algorithms and quantum AI training",
    iconName: "★",
    difficulty: "Expert",
    duration: "10 weeks",
    modules: 7,
    color: "from-indigo-500 to-indigo-600",
    topics: ["Quantum Gates", "Quantum Algorithms", "Quantum ML", "Error Correction"],
    trainerLevel: "Quantum AI Specialist",
    analogy: "Like specializing in cutting-edge sports science and biohacking",
    sections: [
      {
        id: "quantum-intro",
        title: "Quantum Computing for AI Trainers",
        duration: "60 min",
        type: "reading",
        content: null,
        completed: false,
      },
      {
        id: "quantum-gates",
        title: "Quantum Gates and Circuits",
        duration: "70 min",
        type: "interactive",
        content: null,
        completed: false,
      },
      {
        id: "quantum-algorithms",
        title: "Quantum Algorithms Fundamentals",
        duration: "80 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "quantum-ml",
        title: "Quantum Machine Learning",
        duration: "90 min",
        type: "video",
        content: null,
        completed: false,
      },
      {
        id: "error-correction",
        title: "Quantum Error Correction",
        duration: "75 min",
        type: "interactive",
        content: null,
        completed: false,
      },
      {
        id: "quantum-ai-training",
        title: "Training AI on Quantum Systems",
        duration: "100 min",
        type: "coding",
        content: null,
        completed: false,
      },
      {
        id: "specialization-project",
        title: "Quantum AI Specialization Project",
        duration: "200 min",
        type: "exercises",
        content: null,
        completed: false,
      },
    ],
  },
};

export default function LearningPath({ pathData, contentData }) {
  const router = useRouter();
  const { pathId } = router.query;
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathData?.sections) {
      const completed = pathData.sections.filter(section => section.completed).length;
      setProgress((completed / pathData.sections.length) * 100);
    }
  }, [pathData]);

  const handleSectionComplete = (sectionIndex) => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(sectionIndex);
    setCompletedSections(newCompleted);
    
    // Auto-advance to next section
    if (sectionIndex < pathData.sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    }
    
    // Update progress
    setProgress((newCompleted.size / pathData.sections.length) * 100);
  };

  const handleSectionClick = (sectionIndex) => {
    setCurrentSection(sectionIndex);
  };

  if (!pathData) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            Learning Path Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The learning path you're looking for doesn't exist.
          </p>
          <Link
            href="/paiTraining"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            <BiChevronLeft className="mr-2" />
            Back to Training
          </Link>
        </div>
      </div>
    );
  }

  const currentSectionData = pathData.sections[currentSection];

  return (
    <>
      <Head>
        <title>{pathData.title} - PAI Training | Univault</title>
        <meta name="description" content={pathData.description} />
      </Head>

      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <Link
                href="/paiTraining"
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <BiChevronLeft />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-primary-500">
                  {getIcon(pathData.iconName)}
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                    {pathData.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pathData.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      pathData.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {pathData.difficulty}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-neutral-400 rounded"></div>
                      <span>{pathData.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Progress */}
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Progress: {Math.round(progress)}%
                </span>
                <div className="w-32 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${pathData.color} transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Section counter */}
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {currentSection + 1} of {pathData.sections.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
                <div className="w-4 h-4 bg-primary-500 rounded mr-2"></div>
                Course Sections
              </h3>
              
              <div className="space-y-3">
                {pathData.sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      index === currentSection
                        ? 'bg-primary-100 dark:bg-primary-900/20 border-l-4 border-primary-500'
                        : completedSections.has(index)
                        ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
                        : 'bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {completedSections.has(index) ? (
                          <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                        ) : index === currentSection ? (
                          <div className="w-5 h-5 bg-primary-500 rounded-full"></div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-neutral-400 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm mb-1 ${
                          index === currentSection
                            ? 'text-primary-700 dark:text-primary-300'
                            : completedSections.has(index)
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-neutral-600 dark:text-neutral-400'
                        }`}>
                          {section.title}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-neutral-500 dark:text-neutral-500">
                          <div className={`flex items-center space-x-1 ${getSectionTypeColor(section.type)}`}>
                            {getSectionTypeIcon(section.type)}
                            <span className="capitalize">{section.type}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-neutral-400 rounded"></div>
                            <span>{section.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Overall Progress */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-600 dark:text-neutral-400">Overall Progress</span>
                  <span className="text-neutral-600 dark:text-neutral-400">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${pathData.color} transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {currentSectionData?.content && contentData ? (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 md:p-12">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                    {currentSectionData.title}
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Content for this section is available.
                  </p>
                  <div className="text-left max-w-4xl mx-auto">
                    <div className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded text-sm overflow-auto">
                      {contentData && contentData.source && typeof contentData.source === 'string' 
                        ? contentData.source.substring(0, 500) + "..." 
                        : "Content available - Click 'Mark as Complete' to continue"
                      }
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 md:p-12">
                <div className="text-center">
                  {/* Section Header */}
                  <div className="mb-8">
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 mb-4`}>
                      <div className={getSectionTypeColor(currentSectionData.type)}>
                        {getSectionTypeIcon(currentSectionData.type)}
                      </div>
                      <span className="text-sm font-medium capitalize">{currentSectionData.type}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                      {currentSectionData.title}
                    </h1>
                    <div className="flex items-center justify-center space-x-4 text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-neutral-400 rounded"></div>
                        <span>{currentSectionData.duration}</span>
                      </div>
                      <span>•</span>
                      <span>Section {currentSection + 1} of {pathData.sections.length}</span>
                    </div>
                  </div>

                  {/* Coming Soon Message */}
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-neutral-400 rounded"></div>
                    </div>
                    <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                      Content Coming Soon
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      This section is currently being developed. Check back soon for comprehensive content on {currentSectionData.title.toLowerCase()}.
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => handleSectionComplete(currentSection)}
                        className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                      >
                        Mark as Complete
                      </button>
                      {currentSection < pathData.sections.length - 1 && (
                        <button
                          onClick={() => setCurrentSection(currentSection + 1)}
                          className="px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
                        >
                          Skip to Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(learningPathsData).map((pathId) => ({
    params: { pathId },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { pathId } = params;
  const pathData = learningPathsData[pathId];

  if (!pathData) {
    return {
      notFound: true,
    };
  }

  // Get content for the current section if it exists
  let contentData = null;
  const currentSection = pathData.sections[0]; // Default to first section
  
  if (currentSection?.content) {
    try {
      contentData = await getPAITrainingBySlug(currentSection.content);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

  return {
    props: {
      pathData,
      contentData,
    },
  };
} 