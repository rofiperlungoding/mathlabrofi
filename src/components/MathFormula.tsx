import React, { useEffect, useRef } from 'react';
import { renderMath } from '../utils/mathRenderer';

interface MathFormulaProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({ 
  latex, 
  displayMode = false, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const html = renderMath(latex, displayMode);
      ref.current.innerHTML = html;
      
      // Force a layout calculation to ensure proper rendering
      setTimeout(() => {
        if (ref.current) {
          const elements = ref.current.querySelectorAll('.katex-html');
          elements.forEach(el => {
            // This forces a layout recalculation
            el.getBoundingClientRect();
          });
        }
      }, 0);
    }
  }, [latex, displayMode]);

  const containerClass = displayMode 
    ? `math-formula-display ${className}` 
    : `math-formula-inline ${className}`;

  return (
    <div 
      ref={ref} 
      className={containerClass}
      aria-label={`Mathematical formula: ${latex}`}
      style={{
        maxWidth: '100%',
        [displayMode ? 'overflow-x' : 'overflow']: 'auto',
        [displayMode ? 'text-align' : 'display']: displayMode ? 'center' : 'inline-block',
      }}
    />
  );
};