/**
 * Mathematical Expression Validator
 * Compares mathematical expressions for equivalence rather than exact string matches
 */

interface ParsedExpression {
  type: 'polynomial' | 'fraction' | 'number' | 'complex';
  terms: Term[];
  denominator?: Term[];
}

interface Term {
  coefficient: number;
  variables: Record<string, number>; // variable name -> exponent
  constant: boolean;
}

export class MathValidator {
  /**
   * Main validation function - compares two mathematical expressions for equivalence
   */
  static areEquivalent(correctAnswer: string, userAnswer: string): boolean {
    try {
      // Handle empty or invalid inputs
      if (!correctAnswer?.trim() || !userAnswer?.trim()) {
        return false;
      }

      // Preprocess both expressions
      const normalizedCorrect = this.preprocessExpression(correctAnswer);
      const normalizedUser = this.preprocessExpression(userAnswer);

      // Handle exact matches after normalization
      if (normalizedCorrect === normalizedUser) {
        return true;
      }

      // Parse expressions into structured form
      const parsedCorrect = this.parseExpression(normalizedCorrect);
      const parsedUser = this.parseExpression(normalizedUser);

      // Compare parsed expressions
      return this.compareExpressions(parsedCorrect, parsedUser);
    } catch (error) {
      console.warn('Math validation error:', error);
      // Fallback to string comparison
      return this.fallbackComparison(correctAnswer, userAnswer);
    }
  }

  /**
   * Preprocess expression: normalize symbols, remove spaces, standardize format
   */
  private static preprocessExpression(expression: string): string {
    let processed = expression.toLowerCase().trim();

    // Remove all whitespace
    processed = processed.replace(/\s+/g, '');

    // Normalize multiplication symbols
    processed = processed.replace(/×/g, '*');
    processed = processed.replace(/·/g, '*');

    // Add implicit multiplication (2x -> 2*x, 3(x+1) -> 3*(x+1))
    processed = processed.replace(/(\d)([a-z])/g, '$1*$2');
    processed = processed.replace(/(\d)\(/g, '$1*(');
    processed = processed.replace(/\)([a-z])/g, ')*$1');
    processed = processed.replace(/\)(\d)/g, ')*$1');
    processed = processed.replace(/([a-z])\(/g, '$1*(');

    // Normalize division symbols
    processed = processed.replace(/÷/g, '/');

    // Normalize exponentiation
    processed = processed.replace(/\^/g, '**');

    // Handle negative signs
    processed = processed.replace(/--/g, '+');
    processed = processed.replace(/\+-/g, '-');
    processed = processed.replace(/-\+/g, '-');

    // Sort terms to handle commutative property (basic)
    if (this.isSimpleExpression(processed)) {
      processed = this.sortTerms(processed);
    }

    return processed;
  }

  /**
   * Check if expression is simple enough for basic term sorting
   */
  private static isSimpleExpression(expression: string): boolean {
    // Only sort if it's a simple sum/difference without complex parentheses
    const parenCount = (expression.match(/\(/g) || []).length;
    const hasComplexOps = /[*/]/.test(expression.replace(/\*[a-z]/g, ''));
    return parenCount === 0 && !hasComplexOps;
  }

  /**
   * Sort terms in a simple expression (handles commutative property)
   */
  private static sortTerms(expression: string): string {
    try {
      // Split by + and - while keeping the operators
      const parts = expression.split(/([+-])/).filter(part => part !== '');
      
      if (parts.length <= 1) return expression;

      const terms: { value: string; sign: string }[] = [];
      let currentSign = '+';

      for (const part of parts) {
        if (part === '+' || part === '-') {
          currentSign = part;
        } else if (part.trim()) {
          terms.push({ value: part, sign: currentSign });
          currentSign = '+';
        }
      }

      // Sort terms alphabetically for consistent ordering
      terms.sort((a, b) => {
        // Variables first, then constants
        const aHasVar = /[a-z]/.test(a.value);
        const bHasVar = /[a-z]/.test(b.value);
        
        if (aHasVar && !bHasVar) return -1;
        if (!aHasVar && bHasVar) return 1;
        
        return a.value.localeCompare(b.value);
      });

      // Reconstruct expression
      let result = '';
      for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        if (i === 0) {
          result += term.sign === '-' ? '-' + term.value : term.value;
        } else {
          result += term.sign + term.value;
        }
      }

      return result;
    } catch {
      return expression;
    }
  }

