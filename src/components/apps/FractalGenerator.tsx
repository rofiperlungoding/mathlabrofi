import React, { useState, useEffect, useRef } from 'react';
import { Snowflake, Palette, Download, RotateCcw } from 'lucide-react';

export const FractalGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fractalType, setFractalType] = useState<'mandelbrot' | 'julia' | 'sierpinski' | 'koch'>('mandelbrot');
  const [iterations, setIterations] = useState(100);
  const [zoom, setZoom] = useState(1);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [colorScheme, setColorScheme] = useState<'classic' | 'fire' | 'ocean' | 'psychedelic'>('classic');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Julia set parameters
  const [juliaC, setJuliaC] = useState({ real: -0.7, imag: 0.27015 });

  const generateMandelbrot = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    
    const scale = 4 / zoom;
    const offsetX = centerX;
    const offsetY = centerY;
    
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const real = (x - width / 2) * scale / width + offsetX;
        const imag = (y - height / 2) * scale / height + offsetY;
        
        let zReal = 0;
        let zImag = 0;
        let iteration = 0;
        
        while (iteration < iterations && zReal * zReal + zImag * zImag < 4) {
          const temp = zReal * zReal - zImag * zImag + real;
          zImag = 2 * zReal * zImag + imag;
          zReal = temp;
          iteration++;
        }
        
        const color = getColor(iteration, iterations, colorScheme);
        const index = (y * width + x) * 4;
        
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  const generateJulia = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    
    const scale = 4 / zoom;
    const offsetX = centerX;
    const offsetY = centerY;
    
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let zReal = (x - width / 2) * scale / width + offsetX;
        let zImag = (y - height / 2) * scale / height + offsetY;
        
        let iteration = 0;
        
        while (iteration < iterations && zReal * zReal + zImag * zImag < 4) {
          const temp = zReal * zReal - zImag * zImag + juliaC.real;
          zImag = 2 * zReal * zImag + juliaC.imag;
          zReal = temp;
          iteration++;
        }
        
        const color = getColor(iteration, iterations, colorScheme);
        const index = (y * width + x) * 4;
        
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  const generateSierpinski = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    //  Sierpinski triangle using chaos game
    const points = [
      { x: width / 2, y: 50 },
      { x: 50, y: height - 50 },
      { x: width - 50, y: height - 50 }
    ];
    
    let currentX = Math.random() * width;
    let currentY = Math.random() * height;
    
    ctx.fillStyle = getColorString(50, iterations, colorScheme);
    
    for (let i = 0; i < iterations * 100; i++) {
      const targetPoint = points[Math.floor(Math.random() * 3)];
      currentX = (currentX + targetPoint.x) / 2;
      currentY = (currentY + targetPoint.y) / 2;
      
      ctx.fillRect(currentX, currentY, 1, 1);
    }
  };

  const generateKoch = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = getColorString(50, iterations, colorScheme);
    ctx.lineWidth = 1;
    
    const depth = Math.min(iterations / 20, 6);
    
    // Koch snowflake
    const side = Math.min(width, height) * 0.6;
    const centerX = width / 2;
    const centerY = height / 2;
    
    const points = [
      { x: centerX - side / 2, y: centerY + side / (2 * Math.sqrt(3)) },
      { x: centerX + side / 2, y: centerY + side / (2 * Math.sqrt(3)) },
      { x: centerX, y: centerY - side / Math.sqrt(3) }
    ];
    
    for (let i = 0; i < 3; i++) {
      const start = points[i];
      const end = points[(i + 1) % 3];
      drawKochLine(ctx, start.x, start.y, end.x, end.y, depth);
    }
  };

  const drawKochLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, depth: number) => {
    if (depth === 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      return;
    }
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    const x3 = x1 + dx / 3;
    const y3 = y1 + dy / 3;
    
    const x4 = x1 + 2 * dx / 3;
    const y4 = y1 + 2 * dy / 3;
    
    const x5 = x3 + (x4 - x3) * Math.cos(Math.PI / 3) - (y4 - y3) * Math.sin(Math.PI / 3);
    const y5 = y3 + (x4 - x3) * Math.sin(Math.PI / 3) + (y4 - y3) * Math.cos(Math.PI / 3);
    
    drawKochLine(ctx, x1, y1, x3, y3, depth - 1);
    drawKochLine(ctx, x3, y3, x5, y5, depth - 1);
    drawKochLine(ctx, x5, y5, x4, y4, depth - 1);
    drawKochLine(ctx, x4, y4, x2, y2, depth - 1);
  };

  const getColor = (iteration: number, maxIterations: number, scheme: string) => {
    if (iteration === maxIterations) {
      return { r: 0, g: 0, b: 0 };
    }
    
    const t = iteration / maxIterations;
    
    switch (scheme) {
      case 'fire':
        return {
          r: Math.floor(255 * Math.min(1, t * 2)),
          g: Math.floor(255 * Math.max(0, t * 2 - 1)),
          b: 0
        };
      case 'ocean':
        return {
          r: 0,
          g: Math.floor(255 * t),
          b: Math.floor(255 * (1 - t))
        };
      case 'psychedelic':
        return {
          r: Math.floor(255 * (0.5 + 0.5 * Math.sin(t * Math.PI * 6))),
          g: Math.floor(255 * (0.5 + 0.5 * Math.sin(t * Math.PI * 6 + 2))),
          b: Math.floor(255 * (0.5 + 0.5 * Math.sin(t * Math.PI * 6 + 4)))
        };
      default: // classic
        return {
          r: Math.floor(255 * t),
          g: Math.floor(255 * t * 0.7),
          b: Math.floor(255 * (1 - t))
        };
    }
  };

  const getColorString = (iteration: number, maxIterations: number, scheme: string) => {
    const color = getColor(iteration, maxIterations, scheme);
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };

  const generateFractal = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsGenerating(true);
    
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      switch (fractalType) {
        case 'mandelbrot':
          generateMandelbrot(canvas, ctx);
          break;
        case 'julia':
          generateJulia(canvas, ctx);
          break;
        case 'sierpinski':
          generateSierpinski(canvas, ctx);
          break;
        case 'koch':
          generateKoch(canvas, ctx);
          break;
      }
      setIsGenerating(false);
    }, 10);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const scale = 4 / zoom;
    const newCenterX = (x - canvas.width / 2) * scale / canvas.width + centerX;
    const newCenterY = (y - canvas.height / 2) * scale / canvas.height + centerY;
    
    setCenterX(newCenterX);
    setCenterY(newCenterY);
    setZoom(zoom * 2);
  };

  const resetView = () => {
    setCenterX(0);
    setCenterY(0);
    setZoom(1);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `fractal-${fractalType}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    generateFractal();
  }, [fractalType, iterations, zoom, centerX, centerY, colorScheme, juliaC]);

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6 h-full">
        {/* Control Panel */}
        <div className="desktop:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Snowflake size={18} />
              Fractal Type
            </h3>
            
            <div className="space-y-2">
              {[
                { value: 'mandelbrot', label: 'Mandelbrot Set' },
                { value: 'julia', label: 'Julia Set' },
                { value: 'sierpinski', label: 'Sierpinski Triangle' },
                { value: 'koch', label: 'Koch Snowflake' }
              ].map((type) => (
                <label key={type.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fractalType"
                    value={type.value}
                    checked={fractalType === type.value}
                    onChange={(e) => setFractalType(e.target.value as any)}
                    className="dark:bg-neutral-700 dark:border-neutral-600"
                  />
                  <span className="text-sm dark:text-neutral-300">{type.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Parameters</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondary mb-1">
                  Iterations: {iterations}
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={iterations}
                  onChange={(e) => setIterations(parseInt(e.target.value))}
                  className="w-full dark:bg-neutral-700"
                />
              </div>
              
              <div>
                <label className="block text-sm text-secondary mb-1">
                  Zoom: {zoom.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1000"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full dark:bg-neutral-700"
                />
              </div>
              
              {fractalType === 'julia' && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-secondary mb-1">
                      C Real: {juliaC.real.toFixed(3)}
                    </label>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.001"
                      value={juliaC.real}
                      onChange={(e) => setJuliaC({...juliaC, real: parseFloat(e.target.value)})}
                      className="w-full dark:bg-neutral-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">
                      C Imaginary: {juliaC.imag.toFixed(3)}
                    </label>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.001"
                      value={juliaC.imag}
                      onChange={(e) => setJuliaC({...juliaC, imag: parseFloat(e.target.value)})}
                      className="w-full dark:bg-neutral-700"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
              <Palette size={16} />
              Colors
            </h4>
            
            <div className="space-y-2">
              {[
                { value: 'classic', label: 'Classic' },
                { value: 'fire', label: 'Fire' },
                { value: 'ocean', label: 'Ocean' },
                { value: 'psychedelic', label: 'Psychedelic' }
              ].map((scheme) => (
                <label key={scheme.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="colorScheme"
                    value={scheme.value}
                    checked={colorScheme === scheme.value}
                    onChange={(e) => setColorScheme(e.target.value as any)}
                    className="dark:bg-neutral-700 dark:border-neutral-600"
                  />
                  <span className="text-sm dark:text-neutral-300">{scheme.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="card p-4">
            <h4 className="font-medium text-primary mb-3">Actions</h4>
            <div className="space-y-2">
              <button
                onClick={resetView}
                className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                Reset View
              </button>
              <button
                onClick={downloadImage}
                className="btn btn-secondary w-full text-sm flex items-center justify-center gap-2"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        </div>
        
        {/* Fractal Display */}
        <div className="desktop:col-span-3">
          <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Fractal Generator</h3>
              <div className="text-sm text-secondary">
                {isGenerating ? 'Generating...' : 'Click to zoom in'}
              </div>
            </div>
            
            <div className="bg-white dark:bg-neutral-850 border rounded-lg p-4 h-full flex items-center justify-center dark:border-neutral-700 overflow-auto">
              <div className="w-full flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={400}
                  className="border rounded cursor-crosshair max-w-full mx-auto dark:border-neutral-700"
                  onClick={handleCanvasClick}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            
            <div className="mt-4 text-sm text-secondary">
              <div className="grid grid-cols-2 gap-4 justify-center">
                <div className="text-center">
                  <span className="font-medium dark:text-neutral-300">Center:</span> ({centerX.toFixed(3)}, {centerY.toFixed(3)})
                </div>
                <div className="text-center">
                  <span className="font-medium dark:text-neutral-300">Zoom:</span> {zoom.toFixed(1)}x
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};