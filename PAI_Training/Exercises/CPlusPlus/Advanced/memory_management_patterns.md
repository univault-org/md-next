---
title: "Memory Management Patterns in High-Performance C++"
description: "Master advanced memory management techniques used in high-performance systems like llama.cpp, focusing on RAII, custom allocators, memory mapping, and efficient resource management."
difficulty: "Advanced"
exercise_type: "Code Completion"
language: "CPlusPlus"
category: "Advanced"
tags: ["memory-management", "RAII", "smart-pointers", "performance", "llama.cpp", "allocators"]
estimated_time: "45-60 minutes"
prerequisites: ["Modern C++ fundamentals", "Basic understanding of pointers", "RAII principles"]
learning_objectives:
  - "Master RAII (Resource Acquisition Is Initialization) principles"
  - "Understand modern C++ memory management patterns"
  - "Implement custom allocators and memory mappers"
  - "Apply smart pointers and move semantics effectively"
  - "Handle large data structures efficiently"
date: "2024-01-15"
---

# Memory Management Patterns in High-Performance C++

**Objective**: Master advanced memory management techniques used in high-performance systems like llama.cpp, focusing on RAII, custom allocators, memory mapping, and efficient resource management.

## Overview

This exercise explores memory management patterns used in production systems like llama.cpp, which handles multi-gigabyte AI models efficiently. You'll implement a simplified version of a memory allocator that demonstrates key concepts from real-world C++ systems.

## Learning Goals

- Master RAII (Resource Acquisition Is Initialization) principles
- Understand modern C++ memory management patterns
- Implement custom allocators and memory mappers
- Apply smart pointers and move semantics effectively
- Handle large data structures efficiently

## Background: llama.cpp Memory Management

llama.cpp uses sophisticated memory management to handle large language models efficiently:

1. **Memory Mapping (mmap)**: Maps model files directly into memory
2. **Custom Allocators**: Optimizes memory allocation patterns
3. **RAII Wrappers**: Ensures proper resource cleanup
4. **Reference Counting**: Manages shared tensor data

Let's implement a simplified version of these patterns!

## Exercise 1: RAII Memory Mapper

<InteractiveCodeEditor
  template={`#include <iostream>
#include <memory>
#include <string>
#include <stdexcept>
#include <cstdio>

// TODO: Implement MemoryMapper class
class MemoryMapper {
private:
    void* mapped_ptr;
    size_t mapped_size;
    std::string filename;
    
public:
    // Constructor: should map file to memory using RAII
    MemoryMapper(const std::string& file, size_t size) 
        : mapped_ptr(nullptr), mapped_size(0), filename(file) {
        // TODO: Implement memory mapping simulation
        // In real code, this would use mmap() on Unix or MapViewOfFile on Windows
        
    }
    
    // Destructor: should automatically unmap memory
    ~MemoryMapper() {
        // TODO: Implement cleanup
        
    }
    
    // Copy constructor and assignment: make non-copyable
    MemoryMapper(const MemoryMapper&) = delete;
    MemoryMapper& operator=(const MemoryMapper&) = delete;
    
    // Move constructor and assignment: should transfer ownership
    MemoryMapper(MemoryMapper&& other) noexcept {
        // TODO: Implement move constructor
        
    }
    
    MemoryMapper& operator=(MemoryMapper&& other) noexcept {
        // TODO: Implement move assignment
        
        return *this;
    }
    
    // Get pointer to mapped memory
    void* data() const { return mapped_ptr; }
    
    // Get size of mapped region
    size_t size() const { return mapped_size; }
    
    // Check if mapping is valid
    bool is_valid() const { return mapped_ptr != nullptr; }
};

// Test function
int main() {
    try {
        // Create memory mapper
        MemoryMapper mapper("model.dat", 1024 * 1024); // 1MB
        
        if (mapper.is_valid()) {
            std::cout << "Successfully mapped " << mapper.size() << " bytes\\n";
            
            // Test move semantics
            MemoryMapper moved_mapper = std::move(mapper);
            std::cout << "Moved mapper size: " << moved_mapper.size() << "\\n";
        }
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << "\\n";
    }
    
    return 0;
}`}
  language="cpp"
  expectedOutput="Successfully mapped 1048576 bytes
