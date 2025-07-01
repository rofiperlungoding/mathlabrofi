import { GraphData } from '../types';

export class GraphingEngine {
  static generateGraphData(expression: string, type: 'function' | '3d' | 'parametric' = 'function'): GraphData {
    const domain: [number, number] = [-10, 10];
    const points: Array<{x: number, y: number, z?: number}> = [];
    
    if (type === 'function') {
      return this.generateFunctionGraph(expression, domain);
    } else if (type === '3d') {
      return this.generate3DGraph(expression, domain);
    } else {
      return this.generateParametricGraph(expression, domain);
    }
  }

  private static generateFunctionGraph(expression: string, domain: [number, number]): GraphData {
    const points: Array<{x: number, y: number}> = [];
    const step = (domain[1] - domain[0]) / 200;
    
    // Generate points for plotting
    for (let x = domain[0]; x <= domain[1]; x += step) {
      try {
        // Replace 'x' with actual value and evaluate
        const expr = expression.replace(/x/g, x.toString());
        const y = this.safeEvaluate(expr);
        if (isFinite(y)) {
          points.push({ x, y });
        }
      } catch (error) {
        // Skip invalid points
      }
    }

    return {
      type: 'function',
      domain,
      points,
      equations: [expression]
    };
  }

  private static generate3DGraph(expression: string, domain: [number, number]): GraphData {
    const points: Array<{x: number, y: number, z: number}> = [];
    const step = (domain[1] - domain[0]) / 50;
    
    // Generate 3D surface points
    for (let x = domain[0]; x <= domain[1]; x += step) {
      for (let y = domain[0]; y <= domain[1]; y += step) {
        try {
          let expr = expression.replace(/x/g, x.toString());
          expr = expr.replace(/y/g, y.toString());
          const z = this.safeEvaluate(expr);
          if (isFinite(z)) {
            points.push({ x, y, z });
          }
        } catch (error) {
          // Skip invalid points
        }
      }
    }

    return {
      type: '3d',
      domain,
      points,
      equations: [expression]
    };
  }

  private static generateParametricGraph(expression: string, domain: [number, number]): GraphData {
    // Simplified parametric graphing
    return {
      type: 'parametric',
      domain,
      points: [],
      equations: [expression]
    };
  }

  private static safeEvaluate(expression: string): number {
    try {
      // Basic math evaluation - in real app would use mathjs
      return Function(`"use strict"; return (${expression})`)();
    } catch (error) {
      return NaN;
    }
  }

  static getCommonFunctions(): Array<{name: string, expression: string, description: string}> {
    return [
      { name: 'Linear', expression: 'x', description: 'y = x' },
      { name: 'Quadratic', expression: 'x^2', description: 'y = x²' },
      { name: 'Cubic', expression: 'x^3', description: 'y = x³' },
      { name: 'Sine', expression: 'sin(x)', description: 'y = sin(x)' },
      { name: 'Cosine', expression: 'cos(x)', description: 'y = cos(x)' },
      { name: 'Exponential', expression: 'exp(x)', description: 'y = eˣ' },
      { name: 'Logarithm', expression: 'log(x)', description: 'y = ln(x)' },
      { name: 'Absolute Value', expression: 'abs(x)', description: 'y = |x|' },
      { name: 'Square Root', expression: 'sqrt(x)', description: 'y = √x' },
      { name: 'Reciprocal', expression: '1/x', description: 'y = 1/x' }
    ];
  }
}