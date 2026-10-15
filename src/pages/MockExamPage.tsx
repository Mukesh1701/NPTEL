import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllQuestions, type Question } from '../data/questionBank';
import { loadProgress, saveProgress, recordMockExam } from '../utils/storage';
import QuestionCard from '../components/QuestionCard';
import QuestionNav from '../components/QuestionNav';
import ConfirmDialog from '../components/ConfirmDialog';

type Phase = 'exam' | 'results' | 'review';

interface AnswerState {
  selected: string[];
}

function arraysEqual(a: string[], b: string[]) {
  return a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);
}

export default function MockExamPage() {
  const navigate = useNavigate();
  const allQuestions: Question[] = getAllQuestions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [phase, setPhase] = useState<Phase>('exam');
  const [showConfirm, setShowConfirm] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const handleSelectAnswer = useCallback(
    (selected: string[]) => {
      const q = allQuestions[currentIndex];
      setAnswers((prev) => ({ ...prev, [q.id]: { selected } }));
    },
    [allQuestions, currentIndex]
  );

  const submitExam = () => {
    const correct = allQuestions.filter((q) => {
      const a = answers[q.id];
      return a && arraysEqual(a.selected, q.correctAnswers);
    }).length;
    const total = allQuestions.length;
    const state = loadProgress();
    saveProgress(recordMockExam(state, correct, total));
    setPhase('results');
    setShowConfirm(false);
  };

  const retake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setPhase('exam');
  };

  if (allQuestions.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 animate-fade-in">
        <div className="bw-card p-8 text-center max-w-md w-full border border-neutral-800 bg-neutral-950">
          <h2 className="text-xl font-bold text-white mb-2">No Questions Available</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Questions have not been loaded into the question bank yet.
          </p>
          <Link to="/" className="btn-primary py-2.5 px-6 text-sm">
            ← Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const correct = allQuestions.filter((q) => {
    const a = answers[q.id];
    return a && arraysEqual(a.selected, q.correctAnswers);
  }).length;
  const incorrect = allQuestions.filter((q) => {
    const a = answers[q.id];
    return a && !arraysEqual(a.selected, q.correctAnswers);
  }).length;
  const answered = allQuestions.filter((q) => answers[q.id]?.selected.length).length;
  const unanswered = allQuestions.length - answered;
  const pct = Math.round((correct / allQuestions.length) * 100);

  const answeredSet = new Set(
    allQuestions.map((q, i) => (answers[q.id]?.selected?.length ? i : -1)).filter((i) => i >= 0)
  );
  const correctSet = new Set(
    allQuestions
      .map((q, i) =>
        answers[q.id] && arraysEqual(answers[q.id].selected, q.correctAnswers) ? i : -1
      )
      .filter((i) => i >= 0)
  );
  const incorrectSet = new Set(
    allQuestions
      .map((q, i) =>
        answers[q.id] && !arraysEqual(answers[q.id].selected, q.correctAnswers) ? i : -1
      )
      .filter((i) => i >= 0)
  );

  // Results screen
  if (phase === 'results') {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 max-w-2xl mx-auto animate-fade-in">
        <div className="bw-card p-6 sm:p-10 text-center border border-neutral-700 bg-neutral-950">
          <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white text-black mb-4">
            Exam Complete
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Soft Skills Mock Exam Results
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mb-8">
            Evaluation across all active questions
          </p>

          <div className="w-28 h-28 rounded-full mx-auto mb-8 flex flex-col items-center justify-center border-2 border-white bg-neutral-900 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <span className="text-3xl font-black text-white">{pct}%</span>
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">
              Final Score
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="bw-card p-3 sm:p-4 bg-neutral-900">
              <div className="text-xl sm:text-2xl font-black text-white">{allQuestions.length}</div>
              <div className="text-[11px] text-neutral-400 font-medium mt-1">Total</div>
            </div>
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
              id="review-exam-btn"
              type="button"
              onClick={() => {
                setReviewIndex(0);
                setPhase('review');
              }}
              className="btn-secondary flex-1 py-3 text-sm font-semibold"
            >
              Review All Solutions
            </button>
            <button
              id="retake-exam-btn"
              type="button"
              onClick={retake}
              className="btn-primary flex-1 py-3 text-sm font-semibold"
            >
              Retake Exam
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

  // Review screen
  if (phase === 'review') {
    const rq = allQuestions[reviewIndex];
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
            Score: <strong className="text-white">{correct}/{allQuestions.length}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
          <div>
            <QuestionCard
              question={rq}
              questionNumber={reviewIndex + 1}
              totalQuestions={allQuestions.length}
              onSubmit={() => {}}
              submitted
              selectedAnswer={ra?.selected ?? []}
              correctAnswer={rq.correctAnswers}
              isCorrect={ra ? arraysEqual(ra.selected, rq.correctAnswers) : null}
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
                disabled={reviewIndex === allQuestions.length - 1}
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
              total={allQuestions.length}
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

  // Active exam screen
  const q = allQuestions[currentIndex];
  const curAns = answers[q.id];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 max-w-5xl mx-auto animate-fade-in">
      {showConfirm && (
        <ConfirmDialog
          title="Submit Mock Exam?"
          message={`You have answered ${answered} of ${allQuestions.length} questions. ${
            unanswered > 0
              ? `${unanswered} question${unanswered !== 1 ? 's' : ''} will be marked as unanswered.`
              : 'All questions answered.'
          }`}
          confirmLabel="Submit Now"
          cancelLabel="Continue Exam"
          onConfirm={submitExam}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-white font-semibold">Mock Exam</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-medium text-neutral-400">
            Answered: <strong className="text-white">{answered}</strong>/{allQuestions.length}
          </span>
          <button
            id="submit-exam-btn"
            type="button"
            onClick={() => setShowConfirm(true)}
            className="btn-primary py-1.5 px-4 text-xs font-bold"
          >
            Submit Exam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
        <div>
          {/* Exam Question Card (Exam Mode - Answers are not revealed) */}
          <div className="bw-card p-5 sm:p-7 md:p-8">
            <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white text-black font-extrabold text-xs sm:text-sm flex items-center justify-center">
                  {currentIndex + 1}
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">
                    Question {currentIndex + 1} of {allQuestions.length}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 uppercase tracking-wider">
                      {q.type === 'multiple_choice' ? 'Multiple Choice' : 'Single Choice'}
                    </span>
                    {q.topic && (
                      <span className="text-[11px] text-neutral-400 hidden sm:inline">
                        • {q.topic}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                Week {q.week}
              </span>
            </div>

            <div className="progress-bar-bw mb-6">
              <div
                className="progress-fill-bw"
                style={{ width: `${((currentIndex + 1) / allQuestions.length) * 100}%` }}
              />
            </div>

            <div className="mb-6">
              <div className="text-white text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line">
                {q.question}
              </div>
            </div>

            {q.type === 'multiple_choice' && (
              <div className="text-xs text-neutral-400 mb-4 flex items-center gap-1.5 font-medium bg-neutral-900/60 border border-neutral-800 rounded-md p-2.5">
                <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Select all options that apply.
              </div>
            )}

            <div className="space-y-3">
              {q.options.map((opt) => {
                const isSel = curAns?.selected?.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    id={`exam-option-${opt.id}`}
                    type="button"
                    onClick={() => {
                      const cur = curAns?.selected ?? [];
                      let next: string[];
                      if (q.type === 'multiple_choice') {
                        next = cur.includes(opt.id) ? cur.filter((x) => x !== opt.id) : [...cur, opt.id];
                      } else {
                        next = [opt.id];
                      }
                      handleSelectAnswer(next);
                    }}
                    className={`option-btn ${isSel ? 'selected' : ''}`}
                    aria-pressed={isSel}
                  >
                    <div className="option-letter">{opt.id}</div>
                    <span className="flex-1 text-sm sm:text-base leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              id="exam-prev-btn"
              type="button"
              onClick={() => setCurrentIndex((i) => i - 1)}
              disabled={currentIndex === 0}
              className="btn-secondary flex-1 py-3 text-sm"
            >
              ← Previous
            </button>
            <button
              id="exam-next-btn"
              type="button"
              onClick={() =>
                currentIndex < allQuestions.length - 1
                  ? setCurrentIndex((i) => i + 1)
                  : setShowConfirm(true)
              }
              className="btn-primary flex-1 py-3 text-sm"
            >
              {currentIndex === allQuestions.length - 1 ? 'Finish Exam →' : 'Next Question →'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <QuestionNav
            current={currentIndex}
            total={allQuestions.length}
            answered={answeredSet}
            onGoTo={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  );
}
