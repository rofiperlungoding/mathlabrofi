export interface PracticeCategory {
  id: string;
  name: string;
  description: string;
  difficulty: number; // 1 = easy, 2 = medium, 3 = hard
  colorClass: string;
  icon: string;
  problemCount: number;
  solvedCount: number;
  accuracy: number;
  featured: boolean;
  features: string[];
}

export interface PracticeSession {
  id: string;
  categoryId: string;
  startTime: Date;
  endTime?: Date;
  problemsSolved: number;
  correctAnswers: number;
  score: number;
  streak: number;
}

export interface PracticeProgress {
  totalSessions: number;
  totalProblems: number;
  correctAnswers: number;
  totalScore: number;
  bestStreak: number;
  categoryProgress: Record<string, {
    problemsAttempted: number;
    problemsSolved: number;
    accuracy: number;
  }>;
}