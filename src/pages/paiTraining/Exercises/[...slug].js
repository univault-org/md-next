import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { getAllExerciseSlugs, getExerciseBySlug } from '@/lib/api';
import Link from 'next/link';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import WhiteboardButton from '@/components/WhiteboardButton';
import CodeEditor from '@/components/learning/CodeEditor';

// Enhanced Interactive Code Editor Component using our new CodeEditor
const InteractiveCodeEditor = ({ 
  template, 
  language = 'javascript', 
  expectedOutput,
  hints = [],
  onCodeChange, 
  onRunCode,
  ...props 
}) => {
  return (
    <div className="my-8">
      <CodeEditor
        initialCode={template || `// ${language} code here\nconsole.log("Hello, PAI World!");`}
        language={language}
        expectedOutput={expectedOutput}
        hints={hints}
        onCodeChange={onCodeChange}
        onCodeRun={onRunCode}
        height="400px"
        className="shadow-lg"
        {...props}
      />
    </div>
  );
};

// Exercise Progress Tracker
const ExerciseProgress = ({ 
  currentStep, 
  totalSteps, 
  completedExercises, 
  totalExercises,
  timeSpent 
}) => {
  const progressPercentage = (completedExercises / totalExercises) * 100;
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
      <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
        <span className="mr-2 text-primary-500">🎯</span>
        Exercise Progress
      </h3>
      
      <div className="space-y-4">
        {/* Overall Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-600 dark:text-neutral-400">Overall Progress</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-100">
              {completedExercises}/{totalExercises} exercises
            </span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Current Step */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-600 dark:text-neutral-400">Current Exercise</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-100">
              Step {currentStep}/{totalSteps}
            </span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Time Spent */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-neutral-600 dark:text-neutral-400">
            <span className="mr-1">⏱️</span>
            Time Spent
          </div>
          <span className="font-medium text-neutral-800 dark:text-neutral-100">
            {timeSpent} minutes
          </span>
        </div>
      </div>
    </div>
  );
};

