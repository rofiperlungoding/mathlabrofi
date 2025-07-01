import React, { useState } from 'react';
import { Shapes, Play, RotateCcw } from 'lucide-react';

interface Matrix2x2 {
  a: number;
  b: number;
  c: number;
  d: number;
}

interface Point {
  x: number;
  y: number;
}

export const LinearTransformationShapes: React.FC = () => {
  const [matrix, setMatrix] = useState<Matrix2x2>({ a: 1, b: 0, c: 0, d: 1 });
  const [selectedShape, setSelectedShape] = useState<'square' | 'circle' | 'triangle' | 'house'>('square');
  const [showOriginal, setShowOriginal] = useState(true);
  const [animating, setAnimating] = useState(false);

  const updateMatrix = (field: keyof Matrix2x2, value: number) => {
    setMatrix(prev => ({ ...prev, [field]: value }));
  };

  const resetMatrix = () => {
    setMatrix({ a: 1, b: 0, c: 0, d: 1 });
  };

  const applyTransformation = (point: Point): Point => {
    return {
      x: matrix.a * point.x + matrix.b * point.y,
      y: matrix.c * point.x + matrix.d * point.y
    };
  };

  const getShapePoints = (shape: string): Point[] => {
    switch (shape) {
      case 'square':
        return [
          { x: -1, y: -1 }, { x: 1, y: -1 },
          { x: 1, y: 1 }, { x: -1, y: 1 }
        ];
      case 'triangle':
        return [
          { x: 0, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }
        ];
      case 'house':
        return [
          { x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 },
          { x: 0, y: 1 }, { x: -1, y: 0 }
        ];
      default:
        return [];
    }
  };

  const getCirclePoints = (): Point[] => {
    const points: Point[] = [];
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * 2 * Math.PI;
      points.push({
        x: Math.cos(angle),
        y: Math.sin(angle)
      });
    }
    return points;
  };

  const convertToSVG = (points: Point[], scale: number = 80, centerX: number = 150, centerY: number = 150): string => {
    if (points.length === 0) return '';
    
    const svgPoints = points.map(p => `${centerX + p.x * scale},${centerY - p.y * scale}`);
    return svgPoints.join(' ');
  };

  const createCirclePath = (points: Point[], scale: number = 80, centerX: number = 150, centerY: number = 150): string => {
    if (points.length === 0) return '';
    
    let path = '';
    points.forEach((point, index) => {
      const x = centerX + point.x * scale;
      const y = centerY - point.y * scale;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    path += ' Z';
    
    return path;
  };

  const originalPoints = selectedShape === 'circle' ? getCirclePoints() : getShapePoints(selectedShape);
  const transformedPoints = originalPoints.map(applyTransformation);

  const presetTransformations = [
    { name: 'Identity', matrix: { a: 1, b: 0, c: 0, d: 1 } },
    { name: 'Scale 2x', matrix: { a: 2, b: 0, c: 0, d: 2 } },
    { name: 'Stretch X', matrix: { a: 2, b: 0, c: 0, d: 1 } },
    { name: 'Shear X', matrix: { a: 1, b: 0.5, c: 0, d: 1 } },
    { name: 'Rotate 45°', matrix: { a: 0.707, b: -0.707, c: 0.707, d: 0.707 } },
    { name: 'Reflection X', matrix: { a: 1, b: 0, c: 0, d: -1 } },
    { name: 'Reflection Y', matrix: { a: -1, b: 0, c: 0, d: 1 } }
  ];

  const calculateDeterminant = (): number => {
    return matrix.a * matrix.d - matrix.b * matrix.c;
  };

  const getTransformationType = (): string => {
    const det = calculateDeterminant();
    if (Math.abs(det) < 0.001) return 'Singular (area = 0)';
    if (det < 0) return 'Orientation reversing';
    return 'Orientation preserving';
  };

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Shapes size={18} />
              Transformation Matrix
            </h3>
            
            <div className="mb-4">
              <div className="text-center mb-3">
                <div className="inline-block border rounded p-2 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <input
                      type="number"
                      value={matrix.a}
                      onChange={(e) => updateMatrix('a', parseFloat(e.target.value) || 0)}
                      className="w-16 p-1 text-center border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                      step="0.1"
                    />
                    <input
                      type="number"
                      value={matrix.b}
                      onChange={(e) => updateMatrix('b', parseFloat(e.target.value) || 0)}
                      className="w-16 p-1 text-center border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                      step="0.1"
                    />
                    <input
                      type="number"
                      value={matrix.c}
                      onChange={(e) => updateMatrix('c', parseFloat(e.target.value) || 0)}
                      className="w-16 p-1 text-center border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                      step="0.1"
                    />
                    <input
                      type="number"
                      value={matrix.d}
                      onChange={(e) => updateMatrix('d', parseFloat(e.target.value) || 0)}
                      className="w-16 p-1 text-center border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={resetMatrix}
                className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                Reset to Identity
              </button>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-primary mb-2">Shape</h4>
              <div className="grid grid-cols-2 gap-2">
                {['square', 'circle', 'triangle', 'house'].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setSelectedShape(shape as any)}
                    className={`text-xs p-2 rounded capitalize ${
                      selectedShape === shape
                        ? 'bg-accent text-white dark:bg-blue-600'
                        : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showOriginal}
                  onChange={(e) => setShowOriginal(e.target.checked)}
                  className="dark:bg-neutral-700 dark:border-neutral-600"
                />
                <span className="text-sm dark:text-neutral-300">Show Original</span>
              </label>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Presets</h4>
            <div className="space-y-2">
              {presetTransformations.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => setMatrix(preset.matrix)}
                  className="w-full text-left text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded transition-colors dark:text-neutral-300"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Properties</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="dark:text-neutral-300">Determinant:</span>
                <span className="font-mono dark:text-white">{calculateDeterminant().toFixed(3)}</span>
              </div>
              <div className="text-xs text-secondary dark:text-neutral-400">
                {getTransformationType()}
              </div>
              <div className="flex justify-between">
                <span className="dark:text-neutral-300">Area Scale:</span>
                <span className="font-mono dark:text-white">{Math.abs(calculateDeterminant()).toFixed(3)}x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Shape Transformation</h3>
              <div className="text-sm text-secondary">
                Matrix: [{matrix.a.toFixed(1)}, {matrix.b.toFixed(1)}; {matrix.c.toFixed(1)}, {matrix.d.toFixed(1)}]
              </div>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 overflow-x-auto">
              {/* Original Shape */}
              <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 dark:border-neutral-700">
                <h4 className="font-medium text-primary mb-3 text-center">Original Shape</h4>
                <div className="flex justify-center">
                  <svg width="300" height="300" className="w-full max-w-xs mx-auto" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
                    {/* Grid */}
                    <defs>
                      <pattern id="originalGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f3f4f6" strokeWidth="1" className="dark:stroke-neutral-700"/>
                      </pattern>
                    </defs>
                    <rect width="300" height="300" fill="url(#originalGrid)" />
                    
                    {/* Axes */}
                    <line x1="0" y1="150" x2="300" y2="150" stroke="#d1d5db" strokeWidth="1" className="dark:stroke-neutral-600" />
                    <line x1="150" y1="0" x2="150" y2="300" stroke="#d1d5db" strokeWidth="1" className="dark:stroke-neutral-600" />
                    
                    {/* Original shape */}
                    {selectedShape === 'circle' ? (
                      <path
                        d={createCirclePath(originalPoints, 80, 150, 150)}
                        fill="rgba(66, 153, 225, 0.3)"
                        stroke="#4299e1"
                        strokeWidth="2"
                        className="dark:fill-blue-900/20 dark:stroke-blue-500"
                      />
                    ) : (
                      <polygon
                        points={convertToSVG(originalPoints, 80, 150, 150)}
                        fill="rgba(66, 153, 225, 0.3)"
                        stroke="#4299e1"
                        strokeWidth="2"
                        className="dark:fill-blue-900/20 dark:stroke-blue-500"
                      />
                    )}
                    
                    {/* Unit vectors */}
                    <line x1="150" y1="150" x2="230" y2="150" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" className="dark:stroke-red-500" />
                    <line x1="150" y1="150" x2="150" y2="70" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" className="dark:stroke-red-500" />
                    
                    <defs>
                      <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" className="dark:fill-red-500" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Transformed Shape */}
              <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 dark:border-neutral-700">
                <h4 className="font-medium text-primary mb-3 text-center">Transformed Shape</h4>
                <div className="flex justify-center">
                  <svg width="300" height="300" className="w-full max-w-xs mx-auto" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
                    {/* Grid */}
                    <rect width="300" height="300" fill="url(#originalGrid)" />
                    
                    {/* Axes */}
                    <line x1="0" y1="150" x2="300" y2="150" stroke="#d1d5db" strokeWidth="1" className="dark:stroke-neutral-600" />
                    <line x1="150" y1="0" x2="150" y2="300" stroke="#d1d5db" strokeWidth="1" className="dark:stroke-neutral-600" />
                    
                    {/* Original shape (if shown) */}
                    {showOriginal && (
                      selectedShape === 'circle' ? (
                        <path
                          d={createCirclePath(originalPoints, 80, 150, 150)}
                          fill="none"
                          stroke="#d1d5db"
                          strokeWidth="1"
                          strokeDasharray="3,3"
                          className="dark:stroke-neutral-500"
                        />
                      ) : (
                        <polygon
                          points={convertToSVG(originalPoints, 80, 150, 150)}
                          fill="none"
                          stroke="#d1d5db"
                          strokeWidth="1"
                          strokeDasharray="3,3"
                          className="dark:stroke-neutral-500"
                        />
                      )
                    )}
                    
                    {/* Transformed shape */}
                    {selectedShape === 'circle' ? (
                      <path
                        d={createCirclePath(transformedPoints, 80, 150, 150)}
                        fill="rgba(72, 187, 120, 0.3)"
                        stroke="#48bb78"
                        strokeWidth="2"
                        className="dark:fill-green-900/20 dark:stroke-green-500"
                      />
                    ) : (
                      <polygon
                        points={convertToSVG(transformedPoints, 80, 150, 150)}
                        fill="rgba(72, 187, 120, 0.3)"
                        stroke="#48bb78"
                        strokeWidth="2"
                        className="dark:fill-green-900/20 dark:stroke-green-500"
                      />
                    )}
                    
                    {/* Transformed unit vectors */}
                    <line 
                      x1="150" 
                      y1="150" 
                      x2={150 + matrix.a * 80} 
                      y2={150 - matrix.c * 80} 
                      stroke="#f59e0b" 
                      strokeWidth="2" 
                      markerEnd="url(#arrowOrange)"
                      className="dark:stroke-yellow-500"
                    />
                    <line 
                      x1="150" 
                      y1="150" 
                      x2={150 + matrix.b * 80} 
                      y2={150 - matrix.d * 80} 
                      stroke="#f59e0b" 
                      strokeWidth="2" 
                      markerEnd="url(#arrowOrange)"
                      className="dark:stroke-yellow-500"
                    />
                    
                    <defs>
                      <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" className="dark:fill-yellow-500" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-secondary">
              <div className="flex flex-wrap items-center gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-blue-500"></div>
                  <span>Original Shape</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-green-500"></div>
                  <span>Transformed Shape</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-orange-500"></div>
                  <span>Transformed Basis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};