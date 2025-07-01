import React, { useState, useEffect } from 'react';
import { Hash, Search, Filter } from 'lucide-react';

export const PrimeNumberExplorer: React.FC = () => {
  const [maxNumber, setMaxNumber] = useState(100);
  const [primes, setPrimes] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'spiral' | 'sieve'>('grid');
  const [showFactorization, setShowFactorization] = useState(false);

  useEffect(() => {
    generatePrimes(maxNumber);
  }, [maxNumber]);

  const generatePrimes = (limit: number) => {
    const sieve = new Array(limit + 1).fill(true);
    sieve[0] = sieve[1] = false;
    
    for (let i = 2; i * i <= limit; i++) {
      if (sieve[i]) {
        for (let j = i * i; j <= limit; j += i) {
          sieve[j] = false;
        }
      }
    }
    
    const primeNumbers = [];
    for (let i = 2; i <= limit; i++) {
      if (sieve[i]) {
        primeNumbers.push(i);
      }
    }
    
    setPrimes(primeNumbers);
  };

  const isPrime = (n: number): boolean => {
    return primes.includes(n);
  };

  const factorize = (n: number): number[] => {
    const factors = [];
    let temp = n;
    
    for (let i = 2; i <= Math.sqrt(temp); i++) {
      while (temp % i === 0) {
        factors.push(i);
        temp /= i;
      }
    }
    
    if (temp > 1) {
      factors.push(temp);
    }
    
    return factors;
  };

  const getUlamSpiralPosition = (n: number, size: number): { x: number, y: number } => {
    if (n === 1) return { x: Math.floor(size / 2), y: Math.floor(size / 2) };
    
    let x = Math.floor(size / 2);
    let y = Math.floor(size / 2);
    let dx = 0, dy = -1;
    let steps = 1;
    let stepCount = 0;
    let sideCount = 0;
    
    for (let i = 2; i <= n; i++) {
      x += dx;
      y += dy;
      stepCount++;
      
      if (stepCount === steps) {
        stepCount = 0;
        sideCount++;
        
        // Turn right
        const temp = dx;
        dx = -dy;
        dy = temp;
        
        if (sideCount === 2) {
          sideCount = 0;
          steps++;
        }
      }
    }
    
    return { x, y };
  };

  const renderGridView = () => {
    const gridSize = Math.ceil(Math.sqrt(maxNumber));
    const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
    
    return (
      <div className="grid gap-1 justify-center" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(2rem, 2.5rem))` }}>
        {numbers.slice(0, Math.min(400, maxNumber)).map((num) => (
          <button
            key={num}
            onClick={() => setSelectedNumber(num)}
            className={`w-8 h-8 text-xs rounded flex items-center justify-center transition-colors ${
              isPrime(num)
                ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500'
                : num === 1
                ? 'bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
            } ${selectedNumber === num ? 'ring-2 ring-accent dark:ring-blue-400' : ''}`}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  const renderSpiralView = () => {
    const spiralSize = Math.min(20, Math.ceil(Math.sqrt(maxNumber)));
    const grid = Array(spiralSize).fill(null).map(() => Array(spiralSize).fill(0));
    
    for (let i = 1; i <= Math.min(spiralSize * spiralSize, maxNumber); i++) {
      const pos = getUlamSpiralPosition(i, spiralSize);
      if (pos.x >= 0 && pos.x < spiralSize && pos.y >= 0 && pos.y < spiralSize) {
        grid[pos.y][pos.x] = i;
      }
    }
    
    return (
      <div className="grid gap-1 justify-center" style={{ gridTemplateColumns: `repeat(${spiralSize}, 1fr)` }}>
        {grid.flat().map((num, index) => (
          <button
            key={index}
            onClick={() => num > 0 && setSelectedNumber(num)}
            className={`w-8 h-8 text-xs rounded flex items-center justify-center transition-colors ${
              num > 0 && isPrime(num)
                ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500'
                : num === 1
                ? 'bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                : num > 0
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
                : 'bg-transparent'
            } ${selectedNumber === num ? 'ring-2 ring-accent dark:ring-blue-400' : ''}`}
          >
            {num > 0 ? num : ''}
          </button>
        ))}
      </div>
    );
  };

  const renderSieveView = () => {
    const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
    
    // Show sieve process for first few primes
    const firstPrimes = primes.slice(0, 5);
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-secondary mb-4 dark:text-neutral-400">
          Sieve of Eratosthenes - showing multiples being eliminated:
        </div>
        
        {firstPrimes.map((prime, index) => (
          <div key={prime} className="space-y-2">
            <div className="text-sm font-medium text-primary dark:text-white">
              Step {index + 1}: Mark multiples of {prime}
            </div>
            <div className="grid gap-1 justify-center" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(1.5rem, 1.5rem))` }}>
              {numbers.slice(0, Math.min(100, maxNumber)).map((num) => {
                const isMultiple = num > prime && num % prime === 0;
                const isPrimeNum = isPrime(num);
                const isCurrentPrime = num === prime;
                
                return (
                  <div
                    key={num}
                    className={`w-6 h-6 text-xs rounded flex items-center justify-center ${
                      isCurrentPrime
                        ? 'bg-green-500 text-white dark:bg-green-600'
                        : isPrimeNum
                        ? 'bg-blue-500 text-white dark:bg-blue-600'
                        : isMultiple
                        ? 'bg-red-200 text-red-800 line-through dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const factors = selectedNumber ? factorize(selectedNumber) : [];

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Hash size={18} />
              Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondary mb-2">
                  Max Number: {maxNumber}
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(parseInt(e.target.value))}
                  className="w-full dark:bg-neutral-700"
                />
              </div>

              <div>
                <label className="block text-sm text-secondary mb-2">View Mode</label>
                <div className="space-y-2">
                  {[
                    { value: 'grid', label: 'Grid View' },
                    { value: 'spiral', label: 'Ulam Spiral' },
                    { value: 'sieve', label: 'Sieve Process' }
                  ].map((mode) => (
                    <label key={mode.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="viewMode"
                        value={mode.value}
                        checked={viewMode === mode.value}
                        onChange={(e) => setViewMode(e.target.value as any)}
                        className="dark:bg-neutral-700 dark:border-neutral-600"
                      />
                      <span className="text-sm dark:text-neutral-300">{mode.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Range:</span>
                <span className="font-mono dark:text-white">1 - {maxNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Primes found:</span>
                <span className="font-mono dark:text-white">{primes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Density:</span>
                <span className="font-mono dark:text-white">{((primes.length / maxNumber) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Largest prime:</span>
                <span className="font-mono dark:text-white">{primes[primes.length - 1] || 'N/A'}</span>
              </div>
            </div>
          </div>

          {selectedNumber && (
            <div className="card p-4">
              <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
                <Search size={16} />
                Number: {selectedNumber}
              </h4>
              
              <div className="space-y-3">
                <div className={`p-3 rounded-lg ${
                  isPrime(selectedNumber) 
                    ? 'bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
                    : 'bg-gray-50 border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700'
                }`}>
                  <div className="font-medium dark:text-white">
                    {isPrime(selectedNumber) ? '✓ Prime Number' : '✗ Composite Number'}
                  </div>
                </div>

                {!isPrime(selectedNumber) && selectedNumber > 1 && (
                  <div>
                    <h5 className="text-sm font-medium text-primary mb-2 dark:text-white">Prime Factorization</h5>
                    <div className="bg-white dark:bg-neutral-800 p-3 rounded border dark:border-neutral-700">
                      <div className="font-mono text-sm dark:text-white">
                        {selectedNumber} = {factors.join(' × ')}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h5 className="text-sm font-medium text-primary mb-2 dark:text-white">Properties</h5>
                  <div className="text-xs text-secondary space-y-1 dark:text-neutral-300">
                    <div>Even: {selectedNumber % 2 === 0 ? 'Yes' : 'No'}</div>
                    <div>Perfect Square: {Math.sqrt(selectedNumber) % 1 === 0 ? 'Yes' : 'No'}</div>
                    <div>Divisors: {Array.from({length: selectedNumber}, (_, i) => i + 1).filter(i => selectedNumber % i === 0).length}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Visualization */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Prime Number Visualization</h3>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Filter size={16} />
                {viewMode === 'grid' && 'Grid Layout'}
                {viewMode === 'spiral' && 'Ulam Spiral'}
                {viewMode === 'sieve' && 'Sieve of Eratosthenes'}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 h-full overflow-auto dark:border-neutral-700">
              <div className="flex justify-center mb-4">
                {viewMode === 'grid' && renderGridView()}
                {viewMode === 'spiral' && renderSpiralView()}
                {viewMode === 'sieve' && renderSieveView()}
              </div>
            </div>

            <div className="mt-4 text-sm text-secondary">
              <div className="flex flex-wrap items-center gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 dark:bg-blue-600 rounded"></div>
                  <span>Prime Numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 dark:bg-neutral-700 border rounded"></div>
                  <span>Composite Numbers</span>
                </div>
                {viewMode === 'sieve' && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-200 dark:bg-red-900/30 rounded"></div>
                    <span>Eliminated (Multiples)</span>
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