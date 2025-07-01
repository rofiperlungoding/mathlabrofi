import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, MousePointer, Settings, HelpCircle } from 'lucide-react';
import { TutorialOverlay, TutorialWelcome } from '../TutorialOverlay';
import { getTutorial } from '../../data/tutorials';
import { useTutorial } from '../../hooks/useTutorial';

export const InteractiveDerivativeExplorer: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = useState('x^2');
  const [customFunction, setCustomFunction] = useState('');
  const [hValue, setHValue] = useState(0.1);
  const [cursorX, setCursorX] = useState(0);
  const [showTangent, setShowTangent] = useState(true);
  const [showDerivative, setShowDerivative] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  // Tutorial integration
  const {
    showWelcome,
    showTutorial,
    acceptTutorial,
    declineTutorial,
    closeTutorial,
    openTutorial
  } = useTutorial('derivative-explorer');

  const tutorial = getTutorial('derivative-explorer');

  const functions = [
    { name: 'x²', expression: 'x^2', derivative: '2*x' },
    { name: 'x³', expression: 'x^3', derivative: '3*x^2' },
    { name: 'sin(x)', expression: 'sin(x)', derivative: 'cos(x)' },
    { name: 'cos(x)', expression: 'cos(x)', derivative: '-sin(x)' },
    { name: 'e^x', expression: 'exp(x)', derivative: 'exp(x)' },
    { name: 'ln(x)', expression: 'log(x)', derivative: '1/x' }
  ];

  const currentFunc = functions.find(f => f.expression === selectedFunction) || functions[0];

  const evaluateFunction = (x: number, expression: string): number => {
    try {
      let expr = expression
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/exp/g, 'Math.exp')
        .replace(/log/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/x/g, x.toString());
      
      return Function(`"use strict"; return (${expr})`)();
    } catch {
      return NaN;
    }
  };

  const calculateDerivative = (x: number, h: number): number => {
    const f_x = evaluateFunction(x, selectedFunction);
    const f_x_plus_h = evaluateFunction(x + h, selectedFunction);
    return (f_x_plus_h - f_x) / h;
  };

  const calculateAnalyticalDerivative = (x: number): number => {
    return evaluateFunction(x, currentFunc.derivative);
  };

  const generateFunctionPoints = () => {
    const points = [];
    const step = 0.05;
    
    for (let x = -5; x <= 5; x += step) {
      const y = evaluateFunction(x, selectedFunction);
      if (isFinite(y) && Math.abs(y) < 20) {
        points.push({ x, y });
      }
    }
    
    return points;
  };

  const generateDerivativePoints = () => {
    const points = [];
    const step = 0.1;
    
    for (let x = -5; x <= 5; x += step) {
      const y = calculateAnalyticalDerivative(x);
      if (isFinite(y) && Math.abs(y) < 20) {
        points.push({ x, y });
      }
    }
    
    return points;
  };

  const createSVGPath = (points: Array<{x: number, y: number}>) => {
    if (points.length === 0) return '';
    
    const width = 500;
    const height = 400;
    const xScale = width / 10; // -5 to 5
    const yScale = height / 10; // -5 to 5
    const centerX = width / 2;
    const centerY = height / 2;
    
    let path = '';
    points.forEach((point, index) => {
      const x = centerX + point.x * xScale;
      const y = centerY - point.y * yScale;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };

  const getTangentLine = (x: number) => {
    const y = evaluateFunction(x, selectedFunction);
    const slope = calculateDerivative(x, hValue);
    
    const width = 500;
    const height = 400;
    const xScale = width / 10;
    const yScale = height / 10;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Calculate tangent line endpoints
    const x1 = x - 2;
    const y1 = y + slope * (x1 - x);
    const x2 = x + 2;
    const y2 = y + slope * (x2 - x);
    
    const svgX1 = centerX + x1 * xScale;
    const svgY1 = centerY - y1 * yScale;
    const svgX2 = centerX + x2 * xScale;
    const svgY2 = centerY - y2 * yScale;
    
    return { x1: svgX1, y1: svgY1, x2: svgX2, y2: svgY2, slope };
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const centerX = 250;
    const xScale = 500 / 10;
    
    const realX = (x - centerX) / xScale;
    setCursorX(Math.max(-5, Math.min(5, realX)));
  };

  const functionPoints = generateFunctionPoints();
  const derivativePoints = generateDerivativePoints();
  const functionPath = createSVGPath(functionPoints);
  const derivativePath = createSVGPath(derivativePoints);
  const tangentLine = getTangentLine(cursorX);
  
  const cursorY = evaluateFunction(cursorX, selectedFunction);
  const numericalDerivative = calculateDerivative(cursorX, hValue);
  const analyticalDerivative = calculateAnalyticalDerivative(cursorX);

  return (
    <div className="p-6 h-full">
      {/* Tutorial Components */}
      {tutorial && (
        <>
          <TutorialWelcome
            appName="Interactive Derivative Explorer"
            isVisible={showWelcome}
            onAccept={acceptTutorial}
            onDecline={declineTutorial}
          />
          
          <TutorialOverlay
            tutorial={tutorial}
            isVisible={showTutorial}
            onClose={closeTutorial}
            onComplete={closeTutorial}
          />
        </>
      )}

      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-primary flex items-center gap-2">
                <TrendingUp size={18} />
                Function
              </h3>
              <button
                onClick={openTutorial}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                title="Show Tutorial"
              >
                <HelpCircle size={16} className="text-accent dark:text-blue-400" />
              </button>
            </div>
            
            {/* Function Selection */}
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">Select Function</label>
              <select
                value={selectedFunction}
                onChange={(e) => setSelectedFunction(e.target.value)}
                className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
              >
                {functions.map((func) => (
                  <option key={func.expression} value={func.expression}>
                    f(x) = {func.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Custom Function */}
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">Custom Function</label>
              <input
                type="text"
                value={customFunction}
                onChange={(e) => setCustomFunction(e.target.value)}
                placeholder="e.g., x^3 + 2*x"
                className="w-full p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
              />
              <button
                onClick={() => customFunction && setSelectedFunction(customFunction)}
                className="btn btn-secondary text-xs mt-1 w-full"
              >
                Use Custom
              </button>
            </div>
            
            {/* Derivative Definition */}
            <div className="bg-neutral-50 dark:bg-neutral-850 p-3 rounded-lg mb-4">
              <h4 className="text-sm font-medium text-primary mb-2">Derivative Definition</h4>
              <div className="text-xs text-secondary dark:text-neutral-400">
                f'(x) = lim[h→0] (f(x+h) - f(x))/h
              </div>
            </div>
            
            {/* h Value Slider */}
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">h value: {hValue.toFixed(3)}</label>
              <input
                type="range"
                min="0.001"
                max="1"
                step="0.001"
                value={hValue}
                onChange={(e) => setHValue(parseFloat(e.target.value))}
                className="w-full dark:bg-neutral-700"
              />
            </div>
            
            {/* Display Options */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showTangent}
                  onChange={(e) => setShowTangent(e.target.checked)}
                  className="dark:bg-neutral-700 dark:border-neutral-600"
                />
                <span className="text-sm dark:text-neutral-300">Show Tangent Line</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showDerivative}
                  onChange={(e) => setShowDerivative(e.target.checked)}
                  className="dark:bg-neutral-700 dark:border-neutral-600"
                />
                <span className="text-sm dark:text-neutral-300">Show Derivative</span>
              </label>
            </div>
          </div>
          
          {/* Values Display */}
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Values at x = {cursorX.toFixed(2)}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">f(x):</span>
                <span className="font-mono dark:text-white">{cursorY.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">f'(x) numerical:</span>
                <span className="font-mono dark:text-white">{numericalDerivative.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">f'(x) analytical:</span>
                <span className="font-mono dark:text-white">{analyticalDerivative.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Error:</span>
                <span className="font-mono text-red-600 dark:text-red-400">
                  {Math.abs(numericalDerivative - analyticalDerivative).toFixed(6)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Graph Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Interactive Derivative Explorer</h3>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <MousePointer size={14} />
                Move cursor to explore
              </div>
            </div>
            
            <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 h-full flex items-center justify-center dark:border-neutral-700 overflow-x-auto">
              <div className="w-full flex justify-center">
                <svg
                  ref={svgRef}
                  width="500"
                  height="400"
                  className="border rounded cursor-crosshair max-w-full dark:border-neutral-700 mx-auto"
                  viewBox="0 0 500 400"
                  preserveAspectRatio="xMidYMid meet"
                  onMouseMove={handleMouseMove}
                >
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-neutral-700"/>
                    </pattern>
                  </defs>
                  <rect width="500" height="400" fill="url(#grid)" />
                  
                  {/* Axes */}
                  <line x1="0" y1="200" x2="500" y2="200" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                  <line x1="250" y1="0" x2="250" y2="400" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                  
                  {/* Function plot */}
                  <path
                    d={functionPath}
                    stroke="#4299e1"
                    strokeWidth="3"
                    fill="none"
                    className="dark:stroke-blue-500"
                  />
                  
                  {/* Derivative plot */}
                  {showDerivative && (
                    <path
                      d={derivativePath}
                      stroke="#48bb78"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="dark:stroke-green-500"
                    />
                  )}
                  
                  {/* Tangent line */}
                  {showTangent && (
                    <line
                      x1={tangentLine.x1}
                      y1={tangentLine.y1}
                      x2={tangentLine.x2}
                      y2={tangentLine.y2}
                      stroke="#ed8936"
                      strokeWidth="2"
                      className="dark:stroke-orange-500"
                    />
                  )}
                  
                  {/* Cursor point */}
                  <circle
                    cx={250 + cursorX * 50}
                    cy={200 - cursorY * 40}
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
            
            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-500"></div>
                <span className="text-secondary">f(x) = {currentFunc.name}</span>
              </div>
              {showDerivative && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-green-500 border-dashed"></div>
                  <span className="text-secondary">f'(x) = {currentFunc.derivative}</span>
                </div>
              )}
              {showTangent && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-orange-500"></div>
                  <span className="text-secondary">Tangent Line</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};