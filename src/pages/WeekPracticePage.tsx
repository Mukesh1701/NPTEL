import { useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getQuestionsByWeek, type Question } from '../data/questionBank';
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

function WeekPracticeContent({ week }: { week: number }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(() => getQuestionsByWeek(week));

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
    saveProgress(updateWeekProgress(state, week, earnedMarks, totalMarks - earnedMarks, totalMarks));
    setPhase('results');
    setShowConfirm(false);
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
            Assignment Submitted
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Week {week} Performance
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mb-6">
            NPTEL Soft Skills Assignment Results
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

  // Review Screen (Shows all answers, which one user picked, correct answer, and explanation)
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
            <QuestionCard
              question={rq}
              questionNumber={reviewIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={ra?.selected ?? []}
              correctAnswer={rq.correctAnswers}
              isCorrect={rqIsCorrect}
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

  // Active Practice Screen (No spoilers - user answers all questions first)
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-white font-semibold">Week {week} Assignment</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs sm:text-sm font-medium text-neutral-400">
            Answered: <strong className="text-white">{answeredCount}</strong>/{questions.length}
          </div>
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="btn-primary py-1.5 px-3.5 text-xs font-semibold"
          >
            Submit Assignment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
        <div>
          <QuestionCard
            question={q}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            onSelectOption={handleSelectAnswer}
            selectedAnswer={curAns?.selected ?? null}
            correctAnswer={q.correctAnswers}
            practiceMode={false}
          />

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              id="prev-question-btn"
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-secondary flex-1 py-3 text-sm"
            >
              ← Previous
            </button>

            {curAns?.selected?.length ? (
              <button
                type="button"
                onClick={handleClearAnswer}
                className="btn-secondary py-3 px-4 text-xs text-neutral-400 hover:text-white"
              >
                Clear Choice
              </button>
            ) : null}

            {currentIndex < questions.length - 1 ? (
              <button
                id="next-question-btn"
                type="button"
                onClick={handleNext}
                className="btn-primary flex-1 py-3 text-sm"
              >
                Next Question →
              </button>
            ) : (
              <button
                id="finish-week-btn"
                type="button"
                onClick={() => setShowConfirm(true)}
                className="btn-primary flex-1 py-3 text-sm"
              >
                Review & Submit Week {week} →
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

          <button
            id="sidebar-submit-btn"
            type="button"
            onClick={() => setShowConfirm(true)}
            className="btn-primary w-full py-2.5 text-xs font-semibold"
          >
            Submit Week {week} Assignment
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          title={`Submit Week ${week} Assignment?`}
          message={
            unansweredCount > 0
              ? `You have answered ${answeredCount} of ${questions.length} questions (${unansweredCount} unanswered). Are you sure you want to submit your assignment now and view your marks?`
              : `You have answered all ${questions.length} questions. Are you ready to submit your Week ${week} assignment and view your total marks and solution explanations?`
          }
          confirmLabel="Yes, Submit Assignment"
          cancelLabel="Continue Answering"
          onConfirm={finishPractice}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default function WeekPracticePage() {
  const { weekNum } = useParams<{ weekNum: string }>();
  const week = parseInt(weekNum ?? '1', 10);
  return <WeekPracticeContent key={week} week={week} />;
}


