import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, MicOff, Sparkles, Zap, Calculator, Wand2 } from 'lucide-react';

interface SearchSuggestion {
  id: string;
  text: string;
  category: string;
  confidence: number;
  type: 'formula' | 'category' | 'concept';
}

interface CinematicSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect: (suggestion: string) => void;
  suggestions: SearchSuggestion[];
  placeholder?: string;
}

export const CinematicSearchBar: React.FC<CinematicSearchBarProps> = ({
  value,
  onChange,
  onSuggestionSelect,
  suggestions,
  placeholder = "Search mathematical formulas..."
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Particle animation state
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
  }>>([]);

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.5 + 0.1
    }));
    setParticles(initialParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    if (!isFocused) return;

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speed) % 100,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.3 + 0.4
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [isFocused]);

  // Voice search simulation
  const toggleVoiceSearch = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate audio levels
      const levels = Array.from({ length: 20 }, () => Math.random() * 100);
      setAudioLevels(levels);
      
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        onChange("quadratic formula");
        setIsListening(false);
        setAudioLevels([]);
      }, 3000);
    } else {
      setAudioLevels([]);
    }
  };

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  // Handle input blur
  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
        setShowSuggestions(false);
      }
    }, 150);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text);
    onSuggestionSelect(suggestion.text);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Get suggestion icon
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'formula': return Calculator;
      case 'category': return Zap;
      case 'concept': return Sparkles;
      default: return Search;
    }
  };

  return (
    <div className="relative w-full">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: isFocused ? particle.opacity : 0,
              transform: `scale(${isFocused ? 1 : 0})`,
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Main Search Container */}
      <div className={`relative transition-all duration-500 ease-out ${
        isFocused 
          ? 'transform scale-105 shadow-2xl' 
          : 'transform scale-100 shadow-lg hover:shadow-xl'
      }`}>
        {/* Glassmorphism Search Bar */}
        <div className={`relative backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 ${
          isFocused 
            ? 'ring-2 ring-blue-500/50 bg-white/90' 
            : 'hover:bg-white/85'
        }`}>
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 transition-opacity duration-300 ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`} />
          
          <div className="relative flex items-center gap-4 p-6">
            {/* Search Icon */}
            <div className={`transition-all duration-300 ${
              isFocused ? 'text-blue-600 scale-110' : 'text-neutral-400'
            }`}>
              <Search size={24} className="drop-shadow-sm" />
            </div>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-lg font-medium text-neutral-900 placeholder-neutral-500 outline-none"
            />

            {/* Smart Search Indicator */}
            {value && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full animate-fade-in">
                <Sparkles size={12} />
                Smart Search
              </div>
            )}

            {/* Voice Search Button */}
            <button
              onClick={toggleVoiceSearch}
              className={`relative p-3 rounded-full transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 text-white shadow-lg scale-110' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:scale-105'
              }`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              
              {/* Audio Visualization */}
              {isListening && (
                <div className="absolute -inset-1 rounded-full border-2 border-red-300 animate-ping" />
              )}
            </button>

            {/* Magic Enhancement Button */}
            <button className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Wand2 size={18} />
            </button>
          </div>

          {/* Audio Level Visualization */}
          {isListening && audioLevels.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70">
              <div className="flex h-full items-end gap-0.5 px-6">
                {audioLevels.map((level, i) => (
                  <div
                    key={i}
                    className="bg-white/80 transition-all duration-100"
                    style={{
                      height: `${level}%`,
                      width: '2px',
                      animation: `pulse 0.5s ease-in-out infinite ${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Smart Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-white/90 border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-up"
          >
            <div className="p-2">
              <div className="text-xs font-medium text-neutral-500 px-4 py-2 flex items-center gap-2">
                <Sparkles size={12} />
                Smart Suggestions
              </div>
              
              {suggestions.map((suggestion, index) => {
                const IconComponent = getSuggestionIcon(suggestion.type);
                return (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-200 group"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-200 group-hover:scale-110 ${
                      suggestion.type === 'formula' 
                        ? 'bg-blue-100 text-blue-600' 
                        : suggestion.type === 'category'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      <IconComponent size={16} />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="font-medium text-neutral-900 group-hover:text-neutral-700">
                        {suggestion.text}
                      </div>
                      <div className="text-xs text-neutral-500 capitalize">
                        {suggestion.category} • {suggestion.type}
                      </div>
                    </div>
                    
                    {/* Relevance Indicator */}
                    <div className="flex items-center gap-1">
                      <div className="w-12 h-1 bg-neutral-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
                          style={{ width: `${suggestion.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-neutral-400 min-w-[2rem]">
                        {Math.round(suggestion.confidence)}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Ambient Glow Effect */}
      <div className={`absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl transition-opacity duration-500 -z-10 ${
        isFocused ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};