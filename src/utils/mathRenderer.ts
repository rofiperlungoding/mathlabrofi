import katex from 'katex';

export const renderMath = (latex: string, displayMode: boolean = false): string => {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      errorColor: '#cc0000',
      strict: 'ignore', // Adjusted to prevent some strict errors
      trust: true, // Enables more features 
      macros: {
        // Common macros for convenience
        '\\RR': '\\mathbb{R}',
        '\\NN': '\\mathbb{N}',
        '\\ZZ': '\\mathbb{Z}',
        '\\QQ': '\\mathbb{Q}',
        '\\CC': '\\mathbb{C}'
      },
      minRuleThickness: 0.05, // Adjust rule thickness
      maxSize: 25, // Adjusted max size 
      maxExpand: 1000,
      fleqn: false, // Display formulas are centered
    });
  } catch (error) {
    console.error('Error rendering LaTeX:', error);
    return `<span class="text-red-600">Error rendering: ${latex}</span>`;
  }
};

export const renderInlineMath = (latex: string): string => {
  return renderMath(latex, false);
};

export const renderDisplayMath = (latex: string): string => {
  return renderMath(latex, true);
};