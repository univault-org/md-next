# Week 1: Modern Python Features and Type Hints

## Learning Objectives

By the end of this week, you will:
- Use Python 3.9+ features for PAI development
- Implement comprehensive type hints for better code quality
- Apply pattern matching and structural pattern matching
- Use walrus operator and positional-only parameters effectively

## Python 3.9+ Features for PAI Development

### 1. Type Hints and Annotations

```python
from typing import List, Dict, Optional, Union, Protocol
from dataclasses import dataclass
import numpy as np

# Type hints for PAI data structures
@dataclass
class TrainingExample:
    input_data: np.ndarray
    target: float
    metadata: Dict[str, Union[str, float]]

class PAIModel(Protocol):
    """Protocol defining PAI model interface"""
    def predict(self, input_data: np.ndarray) -> np.ndarray: ...
    def train(self, examples: List[TrainingExample]) -> None: ...

# Function with comprehensive type hints
def process_harmonic_data(
    frequencies: List[float],
    amplitudes: List[float],
    *,  # Force keyword-only arguments
    sample_rate: int = 44100,
    window_size: Optional[int] = None
) -> Dict[str, np.ndarray]:
    """Process harmonic frequency data for PAI training.
    
    Args:
        frequencies: List of frequency values in Hz
        amplitudes: Corresponding amplitude values
        sample_rate: Audio sample rate (keyword-only)
        window_size: Optional window size for processing
        
    Returns:
        Dictionary containing processed harmonic features
    """
    if window_size is None:
        window_size = sample_rate // 10
    
    # Processing logic here
    return {
        "harmonic_features": np.array(frequencies),
        "amplitude_envelope": np.array(amplitudes)
    }
```

### 2. Dataclasses for PAI Configuration

```python
from dataclasses import dataclass, field
from typing import List, Optional
from pathlib import Path

@dataclass
class PAIConfig:
    """Configuration for PAI training and inference"""
    model_name: str
    learning_rate: float = 0.001
    batch_size: int = 32
    max_epochs: int = 100
    
    # Complex default values
    hidden_layers: List[int] = field(default_factory=lambda: [128, 64, 32])
    checkpoint_dir: Path = field(default_factory=lambda: Path("./checkpoints"))
    
    # Post-init validation
    def __post_init__(self):
        if self.learning_rate <= 0:
            raise ValueError("Learning rate must be positive")
        if not self.hidden_layers:
            raise ValueError("Must specify at least one hidden layer")

# Usage
config = PAIConfig(
    model_name="harmonic_encoder_v1",
    learning_rate=0.0005,
    hidden_layers=[256, 128, 64]
)
```

### 3. Pattern Matching (Python 3.10+)

```python
from enum import Enum
from typing import Union

class PAIMessageType(Enum):
    TRAINING_DATA = "training_data"
    MODEL_UPDATE = "model_update"
    INFERENCE_REQUEST = "inference_request"
    HEARTBEAT = "heartbeat"

@dataclass
class PAIMessage:
    type: PAIMessageType
    payload: Union[Dict, List, str]
    timestamp: float

def handle_pai_message(message: PAIMessage) -> str:
    """Handle different types of PAI network messages using pattern matching"""
    match message.type:
        case PAIMessageType.TRAINING_DATA:
            return process_training_data(message.payload)
        
        case PAIMessageType.MODEL_UPDATE:
            return apply_model_update(message.payload)
        
        case PAIMessageType.INFERENCE_REQUEST:
            return handle_inference(message.payload)
        
        case PAIMessageType.HEARTBEAT:
            return "acknowledged"
        
        case _:
            return f"Unknown message type: {message.type}"

# Advanced pattern matching with guards
def classify_pai_performance(accuracy: float, loss: float) -> str:
    match (accuracy, loss):
        case (acc, _) if acc > 0.95:
            return "excellent"
        case (acc, loss_val) if acc > 0.85 and loss_val < 0.1:
            return "good"
        case (acc, _) if acc > 0.7:
            return "acceptable"
        case _:
            return "needs_improvement"
```

