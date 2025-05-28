import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  BiPlay,
  BiRefresh,
  BiDownload,
  BiCopy,
  BiCheck,
  BiCode,
  BiTerminal,
  BiLightbulb,
  BiCheckCircle,
  BiX,
  BiChevronDown,
  BiChevronUp,
} from "react-icons/bi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";

const InteractiveCodeEditor = ({ 
  initialCode = "",
  language = "javascript",
  expectedOutput = "",
  hints = [],
  solution = "",
  onCodeRun,
  onComplete 
}) => {
  const { theme } = useTheme();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [code]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      // Simulate code execution (in a real implementation, you'd use a sandboxed environment)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let result = "";
      
      if (language === "javascript") {
        // Simple JavaScript evaluation (unsafe for production - use sandboxed environment)
        try {
          // Capture console.log output
          const logs = [];
          const originalLog = console.log;
          console.log = (...args) => logs.push(args.join(' '));
          
          // Execute code
          eval(code);
          
          // Restore console.log
          console.log = originalLog;
          
          result = logs.join('\n') || "Code executed successfully";
        } catch (error) {
          result = `Error: ${error.message}`;
        }
      } else if (language === "python") {
        // Simulate Python execution
        result = "Python execution simulated\nOutput: Hello, World!";
      } else if (language === "cpp") {
        // Simulate C++ execution
        result = "C++ compilation and execution simulated\nOutput: Hello, World!";
      }

      setOutput(result);
      
      // Check if output matches expected result
      if (expectedOutput && result.trim() === expectedOutput.trim()) {
        setIsCorrect(true);
        onComplete?.();
      }
      
      onCodeRun?.(code, result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
    setIsCorrect(false);
    setCurrentHint(0);
    setShowHints(false);
    setShowSolution(false);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const useSolution = () => {
    setCode(solution);
    setShowSolution(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden border border-neutral-200 dark:border-neutral-700"
    >
      {/* Header */}
      <div className="bg-neutral-100 dark:bg-neutral-900 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BiCode className="text-primary-500 text-xl" />
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              Interactive Code Editor
            </h3>
            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full capitalize">
              {language}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isCorrect && (
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <BiCheckCircle />
                <span className="text-sm font-medium">Correct!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Code Editor */}
        <div className="p-6 border-r border-neutral-200 dark:border-neutral-700">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Your Code:
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyCode}
                  className="p-1 rounded text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                  title="Copy code"
                >
                  {copied ? <BiCheck className="text-green-500" /> : <BiCopy />}
                </button>
                <button
                  onClick={resetCode}
                  className="p-1 rounded text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                  title="Reset code"
                >
                  <BiRefresh />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-600 rounded-lg font-mono text-sm text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none overflow-hidden"
                placeholder="Write your code here..."
                style={{ minHeight: '200px' }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg font-medium transition-colors"
            >
              <BiPlay />
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>

            {hints.length > 0 && (
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
              >
                <BiLightbulb />
                <span>Hints ({hints.length})</span>
              </button>
            )}

            {solution && (
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center space-x-2 px-4 py-2 bg-neutral-500 hover:bg-neutral-600 text-white rounded-lg font-medium transition-colors"
              >
                <BiCheckCircle />
                <span>Solution</span>
              </button>
            )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <BiTerminal className="text-neutral-500" />
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Output:
              </label>
            </div>
            
            <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[200px] overflow-auto">
              {isRunning ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
                  <span>Running code...</span>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-neutral-500">Click "Run Code" to see output</span>
              )}
            </div>
          </div>

          {expectedOutput && (
            <div className="mb-4">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                Expected Output:
              </label>
              <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg font-mono text-sm text-neutral-600 dark:text-neutral-400">
                <pre className="whitespace-pre-wrap">{expectedOutput}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hints Panel */}
      {showHints && hints.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-neutral-200 dark:border-neutral-700 bg-yellow-50 dark:bg-yellow-900/20"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BiLightbulb className="text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100">
                  Hint {currentHint + 1} of {hints.length}
                </h4>
              </div>
              <button
                onClick={() => setShowHints(false)}
                className="p-1 rounded text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                <BiX />
              </button>
            </div>
            
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {hints[currentHint]}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {hints.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentHint
                        ? 'bg-yellow-500'
                        : 'bg-neutral-300 dark:bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
              
              {currentHint < hints.length - 1 && (
                <button
                  onClick={nextHint}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg font-medium transition-colors"
                >
                  Next Hint
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Solution Panel */}
      {showSolution && solution && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-neutral-200 dark:border-neutral-700 bg-green-50 dark:bg-green-900/20"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BiCheckCircle className="text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100">
                  Solution
                </h4>
              </div>
              <button
                onClick={() => setShowSolution(false)}
                className="p-1 rounded text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                <BiX />
              </button>
            </div>
            
            <div className="mb-4">
              <SyntaxHighlighter
                language={language}
                style={theme === 'dark' ? oneDark : oneLight}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                {solution}
              </SyntaxHighlighter>
            </div>
            
            <button
              onClick={useSolution}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              Use This Solution
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InteractiveCodeEditor; 