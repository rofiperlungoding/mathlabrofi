import React, { useState, useEffect } from 'react';
import { Activity, Settings, Play } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

export const DifferentialEquationVisualizer: React.FC = () => {
  const [equation, setEquation] = useState('dy/dx = y - x');
  const [gridDensity, setGridDensity] = useState(20);
  const [showSolution, setShowSolution] = useState(true);
  const [initialCondition, setInitialCondition] = useState({ x: 0, y: 1 });
  
  const evaluateDerivative = (x: number, y: number, eq: string): number => {
    try {
      // Simple parser for basic differential equations
      if (eq === 'dy/dx = y - x') {
        return y - x;
      } else if (eq === 'dy/dx = x + y') {
        return x + y;
      } else if (eq === 'dy/dx = -x/y') {
        return y !== 0 ? -x / y : 0;
      } else if (eq === 'dy/dx = sin(x)') {
        return Math.sin(x);
      } else if (eq === 'dy/dx = x^2') {
        return x * x;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  const generateSlopeField = () => {
    const arrows = [];
    const step = 0.5;
    const scale = 30;
    const centerX = 250;
    const centerY = 200;
    
    for (let x = -8; x <= 8; x += step) {
      for (let y = -6; y <= 6; y += step) {
        const slope = evaluateDerivative(x, y, equation);
        const angle = Math.atan(slope);
        const length = Math.min(20, 20 / (1 + Math.abs(slope) / 2));
        
        const startX = centerX + x * scale;
        const startY = centerY - y * scale;
        const endX = startX + length * Math.cos(angle);
        const endY = startY - length * Math.sin(angle);
        
        arrows.push({
          x1: startX - length/2 * Math.cos(angle),
          y1: startY + length/2 * Math.sin(angle),
          x2: endX - length/2 * Math.cos(angle),
          y2: endY + length/2 * Math.sin(angle),
          key: `${x}-${y}`
        });
      }
    }
    
    return arrows;
  };

  const generateSolutionCurve = () => {
    const points: Point[] = [];
    const { x: x0, y: y0 } = initialCondition;
    let x = x0;
    let y = y0;
    const step = 0.1;
    const scale = 30;
    const centerX = 250;
    const centerY = 200;
    
    // Euler's method for approximate solution
    for (let i = 0; i < 100; i++) {
      points.push({
        x: centerX + x * scale,
        y: centerY - y * scale
      });
      
      const dy = evaluateDerivative(x, y, equation);
      y += dy * step;
      x += step;
      
      if (Math.abs(y) > 10 || x > 8) break;
    }
    
    return points;
  };

  const createPath = (points: Point[]) => {
    if (points.length === 0) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return path;
  };

  const slopeField = generateSlopeField();
  const solutionCurve = generateSolutionCurve();

  const sampleEquations = [
    'dy/dx = y - x',
    'dy/dx = x + y',
    'dy/dx = -x/y',
    'dy/dx = sin(x)',
    'dy/dx = x^2'
  ];

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Activity size={18} />
              Differential Equation
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">Equation</label>
              <select
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
              >
                {sampleEquations.map((eq) => (
                  <option key={eq} value={eq}>{eq}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-primary mb-2">Initial Condition</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-secondary mb-1">x₀</label>
                  <input
                    type="number"
                    value={initialCondition.x}
                    onChange={(e) => setInitialCondition({
                      ...initialCondition,
                      x: parseFloat(e.target.value) || 0
                    })}
                    className="w-full p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-xs text-secondary mb-1">y₀</label>
                  <input
                    type="number"
                    value={initialCondition.y}
                    onChange={(e) => setInitialCondition({
                      ...initialCondition,
                      y: parseFloat(e.target.value) || 0
                    })}
                    className="w-full p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showSolution}
                  onChange={(e) => setShowSolution(e.target.checked)}
                  className="dark:bg-neutral-700 dark:border-neutral-600"
                />
                <span className="text-sm dark:text-neutral-300">Show Solution Curve</span>
              </label>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
              <Settings size={16} />
              Visualization
            </h4>
            <div>
              <label className="block text-sm text-secondary mb-1">
                Grid Density: {gridDensity}
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={gridDensity}
                onChange={(e) => setGridDensity(parseInt(e.target.value))}
                className="w-full dark:bg-neutral-700"
              />
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Slope Field Visualization</h3>
              <div className="text-sm text-secondary">
                {equation}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 h-full flex items-center justify-center overflow-x-auto dark:border-neutral-700">
              <div className="w-full flex justify-center">
                <svg width="500" height="400" className="border rounded max-w-full dark:border-neutral-700 mx-auto" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-neutral-700"/>
                    </pattern>
                  </defs>
                  <rect width="500" height="400" fill="url(#grid)" />
                  
                  {/* Axes */}
                  <line x1="0" y1="200" x2="500" y2="200" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                  <line x1="250" y1="0" x2="250" y2="400" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                  
                  {/* Slope field arrows */}
                  <g opacity="0.6">
                    {slopeField.map((arrow, index) => (
                      <line
                        key={arrow.key}
                        x1={arrow.x1}
                        y1={arrow.y1}
                        x2={arrow.x2}
                        y2={arrow.y2}
                        stroke="#4299e1"
                        strokeWidth="1.5"
                        className="dark:stroke-blue-500"
                      />
                    ))}
                  </g>
                  
                  {/* Solution curve */}
                  {showSolution && solutionCurve.length > 1 && (
                    <path
                      d={createPath(solutionCurve)}
                      stroke="#ed8936"
                      strokeWidth="3"
                      fill="none"
                      className="dark:stroke-orange-500"
                    />
                  )}
                  
                  {/* Initial condition point */}
                  <circle
                    cx={250 + initialCondition.x * 30}
                    cy={200 - initialCondition.y * 30}
                    r="4"
                    fill="#ed8936"
                    stroke="white"
                    strokeWidth="2"
                    className="dark:fill-orange-500 dark:stroke-neutral-800"
                  />
                  
                  {/* Axis labels */}
                  <text x="490" y="195" className="text-xs fill-neutral-600 dark:fill-neutral-400">x</text>
                  <text x="255" y="15" className="text-xs fill-neutral-600 dark:fill-neutral-400">y</text>
                </svg>
              </div>
            </div>

            <div className="mt-4 text-sm text-secondary">
              <div className="flex flex-wrap items-center gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-blue-500"></div>
                  <span>Slope Field</span>
                </div>
                {showSolution && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-orange-500"></div>
                    <span>Solution Curve</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Initial Condition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};