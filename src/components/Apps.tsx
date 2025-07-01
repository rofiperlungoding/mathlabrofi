import React, { useState, useEffect } from 'react';
import { 
  Grid3X3, 
  TrendingUp, 
  Zap, 
  Dice6, 
  Snowflake,
  Triangle,
  Activity,
  Music,
  MessageSquare,
  Layers,
  Target,
  Shapes,
  GitBranch,
  Gamepad2,
  Hash,
  Puzzle,
  BarChart3,
  FileText,
  Search,
  Filter,
  SlidersHorizontal,
  BookOpen,
  Tag,
  Calculator
} from 'lucide-react';

// Import all app components
import { DynamicGraphingCalculator } from './apps/DynamicGraphingCalculator';
import { EquationStepSolver } from './apps/EquationStepSolver';
import { InteractiveDerivativeExplorer } from './apps/InteractiveDerivativeExplorer';
import { VectorVisualizer3D } from './apps/VectorVisualizer3D';
import { ProbabilitySimulator } from './apps/ProbabilitySimulator';
import { MatrixPlayground } from './apps/MatrixPlayground';
import { DifferentialEquationVisualizer } from './apps/DifferentialEquationVisualizer';
import { FourierSeriesSoundTool } from './apps/FourierSeriesSoundTool';
import { MathWordProblemConverter } from './apps/MathWordProblemConverter';
import { FunctionCompositionVisualizer } from './apps/FunctionCompositionVisualizer';
import { LimitContinuityVisualLab } from './apps/LimitContinuityVisualLab';
import { InteractiveTrigonometryTriangle } from './apps/InteractiveTrigonometryTriangle';
import { LinearTransformationShapes } from './apps/LinearTransformationShapes';
import { SetTheoryVennDiagramTool } from './apps/SetTheoryVennDiagramTool';
import { AlgebraicExpressionSimplifierGame } from './apps/AlgebraicExpressionSimplifierGame';
import { FractalGenerator } from './apps/FractalGenerator';
import { PrimeNumberExplorer } from './apps/PrimeNumberExplorer';
import { MathPuzzleGenerator } from './apps/MathPuzzleGenerator';
import { DynamicInequalityGrapher } from './apps/DynamicInequalityGrapher';
import { LiveCodingMathNotebook } from './apps/LiveCodingMathNotebook';

interface App {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  component: React.ComponentType<any>;
  gradient: string;
  features: string[];
}

