export interface User {
  id: string;
  name: string;
  email: string;
  progress: UserProgress;
}

export interface UserProgress {
  completedLessons: string[];
  solvedProblems: string[];
  currentStreak: number;
  totalXP: number;
  level: number;
  streakHistory: Date[];
}

export interface MathTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
  color: string;
  problemTypes: ProblemType[];
}

export interface ProblemType {
  id: string;
  name: string;
  description: string;
  examples: string[];
  category: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: LessonContent[];
  exercises: Exercise[];
  estimatedTime: number;
  prerequisites: string[];
}

export interface LessonContent {
  id: string;
  type: 'text' | 'formula' | 'example' | 'visualization' | 'definition';
  content: string;
  latex?: string;
  image?: string;
}

export interface Exercise {
  id: string;
  question: string;
  type: 'multiple-choice' | 'input' | 'true-false' | 'graph';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint?: string;
  latex?: string;
  steps?: SolutionStep[];
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
}

export interface SolutionStep {
  id: string;
  description: string;
  latex?: string;
  explanation: string;
  rule?: string;
}

export interface MathProblem {
  id: string;
  expression: string;
  type: ProblemCategory;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  solution?: MathSolution;
  steps?: SolutionStep[];
}

export interface MathSolution {
  result: string;
  steps: SolutionStep[];
  graph?: GraphData;
  alternativeForm?: string[];
}

export interface GraphData {
  type: 'function' | 'parametric' | '3d' | 'polar';
  domain: [number, number];
  range?: [number, number];
  points?: Array<{x: number, y: number, z?: number}>;
  equations: string[];
}

export interface Formula {
  id: string;
  name: string;
  category: string;
  description: string;
  latex: string;
  variables: Variable[];
  examples: FormulaExample[];
  relatedFormulas: string[];
}

export interface Variable {
  symbol: string;
  name: string;
  description: string;
  units?: string;
}

export interface FormulaExample {
  description: string;
  given: Record<string, number>;
  solution: string;
  latex: string;
}

export type ProblemCategory = 
  | 'algebra'
  | 'geometry' 
  | 'calculus'
  | 'trigonometry'
  | 'statistics'
  | 'linear-algebra'
  | 'number-theory'
  | 'discrete-math'
  | 'differential-equations'
  | 'complex-analysis'
  | 'probability'
  | 'mixed';

export interface Calculator {
  type: 'basic' | 'scientific' | 'graphing' | 'matrix';
  functions: string[];
}

export interface LearningSession {
  lessonId: string;
  startTime: Date;
  endTime?: Date;
  exercisesCompleted: number;
  correctAnswers: number;
  score: number;
  problemsSolved: string[];
}