import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, HelpCircle, Play, CheckCircle } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  image?: string;
  target?: string;
  action?: string;
  tip?: string;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeNeeded: number;
  steps: TutorialStep[];
}

interface TutorialOverlayProps {
  tutorial: Tutorial;
  isVisible: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  tutorial,
  isVisible,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const currentStepData = tutorial.steps[currentStep];
  const progress = ((currentStep + 1) / tutorial.steps.length) * 100;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl dark:shadow-black/30">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <HelpCircle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{tutorial.title}</h2>
                <p className="text-white/90 text-sm">{tutorial.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Tutorial Info */}
          <div className="flex items-center gap-6 text-sm text-white/90">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-white/60 rounded-full"></span>
              {tutorial.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-white/60 rounded-full"></span>
              {tutorial.timeNeeded} minutes
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-white/60 rounded-full"></span>
              {tutorial.steps.length} steps
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-white/90 mb-2">
              <span>Progress</span>
              <span>Step {currentStep + 1} of {tutorial.steps.length}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isCompleted ? (
            <div className="space-y-4">
              {/* Step Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {currentStep + 1}
                </div>
                <h3 className="text-lg font-semibold text-primary dark:text-white">
                  {currentStepData.title}
                </h3>
              </div>

              {/* Step Content */}
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="text-secondary leading-relaxed mb-4">
                  {currentStepData.content}
                </div>
                
                {currentStepData.action && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-600 p-4 rounded-r-lg mb-4">
                    <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                      <Play size={16} />
                      <span className="font-medium">Action Required:</span>
                    </div>
                    <p className="text-blue-700 dark:text-blue-300 mt-1">{currentStepData.action}</p>
                  </div>
                )}

                {currentStepData.tip && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                      <HelpCircle size={16} />
                      <span className="font-medium">Pro Tip:</span>
                    </div>
                    <p className="text-yellow-700 dark:text-yellow-300 mt-1">{currentStepData.tip}</p>
                  </div>
                )}
              </div>

              {/* Step Image/Visual Aid */}
              {currentStepData.image && (
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-4 text-center">
                  <div className="text-neutral-500 dark:text-neutral-300 text-sm">
                    📸 Visual guide would appear here
                  </div>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{currentStepData.image}</p>
                </div>
              )}
            </div>
          ) : (
            /* Completion Screen */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Tutorial Complete!</h3>
              <p className="text-secondary dark:text-neutral-300 mb-6">
                You've successfully completed the {tutorial.title} tutorial. 
                You're now ready to explore all the features of this mathematical tool.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleRestart}
                  className="btn btn-secondary"
                >
                  Restart Tutorial
                </button>
                <button
                  onClick={onClose}
                  className="btn btn-primary"
                >
                  Start Using App
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!isCompleted && (
          <div className="border-t p-4 bg-neutral-50 dark:bg-neutral-850 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <button
                onClick={handleSkip}
                className="text-secondary dark:text-neutral-400 hover:text-primary dark:hover:text-white transition-colors text-sm"
              >
                Skip Tutorial
              </button>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="btn btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                
                <button
                  onClick={handleNext}
                  className="btn btn-primary flex items-center gap-2"
                >
                  {currentStep === tutorial.steps.length - 1 ? 'Complete' : 'Next'}
                  {currentStep < tutorial.steps.length - 1 && <ChevronRight size={16} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Welcome Tutorial Prompt
interface TutorialWelcomeProps {
  appName: string;
  isVisible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const TutorialWelcome: React.FC<TutorialWelcomeProps> = ({
  appName,
  isVisible,
  onAccept,
  onDecline
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="text-white" size={32} />
          </div>
          
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">
            Welcome to {appName}!
          </h3>
          
          <p className="text-secondary dark:text-neutral-300 mb-6">
            Would you like to see a quick tutorial to help you get started with this mathematical tool? 
            The tutorial takes just a few minutes and will show you the key features.
          </p>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={onDecline}
              className="btn btn-secondary"
            >
              Skip for Now
            </button>
            <button
              onClick={onAccept}
              className="btn btn-primary flex items-center gap-2"
            >
              <Play size={16} />
              Start Tutorial
            </button>
          </div>
          
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
            You can always access the tutorial later using the help button
          </p>
        </div>
      </div>
    </div>
  );
};