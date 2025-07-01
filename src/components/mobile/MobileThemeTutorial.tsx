import React, { useState } from 'react';
import { X, Sun, Moon, ArrowRight, ChevronRight, Gift, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ActionButton } from './ActionButton';

interface MobileThemeTutorialProps {
  onClose: () => void;
}

export const MobileThemeTutorial: React.FC<MobileThemeTutorialProps> = ({ onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };
  
  const steps = [
    {
      title: "Theme Customization",
      description: "You can now easily switch between light and dark themes for a comfortable viewing experience",
      icon: <div className="flex items-center justify-center gap-6">
        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400">
          <Sun size={24} />
        </div>
        <ArrowRight size={20} className="text-neutral-400 dark:text-neutral-500" />
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
          <Moon size={24} />
        </div>
      </div>
    },
    {
      title: "How to Access",
      description: "The theme toggle can be found in the top bar or menu drawer for easy access",
      icon: <div className="w-16 h-16 border-2 border-dashed border-blue-400 dark:border-blue-500 rounded-lg flex items-center justify-center">
        <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
          {theme === 'dark' ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-neutral-500" />
          )}
        </div>
      </div>
    },
    {
      title: "Better Readability",
      description: "Dark mode helps reduce eye strain in low light, while light mode provides better contrast in bright environments",
      icon: <div className="flex items-center justify-center">
        <Sparkles size={32} className="text-blue-500 dark:text-blue-400" />
      </div>
    }
  ];
  
  return (
    <div className="fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col animate-fade-in">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div />
        <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Theme Settings</h2>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center text-center">
        {/* Step indicator */}
        <div className="flex gap-2 mb-6">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep 
                  ? 'bg-blue-500 dark:bg-blue-400' 
                  : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            />
          ))}
        </div>
        
        {/* Step content */}
        <div className="mb-6">
          {steps[currentStep].icon}
        </div>
        
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          {steps[currentStep].title}
        </h3>
        
        <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-xs">
          {steps[currentStep].description}
        </p>
        
        {/* Action buttons */}
        <div className="w-full max-w-xs space-y-3">
          {currentStep === 1 && (
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={18} />
                  Try Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} />
                  Try Dark Mode
                </>
              )}
            </button>
          )}
          
          <ActionButton
            label={currentStep === totalSteps - 1 ? "Get Started" : "Next"}
            icon={<ChevronRight size={18} />}
            color="primary"
            onClick={handleNext}
            fullWidth
          />
          
          {currentStep < totalSteps - 1 && (
            <button
              onClick={onClose}
              className="w-full py-2 text-sm text-neutral-500 dark:text-neutral-400"
            >
              Skip
            </button>
          )}
        </div>
      </div>
      
      {/* Feature highlight */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Gift size={16} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-neutral-900 dark:text-white">
              New Feature
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300">
              Theme preferences are automatically saved for your next visit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};