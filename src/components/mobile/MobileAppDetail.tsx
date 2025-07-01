import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from './MobileLayout';
import { ActionButton } from './ActionButton';
import { 
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Star,
  BookOpen,
  Share,
  Play
} from 'lucide-react';

// Import all app components
import { DynamicGraphingCalculator } from '../apps/DynamicGraphingCalculator';
import { EquationStepSolver } from '../apps/EquationStepSolver';
import { InteractiveDerivativeExplorer } from '../apps/InteractiveDerivativeExplorer';
import { VectorVisualizer3D } from '../apps/VectorVisualizer3D';
import { ProbabilitySimulator } from '../apps/ProbabilitySimulator';
import { MatrixPlayground } from '../apps/MatrixPlayground';
import { DifferentialEquationVisualizer } from '../apps/DifferentialEquationVisualizer';
import { FourierSeriesSoundTool } from '../apps/FourierSeriesSoundTool';
import { MathWordProblemConverter } from '../apps/MathWordProblemConverter';
import { FunctionCompositionVisualizer } from '../apps/FunctionCompositionVisualizer';
import { LimitContinuityVisualLab } from '../apps/LimitContinuityVisualLab';
import { InteractiveTrigonometryTriangle } from '../apps/InteractiveTrigonometryTriangle';
import { LinearTransformationShapes } from '../apps/LinearTransformationShapes';
import { SetTheoryVennDiagramTool } from '../apps/SetTheoryVennDiagramTool';
import { AlgebraicExpressionSimplifierGame } from '../apps/AlgebraicExpressionSimplifierGame';
import { FractalGenerator } from '../apps/FractalGenerator';
import { PrimeNumberExplorer } from '../apps/PrimeNumberExplorer';
import { MathPuzzleGenerator } from '../apps/MathPuzzleGenerator';
import { DynamicInequalityGrapher } from '../apps/DynamicInequalityGrapher';
import { LiveCodingMathNotebook } from '../apps/LiveCodingMathNotebook';

// Map of app IDs to components
const appComponentMap: Record<string, React.ComponentType<any>> = {
  'dynamic-graphing': DynamicGraphingCalculator,
  'equation-step-solver': EquationStepSolver,
  'derivative-explorer': InteractiveDerivativeExplorer,
  'vector-3d': VectorVisualizer3D,
  'probability-simulator': ProbabilitySimulator,
  'matrix-playground': MatrixPlayground,
  'differential-equation': DifferentialEquationVisualizer,
  'fourier-sound': FourierSeriesSoundTool,
  'word-problem-converter': MathWordProblemConverter,
  'function-composition': FunctionCompositionVisualizer,
  'limit-continuity': LimitContinuityVisualLab,
  'trigonometry-triangle': InteractiveTrigonometryTriangle,
  'linear-transformation': LinearTransformationShapes,
  'venn-diagram': SetTheoryVennDiagramTool,
  'expression-simplifier': AlgebraicExpressionSimplifierGame,
  'fractal-generator': FractalGenerator,
  'prime-explorer': PrimeNumberExplorer,
  'math-puzzle': MathPuzzleGenerator,
  'inequality-grapher': DynamicInequalityGrapher,
  'math-notebook': LiveCodingMathNotebook
};

