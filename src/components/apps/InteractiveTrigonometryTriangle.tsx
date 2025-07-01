import React, { useState } from 'react';
import { Triangle, Calculator } from 'lucide-react';

interface TrianglePoint {
  x: number;
  y: number;
  label: string;
}

export const InteractiveTrigonometryTriangle: React.FC = () => {
  const [points, setPoints] = useState<TrianglePoint[]>([
    { x: 150, y: 300, label: 'A' },
    { x: 350, y: 300, label: 'B' },
    { x: 250, y: 150, label: 'C' }
  ]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const calculateDistance = (p1: TrianglePoint, p2: TrianglePoint): number => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const calculateAngle = (p1: TrianglePoint, vertex: TrianglePoint, p2: TrianglePoint): number => {
    const a = calculateDistance(vertex, p1);
    const b = calculateDistance(vertex, p2);
    const c = calculateDistance(p1, p2);
    
    // Law of cosines: cos(angle) = (a² + b² - c²) / (2ab)
    const cosAngle = (a * a + b * b - c * c) / (2 * a * b);
    return Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
  };

  const calculateArea = (): number => {
    const [A, B, C] = points;
    return Math.abs((A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2);
  };

  const handleMouseDown = (index: number) => {
    setDragIndex(index);
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (dragIndex !== null) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Keep points within bounds
      const clampedX = Math.max(50, Math.min(450, x));
      const clampedY = Math.max(50, Math.min(350, y));
      
      setPoints(prev => prev.map((point, index) => 
        index === dragIndex 
          ? { ...point, x: clampedX, y: clampedY }
          : point
      ));
    }
  };

  const handleMouseUp = () => {
    setDragIndex(null);
  };

  // Calculate sides
  const sideA = calculateDistance(points[1], points[2]); // BC
  const sideB = calculateDistance(points[0], points[2]); // AC
  const sideC = calculateDistance(points[0], points[1]); // AB

  // Calculate angles
  const angleA = calculateAngle(points[1], points[0], points[2]); // at vertex A
  const angleB = calculateAngle(points[0], points[1], points[2]); // at vertex B
  const angleC = calculateAngle(points[0], points[2], points[1]); // at vertex C

  // Calculate trigonometric ratios for angle A
  const sinA = Math.sin(angleA * Math.PI / 180);
  const cosA = Math.cos(angleA * Math.PI / 180);
  const tanA = Math.tan(angleA * Math.PI / 180);

  const area = calculateArea();
  const perimeter = sideA + sideB + sideC;

  const presetTriangles = [
    { name: '3-4-5 Right Triangle', points: [
      { x: 150, y: 300, label: 'A' },
      { x: 270, y: 300, label: 'B' },
      { x: 150, y: 204, label: 'C' }
    ]},
    { name: 'Equilateral Triangle', points: [
      { x: 150, y: 300, label: 'A' },
      { x: 350, y: 300, label: 'B' },
      { x: 250, y: 127, label: 'C' }
    ]},
    { name: 'Isosceles Triangle', points: [
      { x: 150, y: 300, label: 'A' },
      { x: 350, y: 300, label: 'B' },
      { x: 250, y: 150, label: 'C' }
    ]}
  ];

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Triangle size={18} />
              Triangle Properties
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Sides</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="dark:text-neutral-300">a (BC):</span>
                    <span className="font-mono dark:text-neutral-200">{(sideA / 4).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-neutral-300">b (AC):</span>
                    <span className="font-mono dark:text-neutral-200">{(sideB / 4).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-neutral-300">c (AB):</span>
                    <span className="font-mono dark:text-neutral-200">{(sideC / 4).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Angles</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="dark:text-neutral-300">∠A:</span>
                    <span className="font-mono dark:text-neutral-200">{angleA.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-neutral-300">∠B:</span>
                    <span className="font-mono dark:text-neutral-200">{angleB.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-neutral-300">∠C:</span>
                    <span className="font-mono dark:text-neutral-200">{angleC.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between text-xs text-secondary">
                    <span>Sum:</span>
                    <span>{(angleA + angleB + angleC).toFixed(1)}°</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Area & Perimeter</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="dark:text-neutral-300">Area:</span>
                    <span className="font-mono dark:text-neutral-200">{(area / 16).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-neutral-300">Perimeter:</span>
                    <span className="font-mono dark:text-neutral-200">{(perimeter / 4).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
              <Calculator size={16} />
              Trigonometry (∠A)
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="dark:text-neutral-300">sin A:</span>
                <span className="font-mono dark:text-neutral-200">{sinA.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-neutral-300">cos A:</span>
                <span className="font-mono dark:text-neutral-200">{cosA.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-neutral-300">tan A:</span>
                <span className="font-mono dark:text-neutral-200">{tanA.toFixed(4)}</span>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Preset Triangles</h4>
            <div className="space-y-2">
              {presetTriangles.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => setPoints(preset.points)}
                  className="w-full text-left text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded transition-colors dark:text-neutral-300"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Triangle Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Interactive Triangle</h3>
              <div className="text-sm text-secondary">
                Drag vertices to modify the triangle
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 h-full flex items-center justify-center dark:border-neutral-700 overflow-x-auto">
              <div className="w-full flex justify-center">
                <svg 
                  width="500" 
                  height="400" 
                  className="border rounded cursor-move max-w-full dark:border-neutral-700 mx-auto"
                  viewBox="0 0 500 400"
                  preserveAspectRatio="xMidYMid meet"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* Grid */}
                  <defs>
                    <pattern id="triangleGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#f3f4f6" strokeWidth="0.5" className="dark:stroke-neutral-700"/>
                    </pattern>
                  </defs>
                  <rect width="500" height="400" fill="url(#triangleGrid)" />
                  
                  {/* Triangle */}
                  <polygon
                    points={points.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(66, 153, 225, 0.1)"
                    stroke="#4299e1"
                    strokeWidth="2"
                    className="dark:fill-blue-900/20 dark:stroke-blue-500"
                  />
                  
                  {/* Side labels */}
                  <text
                    x={(points[1].x + points[2].x) / 2 + 10}
                    y={(points[1].y + points[2].y) / 2}
                    className="text-sm fill-primary font-medium dark:fill-white"
                  >
                    a = {(sideA / 4).toFixed(1)}
                  </text>
                  <text
                    x={(points[0].x + points[2].x) / 2 - 15}
                    y={(points[0].y + points[2].y) / 2}
                    className="text-sm fill-primary font-medium dark:fill-white"
                  >
                    b = {(sideB / 4).toFixed(1)}
                  </text>
                  <text
                    x={(points[0].x + points[1].x) / 2}
                    y={(points[0].y + points[1].y) / 2 + 20}
                    className="text-sm fill-primary font-medium dark:fill-white"
                  >
                    c = {(sideC / 4).toFixed(1)}
                  </text>
                  
                  {/* Vertices */}
                  {points.map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill="#4299e1"
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer hover:fill-blue-600 dark:fill-blue-500 dark:stroke-neutral-800"
                        onMouseDown={() => handleMouseDown(index)}
                      />
                      <text
                        x={point.x}
                        y={point.y - 15}
                        textAnchor="middle"
                        className="text-sm font-bold fill-primary dark:fill-white"
                      >
                        {point.label}
                      </text>
                      <text
                        x={point.x}
                        y={point.y + 25}
                        textAnchor="middle"
                        className="text-xs fill-secondary dark:fill-neutral-300"
                      >
                        {index === 0 ? `${angleA.toFixed(0)}°` : 
                         index === 1 ? `${angleB.toFixed(0)}°` : 
                         `${angleC.toFixed(0)}°`}
                      </text>
                    </g>
                  ))}
                  
                  {/* Right angle indicator */}
                  {[angleA, angleB, angleC].some(angle => Math.abs(angle - 90) < 1) && (
                    <text x="20" y="30" className="text-sm fill-green-600 dark:fill-green-400 font-medium">
                      Right Triangle
                    </text>
                  )}
                </svg>
              </div>
            </div>

            <div className="mt-4 text-sm text-secondary">
              <p className="text-center">Drag the vertices (A, B, C) to modify the triangle and see how the measurements change in real-time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};