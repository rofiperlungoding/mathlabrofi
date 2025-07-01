import React, { useState } from 'react';
import { MathFormula } from './MathFormula';
import { Eye, Bookmark, Share2, Calculator, Sparkles } from 'lucide-react';
import { Formula } from '../types';

interface Formula3DCardProps {
  formula: Formula;
  onClick: () => void;
  index: number;
}

export const Formula3DCard: React.FC<Formula3DCardProps> = ({ formula, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    algebra: 'from-blue-500 to-blue-600',
    geometry: 'from-green-500 to-green-600',
    calculus: 'from-purple-500 to-purple-600',
    trigonometry: 'from-red-500 to-red-600',
    statistics: 'from-yellow-500 to-yellow-600',
    physics: 'from-indigo-500 to-indigo-600',
    chemistry: 'from-teal-500 to-teal-600',
    engineering: 'from-orange-500 to-orange-600',
    business: 'from-emerald-500 to-emerald-600',
    finance: 'from-cyan-500 to-cyan-600'
  };

  const gradientClass = categoryColors[formula.category as keyof typeof categoryColors] || 'from-neutral-500 to-neutral-600';

  return (
    <div
      className={`group relative cursor-pointer transition-all duration-500 ease-out ${
        isHovered 
          ? 'transform scale-105 translate-y-[-8px] z-10' 
          : 'transform scale-100 translate-y-0'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        perspective: '1000px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 3D Card Container */}
      <div className={`relative backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 ${
        isHovered 
          ? 'shadow-2xl ring-2 ring-white/50 bg-white/95' 
          : 'shadow-lg hover:shadow-xl'
      }`}>
        {/* Ambient Background Animation */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 transition-opacity duration-500 ${
          isHovered ? 'opacity-10' : 'opacity-5'
        }`} />
        
        {/* Floating Particles Effect */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        )}

        <div className="relative p-8">
          {/* Header with Category Badge */}
          <div className="flex items-start justify-between mb-6">
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${gradientClass} text-white text-xs font-bold uppercase tracking-wider shadow-lg transform transition-all duration-300 ${
              isHovered ? 'scale-110 shadow-xl' : 'scale-100'
            }`}>
              {formula.category}
            </div>
            
            {/* Floating Action Buttons */}
            <div className={`flex items-center gap-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <button className="p-2 rounded-full bg-white/60 hover:bg-white/80 text-neutral-600 hover:text-neutral-900 transition-all duration-200 hover:scale-110 shadow-md">
                <Bookmark size={14} />
              </button>
              <button className="p-2 rounded-full bg-white/60 hover:bg-white/80 text-neutral-600 hover:text-neutral-900 transition-all duration-200 hover:scale-110 shadow-md">
                <Share2 size={14} />
              </button>
            </div>
          </div>

          {/* Formula Title */}
          <h3 className={`text-xl font-bold text-neutral-900 mb-4 transition-all duration-300 ${
            isHovered ? 'text-neutral-700 scale-105' : 'text-neutral-900'
          }`}>
            {formula.name}
          </h3>

          {/* Formula Display */}
          <div className={`relative bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 rounded-xl p-6 mb-6 transition-all duration-500 ${
            isHovered ? 'transform scale-102 shadow-inner bg-white' : ''
          }`}>
            {/* Holographic Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-xl transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} />
            
            <div className="relative">
              <div className="formula-scroll overflow-x-auto">
                <MathFormula latex={formula.latex} displayMode />
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-neutral-600 mb-6 line-clamp-3 leading-relaxed">
            {formula.description}
          </p>

          {/* Stats and Indicators */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <div className="flex items-center gap-1">
                <Calculator size={12} />
                <span>{formula.variables.length} variables</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={12} />
                <span>{formula.examples.length} examples</span>
              </div>
            </div>
            
            {/* Enhanced Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium transition-all duration-300 ${
              isHovered ? 'scale-110 shadow-lg' : 'scale-100'
            }`}>
              <Sparkles size={10} />
              Enhanced
            </div>
          </div>
        </div>

        {/* 3D Edge Effect */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} transition-all duration-500 ${
          isHovered ? 'h-2 shadow-lg' : 'h-1'
        }`} />
      </div>

      {/* Floating Shadow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-2xl blur-xl transition-all duration-500 -z-10 ${
        isHovered ? 'opacity-30 scale-110' : 'opacity-10 scale-100'
      }`} />
    </div>
  );
};

// Add floating animation to global CSS
const floatingKeyframes = `
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg); 
    opacity: 1;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = floatingKeyframes;
  document.head.appendChild(style);
}