// App data details
const appDataMap: Record<string, {
  title: string;
  description: string;
  difficulty: string;
  category: string;
  colorClass: string;
  features: string[];
}> = {
  'dynamic-graphing': {
    title: 'Dynamic Graphing Calculator',
    description: 'Interactive 2D & 3D function plotting with real-time parameter adjustment',
    difficulty: 'Intermediate',
    category: 'Visualization',
    colorClass: 'bg-blue-600',
    features: ['2D & 3D Plotting', 'Parameter Sliders', 'Zoom & Pan', 'Export Functions']
  },
  'equation-step-solver': {
    title: 'Equation Step Solver',
    description: 'Visual step-by-step equation solving with interactive animations',
    difficulty: 'Beginner',
    category: 'Problem Solving',
    colorClass: 'bg-green-600',
    features: ['Step-by-Step', 'Visual Animations', 'Guess Next Step', 'Multiple Methods']
  },
  'derivative-explorer': {
    title: 'Interactive Derivative Explorer',
    description: 'Real-time tangent line visualization and slope calculation',
    difficulty: 'Intermediate',
    category: 'Calculus',
    colorClass: 'bg-purple-600',
    features: ['Live Tangent Lines', 'Slope Display', 'Interactive Cursor', 'Definition Sliders']
  },
  'vector-3d': {
    title: '3D Vector Visualizer',
    description: 'Visualize vectors in 3D space with dot/cross product calculations',
    difficulty: 'Intermediate',
    category: 'Linear Algebra',
    colorClass: 'bg-orange-600',
    features: ['3D Visualization', 'Dot Product', 'Cross Product', 'Angle Calculation']
  },
  'probability-simulator': {
    title: 'Probability Simulator',
    description: 'Interactive dice, coin, and Monty Hall problem simulations',
    difficulty: 'Beginner',
    category: 'Statistics',
    colorClass: 'bg-yellow-600',
    features: ['Dice & Coins', 'Monty Hall', 'Real-time Graphs', 'Custom Trials']
  },
  'matrix-playground': {
    title: 'Matrix Playground',
    description: 'Step-by-step matrix operations with transformation visualizations',
    difficulty: 'Intermediate',
    category: 'Linear Algebra',
    colorClass: 'bg-indigo-600',
    features: ['Matrix Operations', 'Row Operations', 'Eigenvalues', 'Transformations']
  },
  'differential-equation': {
    title: 'Differential Equation Visualizer',
    description: 'Plot slope fields and phase portraits for differential equations',
    difficulty: 'Advanced',
    category: 'Calculus',
    colorClass: 'bg-teal-600',
    features: ['Slope Fields', 'Phase Portraits', 'Initial Conditions', 'System of ODEs']
  },
  'fourier-sound': {
    title: 'Fourier Series Sound Tool',
    description: 'Visualize and hear Fourier series decomposition of waveforms',
    difficulty: 'Advanced',
    category: 'Signal Processing',
    colorClass: 'bg-pink-600',
    features: ['Wave Drawing', 'Harmonic Sliders', 'Audio Playback', 'Fourier Animation']
  },
  'word-problem-converter': {
    title: 'Math Word Problem Converter',
    description: 'Convert real-world problems into mathematical equations',
    difficulty: 'Intermediate',
    category: 'Problem Solving',
    colorClass: 'bg-emerald-600',
    features: ['NLP Processing', 'Equation Generation', 'Step-by-Step', 'Real-world Examples']
  },
  'function-composition': {
    title: 'Function Composition Visualizer',
    description: 'Visualize composition of functions with color-coded overlays',
    difficulty: 'Intermediate',
    category: 'Functions',
    colorClass: 'bg-violet-600',
    features: ['Function Graphs', 'Composition f(g(x))', 'Color Overlays', 'Real-time Values']
  },
  'limit-continuity': {
    title: 'Limit & Continuity Visual Lab',
    description: 'Interactive epsilon-delta visualization with dynamic sliders',
    difficulty: 'Advanced',
    category: 'Calculus',
    colorClass: 'bg-cyan-600',
    features: ['Epsilon-Delta', 'Dynamic Sliders', 'Discontinuity Detection', 'Visual Proofs']
  },
  'trigonometry-triangle': {
    title: 'Interactive Trigonometry Triangle',
    description: 'Draggable triangle with real-time angle and side calculations',
    difficulty: 'Beginner',
    category: 'Trigonometry',
    colorClass: 'bg-amber-600',
    features: ['Draggable Points', 'Angle Calculation', 'Side Lengths', 'Area Computation']
  },
  'linear-transformation': {
    title: 'Linear Transformation on Shapes',
    description: 'Visualize matrix transformations on geometric shapes',
    difficulty: 'Intermediate',
    category: 'Linear Algebra',
    colorClass: 'bg-red-600',
    features: ['Shape Transformation', 'Matrix Input', 'Animation', 'Separate Operations']
  },
  'venn-diagram': {
    title: 'Set Theory Venn Diagram Tool',
    description: 'Interactive Venn diagrams with drag-and-drop set operations',
    difficulty: 'Beginner',
    category: 'Set Theory',
    colorClass: 'bg-lime-600',
    features: ['Interactive Diagrams', 'Drag & Drop', 'Union/Intersection', '3-Set Support']
  },
  'expression-simplifier': {
    title: 'Algebraic Expression Simplifier Game',
    description: 'Gamified drag-and-drop expression simplification',
    difficulty: 'Beginner',
    category: 'Algebra',
    colorClass: 'bg-fuchsia-600',
    features: ['Drag & Drop', 'Gamification', 'Hints System', 'Score Tracking']
  },
  'fractal-generator': {
    title: 'Fractal Generator',
    description: 'Generate beautiful fractals with customizable parameters and zoom',
    difficulty: 'Intermediate',
    category: 'Geometry',
    colorClass: 'bg-slate-600',
    features: ['Mandelbrot Set', 'Julia Sets', 'Zoom Controls', 'Color Customization']
  },
  'prime-explorer': {
    title: 'Prime Number Explorer',
    description: 'Visualize prime numbers on Ulam spiral and explore factorization',
    difficulty: 'Intermediate',
    category: 'Number Theory',
    colorClass: 'bg-stone-600',
    features: ['Ulam Spiral', 'Sieve of Eratosthenes', 'Prime Factorization', 'Interactive Hover']
  },
  'math-puzzle': {
    title: 'Math Puzzle Generator',
    description: 'Procedurally generated number theory puzzles with hints',
    difficulty: 'Intermediate',
    category: 'Number Theory',
    colorClass: 'bg-emerald-600',
    features: ['Procedural Generation', 'Difficulty Levels', 'Hint System', 'Score Tracking']
  },
  'inequality-grapher': {
    title: 'Dynamic Inequality Grapher',
    description: 'Plot and visualize systems of inequalities with shaded regions',
    difficulty: 'Intermediate',
    category: 'Algebra',
    colorClass: 'bg-sky-600',
    features: ['Shaded Regions', 'Multiple Inequalities', 'Intersection Highlighting', 'Dynamic Constraints']
  },
  'math-notebook': {
    title: 'Live Coding Math Notebook',
    description: 'Interactive mathematical notebook with live evaluation and LaTeX',
    difficulty: 'Advanced',
    category: 'Tools',
    colorClass: 'bg-rose-600',
    features: ['Live Evaluation', 'LaTeX Rendering', 'Plot Integration', 'Export Options']
  }
};

