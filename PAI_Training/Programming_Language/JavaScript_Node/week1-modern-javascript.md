# Week 1: Modern JavaScript Features and TypeScript Integration

## Learning Objectives

By the end of this week, you will:
- Use ES2022+ features for PAI application development
- Integrate TypeScript for type-safe PAI systems
- Apply modern async patterns and error handling
- Implement classes and modules for PAI components

## ES2022+ Features for PAI Development

### 1. Class Fields and Private Methods

```javascript
// Modern class syntax for PAI components
class PAIModel {
  // Public fields
  modelName = 'harmonic_encoder';
  version = '1.0.0';
  
  // Private fields (ES2022)
  #weights = new Map();
  #isTraining = false;
  
  // Private methods
  #validateInput(data) {
    if (!Array.isArray(data)) {
      throw new Error('Input must be an array');
    }
    return data.every(x => typeof x === 'number' && isFinite(x));
  }
  
  #updateWeights(gradients) {
    // Private weight update logic
    for (const [layer, gradient] of gradients) {
      const currentWeight = this.#weights.get(layer) || 0;
      this.#weights.set(layer, currentWeight - 0.01 * gradient);
    }
  }
  
  // Public methods
  async train(trainingData) {
    if (this.#isTraining) {
      throw new Error('Model is already training');
    }
    
    this.#isTraining = true;
    
    try {
      for (const batch of trainingData) {
        if (!this.#validateInput(batch.input)) {
          throw new Error('Invalid training data');
        }
        
        const gradients = await this.computeGradients(batch);
        this.#updateWeights(gradients);
      }
    } finally {
      this.#isTraining = false;
    }
  }
  
  predict(input) {
    if (!this.#validateInput(input)) {
      throw new Error('Invalid input data');
    }
    
    // Prediction logic using private weights
    return input.map(x => x * (this.#weights.get('output') || 1));
  }
}
```

### 2. Top-Level Await and Dynamic Imports

```javascript
// Top-level await for PAI initialization
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Dynamic imports for conditional loading
const loadPAIModule = async (moduleType) => {
  switch (moduleType) {
    case 'harmonic':
      return await import('./modules/harmonic-processor.js');
    case 'wave':
      return await import('./modules/wave-computer.js');
    default:
      throw new Error(`Unknown module type: ${moduleType}`);
  }
};

// Top-level await usage
const config = await fetch('./config.json').then(r => r.json());
const PAIModule = await loadPAIModule(config.processorType);
const processor = new PAIModule.default(config);

// Export for use in other modules
export { processor };
```

### 3. Nullish Coalescing and Optional Chaining

```javascript
// Safe PAI configuration handling
class PAIConfig {
  constructor(userConfig = {}) {
    // Nullish coalescing for default values
    this.learningRate = userConfig.learningRate ?? 0.001;
    this.batchSize = userConfig.batchSize ?? 32;
    this.maxEpochs = userConfig.maxEpochs ?? 100;
    
    // Optional chaining for nested properties
    this.modelPath = userConfig.model?.path ?? './models/default.json';
    this.gpuEnabled = userConfig.hardware?.gpu?.enabled ?? false;
    this.memoryLimit = userConfig.hardware?.memory?.limit ?? '1GB';
    
    // Complex nested access
    this.harmonicFrequencies = userConfig.processing?.harmonic?.frequencies ?? [440, 880, 1320];
  }
  
  // Method using optional chaining
  getOptimizer() {
    return this.config?.optimizer?.type ?? 'adam';
  }
  
  // Safe method calls
  validateConfig() {
    // Only call validation if method exists
    this.validator?.validate?.(this);
  }
}

// Usage with safe property access
const initializePAI = (config) => {
  const paiConfig = new PAIConfig(config);
  
  // Safe access to potentially undefined properties
  const deviceInfo = {
    gpu: config?.hardware?.gpu?.name ?? 'CPU',
    memory: config?.hardware?.memory?.total ?? 'Unknown',
    cores: config?.hardware?.cpu?.cores ?? navigator.hardwareConcurrency ?? 1
  };
  
  console.log(`Initializing PAI on ${deviceInfo.gpu} with ${deviceInfo.cores} cores`);
  return paiConfig;
};
```

### 4. Array and Object Methods

```javascript
// Modern array methods for PAI data processing
class PAIDataProcessor {
  // Process training batches
  static processBatches(data, batchSize = 32) {
    return data
      .filter(item => item.isValid) // Remove invalid data
      .map(item => this.normalizeData(item)) // Normalize
      .flatMap(item => this.augmentData(item)) // Data augmentation
      .reduce((batches, item, index) => {
        const batchIndex = Math.floor(index / batchSize);
        batches[batchIndex] = batches[batchIndex] || [];
        batches[batchIndex].push(item);
        return batches;
      }, []);
  }
  
  // Find harmonic patterns
  static findHarmonicPatterns(frequencies) {
    return frequencies
      .map((freq, index) => ({ freq, index, harmonic: freq / 440 }))
      .filter(({ harmonic }) => harmonic > 0 && harmonic < 10)
      .sort((a, b) => a.harmonic - b.harmonic)
      .groupBy(({ harmonic }) => Math.round(harmonic)); // ES2024 proposal
  }
  
  // Statistical analysis
  static analyzePerformance(results) {
    const accuracies = results.map(r => r.accuracy);
    
    return {
      mean: accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length,
      max: Math.max(...accuracies),
      min: Math.min(...accuracies),
      median: accuracies.sort()[Math.floor(accuracies.length / 2)],
      variance: this.calculateVariance(accuracies)
    };
  }
  
  static calculateVariance(values) {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    return values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  }
}
```

