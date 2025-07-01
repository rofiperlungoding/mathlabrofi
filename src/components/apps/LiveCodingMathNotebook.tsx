import React, { useState, useRef } from 'react';
import { FileText, Play, Plus, Minus, Download, Save, Code, Eye } from 'lucide-react';
import { MathFormula } from '../MathFormula';

interface NotebookCell {
  id: string;
  type: 'markdown' | 'math' | 'code';
  content: string;
  output?: string;
  executed?: boolean;
}

export const LiveCodingMathNotebook: React.FC = () => {
  const [cells, setCells] = useState<NotebookCell[]>([
    {
      id: '1',
      type: 'markdown',
      content: '# Mathematical Notebook\n\nThis is an interactive mathematical notebook where you can combine text, math, and computations.',
      executed: true
    },
    {
      id: '2',
      type: 'math',
      content: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
      executed: true
    },
    {
      id: '3',
      type: 'code',
      content: '// Calculate factorial\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nfactorial(5)',
      output: '120',
      executed: true
    }
  ]);
  
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  const addCell = (type: 'markdown' | 'math' | 'code') => {
    const newCell: NotebookCell = {
      id: Date.now().toString(),
      type,
      content: type === 'markdown' ? '# New Section' : 
               type === 'math' ? 'f(x) = x^2' : 
               '// Your code here\n1 + 1',
      executed: false
    };
    
    setCells([...cells, newCell]);
    setSelectedCell(newCell.id);
  };

  const removeCell = (id: string) => {
    setCells(cells.filter(cell => cell.id !== id));
    if (selectedCell === id) {
      setSelectedCell(null);
    }
  };

  const updateCell = (id: string, content: string) => {
    setCells(cells.map(cell => 
      cell.id === id 
        ? { ...cell, content, executed: false }
        : cell
    ));
  };

  const executeCell = async (id: string) => {
    const cell = cells.find(c => c.id === id);
    if (!cell) return;

    setIsRunning(true);
    
    try {
      let output = '';
      
      if (cell.type === 'code') {
        // Simple JavaScript evaluation
        try {
          const result = Function(`
            const Math = window.Math;
            const sin = Math.sin;
            const cos = Math.cos;
            const tan = Math.tan;
            const log = Math.log;
            const sqrt = Math.sqrt;
            const PI = Math.PI;
            const E = Math.E;
            
            ${cell.content}
          `)();
          
          output = typeof result !== 'undefined' ? String(result) : '';
        } catch (error) {
          output = `Error: ${error.message}`;
        }
      }
      
      setCells(cells.map(c => 
        c.id === id 
          ? { ...c, output, executed: true }
          : c
      ));
    } catch (error) {
      console.error('Execution error:', error);
    }
    
    setIsRunning(false);
  };

  const executeAllCells = async () => {
    setIsRunning(true);
    
    for (const cell of cells) {
      if (cell.type === 'code') {
        await executeCell(cell.id);
        // Small delay between executions
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    setIsRunning(false);
  };

  const exportNotebook = () => {
    const notebook = {
      cells: cells.map(cell => ({
        type: cell.type,
        content: cell.content,
        output: cell.output
      })),
      metadata: {
        created: new Date().toISOString(),
        title: 'Mathematical Notebook'
      }
    };
    
    const blob = new Blob([JSON.stringify(notebook, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'math-notebook.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderCell = (cell: NotebookCell) => {
    const isSelected = selectedCell === cell.id;
    
    return (
      <div
        key={cell.id}
        className={`border rounded-lg mb-4 transition-all ${
          isSelected ? 'border-accent shadow-lg' : 'border-neutral-200'
        }`}
        onClick={() => setSelectedCell(cell.id)}
      >
        {/* Cell Header */}
        <div className="flex items-center justify-between p-2 bg-neutral-50 border-b">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              cell.type === 'markdown' ? 'bg-blue-100 text-blue-800' :
              cell.type === 'math' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {cell.type === 'markdown' ? 'Text' : cell.type === 'math' ? 'Math' : 'Code'}
            </span>
            {cell.executed && (
              <span className="text-xs text-green-600">✓</span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {cell.type === 'code' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  executeCell(cell.id);
                }}
                disabled={isRunning}
                className="p-1 hover:bg-neutral-200 rounded text-xs"
              >
                <Play size={12} />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeCell(cell.id);
              }}
              className="p-1 hover:bg-red-100 rounded text-xs text-red-600"
            >
              <Minus size={12} />
            </button>
          </div>
        </div>
        
        {/* Cell Content */}
        <div className="p-4">
          {isSelected ? (
            <textarea
              ref={(el) => textareaRefs.current[cell.id] = el}
              value={cell.content}
              onChange={(e) => updateCell(cell.id, e.target.value)}
              className="w-full min-h-[100px] p-2 border rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={
                cell.type === 'markdown' ? 'Enter markdown text...' :
                cell.type === 'math' ? 'Enter LaTeX math...' :
                'Enter JavaScript code...'
              }
            />
          ) : (
            <div className="min-h-[60px]">
              {cell.type === 'markdown' && (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: cell.content
                      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold mb-2">$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold mb-2">$1</h2>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/\n/g, '<br>')
                  }}
                />
              )}
              
              {cell.type === 'math' && (
                <div className="text-center py-4">
                  <MathFormula latex={cell.content} displayMode />
                </div>
              )}
              
              {cell.type === 'code' && (
                <pre className="bg-neutral-100 p-3 rounded font-mono text-sm overflow-x-auto">
                  <code>{cell.content}</code>
                </pre>
              )}
            </div>
          )}
          
          {/* Cell Output */}
          {cell.output && cell.type === 'code' && (
            <div className="mt-4 pt-4 border-t">
              <div className="bg-neutral-50 p-3 rounded">
                <div className="text-xs text-secondary mb-1">Output:</div>
                <pre className="text-sm font-mono text-primary">{cell.output}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const sampleCode = [
    {
      name: 'Quadratic Formula',
      type: 'code' as const,
      content: `// Quadratic formula solver
function solveQuadratic(a, b, c) {
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return "No real solutions";
  
  const sqrt_d = Math.sqrt(discriminant);
  const x1 = (-b + sqrt_d) / (2 * a);
  const x2 = (-b - sqrt_d) / (2 * a);
  
  return [x1, x2];
}

solveQuadratic(1, -5, 6)`
    },
    {
      name: 'Fibonacci Sequence',
      type: 'code' as const,
      content: `// Generate Fibonacci sequence
function fibonacci(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  const sequence = [a, b];
  
  for (let i = 2; i < n; i++) {
    const next = a + b;
    sequence.push(next);
    a = b;
    b = next;
  }
  
  return sequence;
}

fibonacci(10)`
    },
    {
      name: 'Statistics Functions',
      type: 'code' as const,
      content: `// Statistical calculations
const data = [2, 4, 6, 8, 10, 12, 14];

const mean = data.reduce((a, b) => a + b) / data.length;
const variance = data.reduce((sum, x) => sum + (x - mean) ** 2, 0) / data.length;
const stdDev = Math.sqrt(variance);

console.log("Mean:", mean);
console.log("Standard Deviation:", stdDev.toFixed(2));

\`Mean: \${mean}, Std Dev: \${stdDev.toFixed(2)}\``
    }
  ];

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Toolbar */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <FileText size={18} />
              Notebook Tools
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Add Cell</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => addCell('markdown')}
                    className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2"
                  >
                    <FileText size={14} />
                    Text Cell
                  </button>
                  <button
                    onClick={() => addCell('math')}
                    className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2"
                  >
                    <Code size={14} />
                    Math Cell
                  </button>
                  <button
                    onClick={() => addCell('code')}
                    className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2"
                  >
                    <Play size={14} />
                    Code Cell
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={executeAllCells}
                    disabled={isRunning}
                    className="btn btn-primary w-full text-sm flex items-center justify-center gap-2"
                  >
                    <Play size={14} />
                    {isRunning ? 'Running...' : 'Run All'}
                  </button>
                  <button
                    onClick={exportNotebook}
                    className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2"
                  >
                    <Download size={14} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Sample Code</h4>
            <div className="space-y-2">
              {sampleCode.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newCell: NotebookCell = {
                      id: Date.now().toString(),
                      type: sample.type,
                      content: sample.content,
                      executed: false
                    };
                    setCells([...cells, newCell]);
                    setSelectedCell(newCell.id);
                  }}
                  className="w-full text-left text-xs bg-neutral-100 hover:bg-neutral-200 p-2 rounded transition-colors"
                >
                  {sample.name}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Help</h4>
            <div className="text-xs text-secondary space-y-2">
              <div>
                <strong>Text Cells:</strong> Support markdown syntax
              </div>
              <div>
                <strong>Math Cells:</strong> Use LaTeX notation
              </div>
              <div>
                <strong>Code Cells:</strong> JavaScript with math functions
              </div>
              <div>
                <strong>Shortcuts:</strong> Click cell to edit, click away to render
              </div>
            </div>
          </div>
        </div>

        {/* Notebook Content */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-primary">Live Math Notebook</h3>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Eye size={16} />
                {cells.length} cells
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {cells.length > 0 ? (
                cells.map(renderCell)
              ) : (
                <div className="text-center py-12 text-neutral-400">
                  <FileText size={48} className="mx-auto mb-4" />
                  <p>Start by adding your first cell</p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-medium text-primary mb-2">Getting Started</h4>
              <div className="text-sm text-secondary space-y-1">
                <div>• Click on any cell to edit it</div>
                <div>• Use the toolbar to add new cells</div>
                <div>• Code cells support JavaScript with built-in math functions</div>
                <div>• Math cells render LaTeX formulas</div>
                <div>• Export your notebook when finished</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};