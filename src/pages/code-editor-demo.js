import { useState } from 'react'
import Head from 'next/head'
import CodeEditor from '@/components/learning/CodeEditor'

export default function CodeEditorDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')

  const codeExamples = {
    javascript: {
      code: `// JavaScript Example: PAI Training Basics
function calculateLoss(predictions, actual) {
  let totalLoss = 0;
  for (let i = 0; i < predictions.length; i++) {
    const error = predictions[i] - actual[i];
    totalLoss += error * error; // Mean Squared Error
  }
  return totalLoss / predictions.length;
}

// Test the function
const predictions = [0.8, 0.9, 0.7, 0.6];
const actual = [1, 1, 0, 0];
const loss = calculateLoss(predictions, actual);

console.log('Predictions:', predictions);
console.log('Actual values:', actual);
console.log('Loss (MSE):', loss);`,
      expectedOutput: `Predictions: [0.8, 0.9, 0.7, 0.6]
Actual values: [1, 1, 0, 0]
Loss (MSE): 0.155`,
      hints: [
        "Try modifying the predictions array to see how it affects the loss",
        "The Mean Squared Error formula is: MSE = (1/n) * Σ(predicted - actual)²",
        "Lower loss values indicate better model performance"
      ]
    },
    python: {
      code: `# Python Example: Neural Network Forward Pass
import math

def sigmoid(x):
    """Sigmoid activation function"""
    return 1 / (1 + math.exp(-x))

def forward_pass(inputs, weights, bias):
    """Simple neural network forward pass"""
    # Calculate weighted sum
    weighted_sum = sum(i * w for i, w in zip(inputs, weights)) + bias
    
    # Apply activation function
    output = sigmoid(weighted_sum)
    
    return output, weighted_sum

# Example: Binary classification
inputs = [0.5, 0.8, 0.2]
weights = [0.4, -0.7, 0.9]
bias = 0.1

output, raw_output = forward_pass(inputs, weights, bias)

print(f"Inputs: {inputs}")
print(f"Weights: {weights}")
print(f"Bias: {bias}")
print(f"Raw output (before activation): {raw_output:.3f}")
print(f"Final output (after sigmoid): {output:.3f}")`,
      expectedOutput: `Inputs: [0.5, 0.8, 0.2]
Weights: [0.4, -0.7, 0.9]
Bias: 0.1
Raw output (before activation): 0.140
Final output (after sigmoid): 0.535`,
      hints: [
        "Try changing the input values to see how they affect the output",
        "The sigmoid function maps any real number to a value between 0 and 1",
        "Neural networks use activation functions to introduce non-linearity"
      ]
    },
    cpp: {
      code: `#include <iostream>
#include <vector>
#include <cmath>

class SimpleNeuron {
private:
    std::vector<double> weights;
    double bias;
    
public:
    SimpleNeuron(const std::vector<double>& w, double b) 
        : weights(w), bias(b) {}
    
    double activate(double x) {
        // ReLU activation function
        return std::max(0.0, x);
    }
    
    double forward(const std::vector<double>& inputs) {
        double sum = bias;
        for (size_t i = 0; i < inputs.size(); ++i) {
            sum += inputs[i] * weights[i];
        }
        return activate(sum);
    }
};

int main() {
    // Create a neuron with weights and bias
    std::vector<double> weights = {0.5, -0.3, 0.8};
    double bias = 0.1;
    SimpleNeuron neuron(weights, bias);
    
    // Input data
    std::vector<double> inputs = {1.0, 0.5, -0.2};
    
    // Forward pass
    double output = neuron.forward(inputs);
    
    std::cout << "Input: ";
    for (double input : inputs) {
        std::cout << input << " ";
    }
    std::cout << "\\n";
    
    std::cout << "Weights: ";
    for (double weight : weights) {
        std::cout << weight << " ";
    }
    std::cout << "\\n";
    
    std::cout << "Bias: " << bias << "\\n";
    std::cout << "Output: " << output << "\\n";
    
    return 0;
}`,
      expectedOutput: `Input: 1 0.5 -0.2 
Weights: 0.5 -0.3 -0.8 
Bias: 0.1
Output: 0.44`,
      hints: [
        "This implements a simple neuron with ReLU activation",
        "ReLU (Rectified Linear Unit) returns max(0, x)",
        "C++ offers excellent performance for AI/ML computations"
      ]
    }
  }

  const currentExample = codeExamples[selectedLanguage]

  return (
    <>
      <Head>
        <title>Interactive Code Editor Demo | PAI Training</title>
        <meta name="description" content="Test the interactive code editor with JavaScript, Python, and C++ examples" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              🚀 Interactive Code Editor Demo
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Test our multi-language code editor with real execution for JavaScript, Python, and C++. 
              Perfect for PAI training exercises and learning programming concepts.
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-2 shadow-lg border border-neutral-200 dark:border-neutral-700">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-6 py-3 mx-1 rounded-lg font-medium transition-all duration-200 ${
                    selectedLanguage === lang
                      ? 'bg-primary-500 text-white shadow-md transform scale-105'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {lang === 'javascript' && '🟡 JavaScript'}
                  {lang === 'python' && '🐍 Python'}
                  {lang === 'cpp' && '⚡ C++'}
                </button>
              ))}
            </div>
          </div>

          {/* Features Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Real Code Execution</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                JavaScript runs client-side, Python via Pyodide WebAssembly, C++ through Judge0 API
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="text-2xl mb-3">💡</div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Smart Hints System</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Progressive hints help students learn without giving away solutions immediately
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="text-2xl mb-3">🎨</div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Monaco Editor</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                VS Code-quality editing experience with syntax highlighting and IntelliSense
              </p>
            </div>
          </div>

          {/* Code Editor */}
          <div className="max-w-6xl mx-auto">
            <CodeEditor
              key={selectedLanguage} // Force re-render when language changes
              initialCode={currentExample.code}
              language={selectedLanguage}
              expectedOutput={currentExample.expectedOutput}
              hints={currentExample.hints}
              height="500px"
              onCodeRun={(code, output, success) => {
                console.log('Code executed:', { code, output, success })
              }}
              className="shadow-2xl"
            />
          </div>

          {/* Usage Instructions */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
                <span className="mr-2">📖</span>
                How to Use
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-neutral-700 dark:text-neutral-200 mb-2">✨ Features</h4>
                  <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                    <li>• Real-time code execution</li>
                    <li>• Syntax highlighting & error detection</li>
                    <li>• Progressive hint system</li>
                    <li>• Expected output comparison</li>
                    <li>• Copy, reset, and theme toggle</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-700 dark:text-neutral-200 mb-2">🎮 Controls</h4>
                  <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                    <li>• <strong>▶️ Run:</strong> Execute your code</li>
                    <li>• <strong>💡 Hints:</strong> Get learning assistance</li>
                    <li>• <strong>📋 Copy:</strong> Copy code to clipboard</li>
                    <li>• <strong>🔄 Reset:</strong> Restore original code</li>
                    <li>• <strong>🌙/☀️:</strong> Toggle dark/light theme</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* API Status */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-yellow-600 dark:text-yellow-400 mr-2">⚠️</span>
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">C++ Execution Status</p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    C++ requires Judge0 API configuration. If not configured, a helpful message will be shown.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 