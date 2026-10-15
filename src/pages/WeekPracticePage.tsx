import { useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getQuestionsByWeek, type Question } from '../data/questionBank';
import { loadProgress, saveProgress, updateWeekProgress } from '../utils/storage';
import QuestionCard from '../components/QuestionCard';
import QuestionNav from '../components/QuestionNav';

type Phase = 'practice' | 'results' | 'review';

interface AnswerState {
  selected: string[];
  submitted: boolean;
  isCorrect: boolean | null;
}

function arraysEqual(a: string[], b: string[]) {
  return a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);
}

function WeekPracticeContent({ week }: { week: number }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(() => getQuestionsByWeek(week));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [phase, setPhase] = useState<Phase>('practice');
  const [reviewIndex, setReviewIndex] = useState(0);

  const handleSubmit = useCallback(
    (selected: string[]) => {
      const q = questions[currentIndex];
      const isCorrect = arraysEqual(selected, q.correctAnswers);
      setAnswers((prev) => ({
        ...prev,
        [q.id]: { selected, submitted: true, isCorrect },
      }));
    },
    [questions, currentIndex]
  );

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishPractice();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const finishPractice = () => {
    const correct = Object.values(answers).filter((a) => a.isCorrect).length;
    const incorrect = Object.values(answers).filter((a) => !a.isCorrect && a.submitted).length;
    const total = questions.length;
    const state = loadProgress();
    saveProgress(updateWeekProgress(state, week, correct, incorrect, total));
    setPhase('results');
  };

  const retryAll = () => {
    setAnswers({});
    setCurrentIndex(0);
    setQuestions(getQuestionsByWeek(week));
    setPhase('practice');
  };

  // If this week has no questions yet (Weeks 2-12)
  if (questions.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 animate-fade-in">
        <div className="bw-card p-8 sm:p-10 text-center max-w-md w-full border border-neutral-800 bg-neutral-950">
          <div className="w-12 h-12 rounded-full border border-neutral-700 bg-neutral-900 mx-auto flex items-center justify-center text-lg font-bold mb-4 text-white">
            W{week}
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Week {week} Pending</h2>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            Assignments for Week {week} will be uploaded soon. You can practice Week 1 questions right now.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link to="/week/1" className="btn-primary py-2.5 text-sm">
              Practice Week 1 (15 Questions) →
            </Link>
            <Link to="/" className="btn-secondary py-2.5 text-sm">
              ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];
  const ans = answers[q.id];
  const correct = Object.values(answers).filter((a) => a.isCorrect).length;
  const incorrect = Object.values(answers).filter((a) => !a.isCorrect && a.submitted).length;
  const unanswered = questions.length - Object.keys(answers).length;
  const pct = Math.round((correct / questions.length) * 100);

  const answeredSet = new Set(
    questions.map((qq, idx) => (answers[qq.id]?.submitted ? idx : -1)).filter((i) => i >= 0)
  );
  const correctSet = new Set(
    questions.map((qq, idx) => (answers[qq.id]?.isCorrect ? idx : -1)).filter((i) => i >= 0)
  );
  const incorrectSet = new Set(
    questions
      .map((qq, idx) => (answers[qq.id]?.submitted && !answers[qq.id]?.isCorrect ? idx : -1))
      .filter((i) => i >= 0)
  );

  // Results Screen
  if (phase === 'results') {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 max-w-2xl mx-auto animate-fade-in">
        <div className="bw-card p-6 sm:p-10 text-center border border-neutral-700 bg-neutral-950">
          <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white text-black mb-4">
            Practice Complete
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Week {week} Performance
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mb-8">
            NPTEL Soft Skills Assignment Practice
          </p>

          {/* Monochrome Score Circle */}
          <div className="w-28 h-28 rounded-full mx-auto mb-8 flex flex-col items-center justify-center border-2 border-white bg-neutral-900 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="text-3xl font-black text-white">{pct}%</span>
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">
              Score
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            <div className="bw-card p-3 sm:p-4 bg-neutral-900">
              <div className="text-xl sm:text-2xl font-black text-white">{correct}</div>
              <div className="text-[11px] text-neutral-400 font-medium mt-1">Correct</div>
            </div>
            <div className="bw-card p-3 sm:p-4 bg-neutral-900">
              <div className="text-xl sm:text-2xl font-black text-neutral-400">{incorrect}</div>
              <div className="text-[11px] text-neutral-500 font-medium mt-1">Incorrect</div>
            </div>
            <div className="bw-card p-3 sm:p-4 bg-neutral-900">
              <div className="text-xl sm:text-2xl font-black text-neutral-500">{unanswered}</div>
              <div className="text-[11px] text-neutral-500 font-medium mt-1">Skipped</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              id="review-answers-btn"
              type="button"
              onClick={() => {
                setReviewIndex(0);
                setPhase('review');
              }}
              className="btn-secondary flex-1 py-3 text-sm font-semibold"
            >
              Review Solutions
            </button>
            <button
              id="practice-again-btn"
              type="button"
              onClick={retryAll}
              className="btn-primary flex-1 py-3 text-sm font-semibold"
            >
              Practice Again
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-4 text-xs text-neutral-400 hover:text-white transition-colors py-2"
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Review Screen
  if (phase === 'review') {
    const rq = questions[reviewIndex];
    const ra = answers[rq.id];

    return (
      <div className="min-h-screen pt-20 pb-16 px-4 max-w-5xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            type="button"
            onClick={() => setPhase('results')}
            className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors"
          >
            ← Back to Results
          </button>
          <div className="text-xs sm:text-sm text-neutral-400">
            Score: <strong className="text-white">{correct}/{questions.length}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
          <div>
            <QuestionCard
              question={rq}
              questionNumber={reviewIndex + 1}
              totalQuestions={questions.length}
              onSubmit={() => {}}
              submitted
              selectedAnswer={ra?.selected ?? []}
              correctAnswer={rq.correctAnswers}
              isCorrect={ra?.isCorrect ?? null}
              reviewMode
            />

            <div className="flex gap-3 mt-4">
              <button
                id="review-prev-btn"
                type="button"
                disabled={reviewIndex === 0}
                onClick={() => setReviewIndex((i) => i - 1)}
                className="btn-secondary flex-1 py-3 text-sm"
              >
                ← Previous
              </button>
              <button
                id="review-next-btn"
                type="button"
                disabled={reviewIndex === questions.length - 1}
                onClick={() => setReviewIndex((i) => i + 1)}
                className="btn-primary flex-1 py-3 text-sm"
              >
                Next Question →
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <QuestionNav
              current={reviewIndex}
              total={questions.length}
              answered={answeredSet}
              correct={correctSet}
              incorrect={incorrectSet}
              onGoTo={setReviewIndex}
              reviewMode
            />
          </div>
        </div>
      </div>
    );
  }

  // Active Practice Screen
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-white font-semibold">Week {week} Practice</span>
        </div>

        <div className="text-xs sm:text-sm font-medium text-neutral-400">
          Answered: <strong className="text-white">{answeredSet.size}</strong>/{questions.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
        <div>
          <QuestionCard
            question={q}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            onSubmit={handleSubmit}
            submitted={ans?.submitted ?? false}
            selectedAnswer={ans?.selected ?? null}
            correctAnswer={q.correctAnswers}
            isCorrect={ans?.isCorrect ?? null}
            practiceMode
          />

          <div className="flex gap-3 mt-4">
            <button
              id="prev-question-btn"
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-secondary flex-1 py-3 text-sm"
            >
              ← Previous
            </button>

            {ans?.submitted ? (
              <button
                id="next-question-btn"
                type="button"
                onClick={handleNext}
                className="btn-primary flex-1 py-3 text-sm"
              >
                {currentIndex === questions.length - 1 ? `Finish Week ${week} →` : 'Next Question →'}
              </button>
            ) : (
              <button
                id="skip-question-btn"
                type="button"
                onClick={handleNext}
                className="btn-secondary flex-1 py-3 text-sm text-neutral-300"
              >
                {currentIndex === questions.length - 1 ? 'Finish' : 'Skip →'}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <QuestionNav
            current={currentIndex}
            total={questions.length}
            answered={answeredSet}
            onGoTo={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default function WeekPracticePage() {
  const { weekNum } = useParams<{ weekNum: string }>();
  const week = parseInt(weekNum ?? '1', 10);
  return <WeekPracticeContent key={week} week={week} />;
}

