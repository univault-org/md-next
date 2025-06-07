import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Featured Resources
const featuredResources = [
  {
    id: 1,
    title: "Complete Guide to Personal AI Training",
    description: "Comprehensive 12-hour course covering everything from basics to advanced techniques",
    type: "Course",
    category: "courses",
    difficulty: "Intermediate",
    duration: "12 hours",
    rating: 4.9,
    students: 2847,
    instructor: "Dr. Sarah Chen",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
    tags: ["AI Training", "Neural Networks", "Personal AI", "Certification"],
  },
  {
    id: 2,
    title: "Mathematical Foundations for AI Trainers",
    description: "Essential mathematics every AI trainer needs to know",
    type: "Tutorial Series",
    category: "tutorials",
    difficulty: "Foundation",
    duration: "8 hours",
    rating: 4.8,
    students: 1923,
    instructor: "Prof. Michael Rodriguez",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80",
    tags: ["Mathematics", "Linear Algebra", "Calculus", "Statistics"],
  },
  {
    id: 3,
    title: "Quantum AI Training Masterclass",
    description: "Advanced techniques for quantum-enhanced AI training",
    type: "Masterclass",
    category: "videos",
    difficulty: "Expert",
    duration: "6 hours",
    rating: 4.9,
    students: 567,
    instructor: "Dr. Elena Vasquez",
    image: "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Quantum Computing", "Advanced AI", "Research", "Innovation"],
  },
];

// AI Assistant Responses (simulated)
const aiResponses = {
  "getting started": "I'd recommend starting with our 'Mathematical Foundations for AI Trainers' course. It covers linear algebra, calculus, and statistics - the essential building blocks. After that, move to 'Introduction to Personal AI Training' to understand the core concepts.",
  "advanced techniques": "For advanced techniques, check out our 'Quantum AI Training Masterclass' and 'Convex Optimization for AI' courses. These cover cutting-edge methods used by expert trainers.",
  "certification": "We offer several certification paths: Foundation (6 weeks), Advanced (12 weeks), and Expert (24 weeks). Each includes hands-on projects and peer review. Which level interests you?",
  "mathematics": "Our math curriculum covers Linear Algebra, Calculus, Statistics, and Optimization. Start with 'Mathematical Foundations' - it's designed specifically for AI trainers and includes practical applications.",
  "quantum ai": "Quantum AI is our most advanced specialization. Prerequisites include completion of Advanced AI Training path and strong mathematics background. The program covers quantum algorithms, quantum machine learning, and quantum-classical hybrid systems."
};

// Learning Paths
const learningPaths = [
  {
    id: "beginner",
    title: "AI Trainer Foundations",
    description: "Start your journey as a Personal AI trainer",
    duration: "3-4 months",
    courses: 6,
    difficulty: "Beginner",
    color: "from-green-400 to-green-600",
    progress: 0,
    steps: [
      "Mathematical Foundations",
      "Introduction to AI",
      "Basic Training Techniques",
      "Ethics & Privacy",
      "Hands-on Practice",
      "Foundation Certification"
    ]
  },
  {
    id: "intermediate",
    title: "Advanced AI Training",
    description: "Master sophisticated training techniques",
    duration: "4-6 months",
    courses: 8,
    difficulty: "Intermediate",
    color: "from-blue-400 to-blue-600",
    progress: 0,
    steps: [
      "Advanced Mathematics",
      "Neural Network Architecture",
      "Optimization Techniques",
      "Signal Processing",
      "Model Fine-tuning",
      "Performance Analysis",
      "Real-world Projects",
      "Advanced Certification"
    ]
  },
  {
    id: "expert",
    title: "AI Research & Innovation",
    description: "Lead cutting-edge AI research and development",
    duration: "6-12 months",
    courses: 12,
    difficulty: "Expert",
    color: "from-purple-400 to-purple-600",
    progress: 0,
    steps: [
      "Research Methodology",
      "Quantum AI Foundations",
      "Novel Architectures",
      "Publication Writing",
      "Conference Presentations",
      "Industry Collaboration",
      "Innovation Projects",
      "Research Leadership"
    ]
  }
];

