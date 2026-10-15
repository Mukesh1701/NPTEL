export interface Option {
  id: string;
  text: string;
}

export type QuestionType = 'single_choice' | 'multiple_choice';

export interface Question {
  id: string;
  week: number;
  type: QuestionType;
  topic?: string;
  question: string;
  options: Option[];
  correctAnswers: string[];
  explanation?: string;
  marks: number;
}

export interface CourseConfig {
  id: string;
  name: string;
  subtitle: string;
  instructor: string;
  institution: string;
  totalWeeks: number;
  description: string;
}

export const COURSE_CONFIG: CourseConfig = {
  id: 'soft-skills',
  name: 'Soft Skills',
  subtitle: 'NPTEL Online Certification',
  instructor: 'NPTEL Faculty',
  institution: 'IIT / NPTEL',
  totalWeeks: 12,
  description: 'Master interpersonal communication, personality dynamics, active listening, and behavioral soft skills.',
};

export const QUESTION_BANK: Question[] = [
  // WEEK 1 - Soft Skills
  {
    id: 'week1-q1',
    week: 1,
    type: 'single_choice',
    topic: 'Hearing and Listening',
    question: 'Hearing is a physiological activity, whereas listening is a ______ one.',
    options: [
      { id: 'A', text: 'Mental' },
      { id: 'B', text: 'Physical' },
      { id: 'C', text: 'Social' },
      { id: 'D', text: 'Psychological' },
    ],
    correctAnswers: ['A'],
    explanation: 'Hearing is a passive physical/physiological process, while listening requires active mental processing, interpretation, and understanding.',
    marks: 1,
  },
  {
    id: 'week1-q2',
    week: 1,
    type: 'single_choice',
    topic: "Freud's Theory of Personality",
    question: 'The system of personality that operates on the pleasure principle and represents the true psychic reality is the ______.',
    options: [
      { id: 'A', text: 'Ego' },
      { id: 'B', text: 'Superego' },
      { id: 'C', text: 'Id' },
      { id: 'D', text: 'Creative self' },
    ],
    correctAnswers: ['C'],
    explanation: 'According to Freud, the Id is the primitive, instinctual part of the psyche that operates strictly on the pleasure principle seeking immediate gratification.',
    marks: 1,
  },
  {
    id: 'week1-q3',
    week: 1,
    type: 'single_choice',
    topic: 'Six Thinking Hats',
    question: 'In the Six Thinking Hats technique, the hat associated with generating ideas is the ______.',
    options: [
      { id: 'A', text: 'Yellow hat' },
      { id: 'B', text: 'Green hat' },
      { id: 'C', text: 'Blue hat' },
      { id: 'D', text: 'White hat' },
    ],
    correctAnswers: ['B'],
    explanation: 'In Edward de Bono\'s Six Thinking Hats, the Green Hat represents creativity, possibilities, alternatives, and generating new ideas.',
    marks: 1,
  },
  {
    id: 'week1-q4',
    week: 1,
    type: 'single_choice',
    topic: 'Origin of the Word Personality',
    question: 'The word "personality" is derived from the Latin word persona, meaning ______.',
    options: [
      { id: 'A', text: 'Mind' },
      { id: 'B', text: 'Mask' },
      { id: 'C', text: 'Mimesis' },
      { id: 'D', text: 'Personal' },
    ],
    correctAnswers: ['B'],
    explanation: '"Personality" originates from the Latin word "persona", which originally referred to theatrical masks worn by Greek and Roman actors to represent different roles.',
    marks: 1,
  },
  {
    id: 'week1-q5',
    week: 1,
    type: 'single_choice',
    topic: 'Communication',
    question: 'The shared background of experience between a sender and a receiver, essential for successful communication, is called the:',
    options: [
      { id: 'A', text: 'Common frame of reference' },
      { id: 'B', text: 'Feedback loop' },
      { id: 'C', text: 'Communication channel' },
      { id: 'D', text: 'Grapevine' },
    ],
    correctAnswers: ['A'],
    explanation: 'A common frame of reference encompasses overlapping experiences, language, values, and knowledge shared by sender and receiver that make mutual comprehension possible.',
    marks: 1,
  },
  {
    id: 'week1-q6',
    week: 1,
    type: 'single_choice',
    topic: 'Recruitment',
    question: 'A recruiter would rather hire a candidate with a pleasant smile and good communication skills than one who has:',
    options: [
      { id: 'A', text: 'A foreign degree' },
      { id: 'B', text: 'A very good CGPA but is doing nothing' },
      { id: 'C', text: 'Several years of work experience' },
      { id: 'D', text: 'Strong technical certifications' },
    ],
    correctAnswers: ['B'],
    explanation: 'Recruiters prioritize interpersonal skills and proactive positive attitude over a passive candidate who possesses high marks/CGPA without initiative or practical engagement.',
    marks: 1,
  },
  {
    id: 'week1-q7',
    week: 1,
    type: 'single_choice',
    topic: 'Meaning of Communication',
    question: 'The word "communication" derives from the Latin word communicare, which means:',
    options: [
      { id: 'A', text: 'To speak' },
      { id: 'B', text: 'To share' },
      { id: 'C', text: 'To inform' },
      { id: 'D', text: 'To persuade' },
    ],
    correctAnswers: ['B'],
    explanation: 'The Latin term "communicare" literally means "to share" or "to make common".',
    marks: 1,
  },
  {
    id: 'week1-q8',
    week: 1,
    type: 'single_choice',
    topic: 'Grapevine Communication',
    question: '"Grapevine" in organisational communication refers to:',
    options: [
      { id: 'A', text: 'A formal upward channel of communication' },
      { id: 'B', text: 'An informal channel that may be rumour-based and not always authentic' },
      { id: 'C', text: 'External communication with government agencies' },
      { id: 'D', text: 'Communication through company websites and pamphlets' },
    ],
    correctAnswers: ['B'],
    explanation: 'Grapevine communication is the informal, unofficial interpersonal network in an organization that spreads information quickly through word of mouth, often containing rumors.',
    marks: 1,
  },
  {
    id: 'week1-q9',
    week: 1,
    type: 'single_choice',
    topic: 'Time Spent Listening',
    question: "Approximately what percentage of one's time (in any job) is spent listening?",
    options: [
      { id: 'A', text: '30–40 percent' },
      { id: 'B', text: '40–50 percent' },
      { id: 'C', text: '60–75 percent' },
      { id: 'D', text: '80–90 percent' },
    ],
    correctAnswers: ['C'],
    explanation: 'Studies on workplace communication reveal that professionals spend approximately 60% to 75% of their communication time listening.',
    marks: 1,
  },
  {
    id: 'week1-q10',
    week: 1,
    type: 'single_choice',
    topic: 'Communication Process',
    question: "Extracting meaning from a received message (receiver's task) is:",
    options: [
      { id: 'A', text: 'Code' },
      { id: 'B', text: 'Interpreting' },
      { id: 'C', text: 'Encode' },
      { id: 'D', text: 'Decode' },
    ],
    correctAnswers: ['D'],
    explanation: 'Decoding is the process where the receiver converts incoming symbols/messages back into meaningful thoughts and interpretations.',
    marks: 1,
  },
  {
    id: 'week1-q11',
    week: 1,
    type: 'multiple_choice',
    topic: 'Behavioural Soft Skills',
    question: 'Which of the following are behavioural soft skills? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Self-awareness' },
      { id: 'B', text: 'Technical competence' },
      { id: 'C', text: 'Persistence' },
      { id: 'D', text: 'Knowledge' },
    ],
    correctAnswers: ['A', 'C'],
    explanation: 'Self-awareness and persistence are behavioral soft skills related to emotional intelligence and resilience, whereas technical competence and knowledge are hard/cognitive skills.',
    marks: 1,
  },
  {
    id: 'week1-q12',
    week: 1,
    type: 'multiple_choice',
    topic: 'Seven Cs of Effective Communication',
    question: 'Which of the following are part of the Seven Cs of effective communication? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Crispness' },
      { id: 'B', text: 'Conciseness' },
      { id: 'C', text: 'Creativity' },
      { id: 'D', text: 'Courtesy' },
    ],
    correctAnswers: ['B', 'D'],
    explanation: 'The 7 Cs of effective communication are: Completeness, Conciseness, Consideration, Concreteness, Clarity, Courtesy, and Correctness.',
    marks: 1,
  },
  {
    id: 'week1-q13',
    week: 1,
    type: 'multiple_choice',
    topic: 'De Bono’s Six Thinking Hats',
    question: "According to De Bono's Six Thinking Hats technique, which of the following hat-function pairings are correct? (Select all that apply.)",
    options: [
      { id: 'A', text: 'White hat – Seeing things objectively' },
      { id: 'B', text: 'Red hat – Generating ideas' },
      { id: 'C', text: 'Yellow hat – Fighting against and preventing mistakes' },
      { id: 'D', text: 'Blue hat – Organising and controlling the thought process' },
    ],
    correctAnswers: ['A', 'D'],
    explanation: 'White hat is for neutral facts and objective data; Blue hat manages and controls the thinking process. Red hat is for emotions/feelings, and Black hat is for caution/preventing mistakes.',
    marks: 1,
  },
  {
    id: 'week1-q14',
    week: 1,
    type: 'multiple_choice',
    topic: "Freud’s Theory of Personality",
    question: "Which of the following statements about Freud's theory of personality are correct? (Select all that apply.)",
    options: [
      { id: 'A', text: 'The Id operates through the Reality Principle.' },
      { id: 'B', text: 'The Ego is the executive of the personality and the organised portion of the Id.' },
      { id: 'C', text: 'The Superego strives for perfection rather than pleasure.' },
      { id: 'D', text: 'The Superego opposes only the Id, but supports the Ego.' },
    ],
    correctAnswers: ['B', 'C'],
    explanation: 'The Ego serves as the executive mediator based on reality, and the Superego embodies moral standards striving for perfection rather than mere pleasure.',
    marks: 1,
  },
  {
    id: 'week1-q15',
    week: 1,
    type: 'single_choice',
    topic: 'Match the Concept with Thinker',
    question: `Match the concepts in Column A with the correct thinkers in Column B:

Column A:
P. "Truth springs from argument amongst friends"
Q. "Arise, awake, and stop not till the goal is reached"
R. Fictional Finalism and Striving for Superiority
S. Id, Ego and Superego

Column B:
1. Swami Vivekananda
2. Alfred Adler
3. David Hume
4. Sigmund Freud`,
    options: [
      { id: 'A', text: 'P-3, Q-1, R-2, S-4' },
      { id: 'B', text: 'P-1, Q-3, R-4, S-2' },
      { id: 'C', text: 'P-3, Q-1, R-4, S-2' },
      { id: 'D', text: 'P-2, Q-1, R-3, S-4' },
    ],
    correctAnswers: ['A'],
    explanation: 'David Hume: "Truth springs from argument amongst friends" (P-3); Swami Vivekananda: "Arise, awake, and stop not..." (Q-1); Alfred Adler: Fictional Finalism & Striving for Superiority (R-2); Sigmund Freud: Id, Ego, Superego (S-4). Correct combination is A.',
    marks: 1,
  },
];

export function getQuestionsByWeek(week: number): Question[] {
  return QUESTION_BANK.filter((q) => q.week === week);
}

export function getAllQuestions(): Question[] {
  return [...QUESTION_BANK];
}

export function getWeekNumbers(): number[] {
  return Array.from({ length: 12 }, (_, i) => i + 1);
}
