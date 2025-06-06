---
title: "Interactive Code Editor Demo"
description: "Experience the new enhanced code editor with real JavaScript, Python, and C++ execution capabilities"
difficulty: "Beginner"
duration: "15 minutes"
exercise_type: "Interactive Practice"
language: "Multi-language"
estimated_completion: "15-20 minutes"
difficulty_score: 3
series: true
series_part: 1
learning_objectives:
  - "Experience real code execution in the browser"
  - "Practice with JavaScript, Python, and C++ syntax"
  - "Learn about AI/ML concepts through interactive coding"
  - "Use the hint system for guided learning"
whiteboard_required: false
---

# 🚀 Interactive Code Editor Demo

Welcome to our enhanced interactive code editor! This new component supports **real code execution** for JavaScript, Python, and C++, making your learning experience more engaging and practical.

## ✨ Features

- **Monaco Editor**: VS Code-quality editing experience
- **Real Execution**: JavaScript (client-side), Python (Pyodide), C++ (Judge0 API)
- **Smart Hints**: Progressive learning assistance
- **Expected Output**: Compare your results
- **Theme Toggle**: Dark/light mode support

---

## 🟡 JavaScript Example: Loss Function

Let's start with a simple JavaScript example that calculates the Mean Squared Error (MSE) loss function commonly used in neural networks.

<InteractiveCodeEditor
  template={`// Calculate Mean Squared Error Loss
function calculateMSE(predictions, actual) {
  let totalLoss = 0;
  
  // Your code here: implement MSE calculation
  // Hint: MSE = (1/n) * Σ(predicted - actual)²
  
  return totalLoss / predictions.length;
}

// Test data
const predictions = [0.8, 0.9, 0.7, 0.6];
const actual = [1, 1, 0, 0];
const loss = calculateMSE(predictions, actual);

console.log('Predictions:', predictions);
console.log('Actual values:', actual);
console.log('MSE Loss:', loss);`}
  language="javascript"
  expectedOutput={`Predictions: [0.8, 0.9, 0.7, 0.6]
Actual values: [1, 1, 0, 0]
MSE Loss: 0.155`}
  hints={[
    "You need to calculate the squared difference for each prediction",
    "Use a for loop to iterate through the arrays",
    "The formula is: error = predicted - actual, then square it",
    "Don't forget to sum all the squared errors before dividing by length"
  ]}
/>

### 📝 Instructions

1. **Complete the MSE function** by implementing the calculation inside the loop
2. **Click the hints button** 💡 if you need guidance
3. **Run your code** ▶️ to see if it matches the expected output
4. **Experiment** with different prediction values to see how loss changes

---

## 🐍 Python Example: Neural Network Forward Pass

Now let's try a Python example using Pyodide for in-browser Python execution.

<InteractiveCodeEditor
  template={`# Neural Network Forward Pass Implementation
import math

def sigmoid(x):
    """Sigmoid activation function"""
    # Your code here: implement sigmoid
    pass

def forward_pass(inputs, weights, bias):
    """Calculate forward pass through a single neuron"""
    # Step 1: Calculate weighted sum
    weighted_sum = 0  # Your code here
    
    # Step 2: Add bias
    weighted_sum += bias
    
    # Step 3: Apply activation function
    output = sigmoid(weighted_sum)
    
    return output, weighted_sum

# Test parameters
inputs = [0.5, 0.8, 0.2]
weights = [0.4, -0.7, 0.9]
bias = 0.1

output, raw_output = forward_pass(inputs, weights, bias)

print(f"Inputs: {inputs}")
print(f"Weights: {weights}")
print(f"Bias: {bias}")
print(f"Raw output: {raw_output:.3f}")
print(f"Final output: {output:.3f}")`}
  language="python"
  expectedOutput={`Inputs: [0.5, 0.8, 0.2]
Weights: [0.4, -0.7, 0.9]
Bias: 0.1
Raw output: 0.140
Final output: 0.535`}
  hints={[
    "Sigmoid function: 1 / (1 + e^(-x)) where e is math.exp()",
    "Weighted sum: multiply each input by its corresponding weight and sum them",
    "Use zip(inputs, weights) to pair inputs with weights",
    "The bias is added after calculating the weighted sum"
  ]}
/>

### 🎯 Learning Goals

- Implement the sigmoid activation function
- Calculate weighted sum of inputs
- Understand the forward pass in neural networks
- See how Python runs directly in your browser!

---

## ⚡ C++ Example: High-Performance Neuron

For computational intensive tasks, C++ provides excellent performance. This example uses the Judge0 API for server-side execution.

<InteractiveCodeEditor
  template={`#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

class Neuron {
private:
    std::vector<double> weights;
    double bias;
    
public:
    Neuron(const std::vector<double>& w, double b) : weights(w), bias(b) {}
    
    double relu(double x) {
        // Your code here: implement ReLU activation
        return 0.0;  // Replace this
    }
    
    double forward(const std::vector<double>& inputs) {
        double sum = bias;
        
        // Your code here: calculate weighted sum
        // Iterate through inputs and weights
        
        return relu(sum);
    }
};

int main() {
    std::vector<double> weights = {0.5, -0.3, 0.8};
    double bias = 0.1;
    Neuron neuron(weights, bias);
    
    std::vector<double> inputs = {1.0, 0.5, -0.2};
    double output = neuron.forward(inputs);
    
    std::cout << "Input: ";
    for (double input : inputs) {
        std::cout << input << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Output: " << output << std::endl;
    
    return 0;
}`}
  language="cpp"
  expectedOutput={`Input: 1 0.5 -0.2 
Output: 0.44`}
  hints={[
    "ReLU function returns max(0, x) - use std::max(0.0, x)",
    "Use a for loop with index i to access weights[i] and inputs[i]",
    "Calculate: sum += inputs[i] * weights[i] for each element",
    "Make sure the loop runs for the size of the inputs vector"
  ]}
/>

### 🏆 C++ Benefits

- **Performance**: Compiled code runs faster than interpreted languages
- **Memory Control**: Direct memory management for large datasets
- **Industry Standard**: Widely used in production AI systems
- **Modern C++**: Features like vectors, STL algorithms, and smart pointers

---

## 🎮 Interactive Features Guide

### 💡 **Hints System**
- Click the "Hints" button to get progressive guidance
- Hints are designed to help you learn without giving away the solution
- Navigate through hints using Previous/Next buttons

### ⚙️ **Editor Controls**
- **▶️ Run**: Execute your code and see real output
- **🔄 Reset**: Restore the original template code
- **📋 Copy**: Copy code to clipboard
- **🌙/☀️**: Toggle between dark and light themes

### 🎯 **Expected Output**
- Compare your program's output with the expected result
- Green indicators show successful execution
- Error messages help debug issues

---

## 🚀 Next Steps

1. **Try all three examples** - Experience different programming languages
2. **Modify the code** - Experiment with different values
3. **Use the hints** - Learn the underlying concepts
4. **Compare outputs** - Understand what makes code correct

This interactive editor will be used throughout the PAI Training exercises, making your learning experience more hands-on and engaging!

## 🔧 Technical Implementation

- **JavaScript**: Runs directly in the browser using `eval()` in a controlled environment
- **Python**: Powered by [Pyodide](https://pyodide.org/), bringing Python to WebAssembly  
- **C++**: Uses [Judge0 API](https://judge0.com/) for server-side compilation and execution
- **Editor**: Monaco Editor provides VS Code-like experience with syntax highlighting

---

Ready to dive deeper into AI programming? Let's continue with more advanced exercises! 