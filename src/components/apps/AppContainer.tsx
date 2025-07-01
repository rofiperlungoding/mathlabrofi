import React, { ReactNode } from 'react';

interface AppContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * A container component for mathematical apps that handles responsive layout
 * ensuring proper centering and spacing for both mobile and desktop views.
 */
export const AppContainer: React.FC<AppContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`math-app-container p-4 ${className}`}>
      <div className="w-full max-w-full overflow-x-auto desktop:overflow-visible">
        <div className="w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * A grid container for mathematical app layouts with responsive behavior
 */
interface AppGridProps {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

export const AppGrid: React.FC<AppGridProps> = ({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 4 },
  className = '' 
}) => {
  // Build grid columns CSS
  const mobileColsClass = `grid-cols-${cols.mobile || 1}`;
  const tabletColsClass = `tablet:grid-cols-${cols.tablet || 2}`;
  const desktopColsClass = `desktop:grid-cols-${cols.desktop || 4}`;
  
  return (
    <div className={`grid ${mobileColsClass} ${tabletColsClass} ${desktopColsClass} gap-4 desktop:gap-6 ${className}`}>
      {children}
    </div>
  );
};