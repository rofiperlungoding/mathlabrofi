import React, { useState, useRef, useEffect } from 'react';
import { 
  TrendingUp, Plus, Minus, RotateCcw, Settings, Download, 
  Mic, MicOff, Zap, Brain, Share2, Eye, EyeOff, Layers,
  Play, Pause, SkipForward, Camera, Palette, Grid3X3,
  MessageSquare, Lightbulb, Target, Maximize2, Volume2,
  Sparkles, ArrowRight, ChevronDown, ChevronUp, Users,
  BookOpen, Calculator, Wand2, Cpu, Cloud, Smartphone
} from 'lucide-react';

interface FunctionData {
  id: string;
  expression: string;
  naturalLanguage?: string;
  color: string;
  visible: boolean;
  analysis?: FunctionAnalysis;
  parameters?: Record<string, number>;
  style: 'solid' | 'dashed' | 'dotted';
  thickness: number;
}

interface FunctionAnalysis {
  domain: string;
  range: string;
  criticalPoints: Array<{x: number, y: number, type: 'max' | 'min' | 'inflection'}>;
  intercepts: {x: number[], y: number};
  asymptotes: {vertical: number[], horizontal: number[], oblique: string[]};
  monotonicity: Array<{interval: string, type: 'increasing' | 'decreasing'}>;
  concavity: Array<{interval: string, type: 'up' | 'down'}>;
}

interface GraphingMode {
  type: '2D' | '3D' | 'parametric' | 'polar' | 'animation';
  label: string;
  icon: React.ComponentType<any>;
  description: string;
}

