import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from './MobileLayout';
import { MobileCard } from './MobileCard';
import { 
  Calculator,
  TrendingUp,
  Target,
  Zap,
  Dice6,
  Grid3X3,
  Activity,
  Music,
  MessageSquare,
  Layers,
  Triangle,
  Shapes,
  GitBranch,
  Gamepad2,
  Hash,
  Puzzle,
  BarChart3,
  FileText,
  Search,
  X,
  Snowflake
} from 'lucide-react';

interface App {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: string;
}

export const MobileApps: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  
  const apps: App[] = [
    {
      id: 'dynamic-graphing',
      title: 'Dynamic Graphing Calculator',
      description: 'Interactive 2D & 3D function plotting with real-time parameter adjustment',
      icon: <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
        <Calculator size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'equation-step-solver',
      title: 'Equation Step Solver',
      description: 'Visual step-by-step equation solving with interactive animations',
      icon: <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
        <Target size={20} />
      </div>,
      difficulty: 'Beginner'
    },
    {
      id: 'derivative-explorer',
      title: 'Interactive Derivative Explorer',
      description: 'Real-time tangent line visualization and slope calculation',
      icon: <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
        <TrendingUp size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'vector-3d',
      title: '3D Vector Visualizer',
      description: 'Visualize vectors in 3D space with dot/cross product calculations',
      icon: <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
        <Zap size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'probability-simulator',
      title: 'Probability Simulator',
      description: 'Interactive dice, coin, and Monty Hall problem simulations',
      icon: <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
        <Dice6 size={20} />
      </div>,
      difficulty: 'Beginner'
    },
    {
      id: 'matrix-playground',
      title: 'Matrix Playground',
      description: 'Step-by-step matrix operations with transformation visualizations',
      icon: <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
        <Grid3X3 size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'differential-equation',
      title: 'Differential Equation Visualizer',
      description: 'Plot slope fields and phase portraits for differential equations',
      icon: <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
        <Activity size={20} />
      </div>,
      difficulty: 'Advanced'
    },
    {
      id: 'fourier-sound',
      title: 'Fourier Series Sound Tool',
      description: 'Visualize and hear Fourier series decomposition of waveforms',
      icon: <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
        <Music size={20} />
      </div>,
      difficulty: 'Advanced'
    },
    {
      id: 'word-problem-converter',
      title: 'Math Word Problem Converter',
      description: 'Convert real-world problems into mathematical equations',
      icon: <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
        <MessageSquare size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'function-composition',
      title: 'Function Composition Visualizer',
      description: 'Visualize composition of functions with color-coded overlays',
      icon: <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
        <Layers size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'limit-continuity',
      title: 'Limit & Continuity Visual Lab',
      description: 'Interactive epsilon-delta visualization with dynamic sliders',
      icon: <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
        <Target size={20} />
      </div>,
      difficulty: 'Advanced'
    },
    {
      id: 'trigonometry-triangle',
      title: 'Interactive Trigonometry Triangle',
      description: 'Draggable triangle with real-time angle and side calculations',
      icon: <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
        <Triangle size={20} />
      </div>,
      difficulty: 'Beginner'
    },
    {
      id: 'linear-transformation',
      title: 'Linear Transformation on Shapes',
      description: 'Visualize matrix transformations on geometric shapes',
      icon: <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
        <Shapes size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'venn-diagram',
      title: 'Set Theory Venn Diagram Tool',
      description: 'Interactive Venn diagrams with drag-and-drop set operations',
      icon: <div className="w-10 h-10 rounded-lg bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center text-lime-600 dark:text-lime-400">
        <GitBranch size={20} />
      </div>,
      difficulty: 'Beginner'
    },
    {
      id: 'expression-simplifier',
      title: 'Algebraic Expression Simplifier Game',
      description: 'Gamified drag-and-drop expression simplification',
      icon: <div className="w-10 h-10 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900/30 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400">
        <Gamepad2 size={20} />
      </div>,
      difficulty: 'Beginner'
    },
    {
      id: 'fractal-generator',
      title: 'Fractal Generator',
      description: 'Generate beautiful fractals with customizable parameters and zoom',
      icon: <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
        <Snowflake size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'prime-explorer',
      title: 'Prime Number Explorer',
      description: 'Visualize prime numbers on Ulam spiral and explore factorization',
      icon: <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400">
        <Hash size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'math-puzzle',
      title: 'Math Puzzle Generator',
      description: 'Procedurally generated number theory puzzles with hints',
      icon: <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
        <Puzzle size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'inequality-grapher',
      title: 'Dynamic Inequality Grapher',
      description: 'Plot and visualize systems of inequalities with shaded regions',
      icon: <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
        <BarChart3 size={20} />
      </div>,
      difficulty: 'Intermediate'
    },
    {
      id: 'math-notebook',
      title: 'Live Coding Math Notebook',
      description: 'Interactive mathematical notebook with live evaluation and LaTeX',
      icon: <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
        <FileText size={20} />
      </div>,
      difficulty: 'Advanced'
    }
  ];
  
  // Filter apps by search query and category
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        app.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                            app.difficulty.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300';
      default: return 'text-neutral-600 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300';
    }
  };

  return (
    <MobileLayout title="Apps">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps..."
            className="w-full py-2 pl-10 pr-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Categories */}
      <div className="px-4 overflow-x-auto">
        <div className="flex gap-2 pb-4 whitespace-nowrap">
          {['all', 'beginner', 'intermediate', 'advanced'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 dark:bg-blue-700 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Apps Stats */}
      <div className="px-4 mb-3">
        <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>{filteredApps.length} apps</span>
          <span>{apps.length} total</span>
        </div>
      </div>
      
      {/* Apps Grid - Reduced bottom padding */}
      <div className="p-4 space-y-3 pb-20">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <MobileCard
              key={app.id}
              title={app.title}
              description={app.description}
              icon={app.icon}
              rightContent={
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(app.difficulty)}`}>
                  {app.difficulty}
                </span>
              }
              onClick={() => navigate(`/apps/${app.id}`)}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center border border-neutral-200 dark:border-neutral-700">
            <Search size={32} className="mx-auto mb-3 text-neutral-400 dark:text-neutral-500" />
            <h3 className="font-medium text-neutral-900 dark:text-white mb-2">No apps found</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              Try adjusting your search criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-blue-600 dark:text-blue-400 font-medium text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};