  /**
   * Parse mathematical expression into structured representation
   */
  private static parseExpression(expression: string): ParsedExpression {
    try {
      // Handle fractions
      if (expression.includes('/')) {
        return this.parseFraction(expression);
      }

      // Handle polynomials and simple expressions
      return this.parsePolynomial(expression);
    } catch {
      // Fallback to treating as a simple number or string
      return {
        type: 'number',
        terms: [{
          coefficient: this.isNumeric(expression) ? parseFloat(expression) : 0,
          variables: {},
          constant: true
        }]
      };
    }
  }

  /**
   * Parse fraction expressions
   */
  private static parseFraction(expression: string): ParsedExpression {
    const parts = expression.split('/');
    if (parts.length !== 2) {
      throw new Error('Invalid fraction format');
    }

    const numerator = this.parsePolynomial(parts[0]);
    const denominator = this.parsePolynomial(parts[1]);

    return {
      type: 'fraction',
      terms: numerator.terms,
      denominator: denominator.terms
    };
  }

  /**
   * Parse polynomial expressions
   */
  private static parsePolynomial(expression: string): ParsedExpression {
    const terms: Term[] = [];
    
    // Split by + and - while keeping track of signs
    const parts = expression.split(/([+-])/).filter(part => part !== '');
    
    let currentSign = 1;
    
    for (const part of parts) {
      if (part === '+') {
        currentSign = 1;
      } else if (part === '-') {
        currentSign = -1;
      } else if (part.trim()) {
        const term = this.parseTerm(part, currentSign);
        if (term) {
          terms.push(term);
        }
        currentSign = 1;
      }
    }

    return {
      type: 'polynomial',
      terms: terms.length > 0 ? terms : [{
        coefficient: this.isNumeric(expression) ? parseFloat(expression) : 0,
        variables: {},
        constant: true
      }]
    };
  }

  /**
   * Parse individual term (like 3x^2, -2y, 5)
   */
  private static parseTerm(termStr: string, sign: number = 1): Term | null {
    try {
      let coefficient = sign;
      const variables: Record<string, number> = {};
      let remaining = termStr;

      // Extract coefficient
      const coeffMatch = remaining.match(/^(-?\d*\.?\d*)/);
      if (coeffMatch && coeffMatch[1]) {
        const coeffStr = coeffMatch[1];
        if (coeffStr && coeffStr !== '-' && coeffStr !== '+') {
          coefficient *= parseFloat(coeffStr) || 1;
        }
        remaining = remaining.substring(coeffMatch[1].length);
      }

      // Extract variables and exponents
      const varMatches = remaining.matchAll(/([a-z])(\*\*(\d+))?/g);
      for (const match of varMatches) {
        const variable = match[1];
        const exponent = match[3] ? parseInt(match[3]) : 1;
        variables[variable] = (variables[variable] || 0) + exponent;
      }

      return {
        coefficient,
        variables,
        constant: Object.keys(variables).length === 0
      };
    } catch {
      return null;
    }
  }

  /**
   * Compare two parsed expressions for mathematical equivalence
   */
  private static compareExpressions(expr1: ParsedExpression, expr2: ParsedExpression): boolean {
    // Different types - check if they can be equivalent
    if (expr1.type !== expr2.type) {
      // A number can be equivalent to a polynomial with only constant term
      if ((expr1.type === 'number' && expr2.type === 'polynomial') ||
          (expr1.type === 'polynomial' && expr2.type === 'number')) {
        return this.compareAsNumbers(expr1, expr2);
      }
      return false;
    }

    // Same type comparison
    switch (expr1.type) {
      case 'number':
        return this.compareNumbers(expr1, expr2);
      case 'polynomial':
        return this.comparePolynomials(expr1, expr2);
      case 'fraction':
        return this.compareFractions(expr1, expr2);
      default:
        return false;
    }
  }

