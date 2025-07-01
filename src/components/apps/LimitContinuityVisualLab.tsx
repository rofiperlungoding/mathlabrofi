import React, { useState } from 'react';
import { Target, Zap, HelpCircle } from 'lucide-react';
import { TutorialOverlay, TutorialWelcome } from '../TutorialOverlay';
import { MathFormula } from '../MathFormula';
import { getTutorial } from '../../data/tutorials';
import { useTutorial } from '../../hooks/useTutorial';

export const LimitContinuityVisualLab: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = useState('1/x');
  const [approachPoint, setApproachPoint] = useState(0);
  const [epsilon, setEpsilon] = useState(0.5);
  const [delta, setDelta] = useState(0.2);
  const [limitValue, setLimitValue] = useState(1);

  // Tutorial integration
  const {
    showWelcome,
    showTutorial,
    acceptTutorial,
    declineTutorial,
    closeTutorial,
    openTutorial
  } = useTutorial('limit-continuity');

  const tutorial = getTutorial('limit-continuity');

  const evaluateFunction = (x: number, expression: string): number => {
    try {
      if (expression === '1/x') {
        return x !== 0 ? 1/x : NaN;
      } else if (expression === 'sin(x)/x') {
        return x !== 0 ? Math.sin(x)/x : 1;
      } else if (expression === '(x^2-1)/(x-1)') {
        return x !== 1 ? (x*x - 1)/(x - 1) : 2;
      } else if (expression === 'x^2') {
        return x * x;
      } else if (expression === 'abs(x)') {
        return Math.abs(x);
      }
      return NaN;
    } catch {
      return NaN;
    }
  };

  const generateFunctionPoints = () => {
    const points = [];
    const step = 0.02;
    const scale = 40;
    const centerX = 250;
    const centerY = 200;
    
    for (let x = -6; x <= 6; x += step) {
      if (Math.abs(x - approachPoint) < 0.01) continue; // Skip the approach point
      
      const y = evaluateFunction(x, selectedFunction);
      if (isFinite(y) && Math.abs(y) < 10) {
        const screenX = centerX + x * scale;
        const screenY = centerY - y * scale;
        points.push({ x: screenX, y: screenY });
      }
    }
    
    return points;
  };

  const createPath = (points: Array<{x: number, y: number}>) => {
    if (points.length === 0) return '';
    
    let path = '';
    let currentSegment = '';
    
    points.forEach((point, index) => {
      if (index === 0 || (index > 0 && Math.abs(point.x - points[index-1].x) > 100)) {
        if (currentSegment) {
          path += currentSegment;
          currentSegment = '';
        }
        currentSegment = `M ${point.x} ${point.y}`;
      } else {
        currentSegment += ` L ${point.x} ${point.y}`;
      }
    });
    
    if (currentSegment) {
      path += currentSegment;
    }
    
    return path;
  };

  const functionPoints = generateFunctionPoints();
  const functionPath = createPath(functionPoints);

  // Calculate epsilon-delta visualization
  const centerX = 250;
  const centerY = 200;
  const scale = 40;
  
  const limitX = centerX + approachPoint * scale;
  const limitY = centerY - limitValue * scale;
  
  const epsilonTop = limitY - epsilon * scale;
  const epsilonBottom = limitY + epsilon * scale;
  
  const deltaLeft = limitX - delta * scale;
  const deltaRight = limitX + delta * scale;

  const functions = [
    { name: '1/x (discontinuous at 0)', value: '1/x' },
    { name: 'sin(x)/x (removable discontinuity)', value: 'sin(x)/x' },
    { name: '(x²-1)/(x-1) (removable)', value: '(x^2-1)/(x-1)' },
    { name: 'x² (continuous)', value: 'x^2' },
    { name: '|x| (corner at 0)', value: 'abs(x)' }
  ];

  return (
    <div className="p-6 h-full">
      {/* Tutorial Components */}
      {tutorial && (
        <>
          <TutorialWelcome
            appName="Limit & Continuity Visual Lab"
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
                <Target size={18} />
                Function & Limit
              </h3>
              <button
                onClick={openTutorial}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                title="Show Tutorial"
              >
                <HelpCircle size={16} className="text-accent dark:text-blue-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondary mb-2">Function</label>
                <select
                  value={selectedFunction}
                  onChange={(e) => setSelectedFunction(e.target.value)}
                  className="w-full p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                >
                  {functions.map((func) => (
                    <option key={func.value} value={func.value}>
                      {func.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-secondary mb-2">
                  Approach Point (a): {approachPoint}
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={approachPoint}
                  onChange={(e) => setApproachPoint(parseFloat(e.target.value))}
                  className="w-full dark:bg-neutral-700"
                />
              </div>

              <div>
                <label className="block text-sm text-secondary mb-2">
                  Limit Value (L): {limitValue.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={limitValue}
                  onChange={(e) => setLimitValue(parseFloat(e.target.value))}
                  className="w-full dark:bg-neutral-700"
                />
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
              <Zap size={16} />
              Epsilon-Delta
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-secondary mb-1">
                  ε (epsilon): {epsilon.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={epsilon}
                  onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                  className="w-full dark:bg-neutral-700"
                />
              </div>

              <div>
                <label className="block text-sm text-secondary mb-1">
                  δ (delta): {delta.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={delta}
                  onChange={(e) => setDelta(parseFloat(e.target.value))}
                  className="w-full dark:bg-neutral-700"
                />
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Definition</h4>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded border dark:border-neutral-700">
              <div className="formula-container overflow-x-auto" style={{ maxWidth: '100%' }}>
                <MathFormula 
                  latex="\\lim_{x \\to a} f(x) = L \\text{ if for every } \\varepsilon > 0, \\text{ there exists } \\delta > 0 \\text{ such that } |f(x) - L| < \\varepsilon \\text{ whenever } 0 < |x - a| < \\delta" 
                  displayMode={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Epsilon-Delta Visualization</h3>
              <div className="text-sm text-secondary">
                lim(x→{approachPoint}) f(x) = {limitValue.toFixed(2)}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 h-full flex items-center justify-center dark:border-neutral-700 overflow-x-auto">
              <div className="w-full flex justify-center">
                <svg width="500" height="400" className="border rounded max-w-full dark:border-neutral-700 mx-auto" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
                  {/* Grid */}
                  <defs>
                    <pattern id="limitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-neutral-700"/>
                    </pattern>
                  </defs>
                  <rect width="500" height="400" fill="url(#limitGrid)" />
                  
                  {/* Axes */}
                  <line x1="0" y1="200" x2="500" y2="200" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                  <line x1="250" y1="0" x2="250" y2="400" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                  
                  {/* Epsilon band (horizontal) */}
                  <rect
                    x="0"
                    y={epsilonTop}
                    width="500"
                    height={(epsilonBottom - epsilonTop)}
                    fill="#fef3c7"
                    opacity="0.5"
                    className="dark:fill-yellow-900/30"
                  />
                  <line x1="0" y1={limitY} x2="500" y2={limitY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" className="dark:stroke-yellow-600" />
                  <line x1="0" y1={epsilonTop} x2="500" y2={epsilonTop} stroke="#f59e0b" strokeWidth="1" className="dark:stroke-yellow-600" />
                  <line x1="0" y1={epsilonBottom} x2="500" y2={epsilonBottom} stroke="#f59e0b" strokeWidth="1" className="dark:stroke-yellow-600" />
                  
                  {/* Delta band (vertical) */}
                  <rect
                    x={deltaLeft}
                    y="0"
                    width={deltaRight - deltaLeft}
                    height="400"
                    fill="#dbeafe"
                    opacity="0.5"
                    className="dark:fill-blue-900/30"
                  />
                  <line x1={limitX} y1="0" x2={limitX} y2="400" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="dark:stroke-blue-600" />
                  <line x1={deltaLeft} y1="0" x2={deltaLeft} y2="400" stroke="#3b82f6" strokeWidth="1" className="dark:stroke-blue-600" />
                  <line x1={deltaRight} y1="0" x2={deltaRight} y2="400" stroke="#3b82f6" strokeWidth="1" className="dark:stroke-blue-600" />
                  
                  {/* Function graph */}
                  <path
                    d={functionPath}
                    stroke="#ef4444"
                    strokeWidth="3"
                    fill="none"
                    className="dark:stroke-red-500"
                  />
                  
                  {/* Approach point */}
                  <circle
                    cx={limitX}
                    cy={limitY}
                    r="6"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="2,2"
                    className="dark:stroke-red-500"
                  />
                  
                  {/* Labels */}
                  <text x={limitX + 10} y={limitY - 10} className="text-sm fill-red-600 dark:fill-red-400 font-medium">
                    (a, L)
                  </text>
                  
                  {/* Epsilon labels - positioned to avoid overlap */}
                  <text x="20" y={epsilonTop - 10} className="text-xs fill-orange-600 dark:fill-orange-400" textAnchor="start">
                    L + ε
                  </text>
                  <text x="20" y={epsilonBottom + 20} className="text-xs fill-orange-600 dark:fill-orange-400" textAnchor="start">
                    L - ε
                  </text>
                  
                  {/* Delta labels - positioned clearly */}
                  <text x={deltaLeft} y="25" className="text-xs fill-blue-600 dark:fill-blue-400" textAnchor="middle">
                    a - δ
                  </text>
                  <text x={deltaRight} y="25" className="text-xs fill-blue-600 dark:fill-blue-400" textAnchor="middle">
                    a + δ
                  </text>
                  
                  {/* Axis labels - positioned symmetrically */}
                  <text x="480" y="195" className="text-xs fill-neutral-600 dark:fill-neutral-400" textAnchor="middle">x</text>
                  <text x="260" y="20" className="text-xs fill-neutral-600 dark:fill-neutral-400" textAnchor="middle">y</text>
                  
                  {/* Grid labels - positioned clearly */}
                  <text x="350" y="195" className="text-xs fill-neutral-500 dark:fill-neutral-400" textAnchor="middle">2</text>
                  <text x="150" y="195" className="text-xs fill-neutral-500 dark:fill-neutral-400" textAnchor="middle">-2</text>
                  <text x="260" y="120" className="text-xs fill-neutral-500 dark:fill-neutral-400" textAnchor="middle">2</text>
                  <text x="260" y="280" className="text-xs fill-neutral-500 dark:fill-neutral-400" textAnchor="middle">-2</text>
                </svg>
              </div>
            </div>

            <div className="mt-4 text-sm text-secondary">
              <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 flex-wrap justify-center">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-0.5 bg-red-500"></div>
                  <span>Function f(x)</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-2 bg-yellow-200 border border-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-600"></div>
                  <span>ε-neighborhood</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-2 bg-blue-200 border border-blue-400 dark:bg-blue-900/30 dark:border-blue-600"></div>
                  <span>δ-neighborhood</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};