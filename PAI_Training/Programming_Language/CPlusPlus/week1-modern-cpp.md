# Week 1: Modern C++ Features and Best Practices

## Learning Objectives

By the end of this week, you will:
- Understand key C++17/20 features relevant to PAI development
- Apply modern C++ best practices in your code
- Use auto, constexpr, and range-based loops effectively
- Implement structured bindings and std::optional

## C++17/20 Features for PAI Development

### 1. Auto Type Deduction

```cpp
// Modern approach - let compiler deduce types
auto pai_model = load_neural_network("harmonic_encoder.model");
auto training_data = std::vector<float>{1.0f, 2.0f, 3.0f};

// Instead of verbose type declarations
std::unique_ptr<NeuralNetwork> pai_model = load_neural_network("harmonic_encoder.model");
std::vector<float> training_data = std::vector<float>{1.0f, 2.0f, 3.0f};
```

### 2. Constexpr for Compile-Time Computation

```cpp
// Compile-time constants for PAI configuration
constexpr size_t MAX_HARMONIC_FREQUENCIES = 128;
constexpr double LEARNING_RATE = 0.001;

// Constexpr functions for mathematical operations
constexpr double sigmoid(double x) {
    return 1.0 / (1.0 + std::exp(-x));
}

// Use in template parameters
std::array<double, MAX_HARMONIC_FREQUENCIES> frequency_buffer;
```

### 3. Range-Based Loops

```cpp
// Processing PAI training data
std::vector<TrainingExample> training_set = load_training_data();

// Modern range-based loop
for (const auto& example : training_set) {
    process_training_example(example);
}

// With structured bindings (C++17)
std::map<std::string, double> model_weights;
for (const auto& [layer_name, weight] : model_weights) {
    std::cout << layer_name << ": " << weight << std::endl;
}
```

### 4. Structured Bindings

```cpp
// Returning multiple values from PAI functions
std::tuple<double, double, bool> evaluate_model(const Model& model) {
    double accuracy = calculate_accuracy(model);
    double loss = calculate_loss(model);
    bool converged = check_convergence(model);
    return {accuracy, loss, converged};
}

// Using structured bindings
auto [accuracy, loss, converged] = evaluate_model(pai_model);
if (converged) {
    std::cout << "Model converged with accuracy: " << accuracy << std::endl;
}
```

### 5. std::optional for Safe Returns

```cpp
#include <optional>

// Safe model loading that might fail
std::optional<Model> load_pai_model(const std::string& path) {
    if (file_exists(path)) {
        return Model::from_file(path);
    }
    return std::nullopt;  // No value
}

// Usage with safety checks
if (auto model = load_pai_model("harmonic_encoder.pai")) {
    // Model loaded successfully
    train_model(*model);
} else {
    std::cerr << "Failed to load PAI model" << std::endl;
}
```

## Best Practices for PAI Development

### 1. RAII (Resource Acquisition Is Initialization)

```cpp
class PAIModelTrainer {
private:
    std::unique_ptr<GPUContext> gpu_context_;
    std::unique_ptr<DataLoader> data_loader_;
    
public:
    PAIModelTrainer(const std::string& config_path) 
        : gpu_context_(std::make_unique<GPUContext>())
        , data_loader_(std::make_unique<DataLoader>(config_path)) {
        // Resources automatically managed
    }
    
    // Destructor automatically cleans up resources
    ~PAIModelTrainer() = default;
};
```

### 2. Move Semantics for Performance

```cpp
class HarmonicEncoder {
private:
    std::vector<double> frequency_data_;
    
public:
    // Move constructor for efficient transfers
    HarmonicEncoder(std::vector<double>&& data) 
        : frequency_data_(std::move(data)) {}
    
    // Move assignment operator
    HarmonicEncoder& operator=(HarmonicEncoder&& other) noexcept {
        frequency_data_ = std::move(other.frequency_data_);
        return *this;
    }
};

// Usage - no unnecessary copies
auto encoder = HarmonicEncoder(generate_frequency_data());
```

### 3. Smart Pointers for Memory Safety

```cpp
#include <memory>

class PAINetwork {
public:
    // Factory function returning smart pointer
    static std::unique_ptr<PAINetwork> create(const Config& config) {
        return std::make_unique<PAINetwork>(config);
    }
    
    // Shared ownership for distributed components
    std::shared_ptr<HarmonicProcessor> get_processor() {
        if (!processor_) {
            processor_ = std::make_shared<HarmonicProcessor>();
        }
        return processor_;
    }
    
private:
    std::shared_ptr<HarmonicProcessor> processor_;
};
```

## Practical Exercise: PAI Data Processor

Create a modern C++ class that processes PAI training data:

```cpp
#include <vector>
#include <optional>
#include <memory>
#include <algorithm>

class PAIDataProcessor {
private:
    std::vector<double> data_;
    
public:
    // Constructor with move semantics
    explicit PAIDataProcessor(std::vector<double>&& input_data) 
        : data_(std::move(input_data)) {}
    
    // Process data with modern C++ features
    std::optional<double> calculate_harmonic_mean() const {
        if (data_.empty()) {
            return std::nullopt;
        }
        
        double sum = 0.0;
        for (const auto& value : data_) {
            if (value <= 0.0) {
                return std::nullopt;  // Invalid for harmonic mean
            }
            sum += 1.0 / value;
        }
        
        return data_.size() / sum;
    }
    
    // Apply transformation using algorithms
    void normalize() {
        if (data_.empty()) return;
        
        auto [min_it, max_it] = std::minmax_element(data_.begin(), data_.end());
        double range = *max_it - *min_it;
        
        if (range > 0.0) {
            std::transform(data_.begin(), data_.end(), data_.begin(),
                [min_val = *min_it, range](double value) {
                    return (value - min_val) / range;
                });
        }
    }
    
    // Getter with const correctness
    const std::vector<double>& get_data() const { return data_; }
};
```

## Assignment

1. **Modernize Legacy Code**: Take a provided C++98 style PAI function and modernize it using C++17/20 features
2. **Implement Safe Model Loader**: Create a function that safely loads PAI models using std::optional
3. **Design Data Pipeline**: Build a data processing pipeline using modern C++ features and RAII

## Next Week Preview

Next week we'll dive deep into smart pointers and RAII patterns, essential for managing resources in PAI applications running on resource-constrained devices.

---

*Week 1 of C++ for Personal AI Development - PAI Training Academy* 