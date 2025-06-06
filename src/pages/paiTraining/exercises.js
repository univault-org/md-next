import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getAllExerciseContent } from '@/lib/api';

export default function ExercisesPage({ exerciseContent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Extract unique filter options
  const languages = ['All', ...new Set(exerciseContent.map(ex => ex.language).filter(Boolean))];
  const difficulties = ['All', ...new Set(exerciseContent.map(ex => ex.difficulty).filter(Boolean))];
  const exerciseTypes = ['All', ...new Set(exerciseContent.map(ex => ex.exercise_type).filter(Boolean))];

  // Filter exercises
  const filteredExercises = exerciseContent.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (exercise.tags && exercise.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesLanguage = selectedLanguage === 'All' || exercise.language === selectedLanguage;
    const matchesDifficulty = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'All' || exercise.exercise_type === selectedType;
    
    return matchesSearch && matchesLanguage && matchesDifficulty && matchesType;
  });

  // Group exercises by category/language
  const exercisesByLanguage = {
    Python: filteredExercises.filter(ex => ex.language === 'Python'),
    JavaScript: filteredExercises.filter(ex => ex.language === 'JavaScript'),
    CPlusPlus: filteredExercises.filter(ex => ex.language === 'CPlusPlus'),
    'Multi-Language': filteredExercises.filter(ex => ex.language === 'Multi-Language')
  };

  const pageTitle = 'PAI Training Exercises & Drills | Interactive Coding Practice';
  const metaDescription = 'Master PAI development with interactive exercises, coding drills, and hands-on labs. Practice Python, JavaScript, and C++ with real-world PAI scenarios.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/paiTraining" 
                  className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline mb-4 group">
                  <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
                  Back to PAI Training
                </Link>
                
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                  Exercises & Drills
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl">
                  Interactive workbook-style exercises, coding drills, and hands-on labs for mastering PAI development skills across Python, JavaScript, and C++.
                </p>
              </div>
              
              <div className="hidden lg:block">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {exerciseContent.length}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Interactive Exercises
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Search */}
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Language Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-neutral-400">💻</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-500"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-neutral-400">🎯</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-500"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>

              {/* Exercise Type Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-neutral-400">🔧</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-500"
                >
                  {exerciseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Summary */}
            <div className="mt-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
              <div>
                Showing {filteredExercises.length} of {exerciseContent.length} exercises
              </div>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                  <span className="mr-1">💻</span>
                  Code Completion
                </span>
                <span className="inline-flex items-center px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded">
                  🎨 Whiteboard
                </span>
                <span className="inline-flex items-center px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded">
                  <span className="mr-1">▶️</span>
                  Hands-on Labs
                </span>
              </div>
            </div>
          </div>

          {/* Exercise Categories */}
          {selectedLanguage === 'All' ? (
            <div className="space-y-12">
              {Object.entries(exercisesByLanguage).map(([language, exercises]) => {
                if (exercises.length === 0) return null;
                
                const languageInfo = {
                  Python: { icon: '🐍', color: 'from-green-500 to-emerald-500', bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' },
                  JavaScript: { icon: '⚡', color: 'from-yellow-500 to-orange-500', bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' },
                  CPlusPlus: { icon: '🚀', color: 'from-blue-500 to-indigo-500', bgColor: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' },
                  'Multi-Language': { icon: '🌐', color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' }
                };

                const info = languageInfo[language] || languageInfo['Multi-Language'];

                return (
                  <section key={language} className={`bg-gradient-to-br ${info.bgColor} rounded-2xl p-8`}>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{info.icon}</div>
                        <div>
                          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                            {language.replace('CPlusPlus', 'C++')} Exercises
                          </h2>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} available
                          </p>
                        </div>
                      </div>
                      <div className={`px-4 py-2 bg-gradient-to-r ${info.color} text-white rounded-lg font-medium`}>
                        {exercises.length} exercises
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {exercises.map((exercise, index) => (
                        <motion.div
                          key={exercise.slug}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="group bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500"
                        >
                          {/* Header */}
                          <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
                            <div className="flex items-center justify-between">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                exercise.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                              }`}>
                                {exercise.difficulty}
                              </span>
                              <div className="flex items-center space-x-1 text-primary-500">
                                <span>🎯</span>
                                <span className="text-xs font-medium">{exercise.difficulty_score}/10</span>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                              {exercise.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                              {exercise.description}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                              <div className="flex items-center space-x-2">
                                <span>⏱️</span>
                                <span>{exercise.duration}</span>
                              </div>
                              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded">
                                {exercise.exercise_type}
                              </span>
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {exercise.whiteboard_required && (
                                <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                                  🎨
                                </span>
                              )}
                              {exercise.code_template_provided && (
                                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                  📝
                                </span>
                              )}
                              {exercise.auto_grading && (
                                <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                                  ⚡
                                </span>
                              )}
                            </div>

                            {/* Action */}
                            <Link
                              href={`/paiTraining/Exercises/${exercise.slug}`}
                              className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
                            >
                              Start Exercise
                              <span className="ml-1">▶️</span>
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            /* Single Language View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise, index) => (
                <motion.div
                  key={exercise.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500"
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
          )}

          {/* No Results */}
          {filteredExercises.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl text-neutral-300 dark:text-neutral-600 mx-auto mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                No exercises found
              </h3>
              <p className="text-neutral-500 dark:text-neutral-500 mb-6">
                Try adjusting your search terms or filters to find more exercises.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLanguage('All');
                  setSelectedDifficulty('All');
                  setSelectedType('All');
                }}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const exerciseContent = getAllExerciseContent();
  
  return {
    props: {
      exerciseContent,
    },
  };
} 