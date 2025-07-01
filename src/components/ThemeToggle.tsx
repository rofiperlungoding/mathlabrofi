import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'fancy';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'default' }) => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (variant === 'minimal') {
    return (
      <button
        onClick={handleToggle}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 ${className} ${
          isAnimating ? 'animate-pulse scale-110' : ''
        }`}
      >
        {theme === 'dark' ? (
          <Sun size={20} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
        ) : (
          <Moon size={20} className="transform transition-transform" />
        )}
      </button>
    );
  }
  
  if (variant === 'fancy') {
    return (
      <button
        onClick={handleToggle}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`relative p-2 rounded-full overflow-hidden transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-blue-900 text-yellow-300' 
            : 'bg-blue-100 text-blue-900'
        } ${isAnimating ? 'scale-110' : 'scale-100'} ${className}`}
      >
        <div className="relative z-10">
          {theme === 'dark' ? (
            <Sun 
              size={24} 
              className={`transition-all duration-500 ${
                isAnimating ? 'rotate-180 scale-110' : ''
              }`} 
            />
          ) : (
            <Moon 
              size={24} 
              className={`transition-all duration-500 ${
                isAnimating ? 'rotate-180 scale-110' : ''
              }`} 
            />
          )}
        </div>
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            theme === 'dark' 
              ? 'bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-900 opacity-100' 
              : 'bg-gradient-to-tr from-blue-100 via-sky-100 to-indigo-100 opacity-100'
          }`}
        />
        <div 
          className={`absolute top-1 right-1 w-1 h-1 rounded-full transition-all duration-500 ${
            theme === 'dark'
              ? 'bg-yellow-300 opacity-100 shadow-[0_0_10px_2px_rgba(253,224,71,0.7)]'
              : 'bg-gray-300 opacity-50'
          }`}
        />
        <div 
          className={`absolute top-3 right-3 w-0.5 h-0.5 rounded-full transition-all duration-700 delay-100 ${
            theme === 'dark'
              ? 'bg-yellow-200 opacity-60 shadow-[0_0_5px_1px_rgba(253,224,71,0.5)]'
              : 'bg-gray-300 opacity-30'
          }`}
        />
      </button>
    );
  }
  
  // Default variant
  return (
    <button
      onClick={handleToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative overflow-hidden p-3 rounded-xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-neutral-800 text-yellow-400'
          : 'bg-neutral-100 text-neutral-600'
      } ${isAnimating ? 'scale-105' : 'hover:scale-102'} ${className}`}
    >
      <div className="relative z-10 transition-transform duration-500">
        {theme === 'dark' ? (
          <Sun size={20} className={isAnimating ? 'animate-spin-slow' : ''} />
        ) : (
          <Moon size={20} className={isAnimating ? 'animate-spin-slow' : ''} />
        )}
      </div>
      <span
        className={`absolute inset-0 transition-transform duration-500 ${
          isAnimating ? 'scale-150' : 'scale-0'
        } ${theme === 'dark' ? 'bg-yellow-400/20' : 'bg-blue-500/20'} rounded-full`}
      />
    </button>
  );
};