import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Exercise, ProblemCategory } from '../types';

interface PracticeState {
  sessionScore: number;
  exercisesCompleted: number;
  sessionStartTime: Date | null;
  currentCategory: ProblemCategory | null;
  currentExercise: Exercise | null;
  currentStreak: number;
  lastCompletionTime: Date | null;
}

interface PracticeStateContextType extends PracticeState {
  startSession: (category: ProblemCategory) => void;
  completeExercise: (correct: boolean, points: number) => void;
  setCurrentExercise: (exercise: Exercise | null) => void;
  endSession: () => void;
  isSessionActive: boolean;
}

const PracticeStateContext = createContext<PracticeStateContextType | undefined>(undefined);

// Initial state
const initialState: PracticeState = {
  sessionScore: 0,
  exercisesCompleted: 0,
  sessionStartTime: null,
  currentCategory: null,
  currentExercise: null,
  currentStreak: 0,
  lastCompletionTime: null
};

export const PracticeStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PracticeState>(() => {
    // Load session from localStorage if exists
    const savedState = localStorage.getItem('practice-session-state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Convert string dates back to Date objects
      if (parsedState.sessionStartTime) {
        parsedState.sessionStartTime = new Date(parsedState.sessionStartTime);
      }
      if (parsedState.lastCompletionTime) {
        parsedState.lastCompletionTime = new Date(parsedState.lastCompletionTime);
      }
      return parsedState;
    }
    return initialState;
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('practice-session-state', JSON.stringify(state));
  }, [state]);

  // Check if the session is active (started less than 2 hours ago)
  const isSessionActive = !!state.sessionStartTime && 
    (new Date().getTime() - state.sessionStartTime.getTime() < 2 * 60 * 60 * 1000);

  // Start a new practice session for a category
  const startSession = (category: ProblemCategory) => {
    setState({
      ...initialState,
      currentCategory: category,
      sessionStartTime: new Date(),
    });
    
    // Navigate to the category page if not already there
    if (!location.pathname.includes(category)) {
      navigate(`/practice/${category}`);
    }
  };

  // Mark an exercise as completed
  const completeExercise = (correct: boolean, points: number = 100) => {
    setState(prev => {
      const now = new Date();
      // Check if this completion should continue a streak
      // (if last completion was yesterday or today)
      const lastDate = prev.lastCompletionTime ? new Date(prev.lastCompletionTime) : null;
      let newStreak = prev.currentStreak;
      
      if (lastDate) {
        const today = new Date().setHours(0, 0, 0, 0);
        const lastDay = new Date(lastDate).setHours(0, 0, 0, 0);
        const yesterday = today - 86400000; // 24 hours in ms
        
        if (lastDay === today) {
          // Already completed today, streak stays the same
          newStreak = prev.currentStreak;
        } else if (lastDay === yesterday) {
          // Completed yesterday, streak increases
          newStreak = prev.currentStreak + 1;
        } else {
          // More than a day gap, reset streak
          newStreak = 1;
        }
      } else {
        // First ever completion
        newStreak = 1;
      }
      
      return {
        ...prev,
        sessionScore: prev.sessionScore + (correct ? points : 0),
        exercisesCompleted: prev.exercisesCompleted + 1,
        lastCompletionTime: now,
        currentStreak: newStreak
      };
    });
  };

  // Set the current exercise
  const setCurrentExercise = (exercise: Exercise | null) => {
    setState(prev => ({
      ...prev,
      currentExercise: exercise
    }));
  };

  // End the session and reset state
  const endSession = () => {
    setState({
      ...initialState
    });
    navigate('/practice');
  };

  return (
    <PracticeStateContext.Provider value={{
      ...state,
      startSession,
      completeExercise,
      setCurrentExercise,
      endSession,
      isSessionActive
    }}>
      {children}
    </PracticeStateContext.Provider>
  );
};

// Custom hook to use the practice state
export const usePracticeState = () => {
  const context = useContext(PracticeStateContext);
  if (context === undefined) {
    throw new Error('usePracticeState must be used within a PracticeStateProvider');
  }
  return context;
};