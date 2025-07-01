import React, { useState } from 'react';
import { Lesson } from '../types';
import { LessonContent } from './LessonContent';
import { ExerciseCard } from './ExerciseCard';
import { useProgress } from '../hooks/useProgress';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([]);
  const { completeLesson } = useProgress();
  
  const totalSteps = lesson.content.length + lesson.exercises.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  const handleExerciseComplete = (correct: boolean) => {
    const newResults = [...exerciseResults];
    const exerciseIndex = currentStep - lesson.content.length;
    newResults[exerciseIndex] = correct;
    setExerciseResults(newResults);
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate score based on correct exercises
      const correctCount = exerciseResults.filter(result => result).length;
      const score = Math.round((correctCount / lesson.exercises.length) * 100);
      
      completeLesson(lesson.id, score);
      onComplete();
    }
  };
  
  const canProceed = () => {
    if (currentStep < lesson.content.length) {
      return true; // Can always proceed through content
    }
    
    const exerciseIndex = currentStep - lesson.content.length;
    return exerciseResults[exerciseIndex] !== undefined;
  };
  
  const getCurrentContent = () => {
    if (currentStep < lesson.content.length) {
      return lesson.content[currentStep];
    }
    return null;
  };
  
  const getCurrentExercise = () => {
    if (currentStep >= lesson.content.length) {
      const exerciseIndex = currentStep - lesson.content.length;
      return lesson.exercises[exerciseIndex];
    }
    return null;
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-secondary">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Clock size={16} />
            {lesson.estimatedTime} min
          </div>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
          <div 
            className="bg-accent dark:bg-blue-500 h-2 rounded-full transition-all duration-300 ease-smooth"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Lesson Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">{lesson.title}</h2>
        <p className="text-secondary">{lesson.description}</p>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-subtle dark:shadow-none border border-neutral-100 dark:border-neutral-700 p-8 mb-6">
        {getCurrentContent() && (
          <LessonContent content={getCurrentContent()!} />
        )}
        
        {getCurrentExercise() && (
          <ExerciseCard 
            exercise={getCurrentExercise()!} 
            onComplete={handleExerciseComplete}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLastStep ? (
            <>
              <CheckCircle size={16} />
              Complete Lesson
            </>
          ) : (
            <>
              Next
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};