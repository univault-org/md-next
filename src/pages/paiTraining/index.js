import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getAllPosts, getAllInspirationContent, getAllResourceContent, getAllExerciseContent, getAllTheoryContent } from "@/lib/api";

const trainingPrograms = [
  {
    id: "foundations",
    title: "Mathematical Foundations Mastery",
    description: "Build the core mathematical muscles needed to train sophisticated AI systems",
    icon: <span className="text-2xl">📐</span>,
    difficulty: "Foundation",
    duration: "8 weeks",
    modules: 6,
    color: "from-blue-500 to-blue-600",
    topics: ["Linear Algebra", "Calculus", "Statistics", "Optimization"],
    progress: 0,
    trainerLevel: "Beginner Trainer",
    analogy: "Like learning anatomy before becoming a fitness trainer",
  },
  {
    id: "signal-processing",
    title: "Signal Processing & FFT Certification",
    description: "Master the art of reading and interpreting AI signals and biosignals",
    icon: <span className="text-2xl">📡</span>,
    difficulty: "Intermediate",
    duration: "6 weeks",
    modules: 5,
    color: "from-purple-500 to-purple-600",
    topics: ["Fourier Transform", "Digital Filters", "Biosignals", "Spectral Analysis"],
    progress: 0,
    trainerLevel: "Specialized Trainer",
    analogy: "Like learning to read heart rate monitors and body signals",
  },
  {
    id: "ai-training",
    title: "Neural Network Training Bootcamp",
    description: "Intensive hands-on training to build and optimize neural networks from scratch",
    icon: <span className="text-2xl">🧠</span>,
    difficulty: "Intermediate",
    duration: "10 weeks",
    modules: 8,
    color: "from-green-500 to-green-600",
    topics: ["Neural Networks", "Backpropagation", "Optimization", "Regularization"],
    progress: 0,
    trainerLevel: "Certified AI Trainer",
    analogy: "Like learning advanced workout programming and periodization",
  },
  {
    id: "convex-optimization",
    title: "Decision Intelligence Mastery",
    description: "Advanced training in optimization techniques for intelligent decision-making",
    icon: <span className="text-2xl">📈</span>,
    difficulty: "Advanced",
    duration: "8 weeks",
    modules: 6,
    color: "from-orange-500 to-orange-600",
    topics: ["Convex Functions", "Lagrange Multipliers", "KKT Conditions", "Interior Point"],
    progress: 0,
    trainerLevel: "Expert Trainer",
    analogy: "Like mastering nutrition science and metabolic optimization",
  },
  {
    id: "personal-ai",
    title: "Personal AI Coaching Certification",
    description: "Complete certification program to train sovereign, privacy-first AI systems",
    icon: <span className="text-2xl">🚀</span>,
    difficulty: "Advanced",
    duration: "12 weeks",
    modules: 10,
    color: "from-red-500 to-red-600",
    topics: ["Fine-tuning", "Privacy", "Edge Computing", "Deployment"],
    progress: 0,
    trainerLevel: "Master AI Coach",
    analogy: "Like becoming a master personal trainer with your own methodology",
  },
  {
    id: "quantum-computing",
    title: "Quantum AI Training Specialization",
    description: "Cutting-edge specialization in quantum algorithms and quantum AI training",
    icon: <span className="text-2xl">⚛️</span>,
    difficulty: "Expert",
    duration: "10 weeks",
    modules: 7,
    color: "from-indigo-500 to-indigo-600",
    topics: ["Quantum Gates", "Quantum Algorithms", "Quantum ML", "Error Correction"],
    progress: 0,
    trainerLevel: "Quantum AI Specialist",
    analogy: "Like specializing in cutting-edge sports science and biohacking",
  },
];

const trainerStats = [
  { label: "Certified AI Trainers", value: "2,847", icon: <span>👤</span> },
  { label: "Training Sessions Completed", value: "15,392", icon: <span>💪</span> },
  { label: "Training Hours Logged", value: "89,234", icon: <span>⏱️</span> },
  { label: "Success Rate", value: "94%", icon: <span>🏆</span> },
];

