import React, { useState } from 'react';
import { BarChart3, Plus, Minus } from 'lucide-react';

interface Inequality {
  id: string;
  expression: string;
  operator: '<' | '>' | '<=' | '>=';
  color: string;
  visible: boolean;
}

export const DynamicInequalityGrapher: React.FC = () => {
  const [inequalities, setInequalities] = useState<Inequality[]>([
    {
      id: '1',
      expression: 'y',
      operator: '>',
      color: '#4299e1',
      visible: true
    },
    {
      id: '2',
      expression: 'x + y',
      operator: '<',
      color: '#48bb78',
      visible: true
    }
  ]);

  const [newInequality, setNewInequality] = useState({
    expression: '',
    operator: '>' as '<' | '>' | '<=' | '>='
  });

  const colors = ['#4299e1', '#48bb78', '#ed8936', '#9f7aea', '#f56565', '#38b2ac'];

  const addInequality = () => {
    if (newInequality.expression.trim()) {
      const id = Date.now().toString();
      const color = colors[inequalities.length % colors.length];
      
      setInequalities([...inequalities, {
        id,
        expression: newInequality.expression.trim(),
        operator: newInequality.operator,
        color,
        visible: true
      }]);
      
      setNewInequality({ expression: '', operator: '>' });
    }
  };

  const removeInequality = (id: string) => {
    setInequalities(inequalities.filter(ineq => ineq.id !== id));
  };

  const toggleInequality = (id: string) => {
    setInequalities(inequalities.map(ineq => 
      ineq.id === id ? { ...ineq, visible: !ineq.visible } : ineq
    ));
  };

  const updateInequality = (id: string, field: keyof Inequality, value: any) => {
    setInequalities(inequalities.map(ineq => 
      ineq.id === id ? { ...ineq, [field]: value } : ineq
    ));
  };

  const evaluateExpression = (expr: string, x: number, y: number): number => {
    try {
      // Simple expression evaluator
      let expression = expr
        .replace(/x/g, x.toString())
        .replace(/y/g, y.toString())
        .replace(/\^/g, '**');
      
      // Handle common functions
      expression = expression
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/sqrt/g, 'Math.sqrt');
      
      return Function(`"use strict"; return (${expression})`)();
    } catch {
      return NaN;
    }
  };

  const checkInequality = (ineq: Inequality, x: number, y: number): boolean => {
    const leftSide = y;
    const rightSide = evaluateExpression(ineq.expression, x, y);
    
    if (!isFinite(rightSide)) return false;
    
    switch (ineq.operator) {
      case '>': return leftSide > rightSide;
      case '<': return leftSide < rightSide;
      case '>=': return leftSide >= rightSide;
      case '<=': return leftSide <= rightSide;
      default: return false;
    }
  };

  const generateGridPoints = () => {
    const points = [];
    const width = 500;
    const height = 400;
    const xMin = -10, xMax = 10;
    const yMin = -8, yMax = 8;
    const step = 0.2;
    
    for (let x = xMin; x <= xMax; x += step) {
      for (let y = yMin; y <= yMax; y += step) {
        const screenX = ((x - xMin) / (xMax - xMin)) * width;
        const screenY = height - ((y - yMin) / (yMax - yMin)) * height;
        
        const satisfiedInequalities = inequalities.filter(ineq => 
          ineq.visible && checkInequality(ineq, x, y)
        );
        
        if (satisfiedInequalities.length > 0) {
          points.push({
            x: screenX,
            y: screenY,
            inequalities: satisfiedInequalities,
            isIntersection: satisfiedInequalities.length > 1
          });
        }
      }
    }
    
    return points;
  };

  const generateBoundaryLines = () => {
    const lines = [];
    const width = 500;
    const height = 400;
    const xMin = -10, xMax = 10;
    
    inequalities.filter(ineq => ineq.visible).forEach(ineq => {
      const points = [];
      
      for (let x = xMin; x <= xMax; x += 0.1) {
        const y = evaluateExpression(ineq.expression, x, 0);
        if (isFinite(y) && y >= -8 && y <= 8) {
          const screenX = ((x - xMin) / (xMax - xMin)) * width;
          const screenY = height - ((y - (-8)) / (8 - (-8))) * height;
          points.push({ x: screenX, y: screenY });
        }
      }
      
      if (points.length > 1) {
        lines.push({
          points,
          color: ineq.color,
          id: ineq.id
        });
      }
    });
    
    return lines;
  };

  const createPath = (points: Array<{x: number, y: number}>) => {
    if (points.length === 0) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return path;
  };

  const gridPoints = generateGridPoints();
  const boundaryLines = generateBoundaryLines();

  const sampleInequalities = [
    'x',
    'x^2',
    '2*x + 1',
    '-x + 5',
    'sqrt(x + 10)',
    'sin(x)'
  ];

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <BarChart3 size={18} />
              Inequalities
            </h3>
            
            {/* Add Inequality */}
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">Add Inequality</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded text-sm dark:text-white">y</span>
                  <select
                    value={newInequality.operator}
                    onChange={(e) => setNewInequality({
                      ...newInequality,
                      operator: e.target.value as any
                    })}
                    className="p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  >
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value=">=">&gt;=</option>
                    <option value="<=">&lt;=</option>
                  </select>
                  <input
                    type="text"
                    value={newInequality.expression}
                    onChange={(e) => setNewInequality({
                      ...newInequality,
                      expression: e.target.value
                    })}
                    placeholder="e.g., x, x^2"
                    className="flex-1 p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  />
                </div>
                <button
                  onClick={addInequality}
                  className="btn btn-primary w-full text-sm flex items-center justify-center gap-2"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
            </div>

            {/* Quick Examples */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-primary mb-2">Quick Add</h4>
              <div className="grid grid-cols-2 gap-1">
                {sampleInequalities.map((expr, index) => (
                  <button
                    key={index}
                    onClick={() => setNewInequality({
                      ...newInequality,
                      expression: expr
                    })}
                    className="text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-2 py-1 rounded dark:text-neutral-300"
                  >
                    {expr}
                  </button>
                ))}
              </div>
            </div>

            {/* Inequality List */}
            <div className="space-y-3">
              {inequalities.map((ineq) => (
                <div key={ineq.id} className="border dark:border-neutral-700 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => toggleInequality(ineq.id)}
                      className="w-4 h-4 rounded border-2 flex-shrink-0"
                      style={{ 
                        backgroundColor: ineq.visible ? ineq.color : 'transparent',
                        borderColor: ineq.color 
                      }}
                    />
                    <span className="text-sm font-mono flex-1 dark:text-neutral-200">
                      y {ineq.operator} {ineq.expression}
                    </span>
                    <button
                      onClick={() => removeInequality(ineq.id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1"
                    >
                      <Minus size={12} />
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ineq.expression}
                      onChange={(e) => updateInequality(ineq.id, 'expression', e.target.value)}
                      className="flex-1 p-1 border rounded text-xs dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    />
                    <select
                      value={ineq.operator}
                      onChange={(e) => updateInequality(ineq.id, 'operator', e.target.value)}
                      className="p-1 border rounded text-xs dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    >
                      <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value=">=">&gt;=</option>
                      <option value="<=">&lt;=</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Active inequalities:</span>
                <span className="dark:text-white">{inequalities.filter(i => i.visible).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Intersection points:</span>
                <span className="dark:text-white">{gridPoints.filter(p => p.isIntersection).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Feasible region:</span>
                <span className="dark:text-white">{gridPoints.length > 0 ? 'Visible' : 'None'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Inequality Graph</h3>
              <div className="text-sm text-secondary">
                Shaded regions show feasible areas
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 h-full flex items-center justify-center dark:border-neutral-700 overflow-x-auto">
              <div className="w-full flex justify-center">
                <svg width="500" height="400" className="border rounded max-w-full dark:border-neutral-700 mx-auto" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
                  {/* Grid */}
                  <defs>
                    <pattern id="inequalityGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-neutral-700"/>
                    </pattern>
                  </defs>
                  <rect width="500" height="400" fill="url(#inequalityGrid)" />
                  
                  {/* Axes */}
                  <line x1="0" y1="200" x2="500" y2="200" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                  <line x1="250" y1="0" x2="250" y2="400" stroke="#6b7280" strokeWidth="1" className="dark:stroke-neutral-600" />
                  
                  {/* Feasible region points */}
                  {gridPoints.map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="1"
                      fill={point.isIntersection ? '#9f7aea' : point.inequalities[0]?.color || '#4299e1'}
                      opacity={point.isIntersection ? 0.8 : 0.4}
                    />
                  ))}
                  
                  {/* Boundary lines */}
                  {boundaryLines.map((line) => (
                    <path
                      key={line.id}
                      d={createPath(line.points)}
                      stroke={line.color}
                      strokeWidth="2"
                      fill="none"
                    />
                  ))}
                  
                  {/* Axis labels */}
                  <text x="490" y="195" className="text-xs fill-neutral-600 dark:fill-neutral-400">x</text>
                  <text x="255" y="15" className="text-xs fill-neutral-600 dark:fill-neutral-400">y</text>
                  
                  {/* Grid labels */}
                  <text x="375" y="195" className="text-xs fill-neutral-500 dark:fill-neutral-400">5</text>
                  <text x="125" y="195" className="text-xs fill-neutral-500 dark:fill-neutral-400">-5</text>
                  <text x="255" y="100" className="text-xs fill-neutral-500 dark:fill-neutral-400">4</text>
                  <text x="255" y="300" className="text-xs fill-neutral-500 dark:fill-neutral-400">-4</text>
                </svg>
              </div>
            </div>

            <div className="mt-4 text-sm text-secondary">
              <div className="flex flex-wrap items-center gap-6 justify-center">
                {inequalities.filter(i => i.visible).map((ineq) => (
                  <div key={ineq.id} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-0.5"
                      style={{ backgroundColor: ineq.color }}
                    />
                    <span>y {ineq.operator} {ineq.expression}</span>
                  </div>
                ))}
                {gridPoints.some(p => p.isIntersection) && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Intersection</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};