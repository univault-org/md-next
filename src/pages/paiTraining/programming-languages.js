import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProgrammingLanguageContent, getProgrammingLanguageContentByLanguage } from '@/lib/api';
import {
  RiCodeLine,
  RiSpeedLine,
  RiGlobalLine,
  RiBookOpenLine,
  RiPlayCircleLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiGroupLine,
  RiStarLine,
  RiArrowRightLine,
  RiDownloadLine,
  RiExternalLinkLine
} from 'react-icons/ri';

const programmingLanguages = [
  {
    id: 'cpp',
    name: 'C++',
    icon: '🚀',
    tagline: 'The Performance Core',
    description: 'High-performance computing and real-time processing for PAI systems',
    color: 'from-blue-500 to-indigo-600',
    features: [
      'Memory management and optimization',
      'Hardware integration (GPU, specialized AI chips)',
      'Real-time inference engines',
      'Harmonic computing implementations'
    ],
    weeks: 12,
    difficulty: 'Advanced',
    projects: 4,
    path: '/PAI_Training/Programming_Language/CPlusPlus'
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    tagline: 'The AI Workhorse',
    description: 'Rapid development and machine learning for PAI applications',
    color: 'from-green-500 to-emerald-600',
    features: [
      'Data processing and analysis',
      'Neural network training',
      'Prototyping and experimentation',
      'Integration and orchestration'
    ],
    weeks: 12,
    difficulty: 'Intermediate',
    projects: 4,
    path: '/PAI_Training/Programming_Language/Python'
  },
  {
    id: 'javascript',
    name: 'JavaScript/Node.js',
    icon: '🌐',
    tagline: 'The Universal Interface',
    description: 'Web interfaces and edge deployment for PAI systems',
    color: 'from-yellow-500 to-orange-600',
    features: [
      'Real-time dashboards and monitoring',
      'Cross-platform applications',
      'Edge computing and IoT deployment',
      'User-friendly interfaces'
    ],
    weeks: 12,
    difficulty: 'Intermediate',
    projects: 4,
    path: '/PAI_Training/Programming_Language/JavaScript_Node'
  }
];

const learningPhases = [
  {
    phase: 1,
    title: 'Foundations',
    weeks: '1-4',
    description: 'Modern language features and best practices',
    topics: [
      'Modern language features and best practices',
      'Memory management and performance optimization',
      'Async programming and concurrency patterns',
      'Type systems and error handling'
    ]
  },
  {
    phase: 2,
    title: 'PAI-Specific Development',
    weeks: '5-8',
    description: 'Apply languages to PAI challenges',
    topics: [
      'Data processing pipelines',
      'Neural network implementations',
      'Real-time communication systems',
      'Performance optimization techniques'
    ]
  },
  {
    phase: 3,
    title: 'Integration Projects',
    weeks: '9-12',
    description: 'Build complete PAI systems',
    topics: [
      'Multi-language PAI applications',
      'Performance-critical C++ cores',
      'Python ML pipelines',
      'JavaScript user interfaces'
    ]
  }
];

const weeklyStructure = [
  { week: 1, cpp: 'Modern C++17/20', python: 'Type Hints & Features', js: 'ES2022+ & TypeScript', project: 'PAI Config System' },
  { week: 2, cpp: 'Smart Pointers & RAII', python: 'Async Programming', js: 'Promise Patterns', project: 'Data Pipeline' },
  { week: 3, cpp: 'Move Semantics', python: 'Data Classes', js: 'Modules & Bundling', project: 'Model Interface' },
  { week: 4, cpp: 'Memory Management', python: 'NumPy & Pandas', js: 'Express.js APIs', project: 'Training Monitor' },
  { week: 5, cpp: 'Concurrent Programming', python: 'PyTorch Basics', js: 'WebSockets', project: 'Real-time System' },
  { week: 6, cpp: 'Cache Optimization', python: 'Data Visualization', js: 'React Dashboards', project: 'Monitoring UI' }
];

