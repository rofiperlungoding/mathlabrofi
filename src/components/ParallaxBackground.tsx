import React, { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Parallax Layers */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {/* Layer 1 - Slowest */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
          }}
        />
        
        {/* Layer 2 - Medium */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            background: 'radial-gradient(ellipse at bottom right, rgba(147, 51, 234, 0.1) 0%, transparent 70%)'
          }}
        />
        
        {/* Layer 3 - Fastest */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            background: 'radial-gradient(ellipse at bottom left, rgba(236, 72, 153, 0.1) 0%, transparent 70%)'
          }}
        />

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 border border-white/20 rounded-full animate-pulse"
              style={{
                left: `${(i * 23) % 100}%`,
                top: `${(i * 37) % 100}%`,
                transform: `translateY(${scrollY * (0.1 + i * 0.02)}px) rotate(${scrollY * 0.05}deg)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
};