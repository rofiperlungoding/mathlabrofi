import React, { useState, useRef } from 'react';
import { Layers, MousePointer, HelpCircle } from 'lucide-react';
import { TutorialOverlay, TutorialWelcome } from '../TutorialOverlay';
import { getTutorial } from '../../data/tutorials';
import { useTutorial } from '../../hooks/useTutorial';

export const FunctionCompositionVisualizer: React.FC = () => {
  const [functionF, setFunctionF] = useState('x^2');
  const [functionG, setFunctionG] = useState('sin(x)');
  const [cursorX, setCursorX] = useState(0);
  const [showComposition, setShowComposition] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  // Tutorial integration
  const {
    showWelcome,
    showTutorial,
    acceptTutorial,
    declineTutorial,
    closeTutorial,
    openTutorial
  } = useTutorial('function-composition');

  const tutorial = getTutorial('function-composition');

  const evaluateFunction = (x: number, expression: string): number => {
    try {
      let expr = expression
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/x/g, x.toString());
      
      return Function(`"use strict"; return (${expr})`)();
    } catch {
      return NaN;
    }
  };

  const generateFunctionPoints = (expression: string, color: string) => {
    const points = [];
    const step = 0.05;
    
    for (let x = -5; x <= 5; x += step) {
      const y = evaluateFunction(x, expression);
      if (isFinite(y) && Math.abs(y) < 10) {
        points.push({ x, y, color });
      }
    }
    
    return points;
  };

  const generateCompositionPoints = () => {
    const points = [];
    const step = 0.05;
    
    for (let x = -5; x <= 5; x += step) {
      const gx = evaluateFunction(x, functionG);
      if (isFinite(gx)) {
        const fgx = evaluateFunction(gx, functionF);
        if (isFinite(fgx) && Math.abs(fgx) < 10) {
          points.push({ x, y: fgx, color: '#9f7aea' });
        }
      }
    }
    
    return points;
  };

  const createSVGPath = (points: Array<{x: number, y: number, color: string}>) => {
    if (points.length === 0) return '';
    
    const width = 500;
    const height = 400;
    const xScale = width / 10; // -5 to 5
    const yScale = height / 20; // -10 to 10
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

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const centerX = 250;
    const xScale = 500 / 10;
    
    const realX = (x - centerX) / xScale;
    setCursorX(Math.max(-5, Math.min(5, realX)));
  };

  const fPoints = generateFunctionPoints(functionF, '#4299e1');
  const gPoints = generateFunctionPoints(functionG, '#48bb78');
  const compositionPoints = generateCompositionPoints();

  const fPath = createSVGPath(fPoints);
  const gPath = createSVGPath(gPoints);
  const compositionPath = createSVGPath(compositionPoints);

  // Calculate values at cursor position
  const gValue = evaluateFunction(cursorX, functionG);
  const fValue = evaluateFunction(cursorX, functionF);
  const fgValue = evaluateFunction(gValue, functionF);

  const commonFunctions = [
    { name: 'x²', expr: 'x^2' },
    { name: 'x³', expr: 'x^3' },
    { name: 'sin(x)', expr: 'sin(x)' },
    { name: 'cos(x)', expr: 'cos(x)' },
    { name: '√x', expr: 'sqrt(abs(x))' },
    { name: '1/x', expr: '1/x' },
    { name: 'e^x', expr: 'Math.exp(x/2)' },
    { name: 'ln(x)', expr: 'log(abs(x))' }
  ];

  return (
    <div className="p-6 h-full">
      {/* Tutorial Components */}
      {tutorial && (
        <>
          <TutorialWelcome
            appName="Function Composition Visualizer"
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
                <Layers size={18} />
                Functions
              </h3>
              <button
                onClick={openTutorial}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                title="Show Tutorial"
              >
                <HelpCircle size={16} className="text-accent" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondary mb-2">f(x) =</label>
                <input
                  type="text"
                  value={functionF}
                  onChange={(e) => setFunctionF(e.target.value)}
                  className="w-full p-2 border rounded font-mono text-sm"
                />
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {commonFunctions.slice(0, 4).map((func, index) => (
                    <button
                      key={index}
                      onClick={() => setFunctionF(func.expr)}
                      className="text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded"
                    >
                      {func.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-secondary mb-2">g(x) =</label>
                <input
                  type="text"
                  value={functionG}
                  onChange={(e) => setFunctionG(e.target.value)}
                  className="w-full p-2 border rounded font-mono text-sm"
                />
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {commonFunctions.slice(4, 8).map((func, index) => (
                    <button
                      key={index}
                      onClick={() => setFunctionG(func.expr)}
                      className="text-xs bg-green-100 hover:bg-green-200 px-2 py-1 rounded"
                    >
                      {func.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showComposition}
                  onChange={(e) => setShowComposition(e.target.checked)}
                />
                <span className="text-sm">Show f(g(x))</span>
              </label>
            </div>
          </div>

          {/* Values at cursor */}
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
              <MousePointer size={16} />
              Values at x = {cursorX.toFixed(2)}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">f(x):</span>
                <span className="font-mono">{fValue.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">g(x):</span>
                <span className="font-mono">{gValue.toFixed(3)}</span>
              </div>
              {showComposition && (
                <div className="flex justify-between">
                  <span className="text-purple-600">f(g(x)):</span>
                  <span className="font-mono">{fgValue.toFixed(3)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Composition explanation */}
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Composition Process</h4>
            <div className="text-sm text-secondary space-y-2">
              <div>1. Evaluate g({cursorX.toFixed(2)}) = {gValue.toFixed(3)}</div>
              <div>2. Use result as input to f</div>
              <div>3. f({gValue.toFixed(3)}) = {fgValue.toFixed(3)}</div>
            </div>
          </div>
        </div>

        {/* Graph Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Function Composition</h3>
              <div className="text-sm text-secondary">
                Move cursor to explore values
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4 h-full flex items-center justify-center">
              <svg
                ref={svgRef}
                width="500"
                height="400"
                className="border rounded cursor-crosshair"
                onMouseMove={handleMouseMove}
              >
                {/* Grid */}
                <defs>
                  <pattern id="compGrid" width="50" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="500" height="400" fill="url(#compGrid)" />
                
                {/* Axes */}
                <line x1="0" y1="200" x2="500" y2="200" stroke="#6b7280" strokeWidth="1" />
                <line x1="250" y1="0" x2="250" y2="400" stroke="#6b7280" strokeWidth="1" />
                
                {/* Function f(x) */}
                <path
                  d={fPath}
                  stroke="#4299e1"
                  strokeWidth="2"
                  fill="none"
                />
                
                {/* Function g(x) */}
                <path
                  d={gPath}
                  stroke="#48bb78"
                  strokeWidth="2"
                  fill="none"
                />
                
                {/* Composition f(g(x)) */}
                {showComposition && (
                  <path
                    d={compositionPath}
                    stroke="#9f7aea"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                )}
                
                {/* Cursor line */}
                <line
                  x1={250 + cursorX * 50}
                  y1="0"
                  x2={250 + cursorX * 50}
                  y2="400"
                  stroke="#ef4444"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                
                {/* Points at cursor */}
                <circle
                  cx={250 + cursorX * 50}
                  cy={200 - fValue * 20}
                  r="4"
                  fill="#4299e1"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx={250 + cursorX * 50}
                  cy={200 - gValue * 20}
                  r="4"
                  fill="#48bb78"
                  stroke="white"
                  strokeWidth="2"
                />
                {showComposition && (
                  <circle
                    cx={250 + cursorX * 50}
                    cy={200 - fgValue * 20}
                    r="4"
                    fill="#9f7aea"
                    stroke="white"
                    strokeWidth="2"
                  />
                )}
                
                {/* Axis labels - positioned symmetrically to avoid overlap */}
                <text x="480" y="185" className="text-xs fill-neutral-600" textAnchor="end">x</text>
                <text x="265" y="20" className="text-xs fill-neutral-600" textAnchor="start">y</text>
                
                {/* Grid value labels - positioned clearly */}
                <text x="375" y="185" className="text-xs fill-neutral-500" textAnchor="middle">2.5</text>
                <text x="125" y="185" className="text-xs fill-neutral-500" textAnchor="middle">-2.5</text>
                <text x="265" y="100" className="text-xs fill-neutral-500" textAnchor="start">5</text>
                <text x="265" y="300" className="text-xs fill-neutral-500" textAnchor="start">-5</text>
              </svg>
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-500"></div>
                <span>f(x) = {functionF}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-green-500"></div>
                <span>g(x) = {functionG}</span>
              </div>
              {showComposition && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-purple-500 border-dashed"></div>
                  <span>f(g(x))</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};