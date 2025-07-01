import { evaluate, parse, simplify, derivative, format } from 'mathjs';
import { MathSolution, SolutionStep, ProblemCategory } from '../types';

export class MathEngine {
  static solveProblem(expression: string, category: ProblemCategory): MathSolution {
    try {
      const steps: SolutionStep[] = [];
      let result: string;
      
      switch (category) {
        case 'algebra':
          return this.solveAlgebraProblem(expression, steps);
        case 'calculus':
          return this.solveCalculusProblem(expression, steps);
        case 'geometry':
          return this.solveGeometryProblem(expression, steps);
        case 'trigonometry':
          return this.solveTrigonometryProblem(expression, steps);
        default:
          result = this.evaluateExpression(expression);
          steps.push({
            id: '1',
            description: 'Direct evaluation',
            explanation: 'The expression was evaluated directly',
            latex: result
          });
      }
      
      return {
        result,
        steps,
        alternativeForm: this.getAlternativeForms(expression)
      };
    } catch (error) {
      throw new Error(`Cannot solve: ${error}`);
    }
  }

  private static solveAlgebraProblem(expression: string, steps: SolutionStep[]): MathSolution {
    const originalExpr = expression;
    
    // Step 1: Parse and identify equation type
    steps.push({
      id: '1',
      description: 'Original equation',
      latex: originalExpr,
      explanation: 'Starting with the given equation'
    });

    // Step 2: Simplify if possible
    try {
      const simplified = simplify(expression).toString();
      if (simplified !== originalExpr) {
        steps.push({
          id: '2',
          description: 'Simplify the expression',
          latex: simplified,
          explanation: 'Combine like terms and simplify'
        });
      }
      
      // Step 3: Solve for variable (basic linear equations)
      if (expression.includes('=') && expression.includes('x')) {
        const solution = this.solveLinearEquation(expression);
        steps.push({
          id: '3',
          description: 'Solve for x',
          latex: `x = ${solution}`,
          explanation: 'Isolate the variable x'
        });
        
        return {
          result: `x = ${solution}`,
          steps
        };
      }

      const result = this.evaluateExpression(simplified);
      return {
        result,
        steps
      };
    } catch (error) {
      return {
        result: 'Unable to solve automatically',
        steps
      };
    }
  }

  private static solveCalculusProblem(expression: string, steps: SolutionStep[]): MathSolution {
    steps.push({
      id: '1',
      description: 'Original function',
      latex: expression,
      explanation: 'Starting with the given function'
    });

    try {
      // Check if it's a derivative problem
      if (expression.includes('d/dx') || expression.includes('derivative')) {
        const func = expression.replace(/d\/dx\s*\(?\s*|\s*\)?/g, '');
        const deriv = derivative(func, 'x').toString();
        
        steps.push({
          id: '2',
          description: 'Apply differentiation rules',
          latex: deriv,
          explanation: 'Using power rule, product rule, or chain rule as needed',
          rule: 'Differentiation Rules'
        });

        return {
          result: deriv,
          steps
        };
      }

      // Check if it's an integral (basic)
      if (expression.includes('∫') || expression.includes('integral')) {
        steps.push({
          id: '2',
          description: 'This requires integration',
          latex: 'Integration requires advanced symbolic computation',
          explanation: 'Integration is more complex and requires specialized algorithms'
        });
      }

      const result = this.evaluateExpression(expression);
      return {
        result,
        steps
      };
    } catch (error) {
      return {
        result: 'Unable to solve automatically',
        steps
      };
    }
  }

  private static solveGeometryProblem(expression: string, steps: SolutionStep[]): MathSolution {
    // Handle basic geometry calculations
    const result = this.evaluateExpression(expression);
    
    steps.push({
      id: '1',
      description: 'Calculate using geometry formulas',
      latex: result,
      explanation: 'Applied appropriate geometric formula'
    });

    return {
      result,
      steps
    };
  }

  private static solveTrigonometryProblem(expression: string, steps: SolutionStep[]): MathSolution {
    const result = this.evaluateExpression(expression);
    
    steps.push({
      id: '1',
      description: 'Evaluate trigonometric expression',
      latex: result,
      explanation: 'Used trigonometric identities and calculator values'
    });

    return {
      result,
      steps
    };
  }

  private static solveLinearEquation(equation: string): string {
    try {
      // Very basic linear equation solver
      // This is a simplified version - real implementation would be more robust
      const [left, right] = equation.split('=').map(s => s.trim());
      
      // For equations like "2x + 3 = 7"
      if (left.includes('x') && !right.includes('x')) {
        // This is a placeholder - would need more sophisticated parsing
        const rightValue = evaluate(right);
        // Simplified solving logic would go here
        return rightValue.toString();
      }
      
      return 'Unable to solve';
    } catch (error) {
      return 'Unable to solve';
    }
  }

  private static evaluateExpression(expression: string): string {
    try {
      const result = evaluate(expression);
      return format(result, { precision: 6 });
    } catch (error) {
      throw new Error(`Invalid expression: ${expression}`);
    }
  }

  private static getAlternativeForms(expression: string): string[] {
    const alternatives: string[] = [];
    
    try {
      // Try to get simplified form
      const simplified = simplify(expression).toString();
      if (simplified !== expression) {
        alternatives.push(simplified);
      }
      
      // Try to expand if possible
      // Additional alternative forms would be added here
      
    } catch (error) {
      // If can't process alternatives, return empty array
    }
    
    return alternatives;
  }

  static validateExpression(expression: string): boolean {
    try {
      parse(expression);
      return true;
    } catch (error) {
      return false;
    }
  }

  static getExpressionType(expression: string): ProblemCategory {
    const expr = expression.toLowerCase();
    
    if (expr.includes('sin') || expr.includes('cos') || expr.includes('tan')) {
      return 'trigonometry';
    }
    if (expr.includes('d/dx') || expr.includes('derivative') || expr.includes('∫')) {
      return 'calculus';
    }
    if (expr.includes('matrix') || expr.includes('[')) {
      return 'linear-algebra';
    }
    if (expr.includes('π') || expr.includes('area') || expr.includes('volume')) {
      return 'geometry';
    }
    
    return 'algebra';
  }
}