import React, { useState, useEffect } from 'react';
import { ExerciseCard } from './ExerciseCard';
import { useProgress } from '../hooks/useProgress';
import { ProblemCategory, Exercise } from '../types';
import { Target, Trophy, Clock, CheckCircle, Filter, X, Sparkles, Zap, ArrowRight, Lightbulb } from 'lucide-react';

export const PracticeExercises: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory>('algebra');
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const { progress } = useProgress();

  const categories = [
    { id: 'algebra', name: 'Algebra', color: 'bg-blue-500 dark:bg-blue-600', icon: '🔢' },
    { id: 'geometry', name: 'Geometry', color: 'bg-green-500 dark:bg-green-600', icon: '📐' },
    { id: 'calculus', name: 'Calculus', color: 'bg-purple-500 dark:bg-purple-600', icon: '∫' },
    { id: 'trigonometry', name: 'Trigonometry', color: 'bg-red-500 dark:bg-red-600', icon: '📊' },
    { id: 'statistics', name: 'Statistics', color: 'bg-yellow-500 dark:bg-yellow-600', icon: '📈' }
  ];

  // Sample exercises for each category
  const exerciseDatabase: Record<ProblemCategory, Exercise[]> = {
    algebra: [
      {
        id: 'alg-1',
        question: 'Solve for x: 3x + 7 = 22',
        type: 'input',
        correctAnswer: '5',
        explanation: 'Subtract 7 from both sides: 3x = 15, then divide by 3: x = 5',
        hint: 'Remember to isolate the variable by doing the same operation to both sides',
        latex: '3x + 7 = 22'
      },
      {
        id: 'alg-2',
        question: 'Factor the expression: x² - 5x + 6',
        type: 'input',
        correctAnswer: '(x-2)(x-3)',
        explanation: 'Look for two numbers that multiply to 6 and add to -5: -2 and -3',
        hint: 'Find two numbers that multiply to give the constant term and add to give the coefficient of x',
        latex: 'x^2 - 5x + 6'
      },
      {
        id: 'alg-3',
        question: 'What is the slope of the line passing through (2,3) and (6,7)?',
        type: 'input',
        correctAnswer: '1',
        explanation: 'Using slope formula: m = (y₂-y₁)/(x₂-x₁) = (7-3)/(6-2) = 4/4 = 1',
        hint: 'Use the slope formula: (y₂-y₁)/(x₂-x₁)',
        latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}'
      }
    ],
    geometry: [
      {
        id: 'geo-1',
        question: 'Find the area of a circle with radius 4 units',
        type: 'input',
        correctAnswer: '16π',
        explanation: 'Using A = πr²: A = π(4)² = 16π square units',
        hint: 'Remember the area formula for a circle is A = πr²',
        latex: 'A = \\pi r^2'
      },
      {
        id: 'geo-2',
        question: 'In a right triangle, if one leg is 6 and the hypotenuse is 10, what is the other leg?',
        type: 'input',
        correctAnswer: '8',
        explanation: 'Using Pythagorean theorem: a² + b² = c², so 6² + b² = 10², b² = 100 - 36 = 64, b = 8',
        hint: 'Use the Pythagorean theorem: a² + b² = c²',
        latex: 'a^2 + b^2 = c^2'
      }
    ],
    calculus: [
      {
        id: 'calc-1',
        question: 'Find the derivative of f(x) = 3x² + 2x - 1',
        type: 'input',
        correctAnswer: '6x + 2',
        explanation: 'Using power rule: d/dx(3x²) = 6x, d/dx(2x) = 2, d/dx(-1) = 0',
        hint: 'Apply the power rule: d/dx(xⁿ) = nxⁿ⁻¹',
        latex: 'f(x) = 3x^2 + 2x - 1'
      }
    ],
    trigonometry: [
      {
        id: 'trig-1',
        question: 'What is sin(30°)?',
        type: 'multiple-choice',
        options: ['1/2', '√2/2', '√3/2', '1'],
        correctAnswer: '1/2',
        explanation: 'sin(30°) = 1/2 is a fundamental trigonometric value',
        hint: 'Remember the special angles: 30°, 45°, 60°'
      }
    ],
    statistics: [
      {
        id: 'stat-1',
        question: 'Find the mean of: 4, 7, 9, 12, 18',
        type: 'input',
        correctAnswer: '10',
        explanation: 'Mean = (4 + 7 + 9 + 12 + 18) ÷ 5 = 50 ÷ 5 = 10',
        hint: 'Add all values and divide by the number of values'
      }
    ],
    'linear-algebra': [],
    'number-theory': [],
    'discrete-math': []
  };

  useEffect(() => {
    if (!sessionStartTime) {
      setSessionStartTime(new Date());
    }
  }, []);

  const generateRandomExercise = (): Exercise | null => {
    const exercises = exerciseDatabase[selectedCategory];
    if (exercises.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * exercises.length);
    return exercises[randomIndex];
  };

  const startNewExercise = () => {
    const exercise = generateRandomExercise();
    setCurrentExercise(exercise);
  };

  const handleExerciseComplete = (correct: boolean) => {
    setExercisesCompleted(prev => prev + 1);
    if (correct) {
      setSessionScore(prev => prev + 100);
    }
    
    // Auto-generate next exercise after a brief delay
    setTimeout(() => {
      startNewExercise();
    }, 2000);
  };

  const getSessionDuration = (): string => {
    if (!sessionStartTime) return '0m';
    const now = new Date();
    const diffMs = now.getTime() - sessionStartTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins < 60 ? `${diffMins}m` : `${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;
  };

  const getAccuracy = (): number => {
    if (exercisesCompleted === 0) return 0;
    return Math.round((sessionScore / (exercisesCompleted * 100)) * 100);
  };

  return (
    <div className="container-main section-padding">
      <div className="space-component">
        {/* Main Title */}
        <div className="text-center space-element mb-8">
          <h2 className="text-display mb-4 flex items-center justify-center gap-3">
            <Target className="text-accent dark:text-blue-400" />
            Practice Exercises
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Strengthen your mathematical skills with targeted practice problems
          </p>
        </div>

        {/* Session Stats */}
        <div className="px-4 mb-16">
          <div className="grid-stats">
            <div className="card card-elevated p-6">
              <div className="text-caption uppercase tracking-wide mb-4">Points</div>
              <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{sessionScore}</div>
              <div className="text-caption">points earned</div>
            </div>
            
            <div className="card card-elevated p-6">
              <div className="text-caption uppercase tracking-wide mb-4">Completed</div>
              <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{exercisesCompleted}</div>
              <div className="text-caption">exercises done</div>
            </div>
            
            <div className="card card-elevated p-6">
              <div className="text-caption uppercase tracking-wide mb-4">Accuracy</div>
              <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{getAccuracy()}%</div>
              <div className="text-caption">success rate</div>
            </div>
            
            <div className="card card-elevated p-6">
              <div className="text-caption uppercase tracking-wide mb-4">Duration</div>
              <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{getSessionDuration()}</div>
              <div className="text-caption">time active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Category Selection */}
      <div className="card p-6 mb-16">
        {/* Minimalist Category Header */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">Choose Practice Category</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Select a mathematical domain to focus your practice session</p>
        </div>

        {/* Compact Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as ProblemCategory)}
              className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-lg transform scale-105`
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:scale-102'
              }`}
            >
              <span className="text-base">{category.icon}</span>
              <span>{category.name}</span>
              <span className="text-xs opacity-75">
                ({exerciseDatabase[category.id as ProblemCategory].length})
              </span>
            </button>
          ))}
        </div>

        {/* Active Category Indicator */}
        {selectedCategory && (
          <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Selected:</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
              <Sparkles size={10} />
              {categories.find(c => c.id === selectedCategory)?.name}
              <button
                onClick={() => setSelectedCategory('algebra')}
                className="hover:text-purple-900 dark:hover:text-purple-100 ml-1"
              >
                <X size={10} />
              </button>
            </span>
            
            <div className="text-xs text-neutral-400 dark:text-neutral-500">
              • {exerciseDatabase[selectedCategory].length} problems available
            </div>
          </div>
        )}
      </div>

      {/* Exercise Area */}
      <div className="mb-6">
        {!currentExercise ? (
          <div className="card p-8 text-center">
            <Target size={48} className="text-neutral-400 dark:text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">Ready to Practice?</h3>
            <p className="text-secondary mb-6">
              Click the button below to start practicing {selectedCategory} problems
            </p>
            <button
              onClick={startNewExercise}
              className="btn btn-primary flex items-center gap-2 mx-auto"
            >
              <Target size={16} />
              Start Practice Session
            </button>
          </div>
        ) : (
          <ExerciseCard
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
            context={selectedCategory as any}
          />
        )}
      </div>

      {/* Quick Actions */}
      {currentExercise && (
        <div className="flex justify-center gap-4">
          <button
            onClick={startNewExercise}
            className="btn btn-secondary"
          >
            Skip Problem
          </button>
          <button
            onClick={() => setCurrentExercise(null)}
            className="btn btn-secondary"
          >
            End Session
          </button>
        </div>
      )}

      {/* Tips */}
      <div className="card p-6 mt-8">
        <h3 className="text-lg font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-yellow-500" size={20} />
          Practice Tips
        </h3>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 text-sm text-secondary">
          <div className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-medium text-primary dark:text-white mb-2 flex items-center gap-2">
              <Zap size={16} className="text-blue-500" />
              Effective Practice
            </h4>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>• Focus on understanding, not just answers</li>
              <li>• Review your mistakes carefully</li>
              <li>• Practice regularly for best results</li>
            </ul>
          </div>
          <div className="bg-green-50/50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
            <h4 className="font-medium text-primary dark:text-white mb-2 flex items-center gap-2">
              <Trophy size={16} className="text-green-500" />
              Scoring System
            </h4>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>• Correct answer: 100 points</li>
              <li>• Use hints: -10 points</li>
              <li>• Wrong answer: 0 points</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Practice Recommendations */}
      <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary dark:text-white">Recommended Practice</h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
            See all
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(exerciseDatabase).slice(0, 3).map(([category, exercises]) => {
            if (exercises.length === 0) return null;
            
            const categoryInfo = categories.find(c => c.id === category);
            return (
              <div key={category} className="card p-4 hover:shadow-md dark:hover:shadow-black/20 transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${categoryInfo?.color || 'bg-neutral-500'} text-white text-xl`}>
                    {categoryInfo?.icon || '#'}
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white">{categoryInfo?.name || category}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{exercises.length} exercises</p>
                  </div>
                </div>
                
                <div className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2 mb-3">
                  {exercises[0].question}
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedCategory(category as ProblemCategory);
                    startNewExercise();
                  }}
                  className="w-full text-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-2 border-t border-neutral-100 dark:border-neutral-700"
                >
                  Practice Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};