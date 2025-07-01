import { PracticeCategory } from '../types/practice';

export const categoryData: PracticeCategory[] = [
  {
    id: 'algebra',
    name: 'Algebra',
    description: 'Practice solving equations, factoring expressions, and working with variables and functions',
    difficulty: 2,
    colorClass: 'bg-blue-600',
    icon: '🔢',
    problemCount: 42,
    solvedCount: 18,
    accuracy: 85,
    featured: true,
    features: [
      'Linear & Quadratic Equations',
      'Factoring & Simplifying',
      'Function Analysis'
    ]
  },
  {
    id: 'geometry',
    name: 'Geometry',
    description: 'Explore shapes, angles, and spatial relationships with interactive geometric problems',
    difficulty: 2,
    colorClass: 'bg-green-600',
    icon: '📐',
    problemCount: 36,
    solvedCount: 12,
    accuracy: 78,
    featured: false,
    features: [
      'Area & Volume Calculations',
      'Triangles & Circles',
      'Coordinate Geometry'
    ]
  },
  {
    id: 'calculus',
    name: 'Calculus',
    description: 'Master differentiation, integration, limits, and other calculus concepts with guided practice',
    difficulty: 3,
    colorClass: 'bg-purple-600',
    icon: '∫',
    problemCount: 48,
    solvedCount: 15,
    accuracy: 72,
    featured: true,
    features: [
      'Limits & Continuity',
      'Derivatives & Applications',
      'Integrals & Techniques'
    ]
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    description: 'Practice with angles, triangles, trigonometric functions and identities',
    difficulty: 2,
    colorClass: 'bg-red-600',
    icon: '📊',
    problemCount: 30,
    solvedCount: 8,
    accuracy: 80,
    featured: false,
    features: [
      'Trig Functions & Ratios',
      'Angle Measurement',
      'Identities & Equations'
    ]
  },
  {
    id: 'statistics',
    name: 'Statistics',
    description: 'Build skills in data analysis, probability, and statistical concepts',
    difficulty: 2,
    colorClass: 'bg-yellow-600',
    icon: '📈',
    problemCount: 33,
    solvedCount: 10,
    accuracy: 90,
    featured: false,
    features: [
      'Descriptive Statistics',
      'Probability Distributions',
      'Hypothesis Testing'
    ]
  },
  {
    id: 'linear-algebra',
    name: 'Linear Algebra',
    description: 'Practice with matrices, vectors, linear transformations, and systems of equations',
    difficulty: 3,
    colorClass: 'bg-indigo-600',
    icon: '🔢',
    problemCount: 28,
    solvedCount: 6,
    accuracy: 75,
    featured: false,
    features: [
      'Matrix Operations',
      'Vector Spaces',
      'Eigenvalues & Eigenvectors'
    ]
  },
  {
    id: 'number-theory',
    name: 'Number Theory',
    description: 'Explore properties of integers, prime numbers, divisibility, and modular arithmetic',
    difficulty: 3,
    colorClass: 'bg-amber-600',
    icon: '🔢',
    problemCount: 25,
    solvedCount: 5,
    accuracy: 70,
    featured: false,
    features: [
      'Prime Numbers & Factorization',
      'Modular Arithmetic',
      'Diophantine Equations'
    ]
  },
  {
    id: 'discrete-math',
    name: 'Discrete Mathematics',
    description: 'Practice with logic, sets, relations, functions, combinatorics, and graph theory',
    difficulty: 3,
    colorClass: 'bg-emerald-600',
    icon: '🧩',
    problemCount: 32,
    solvedCount: 7,
    accuracy: 68,
    featured: false,
    features: [
      'Logic & Proofs',
      'Combinatorics & Counting',
      'Graph Theory'
    ]
  },
  {
    id: 'differential-equations',
    name: 'Differential Equations',
    description: 'Solve and analyze ordinary and partial differential equations and their applications',
    difficulty: 3,
    colorClass: 'bg-cyan-600',
    icon: '📊',
    problemCount: 30,
    solvedCount: 4,
    accuracy: 65,
    featured: false,
    features: [
      'First-Order Equations',
      'Second-Order Equations',
      'Systems of Equations'
    ]
  },
  {
    id: 'complex-analysis',
    name: 'Complex Analysis',
    description: 'Work with complex numbers, functions, and calculus in the complex plane',
    difficulty: 3,
    colorClass: 'bg-pink-600',
    icon: '🔄',
    problemCount: 22,
    solvedCount: 3,
    accuracy: 60,
    featured: false,
    features: [
      'Complex Functions',
      'Contour Integration',
      'Series & Residues'
    ]
  },
  {
    id: 'probability',
    name: 'Probability',
    description: 'Master probability concepts, random variables, distributions, and stochastic processes',
    difficulty: 2,
    colorClass: 'bg-orange-600',
    icon: '🎲',
    problemCount: 35,
    solvedCount: 12,
    accuracy: 82,
    featured: false,
    features: [
      'Combinatorial Probability',
      'Random Variables',
      'Probability Distributions'
    ]
  },
  {
    id: 'mixed',
    name: 'Mixed Practice',
    description: 'Challenge yourself with problems from multiple categories for comprehensive review',
    difficulty: 2,
    colorClass: 'bg-gradient-to-r from-blue-600 to-purple-600',
    icon: '🎯',
    problemCount: 100,
    solvedCount: 25,
    accuracy: 82,
    featured: true,
    features: [
      'Multi-category Problems',
      'Adaptive Difficulty',
      'Comprehensive Coverage'
    ]
  }
];