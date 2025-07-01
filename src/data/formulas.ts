import { Formula } from '../types';

export const mathFormulas: Formula[] = [
  // ==================== ALGEBRA ====================
  {
    id: 'quadratic-formula',
    name: 'Quadratic Formula',
    category: 'algebra',
    description: 'Solves quadratic equations of the form ax² + bx + c = 0. Essential for finding roots of parabolic functions in engineering, physics, and economics.',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    variables: [
      { symbol: 'a', name: 'quadratic coefficient', description: 'Coefficient of x² term (must not be zero)', units: 'dimensionless' },
      { symbol: 'b', name: 'linear coefficient', description: 'Coefficient of x term', units: 'dimensionless' },
      { symbol: 'c', name: 'constant term', description: 'The constant coefficient', units: 'dimensionless' },
      { symbol: 'x', name: 'solutions', description: 'The two roots of the quadratic equation', units: 'dimensionless' }
    ],
    examples: [
      {
        description: 'Solve x² - 5x + 6 = 0 (finding when a projectile hits the ground)',
        given: { a: 1, b: -5, c: 6 },
        solution: 'x = 2 or x = 3',
        latex: 'x = \\frac{5 \\pm \\sqrt{25 - 24}}{2} = \\frac{5 \\pm 1}{2}'
      }
    ],
    relatedFormulas: ['discriminant', 'completing-square', 'factoring']
  },

  {
    id: 'slope-intercept-form',
    name: 'Slope-Intercept Form',
    category: 'algebra',
    description: 'Linear equation form used in economics for cost functions, engineering for linear relationships, and data analysis for trend lines.',
    latex: 'y = mx + b',
    variables: [
      { symbol: 'y', name: 'dependent variable', description: 'Output or response variable', units: 'varies' },
      { symbol: 'x', name: 'independent variable', description: 'Input or predictor variable', units: 'varies' },
      { symbol: 'm', name: 'slope', description: 'Rate of change (rise over run)', units: 'y-units/x-units' },
      { symbol: 'b', name: 'y-intercept', description: 'Value of y when x = 0', units: 'y-units' }
    ],
    examples: [
      {
        description: 'Monthly phone bill: $25 base fee + $0.10 per minute',
        given: { m: 0.10, b: 25 },
        solution: 'y = 0.10x + 25',
        latex: 'Cost = 0.10 \\times minutes + 25'
      }
    ],
    relatedFormulas: ['point-slope-form', 'standard-form']
  },

  {
    id: 'point-slope-form',
    name: 'Point-Slope Form',
    category: 'algebra',
    description: 'Linear equation when you know a point and slope. Used in physics for motion equations and economics for rate analysis.',
    latex: 'y - y_1 = m(x - x_1)',
    variables: [
      { symbol: '(x₁,y₁)', name: 'known point', description: 'A point on the line', units: 'coordinate units' },
      { symbol: 'm', name: 'slope', description: 'Rate of change of the line', units: 'y-units/x-units' }
    ],
    examples: [
      {
        description: 'Line through (2,3) with slope 4',
        given: { x1: 2, y1: 3, m: 4 },
        solution: 'y - 3 = 4(x - 2)',
        latex: 'y - 3 = 4(x - 2)'
      }
    ],
    relatedFormulas: ['slope-intercept-form', 'two-point-form']
  },

  {
    id: 'compound-interest',
    name: 'Compound Interest Formula',
    category: 'algebra',
    description: 'Calculates investment growth over time. Critical for financial planning, retirement savings, and loan calculations.',
    latex: 'A = P\\left(1 + \\frac{r}{n}\\right)^{nt}',
    variables: [
      { symbol: 'A', name: 'final amount', description: 'Total amount after interest', units: 'currency' },
      { symbol: 'P', name: 'principal', description: 'Initial investment amount', units: 'currency' },
      { symbol: 'r', name: 'annual interest rate', description: 'Interest rate as decimal (e.g., 0.05 for 5%)', units: 'decimal' },
      { symbol: 'n', name: 'compounding frequency', description: 'Number of times interest compounds per year', units: 'times/year' },
      { symbol: 't', name: 'time', description: 'Investment period', units: 'years' }
    ],
    examples: [
      {
        description: '$1000 invested at 5% annual interest, compounded monthly for 10 years',
        given: { P: 1000, r: 0.05, n: 12, t: 10 },
        solution: '$1647.01',
        latex: 'A = 1000\\left(1 + \\frac{0.05}{12}\\right)^{12 \\times 10}'
      }
    ],
    relatedFormulas: ['simple-interest', 'continuous-compound']
  },

  {
    id: 'exponential-growth',
    name: 'Exponential Growth/Decay',
    category: 'algebra',
    description: 'Models population growth, radioactive decay, bacterial growth, and depreciation in business and science.',
    latex: 'N(t) = N_0 e^{rt}',
    variables: [
      { symbol: 'N(t)', name: 'amount at time t', description: 'Quantity at time t', units: 'varies' },
      { symbol: 'N₀', name: 'initial amount', description: 'Starting quantity', units: 'varies' },
      { symbol: 'r', name: 'growth rate', description: 'Growth rate (positive) or decay rate (negative)', units: '1/time' },
      { symbol: 't', name: 'time', description: 'Time elapsed', units: 'time units' }
    ],
    examples: [
      {
        description: 'Population doubles every 10 years, starting with 1000',
        given: { N0: 1000, r: 0.0693, t: 10 },
        solution: 'N(10) = 2000',
        latex: 'N(10) = 1000e^{0.0693 \\times 10}'
      }
    ],
    relatedFormulas: ['logarithmic-equations', 'half-life']
  },

  {
    id: 'logarithm-properties',
    name: 'Logarithm Properties',
    category: 'algebra',
    description: 'Fundamental logarithm rules for solving exponential equations in chemistry, physics, and engineering.',
    latex: '\\log_b(xy) = \\log_b(x) + \\log_b(y)',
    variables: [
      { symbol: 'b', name: 'base', description: 'Base of the logarithm', units: 'dimensionless' },
      { symbol: 'x,y', name: 'arguments', description: 'Positive real numbers', units: 'dimensionless' }
    ],
    examples: [
      {
        description: 'Simplify log₂(8×16)',
        given: { x: 8, y: 16 },
        solution: 'log₂(8) + log₂(16) = 3 + 4 = 7',
        latex: '\\log_2(8 \\times 16) = \\log_2(8) + \\log_2(16)'
      }
    ],
    relatedFormulas: ['exponential-equations', 'change-of-base']
  },

  {
    id: 'arithmetic-sequence',
    name: 'Arithmetic Sequence',
    category: 'algebra',
    description: 'Sequence with constant difference. Used in loan payments, salary increases, and manufacturing schedules.',
    latex: 'a_n = a_1 + (n-1)d',
    variables: [
      { symbol: 'aₙ', name: 'nth term', description: 'The nth term of the sequence', units: 'varies' },
      { symbol: 'a₁', name: 'first term', description: 'The first term of the sequence', units: 'varies' },
      { symbol: 'n', name: 'term number', description: 'Position in the sequence', units: 'dimensionless' },
      { symbol: 'd', name: 'common difference', description: 'Constant difference between consecutive terms', units: 'varies' }
    ],
    examples: [
      {
        description: 'Find 10th term: first term = 5, common difference = 3',
        given: { a1: 5, d: 3, n: 10 },
        solution: 'a₁₀ = 32',
        latex: 'a_{10} = 5 + (10-1) \\times 3 = 5 + 27 = 32'
      }
    ],
    relatedFormulas: ['arithmetic-series', 'geometric-sequence']
  },

  {
    id: 'geometric-sequence',
    name: 'Geometric Sequence',
    category: 'algebra',
    description: 'Sequence with constant ratio. Models compound interest, population growth, and radioactive decay.',
    latex: 'a_n = a_1 \\cdot r^{n-1}',
    variables: [
      { symbol: 'aₙ', name: 'nth term', description: 'The nth term of the sequence', units: 'varies' },
      { symbol: 'a₁', name: 'first term', description: 'The first term of the sequence', units: 'varies' },
      { symbol: 'r', name: 'common ratio', description: 'Constant ratio between consecutive terms', units: 'dimensionless' },
      { symbol: 'n', name: 'term number', description: 'Position in the sequence', units: 'dimensionless' }
    ],
    examples: [
      {
        description: 'Investment doubles each year: $1000 initial, find 5th year',
        given: { a1: 1000, r: 2, n: 5 },
        solution: 'a₅ = $16,000',
        latex: 'a_5 = 1000 \\times 2^{5-1} = 1000 \\times 16'
      }
    ],
    relatedFormulas: ['geometric-series', 'compound-interest']
  },

  {
    id: 'polynomial-factoring',
    name: 'Difference of Squares',
    category: 'algebra',
    description: 'Factors expressions of form a² - b². Used in optimization, engineering stress analysis, and algebraic simplification.',
    latex: 'a^2 - b^2 = (a+b)(a-b)',
    variables: [
      { symbol: 'a', name: 'first term', description: 'First squared term', units: 'varies' },
      { symbol: 'b', name: 'second term', description: 'Second squared term', units: 'varies' }
    ],
    examples: [
      {
        description: 'Factor x² - 25',
        given: { a: 'x', b: 5 },
        solution: '(x + 5)(x - 5)',
        latex: 'x^2 - 25 = x^2 - 5^2 = (x+5)(x-5)'
      }
    ],
    relatedFormulas: ['perfect-square-trinomial', 'sum-of-cubes']
  },

  // ==================== GEOMETRY ====================
  {
    id: 'pythagorean-theorem',
    name: 'Pythagorean Theorem',
    category: 'geometry',
    description: 'Fundamental relationship in right triangles. Used in construction, navigation, engineering design, and distance calculations.',
    latex: 'a^2 + b^2 = c^2',
    variables: [
      { symbol: 'a', name: 'first leg', description: 'Length of one leg of the right triangle', units: 'length' },
      { symbol: 'b', name: 'second leg', description: 'Length of the other leg of the right triangle', units: 'length' },
      { symbol: 'c', name: 'hypotenuse', description: 'Length of the longest side (opposite right angle)', units: 'length' }
    ],
    examples: [
      {
        description: 'Ladder problem: 12-foot ladder against a wall, base 5 feet from wall',
        given: { a: 5, c: 12 },
        solution: 'Height = 10.91 feet',
        latex: 'b = \\sqrt{12^2 - 5^2} = \\sqrt{144 - 25} = \\sqrt{119} \\approx 10.91'
      }
    ],
    relatedFormulas: ['distance-formula', 'triangle-area', 'law-of-cosines']
  },

  {
    id: 'circle-area',
    name: 'Area of Circle',
    category: 'geometry',
    description: 'Calculates circular area for pipes, tanks, pizza sizing, irrigation systems, and architectural planning.',
    latex: 'A = \\pi r^2',
    variables: [
      { symbol: 'A', name: 'area', description: 'Area enclosed by the circle', units: 'square length' },
      { symbol: 'r', name: 'radius', description: 'Distance from center to edge', units: 'length' },
      { symbol: 'π', name: 'pi', description: 'Mathematical constant ≈ 3.14159', units: 'dimensionless' }
    ],
    examples: [
      {
        description: 'Area of a circular garden with 5-meter radius',
        given: { r: 5 },
        solution: 'A = 78.54 m²',
        latex: 'A = \\pi \\times 5^2 = 25\\pi \\approx 78.54'
      }
    ],
    relatedFormulas: ['circle-circumference', 'sphere-volume', 'cylinder-volume']
  },

  {
    id: 'circle-circumference',
    name: 'Circle Circumference',
    category: 'geometry',
    description: 'Perimeter of circle. Used for wheel circumference, pipe measurements, and circular track design.',
    latex: 'C = 2\\pi r = \\pi d',
    variables: [
      { symbol: 'C', name: 'circumference', description: 'Distance around the circle', units: 'length' },
      { symbol: 'r', name: 'radius', description: 'Distance from center to edge', units: 'length' },
      { symbol: 'd', name: 'diameter', description: 'Distance across circle through center', units: 'length' }
    ],
    examples: [
      {
        description: 'Circumference of 26-inch bicycle wheel',
        given: { d: 26 },
        solution: 'C = 81.68 inches',
        latex: 'C = \\pi \\times 26 \\approx 81.68'
      }
    ],
    relatedFormulas: ['circle-area', 'arc-length']
  },

  {
    id: 'rectangle-area',
    name: 'Rectangle Area',
    category: 'geometry',
    description: 'Basic area calculation for rooms, lots, walls, materials estimation, and floor planning.',
    latex: 'A = l \\times w',
    variables: [
      { symbol: 'A', name: 'area', description: 'Total area of rectangle', units: 'square length' },
      { symbol: 'l', name: 'length', description: 'Longer side of rectangle', units: 'length' },
      { symbol: 'w', name: 'width', description: 'Shorter side of rectangle', units: 'length' }
    ],
    examples: [
      {
        description: 'Room dimensions: 12 feet by 15 feet',
        given: { l: 15, w: 12 },
        solution: 'A = 180 ft²',
        latex: 'A = 15 \\times 12 = 180'
      }
    ],
    relatedFormulas: ['perimeter-rectangle', 'triangle-area', 'parallelogram-area']
  },

  {
    id: 'triangle-area-base-height',
    name: 'Triangle Area (Base × Height)',
    category: 'geometry',
    description: 'Standard triangle area formula. Used in roof calculations, land surveying, and structural engineering.',
    latex: 'A = \\frac{1}{2}bh',
    variables: [
      { symbol: 'A', name: 'area', description: 'Area of the triangle', units: 'square length' },
      { symbol: 'b', name: 'base', description: 'Length of the base', units: 'length' },
      { symbol: 'h', name: 'height', description: 'Perpendicular height to base', units: 'length' }
    ],
    examples: [
      {
        description: 'Triangular garden plot: base 8m, height 6m',
        given: { b: 8, h: 6 },
        solution: 'A = 24 m²',
        latex: 'A = \\frac{1}{2} \\times 8 \\times 6 = 24'
      }
    ],
    relatedFormulas: ['heron-formula', 'triangle-area-sas']
  },

  {
    id: 'heron-formula',
    name: 'Heron\'s Formula (Triangle Area)',
    category: 'geometry',
    description: 'Calculates triangle area when only side lengths are known. Used in surveying and construction.',
    latex: 'A = \\sqrt{s(s-a)(s-b)(s-c)}',
    variables: [
      { symbol: 'A', name: 'area', description: 'Area of the triangle', units: 'square length' },
      { symbol: 'a,b,c', name: 'side lengths', description: 'Lengths of the three sides', units: 'length' },
      { symbol: 's', name: 'semi-perimeter', description: 's = (a+b+c)/2', units: 'length' }
    ],
    examples: [
      {
        description: 'Triangle with sides 3, 4, 5',
        given: { a: 3, b: 4, c: 5, s: 6 },
        solution: 'A = 6 square units',
        latex: 'A = \\sqrt{6(6-3)(6-4)(6-5)} = \\sqrt{6 \\times 3 \\times 2 \\times 1} = 6'
      }
    ],
    relatedFormulas: ['triangle-area-base-height', 'triangle-perimeter']
  },

  {
    id: 'trapezoid-area',
    name: 'Trapezoid Area',
    category: 'geometry',
    description: 'Area of trapezoid with parallel sides. Used in earthwork calculations, civil engineering, and architecture.',
    latex: 'A = \\frac{1}{2}(b_1 + b_2)h',
    variables: [
      { symbol: 'A', name: 'area', description: 'Area of the trapezoid', units: 'square length' },
      { symbol: 'b₁,b₂', name: 'parallel sides', description: 'Lengths of the two parallel sides', units: 'length' },
      { symbol: 'h', name: 'height', description: 'Perpendicular distance between parallel sides', units: 'length' }
    ],
    examples: [
      {
        description: 'Trapezoidal drainage channel: bases 3m and 5m, height 2m',
        given: { b1: 3, b2: 5, h: 2 },
        solution: 'A = 8 m²',
        latex: 'A = \\frac{1}{2}(3 + 5) \\times 2 = \\frac{1}{2} \\times 8 \\times 2 = 8'
      }
    ],
    relatedFormulas: ['parallelogram-area', 'triangle-area']
  },

  {
    id: 'cylinder-volume',
    name: 'Cylinder Volume',
    category: 'geometry',
    description: 'Volume calculation for tanks, pipes, cans, silos, and storage containers in engineering and manufacturing.',
    latex: 'V = \\pi r^2 h',
    variables: [
      { symbol: 'V', name: 'volume', description: 'Total volume of cylinder', units: 'cubic length' },
      { symbol: 'r', name: 'radius', description: 'Radius of circular base', units: 'length' },
      { symbol: 'h', name: 'height', description: 'Height of cylinder', units: 'length' }
    ],
    examples: [
      {
        description: 'Water tank: 2m radius, 5m height',
        given: { r: 2, h: 5 },
        solution: 'V = 62.83 m³',
        latex: 'V = \\pi \\times 2^2 \\times 5 = 20\\pi \\approx 62.83'
      }
    ],
    relatedFormulas: ['circle-area', 'sphere-volume', 'cone-volume']
  },

  {
    id: 'sphere-volume',
    name: 'Sphere Volume',
    category: 'geometry',
    description: 'Volume of spherical objects like balls, planets, bubbles, and storage spheres.',
    latex: 'V = \\frac{4}{3}\\pi r^3',
    variables: [
      { symbol: 'V', name: 'volume', description: 'Total volume of sphere', units: 'cubic length' },
      { symbol: 'r', name: 'radius', description: 'Distance from center to surface', units: 'length' }
    ],
    examples: [
      {
        description: 'Basketball with 12cm radius',
        given: { r: 12 },
        solution: 'V = 7238.23 cm³',
        latex: 'V = \\frac{4}{3}\\pi \\times 12^3 = \\frac{4}{3}\\pi \\times 1728'
      }
    ],
    relatedFormulas: ['sphere-surface-area', 'cylinder-volume']
  },

  {
    id: 'cone-volume',
    name: 'Cone Volume',
    category: 'geometry',
    description: 'Volume of conical shapes. Used for hoppers, funnels, traffic cones, and architectural features.',
    latex: 'V = \\frac{1}{3}\\pi r^2 h',
    variables: [
      { symbol: 'V', name: 'volume', description: 'Volume of the cone', units: 'cubic length' },
      { symbol: 'r', name: 'base radius', description: 'Radius of circular base', units: 'length' },
      { symbol: 'h', name: 'height', description: 'Perpendicular height from base to apex', units: 'length' }
    ],
    examples: [
      {
        description: 'Conical grain silo: radius 3m, height 8m',
        given: { r: 3, h: 8 },
        solution: 'V = 75.40 m³',
        latex: 'V = \\frac{1}{3}\\pi \\times 3^2 \\times 8 = \\frac{72\\pi}{3} = 24\\pi'
      }
    ],
    relatedFormulas: ['cylinder-volume', 'pyramid-volume']
  },

  {
    id: 'sphere-surface-area',
    name: 'Sphere Surface Area',
    category: 'geometry',
    description: 'Surface area of spheres. Used for material calculations, heat transfer, and packaging design.',
    latex: 'SA = 4\\pi r^2',
    variables: [
      { symbol: 'SA', name: 'surface area', description: 'Total surface area of sphere', units: 'square length' },
      { symbol: 'r', name: 'radius', description: 'Distance from center to surface', units: 'length' }
    ],
    examples: [
      {
        description: 'Paint needed for spherical tank with 5m radius',
        given: { r: 5 },
        solution: 'SA = 314.16 m²',
        latex: 'SA = 4\\pi \\times 5^2 = 100\\pi \\approx 314.16'
      }
    ],
    relatedFormulas: ['sphere-volume', 'cylinder-surface-area']
  },

  {
    id: 'distance-formula',
    name: 'Distance Formula',
    category: 'geometry',
    description: 'Calculates distance between two points. Used in GPS systems, surveying, computer graphics, and navigation.',
    latex: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
    variables: [
      { symbol: 'd', name: 'distance', description: 'Straight-line distance between points', units: 'length' },
      { symbol: '(x₁,y₁)', name: 'first point', description: 'Coordinates of starting point', units: 'length' },
      { symbol: '(x₂,y₂)', name: 'second point', description: 'Coordinates of ending point', units: 'length' }
    ],
    examples: [
      {
        description: 'Distance between GPS coordinates (1,2) and (4,6) km',
        given: { x1: 1, y1: 2, x2: 4, y2: 6 },
        solution: 'd = 5 km',
        latex: 'd = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9+16} = 5'
      }
    ],
    relatedFormulas: ['midpoint-formula', 'pythagorean-theorem', '3d-distance']
  },

  // ==================== TRIGONOMETRY ====================
  {
    id: 'sin-cos-identity',
    name: 'Pythagorean Identity',
    category: 'trigonometry',
    description: 'Fundamental trigonometric relationship used in wave analysis, signal processing, and alternating current calculations.',
    latex: '\\sin^2\\theta + \\cos^2\\theta = 1',
    variables: [
      { symbol: 'θ', name: 'angle', description: 'Angle measurement', units: 'radians or degrees' },
      { symbol: 'sin θ', name: 'sine', description: 'Vertical component', units: 'dimensionless' },
      { symbol: 'cos θ', name: 'cosine', description: 'Horizontal component', units: 'dimensionless' }
    ],
    examples: [
      {
        description: 'If sin(θ) = 0.6, find cos(θ)',
        given: { 'sin θ': 0.6 },
        solution: 'cos(θ) = ±0.8',
        latex: '\\cos^2\\theta = 1 - 0.6^2 = 1 - 0.36 = 0.64'
      }
    ],
    relatedFormulas: ['law-of-sines', 'law-of-cosines', 'sine-rule']
  },

  {
    id: 'law-of-sines',
    name: 'Law of Sines',
    category: 'trigonometry',
    description: 'Relates sides and angles in any triangle. Used in navigation, surveying, and engineering calculations.',
    latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}',
    variables: [
      { symbol: 'a,b,c', name: 'side lengths', description: 'Sides of the triangle', units: 'length' },
      { symbol: 'A,B,C', name: 'angles', description: 'Angles opposite to sides a,b,c respectively', units: 'degrees or radians' }
    ],
    examples: [
      {
        description: 'Triangle: side a=10, angle A=30°, angle B=45°, find side b',
        given: { a: 10, A: 30, B: 45 },
        solution: 'b = 14.14',
        latex: '\\frac{10}{\\sin 30°} = \\frac{b}{\\sin 45°}'
      }
    ],
    relatedFormulas: ['law-of-cosines', 'triangle-area']
  },

  {
    id: 'law-of-cosines',
    name: 'Law of Cosines',
    category: 'trigonometry',
    description: 'Extends Pythagorean theorem to any triangle. Used in navigation, surveying, and force analysis.',
    latex: 'c^2 = a^2 + b^2 - 2ab\\cos(C)',
    variables: [
      { symbol: 'a, b, c', name: 'side lengths', description: 'Sides of any triangle', units: 'length' },
      { symbol: 'C', name: 'angle', description: 'Angle opposite side c', units: 'radians or degrees' }
    ],
    examples: [
      {
        description: 'Triangle with sides 5, 7 and included angle 60°',
        given: { a: 5, b: 7, C: 60 },
        solution: 'c = 6.08',
        latex: 'c^2 = 25 + 49 - 70\\cos(60°) = 74 - 35 = 39'
      }
    ],
    relatedFormulas: ['law-of-sines', 'triangle-area']
  },

  {
    id: 'double-angle-sine',
    name: 'Double Angle Formula (Sine)',
    category: 'trigonometry',
    description: 'Expresses sin(2θ) in terms of single angle functions. Used in wave interference and harmonic analysis.',
    latex: '\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta',
    variables: [
      { symbol: 'θ', name: 'angle', description: 'Input angle', units: 'radians or degrees' },
      { symbol: 'sin θ', name: 'sine', description: 'Sine of the angle', units: 'dimensionless' },
      { symbol: 'cos θ', name: 'cosine', description: 'Cosine of the angle', units: 'dimensionless' }
    ],
    examples: [
      {
        description: 'If sin(θ) = 0.6 and cos(θ) = 0.8, find sin(2θ)',
        given: { 'sin θ': 0.6, 'cos θ': 0.8 },
        solution: 'sin(2θ) = 0.96',
        latex: '\\sin(2\\theta) = 2 \\times 0.6 \\times 0.8 = 0.96'
      }
    ],
    relatedFormulas: ['double-angle-cosine', 'half-angle-formulas']
  },

  {
    id: 'double-angle-cosine',
    name: 'Double Angle Formula (Cosine)',
    category: 'trigonometry',
    description: 'Three equivalent forms for cos(2θ). Essential in calculus, physics, and signal processing.',
    latex: '\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta',
    variables: [
      { symbol: 'θ', name: 'angle', description: 'Input angle', units: 'radians or degrees' },
      { symbol: 'sin θ', name: 'sine', description: 'Sine of the angle', units: 'dimensionless' },
      { symbol: 'cos θ', name: 'cosine', description: 'Cosine of the angle', units: 'dimensionless' }
    ],
    examples: [
      {
        description: 'If cos(θ) = 0.8, find cos(2θ)',
        given: { 'cos θ': 0.8 },
        solution: 'cos(2θ) = 0.28',
        latex: '\\cos(2\\theta) = 2(0.8)^2 - 1 = 2(0.64) - 1 = 0.28'
      }
    ],
    relatedFormulas: ['double-angle-sine', 'pythagorean-identity']
  },

  {
    id: 'sum-difference-sine',
    name: 'Sum and Difference (Sine)',
    category: 'trigonometry',
    description: 'Expands sine of sum/difference of angles. Used in wave superposition and signal analysis.',
    latex: '\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B',
    variables: [
      { symbol: 'A,B', name: 'angles', description: 'Two angles', units: 'radians or degrees' },
      { symbol: '±', name: 'operation', description: 'Plus for sum, minus for difference', units: 'dimensionless' }
    ],
    examples: [
      {
        description: 'Find sin(75°) = sin(45° + 30°)',
        given: { A: 45, B: 30 },
        solution: 'sin(75°) = (√6 + √2)/4 ≈ 0.966',
        latex: '\\sin(75°) = \\sin(45°)\\cos(30°) + \\cos(45°)\\sin(30°)'
      }
    ],
    relatedFormulas: ['sum-difference-cosine', 'product-to-sum']
  },

  {
    id: 'radian-degree-conversion',
    name: 'Radian-Degree Conversion',
    category: 'trigonometry',
    description: 'Converts between radian and degree measures. Essential for all trigonometric calculations in engineering and physics.',
    latex: '\\text{radians} = \\text{degrees} \\times \\frac{\\pi}{180°}',
    variables: [
      { symbol: 'π', name: 'pi', description: 'Mathematical constant ≈ 3.14159', units: 'dimensionless' },
      { symbol: '180°', name: 'half circle', description: 'Degrees in a semicircle', units: 'degrees' }
    ],
    examples: [
      {
        description: 'Convert 60° to radians',
        given: { degrees: 60 },
        solution: 'π/3 radians ≈ 1.047 radians',
        latex: '60° \\times \\frac{\\pi}{180°} = \\frac{\\pi}{3}'
      }
    ],
    relatedFormulas: ['arc-length', 'angular-velocity']
  },

  // ==================== CALCULUS ====================
  {
    id: 'power-rule',
    name: 'Power Rule for Derivatives',
    category: 'calculus',
    description: 'Basic differentiation rule for polynomial functions. Essential for optimization, rate problems, and curve analysis.',
    latex: '\\frac{d}{dx}[x^n] = nx^{n-1}',
    variables: [
      { symbol: 'n', name: 'exponent', description: 'Any real number power', units: 'dimensionless' },
      { symbol: 'x', name: 'variable', description: 'Independent variable', units: 'varies' }
    ],
    examples: [
      {
        description: 'Derivative of position function x³ gives velocity',
        given: { n: 3 },
        solution: '3x²',
        latex: '\\frac{d}{dx}[x^3] = 3x^{3-1} = 3x^2'
      }
    ],
    relatedFormulas: ['product-rule', 'chain-rule', 'quotient-rule']
  },

  {
    id: 'product-rule',
    name: 'Product Rule',
    category: 'calculus',
    description: 'Differentiates products of functions. Used in physics for force times distance, economics for price times quantity.',
    latex: '\\frac{d}{dx}[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x)',
    variables: [
      { symbol: 'f(x)', name: 'first function', description: 'First function in the product', units: 'varies' },
      { symbol: 'g(x)', name: 'second function', description: 'Second function in the product', units: 'varies' },
      { symbol: 'f\'(x)', name: 'first derivative', description: 'Derivative of first function', units: 'varies' },
      { symbol: 'g\'(x)', name: 'second derivative', description: 'Derivative of second function', units: 'varies' }
    ],
    examples: [
      {
        description: 'Derivative of f(x) = x²(3x + 1)',
        given: {},
        solution: 'f\'(x) = 9x² + 2x',
        latex: '\\frac{d}{dx}[x^2(3x+1)] = 2x(3x+1) + x^2(3) = 6x^2 + 2x + 3x^2'
      }
    ],
    relatedFormulas: ['quotient-rule', 'chain-rule']
  },

  {
    id: 'chain-rule',
    name: 'Chain Rule',
    category: 'calculus',
    description: 'Differentiates composite functions. Essential for complex functions in physics, engineering, and economics.',
    latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
    variables: [
      { symbol: 'f(g(x))', name: 'composite function', description: 'Function of a function', units: 'varies' },
      { symbol: 'f\'(g(x))', name: 'outer derivative', description: 'Derivative of outer function', units: 'varies' },
      { symbol: 'g\'(x)', name: 'inner derivative', description: 'Derivative of inner function', units: 'varies' }
    ],
    examples: [
      {
        description: 'Derivative of f(x) = (3x + 1)⁴',
        given: {},
        solution: 'f\'(x) = 12(3x + 1)³',
        latex: '\\frac{d}{dx}[(3x+1)^4] = 4(3x+1)^3 \\cdot 3 = 12(3x+1)^3'
      }
    ],
    relatedFormulas: ['product-rule', 'implicit-differentiation']
  },

  {
    id: 'quotient-rule',
    name: 'Quotient Rule',
    category: 'calculus',
    description: 'Differentiates quotients of functions. Used for rates, ratios, and efficiency calculations in business and engineering.',
    latex: '\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f\'(x)g(x) - f(x)g\'(x)}{[g(x)]^2}',
    variables: [
      { symbol: 'f(x)', name: 'numerator function', description: 'Function in numerator', units: 'varies' },
      { symbol: 'g(x)', name: 'denominator function', description: 'Function in denominator', units: 'varies' },
      { symbol: 'f\'(x)', name: 'numerator derivative', description: 'Derivative of numerator', units: 'varies' },
      { symbol: 'g\'(x)', name: 'denominator derivative', description: 'Derivative of denominator', units: 'varies' }
    ],
    examples: [
      {
        description: 'Derivative of f(x) = x²/(x + 1)',
        given: {},
        solution: 'f\'(x) = (x² + 2x)/(x + 1)²',
        latex: '\\frac{d}{dx}\\left[\\frac{x^2}{x+1}\\right] = \\frac{2x(x+1) - x^2(1)}{(x+1)^2}'
      }
    ],
    relatedFormulas: ['product-rule', 'chain-rule']
  },

  {
    id: 'fundamental-theorem-calculus',
    name: 'Fundamental Theorem of Calculus',
    category: 'calculus',
    description: 'Links derivatives and integrals. Used to calculate areas, work done, and accumulated quantities.',
    latex: '\\int_a^b f\'(x)dx = f(b) - f(a)',
    variables: [
      { symbol: 'f(x)', name: 'function', description: 'Antiderivative of f\'(x)', units: 'varies' },
      { symbol: 'a, b', name: 'limits', description: 'Integration bounds', units: 'x-units' }
    ],
    examples: [
      {
        description: 'Area under curve y = x² from x = 0 to x = 3',
        given: { a: 0, b: 3 },
        solution: '9 square units',
        latex: '\\int_0^3 x^2 dx = \\left[\\frac{x^3}{3}\\right]_0^3 = 9 - 0 = 9'
      }
    ],
    relatedFormulas: ['power-rule', 'integration-by-parts']
  },

  {
    id: 'integration-by-parts',
    name: 'Integration by Parts',
    category: 'calculus',
    description: 'Integration technique for products. Used in physics for work calculations and engineering for system analysis.',
    latex: '\\int u \\, dv = uv - \\int v \\, du',
    variables: [
      { symbol: 'u', name: 'first function', description: 'Function to differentiate', units: 'varies' },
      { symbol: 'dv', name: 'second differential', description: 'Differential to integrate', units: 'varies' },
      { symbol: 'v', name: 'integral of dv', description: 'Antiderivative of dv', units: 'varies' },
      { symbol: 'du', name: 'differential of u', description: 'Derivative of u times dx', units: 'varies' }
    ],
    examples: [
      {
        description: 'Integrate ∫x·eˣ dx',
        given: { u: 'x', dv: 'eˣ dx' },
        solution: 'xeˣ - eˣ + C',
        latex: '\\int xe^x dx = xe^x - \\int e^x dx = xe^x - e^x + C'
      }
    ],
    relatedFormulas: ['substitution-rule', 'fundamental-theorem']
  },

  {
    id: 'limits-definition',
    name: 'Definition of Limit',
    category: 'calculus',
    description: 'Formal definition of limits. Foundation for derivatives, continuity, and mathematical analysis.',
    latex: '\\lim_{x \\to a} f(x) = L',
    variables: [
      { symbol: 'L', name: 'limit value', description: 'Value that f(x) approaches', units: 'varies' },
      { symbol: 'a', name: 'approach point', description: 'Point x is approaching', units: 'x-units' },
      { symbol: 'f(x)', name: 'function', description: 'Function being evaluated', units: 'varies' }
    ],
    examples: [
      {
        description: 'lim(x→2) (x² - 4)/(x - 2)',
        given: { a: 2 },
        solution: 'L = 4',
        latex: '\\lim_{x \\to 2} \\frac{x^2-4}{x-2} = \\lim_{x \\to 2} \\frac{(x-2)(x+2)}{x-2} = 4'
      }
    ],
    relatedFormulas: ['derivative-definition', 'continuity']
  },

  // ==================== STATISTICS ====================
  {
    id: 'mean-formula',
    name: 'Arithmetic Mean (Average)',
    category: 'statistics',
    description: 'Central tendency measure used in quality control, performance evaluation, and data analysis across all industries.',
    latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i = \\frac{x_1 + x_2 + ... + x_n}{n}',
    variables: [
      { symbol: 'x̄', name: 'sample mean', description: 'Average value of dataset', units: 'data units' },
      { symbol: 'n', name: 'sample size', description: 'Number of data points', units: 'count' },
      { symbol: 'xᵢ', name: 'data values', description: 'Individual observations', units: 'data units' }
    ],
    examples: [
      {
        description: 'Average test scores: 85, 90, 78, 92, 88',
        given: { n: 5 },
        solution: '86.6',
        latex: '\\bar{x} = \\frac{85+90+78+92+88}{5} = \\frac{433}{5} = 86.6'
      }
    ],
    relatedFormulas: ['standard-deviation', 'variance', 'median']
  },

  {
    id: 'standard-deviation',
    name: 'Standard Deviation',
    category: 'statistics',
    description: 'Measures data spread around the mean. Critical for quality control, risk assessment, and process improvement.',
    latex: 's = \\sqrt{\\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n-1}}',
    variables: [
      { symbol: 's', name: 'sample standard deviation', description: 'Measure of data variability', units: 'data units' },
      { symbol: 'xᵢ', name: 'data values', description: 'Individual observations', units: 'data units' },
      { symbol: 'x̄', name: 'sample mean', description: 'Average of the data', units: 'data units' },
      { symbol: 'n', name: 'sample size', description: 'Number of observations', units: 'count' }
    ],
    examples: [
      {
        description: 'Quality control: part lengths 10.1, 9.9, 10.2, 9.8, 10.0 mm',
        given: { 'x̄': 10.0, n: 5 },
        solution: 's = 0.158 mm',
        latex: 's = \\sqrt{\\frac{(0.1)^2+(0.1)^2+(0.2)^2+(0.2)^2+0^2}{4}}'
      }
    ],
    relatedFormulas: ['variance', 'coefficient-variation', 'normal-distribution']
  },

  {
    id: 'variance',
    name: 'Sample Variance',
    category: 'statistics',
    description: 'Measures data variability squared. Used in finance for risk measurement and engineering for quality control.',
    latex: 's^2 = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n-1}',
    variables: [
      { symbol: 's²', name: 'sample variance', description: 'Squared measure of variability', units: '(data units)²' },
      { symbol: 'xᵢ', name: 'data values', description: 'Individual observations', units: 'data units' },
      { symbol: 'x̄', name: 'sample mean', description: 'Average of the data', units: 'data units' },
      { symbol: 'n', name: 'sample size', description: 'Number of observations', units: 'count' }
    ],
    examples: [
      {
        description: 'Stock price changes: $2, -$1, $3, -$2, $1',
        given: { 'x̄': 0.6, n: 5 },
        solution: 's² = 4.3',
        latex: 's^2 = \\frac{(2-0.6)^2+(-1-0.6)^2+(3-0.6)^2+(-2-0.6)^2+(1-0.6)^2}{4}'
      }
    ],
    relatedFormulas: ['standard-deviation', 'coefficient-variation']
  },

  {
    id: 'correlation-coefficient',
    name: 'Correlation Coefficient',
    category: 'statistics',
    description: 'Measures linear relationship strength between two variables. Used in business analysis and research.',
    latex: 'r = \\frac{\\sum(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum(x_i - \\bar{x})^2 \\sum(y_i - \\bar{y})^2}}',
    variables: [
      { symbol: 'r', name: 'correlation coefficient', description: 'Linear relationship strength (-1 to +1)', units: 'dimensionless' },
      { symbol: 'xᵢ,yᵢ', name: 'data pairs', description: 'Paired observations', units: 'data units' },
      { symbol: 'x̄,ȳ', name: 'means', description: 'Means of x and y variables', units: 'data units' }
    ],
    examples: [
      {
        description: 'Correlation between study hours and test scores',
        given: {},
        solution: 'r = 0.85 (strong positive correlation)',
        latex: 'r = 0.85 \\text{ indicates strong positive relationship}'
      }
    ],
    relatedFormulas: ['regression-line', 'coefficient-determination']
  },

  {
    id: 'linear-regression',
    name: 'Linear Regression Line',
    category: 'statistics',
    description: 'Best-fit line through data points. Used for forecasting, trend analysis, and predictive modeling.',
    latex: 'y = a + bx \\text{ where } b = \\frac{\\sum(x_i - \\bar{x})(y_i - \\bar{y})}{\\sum(x_i - \\bar{x})^2}',
    variables: [
      { symbol: 'y', name: 'predicted value', description: 'Predicted y value', units: 'y-units' },
      { symbol: 'a', name: 'y-intercept', description: 'y-value when x = 0', units: 'y-units' },
      { symbol: 'b', name: 'slope', description: 'Rate of change', units: 'y-units/x-units' },
      { symbol: 'x', name: 'predictor variable', description: 'Independent variable', units: 'x-units' }
    ],
    examples: [
      {
        description: 'Sales prediction: y = 50 + 2.5x (where x = advertising spend)',
        given: { a: 50, b: 2.5 },
        solution: 'For $20 advertising: Sales = $100',
        latex: 'y = 50 + 2.5(20) = 100'
      }
    ],
    relatedFormulas: ['correlation-coefficient', 'r-squared']
  },

  {
    id: 'normal-distribution',
    name: 'Normal Distribution (Bell Curve)',
    category: 'statistics',
    description: 'Most important probability distribution. Used in quality control, testing, and natural phenomena modeling.',
    latex: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
    variables: [
      { symbol: 'f(x)', name: 'probability density', description: 'Probability at value x', units: '1/data units' },
      { symbol: 'μ', name: 'mean', description: 'Population mean (center)', units: 'data units' },
      { symbol: 'σ', name: 'standard deviation', description: 'Population standard deviation', units: 'data units' },
      { symbol: 'x', name: 'value', description: 'Data value', units: 'data units' }
    ],
    examples: [
      {
        description: 'IQ scores: mean = 100, standard deviation = 15',
        given: { μ: 100, σ: 15 },
        solution: '68% of scores between 85-115',
        latex: 'P(85 < X < 115) = 0.68 \\text{ (within 1 standard deviation)}'
      }
    ],
    relatedFormulas: ['z-score', 'confidence-interval']
  },

  // ==================== PHYSICS ====================
  {
    id: 'newtons-second-law',
    name: 'Newton\'s Second Law',
    category: 'physics',
    description: 'Fundamental law relating force, mass, and acceleration. Used in engineering design, vehicle dynamics, and structural analysis.',
    latex: 'F = ma',
    variables: [
      { symbol: 'F', name: 'force', description: 'Net force applied to object', units: 'Newtons (N)' },
      { symbol: 'm', name: 'mass', description: 'Mass of the object', units: 'kilograms (kg)' },
      { symbol: 'a', name: 'acceleration', description: 'Rate of velocity change', units: 'm/s²' }
    ],
    examples: [
      {
        description: 'Force needed to accelerate 1000kg car at 2 m/s²',
        given: { m: 1000, a: 2 },
        solution: 'F = 2000 N',
        latex: 'F = 1000 \\times 2 = 2000\\text{ N}'
      }
    ],
    relatedFormulas: ['kinematic-equations', 'work-energy']
  },

  {
    id: 'kinematic-equation-velocity',
    name: 'Kinematic Equation (Velocity)',
    category: 'physics',
    description: 'Relates velocity, acceleration, and time. Used in motion analysis, traffic engineering, and sports science.',
    latex: 'v = v_0 + at',
    variables: [
      { symbol: 'v', name: 'final velocity', description: 'Velocity at time t', units: 'm/s' },
      { symbol: 'v₀', name: 'initial velocity', description: 'Starting velocity', units: 'm/s' },
      { symbol: 'a', name: 'acceleration', description: 'Constant acceleration', units: 'm/s²' },
      { symbol: 't', name: 'time', description: 'Time duration', units: 'seconds (s)' }
    ],
    examples: [
      {
        description: 'Car accelerating from rest at 3 m/s² for 5 seconds',
        given: { 'v₀': 0, a: 3, t: 5 },
        solution: 'v = 15 m/s',
        latex: 'v = 0 + 3 \\times 5 = 15'
      }
    ],
    relatedFormulas: ['kinematic-position', 'newtons-second-law']
  },

  {
    id: 'kinematic-position',
    name: 'Kinematic Equation (Position)',
    category: 'physics',
    description: 'Calculates position with constant acceleration. Used in projectile motion, vehicle analysis, and engineering.',
    latex: 's = v_0 t + \\frac{1}{2}at^2',
    variables: [
      { symbol: 's', name: 'displacement', description: 'Change in position', units: 'meters (m)' },
      { symbol: 'v₀', name: 'initial velocity', description: 'Starting velocity', units: 'm/s' },
      { symbol: 't', name: 'time', description: 'Time duration', units: 'seconds (s)' },
      { symbol: 'a', name: 'acceleration', description: 'Constant acceleration', units: 'm/s²' }
    ],
    examples: [
      {
        description: 'Ball thrown upward at 20 m/s, position after 2 seconds',
        given: { v0: 20, t: 2, a: -9.8 },
        solution: 's = 20.4 m',
        latex: 's = 20(2) + \\frac{1}{2}(-9.8)(2)^2 = 40 - 19.6 = 20.4'
      }
    ],
    relatedFormulas: ['kinematic-velocity', 'projectile-motion']
  },

  {
    id: 'ohms-law',
    name: 'Ohm\'s Law',
    category: 'physics',
    description: 'Fundamental electrical relationship. Essential for circuit design, electrical troubleshooting, and power calculations.',
    latex: 'V = IR',
    variables: [
      { symbol: 'V', name: 'voltage', description: 'Electrical potential difference', units: 'Volts (V)' },
      { symbol: 'I', name: 'current', description: 'Electric current flow', units: 'Amperes (A)' },
      { symbol: 'R', name: 'resistance', description: 'Electrical resistance', units: 'Ohms (Ω)' }
    ],
    examples: [
      {
        description: 'Voltage across 100Ω resistor with 0.5A current',
        given: { I: 0.5, R: 100 },
        solution: 'V = 50V',
        latex: 'V = 0.5 \\times 100 = 50\\text{ V}'
      }
    ],
    relatedFormulas: ['electrical-power', 'kirchhoffs-law']
  },

  {
    id: 'electrical-power',
    name: 'Electrical Power',
    category: 'physics',
    description: 'Calculates electrical power consumption. Used for energy bills, motor sizing, and electrical system design.',
    latex: 'P = VI = I^2R = \\frac{V^2}{R}',
    variables: [
      { symbol: 'P', name: 'power', description: 'Electrical power consumed or generated', units: 'Watts (W)' },
      { symbol: 'V', name: 'voltage', description: 'Electrical potential difference', units: 'Volts (V)' },
      { symbol: 'I', name: 'current', description: 'Electric current', units: 'Amperes (A)' },
      { symbol: 'R', name: 'resistance', description: 'Electrical resistance', units: 'Ohms (Ω)' }
    ],
    examples: [
      {
        description: 'Power consumption of 120V appliance drawing 5A',
        given: { V: 120, I: 5 },
        solution: 'P = 600W',
        latex: 'P = 120 \\times 5 = 600\\text{ W}'
      }
    ],
    relatedFormulas: ['ohms-law', 'energy-cost']
  },

  {
    id: 'gravitational-force',
    name: 'Universal Gravitation',
    category: 'physics',
    description: 'Force between masses. Used in astronomy, satellite mechanics, and gravitational engineering.',
    latex: 'F = G\\frac{m_1 m_2}{r^2}',
    variables: [
      { symbol: 'F', name: 'gravitational force', description: 'Attractive force between masses', units: 'Newtons (N)' },
      { symbol: 'G', name: 'gravitational constant', description: 'G = 6.674×10⁻¹¹ m³/(kg·s²)', units: 'm³/(kg·s²)' },
      { symbol: 'm₁,m₂', name: 'masses', description: 'Masses of the two objects', units: 'kilograms (kg)' },
      { symbol: 'r', name: 'distance', description: 'Distance between mass centers', units: 'meters (m)' }
    ],
    examples: [
      {
        description: 'Force between Earth (6×10²⁴ kg) and Moon (7×10²² kg), distance 3.8×10⁸ m',
        given: { m1: '6×10²⁴', m2: '7×10²²', r: '3.8×10⁸' },
        solution: 'F = 1.94×10²⁰ N',
        latex: 'F = 6.67 \\times 10^{-11} \\frac{(6 \\times 10^{24})(7 \\times 10^{22})}{(3.8 \\times 10^8)^2}'
      }
    ],
    relatedFormulas: ['weight-formula', 'orbital-velocity']
  },

  {
    id: 'work-energy-theorem',
    name: 'Work-Energy Theorem',
    category: 'physics',
    description: 'Relates work done to change in kinetic energy. Used in mechanical engineering and energy analysis.',
    latex: 'W = \\Delta KE = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2',
    variables: [
      { symbol: 'W', name: 'work done', description: 'Energy transferred to/from object', units: 'Joules (J)' },
      { symbol: 'ΔKE', name: 'change in kinetic energy', description: 'Final KE minus initial KE', units: 'Joules (J)' },
      { symbol: 'm', name: 'mass', description: 'Mass of the object', units: 'kilograms (kg)' },
      { symbol: 'vf,vi', name: 'velocities', description: 'Final and initial velocities', units: 'm/s' }
    ],
    examples: [
      {
        description: '2 kg object accelerated from 3 m/s to 7 m/s',
        given: { m: 2, vi: 3, vf: 7 },
        solution: 'W = 40 J',
        latex: 'W = \\frac{1}{2}(2)(7^2) - \\frac{1}{2}(2)(3^2) = 49 - 9 = 40\\text{ J}'
      }
    ],
    relatedFormulas: ['kinetic-energy', 'potential-energy']
  },

  // ==================== CHEMISTRY ====================
  {
    id: 'ideal-gas-law',
    name: 'Ideal Gas Law',
    category: 'chemistry',
    description: 'Relates pressure, volume, temperature of gases. Used in HVAC, chemical processing, and pneumatic systems.',
    latex: 'PV = nRT',
    variables: [
      { symbol: 'P', name: 'pressure', description: 'Gas pressure', units: 'Pascals (Pa) or atm' },
      { symbol: 'V', name: 'volume', description: 'Gas volume', units: 'liters (L) or m³' },
      { symbol: 'n', name: 'moles', description: 'Amount of gas', units: 'moles (mol)' },
      { symbol: 'R', name: 'gas constant', description: 'Universal gas constant = 8.314 J/(mol·K)', units: 'J/(mol·K)' },
      { symbol: 'T', name: 'temperature', description: 'Absolute temperature', units: 'Kelvin (K)' }
    ],
    examples: [
      {
        description: 'Pressure of 2 moles of gas in 10L at 300K',
        given: { n: 2, V: 10, T: 300, R: 8.314 },
        solution: 'P = 498.84 Pa',
        latex: 'P = \\frac{nRT}{V} = \\frac{2 \\times 8.314 \\times 300}{10}'
      }
    ],
    relatedFormulas: ['boyles-law', 'charles-law']
  },

  {
    id: 'boyles-law',
    name: 'Boyle\'s Law',
    category: 'chemistry',
    description: 'Pressure-volume relationship at constant temperature. Used in pneumatics, diving, and compression systems.',
    latex: 'P_1 V_1 = P_2 V_2',
    variables: [
      { symbol: 'P₁,P₂', name: 'pressures', description: 'Initial and final pressures', units: 'pressure units' },
      { symbol: 'V₁,V₂', name: 'volumes', description: 'Initial and final volumes', units: 'volume units' }
    ],
    examples: [
      {
        description: 'Gas at 2 atm, 5L compressed to 2L. Find final pressure.',
        given: { P1: 2, V1: 5, V2: 2 },
        solution: 'P₂ = 5 atm',
        latex: 'P_2 = \\frac{P_1 V_1}{V_2} = \\frac{2 \\times 5}{2} = 5\\text{ atm}'
      }
    ],
    relatedFormulas: ['charles-law', 'ideal-gas-law']
  },

  {
    id: 'charles-law',
    name: 'Charles\' Law',
    category: 'chemistry',
    description: 'Volume-temperature relationship at constant pressure. Used in hot air balloons and thermal expansion.',
    latex: '\\frac{V_1}{T_1} = \\frac{V_2}{T_2}',
    variables: [
      { symbol: 'V₁,V₂', name: 'volumes', description: 'Initial and final volumes', units: 'volume units' },
      { symbol: 'T₁,T₂', name: 'temperatures', description: 'Initial and final absolute temperatures', units: 'Kelvin (K)' }
    ],
    examples: [
      {
        description: 'Balloon volume 3L at 300K. Volume at 400K?',
        given: { V1: 3, T1: 300, T2: 400 },
        solution: 'V₂ = 4L',
        latex: 'V_2 = \\frac{V_1 T_2}{T_1} = \\frac{3 \\times 400}{300} = 4\\text{ L}'
      }
    ],
    relatedFormulas: ['boyles-law', 'gay-lussacs-law']
  },

  {
    id: 'molarity',
    name: 'Molarity (Molar Concentration)',
    category: 'chemistry',
    description: 'Concentration measure in chemistry. Used for solution preparation and chemical reaction calculations.',
    latex: 'M = \\frac{n}{V}',
    variables: [
      { symbol: 'M', name: 'molarity', description: 'Molar concentration', units: 'mol/L or M' },
      { symbol: 'n', name: 'moles of solute', description: 'Amount of dissolved substance', units: 'moles (mol)' },
      { symbol: 'V', name: 'volume of solution', description: 'Total volume of solution', units: 'liters (L)' }
    ],
    examples: [
      {
        description: '0.5 moles NaCl dissolved in 2L water',
        given: { n: 0.5, V: 2 },
        solution: 'M = 0.25 M',
        latex: 'M = \\frac{0.5}{2} = 0.25\\text{ M}'
      }
    ],
    relatedFormulas: ['dilution-formula', 'moles-mass']
  },

  // ==================== ENGINEERING ====================
  {
    id: 'beam-deflection',
    name: 'Beam Deflection (Simply Supported)',
    category: 'engineering',
    description: 'Maximum deflection of a simply supported beam with center load. Used in structural engineering and mechanical design.',
    latex: '\\delta_{max} = \\frac{FL^3}{48EI}',
    variables: [
      { symbol: 'δ_max', name: 'maximum deflection', description: 'Maximum beam deflection at center', units: 'mm or inches' },
      { symbol: 'F', name: 'applied force', description: 'Load applied at beam center', units: 'N or pounds' },
      { symbol: 'L', name: 'beam length', description: 'Distance between supports', units: 'm or feet' },
      { symbol: 'E', name: 'elastic modulus', description: 'Material stiffness property', units: 'Pa or psi' },
      { symbol: 'I', name: 'moment of inertia', description: 'Cross-sectional property', units: 'm⁴ or in⁴' }
    ],
    examples: [
      {
        description: 'Steel beam: 1000N load, 2m span, E=200GPa, I=8.33×10⁻⁶ m⁴',
        given: { F: 1000, L: 2, E: 200e9, I: 8.33e-6 },
        solution: 'δ = 1.0 mm',
        latex: '\\delta = \\frac{1000 \\times 2^3}{48 \\times 200 \\times 10^9 \\times 8.33 \\times 10^{-6}}'
      }
    ],
    relatedFormulas: ['stress-strain', 'moment-calculation']
  },

  {
    id: 'stress-calculation',
    name: 'Normal Stress',
    category: 'engineering',
    description: 'Stress in materials under axial loading. Fundamental for safety analysis and material selection.',
    latex: '\\sigma = \\frac{F}{A}',
    variables: [
      { symbol: 'σ', name: 'normal stress', description: 'Stress perpendicular to surface', units: 'Pa or psi' },
      { symbol: 'F', name: 'applied force', description: 'Force perpendicular to area', units: 'N or pounds' },
      { symbol: 'A', name: 'cross-sectional area', description: 'Area perpendicular to force', units: 'm² or in²' }
    ],
    examples: [
      {
        description: '50,000N force on 0.01 m² cross-section',
        given: { F: 50000, A: 0.01 },
        solution: 'σ = 5 MPa',
        latex: '\\sigma = \\frac{50000}{0.01} = 5 \\times 10^6 \\text{ Pa} = 5 \\text{ MPa}'
      }
    ],
    relatedFormulas: ['strain-calculation', 'safety-factor']
  },

  {
    id: 'strain-calculation',
    name: 'Engineering Strain',
    category: 'engineering',
    description: 'Deformation measure in materials. Used with stress for material property determination and design.',
    latex: '\\epsilon = \\frac{\\Delta L}{L_0}',
    variables: [
      { symbol: 'ε', name: 'strain', description: 'Dimensionless deformation measure', units: 'dimensionless or %' },
      { symbol: 'ΔL', name: 'change in length', description: 'Final length minus original length', units: 'length units' },
      { symbol: 'L₀', name: 'original length', description: 'Initial length of material', units: 'length units' }
    ],
    examples: [
      {
        description: '1m rod stretched to 1.002m under load',
        given: { L0: 1, deltaL: 0.002 },
        solution: 'ε = 0.002 = 0.2%',
        latex: '\\epsilon = \\frac{0.002}{1} = 0.002 = 0.2\\%'
      }
    ],
    relatedFormulas: ['stress-calculation', 'elastic-modulus']
  },

  {
    id: 'fluid-continuity',
    name: 'Continuity Equation (Fluid Flow)',
    category: 'engineering',
    description: 'Conservation of mass in fluid flow. Used in pipe design, HVAC systems, and hydraulic engineering.',
    latex: 'A_1 v_1 = A_2 v_2',
    variables: [
      { symbol: 'A₁,A₂', name: 'cross-sectional areas', description: 'Flow areas at points 1 and 2', units: 'm² or ft²' },
      { symbol: 'v₁,v₂', name: 'flow velocities', description: 'Fluid velocities at points 1 and 2', units: 'm/s or ft/s' }
    ],
    examples: [
      {
        description: 'Water flow: 0.1 m² pipe at 2 m/s connects to 0.05 m² pipe',
        given: { A1: 0.1, v1: 2, A2: 0.05 },
        solution: 'v₂ = 4 m/s',
        latex: 'v_2 = \\frac{A_1 v_1}{A_2} = \\frac{0.1 \\times 2}{0.05} = 4\\text{ m/s}'
      }
    ],
    relatedFormulas: ['bernoulli-equation', 'flow-rate']
  },

  // ==================== BUSINESS ====================
  {
    id: 'break-even-point',
    name: 'Break-Even Point',
    category: 'business',
    description: 'Point where total revenue equals total costs. Critical for business planning and pricing decisions.',
    latex: 'Q_{BE} = \\frac{F_C}{P - V_C}',
    variables: [
      { symbol: 'Q_BE', name: 'break-even quantity', description: 'Units needed to break even', units: 'units' },
      { symbol: 'F_C', name: 'fixed costs', description: 'Costs that don\'t change with volume', units: 'currency' },
      { symbol: 'P', name: 'price per unit', description: 'Selling price per unit', units: 'currency/unit' },
      { symbol: 'V_C', name: 'variable cost per unit', description: 'Cost per unit that varies with volume', units: 'currency/unit' }
    ],
    examples: [
      {
        description: 'Fixed costs $10,000, selling price $50, variable cost $30',
        given: { 'F_C': 10000, P: 50, 'V_C': 30 },
        solution: '500 units',
        latex: 'Q_{BE} = \\frac{10000}{50-30} = \\frac{10000}{20} = 500'
      }
    ],
    relatedFormulas: ['profit-margin', 'roi']
  },

  {
    id: 'return-on-investment',
    name: 'Return on Investment (ROI)',
    category: 'business',
    description: 'Measures investment efficiency. Used for comparing different investment opportunities and project evaluation.',
    latex: 'ROI = \\frac{\\text{Gain} - \\text{Cost}}{\\text{Cost}} \\times 100\\%',
    variables: [
      { symbol: 'Gain', name: 'investment gain', description: 'Total return from investment', units: 'currency' },
      { symbol: 'Cost', name: 'investment cost', description: 'Initial investment amount', units: 'currency' },
      { symbol: 'ROI', name: 'return on investment', description: 'Percentage return', units: 'percentage' }
    ],
    examples: [
      {
        description: 'Invested $1000, received $1200 back',
        given: { Gain: 1200, Cost: 1000 },
        solution: 'ROI = 20%',
        latex: 'ROI = \\frac{1200 - 1000}{1000} \\times 100\\% = 20\\%'
      }
    ],
    relatedFormulas: ['payback-period', 'net-present-value']
  },

  {
    id: 'profit-margin',
    name: 'Profit Margin',
    category: 'business',
    description: 'Percentage of revenue that becomes profit. Key metric for business profitability and efficiency analysis.',
    latex: '\\text{Profit Margin} = \\frac{\\text{Revenue} - \\text{Costs}}{\\text{Revenue}} \\times 100\\%',
    variables: [
      { symbol: 'Revenue', name: 'total revenue', description: 'Total sales income', units: 'currency' },
      { symbol: 'Costs', name: 'total costs', description: 'All business expenses', units: 'currency' },
      { symbol: 'Profit Margin', name: 'profit margin', description: 'Profitability percentage', units: 'percentage' }
    ],
    examples: [
      {
        description: 'Revenue $100,000, total costs $80,000',
        given: { Revenue: 100000, Costs: 80000 },
        solution: 'Profit Margin = 20%',
        latex: '\\text{Profit Margin} = \\frac{100000 - 80000}{100000} \\times 100\\% = 20\\%'
      }
    ],
    relatedFormulas: ['break-even-point', 'gross-margin']
  },

  // ==================== FINANCE ====================
  {
    id: 'mortgage-payment',
    name: 'Monthly Mortgage Payment',
    category: 'finance',
    description: 'Calculates monthly loan payments. Essential for home buying, loan analysis, and financial planning.',
    latex: 'M = P \\frac{r(1+r)^n}{(1+r)^n - 1}',
    variables: [
      { symbol: 'M', name: 'monthly payment', description: 'Monthly payment amount', units: 'currency' },
      { symbol: 'P', name: 'principal', description: 'Loan amount', units: 'currency' },
      { symbol: 'r', name: 'monthly interest rate', description: 'Annual rate ÷ 12 months', units: 'decimal' },
      { symbol: 'n', name: 'number of payments', description: 'Years × 12 months', units: 'payments' }
    ],
    examples: [
      {
        description: '$200,000 loan at 4% annual rate for 30 years',
        given: { P: 200000, r: 0.00333, n: 360 },
        solution: '$954.83/month',
        latex: 'M = 200000 \\frac{0.00333(1.00333)^{360}}{(1.00333)^{360} - 1}'
      }
    ],
    relatedFormulas: ['compound-interest', 'loan-amortization']
  },

  {
    id: 'present-value',
    name: 'Present Value',
    category: 'finance',
    description: 'Current worth of future money. Used for investment decisions, loan analysis, and financial planning.',
    latex: 'PV = \\frac{FV}{(1 + r)^n}',
    variables: [
      { symbol: 'PV', name: 'present value', description: 'Current value of future money', units: 'currency' },
      { symbol: 'FV', name: 'future value', description: 'Amount of money in the future', units: 'currency' },
      { symbol: 'r', name: 'discount rate', description: 'Interest rate per period', units: 'decimal' },
      { symbol: 'n', name: 'number of periods', description: 'Time periods', units: 'periods' }
    ],
    examples: [
      {
        description: 'What is $1000 in 5 years worth today at 6% interest?',
        given: { FV: 1000, r: 0.06, n: 5 },
        solution: 'PV = $747.26',
        latex: 'PV = \\frac{1000}{(1 + 0.06)^5} = \\frac{1000}{1.338} = 747.26'
      }
    ],
    relatedFormulas: ['future-value', 'net-present-value']
  },

  {
    id: 'future-value',
    name: 'Future Value',
    category: 'finance',
    description: 'Value of current money in the future. Used for retirement planning and investment growth calculations.',
    latex: 'FV = PV(1 + r)^n',
    variables: [
      { symbol: 'FV', name: 'future value', description: 'Value of money in the future', units: 'currency' },
      { symbol: 'PV', name: 'present value', description: 'Current amount of money', units: 'currency' },
      { symbol: 'r', name: 'interest rate', description: 'Interest rate per period', units: 'decimal' },
      { symbol: 'n', name: 'number of periods', description: 'Time periods', units: 'periods' }
    ],
    examples: [
      {
        description: '$5000 invested for 10 years at 7% annual interest',
        given: { PV: 5000, r: 0.07, n: 10 },
        solution: 'FV = $9,835.76',
        latex: 'FV = 5000(1 + 0.07)^{10} = 5000(1.967) = 9835.76'
      }
    ],
    relatedFormulas: ['present-value', 'compound-interest']
  },

  {
    id: 'annuity-payment',
    name: 'Annuity Payment',
    category: 'finance',
    description: 'Regular payment amount for annuities. Used for retirement planning and structured payments.',
    latex: 'PMT = PV \\frac{r(1+r)^n}{(1+r)^n - 1}',
    variables: [
      { symbol: 'PMT', name: 'payment amount', description: 'Regular payment amount', units: 'currency' },
      { symbol: 'PV', name: 'present value', description: 'Current value of annuity', units: 'currency' },
      { symbol: 'r', name: 'interest rate', description: 'Interest rate per period', units: 'decimal' },
      { symbol: 'n', name: 'number of payments', description: 'Total number of payments', units: 'payments' }
    ],
    examples: [
      {
        description: '$100,000 annuity, 20 years, 5% annual interest',
        given: { PV: 100000, r: 0.05, n: 20 },
        solution: 'PMT = $8,024.26/year',
        latex: 'PMT = 100000 \\frac{0.05(1.05)^{20}}{(1.05)^{20} - 1}'
      }
    ],
    relatedFormulas: ['present-value-annuity', 'future-value-annuity']
  }
];

export const getFormulasByCategory = (category: string): Formula[] => {
  return mathFormulas.filter(formula => formula.category === category);
};

export const searchFormulas = (query: string): Formula[] => {
  const searchTerm = query.toLowerCase();
  return mathFormulas.filter(formula => 
    formula.name.toLowerCase().includes(searchTerm) ||
    formula.description.toLowerCase().includes(searchTerm) ||
    formula.category.toLowerCase().includes(searchTerm) ||
    formula.variables.some(variable => 
      variable.name.toLowerCase().includes(searchTerm) ||
      variable.description.toLowerCase().includes(searchTerm)
    )
  );
};