## TypeScript Integration for PAI Development

### 1. Type Definitions for PAI Systems

```typescript
// types/pai.ts
export interface PAITrainingExample {
  readonly input: Float32Array;
  readonly target: number;
  readonly metadata: Record<string, unknown>;
}

export interface PAIModelConfig {
  readonly modelName: string;
  readonly learningRate: number;
  readonly batchSize: number;
  readonly hiddenLayers: readonly number[];
  readonly activationFunction: 'relu' | 'sigmoid' | 'tanh';
}

export interface HarmonicFrequency {
  readonly frequency: number;
  readonly amplitude: number;
  readonly phase: number;
}

export type PAIProcessorType = 'harmonic' | 'wave' | 'neural';

export interface PAIProcessor<TInput, TOutput> {
  process(input: TInput): Promise<TOutput>;
  configure(config: Record<string, unknown>): void;
}

// Generic constraint for PAI models
export interface TrainableModel<TData, TResult> {
  train(data: TData[]): Promise<void>;
  predict(input: TData): TResult;
  evaluate(testData: TData[]): Promise<number>;
}
```

### 2. Advanced TypeScript Patterns

```typescript
// Advanced type patterns for PAI development
import { PAITrainingExample, PAIModelConfig, TrainableModel } from './types/pai.js';

// Conditional types for different model architectures
type ModelArchitecture<T extends string> = 
  T extends 'neural' ? NeuralNetworkConfig :
  T extends 'harmonic' ? HarmonicEncoderConfig :
  T extends 'wave' ? WaveComputerConfig :
  never;

// Template literal types for configuration keys
type ConfigKey<T extends string> = `pai_${T}_config`;

// Utility types for PAI data
type RequiredFields<T> = {
  [K in keyof T]-?: T[K];
};

type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Generic PAI model class with constraints
class PAIModel<TInput extends PAITrainingExample, TOutput extends number> 
  implements TrainableModel<TInput, TOutput> {
  
  private config: RequiredFields<PAIModelConfig>;
  private weights: Map<string, Float32Array> = new Map();
  
  constructor(config: PartialExcept<PAIModelConfig, 'modelName'>) {
    this.config = {
      learningRate: 0.001,
      batchSize: 32,
      hiddenLayers: [128, 64],
      activationFunction: 'relu',
      ...config
    };
  }
  
  async train(data: TInput[]): Promise<void> {
    // Type-safe training implementation
    for (const example of data) {
      // TypeScript ensures input has correct structure
      const prediction = this.forward(example.input);
      const loss = this.calculateLoss(prediction, example.target);
      await this.backpropagate(loss);
    }
  }
  
  predict(input: TInput): TOutput {
    const result = this.forward(input.input);
    return result as TOutput; // Type assertion with runtime validation
  }
  
  async evaluate(testData: TInput[]): Promise<number> {
    const predictions = testData.map(example => this.predict(example));
    const targets = testData.map(example => example.target);
    
    return this.calculateAccuracy(predictions, targets);
  }
  
  private forward(input: Float32Array): number {
    // Implementation details
    return Array.from(input).reduce((sum, val) => sum + val, 0) / input.length;
  }
  
  private calculateLoss(prediction: number, target: number): number {
    return Math.pow(prediction - target, 2);
  }
  
  private async backpropagate(loss: number): Promise<void> {
    // Gradient computation and weight updates
    await new Promise(resolve => setTimeout(resolve, 1)); // Simulate async operation
  }
  
  private calculateAccuracy(predictions: TOutput[], targets: number[]): number {
    const correct = predictions.reduce((count, pred, index) => {
      return Math.abs(pred - targets[index]) < 0.1 ? count + 1 : count;
    }, 0);
    
    return correct / predictions.length;
  }
}
```

### 3. Async Patterns and Error Handling

