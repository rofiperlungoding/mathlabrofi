import React, { useState, useEffect } from 'react';
import { Exercise } from '../types';
import { MathFormula } from './MathFormula';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { validateMathAnswer, validateMathAnswerInContext } from '../utils/mathValidator';

interface ExerciseCardProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
  context?: 'algebra' | 'calculus' | 'geometry' | 'trigonometry';
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  onComplete, 
  context = 'algebra' 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  // Reset component state when exercise changes
  useEffect(() => {
    setSelectedAnswer('');
    setShowResult(false);
    setShowHint(false);
    setHasSubmitted(false);
  }, [exercise.id]); // Reset when exercise ID changes
  
  const handleSubmit = () => {
    if (!selectedAnswer.trim()) return;
    
    // Use advanced mathematical validation instead of simple string comparison
    const isCorrect = exercise.type === 'multiple-choice' 
      ? selectedAnswer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim()
      : validateMathAnswerInContext(String(exercise.correctAnswer), selectedAnswer.trim(), context);
    
    setShowResult(true);
    setHasSubmitted(true);
    onComplete(isCorrect);
  };

  // Use the same validation logic for determining if answer is correct for display
  const isCorrect = hasSubmitted && (
    exercise.type === 'multiple-choice' 
      ? selectedAnswer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim()
      : validateMathAnswerInContext(String(exercise.correctAnswer), selectedAnswer.trim(), context)
  );

  return (
    <div className="card p-6 mb-6">
      <div className="mb-4">
        <h4 className="text-lg font-medium text-primary mb-3">
          {exercise.question}
        </h4>
        {exercise.latex && (
          <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-lg mb-4">
            <MathFormula latex={exercise.latex} displayMode />
          </div>
        )}
      </div>

      <div className="mb-4">
        {exercise.type === 'multiple-choice' && exercise.options ? (
          <div className="space-y-2">
            {exercise.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-200 dark:border-neutral-700"
              >
                <input
                  type="radio"
                  name={`exercise-${exercise.id}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="mr-3 text-accent focus-ring"
                  disabled={hasSubmitted}
                />
                <span className="text-secondary">{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus-ring dark:bg-neutral-800 dark:text-white"
              disabled={hasSubmitted}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && selectedAnswer.trim() && !hasSubmitted) {
                  handleSubmit();
                }
              }}
            />
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              <strong>Tip:</strong> You can use different but mathematically equivalent forms. 
              For example: "2x + 3\" and \"3 + 2x\" are both accepted.
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer.trim() || hasSubmitted}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
        
        {exercise.hint && !hasSubmitted && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="btn btn-secondary flex items-center gap-2"
            aria-label="Show hint"
          >
            <Lightbulb size={16} />
            Hint
          </button>
        )}
      </div>

      {showHint && exercise.hint && !hasSubmitted && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-700 p-4 rounded-r-lg mb-4">
          <p className="text-yellow-800 dark:text-yellow-300">💡 {exercise.hint}</p>
        </div>
      )}

      {showResult && hasSubmitted && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
          isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          {isCorrect ? (
            <CheckCircle className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" size={20} />
          ) : (
            <XCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" size={20} />
          )}
          <div>
            <p className={`font-medium ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
            {!isCorrect && (
              <p className="text-sm mt-1 text-red-700 dark:text-red-300">
                The correct answer is: <strong>{exercise.correctAnswer}</strong>
              </p>
            )}
            <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {exercise.explanation}
            </p>
            {isCorrect && exercise.type !== 'multiple-choice' && selectedAnswer !== String(exercise.correctAnswer) && (
              <p className="text-sm mt-2 text-green-600 dark:text-green-300">
                ✨ Great! Your answer "{selectedAnswer}" is mathematically equivalent to "{exercise.correctAnswer}".
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};