import React from 'react';
import { MathTopic } from '../types';
import { useProgress } from '../hooks/useProgress';
import { Clock, CheckCircle, Play } from 'lucide-react';

interface TopicOverviewProps {
  topic: MathTopic;
  onLessonSelect: (lessonId: string) => void;
}

export const TopicOverview: React.FC<TopicOverviewProps> = ({ topic, onLessonSelect }) => {
  const { isLessonCompleted } = useProgress();

  return (
    <div className="container-spacing py-8">
      <div className="max-w-4xl mx-auto">
        {/* Topic Header */}
        <div className="card p-8 mb-8">
          <div className="text-center mb-6">
            <div className={`inline-flex p-4 rounded-full ${topic.color} text-white mb-4`}>
              <div className="w-12 h-12 flex items-center justify-center">
                {/* Icon placeholder */}
                📚
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">{topic.title}</h1>
            <p className="text-xl text-secondary">{topic.description}</p>
          </div>
          
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-accent dark:text-blue-400">{topic.lessons.length}</div>
              <div className="text-sm text-secondary">Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {topic.lessons.reduce((sum, lesson) => sum + lesson.estimatedTime, 0)}
              </div>
              <div className="text-sm text-secondary">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 capitalize">{topic.difficulty}</div>
              <div className="text-sm text-secondary">Difficulty</div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary mb-6">Lessons</h2>
          
          {topic.lessons.map((lesson, index) => {
            const isCompleted = isLessonCompleted(lesson.id);
            const isLocked = index > 0 && !isLessonCompleted(topic.lessons[index - 1].id);
            
            return (
              <div 
                key={lesson.id}
                className={`card p-6 ${isLocked ? 'opacity-50' : 'hover:shadow-card cursor-pointer'}`}
                onClick={() => !isLocked && onLessonSelect(lesson.id)}
                role={isLocked ? undefined : "button"}
                tabIndex={isLocked ? -1 : 0}
                onKeyDown={(e) => {
                  if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onLessonSelect(lesson.id);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      isCompleted 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                        : isLocked 
                        ? 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500'
                        : 'bg-accent/10 text-accent dark:text-blue-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={24} />
                      ) : isLocked ? (
                        <div className="w-6 h-6 border-2 border-current rounded-full" />
                      ) : (
                        <Play size={24} />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-secondary text-sm">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-secondary">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {lesson.estimatedTime} min
                    </div>
                    <div className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                      {lesson.exercises.length} exercises
                    </div>
                  </div>
                </div>
                
                {isLocked && (
                  <div className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                    Complete the previous lesson to unlock
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};