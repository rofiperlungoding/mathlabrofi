import React from 'react';
import { LessonContent as LessonContentType } from '../types';
import { MathFormula } from './MathFormula';

interface LessonContentProps {
  content: LessonContentType;
}

export const LessonContent: React.FC<LessonContentProps> = ({ content }) => {
  const renderContent = () => {
    switch (content.type) {
      case 'text':
        return (
          <p className="text-secondary leading-relaxed">
            {content.content}
          </p>
        );
      
      case 'formula':
        return (
          <div className="my-6">
            <p className="text-secondary mb-4">{content.content}</p>
            {content.latex && (
              <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-lg border dark:border-neutral-700">
                <MathFormula latex={content.latex} displayMode />
              </div>
            )}
          </div>
        );
      
      case 'example':
        return (
          <div className="bg-accent/5 dark:bg-blue-900/20 border-l-4 border-accent dark:border-blue-700 p-4 rounded-r-lg my-4">
            <h4 className="font-medium text-primary mb-2">Example</h4>
            <p className="text-secondary mb-2">{content.content}</p>
            {content.latex && (
              <MathFormula latex={content.latex} displayMode />
            )}
          </div>
        );
      
      case 'visualization':
        return (
          <div className="bg-gradient-to-br from-accent/10 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/20 p-6 rounded-lg my-4 border dark:border-blue-900/30">
            <h4 className="font-medium text-primary mb-2">Visualization</h4>
            <p className="text-secondary">{content.content}</p>
            {/* Placeholder for future interactive visualizations */}
            <div className="mt-4 h-48 bg-white dark:bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">Interactive visualization will be here</span>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="lesson-content-item mb-6">
      {renderContent()}
    </div>
  );
};