import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from './MobileLayout';
import { ActionButton } from './ActionButton';
import { mathTopics } from '../../data/mathTopics';
import { useProgress } from '../../hooks/useProgress';
import { MathFormula } from '../MathFormula';
import { LessonContent as LessonContentType } from '../../types';
import {
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export const MobileLessonView: React.FC = () => {
  const { topicId, lessonId } = useParams<{ topicId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { completeLesson } = useProgress();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([]);
  
  // Find topic and lesson
  const topic = mathTopics.find(t => t.id === topicId);
  const lesson = topic?.lessons.find(l => l.id === lessonId);
  
  if (!topic || !lesson) {
    return (
      <MobileLayout>
        <div className="p-4 flex flex-col items-center justify-center h-full">
          <AlertTriangle size={48} className="text-yellow-500 mb-4" />
          <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">
            Lesson Not Found
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-center mb-6">
            The lesson you're looking for doesn't exist or has been moved.
          </p>
          <ActionButton
            label="Back to Topics"
            color="secondary"
            onClick={() => navigate('/topics')}
          />
        </div>
      </MobileLayout>
    );
  }
  
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
      window.scrollTo(0, 0); // Scroll to top for new content
    } else {
      // Lesson complete
      const correctCount = exerciseResults.filter(result => result).length;
      const score = Math.round((correctCount / lesson.exercises.length) * 100);
      completeLesson(lesson.id, score);
      navigate(`/topics/${topicId}`);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const canProceed = () => {
    if (currentStep < lesson.content.length) return true;
    
    const exerciseIndex = currentStep - lesson.content.length;
    return exerciseResults[exerciseIndex] !== undefined;
  };
  
  // Get current content or exercise
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
  
  // Render content based on type
  const renderContent = (content: LessonContentType) => {
    switch (content.type) {
      case 'text':
        return (
          <p className="text-neutral-700 dark:text-neutral-300">
            {content.content}
          </p>
        );
        
      case 'formula':
        return (
          <div>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">{content.content}</p>
            {content.latex && (
              <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-lg overflow-x-auto border dark:border-neutral-700">
                <MathFormula latex={content.latex} displayMode />
              </div>
            )}
          </div>
        );
        
      case 'example':
        return (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-700 p-4 rounded-r-lg">
            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Example</h3>
            <p className="text-blue-700 dark:text-blue-300 mb-2">{content.content}</p>
            {content.latex && (
              <MathFormula latex={content.latex} displayMode />
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Handle exercise submission
  const handleExerciseSubmit = (answer: string) => {
    const exercise = getCurrentExercise();
    if (!exercise) return;
    
    const isCorrect = answer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim();
    handleExerciseComplete(isCorrect);
  };
  
  return (
    <MobileLayout hideNav title={lesson.title}>
      {/* Progress Bar */}
      <div className="bg-neutral-100 dark:bg-neutral-800 h-1 sticky top-0 z-20">
        <div 
          className="h-full bg-blue-500 dark:bg-blue-600"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Step Indicator */}
      <div className="p-4 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span>~{lesson.estimatedTime} min</span>
      </div>
      
      {/* Content Area */}
      <div className="p-4 pb-20">
        {getCurrentContent() && (
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
            {renderContent(getCurrentContent()!)}
          </div>
        )}
        
        {getCurrentExercise() && (
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
            <h3 className="font-medium text-neutral-900 dark:text-white mb-3">
              Practice Exercise
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {getCurrentExercise()!.question}
            </p>
            
            {getCurrentExercise()!.latex && (
              <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-lg overflow-x-auto mb-4 border dark:border-neutral-700">
                <MathFormula latex={getCurrentExercise()!.latex!} displayMode />
              </div>
            )}
            
            {getCurrentExercise()!.type === 'multiple-choice' && getCurrentExercise()!.options ? (
              <div className="space-y-2 mb-4">
                {getCurrentExercise()!.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleExerciseSubmit(option)}
                    className="w-full text-left p-3 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-750 dark:border-neutral-700 dark:text-neutral-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  className="w-full p-3 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleExerciseSubmit(e.currentTarget.value);
                    }
                  }}
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Press Enter to submit your answer
                </p>
              </div>
            )}
            
            {exerciseResults[currentStep - lesson.content.length] !== undefined && (
              <div className={`p-3 rounded-lg ${
                exerciseResults[currentStep - lesson.content.length]
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
              }`}>
                <div className="flex items-start gap-2">
                  {exerciseResults[currentStep - lesson.content.length] ? (
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">
                      {exerciseResults[currentStep - lesson.content.length] ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-sm mt-1">
                      {getCurrentExercise()!.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-3">
          <ActionButton
            label=""
            icon={<ChevronLeft size={18} />}
            color="secondary"
            className="w-12"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          />
          
          <ActionButton
            label={currentStep === totalSteps - 1 ? "Complete" : "Next"}
            icon={currentStep === totalSteps - 1 ? <CheckCircle size={18} /> : <ChevronRight size={18} />}
            color="primary"
            className="flex-1"
            onClick={handleNext}
            disabled={!canProceed()}
          />
        </div>
      </div>
    </MobileLayout>
  );
};