const trainerLevels = [
  { level: "Foundation", description: "Building core knowledge", color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  { level: "Intermediate", description: "Developing practical skills", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" },
  { level: "Advanced", description: "Mastering complex techniques", color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
  { level: "Expert", description: "Leading-edge specialization", color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
];

export default function PAITraining({ posts, inspirationContent, resourceContent, exerciseContent, theoryContent }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [bookmarkedPrograms, setBookmarkedPrograms] = useState(new Set());

  const difficulties = ["All", "Foundation", "Intermediate", "Advanced", "Expert"];

  const filteredPrograms = trainingPrograms.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === "All" || program.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const toggleBookmark = (programId) => {
    const newBookmarks = new Set(bookmarkedPrograms);
    if (newBookmarks.has(programId)) {
      newBookmarks.delete(programId);
    } else {
      newBookmarks.add(programId);
    }
    setBookmarkedPrograms(newBookmarks);
  };

  const allFeaturedContent = [...inspirationContent, ...resourceContent, ...exerciseContent].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Head>
        <title>Personal AI Trainer Academy - Master the Art of AI Training | Univault</title>
        <meta 
          name="description" 
          content="Join the Personal AI Trainer Academy. Learn to train, optimize, and deploy your own AI systems with expert guidance, comprehensive programs, and hands-on practice. Become a certified Personal AI Trainer." 
        />
        <meta name="keywords" content="personal AI trainer, AI training certification, neural network training, AI coaching, machine learning mastery, AI education" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 via-primary-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                <span className="mr-2">💪</span>
                Personal AI Trainer Academy
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 via-primary-600 to-neutral-800 dark:from-neutral-100 dark:via-primary-400 dark:to-neutral-100 mb-6">
                Train the Trainer
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-4 max-w-4xl mx-auto">
                Master the art and science of training Personal AI systems. Just like fitness trainers help people achieve their physical potential, we help you become an expert AI trainer.
              </p>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8 max-w-3xl mx-auto">
                From mathematical foundations to advanced optimization techniques - develop the skills, mindset, and certification to train sovereign AI systems.
              </p>
            </motion.div>

            {/* Trainer Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
            >
              {trainerStats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center text-primary-500 text-2xl mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#training-programs"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">💪</span>
                Start Your Training Journey
              </Link>
              <Link
                href="/paiTraining/resources"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-100 font-semibold transition-all duration-300 border-2 border-neutral-200 dark:border-neutral-600 hover:border-primary-300 dark:hover:border-primary-500"
              >
                <span className="mr-2">📚</span>
                Explore Training Resources
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trainer Level Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
            Your AI Trainer Journey
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Progress through structured levels, just like in fitness training - from foundation building to expert specialization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4">
          {trainerLevels.map((level, index) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-4 rounded-xl bg-white dark:bg-neutral-800 shadow-lg"
            >
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${level.color}`}>
                {level.level}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {level.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xl">🔍</span>
              <input
                type="text"
                placeholder="Search training programs, techniques, or specializations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full ml-4 mt-1 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="relative ml-2">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xl">🔧</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty} Level
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section id="training-programs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
            Training Programs & Certifications
          </h2>
          <p className="text-xl text-center text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto">
            Comprehensive training programs designed to develop your expertise in Personal AI training, from foundational knowledge to advanced specializations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500"
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 text-primary-500">
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-500 transition-colors">
                        {program.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          program.difficulty === 'Foundation' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                          program.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                          program.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {program.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleBookmark(program.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      bookmarkedPrograms.has(program.id)
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-neutral-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                    }`}
                  >
                    <span className="text-lg">🔖</span>
                  </button>
                </div>

                {/* Trainer Level Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
                    <span className="mr-1">💪</span>
                    {program.trainerLevel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                  {program.description}
                </p>

                {/* Analogy */}
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-4 italic">
                  {program.analogy}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span>⏱️</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>📚</span>
                      <span>{program.modules} modules</span>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {program.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg"
                      >
                        {topic}
                      </span>
                    ))}
                    {program.topics.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg">
                        +{program.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-neutral-600 dark:text-neutral-400">Training Progress</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{program.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${program.color} transition-all duration-300`}
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    href={`/paiTraining/path/${program.id}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    {program.progress > 0 ? (
                      <>
                        <span>▶️</span>
                        Continue Training
                      </>
                    ) : (
                      <>
                        <span className="mr-2">💪</span>
                        Start Training
                      </>
                    )}
                  </Link>
                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium transition-all duration-300"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl text-neutral-300 dark:text-neutral-600 mx-auto mb-4 block">🔍</span>
            <h3 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
              No training programs found
            </h3>
            <p className="text-neutral-500 dark:text-neutral-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </section>

      {/* Programming Languages Curriculum Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-emerald-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              Programming Languages for PAI Development
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
              Master the essential programming trio: C++, Python, and JavaScript/Node.js for building high-performance, scalable Personal AI systems
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* C++ Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-500"
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">C++</h3>
                  <p className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    The Performance Core
                  </p>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center">
                  High-performance computing and real-time processing for PAI systems
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Memory management and optimization</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Hardware integration (GPU, AI chips)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Real-time inference engines</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Harmonic computing implementations</span>
                  </li>
                </ul>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-bold text-blue-500">12</div>
                    <div className="text-neutral-500">Weeks</div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-500">4</div>
                    <div className="text-neutral-500">Projects</div>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-600 dark:text-neutral-400">Advanced</div>
                    <div className="text-neutral-500">Level</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Python Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-green-300 dark:hover:border-green-500"
            >
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">🐍</div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Python</h3>
                  <p className="text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    The AI Workhorse
                  </p>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center">
                  Rapid development and machine learning for PAI applications
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Data processing and analysis</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Neural network training</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Prototyping and experimentation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Integration and orchestration</span>
                  </li>
                </ul>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-bold text-green-500">12</div>
                    <div className="text-neutral-500">Weeks</div>
                  </div>
                  <div>
                    <div className="font-bold text-green-500">4</div>
                    <div className="text-neutral-500">Projects</div>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-600 dark:text-neutral-400">Intermediate</div>
                    <div className="text-neutral-500">Level</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* JavaScript/Node.js Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-yellow-300 dark:hover:border-yellow-500"
            >
              <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-600"></div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">🌐</div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">JavaScript/Node.js</h3>
                  <p className="text-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                    The Universal Interface
                  </p>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center">
                  Web interfaces and edge deployment for PAI systems
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Real-time dashboards and monitoring</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Cross-platform applications</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Edge computing and IoT deployment</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">User-friendly interfaces</span>
                  </li>
                </ul>
                
                {/* Featured JavaScript Articles */}
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <span className="mr-2">📚</span>
                    Featured Articles
                  </h4>
                  <div className="space-y-2">
                    <Link href="/paiTraining/Programming_Language/JavaScript_Node/tanstack-query-architecture-deep-dive" className="block">
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100 transition-colors">
                        • TanStack Query Architecture Patterns
                      </div>
                    </Link>
                    <Link href="/paiTraining/Programming_Language/JavaScript_Node/frontend-memory-management-animation-patterns" className="block">
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100 transition-colors">
                        • Frontend Memory Management & Animations
                      </div>
                    </Link>
                    <Link href="/paiTraining/Programming_Language/JavaScript_Node/tanstack-query-architecture-deep-dive-part2" className="block">
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100 transition-colors">
                        • Advanced TanStack Query Patterns
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-bold text-yellow-500">12</div>
                    <div className="text-neutral-500">Weeks</div>
                  </div>
                  <div>
                    <div className="font-bold text-yellow-500">4</div>
                    <div className="text-neutral-500">Projects</div>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-600 dark:text-neutral-400">Intermediate</div>
                    <div className="text-neutral-500">Level</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Integration Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-100 mb-6">
              Integrated Learning Approach
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 font-bold text-xl mb-4">1</div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Foundations (Weeks 1-4)</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Modern language features and best practices across all three languages</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 font-bold text-xl mb-4">2</div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">PAI Development (Weeks 5-8)</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Apply languages to specific PAI challenges and implementations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 font-bold text-xl mb-4">3</div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Integration (Weeks 9-12)</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Build complete PAI systems using all three languages together</p>
              </div>
            </div>
          </motion.div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/paiTraining/programming-languages"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">💻</span>
              Explore Programming Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Theory Behind Harmonic PAI Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-blue-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
              Theory Behind Harmonic PAI
            </h2>
            
            {/* Core Quote */}
            <div className="max-w-4xl mx-auto mb-8">
              <blockquote className="text-xl md:text-2xl font-medium text-neutral-700 dark:text-neutral-300 italic mb-4">
                "The more you understand the why, the fewer tools you need."
              </blockquote>
              <cite className="text-lg text-neutral-600 dark:text-neutral-400">
                — Anonymous AI researcher
              </cite>
            </div>

            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                "Without theory, you're like someone driving a self-driving car and thinking you're a great driver."
              </p>
              
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                  Understanding theory is not optional — it's what allows you to:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-500">🔧</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Debug models intelligently</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-500">🏗️</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Design new architectures</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-500">🎯</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Interpret AI behavior responsibly</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-500">🚀</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Move from "tool user" to innovator</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Theory Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {theoryContent.slice(0, 6).map((theory, index) => (
              <motion.div
                key={theory.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-500"
              >
                {/* Mathematical Header */}
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-800/20">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                      ∑ Theory
                    </span>
                    <div className="text-indigo-500 text-2xl">
                      {theory.mathematical_notation ? '∫' : '📐'}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-indigo-500 transition-colors">
                    {theory.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                    {theory.description}
                  </p>

                  {/* Prerequisites */}
                  {theory.prerequisites && theory.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">Prerequisites:</p>
                      <div className="flex flex-wrap gap-1">
                        {theory.prerequisites.slice(0, 2).map((prereq) => (
                          <span
                            key={prereq}
                            className="px-2 py-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg"
                          >
                            {prereq}
                          </span>
                        ))}
                        {theory.prerequisites.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg">
                            +{theory.prerequisites.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span>👤</span>
                        <span>{theory.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>⏱️</span>
                        <span>{theory.estimated_time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🎯</span>
                      <span className="font-medium">{theory.difficulty}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {theory.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <Link
                    href={`/paiTraining/Theory/${theory.slug}`}
                    className="inline-flex items-center text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
                  >
                    Study Theory
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Theories Button */}
          <div className="text-center mt-12">
            <Link
              href="/paiTraining/theory"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">∑</span>
              Explore All Theoretical Foundations
            </Link>
          </div>
        </div>
      </section>

      {/* Trainer Resources Section */}
      <section id="trainer-resources" className="bg-white dark:bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              Trainer Resources
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Comprehensive guides, inspiration articles, and hands-on exercises for Personal AI development
            </p>
          </motion.div>

          {/* Resource Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...inspirationContent, ...resourceContent].slice(0, 6).map((resource, index) => (
              <motion.div
                key={resource.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500"
              >
                {/* Header */}
                <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      resource.type === 'Inspiration Article' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {resource.type === 'Inspiration Article' ? '✨ Inspiration' : '📚 Guide'}
                    </span>
                    <div className="text-primary-500">
                      {resource.type === 'Inspiration Article' ? <span>💡</span> : <span>📚</span>}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-primary-500 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span>👤</span>
                        <span>{resource.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>⏱️</span>
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <Link
                    href={`/paiTraining/${resource.type === 'Inspiration Article' ? 'Inspiration' : 'Resources'}/${resource.slug}`}
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors"
                  >
                    Read {resource.type === 'Inspiration Article' ? 'Article' : 'Guide'}
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/paiTraining/resources"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">📚</span>
              Explore All Training Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Exercises and Drills Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              Exercises and Drills
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
              Interactive workbook-style exercises, coding drills, and hands-on labs for mastering PAI development skills
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                <span className="mr-2">💻</span>
                Code Completion Drills
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
                <span className="mr-2">🎯</span>
                Whiteboard Exercises
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
                <span className="mr-2">▶️</span>
                Hands-on Labs
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                <span className="mr-2">🏆</span>
                Project-Based Learning
              </span>
            </div>
          </motion.div>

          {/* Exercise Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-purple-300 dark:hover:border-purple-500"
            >
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">🐍</div>
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Python Fundamentals</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Duck typing, async patterns, and expressive design</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Progress</span>
                    <span className="text-neutral-500">2/5 exercises</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <div className="text-xs text-neutral-500 mb-4">
                  Difficulty: <span className="text-orange-600 font-medium">Intermediate</span> • 
                  Duration: <span className="font-medium">60-90 min each</span>
                </div>

                <Link
                  href="/paiTraining/Exercises/Python/Fundamentals/duck_typing_mastery"
                  className="inline-flex items-center text-purple-500 hover:text-purple-600 font-medium transition-colors"
                >
                  Start Duck Typing Exercise
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-yellow-300 dark:hover:border-yellow-500"
            >
              <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">JavaScript Async</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Promise-based AI communication and real-time UIs</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Progress</span>
                    <span className="text-neutral-500">1/4 exercises</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div className="text-xs text-neutral-500 mb-4">
                  Difficulty: <span className="text-orange-600 font-medium">Intermediate</span> • 
                  Duration: <span className="font-medium">75-90 min each</span>
                </div>

                <Link
                  href="/paiTraining/Exercises/JavaScript/Fundamentals/async_pai_interactions"
                  className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                >
                  Start Async Exercise
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-500"
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">🚀</div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">C++ Performance</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Memory optimization and real-time processing</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Progress</span>
                    <span className="text-neutral-500">0/6 exercises</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>

                <div className="text-xs text-neutral-500 mb-4">
                  Difficulty: <span className="text-red-600 font-medium">Advanced</span> • 
                  Duration: <span className="font-medium">90-120 min each</span>
                </div>

                <div className="inline-flex items-center text-neutral-400 font-medium">
                  Coming Soon
                  <span className="ml-1">⏱️</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Featured Exercises */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {exerciseContent.slice(0, 2).map((exercise, index) => (
              <motion.div
                key={exercise.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500"
              >
                {/* Header */}
                <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                      exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      exercise.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {exercise.exercise_type} • {exercise.difficulty}
                    </span>
                    <div className="flex items-center space-x-2 text-primary-500">
                      <span>💻</span>
                      <span className="text-xs font-medium">{exercise.language}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-primary-500 transition-colors">
                    {exercise.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                    {exercise.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span>⏱️</span>
                        <span>{exercise.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>🎯</span>
                        <span>Score: {exercise.difficulty_score}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exercise.whiteboard_required && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg">
                        🎨 Whiteboard
                      </span>
                    )}
                    {exercise.code_template_provided && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg">
                        📝 Templates
                      </span>
                    )}
                    {exercise.auto_grading && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                        ⚡ Auto-Graded
                      </span>
                    )}
                  </div>

                  {/* Action */}
                  <Link
                    href={`/paiTraining/Exercises/${exercise.slug}`}
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors"
                  >
                    Start Exercise
                    <span className="ml-1">▶️</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Exercise Stats */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-500 mb-2">{exerciseContent.length}</div>
                <div className="text-neutral-600 dark:text-neutral-400">Total Exercises</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-500 mb-2">3</div>
                <div className="text-neutral-600 dark:text-neutral-400">Programming Languages</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500 mb-2">4</div>
                <div className="text-neutral-600 dark:text-neutral-400">Exercise Types</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-2">∞</div>
                <div className="text-neutral-600 dark:text-neutral-400">Practice Opportunities</div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              href="/paiTraining/exercises"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">🏆</span>
              Explore All Exercises & Drills
            </Link>
          </div>
        </div>
      </section>

      {/* Program Preview Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 text-primary-500">
                      {selectedProgram.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                        {selectedProgram.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProgram.difficulty === 'Foundation' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                          selectedProgram.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                          selectedProgram.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {selectedProgram.difficulty}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
                          <span className="mr-1">💪</span>
                          {selectedProgram.trainerLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <span className="text-xl rotate-90">→</span>
                  </button>
                </div>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {selectedProgram.description}
                </p>

                {/* Analogy */}
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6">
                  <p className="text-primary-700 dark:text-primary-300 italic">
                    <strong>Training Analogy:</strong> {selectedProgram.analogy}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                    <span>⏱️</span>
                    <span>{selectedProgram.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                    <span>📚</span>
                    <span>{selectedProgram.modules} training modules</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                    What you'll master:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProgram.topics.map((topic) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <span className="text-primary-500 flex-shrink-0">✓</span>
                        <span className="text-neutral-700 dark:text-neutral-300">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link
                    href={`/paiTraining/path/${selectedProgram.id}`}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-all duration-300"
                  >
                    <span className="mr-2">💪</span>
                    Begin Training Program
                  </Link>
                  <button
                    onClick={() => toggleBookmark(selectedProgram.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      bookmarkedPrograms.has(selectedProgram.id)
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                    }`}
                  >
                    <span className="mr-2">🔖</span>
                    {bookmarkedPrograms.has(selectedProgram.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  const inspirationContent = getAllInspirationContent();
  const resourceContent = getAllResourceContent();
  const exerciseContent = getAllExerciseContent();
  const theoryContent = getAllTheoryContent();
  
  return {
    props: {
      posts,
      inspirationContent,
      resourceContent,
      exerciseContent,
      theoryContent,
    },
  };
} 