```typescript
// Robust async patterns for PAI operations
class PAIAsyncOperations {
  // Promise-based batch processing with error handling
  static async processBatchesConcurrently<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    concurrency: number = 3
  ): Promise<R[]> {
    const results: R[] = [];
    const errors: Error[] = [];
    
    for (let i = 0; i < items.length; i += concurrency) {
      const batch = items.slice(i, i + concurrency);
      
      const batchPromises = batch.map(async (item, index) => {
        try {
          return await processor(item);
        } catch (error) {
          errors.push(new Error(`Batch ${i + index} failed: ${error.message}`));
          return null;
        }
      });
      
      const batchResults = await Promise.allSettled(batchPromises);
      
      for (const result of batchResults) {
        if (result.status === 'fulfilled' && result.value !== null) {
          results.push(result.value);
        }
      }
    }
    
    if (errors.length > 0) {
      console.warn(`${errors.length} batch processing errors occurred`);
    }
    
    return results;
  }
  
  // Retry mechanism with exponential backoff
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) {
          throw new Error(`Operation failed after ${maxRetries} retries: ${lastError.message}`);
        }
        
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  }
  
  // Timeout wrapper for PAI operations
  static async withTimeout<T>(
    operation: Promise<T>,
    timeoutMs: number,
    timeoutMessage: string = 'Operation timed out'
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    });
    
    return Promise.race([operation, timeoutPromise]);
  }
}
```

## Practical Exercise: PAI Training Monitor

Create a real-time training monitor using modern JavaScript:

```typescript
// pai-training-monitor.ts
interface TrainingMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
  timestamp: number;
}

interface TrainingConfig {
  modelName: string;
  maxEpochs: number;
  learningRate: number;
}

class PAITrainingMonitor {
  #metrics: TrainingMetrics[] = [];
  #isTraining = false;
  #eventTarget = new EventTarget();
  
  constructor(private config: TrainingConfig) {}
  
  // Start monitoring with async generator
  async *startTraining(): AsyncGenerator<TrainingMetrics, void, unknown> {
    this.#isTraining = true;
    
    try {
      for (let epoch = 1; epoch <= this.config.maxEpochs; epoch++) {
        if (!this.#isTraining) break;
        
        const metrics = await this.#simulateEpoch(epoch);
        this.#metrics.push(metrics);
        
        // Emit event for real-time updates
        this.#eventTarget.dispatchEvent(
          new CustomEvent('metrics', { detail: metrics })
        );
        
        yield metrics;
      }
    } finally {
      this.#isTraining = false;
    }
  }
  
  // Event-based subscription
  onMetricsUpdate(callback: (metrics: TrainingMetrics) => void): () => void {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<TrainingMetrics>;
      callback(customEvent.detail);
    };
    
    this.#eventTarget.addEventListener('metrics', handler);
    
    // Return cleanup function
    return () => this.#eventTarget.removeEventListener('metrics', handler);
  }
  
  // Get training statistics
  getStatistics(): {
    totalEpochs: number;
    bestAccuracy: number;
    finalLoss: number;
    averageEpochTime: number;
  } {
    if (this.#metrics.length === 0) {
      throw new Error('No training metrics available');
    }
    
    const accuracies = this.#metrics.map(m => m.accuracy);
    const times = this.#metrics.map((m, i) => 
      i > 0 ? m.timestamp - this.#metrics[i - 1].timestamp : 0
    ).slice(1);
    
    return {
      totalEpochs: this.#metrics.length,
      bestAccuracy: Math.max(...accuracies),
      finalLoss: this.#metrics[this.#metrics.length - 1].loss,
      averageEpochTime: times.reduce((sum, time) => sum + time, 0) / times.length
    };
  }
  
  stop(): void {
    this.#isTraining = false;
  }
  
  async #simulateEpoch(epoch: number): Promise<TrainingMetrics> {
    // Simulate training time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simulate improving metrics
    const loss = Math.max(0.01, 1.0 * Math.exp(-epoch * 0.1) + Math.random() * 0.1);
    const accuracy = Math.min(0.99, 1.0 - loss + Math.random() * 0.05);
    
    return {
      epoch,
      loss,
      accuracy,
      timestamp: Date.now()
    };
  }
}

// Usage example
const monitor = new PAITrainingMonitor({
  modelName: 'harmonic_encoder_v1',
  maxEpochs: 50,
  learningRate: 0.001
});

// Subscribe to real-time updates
const unsubscribe = monitor.onMetricsUpdate((metrics) => {
  console.log(`Epoch ${metrics.epoch}: Loss=${metrics.loss.toFixed(4)}, Accuracy=${metrics.accuracy.toFixed(4)}`);
});

// Start training and process metrics
(async () => {
  for await (const metrics of monitor.startTraining()) {
    if (metrics.accuracy > 0.95) {
      console.log('Target accuracy reached!');
      monitor.stop();
      break;
    }
  }
  
  console.log('Training completed:', monitor.getStatistics());
  unsubscribe(); // Cleanup
})();
```

## Assignment

1. **Modern PAI Class**: Create a PAI model class using ES2022+ features and TypeScript
2. **Async Data Pipeline**: Build an async data processing pipeline with error handling
3. **Real-time Monitor**: Implement a training monitor with event-driven updates

## Next Week Preview

Next week we'll dive into advanced async patterns, Promise combinators, and building responsive PAI applications with proper error boundaries.

---

*Week 1 of JavaScript/Node.js for Personal AI Development - PAI Training Academy* 