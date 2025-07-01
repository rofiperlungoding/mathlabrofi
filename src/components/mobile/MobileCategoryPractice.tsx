import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from './MobileLayout';
import { MobileStats } from './MobileStats';
import { MobileProblemView } from './MobileProblemView';
import { usePracticeState } from '../../context/PracticeStateContext';
import { ActionButton } from './ActionButton';
import { Exercise, ProblemCategory } from '../../types';
import { Target, Trophy, CheckCircle, RefreshCw, Settings } from 'lucide-react';
import { categoryData } from '../../data/practiceCategories';
import { getExercisesForCategory } from '../../data/exercises';

export const MobileCategoryPractice: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const {
    startSession,
    completeExercise,
    setCurrentExercise,
    currentExercise,
    sessionScore,
    exercisesCompleted,
    isSessionActive
  } = usePracticeState();
  
  const [showSettings, setShowSettings] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  
  // Get category data
  const categoryInfo = categoryData.find(c => c.id === category);
  
  // Start session if not active
  useEffect(() => {
    if (!category) {
      navigate('/practice');
      return;
    }
    
    // If no active session
    if (!isSessionActive) {
      startSession(category as ProblemCategory);
    }
    
    // Get initial exercise if none exists
    if (!currentExercise) {
      generateNewExercise();
    }
  }, [category, isSessionActive]);
  
  // Generate a new exercise
  const generateNewExercise = () => {
    if (!category) return;
    
    const exercises = getExercisesForCategory(category as ProblemCategory);
    if (exercises.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * exercises.length);
    setCurrentExercise(exercises[randomIndex]);
  };
  
  // Handle exercise completion
  const handleExerciseComplete = (correct: boolean) => {
    completeExercise(correct);
    setCurrentStreak(prev => correct ? prev + 1 : 0);
    
    // Generate a new exercise after a delay
    setTimeout(() => {
      generateNewExercise();
    }, 1500);
  };

  if (!category || !categoryInfo) {
    return null;
  }
  
  // If no exercise is available
  if (!currentExercise) {
    return (
      <MobileLayout>
        <div className="p-4 h-full flex flex-col items-center justify-center">
          <Target size={48} className="text-neutral-300 dark:text-neutral-600 mb-4" />
          <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">
            Loading Problems...
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6">
            We're preparing your practice session
          </p>
          <ActionButton
            label="Go Back to Practice"
            color="secondary"
            onClick={() => navigate('/practice')}
          />
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileProblemView
      exercise={currentExercise}
      onComplete={handleExerciseComplete}
      onSkip={generateNewExercise}
    />
  );
};