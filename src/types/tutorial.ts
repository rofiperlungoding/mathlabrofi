export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  image?: string;
  target?: string;
  action?: string;
  tip?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeNeeded: number;
  steps: TutorialStep[];
}