  /**
   * Compare expressions as simple numbers
   */
  private static compareAsNumbers(expr1: ParsedExpression, expr2: ParsedExpression): boolean {
    const value1 = this.evaluateAsNumber(expr1);
    const value2 = this.evaluateAsNumber(expr2);
    
    if (value1 === null || value2 === null) return false;
    
    return Math.abs(value1 - value2) < 1e-10;
  }

  /**
   * Evaluate expression as a single number if possible
   */
  private static evaluateAsNumber(expr: ParsedExpression): number | null {
    if (expr.type === 'number') {
      return expr.terms[0]?.coefficient || 0;
    }
    
    if (expr.type === 'polynomial') {
      // Only if all terms are constants
      const hasVariables = expr.terms.some(term => Object.keys(term.variables).length > 0);
      if (hasVariables) return null;
      
      return expr.terms.reduce((sum, term) => sum + term.coefficient, 0);
    }
    
    return null;
  }

  /**
   * Compare two number expressions
   */
  private static compareNumbers(expr1: ParsedExpression, expr2: ParsedExpression): boolean {
    const val1 = expr1.terms[0]?.coefficient || 0;
    const val2 = expr2.terms[0]?.coefficient || 0;
    return Math.abs(val1 - val2) < 1e-10;
  }

  /**
   * Compare two polynomial expressions
   */
  private static comparePolynomials(expr1: ParsedExpression, expr2: ParsedExpression): boolean {
    // Group terms by variable signature
    const terms1 = this.groupTermsByVariables(expr1.terms);
    const terms2 = this.groupTermsByVariables(expr2.terms);

    // Check if they have the same variable signatures
    const signatures1 = Object.keys(terms1).sort();
    const signatures2 = Object.keys(terms2).sort();

    if (signatures1.length !== signatures2.length) return false;

    for (let i = 0; i < signatures1.length; i++) {
      if (signatures1[i] !== signatures2[i]) return false;
      
      // Compare coefficients for this variable signature
      const coeff1 = terms1[signatures1[i]];
      const coeff2 = terms2[signatures2[i]];
      
      if (Math.abs(coeff1 - coeff2) > 1e-10) return false;
    }

    return true;
  }

  /**
   * Group terms by their variable signature
   */
  private static groupTermsByVariables(terms: Term[]): Record<string, number> {
    const grouped: Record<string, number> = {};

    for (const term of terms) {
      const signature = this.getVariableSignature(term.variables);
      grouped[signature] = (grouped[signature] || 0) + term.coefficient;
    }

    return grouped;
  }

  /**
   * Create a string signature for variable combination
   */
  private static getVariableSignature(variables: Record<string, number>): string {
    const entries = Object.entries(variables)
      .filter(([_, exp]) => exp !== 0)
      .sort(([a], [b]) => a.localeCompare(b));
    
    if (entries.length === 0) return 'constant';
    
    return entries.map(([variable, exponent]) => 
      exponent === 1 ? variable : `${variable}^${exponent}`
    ).join('*');
  }

  /**
   * Compare two fraction expressions
   */
  private static compareFractions(expr1: ParsedExpression, expr2: ParsedExpression): boolean {
    if (!expr1.denominator || !expr2.denominator) return false;

    // Cross multiply: a/b = c/d if a*d = b*c
    const num1 = { type: 'polynomial' as const, terms: expr1.terms };
    const den1 = { type: 'polynomial' as const, terms: expr1.denominator };
    const num2 = { type: 'polynomial' as const, terms: expr2.terms };
    const den2 = { type: 'polynomial' as const, terms: expr2.denominator };

    // For simple cases, try cross multiplication
    const crossProduct1 = this.multiplyPolynomials(num1, den2);
    const crossProduct2 = this.multiplyPolynomials(den1, num2);

    return this.comparePolynomials(crossProduct1, crossProduct2);
  }

  /**
   * Multiply two polynomial expressions (simplified)
   */
  private static multiplyPolynomials(poly1: ParsedExpression, poly2: ParsedExpression): ParsedExpression {
    const resultTerms: Term[] = [];

    for (const term1 of poly1.terms) {
      for (const term2 of poly2.terms) {
        const newTerm: Term = {
          coefficient: term1.coefficient * term2.coefficient,
          variables: { ...term1.variables },
          constant: term1.constant && term2.constant
        };

        // Add exponents for same variables
        for (const [variable, exponent] of Object.entries(term2.variables)) {
          newTerm.variables[variable] = (newTerm.variables[variable] || 0) + exponent;
        }

        resultTerms.push(newTerm);
      }
    }

    return { type: 'polynomial', terms: resultTerms };
  }

