import { useState, useEffect, useRef } from "react";
import { MDXRemote } from "next-mdx-remote";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiBookOpen,
  BiTime,
  BiCheckCircle,
  BiCircle,
  BiChevronLeft,
  BiChevronRight,
  BiBookmark,
  BiShare,
  BiDownload,
  BiLightbulb,
  BiCode,
  BiMath,
  BiPlay,
  BiPause,
  BiRefresh,
  BiZoomIn,
  BiZoomOut,
  BiFullscreen,
  BiFullscreenExit,
  BiVolumeFull,
  BiVolumeOff,
  BiCopy,
  BiCheck,
  BiQuestionMark,
  BiChat,
  BiStar,
  BiHeart,
  BiEye,
  BiTarget,
  BiTrendingUp,
  BiAward,
  BiUser,
  BiCalendar,
  BiTag,
} from "react-icons/bi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";

// Custom MDX components for enhanced learning experience
const createMDXComponents = (theme, onCodeCopy, onConceptHighlight) => ({
  h1: ({ children, ...props }) => (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-6 border-b border-neutral-200 dark:border-neutral-700 pb-4"
      {...props}
    >
      {children}
    </motion.h1>
  ),
  
  h2: ({ children, ...props }) => (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 mt-8"
      {...props}
    >
      {children}
    </motion.h2>
  ),
  
  h3: ({ children, ...props }) => (
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-xl md:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3 mt-6"
      {...props}
    >
      {children}
    </motion.h3>
  ),
  
  p: ({ children, ...props }) => (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed text-lg"
      {...props}
    >
      {children}
    </motion.p>
  ),
  
  ul: ({ children, ...props }) => (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="list-disc list-inside text-neutral-600 dark:text-neutral-400 mb-4 space-y-2 ml-4"
      {...props}
    >
      {children}
    </motion.ul>
  ),
  
  ol: ({ children, ...props }) => (
    <motion.ol
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="list-decimal list-inside text-neutral-600 dark:text-neutral-400 mb-4 space-y-2 ml-4"
      {...props}
    >
      {children}
    </motion.ol>
  ),
  
  li: ({ children, ...props }) => (
    <li className="text-lg leading-relaxed" {...props}>
      {children}
    </li>
  ),
  
  blockquote: ({ children, ...props }) => (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 p-4 my-6 rounded-r-lg"
      {...props}
    >
      <div className="flex items-start space-x-3">
        <BiLightbulb className="text-primary-500 text-xl mt-1 flex-shrink-0" />
        <div className="text-neutral-700 dark:text-neutral-300 italic">
          {children}
        </div>
      </div>
    </motion.blockquote>
  ),
  
  code: ({ children, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    if (language) {
      return (
        <CodeBlock
          code={children}
          language={language}
          theme={theme}
          onCopy={onCodeCopy}
        />
      );
    }
    
    return (
      <code
        className="bg-neutral-100 dark:bg-neutral-800 text-primary-600 dark:text-primary-400 px-2 py-1 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
  
  pre: ({ children, ...props }) => (
    <div className="my-6">
      {children}
    </div>
  ),
  
  // Math equation wrapper
  div: ({ children, className, ...props }) => {
    if (className?.includes('math')) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl my-6 border border-neutral-200 dark:border-neutral-700"
          {...props}
        >
          <div className="flex items-center space-x-2 mb-4">
            <BiMath className="text-primary-500 text-xl" />
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Mathematical Expression
            </span>
          </div>
          {children}
        </motion.div>
      );
    }
    return <div className={className} {...props}>{children}</div>;
  },
});

// Enhanced Code Block Component
const CodeBlock = ({ code, language, theme, onCopy }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.(code, language);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const codeStyle = theme === 'dark' ? oneDark : oneLight;
  const isLongCode = code.split('\n').length > 20;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-neutral-800 dark:bg-neutral-900 text-white px-4 py-2 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <BiCode className="text-primary-400" />
          <span className="text-sm font-medium capitalize">{language}</span>
        </div>
        <div className="flex items-center space-x-2">
          {isLongCode && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded hover:bg-neutral-700 transition-colors"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <BiZoomOut /> : <BiZoomIn />}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-neutral-700 transition-colors"
            title="Copy code"
          >
            {copied ? <BiCheck className="text-green-400" /> : <BiCopy />}
          </button>
        </div>
      </div>
      
      {/* Code Content */}
      <div className={`relative ${isLongCode && !isExpanded ? 'max-h-96 overflow-hidden' : ''}`}>
        <SyntaxHighlighter
          language={language}
          style={codeStyle}
          customStyle={{
            margin: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
        
        {/* Fade overlay for long code */}
        {isLongCode && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
        )}
      </div>
      
      {/* Expand button for long code */}
      {isLongCode && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Show More
        </button>
      )}
    </motion.div>
  );
};

// Learning Progress Tracker
const ProgressTracker = ({ sections, currentSection, onSectionClick }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
        <BiTarget className="mr-2 text-primary-500" />
        Learning Progress
      </h3>
      
      <div className="space-y-3">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => onSectionClick(index)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
              index === currentSection
                ? 'bg-primary-100 dark:bg-primary-900/20 border-l-4 border-primary-500'
                : index < currentSection
                ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
                : 'bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600'
            }`}
          >
            <div className="flex items-center space-x-3">
              {index < currentSection ? (
                <BiCheckCircle className="text-green-500 text-xl" />
              ) : index === currentSection ? (
                <BiPlay className="text-primary-500 text-xl" />
              ) : (
                <BiCircle className="text-neutral-400 text-xl" />
              )}
              <div>
                <div className={`font-medium ${
                  index === currentSection
                    ? 'text-primary-700 dark:text-primary-300'
                    : index < currentSection
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}>
                  {section.title}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-500">
                  {section.duration}
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
          <span className="text-neutral-600 dark:text-neutral-400">
            {Math.round((currentSection / sections.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
            style={{ width: `${(currentSection / sections.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Learning Assistant Panel
const LearningAssistant = ({ isOpen, onToggle, content }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [notes, setNotes] = useState('');
  
  const tabs = [
    { id: 'summary', label: 'Summary', icon: <BiBookOpen /> },
    { id: 'concepts', label: 'Key Concepts', icon: <BiLightbulb /> },
    { id: 'practice', label: 'Practice', icon: <BiCode /> },
    { id: 'notes', label: 'My Notes', icon: <BiChat /> },
  ];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-neutral-800 shadow-2xl z-40 border-l border-neutral-200 dark:border-neutral-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              Learning Assistant
            </h3>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <BiChevronRight />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="p-6 h-full overflow-y-auto">
            {activeTab === 'summary' && (
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                  Section Summary
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  This section covers the fundamental concepts of convex optimization,
                  including the mathematical foundations and practical applications.
                </p>
              </div>
            )}
            
            {activeTab === 'concepts' && (
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                  Key Concepts
                </h4>
                <div className="space-y-3">
                  {['Convex Functions', 'Optimization', 'Gradient Descent', 'Local vs Global Minima'].map((concept) => (
                    <div key={concept} className="p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <div className="font-medium text-neutral-800 dark:text-neutral-100 text-sm">
                        {concept}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'practice' && (
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                  Practice Exercises
                </h4>
                <div className="space-y-3">
                  <div className="p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg">
                    <div className="font-medium text-neutral-800 dark:text-neutral-100 text-sm mb-2">
                      Exercise 1: Identify Convex Functions
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Determine which of the following functions are convex...
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notes' && (
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                  Personal Notes
                </h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes here..."
                  className="w-full h-40 p-3 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 text-sm resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Tutorial Reader Component
export default function TutorialReader({ 
  content, 
  frontmatter, 
  sections = [],
  onProgress,
  onComplete 
}) {
  const { theme } = useTheme();
  const [currentSection, setCurrentSection] = useState(0);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleCodeCopy = (code, language) => {
    // Track code copying for analytics
    console.log(`Code copied: ${language}`);
  };
  
  const handleConceptHighlight = (concept) => {
    // Track concept interactions
    console.log(`Concept highlighted: ${concept}`);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const mdxComponents = createMDXComponents(theme, handleCodeCopy, handleConceptHighlight);
  
  return (
    <div className={`min-h-screen bg-neutral-50 dark:bg-neutral-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                <BiChevronLeft />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  {frontmatter?.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center space-x-1">
                    <BiTime />
                    <span>{formatTime(readingTime)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiUser />
                    <span>{frontmatter?.author}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side */}
            <div className="flex items-center space-x-2">
              {/* Font size controls */}
              <div className="flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg p-1">
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="p-1 rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                  title="Decrease font size"
                >
                  <BiZoomOut />
                </button>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 px-2">
                  {fontSize}px
                </span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="p-1 rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                  title="Increase font size"
                >
                  <BiZoomIn />
                </button>
              </div>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
                title="Bookmark"
              >
                <BiBookmark />
              </button>
              
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <BiFullscreenExit /> : <BiFullscreen />}
              </button>
              
              <button
                onClick={() => setIsAssistantOpen(!isAssistantOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isAssistantOpen
                    ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
                title="Learning Assistant"
              >
                <BiQuestionMark />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          {sections.length > 0 && (
            <div className="lg:col-span-1">
              <ProgressTracker
                sections={sections}
                currentSection={currentSection}
                onSectionClick={setCurrentSection}
              />
            </div>
          )}
          
          {/* Content */}
          <div className={`${sections.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'} ${isAssistantOpen ? 'mr-96' : ''}`}>
            <div 
              ref={contentRef}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 md:p-12"
              style={{ fontSize: `${fontSize}px` }}
            >
              {content && (
                <MDXRemote
                  {...content}
                  components={mdxComponents}
                />
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium transition-colors">
                <BiChevronLeft />
                <span>Previous</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <button className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 transition-colors">
                  <BiShare />
                </button>
                <button className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 transition-colors">
                  <BiDownload />
                </button>
              </div>
              
              <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors">
                <span>Next</span>
                <BiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning Assistant */}
      <LearningAssistant
        isOpen={isAssistantOpen}
        onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
        content={content}
      />
    </div>
  );
} 