import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from './MobileLayout';
import { MobileCard } from './MobileCard';
import { MobileStats } from './MobileStats';
import { ActionButton } from './ActionButton';
import { Target, Zap, CheckCircle, BarChart, Award } from 'lucide-react';
import { usePracticeState } from '../../context/PracticeStateContext';
import { categoryData } from '../../data/practiceCategories';

export const MobilePractice: React.FC = () => {
  const navigate = useNavigate();
  const { 
    sessionScore, 
    exercisesCompleted, 
    isSessionActive, 
    startSession 
  } = usePracticeState();
  
  // Calculate accuracy
  const getAccuracy = (): number => {
    if (exercisesCompleted === 0) return 0;
    return Math.round((sessionScore / (exercisesCompleted * 100)) * 100);
  };
  
  return (
    <MobileLayout title="Practice">
      {/* Session Stats (if active) */}
      {isSessionActive && (
        <div className="p-4">
          <MobileStats 
            items={[
              { value: sessionScore, label: 'Points', icon: <Award size={16} className="text-yellow-500" /> },
              { value: exercisesCompleted, label: 'Completed', icon: <CheckCircle size={16} className="text-green-500" /> },
              { value: `${getAccuracy()}%`, label: 'Accuracy', icon: <BarChart size={16} className="text-blue-500" /> },
            ]}
            compact
          />
        </div>
      )}
      
      {/* Quick Practice Button */}
      <div className="p-4">
        <ActionButton
          label="Start Quick Practice"
          icon={<Zap size={18} />}
          color="primary"
          fullWidth
          onClick={() => navigate('/practice/mixed')}
        />
      </div>
      
      {/* Divider */}
      <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-500 dark:text-neutral-400">
        Practice Categories
      </div>
      
      {/* Categories - Removed pb-20 for proper scrolling */}
      <div className="p-4 space-y-3">
        {categoryData.map((category) => (
          <MobileCard
            key={category.id}
            title={category.name}
            description={`${category.problemCount} problems • ${category.accuracy}% accuracy`}
            icon={
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-white text-xl ${category.colorClass}`}>
                {category.icon}
              </div>
            }
            onClick={() => navigate(`/practice/${category.id}`)}
          />
        ))}
      </div>
    </MobileLayout>
  );
};