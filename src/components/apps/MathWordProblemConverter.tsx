import React, { useState } from 'react';
import { MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';

interface Problem {
  id: string;
  text: string;
  variables: Record<string, string>;
  equation: string;
  solution: string;
  steps: string[];
}

export const MathWordProblemConverter: React.FC = () => {
  const [problemText, setProblemText] = useState('');
  const [parsedProblem, setParsedProblem] = useState<Problem | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const sampleProblems = [
    "A car travels 120 miles in 2 hours. What is its average speed?",
    "Sarah has 15 apples. She gives away 6 apples. How many apples does she have left?",
    "A rectangle has a length of 8 meters and a width of 5 meters. What is its area?",
    "John bought 3 books for $12 each. How much did he spend in total?",
    "A train travels at 60 mph for 3 hours. How far does it travel?"
  ];

  const parseWordProblem = (text: string): Problem | null => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('speed') && lowerText.includes('distance') && lowerText.includes('time')) {
      const distanceMatch = text.match(/(\d+)\s*miles?/);
      const timeMatch = text.match(/(\d+)\s*hours?/);
      
      if (distanceMatch && timeMatch) {
        const distance = parseInt(distanceMatch[1]);
        const time = parseInt(timeMatch[1]);
        
        return {
          id: '1',
          text,
          variables: {
            'd': `distance = ${distance} miles`,
            't': `time = ${time} hours`,
            's': 'speed = ? mph'
          },
          equation: 'speed = distance ÷ time',
          solution: `${distance / time} mph`,
          steps: [
            'Identify the given values',
            `distance = ${distance} miles`,
            `time = ${time} hours`,
            'Apply the speed formula: speed = distance ÷ time',
            `speed = ${distance} ÷ ${time}`,
            `speed = ${distance / time} mph`
          ]
        };
      }
    }
    
    if (lowerText.includes('apples') && (lowerText.includes('gives away') || lowerText.includes('left'))) {
      const totalMatch = text.match(/(\d+)\s*apples?/);
      const givesMatch = text.match(/gives away\s*(\d+)/);
      
      if (totalMatch && givesMatch) {
        const total = parseInt(totalMatch[1]);
        const gives = parseInt(givesMatch[1]);
        
        return {
          id: '2',
          text,
          variables: {
            'initial': `initial apples = ${total}`,
            'given_away': `apples given away = ${gives}`,
            'remaining': 'remaining apples = ?'
          },
          equation: 'remaining = initial - given_away',
          solution: `${total - gives} apples`,
          steps: [
            'Identify the given values',
            `Initial apples = ${total}`,
            `Apples given away = ${gives}`,
            'Apply subtraction: remaining = initial - given_away',
            `remaining = ${total} - ${gives}`,
            `remaining = ${total - gives} apples`
          ]
        };
      }
    }
    
    if (lowerText.includes('rectangle') && lowerText.includes('area')) {
      const lengthMatch = text.match(/length.*?(\d+)/);
      const widthMatch = text.match(/width.*?(\d+)/);
      
      if (lengthMatch && widthMatch) {
        const length = parseInt(lengthMatch[1]);
        const width = parseInt(widthMatch[1]);
        
        return {
          id: '3',
          text,
          variables: {
            'l': `length = ${length} meters`,
            'w': `width = ${width} meters`,
            'A': 'area = ? square meters'
          },
          equation: 'area = length × width',
          solution: `${length * width} square meters`,
          steps: [
            'Identify the given values',
            `length = ${length} meters`,
            `width = ${width} meters`,
            'Apply the area formula: area = length × width',
            `area = ${length} × ${width}`,
            `area = ${length * width} square meters`
          ]
        };
      }
    }
    
    if (lowerText.includes('books') && lowerText.includes('each')) {
      const booksMatch = text.match(/(\d+)\s*books?/);
      const priceMatch = text.match(/\$(\d+)/);
      
      if (booksMatch && priceMatch) {
        const books = parseInt(booksMatch[1]);
        const price = parseInt(priceMatch[1]);
        
        return {
          id: '4',
          text,
          variables: {
            'n': `number of books = ${books}`,
            'p': `price per book = $${price}`,
            'total': 'total cost = ?'
          },
          equation: 'total = number × price',
          solution: `$${books * price}`,
          steps: [
            'Identify the given values',
            `Number of books = ${books}`,
            `Price per book = $${price}`,
            'Apply multiplication: total = number × price',
            `total = ${books} × $${price}`,
            `total = $${books * price}`
          ]
        };
      }
    }
    
    if (lowerText.includes('train') && lowerText.includes('mph') && lowerText.includes('hours')) {
      const speedMatch = text.match(/(\d+)\s*mph/);
      const timeMatch = text.match(/(\d+)\s*hours?/);
      
      if (speedMatch && timeMatch) {
        const speed = parseInt(speedMatch[1]);
        const time = parseInt(timeMatch[1]);
        
        return {
          id: '5',
          text,
          variables: {
            's': `speed = ${speed} mph`,
            't': `time = ${time} hours`,
            'd': 'distance = ? miles'
          },
          equation: 'distance = speed × time',
          solution: `${speed * time} miles`,
          steps: [
            'Identify the given values',
            `speed = ${speed} mph`,
            `time = ${time} hours`,
            'Apply the distance formula: distance = speed × time',
            `distance = ${speed} × ${time}`,
            `distance = ${speed * time} miles`
          ]
        };
      }
    }
    
    return null;
  };

  const handleParse = () => {
    const problem = parseWordProblem(problemText);
    setParsedProblem(problem);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (parsedProblem && currentStep < parsedProblem.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Input Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <MessageSquare size={18} />
              Word Problem
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">Enter Problem</label>
              <textarea
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                className="w-full p-3 border rounded-lg h-24 text-sm resize-none"
                placeholder="Enter a word problem..."
              />
            </div>

            <button
              onClick={handleParse}
              disabled={!problemText.trim()}
              className="btn btn-primary w-full text-sm disabled:opacity-50"
            >
              Convert to Equation
            </button>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Sample Problems</h4>
            <div className="space-y-2">
              {sampleProblems.map((problem, index) => (
                <button
                  key={index}
                  onClick={() => setProblemText(problem)}
                  className="w-full text-left text-xs bg-neutral-100 hover:bg-neutral-200 p-2 rounded transition-colors"
                >
                  {problem}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Solution Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Problem Analysis</h3>
              {parsedProblem && (
                <button
                  onClick={nextStep}
                  disabled={currentStep >= parsedProblem.steps.length - 1}
                  className="btn btn-secondary text-sm"
                >
                  Next Step
                </button>
              )}
            </div>

            {parsedProblem ? (
              <div className="space-y-6">
                {/* Original Problem */}
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-medium text-primary mb-2">Original Problem</h4>
                  <p className="text-secondary italic">"{parsedProblem.text}"</p>
                </div>

                {/* Variables */}
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-medium text-primary mb-3">Identified Variables</h4>
                  <div className="space-y-2">
                    {Object.entries(parsedProblem.variables).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3">
                        <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                          {key}
                        </span>
                        <ArrowRight size={14} className="text-green-600" />
                        <span className="text-secondary">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equation */}
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-medium text-primary mb-2">Mathematical Equation</h4>
                  <div className="font-mono text-lg bg-white p-3 rounded border">
                    {parsedProblem.equation}
                  </div>
                </div>

                {/* Step-by-Step Solution */}
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-medium text-primary mb-3">Step-by-Step Solution</h4>
                  <div className="space-y-3">
                    {parsedProblem.steps.map((step, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded transition-all duration-300 ${
                          index <= currentStep
                            ? 'bg-white border border-orange-200 opacity-100'
                            : 'bg-neutral-100 opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                            index <= currentStep
                              ? 'bg-orange-500 text-white'
                              : 'bg-neutral-300 text-neutral-600'
                          }`}>
                            {index + 1}
                          </span>
                          <span className={index <= currentStep ? 'text-primary' : 'text-neutral-500'}>
                            {step}
                          </span>
                          {index <= currentStep && (
                            <CheckCircle size={16} className="text-green-500 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Answer */}
                {currentStep >= parsedProblem.steps.length - 1 && (
                  <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-600">
                    <h4 className="font-medium text-primary mb-2">Final Answer</h4>
                    <div className="text-xl font-mono bg-white p-3 rounded border text-green-700">
                      {parsedProblem.solution}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-400">
                <MessageSquare size={48} className="mx-auto mb-4" />
                <p>Enter a word problem to see the conversion process</p>
                <p className="text-sm mt-2">Try one of the sample problems on the left</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};