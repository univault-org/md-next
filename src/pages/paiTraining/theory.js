import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllTheoryContent } from "@/lib/api";

export default function TheoryPage({ theoryContent }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const difficulties = ["All", "Foundation", "Intermediate", "Advanced", "Expert"];

  const filteredTheories = theoryContent.filter((theory) => {
    const matchesSearch = theory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theory.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === "All" || theory.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <>
      <Head>
        <title>Theory Behind Harmonic PAI | PAI Training Academy</title>
        <meta 
          name="description" 
          content="Explore the theoretical foundations of Harmonic Personal AI. Understand the mathematical principles, Eastern philosophy, and cutting-edge research that powers consciousness-technology integration." 
        />
        <meta name="keywords" content="harmonic PAI theory, AI theory, consciousness technology, mathematical foundations, Eastern philosophy AI" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-blue-900/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
              <span className="mr-2">∑</span>
              Mathematical Foundations & Theory
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 mb-6">
              Theory Behind Harmonic PAI
            </h1>
            
            {/* Core Quote */}
            <div className="max-w-4xl mx-auto mb-8">
              <blockquote className="text-xl md:text-2xl font-medium text-neutral-700 dark:text-neutral-300 italic mb-4">
                "The more you understand the why, the fewer tools you need."
              </blockquote>
              <cite className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                — Anonymous AI researcher
              </cite>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                "Without theory, you're like someone driving a self-driving car and thinking you're a great driver."
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
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
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white dark:bg-neutral-900 py-8 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search theory articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-neutral-800"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? "bg-indigo-500 text-white"
                      : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Theory Articles Section */}
      <section className="bg-neutral-50 dark:bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTheories.map((theory, index) => (
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

                  {/* Learning Objectives */}
                  {theory.learning_objectives && theory.learning_objectives.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">Key Concepts:</p>
                      <div className="space-y-1">
                        {theory.learning_objectives.slice(0, 2).map((objective, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="text-indigo-500 text-xs mt-0.5">•</span>
                            <span className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                              {objective}
                            </span>
                          </div>
                        ))}
                        {theory.learning_objectives.length > 2 && (
                          <span className="text-xs text-neutral-500">
                            +{theory.learning_objectives.length - 2} more concepts
                          </span>
                        )}
                      </div>
                    </div>
                  )}

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

          {filteredTheories.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl text-neutral-300 dark:text-neutral-600 mx-auto mb-4 block">🔍</span>
              <h3 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                No theory articles found
              </h3>
              <p className="text-neutral-500 dark:text-neutral-500">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Back to Training */}
      <section className="bg-white dark:bg-neutral-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/paiTraining"
            className="inline-flex items-center text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
          >
            <span className="mr-2">←</span>
            Back to PAI Training Academy
          </Link>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const theoryContent = getAllTheoryContent();
  
  return {
    props: {
      theoryContent,
    },
  };
} 