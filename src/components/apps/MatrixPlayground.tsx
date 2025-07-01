import React, { useState } from 'react';
import { Grid3X3, Calculator, Plus, Minus, HelpCircle } from 'lucide-react';
import { TutorialOverlay, TutorialWelcome } from '../TutorialOverlay';
import { getTutorial } from '../../data/tutorials';
import { useTutorial } from '../../hooks/useTutorial';

interface Matrix {
  id: string;
  name: string;
  values: number[][];
  rows: number;
  cols: number;
}

export const MatrixPlayground: React.FC = () => {
  const [matrices, setMatrices] = useState<Matrix[]>([
    {
      id: '1',
      name: 'A',
      values: [[1, 2], [3, 4]],
      rows: 2,
      cols: 2
    },
    {
      id: '2',
      name: 'B',
      values: [[2, 0], [1, 3]],
      rows: 2,
      cols: 2
    }
  ]);
  
  const [selectedOperation, setSelectedOperation] = useState<'add' | 'multiply' | 'transpose' | 'inverse' | 'determinant'>('multiply');
  const [selectedMatrices, setSelectedMatrices] = useState<string[]>(['1', '2']);
  const [result, setResult] = useState<Matrix | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  // Tutorial integration
  const {
    showWelcome,
    showTutorial,
    acceptTutorial,
    declineTutorial,
    closeTutorial,
    openTutorial
  } = useTutorial('matrix-playground');

  const tutorial = getTutorial('matrix-playground');

  const createMatrix = (rows: number, cols: number, name: string) => {
    const values = Array(rows).fill(null).map(() => Array(cols).fill(0));
    const id = Date.now().toString();
    
    setMatrices([...matrices, {
      id,
      name,
      values,
      rows,
      cols
    }]);
  };

  const updateMatrixValue = (matrixId: string, row: number, col: number, value: number) => {
    setMatrices(matrices.map(matrix => 
      matrix.id === matrixId 
        ? {
            ...matrix,
            values: matrix.values.map((r, i) => 
              i === row 
                ? r.map((c, j) => j === col ? value : c)
                : r
            )
          }
        : matrix
    ));
  };

  const addMatrices = (a: Matrix, b: Matrix): Matrix | null => {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      return null;
    }
    
    const values = a.values.map((row, i) => 
      row.map((val, j) => val + b.values[i][j])
    );
    
    const newSteps = [
      `Adding matrices ${a.name} and ${b.name}`,
      `Both matrices are ${a.rows}×${a.cols}`,
      'Adding corresponding elements...'
    ];
    
    setSteps(newSteps);
    
    return {
      id: 'result',
      name: `${a.name} + ${b.name}`,
      values,
      rows: a.rows,
      cols: a.cols
    };
  };

  const multiplyMatrices = (a: Matrix, b: Matrix): Matrix | null => {
    if (a.cols !== b.rows) {
      return null;
    }
    
    const values = Array(a.rows).fill(null).map(() => Array(b.cols).fill(0));
    
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < b.cols; j++) {
        for (let k = 0; k < a.cols; k++) {
          values[i][j] += a.values[i][k] * b.values[k][j];
        }
      }
    }
    
    const newSteps = [
      `Multiplying matrix ${a.name} (${a.rows}×${a.cols}) by matrix ${b.name} (${b.rows}×${b.cols})`,
      `Result will be ${a.rows}×${b.cols}`,
      'Using dot product of rows and columns...'
    ];
    
    setSteps(newSteps);
    
    return {
      id: 'result',
      name: `${a.name} × ${b.name}`,
      values,
      rows: a.rows,
      cols: b.cols
    };
  };

  const transposeMatrix = (matrix: Matrix): Matrix => {
    const values = Array(matrix.cols).fill(null).map((_, i) => 
      Array(matrix.rows).fill(null).map((_, j) => matrix.values[j][i])
    );
    
    const newSteps = [
      `Transposing matrix ${matrix.name}`,
      'Swapping rows and columns...',
      `Result: ${matrix.cols}×${matrix.rows} matrix`
    ];
    
    setSteps(newSteps);
    
    return {
      id: 'result',
      name: `${matrix.name}ᵀ`,
      values,
      rows: matrix.cols,
      cols: matrix.rows
    };
  };

  const calculateDeterminant = (matrix: Matrix): number | null => {
    if (matrix.rows !== matrix.cols) return null;
    
    const size = matrix.rows;
    const values = matrix.values;
    
    if (size === 1) {
      return values[0][0];
    }
    
    if (size === 2) {
      const det = values[0][0] * values[1][1] - values[0][1] * values[1][0];
      const newSteps = [
        `Calculating determinant of 2×2 matrix ${matrix.name}`,
        `det(${matrix.name}) = (${values[0][0]})(${values[1][1]}) - (${values[0][1]})(${values[1][0]})`,
        `det(${matrix.name}) = ${det}`
      ];
      setSteps(newSteps);
      return det;
    }
    
    // For larger matrices, use cofactor expansion (simplified)
    let det = 0;
    for (let i = 0; i < size; i++) {
      const minor = getMinor(values, 0, i);
      const cofactor = Math.pow(-1, i) * values[0][i] * determinant(minor);
      det += cofactor;
    }
    
    return det;
  };

  const getMinor = (matrix: number[][], row: number, col: number): number[][] => {
    return matrix
      .filter((_, i) => i !== row)
      .map(row => row.filter((_, j) => j !== col));
  };

  const determinant = (matrix: number[][]): number => {
    const size = matrix.length;
    
    if (size === 1) return matrix[0][0];
    if (size === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    
    let det = 0;
    for (let i = 0; i < size; i++) {
      const minor = getMinor(matrix, 0, i);
      det += Math.pow(-1, i) * matrix[0][i] * determinant(minor);
    }
    
    return det;
  };

  const performOperation = () => {
    const matrix1 = matrices.find(m => m.id === selectedMatrices[0]);
    const matrix2 = matrices.find(m => m.id === selectedMatrices[1]);
    
    if (!matrix1) return;
    
    let newResult: Matrix | null = null;
    
    switch (selectedOperation) {
      case 'add':
        if (matrix2) {
          newResult = addMatrices(matrix1, matrix2);
        }
        break;
      case 'multiply':
        if (matrix2) {
          newResult = multiplyMatrices(matrix1, matrix2);
        }
        break;
      case 'transpose':
        newResult = transposeMatrix(matrix1);
        break;
      case 'determinant':
        const det = calculateDeterminant(matrix1);
        if (det !== null) {
          setResult({
            id: 'result',
            name: `det(${matrix1.name})`,
            values: [[det]],
            rows: 1,
            cols: 1
          });
          return;
        }
        break;
    }
    
    if (newResult) {
      setResult(newResult);
    }
  };

  const MatrixDisplay: React.FC<{ matrix: Matrix; editable?: boolean }> = ({ matrix, editable = false }) => (
    <div className="border rounded-lg p-4">
      <h4 className="font-medium text-primary mb-2 text-center">{matrix.name}</h4>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${matrix.cols}, 1fr)` }}>
        {matrix.values.map((row, i) => 
          row.map((value, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={value}
              onChange={(e) => editable && updateMatrixValue(matrix.id, i, j, parseFloat(e.target.value) || 0)}
              className={`w-16 h-12 text-center border rounded ${editable ? 'bg-white' : 'bg-neutral-50'}`}
              readOnly={!editable}
            />
          ))
        )}
      </div>
      <div className="text-xs text-secondary text-center mt-2">
        {matrix.rows}×{matrix.cols}
      </div>
    </div>
  );

  return (
    <div className="p-6 h-full">
      {/* Tutorial Components */}
      {tutorial && (
        <>
          <TutorialWelcome
            appName="Matrix Playground"
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
                <Grid3X3 size={18} />
                Operations
              </h3>
              <button
                onClick={openTutorial}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                title="Show Tutorial"
              >
                <HelpCircle size={16} className="text-accent" />
              </button>
            </div>
            
            {/* Operation Selection */}
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">Operation</label>
              <select
                value={selectedOperation}
                onChange={(e) => setSelectedOperation(e.target.value as any)}
                className="w-full p-2 border rounded"
              >
                <option value="add">Addition (A + B)</option>
                <option value="multiply">Multiplication (A × B)</option>
                <option value="transpose">Transpose (Aᵀ)</option>
                <option value="determinant">Determinant (det A)</option>
                <option value="inverse">Inverse (A⁻¹)</option>
              </select>
            </div>
            
            {/* Matrix Selection */}
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">Select Matrix A</label>
              <select
                value={selectedMatrices[0] || ''}
                onChange={(e) => setSelectedMatrices([e.target.value, selectedMatrices[1]])}
                className="w-full p-2 border rounded"
              >
                {matrices.map(matrix => (
                  <option key={matrix.id} value={matrix.id}>
                    {matrix.name} ({matrix.rows}×{matrix.cols})
                  </option>
                ))}
              </select>
            </div>
            
            {(selectedOperation === 'add' || selectedOperation === 'multiply') && (
              <div className="mb-4">
                <label className="block text-sm text-secondary mb-2">Select Matrix B</label>
                <select
                  value={selectedMatrices[1] || ''}
                  onChange={(e) => setSelectedMatrices([selectedMatrices[0], e.target.value])}
                  className="w-full p-2 border rounded"
                >
                  {matrices.map(matrix => (
                    <option key={matrix.id} value={matrix.id}>
                      {matrix.name} ({matrix.rows}×{matrix.cols})
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <button
              onClick={performOperation}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <Calculator size={16} />
              Calculate
            </button>
          </div>
          
          {/* Add Matrix */}
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Add Matrix</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-secondary mb-1">Rows</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    defaultValue="2"
                    id="new-rows"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-secondary mb-1">Cols</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    defaultValue="2"
                    id="new-cols"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Name</label>
                <input
                  type="text"
                  placeholder="C"
                  id="new-name"
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={() => {
                  const rowsInput = document.getElementById('new-rows') as HTMLInputElement;
                  const colsInput = document.getElementById('new-cols') as HTMLInputElement;
                  const nameInput = document.getElementById('new-name') as HTMLInputElement;
                  
                  const rows = parseInt(rowsInput.value) || 2;
                  const cols = parseInt(colsInput.value) || 2;
                  const name = nameInput.value || `M${matrices.length + 1}`;
                  
                  createMatrix(rows, cols, name);
                  
                  rowsInput.value = '2';
                  colsInput.value = '2';
                  nameInput.value = '';
                }}
                className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2"
              >
                <Plus size={14} />
                Add Matrix
              </button>
            </div>
          </div>
          
          {/* Steps */}
          {steps.length > 0 && (
            <div className="card p-4">
              <h4 className="font-medium text-primary mb-3">Steps</h4>
              <div className="space-y-1">
                {steps.map((step, index) => (
                  <div key={index} className="text-sm text-secondary">
                    {index + 1}. {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Matrix Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <h3 className="text-lg font-semibold text-primary mb-4">Matrix Playground</h3>
            
            {/* Matrices Grid */}
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 mb-6">
              {matrices.map(matrix => (
                <MatrixDisplay key={matrix.id} matrix={matrix} editable />
              ))}
            </div>
            
            {/* Result */}
            {result && (
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-primary mb-4">Result</h4>
                <div className="flex justify-center">
                  <MatrixDisplay matrix={result} />
                </div>
              </div>
            )}
            
            {matrices.length === 0 && (
              <div className="text-center py-12 text-neutral-400">
                <Grid3X3 size={48} className="mx-auto mb-4" />
                <p>Add matrices to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};