### 4. Walrus Operator for Efficient Processing

```python
import numpy as np
from typing import Iterator, Optional

def process_pai_data_stream(data_stream: Iterator[np.ndarray]) -> List[np.ndarray]:
    """Process PAI data stream efficiently using walrus operator"""
    processed_batches = []
    
    # Process while data is available
    while (batch := next(data_stream, None)) is not None:
        # Only process if batch meets criteria
        if (batch_size := len(batch)) > 10:
            normalized = batch / np.max(batch) if (max_val := np.max(batch)) > 0 else batch
            processed_batches.append(normalized)
    
    return processed_batches

def find_harmonic_peaks(signal: np.ndarray, threshold: float = 0.5) -> List[int]:
    """Find harmonic peaks using walrus operator for efficiency"""
    peaks = []
    
    for i, value in enumerate(signal):
        # Check if current value is a peak and above threshold
        if (value > threshold and 
            (prev_val := signal[i-1] if i > 0 else 0) < value and
            (next_val := signal[i+1] if i < len(signal)-1 else 0) < value):
            peaks.append(i)
    
    return peaks
```

### 5. Advanced Type Hints with Generics

```python
from typing import TypeVar, Generic, Callable, Any
from abc import ABC, abstractmethod

T = TypeVar('T')
U = TypeVar('U')

class PAIProcessor(Generic[T, U], ABC):
    """Generic PAI data processor"""
    
    @abstractmethod
    def process(self, input_data: T) -> U:
        """Process input data and return result"""
        pass

class HarmonicProcessor(PAIProcessor[np.ndarray, Dict[str, float]]):
    """Concrete implementation for harmonic data processing"""
    
    def process(self, input_data: np.ndarray) -> Dict[str, float]:
        # Compute harmonic features
        fundamental_freq = self._find_fundamental(input_data)
        harmonics = self._extract_harmonics(input_data, fundamental_freq)
        
        return {
            "fundamental": fundamental_freq,
            "harmonic_ratio": np.mean(harmonics),
            "spectral_centroid": np.average(range(len(input_data)), weights=input_data)
        }
    
    def _find_fundamental(self, signal: np.ndarray) -> float:
        # Implementation details
        return 440.0  # Placeholder
    
    def _extract_harmonics(self, signal: np.ndarray, fundamental: float) -> np.ndarray:
        # Implementation details
        return np.array([1.0, 0.5, 0.25])  # Placeholder

# Factory function with type hints
def create_processor(processor_type: str) -> PAIProcessor[Any, Any]:
    match processor_type:
        case "harmonic":
            return HarmonicProcessor()
        case _:
            raise ValueError(f"Unknown processor type: {processor_type}")
```

## Best Practices for PAI Python Development

### 1. Error Handling and Validation

```python
from typing import Union
import logging

logger = logging.getLogger(__name__)

class PAIValidationError(Exception):
    """Custom exception for PAI validation errors"""
    pass

def validate_training_data(data: List[TrainingExample]) -> None:
    """Validate PAI training data with comprehensive checks"""
    if not data:
        raise PAIValidationError("Training data cannot be empty")
    
    for i, example in enumerate(data):
        if example.input_data.size == 0:
            raise PAIValidationError(f"Example {i} has empty input data")
        
        if not np.isfinite(example.target):
            raise PAIValidationError(f"Example {i} has invalid target value")
        
        if example.input_data.dtype not in [np.float32, np.float64]:
            logger.warning(f"Example {i} has non-float input data type: {example.input_data.dtype}")

def safe_model_prediction(
    model: PAIModel, 
    input_data: np.ndarray
) -> Union[np.ndarray, None]:
    """Safely make model predictions with error handling"""
    try:
        validate_input_shape(input_data, expected_shape=model.input_shape)
        return model.predict(input_data)
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        return None

def validate_input_shape(data: np.ndarray, expected_shape: tuple) -> None:
    """Validate input data shape"""
    if data.shape != expected_shape:
        raise PAIValidationError(
            f"Input shape {data.shape} doesn't match expected {expected_shape}"
        )
```

