import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * A component that creates a smooth visual transition effect when switching themes
 */
export const ThemeTransition: React.FC = () => {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevTheme, setPrevTheme] = useState(theme);

  useEffect(() => {
    // If theme has changed, trigger the transition effect
    if (theme !== prevTheme) {
      setIsTransitioning(true);
      
      // After animation completes, reset the transition state
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevTheme(theme);
      }, 300); // Match this duration to the CSS transition
      
      return () => clearTimeout(timer);
    }
  }, [theme, prevTheme]);

  return (
    <div 
      className={`theme-transition-overlay ${theme} ${isTransitioning ? 'visible' : ''} gpu-accelerate`}
      aria-hidden="true"
    />
  );
};