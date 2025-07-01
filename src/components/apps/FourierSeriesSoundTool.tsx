import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Volume2, Pause } from 'lucide-react';

interface Harmonic {
  frequency: number;
  amplitude: number;
  phase: number;
}

export const FourierSeriesSoundTool: React.FC = () => {
  const [harmonics, setHarmonics] = useState<Harmonic[]>([
    { frequency: 1, amplitude: 1, phase: 0 },
    { frequency: 3, amplitude: 0.3, phase: 0 },
    { frequency: 5, amplitude: 0.2, phase: 0 },
    { frequency: 7, amplitude: 0.1, phase: 0 }
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWave, setSelectedWave] = useState<'square' | 'sawtooth' | 'triangle' | 'custom'>('square');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  const generateFourierCoefficients = (waveType: string) => {
    switch (waveType) {
      case 'square':
        return [
          { frequency: 1, amplitude: 1, phase: 0 },
          { frequency: 3, amplitude: 1/3, phase: 0 },
          { frequency: 5, amplitude: 1/5, phase: 0 },
          { frequency: 7, amplitude: 1/7, phase: 0 },
          { frequency: 9, amplitude: 1/9, phase: 0 }
        ];
      case 'sawtooth':
        return [
          { frequency: 1, amplitude: 1, phase: 0 },
          { frequency: 2, amplitude: 1/2, phase: Math.PI },
          { frequency: 3, amplitude: 1/3, phase: 0 },
          { frequency: 4, amplitude: 1/4, phase: Math.PI },
          { frequency: 5, amplitude: 1/5, phase: 0 }
        ];
      case 'triangle':
        return [
          { frequency: 1, amplitude: 1, phase: 0 },
          { frequency: 3, amplitude: 1/9, phase: Math.PI },
          { frequency: 5, amplitude: 1/25, phase: 0 },
          { frequency: 7, amplitude: 1/49, phase: Math.PI }
        ];
      default:
        return harmonics;
    }
  };

  const updateHarmonic = (index: number, field: keyof Harmonic, value: number) => {
    const newHarmonics = [...harmonics];
    newHarmonics[index] = { ...newHarmonics[index], [field]: value };
    setHarmonics(newHarmonics);
  };

  const addHarmonic = () => {
    setHarmonics([...harmonics, { frequency: harmonics.length + 1, amplitude: 0.1, phase: 0 }]);
  };

  const removeHarmonic = (index: number) => {
    setHarmonics(harmonics.filter((_, i) => i !== index));
  };

  const playSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const ctx = audioContextRef.current;
    const baseFreq = 220; // A3

    oscillatorsRef.current = harmonics.map((harmonic) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.frequency.setValueAtTime(baseFreq * harmonic.frequency, ctx.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(harmonic.amplitude * 0.1, ctx.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start();
      
      return oscillator;
    });

    setIsPlaying(true);
  };

  const stopSound = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    oscillatorsRef.current = [];
    setIsPlaying(false);
  };

  const generateWavePoints = () => {
    const points = [];
    const width = 500;
    const height = 200;
    const centerY = height / 2;
    
    for (let x = 0; x <= width; x += 2) {
      const t = (x / width) * 4 * Math.PI;
      let y = 0;
      
      harmonics.forEach(harmonic => {
        y += harmonic.amplitude * Math.sin(harmonic.frequency * t + harmonic.phase);
      });
      
      y = centerY - (y * 50);
      points.push({ x, y });
    }
    
    return points;
  };

  const createPath = (points: Array<{x: number, y: number}>) => {
    if (points.length === 0) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return path;
  };

  const wavePoints = generateWavePoints();

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Music size={18} />
              Wave Type
            </h3>
            
            <div className="space-y-2 mb-4">
              {['square', 'sawtooth', 'triangle', 'custom'].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="waveType"
                    value={type}
                    checked={selectedWave === type}
                    onChange={(e) => {
                      setSelectedWave(e.target.value as any);
                      if (e.target.value !== 'custom') {
                        setHarmonics(generateFourierCoefficients(e.target.value));
                      }
                    }}
                    className="dark:bg-neutral-700 dark:border-neutral-600"
                  />
                  <span className="text-sm capitalize dark:text-neutral-300">{type} Wave</span>
                </label>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={isPlaying ? stopSound : playSound}
                className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'} flex-1 text-sm flex items-center justify-center gap-2`}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? 'Stop' : 'Play'}
              </button>
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Harmonics</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {harmonics.map((harmonic, index) => (
                <div key={index} className="border dark:border-neutral-700 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium dark:text-white">Harmonic {index + 1}</span>
                    <button
                      onClick={() => removeHarmonic(index)}
                      className="text-red-500 dark:text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-secondary mb-1">
                        Frequency: {harmonic.frequency}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={harmonic.frequency}
                        onChange={(e) => updateHarmonic(index, 'frequency', parseInt(e.target.value))}
                        className="w-full dark:bg-neutral-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-secondary mb-1">
                        Amplitude: {harmonic.amplitude.toFixed(2)}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={harmonic.amplitude}
                        onChange={(e) => updateHarmonic(index, 'amplitude', parseFloat(e.target.value))}
                        className="w-full dark:bg-neutral-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-secondary mb-1">
                        Phase: {(harmonic.phase * 180 / Math.PI).toFixed(0)}°
                      </label>
                      <input
                        type="range"
                        min="0"
                        max={2 * Math.PI}
                        step="0.1"
                        value={harmonic.phase}
                        onChange={(e) => updateHarmonic(index, 'phase', parseFloat(e.target.value))}
                        className="w-full dark:bg-neutral-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={addHarmonic}
              className="btn btn-secondary w-full text-sm mt-3"
            >
              Add Harmonic
            </button>
          </div>
        </div>

        {/* Visualization */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Fourier Series Visualization</h3>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Volume2 size={16} />
                {harmonics.length} harmonics
              </div>
            </div>

            <div className="space-y-6">
              {/* Composite Wave */}
              <div>
                <h4 className="font-medium text-primary mb-2">Composite Wave</h4>
                <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 dark:border-neutral-700 overflow-x-auto">
                  <div className="w-full flex justify-center">
                    <svg width="500" height="200" className="w-full max-w-full mx-auto" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
                      {/* Grid */}
                      <defs>
                        <pattern id="waveGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-neutral-700"/>
                        </pattern>
                      </defs>
                      <rect width="500" height="200" fill="url(#waveGrid)" />
                      
                      {/* Center line */}
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#9ca3af" strokeWidth="1" className="dark:stroke-neutral-600" />
                      
                      {/* Composite wave */}
                      <path
                        d={createPath(wavePoints)}
                        stroke="#4299e1"
                        strokeWidth="2"
                        fill="none"
                        className="dark:stroke-blue-500"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Individual Harmonics */}
              <div>
                <h4 className="font-medium text-primary mb-2">Individual Harmonics</h4>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  {harmonics.slice(0, 4).map((harmonic, index) => {
                    const harmonicPoints = [];
                    const width = 240;
                    const height = 120;
                    const centerY = height / 2;
                    
                    for (let x = 0; x <= width; x += 2) {
                      const t = (x / width) * 4 * Math.PI;
                      const y = centerY - (harmonic.amplitude * Math.sin(harmonic.frequency * t + harmonic.phase) * 30);
                      harmonicPoints.push({ x, y });
                    }
                    
                    return (
                      <div key={index} className="bg-white dark:bg-neutral-850 border rounded-lg p-3 dark:border-neutral-700">
                        <div className="text-sm font-medium text-secondary mb-2 dark:text-neutral-300">
                          Harmonic {index + 1} (f = {harmonic.frequency}, A = {harmonic.amplitude.toFixed(2)})
                        </div>
                        <svg width="240" height="120" className="w-full max-w-full mx-auto" viewBox="0 0 240 120" preserveAspectRatio="xMidYMid meet">
                          <line x1="0" y1="60" x2="240" y2="60" stroke="#d1d5db" strokeWidth="1" className="dark:stroke-neutral-600" />
                          <path
                            d={createPath(harmonicPoints)}
                            stroke="#ed8936"
                            strokeWidth="2"
                            fill="none"
                            className="dark:stroke-orange-500"
                          />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};