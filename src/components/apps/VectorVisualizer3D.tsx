import React, { useState } from 'react';
import { Zap, Plus, Minus, Calculator, HelpCircle } from 'lucide-react';
import { TutorialOverlay, TutorialWelcome } from '../TutorialOverlay';
import { getTutorial } from '../../data/tutorials';
import { useTutorial } from '../../hooks/useTutorial';

interface Vector3D {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
  label: string;
}

export const VectorVisualizer3D: React.FC = () => {
  const [vectors, setVectors] = useState<Vector3D[]>([
    { id: '1', x: 2, y: 3, z: 1, color: '#4299e1', label: 'A' },
    { id: '2', x: 1, y: 0, z: 4, color: '#48bb78', label: 'B' }
  ]);
  
  const [newVector, setNewVector] = useState({ x: 0, y: 0, z: 0, label: '' });
  const [selectedVectors, setSelectedVectors] = useState<string[]>([]);
  const [viewAngle, setViewAngle] = useState({ x: 15, y: 45 });

  // Tutorial integration
  const {
    showWelcome,
    showTutorial,
    acceptTutorial,
    declineTutorial,
    closeTutorial,
    openTutorial
  } = useTutorial('vector-3d');

  const tutorial = getTutorial('vector-3d');

  const colors = ['#4299e1', '#48bb78', '#ed8936', '#9f7aea', '#f56565', '#38b2ac'];

  const addVector = () => {
    if (newVector.label.trim()) {
      const id = Date.now().toString();
      const color = colors[vectors.length % colors.length];
      
      setVectors([...vectors, {
        id,
        ...newVector,
        color,
        label: newVector.label.trim()
      }]);
      
      setNewVector({ x: 0, y: 0, z: 0, label: '' });
    }
  };

  const removeVector = (id: string) => {
    setVectors(vectors.filter(v => v.id !== id));
    setSelectedVectors(selectedVectors.filter(s => s !== id));
  };

  const updateVector = (id: string, field: keyof Vector3D, value: string | number) => {
    setVectors(vectors.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const calculateMagnitude = (vector: Vector3D): number => {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
  };

  const calculateDotProduct = (v1: Vector3D, v2: Vector3D): number => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  };

  const calculateCrossProduct = (v1: Vector3D, v2: Vector3D): Vector3D => {
    return {
      id: 'cross',
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
      color: '#9f7aea',
      label: 'A × B'
    };
  };

  const calculateAngle = (v1: Vector3D, v2: Vector3D): number => {
    const dot = calculateDotProduct(v1, v2);
    const mag1 = calculateMagnitude(v1);
    const mag2 = calculateMagnitude(v2);
    
    return Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI);
  };

  const project3DTo2D = (x: number, y: number, z: number) => {
    // Simple isometric projection
    const angleX = viewAngle.x * Math.PI / 180;
    const angleY = viewAngle.y * Math.PI / 180;
    
    const scale = 30;
    const centerX = 200;
    const centerY = 150;
    
    // Rotate around Y axis then X axis
    const rotY_x = x * Math.cos(angleY) + z * Math.sin(angleY);
    const rotY_z = -x * Math.sin(angleY) + z * Math.cos(angleY);
    
    const rotX_y = y * Math.cos(angleX) - rotY_z * Math.sin(angleX);
    const rotX_z = y * Math.sin(angleX) + rotY_z * Math.cos(angleX);
    
    return {
      x: centerX + rotY_x * scale,
      y: centerY - rotX_y * scale
    };
  };

  const selectedVectorObjects = vectors.filter(v => selectedVectors.includes(v.id));
  const hasTwoSelected = selectedVectorObjects.length === 2;

  let dotProduct = 0;
  let crossProduct: Vector3D | null = null;
  let angle = 0;

  if (hasTwoSelected) {
    dotProduct = calculateDotProduct(selectedVectorObjects[0], selectedVectorObjects[1]);
    crossProduct = calculateCrossProduct(selectedVectorObjects[0], selectedVectorObjects[1]);
    angle = calculateAngle(selectedVectorObjects[0], selectedVectorObjects[1]);
  }

  return (
    <div className="p-6 h-full">
      {/* Tutorial Components */}
      {tutorial && (
        <>
          <TutorialWelcome
            appName="3D Vector Visualizer"
            isVisible={showWelcome}
            onAccept={acceptTutorial}
            onDecline={declineTutorial}
          />
          
          <TutorialOverlay
            tutorial={tutorial}
            isVisible={showTutorial}
            onClose={closeTutorial}
            onComplete={closeTutorial}
          />
        </>
      )}

      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-primary flex items-center gap-2">
                <Zap size={18} />
                Vectors
              </h3>
              <button
                onClick={openTutorial}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                title="Show Tutorial"
              >
                <HelpCircle size={16} className="text-accent dark:text-blue-400" />
              </button>
            </div>
            
            {/* Add Vector */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-secondary mb-2">Add Vector</h4>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <input
                  type="number"
                  value={newVector.x}
                  onChange={(e) => setNewVector({...newVector, x: parseFloat(e.target.value) || 0})}
                  placeholder="x"
                  className="p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                />
                <input
                  type="number"
                  value={newVector.y}
                  onChange={(e) => setNewVector({...newVector, y: parseFloat(e.target.value) || 0})}
                  placeholder="y"
                  className="p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                />
                <input
                  type="number"
                  value={newVector.z}
                  onChange={(e) => setNewVector({...newVector, z: parseFloat(e.target.value) || 0})}
                  placeholder="z"
                  className="p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newVector.label}
                  onChange={(e) => setNewVector({...newVector, label: e.target.value})}
                  placeholder="Label"
                  className="flex-1 p-2 border rounded text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                />
                <button
                  onClick={addVector}
                  className="btn btn-primary px-3 py-2"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            
            {/* Vector List */}
            <div className="space-y-3">
              {vectors.map((vector) => (
                <div key={vector.id} className="border rounded-lg p-3 dark:border-neutral-700">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedVectors.includes(vector.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (selectedVectors.length < 2) {
                            setSelectedVectors([...selectedVectors, vector.id]);
                          }
                        } else {
                          setSelectedVectors(selectedVectors.filter(s => s !== vector.id));
                        }
                      }}
                      className="mr-2 dark:bg-neutral-700 dark:border-neutral-600"
                    />
                    <span
                      className="w-4 h-4 rounded flex-shrink-0"
                      style={{ backgroundColor: vector.color }}
                    />
                    <input
                      type="text"
                      value={vector.label}
                      onChange={(e) => updateVector(vector.id, 'label', e.target.value)}
                      className="flex-1 bg-transparent text-sm font-medium dark:text-white"
                    />
                    <button
                      onClick={() => removeVector(vector.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                    >
                      <Minus size={12} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <input
                      type="number"
                      value={vector.x}
                      onChange={(e) => updateVector(vector.id, 'x', parseFloat(e.target.value) || 0)}
                      className="p-1 border rounded text-center dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    />
                    <input
                      type="number"
                      value={vector.y}
                      onChange={(e) => updateVector(vector.id, 'y', parseFloat(e.target.value) || 0)}
                      className="p-1 border rounded text-center dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    />
                    <input
                      type="number"
                      value={vector.z}
                      onChange={(e) => updateVector(vector.id, 'z', parseFloat(e.target.value) || 0)}
                      className="p-1 border rounded text-center dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="text-xs text-secondary mt-1 dark:text-neutral-400">
                    |{vector.label}| = {calculateMagnitude(vector).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* View Controls */}
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">View Controls</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-secondary mb-1">Rotation X: {viewAngle.x}°</label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  value={viewAngle.x}
                  onChange={(e) => setViewAngle({...viewAngle, x: parseInt(e.target.value)})}
                  className="w-full dark:bg-neutral-700"
                />
              </div>
              <div>
                <label className="block text-sm text-secondary mb-1">Rotation Y: {viewAngle.y}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={viewAngle.y}
                  onChange={(e) => setViewAngle({...viewAngle, y: parseInt(e.target.value)})}
                  className="w-full dark:bg-neutral-700"
                />
              </div>
            </div>
          </div>
          
          {/* Calculations */}
          {hasTwoSelected && (
            <div className="card p-4">
              <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
                <Calculator size={16} />
                Calculations
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-secondary">Dot Product:</span>
                  <div className="font-mono mt-1 dark:text-white">{selectedVectorObjects[0].label} · {selectedVectorObjects[1].label} = {dotProduct.toFixed(2)}</div>
                </div>
                
                <div>
                  <span className="text-secondary">Cross Product:</span>
                  <div className="font-mono mt-1 dark:text-white">
                    {selectedVectorObjects[0].label} × {selectedVectorObjects[1].label} = 
                    [{crossProduct?.x.toFixed(2)}, {crossProduct?.y.toFixed(2)}, {crossProduct?.z.toFixed(2)}]
                  </div>
                </div>
                
                <div>
                  <span className="text-secondary">Angle:</span>
                  <div className="font-mono mt-1 dark:text-white">{angle.toFixed(1)}°</div>
                </div>
                
                <div>
                  <span className="text-secondary">Magnitudes:</span>
                  <div className="font-mono mt-1 dark:text-white">
                    |{selectedVectorObjects[0].label}| = {calculateMagnitude(selectedVectorObjects[0]).toFixed(2)}
                  </div>
                  <div className="font-mono dark:text-white">
                    |{selectedVectorObjects[1].label}| = {calculateMagnitude(selectedVectorObjects[1]).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 3D Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">3D Vector Space</h3>
              <div className="text-sm text-secondary">
                {hasTwoSelected ? `Selected: ${selectedVectorObjects.map(v => v.label).join(', ')}` : 'Select 2 vectors for calculations'}
              </div>
            </div>
            
            <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 h-full flex items-center justify-center dark:border-neutral-700 overflow-x-auto">
              <div className="w-full flex justify-center">
                <svg width="400" height="300" className="border rounded max-w-full dark:border-neutral-700 mx-auto" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                  {/* Coordinate axes */}
                  <g>
                    {/* X axis (red) */}
                    <line {...project3DTo2D(0, 0, 0)} {...project3DTo2D(5, 0, 0)} stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-red)" />
                    <text {...project3DTo2D(5.5, 0, 0)} className="text-xs fill-red-500">X</text>
                    
                    {/* Y axis (green) */}
                    <line {...project3DTo2D(0, 0, 0)} {...project3DTo2D(0, 5, 0)} stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
                    <text {...project3DTo2D(0, 5.5, 0)} className="text-xs fill-green-500">Y</text>
                    
                    {/* Z axis (blue) */}
                    <line {...project3DTo2D(0, 0, 0)} {...project3DTo2D(0, 0, 5)} stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
                    <text {...project3DTo2D(0, 0, 5.5)} className="text-xs fill-blue-500">Z</text>
                  </g>
                  
                  {/* Vector arrows */}
                  {vectors.map((vector) => {
                    const start = project3DTo2D(0, 0, 0);
                    const end = project3DTo2D(vector.x, vector.y, vector.z);
                    
                    return (
                      <g key={vector.id}>
                        <line
                          x1={start.x}
                          y1={start.y}
                          x2={end.x}
                          y2={end.y}
                          stroke={vector.color}
                          strokeWidth={selectedVectors.includes(vector.id) ? "4" : "3"}
                          markerEnd={`url(#arrowhead-${vector.id})`}
                        />
                        <text
                          x={end.x + 5}
                          y={end.y - 5}
                          className="text-sm font-medium"
                          fill={vector.color}
                        >
                          {vector.label}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Cross product vector (if calculated) */}
                  {hasTwoSelected && crossProduct && (
                    <g>
                      <line
                        {...project3DTo2D(0, 0, 0)}
                        {...project3DTo2D(crossProduct.x, crossProduct.y, crossProduct.z)}
                        stroke={crossProduct.color}
                        strokeWidth="3"
                        strokeDasharray="5,5"
                        markerEnd="url(#arrowhead-cross)"
                      />
                      <text
                        {...project3DTo2D(crossProduct.x + 0.5, crossProduct.y + 0.5, crossProduct.z + 0.5)}
                        className="text-sm font-medium"
                        fill={crossProduct.color}
                      >
                        {crossProduct.label}
                      </text>
                    </g>
                  )}
                  
                  {/* Arrow markers */}
                  <defs>
                    <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                    </marker>
                    <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                    </marker>
                    <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                    </marker>
                    {vectors.map((vector) => (
                      <marker key={vector.id} id={`arrowhead-${vector.id}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill={vector.color} />
                      </marker>
                    ))}
                    {crossProduct && (
                      <marker id="arrowhead-cross" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill={crossProduct.color} />
                      </marker>
                    )}
                  </defs>
                </svg>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-secondary flex flex-wrap items-center justify-center gap-4">
              <span>🔴 X-axis</span>
              <span>🟢 Y-axis</span>
              <span>🔵 Z-axis</span>
              {hasTwoSelected && <span>⚪ Cross Product (dashed)</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};