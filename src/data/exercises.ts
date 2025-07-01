import { Exercise, ProblemCategory } from '../types';

// Database of exercises categorized by subject
const exerciseDatabase: Record<ProblemCategory, Exercise[]> = {
  algebra: [
    {
      id: 'alg-1',
      question: 'Solve for x: 3x + 7 = 22',
      type: 'input',
      correctAnswer: '5',
      explanation: 'Subtract 7 from both sides: 3x = 15, then divide by 3: x = 5',
      hint: 'Remember to isolate the variable by doing the same operation to both sides',
      latex: '3x + 7 = 22',
      difficulty: 'easy'
    },
    {
      id: 'alg-2',
      question: 'Factor the expression: x² - 5x + 6',
      type: 'input',
      correctAnswer: '(x-2)(x-3)',
      explanation: 'Look for two numbers that multiply to 6 and add to -5: -2 and -3',
      hint: 'Find two numbers that multiply to give the constant term and add to give the coefficient of x',
      latex: 'x^2 - 5x + 6',
      difficulty: 'medium'
    },
    {
      id: 'alg-3',
      question: 'What is the slope of the line passing through (2,3) and (6,7)?',
      type: 'input',
      correctAnswer: '1',
      explanation: 'Using slope formula: m = (y₂-y₁)/(x₂-x₁) = (7-3)/(6-2) = 4/4 = 1',
      hint: 'Use the slope formula: (y₂-y₁)/(x₂-x₁)',
      latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}',
      difficulty: 'medium'
    },
    {
      id: 'alg-4',
      question: 'Solve the system of equations: 2x + y = 7 and x - y = 1',
      type: 'input',
      correctAnswer: 'x=2, y=3',
      explanation: 'From the second equation, x = 1 + y. Substitute into first: 2(1 + y) + y = 7, so 2 + 2y + y = 7, thus 3y = 5, so y = 5/3. Therefore x = 1 + 5/3 = 8/3.',
      hint: 'Try using substitution: solve for one variable in terms of the other in one equation, then substitute into the second equation.',
      latex: '\\begin{cases} 2x + y = 7 \\\\ x - y = 1 \\end{cases}',
      difficulty: 'hard'
    },
    {
      id: 'alg-5',
      question: 'Find the domain of the function f(x) = √(x - 3)',
      type: 'input',
      correctAnswer: '[3,∞)',
      explanation: 'For a square root function, the expression inside must be non-negative. So x - 3 ≥ 0, which means x ≥ 3.',
      hint: 'The domain is the set of all valid inputs. What restriction does the square root place on the input?',
      latex: 'f(x) = \\sqrt{x - 3}',
      difficulty: 'medium'
    },
    {
      id: 'alg-6',
      question: 'Simplify the expression: (3x² - 6x) ÷ 3',
      type: 'input',
      correctAnswer: 'x² - 2x',
      explanation: 'Factor out the common factor 3: (3x² - 6x) ÷ 3 = 3(x² - 2x) ÷ 3 = x² - 2x',
      hint: 'Look for a common factor in the numerator',
      latex: '\\frac{3x^2 - 6x}{3}',
      difficulty: 'easy'
    },
    {
      id: 'alg-7',
      question: 'Solve the quadratic equation: x² - 6x + 8 = 0',
      type: 'input',
      correctAnswer: 'x=2, x=4',
      explanation: 'Using the quadratic formula or factoring: x² - 6x + 8 = (x - 2)(x - 4) = 0, so x = 2 or x = 4',
      hint: 'Try factoring the quadratic expression',
      latex: 'x^2 - 6x + 8 = 0',
      difficulty: 'medium'
    },
    {
      id: 'alg-8',
      question: 'Find the value of x if log₂(x) = 3',
      type: 'input',
      correctAnswer: '8',
      explanation: 'If log₂(x) = 3, then 2³ = x, so x = 8',
      hint: 'Convert the logarithmic equation to exponential form',
      latex: '\\log_2(x) = 3',
      difficulty: 'medium'
    },
    {
      id: 'alg-9',
      question: 'Solve for x: |2x - 4| = 6',
      type: 'input',
      correctAnswer: 'x=-1, x=5',
      explanation: 'Case 1: 2x - 4 = 6, so 2x = 10, x = 5. Case 2: 2x - 4 = -6, so 2x = -2, x = -1',
      hint: 'For absolute value equations, consider both the positive and negative cases',
      latex: '|2x - 4| = 6',
      difficulty: 'medium'
    },
    {
      id: 'alg-10',
      question: 'Find the inverse function of f(x) = 3x - 2',
      type: 'input',
      correctAnswer: 'f⁻¹(x) = (x+2)/3',
      explanation: 'To find the inverse, swap x and y, then solve for y. If y = 3x - 2, then x = 3y - 2, so y = (x + 2)/3',
      hint: 'Swap x and y, then solve for y',
      latex: 'f(x) = 3x - 2',
      difficulty: 'medium'
    }
  ],
  geometry: [
    {
      id: 'geo-1',
      question: 'Find the area of a circle with radius 4 units',
      type: 'input',
      correctAnswer: '16π',
      explanation: 'Using A = πr²: A = π(4)² = 16π square units',
      hint: 'Remember the area formula for a circle is A = πr²',
      latex: 'A = \\pi r^2',
      difficulty: 'easy'
    },
    {
      id: 'geo-2',
      question: 'In a right triangle, if one leg is 6 and the hypotenuse is 10, what is the other leg?',
      type: 'input',
      correctAnswer: '8',
      explanation: 'Using Pythagorean theorem: a² + b² = c², so 6² + b² = 10², b² = 100 - 36 = 64, b = 8',
      hint: 'Use the Pythagorean theorem: a² + b² = c²',
      latex: 'a^2 + b^2 = c^2',
      difficulty: 'medium'
    },
    {
      id: 'geo-3',
      question: 'What is the volume of a cone with radius 3 and height 4?',
      type: 'input',
      correctAnswer: '12π',
      explanation: 'Using V = (1/3)πr²h: V = (1/3)π(3)²(4) = (1/3)π(9)(4) = 12π cubic units',
      hint: 'The volume of a cone is one-third the volume of a cylinder with the same base and height',
      latex: 'V = \\frac{1}{3}\\pi r^2 h',
      difficulty: 'medium'
    },
    {
      id: 'geo-4',
      question: 'Find the perimeter of a rectangle with length 8 units and width 5 units',
      type: 'input',
      correctAnswer: '26',
      explanation: 'Perimeter = 2(length + width) = 2(8 + 5) = 2(13) = 26 units',
      hint: 'The perimeter is the sum of all sides',
      latex: 'P = 2(l + w)',
      difficulty: 'easy'
    },
    {
      id: 'geo-5',
      question: 'What is the area of a triangle with base 6 units and height 8 units?',
      type: 'input',
      correctAnswer: '24',
      explanation: 'Area = (1/2) × base × height = (1/2) × 6 × 8 = 24 square units',
      hint: 'Use the formula for the area of a triangle',
      latex: 'A = \\frac{1}{2}bh',
      difficulty: 'easy'
    },
    {
      id: 'geo-6',
      question: 'Find the surface area of a cube with side length 5 units',
      type: 'input',
      correctAnswer: '150',
      explanation: 'Surface area = 6 × (side length)² = 6 × 5² = 6 × 25 = 150 square units',
      hint: 'A cube has 6 identical square faces',
      latex: 'SA = 6s^2',
      difficulty: 'easy'
    },
    {
      id: 'geo-7',
      question: 'What is the measure of each interior angle in a regular pentagon?',
      type: 'input',
      correctAnswer: '108',
      explanation: 'For a regular n-gon, each interior angle measures (n-2)×180°/n. For a pentagon (n=5), this is (5-2)×180°/5 = 3×180°/5 = 540°/5 = 108°',
      hint: 'Use the formula for interior angles of a regular polygon',
      latex: '\\text{Interior angle} = \\frac{(n-2)\\times 180^\\circ}{n}',
      difficulty: 'medium'
    },
    {
      id: 'geo-8',
      question: 'Find the distance between the points (3,4) and (6,8)',
      type: 'input',
      correctAnswer: '5',
      explanation: 'Using the distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²] = √[(6-3)² + (8-4)²] = √[9 + 16] = √25 = 5',
      hint: 'Use the distance formula between two points',
      latex: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
      difficulty: 'medium'
    },
    {
      id: 'geo-9',
      question: 'What is the volume of a sphere with radius 3 units?',
      type: 'input',
      correctAnswer: '36π',
      explanation: 'Volume = (4/3)πr³ = (4/3)π(3)³ = (4/3)π(27) = 36π cubic units',
      hint: 'Use the formula for the volume of a sphere',
      latex: 'V = \\frac{4}{3}\\pi r^3',
      difficulty: 'medium'
    },
    {
      id: 'geo-10',
      question: 'In a triangle, if two sides have lengths 5 and 7, and the angle between them is 60°, what is the area of the triangle?',
      type: 'input',
      correctAnswer: '17.5',
      explanation: 'Using the formula Area = (1/2)ab·sin(C): Area = (1/2)(5)(7)·sin(60°) = (1/2)(35)(√3/2) = 35√3/4 ≈ 17.5 square units',
      hint: 'Use the formula for the area of a triangle given two sides and the included angle',
      latex: 'A = \\frac{1}{2}ab\\sin(C)',
      difficulty: 'hard'
    }
  ],
  calculus: [
    {
      id: 'calc-1',
      question: 'Find the derivative of f(x) = 3x² + 2x - 1',
      type: 'input',
      correctAnswer: '6x + 2',
      explanation: 'Using power rule: d/dx(3x²) = 6x, d/dx(2x) = 2, d/dx(-1) = 0',
      hint: 'Apply the power rule: d/dx(xⁿ) = nxⁿ⁻¹',
      latex: 'f(x) = 3x^2 + 2x - 1',
      difficulty: 'medium'
    },
    {
      id: 'calc-2',
      question: 'Evaluate the definite integral: ∫₀¹ 2x dx',
      type: 'input',
      correctAnswer: '1',
      explanation: 'First find the antiderivative: ∫2x dx = x². Then evaluate from 0 to 1: x²|₀¹ = 1² - 0² = 1',
      hint: 'Find the antiderivative first, then use the fundamental theorem of calculus',
      latex: '\\int_{0}^{1} 2x\\,dx',
      difficulty: 'medium'
    },
    {
      id: 'calc-3',
      question: 'Find the derivative of f(x) = sin(x)cos(x)',
      type: 'input',
      correctAnswer: 'cos²(x) - sin²(x)',
      explanation: 'Using the product rule: f\'(x) = sin(x)(-sin(x)) + cos(x)cos(x) = -sin²(x) + cos²(x) = cos²(x) - sin²(x)',
      hint: 'Apply the product rule: (f·g)\' = f\'·g + f·g\'',
      latex: 'f(x) = \\sin(x)\\cos(x)',
      difficulty: 'medium'
    },
    {
      id: 'calc-4',
      question: 'Find the limit: lim(x→0) (sin(x)/x)',
      type: 'input',
      correctAnswer: '1',
      explanation: 'This is a well-known limit that equals 1. It can be proven using the squeeze theorem or L\'Hôpital\'s rule.',
      hint: 'This is a special limit in calculus',
      latex: '\\lim_{x \\to 0} \\frac{\\sin(x)}{x}',
      difficulty: 'medium'
    },
    {
      id: 'calc-5',
      question: 'Find the derivative of f(x) = e^(2x)',
      type: 'input',
      correctAnswer: '2e^(2x)',
      explanation: 'Using the chain rule: f\'(x) = e^(2x) · d/dx(2x) = e^(2x) · 2 = 2e^(2x)',
      hint: 'Apply the chain rule: if f(x) = g(h(x)), then f\'(x) = g\'(h(x)) · h\'(x)',
      latex: 'f(x) = e^{2x}',
      difficulty: 'medium'
    },
    {
      id: 'calc-6',
      question: 'Evaluate the indefinite integral: ∫ x·e^x dx',
      type: 'input',
      correctAnswer: 'x·e^x - e^x + C',
      explanation: 'Using integration by parts with u = x and dv = e^x dx: ∫ x·e^x dx = x·e^x - ∫ e^x dx = x·e^x - e^x + C',
      hint: 'Use integration by parts: ∫u·dv = u·v - ∫v·du',
      latex: '\\int x \\cdot e^x \\, dx',
      difficulty: 'hard'
    },
    {
      id: 'calc-7',
      question: 'Find the critical points of f(x) = x³ - 6x² + 9x + 1',
      type: 'input',
      correctAnswer: 'x=1, x=3',
      explanation: 'Critical points occur where f\'(x) = 0. f\'(x) = 3x² - 12x + 9 = 3(x² - 4x + 3) = 3(x - 1)(x - 3) = 0, so x = 1 or x = 3',
      hint: 'Find where the derivative equals zero',
      latex: 'f(x) = x^3 - 6x^2 + 9x + 1',
      difficulty: 'medium'
    },
    {
      id: 'calc-8',
      question: 'Find the derivative of f(x) = ln(x²)',
      type: 'input',
      correctAnswer: '2/x',
      explanation: 'Using the chain rule: f\'(x) = (1/x²) · d/dx(x²) = (1/x²) · 2x = 2/x',
      hint: 'Use the chain rule and remember that d/dx(ln(u)) = (1/u) · du/dx',
      latex: 'f(x) = \\ln(x^2)',
      difficulty: 'medium'
    },
    {
      id: 'calc-9',
      question: 'Evaluate the limit: lim(x→∞) (1 + 2/x)^x',
      type: 'input',
      correctAnswer: 'e²',
      explanation: 'This is of the form lim(x→∞) (1 + a/x)^x, which equals e^a. Here a = 2, so the limit is e².',
      hint: 'This is related to the definition of e',
      latex: '\\lim_{x \\to \\infty} \\left(1 + \\frac{2}{x}\\right)^x',
      difficulty: 'hard'
    },
    {
      id: 'calc-10',
      question: 'Find the area between the curves y = x² and y = x from x = 0 to x = 1',
      type: 'input',
      correctAnswer: '1/6',
      explanation: 'The area is ∫₀¹ (x - x²) dx = [x²/2 - x³/3]₀¹ = (1/2 - 1/3) - 0 = 1/6',
      hint: 'Set up a definite integral of the difference between the two functions',
      latex: '\\int_{0}^{1} (x - x^2) \\, dx',
      difficulty: 'hard'
    }
  ],
  trigonometry: [
    {
      id: 'trig-1',
      question: 'What is sin(30°)?',
      type: 'multiple-choice',
      options: ['1/2', '√2/2', '√3/2', '1'],
      correctAnswer: '1/2',
      explanation: 'sin(30°) = 1/2 is a fundamental trigonometric value',
      hint: 'Remember the special angles: 30°, 45°, 60°',
      difficulty: 'easy'
    },
    {
      id: 'trig-2',
      question: 'Solve for x: sin(x) = 0.5, where 0° ≤ x ≤ 360°',
      type: 'input',
      correctAnswer: '30°, 150°',
      explanation: 'sin(x) = 0.5 gives us x = 30° and x = 150° in the first full rotation',
      hint: 'Remember that sine has the same value at two angles in a full rotation',
      latex: '\\sin(x) = 0.5',
      difficulty: 'medium'
    },
    {
      id: 'trig-3',
      question: 'What is the value of cos(60°)?',
      type: 'input',
      correctAnswer: '1/2',
      explanation: 'cos(60°) = 1/2 is a fundamental trigonometric value',
      hint: 'Remember the special angles: 30°, 45°, 60°',
      latex: '\\cos(60^\\circ)',
      difficulty: 'easy'
    },
    {
      id: 'trig-4',
      question: 'Simplify the expression: sin²(x) + cos²(x)',
      type: 'input',
      correctAnswer: '1',
      explanation: 'This is the Pythagorean identity: sin²(x) + cos²(x) = 1 for all values of x',
      hint: 'This is a fundamental trigonometric identity',
      latex: '\\sin^2(x) + \\cos^2(x)',
      difficulty: 'easy'
    },
    {
      id: 'trig-5',
      question: 'Find the value of tan(45°)',
      type: 'input',
      correctAnswer: '1',
      explanation: 'tan(45°) = sin(45°)/cos(45°) = (√2/2)/(√2/2) = 1',
      hint: 'Remember the special angle 45°, or use the definition of tangent',
      latex: '\\tan(45^\\circ)',
      difficulty: 'easy'
    },
    {
      id: 'trig-6',
      question: 'Solve for x: cos(x) = 0, where 0° ≤ x < 360°',
      type: 'input',
      correctAnswer: '90°, 270°',
      explanation: 'cos(x) = 0 when x = 90° or x = 270° in the first full rotation',
      hint: 'Think about where the cosine function equals zero on the unit circle',
      latex: '\\cos(x) = 0',
      difficulty: 'medium'
    },
    {
      id: 'trig-7',
      question: 'Simplify the expression: sin(x)cos(x)',
      type: 'input',
      correctAnswer: 'sin(2x)/2',
      explanation: 'Using the double angle formula: sin(x)cos(x) = sin(2x)/2',
      hint: 'This is related to the double angle formula for sine',
      latex: '\\sin(x)\\cos(x)',
      difficulty: 'medium'
    },
    {
      id: 'trig-8',
      question: 'Find all solutions to the equation sin(2x) = sin(x) in the interval [0, 2π)',
      type: 'input',
      correctAnswer: '0, π/3, π, 5π/3',
      explanation: 'sin(2x) = sin(x) implies sin(2x) - sin(x) = 0, which can be rewritten as 2sin(x)cos(x) - sin(x) = 0, or sin(x)(2cos(x) - 1) = 0. So either sin(x) = 0 or cos(x) = 1/2. This gives x = 0, π, π/3, 5π/3.',
      hint: 'Rewrite the equation as sin(2x) - sin(x) = 0 and factor',
      latex: '\\sin(2x) = \\sin(x)',
      difficulty: 'hard'
    },
    {
      id: 'trig-9',
      question: 'If sin(α) = 3/5 and α is in the first quadrant, find cos(α)',
      type: 'input',
      correctAnswer: '4/5',
      explanation: 'Using the Pythagorean identity: sin²(α) + cos²(α) = 1, so cos²(α) = 1 - sin²(α) = 1 - (3/5)² = 1 - 9/25 = 16/25. Since α is in the first quadrant, cos(α) > 0, so cos(α) = 4/5.',
      hint: 'Use the Pythagorean identity and the fact that cosine is positive in the first quadrant',
      latex: '\\sin(\\alpha) = \\frac{3}{5}',
      difficulty: 'medium'
    },
    {
      id: 'trig-10',
      question: 'Prove the identity: tan(x) + cot(x) = 2csc(2x)',
      type: 'multiple-choice',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'tan(x) + cot(x) = sin(x)/cos(x) + cos(x)/sin(x) = (sin²(x) + cos²(x))/(sin(x)cos(x)) = 1/(sin(x)cos(x)) = 2/sin(2x) = 2csc(2x)',
      hint: 'Express everything in terms of sine and cosine, then use the double angle formula',
      latex: '\\tan(x) + \\cot(x) = 2\\csc(2x)',
      difficulty: 'hard'
    }
  ],
  statistics: [
    {
      id: 'stat-1',
      question: 'Find the mean of: 4, 7, 9, 12, 18',
      type: 'input',
      correctAnswer: '10',
      explanation: 'Mean = (4 + 7 + 9 + 12 + 18) ÷ 5 = 50 ÷ 5 = 10',
      hint: 'Add all values and divide by the number of values',
      difficulty: 'easy'
    },
    {
      id: 'stat-2',
      question: 'If the probability of an event occurring is 0.35, what is the probability of it not occurring?',
      type: 'input',
      correctAnswer: '0.65',
      explanation: 'The probability of an event not occurring = 1 - probability of occurring = 1 - 0.35 = 0.65',
      hint: 'The sum of the probabilities of an event occurring and not occurring equals 1',
      difficulty: 'easy'
    },
    {
      id: 'stat-3',
      question: 'Find the median of the data set: 12, 5, 7, 15, 21, 9',
      type: 'input',
      correctAnswer: '10.5',
      explanation: 'First arrange the data in ascending order: 5, 7, 9, 12, 15, 21. Since there are 6 values (even), the median is the average of the middle two: (9 + 12)/2 = 10.5',
      hint: 'Arrange the data in ascending order and find the middle value(s)',
      difficulty: 'easy'
    },
    {
      id: 'stat-4',
      question: 'Calculate the standard deviation of the data set: 2, 4, 6, 8, 10',
      type: 'input',
      correctAnswer: '3.16',
      explanation: 'Mean = (2+4+6+8+10)/5 = 6. Variance = ((2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)²)/5 = (16+4+0+4+16)/5 = 40/5 = 8. Standard deviation = √8 ≈ 2.83',
      hint: 'Find the mean, then calculate the variance, and finally take the square root',
      difficulty: 'medium'
    },
    {
      id: 'stat-5',
      question: 'In a normal distribution with mean 70 and standard deviation 5, what percentage of data falls within one standard deviation of the mean?',
      type: 'input',
      correctAnswer: '68%',
      explanation: 'In a normal distribution, approximately 68% of the data falls within one standard deviation of the mean',
      hint: 'This is a fundamental property of the normal distribution',
      difficulty: 'medium'
    },
    {
      id: 'stat-6',
      question: 'If you roll a fair six-sided die, what is the probability of rolling a number greater than 4?',
      type: 'input',
      correctAnswer: '1/3',
      explanation: 'The favorable outcomes are 5 and 6, which is 2 outcomes. The total possible outcomes are 6. So the probability is 2/6 = 1/3',
      hint: 'Count the favorable outcomes and divide by the total possible outcomes',
      difficulty: 'easy'
    },
    {
      id: 'stat-7',
      question: 'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. If you draw one marble at random, what is the probability of drawing a blue marble?',
      type: 'input',
      correctAnswer: '0.3',
      explanation: 'There are 3 blue marbles out of 10 total marbles, so the probability is 3/10 = 0.3',
      hint: 'Divide the number of favorable outcomes by the total number of possible outcomes',
      difficulty: 'easy'
    },
    {
      id: 'stat-8',
      question: 'In a binomial distribution with n = 10 and p = 0.2, what is the probability of exactly 3 successes?',
      type: 'input',
      correctAnswer: '0.201',
      explanation: 'Using the binomial probability formula: P(X=3) = C(10,3) × 0.2³ × 0.8⁷ = 120 × 0.008 × 0.21 ≈ 0.201',
      hint: 'Use the binomial probability formula: P(X=k) = C(n,k) × p^k × (1-p)^(n-k)',
      latex: 'P(X=3) = \\binom{10}{3} \\cdot 0.2^3 \\cdot 0.8^7',
      difficulty: 'hard'
    },
    {
      id: 'stat-9',
      question: 'The correlation coefficient between two variables is -0.8. What does this indicate about their relationship?',
      type: 'multiple-choice',
      options: ['Strong positive correlation', 'Weak positive correlation', 'No correlation', 'Weak negative correlation', 'Strong negative correlation'],
      correctAnswer: 'Strong negative correlation',
      explanation: 'A correlation coefficient of -0.8 indicates a strong negative correlation, meaning as one variable increases, the other tends to decrease',
      hint: 'The correlation coefficient ranges from -1 to 1',
      difficulty: 'medium'
    },
    {
      id: 'stat-10',
      question: 'In hypothesis testing, what does a p-value of 0.03 indicate about the null hypothesis at a significance level of 0.05?',
      type: 'multiple-choice',
      options: ['Reject the null hypothesis', 'Fail to reject the null hypothesis', 'Accept the null hypothesis', 'The test is inconclusive'],
      correctAnswer: 'Reject the null hypothesis',
      explanation: 'Since the p-value (0.03) is less than the significance level (0.05), we reject the null hypothesis',
      hint: 'Compare the p-value to the significance level',
      difficulty: 'hard'
    }
  ],
  'linear-algebra': [
    {
      id: 'la-1',
      question: 'Find the determinant of the matrix [[2, 3], [1, 4]]',
      type: 'input',
      correctAnswer: '5',
      explanation: 'For a 2×2 matrix [[a, b], [c, d]], the determinant is ad - bc. Here, det = 2×4 - 3×1 = 8 - 3 = 5',
      hint: 'For a 2×2 matrix, use the formula det = ad - bc',
      latex: '\\begin{vmatrix} 2 & 3 \\\\ 1 & 4 \\end{vmatrix}',
      difficulty: 'medium'
    },
    {
      id: 'la-2',
      question: 'Find the rank of the matrix [[1, 2, 3], [2, 4, 6], [3, 6, 9]]',
      type: 'input',
      correctAnswer: '1',
      explanation: 'The second row is 2 times the first row, and the third row is 3 times the first row. So there is only one linearly independent row, making the rank 1',
      hint: 'Check for linear dependencies among the rows or columns',
      difficulty: 'medium'
    },
    {
      id: 'la-3',
      question: 'Find the eigenvalues of the matrix [[3, 1], [1, 3]]',
      type: 'input',
      correctAnswer: '2, 4',
      explanation: 'The characteristic equation is det(A - λI) = 0, which gives (3-λ)(3-λ) - 1 = 0, or (3-λ)² - 1 = 0, so (3-λ)² = 1, thus 3-λ = ±1, giving λ = 2 or λ = 4',
      hint: 'Set up and solve the characteristic equation det(A - λI) = 0',
      latex: '\\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}',
      difficulty: 'hard'
    },
    {
      id: 'la-4',
      question: 'Solve the system of linear equations: 2x + y = 5, 3x - 2y = 4',
      type: 'input',
      correctAnswer: 'x=2, y=1',
      explanation: 'From the first equation, y = 5 - 2x. Substituting into the second equation: 3x - 2(5 - 2x) = 4, so 3x - 10 + 4x = 4, thus 7x = 14, giving x = 2. Then y = 5 - 2(2) = 5 - 4 = 1',
      hint: 'Use substitution or elimination to solve the system',
      latex: '\\begin{cases} 2x + y = 5 \\\\ 3x - 2y = 4 \\end{cases}',
      difficulty: 'medium'
    },
    {
      id: 'la-5',
      question: 'Find the inverse of the matrix [[2, 1], [1, 1]]',
      type: 'input',
      correctAnswer: '[[1, -1], [-1, 2]]',
      explanation: 'For a 2×2 matrix [[a, b], [c, d]], the inverse is (1/det)[[d, -b], [-c, a]]. Here, det = 2×1 - 1×1 = 1, so the inverse is [[1, -1], [-1, 2]]',
      hint: 'Use the formula for the inverse of a 2×2 matrix',
      latex: '\\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}^{-1}',
      difficulty: 'medium'
    },
    {
      id: 'la-6',
      question: 'Find the dot product of the vectors [2, 3, 4] and [1, 0, -2]',
      type: 'input',
      correctAnswer: '-6',
      explanation: 'The dot product is calculated as 2×1 + 3×0 + 4×(-2) = 2 + 0 - 8 = -6',
      hint: 'Multiply corresponding components and sum the results',
      latex: '\\vec{a} \\cdot \\vec{b} = \\sum_{i} a_i b_i',
      difficulty: 'easy'
    },
    {
      id: 'la-7',
      question: 'Find the cross product of the vectors [1, 0, 0] and [0, 1, 0]',
      type: 'input',
      correctAnswer: '[0, 0, 1]',
      explanation: 'The cross product is calculated using the determinant formula, giving [0, 0, 1]',
      hint: 'Use the determinant formula for cross product',
      latex: '\\vec{a} \\times \\vec{b}',
      difficulty: 'medium'
    },
    {
      id: 'la-8',
      question: 'Find a basis for the null space of the matrix [[1, 2, 3], [2, 4, 6]]',
      type: 'input',
      correctAnswer: '[1, -2, 1]',
      explanation: 'The null space consists of vectors [x, y, z] such that x + 2y + 3z = 0 and 2x + 4y + 6z = 0. The second equation is a multiple of the first, so we only need to solve x + 2y + 3z = 0. If we set y = 2 and z = -1, we get x = -1. So a basis vector is [-1, 2, -1], or equivalently [1, -2, 1]',
      hint: 'Find vectors that satisfy Ax = 0',
      difficulty: 'hard'
    },
    {
      id: 'la-9',
      question: 'Is the set of vectors {[1, 1, 0], [0, 1, 1], [1, 0, 1]} linearly independent?',
      type: 'multiple-choice',
      options: ['Yes', 'No'],
      correctAnswer: 'Yes',
      explanation: 'To check linear independence, we form a matrix with these vectors as rows and compute its determinant. The determinant is non-zero, so the vectors are linearly independent',
      hint: 'Check if any vector can be expressed as a linear combination of the others',
      difficulty: 'hard'
    },
    {
      id: 'la-10',
      question: 'Find the eigenvalues of the matrix [[0, 1], [-1, 0]]',
      type: 'input',
      correctAnswer: 'i, -i',
      explanation: 'The characteristic equation is det(A - λI) = 0, which gives λ² + 1 = 0, so λ = ±i',
      hint: 'Set up and solve the characteristic equation det(A - λI) = 0',
      latex: '\\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix}',
      difficulty: 'hard'
    }
  ],
  'number-theory': [
    {
      id: 'nt-1',
      question: 'Find the greatest common divisor (GCD) of 48 and 36',
      type: 'input',
      correctAnswer: '12',
      explanation: 'Using the Euclidean algorithm: 48 = 36 × 1 + 12, 36 = 12 × 3 + 0. So the GCD is 12',
      hint: 'Use the Euclidean algorithm or find all common factors',
      difficulty: 'easy'
    },
    {
      id: 'nt-2',
      question: 'Find the least common multiple (LCM) of 15 and 25',
      type: 'input',
      correctAnswer: '75',
      explanation: 'LCM(15, 25) = (15 × 25) / GCD(15, 25) = 375 / 5 = 75',
      hint: 'Use the formula: LCM(a,b) = (a × b) / GCD(a,b)',
      difficulty: 'easy'
    },
    {
      id: 'nt-3',
      question: 'Is 127 a prime number?',
      type: 'multiple-choice',
      options: ['Yes', 'No'],
      correctAnswer: 'Yes',
      explanation: '127 is only divisible by 1 and itself, making it a prime number',
      hint: 'Check if the number has any divisors other than 1 and itself',
      difficulty: 'medium'
    },
    {
      id: 'nt-4',
      question: 'Find the prime factorization of 84',
      type: 'input',
      correctAnswer: '2² × 3 × 7',
      explanation: '84 = 2 × 42 = 2 × 2 × 21 = 2² × 3 × 7',
      hint: 'Break down the number into its prime factors',
      difficulty: 'medium'
    },
    {
      id: 'nt-5',
      question: 'Solve the congruence equation: 3x ≡ 5 (mod 7)',
      type: 'input',
      correctAnswer: '4',
      explanation: 'Multiply both sides by the modular multiplicative inverse of 3 modulo 7, which is 5: 3x ≡ 5 (mod 7) implies 5 × 3x ≡ 5 × 5 (mod 7), so 15x ≡ 25 (mod 7), which simplifies to x ≡ 4 (mod 7)',
      hint: 'Find the modular multiplicative inverse of the coefficient',
      latex: '3x \\equiv 5 \\pmod{7}',
      difficulty: 'hard'
    },
    {
      id: 'nt-6',
      question: 'How many positive integers less than 50 are relatively prime to 50?',
      type: 'input',
      correctAnswer: '20',
      explanation: 'We need to find φ(50), where φ is Euler\'s totient function. Since 50 = 2 × 5², φ(50) = φ(2) × φ(5²) = 1 × 5²(1-1/5) = 25 × 4/5 = 20',
      hint: 'Use Euler\'s totient function',
      difficulty: 'hard'
    },
    {
      id: 'nt-7',
      question: 'Find the remainder when 3^17 is divided by 7',
      type: 'input',
      correctAnswer: '5',
      explanation: 'Using Fermat\'s Little Theorem, since 7 is prime, 3^6 ≡ 1 (mod 7). So 3^17 = 3^(6×2+5) = (3^6)^2 × 3^5 ≡ 1^2 × 3^5 ≡ 3^5 (mod 7). Now 3^5 = 3^4 × 3 = 81 × 3 = 243 ≡ 5 (mod 7)',
      hint: 'Use Fermat\'s Little Theorem or find a pattern in the powers of 3 modulo 7',
      latex: '3^{17} \\bmod 7',
      difficulty: 'hard'
    },
    {
      id: 'nt-8',
      question: 'Find all solutions to the Diophantine equation: 3x + 5y = 7',
      type: 'input',
      correctAnswer: 'x=4-5k, y=-1+3k',
      explanation: 'Using the Extended Euclidean Algorithm, we find that 3(4) + 5(-1) = 7. The general solution is x = 4 - 5k, y = -1 + 3k for integer k',
      hint: 'Use the Extended Euclidean Algorithm to find a particular solution, then generate the general solution',
      latex: '3x + 5y = 7',
      difficulty: 'hard'
    },
    {
      id: 'nt-9',
      question: 'How many trailing zeros does 50! have?',
      type: 'input',
      correctAnswer: '12',
      explanation: 'Trailing zeros come from factors of 10, which come from pairs of 2 and 5. Since there are more factors of 2 than 5, we only need to count factors of 5. [50/5] + [50/25] = 10 + 2 = 12',
      hint: 'Count the factors of 5 in the prime factorization',
      latex: '50!',
      difficulty: 'medium'
    },
    {
      id: 'nt-10',
      question: 'Find the last digit of 7^123',
      type: 'input',
      correctAnswer: '3',
      explanation: 'The last digit of 7^n follows a cycle of 4: 7, 9, 3, 1, ... Since 123 ≡ 3 (mod 4), the last digit is the same as 7^3 = 343, which is 3',
      hint: 'Find the pattern of last digits in powers of 7',
      latex: '7^{123}',
      difficulty: 'medium'
    }
  ],
  'discrete-math': [
    {
      id: 'dm-1',
      question: 'How many different 5-card hands can be dealt from a standard 52-card deck?',
      type: 'input',
      correctAnswer: '2598960',
      explanation: 'This is a combination problem: C(52,5) = 52!/(5!×47!) = 2,598,960',
      hint: 'Use the combination formula: C(n,r) = n!/(r!×(n-r)!)',
      latex: '\\binom{52}{5}',
      difficulty: 'medium'
    },
    {
      id: 'dm-2',
      question: 'In how many ways can 5 different books be arranged on a shelf?',
      type: 'input',
      correctAnswer: '120',
      explanation: 'This is a permutation problem: P(5,5) = 5! = 5×4×3×2×1 = 120',
      hint: 'Use the permutation formula: P(n,r) = n!/(n-r)!',
      difficulty: 'easy'
    },
    {
      id: 'dm-3',
      question: 'What is the negation of the statement "All cats are black"?',
      type: 'input',
      correctAnswer: 'Some cats are not black',
      explanation: 'The negation of "All A are B" is "Some A are not B"',
      hint: 'Think about what would make the original statement false',
      difficulty: 'medium'
    },
    {
      id: 'dm-4',
      question: 'Simplify the Boolean expression: (A AND B) OR (A AND (NOT B))',
      type: 'input',
      correctAnswer: 'A',
      explanation: '(A AND B) OR (A AND (NOT B)) = A AND (B OR (NOT B)) = A AND TRUE = A',
      hint: 'Use the distributive property and the fact that B OR (NOT B) = TRUE',
      latex: '(A \\land B) \\lor (A \\land \\lnot B)',
      difficulty: 'medium'
    },
    {
      id: 'dm-5',
      question: 'How many edges does a complete graph with 6 vertices have?',
      type: 'input',
      correctAnswer: '15',
      explanation: 'In a complete graph with n vertices, each vertex is connected to all other vertices. The number of edges is C(n,2) = n(n-1)/2 = 6×5/2 = 15',
      hint: 'Use the formula for the number of edges in a complete graph',
      difficulty: 'medium'
    },
    {
      id: 'dm-6',
      question: 'What is the coefficient of x^3y^2 in the expansion of (x + y)^5?',
      type: 'input',
      correctAnswer: '10',
      explanation: 'Using the binomial theorem, the coefficient is C(5,3) = 5!/(3!×2!) = 10',
      hint: 'Use the binomial theorem: (x + y)^n = Σ C(n,k) x^(n-k) y^k',
      latex: '(x + y)^5',
      difficulty: 'medium'
    },
    {
      id: 'dm-7',
      question: 'Solve the recurrence relation a_n = a_{n-1} + a_{n-2} with initial conditions a_0 = 0, a_1 = 1',
      type: 'input',
      correctAnswer: 'Fibonacci sequence',
      explanation: 'This recurrence relation with these initial conditions defines the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...',
      hint: 'Try computing the first few terms of the sequence',
      latex: 'a_n = a_{n-1} + a_{n-2}',
      difficulty: 'medium'
    },
    {
      id: 'dm-8',
      question: 'Is the relation R = {(1,1), (1,2), (2,2), (3,3)} on the set {1, 2, 3} reflexive?',
      type: 'multiple-choice',
      options: ['Yes', 'No'],
      correctAnswer: 'Yes',
      explanation: 'A relation is reflexive if (a,a) ∈ R for all a in the set. Here, (1,1), (2,2), and (3,3) are all in R, so the relation is reflexive',
      hint: 'Check if (a,a) is in the relation for every element a in the set',
      difficulty: 'medium'
    },
    {
      id: 'dm-9',
      question: 'How many different ways can 3 distinct prizes be distributed among 5 people?',
      type: 'input',
      correctAnswer: '60',
      explanation: 'This is a permutation problem: P(5,3) = 5!/(5-3)! = 5!/2! = 5×4×3 = 60',
      hint: 'Use the permutation formula: P(n,r) = n!/(n-r)!',
      difficulty: 'medium'
    },
    {
      id: 'dm-10',
      question: 'What is the chromatic number of a cycle graph with 5 vertices?',
      type: 'input',
      correctAnswer: '3',
      explanation: 'The chromatic number of a cycle graph with n vertices is 2 if n is even, and 3 if n is odd. Since 5 is odd, the chromatic number is 3',
      hint: 'The chromatic number is the minimum number of colors needed to color the vertices such that no adjacent vertices have the same color',
      difficulty: 'hard'
    }
  ],
  'differential-equations': [
    {
      id: 'de-1',
      question: 'Find the general solution to the differential equation dy/dx = 2x',
      type: 'input',
      correctAnswer: 'y = x² + C',
      explanation: 'Integrating both sides: ∫dy = ∫2x dx, so y = x² + C, where C is the constant of integration',
      hint: 'Integrate both sides of the equation',
      latex: '\\frac{dy}{dx} = 2x',
      difficulty: 'easy'
    },
    {
      id: 'de-2',
      question: 'Solve the initial value problem: dy/dx = 3x², y(0) = 1',
      type: 'input',
      correctAnswer: 'y = x³ + 1',
      explanation: 'Integrating both sides: ∫dy = ∫3x² dx, so y = x³ + C. Using the initial condition y(0) = 1, we get 1 = 0³ + C, so C = 1. Therefore, y = x³ + 1',
      hint: 'Find the general solution first, then use the initial condition to find the specific solution',
      latex: '\\frac{dy}{dx} = 3x^2, \\, y(0) = 1',
      difficulty: 'medium'
    },
    {
      id: 'de-3',
      question: 'Find the general solution to the differential equation dy/dx = y',
      type: 'input',
      correctAnswer: 'y = Ce^x',
      explanation: 'This is a separable equation: dy/y = dx. Integrating both sides: ∫dy/y = ∫dx, so ln|y| = x + C₁, which gives y = Ce^x, where C = ±e^C₁',
      hint: 'Separate the variables and integrate',
      latex: '\\frac{dy}{dx} = y',
      difficulty: 'medium'
    },
    {
      id: 'de-4',
      question: 'Solve the differential equation: y\'\' - 4y\' + 4y = 0',
      type: 'input',
      correctAnswer: 'y = C₁e^(2x) + C₂xe^(2x)',
      explanation: 'The characteristic equation is r² - 4r + 4 = 0, which factors as (r - 2)² = 0, giving r = 2 with multiplicity 2. The general solution is y = C₁e^(2x) + C₂xe^(2x)',
      hint: 'Find the characteristic equation and determine its roots',
      latex: 'y\'\' - 4y\' + 4y = 0',
      difficulty: 'hard'
    },
    {
      id: 'de-5',
      question: 'Find the general solution to the differential equation: y\' + 2y = 4',
      type: 'input',
      correctAnswer: 'y = 2 + Ce^(-2x)',
      explanation: 'This is a first-order linear equation. Using the integrating factor method with μ = e^(∫2dx) = e^(2x), we get e^(2x)y\' + 2e^(2x)y = 4e^(2x), which simplifies to d/dx(e^(2x)y) = 4e^(2x). Integrating both sides: e^(2x)y = 2e^(2x) + C, so y = 2 + Ce^(-2x)',
      hint: 'Use the integrating factor method',
      latex: 'y\' + 2y = 4',
      difficulty: 'medium'
    },
    {
      id: 'de-6',
      question: 'Solve the initial value problem: y\' = -2y, y(0) = 3',
      type: 'input',
      correctAnswer: 'y = 3e^(-2x)',
      explanation: 'This is a separable equation: dy/y = -2dx. Integrating both sides: ∫dy/y = ∫-2dx, so ln|y| = -2x + C₁, which gives y = Ce^(-2x). Using the initial condition y(0) = 3, we get 3 = Ce^0, so C = 3. Therefore, y = 3e^(-2x)',
      hint: 'Separate the variables, integrate, and then use the initial condition',
      latex: 'y\' = -2y, \\, y(0) = 3',
      difficulty: 'medium'
    },
    {
      id: 'de-7',
      question: 'Find the general solution to the differential equation: y\'\' + 9y = 0',
      type: 'input',
      correctAnswer: 'y = C₁cos(3x) + C₂sin(3x)',
      explanation: 'The characteristic equation is r² + 9 = 0, which gives r = ±3i. The general solution is y = C₁cos(3x) + C₂sin(3x)',
      hint: 'Find the characteristic equation and determine its roots',
      latex: 'y\'\' + 9y = 0',
      difficulty: 'medium'
    },
    {
      id: 'de-8',
      question: 'Solve the differential equation: y\' = x²y',
      type: 'input',
      correctAnswer: 'y = Ce^(x³/3)',
      explanation: 'This is a separable equation: dy/y = x²dx. Integrating both sides: ∫dy/y = ∫x²dx, so ln|y| = x³/3 + C₁, which gives y = Ce^(x³/3), where C = ±e^C₁',
      hint: 'Separate the variables and integrate',
      latex: 'y\' = x^2y',
      difficulty: 'medium'
    },
    {
      id: 'de-9',
      question: 'Find the particular solution to the differential equation y\'\' + 4y = 8cos(2x)',
      type: 'input',
      correctAnswer: 'y = 2cos(2x)',
      explanation: 'Since the right side involves cos(2x), we try a particular solution of the form y_p = A·cos(2x). Substituting into the equation and solving for A gives A = 2, so y_p = 2cos(2x)',
      hint: 'Use the method of undetermined coefficients',
      latex: 'y\'\' + 4y = 8\\cos(2x)',
      difficulty: 'hard'
    },
    {
      id: 'de-10',
      question: 'Solve the system of differential equations: x\' = x + 2y, y\' = 2x + y',
      type: 'input',
      correctAnswer: 'x = C₁e^(3x) + C₂e^(-x), y = C₁e^(3x) - C₂e^(-x)',
      explanation: 'This system can be solved using eigenvalues and eigenvectors of the coefficient matrix [[1, 2], [2, 1]]. The eigenvalues are 3 and -1, leading to the general solution',
      hint: 'Find the eigenvalues and eigenvectors of the coefficient matrix',
      latex: '\\begin{cases} x\' = x + 2y \\\\ y\' = 2x + y \\end{cases}',
      difficulty: 'hard'
    }
  ],
  'complex-analysis': [
    {
      id: 'ca-1',
      question: 'Find the modulus of the complex number 3 + 4i',
      type: 'input',
      correctAnswer: '5',
      explanation: 'The modulus is calculated as |z| = √(a² + b²) = √(3² + 4²) = √(9 + 16) = √25 = 5',
      hint: 'Use the formula |a + bi| = √(a² + b²)',
      latex: '|3 + 4i|',
      difficulty: 'easy'
    },
    {
      id: 'ca-2',
      question: 'Express the complex number 2 + 2i in polar form',
      type: 'input',
      correctAnswer: '2√2 e^(iπ/4)',
      explanation: 'First find the modulus: |2 + 2i| = √(2² + 2²) = √8 = 2√2. Then find the argument: θ = tan⁻¹(2/2) = tan⁻¹(1) = π/4. So the polar form is 2√2 e^(iπ/4)',
      hint: 'Find the modulus and argument, then use the formula r·e^(iθ)',
      latex: '2 + 2i',
      difficulty: 'medium'
    },
    {
      id: 'ca-3',
      question: 'Find all solutions to the equation z³ = 8',
      type: 'input',
      correctAnswer: '2, 2e^(2πi/3), 2e^(4πi/3)',
      explanation: 'Writing z³ = 8 in polar form: z³ = 8e^(i·0). So z = 8^(1/3)·e^(i·0/3 + i·2πk/3) for k = 0, 1, 2. This gives z = 2, 2e^(2πi/3), 2e^(4πi/3)',
      hint: 'Use De Moivre\'s formula and the fact that there are three cube roots',
      latex: 'z^3 = 8',
      difficulty: 'hard'
    },
    {
      id: 'ca-4',
      question: 'Find the real part of (3 - 2i)²',
      type: 'input',
      correctAnswer: '5',
      explanation: '(3 - 2i)² = 9 - 12i + 4i² = 9 - 12i + 4(-1) = 9 - 12i - 4 = 5 - 12i. So the real part is 5',
      hint: 'Expand the expression and identify the real part',
      latex: '\\text{Re}((3 - 2i)^2)',
      difficulty: 'medium'
    },
    {
      id: 'ca-5',
      question: 'Evaluate the integral ∮_C z dz, where C is the unit circle centered at the origin',
      type: 'input',
      correctAnswer: '0',
      explanation: 'By Cauchy\'s theorem, the integral of an analytic function around a closed contour is zero. Since f(z) = z is analytic everywhere, the integral is 0',
      hint: 'Use Cauchy\'s theorem',
      latex: '\\oint_C z \\, dz',
      difficulty: 'medium'
    },
    {
      id: 'ca-6',
      question: 'Find the residue of f(z) = 1/z² at z = 0',
      type: 'input',
      correctAnswer: '0',
      explanation: 'For a function with a pole of order m at z = a, the residue is given by Res(f, a) = (1/(m-1)!)·lim(z→a) d^(m-1)/dz^(m-1) [(z-a)^m·f(z)]. Here, f(z) = 1/z² has a pole of order 2 at z = 0, so Res(f, 0) = lim(z→0) d/dz [z²·(1/z²)] = lim(z→0) d/dz [1] = 0',
      hint: 'Use the formula for the residue at a pole of order m',
      latex: '\\text{Res}(f, 0) \\text{ where } f(z) = \\frac{1}{z^2}',
      difficulty: 'hard'
    },
    {
      id: 'ca-7',
      question: 'Find the Laurent series expansion of f(z) = 1/(z-1) about z = 0',
      type: 'input',
      correctAnswer: '-1/1 - 1/z - 1/z² - 1/z³ - ...',
      explanation: 'We can rewrite f(z) = 1/(z-1) = -1/(1-z) = -1·(1 + z + z² + z³ + ...) for |z| < 1. So the Laurent series is -1 - z - z² - z³ - ...',
      hint: 'Use the geometric series expansion',
      latex: '\\frac{1}{z-1}',
      difficulty: 'hard'
    },
    {
      id: 'ca-8',
      question: 'Is the function f(z) = |z|² analytic?',
      type: 'multiple-choice',
      options: ['Yes', 'No'],
      correctAnswer: 'No',
      explanation: 'The function f(z) = |z|² = z·z̄ does not satisfy the Cauchy-Riemann equations, so it is not analytic',
      hint: 'Check if the function satisfies the Cauchy-Riemann equations',
      latex: 'f(z) = |z|^2',
      difficulty: 'medium'
    },
    {
      id: 'ca-9',
      question: 'Find the image of the circle |z| = 2 under the mapping w = z²',
      type: 'input',
      correctAnswer: '|w| = 4',
      explanation: 'If z = 2e^(iθ), then w = z² = 4e^(i2θ), which traces the circle |w| = 4 twice as θ varies from 0 to 2π',
      hint: 'Express points on the original circle in polar form, then apply the mapping',
      latex: 'w = z^2',
      difficulty: 'hard'
    },
    {
      id: 'ca-10',
      question: 'Find all values of z such that e^z = 1',
      type: 'input',
      correctAnswer: 'z = 2πni, where n is an integer',
      explanation: 'If e^z = 1, then z = ln(1) + 2πni = 2πni for integer n',
      hint: 'Remember that the complex logarithm is multi-valued',
      latex: 'e^z = 1',
      difficulty: 'medium'
    }
  ],
  'probability': [
    {
      id: 'prob-1',
      question: 'If you roll two fair six-sided dice, what is the probability of getting a sum of 7?',
      type: 'input',
      correctAnswer: '1/6',
      explanation: 'There are 6 ways to get a sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). The total number of possible outcomes is 6×6 = 36. So the probability is 6/36 = 1/6',
      hint: 'Count the favorable outcomes and divide by the total number of possible outcomes',
      difficulty: 'easy'
    },
    {
      id: 'prob-2',
      question: 'A bag contains 4 red balls and 6 blue balls. If 3 balls are drawn without replacement, what is the probability that all 3 are red?',
      type: 'input',
      correctAnswer: '1/30',
      explanation: 'The probability is C(4,3)/C(10,3) = 4/(10×9×8/6) = 4/120 = 1/30',
      hint: 'Use the combination formula and the definition of probability',
      difficulty: 'medium'
    },
    {
      id: 'prob-3',
      question: 'If P(A) = 0.3, P(B) = 0.4, and P(A ∩ B) = 0.1, what is P(A ∪ B)?',
      type: 'input',
      correctAnswer: '0.6',
      explanation: 'Using the formula P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.3 + 0.4 - 0.1 = 0.6',
      hint: 'Use the formula for the probability of a union',
      latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
      difficulty: 'medium'
    },
    {
      id: 'prob-4',
      question: 'A fair coin is tossed 5 times. What is the probability of getting exactly 3 heads?',
      type: 'input',
      correctAnswer: '5/16',
      explanation: 'The probability is C(5,3) × (1/2)^3 × (1/2)^2 = 10 × (1/2)^5 = 10/32 = 5/16',
      hint: 'Use the binomial probability formula',
      latex: 'P(X=3) = \\binom{5}{3} \\cdot (\\frac{1}{2})^3 \\cdot (\\frac{1}{2})^2',
      difficulty: 'medium'
    },
    {
      id: 'prob-5',
      question: 'If X is a random variable with mean 5 and variance 4, what is E[3X + 2]?',
      type: 'input',
      correctAnswer: '17',
      explanation: 'Using the properties of expectation: E[3X + 2] = 3E[X] + 2 = 3×5 + 2 = 15 + 2 = 17',
      hint: 'Use the linearity of expectation',
      latex: 'E[3X + 2]',
      difficulty: 'medium'
    },
    {
      id: 'prob-6',
      question: 'If X and Y are independent random variables with Var(X) = 3 and Var(Y) = 5, what is Var(2X - 3Y)?',
      type: 'input',
      correctAnswer: '57',
      explanation: 'Using the properties of variance: Var(2X - 3Y) = 2²Var(X) + (-3)²Var(Y) = 4×3 + 9×5 = 12 + 45 = 57',
      hint: 'Use the formula for the variance of a linear combination of independent random variables',
      latex: 'Var(2X - 3Y)',
      difficulty: 'hard'
    },
    {
      id: 'prob-7',
      question: 'In a standard normal distribution, what is the probability that Z is between -1 and 1?',
      type: 'input',
      correctAnswer: '0.6827',
      explanation: 'For a standard normal distribution, P(-1 < Z < 1) ≈ 0.6827 or about 68.27%',
      hint: 'Use the properties of the standard normal distribution',
      latex: 'P(-1 < Z < 1)',
      difficulty: 'medium'
    },
    {
      id: 'prob-8',
      question: 'If X follows a Poisson distribution with parameter λ = 3, what is P(X = 2)?',
      type: 'input',
      correctAnswer: '0.224',
      explanation: 'Using the Poisson PMF: P(X = 2) = e^(-3) × 3^2 / 2! = e^(-3) × 9 / 2 ≈ 0.224',
      hint: 'Use the Poisson probability mass function',
      latex: 'P(X = 2) = \\frac{e^{-\\lambda} \\lambda^k}{k!}',
      difficulty: 'medium'
    },
    {
      id: 'prob-9',
      question: 'If X follows a uniform distribution on [0, 4], what is the probability that X > 3 given that X > 2?',
      type: 'input',
      correctAnswer: '0.5',
      explanation: 'Using conditional probability: P(X > 3 | X > 2) = P(X > 3 and X > 2) / P(X > 2) = P(X > 3) / P(X > 2) = (4-3)/4 / (4-2)/4 = 1/4 / 2/4 = 1/2 = 0.5',
      hint: 'Use the formula for conditional probability',
      latex: 'P(X > 3 | X > 2)',
      difficulty: 'hard'
    },
    {
      id: 'prob-10',
      question: 'If X and Y are independent standard normal random variables, what is the distribution of Z = X² + Y²?',
      type: 'input',
      correctAnswer: 'Chi-square with 2 degrees of freedom',
      explanation: 'The sum of squares of independent standard normal random variables follows a chi-square distribution with degrees of freedom equal to the number of terms in the sum',
      hint: 'Think about the definition of the chi-square distribution',
      latex: 'Z = X^2 + Y^2',
      difficulty: 'hard'
    }
  ],
  mixed: [
    {
      id: 'mixed-1',
      question: 'If f(x) = x² + 2x and g(x) = 3x - 1, find f(g(2))',
      type: 'input',
      correctAnswer: '25',
      explanation: 'g(2) = 3(2) - 1 = 5, then f(g(2)) = f(5) = 5² + 2(5) = 25 + 10 = 35',
      hint: 'First find g(2), then substitute that value into f(x)',
      latex: 'f(g(2))',
      difficulty: 'medium',
      category: 'algebra'
    },
    {
      id: 'mixed-2',
      question: 'The volume of a cube is 27 cubic units. What is the surface area?',
      type: 'input',
      correctAnswer: '54',
      explanation: 'Volume = s³, so s³ = 27, thus s = 3. Surface area = 6s² = 6(3)² = 6(9) = 54 square units',
      hint: 'First find the side length of the cube using the volume formula',
      latex: 'V = s^3, SA = 6s^2',
      difficulty: 'medium',
      category: 'geometry'
    },
    {
      id: 'mixed-3',
      question: 'Find the derivative of f(x) = x·sin(x)',
      type: 'input',
      correctAnswer: 'sin(x) + x·cos(x)',
      explanation: 'Using the product rule: f\'(x) = 1·sin(x) + x·cos(x) = sin(x) + x·cos(x)',
      hint: 'Apply the product rule: (f·g)\' = f\'·g + f·g\'',
      latex: 'f(x) = x \\cdot \\sin(x)',
      difficulty: 'medium',
      category: 'calculus'
    },
    {
      id: 'mixed-4',
      question: 'If cos(θ) = 0.6, what is sin(θ)?',
      type: 'input',
      correctAnswer: '0.8',
      explanation: 'Using the Pythagorean identity: sin²(θ) + cos²(θ) = 1, so sin²(θ) = 1 - cos²(θ) = 1 - 0.6² = 1 - 0.36 = 0.64, thus sin(θ) = ±0.8. Since the problem doesn\'t specify the quadrant, both +0.8 and -0.8 are valid answers, but typically we assume the positive value.',
      hint: 'Use the Pythagorean identity: sin²(θ) + cos²(θ) = 1',
      latex: '\\cos(\\theta) = 0.6',
      difficulty: 'medium',
      category: 'trigonometry'
    },
    {
      id: 'mixed-5',
      question: 'In a normal distribution, what percentage of data falls within two standard deviations of the mean?',
      type: 'input',
      correctAnswer: '95%',
      explanation: 'In a normal distribution, approximately 95% of the data falls within two standard deviations of the mean',
      hint: 'This is a fundamental property of the normal distribution',
      difficulty: 'medium',
      category: 'statistics'
    },
    {
      id: 'mixed-6',
      question: 'Find the determinant of the matrix [[3, 1], [2, 4]]',
      type: 'input',
      correctAnswer: '10',
      explanation: 'For a 2×2 matrix [[a, b], [c, d]], the determinant is ad - bc. Here, det = 3×4 - 1×2 = 12 - 2 = 10',
      hint: 'Use the formula for the determinant of a 2×2 matrix',
      latex: '\\begin{vmatrix} 3 & 1 \\\\ 2 & 4 \\end{vmatrix}',
      difficulty: 'medium',
      category: 'linear-algebra'
    },
    {
      id: 'mixed-7',
      question: 'Find the prime factorization of 56',
      type: 'input',
      correctAnswer: '2³ × 7',
      explanation: '56 = 2 × 28 = 2 × 2 × 14 = 2² × 2 × 7 = 2³ × 7',
      hint: 'Break down the number into its prime factors',
      difficulty: 'easy',
      category: 'number-theory'
    },
    {
      id: 'mixed-8',
      question: 'How many different ways can 4 people be seated in a row of 4 chairs?',
      type: 'input',
      correctAnswer: '24',
      explanation: 'This is a permutation problem: P(4,4) = 4! = 4×3×2×1 = 24',
      hint: 'Use the permutation formula: P(n,r) = n!/(n-r)!',
      difficulty: 'easy',
      category: 'discrete-math'
    },
    {
      id: 'mixed-9',
      question: 'Solve the differential equation: y\' + y = e^x',
      type: 'input',
      correctAnswer: 'y = e^x/2 + Ce^(-x)',
      explanation: 'This is a first-order linear equation. Using the integrating factor method with μ = e^(∫1dx) = e^x, we get e^x·y\' + e^x·y = e^x·e^x = e^(2x), which simplifies to d/dx(e^x·y) = e^(2x). Integrating both sides: e^x·y = e^(2x)/2 + C, so y = e^x/2 + Ce^(-x)',
      hint: 'Use the integrating factor method',
      latex: 'y\' + y = e^x',
      difficulty: 'hard',
      category: 'differential-equations'
    },
    {
      id: 'mixed-10',
      question: 'Find the value of i^i, where i is the imaginary unit',
      type: 'input',
      correctAnswer: 'e^(-π/2)',
      explanation: 'Using Euler\'s formula: i = e^(iπ/2). So i^i = (e^(iπ/2))^i = e^(iπ/2 · i) = e^(-π/2)',
      hint: 'Use Euler\'s formula and the properties of complex exponentiation',
      latex: 'i^i',
      difficulty: 'hard',
      category: 'complex-analysis'
    }
  ]
};

// Function to get exercises for a specific category
export const getExercisesForCategory = (category: ProblemCategory): Exercise[] => {
  return exerciseDatabase[category] || [];
};

// Function to get exercises by difficulty
export const getExercisesByDifficulty = (
  category: ProblemCategory, 
  difficulty: 'easy' | 'medium' | 'hard'
): Exercise[] => {
  return exerciseDatabase[category].filter(ex => ex.difficulty === difficulty);
};

// Function to search exercises
export const searchExercises = (query: string): Exercise[] => {
  const results: Exercise[] = [];
  const lowerQuery = query.toLowerCase();
  
  Object.values(exerciseDatabase).forEach(exercises => {
    exercises.forEach(exercise => {
      if (
        exercise.question.toLowerCase().includes(lowerQuery) ||
        (exercise.explanation?.toLowerCase().includes(lowerQuery)) ||
        (exercise.hint?.toLowerCase().includes(lowerQuery))
      ) {
        results.push(exercise);
      }
    });
  });
  
  return results;
};