import React, { useState } from 'react';
import { MobileLayout } from './MobileLayout';
import { ActionButton } from './ActionButton';
import { MathFormula } from '../MathFormula';
import { Exercise } from '../../types';
import { CheckCircle, XCircle, Lightbulb, RefreshCw, ArrowRight } from 'lucide-react';

interface MobileProblemViewProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
  onSkip: () => void;
}

export const MobileProblemView: React.FC<MobileProblemViewProps> = ({
  exercise,
  onComplete,
  onSkip
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const handleSubmit = () => {
    if (!selectedAnswer.trim()) return;
    
    // Simple comparison for demo purposes
    const isCorrect = selectedAnswer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim();
    
    setShowResult(true);
    onComplete(isCorrect);
  };

  return (
    <MobileLayout hideNav title={`${exercise.category || ''} Problem`}>
      <div className="p-4 space-y-4">
        {/* Question */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
          <h2 className="font-medium text-neutral-900 dark:text-white mb-3">
            {exercise.question}
          </h2>
          
          {exercise.latex && (
            <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-lg overflow-x-auto">
              <MathFormula latex={exercise.latex} displayMode />
            </div>
          )}
        </div>
        
        {/* Answer Input */}
        {!showResult && (
          <>
            {exercise.type === 'multiple-choice' && exercise.options ? (
              <div className="space-y-2">
                {exercise.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(option)}
                    className={`w-full text-left p-4 rounded-lg border ${
                      selectedAnswer === option
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                        : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedAnswer === option
                          ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                          : 'border-neutral-300 dark:border-neutral-600'
                      }`}>
                        {selectedAnswer === option && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Mathematically equivalent forms are accepted
                </p>
              </div>
            )}
          </>
        )}
        
        {/* Hint */}
        {!showResult && exercise.hint && (
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400"
            >
              <Lightbulb size={16} />
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
            
            {showHint && (
              <div className="mt-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                  {exercise.hint}
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Result */}
        {showResult && (
          <div className={`p-4 rounded-lg ${
            selectedAnswer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim()
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-start gap-3">
              {selectedAnswer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim() ? (
                <CheckCircle className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" size={20} />
              ) : (
                <XCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" size={20} />
              )}
              
              <div>
                <p className={`font-medium ${
                  selectedAnswer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim()
                    ? 'text-green-800 dark:text-green-300'
                    : 'text-red-800 dark:text-red-300'
                }`}>
                  {selectedAnswer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim() ? 'Correct!' : 'Incorrect'}
                </p>
                
                {selectedAnswer.toLowerCase().trim() !== String(exercise.correctAnswer).toLowerCase().trim() && (
                  <p className="text-sm mt-1 text-red-700 dark:text-red-300">
                    The correct answer is: <strong>{exercise.correctAnswer}</strong>
                  </p>
                )}
                
                <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">
                  {exercise.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
          <div className="grid grid-cols-2 gap-3">
            {!showResult ? (
              <>
                <ActionButton
                  label="Skip"
                  color="secondary"
                  onClick={onSkip}
                />
                <ActionButton
                  label="Submit"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!selectedAnswer.trim()}
                  icon={<ArrowRight size={18} />}
                />
              </>
            ) : (
              <>
                <ActionButton
                  label="View Solution"
                  color="secondary"
                />
                <ActionButton
                  label="Next Problem"
                  color="primary"
                  onClick={onSkip}
                  icon={<RefreshCw size={18} />}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};