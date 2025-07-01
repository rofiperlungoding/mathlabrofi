import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Star, BarChart3 } from 'lucide-react';
import { PracticeCategory } from '../../types/practice';

interface PracticeCategoryCardProps {
  category: PracticeCategory;
  onClick?: () => void;
}

export const PracticeCategoryCard: React.FC<PracticeCategoryCardProps> = ({ 
  category, 
  onClick 
}) => {
  // Get difficulty badges
  const getDifficultyBadges = (level: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full ${
              i < level 
                ? 'bg-yellow-500 dark:bg-yellow-400' 
                : 'bg-neutral-200 dark:bg-neutral-700'
            }`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <Link
      to={`/practice/${category.id}`}
      onClick={onClick}
      className="group"
    >
      <div className={`card overflow-hidden hover:shadow-md dark:hover:shadow-black/20 transition-all duration-300 border-2 hover:border-neutral-400 dark:hover:border-neutral-600 group-hover:translate-y-[-2px] ${
        category.featured 
          ? `border-t-4 border-t-${category.colorClass.replace('bg-', '')}` 
          : ''
      }`}>
        {/* Header */}
        <div className={`p-4 ${category.colorClass} text-white`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            {getDifficultyBadges(category.difficulty)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-6 min-h-[3rem]">
            {category.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-2 rounded text-center">
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Problems</div>
              <div className="font-medium text-primary dark:text-white">{category.problemCount}</div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-2 rounded text-center">
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Solved</div>
              <div className="font-medium text-primary dark:text-white">{category.solvedCount}</div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-2 rounded text-center">
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Accuracy</div>
              <div className="font-medium text-primary dark:text-white">{category.accuracy}%</div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4">
            {category.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <CheckCircle size={14} className="text-green-500 dark:text-green-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Practice Button */}
          <button 
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-300 ${
              category.colorClass.replace('text-', 'bg-')
            } hover:opacity-90 flex items-center justify-center gap-2`}
          >
            {category.featured ? <Star size={16} /> : <BarChart3 size={16} />}
            Practice {category.name}
          </button>
        </div>
      </div>
    </Link>
  );
};