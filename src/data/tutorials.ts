import { Tutorial } from '../types/tutorial';

export const appTutorials: Record<string, Tutorial> = {
  'dynamic-graphing': {
    id: 'dynamic-graphing',
    title: 'Dynamic Graphing Calculator Tutorial',
    description: 'Learn to plot functions and explore mathematical relationships',
    difficulty: 'Intermediate',
    timeNeeded: 15,
    steps: [
      {
        id: 'intro',
        title: 'Welcome to the Graphing Calculator',
        content: 'This powerful tool lets you visualize mathematical functions in real-time. You can plot multiple functions, adjust parameters with sliders, and compare different equations side by side.',
        tip: 'The graphing calculator supports a wide range of functions from basic polynomials to advanced trigonometric and logarithmic expressions.'
      },
      {
        id: 'interface',
        title: 'Understanding the Interface',
        content: 'The interface has three main areas: the control panel on the left for managing functions, the central graph display, and settings panel for customization.',
        action: 'Take a moment to identify these three main sections in the interface.',
        image: 'Interface overview with labeled sections'
      },
      {
        id: 'add-function',
        title: 'Adding Your First Function',
        content: 'To add a function, locate the input field in the control panel and type a mathematical expression like "x^2" or "sin(x)".',
        action: 'Try typing "x^2" in the function input field and click the "+" button.',
        tip: 'Use ^ for exponents, * for multiplication, and standard function names like sin, cos, log, sqrt.'
      },
      {
        id: 'multiple-functions',
        title: 'Working with Multiple Functions',
        content: 'You can add multiple functions to compare them. Each function gets a unique color, and you can toggle their visibility using the checkboxes.',
        action: 'Add a second function like "2*x + 1" and see how it appears in a different color.',
        tip: 'Click the colored checkbox next to any function to hide or show it on the graph.'
      },
      {
        id: 'parameters',
        title: 'Using Parameter Sliders',
        content: 'When you use variables like "a", "b", or "c" in your functions, sliders automatically appear to let you adjust these parameters in real-time.',
        action: 'Try entering "a*sin(b*x)" and experiment with the sliders that appear.',
        tip: 'Parameter sliders are perfect for exploring how coefficients affect function behavior.'
      },
      {
        id: 'settings',
        title: 'Graph Settings and Controls',
        content: 'Use the settings panel to zoom in/out, toggle the grid, and reset the view. You can also export your graphs for presentations or homework.',
        action: 'Experiment with the zoom controls and grid toggle to customize your view.',
        tip: 'The reset view button is helpful when you lose track of your functions after zooming.'
      },
      {
        id: 'analysis',
        title: 'Analyzing Your Graphs',
        content: 'The calculator provides automatic analysis including domain, range, and key points. Use this information to better understand your functions.',
        tip: 'Look for patterns like symmetry, periodicity, and intercepts to deepen your mathematical understanding.'
      }
    ]
  },

  'equation-step-solver': {
    id: 'equation-step-solver',
    title: 'Equation Step Solver Tutorial',
    description: 'Master equation solving with guided step-by-step solutions',
    difficulty: 'Beginner',
    timeNeeded: 10,
    steps: [
      {
        id: 'intro',
        title: 'Welcome to the Step Solver',
        content: 'This tool breaks down equation solving into clear, manageable steps. Perfect for learning algebra or checking your work.',
        tip: 'The step solver shows not just the answer, but the mathematical reasoning behind each step.'
      },
      {
        id: 'input',
        title: 'Entering Equations',
        content: 'Type your equation in the input field using standard mathematical notation. Make sure to include the equals sign (=).',
        action: 'Try entering a simple equation like "2x + 5 = 13" in the input field.',
        tip: 'Use proper equation format with variables, numbers, and an equals sign.'
      },
      {
        id: 'solution-mode',
        title: 'Using Solution Mode',
        content: 'Solution mode shows you the complete step-by-step process instantly. Each step is explained with the mathematical rule used.',
        action: 'Click "Show Solution" to see the complete solving process for your equation.',
        tip: 'Read each step carefully and note the explanations to understand the mathematical principles.'
      },
      {
        id: 'game-mode',
        title: 'Interactive Game Mode',
        content: 'Game mode turns learning into an interactive experience. You predict each step and get immediate feedback.',
        action: 'Try "Game Mode" with the same equation and see if you can predict the next step.',
        tip: 'Game mode helps build problem-solving skills and mathematical intuition.'
      },
      {
        id: 'samples',
        title: 'Using Sample Problems',
        content: 'The sample problems section provides pre-loaded equations for practice. Great for building confidence with different equation types.',
        action: 'Click on any sample equation to automatically load it into the input field.',
        tip: 'Work through multiple sample problems to recognize solving patterns.'
      }
    ]
  },

  'derivative-explorer': {
    id: 'derivative-explorer',
    title: 'Interactive Derivative Explorer Tutorial',
    description: 'Visualize calculus concepts with real-time derivative calculations',
    difficulty: 'Intermediate',
    timeNeeded: 20,
    steps: [
      {
        id: 'intro',
        title: 'Understanding Derivatives Visually',
        content: 'This tool makes abstract calculus concepts tangible by showing how derivatives represent slopes and rates of change in real-time.',
        tip: 'Derivatives are everywhere in physics, economics, and engineering - this tool helps you see why they matter.'
      },
      {
        id: 'cursor-movement',
        title: 'Interactive Cursor Exploration',
        content: 'Move your mouse cursor over the graph to see tangent lines and slope values change in real-time. The cursor position determines where the derivative is calculated.',
        action: 'Move your mouse slowly across the graph and watch the tangent line follow your cursor.',
        tip: 'Notice how the slope changes - positive slopes go upward, negative slopes go downward.'
      },
      {
        id: 'function-selection',
        title: 'Choosing Functions to Explore',
        content: 'Select different functions from the dropdown menu or enter your own. Each function has unique derivative behavior.',
        action: 'Try switching between "x²", "sin(x)", and "x³" to see different derivative patterns.',
        tip: 'Start with simple functions like x² before moving to more complex ones like trigonometric functions.'
      },
      {
        id: 'h-value',
        title: 'Understanding the h-Value',
        content: 'The h-value controls how the numerical derivative is approximated. Smaller h-values give more accurate approximations.',
        action: 'Adjust the h-value slider and observe how it affects the numerical derivative accuracy.',
        tip: 'Watch the error between numerical and analytical derivatives as you change h.'
      },
      {
        id: 'derivative-curve',
        title: 'Viewing the Derivative Function',
        content: 'Toggle on "Show Derivative" to see the actual derivative function plotted. This helps you understand the relationship between a function and its derivative.',
        action: 'Enable "Show Derivative" and observe how the derivative curve relates to the original function.',
        tip: 'Notice that when the original function has zero slope, the derivative curve crosses the x-axis.'
      },
      {
        id: 'critical-points',
        title: 'Finding Critical Points',
        content: 'Use the tool to find where the derivative equals zero - these are critical points where functions have maximum, minimum, or inflection points.',
        action: 'Move your cursor to find points where the tangent line is horizontal (slope = 0).',
        tip: 'Critical points are essential for optimization problems in calculus and real-world applications.'
      }
    ]
  },

  'vector-3d': {
    id: 'vector-3d',
    title: '3D Vector Visualizer Tutorial',
    description: 'Explore vector mathematics in three-dimensional space',
    difficulty: 'Intermediate',
    timeNeeded: 25,
    steps: [
      {
        id: 'intro',
        title: 'Welcome to 3D Vector Mathematics',
        content: 'Vectors are fundamental in physics, engineering, and computer graphics. This tool helps you visualize vector operations in 3D space.',
        tip: 'Understanding vectors in 3D is crucial for fields like robotics, game development, and structural engineering.'
      },
      {
        id: 'create-vector',
        title: 'Creating Your First Vector',
        content: 'Enter x, y, and z components in the "Add Vector" section. Think of these as how far the vector extends in each direction.',
        action: 'Try creating a vector with components (2, 3, 1) and give it a label like "Vector A".',
        tip: 'Start with small integer values between -5 and 5 to keep vectors visible and manageable.'
      },
      {
        id: 'view-controls',
        title: 'Navigating 3D Space',
        content: 'Use the rotation sliders to view your vectors from different angles. This helps you understand their true 3D relationships.',
        action: 'Adjust the X and Y rotation sliders to view your vector from multiple perspectives.',
        tip: 'Try edge-on views (rotating until vectors appear as lines) to better understand their alignment.'
      },
      {
        id: 'multiple-vectors',
        title: 'Working with Multiple Vectors',
        content: 'Add a second vector to explore vector operations. Different colors help distinguish between vectors.',
        action: 'Create a second vector with components (1, 0, 4) and label it "Vector B".',
        tip: 'Keep vector magnitudes similar for easier comparison, or deliberately make them different to see scale effects.'
      },
      {
        id: 'dot-product',
        title: 'Understanding Dot Product',
        content: 'Select two vectors to see their dot product calculation. The dot product tells you about the angle between vectors.',
        action: 'Check the boxes next to your two vectors and observe the dot product calculation.',
        tip: 'Positive dot products mean acute angles, negative means obtuse, and zero means perpendicular vectors.'
      },
      {
        id: 'cross-product',
        title: 'Exploring Cross Product',
        content: 'The cross product creates a new vector perpendicular to both original vectors. It appears as a dashed line.',
        action: 'With two vectors selected, observe the cross product vector (dashed line) that appears.',
        tip: 'The cross product magnitude relates to the area of the parallelogram formed by the two vectors.'
      },
      {
        id: 'applications',
        title: 'Real-World Applications',
        content: 'These vector operations have practical uses: dot products for projections, cross products for rotations and torque calculations.',
        tip: 'In physics, cross products help calculate torque and magnetic forces, while dot products help with work and energy calculations.'
      }
    ]
  },

  'probability-simulator': {
    id: 'probability-simulator',
    title: 'Probability Simulator Tutorial',
    description: 'Understand probability through interactive simulations',
    difficulty: 'Beginner',
    timeNeeded: 15,
    steps: [
      {
        id: 'intro',
        title: 'Making Probability Tangible',
        content: 'Probability can be abstract, but simulations make it concrete. See how theoretical probabilities emerge from repeated trials.',
        tip: 'Probability simulators are used in finance, science, and gaming to model real-world uncertainty.'
      },
      {
        id: 'coin-flip',
        title: 'Starting with Coin Flips',
        content: 'Begin with the classic coin flip simulation. Set the number of trials and watch as results approach the theoretical 50% probability.',
        action: 'Select "Coin Flip", set 100 trials, and run the simulation.',
        tip: 'Notice how small samples can deviate from 50%, but larger samples get closer to the theoretical value.'
      },
      {
        id: 'dice-simulation',
        title: 'Exploring Dice Probabilities',
        content: 'Dice simulations show more complex probability distributions. You can explore single dice or combinations.',
        action: 'Switch to "Dice Roll", use 2 dice, target sum 7, and run 500 trials.',
        tip: 'With two dice, sum of 7 is most common because it has the most combinations (1+6, 2+5, 3+4, etc.).'
      },
      {
        id: 'monty-hall',
        title: 'The Famous Monty Hall Problem',
        content: 'This counterintuitive problem shows why switching doors wins 2/3 of the time, despite common intuition.',
        action: 'Try the Monty Hall simulation with "Stay" strategy first, then compare with "Switch" strategy.',
        tip: 'Run high trial counts (500+) to clearly see the 1/3 vs 2/3 win rate difference.'
      },
      {
        id: 'parameters',
        title: 'Adjusting Simulation Parameters',
        content: 'Experiment with different trial counts and speeds. More trials give more reliable results but take longer.',
        action: 'Try the same simulation with 50 trials, then 1000 trials, and compare the accuracy.',
        tip: 'Use slow speed for learning individual outcomes, fast speed for gathering statistical data.'
      },
      {
        id: 'interpretation',
        title: 'Interpreting Results',
        content: 'Compare actual results with theoretical probabilities. Small differences are normal; large differences suggest issues or interesting patterns.',
        tip: 'The "Law of Large Numbers" means that probability converges to theoretical values with more trials.'
      }
    ]
  },

  'matrix-playground': {
    id: 'matrix-playground',
    title: 'Matrix Playground Tutorial',
    description: 'Learn matrix operations with step-by-step calculations',
    difficulty: 'Intermediate',
    timeNeeded: 20,
    steps: [
      {
        id: 'intro',
        title: 'Welcome to Matrix Mathematics',
        content: 'Matrices are fundamental in linear algebra, computer graphics, and data science. This playground lets you explore matrix operations interactively.',
        tip: 'Matrices are used everywhere from 3D graphics to machine learning algorithms.'
      },
      {
        id: 'interface',
        title: 'Understanding the Matrix Interface',
        content: 'The interface shows your matrices as grids of numbers. You can edit values directly and see results immediately.',
        action: 'Look at the pre-loaded matrices A and B. Try clicking on any number to edit it.',
        tip: 'Each matrix shows its dimensions (rows × columns) at the bottom.'
      },
      {
        id: 'operations',
        title: 'Choosing Matrix Operations',
        content: 'Select operations from the dropdown: addition, multiplication, transpose, determinant, or inverse. Each operation has different requirements.',
        action: 'Try selecting "Addition (A + B)" and click Calculate to see the result.',
        tip: 'Addition requires matrices of the same size, while multiplication needs special dimension compatibility.'
      },
      {
        id: 'addition',
        title: 'Matrix Addition',
        content: 'Matrix addition adds corresponding elements. Both matrices must have identical dimensions.',
        action: 'Ensure both matrices are 2×2 and perform addition to see element-wise combination.',
        tip: 'Matrix addition is commutative: A + B = B + A.'
      },
      {
        id: 'multiplication',
        title: 'Matrix Multiplication',
        content: 'Matrix multiplication is more complex - each element is the dot product of a row and column. The number of columns in the first matrix must equal rows in the second.',
        action: 'Try multiplication with the default 2×2 matrices and observe the pattern.',
        tip: 'Matrix multiplication is NOT commutative: A × B ≠ B × A in general.'
      },
      {
        id: 'create-matrix',
        title: 'Creating Custom Matrices',
        content: 'Add your own matrices using the "Add Matrix" section. Specify rows, columns, and a name.',
        action: 'Create a 3×2 matrix and experiment with different operations.',
        tip: 'Try creating matrices of different sizes to understand dimension requirements for operations.'
      },
      {
        id: 'advanced-ops',
        title: 'Advanced Operations',
        content: 'Explore transpose, determinant, and inverse operations. These are crucial for solving systems of equations and transformations.',
        action: 'Try the transpose operation on a non-square matrix to see how dimensions change.',
        tip: 'Only square matrices have determinants, and only non-singular matrices have inverses.'
      }
    ]
  },

  'fractal-generator': {
    id: 'fractal-generator',
    title: 'Fractal Generator Tutorial',
    description: 'Create and explore beautiful mathematical fractals',
    difficulty: 'Intermediate',
    timeNeeded: 18,
    steps: [
      {
        id: 'intro',
        title: 'Welcome to the World of Fractals',
        content: 'Fractals are infinitely complex patterns that repeat at every scale. They appear in nature, art, and mathematics.',
        tip: 'Fractals are found in clouds, coastlines, trees, and even financial markets!'
      },
      {
        id: 'fractal-types',
        title: 'Choosing Your Fractal Type',
        content: 'Select from four different fractal types: Mandelbrot set, Julia sets, Sierpinski triangle, and Koch snowflake. Each has unique mathematical properties.',
        action: 'Try switching between different fractal types to see their distinct patterns.',
        tip: 'Start with the Mandelbrot set - it\'s the most famous and visually striking fractal.'
      },
      {
        id: 'iterations',
        title: 'Understanding Iterations',
        content: 'The iteration slider controls detail level. More iterations reveal finer fractal structure but take longer to compute.',
        action: 'Adjust the iteration slider from low to high and watch the fractal detail increase.',
        tip: 'Start with lower iterations for exploration, then increase for final high-quality images.'
      },
      {
        id: 'zoom-explore',
        title: 'Zooming and Exploration',
        content: 'Click anywhere on the fractal to zoom in and explore infinite detail. Fractals reveal new patterns at every magnification level.',
        action: 'Click on an interesting part of the fractal boundary to zoom in and discover new structures.',
        tip: 'The most interesting regions are usually at the boundaries between different colored areas.'
      },
      {
        id: 'julia-sets',
        title: 'Exploring Julia Sets',
        content: 'Julia sets are related to the Mandelbrot set. Adjust the C parameters to create different Julia set variations.',
        action: 'Switch to Julia set and experiment with the C real and imaginary sliders.',
        tip: 'Each point in the Mandelbrot set corresponds to a different Julia set!'
      },
      {
        id: 'color-schemes',
        title: 'Artistic Color Schemes',
        content: 'Different color schemes highlight different aspects of the fractal structure. Experiment to find visually appealing combinations.',
        action: 'Try each color scheme: Classic, Fire, Ocean, and Psychedelic to see different artistic effects.',
        tip: 'Color schemes don\'t change the mathematics, just the visual representation.'
      },
      {
        id: 'geometric-fractals',
        title: 'Geometric Fractals',
        content: 'Sierpinski triangle and Koch snowflake are geometric fractals built through iterative construction rather than complex number calculations.',
        action: 'Switch to Koch snowflake and watch how iteration count affects the snowflake\'s detailed structure.',
        tip: 'These fractals demonstrate how simple rules can create infinitely complex shapes.'
      }
    ]
  },

  'differential-equation': {
    id: 'differential-equation',
    title: 'Differential Equation Visualizer Tutorial',
    description: 'Visualize differential equations with slope fields and solution curves',
    difficulty: 'Advanced',
    timeNeeded: 25,
    steps: [
      {
        id: 'intro',
        title: 'Understanding Differential Equations Visually',
        content: 'Differential equations describe how quantities change over time. This visualizer shows slope fields and solution curves to make these abstract concepts concrete.',
        tip: 'Differential equations model everything from population growth to radioactive decay to planetary motion.'
      },
      {
        id: 'equation-selection',
        title: 'Choosing Differential Equations',
        content: 'Select from pre-loaded differential equations or understand the notation. dy/dx represents how y changes with respect to x.',
        action: 'Try the default equation "dy/dx = y - x" and observe the resulting slope field.',
        tip: 'Start with simple linear equations before moving to nonlinear or system equations.'
      },
      {
        id: 'slope-fields',
        title: 'Understanding Slope Fields',
        content: 'Each small line segment shows the slope (direction) that solutions must follow at that point. The pattern reveals solution behavior.',
        action: 'Look at the blue line segments - they show the direction field for your differential equation.',
        tip: 'Solution curves must follow the slope field directions like water flowing down a hillside.'
      },
      {
        id: 'initial-conditions',
        title: 'Setting Initial Conditions',
        content: 'Initial conditions (starting point) determine which specific solution curve you get. Different starting points lead to different solutions.',
        action: 'Adjust the x₀ and y₀ values to see how the orange solution curve changes.',
        tip: 'In real applications, initial conditions come from measurements or known starting states.'
      },
      {
        id: 'solution-curves',
        title: 'Solution Curves',
        content: 'The orange curve shows one particular solution that passes through your initial condition point. It follows the slope field directions.',
        action: 'Enable "Show Solution Curve" and observe how it flows along the slope field directions.',
        tip: 'Solution curves never cross each other (except at special singular points).'
      },
      {
        id: 'equation-types',
        title: 'Exploring Different Equation Types',
        content: 'Try different equations to see various behaviors: exponential growth, oscillations, or equilibrium points.',
        action: 'Switch between different preset equations and observe how the slope fields change.',
        tip: 'Equations with x + y tend to show growth, while -x/y creates circular patterns.'
      },
      {
        id: 'applications',
        title: 'Real-World Applications',
        content: 'These visualizations help understand population dynamics, chemical reactions, mechanical systems, and many other phenomena governed by differential equations.',
        tip: 'Biologists use similar visualizations to understand predator-prey relationships and disease spread.'
      }
    ]
  },

  'fourier-sound': {
    id: 'fourier-sound',
    title: 'Fourier Series Sound Tool Tutorial',
    description: 'Explore harmonic analysis through visual and audio synthesis',
    difficulty: 'Advanced',
    timeNeeded: 22,
    steps: [
      {
        id: 'intro',
        title: 'Welcome to Fourier Analysis',
        content: 'Fourier series break down complex waves into simple sine wave components. This tool lets you build waveforms and hear the results.',
        tip: 'Fourier analysis is fundamental to digital music, signal processing, and image compression.'
      },
      {
        id: 'wave-types',
        title: 'Understanding Wave Types',
        content: 'Different wave shapes (square, sawtooth, triangle) have characteristic harmonic structures. Each can be built from sine waves.',
        action: 'Select "Square Wave" to see its harmonic decomposition with odd-numbered frequencies.',
        tip: 'Square waves contain only odd harmonics (1st, 3rd, 5th, etc.) with decreasing amplitudes.'
      },
      {
        id: 'harmonics',
        title: 'Manipulating Individual Harmonics',
        content: 'Each harmonic has three properties: frequency (which harmonic), amplitude (volume), and phase (timing offset).',
        action: 'Adjust the amplitude slider for the first harmonic and watch the composite wave change.',
        tip: 'The fundamental frequency (1st harmonic) usually has the largest amplitude and determines the perceived pitch.'
      },
      {
        id: 'audio-playback',
        title: 'Hearing Your Waveforms',
        content: 'Click "Play" to hear your waveform as sound. The visual wave pattern directly corresponds to what you hear.',
        action: 'Play different wave types and listen to how they sound different despite having the same fundamental frequency.',
        tip: 'Adjusting harmonics changes the "timbre" or tone quality, not the pitch.'
      },
      {
        id: 'frequency-control',
        title: 'Frequency Relationships',
        content: 'Harmonic frequencies are integer multiples of the fundamental. The 2nd harmonic is twice the frequency, 3rd is three times, etc.',
        action: 'Adjust frequency sliders and observe how higher harmonics create faster oscillations.',
        tip: 'Musical octaves correspond to doubling the fundamental frequency (2nd harmonic).'
      },
      {
        id: 'amplitude-effects',
        title: 'Amplitude and Wave Shaping',
        content: 'Amplitude controls how much each harmonic contributes to the final waveform. Different combinations create different wave shapes.',
        action: 'Start with a sine wave (only 1st harmonic) and gradually add higher harmonics.',
        tip: 'Removing even harmonics tends to create more "hollow" or "woody" sounds.'
      },
      {
        id: 'phase-advanced',
        title: 'Phase Relationships',
        content: 'Phase controls timing relationships between harmonics. Phase changes can dramatically alter wave shape without changing harmonic content.',
        action: 'Adjust phase sliders while keeping amplitudes constant and observe wave shape changes.',
        tip: 'Phase is crucial in audio engineering for avoiding unwanted interference between sound sources.'
      },
      {
        id: 'custom-synthesis',
        title: 'Custom Sound Synthesis',
        content: 'Use "Custom" mode to create your own unique waveforms by adjusting individual harmonics to achieve desired sounds.',
        action: 'Switch to Custom mode and experiment with creating your own harmonic recipes.',
        tip: 'Real musical instruments have complex harmonic patterns that give them their distinctive sounds.'
      }
    ]
  },

  'word-problem-converter': {
    id: 'word-problem-converter',
    title: 'Math Word Problem Converter Tutorial',
    description: 'Transform real-world problems into mathematical equations',
    difficulty: 'Intermediate',
    timeNeeded: 16,
    steps: [
      {
        id: 'intro',
        title: 'From Words to Mathematics',
        content: 'Word problems connect real-world situations to mathematical equations. This tool helps you see the translation process step by step.',
        tip: 'Word problems teach you to apply mathematics to real situations you encounter in life and work.'
      },
      {
        id: 'problem-input',
        title: 'Entering Word Problems',
        content: 'Type or paste word problems in natural language. The tool analyzes the text to identify mathematical relationships.',
        action: 'Try one of the sample problems first, like the car speed problem.',
        tip: 'Clear, well-structured problems work best. Include specific numbers and clear relationships.'
      },
      {
        id: 'variable-identification',
        title: 'Identifying Variables',
        content: 'The tool identifies key variables and their relationships. Variables represent unknown quantities we need to find.',
        action: 'Click "Convert to Equation" and observe how variables are identified and labeled.',
        tip: 'Good variable identification is crucial - each variable should represent one specific unknown quantity.'
      },
      {
        id: 'equation-formation',
        title: 'Building the Mathematical Equation',
        content: 'Watch how words like "is", "equals", "total" become mathematical operators and relationships.',
        action: 'Observe how phrases like "distance equals speed times time" become d = s × t.',
        tip: 'Common word patterns: "is" means equals, "total" means addition, "rate" often means multiplication.'
      },
      {
        id: 'step-by-step',
        title: 'Following the Solution Steps',
        content: 'The solution process breaks down into logical steps, showing mathematical reasoning clearly.',
        action: 'Read through each step and understand why it follows from the previous one.',
        tip: 'Each step should make logical sense and move you closer to finding the unknown value.'
      },
      {
        id: 'sample-problems',
        title: 'Exploring Different Problem Types',
        content: 'Try various sample problems to see different mathematical concepts: geometry, motion, finance, and more.',
        action: 'Work through each sample problem to see different equation types and solution methods.',
        tip: 'Practice with diverse problem types builds pattern recognition for future problems.'
      },
      {
        id: 'verification',
        title: 'Checking Your Solutions',
        content: 'Always verify solutions by substituting back into the original problem context to ensure they make sense.',
        tip: 'If your answer doesn\'t make sense in the real-world context, check your equation setup and calculations.'
      }
    ]
  },

  'function-composition': {
    id: 'function-composition',
    title: 'Function Composition Visualizer Tutorial',
    description: 'Understand how functions combine through composition',
    difficulty: 'Intermediate',
    timeNeeded: 18,
    steps: [
      {
        id: 'intro',
        title: 'Understanding Function Composition',
        content: 'Function composition f(g(x)) means applying function g first, then applying function f to that result. This creates powerful combinations.',
        tip: 'Function composition is like a factory assembly line - each function transforms the input before passing it to the next.'
      },
      {
        id: 'defining-functions',
        title: 'Setting Up Your Functions',
        content: 'Define two functions f(x) and g(x) using the input fields. Try starting with simple functions to understand the concept.',
        action: 'Enter f(x) = x^2 and g(x) = sin(x) to see how polynomial and trigonometric functions compose.',
        tip: 'Start with familiar functions before experimenting with complex combinations.'
      },
      {
        id: 'cursor-exploration',
        title: 'Interactive Value Exploration',
        content: 'Move your cursor over the graph to see real-time calculation of f(x), g(x), and f(g(x)) at different points.',
        action: 'Move your cursor slowly across the graph and watch the value calculations update.',
        tip: 'The red line shows where you\'re measuring, making it easy to connect visual and numerical results.'
      },
      {
        id: 'composition-process',
        title: 'Following the Composition Process',
        content: 'Watch the step-by-step calculation: first g(x) is evaluated, then that result becomes the input to f.',
        action: 'Observe the "Values at x = ..." panel to see the three-step process: x → g(x) → f(g(x)).',
        tip: 'Think of composition as a two-step process: inner function first, then outer function.'
      },
      {
        id: 'visual-comparison',
        title: 'Comparing Functions Visually',
        content: 'The composition f(g(x)) creates a new function that can look very different from either original function.',
        action: 'Toggle the "Show f(g(x))" option to compare the composition with the original functions.',
        tip: 'Composition often creates more complex behavior than either original function alone.'
      },
      {
        id: 'function-families',
        title: 'Exploring Different Function Types',
        content: 'Use the quick-add buttons to try different function families: polynomials, trigonometric, exponential, and more.',
        action: 'Try composing exponential and trigonometric functions to see interesting periodic growth patterns.',
        tip: 'Different function families create characteristic composition behaviors worth exploring.'
      },
      {
        id: 'order-matters',
        title: 'Understanding Order Dependency',
        content: 'Function composition is not commutative: f(g(x)) ≠ g(f(x)) in general. Order matters significantly.',
        action: 'Swap your functions to compare f(g(x)) with g(f(x)) and see the difference.',
        tip: 'This non-commutativity is why careful attention to order is crucial in mathematics and programming.'
      },
      {
        id: 'applications',
        title: 'Real-World Applications',
        content: 'Function composition appears in coordinate transformations, data processing pipelines, and mathematical modeling.',
        tip: 'In programming, function composition is fundamental to functional programming and data transformation chains.'
      }
    ]
  },

  'limit-continuity': {
    id: 'limit-continuity',
    title: 'Limit & Continuity Visual Lab Tutorial',
    description: 'Explore epsilon-delta definitions and continuity concepts',
    difficulty: 'Advanced',
    timeNeeded: 28,
    steps: [
      {
        id: 'intro',
        title: 'Limits and Continuity Foundations',
        content: 'Limits and continuity are fundamental calculus concepts. This lab makes the abstract epsilon-delta definition visual and interactive.',
        tip: 'Understanding limits is crucial for derivatives, integrals, and advanced mathematics.'
      },
      {
        id: 'epsilon-delta',
        title: 'The Epsilon-Delta Definition',
        content: 'A limit exists if for any ε > 0, there exists δ > 0 such that |f(x) - L| < ε whenever 0 < |x - a| < δ.',
        action: 'Observe the yellow (ε) and blue (δ) bands that visualize this definition.',
        tip: 'This formal definition makes intuitive "approaching" behavior mathematically precise.'
      },
      {
        id: 'function-behavior',
        title: 'Exploring Function Behavior',
        content: 'Different functions exhibit different limit behavior: some have limits everywhere, others have discontinuities.',
        action: 'Try the different sample functions to see continuous vs discontinuous behavior.',
        tip: 'Pay attention to what happens exactly at the approach point versus nearby points.'
      },
      {
        id: 'approach-point',
        title: 'Setting the Approach Point',
        content: 'The approach point (a) is where we examine limit behavior. Moving this point shows different function behaviors.',
        action: 'Adjust the approach point slider to examine limits at different x-values.',
        tip: 'Interesting behavior often occurs at discontinuities, corners, or vertical asymptotes.'
      },
      {
        id: 'limit-value',
        title: 'Determining Limit Values',
        content: 'The limit value (L) is what the function approaches, which may differ from the actual function value at that point.',
        action: 'Adjust the limit value and observe how the ε-bands change position.',
        tip: 'For continuous functions, the limit equals the function value. For discontinuous functions, they may differ.'
      },
      {
        id: 'epsilon-control',
        title: 'Epsilon Tolerance Control',
        content: 'Epsilon (ε) sets how close to the limit we need to be. Smaller ε requires more precision.',
        action: 'Make ε very small and observe how the yellow tolerance band becomes narrow.',
        tip: 'The epsilon-delta game: for ANY ε > 0, we must find a suitable δ > 0.'
      },
      {
        id: 'delta-response',
        title: 'Delta Response Strategy',
        content: 'Delta (δ) controls the input tolerance. For limits to exist, we must find δ that works for any given ε.',
        action: 'Adjust δ and see if you can keep the function within the ε-band for the given δ-window.',
        tip: 'If you can make δ arbitrarily small while maintaining the ε constraint, the limit exists.'
      },
      {
        id: 'discontinuity-types',
        title: 'Types of Discontinuities',
        content: 'Explore removable discontinuities, jump discontinuities, and infinite discontinuities with different functions.',
        action: 'Try the 1/x function and observe the infinite discontinuity at x = 0.',
        tip: 'Different discontinuity types require different approaches and have different limit behaviors.'
      },
      {
        id: 'practical-application',
        title: 'Building Mathematical Intuition',
        content: 'Use this tool to develop intuition before working with formal proofs. Visual understanding supports analytical reasoning.',
        tip: 'Visual intuition and formal definitions work together - neither alone is sufficient for deep understanding.'
      }
    ]
  },

  'trigonometry-triangle': {
    id: 'trigonometry-triangle',
    title: 'Interactive Trigonometry Triangle Tutorial',
    description: 'Explore trigonometric relationships through dynamic triangles',
    difficulty: 'Beginner',
    timeNeeded: 14,
    steps: [
      {
        id: 'intro',
        title: 'Interactive Triangle Exploration',
        content: 'This tool lets you manipulate triangle vertices to see how angles, side lengths, and trigonometric ratios change dynamically.',
        tip: 'Trigonometry connects geometric relationships to numerical calculations used throughout mathematics and science.'
      },
      {
        id: 'triangle-interaction',
        title: 'Dragging Triangle Vertices',
        content: 'Click and drag any vertex (A, B, or C) to reshape the triangle. All measurements update in real-time.',
        action: 'Try dragging vertex C to different positions and observe how angles and sides change.',
        tip: 'The triangle always maintains its basic properties while measurements update continuously.'
      },
      {
        id: 'angle-measurement',
        title: 'Understanding Angle Measurements',
        content: 'Each vertex shows its interior angle. Notice how the three angles always sum to 180 degrees.',
        action: 'Drag vertices and verify that ∠A + ∠B + ∠C always equals 180°.',
        tip: 'This angle sum property is fundamental to all triangles, regardless of shape or size.'
      },
      {
        id: 'side-relationships',
        title: 'Side Length Relationships',
        content: 'The sides are labeled a, b, c opposite to vertices A, B, C respectively. Side lengths change as you modify the triangle.',
        action: 'Create a very flat triangle and observe how one side becomes much longer than the others.',
        tip: 'The triangle inequality states that any side must be shorter than the sum of the other two sides.'
      },
      {
        id: 'trigonometric-ratios',
        title: 'Trigonometric Calculations',
        content: 'The panel shows sin, cos, and tan for angle A. These ratios depend on the triangle shape.',
        action: 'Make angle A exactly 90° and observe how the trigonometric ratios change.',
        tip: 'Right triangles have special properties: one angle is 90° and trigonometric ratios become especially clear.'
      },
      {
        id: 'special-triangles',
        title: 'Exploring Special Triangles',
        content: 'Use the preset buttons to create famous triangles: 3-4-5 right triangle, equilateral, and isosceles.',
        action: 'Try each preset triangle and observe their special properties and measurements.',
        tip: 'Special triangles appear frequently in mathematics and have memorable angle and ratio patterns.'
      },
      {
        id: 'area-calculation',
        title: 'Area and Perimeter Properties',
        content: 'The tool calculates area and perimeter automatically. Area depends on both side lengths and angles.',
        action: 'Keep the perimeter roughly constant while changing the triangle shape to see area changes.',
        tip: 'For a fixed perimeter, the equilateral triangle has the maximum area (isoperimetric inequality).'
      },
      {
        id: 'practical-applications',
        title: 'Real-World Applications',
        content: 'These triangle relationships are used in navigation, construction, astronomy, and computer graphics.',
        tip: 'Engineers use trigonometry for structural analysis, pilots for navigation, and game developers for 3D graphics.'
      }
    ]
  },

  'linear-transformation': {
    id: 'linear-transformation',
    title: 'Linear Transformation Shapes Tutorial',
    description: 'Visualize how matrices transform geometric shapes',
    difficulty: 'Intermediate',
    timeNeeded: 20,
    steps: [
      {
        id: 'intro',
        title: 'Linear Transformations in Action',
        content: 'Linear transformations use matrices to stretch, rotate, reflect, and shear geometric shapes. This tool makes abstract linear algebra visual.',
        tip: 'Linear transformations are fundamental in computer graphics, robotics, and data analysis.'
      },
      {
        id: 'matrix-input',
        title: 'Understanding the Transformation Matrix',
        content: 'The 2×2 matrix controls the transformation. Each entry affects the transformation in a specific way.',
        action: 'Try changing individual matrix values and observe how the shape transforms.',
        tip: 'The matrix [a b; c d] transforms point (x,y) to (ax+by, cx+dy).'
      },
      {
        id: 'shape-selection',
        title: 'Choosing Shapes to Transform',
        content: 'Different shapes help visualize different aspects of transformations. Circles show stretching, squares show area changes.',
        action: 'Switch between different shapes and apply the same transformation to see various effects.',
        tip: 'Circles become ellipses under most transformations, revealing stretch directions and magnitudes.'
      },
      {
        id: 'preset-transformations',
        title: 'Exploring Common Transformations',
        content: 'Use preset transformations to understand standard operations: scaling, rotation, reflection, and shearing.',
        action: 'Try each preset transformation and observe its characteristic effect on shapes.',
        tip: 'Each preset demonstrates a fundamental transformation type used in graphics and engineering.'
      },
      {
        id: 'determinant-meaning',
        title: 'Understanding the Determinant',
        content: 'The determinant shows area scaling factor and orientation. Negative determinants flip orientation.',
        action: 'Watch the determinant value as you change matrix entries and note when it becomes negative.',
        tip: 'Determinant = 0 means the transformation crushes the shape to lower dimensions (line or point).'
      },
      {
        id: 'basis-vectors',
        title: 'Transformation of Basis Vectors',
        content: 'The orange arrows show where the standard basis vectors (1,0) and (0,1) go under the transformation.',
        action: 'Observe how the orange basis vectors change as you modify the transformation matrix.',
        tip: 'The matrix columns directly show where the basis vectors end up after transformation.'
      },
      {
        id: 'composition',
        title: 'Combining Transformations',
        content: 'Multiple transformations can be combined by matrix multiplication. Order matters significantly.',
        action: 'Apply a rotation followed by scaling, then try scaling followed by rotation.',
        tip: 'Matrix multiplication is not commutative: AB ≠ BA for transformations.'
      },
      {
        id: 'applications',
        title: 'Real-World Applications',
        content: 'These transformations are used in computer graphics, robotics, data compression, and scientific computing.',
        tip: '3D graphics engines use 4×4 matrices for transformations in three-dimensional space.'
      }
    ]
  },

  'venn-diagram': {
    id: 'venn-diagram',
    title: 'Set Theory Venn Diagram Tool Tutorial',
    description: 'Explore set operations through interactive diagrams',
    difficulty: 'Beginner',
    timeNeeded: 12,
    steps: [
      {
        id: 'intro',
        title: 'Introduction to Set Theory',
        content: 'Sets are collections of objects, and Venn diagrams visualize relationships between sets. This tool makes set operations interactive.',
        tip: 'Set theory is fundamental to mathematics, computer science, and logical reasoning.'
      },
      {
        id: 'adding-elements',
        title: 'Adding Elements to Sets',
        content: 'Add elements to sets by typing in the input field and selecting which set to add to. Elements can be numbers, letters, or words.',
        action: 'Try adding some numbers to Set A and different numbers to Set B.',
        tip: 'Elements can belong to multiple sets - this creates the intersection regions in the diagram.'
      },
      {
        id: 'set-operations',
        title: 'Understanding Set Operations',
        content: 'The operations dropdown shows different ways to combine sets: union (∪), intersection (∩), difference (-), and symmetric difference (△).',
        action: 'Try each operation and observe how the result changes in the result panel.',
        tip: 'Union combines everything, intersection finds common elements, difference subtracts one set from another.'
      },
      {
        id: 'visual-regions',
        title: 'Reading the Venn Diagram',
        content: 'Different regions of the diagram represent different set relationships. Elements appear in their appropriate regions.',
        action: 'Add an element that belongs to both sets and watch it appear in the overlapping region.',
        tip: 'The overlapping region shows the intersection - elements that belong to both sets.'
      },
      {
        id: 'three-sets',
        title: 'Working with Three Sets',
        content: 'Add a third set to explore more complex relationships. Three-set diagrams have seven distinct regions.',
        action: 'Click "Add Set C" and observe how the diagram becomes more complex with additional regions.',
        tip: 'With three sets, you can have elements in A∩B∩C (center), A∩B only, A∩C only, etc.'
      },
      {
        id: 'drag-and-drop',
        title: 'Interactive Element Management',
        content: 'Elements can be moved between sets by dragging, and you can remove elements using the minus buttons.',
        action: 'Try moving an element from one set to another by editing the set contents.',
        tip: 'This interactivity helps you experiment with "what if" scenarios for set membership.'
      },
      {
        id: 'real-applications',
        title: 'Real-World Applications',
        content: 'Venn diagrams are used in logic, probability, database queries, and decision making.',
        tip: 'Database SQL queries use set operations: JOIN is like intersection, UNION combines tables.'
      }
    ]
  },

  'expression-simplifier': {
    id: 'expression-simplifier',
    title: 'Algebraic Expression Simplifier Game Tutorial',
    description: 'Learn algebra through interactive drag-and-drop gameplay',
    difficulty: 'Beginner',
    timeNeeded: 12,
    steps: [
      {
        id: 'intro',
        title: 'Gamified Algebra Learning',
        content: 'This game teaches algebraic simplification through drag-and-drop interaction. Combine like terms by dragging them together.',
        tip: 'Learning through games helps build intuition and makes abstract concepts more concrete.'
      },
      {
        id: 'like-terms',
        title: 'Identifying Like Terms',
        content: 'Like terms have the same variable and exponent. Only like terms can be combined through addition and subtraction.',
        action: 'Look at the term boxes and identify which ones have the same variable and exponent.',
        tip: '3x and 2x are like terms, but 3x and 3x² are not because the exponents differ.'
      },
      {
        id: 'drag-to-combine',
        title: 'Dragging Terms Together',
        content: 'Drag one term onto another to attempt combination. The game will only allow valid combinations.',
        action: 'Try dragging a term with x onto another term with x to combine them.',
        tip: 'The game provides immediate feedback - invalid combinations won\'t work, valid ones create new simplified terms.'
      },
      {
        id: 'scoring-system',
        title: 'Understanding the Scoring',
        content: 'Correct combinations earn points, wrong attempts lose points. Use hints sparingly as they cost points.',
        action: 'Make a correct combination and watch your score increase.',
        tip: 'Strategic thinking earns more points than random guessing. Plan your moves before dragging.'
      },
      {
        id: 'hints-system',
        title: 'Using Hints Wisely',
        content: 'When stuck, use the hint button for guidance. Hints cost points but help you learn the correct approach.',
        action: 'Try using a hint when you\'re unsure about which terms to combine next.',
        tip: 'Use hints as learning tools, not crutches. Try to understand the reasoning behind each hint.'
      },
      {
        id: 'different-problems',
        title: 'Exploring Different Problem Types',
        content: 'The game includes various expression types: linear terms, quadratics, and constants. Each teaches different skills.',
        action: 'Try the different sample problems to practice various algebraic concepts.',
        tip: 'Different problem types help build comprehensive algebraic intuition beyond just one concept.'
      },
      {
        id: 'strategy-tips',
        title: 'Winning Strategies',
        content: 'Look for obvious combinations first, save harder decisions for last, and think about the target form before starting.',
        tip: 'Good algebra students develop pattern recognition - practice helps you see simplification opportunities quickly.'
      }
    ]
  },

  'prime-explorer': {
    id: 'prime-explorer',
    title: 'Prime Number Explorer Tutorial',
    description: 'Discover patterns in prime numbers through visualization',
    difficulty: 'Intermediate',
    timeNeeded: 16,
    steps: [
      {
        id: 'intro',
        title: 'Exploring Prime Number Patterns',
        content: 'Prime numbers have fascinated mathematicians for millennia. This explorer reveals patterns through different visualization methods.',
        tip: 'Prime numbers are the building blocks of all integers - every number is either prime or composed of prime factors.'
      },
      {
        id: 'number-range',
        title: 'Setting the Number Range',
        content: 'Use the slider to control how many numbers to display. Larger ranges show broader patterns but may be slower to compute.',
        action: 'Start with 100 numbers, then gradually increase to see how prime density changes.',
        tip: 'Primes become less dense as numbers get larger, following the Prime Number Theorem.'
      },
      {
        id: 'grid-view',
        title: 'Grid Visualization Mode',
        content: 'Grid view arranges numbers in rows and columns, with primes highlighted in blue. This reveals some surprising patterns.',
        action: 'In grid view, look for diagonal lines and other patterns formed by the blue prime numbers.',
        tip: 'Grid patterns can reveal arithmetic progressions and other mathematical relationships among primes.'
      },
      {
        id: 'ulam-spiral',
        title: 'The Mysterious Ulam Spiral',
        content: 'The Ulam spiral arranges numbers in a spiral pattern. Amazingly, primes often cluster along diagonal lines.',
        action: 'Switch to "Ulam Spiral" and observe how primes form unexpected line patterns.',
        tip: 'Mathematician Stanisław Ulam discovered this pattern by doodling during a boring meeting in 1963!'
      },
      {
        id: 'sieve-process',
        title: 'Sieve of Eratosthenes',
        content: 'This ancient algorithm finds primes by eliminating multiples. Watch the step-by-step elimination process.',
        action: 'Select "Sieve Process" to see how the algorithm systematically eliminates composite numbers.',
        tip: 'This 2000-year-old algorithm is still one of the most efficient ways to find all primes up to a given limit.'
      },
      {
        id: 'number-properties',
        title: 'Individual Number Analysis',
        content: 'Click any number to see detailed information: prime factorization, divisors, and special properties.',
        action: 'Click on different numbers to explore their mathematical properties.',
        tip: 'Understanding individual number properties helps build intuition about prime distribution patterns.'
      },
      {
        id: 'statistics-panel',
        title: 'Prime Statistics and Density',
        content: 'The statistics panel shows prime count, density, and the largest prime in your range.',
        action: 'Increase the number range and watch how prime density decreases.',
        tip: 'The Prime Number Theorem predicts that about 1/ln(n) of numbers near n are prime.'
      },
      {
        id: 'applications',
        title: 'Modern Applications',
        content: 'Prime numbers aren\'t just mathematical curiosities - they\'re essential for internet security and cryptography.',
        tip: 'Your secure web browsing depends on the difficulty of factoring large numbers into their prime components.'
      }
    ]
  },

  'math-puzzle': {
    id: 'math-puzzle',
    title: 'Math Puzzle Generator Tutorial',
    description: 'Challenge yourself with procedurally generated math problems',
    difficulty: 'Intermediate',
    timeNeeded: 14,
    steps: [
      {
        id: 'intro',
        title: 'Procedural Math Challenges',
        content: 'This puzzle generator creates endless math problems across different topics and difficulty levels. Each puzzle is unique and educational.',
        tip: 'Procedural generation ensures you never run out of practice problems, each tailored to your chosen difficulty.'
      },
      {
        id: 'puzzle-types',
        title: 'Choosing Puzzle Categories',
        content: 'Select from arithmetic, algebra, logic problems, and sequences. Each category develops different mathematical skills.',
        action: 'Try switching between different puzzle types to see the variety of problems available.',
        tip: 'Different puzzle types exercise different parts of mathematical thinking - variety builds comprehensive skills.'
      },
      {
        id: 'difficulty-levels',
        title: 'Adjusting Difficulty',
        content: 'Choose from easy, medium, or hard difficulty levels. The generator adjusts number ranges and complexity accordingly.',
        action: 'Start with easy problems and work your way up to build confidence.',
        tip: 'Optimal learning happens just outside your comfort zone - challenge yourself but don\'t get overwhelmed.'
      },
      {
        id: 'solving-process',
        title: 'Working Through Problems',
        content: 'Read each problem carefully, work through the solution, and enter your answer. The system provides immediate feedback.',
        action: 'Take your time on the first few problems to understand the expected answer format.',
        tip: 'Show your work on paper even though you only enter the final answer - the process is as important as the result.'
      },
      {
        id: 'hint-system',
        title: 'Using Hints Strategically',
        content: 'When stuck, use hints to get back on track. Hints reduce your score but help you learn the correct approach.',
        action: 'Use a hint on a challenging problem and see how it guides your thinking.',
        tip: 'Hints are teaching tools - try to understand the reasoning, not just get the answer.'
      },
      {
        id: 'scoring-feedback',
        title: 'Understanding Your Performance',
        content: 'The scoring system tracks your progress: correct answers, streak, and overall performance across sessions.',
        action: 'Complete several problems and observe how your score and streak develop.',
        tip: 'Consistent daily practice is more effective than occasional long sessions for building mathematical skills.'
      },
      {
        id: 'learning-strategy',
        title: 'Effective Practice Strategies',
        content: 'Focus on understanding why answers are correct. Review explanations for wrong answers to learn from mistakes.',
        tip: 'Mistakes are valuable learning opportunities - analyze wrong answers to understand conceptual gaps.'
      }
    ]
  },

  'inequality-grapher': {
    id: 'inequality-grapher',
    title: 'Dynamic Inequality Grapher Tutorial',
    description: 'Visualize systems of inequalities with shaded regions',
    difficulty: 'Intermediate',
    timeNeeded: 17,
    steps: [
      {
        id: 'intro',
        title: 'Visualizing Inequality Systems',
        content: 'Inequalities define regions rather than lines. This tool shows feasible regions where all inequalities are satisfied simultaneously.',
        tip: 'Inequality systems are crucial in optimization, economics, and engineering for defining constraints and feasible solutions.'
      },
      {
        id: 'adding-inequalities',
        title: 'Creating Your First Inequality',
        content: 'Enter inequalities in the form "y > expression" or "y < expression". The tool graphs the boundary and shades the feasible region.',
        action: 'Try adding "y > x" to see a basic linear inequality with shaded region.',
        tip: 'Remember that > and < create open boundaries (dashed lines), while ≥ and ≤ create closed boundaries (solid lines).'
      },
      {
        id: 'inequality-operators',
        title: 'Understanding Inequality Types',
        content: 'Choose from >, <, ≥, ≤ operators. Each creates different boundary conditions and shading patterns.',
        action: 'Change your inequality from > to ≥ and observe how the boundary line becomes solid.',
        tip: 'Strict inequalities (< or >) exclude the boundary line, while non-strict (≤ or ≥) include it.'
      },
      {
        id: 'multiple-constraints',
        title: 'Building Systems of Inequalities',
        content: 'Add multiple inequalities to create complex feasible regions. The intersection shows where all constraints are satisfied.',
        action: 'Add a second inequality like "y < -x + 5" and observe the intersection region.',
        tip: 'Real-world optimization problems often have many constraints - the feasible region is where all are satisfied.'
      },
      {
        id: 'feasible-regions',
        title: 'Interpreting Feasible Regions',
        content: 'Shaded areas show feasible regions. Darker shading indicates intersection of multiple inequalities.',
        action: 'Add a third inequality and observe how the feasible region becomes more constrained.',
        tip: 'Empty feasible regions indicate inconsistent constraints - no solution exists that satisfies all inequalities.'
      },
      {
        id: 'boundary-lines',
        title: 'Boundary Line Significance',
        content: 'Boundary lines show where inequalities become equalities. These are often important in optimization problems.',
        action: 'Observe how boundary lines form the edges of your feasible regions.',
        tip: 'In linear programming, optimal solutions often occur at vertices where boundary lines intersect.'
      },
      {
        id: 'quick-examples',
        title: 'Using Quick Expression Templates',
        content: 'Use the quick-add buttons for common expressions to speed up inequality creation.',
        action: 'Try the quick-add buttons to create polynomials, linear functions, and other common inequality types.',
        tip: 'Starting with templates helps you focus on the mathematical concepts rather than syntax.'
      },
      {
        id: 'real-applications',
        title: 'Practical Applications',
        content: 'Inequality systems model resource constraints, budget limitations, and optimization problems in business and engineering.',
        tip: 'Linear programming uses inequality systems to optimize objectives subject to constraints - fundamental in operations research.'
      }
    ]
  },

  'math-notebook': {
    id: 'math-notebook',
    title: 'Live Coding Math Notebook Tutorial',
    description: 'Create interactive mathematical documents with live evaluation',
    difficulty: 'Advanced',
    timeNeeded: 25,
    steps: [
      {
        id: 'intro',
        title: 'Interactive Mathematical Notebooks',
        content: 'This notebook combines text, mathematics, and computation in a single document. Perfect for mathematical exploration and documentation.',
        tip: 'Mathematical notebooks are used in research, education, and industry for reproducible computational mathematics.'
      },
      {
        id: 'cell-types',
        title: 'Understanding Cell Types',
        content: 'Three cell types serve different purposes: Text cells for documentation, Math cells for LaTeX formulas, and Code cells for computation.',
        action: 'Click on different cells to see how each type behaves when selected.',
        tip: 'Mixing cell types creates rich mathematical documents that combine explanation, formulas, and computation.'
      },
      {
        id: 'text-cells',
        title: 'Working with Text Cells',
        content: 'Text cells support markdown formatting for headers, bold, italic, and structured documentation.',
        action: 'Click on a text cell to edit it, try adding **bold** and *italic* formatting.',
        tip: 'Good documentation makes mathematical work accessible to others and your future self.'
      },
      {
        id: 'math-cells',
        title: 'LaTeX Mathematical Notation',
        content: 'Math cells render LaTeX notation for beautiful mathematical formulas. Use standard LaTeX syntax.',
        action: 'Edit a math cell and try entering "\\frac{1}{2}" to create a fraction.',
        tip: 'LaTeX is the standard for mathematical typesetting - learning it pays dividends in academic and professional work.'
      },
      {
        id: 'code-execution',
        title: 'Live Code Execution',
        content: 'Code cells contain JavaScript with built-in mathematical functions. Click the play button to execute code.',
        action: 'Try editing a code cell and click the play button to see the result.',
        tip: 'Live execution lets you explore mathematical concepts interactively and verify theoretical results.'
      },
      {
        id: 'adding-cells',
        title: 'Creating New Cells',
        content: 'Use the toolbar buttons to add new cells of any type. Build your notebook by combining different cell types.',
        action: 'Add a new code cell and try computing something like "Math.sqrt(16)".',
        tip: 'Plan your notebook structure: start with explanatory text, follow with formulas, then demonstrate with code.'
      },
      {
        id: 'sample-code',
        title: 'Using Sample Code Templates',
        content: 'Sample code templates provide starting points for common mathematical computations.',
        action: 'Try adding one of the sample code snippets to see how complex computations work.',
        tip: 'Templates save time and demonstrate best practices for mathematical programming.'
      },
      {
        id: 'running-all',
        title: 'Executing Complete Notebooks',
        content: 'Use "Run All" to execute all code cells in sequence. This ensures reproducible results.',
        action: 'Click "Run All" to execute the entire notebook and see all results update.',
        tip: 'Reproducibility is crucial in computational mathematics - others should be able to run your notebook and get the same results.'
      },
      {
        id: 'export-share',
        title: 'Saving and Sharing Work',
        content: 'Export notebooks as JSON files to save your work and share with others.',
        action: 'Try the export function to save your notebook for future use.',
        tip: 'Exported notebooks can be imported later or shared with colleagues for collaboration.'
      }
    ]
  }
};

export const getTutorial = (appId: string): Tutorial | null => {
  return appTutorials[appId] || null;
};