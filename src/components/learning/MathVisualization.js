import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  BiMath,
  BiPlay,
  BiPause,
  BiRefresh,
  BiZoomIn,
  BiZoomOut,
  BiMove,
  BiSlider,
  BiCalculator,
  BiLightbulb,
  BiCheckCircle,
  BiX,
} from "react-icons/bi";

const MathVisualization = ({
  title = "Mathematical Visualization",
  description = "",
  functionType = "linear",
  parameters = {},
  interactive = true,
  showGrid = true,
  showAxes = true,
  width = 600,
  height = 400,
  onParameterChange,
}) => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParams, setCurrentParams] = useState(parameters);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    drawVisualization();
  }, [currentParams, zoom, offset, showGrid, showAxes]);

  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = width / 2 + offset.x;
    const centerY = height / 2 + offset.y;
    const scale = 20 * zoom; // pixels per unit

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    if (showGrid) {
      drawGrid(ctx, centerX, centerY, scale);
    }

    // Draw axes
    if (showAxes) {
      drawAxes(ctx, centerX, centerY);
    }

    // Draw function
    drawFunction(ctx, centerX, centerY, scale);

    // Draw labels and annotations
    drawLabels(ctx, centerX, centerY, scale);
  };

  const drawGrid = (ctx, centerX, centerY, scale) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;

    // Vertical lines
    for (let x = centerX % scale; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = centerY % scale; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawAxes = (ctx, centerX, centerY) => {
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;

    // X-axis
    if (centerY >= 0 && centerY <= height) {
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // X-axis arrow
      ctx.beginPath();
      ctx.moveTo(width - 10, centerY - 5);
      ctx.lineTo(width, centerY);
      ctx.lineTo(width - 10, centerY + 5);
      ctx.stroke();
    }

    // Y-axis
    if (centerX >= 0 && centerX <= width) {
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      // Y-axis arrow
      ctx.beginPath();
      ctx.moveTo(centerX - 5, 10);
      ctx.lineTo(centerX, 0);
      ctx.lineTo(centerX + 5, 10);
      ctx.stroke();
    }
  };

  const drawFunction = (ctx, centerX, centerY, scale) => {
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let firstPoint = true;

    for (let pixelX = 0; pixelX < width; pixelX += 1) {
      const x = (pixelX - centerX) / scale;
      const y = evaluateFunction(x, functionType, currentParams);
      
      if (y !== null && !isNaN(y) && isFinite(y)) {
        const pixelY = centerY - y * scale;
        
        if (pixelY >= -100 && pixelY <= height + 100) { // Extended bounds for smooth curves
          if (firstPoint) {
            ctx.moveTo(pixelX, pixelY);
            firstPoint = false;
          } else {
            ctx.lineTo(pixelX, pixelY);
          }
        }
      }
    }

    ctx.stroke();

    // Draw special points
    drawSpecialPoints(ctx, centerX, centerY, scale);
  };

  const drawSpecialPoints = (ctx, centerX, centerY, scale) => {
    // Draw critical points, intercepts, etc. based on function type
    if (functionType === 'quadratic') {
      const { a = 1, b = 0, c = 0 } = currentParams;
      
      // Vertex
      const vertexX = -b / (2 * a);
      const vertexY = evaluateFunction(vertexX, functionType, currentParams);
      
      const pixelX = centerX + vertexX * scale;
      const pixelY = centerY - vertexY * scale;
      
      if (pixelX >= 0 && pixelX <= width && pixelY >= 0 && pixelY <= height) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(pixelX, pixelY, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Label
        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.fillText(`Vertex (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`, pixelX + 10, pixelY - 10);
      }
    }
  };

  const drawLabels = (ctx, centerX, centerY, scale) => {
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';

    // Draw scale markers
    const step = scale >= 40 ? 1 : scale >= 20 ? 2 : 5;
    
    // X-axis labels
    if (centerY >= 0 && centerY <= height) {
      for (let i = -Math.ceil(width / scale); i <= Math.ceil(width / scale); i += step) {
        if (i === 0) continue;
        const x = centerX + i * scale;
        if (x >= 0 && x <= width) {
          ctx.fillText(i.toString(), x - 5, centerY + 15);
        }
      }
    }

    // Y-axis labels
    if (centerX >= 0 && centerX <= width) {
      for (let i = -Math.ceil(height / scale); i <= Math.ceil(height / scale); i += step) {
        if (i === 0) continue;
        const y = centerY - i * scale;
        if (y >= 0 && y <= height) {
          ctx.fillText(i.toString(), centerX + 5, y + 5);
        }
      }
    }
  };

  const evaluateFunction = (x, type, params) => {
    switch (type) {
      case 'linear':
        const { m = 1, b = 0 } = params;
        return m * x + b;
      
      case 'quadratic':
        const { a = 1, b: bQuad = 0, c = 0 } = params;
        return a * x * x + bQuad * x + c;
      
      case 'exponential':
        const { base = Math.E, amplitude: expAmplitude = 1 } = params;
        return expAmplitude * Math.pow(base, x);
      
      case 'logarithmic':
        const { logBase = Math.E, logAmplitude = 1 } = params;
        return x > 0 ? logAmplitude * Math.log(x) / Math.log(logBase) : null;
      
      case 'trigonometric':
        const { trigType = 'sin', frequency = 1, amplitude: trigAmp = 1, phase = 0 } = params;
        switch (trigType) {
          case 'sin':
            return trigAmp * Math.sin(frequency * x + phase);
          case 'cos':
            return trigAmp * Math.cos(frequency * x + phase);
          case 'tan':
            return trigAmp * Math.tan(frequency * x + phase);
          default:
            return trigAmp * Math.sin(frequency * x + phase);
        }
      
      case 'convex':
        // Example convex function: x^2
        const { convexPower = 2, convexScale = 1 } = params;
        return convexScale * Math.pow(Math.abs(x), convexPower);
      
      default:
        return x;
    }
  };

  const handleParameterChange = (paramName, value) => {
    const newParams = { ...currentParams, [paramName]: value };
    setCurrentParams(newParams);
    onParameterChange?.(newParams);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const renderParameterControls = () => {
    const controls = [];

    switch (functionType) {
      case 'linear':
        controls.push(
          <div key="m" className="flex items-center space-x-3">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 w-16">
              Slope (m):
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={currentParams.m || 1}
              onChange={(e) => handleParameterChange('m', parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-12">
              {(currentParams.m || 1).toFixed(1)}
            </span>
          </div>,
          <div key="b" className="flex items-center space-x-3">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 w-16">
              Y-intercept (b):
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={currentParams.b || 0}
              onChange={(e) => handleParameterChange('b', parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-12">
              {(currentParams.b || 0).toFixed(1)}
            </span>
          </div>
        );
        break;

      case 'quadratic':
        controls.push(
          <div key="a" className="flex items-center space-x-3">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 w-16">
              a:
            </label>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={currentParams.a || 1}
              onChange={(e) => handleParameterChange('a', parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-12">
              {(currentParams.a || 1).toFixed(1)}
            </span>
          </div>,
          <div key="b" className="flex items-center space-x-3">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 w-16">
              b:
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={currentParams.b || 0}
              onChange={(e) => handleParameterChange('b', parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-12">
              {(currentParams.b || 0).toFixed(1)}
            </span>
          </div>,
          <div key="c" className="flex items-center space-x-3">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 w-16">
              c:
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={currentParams.c || 0}
              onChange={(e) => handleParameterChange('c', parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-12">
              {(currentParams.c || 0).toFixed(1)}
            </span>
          </div>
        );
        break;

      case 'trigonometric':
        controls.push(
          <div key="amplitude" className="flex items-center space-x-3">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 w-16">
              Amplitude:
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={currentParams.amplitude || 1}
              onChange={(e) => handleParameterChange('amplitude', parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-12">
              {(currentParams.amplitude || 1).toFixed(1)}
            </span>
          </div>,
          <div key="frequency" className="flex items-center space-x-3">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 w-16">
              Frequency:
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={currentParams.frequency || 1}
              onChange={(e) => handleParameterChange('frequency', parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-12">
              {(currentParams.frequency || 1).toFixed(1)}
            </span>
          </div>
        );
        break;
    }

    return controls;
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
            <BiMath className="text-primary-500 text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowControls(!showControls)}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              title="Toggle controls"
            >
              <BiSlider />
            </button>
            <button
              onClick={() => setZoom(Math.min(3, zoom * 1.2))}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              title="Zoom in"
            >
              <BiZoomIn />
            </button>
            <button
              onClick={() => setZoom(Math.max(0.3, zoom / 1.2))}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              title="Zoom out"
            >
              <BiZoomOut />
            </button>
            <button
              onClick={resetView}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              title="Reset view"
            >
              <BiRefresh />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Canvas */}
        <div className="mb-6">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="border border-neutral-200 dark:border-neutral-600 rounded-lg cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        {/* Controls */}
        {interactive && showControls && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 flex items-center">
              <BiCalculator className="mr-2" />
              Function Parameters
            </h4>
            <div className="space-y-3">
              {renderParameterControls()}
            </div>
          </div>
        )}

        {/* Function equation display */}
        <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Current Function:
          </div>
          <div className="font-mono text-lg text-primary-600 dark:text-primary-400">
            {getFunctionEquation(functionType, currentParams)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const getFunctionEquation = (type, params) => {
  switch (type) {
    case 'linear':
      const { m = 1, b = 0 } = params;
      return `f(x) = ${m.toFixed(1)}x ${b >= 0 ? '+' : ''} ${b.toFixed(1)}`;
    
    case 'quadratic':
      const { a = 1, b: bQuad = 0, c = 0 } = params;
      return `f(x) = ${a.toFixed(1)}x² ${bQuad >= 0 ? '+' : ''} ${bQuad.toFixed(1)}x ${c >= 0 ? '+' : ''} ${c.toFixed(1)}`;
    
    case 'trigonometric':
      const { trigType = 'sin', frequency = 1, amplitude = 1, phase = 0 } = params;
      return `f(x) = ${amplitude.toFixed(1)}${trigType}(${frequency.toFixed(1)}x ${phase >= 0 ? '+' : ''} ${phase.toFixed(1)})`;
    
    case 'exponential':
      const { base = Math.E, amplitude: expAmplitude = 1 } = params;
      const baseStr = base === Math.E ? 'e' : base.toFixed(1);
      return `f(x) = ${expAmplitude.toFixed(1)} × ${baseStr}^x`;
    
    case 'convex':
      const { convexPower = 2, convexScale = 1 } = params;
      return `f(x) = ${convexScale.toFixed(1)}|x|^${convexPower.toFixed(1)}`;
    
    default:
      return 'f(x) = x';
  }
};

export default MathVisualization; 