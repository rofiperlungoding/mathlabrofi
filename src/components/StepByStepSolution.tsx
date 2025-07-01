import React from 'react';
import { SolutionStep } from '../types';
import { MathFormula } from './MathFormula';
import { CheckCircle, ArrowRight, Info } from 'lucide-react';

interface StepByStepSolutionProps {
  steps: SolutionStep[];
}

export const StepByStepSolution: React.FC<StepByStepSolutionProps> = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex gap-4 p-4 bg-neutral-50 dark:bg-neutral-850 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-primary">{step.description}</h4>
              {step.rule && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                  {step.rule}
                </span>
              )}
            </div>
            
            {step.latex && (
              <div className="mb-3 p-3 bg-white dark:bg-neutral-800 rounded border dark:border-neutral-700">
                <MathFormula latex={step.latex} displayMode />
              </div>
            )}
            
            <p className="text-secondary text-sm flex items-start gap-2">
              <Info size={14} className="mt-0.5 flex-shrink-0" />
              {step.explanation}
            </p>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex-shrink-0 flex items-center">
              <ArrowRight size={16} className="text-neutral-400 dark:text-neutral-600" />
            </div>
          )}
        </div>
      ))}
      
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium mt-6">
        <CheckCircle size={16} />
        Solution Complete!
      </div>
    </div>
  );
};