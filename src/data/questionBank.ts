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
  description: 'Master interpersonal communication, personality dynamics, active listening, negotiation strategies, and behavioral soft skills.',
};

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // WEEK 1 - Soft Skills (15 Questions)
  // ==========================================
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
    explanation: "In Edward de Bono's Six Thinking Hats, the Green Hat represents creativity, possibilities, alternatives, and generating new ideas.",
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

  // ==========================================
  // WEEK 2 - Positivity, Voice & Phone Skills (15 Questions)
  // ==========================================
  {
    id: 'week2-q1',
    week: 2,
    type: 'single_choice',
    topic: 'Glass of Water Example',
    question: 'In the glass-of-water example, a person who says the glass is "half empty" is described as:',
    options: [
      { id: 'A', text: 'An optimist' },
      { id: 'B', text: 'A pessimist' },
      { id: 'C', text: 'An introvert' },
      { id: 'D', text: 'An extrovert' },
    ],
    correctAnswers: ['B'],
    explanation: 'Viewing a glass as half empty reflects a pessimistic mindset that focuses on what is missing rather than what is present.',
    marks: 1,
  },
  {
    id: 'week2-q2',
    week: 2,
    type: 'single_choice',
    topic: "Eric Berne's Theory",
    question: 'According to Dr. Eric Berne, the attitude "I\'m okay, you are okay" represents a person who is:',
    options: [
      { id: 'A', text: 'Imposing' },
      { id: 'B', text: 'Negative' },
      { id: 'C', text: 'Positive and cooperative' },
      { id: 'D', text: 'Introverted' },
    ],
    correctAnswers: ['C'],
    explanation: '"I\'m OK, You\'re OK" is the healthy, assertive life position in Transactional Analysis that fosters mutual respect, cooperation, and positive engagement.',
    marks: 1,
  },
  {
    id: 'week2-q3',
    week: 2,
    type: 'single_choice',
    topic: "Mehrabian's Communication Theory",
    question: 'According to Mehrabian, the percentage of communication that is verbal is:',
    options: [
      { id: 'A', text: '7%' },
      { id: 'B', text: '35%' },
      { id: 'C', text: '38%' },
      { id: 'D', text: '55%' },
    ],
    correctAnswers: ['A'],
    explanation: "Albert Mehrabian's 7-38-55 rule posits that 7% of emotional meaning is communicated through spoken words (verbal), 38% through vocal tone, and 55% through body language.",
    marks: 1,
  },
  {
    id: 'week2-q4',
    week: 2,
    type: 'single_choice',
    topic: 'Voice Faults',
    question: 'Which voice fault results from inflammation of the larynx and usually needs a speech therapist?',
    options: [
      { id: 'A', text: 'Throatiness' },
      { id: 'B', text: 'Breathiness' },
      { id: 'C', text: 'Nasalization' },
      { id: 'D', text: 'Hoarseness' },
    ],
    correctAnswers: ['D'],
    explanation: 'Hoarseness is typically caused by swelling or inflammation of the vocal cords (laryngitis) and often warrants clinical examination and speech therapy.',
    marks: 1,
  },
  {
    id: 'week2-q5',
    week: 2,
    type: 'single_choice',
    topic: 'Johari Window',
    question: 'In the Johari Window, the region representing information that is unknown to the person but known by others is the:',
    options: [
      { id: 'A', text: 'Open area' },
      { id: 'B', text: 'Blind area' },
      { id: 'C', text: 'Hidden area' },
      { id: 'D', text: 'Unknown area' },
    ],
    correctAnswers: ['B'],
    explanation: 'The Blind area (or Blind Spot) contains qualities, habits, or aspects known to others about you, but of which you remain unaware.',
    marks: 1,
  },
  {
    id: 'week2-q6',
    week: 2,
    type: 'single_choice',
    topic: 'Telephonic Communication',
    question: 'Which of the following is not listed as a feature of telephonic communication?',
    options: [
      { id: 'A', text: 'Clarity' },
      { id: 'B', text: 'Courtesy' },
      { id: 'C', text: 'Brevity' },
      { id: 'D', text: 'Confrontation' },
    ],
    correctAnswers: ['D'],
    explanation: 'Professional telephonic communication relies on clarity, courtesy, and brevity; confrontation is counterproductive and not an intended feature.',
    marks: 1,
  },
  {
    id: 'week2-q7',
    week: 2,
    type: 'single_choice',
    topic: 'Teleconferencing',
    question: 'Teleconferencing is generally considered ineffective for which of the following purposes?',
    options: [
      { id: 'A', text: 'Connecting geographically dispersed people' },
      { id: 'B', text: 'Negotiations' },
      { id: 'C', text: 'Arranging meetings at short notice' },
      { id: 'D', text: 'Saving travel costs' },
    ],
    correctAnswers: ['B'],
    explanation: 'High-stakes negotiations often depend on nuanced body language, subtle interpersonal chemistry, and direct face-to-face interaction, making audio teleconferencing less effective.',
    marks: 1,
  },
  {
    id: 'week2-q8',
    week: 2,
    type: 'single_choice',
    topic: 'Voice and Pitch',
    question: 'The change in pitch produced by the vibration of the vocal cords is called ______.',
    options: [
      { id: 'A', text: 'Intonation' },
      { id: 'B', text: 'Articulation' },
      { id: 'C', text: 'Inflection' },
      { id: 'D', text: 'Modulation' },
    ],
    correctAnswers: ['C'],
    explanation: 'Inflection refers to the change or modulation in pitch within words or syllables caused by vocal cord adjustments.',
    marks: 1,
  },
  {
    id: 'week2-q9',
    week: 2,
    type: 'single_choice',
    topic: 'Voice Mail',
    question: 'Voice mail acts as a substitute for short memos and phone calls and helps solve ______ difficulties.',
    options: [
      { id: 'A', text: 'Special zone' },
      { id: 'B', text: 'Time zone' },
      { id: 'C', text: 'Communication zone' },
      { id: 'D', text: 'Talk zone' },
    ],
    correctAnswers: ['B'],
    explanation: 'Voice mail enables asynchronous communication across different geographic time zones without requiring both parties to be on the phone simultaneously.',
    marks: 1,
  },
  {
    id: 'week2-q10',
    week: 2,
    type: 'multiple_choice',
    topic: 'Developing Positivity',
    question: 'Which two of the following are listed as ways to develop positivism? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Believe in your abilities' },
      { id: 'B', text: 'Imitate others completely' },
      { id: 'C', text: 'Concentrate on your goals' },
      { id: 'D', text: 'Hide your weaknesses permanently' },
    ],
    correctAnswers: ['A', 'C'],
    explanation: 'Believing in self-efficacy and maintaining clear focus on meaningful goals cultivate positive attitude and resilience.',
    marks: 1,
  },
  {
    id: 'week2-q11',
    week: 2,
    type: 'multiple_choice',
    topic: 'Guidelines for Making a Call',
    question: 'While sending a call, which of the following guidelines should be followed? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Recline in your chair' },
      { id: 'B', text: 'Place your own call' },
      { id: 'C', text: 'Plan an agenda' },
      { id: 'D', text: 'Avoid identifying yourself' },
    ],
    correctAnswers: ['B', 'C'],
    explanation: 'Professional telephonic etiquette requires placing your own call directly and planning an agenda with concise points before dialing.',
    marks: 1,
  },
  {
    id: 'week2-q12',
    week: 2,
    type: 'multiple_choice',
    topic: 'Voice Mail',
    question: 'Which two statements about voice mail are correct? (Select all that apply.)',
    options: [
      { id: 'A', text: 'It provides immediate, specific feedback.' },
      { id: 'B', text: 'It acts as a substitute for short memos and phone calls.' },
      { id: 'C', text: 'It solves time-zone difficulties.' },
      { id: 'D', text: 'It increases interoffice paperwork.' },
    ],
    correctAnswers: ['B', 'C'],
    explanation: 'Voice mail substitutes for brief memos/calls and overcomes time-zone differences in global or cross-regional business.',
    marks: 1,
  },
  {
    id: 'week2-q13',
    week: 2,
    type: 'multiple_choice',
    topic: 'Importance of Telephonic Communication',
    question: 'Which of the following points highlight the importance of telephonic communication? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Provides immediate face-to-face feedback' },
      { id: 'B', text: 'Allows reading of facial expressions' },
      { id: 'C', text: 'Bridges time and distance gaps' },
      { id: 'D', text: 'Entails low cost' },
    ],
    correctAnswers: ['C', 'D'],
    explanation: 'Telephonic communication bridges geographical separation quickly and cost-effectively without travel expenses.',
    marks: 1,
  },
  {
    id: 'week2-q14',
    week: 2,
    type: 'multiple_choice',
    topic: 'Characteristics of Voice',
    question: 'Which two of the following are described as characteristics of voice? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Volume' },
      { id: 'B', text: 'Grammar' },
      { id: 'C', text: 'Pitch' },
      { id: 'D', text: 'Vocabulary' },
    ],
    correctAnswers: ['A', 'C'],
    explanation: 'Volume (loudness) and pitch (frequency) are core acoustic/paralinguistic characteristics of voice, whereas grammar and vocabulary relate to language.',
    marks: 1,
  },
  {
    id: 'week2-q15',
    week: 2,
    type: 'single_choice',
    topic: 'Match Hand Movement / Gesture',
    question: `Match the hand movement/gesture in Column A with the emotion or meaning it symbolises in Column B:

Column A (Hand Movement):
1. Limp / hanging hands
2. Open hands
3. Clenched hands
4. Fists

Column B (Meaning):
P. Trust, interest
Q. Determination, anger
R. Boredom
S. Tension and frustration`,
    options: [
      { id: 'A', text: '1-P, 2-R, 3-S, 4-Q' },
      { id: 'B', text: '1-R, 2-P, 3-S, 4-Q' },
      { id: 'C', text: '1-R, 2-S, 3-P, 4-Q' },
      { id: 'D', text: '1-Q, 2-P, 3-R, 4-S' },
    ],
    correctAnswers: ['B'],
    explanation: '1-R (Limp/hanging hands denote boredom), 2-P (Open hands show trust and interest), 3-S (Clenched hands indicate tension/frustration), 4-Q (Fists signal determination or anger). Option B is correct.',
    marks: 1,
  },

  // ==========================================
  // WEEK 3 - Proxemics, Haptics & Listening (15 Questions)
  // ==========================================
  {
    id: 'week3-q1',
    week: 3,
    type: 'single_choice',
    topic: 'Proxemics',
    question: 'The term "proxemics" is derived from which word?',
    options: [
      { id: 'A', text: 'Property' },
      { id: 'B', text: 'Proximity' },
      { id: 'C', text: 'Procedure' },
      { id: 'D', text: 'Proportion' },
    ],
    correctAnswers: ['B'],
    explanation: 'Coined by anthropologist Edward T. Hall, "proxemics" comes from "proximity", denoting the study of space and distance in human interaction.',
    marks: 1,
  },
  {
    id: 'week3-q2',
    week: 3,
    type: 'single_choice',
    topic: 'Haptics',
    question: 'The word "haptics" is taken from a Greek word that means:',
    options: [
      { id: 'A', text: 'I see' },
      { id: 'B', text: 'I hear' },
      { id: 'C', text: 'I touch' },
      { id: 'D', text: 'I feel' },
    ],
    correctAnswers: ['C'],
    explanation: 'Haptics originates from the Greek verb "haptesthai" meaning "to touch" or "I touch".',
    marks: 1,
  },
  {
    id: 'week3-q3',
    week: 3,
    type: 'single_choice',
    topic: 'Meaning of the Prefix "Meta"',
    question: 'The prefix "meta" means:',
    options: [
      { id: 'A', text: 'Within' },
      { id: 'B', text: 'Beyond' },
      { id: 'C', text: 'Around' },
      { id: 'D', text: 'Without' },
    ],
    correctAnswers: ['B'],
    explanation: 'The Greek prefix "meta" signifies "beyond", "transcending", or "at a higher level" (as in meta-communication, which means communication about communication).',
    marks: 1,
  },
  {
    id: 'week3-q4',
    week: 3,
    type: 'single_choice',
    topic: 'Chronemics',
    question: 'The study of time in communication is called ______.',
    options: [
      { id: 'A', text: 'Communemics' },
      { id: 'B', text: 'Chronemics' },
      { id: 'C', text: 'Kinesics' },
      { id: 'D', text: 'Mimesis' },
    ],
    correctAnswers: ['B'],
    explanation: 'Chronemics is the study of how time is perceived, structured, and utilized as a communication medium across cultures.',
    marks: 1,
  },
  {
    id: 'week3-q5',
    week: 3,
    type: 'single_choice',
    topic: 'Hearing and Listening',
    question: 'Hearing is only a ______ activity, whereas listening is a mental activity that requires conscious participation.',
    options: [
      { id: 'A', text: 'Physiological' },
      { id: 'B', text: 'Psychological' },
      { id: 'C', text: 'Physical' },
      { id: 'D', text: 'Social' },
    ],
    correctAnswers: ['A'],
    explanation: 'Hearing is a biological/physiological response to sound waves, while listening demands conscious cognitive attention and processing.',
    marks: 1,
  },
  {
    id: 'week3-q6',
    week: 3,
    type: 'single_choice',
    topic: 'Space Zones in Proxemics',
    question: 'According to the Space Zone in Proxemics, the social zone corresponds to a space distance of:',
    options: [
      { id: 'A', text: 'Up to 18 inches' },
      { id: 'B', text: '18 inches to 4 feet' },
      { id: 'C', text: '4 feet to 12 feet' },
      { id: 'D', text: '12 feet to 30 feet' },
    ],
    correctAnswers: ['C'],
    explanation: "Edward T. Hall defined four distance zones: Intimate (0-18 in), Personal (1.5-4 ft), Social (4-12 ft), and Public (12+ ft).",
    marks: 1,
  },
  {
    id: 'week3-q7',
    week: 3,
    type: 'single_choice',
    topic: 'Types of Listening',
    question: 'Listening in which the listener keeps protesting mentally instead of taking in the message is called:',
    options: [
      { id: 'A', text: 'Attentive listening' },
      { id: 'B', text: 'Reflective listening' },
      { id: 'C', text: 'Combative listening' },
      { id: 'D', text: 'Appreciative listening' },
    ],
    correctAnswers: ['C'],
    explanation: 'In combative listening, the listener is preoccupied with framing rebuttals and counter-arguments instead of genuinely receiving the speaker’s message.',
    marks: 1,
  },
  {
    id: 'week3-q8',
    week: 3,
    type: 'single_choice',
    topic: 'Cultural Differences',
    question: 'In Thailand and Laos, it is considered rude for a stranger to touch a child on the head because the head is regarded as:',
    options: [
      { id: 'A', text: 'The most fragile part of the body' },
      { id: 'B', text: 'The home of the spirit or soul' },
      { id: 'C', text: 'A mark of seniority' },
      { id: 'D', text: 'Reserved only for parents' },
    ],
    correctAnswers: ['B'],
    explanation: 'In traditional Southeast Asian cultures such as Thailand and Laos, the head is sacred as the seat of the spirit/soul, so touching it is disrespectful.',
    marks: 1,
  },
  {
    id: 'week3-q9',
    week: 3,
    type: 'single_choice',
    topic: 'Silence in Communication',
    question: '"Lying is done with words and also with silence." This observation is attributed to:',
    options: [
      { id: 'A', text: 'Edward T. Hall' },
      { id: 'B', text: 'Ernest Hemingway' },
      { id: 'C', text: 'Adrienne Rich' },
      { id: 'D', text: 'Albert Mehrabian' },
    ],
    correctAnswers: ['C'],
    explanation: 'The poet and essayist Adrienne Rich wrote: "Lying is done with words, and also with silence."',
    marks: 1,
  },
  {
    id: 'week3-q10',
    week: 3,
    type: 'multiple_choice',
    topic: 'High-Context Cultures',
    question: 'Which of the following countries are classified as high-context cultures? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Germany' },
      { id: 'B', text: 'Japan' },
      { id: 'C', text: 'England' },
      { id: 'D', text: 'Arab countries' },
    ],
    correctAnswers: ['B', 'D'],
    explanation: 'Japan and Arab nations are prime examples of high-context cultures, where shared implicit understanding, history, and relationships carry profound meaning beyond explicit words.',
    marks: 1,
  },
  {
    id: 'week3-q11',
    week: 3,
    type: 'multiple_choice',
    topic: 'Internal Factors Affecting Listening',
    question: 'Which of the following are listed as internal factors that affect listening? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Noise in the room' },
      { id: 'B', text: 'State of mind' },
      { id: 'C', text: 'Ego' },
      { id: 'D', text: 'Choice of venue' },
    ],
    correctAnswers: ['B', 'C'],
    explanation: 'State of mind and ego are psychological/internal factors within the listener, whereas room noise and venue are external environmental factors.',
    marks: 1,
  },
  {
    id: 'week3-q12',
    week: 3,
    type: 'multiple_choice',
    topic: 'Barriers to Proper Listening',
    question: 'Which of the following factors block or deter proper listening? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Patience' },
      { id: 'B', text: 'Adequate hearing' },
      { id: 'C', text: 'Prejudging' },
      { id: 'D', text: 'Ambiguity' },
    ],
    correctAnswers: ['C', 'D'],
    explanation: 'Prejudging the speaker or subject and ambiguity in delivery create barriers to accurate listening.',
    marks: 1,
  },
  {
    id: 'week3-q13',
    week: 3,
    type: 'multiple_choice',
    topic: 'Advantages of Silence in a Speech',
    question: 'Which two are stated advantages of silence in a speech? (Select all that apply.)',
    options: [
      { id: 'A', text: 'It relieves the audience.' },
      { id: 'B', text: 'It increases the speaker\'s rate of delivery.' },
      { id: 'C', text: 'It provides thinking time to the speaker.' },
      { id: 'D', text: 'It removes the need for preparation.' },
    ],
    correctAnswers: ['A', 'C'],
    explanation: 'Strategic pauses afford the audience a moment to absorb ideas and provide the speaker with composed thinking time.',
    marks: 1,
  },
  {
    id: 'week3-q14',
    week: 3,
    type: 'multiple_choice',
    topic: 'Excessive Pauses in Speech',
    question: 'Excessive use of non-words and vocalized pauses by a speaker may convey: (Select all that apply.)',
    options: [
      { id: 'A', text: 'Ambiguity or doubt' },
      { id: 'B', text: 'Authority' },
      { id: 'C', text: 'Lack of preparation' },
      { id: 'D', text: 'Command over the subject' },
    ],
    correctAnswers: ['A', 'C'],
    explanation: 'Excessive filler words (um, uh, you know) telegraph hesitation, self-doubt, and inadequate preparation.',
    marks: 1,
  },
  {
    id: 'week3-q15',
    week: 3,
    type: 'single_choice',
    topic: 'Types of Listening Situations',
    question: `Match the type of listening in Column A with its situation in Column B, then choose the correct option:

Column A:
1. Content listening
2. Empathetic listening
3. Appreciative listening
4. Analytical listening

Column B:
P. A manager hears out a colleague who is distressed
Q. A senior notes down the instructions given by the chairperson
R. A team responds warmly to a junior's new idea
S. A leader hears both sides of a dispute before deciding`,
    options: [
      { id: 'A', text: '1-P, 2-Q, 3-R, 4-S' },
      { id: 'B', text: '1-Q, 2-P, 3-R, 4-S' },
      { id: 'C', text: '1-Q, 2-P, 3-S, 4-R' },
      { id: 'D', text: '1-R, 2-S, 3-Q, 4-P' },
    ],
    correctAnswers: ['B'],
    explanation: '1-Q (Content: noting official instructions), 2-P (Empathetic: hearing distressed colleague), 3-R (Appreciative: responding warmly to creative idea), 4-S (Analytical: weighing both sides of dispute). Option B is correct.',
    marks: 1,
  },

  // ==========================================
  // WEEK 4 - Negotiation & Cross-Cultural Skills (15 Questions)
  // ==========================================
  {
    id: 'week4-q1',
    week: 4,
    type: 'single_choice',
    topic: 'BATNA / WATNA',
    question: 'What does the acronym WATNA stand for in negotiation?',
    options: [
      { id: 'A', text: 'Worst Alternative to a Negotiated Agreement' },
      { id: 'B', text: 'Wise Alternative to a Negotiated Agreement' },
      { id: 'C', text: 'Worst Argument to a Negotiated Agreement' },
      { id: 'D', text: 'Workable Alternative to a Negotiated Agreement' },
    ],
    correctAnswers: ['A'],
    explanation: 'WATNA stands for Worst Alternative to a Negotiated Agreement, representing the lowest threshold outcome if talks collapse.',
    marks: 1,
  },
  {
    id: 'week4-q2',
    week: 4,
    type: 'single_choice',
    topic: 'Negotiation Quote',
    question: 'To which former US President is attributed the following line?\n"Let us never negotiate out of fear, but let us never fear to negotiate."',
    options: [
      { id: 'A', text: 'Abraham Lincoln' },
      { id: 'B', text: 'John F. Kennedy' },
      { id: 'C', text: 'Franklin D. Roosevelt' },
      { id: 'D', text: 'Woodrow Wilson' },
    ],
    correctAnswers: ['B'],
    explanation: 'This famous statement was delivered by President John F. Kennedy in his Inaugural Address on January 20, 1961.',
    marks: 1,
  },
  {
    id: 'week4-q3',
    week: 4,
    type: 'single_choice',
    topic: 'Definition of Negotiation',
    question: 'According to Alan Fowler, negotiation is any form of meeting or discussion in which the parties use argument and persuasion to arrive at:',
    options: [
      { id: 'A', text: 'A unilateral decision favouring the stronger party' },
      { id: 'B', text: 'An agreed decision or action' },
      { id: 'C', text: 'A legally binding written contract' },
      { id: 'D', text: 'A postponement of the conflict' },
    ],
    correctAnswers: ['B'],
    explanation: 'Alan Fowler defines negotiation as discussion wherein parties engage persuasion to reach an agreed decision or course of action.',
    marks: 1,
  },
  {
    id: 'week4-q4',
    week: 4,
    type: 'single_choice',
    topic: 'Negotiation Process',
    question: 'To which of the following does a real negotiation proceed through?',
    options: [
      { id: 'A', text: 'Authority, not instruction' },
      { id: 'B', text: 'Instruction and persuasion, not authority and imposition' },
      { id: 'C', text: 'Imposition backed by seniority' },
      { id: 'D', text: 'Silence and withdrawal' },
    ],
    correctAnswers: ['B'],
    explanation: 'Genuine negotiation moves through constructive persuasion and dialogue, avoiding arbitrary imposition of unilateral authority.',
    marks: 1,
  },
  {
    id: 'week4-q5',
    week: 4,
    type: 'single_choice',
    topic: 'Cultural Differences',
    question: 'In Hong Kong, hospital rooms avoid the number four because the sound shi is a homophone for:',
    options: [
      { id: 'A', text: 'Poverty' },
      { id: 'B', text: 'Illness' },
      { id: 'C', text: 'Death' },
      { id: 'D', text: 'Bad luck in trade' },
    ],
    correctAnswers: ['C'],
    explanation: 'Tetraphobia: In Chinese languages including Cantonese, the numeral 4 (sei/shi) sounds almost identical to the word for death.',
    marks: 1,
  },
  {
    id: 'week4-q6',
    week: 4,
    type: 'single_choice',
    topic: 'Culture',
    question: 'Alfred G. Smith, in Communication and Culture, defines culture as:',
    options: [
      { id: 'A', text: 'A code we learn and share' },
      { id: 'B', text: 'The sum of a nation\'s laws and religion' },
      { id: 'C', text: 'An unchanging set of inherited traits' },
      { id: 'D', text: 'The visible customs of a majority community' },
    ],
    correctAnswers: ['A'],
    explanation: 'Alfred G. Smith famously defined culture as "a code we learn and share".',
    marks: 1,
  },
  {
    id: 'week4-q7',
    week: 4,
    type: 'single_choice',
    topic: 'Negotiation Styles',
    question: 'Which style, according to the colour-based classification of negotiation styles, is a mix of competitive and cooperative approaches and is recommended for negotiators?',
    options: [
      { id: 'A', text: 'Red style' },
      { id: 'B', text: 'Blue style' },
      { id: 'C', text: 'Purple style' },
      { id: 'D', text: 'Green style' },
    ],
    correctAnswers: ['C'],
    explanation: 'The Purple style synthesizes the firmness of the Red (competitive) approach with the warmth of the Blue (cooperative) approach.',
    marks: 1,
  },
  {
    id: 'week4-q8',
    week: 4,
    type: 'single_choice',
    topic: 'Management Style',
    question: 'According to McGregor, the modern style of management is built on a balance between:',
    options: [
      { id: 'A', text: 'Control and freedom' },
      { id: 'B', text: 'Profit and loss' },
      { id: 'C', text: 'Reward and punishment' },
      { id: 'D', text: 'Authority and seniority' },
    ],
    correctAnswers: ['A'],
    explanation: "Douglas McGregor's management theories emphasize harmonizing organizational control with individual employee autonomy and freedom.",
    marks: 1,
  },
  {
    id: 'week4-q9',
    week: 4,
    type: 'single_choice',
    topic: 'ZOPA',
    question: 'ZOPA stands for the ______ of possible agreement, the space in which an agreement can be reached.',
    options: [
      { id: 'A', text: 'Area' },
      { id: 'B', text: 'Zone' },
      { id: 'C', text: 'Medium' },
      { id: 'D', text: 'Arena' },
    ],
    correctAnswers: ['B'],
    explanation: 'ZOPA = Zone of Possible Agreement, the overlap range between buyer and seller reservation prices.',
    marks: 1,
  },
  {
    id: 'week4-q10',
    week: 4,
    type: 'multiple_choice',
    topic: 'Qualities of a Good Negotiator',
    question: 'Which of the following are listed as qualities of a good negotiator? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Confidence' },
      { id: 'B', text: 'Rigidity' },
      { id: 'C', text: 'Honesty' },
      { id: 'D', text: 'Aggression' },
    ],
    correctAnswers: ['A', 'C'],
    explanation: 'Confidence and honesty build credibility and trust; rigidity and aggression alienate counterparties.',
    marks: 1,
  },
  {
    id: 'week4-q11',
    week: 4,
    type: 'multiple_choice',
    topic: 'Formal Negotiation',
    question: 'In a formal negotiation, which of the following are pre-announced beforehand to both parties? (Select all that apply.)',
    options: [
      { id: 'A', text: 'The personal relationship of the parties' },
      { id: 'B', text: 'The agenda' },
      { id: 'C', text: 'The fear factor involved' },
      { id: 'D', text: 'The venue, date and time' },
    ],
    correctAnswers: ['B', 'D'],
    explanation: 'Structured formal negotiations establish explicit mutual clarity on the agenda and logistics (venue, date, time).',
    marks: 1,
  },
  {
    id: 'week4-q12',
    week: 4,
    type: 'multiple_choice',
    topic: 'Factors Affecting Negotiation',
    question: 'Which two are listed among the subjective factors that affect negotiation? (Select all that apply.)',
    options: [
      { id: 'A', text: 'The upper and lower limits of concession' },
      { id: 'B', text: 'Personal relationship between the parties' },
      { id: 'C', text: 'The fear factor' },
      { id: 'D', text: 'The written summary of the agreement' },
    ],
    correctAnswers: ['B', 'C'],
    explanation: 'Personal dynamics, emotional temperament, and fear factors are subjective psychological dimensions influencing negotiation.',
    marks: 1,
  },
  {
    id: 'week4-q13',
    week: 4,
    type: 'multiple_choice',
    topic: 'Low-Context Cultures',
    question: 'Which of the following peoples are described as belonging to low-context cultures? (Select all that apply.)',
    options: [
      { id: 'A', text: 'Japanese' },
      { id: 'B', text: 'Arabs' },
      { id: 'C', text: 'North Americans' },
      { id: 'D', text: 'Germans' },
    ],
    correctAnswers: ['C', 'D'],
    explanation: 'German, Swiss, and North American cultures are direct and low-context, prioritizing explicit, literal verbal transmission.',
    marks: 1,
  },
  {
    id: 'week4-q14',
    week: 4,
    type: 'multiple_choice',
    topic: "Maslow's Hierarchy of Needs",
    question: "According to Maslow's hierarchy, which of the following count as physiological (basic) needs? (Select all that apply.)",
    options: [
      { id: 'A', text: 'Food' },
      { id: 'B', text: 'Creativity' },
      { id: 'C', text: 'Morality' },
      { id: 'D', text: 'Shelter' },
    ],
    correctAnswers: ['A', 'D'],
    explanation: 'Food, water, sleep, and shelter form the baseline physiological survival needs in Maslow’s hierarchy.',
    marks: 1,
  },
  {
    id: 'week4-q15',
    week: 4,
    type: 'single_choice',
    topic: 'Match Culture/Country with Practice',
    question: `Match the culture/country in Column A with the practice described in Column B:

Column A:
1. Bulgaria
2. Japan
3. Sicily
4. Mexicans
5. Americans

Column B:
P. Raising the chin to say "no"
Q. Feel insulted if asked to get down to business at once
R. Nodding the head up and down to express "no"
S. "Hamburger style" of management when criticising
T. Moving the right hand to express refusal`,
    options: [
      { id: 'A', text: '1-R, 2-T, 3-P, 4-Q, 5-S' },
      { id: 'B', text: '1-T, 2-R, 3-Q, 4-P, 5-S' },
      { id: 'C', text: '1-P, 2-T, 3-R, 4-S, 5-Q' },
      { id: 'D', text: '1-R, 2-P, 3-T, 4-S, 5-Q' },
    ],
    correctAnswers: ['A'],
    explanation: '1-R (Bulgaria: nodding up/down means "no"), 2-T (Japan: moving right hand for refusal), 3-P (Sicily: raising chin for "no"), 4-Q (Mexicans: value relationship before business), 5-S (Americans: hamburger sandwich criticism style). Option A is correct.',
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
