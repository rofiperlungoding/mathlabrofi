import React, { useState } from 'react';
import { Puzzle, Trophy, Lightbulb, RefreshCw } from 'lucide-react';

interface MathPuzzle {
  id: string;
  type: 'arithmetic' | 'algebra' | 'logic' | 'sequence';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string | number;
  hint: string;
  explanation: string;
  points: number;
}

export const MathPuzzleGenerator: React.FC = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState<MathPuzzle | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [puzzleType, setPuzzleType] = useState<'arithmetic' | 'algebra' | 'logic' | 'sequence'>('arithmetic');

  const generateArithmeticPuzzle = (diff: string): MathPuzzle => {
    switch (diff) {
      case 'easy':
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const op = ['+', '-', '×'][Math.floor(Math.random() * 3)];
        let answer: number;
        let question: string;
        
        if (op === '+') {
          answer = a + b;
          question = `${a} + ${b} = ?`;
        } else if (op === '-') {
          answer = Math.max(a, b) - Math.min(a, b);
          question = `${Math.max(a, b)} - ${Math.min(a, b)} = ?`;
        } else {
          answer = a * b;
          question = `${a} × ${b} = ?`;
        }
        
        return {
          id: Date.now().toString(),
          type: 'arithmetic',
          difficulty: 'easy',
          question,
          answer,
          hint: `Try breaking down the calculation step by step.`,
          explanation: `The answer is ${answer}.`,
          points: 10
        };
        
      case 'medium':
        const nums = [Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 50) + 10];
        const result = nums[0] + nums[1] - nums[2];
        return {
          id: Date.now().toString(),
          type: 'arithmetic',
          difficulty: 'medium',
          question: `${nums[0]} + ${nums[1]} - ${nums[2]} = ?`,
          answer: result,
          hint: `Work from left to right: first add, then subtract.`,
          explanation: `${nums[0]} + ${nums[1]} = ${nums[0] + nums[1]}, then ${nums[0] + nums[1]} - ${nums[2]} = ${result}`,
          points: 20
        };
        
      default: // hard
        const base = Math.floor(Math.random() * 10) + 2;
        const exp = Math.floor(Math.random() * 3) + 2;
        const power = Math.pow(base, exp);
        return {
          id: Date.now().toString(),
          type: 'arithmetic',
          difficulty: 'hard',
          question: `${base}^${exp} = ?`,
          answer: power,
          hint: `${base}^${exp} means ${base} multiplied by itself ${exp} times.`,
          explanation: `${base}^${exp} = ${Array(exp).fill(base).join(' × ')} = ${power}`,
          points: 30
        };
    }
  };

  const generateAlgebraPuzzle = (diff: string): MathPuzzle => {
    switch (diff) {
      case 'easy':
        const x = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 20) + 1;
        const result = x + c;
        return {
          id: Date.now().toString(),
          type: 'algebra',
          difficulty: 'easy',
          question: `If x + ${c} = ${result}, what is x?`,
          answer: x,
          hint: `Subtract ${c} from both sides.`,
          explanation: `x + ${c} = ${result}, so x = ${result} - ${c} = ${x}`,
          points: 15
        };
        
      case 'medium':
        const coeff = Math.floor(Math.random() * 5) + 2;
        const val = Math.floor(Math.random() * 10) + 1;
        const prod = coeff * val;
        return {
          id: Date.now().toString(),
          type: 'algebra',
          difficulty: 'medium',
          question: `If ${coeff}x = ${prod}, what is x?`,
          answer: val,
          hint: `Divide both sides by ${coeff}.`,
          explanation: `${coeff}x = ${prod}, so x = ${prod} ÷ ${coeff} = ${val}`,
          points: 25
        };
        
      default: // hard
        const a = Math.floor(Math.random() * 5) + 2;
        const b = Math.floor(Math.random() * 10) + 1;
        const sol = Math.floor(Math.random() * 8) + 1;
        const rhs = a * sol + b;
        return {
          id: Date.now().toString(),
          type: 'algebra',
          difficulty: 'hard',
          question: `If ${a}x + ${b} = ${rhs}, what is x?`,
          answer: sol,
          hint: `First subtract ${b}, then divide by ${a}.`,
          explanation: `${a}x + ${b} = ${rhs}, so ${a}x = ${rhs - b}, so x = ${(rhs - b) / a} = ${sol}`,
          points: 35
        };
    }
  };

  const generateLogicPuzzle = (diff: string): MathPuzzle => {
    const puzzles = {
      easy: [
        {
          question: "I am thinking of a number. When I double it and add 3, I get 11. What is my number?",
          answer: 4,
          hint: "Let the number be x. Then 2x + 3 = 11.",
          explanation: "2x + 3 = 11, so 2x = 8, so x = 4"
        },
        {
          question: "A number plus 7 equals 15. What is the number?",
          answer: 8,
          hint: "What do you add to 7 to get 15?",
          explanation: "x + 7 = 15, so x = 15 - 7 = 8"
        }
      ],
      medium: [
        {
          question: "The sum of two consecutive numbers is 25. What is the smaller number?",
          answer: 12,
          hint: "If the smaller number is x, then the larger is x + 1.",
          explanation: "x + (x + 1) = 25, so 2x + 1 = 25, so 2x = 24, so x = 12"
        }
      ],
      hard: [
        {
          question: "A rectangle's length is 3 more than its width. If the perimeter is 26, what is the width?",
          answer: 5,
          hint: "Perimeter = 2(length + width). If width = w, then length = w + 3.",
          explanation: "2(w + w + 3) = 26, so 2(2w + 3) = 26, so 4w + 6 = 26, so 4w = 20, so w = 5"
        }
      ]
    };
    
    const puzzleSet = puzzles[diff as keyof typeof puzzles];
    const puzzle = puzzleSet[Math.floor(Math.random() * puzzleSet.length)];
    
    return {
      id: Date.now().toString(),
      type: 'logic',
      difficulty: diff as any,
      question: puzzle.question,
      answer: puzzle.answer,
      hint: puzzle.hint,
      explanation: puzzle.explanation,
      points: diff === 'easy' ? 20 : diff === 'medium' ? 30 : 40
    };
  };

  const generateSequencePuzzle = (diff: string): MathPuzzle => {
    switch (diff) {
      case 'easy':
        const start = Math.floor(Math.random() * 10) + 1;
        const step = Math.floor(Math.random() * 5) + 1;
        const sequence = [start, start + step, start + 2*step, start + 3*step];
        const next = start + 4*step;
        return {
          id: Date.now().toString(),
          type: 'sequence',
          difficulty: 'easy',
          question: `What comes next in the sequence: ${sequence.join(', ')}, ?`,
          answer: next,
          hint: `Look at the difference between consecutive numbers.`,
          explanation: `The sequence increases by ${step} each time, so the next number is ${next}.`,
          points: 15
        };
        
      case 'medium':
        const first = Math.floor(Math.random() * 5) + 1;
        const squares = [first*first, (first+1)*(first+1), (first+2)*(first+2), (first+3)*(first+3)];
        const nextSquare = (first+4)*(first+4);
        return {
          id: Date.now().toString(),
          type: 'sequence',
          difficulty: 'medium',
          question: `What comes next: ${squares.join(', ')}, ?`,
          answer: nextSquare,
          hint: `These are perfect squares. What's the pattern?`,
          explanation: `These are squares: ${first}², ${first+1}², ${first+2}², ${first+3}², so next is ${first+4}² = ${nextSquare}.`,
          points: 25
        };
        
      default: // hard
        const fib = [1, 1, 2, 3, 5, 8];
        return {
          id: Date.now().toString(),
          type: 'sequence',
          difficulty: 'hard',
          question: `What comes next: ${fib.slice(0, 5).join(', ')}, ?`,
          answer: 8,
          hint: `Each number is the sum of the two previous numbers.`,
          explanation: `This is the Fibonacci sequence: 1+1=2, 1+2=3, 2+3=5, 3+5=8.`,
          points: 35
        };
    }
  };

  const generatePuzzle = () => {
    let puzzle: MathPuzzle;
    
    switch (puzzleType) {
      case 'arithmetic':
        puzzle = generateArithmeticPuzzle(difficulty);
        break;
      case 'algebra':
        puzzle = generateAlgebraPuzzle(difficulty);
        break;
      case 'logic':
        puzzle = generateLogicPuzzle(difficulty);
        break;
      case 'sequence':
        puzzle = generateSequencePuzzle(difficulty);
        break;
    }
    
    setCurrentPuzzle(puzzle);
    setUserAnswer('');
    setShowHint(false);
    setShowAnswer(false);
  };

  const checkAnswer = () => {
    if (!currentPuzzle) return;
    
    const userNum = parseFloat(userAnswer);
    const correctAnswer = typeof currentPuzzle.answer === 'string' 
      ? parseFloat(currentPuzzle.answer) 
      : currentPuzzle.answer;
    
    if (Math.abs(userNum - correctAnswer) < 0.001) {
      // Correct answer
      let points = currentPuzzle.points;
      if (!showHint) points += 5; // Bonus for not using hint
      
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setShowAnswer(true);
      
      setTimeout(() => {
        generatePuzzle();
      }, 2000);
    } else {
      // Wrong answer
      setStreak(0);
      setShowAnswer(true);
    }
  };

  const useHint = () => {
    setShowHint(true);
  };

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Puzzle size={18} />
              Game Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondary mb-2">Puzzle Type</label>
                <select
                  value={puzzleType}
                  onChange={(e) => setPuzzleType(e.target.value as any)}
                  className="w-full p-2 border rounded"
                >
                  <option value="arithmetic">Arithmetic</option>
                  <option value="algebra">Algebra</option>
                  <option value="logic">Logic Problems</option>
                  <option value="sequence">Sequences</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-secondary mb-2">Difficulty</label>
                <div className="space-y-2">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <label key={level} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={difficulty === level}
                        onChange={(e) => setDifficulty(e.target.value as any)}
                      />
                      <span className="text-sm capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={generatePuzzle}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                New Puzzle
              </button>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
              <Trophy size={16} />
              Score
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Total Score:</span>
                <span className="font-bold text-accent">{score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Streak:</span>
                <span className="font-bold">{streak}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Difficulty:</span>
                <span className="capitalize">{difficulty}</span>
              </div>
            </div>
          </div>

          {currentPuzzle && (
            <div className="card p-4">
              <h4 className="font-medium text-primary mb-3">Help</h4>
              <button
                onClick={useHint}
                disabled={showHint}
                className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lightbulb size={16} />
                {showHint ? 'Hint Used' : 'Get Hint (-5 pts)'}
              </button>
              
              {showHint && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-yellow-800 text-sm">
                    💡 {currentPuzzle.hint}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Puzzle Area */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Math Puzzle Challenge</h3>
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                <span className="text-sm text-secondary">Score: {score}</span>
              </div>
            </div>

            {currentPuzzle ? (
              <div className="space-y-6">
                {/* Puzzle Question */}
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-medium text-primary mb-3">
                    {currentPuzzle.type.charAt(0).toUpperCase() + currentPuzzle.type.slice(1)} Puzzle 
                    <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {currentPuzzle.difficulty}
                    </span>
                  </h4>
                  <div className="text-lg text-secondary">
                    {currentPuzzle.question}
                  </div>
                </div>

                {/* Answer Input */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-medium text-primary mb-3">Your Answer</h4>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Enter your answer..."
                      className="flex-1 p-3 border rounded-lg text-lg"
                      disabled={showAnswer}
                    />
                    <button
                      onClick={checkAnswer}
                      disabled={!userAnswer || showAnswer}
                      className="btn btn-primary px-6 disabled:opacity-50"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                {/* Result */}
                {showAnswer && (
                  <div className={`p-6 rounded-lg border-l-4 ${
                    parseFloat(userAnswer) === (typeof currentPuzzle.answer === 'string' ? parseFloat(currentPuzzle.answer) : currentPuzzle.answer)
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}>
                    <div className={`font-medium mb-2 ${
                      parseFloat(userAnswer) === (typeof currentPuzzle.answer === 'string' ? parseFloat(currentPuzzle.answer) : currentPuzzle.answer)
                        ? 'text-green-800'
                        : 'text-red-800'
                    }`}>
                      {parseFloat(userAnswer) === (typeof currentPuzzle.answer === 'string' ? parseFloat(currentPuzzle.answer) : currentPuzzle.answer)
                        ? '🎉 Correct!'
                        : '❌ Incorrect'
                      }
                    </div>
                    <div className="text-sm text-secondary mb-2">
                      <strong>Correct Answer:</strong> {currentPuzzle.answer}
                    </div>
                    <div className="text-sm text-secondary">
                      <strong>Explanation:</strong> {currentPuzzle.explanation}
                    </div>
                    {parseFloat(userAnswer) === (typeof currentPuzzle.answer === 'string' ? parseFloat(currentPuzzle.answer) : currentPuzzle.answer) && (
                      <div className="text-sm text-green-700 mt-2">
                        +{currentPuzzle.points}{!showHint ? ' +5 bonus' : ''} points!
                      </div>
                    )}
                  </div>
                )}

                {/* Points Info */}
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Scoring</h4>
                  <div className="text-sm text-secondary space-y-1">
                    <div>• Base points: {currentPuzzle.points}</div>
                    <div>• Bonus for no hint: +5 points</div>
                    <div>• Wrong answers reset streak</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-400">
                <Puzzle size={48} className="mx-auto mb-4" />
                <p>Click "New Puzzle" to start your mathematical challenge!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};