Moved mapper size: 1048576"
  hints={[
    "Use RAII: allocate in constructor, deallocate in destructor",
    "For simulation, use malloc/free instead of actual mmap",
    "In move constructor, transfer ownership and nullify source",
    "Remember to check for self-assignment in move operator",
    "Use std::exchange for clean move semantics"
  ]}
/>

## Exercise 2: Smart Pointer Tensor System

<InteractiveCodeEditor
  template={`#include <iostream>
#include <memory>
#include <vector>
#include <algorithm>
#include <numeric>

// Forward declaration
class TensorData;

// Custom deleter for tensor data
struct TensorDeleter {
    void operator()(float* ptr) const {
        std::cout << "Freeing tensor data\\n";
        delete[] ptr;
    }
};

// Tensor class using modern C++ memory management
class Tensor {
private:
    std::unique_ptr<float[], TensorDeleter> data_;
    std::vector<size_t> shape_;
    size_t total_elements_;
    
    size_t calculate_size() const {
        return std::accumulate(shape_.begin(), shape_.end(), 
                             size_t{1}, std::multiplies<size_t>());
    }
    
public:
    // Constructor with shape
    explicit Tensor(const std::vector<size_t>& shape) 
        : shape_(shape), total_elements_(calculate_size()) {
        // TODO: Allocate memory using unique_ptr
        
        
        // Initialize with sequential values for testing
        for (size_t i = 0; i < total_elements_; ++i) {
            data_[i] = static_cast<float>(i + 1);
        }
        
        std::cout << "Created tensor with " << total_elements_ << " elements\\n";
    }
    
    // Move constructor (copy should be expensive, so prefer move)
    Tensor(Tensor&& other) noexcept 
        : data_(std::move(other.data_)), 
          shape_(std::move(other.shape_)),
          total_elements_(other.total_elements_) {
        other.total_elements_ = 0;
        std::cout << "Moved tensor\\n";
    }
    
    // Move assignment
    Tensor& operator=(Tensor&& other) noexcept {
        if (this != &other) {
            // TODO: Implement move assignment
            
        }
        return *this;
    }
    
    // Delete copy operations (tensors should be moved, not copied)
    Tensor(const Tensor&) = delete;
    Tensor& operator=(const Tensor&) = delete;
    
    // Access data
    float* data() { return data_.get(); }
    const float* data() const { return data_.get(); }
    
    // Get shape
    const std::vector<size_t>& shape() const { return shape_; }
    
    // Get total number of elements
    size_t size() const { return total_elements_; }
    
    // Factory method for creating tensors
    static std::unique_ptr<Tensor> create(const std::vector<size_t>& shape) {
        // TODO: Use make_unique or custom factory
        return std::make_unique<Tensor>(shape);
    }
    
    // Sum all elements (for testing)
    float sum() const {
        float total = 0.0f;
        for (size_t i = 0; i < total_elements_; ++i) {
            total += data_[i];
        }
        return total;
    }
};

// Tensor manager using shared ownership
class TensorManager {
private:
    std::vector<std::shared_ptr<Tensor>> tensors_;
    
public:
    // Add tensor with shared ownership
    void add_tensor(std::unique_ptr<Tensor> tensor) {
        // TODO: Convert unique_ptr to shared_ptr and store
        
        std::cout << "Added tensor to manager, total: " << tensors_.size() << "\\n";
    }
    
    // Get tensor by index
    std::shared_ptr<Tensor> get_tensor(size_t index) const {
        if (index >= tensors_.size()) {
            throw std::out_of_range("Tensor index out of range");
        }
        return tensors_[index];
    }
    
    // Get total memory usage
    size_t total_memory() const {
        size_t total = 0;
        for (const auto& tensor : tensors_) {
            if (tensor) {
                total += tensor->size() * sizeof(float);
            }
        }
        return total;
    }
    
    size_t count() const { return tensors_.size(); }
};

int main() {
    try {
        TensorManager manager;
        
        // Create tensors using factory method
        auto tensor1 = Tensor::create({2, 3}); // 2x3 matrix
        auto tensor2 = Tensor::create({4});    // 1D vector
        
        std::cout << "Tensor1 sum: " << tensor1->sum() << "\\n";
        std::cout << "Tensor2 sum: " << tensor2->sum() << "\\n";
        
        // Move tensors to manager
        manager.add_tensor(std::move(tensor1));
        manager.add_tensor(std::move(tensor2));
        
        std::cout << "Total memory: " << manager.total_memory() << " bytes\\n";
        
        // Access via manager
        auto retrieved = manager.get_tensor(0);
        std::cout << "Retrieved tensor sum: " << retrieved->sum() << "\\n";
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << "\\n";
    }
    
    return 0;
}`}
  language="cpp"
  expectedOutput="Created tensor with 6 elements