export const Apps: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Scroll to top when selected app changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedApp]);

  const mathApps: App[] = [
    {
      id: 'dynamic-graphing',
      title: 'Dynamic Graphing Calculator',
      description: 'Interactive 2D & 3D function plotting with real-time parameter adjustment',
      icon: Calculator,
      category: 'Visualization',
      difficulty: 'intermediate',
      component: DynamicGraphingCalculator,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['2D & 3D Plotting', 'Parameter Sliders', 'Zoom & Pan', 'Export Functions']
    },
    {
      id: 'equation-step-solver',
      title: 'Equation Step Solver',
      description: 'Visual step-by-step equation solving with interactive animations',
      icon: Target,
      category: 'Problem Solving',
      difficulty: 'beginner',
      component: EquationStepSolver,
      gradient: 'from-green-500 to-teal-500',
      features: ['Step-by-Step', 'Visual Animations', 'Guess Next Step', 'Multiple Methods']
    },
    {
      id: 'derivative-explorer',
      title: 'Interactive Derivative Explorer',
      description: 'Real-time tangent line visualization and slope calculation',
      icon: TrendingUp,
      category: 'Calculus',
      difficulty: 'intermediate',
      component: InteractiveDerivativeExplorer,
      gradient: 'from-purple-500 to-pink-500',
      features: ['Live Tangent Lines', 'Slope Display', 'Interactive Cursor', 'Definition Sliders']
    },
    {
      id: 'vector-3d',
      title: '3D Vector Visualizer',
      description: 'Visualize vectors in 3D space with dot/cross product calculations',
      icon: Zap,
      category: 'Linear Algebra',
      difficulty: 'intermediate',
      component: VectorVisualizer3D,
      gradient: 'from-orange-500 to-red-500',
      features: ['3D Visualization', 'Dot Product', 'Cross Product', 'Angle Calculation']
    },
    {
      id: 'probability-simulator',
      title: 'Probability Simulator',
      description: 'Interactive dice, coin, and Monty Hall problem simulations',
      icon: Dice6,
      category: 'Statistics',
      difficulty: 'beginner',
      component: ProbabilitySimulator,
      gradient: 'from-yellow-500 to-orange-500',
      features: ['Dice & Coins', 'Monty Hall', 'Real-time Graphs', 'Custom Trials']
    },
    {
      id: 'matrix-playground',
      title: 'Matrix Playground',
      description: 'Step-by-step matrix operations with transformation visualizations',
      icon: Grid3X3,
      category: 'Linear Algebra',
      difficulty: 'intermediate',
      component: MatrixPlayground,
      gradient: 'from-indigo-500 to-purple-500',
      features: ['Matrix Operations', 'Row Operations', 'Eigenvalues', 'Transformations']
    },
    {
      id: 'differential-equation',
      title: 'Differential Equation Visualizer',
      description: 'Plot slope fields and phase portraits for differential equations',
      icon: Activity,
      category: 'Calculus',
      difficulty: 'advanced',
      component: DifferentialEquationVisualizer,
      gradient: 'from-teal-500 to-blue-500',
      features: ['Slope Fields', 'Phase Portraits', 'Initial Conditions', 'System of ODEs']
    },
    {
      id: 'fourier-sound',
      title: 'Fourier Series Sound Tool',
      description: 'Visualize and hear Fourier series decomposition of waveforms',
      icon: Music,
      category: 'Signal Processing',
      difficulty: 'advanced',
      component: FourierSeriesSoundTool,
      gradient: 'from-pink-500 to-rose-500',
      features: ['Wave Drawing', 'Harmonic Sliders', 'Audio Playback', 'Fourier Animation']
    },
    {
      id: 'word-problem-converter',
      title: 'Math Word Problem Converter',
      description: 'Convert real-world problems into mathematical equations',
      icon: MessageSquare,
      category: 'Problem Solving',
      difficulty: 'intermediate',
      component: MathWordProblemConverter,
      gradient: 'from-emerald-500 to-green-500',
      features: ['NLP Processing', 'Equation Generation', 'Step-by-Step', 'Real-world Examples']
    },
    {
      id: 'function-composition',
      title: 'Function Composition Visualizer',
      description: 'Visualize composition of functions with color-coded overlays',
      icon: Layers,
      category: 'Functions',
      difficulty: 'intermediate',
      component: FunctionCompositionVisualizer,
      gradient: 'from-violet-500 to-purple-500',
      features: ['Function Graphs', 'Composition f(g(x))', 'Color Overlays', 'Real-time Values']
    },
    {
      id: 'limit-continuity',
      title: 'Limit & Continuity Visual Lab',
      description: 'Interactive epsilon-delta visualization with dynamic sliders',
      icon: Target,
      category: 'Calculus',
      difficulty: 'advanced',
      component: LimitContinuityVisualLab,
      gradient: 'from-cyan-500 to-blue-500',
      features: ['Epsilon-Delta', 'Dynamic Sliders', 'Discontinuity Detection', 'Visual Proofs']
    },
    {
      id: 'trigonometry-triangle',
      title: 'Interactive Trigonometry Triangle',
      description: 'Draggable triangle with real-time angle and side calculations',
      icon: Triangle,
      category: 'Trigonometry',
      difficulty: 'beginner',
      component: InteractiveTrigonometryTriangle,
      gradient: 'from-amber-500 to-orange-500',
      features: ['Draggable Points', 'Angle Calculation', 'Side Lengths', 'Area Computation']
    },
    {
      id: 'linear-transformation',
      title: 'Linear Transformation on Shapes',
      description: 'Visualize matrix transformations on geometric shapes',
      icon: Shapes,
      category: 'Linear Algebra',
      difficulty: 'intermediate',
      component: LinearTransformationShapes,
      gradient: 'from-red-500 to-pink-500',
      features: ['Shape Transformation', 'Matrix Input', 'Animation', 'Separate Operations']
    },
    {
      id: 'venn-diagram',
      title: 'Set Theory Venn Diagram Tool',
      description: 'Interactive Venn diagrams with drag-and-drop set operations',
      icon: GitBranch,
      category: 'Set Theory',
      difficulty: 'beginner',
      component: SetTheoryVennDiagramTool,
      gradient: 'from-lime-500 to-green-500',
      features: ['Interactive Diagrams', 'Drag & Drop', 'Union/Intersection', '3-Set Support']
    },
    {
      id: 'expression-simplifier',
      title: 'Algebraic Expression Simplifier Game',
      description: 'Gamified drag-and-drop expression simplification',
      icon: Gamepad2,
      category: 'Algebra',
      difficulty: 'beginner',
      component: AlgebraicExpressionSimplifierGame,
      gradient: 'from-fuchsia-500 to-purple-500',
      features: ['Drag & Drop', 'Gamification', 'Hints System', 'Score Tracking']
    },
    {
      id: 'fractal-generator',
      title: 'Fractal Generator',
      description: 'Generate beautiful fractals with customizable parameters and zoom',
      icon: Snowflake,
      category: 'Geometry',
      difficulty: 'intermediate',
      component: FractalGenerator,
      gradient: 'from-slate-500 to-gray-500',
      features: ['Mandelbrot Set', 'Julia Sets', 'Zoom Controls', 'Color Customization']
    },
    {
      id: 'prime-explorer',
      title: 'Prime Number Explorer',
      description: 'Visualize prime numbers on Ulam spiral and explore factorization',
      icon: Hash,
      category: 'Number Theory',
      difficulty: 'intermediate',
      component: PrimeNumberExplorer,
      gradient: 'from-stone-500 to-neutral-500',
      features: ['Ulam Spiral', 'Sieve of Eratosthenes', 'Prime Factorization', 'Interactive Hover']
    },
    {
      id: 'math-puzzle',
      title: 'Math Puzzle Generator',
      description: 'Procedurally generated number theory puzzles with hints',
      icon: Puzzle,
      category: 'Number Theory',
      difficulty: 'intermediate',
      component: MathPuzzleGenerator,
      gradient: 'from-emerald-500 to-cyan-500',
      features: ['Procedural Generation', 'Difficulty Levels', 'Hint System', 'Score Tracking']
    },
    {
      id: 'inequality-grapher',
      title: 'Dynamic Inequality Grapher',
      description: 'Plot and visualize systems of inequalities with shaded regions',
      icon: BarChart3,
      category: 'Algebra',
      difficulty: 'intermediate',
      component: DynamicInequalityGrapher,
      gradient: 'from-sky-500 to-indigo-500',
      features: ['Shaded Regions', 'Multiple Inequalities', 'Intersection Highlighting', 'Dynamic Constraints']
    },
    {
      id: 'math-notebook',
      title: 'Live Coding Math Notebook',
      description: 'Interactive mathematical notebook with live evaluation and LaTeX',
      icon: FileText,
      category: 'Tools',
      difficulty: 'advanced',
      component: LiveCodingMathNotebook,
      gradient: 'from-rose-500 to-orange-500',
      features: ['Live Evaluation', 'LaTeX Rendering', 'Plot Integration', 'Export Options']
    }
  ];

  const categories = [
    'all',
    'Visualization',
    'Problem Solving',
    'Calculus',
    'Linear Algebra',
    'Statistics',
    'Algebra',
    'Geometry',
    'Trigonometry',
    'Number Theory',
    'Set Theory',
    'Functions',
    'Signal Processing',
    'Tools'
  ];

  const filteredApps = mathApps.filter(app => {
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300';
    }
  };
  
  const getDifficultyValue = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 1;
      case 'intermediate': return 2;
      case 'advanced': return 3;
      default: return 0;
    }
  };
  
  // Group apps by category for the category view
  const appsByCategory = categories.slice(1).reduce((acc, category) => {
    const apps = mathApps.filter(app => app.category === category && 
                                 (searchQuery ? (app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                               app.description.toLowerCase().includes(searchQuery.toLowerCase())) : true));
    if (apps.length > 0) {
      acc[category] = apps;
    }
    return acc;
  }, {} as Record<string, App[]>);

  if (selectedApp) {
    const AppComponent = selectedApp.component;
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setSelectedApp(null)}
            className="btn btn-ghost mb-4 group transition-all hover:-translate-x-0.5"
          >
            <span className="flex items-center gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">←</span>
              <span>Back to Apps</span>
            </span>
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedApp.gradient} text-white shadow-md`}>
              <selectedApp.icon size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{selectedApp.title}</h1>
              <p className="text-neutral-600 dark:text-neutral-400">{selectedApp.description}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 min-h-[600px]">
          <AppComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-3">
          <Grid3X3 className="text-neutral-800 dark:text-neutral-200" />
          Mathematical Apps
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400">
          20 interactive mathematical tools for exploration, visualization, and problem-solving
        </p>
      </div>

      {/* Search and Filter - Improved with collapsible filters */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col tablet:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={18} />
              <input
                type="text"
                placeholder="Search apps by name, category, or functionality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-12 border border-neutral-300 dark:border-neutral-600 rounded-xl focus-ring text-sm bg-white dark:bg-neutral-800 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white rounded-xl focus-ring text-sm bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <Tag className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400" size={16} />
            </div>
            
            <div className="flex border border-neutral-300 dark:border-neutral-600 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center justify-center p-3 ${viewMode === 'grid' ? 'bg-neutral-900 dark:bg-blue-600 text-white' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'}`}
                title="Grid view"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center p-3 ${viewMode === 'list' ? 'bg-neutral-900 dark:bg-blue-600 text-white' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'}`}
                title="List view"
              >
                <BarChart3 size={18} />
              </button>
            </div>
            
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="btn btn-ghost border border-neutral-300 dark:border-neutral-600 flex items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              <span className="sr-only sm:not-sr-only">Filters</span>
            </button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        {isFilterExpanded && (
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Difficulty Level</label>
              <div className="space-y-2">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <label key={level} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-neutral-900 dark:text-blue-500 dark:border-neutral-600 dark:bg-neutral-700" />
                    <span className="text-sm capitalize dark:text-neutral-300">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Features</label>
              <div className="space-y-2">
                {['Interactive', 'Real-time', 'Visualization', 'Game'].map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-neutral-900 dark:text-blue-500 dark:border-neutral-600 dark:bg-neutral-700" />
                    <span className="text-sm dark:text-neutral-300">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Sort By</label>
              <select className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm dark:bg-neutral-800 dark:text-white">
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="difficulty-asc">Easiest First</option>
                <option value="difficulty-desc">Hardest First</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Apps Display - Grid or List View */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredApps.map((app) => {
            const IconComponent = app.icon;
            return (
              <div
                key={app.id}
                className="card p-6 cursor-pointer group hover:shadow-md dark:hover:shadow-black/20 transition-all duration-300 flex flex-col h-full"
                onClick={() => setSelectedApp(app)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${app.gradient} text-white group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
                    <IconComponent size={20} />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(app.difficulty)}`}>
                    {app.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                  {app.title}
                </h3>
                
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 flex-grow">
                  {app.description}
                </p>
                
                <div className="mt-auto">
                  <div className="mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300">
                      {app.category}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {app.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-500">
                        <div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View - More detailed with horizontal cards */
        <div className="space-y-4 mb-12">
          {filteredApps.map((app) => {
            const IconComponent = app.icon;
            return (
              <div
                key={app.id}
                className="card p-4 cursor-pointer hover:shadow-md dark:hover:shadow-black/20 transition-all duration-300 group"
                onClick={() => setSelectedApp(app)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${app.gradient} text-white group-hover:scale-110 transition-transform duration-200 flex-shrink-0 shadow-sm`}>
                    <IconComponent size={20} />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                        {app.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(app.difficulty)} ml-2`}>
                        {app.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      {app.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-medium px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300">
                        {app.category}
                      </span>
                      
                      <div className="flex items-center gap-3">
                        {app.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-500">
                            <div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Category View - Alternative way to browse by category */}
      {viewMode === 'grid' && selectedCategory === 'all' && !searchQuery && (
        <div className="space-y-12 mb-12">
          {Object.entries(appsByCategory).map(([category, apps]) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">{category}</h2>
                <button className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                  View all ({apps.length})
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {apps.slice(0, 4).map((app) => {
                  const IconComponent = app.icon;
                  return (
                    <div
                      key={app.id}
                      className="card p-6 cursor-pointer group hover:shadow-md dark:hover:shadow-black/20 transition-all duration-300 flex flex-col h-full"
                      onClick={() => setSelectedApp(app)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${app.gradient} text-white group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
                          <IconComponent size={20} />
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(app.difficulty)}`}>
                          {app.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                        {app.title}
                      </h3>
                      
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 flex-grow">
                        {app.description}
                      </p>
                      
                      <div className="mt-auto">
                        <div className="mb-3">
                          <span className="text-xs font-medium px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300">
                            {app.category}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          {app.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-500">
                              <div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <Grid3X3 size={48} className="text-neutral-400 dark:text-neutral-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">No apps found</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">Try adjusting your search or category filter</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setIsFilterExpanded(false);
            }}
            className="btn btn-primary"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-neutral-900 dark:text-white">{mathApps.length}</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Apps</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {mathApps.filter(app => app.difficulty === 'beginner').length}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Beginner</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {mathApps.filter(app => app.difficulty === 'intermediate').length}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Intermediate</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {mathApps.filter(app => app.difficulty === 'advanced').length}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Advanced</div>
        </div>
      </div>
    </div>
  );
};