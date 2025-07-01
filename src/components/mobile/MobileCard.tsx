import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MobileCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  rightContent?: React.ReactNode;
  onClick?: () => void;
  badge?: string;
  className?: string;
  showArrow?: boolean;
}

export const MobileCard: React.FC<MobileCardProps> = ({
  title,
  description,
  icon,
  rightContent,
  onClick,
  badge,
  className = '',
  showArrow = true,
}) => {
  return (
    <div 
      className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden ${
        onClick ? 'active:bg-neutral-50 dark:active:bg-neutral-700 cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="p-4 flex items-center gap-3">
        {/* Left Icon Area */}
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-neutral-900 dark:text-white text-base truncate">
              {title}
            </h3>
            
            {badge && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                {badge}
              </span>
            )}
          </div>
          
          {description && (
            <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-2">
              {description}
            </p>
          )}
        </div>
        
        {/* Right Content or Arrow */}
        <div className="flex-shrink-0">
          {rightContent || (showArrow && onClick && (
            <ChevronRight size={18} className="text-neutral-400 dark:text-neutral-500" />
          ))}
        </div>
      </div>
    </div>
  );
};