Created tensor with 4 elements
Tensor1 sum: 21
Tensor2 sum: 10
Moved tensor
Added tensor to manager, total: 1
Moved tensor
Added tensor to manager, total: 2
Total memory: 40 bytes
Retrieved tensor sum: 21
Freeing tensor data
Freeing tensor data"
  hints={[
    "Use std::make_unique for data_ allocation: data_.reset(new float[total_elements_])",
    "In move assignment, use move for all member variables",
    "Convert unique_ptr to shared_ptr using shared_ptr constructor or std::move",
    "Remember to handle self-assignment in move operations",
    "Use RAII - destructor automatically called via custom deleter"
  ]}
/>

## Exercise 3: Memory Pool Allocator

<InteractiveCodeEditor
  template={`#include <iostream>
#include <memory>
#include <vector>
#include <cstdlib>
#include <cstring>

// Simple memory pool for efficient allocation
class MemoryPool {
private:
    std::unique_ptr<char[]> pool_;
    size_t pool_size_;
    size_t current_offset_;
    
public:
    explicit MemoryPool(size_t size) 
        : pool_size_(size), current_offset_(0) {
        // TODO: Allocate the pool using unique_ptr
        
        std::cout << "Created memory pool of " << pool_size_ << " bytes\\n";
    }
    
    // Allocate memory from pool
    void* allocate(size_t size, size_t alignment = 8) {
        // TODO: Implement aligned allocation from pool
        // 1. Calculate aligned offset
        // 2. Check if enough space remains
        // 3. Return pointer and update offset
        
        size_t aligned_offset = (current_offset_ + alignment - 1) & ~(alignment - 1);
        
        if (aligned_offset + size > pool_size_) {
            throw std::bad_alloc();
        }
        
        void* ptr = pool_.get() + aligned_offset;
        current_offset_ = aligned_offset + size;
        
        std::cout << "Allocated " << size << " bytes at offset " << aligned_offset << "\\n";
        return ptr;
    }
    
    // Reset pool (simple free-all)
    void reset() {
        current_offset_ = 0;
        std::cout << "Reset memory pool\\n";
    }
    
    // Get usage statistics
    size_t used() const { return current_offset_; }
    size_t available() const { return pool_size_ - current_offset_; }
    double usage_percent() const { 
        return (double)current_offset_ / pool_size_ * 100.0; 
    }
};

// RAII wrapper for pool-allocated memory
template<typename T>
class PoolAllocated {
private:
    T* ptr_;
    MemoryPool* pool_;
    
public:
    // Constructor - allocates from pool
    PoolAllocated(MemoryPool& pool, size_t count = 1) 
        : pool_(&pool) {
        // TODO: Allocate memory for count objects of type T
        
        
        // Initialize objects using placement new
        for (size_t i = 0; i < count; ++i) {
            new (ptr_ + i) T();
        }
    }
    
    // Destructor - calls destructors but doesn't free memory
    ~PoolAllocated() {
        // TODO: Destroy objects but don't free memory (pool handles that)
        // Note: Pool doesn't support individual deallocation
        
    }
    
    // Non-copyable for simplicity
    PoolAllocated(const PoolAllocated&) = delete;
    PoolAllocated& operator=(const PoolAllocated&) = delete;
    
    // Move semantics
    PoolAllocated(PoolAllocated&& other) noexcept 
        : ptr_(other.ptr_), pool_(other.pool_) {
        other.ptr_ = nullptr;
        other.pool_ = nullptr;
    }
    
    PoolAllocated& operator=(PoolAllocated&& other) noexcept {
        if (this != &other) {
            // TODO: Implement move assignment
            
        }
        return *this;
    }
    
    // Access operators
    T& operator*() { return *ptr_; }
    const T& operator*() const { return *ptr_; }
    T* operator->() { return ptr_; }
    const T* operator->() const { return ptr_; }
    T* get() { return ptr_; }
    const T* get() const { return ptr_; }
};

// Test class
class TestData {
private:
    int value_;
    
public:
    TestData(int v = 42) : value_(v) {
        std::cout << "TestData(" << value_ << ") constructed\\n";
    }
    
    ~TestData() {
        std::cout << "TestData(" << value_ << ") destroyed\\n";
    }
    
    int value() const { return value_; }
    void set_value(int v) { value_ = v; }
};

int main() {
    try {
        // Create a memory pool
        MemoryPool pool(1024); // 1KB pool
        
        {
            // Allocate some objects from the pool
            PoolAllocated<TestData> data1(pool);
            PoolAllocated<TestData> data2(pool);
            
            data1->set_value(100);
            data2->set_value(200);
            
            std::cout << "Data1: " << data1->value() << "\\n";
            std::cout << "Data2: " << data2->value() << "\\n";
            
            std::cout << "Pool usage: " << pool.usage_percent() << "%\\n";
            
            // Test move semantics
            PoolAllocated<TestData> moved_data = std::move(data1);
            std::cout << "Moved data: " << moved_data->value() << "\\n";
            
        } // Objects destroyed here
        
        std::cout << "After destruction, pool usage: " << pool.usage_percent() << "%\\n";
        
        // Reset pool for reuse
        pool.reset();
        std::cout << "After reset, pool usage: " << pool.usage_percent() << "%\\n";
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << "\\n";
    }
    
    return 0;
}`}
  language="cpp"
  expectedOutput="Created memory pool of 1024 bytes
