import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiBook,
  BiVideo,
  BiCode,
  BiPlay,
  BiTime,
  BiUser,
  BiStar,
  BiChevronRight,
  BiSearch,
  BiMessage,
  BiX,
  BiSend,
} from "react-icons/bi";

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
    icon: <BiBook className="text-2xl" />,
    color: "from-blue-500 to-blue-600",
    count: 47,
  },
  {
    id: "tutorials",
    title: "Interactive Tutorials", 
    description: "Step-by-step hands-on learning experiences",
    icon: <BiCode className="text-2xl" />,
    color: "from-green-500 to-green-600",
    count: 156,
  },
  {
    id: "videos",
    title: "Video Library",
    description: "Lectures, demonstrations, and expert interviews", 
    icon: <BiVideo className="text-2xl" />,
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
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                  Learning Resources
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
                Discover comprehensive training materials and courses to master Personal AI training
              </p>
              
              {/* AI Assistant Toggle */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <BiMessage className="mr-2 text-xl" />
                Ask AI Learning Assistant
              </motion.button>
            </motion.div>
          </div>
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
                        <BiMessage className="text-xl" />
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
                      <BiX className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* AI Chat Area */}
                <div className="p-6 max-h-96 overflow-y-auto">
                  {aiResponse && (
                    <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <BiMessage className="text-primary-500 mt-1" />
                        <p className="text-neutral-700 dark:text-neutral-300">{aiResponse}</p>
                      </div>
                    </div>
                  )}
                  
                  {isAITyping && (
                    <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <BiMessage className="text-primary-500" />
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
                      <BiSend />
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
                <BiSearch className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search courses, tutorials, research papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full ml-4 mt-1 pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                      {category.icon}
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
                  <BiChevronRight className="text-neutral-400 group-hover:text-primary-500 transition-colors" />
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
                  
                  {/* Play Button for Videos */}
                  {resource.type.includes('Video') && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <BiPlay className="text-2xl text-primary-500 ml-1" />
                      </div>
                    </div>
                  )}
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
                        <BiUser />
                        <span>{resource.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BiTime />
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BiStar className="text-yellow-500" />
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
                        <BiTime />
                        <span>{path.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BiBook />
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

        {/* Coming Soon Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              More Features Coming Soon
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              We're working on adding more interactive features, AI assistance, and comprehensive learning paths.
            </p>
            <Link
              href="/paiTraining"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-all duration-300"
            >
              <BiChevronRight className="mr-2 transform rotate-180" />
              Back to PAI Training
            </Link>
          </div>
        </section>
      </div>
    </>
  );
} 