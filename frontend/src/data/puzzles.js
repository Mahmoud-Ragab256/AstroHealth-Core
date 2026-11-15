export const puzzles = [
  // 1. LOGIC PUZZLES
  {
    id: 'logic',
    icon: '💡',
    title: 'Logic Puzzles',
    description: 'Deduce the correct conclusion.',
    questions: [
      {
        question: 'If Module A has higher pressure than Module B, and Module C has lower pressure than Module B, which module has the lowest pressure?',
        options: ['Module A', 'Module B', 'Module C'],
        answer: 'Module C',
      },
      {
        question: 'Three astronauts are standing in a line. Ali is before Sara, and Sara is before Omar. Who is standing last?',
        options: ['Ali', 'Sara', 'Omar'],
        answer: 'Omar',
      },
      {
        question: 'All oxygen tanks are equipment. Some equipment is damaged. Can we conclude that all oxygen tanks are damaged?',
        options: ['Yes', 'No', 'Not enough information'],
        answer: 'No',
      },
      {
        question: 'A spaceship has 4 engines. Two engines stop working. How many engines are still working?',
        options: ['1', '2', '3'],
        answer: '2',
      },
      {
        question: 'Every red warning light indicates danger. The warning light is red. What does it indicate?',
        options: ['Safety', 'Danger', 'Normal operation'],
        answer: 'Danger',
      },
    ],
  },

  // 2. MEMORY GAMES
  {
    id: 'memory',
    icon: '🧠',
    title: 'Memory Games',
    description: 'Remember details and sequences.',
    questions: [
      {
        question: 'Telemetry sequence: O2 — 98 — kPa — 101. What was the 3rd item in the sequence?',
        options: ['98', 'kPa', '101'],
        answer: 'kPa',
      },
      {
        question: 'Remember this sequence: 12 — 25 — 38 — 44. What was the 2nd number?',
        options: ['12', '25', '38'],
        answer: '25',
      },
      {
        question: 'A crew checklist contains: Helmet — Oxygen — Gloves — Radio. What was the last item?',
        options: ['Helmet', 'Gloves', 'Radio'],
        answer: 'Radio',
      },
      {
        question: 'Remember these numbers: 7 — 14 — 21 — 28 — 35. What was the 4th number?',
        options: ['21', '28', '35'],
        answer: '28',
      },
      {
        question: 'The mission colors are Blue — Red — Green — Yellow. What was the first color?',
        options: ['Red', 'Blue', 'Yellow'],
        answer: 'Blue',
      },
    ],
  },

  // 3. PATTERN RECOGNITION
  {
    id: 'pattern',
    icon: '🔢',
    title: 'Pattern Recognition',
    description: 'Find the next number.',
    questions: [
      {
        question: 'Find the next number in the orbital pulse sequence: 2, 6, 12, 20, 30, ?',
        options: ['38', '40', '42'],
        answer: '42',
      },
      {
        question: 'Complete the sequence: 3, 6, 9, 12, ?',
        options: ['14', '15', '18'],
        answer: '15',
      },
      {
        question: 'Find the missing number: 1, 4, 9, 16, 25, ?',
        options: ['30', '35', '36'],
        answer: '36',
      },
      {
        question: 'Complete the sequence: 100, 90, 80, 70, ?',
        options: ['50', '60', '65'],
        answer: '60',
      },
      {
        question: 'Find the next number: 2, 4, 8, 16, 32, ?',
        options: ['48', '64', '72'],
        answer: '64',
      },
    ],
  },

  // 4. MATHEMATICAL CHALLENGES
  {
    id: 'math',
    icon: '➗',
    title: 'Mathematical Challenges',
    description: 'Solve quick mental calculations.',
    questions: [
      {
        question: 'Cabin oxygen reserve is 480 L. If crew consumption is 35 L/hour, how much remains after 6 hours?',
        options: ['270 L', '290 L', '310 L'],
        answer: '270 L',
      },
      {
        question: 'A spaceship travels 120 km in 2 hours. What is its average speed?',
        options: ['40 km/h', '60 km/h', '80 km/h'],
        answer: '60 km/h',
      },
      {
        question: 'An astronaut has 200 food units. The crew consumes 25 units per day. How many days will the food last?',
        options: ['6 days', '8 days', '10 days'],
        answer: '8 days',
      },
      {
        question: 'A spacecraft has 5 batteries, each producing 12 volts. What is their total voltage if connected in series?',
        options: ['50 volts', '60 volts', '70 volts'],
        answer: '60 volts',
      },
      {
        question: 'A mission starts at 08:00 and lasts 7 hours and 30 minutes. At what time does it end?',
        options: ['14:30', '15:00', '15:30'],
        answer: '15:30',
      },
    ],
  },

  // 5. WORD PUZZLES - TEXT INPUT ONLY
  {
    id: 'word',
    icon: '🔤',
    title: 'Word Puzzles',
    description: 'Unscramble the mission word.',
    questions: [
      {
        question: 'Unscramble the space telemetry term: T R O I B',
        answers: ['orbit'],
        answerDisplay: 'ORBIT',
      },
      {
        question: 'Unscramble the space object: T A N E P L',
        answers: ['planet'],
        answerDisplay: 'PLANET',
      },
      {
        question: 'Unscramble the space vehicle: T E K O R C',
        answers: ['rocket'],
        answerDisplay: 'ROCKET',
      },
      {
        question: 'Unscramble the word related to astronauts: C A P S E',
        answers: ['space'],
        answerDisplay: 'SPACE',
      },
      {
        question: 'Unscramble the word describing a journey: N O I S S M I',
        answers: ['mission'],
        answerDisplay: 'MISSION',
      },
    ],
  },

  // 6. SPATIAL REASONING
  {
    id: 'spatial',
    icon: '🧊',
    title: 'Spatial Reasoning',
    description: 'Visualize directions and rotations.',
    questions: [
      {
        question: 'Docking port hatch faces North (+Y). After a 90° clockwise yaw rotation, which direction does it face?',
        options: ['West (-X)', 'East (+X)', 'South (-Y)'],
        answer: 'East (+X)',
      },
      {
        question: 'An astronaut faces East. They turn 180 degrees. Which direction are they facing now?',
        options: ['North', 'West', 'South'],
        answer: 'West',
      },
      {
        question: 'A spacecraft is facing North. It turns 90 degrees counterclockwise. Which direction does it face?',
        options: ['East', 'West', 'South'],
        answer: 'West',
      },
      {
        question: 'An astronaut moves 3 steps North and then 3 steps South. Where are they relative to their starting point?',
        options: ['North of starting point', 'South of starting point', 'At the starting point'],
        answer: 'At the starting point',
      },
      {
        question: 'A robot faces South. It makes a 90-degree clockwise turn. Which direction does it face?',
        options: ['East', 'West', 'North'],
        answer: 'West',
      },
    ],
  },
];