Allocated 4 bytes at offset 0
TestData(42) constructed
Allocated 4 bytes at offset 8
TestData(42) constructed
Data1: 100
Data2: 200
Pool usage: 1.5625%
Moved data: 100
TestData(200) destroyed
TestData(100) destroyed
After destruction, pool usage: 1.5625%
Reset memory pool
After reset, pool usage: 0%"
  hints={[
    "Allocate pool with: pool_ = std::make_unique<char[]>(pool_size_)",
    "For PoolAllocated constructor: ptr_ = static_cast<T*>(pool.allocate(sizeof(T) * count))",
    "In destructor, call destructors but don't free memory: just call ~T()",
    "Move assignment should transfer ptr_ and pool_, then nullify source",
    "Remember alignment calculations for proper memory layout"
  ]}
/>

## Mental Model Development

### Key Concepts to Internalize

1. **RAII Ownership**: Resources are acquired in constructors and released in destructors
2. **Move Semantics**: Prefer moving expensive objects over copying
3. **Smart Pointers**: Use unique_ptr for exclusive ownership, shared_ptr for shared ownership
4. **Memory Mapping**: Direct file-to-memory mapping for efficient large data access
5. **Custom Allocators**: Pool allocation for performance-critical code

### Design Patterns from llama.cpp

1. **Resource Manager Pattern**: Centralized resource management
2. **Factory Pattern**: Controlled object creation
3. **Strategy Pattern**: Different backends (CPU, GPU, Metal)
4. **RAII Wrapper Pattern**: Safe resource handling

### Performance Considerations

1. **Memory Locality**: Keep related data close in memory
2. **Alignment**: Proper alignment for SIMD operations
3. **Pool Allocation**: Reduce fragmentation and allocation overhead
4. **Copy Avoidance**: Use move semantics and references

## Advanced Challenge

Combine all concepts to create a `ModelLoader` class that:
- Uses memory mapping for model files
- Implements a tensor pool allocator
- Manages tensors with smart pointers
- Provides efficient loading and unloading

This exercise demonstrates the sophisticated memory management techniques used in production C++ systems like llama.cpp, preparing you for high-performance C++ development. 