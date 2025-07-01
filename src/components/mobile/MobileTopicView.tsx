import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from './MobileLayout';
import { MobileCard } from './MobileCard';
import { ActionButton } from './ActionButton';
import { mathTopics } from '../../data/mathTopics';
import { useProgress } from '../../hooks/useProgress';
import { 
  BookOpen, 
  Lock, 
  CheckCircle, 
  Play, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';

export const MobileTopicView: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { isLessonCompleted } = useProgress();
  
  // Find the selected topic
  const topic = mathTopics.find(t => t.id === topicId);
  
  if (!topic) {
    return (
      <MobileLayout>
        <div className="p-4 flex flex-col items-center justify-center h-full">
          <AlertTriangle size={48} className="text-yellow-500 mb-4" />
          <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">
            Topic Not Found
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-center mb-6">
            The topic you're looking for doesn't exist or has been moved.
          </p>
          <ActionButton
            label="Back to Dashboard"
            color="secondary"
            onClick={() => navigate('/')}
          />
        </div>
      </MobileLayout>
    );
  }
  
  // Calculate completion status
  const completedLessons = topic.lessons.filter(lesson => 
    isLessonCompleted(lesson.id)
  ).length;
  
  const percentComplete = Math.round((completedLessons / topic.lessons.length) * 100);
  
  return (
    <MobileLayout>
      {/* Topic Header */}
      <div className={`${topic.color} p-6 text-white`}>
        <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
        <p className="text-white/80 text-sm mb-4">
          {topic.description}
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full"
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-1 text-white/90">
          <span className="text-xs">{completedLessons} of {topic.lessons.length} completed</span>
          <span className="text-xs font-medium">{percentComplete}%</span>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="p-4 grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
          <div className="text-lg font-semibold text-primary dark:text-white">
            {topic.lessons.length}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Lessons</div>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
          <div className="text-lg font-semibold text-primary dark:text-white">
            {topic.lessons.reduce((acc, lesson) => acc + lesson.estimatedTime, 0)}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Minutes</div>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
          <div className="text-lg font-semibold text-primary dark:text-white capitalize">
            {topic.difficulty}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Level</div>
        </div>
      </div>
      
      {/* Lessons List - Reduced bottom padding */}
      <div className="p-4 space-y-3">
        <h2 className="font-medium text-neutral-900 dark:text-white mb-3">
          Lessons
        </h2>
        
        {topic.lessons.map((lesson, index) => {
          const isCompleted = isLessonCompleted(lesson.id);
          const isLocked = index > 0 && !isLessonCompleted(topic.lessons[index - 1].id);
          
          return (
            <MobileCard
              key={lesson.id}
              title={lesson.title}
              description={lesson.description}
              icon={
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                    : isLocked 
                    ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle size={20} />
                  ) : isLocked ? (
                    <Lock size={20} />
                  ) : (
                    <Play size={20} />
                  )}
                </div>
              }
              rightContent={
                <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                  <Clock size={14} />
                  <span className="text-xs">{lesson.estimatedTime}m</span>
                </div>
              }
              onClick={isLocked ? undefined : () => navigate(`/topics/${topicId}/lessons/${lesson.id}`)}
            />
          );
        })}
      </div>
    </MobileLayout>
  );
};