import React from 'react';

interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  color = 'primary',
  fullWidth = false,
  size = 'md',
  disabled = false,
  className = '',
}) => {
  // Color classes
  const colorClasses = {
    primary: 'bg-blue-600 text-white active:bg-blue-700 dark:bg-blue-600 dark:active:bg-blue-700',
    secondary: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-white active:bg-neutral-200 dark:active:bg-neutral-600',
    success: 'bg-green-600 text-white active:bg-green-700 dark:bg-green-600 dark:active:bg-green-700',
    danger: 'bg-red-600 text-white active:bg-red-700 dark:bg-red-600 dark:active:bg-red-700',
    neutral: 'bg-white text-neutral-800 border border-neutral-300 dark:bg-neutral-800 dark:text-white dark:border-neutral-600 active:bg-neutral-100 dark:active:bg-neutral-700',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-base',
    lg: 'py-4 px-5 text-lg',
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
        colorClasses[color]
      } ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      } ${className}`}
    >
      {icon}
      {label}
    </button>
  );
};