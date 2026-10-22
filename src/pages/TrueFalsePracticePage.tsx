import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getTrueFalseQuestions, type Question } from '../data/questionBank';
import { loadProgress, saveProgress, updateWeekProgress } from '../utils/storage';
import QuestionCard from '../components/QuestionCard';
import QuestionNav from '../components/QuestionNav';
import ConfirmDialog from '../components/ConfirmDialog';

type Phase = 'practice' | 'results' | 'review';

interface AnswerState {
  selected: string[];
}

function arraysEqual(a: string[], b: string[]) {
  return a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);
}

export default function TrueFalsePracticePage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(() => getTrueFalseQuestions());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [phase, setPhase] = useState<Phase>('practice');
  const [showConfirm, setShowConfirm] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const handleSelectAnswer = useCallback(
    (selected: string[]) => {
      const q = questions[currentIndex];
      setAnswers((prev) => ({
        ...prev,
        [q.id]: { selected },
      }));
    },
    [questions, currentIndex]
  );

  const handleClearAnswer = () => {
    const q = questions[currentIndex];
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowConfirm(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const totalMarks = questions.reduce((sum, qq) => sum + (qq.marks || 1), 0);
  const earnedMarks = questions.reduce((sum, qq) => {
    const a = answers[qq.id];
    return a && arraysEqual(a.selected, qq.correctAnswers) ? sum + (qq.marks || 1) : sum;
  }, 0);
  const correctCount = questions.filter((qq) => {
    const a = answers[qq.id];
    return a && arraysEqual(a.selected, qq.correctAnswers);
  }).length;
  const incorrectCount = questions.filter((qq) => {
    const a = answers[qq.id];
    return a?.selected?.length && !arraysEqual(a.selected, qq.correctAnswers);
  }).length;
  const answeredCount = questions.filter((qq) => answers[qq.id]?.selected?.length).length;
  const unansweredCount = questions.length - answeredCount;
  const pct = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;

  const finishPractice = () => {
    const state = loadProgress();
    // Save under key 14 as the dedicated True/False section identifier
    saveProgress(updateWeekProgress(state, 14, earnedMarks, totalMarks - earnedMarks, totalMarks));
    setPhase('results');
    setShowConfirm(false);
  };

  const retryAll = () => {
    setAnswers({});
    setCurrentIndex(0);
    setQuestions(getTrueFalseQuestions());
    setPhase('practice');
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 animate-fade-in">
        <div className="bw-card p-8 sm:p-10 text-center max-w-md w-full border border-neutral-800 bg-neutral-950">
          <div className="w-12 h-12 rounded-full border border-neutral-700 bg-neutral-900 mx-auto flex items-center justify-center text-lg font-bold mb-4 text-white">
            T/F
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Questions Found</h2>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            No True or False questions are currently available in the question bank.
          </p>
          <Link to="/" className="btn-secondary py-2.5 text-sm">
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];
  const curAns = answers[q.id];

  const answeredSet = new Set(
    questions
      .map((qq, idx) => (answers[qq.id]?.selected?.length ? idx : -1))
      .filter((i) => i >= 0)
  );
  const correctSet = new Set(
    questions
      .map((qq, idx) =>
        answers[qq.id] && arraysEqual(answers[qq.id].selected, qq.correctAnswers) ? idx : -1
      )
      .filter((i) => i >= 0)
  );
  const incorrectSet = new Set(
    questions
      .map((qq, idx) =>
        answers[qq.id]?.selected?.length && !arraysEqual(answers[qq.id].selected, qq.correctAnswers)
          ? idx
          : -1
      )
      .filter((i) => i >= 0)
  );

  // Results Screen
  if (phase === 'results') {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 max-w-2xl mx-auto animate-fade-in">
        <div className="bw-card p-6 sm:p-10 text-center border border-neutral-700 bg-neutral-950">
          <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white text-black mb-4">
            Practice Submitted
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            True / False Performance
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mb-6">
            Course-Wide True or False Conceptual Verification
          </p>

          {/* Monochrome Score Circle */}
          <div className="w-28 h-28 rounded-full mx-auto mb-4 flex flex-col items-center justify-center border-2 border-white bg-neutral-900 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="text-3xl font-black text-white">{pct}%</span>
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">
              Score
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-8 bg-neutral-900 border border-neutral-800 text-neutral-200">
            Total Marks: <strong className="text-white text-sm">{earnedMarks} / {totalMarks}</strong>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            <div className="bw-card p-3 sm:p-4 bg-neutral-900">
              <div className="text-xl sm:text-2xl font-black text-white">{correctCount}</div>
              <div className="text-[11px] text-neutral-400 font-medium mt-1">Correct</div>
            </div>
            <div className="bw-card p-3 sm:p-4 bg-neutral-900">
              <div className="text-xl sm:text-2xl font-black text-neutral-400">{incorrectCount}</div>
              <div className="text-[11px] text-neutral-500 font-medium mt-1">Incorrect</div>
            </div>
            <div className="bw-card p-3 sm:p-4 bg-neutral-900">
              <div className="text-xl sm:text-2xl font-black text-neutral-500">{unansweredCount}</div>
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
              className="btn-primary flex-1 py-3 text-sm font-semibold"
            >
              Review All Solutions & Explanations →
            </button>
            <button
              id="practice-again-btn"
              type="button"
              onClick={retryAll}
              className="btn-secondary flex-1 py-3 text-sm font-semibold"
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
    const rqIsCorrect = ra?.selected?.length ? arraysEqual(ra.selected, rq.correctAnswers) : null;

    return (
      <div className="min-h-screen pt-20 pb-16 px-4 max-w-5xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            type="button"
            onClick={() => setPhase('results')}
            className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            ← Back to Results
          </button>
          <div className="text-xs sm:text-sm text-neutral-400">
            Marks: <strong className="text-white">{earnedMarks}/{totalMarks}</strong> ({pct}%)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
          <div>
            <div className="mb-3 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Source: <strong className="text-white">Week {rq.week}</strong></span>
              <span className="text-neutral-400">{rq.topic}</span>
            </div>
            <QuestionCard
              question={rq}
              questionNumber={reviewIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={ra?.selected ?? []}
              correctAnswer={rq.correctAnswers}
              isCorrect={rqIsCorrect}
              reviewMode
            />

            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                onClick={() => setReviewIndex((i) => Math.max(0, i - 1))}
                disabled={reviewIndex === 0}
                className="btn-secondary py-2 px-4 text-xs disabled:opacity-30"
              >
                ← Prev Question
              </button>
              <span className="text-xs text-neutral-400">
                {reviewIndex + 1} / {questions.length}
              </span>
              <button
                type="button"
                onClick={() => setReviewIndex((i) => Math.min(questions.length - 1, i + 1))}
                disabled={reviewIndex === questions.length - 1}
                className="btn-primary py-2 px-4 text-xs disabled:opacity-30"
              >
                Next Question →
              </button>
            </div>
          </div>

          <QuestionNav
            current={reviewIndex}
            total={questions.length}
            answered={answeredSet}
            correct={correctSet}
            incorrect={incorrectSet}
            onGoTo={(idx) => setReviewIndex(idx)}
            reviewMode
          />
        </div>
      </div>
    );
  }

  // Active Practice Screen
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 max-w-5xl mx-auto animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
        <Link
          to="/"
          className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          ← Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-white text-black tracking-wider uppercase">
            T/F Practice
          </span>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            True or False Concept Questions
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="text-xs text-neutral-400 hover:text-white transition-colors underline"
        >
          Submit Early
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
        {/* Main Question Column */}
        <div>
          <div className="mb-3 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
            <span>Question Origin: <strong className="text-white">Week {q.week}</strong></span>
            <span className="text-neutral-400">{q.topic}</span>
          </div>

          <QuestionCard
            question={q}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={curAns?.selected ?? []}
            correctAnswer={q.correctAnswers}
            onSelectOption={handleSelectAnswer}
            practiceMode
          />

          {/* Bottom Actions */}
          <div className="flex items-center justify-between mt-5 gap-3">
            <div className="flex items-center gap-2">
              <button
                id="prev-question-btn"
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="btn-secondary py-2.5 px-4 text-xs disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>

              {curAns?.selected?.length ? (
                <button
                  type="button"
                  onClick={handleClearAnswer}
                  className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors py-2 px-2"
                >
                  Clear Selection
                </button>
              ) : null}
            </div>

            <button
              id="next-question-btn"
              type="button"
              onClick={handleNext}
              className="btn-primary py-2.5 px-5 text-xs font-semibold"
            >
              {currentIndex < questions.length - 1 ? 'Save & Next →' : 'Finish Practice →'}
            </button>
          </div>
        </div>

        {/* Sidebar Nav */}
        <div className="space-y-4">
          <QuestionNav
            current={currentIndex}
            total={questions.length}
            answered={answeredSet}
            onGoTo={(idx) => setCurrentIndex(idx)}
          />

          <button
            id="sidebar-submit-btn"
            type="button"
            onClick={() => setShowConfirm(true)}
            className="btn-primary w-full py-2.5 text-xs font-semibold"
          >
            Submit True / False Practice
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Submit True or False Practice?"
          message={
            unansweredCount > 0
              ? `You have answered ${answeredCount} of ${questions.length} questions (${unansweredCount} unanswered). Are you sure you want to submit your practice now and view your marks?`
              : `You have answered all ${questions.length} questions. Are you ready to submit your practice and view your total marks and solution explanations?`
          }
          confirmLabel="Yes, Submit Practice"
          cancelLabel="Continue Answering"
          onConfirm={finishPractice}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
