import { MathTopic } from '../types';

export const mathTopics: MathTopic[] = [
  {
    id: 'algebra',
    title: 'Algebra',
    description: 'Master equations, functions, and algebraic reasoning',
    icon: 'calculator',
    difficulty: 'beginner',
    color: 'bg-blue-500',
    lessons: [
      {
        id: 'linear-equations',
        title: 'Linear Equations',
        description: 'Solve equations with one variable',
        estimatedTime: 30,
        prerequisites: [],
        content: [
          {
            id: 'intro',
            type: 'text',
            content: 'Linear equations are equations where the highest power of the variable is 1. They form straight lines when graphed.'
          },
          {
            id: 'basic-form',
            type: 'formula',
            content: 'The standard form of a linear equation is:',
            latex: 'ax + b = c'
          },
          {
            id: 'example1',
            type: 'example',
            content: 'Let\'s solve: 2x + 5 = 13',
            latex: '2x + 5 = 13'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'Solve for x: 3x + 7 = 22',
            type: 'input',
            correctAnswer: 5,
            explanation: 'Subtract 7 from both sides: 3x = 15, then divide by 3: x = 5',
            latex: '3x + 7 = 22'
          }
        ]
      }
    ]
  },
  {
    id: 'geometry',
    title: 'Geometry',
    description: 'Explore shapes, angles, and spatial relationships',
    icon: 'triangle',
    difficulty: 'intermediate',
    color: 'bg-green-500',
    lessons: [
      {
        id: 'pythagorean-theorem',
        title: 'Pythagorean Theorem',
        description: 'Understanding right triangles and the Pythagorean theorem',
        estimatedTime: 45,
        prerequisites: [],
        content: [
          {
            id: 'intro',
            type: 'text',
            content: 'The Pythagorean theorem relates the lengths of the sides in a right triangle.'
          },
          {
            id: 'formula',
            type: 'formula',
            content: 'For a right triangle with legs a and b, and hypotenuse c:',
            latex: 'a^2 + b^2 = c^2'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'In a right triangle, if a = 3 and b = 4, what is c?',
            type: 'input',
            correctAnswer: 5,
            explanation: 'Using the Pythagorean theorem: 3² + 4² = c², so 9 + 16 = c², therefore c = 5',
            latex: 'a = 3, b = 4, c = ?'
          }
        ]
      }
    ]
  },
  {
    id: 'calculus',
    title: 'Calculus',
    description: 'Discover derivatives, integrals, and limits',
    icon: 'trending-up',
    difficulty: 'advanced',
    color: 'bg-purple-500',
    lessons: [
      {
        id: 'derivatives',
        title: 'Introduction to Derivatives',
        description: 'Understanding rates of change and slopes',
        estimatedTime: 60,
        prerequisites: ['algebra'],
        content: [
          {
            id: 'intro',
            type: 'text',
            content: 'A derivative represents the rate of change of a function at any given point.'
          },
          {
            id: 'definition',
            type: 'formula',
            content: 'The derivative of f(x) is defined as:',
            latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}"
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What is the derivative of f(x) = 3x²?',
            type: 'input',
            correctAnswer: '6x',
            explanation: 'Using the power rule: d/dx(3x²) = 3 × 2x¹ = 6x',
            latex: 'f(x) = 3x^2'
          }
        ]
      }
    ]
  }
];