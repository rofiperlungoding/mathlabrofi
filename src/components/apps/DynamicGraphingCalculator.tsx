import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Plus, Minus, Settings, Download, RotateCcw, HelpCircle } from 'lucide-react';
import { TutorialOverlay, TutorialWelcome } from '../TutorialOverlay';
import { getTutorial } from '../../data/tutorials';
import { useTutorial } from '../../hooks/useTutorial';

interface FunctionData {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
  parameters: Record<string, number>;
}

export const DynamicGraphingCalculator: React.FC = () => {
  const [functions, setFunctions] = useState<FunctionData[]>([
    {
      id: '1',
      expression: 'sin(a*x + b)',
      color: '#4299e1',
      visible: true,
      parameters: { a: 1, b: 0 }
    }
  ]);
  const [newFunction, setNewFunction] = useState('');
  const [mode, setMode] = useState<'2D' | '3D'>('2D');
  const [gridSize, setGridSize] = useState(20);
  const [zoom, setZoom] = useState(1);

  // Tutorial integration
  const {
    showWelcome,
    showTutorial,
    acceptTutorial,
    declineTutorial,
    closeTutorial,
    openTutorial
  } = useTutorial('dynamic-graphing');

  const tutorial = getTutorial('dynamic-graphing');

  const colors = ['#4299e1', '#48bb78', '#ed8936', '#9f7aea', '#f56565', '#38b2ac', '#d69e2e'];

  const addFunction = () => {
    if (newFunction.trim()) {
      const id = Date.now().toString();
      const color = colors[functions.length % colors.length];
      const parameters = extractParameters(newFunction);
      
      setFunctions([...functions, {
        id,
        expression: newFunction,
        color,
        visible: true,
        parameters
      }]);
      setNewFunction('');
    }
  };

  const extractParameters = (expression: string): Record<string, number> => {
    const params: Record<string, number> = {};
    const paramRegex = /[a-z](?![a-z])/g;
    const matches = expression.match(paramRegex);
    
    if (matches) {
      matches.forEach(param => {
        if (param !== 'x' && param !== 'y' && param !== 'z') {
          params[param] = 1;
        }
      });
    }
    
    return params;
  };

  const updateParameter = (functionId: string, param: string, value: number) => {
    setFunctions(functions.map(f => 
      f.id === functionId 
        ? { ...f, parameters: { ...f.parameters, [param]: value } }
        : f
    ));
  };

  const removeFunction = (id: string) => {
    setFunctions(functions.filter(f => f.id !== id));
  };

  const toggleFunction = (id: string) => {
    setFunctions(functions.map(f => 
      f.id === id ? { ...f, visible: !f.visible } : f
    ));
  };

  const generateGraphPoints = (func: FunctionData) => {
    const points = [];
    const step = 0.1;
    
    for (let x = -10; x <= 10; x += step) {
      try {
        let expression = func.expression;
        
        // Replace parameters
        Object.entries(func.parameters).forEach(([param, value]) => {
          expression = expression.replace(new RegExp(param, 'g'), value.toString());
        });
        
        // Replace x with actual value
        expression = expression.replace(/x/g, x.toString());
        
        // Simple evaluation (in production would use math.js)
        const y = Function(`"use strict"; return (${expression.replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/log/g, 'Math.log').replace(/sqrt/g, 'Math.sqrt')})`)();
        
        if (isFinite(y)) {
          points.push({ x, y });
        }
      } catch (error) {
        // Skip invalid points
      }
    }
    
    return points;
  };

  const createSVGPath = (points: Array<{x: number, y: number}>) => {
    if (points.length === 0) return '';
    
    const width = 500;
    const height = 400;
    const xScale = width / 20; // -10 to 10
    const yScale = height / 20; // -10 to 10
    const centerX = width / 2;
    const centerY = height / 2;
    
    let path = '';
    points.forEach((point, index) => {
      const x = centerX + point.x * xScale * zoom;
      const y = centerY - point.y * yScale * zoom;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };

  const commonFunctions = [
    'sin(x)', 'cos(x)', 'tan(x)', 'x^2', 'x^3', 'sqrt(x)', 'log(x)', 'a*x + b', 'a*sin(b*x + c)', 'a*x^2 + b*x + c'
  ];

  return (
    <div className="p-6 h-full">
      {/* Tutorial Components */}
      {tutorial && (
        <>
          <TutorialWelcome
            appName="Dynamic Graphing Calculator"
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
                <Calculator size={18} />
                Functions
              </h3>
              <button
                onClick={openTutorial}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                title="Show Tutorial"
              >
                <HelpCircle size={16} className="text-accent dark:text-blue-400" />
              </button>
            </div>
            
            {/* Mode Toggle */}
            <div className="mb-4">
              <div className="flex rounded-lg border overflow-hidden dark:border-neutral-700">
                <button
                  onClick={() => setMode('2D')}
                  className={`flex-1 py-2 text-sm ${mode === '2D' ? 'bg-accent text-white dark:bg-blue-600' : 'bg-white dark:bg-neutral-800 text-secondary dark:text-neutral-300'}`}
                >
                  2D
                </button>
                <button
                  onClick={() => setMode('3D')}
                  className={`flex-1 py-2 text-sm ${mode === '3D' ? 'bg-accent text-white dark:bg-blue-600' : 'bg-white dark:bg-neutral-800 text-secondary dark:text-neutral-300'}`}
                >
                  3D
                </button>
              </div>
            </div>
            
            {/* Add Function */}
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newFunction}
                  onChange={(e) => setNewFunction(e.target.value)}
                  placeholder="e.g., sin(x), x^2"
                  className="flex-1 p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                />
                <button
                  onClick={addFunction}
                  className="btn btn-primary px-3 py-2"
                >
                  <Plus size={14} />
                </button>
              </div>
              
              {/* Common Functions */}
              <div className="grid grid-cols-2 gap-1">
                {commonFunctions.slice(0, 6).map((func, index) => (
                  <button
                    key={index}
                    onClick={() => setNewFunction(func)}
                    className="text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-2 py-1 rounded dark:text-neutral-300"
                  >
                    {func}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Function List */}
            <div className="space-y-3">
              {functions.map((func) => (
                <div key={func.id} className="border dark:border-neutral-700 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => toggleFunction(func.id)}
                      className="w-4 h-4 rounded border-2 flex-shrink-0"
                      style={{ 
                        backgroundColor: func.visible ? func.color : 'transparent',
                        borderColor: func.color 
                      }}
                    />
                    <span className="text-sm font-mono flex-1 dark:text-white">{func.expression}</span>
                    <button
                      onClick={() => removeFunction(func.id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1"
                    >
                      <Minus size={12} />
                    </button>
                  </div>
                  
                  {/* Parameter Controls */}
                  {Object.entries(func.parameters).map(([param, value]) => (
                    <div key={param} className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono w-4 dark:text-neutral-300">{param}:</span>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={value}
                        onChange={(e) => updateParameter(func.id, param, parseFloat(e.target.value))}
                        className="flex-1 dark:bg-neutral-700"
                      />
                      <span className="text-xs w-8 dark:text-neutral-300">{value.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Settings */}
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
              <Settings size={16} />
              Settings
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-secondary mb-1">Zoom</label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full dark:bg-neutral-700"
                />
                <div className="text-xs text-secondary">{zoom.toFixed(1)}x</div>
              </div>
              
              <div>
                <label className="block text-sm text-secondary mb-1">Grid Density</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={gridSize}
                  onChange={(e) => setGridSize(parseInt(e.target.value))}
                  className="w-full dark:bg-neutral-700"
                />
                <div className="text-xs text-secondary">{gridSize} lines</div>
              </div>
              
              <button className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2">
                <RotateCcw size={14} />
                Reset View
              </button>
            </div>
          </div>
        </div>
        
        {/* Graph Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Graph View</h3>
              <button className="btn btn-secondary text-sm flex items-center gap-2">
                <Download size={14} />
                Export
              </button>
            </div>
            
            <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 h-full flex items-center justify-center relative dark:border-neutral-700 overflow-x-auto">
              <div className="w-full flex justify-center">
                {functions.filter(f => f.visible).length > 0 ? (
                  <svg width="500" height="400" className="border rounded max-w-full dark:border-neutral-700 mx-auto" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
                    {/* Grid */}
                    <defs>
                      <pattern id="grid" width={500/gridSize} height={400/gridSize} patternUnits="userSpaceOnUse">
                        <path d={`M ${500/gridSize} 0 L 0 0 0 ${400/gridSize}`} fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-neutral-700"/>
                      </pattern>
                    </defs>
                    <rect width="500" height="400" fill="url(#grid)" />
                    
                    {/* Axes */}
                    <line x1="0" y1="200" x2="500" y2="200" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                    <line x1="250" y1="0" x2="250" y2="400" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                    
                    {/* Function plots */}
                    {functions.filter(f => f.visible).map((func) => {
                      const points = generateGraphPoints(func);
                      const path = createSVGPath(points);
                      
                      return (
                        <path
                          key={func.id}
                          d={path}
                          stroke={func.color}
                          strokeWidth="2"
                          fill="none"
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })}
                    
                    {/* Axis labels - positioned to avoid overlap */}
                    <text x="480" y="190" className="text-xs fill-neutral-600 dark:fill-neutral-400" textAnchor="end">x</text>
                    <text x="260" y="25" className="text-xs fill-neutral-600 dark:fill-neutral-400" textAnchor="start">y</text>
                    
                    {/* Grid value labels */}
                    <text x="375" y="190" className="text-xs fill-neutral-500 dark:fill-neutral-400" textAnchor="middle">5</text>
                    <text x="125" y="190" className="text-xs fill-neutral-500 dark:fill-neutral-400" textAnchor="middle">-5</text>
                    <text x="260" y="80" className="text-xs fill-neutral-500 dark:fill-neutral-400" textAnchor="start">5</text>
                    <text x="260" y="320" className="text-xs fill-neutral-500 dark:fill-neutral-400" textAnchor="start">-5</text>
                  </svg>
                ) : (
                  <div className="text-center text-neutral-400 dark:text-neutral-500">
                    <Calculator size={48} className="mx-auto mb-4" />
                    <p>Add a function to see its graph</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};