// Exercise Assessment Component  
const ExerciseAssessment = ({ 
  exerciseData, 
  userCode, 
  completionStatus,
  onSubmitAssessment 
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate assessment processing
    setTimeout(() => {
      const assessment = {
        answers: selectedAnswers,
        feedback: feedback,
        completionTime: Date.now(),
        code: userCode
      };
      
      onSubmitAssessment(assessment);
      setIsSubmitting(false);
    }, 1000);
  };

  const assessmentQuestions = [
    {
      id: 1,
      question: "How confident do you feel about the concepts covered?",
      options: ["Very confident", "Somewhat confident", "Need more practice", "Confused"]
    },
    {
      id: 2,
      question: "Which part was most challenging?",
      options: ["Theory understanding", "Code implementation", "Debugging", "Connecting concepts"]
    },
    {
      id: 3,
      question: "How would you rate the exercise difficulty?",
      options: ["Too easy", "Just right", "Challenging but fair", "Too difficult"]
    }
  ];

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
      <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
        <span className="mr-2 text-primary-500">📝</span>
        Exercise Assessment
      </h3>
      
      <div className="space-y-6">
        {assessmentQuestions.map((question) => (
          <div key={question.id}>
            <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-3">
              {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <label 
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700 p-2 rounded"
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    onChange={(e) => setSelectedAnswers(prev => ({
                      ...prev,
                      [question.id]: e.target.value
                    }))}
                    className="text-primary-500"
                  />
                  <span className="text-neutral-600 dark:text-neutral-400">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        
        <div>
          <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Additional feedback or questions:
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about this exercise..."
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows="4"
          />
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white rounded-lg transition-colors font-medium"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
        </button>
      </div>
    </div>
  );
};

// Enhanced Code Block Component
const EnhancedCodeBlock = ({ children, language, isTemplate = false, onFillIn }) => {
  const { theme: activeTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      if (!text || typeof text !== 'string') {
        console.warn('No valid text to copy');
        return;
      }
      
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-HTTPS contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Handle case where children might be an object with props (MDX structure)
  const getCodeString = () => {
    if (typeof children === 'string') {
      return children;
    }
    if (children?.props?.children) {
      return children.props.children;
    }
    if (children && typeof children === 'object' && children.toString) {
      return children.toString();
    }
    return String(children || '');
  };

  // Get language with fallback
  const getLanguage = () => {
    if (language) return language;
    if (children?.props?.className) {
      const match = children.props.className.match(/language-(\w+)/);
      return match ? match[1] : 'text';
    }
    return 'text';
  };

  const codeString = getCodeString().trim();
  const codeLanguage = getLanguage();

  if (!codeString) {
    return (
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
        <span className="text-neutral-500">No code to display</span>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {isTemplate && (
          <button
            onClick={() => onFillIn?.(codeString)}
            className="px-2 py-1 bg-primary-500 hover:bg-primary-600 text-white text-xs rounded transition-colors"
          >
            Fill Template
          </button>
        )}
        <button
          onClick={() => copyToClipboard(codeString)}
          className="px-2 py-1 bg-neutral-600 hover:bg-neutral-700 text-white text-xs rounded transition-colors"
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      
      <Highlight
        theme={activeTheme === 'dark' ? themes.vsDark : themes.vsLight}
        code={codeString}
        language={codeLanguage}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} overflow-x-auto p-4 rounded-lg text-sm`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mr-4 text-neutral-500 select-none">
                  {String(i + 1).padStart(2, ' ')}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

// Main Exercise Page Component
export default function ExercisePage({ source, frontmatter }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedExercises, setCompletedExercises] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  // Update time spent every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 60000));
    }, 60000);
    
    return () => clearInterval(interval);
  }, [startTime]);

  const pageTitle = `${frontmatter.title} | PAI Training Exercises`;
  const metaDescription = frontmatter.description || `Interactive PAI exercise: ${frontmatter.title}`;

  const mdxComponents = {
    code: (props) => {
      // Handle inline code vs code blocks
      if (props.className) {
        // This is a code block with language info
        const match = props.className.match(/language-(\w+)/);
        const language = match ? match[1] : 'text';
        return <EnhancedCodeBlock {...props} language={language} />;
      }
      // This is inline code
      return <code {...props} className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm" />;
    },
    pre: (props) => {
      // Handle pre tags that wrap code blocks
      const codeElement = props.children;
      if (codeElement?.props?.className) {
        const match = codeElement.props.className.match(/language-(\w+)/);
        const language = match ? match[1] : 'text';
        return <EnhancedCodeBlock {...codeElement.props} language={language} />;
      }
      return <EnhancedCodeBlock {...props} language="text" />;
    },
    InteractiveCodeEditor,
    ExerciseProgress: () => (
      <ExerciseProgress
        currentStep={currentStep}
        totalSteps={5}
        completedExercises={completedExercises}
        totalExercises={10}
        timeSpent={timeSpent}
      />
    ),
    ExerciseAssessment: () => (
      <ExerciseAssessment
        exerciseData={frontmatter}
        onSubmitAssessment={(assessment) => {
          console.log('Assessment submitted:', assessment);
          setCompletedExercises(prev => prev + 1);
        }}
      />
    )
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
        {/* Exercise Header */}
        <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/paiTraining#trainer-resources" 
                  className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline mb-4 group">
                  <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
                  Back to PAI Training
                </Link>
                
                <div className="flex items-center space-x-4 mb-2">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-lg">
                    {frontmatter.exercise_type}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-lg ${
                    frontmatter.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                    frontmatter.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    frontmatter.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {frontmatter.difficulty}
                  </span>
                  <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="mr-1">⏱️</span>
                    {frontmatter.duration}
                  </span>
                  {frontmatter.whiteboard_required && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium rounded-lg">
                      🎨 Whiteboard Required
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                  {frontmatter.title}
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">
                  {frontmatter.description}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                  💾 Save Progress
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-neutral dark:prose-invert max-w-none">
                <MDXRemote {...source} components={mdxComponents} />
              </article>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <ExerciseProgress
                currentStep={currentStep}
                totalSteps={5}
                completedExercises={completedExercises}
                totalExercises={10}
                timeSpent={timeSpent}
              />
              
              {/* Exercise Info */}
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
                  <span className="mr-2 text-primary-500">📚</span>
                  Exercise Details
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Language:</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-100">
                      {frontmatter.language}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Difficulty Score:</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-100">
                      {frontmatter.difficulty_score}/10
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Estimated Time:</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-100">
                      {frontmatter.estimated_completion}
                    </span>
                  </div>
                  
                  {frontmatter.series && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Series:</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-100">
                        Part {frontmatter.series_part}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Learning Objectives */}
                {frontmatter.learning_objectives && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <h4 className="font-medium text-neutral-800 dark:text-neutral-100 mb-2">
                      Learning Objectives:
                    </h4>
                    <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                      {frontmatter.learning_objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-1 mt-0.5 text-primary-500 flex-shrink-0">🎯</span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Whiteboard Button */}
        <WhiteboardButton whiteboardRequired={frontmatter.whiteboard_required} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllExerciseSlugs();
  
  return {
    paths: slugs.map((slug) => ({
      params: { slug: slug.split('/') }
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join('/');
  const exercise = await getExerciseBySlug(slug);
  
  if (!exercise) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      source: exercise.source,
      frontmatter: exercise.frontmatter,
    },
  };
} 