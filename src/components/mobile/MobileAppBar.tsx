import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

interface MobileAppBarProps {
  title: string;
  showBack?: boolean;
  onMenuClick?: () => void;
}

export const MobileAppBar: React.FC<MobileAppBarProps> = ({ 
  title,
  showBack = false,
  onMenuClick
}) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
              className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-300"
              aria-label="Go back"
            >
              ←
            </button>
          )}
          <h1 className="text-lg font-medium text-neutral-900 dark:text-white truncate">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle variant="minimal" className="w-8 h-8" />
          
          <button 
            onClick={() => navigate('/search')}
            className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-300"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          {onMenuClick && (
            <button 
              onClick={onMenuClick}
              className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-300"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};