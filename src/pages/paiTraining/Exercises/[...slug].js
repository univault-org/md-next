import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { getAllExerciseSlugs, getExerciseBySlug } from '@/lib/api';
import Link from 'next/link';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';

// Interactive Code Editor Component
const InteractiveCodeEditor = ({ template, language, onCodeChange, onRunCode }) => {
  const [code, setCode] = useState(template || '');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const { theme: activeTheme } = useTheme();

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput('Code executed successfully!\n\nOutput:\nHello, PAI World!');
      setIsRunning(false);
      onRunCode?.(code);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
        <div className="flex items-center space-x-2">
          <span className="text-primary-500">💻</span>
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            Interactive {language} Editor
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCode(template)}
            className="px-3 py-1 text-sm bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded transition-colors"
          >
            <span className="inline mr-1">🔄</span>
            Reset
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-4 py-1 text-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white rounded transition-colors"
          >
            {isRunning ? (
              <>
                <span className="inline mr-1">⏹️</span>
                Running...
              </>
            ) : (
              <>
                <span className="inline mr-1">▶️</span>
                Run Code
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-0">
        {/* Code Input */}
        <div className="border-r border-neutral-200 dark:border-neutral-700">
          <div className="p-2 bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Code Editor
          </div>
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 resize-none focus:outline-none"
            placeholder="Write your PAI code here..."
          />
        </div>
        
        {/* Output */}
        <div>
          <div className="p-2 bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Output & Results
          </div>
          <div className="h-64 p-4 font-mono text-sm bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 overflow-y-auto whitespace-pre-wrap">
            {output || 'Click "Run Code" to see output...'}
          </div>
        </div>
      </div>
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

// Interactive Whiteboard Component  
const InteractiveWhiteboard = ({ isOpen, onToggle, exerciseContext }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#3B82F6');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 2;
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const context = canvas.getContext('2d');
    context.strokeStyle = color;
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-4 bg-white dark:bg-neutral-800 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-2">
          <span>🎨</span>
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Interactive Whiteboard</h3>
          <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
            Design your PAI architecture
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {/* Tools */}
          <div className="flex space-x-2 mr-4">
            <button
              onClick={() => setTool('pen')}
              className={`p-2 rounded ${tool === 'pen' ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}
            >
              ✏️
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-2 rounded ${tool === 'eraser' ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}
            >
              🗑️
            </button>
            
            {/* Color Picker */}
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded border-none"
            />
          </div>
          
          <button
            onClick={clearCanvas}
            className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-sm transition-colors"
          >
            Clear
          </button>
          <button
            onClick={onToggle}
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          className="w-full h-full border border-neutral-300 dark:border-neutral-600 rounded cursor-crosshair bg-white"
        />
      </div>
      
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          💡 Draw your PAI system architecture. Consider: interfaces, data flow, duck typing patterns, and component relationships.
        </p>
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
  const [selfAssessment, setSelfAssessment] = useState({
    understanding: 0,
    confidence: 0,
    difficulty: 0,
    timeSpent: 0
  });
  
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmitAssessment?.({
      ...selfAssessment,
      feedback,
      timestamp: Date.now()
    });
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
      <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
        <span className="mr-2 text-primary-500">📊</span>
        Exercise Assessment
      </h3>
      
      <div className="space-y-4">
        {/* Self-Assessment Sliders */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Understanding Level (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={selfAssessment.understanding}
            onChange={(e) => setSelfAssessment(prev => ({
              ...prev,
              understanding: parseInt(e.target.value)
            }))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-neutral-500 mt-1">
            <span>Confused</span>
            <span>Current: {selfAssessment.understanding}</span>
            <span>Mastered</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Confidence Level (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={selfAssessment.confidence}
            onChange={(e) => setSelfAssessment(prev => ({
              ...prev,
              confidence: parseInt(e.target.value)
            }))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-neutral-500 mt-1">
            <span>Not Confident</span>
            <span>Current: {selfAssessment.confidence}</span>
            <span>Very Confident</span>
          </div>
        </div>
        
        {/* Feedback */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            What did you learn? Any challenges?
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about this exercise..."
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
            rows={3}
          />
        </div>
        
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
        >
          Submit Assessment
        </button>
      </div>
    </div>
  );
};

// Enhanced Code Block with Interactive Features
const EnhancedCodeBlock = ({ children, language, isTemplate = false, onFillIn }) => {
  const { theme: activeTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe access to children props with fallbacks
  const codeProps = children?.props || {};
  const codeLanguage = language || 
                      (codeProps.className || '').replace('language-', '') || 
                      'plaintext';
  const codeString = (codeProps.children || children || '').toString().trim();

  const prismTheme = activeTheme === 'dark' ? themes.oneDark : themes.oneLight;
  
  if (!mounted) {
    return (
      <pre className={`language-${codeLanguage} p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-x-auto shadow-md my-6 text-sm`}>
        <code className={`language-${codeLanguage}`}>{codeString}</code>
      </pre>
    );
  }

  return (
    <div className="relative">
      {isTemplate && (
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2 py-1 bg-primary-500 text-white text-xs rounded">
            📝 Fill in the blanks
          </span>
        </div>
      )}
      
      <Highlight
        theme={prismTheme}
        code={codeString}
        language={codeLanguage}
      >
        {({ className: blockClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={`${blockClassName} p-4 rounded-lg overflow-x-auto shadow-md my-6 text-sm relative`}
            style={{...style, display: 'block'}} 
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i }) }>
                <span className="text-neutral-500 mr-4 select-none text-xs">
                  {String(i + 1).padStart(3, ' ')}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key }) } />
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
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
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
    code: (props) => <EnhancedCodeBlock {...props} />,
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
                {frontmatter.whiteboard_required && (
                  <button
                    onClick={() => setWhiteboardOpen(true)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    🎨 Open Whiteboard
                  </button>
                )}
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
        
        {/* Interactive Whiteboard */}
        <InteractiveWhiteboard
          isOpen={whiteboardOpen}
          onToggle={() => setWhiteboardOpen(!whiteboardOpen)}
          exerciseContext={frontmatter}
        />
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