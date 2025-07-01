import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExerciseCard } from '../ExerciseCard';
import { usePracticeState } from '../../context/PracticeStateContext';
import { Exercise, ProblemCategory } from '../../types';
import { Target, Trophy, RefreshCw, ArrowLeft, Settings, ChevronUp, ChevronDown, CheckCircle, Clock } from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { categoryData } from '../../data/practiceCategories';
import { getExercisesForCategory } from '../../data/exercises';

export const CategoryPracticePage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const {
    startSession,
    completeExercise,
    setCurrentExercise,
    currentExercise,
    sessionScore,
    exercisesCompleted,
    isSessionActive,
    currentCategory,
    sessionStartTime
  } = usePracticeState();
  
  const [showSettings, setShowSettings] = useState(false);
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Get category data
  const categoryInfo = categoryData.find(c => c.id === category);
  
  // Start session if not active or if category changed
  useEffect(() => {
    if (!category) {
      navigate('/practice');
      return;
    }
    
    // Validate category
    if (!categoryData.find(c => c.id === category)) {
      navigate('/practice');
      return;
    }
    
    // If no active session or different category
    if (!isSessionActive || currentCategory !== category) {
      startSession(category as ProblemCategory);
    }
  }, [category, isSessionActive, currentCategory, startSession, navigate]);
  
  // Start a new exercise if none is active
  useEffect(() => {
    if (isSessionActive && !currentExercise) {
      generateNewExercise();
    }
  }, [isSessionActive, currentExercise]);
  
  // Generate a new exercise
  const generateNewExercise = () => {
    if (!category) return;
    
    const exercises = getExercisesForCategory(category as ProblemCategory);
    
    // Filter by difficulty if needed
    const filteredExercises = difficulty === 'all' 
      ? exercises 
      : exercises.filter(ex => ex.difficulty === difficulty);
    
    if (filteredExercises.length === 0) {
      // If no exercises match the filter, use all exercises
      const randomIndex = Math.floor(Math.random() * exercises.length);
      setCurrentExercise(exercises[randomIndex]);
    } else {
      const randomIndex = Math.floor(Math.random() * filteredExercises.length);
      setCurrentExercise(filteredExercises[randomIndex]);
    }
  };
  
  // Handle exercise completion
  const handleExerciseComplete = (correct: boolean) => {
    completeExercise(correct);
    setCurrentStreak(prev => correct ? prev + 1 : 0);
    
    // Check for streak milestone
    if (correct && currentStreak + 1 >= 5) {
      setShowCompletionModal(true);
    }
    
    // Generate a new exercise after a delay
    setTimeout(() => {
      generateNewExercise();
    }, 1500);
  };
  
  // Format session time
  const getSessionDuration = (): string => {
    if (!sessionStartTime) return '0m';
    const now = new Date();
    const diffMs = now.getTime() - sessionStartTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins < 60 ? `${diffMins}m` : `${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;
  };
  
  // Calculate accuracy
  const getAccuracy = (): number => {
    if (exercisesCompleted === 0) return 0;
    return Math.round((sessionScore / (exercisesCompleted * 100)) * 100);
  };

  if (!category || !categoryInfo) {
    return null;
  }

  return (
    <div className="container-main section-padding">
      {/* Page title with breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Practice', path: '/practice' },
          { label: categoryInfo.name, path: `/practice/${category}`, active: true }
        ]}
        className="mb-8"
      />

      {/* Category Header */}
      <div className="mb-8 flex flex-col md:flex-row gap-6 items-center">
        <div className={`w-20 h-20 flex-shrink-0 rounded-2xl text-white text-3xl flex items-center justify-center ${categoryInfo.color}`}>
          {categoryInfo.icon}
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-2 text-center md:text-left">
            {categoryInfo.name} Practice
          </h1>
          <p className="text-secondary dark:text-neutral-300 max-w-2xl text-center md:text-left">
            {categoryInfo.description}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/practice')}
            className="btn btn-secondary flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Settings size={16} />
            <span className="sr-only md:not-sr-only">Options</span>
            {showSettings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="card p-6 mb-6 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1 space-y-4">
              <h3 className="font-medium text-primary dark:text-white">Practice Settings</h3>
              
              <div>
                <label className="block text-sm text-secondary dark:text-neutral-400 mb-2">Difficulty</label>
                <div className="flex gap-2">
                  {(['all', 'easy', 'medium', 'hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        difficulty === level 
                          ? 'bg-accent text-white dark:bg-blue-600' 
                          : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-3 w-full md:w-auto">
              <button
                onClick={generateNewExercise}
                className="btn btn-primary w-full md:w-auto flex items-center gap-2"
              >
                <RefreshCw size={16} />
                New Problem
              </button>
              
              <button
                onClick={() => navigate('/practice')}
                className="btn btn-secondary w-full md:w-auto"
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Bar - Compact */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Trophy size={16} className="text-blue-500 dark:text-blue-400" />
          <div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Score</div>
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{sessionScore}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Target size={16} className="text-green-500 dark:text-green-400" />
          <div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">Completed</div>
            <div className="text-lg font-bold text-green-700 dark:text-green-300">{exercisesCompleted}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <CheckCircle size={16} className="text-purple-500 dark:text-purple-400" />
          <div>
            <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">Accuracy</div>
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{getAccuracy()}%</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <Clock size={16} className="text-orange-500 dark:text-orange-400" />
          <div>
            <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">Duration</div>
            <div className="text-lg font-bold text-orange-700 dark:text-orange-300">{getSessionDuration()}</div>
          </div>
        </div>
        
        {currentStreak > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <Target size={16} className="text-red-500 dark:text-red-400" />
            <div>
              <div className="text-xs text-red-600 dark:text-red-400 font-medium">Streak</div>
              <div className="text-lg font-bold text-red-700 dark:text-red-300">
                {currentStreak} 🔥
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Exercise */}
      <div className="mb-8 max-w-4xl mx-auto">
        {currentExercise ? (
          <ExerciseCard 
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
            context={category as any}
          />
        ) : (
          <div className="card p-8 text-center">
            <Target size={48} className="text-neutral-400 dark:text-neutral-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary dark:text-white mb-2">Loading problem...</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Preparing your next {categoryInfo.name.toLowerCase()} problem
            </p>
          </div>
        )}
      </div>

      {/* Exercise Controls */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={generateNewExercise}
          className="btn btn-secondary flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Skip Problem
        </button>
        
        <button
          onClick={() => navigate('/practice')}
          className="btn btn-secondary flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          End Session
        </button>
      </div>

      {/* Streak Achievement Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl max-w-md w-full p-8 text-center animate-slide-up">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy size={32} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">
              Achievement Unlocked!
            </h3>
            <div className="text-neutral-700 dark:text-neutral-300 mb-6">
              <p className="mb-2">You've reached a streak of {currentStreak} correct answers!</p>
              <p>Keep up the great work to master {categoryInfo.name.toLowerCase()} concepts.</p>
              
              <div className="mt-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg inline-block">
                <span className="text-green-700 dark:text-green-300 text-sm font-medium">+50 bonus points!</span>
              </div>
            </div>
            <button
              onClick={() => setShowCompletionModal(false)}
              className="btn btn-primary"
            >
              Continue Practice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};