import React, { useState, useEffect } from 'react';
import { Dice6, Play, RotateCcw, BarChart3, HelpCircle } from 'lucide-react';
import { TutorialOverlay, TutorialWelcome } from '../TutorialOverlay';
import { getTutorial } from '../../data/tutorials';
import { useTutorial } from '../../hooks/useTutorial';

interface SimulationResult {
  trial: number;
  outcome: any;
  timestamp: Date;
}

export const ProbabilitySimulator: React.FC = () => {
  const [selectedSimulation, setSelectedSimulation] = useState<'dice' | 'coin' | 'monty-hall'>('dice');
  const [numTrials, setNumTrials] = useState(100);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(10); // ms between trials
  
  // Dice specific state
  const [numDice, setNumDice] = useState(2);
  const [targetSum, setTargetSum] = useState(7);
  
  // Monty Hall specific state
  const [montyHallStrategy, setMontyHallStrategy] = useState<'stay' | 'switch'>('switch');

  // Tutorial integration
  const {
    showWelcome,
    showTutorial,
    acceptTutorial,
    declineTutorial,
    closeTutorial,
    openTutorial
  } = useTutorial('probability-simulator');

  const tutorial = getTutorial('probability-simulator');
  
  const runSimulation = async () => {
    setIsRunning(true);
    setResults([]);
    
    const newResults: SimulationResult[] = [];
    
    for (let i = 0; i < numTrials; i++) {
      let outcome: any;
      
      switch (selectedSimulation) {
        case 'dice':
          const dice = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
          const sum = dice.reduce((a, b) => a + b, 0);
          outcome = { dice, sum, isTarget: sum === targetSum };
          break;
          
        case 'coin':
          outcome = { result: Math.random() < 0.5 ? 'heads' : 'tails' };
          break;
          
        case 'monty-hall':
          // Simulate Monty Hall problem
          const doors = [0, 1, 2];
          const carDoor = Math.floor(Math.random() * 3);
          const playerChoice = Math.floor(Math.random() * 3);
          
          // Monty opens a door (not car, not player's choice)
          const availableDoors = doors.filter(d => d !== carDoor && d !== playerChoice);
          const montyOpens = availableDoors[Math.floor(Math.random() * availableDoors.length)];
          
          // Player's final choice based on strategy
          const finalChoice = montyHallStrategy === 'stay' 
            ? playerChoice 
            : doors.find(d => d !== playerChoice && d !== montyOpens)!;
            
          const won = finalChoice === carDoor;
          outcome = { carDoor, playerChoice, montyOpens, finalChoice, won, strategy: montyHallStrategy };
          break;
      }
      
      const result: SimulationResult = {
        trial: i + 1,
        outcome,
        timestamp: new Date()
      };
      
      newResults.push(result);
      setResults([...newResults]);
      
      // Add delay for visualization
      if (speed > 0) {
        await new Promise(resolve => setTimeout(resolve, Math.max(1, 100 - speed)));
      }
    }
    
    setIsRunning(false);
  };
  
  const resetSimulation = () => {
    setResults([]);
    setIsRunning(false);
  };
  
  const getStatistics = () => {
    if (results.length === 0) return null;
    
    let theoretical: number;
    
    switch (selectedSimulation) {
      case 'dice':
        const targetHits = results.filter(r => r.outcome.isTarget).length;
        const probability = targetHits / results.length;
        theoretical = getDiceProbability(numDice, targetSum);
        return {
          actual: probability,
          theoretical,
          description: `P(sum = ${targetSum}) with ${numDice} dice`
        };
        
      case 'coin':
        const heads = results.filter(r => r.outcome.result === 'heads').length;
        theoretical = 0.5;
        return {
          actual: heads / results.length,
          theoretical,
          description: 'P(heads)'
        };
        
      case 'monty-hall':
        const wins = results.filter(r => r.outcome.won).length;
        theoretical = montyHallStrategy === 'switch' ? 2/3 : 1/3;
        return {
          actual: wins / results.length,
          theoretical,
          description: `P(win) with ${montyHallStrategy} strategy`
        };
        
      default:
        return null;
    }
  };
  
  const getDiceProbability = (numDice: number, target: number): number => {
    // Simplified calculation for demonstration
    if (numDice === 1) return target >= 1 && target <= 6 ? 1/6 : 0;
    if (numDice === 2) {
      const ways = Math.max(0, 6 - Math.abs(target - 7));
      return ways / 36;
    }
    // For more dice, this would need a more complex calculation
    return 0.1; // Placeholder
  };
  
  const getResultsDistribution = () => {
    const distribution: Record<string, number> = {};
    
    results.forEach(result => {
      let key: string;
      
      switch (selectedSimulation) {
        case 'dice':
          key = result.outcome.sum.toString();
          break;
        case 'coin':
          key = result.outcome.result;
          break;
        case 'monty-hall':
          key = result.outcome.won ? 'win' : 'lose';
          break;
        default:
          key = 'unknown';
      }
      
      distribution[key] = (distribution[key] || 0) + 1;
    });
    
    return distribution;
  };
  
  const statistics = getStatistics();
  const distribution = getResultsDistribution();

  return (
    <div className="p-6 h-full">
      {/* Tutorial Components */}
      {tutorial && (
        <>
          <TutorialWelcome
            appName="Probability Simulator"
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
                <Dice6 size={18} />
                Simulation
              </h3>
              <button
                onClick={openTutorial}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                title="Show Tutorial"
              >
                <HelpCircle size={16} className="text-accent" />
              </button>
            </div>
            
            {/* Simulation Type */}
            <div className="mb-4">
              <label className="block text-sm text-secondary mb-2">Type</label>
              <select
                value={selectedSimulation}
                onChange={(e) => setSelectedSimulation(e.target.value as any)}
                className="w-full p-2 border rounded"
              >
                <option value="dice">Dice Roll</option>
                <option value="coin">Coin Flip</option>
                <option value="monty-hall">Monty Hall</option>
              </select>
            </div>
            
            {/* Simulation-specific controls */}
            {selectedSimulation === 'dice' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-secondary mb-1">Number of Dice</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={numDice}
                    onChange={(e) => setNumDice(parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary mb-1">Target Sum</label>
                  <input
                    type="number"
                    min={numDice}
                    max={numDice * 6}
                    value={targetSum}
                    onChange={(e) => setTargetSum(parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}
            
            {selectedSimulation === 'monty-hall' && (
              <div>
                <label className="block text-sm text-secondary mb-2">Strategy</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="strategy"
                      value="stay"
                      checked={montyHallStrategy === 'stay'}
                      onChange={(e) => setMontyHallStrategy('stay')}
                    />
                    <span className="text-sm">Stay with original choice</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="strategy"
                      value="switch"
                      checked={montyHallStrategy === 'switch'}
                      onChange={(e) => setMontyHallStrategy('switch')}
                    />
                    <span className="text-sm">Switch doors</span>
                  </label>
                </div>
              </div>
            )}
            
            {/* Trial settings */}
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm text-secondary mb-1">Number of Trials</label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  value={numTrials}
                  onChange={(e) => setNumTrials(parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm text-secondary mb-1">Speed</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-secondary">
                  {speed === 0 ? 'Instant' : speed < 50 ? 'Slow' : 'Fast'}
                </div>
              </div>
            </div>
            
            {/* Control buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Play size={16} />
                {isRunning ? 'Running...' : 'Run Simulation'}
              </button>
              
              <button
                onClick={resetSimulation}
                className="btn btn-secondary w-full flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>
          
          {/* Statistics */}
          {statistics && (
            <div className="card p-4">
              <h4 className="font-medium text-primary mb-3">Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Trials:</span>
                  <span className="font-mono">{results.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Actual:</span>
                  <span className="font-mono">{(statistics.actual * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Theoretical:</span>
                  <span className="font-mono">{(statistics.theoretical * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Error:</span>
                  <span className="font-mono text-red-600">
                    {Math.abs((statistics.actual - statistics.theoretical) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Results</h3>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <BarChart3 size={16} />
                {results.length} / {numTrials} trials
              </div>
            </div>
            
            {/* Progress bar */}
            {isRunning && (
              <div className="mb-4">
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-100"
                    style={{ width: `${(results.length / numTrials) * 100}%` }}
                  />
                </div>
              </div>
            )}
            
            {/* Distribution Chart */}
            {Object.keys(distribution).length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-primary mb-3">Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(distribution).map(([key, count]) => {
                    const percentage = (count / results.length) * 100;
                    return (
                      <div key={key} className="flex items-center gap-3">
                        <div className="w-16 text-sm text-secondary">{key}</div>
                        <div className="flex-1 bg-neutral-200 rounded-full h-4 relative">
                          <div 
                            className="bg-accent h-4 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Recent Results */}
            {results.length > 0 && (
              <div>
                <h4 className="font-medium text-primary mb-3">Recent Results</h4>
                <div className="max-h-64 overflow-y-auto">
                  <div className="space-y-1">
                    {results.slice(-20).reverse().map((result, index) => (
                      <div key={result.trial} className="text-sm p-2 bg-neutral-50 rounded flex justify-between">
                        <span className="text-secondary">Trial {result.trial}:</span>
                        <span className="font-mono">
                          {selectedSimulation === 'dice' && 
                            `${result.outcome.dice.join(', ')} (sum: ${result.outcome.sum}) ${result.outcome.isTarget ? '✓' : ''}`
                          }
                          {selectedSimulation === 'coin' && result.outcome.result}
                          {selectedSimulation === 'monty-hall' && 
                            `${result.outcome.won ? 'WIN' : 'LOSE'} (${result.outcome.strategy})`
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {results.length === 0 && !isRunning && (
              <div className="text-center py-12 text-neutral-400">
                <Dice6 size={48} className="mx-auto mb-4" />
                <p>Click "Run Simulation" to begin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};