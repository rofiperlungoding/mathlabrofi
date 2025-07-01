import React, { useState } from 'react';
import { Target, Play, ArrowRight, CheckCircle, Lightbulb, HelpCircle, AlertCircle } from 'lucide-react';
import { TutorialOverlay, TutorialWelcome } from '../TutorialOverlay';
import { getTutorial } from '../../data/tutorials';
import { useTutorial } from '../../hooks/useTutorial';

interface SolutionStep {
  id: string;
  equation: string;
  operation: string;
  explanation: string;
}

interface ParsedEquation {
  leftSide: {
    coefficient: number;
    constant: number;
  };
  rightSide: {
    coefficient: number;
    constant: number;
  };
  variable: string;
}

export const EquationStepSolver: React.FC = () => {
  const [equation, setEquation] = useState('2x + 5 = 13');
  const [steps, setSteps] = useState<SolutionStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [gameMode, setGameMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tutorial integration
  const {
    showWelcome,
    showTutorial,
    acceptTutorial,
    declineTutorial,
    closeTutorial,
    openTutorial
  } = useTutorial('equation-step-solver');

  const tutorial = getTutorial('equation-step-solver');

  const parseEquation = (eq: string): ParsedEquation | null => {
    try {
      // Clean the equation
      const cleanEq = eq.replace(/\s/g, '').toLowerCase();
      
      // Check if it has an equals sign
      if (!cleanEq.includes('=')) {
        throw new Error('Equation must contain an equals sign (=)');
      }

      const [left, right] = cleanEq.split('=');
      
      // Find the variable (first letter that appears)
      const variableMatch = cleanEq.match(/[a-z]/);
      if (!variableMatch) {
        throw new Error('Equation must contain a variable (like x, y, z)');
      }
      const variable = variableMatch[0];

      const parseSide = (side: string) => {
        let coefficient = 0;
        let constant = 0;

        // Handle cases like "3x+5", "2x-7", "-x+4", etc.
        const terms = side.split(/(?=[+-])/).filter(term => term);
        
        for (const term of terms) {
          if (term.includes(variable)) {
            // This is a variable term
            const coeffStr = term.replace(variable, '');
            if (coeffStr === '' || coeffStr === '+') {
              coefficient += 1;
            } else if (coeffStr === '-') {
              coefficient -= 1;
            } else {
              coefficient += parseFloat(coeffStr) || 0;
            }
          } else {
            // This is a constant term
            const constValue = parseFloat(term) || 0;
            constant += constValue;
          }
        }

        return { coefficient, constant };
      };

      const leftParsed = parseSide(left);
      const rightParsed = parseSide(right);

      return {
        leftSide: leftParsed,
        rightSide: rightParsed,
        variable
      };
    } catch (error) {
      return null;
    }
  };

  const solveEquation = (eq: string): SolutionStep[] => {
    const steps: SolutionStep[] = [];
    
    try {
      setError(null);
      
      const parsed = parseEquation(eq);
      if (!parsed) {
        setError('Could not parse the equation. Please use format like "2x + 5 = 13"');
        return [];
      }

      const { leftSide, rightSide, variable } = parsed;

      // Step 1: Original equation
      steps.push({
        id: '1',
        equation: eq,
        operation: 'Start',
        explanation: 'Original equation'
      });

      // Move all variables to left side and constants to right side
      const netCoefficient = leftSide.coefficient - rightSide.coefficient;
      const netConstant = rightSide.constant - leftSide.constant;

      // Step 2: Collect like terms
      if (leftSide.constant !== 0 || rightSide.coefficient !== 0) {
        let step2Equation = '';
        
        if (netCoefficient === 1) {
          step2Equation = `${variable}`;
        } else if (netCoefficient === -1) {
          step2Equation = `-${variable}`;
        } else {
          step2Equation = `${netCoefficient}${variable}`;
        }
        
        step2Equation += ` = ${netConstant}`;

        steps.push({
          id: '2',
          equation: step2Equation,
          operation: 'Collect like terms',
          explanation: 'Move variables to left side and constants to right side'
        });
      }

      // Step 3: Solve for variable
      if (netCoefficient === 0) {
        if (netConstant === 0) {
          steps.push({
            id: '3',
            equation: '0 = 0',
            operation: 'Identity',
            explanation: 'This equation is always true (infinite solutions)'
          });
        } else {
          steps.push({
            id: '3',
            equation: `0 = ${netConstant}`,
            operation: 'Contradiction',
            explanation: 'This equation has no solution'
          });
        }
      } else {
        const solution = netConstant / netCoefficient;
        
        if (netCoefficient !== 1) {
          steps.push({
            id: '3',
            equation: `${variable} = ${netConstant}/${netCoefficient}`,
            operation: `Divide by ${netCoefficient}`,
            explanation: `Divide both sides by ${netCoefficient} to isolate ${variable}`
          });
        }

        steps.push({
          id: steps.length + 1 + '',
          equation: `${variable} = ${solution}`,
          operation: 'Solution',
          explanation: `The value of ${variable} is ${solution}`
        });
      }

      return steps;
    } catch (error) {
      setError('Error solving equation. Please check your input format.');
      return [];
    }
  };

  const handleSolve = () => {
    if (!equation.trim()) {
      setError('Please enter an equation');
      return;
    }

    const solution = solveEquation(equation);
    if (solution.length > 0) {
      setSteps(solution);
      setCurrentStep(0);
      setShowSolution(true);
      setGameMode(false);
    }
  };

  const handleGameMode = () => {
    if (!equation.trim()) {
      setError('Please enter an equation');
      return;
    }

    const solution = solveEquation(equation);
    if (solution.length > 0) {
      setSteps(solution);
      setCurrentStep(0);
      setShowSolution(false);
      setGameMode(true);
    }
  };

  const checkGuess = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = steps[currentStep + 1];
      const normalizedGuess = userGuess.trim().toLowerCase().replace(/\s/g, '');
      const normalizedAnswer = nextStep.equation.toLowerCase().replace(/\s/g, '');
      
      if (normalizedGuess === normalizedAnswer) {
        setCurrentStep(currentStep + 1);
        setUserGuess('');
      } else {
        // Show a hint or the correct answer
        alert(`Not quite right. The correct next step is: ${nextStep.equation}`);
      }
    }
  };

  const sampleEquations = [
    '2x + 5 = 13',
    '3x - 7 = 14',
    '5x + 3 = 2x + 12',
    'x + 8 = 3x - 4',
    '4y - 6 = 2y + 8',
    '-2z + 10 = z - 5'
  ];

  const formatEquationHelp = [
    'Use * for multiplication: 2*x or just 2x',
    'Use proper variable names: x, y, z, etc.',
    'Include the equals sign: =',
    'Examples: 2x + 5 = 13, 3y - 4 = y + 8'
  ];

  return (
    <div className="p-6 h-full">
      {/* Tutorial Components */}
      {tutorial && (
        <>
          <TutorialWelcome
            appName="Equation Step Solver"
            isVisible={showWelcome}
            onAccept={acceptTutorial}
            onDecline={declineTutorial}
          />
          
          <TutorialOverlay
            tutorial={tutorial}
            isVisible={showTutorial}
            onClose={closeTutorial}
            onComplete={closeTutorial}
          />
        </>
      )}

      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-primary flex items-center gap-2">
                <Target size={18} />
                Equation Input
              </h3>
              <button
                onClick={openTutorial}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                title="Show Tutorial"
              >
                <HelpCircle size={16} className="text-accent dark:text-blue-400" />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">Enter Linear Equation</label>
              <input
                type="text"
                value={equation}
                onChange={(e) => {
                  setEquation(e.target.value);
                  setError(null);
                }}
                className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                placeholder="e.g., 2x + 5 = 13"
              />
              {error && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                  <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-primary mb-2">Sample Equations</h4>
              <div className="space-y-1">
                {sampleEquations.map((eq, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setEquation(eq);
                      setError(null);
                    }}
                    className="w-full text-left text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-2 py-1 rounded transition-colors dark:text-neutral-300"
                  >
                    {eq}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleSolve}
                disabled={!equation.trim()}
                className="btn btn-primary w-full text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Play size={16} />
                Show Solution
              </button>
              <button
                onClick={handleGameMode}
                disabled={!equation.trim()}
                className="btn btn-secondary w-full text-sm disabled:opacity-50"
              >
                Game Mode
              </button>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Input Format Help</h4>
            <div className="space-y-1">
              {formatEquationHelp.map((help, index) => (
                <div key={index} className="text-xs text-secondary flex items-start gap-2">
                  <span className="text-accent dark:text-blue-400 mt-1">•</span>
                  <span>{help}</span>
                </div>
              ))}
            </div>
          </div>

          {gameMode && (
            <div className="card p-4">
              <h4 className="font-medium text-primary mb-3">Your Turn!</h4>
              <p className="text-sm text-secondary mb-3">
                What's the next step?
              </p>
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                className="w-full p-2 border rounded text-sm mb-2 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                placeholder="Enter next equation..."
              />
              <button
                onClick={checkGuess}
                disabled={!userGuess.trim()}
                className="btn btn-primary w-full text-sm disabled:opacity-50"
              >
                Check Answer
              </button>
            </div>
          )}
        </div>

        {/* Solution Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Step-by-Step Solution</h3>
              <div className="text-sm text-secondary">
                {gameMode ? 'Game Mode' : 'Solution Mode'}
              </div>
            </div>

            {steps.length > 0 ? (
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
                      index <= currentStep
                        ? 'border-accent dark:border-blue-600 bg-accent/5 dark:bg-blue-900/20 opacity-100'
                        : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850 opacity-50'
                    } ${
                      index === currentStep && gameMode
                        ? 'ring-2 ring-accent dark:ring-blue-500'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-accent dark:text-blue-400">
                        Step {index + 1}: {step.operation}
                      </span>
                      {index <= currentStep && (
                        <CheckCircle size={16} className="text-green-500 dark:text-green-400" />
                      )}
                    </div>
                    
                    <div className="font-mono text-lg mb-2 p-3 bg-white dark:bg-neutral-800 rounded border dark:border-neutral-700">
                      {step.equation}
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm text-secondary">
                      <Lightbulb size={14} className="mt-0.5 flex-shrink-0" />
                      {step.explanation}
                    </div>
                  </div>
                ))}

                {currentStep === steps.length - 1 && (
                  <div className="text-center py-4">
                    <CheckCircle size={48} className="text-green-500 dark:text-green-400 mx-auto mb-2" />
                    <h4 className="text-lg font-semibold text-primary dark:text-white">Solution Complete!</h4>
                    <p className="text-secondary">
                      {gameMode ? 'Great job solving step by step!' : 'The equation has been solved.'}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-400 dark:text-neutral-500">
                <Target size={48} className="mx-auto mb-4" />
                <p>Enter an equation and click "Show Solution" or "Game Mode" to begin</p>
                <div className="mt-4 text-sm">
                  <p className="font-medium mb-2">Supported equation types:</p>
                  <div className="space-y-1">
                    <p>• Linear equations: 2x + 5 = 13</p>
                    <p>• Variables on both sides: 3x + 4 = x + 10</p>
                    <p>• Any single variable: x, y, z, etc.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};