export const MobileAppDetail: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  
  // Get app component and data
  const AppComponent = appId ? appComponentMap[appId] : null;
  const appData = appId ? appDataMap[appId] : null;
  
  // State to track if app is launched
  const [isAppLaunched, setIsAppLaunched] = useState(false);
  
  if (!appId || !AppComponent || !appData) {
    return (
      <MobileLayout>
        <div className="p-4 flex flex-col items-center justify-center h-full">
          <AlertTriangle size={48} className="text-yellow-500 mb-4" />
          <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">
            App Not Found
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-center mb-6">
            The application you're looking for doesn't exist or has been moved.
          </p>
          <ActionButton
            label="Back to Apps"
            color="secondary"
            onClick={() => navigate('/apps')}
          />
        </div>
      </MobileLayout>
    );
  }
  
  // If app is launched, show the app component
  if (isAppLaunched) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        {/* Simple app header with back button */}
        <div className="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700 p-3 flex items-center sticky top-0 z-50">
          <button 
            onClick={() => setIsAppLaunched(false)}
            className="w-8 h-8 flex items-center justify-center mr-3 text-neutral-600 dark:text-neutral-300"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-base font-medium text-neutral-900 dark:text-white truncate">
            {appData.title}
          </h1>
        </div>

        {/* App component container */}
        <div className="overflow-hidden">
          <AppComponent />
        </div>
      </div>
    );
  }
  
  // Show app details if not launched
  return (
    <MobileLayout hideNav>
      {/* App Header */}
      <div className={`${appData.colorClass} p-6 text-white`}>
        <h1 className="text-2xl font-bold mb-2">{appData.title}</h1>
        <div className="flex items-center justify-between">
          <span className="bg-white/20 px-2 py-1 rounded-md text-xs">
            {appData.category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-300" />
            <span className="text-sm font-medium">4.8</span>
            <span className="text-xs">(120)</span>
          </div>
        </div>
      </div>
      
      {/* App Description */}
      <div className="p-4">
        <p className="text-neutral-700 dark:text-neutral-300">
          {appData.description}
        </p>
      </div>
      
      {/* Features */}
      <div className="px-4 pb-4">
        <h2 className="font-medium text-neutral-900 dark:text-white mb-3">Features</h2>
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-3">
          <ul className="space-y-2">
            {appData.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm">
                <CheckCircle size={16} className="text-green-500 dark:text-green-400 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Difficulty */}
      <div className="px-4 pb-4">
        <h2 className="font-medium text-neutral-900 dark:text-white mb-3">Difficulty</h2>
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-3">
          <div className="flex items-center gap-2">
            <div 
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                appData.difficulty === 'Beginner' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                  : appData.difficulty === 'Intermediate'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              }`}
            >
              {appData.difficulty}
            </div>
            <span className="text-sm text-neutral-600 dark:text-neutral-300">
              {appData.difficulty === 'Beginner' 
                ? 'Suitable for beginners' 
                : appData.difficulty === 'Intermediate'
                ? 'Some mathematical background recommended'
                : 'Advanced mathematical concepts'}
            </span>
          </div>
        </div>
      </div>
      
      {/* How To Use */}
      <div className="px-4 pb-20">
        <h2 className="font-medium text-neutral-900 dark:text-white mb-3">How to Use</h2>
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-3">
          <div className="flex items-center justify-between">
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">View tutorial</span>
            <BookOpen size={16} className="text-blue-500 dark:text-blue-400" />
          </div>
        </div>
      </div>
      
      {/* Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
        <div className="grid grid-cols-5 gap-3">
          <ActionButton
            label="Share"
            icon={<Share size={18} />}
            color="secondary"
            className="col-span-1"
          />
          <ActionButton
            label="Launch App"
            icon={<Play size={18} />}
            color="primary"
            className="col-span-4"
            onClick={() => setIsAppLaunched(true)}
          />
        </div>
      </div>
    </MobileLayout>
  );
};