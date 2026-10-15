// In-memory state management (resets completely on page reload as requested)

export interface WeekProgress {
  weekNum: number;
  attempted: number;
  correct: number;
  incorrect: number;
  bestScore: number | null; // 0-100 percentage
  totalAttempts: number;
  lastAttemptedAt: string | null;
}

export interface MockExamRecord {
  score: number;
  total: number;
  percentage: number;
  takenAt: string;
}

export interface ProgressState {
  weekProgress: Record<number, WeekProgress>;
  mockExams: MockExamRecord[];
  totalQuestionsAnswered: number;
  totalCorrect: number;
}

function defaultProgress(): ProgressState {
  return {
    weekProgress: {},
    mockExams: [],
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
  };
}

// In-memory storage - strictly discarded when the page is reloaded
let inMemoryState: ProgressState = defaultProgress();

// Clear any past localStorage if it existed
try {
  if (typeof window !== 'undefined') {
    window.localStorage?.removeItem('nptel_practice_hub_progress_v1');
    window.sessionStorage?.clear();
  }
} catch {
  // ignore storage errors
}

export function loadProgress(): ProgressState {
  return {
    weekProgress: { ...inMemoryState.weekProgress },
    mockExams: [...inMemoryState.mockExams],
    totalQuestionsAnswered: inMemoryState.totalQuestionsAnswered,
    totalCorrect: inMemoryState.totalCorrect,
  };
}

export function saveProgress(state: ProgressState): void {
  inMemoryState = {
    weekProgress: { ...state.weekProgress },
    mockExams: [...state.mockExams],
    totalQuestionsAnswered: state.totalQuestionsAnswered,
    totalCorrect: state.totalCorrect,
  };
}

export function clearProgress(): void {
  inMemoryState = defaultProgress();
}

export function updateWeekProgress(
  state: ProgressState,
  weekNum: number,
  correct: number,
  incorrect: number,
  total: number
): ProgressState {
  const existing = state.weekProgress[weekNum] || {
    weekNum,
    attempted: 0,
    correct: 0,
    incorrect: 0,
    bestScore: null,
    totalAttempts: 0,
    lastAttemptedAt: null,
  };

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const bestScore = existing.bestScore !== null ? Math.max(existing.bestScore, percentage) : percentage;

  const updated: WeekProgress = {
    weekNum,
    attempted: total,
    correct,
    incorrect,
    bestScore,
    totalAttempts: existing.totalAttempts + 1,
    lastAttemptedAt: new Date().toISOString(),
  };

  const newWeekProgress = {
    ...state.weekProgress,
    [weekNum]: updated,
  };

  const totalAttempted = Object.values(newWeekProgress).reduce((sum, w) => sum + w.attempted, 0);
  const totalCorr = Object.values(newWeekProgress).reduce((sum, w) => sum + w.correct, 0);

  const newState: ProgressState = {
    ...state,
    weekProgress: newWeekProgress,
    totalQuestionsAnswered: totalAttempted,
    totalCorrect: totalCorr,
  };

  saveProgress(newState);
  return newState;
}

export function recordMockExam(state: ProgressState, score: number, total: number): ProgressState {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const record: MockExamRecord = {
    score,
    total,
    percentage,
    takenAt: new Date().toISOString(),
  };

  const newState: ProgressState = {
    ...state,
    mockExams: [record, ...state.mockExams],
  };

  saveProgress(newState);
  return newState;
}