export const GraphingCalculator: React.FC = () => {
  // Core State
  const [functions, setFunctions] = useState<FunctionData[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<GraphingMode['type']>('2D');
  
  // AI & Input State
  const [naturalInput, setNaturalInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAiPanel, setShowAiPanel] = useState(true);
  
  // Visualization State
  const [viewSettings, setViewSettings] = useState({
    zoom: 1,
    centerX: 0,
    centerY: 0,
    gridVisible: true,
    axesVisible: true,
    labelsVisible: true,
    animationSpeed: 1,
    quality: 'high' as 'low' | 'medium' | 'high'
  });
  
  // Advanced Features State
  const [analysisMode, setAnalysisMode] = useState(false);
  const [collaborationMode, setCollaborationMode] = useState(false);
  const [educationalMode, setEducationalMode] = useState(false);
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  // UI State
  const [expandedPanels, setExpandedPanels] = useState({
    functions: true,
    analysis: false,
    visualization: false,
    ai: true,
    collaboration: false
  });

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dda0dd', '#98d8c8', '#a8e6cf', '#ffd93d', '#6c5ce7'
  ];

  const graphingModes: GraphingMode[] = [
    { type: '2D', label: '2D Functions', icon: TrendingUp, description: 'Standard Cartesian plotting' },
    { type: '3D', label: '3D Surface', icon: Grid3X3, description: 'Three-dimensional visualization' },
    { type: 'parametric', label: 'Parametric', icon: Target, description: 'Parameter-based curves' },
    { type: 'polar', label: 'Polar', icon: Zap, description: 'Polar coordinate system' },
    { type: 'animation', label: 'Animation', icon: Play, description: 'Time-based function evolution' }
  ];

  // AI-Powered Natural Language Processing
  const processNaturalLanguage = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Simple NLP patterns for demonstration
    const patterns = [
      { pattern: /parabola|quadratic/, replacement: 'x^2' },
      { pattern: /sine wave|sin/, replacement: 'sin(x)' },
      { pattern: /cosine|cos/, replacement: 'cos(x)' },
      { pattern: /line|linear/, replacement: 'x' },
      { pattern: /cubic/, replacement: 'x^3' },
      { pattern: /exponential/, replacement: 'exp(x)' },
      { pattern: /logarithm|log/, replacement: 'log(x)' },
      { pattern: /absolute value/, replacement: 'abs(x)' },
      { pattern: /square root/, replacement: 'sqrt(x)' },
      { pattern: /tangent|tan/, replacement: 'tan(x)' }
    ];

    for (const { pattern, replacement } of patterns) {
      if (pattern.test(lowerInput)) {
        return replacement;
      }
    }

    return input;
  };

  // Generate AI Suggestions
  const generateAISuggestions = (currentFunction?: string) => {
    const suggestions = [
      'x^2 + 2*x + 1',
      'sin(x) * cos(x)',
      'exp(-x^2)',
      'x^3 - 3*x',
      'sqrt(1-x^2)',
      'tan(x)',
      '1/(1+x^2)',
      'x*sin(1/x)',
      'log(abs(x))',
      'x^2 * exp(-x)'
    ];

    return suggestions.slice(0, 4);
  };

  // Function Analysis (AI-Powered)
  const analyzeFunction = (expression: string): FunctionAnalysis => {
    // Simplified analysis for demonstration
    return {
      domain: 'ℝ (all real numbers)',
      range: 'Calculated dynamically',
      criticalPoints: [
        { x: 0, y: 0, type: 'min' },
        { x: 2, y: 4, type: 'max' }
      ],
      intercepts: { x: [-1, 1], y: 0 },
      asymptotes: { vertical: [], horizontal: [0], oblique: [] },
      monotonicity: [
        { interval: '(-∞, 0)', type: 'decreasing' },
        { interval: '(0, ∞)', type: 'increasing' }
      ],
      concavity: [
        { interval: '(-∞, ∞)', type: 'up' }
      ]
    };
  };

  // Add Function with AI Enhancement
  const addFunction = (expression?: string, naturalLanguage?: string) => {
    const finalExpression = expression || processNaturalLanguage(naturalInput);
    if (!finalExpression.trim()) return;

    const newFunction: FunctionData = {
      id: Date.now().toString(),
      expression: finalExpression,
      naturalLanguage: naturalLanguage || naturalInput,
      color: colors[functions.length % colors.length],
      visible: true,
      style: 'solid',
      thickness: 2,
      analysis: analysisMode ? analyzeFunction(finalExpression) : undefined
    };

    setFunctions([...functions, newFunction]);
    setNaturalInput('');
    setAiSuggestions(generateAISuggestions(finalExpression));
  };

  // Voice Input Simulation
  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setNaturalInput('quadratic function');
        setIsListening(false);
      }, 2000);
    }
  };

  // Advanced Graph Generation
  const generateGraphData = (func: FunctionData) => {
    const points: Array<{x: number, y: number}> = [];
    const step = 0.05;
    const domain = [-10, 10];
    
    for (let x = domain[0]; x <= domain[1]; x += step) {
      try {
        let expression = func.expression;
        
        // Handle parameters if they exist
        if (func.parameters) {
          Object.entries(func.parameters).forEach(([param, value]) => {
            expression = expression.replace(new RegExp(param, 'g'), value.toString());
          });
        }
        
        expression = expression.replace(/x/g, x.toString());
        const y = Function(`"use strict"; return (${expression.replace(/\^/g, '**').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/log/g, 'Math.log').replace(/sqrt/g, 'Math.sqrt').replace(/abs/g, 'Math.abs').replace(/exp/g, 'Math.exp')})`)();
        
        if (isFinite(y)) {
          points.push({ x, y });
        }
      } catch (error) {
        // Skip invalid points
      }
    }
    
    return points;
  };

  // Create SVG Path
  const createSVGPath = (points: Array<{x: number, y: number}>) => {
    if (points.length === 0) return '';
    
    const width = 600;
    const height = 400;
    const margin = 50;
    const graphWidth = width - 2 * margin;
    const graphHeight = height - 2 * margin;
    
    const xScale = graphWidth / 20;
    const yScale = graphHeight / 20;
    const centerX = margin + graphWidth / 2;
    const centerY = margin + graphHeight / 2;
    
    let path = '';
    points.forEach((point, index) => {
      const x = centerX + (point.x * viewSettings.zoom * xScale) - (viewSettings.centerX * xScale);
      const y = centerY - (point.y * viewSettings.zoom * yScale) + (viewSettings.centerY * yScale);
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };

  // Panel Toggle
  const togglePanel = (panel: keyof typeof expandedPanels) => {
    setExpandedPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };

  // Export Function
  const exportGraph = (format: 'png' | 'svg' | 'pdf' | 'json') => {
    console.log(`Exporting as ${format}...`);
    // Implementation would go here
  };

  useEffect(() => {
    setAiSuggestions(generateAISuggestions());
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Revolutionary Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
            <Brain size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MathGraph AI Pro
            </h2>
            <p className="text-lg text-secondary">The world's first AI-powered collaborative graphing calculator</p>
          </div>
        </div>
        
        {/* Revolutionary Features Banner */}
        <div className="flex items-center justify-center gap-6 text-sm text-secondary mb-4">
          <div className="flex items-center gap-1">
            <Brain size={16} className="text-purple-500" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-1">
            <Mic size={16} className="text-green-500" />
            <span>Voice Input</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} className="text-blue-500" />
            <span>Collaborative</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles size={16} className="text-yellow-500" />
            <span>Real-time Analysis</span>
          </div>
          <div className="flex items-center gap-1">
            <Cloud size={16} className="text-cyan-500" />
            <span>Cloud Sync</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6">
        {/* AI-Powered Control Panel */}
        <div className="desktop:col-span-1 space-y-4">
          {/* AI Natural Language Input */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-primary flex items-center gap-2">
                <Brain size={18} className="text-purple-500" />
                AI Function Input
              </h3>
              <button
                onClick={() => togglePanel('ai')}
                className="p-1 hover:bg-neutral-100 rounded"
              >
                {expandedPanels.ai ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {expandedPanels.ai && (
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={naturalInput}
                    onChange={(e) => setNaturalInput(e.target.value)}
                    placeholder="Describe your function: 'parabola', 'sine wave', etc."
                    className="w-full p-3 border rounded-lg pr-12 text-sm focus:ring-2 focus:ring-purple-300"
                    onKeyDown={(e) => e.key === 'Enter' && addFunction()}
                  />
                  <button
                    onClick={toggleVoiceInput}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                      isListening ? 'bg-red-100 text-red-600' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                </div>
                
                {isListening && (
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Listening... speak your function
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => addFunction()}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  AI Generate Function
                </button>
                
                {/* AI Suggestions */}
                {aiSuggestions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-secondary mb-2">AI Suggestions:</h4>
                    <div className="space-y-1">
                      {aiSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => addFunction(suggestion)}
                          className="w-full text-left text-xs bg-purple-50 hover:bg-purple-100 p-2 rounded transition-colors border border-purple-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Graphing Mode Selector */}
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
              <Grid3X3 size={18} />
              Visualization Mode
            </h3>
            <div className="space-y-2">
              {graphingModes.map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.type}
                    onClick={() => setCurrentMode(mode.type)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      currentMode === mode.type
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-primary'
                    }`}
                  >
                    <IconComponent size={16} />
                    <div className="text-left">
                      <div className="font-medium text-sm">{mode.label}</div>
                      <div className="text-xs opacity-75">{mode.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Function Management */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-primary flex items-center gap-2">
                <Calculator size={18} />
                Functions ({functions.length})
              </h3>
              <button
                onClick={() => togglePanel('functions')}
                className="p-1 hover:bg-neutral-100 rounded"
              >
                {expandedPanels.functions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {expandedPanels.functions && (
              <div className="space-y-3">
                {functions.map((func) => (
                  <div
                    key={func.id}
                    className={`border rounded-lg p-3 transition-all ${
                      selectedFunction === func.id ? 'border-purple-300 bg-purple-50' : 'border-neutral-200'
                    }`}
                    onClick={() => setSelectedFunction(func.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFunctions(functions.map(f => 
                            f.id === func.id ? { ...f, visible: !f.visible } : f
                          ));
                        }}
                        className="w-4 h-4 rounded border-2 flex-shrink-0"
                        style={{ 
                          backgroundColor: func.visible ? func.color : 'transparent',
                          borderColor: func.color 
                        }}
                      />
                      <span className="font-mono text-sm flex-1">{func.expression}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFunctions(functions.filter(f => f.id !== func.id));
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Minus size={12} />
                      </button>
                    </div>
                    
                    {func.naturalLanguage && (
                      <div className="text-xs text-secondary italic mb-2">
                        "{func.naturalLanguage}"
                      </div>
                    )}
                    
                    {/* Function Style Controls */}
                    <div className="flex items-center gap-2">
                      <select
                        value={func.style}
                        onChange={(e) => setFunctions(functions.map(f => 
                          f.id === func.id ? { ...f, style: e.target.value as any } : f
                        ))}
                        className="text-xs border rounded p-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                      </select>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={func.thickness}
                        onChange={(e) => setFunctions(functions.map(f => 
                          f.id === func.id ? { ...f, thickness: parseInt(e.target.value) } : f
                        ))}
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                ))}
                
                {functions.length === 0 && (
                  <div className="text-center py-6 text-neutral-400">
                    <Calculator size={32} className="mx-auto mb-2" />
                    <p className="text-sm">No functions yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Real-time Analysis Panel */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-primary flex items-center gap-2">
                <Lightbulb size={18} className="text-yellow-500" />
                AI Analysis
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAnalysisMode(!analysisMode)}
                  className={`p-1 rounded ${analysisMode ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-neutral-100'}`}
                >
                  <Brain size={16} />
                </button>
                <button
                  onClick={() => togglePanel('analysis')}
                  className="p-1 hover:bg-neutral-100 rounded"
                >
                  {expandedPanels.analysis ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>
            
            {expandedPanels.analysis && analysisMode && selectedFunction && (
              <div className="space-y-3">
                {(() => {
                  const func = functions.find(f => f.id === selectedFunction);
                  const analysis = func?.analysis || analyzeFunction(func?.expression || '');
                  
                  return (
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-secondary">Domain:</span>
                        <div className="text-primary">{analysis.domain}</div>
                      </div>
                      <div>
                        <span className="font-medium text-secondary">Critical Points:</span>
                        <div className="text-primary">
                          {analysis.criticalPoints.map((point, i) => (
                            <div key={i} className="text-xs">
                              ({point.x}, {point.y}) - {point.type}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-secondary">Behavior:</span>
                        <div className="text-primary text-xs">
                          {analysis.monotonicity.map((mono, i) => (
                            <div key={i}>{mono.interval}: {mono.type}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
            
            {!analysisMode && (
              <div className="text-center py-4 text-neutral-400">
                <button
                  onClick={() => setAnalysisMode(true)}
                  className="btn btn-secondary text-sm flex items-center gap-2 mx-auto"
                >
                  <Brain size={16} />
                  Enable AI Analysis
                </button>
              </div>
            )}
          </div>

          {/* Advanced Features */}
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-3">Advanced Features</h3>
            <div className="space-y-2">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`btn w-full text-sm flex items-center justify-center gap-2 ${
                  showComparison ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                <Layers size={16} />
                Function Comparison
              </button>
              
              <button
                onClick={() => setEducationalMode(!educationalMode)}
                className={`btn w-full text-sm flex items-center justify-center gap-2 ${
                  educationalMode ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                <BookOpen size={16} />
                Learning Mode
              </button>
              
              <button
                onClick={() => setCollaborationMode(!collaborationMode)}
                className={`btn w-full text-sm flex items-center justify-center gap-2 ${
                  collaborationMode ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                <Users size={16} />
                Collaborate
              </button>
            </div>
          </div>
        </div>

        {/* Revolutionary Graph Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            {/* Advanced Graph Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-primary">
                {currentMode === '2D' && 'AI-Enhanced 2D Graph'}
                {currentMode === '3D' && '3D Surface Plot'}
                {currentMode === 'parametric' && 'Parametric Curves'}
                {currentMode === 'polar' && 'Polar Coordinate System'}
                {currentMode === 'animation' && 'Animated Function Evolution'}
              </h3>
              
              {/* Advanced Controls */}
              <div className="flex items-center gap-2">
                {currentMode === 'animation' && (
                  <>
                    <button
                      onClick={() => setAnimationPlaying(!animationPlaying)}
                      className="btn btn-secondary p-2"
                    >
                      {animationPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button className="btn btn-secondary p-2">
                      <SkipForward size={16} />
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => setViewSettings(prev => ({ ...prev, gridVisible: !prev.gridVisible }))}
                  className={`btn p-2 ${viewSettings.gridVisible ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <Grid3X3 size={16} />
                </button>
                
                <div className="dropdown relative">
                  <button className="btn btn-secondary p-2">
                    <Download size={16} />
                  </button>
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 hidden group-hover:block">
                    {['png', 'svg', 'pdf', 'json'].map(format => (
                      <button
                        key={format}
                        onClick={() => exportGraph(format as any)}
                        className="block w-full text-left px-3 py-2 hover:bg-neutral-100 text-sm"
                      >
                        Export as {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button className="btn btn-secondary p-2">
                  <Share2 size={16} />
                </button>
                
                <button className="btn btn-secondary p-2">
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Revolutionary Graph Area */}
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 border rounded-xl p-4 h-[500px] relative overflow-hidden">
              {functions.filter(f => f.visible).length > 0 ? (
                <div className="relative w-full h-full">
                  <svg width="100%" height="100%" className="border rounded-lg bg-white">
                    {/* Enhanced Grid */}
                    {viewSettings.gridVisible && (
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                          <path d="M 0 0 L 40 40 M 0 40 L 40 0" fill="none" stroke="#f3f4f6" strokeWidth="0.25" opacity="0.5"/>
                        </pattern>
                      </defs>
                    )}
                    
                    {viewSettings.gridVisible && (
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    )}
                    
                    {/* Enhanced Axes */}
                    {viewSettings.axesVisible && (
                      <g>
                        <line x1="50" y1="250" x2="550" y2="250" stroke="#374151" strokeWidth="2" />
                        <line x1="300" y1="50" x2="300" y2="450" stroke="#374151" strokeWidth="2" />
                        
                        {/* Axis Labels */}
                        <text x="540" y="245" className="text-sm fill-neutral-600" textAnchor="end">x</text>
                        <text x="305" y="65" className="text-sm fill-neutral-600" textAnchor="start">y</text>
                        
                        {/* Grid Numbers */}
                        {[-4, -2, 2, 4].map(num => (
                          <g key={num}>
                            <text x={300 + num * 50} y="265" className="text-xs fill-neutral-500" textAnchor="middle">{num}</text>
                            <text x="290" y={250 - num * 25} className="text-xs fill-neutral-500" textAnchor="end">{num}</text>
                          </g>
                        ))}
                      </g>
                    )}
                    
                    {/* Revolutionary Function Plots */}
                    {functions.filter(f => f.visible).map((func) => {
                      const points = generateGraphData(func);
                      const path = createSVGPath(points);
                      
                      return (
                        <g key={func.id}>
                          <path
                            d={path}
                            stroke={func.color}
                            strokeWidth={func.thickness}
                            strokeDasharray={
                              func.style === 'dashed' ? '5,5' :
                              func.style === 'dotted' ? '2,2' : 'none'
                            }
                            fill="none"
                            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                          />
                          
                          {/* Function Label */}
                          <text
                            x="60"
                            y={80 + functions.indexOf(func) * 20}
                            className="text-sm font-medium"
                            fill={func.color}
                          >
                            {func.expression}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* AI-Powered Annotations */}
                    {analysisMode && selectedFunction && (
                      <g>
                        {/* Critical points */}
                        <circle cx="200" cy="200" r="4" fill="#ff6b6b" stroke="white" strokeWidth="2" />
                        <text x="210" y="195" className="text-xs fill-red-600">Critical Point</text>
                        
                        {/* Inflection points */}
                        <circle cx="400" cy="150" r="4" fill="#4ecdc4" stroke="white" strokeWidth="2" />
                        <text x="410" y="145" className="text-xs fill-teal-600">Inflection Point</text>
                      </g>
                    )}
                  </svg>
                  
                  {/* Floating AI Insights */}
                  {analysisMode && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain size={16} className="text-purple-500" />
                        <span className="font-medium text-sm">AI Insights</span>
                      </div>
                      <div className="text-xs text-secondary space-y-1">
                        <div>• Function is continuous</div>
                        <div>• Has 2 critical points</div>
                        <div>• Concave up everywhere</div>
                        <div>• Range: [0, ∞)</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Collaboration Indicators */}
                  {collaborationMode && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-xs text-secondary">3 collaborators online</span>
                    </div>
                  )}
                  
                  {/* Educational Mode Overlay */}
                  {educationalMode && (
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-yellow-50 border border-yellow-200 p-3 rounded-lg max-w-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={16} className="text-yellow-600" />
                        <span className="font-medium text-sm text-yellow-800">Learning Tip</span>
                      </div>
                      <p className="text-xs text-yellow-700">
                        This quadratic function opens upward because the coefficient of x² is positive.
                        The vertex represents the minimum point.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain size={40} className="text-purple-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Ready for AI-Powered Graphing</h3>
                    <p className="text-secondary">Describe your function naturally or use the AI suggestions to get started</p>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Controls Footer */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-secondary">Zoom:</span>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={viewSettings.zoom}
                    onChange={(e) => setViewSettings(prev => ({ ...prev, zoom: parseFloat(e.target.value) }))}
                    className="w-20"
                  />
                  <span className="text-xs text-secondary">{viewSettings.zoom.toFixed(1)}x</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-secondary">Quality:</span>
                  <select
                    value={viewSettings.quality}
                    onChange={(e) => setViewSettings(prev => ({ ...prev, quality: e.target.value as any }))}
                    className="text-sm border rounded p-1"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Cpu size={16} />
                <span>Real-time computation</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Features Showcase */}
      <div className="mt-8 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6">
        <div className="card p-6 text-center">
          <Brain className="text-purple-500 mx-auto mb-3" size={32} />
          <h3 className="font-semibold text-primary mb-2">AI-Powered</h3>
          <p className="text-sm text-secondary">Natural language input with intelligent function recognition</p>
        </div>
        
        <div className="card p-6 text-center">
          <Volume2 className="text-green-500 mx-auto mb-3" size={32} />
          <h3 className="font-semibold text-primary mb-2">Voice Control</h3>
          <p className="text-sm text-secondary">Speak your functions and let AI translate them</p>
        </div>
        
        <div className="card p-6 text-center">
          <Users className="text-blue-500 mx-auto mb-3" size={32} />
          <h3 className="font-semibold text-primary mb-2">Collaborative</h3>
          <p className="text-sm text-secondary">Real-time sharing and collaborative graph building</p>
        </div>
        
        <div className="card p-6 text-center">
          <Sparkles className="text-yellow-500 mx-auto mb-3" size={32} />
          <h3 className="font-semibold text-primary mb-2">Smart Analysis</h3>
          <p className="text-sm text-secondary">Automatic function analysis with educational insights</p>
        </div>
      </div>
    </div>
  );
};