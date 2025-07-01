import React from 'react';

interface StatItemProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface MobileStatsProps {
  items: StatItemProps[];
  compact?: boolean;
}

export const MobileStats: React.FC<MobileStatsProps> = ({
  items,
  compact = false
}) => {
  if (compact) {
    return (
      <div className="flex items-center justify-between bg-white dark:bg-neutral-800 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700">
        {items.map((item, index) => (
          <div key={index} className="text-center">
            <div className="font-semibold text-primary dark:text-white">{item.value}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">{item.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, index) => (
        <div 
          key={index}
          className={`p-4 rounded-xl ${item.color || 'bg-white dark:bg-neutral-800'} border border-neutral-200 dark:border-neutral-700`}
        >
          <div className="flex items-center gap-2 mb-1">
            {item.icon}
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{item.label}</span>
          </div>
          <div className="text-xl font-semibold text-primary dark:text-white">{item.value}</div>
        </div>
      ))}
    </div>
  );
};