// Simple resource categories
const resourceCategories = [
  {
    id: "courses",
    title: "Courses & Programs",
    description: "Structured learning paths and certification programs",
    icon: "📚",
    color: "from-blue-500 to-blue-600",
    count: 47,
  },
  {
    id: "tutorials",
    title: "Interactive Tutorials", 
    description: "Step-by-step hands-on learning experiences",
    icon: "💻",
    color: "from-green-500 to-green-600",
    count: 156,
  },
  {
    id: "videos",
    title: "Video Library",
    description: "Lectures, demonstrations, and expert interviews", 
    icon: "📹",
    color: "from-purple-500 to-purple-600",
    count: 234,
  },
];

export default function LearningResources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);

  // Refs
  const aiInputRef = useRef(null);

  // Filter options
  const difficulties = ["all", "Foundation", "Intermediate", "Expert"];

  // Filter Resources
  const filteredResources = featuredResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // AI Assistant Functions
  const handleAIQuery = async (query) => {
    if (!query.trim()) return;
    
    setIsAITyping(true);
    setAiResponse("");
    
    // Simulate AI processing delay
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let response = "I'd be happy to help you find the right learning resources! ";
      
      // Simple keyword matching for demo
      if (lowerQuery.includes("start") || lowerQuery.includes("begin")) {
        response += aiResponses["getting started"];
      } else if (lowerQuery.includes("advanced") || lowerQuery.includes("expert")) {
        response += aiResponses["advanced techniques"];
      } else if (lowerQuery.includes("certificate") || lowerQuery.includes("certification")) {
        response += aiResponses["certification"];
      } else if (lowerQuery.includes("math") || lowerQuery.includes("mathematics")) {
        response += aiResponses["mathematics"];
      } else if (lowerQuery.includes("quantum")) {
        response += aiResponses["quantum ai"];
      } else {
        response += "Could you be more specific about what you're looking for? I can help with course recommendations, learning paths, prerequisites, or specific topics like mathematics, quantum AI, or certification programs.";
      }
      
      setAiResponse(response);
      setIsAITyping(false);
    }, 1500);
    
    setAiQuery("");
  };

  return (
    <>
      <Head>
        <title>Learning Resources - PAI Training Academy | Univault</title>
        <meta 
          name="description" 
          content="Comprehensive learning resources for Personal AI training." 
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-900 dark:via-blue-900/10 dark:to-purple-900/10">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-950 dark:via-neutral-900 dark:to-secondary-950">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5 bg-cover bg-center"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  PAI Training Resources
                </span>
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                Comprehensive resources, tutorials, and research materials for developing 
                your Personal AI understanding and implementation skills.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/northStar">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg cursor-pointer transition-colors"
                  >
                    🌟 Start with the Core Question
                  </motion.div>
                </Link>
                <Link href="#featured-foundation">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 px-6 py-3 rounded-xl font-semibold shadow-lg cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  >
                    📚 Foundation Articles
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Foundation Article */}
        <section id="featured-foundation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              🌟 Featured Foundation Article
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Essential reading that establishes the philosophical and practical foundation for Harmonic PAI development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Link href="/paiTraining/Resources/harmonic_pai_foundation">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/20 dark:via-neutral-800 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-50"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 blur-xl"></div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-30 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-400 to-primary-400 blur-xl"></div>
                </div>

                <div className="relative p-8 lg:p-12">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                          🧠 Foundation
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">
                          ⚡ Harmonic PAI
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
                          🔬 Philosophy
                        </span>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        The Foundation of Harmonic PAI: Transcending the Brain's Illusion Machine
                      </h3>
                      
                      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                        Exploring how Harmonic Personal AI augments human limitations by recognizing the brain as an illusion creator and connecting with the body's quantum intelligence. By Philip Tran.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                          <span className="text-primary-500">🎯</span>
                          <span className="text-sm">Core Concepts</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                          <span className="text-secondary-500">⏱️</span>
                          <span className="text-sm">15-20 min read</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                          <span className="text-accent-500">🔗</span>
                          <span className="text-sm">Links to North Star</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {["Brain as Illusion Creator", "Body as Quantum Computer", "Harmonic Integration", "Universal Intelligence"].map((concept, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="ml-6 flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
                        🧬
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-sm font-bold">
                          PT
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Philip Tran</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">Founder & Researcher</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                      <span>Read Foundation Article</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Connection to North Star */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              This foundation article directly connects to our exploration of the ultimate human question:
            </p>
            <Link href="/northStar">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all cursor-pointer shadow-lg hover:shadow-xl">
                <span>🌟</span>
                <span>Discover the Ultimate Human Question</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </section>

        {/* AI Assistant Panel */}
        <AnimatePresence>
          {showAIAssistant && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl mx-4"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                {/* AI Header */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-xl">🤖</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">AI Learning Assistant</h3>
                        <p className="text-sm opacity-90">Ask me about courses, paths, or topics</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAIAssistant(false)}
                      className="p-2 bg-white/20 hover:bg-white/40 rounded-lg transition-colors"
                    >
                      <span className="text-xl">✕</span>
                    </button>
                  </div>
                </div>

                {/* AI Chat Area */}
                <div className="p-6 max-h-96 overflow-y-auto">
                  {aiResponse && (
                    <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <span className="text-primary-500 mt-1">🤖</span>
                        <p className="text-neutral-700 dark:text-neutral-300">{aiResponse}</p>
                      </div>
                    </div>
                  )}
                  
                  {isAITyping && (
                    <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <span className="text-primary-500">🤖</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Input */}
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex space-x-3">
                    <input
                      ref={aiInputRef}
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAIQuery(aiQuery)}
                      placeholder="Ask about courses, learning paths, prerequisites..."
                      className="flex-1 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={() => handleAIQuery(aiQuery)}
                      disabled={!aiQuery.trim() || isAITyping}
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-300 dark:disabled:bg-neutral-600 text-white rounded-xl transition-colors"
                    >
                      <span>📤</span>
                    </button>
                  </div>
                  
                  {/* Quick Suggestions */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Getting started", "Advanced techniques", "Certification paths", "Mathematics prep"].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleAIQuery(suggestion)}
                        className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-600 dark:text-neutral-400 rounded-lg transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xl">🔍</span>
                <input
                  type="text"
                  placeholder="Search courses, tutorials, research papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3 ml-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Categories</option>
                  {resourceCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>
                      {diff === "all" ? "All Levels" : diff}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              Explore by Category
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Discover learning resources organized by type and expertise level
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedCategory(category.id)}
                className="group cursor-pointer bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className={`h-1 bg-gradient-to-r ${category.color} rounded-full mb-4`}></div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 text-primary-500 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-500 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {category.count} resources
                      </p>
                    </div>
                  </div>
                  <span className="text-neutral-400 group-hover:text-primary-500 transition-colors">→</span>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Resources */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              Featured Resources
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Hand-picked premium content from our expert instructors and industry leaders
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-lg"
              >
                {/* Resource Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Resource Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-lg mb-2">
                      {resource.type}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-500 transition-colors">
                      {resource.title}
                    </h3>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {resource.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span>👤</span>
                        <span>{resource.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>⏱️</span>
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>★</span>
                      <span>{resource.rating}</span>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      resource.difficulty === 'Foundation' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {resource.difficulty}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Play Button for Videos */}
                  {resource.type.includes('Video') && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl text-primary-500">▶️</span>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button className="w-full px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors">
                    {resource.type.includes('Course') ? 'Enroll Now' : 'Start Learning'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Learning Paths Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              Guided Learning Paths
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Structured pathways to guide your learning journey from beginner to expert
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-lg"
              >
                {/* Path Header */}
                <div className={`h-32 bg-gradient-to-br ${path.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                    <p className="text-sm opacity-90">{path.description}</p>
                  </div>
                </div>

                {/* Path Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center space-x-1">
                        <span>⏱️</span>
                        <span>{path.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>📚</span>
                        <span>{path.courses} courses</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      path.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {path.difficulty}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Progress</span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">{path.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${path.color} transition-all duration-300`}
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Steps Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">Learning Steps</h4>
                    <div className="space-y-2">
                      {path.steps.slice(0, 4).map((step, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
                          <span className="text-neutral-600 dark:text-neutral-400">{step}</span>
                        </div>
                      ))}
                      {path.steps.length > 4 && (
                        <div className="text-sm text-primary-500 font-medium">
                          +{path.steps.length - 4} more steps
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-300">
                    Start Learning Path
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interactive Exercises & Drills Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              Interactive Exercises & Drills
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Hands-on coding exercises with real execution capabilities. Practice C++, JavaScript, and Python with instant feedback and guided learning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* C++ Memory Management Exercise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-xl"
            >
              {/* Header with Language Icon */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🚀</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">C++</span>
                  </div>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-xs font-medium rounded">
                    Advanced
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-500 transition-colors">
                  Memory Management Patterns
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                  Master RAII, smart pointers, and custom allocators used in high-performance systems like llama.cpp
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <span>⏱️</span>
                      <span>45-60 min</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>💻</span>
                      <span>3 Exercises</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">RAII</span>
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Smart Pointers</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Performance</span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-600 dark:text-neutral-400">RAII Memory Mapper</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-600 dark:text-neutral-400">Smart Pointer Tensor System</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-600 dark:text-neutral-400">Memory Pool Allocator</span>
                  </div>
                </div>

                <Link
                  href="/paiTraining/Exercises/CPlusPlus/Advanced/memory_management_patterns"
                  className="block w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors text-center"
                >
                  Start C++ Exercise
                </Link>
              </div>
            </motion.div>

            {/* JavaScript Callback Patterns Exercise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-xl"
            >
              {/* Header with Language Icon */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">⚡</span>
                    <span className="font-semibold text-yellow-600 dark:text-yellow-400">JavaScript</span>
                  </div>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-xs font-medium rounded">
                    Advanced
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-500 transition-colors">
                  Callback Patterns & Future Events
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                  Master event anticipation, async patterns, and resilient callback chains for robust applications
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <span>⏱️</span>
                      <span>45-60 min</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>💻</span>
                      <span>3 Exercises</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded">Async</span>
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Events</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Reactive</span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-600 dark:text-neutral-400">Event Anticipation Patterns</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-600 dark:text-neutral-400">Resilient Callback Chains</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-600 dark:text-neutral-400">Event Stream Processing</span>
                  </div>
                </div>

                <Link
                  href="/paiTraining/Exercises/JavaScript/Advanced/callback_patterns_future_events"
                  className="block w-full px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-colors text-center"
                >
                  Start JavaScript Exercise
                </Link>
              </div>
            </motion.div>

            {/* All Exercises Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl overflow-hidden border border-primary-200 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-xl flex flex-col justify-center items-center text-center p-8"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                Explore All Exercises
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Access our complete collection of interactive coding exercises across Python, JavaScript, and C++
              </p>
              
              <div className="grid grid-cols-2 gap-4 w-full mb-6 text-sm">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
                  <div className="font-semibold text-green-600 dark:text-green-400">🐍 Python</div>
                  <div className="text-neutral-500 dark:text-neutral-400">7 exercises</div>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
                  <div className="font-semibold text-yellow-600 dark:text-yellow-400">⚡ JavaScript</div>
                  <div className="text-neutral-500 dark:text-neutral-400">2 exercises</div>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">🚀 C++</div>
                  <div className="text-neutral-500 dark:text-neutral-400">1 exercise</div>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
                  <div className="font-semibold text-primary-600 dark:text-primary-400">✨ Total</div>
                  <div className="text-neutral-500 dark:text-neutral-400">11 exercises</div>
                </div>
              </div>

              <Link
                href="/paiTraining/exercises"
                className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 group-hover:scale-105"
              >
                View All Exercises
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Features Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-neutral-800 dark:text-neutral-100">
              Interactive Code Execution Features
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">▶️</span>
                </div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Real Execution</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Run JavaScript, Python, and C++ code with real output
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">💡</span>
                </div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Smart Hints</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Progressive hints to guide your learning journey
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">✅</span>
                </div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Auto Validation</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Automatic checking against expected outputs
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">🎨</span>
                </div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Monaco Editor</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  VS Code-quality editing experience
                </p>
              </div>
            </div>
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/paiTraining"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 font-semibold transition-all duration-300"
            >
              <span className="mr-2">←</span>
              Back to PAI Training
            </Link>
          </div>
        </section>
      </div>
    </>
  );
} 