### 2. Context Managers for Resource Management

```python
from contextlib import contextmanager
import time

@contextmanager
def pai_training_session(config: PAIConfig):
    """Context manager for PAI training sessions"""
    print(f"Starting PAI training session: {config.model_name}")
    start_time = time.time()
    
    try:
        # Setup resources
        setup_training_environment(config)
        yield config
    finally:
        # Cleanup
        cleanup_training_environment()
        duration = time.time() - start_time
        print(f"Training session completed in {duration:.2f} seconds")

# Usage
with pai_training_session(config) as training_config:
    model = create_model(training_config)
    train_model(model, training_data)
```

## Practical Exercise: PAI Data Validator

Create a comprehensive data validation system for PAI training:

```python
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum
import numpy as np

class ValidationLevel(Enum):
    STRICT = "strict"
    MODERATE = "moderate"
    LENIENT = "lenient"

@dataclass
class ValidationResult:
    is_valid: bool
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)
    
    def add_error(self, message: str) -> None:
        self.errors.append(message)
        self.is_valid = False
    
    def add_warning(self, message: str) -> None:
        self.warnings.append(message)

class PAIDataValidator:
    """Comprehensive validator for PAI training data"""
    
    def __init__(self, validation_level: ValidationLevel = ValidationLevel.MODERATE):
        self.validation_level = validation_level
    
    def validate_dataset(self, examples: List[TrainingExample]) -> ValidationResult:
        """Validate entire dataset"""
        result = ValidationResult(is_valid=True)
        
        if not examples:
            result.add_error("Dataset is empty")
            return result
        
        # Validate each example
        for i, example in enumerate(examples):
            self._validate_example(example, i, result)
        
        # Dataset-level validations
        self._validate_dataset_consistency(examples, result)
        
        return result
    
    def _validate_example(
        self, 
        example: TrainingExample, 
        index: int, 
        result: ValidationResult
    ) -> None:
        """Validate individual training example"""
        # Check input data
        if example.input_data.size == 0:
            result.add_error(f"Example {index}: Empty input data")
        
        if not np.isfinite(example.input_data).all():
            result.add_error(f"Example {index}: Non-finite values in input")
        
        # Check target
        if not np.isfinite(example.target):
            result.add_error(f"Example {index}: Invalid target value")
        
        # Validation level specific checks
        match self.validation_level:
            case ValidationLevel.STRICT:
                self._strict_validation(example, index, result)
            case ValidationLevel.MODERATE:
                self._moderate_validation(example, index, result)
            case ValidationLevel.LENIENT:
                self._lenient_validation(example, index, result)
    
    def _validate_dataset_consistency(
        self, 
        examples: List[TrainingExample], 
        result: ValidationResult
    ) -> None:
        """Validate consistency across the dataset"""
        shapes = [ex.input_data.shape for ex in examples]
        if len(set(shapes)) > 1:
            result.add_warning("Inconsistent input shapes across examples")
        
        targets = [ex.target for ex in examples]
        if len(set(targets)) == 1:
            result.add_warning("All targets have the same value")
```

## Assignment

1. **Type-Annotated PAI Module**: Create a module with comprehensive type hints for PAI data processing
2. **Pattern Matching Message Handler**: Implement a message handling system using pattern matching
3. **Data Validation Pipeline**: Build a validation system using modern Python features

## Next Week Preview

Next week we'll explore async/await programming for concurrent PAI operations and building responsive PAI applications.

---

*Week 1 of Python for Personal AI Development - PAI Training Academy* 