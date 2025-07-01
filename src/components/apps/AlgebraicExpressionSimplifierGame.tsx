import React, { useState } from 'react';
import { Gamepad2, Trophy, Lightbulb, CheckCircle } from 'lucide-react';

interface Term {
  id: string;
  coefficient: number;
  variable: string;
  exponent: number;
  display: string;
}

interface GameState {
  originalExpression: string;
  currentTerms: Term[];
  targetExpression: string;
  score: number;
  hints: number;
  completed: boolean;
}

export const AlgebraicExpressionSimplifierGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    originalExpression: '3x + 2x + 5 - 2',
    currentTerms: [
      { id: '1', coefficient: 3, variable: 'x', exponent: 1, display: '3x' },
      { id: '2', coefficient: 2, variable: 'x', exponent: 1, display: '2x' },
      { id: '3', coefficient: 5, variable: '', exponent: 0, display: '5' },
      { id: '4', coefficient: -2, variable: '', exponent: 0, display: '-2' }
    ],
    targetExpression: '5x + 3',
    score: 100,
    hints: 3,
    completed: false
  });

  const [draggedTerm, setDraggedTerm] = useState<Term | null>(null);
  const [combinedTerms, setCombinedTerms] = useState<Term[]>([]);
  const [showHint, setShowHint] = useState(false);

  const problems = [
    {
      expression: '3x + 2x + 5 - 2',
      terms: [
        { id: '1', coefficient: 3, variable: 'x', exponent: 1, display: '3x' },
        { id: '2', coefficient: 2, variable: 'x', exponent: 1, display: '2x' },
        { id: '3', coefficient: 5, variable: '', exponent: 0, display: '5' },
        { id: '4', coefficient: -2, variable: '', exponent: 0, display: '-2' }
      ],
      target: '5x + 3'
    },
    {
      expression: '2x² + 3x² - x + 4x',
      terms: [
        { id: '1', coefficient: 2, variable: 'x', exponent: 2, display: '2x²' },
        { id: '2', coefficient: 3, variable: 'x', exponent: 2, display: '3x²' },
        { id: '3', coefficient: -1, variable: 'x', exponent: 1, display: '-x' },
        { id: '4', coefficient: 4, variable: 'x', exponent: 1, display: '4x' }
      ],
      target: '5x² + 3x'
    },
    {
      expression: '4y + 7 - 2y + 3',
      terms: [
        { id: '1', coefficient: 4, variable: 'y', exponent: 1, display: '4y' },
        { id: '2', coefficient: 7, variable: '', exponent: 0, display: '7' },
        { id: '3', coefficient: -2, variable: 'y', exponent: 1, display: '-2y' },
        { id: '4', coefficient: 3, variable: '', exponent: 0, display: '3' }
      ],
      target: '2y + 10'
    }
  ];

  const canCombine = (term1: Term, term2: Term): boolean => {
    return term1.variable === term2.variable && term1.exponent === term2.exponent;
  };

  const combineLikeTerms = (term1: Term, term2: Term): Term => {
    const newCoefficient = term1.coefficient + term2.coefficient;
    const newDisplay = newCoefficient === 0 ? '0' : 
                      newCoefficient === 1 && term1.variable ? term1.variable + (term1.exponent > 1 ? `^${term1.exponent}` : '') :
                      newCoefficient === -1 && term1.variable ? `-${term1.variable}` + (term1.exponent > 1 ? `^${term1.exponent}` : '') :
                      `${newCoefficient}${term1.variable}${term1.exponent > 1 ? `^${term1.exponent}` : ''}`;
    
    return {
      id: `combined-${Date.now()}`,
      coefficient: newCoefficient,
      variable: term1.variable,
      exponent: term1.exponent,
      display: newDisplay
    };
  };

  const handleDragStart = (term: Term) => {
    setDraggedTerm(term);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetTerm: Term) => {
    if (!draggedTerm) return;

    if (canCombine(draggedTerm, targetTerm)) {
      const combined = combineLikeTerms(draggedTerm, targetTerm);
      
      // Remove the original terms and add the combined term
      const newTerms = gameState.currentTerms.filter(
        term => term.id !== draggedTerm.id && term.id !== targetTerm.id
      );
      
      if (combined.coefficient !== 0) {
        newTerms.push(combined);
      }
      
      setGameState(prev => ({
        ...prev,
        currentTerms: newTerms,
        score: Math.max(0, prev.score - 5)
      }));
      
      setCombinedTerms(prev => [...prev, combined]);
      
      // Check if completed
      checkCompletion(newTerms);
    } else {
      // Wrong combination, deduct points
      setGameState(prev => ({
        ...prev,
        score: Math.max(0, prev.score - 10)
      }));
    }
    
    setDraggedTerm(null);
  };

  const checkCompletion = (terms: Term[]) => {
    // Simple check - in a real game this would be more sophisticated
    if (terms.length <= 2) {
      setGameState(prev => ({ ...prev, completed: true }));
    }
  };

  const useHint = () => {
    if (gameState.hints > 0) {
      setShowHint(true);
      setGameState(prev => ({
        ...prev,
        hints: prev.hints - 1,
        score: Math.max(0, prev.score - 15)
      }));
    }
  };

  const getHintText = (): string => {
    const likeTerms = gameState.currentTerms.filter((term, index) => 
      gameState.currentTerms.some((otherTerm, otherIndex) => 
        index !== otherIndex && canCombine(term, otherTerm)
      )
    );
    
    if (likeTerms.length > 0) {
      return `Look for terms with the same variable and exponent. Try combining ${likeTerms[0].display} with similar terms.`;
    }
    
    return "Look for terms that can be combined together!";
  };

  const startNewProblem = (problemIndex: number) => {
    const problem = problems[problemIndex];
    setGameState({
      originalExpression: problem.expression,
      currentTerms: [...problem.terms],
      targetExpression: problem.target,
      score: 100,
      hints: 3,
      completed: false
    });
    setCombinedTerms([]);
    setShowHint(false);
  };

  const getCurrentExpression = (): string => {
    if (gameState.currentTerms.length === 0) return '0';
    
    return gameState.currentTerms
      .map(term => term.display)
      .join(' + ')
      .replace(/\+ -/g, ' - ');
  };

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Gamepad2 size={18} />
              Game Status
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondary">Score:</span>
                <span className="font-bold text-accent dark:text-blue-400">{gameState.score}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary">Hints:</span>
                <span className="font-bold">{gameState.hints}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary">Target:</span>
                <span className="font-mono text-sm dark:text-neutral-300">{gameState.targetExpression}</span>
              </div>
            </div>

            {gameState.completed && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
                <CheckCircle className="text-green-600 dark:text-green-400 mx-auto mb-2" size={24} />
                <div className="text-green-800 dark:text-green-300 font-medium">Completed!</div>
                <div className="text-green-600 dark:text-green-400 text-sm">Final Score: {gameState.score}</div>
              </div>
            )}
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Problems</h4>
            <div className="space-y-2">
              {problems.map((problem, index) => (
                <button
                  key={index}
                  onClick={() => startNewProblem(index)}
                  className="w-full text-left text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded transition-colors dark:text-neutral-300"
                >
                  {problem.expression}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Help</h4>
            <button
              onClick={useHint}
              disabled={gameState.hints === 0}
              className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lightbulb size={16} />
              Use Hint ({gameState.hints} left)
            </button>
            
            {showHint && (
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <div className="text-yellow-800 dark:text-yellow-300 text-sm">
                  💡 {getHintText()}
                </div>
              </div>
            )}
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Rules</h4>
            <div className="text-xs text-secondary space-y-1">
              <div>• Drag terms onto each other to combine</div>
              <div>• Only like terms can be combined</div>
              <div>• Like terms have same variable and exponent</div>
              <div>• Wrong moves cost points</div>
              <div>• Hints cost 15 points</div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Expression Simplifier</h3>
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                <span className="text-sm text-secondary">Score: {gameState.score}</span>
              </div>
            </div>

            {/* Original Expression */}
            <div className="mb-6">
              <h4 className="font-medium text-primary mb-2">Original Expression</h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500 dark:border-blue-700">
                <div className="font-mono text-lg dark:text-white">{gameState.originalExpression}</div>
              </div>
            </div>

            {/* Current Expression */}
            <div className="mb-6">
              <h4 className="font-medium text-primary mb-2">Current Expression</h4>
              <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-lg border dark:border-neutral-700">
                <div className="font-mono text-lg dark:text-neutral-200">{getCurrentExpression()}</div>
              </div>
            </div>

            {/* Draggable Terms */}
            <div className="mb-6">
              <h4 className="font-medium text-primary mb-3">Terms (Drag to Combine)</h4>
              <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
                {gameState.currentTerms.map((term) => (
                  <div
                    key={term.id}
                    draggable
                    onDragStart={() => handleDragStart(term)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(term)}
                    className="bg-white dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-4 text-center cursor-move hover:border-accent dark:hover:border-blue-500 hover:bg-accent/5 dark:hover:bg-blue-900/20 transition-all"
                  >
                    <div className="font-mono text-lg font-medium dark:text-white">{term.display}</div>
                    <div className="text-xs text-secondary mt-1">
                      {term.variable ? `${term.variable}${term.exponent > 1 ? `^${term.exponent}` : ''}` : 'constant'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target */}
            <div className="mb-6">
              <h4 className="font-medium text-primary mb-2">Target (Simplified Form)</h4>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500 dark:border-green-700">
                <div className="font-mono text-lg dark:text-neutral-200">{gameState.targetExpression}</div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-lg">
              <h4 className="font-medium text-primary mb-2">How to Play</h4>
              <div className="text-sm text-secondary">
                Drag terms with the same variable and exponent onto each other to combine them. 
                Your goal is to simplify the expression to match the target form. 
                Be careful - wrong combinations will cost you points!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};