  /**
   * Check if string represents a number
   */
  private static isNumeric(str: string): boolean {
    return !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
  }

  /**
   * Fallback comparison for when parsing fails
   */
  private static fallbackComparison(correct: string, user: string): boolean {
    const normalizedCorrect = this.preprocessExpression(correct);
    const normalizedUser = this.preprocessExpression(user);
    
    // Try some basic equivalences
    const equivalences = [
      // Different forms of the same number
      [normalizedCorrect, normalizedUser],
      [normalizedCorrect.replace(/\.0+$/, ''), normalizedUser.replace(/\.0+$/, '')],
      // Handle implicit 1 coefficients
      [normalizedCorrect.replace(/^1\*/, ''), normalizedUser.replace(/^1\*/, '')],
      [normalizedCorrect.replace(/\+1\*/, '+'), normalizedUser.replace(/\+1\*/, '+')],
    ];

    return equivalences.some(([a, b]) => a === b);
  }

  /**
   * Advanced validation for specific mathematical contexts
   */
  static validateInContext(
    correctAnswer: string, 
    userAnswer: string, 
    context: 'algebra' | 'calculus' | 'geometry' | 'trigonometry' = 'algebra'
  ): boolean {
    // First try general equivalence
    if (this.areEquivalent(correctAnswer, userAnswer)) {
      return true;
    }

    // Context-specific validation
    switch (context) {
      case 'trigonometry':
        return this.validateTrigonometric(correctAnswer, userAnswer);
      case 'calculus':
        return this.validateCalculus(correctAnswer, userAnswer);
      case 'geometry':
        return this.validateGeometric(correctAnswer, userAnswer);
      default:
        return false;
    }
  }

  /**
   * Validate trigonometric expressions
   */
  private static validateTrigonometric(correct: string, user: string): boolean {
    // Handle common trigonometric equivalences
    const trigEquivalences: Array<[string, string]> = [
      ['1/2', '0.5'],
      ['sqrt(2)/2', '√2/2'],
      ['sqrt(3)/2', '√3/2'],
      ['sqrt(3)', '√3'],
      ['-1/2', '-0.5'],
    ];

    const normalizedCorrect = this.preprocessExpression(correct);
    const normalizedUser = this.preprocessExpression(user);

    for (const [form1, form2] of trigEquivalences) {
      if ((normalizedCorrect.includes(form1) && normalizedUser.includes(form2)) ||
          (normalizedCorrect.includes(form2) && normalizedUser.includes(form1))) {
        return true;
      }
    }

    return false;
  }

  /**
   * Validate calculus expressions
   */
  private static validateCalculus(correct: string, user: string): boolean {
    // Handle derivative and integral notations
    const calculusPatterns = [
      // Handle different derivative notations
      [/d\/dx\[(.*)\]/, "($1)'"],
      [/\(.*\)'/, 'd/dx[.*]'],
    ];

    // This would be expanded for more complex calculus validation
    return false;
  }

  /**
   * Validate geometric expressions
   */
  private static validateGeometric(correct: string, user: string): boolean {
    // Handle common geometric equivalences (π, area formulas, etc.)
    const geometricEquivalences: Array<[RegExp, RegExp]> = [
      [/π/g, /pi/g],
      [/pi/g, /π/g],
    ];

    // This would be expanded for more complex geometric validation
    return false;
  }
}

// Export convenience function
export const validateMathAnswer = (correctAnswer: string, userAnswer: string): boolean => {
  return MathValidator.areEquivalent(correctAnswer, userAnswer);
};

// Export context-aware validation
export const validateMathAnswerInContext = (
  correctAnswer: string, 
  userAnswer: string, 
  context: 'algebra' | 'calculus' | 'geometry' | 'trigonometry' = 'algebra'
): boolean => {
  return MathValidator.validateInContext(correctAnswer, userAnswer, context);
};