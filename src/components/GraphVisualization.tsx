import React, { useState, useEffect } from 'react';
import { GraphingEngine } from '../utils/graphingEngine';
import { GraphData } from '../types';
import { TrendingUp, Settings, Download } from 'lucide-react';

interface GraphVisualizationProps {
  expression: string;
  width?: number;
  height?: number;
}

export const GraphVisualization: React.FC<GraphVisualizationProps> = ({ 
  expression, 
  width = 600, 
  height = 400 
}) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [domain, setDomain] = useState<[number, number]>([-10, 10]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    try {
      const data = GraphingEngine.generateGraphData(expression);
      setGraphData(data);
    } catch (error) {
      console.error('Error generating graph:', error);
    }
  }, [expression, domain]);

  const handleDomainChange = (newDomain: [number, number]) => {
    setDomain(newDomain);
  };

  if (!graphData || !graphData.points || graphData.points.length === 0) {
    return (
      <div className="bg-neutral-100 rounded-lg p-8 text-center">
        <TrendingUp size={48} className="text-neutral-400 mx-auto mb-4" />
        <p className="text-neutral-600">Unable to generate graph for this expression</p>
        <p className="text-sm text-neutral-500 mt-2">
          Try expressions like: x^2, sin(x), 2x + 3, etc.
        </p>
      </div>
    );
  }

  // Create SVG path from points
  const createPath = (points: Array<{x: number, y: number}>) => {
    if (points.length === 0) return '';
    
    const xScale = width / (domain[1] - domain[0]);
    const yScale = height / 20; // Adjust based on y-range
    const centerX = width / 2;
    const centerY = height / 2;
    
    let path = '';
    points.forEach((point, index) => {
      const x = centerX + (point.x - (domain[0] + domain[1]) / 2) * xScale;
      const y = centerY - point.y * yScale;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };

  const gridLines = [];
  const step = 1;
  
  // Vertical grid lines
  for (let x = Math.ceil(domain[0]); x <= Math.floor(domain[1]); x += step) {
    const xPos = width * (x - domain[0]) / (domain[1] - domain[0]);
    gridLines.push(
      <line
        key={`v-${x}`}
        x1={xPos}
        y1={0}
        x2={xPos}
        y2={height}
        stroke="#e5e7eb"
        strokeWidth={x === 0 ? 2 : 1}
        strokeOpacity={x === 0 ? 0.8 : 0.3}
      />
    );
  }
  
  // Horizontal grid lines
  for (let y = -10; y <= 10; y += step) {
    const yPos = height / 2 - y * (height / 20);
    if (yPos >= 0 && yPos <= height) {
      gridLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={yPos}
          x2={width}
          y2={yPos}
          stroke="#e5e7eb"
          strokeWidth={y === 0 ? 2 : 1}
          strokeOpacity={y === 0 ? 0.8 : 0.3}
        />
      );
    }
  }

  return (
    <div className="space-y-4">
      {/* Graph Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-primary">y = {expression}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="btn btn-secondary text-sm flex items-center gap-2"
          >
            <Settings size={14} />
            Settings
          </button>
          <button className="btn btn-secondary text-sm flex items-center gap-2">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="card p-4 bg-neutral-50">
          <h4 className="font-medium text-primary mb-3">Graph Settings</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">X Min</label>
              <input
                type="number"
                value={domain[0]}
                onChange={(e) => handleDomainChange([Number(e.target.value), domain[1]])}
                className="w-full p-2 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">X Max</label>
              <input
                type="number"
                value={domain[1]}
                onChange={(e) => handleDomainChange([domain[0], Number(e.target.value)])}
                className="w-full p-2 border rounded text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Graph Display */}
      <div className="bg-white border rounded-lg p-4 overflow-x-auto">
        <svg width={width} height={height} className="border rounded">
          {/* Grid */}
          <g opacity="0.3">
            {gridLines}
          </g>
          
          {/* Function plot */}
          <path
            d={createPath(graphData.points as Array<{x: number, y: number}>)}
            stroke="#4299e1"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Axis labels - positioned to avoid overlap */}
          <text x={width - 30} y={height / 2 - 10} className="text-xs fill-neutral-600" textAnchor="end">x</text>
          <text x={width / 2 + 10} y={20} className="text-xs fill-neutral-600" textAnchor="start">y</text>
          
          {/* Grid value labels - positioned symmetrically */}
          <text x={width * 0.75} y={height / 2 - 5} className="text-xs fill-neutral-500" textAnchor="middle">
            {Math.round((domain[1] - domain[0]) * 0.25 + domain[0])}
          </text>
          <text x={width * 0.25} y={height / 2 - 5} className="text-xs fill-neutral-500" textAnchor="middle">
            {Math.round((domain[1] - domain[0]) * -0.25 + domain[0])}
          </text>
          <text x={width / 2 + 15} y={height * 0.25} className="text-xs fill-neutral-500" textAnchor="start">5</text>
          <text x={width / 2 + 15} y={height * 0.75} className="text-xs fill-neutral-500" textAnchor="start">-5</text>
        </svg>
      </div>

      {/* Graph Info */}
      <div className="text-sm text-secondary">
        <p>Domain: [{domain[0]}, {domain[1]}]</p>
        <p>Points plotted: {graphData.points.length}</p>
      </div>
    </div>
  );
};