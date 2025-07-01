import React from 'react';
import { Link } from 'react-router-dom';
import { MathTopic } from '../types';
import { useProgress } from '../hooks/useProgress';
import { ProgressRing } from './ProgressRing';
import * as Icons from 'lucide-react';

interface TopicCardProps {
  topic: MathTopic;
  onClick?: () => void;
  path?: string;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick, path }) => {
  const { progress } = useProgress();
  
  const completedLessons = topic.lessons.filter(lesson => 
    progress.completedLessons.includes(lesson.id)
  ).length;
  
  const progressPercentage = (completedLessons / topic.lessons.length) * 100;
  
  const IconComponent = Icons[topic.icon as keyof typeof Icons] as React.ComponentType<any>;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30';
      case 'intermediate': return 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30';
      case 'advanced': return 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30';
      default: return 'text-neutral-700 bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800';
    }
  };

  const CardContent = () => (
    <>
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl ${topic.color} text-white group-hover:scale-105 transition-transform duration-200`}>
          {IconComponent && <IconComponent size={24} />}
        </div>
        <ProgressRing progress={progressPercentage} size={48} />
      </div>
      
      <h3 className="text-xl font-medium text-neutral-900 dark:text-white mb-3 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
        {topic.title}
      </h3>
      
      <p className="text-body mb-6 line-clamp-2">
        {topic.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
          {topic.difficulty}
        </span>
        <span className="text-caption">
          {completedLessons}/{topic.lessons.length} lessons
        </span>
      </div>
    </>
  );

  if (path) {
    return (
      <Link 
        to={path}
        className="card card-hover p-8 cursor-pointer group interactive"
        role="button"
        tabIndex={0}
        aria-label={`${topic.title} - ${topic.description}`}
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <div 
      className="card card-hover p-8 cursor-pointer group interactive"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`${topic.title} - ${topic.description}`}
    >
      <CardContent />
    </div>
  );
};