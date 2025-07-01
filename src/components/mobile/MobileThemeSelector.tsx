import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Check } from 'lucide-react';

interface Theme {
  id: 'light' | 'dark';
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

export const MobileThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState<string | null>(null);
  
  const themes: Theme[] = [
    {
      id: 'light',
      name: 'Light Mode',
      icon: Sun,
      description: 'Classic bright theme with high contrast'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      icon: Moon,
      description: 'Easier on the eyes in low-light environments'
    }
  ];
  
  const handleThemeChange = (themeId: 'light' | 'dark') => {
    if (theme === themeId) return;
    setIsAnimating(themeId);
    setTheme(themeId);
    setTimeout(() => setIsAnimating(null), 500);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-3">
        Choose Theme
      </h2>
      
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
        Select your preferred appearance mode for Rofi's Mathlab
      </p>
      
      <div className="space-y-3">
        {themes.map((item) => {
          const isActive = theme === item.id;
          const isCurrentlyAnimating = isAnimating === item.id;
          
          return (
            <div 
              key={item.id}
              className={`relative overflow-hidden rounded-xl border ${
                isActive 
                  ? 'border-blue-500 dark:border-blue-400' 
                  : 'border-neutral-200 dark:border-neutral-700'
              } transition-all duration-300`}
              onClick={() => handleThemeChange(item.id)}
            >
              <div className={`flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 relative z-10 ${
                isCurrentlyAnimating ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  item.id === 'light'
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  <item.icon size={24} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
                
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isActive 
                    ? 'bg-blue-500 dark:bg-blue-400' 
                    : 'bg-neutral-200 dark:bg-neutral-700'
                }`}>
                  {isActive && <Check size={12} className="text-white" />}
                </div>
              </div>
              
              {/* Animation overlay */}
              <div className={`absolute inset-0 ${
                isCurrentlyAnimating 
                  ? 'opacity-100 z-20' 
                  : 'opacity-0 -z-10'
              } transition-opacity duration-300 flex items-center justify-center ${
                item.id === 'light' 
                  ? 'bg-white' 
                  : 'bg-neutral-900'
              }`}>
                <div className="animate-pulse">
                  <item.icon 
                    size={48} 
                    className={item.id === 'light' ? 'text-yellow-400' : 'text-blue-400'} 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mt-6">
        Your theme preference will be saved for future visits
      </p>
    </div>
  );
};