export default function ProgrammingLanguages({ programmingContent, javascriptContent }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [activePhase, setActivePhase] = useState(0);

  return (
    <>
      <Head>
        <title>Programming Languages for PAI Development | PAI Training Academy</title>
        <meta name="description" content="Master C++, Python, and JavaScript/Node.js for Personal AI development. Comprehensive curriculum for building high-performance PAI systems." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-blue-900/20 dark:to-purple-900/20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">
                Programming Languages for PAI
              </h1>
              <p className="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-300 mb-8">
                Master the Perfect Trio: C++, Python & JavaScript
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <RiTimeLine className="text-primary-500" />
                  <span>12 Weeks Each</span>
                </div>
                <div className="flex items-center gap-2">
                  <RiCodeLine className="text-primary-500" />
                  <span>36 Total Weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <RiGroupLine className="text-primary-500" />
                  <span>Integration Projects</span>
                </div>
              </div>
            </motion.div>

            {/* Language Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {programmingLanguages.map((lang, index) => (
                <motion.div
                  key={lang.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedLanguage(selectedLanguage === lang.id ? null : lang.id)}
                >
                  <div className={`
                    relative p-8 rounded-2xl border-2 transition-all duration-300
                    ${selectedLanguage === lang.id 
                      ? 'border-primary-400 shadow-2xl scale-105' 
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 hover:shadow-xl'
                    }
                    bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm
                  `}>
                    {/* Language Header */}
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">{lang.icon}</div>
                      <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                        {lang.name}
                      </h3>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${lang.color} bg-clip-text text-transparent`}>
                        {lang.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center">
                      {lang.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary-500">{lang.weeks}</div>
                        <div className="text-sm text-neutral-500">Weeks</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary-500">{lang.projects}</div>
                        <div className="text-sm text-neutral-500">Projects</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">{lang.difficulty}</div>
                        <div className="text-sm text-neutral-500">Level</div>
                      </div>
                    </div>

                    {/* Features */}
                    <AnimatePresence>
                      {selectedLanguage === lang.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-neutral-200 dark:border-neutral-700 pt-6"
                        >
                          <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Key Focus Areas:</h4>
                          <ul className="space-y-2">
                            {lang.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <RiCheckboxCircleLine className="text-primary-500 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-6 flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm font-medium">
                              Start Learning
                            </button>
                            <button className="px-4 py-2 border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors text-sm font-medium">
                              View Curriculum
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* JavaScript Articles Section */}
        {javascriptContent && javascriptContent.length > 0 && (
          <section className="py-16 bg-white/50 dark:bg-neutral-800/50">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                  🌐 JavaScript/Node.js Articles
                </h2>
                <p className="text-xl text-neutral-600 dark:text-neutral-400">
                  Deep dive into modern JavaScript patterns and architectures
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {javascriptContent.map((article, index) => (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/paiTraining/Programming_Language/JavaScript_Node/${article.slug}`}>
                      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500 h-full">
                        {/* Header */}
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 border-b border-neutral-200 dark:border-neutral-700">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">🌐</span>
                              <span className="font-semibold text-yellow-600 dark:text-yellow-400">JavaScript</span>
                            </div>
                            {article.difficulty && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-xs font-medium rounded">
                                {article.difficulty}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-500 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                            {article.description}
                          </p>

                          {/* Learning Objectives Preview */}
                          {article.learning_objectives && article.learning_objectives.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Learning Objectives:</h4>
                              <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                                {article.learning_objectives.slice(0, 2).map((objective, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="text-primary-500 mr-2 mt-0.5">•</span>
                                    <span className="line-clamp-1">{objective}</span>
                                  </li>
                                ))}
                                {article.learning_objectives.length > 2 && (
                                  <li className="text-primary-500 text-xs">
                                    +{article.learning_objectives.length - 2} more objectives
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}

                          {/* Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {article.tags.length > 3 && (
                                <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 rounded">
                                  +{article.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                              {article.date && (
                                <span>{new Date(article.date).toLocaleDateString()}</span>
                              )}
                            </div>
                            <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                              <span className="text-sm">Read Article</span>
                              <RiArrowRightLine className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Learning Phases */}
        <section className="py-16 bg-white/50 dark:bg-neutral-800/50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                Integrated Learning Approach
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                Three phases of progressive skill development across all languages
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {learningPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300
                    ${activePhase === index 
                      ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-xl' 
                      : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-lg'
                    }
                  `}
                  onClick={() => setActivePhase(index)}
                >
                  <div className="text-center mb-6">
                    <div className={`
                      w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold mb-4
                      ${activePhase === index 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }
                    `}>
                      {phase.phase}
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                      Phase {phase.phase}
                    </h3>
                    <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                      {phase.title}
                    </p>
                    <p className="text-sm text-neutral-500">Weeks {phase.weeks}</p>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center">
                    {phase.description}
                  </p>

                  <ul className="space-y-2">
                    {phase.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <RiStarLine className="text-primary-500 mt-0.5 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly Structure Preview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                Weekly Structure Preview
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                See how the three languages integrate week by week
              </p>
            </motion.div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 dark:bg-neutral-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600 dark:text-neutral-300">Week</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600 dark:text-neutral-300">C++ Focus</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600 dark:text-neutral-300">Python Focus</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600 dark:text-neutral-300">JavaScript Focus</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600 dark:text-neutral-300">Integration Project</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyStructure.map((week, index) => (
                      <tr key={week.week} className={index % 2 === 0 ? 'bg-neutral-25 dark:bg-neutral-750' : ''}>
                        <td className="px-6 py-4 text-sm font-medium text-neutral-800 dark:text-neutral-200">{week.week}</td>
                        <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">{week.cpp}</td>
                        <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">{week.python}</td>
                        <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">{week.js}</td>
                        <td className="px-6 py-4 text-sm font-medium text-primary-600 dark:text-primary-400">{week.project}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Master PAI Programming?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of developers building the future of Personal AI
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/paiTraining" className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                  Start Your Journey
                </Link>
                <button className="px-8 py-4 border-2 border-white rounded-lg font-semibold bg-white hover:bg-blue-50 hover:text-gray-600 text-primary-600 transition-colors shadow-lg">
                  Download Curriculum
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    // Get all programming language content
    const programmingContent = getAllProgrammingLanguageContent();
    
    // Get JavaScript-specific content
    const javascriptContent = getProgrammingLanguageContentByLanguage('JavaScript_Node');
    
    return {
      props: {
        programmingContent,
        javascriptContent,
      },
    };
  } catch (error) {
    console.error('Error loading programming language content:', error);
    return {
      props: {
        programmingContent: [],
        javascriptContent: [],
      },
    };
  }
} 