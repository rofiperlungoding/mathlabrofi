import React, { useState } from 'react';
import { GitBranch, Plus, Minus } from 'lucide-react';

interface VennSet {
  name: string;
  elements: string[];
  color: string;
  x: number;
  y: number;
  radius: number;
}

export const SetTheoryVennDiagramTool: React.FC = () => {
  const [sets, setSets] = useState<VennSet[]>([
    {
      name: 'A',
      elements: ['1', '2', '3', '4', '5'],
      color: '#4299e1',
      x: 180,
      y: 150,
      radius: 80
    },
    {
      name: 'B',
      elements: ['4', '5', '6', '7', '8'],
      color: '#48bb78',
      x: 280,
      y: 150,
      radius: 80
    }
  ]);
  
  const [newElement, setNewElement] = useState('');
  const [selectedSet, setSelectedSet] = useState('A');
  const [operation, setOperation] = useState<'union' | 'intersection' | 'difference' | 'symmetric'>('union');
  const [showThirdSet, setShowThirdSet] = useState(false);

  const addElement = () => {
    if (newElement.trim()) {
      setSets(sets.map(set => 
        set.name === selectedSet 
          ? { ...set, elements: [...set.elements, newElement.trim()] }
          : set
      ));
      setNewElement('');
    }
  };

  const removeElement = (setName: string, element: string) => {
    setSets(sets.map(set => 
      set.name === setName 
        ? { ...set, elements: set.elements.filter(e => e !== element) }
        : set
    ));
  };

  const addThirdSet = () => {
    if (!showThirdSet) {
      setSets([...sets, {
        name: 'C',
        elements: ['3', '8', '9', '10'],
        color: '#ed8936',
        x: 230,
        y: 220,
        radius: 80
      }]);
      setShowThirdSet(true);
    }
  };

  const removeThirdSet = () => {
    setSets(sets.filter(set => set.name !== 'C'));
    setShowThirdSet(false);
  };

  const calculateUnion = (setA: string[], setB: string[]): string[] => {
    return [...new Set([...setA, ...setB])];
  };

  const calculateIntersection = (setA: string[], setB: string[]): string[] => {
    return setA.filter(element => setB.includes(element));
  };

  const calculateDifference = (setA: string[], setB: string[]): string[] => {
    return setA.filter(element => !setB.includes(element));
  };

  const calculateSymmetricDifference = (setA: string[], setB: string[]): string[] => {
    return [...calculateDifference(setA, setB), ...calculateDifference(setB, setA)];
  };

  const getOperationResult = (): string[] => {
    const [setA, setB] = sets;
    if (!setA || !setB) return [];

    switch (operation) {
      case 'union':
        return calculateUnion(setA.elements, setB.elements);
      case 'intersection':
        return calculateIntersection(setA.elements, setB.elements);
      case 'difference':
        return calculateDifference(setA.elements, setB.elements);
      case 'symmetric':
        return calculateSymmetricDifference(setA.elements, setB.elements);
      default:
        return [];
    }
  };

  const isElementInRegion = (element: string, region: 'A-only' | 'B-only' | 'C-only' | 'AB' | 'AC' | 'BC' | 'ABC' | 'none'): boolean => {
    const [setA, setB, setC] = sets;
    const inA = setA?.elements.includes(element) || false;
    const inB = setB?.elements.includes(element) || false;
    const inC = setC?.elements.includes(element) || false;

    switch (region) {
      case 'A-only': return inA && !inB && !inC;
      case 'B-only': return !inA && inB && !inC;
      case 'C-only': return !inA && !inB && inC;
      case 'AB': return inA && inB && !inC;
      case 'AC': return inA && !inB && inC;
      case 'BC': return !inA && inB && inC;
      case 'ABC': return inA && inB && inC;
      case 'none': return !inA && !inB && !inC;
      default: return false;
    }
  };

  const getAllElements = (): string[] => {
    const allElements = new Set<string>();
    sets.forEach(set => {
      set.elements.forEach(element => allElements.add(element));
    });
    return Array.from(allElements);
  };

  const getRegionElements = (region: string): string[] => {
    return getAllElements().filter(element => isElementInRegion(element, region as any));
  };

  const operationResult = getOperationResult();

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <GitBranch size={18} />
              Set Operations
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondary mb-2">Operation</label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value as any)}
                  className="w-full p-2 border rounded"
                >
                  <option value="union">A ∪ B (Union)</option>
                  <option value="intersection">A ∩ B (Intersection)</option>
                  <option value="difference">A - B (Difference)</option>
                  <option value="symmetric">A △ B (Symmetric Diff)</option>
                </select>
              </div>

              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Add Element</h4>
                <div className="flex gap-2 mb-2">
                  <select
                    value={selectedSet}
                    onChange={(e) => setSelectedSet(e.target.value)}
                    className="p-2 border rounded text-sm"
                  >
                    {sets.map(set => (
                      <option key={set.name} value={set.name}>Set {set.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newElement}
                    onChange={(e) => setNewElement(e.target.value)}
                    placeholder="Element"
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <button
                    onClick={addElement}
                    className="btn btn-primary px-3 py-2"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">Three Sets</span>
                  {!showThirdSet ? (
                    <button
                      onClick={addThirdSet}
                      className="btn btn-secondary text-xs px-2 py-1"
                    >
                      Add Set C
                    </button>
                  ) : (
                    <button
                      onClick={removeThirdSet}
                      className="btn btn-secondary text-xs px-2 py-1"
                    >
                      Remove Set C
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Set Contents */}
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Set Contents</h4>
            <div className="space-y-3">
              {sets.map((set) => (
                <div key={set.name}>
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: set.color }}
                    />
                    <span className="font-medium">Set {set.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {set.elements.map((element, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded text-xs"
                      >
                        {element}
                        <button
                          onClick={() => removeElement(set.name, element)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-secondary">
                    {set.name} = {'{' + set.elements.join(', ') + '}'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operation Result */}
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Result</h4>
            <div className="bg-accent/10 p-3 rounded border">
              <div className="text-sm font-medium text-accent mb-1">
                {operation === 'union' && 'A ∪ B'}
                {operation === 'intersection' && 'A ∩ B'}
                {operation === 'difference' && 'A - B'}
                {operation === 'symmetric' && 'A △ B'}
              </div>
              <div className="text-sm">
                {'{' + operationResult.join(', ') + '}'}
              </div>
              <div className="text-xs text-secondary mt-1">
                {operationResult.length} elements
              </div>
            </div>
          </div>
        </div>

        {/* Venn Diagram */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Venn Diagram</h3>
              <div className="text-sm text-secondary">
                Interactive set visualization
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4 h-full flex items-center justify-center">
              <svg width="500" height="400" className="border rounded">
                {/* Universe background */}
                <rect width="500" height="400" fill="#f8fafc" />
                
                {/* Set circles */}
                {sets.map((set, index) => (
                  <circle
                    key={set.name}
                    cx={set.x}
                    cy={set.y}
                    r={set.radius}
                    fill={set.color}
                    fillOpacity="0.3"
                    stroke={set.color}
                    strokeWidth="2"
                  />
                ))}
                
                {/* Set labels */}
                {sets.map((set) => (
                  <text
                    key={`label-${set.name}`}
                    x={set.name === 'A' ? set.x - 50 : set.name === 'B' ? set.x + 50 : set.x}
                    y={set.name === 'C' ? set.y + 50 : set.y - 50}
                    textAnchor="middle"
                    className="text-lg font-bold"
                    fill={set.color}
                  >
                    {set.name}
                  </text>
                ))}
                
                {/* Elements positioned in regions */}
                {!showThirdSet ? (
                  // Two sets
                  <>
                    {/* A only */}
                    {getRegionElements('A-only').map((element, index) => (
                      <text
                        key={`A-${element}`}
                        x={150}
                        y={140 + index * 15}
                        textAnchor="middle"
                        className="text-sm"
                        fill="#1f2937"
                      >
                        {element}
                      
                      </text>
                    ))}
                    
                    {/* B only */}
                    {getRegionElements('B-only').map((element, index) => (
                      <text
                        key={`B-${element}`}
                        x={310}
                        y={140 + index * 15}
                        textAnchor="middle"
                        className="text-sm"
                        fill="#1f2937"
                      >
                        {element}
                      </text>
                    ))}
                    
                    {/* A ∩ B */}
                    {getRegionElements('AB').map((element, index) => (
                      <text
                        key={`AB-${element}`}
                        x={230}
                        y={140 + index * 15}
                        textAnchor="middle"
                        className="text-sm font-medium"
                        fill="#1f2937"
                      >
                        {element}
                      </text>
                    ))}
                  </>
                ) : (
                  // Three sets
                  <>
                    {/* A only */}
                    {getRegionElements('A-only').map((element, index) => (
                      <text
                        key={`A-${element}`}
                        x={150}
                        y={120 + index * 12}
                        textAnchor="middle"
                        className="text-xs"
                        fill="#1f2937"
                      >
                        {element}
                      </text>
                    ))}
                    
                    {/* B only */}
                    {getRegionElements('B-only').map((element, index) => (
                      <text
                        key={`B-${element}`}
                        x={310}
                        y={120 + index * 12}
                        textAnchor="middle"
                        className="text-xs"
                        fill="#1f2937"
                      >
                        {element}
                      </text>
                    ))}
                    
                    {/* C only */}
                    {getRegionElements('C-only').map((element, index) => (
                      <text
                        key={`C-${element}`}
                        x={230}
                        y={280 + index * 12}
                        textAnchor="middle"
                        className="text-xs"
                        fill="#1f2937"
                      >
                        {element}
                      </text>
                    ))}
                    
                    {/* A ∩ B */}
                    {getRegionElements('AB').map((element, index) => (
                      <text
                        key={`AB-${element}`}
                        x={230}
                        y={130 + index * 12}
                        textAnchor="middle"
                        className="text-xs"
                        fill="#1f2937"
                      >
                        {element}
                      </text>
                    ))}
                    
                    {/* A ∩ C */}
                    {getRegionElements('AC').map((element, index) => (
                      <text
                        key={`AC-${element}`}
                        x={190}
                        y={200 + index * 12}
                        textAnchor="middle"
                        className="text-xs"
                        fill="#1f2937"
                      >
                        {element}
                      </text>
                    ))}
                    
                    {/* B ∩ C */}
                    {getRegionElements('BC').map((element, index) => (
                      <text
                        key={`BC-${element}`}
                        x={270}
                        y={200 + index * 12}
                        textAnchor="middle"
                        className="text-xs"
                        fill="#1f2937"
                      >
                        {element}
                      </text>
                    ))}
                    
                    {/* A ∩ B ∩ C */}
                    {getRegionElements('ABC').map((element, index) => (
                      <text
                        key={`ABC-${element}`}
                        x={230}
                        y={180 + index * 12}
                        textAnchor="middle"
                        className="text-xs font-medium"
                        fill="#1f2937"
                      >
                        {element}
                      </text>
                    ))}
                  </>
                )}
                
                {/* Universe label */}
                <text x="20" y="30" className="text-sm text-secondary">Universe U</text>
              </svg>
            </div>

            <div className="mt-4 text-sm text-secondary">
              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Current Operation:</span> {operation}
                </div>
                <div>
                  <span className="font-medium">Total Elements:</span> {getAllElements().length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};