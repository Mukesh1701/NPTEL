import { useState, useEffect } from 'react';
import type { Question } from '../data/questionBank';

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (selectedIds: string[]) => void;
  submitted: boolean;
  selectedAnswer: string[] | null;
  correctAnswer: string[];
  isCorrect: boolean | null;
  reviewMode?: boolean;
  practiceMode?: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
  submitted,
  selectedAnswer,
  correctAnswer,
  isCorrect,
  reviewMode = false,
  practiceMode = false,
}: Props) {
  const [selected, setSelected] = useState<string[]>(selectedAnswer ?? []);

  useEffect(() => {
    setSelected(selectedAnswer ?? []);
  }, [question.id, selectedAnswer]);

  const isMulti = question.type === 'multiple_choice';

  function toggleOption(id: string) {
    if (submitted || reviewMode) return;
    if (isMulti) {
      setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    } else {
      setSelected([id]);
    }
  }

  function getOptionClass(optId: string): string {
    const isSelectedByUser = (selectedAnswer ?? selected).includes(optId);

    if (reviewMode || submitted) {
      const isCorrectOpt = correctAnswer.includes(optId);
      if (isCorrectOpt) {
        return 'option-btn correct';
      }
      if (isSelectedByUser && !isCorrectOpt) {
        return 'option-btn incorrect';
      }
      return 'option-btn dimmed';
    }

    if (selected.includes(optId)) {
      return 'option-btn selected';
    }
    return 'option-btn';
  }

  const canSubmit = selected.length > 0 && !submitted && !reviewMode;

  return (
    <div className="bw-card p-5 sm:p-7 md:p-8 animate-fade-in">
      {/* Top Meta Header */}
      <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white text-black font-extrabold text-xs sm:text-sm flex items-center justify-center">
            {questionNumber}
          </div>
          <div>
            <div className="text-xs text-neutral-400 font-medium">
              Question {questionNumber} of {totalQuestions}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 uppercase tracking-wider">
                {isMulti ? 'Multiple Choice' : 'Single Choice'}
              </span>
              {question.topic && (
                <span className="text-[11px] text-neutral-400 hidden sm:inline">
                  • {question.topic}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-xs font-medium px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
          {question.marks} Mark{question.marks > 1 ? 's' : ''}
        </div>
      </div>

      {/* Monochrome Progress Bar */}
      <div className="progress-bar-bw mb-6">
        <div
          className="progress-fill-bw"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <div className="text-white text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line">
          {question.question}
        </div>
      </div>

      {isMulti && !submitted && !reviewMode && (
        <div className="text-xs text-neutral-400 mb-4 flex items-center gap-1.5 font-medium bg-neutral-900/60 border border-neutral-800 rounded-md p-2.5">
          <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Select all options that apply before submitting.
        </div>
      )}

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {question.options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          const isCorrectAnswer = correctAnswer.includes(opt.id);
          const showResultIcons = reviewMode || submitted;

          return (
            <button
              key={opt.id}
              id={`option-${opt.id}`}
              type="button"
              onClick={() => toggleOption(opt.id)}
              className={getOptionClass(opt.id)}
              aria-pressed={isSelected}
            >
              <div className="option-letter">{opt.id}</div>
              <span className="flex-1 text-sm sm:text-base leading-snug">{opt.text}</span>
              {showResultIcons && isCorrectAnswer && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-black text-white ml-2 flex-shrink-0">
                  ✓ Correct
                </span>
              )}
              {showResultIcons && !isCorrectAnswer && (selectedAnswer ?? []).includes(opt.id) && (
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 ml-2 flex-shrink-0">
                  ✕ Your Pick
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback in B&W */}
      {submitted && isCorrect !== null && practiceMode && (
        <div className="rounded-xl p-4 sm:p-5 mb-6 border border-neutral-700 bg-neutral-950 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider ${
                isCorrect ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-200 border border-neutral-600'
              }`}
            >
              {isCorrect ? '✓ Correct Answer' : '✕ Incorrect'}
            </span>
            <span className="text-xs text-neutral-400">
              Correct Answer: <strong className="text-white">{correctAnswer.join(', ')}</strong>
            </span>
          </div>

          {question.explanation && (
            <div className="text-xs sm:text-sm text-neutral-300 mt-3 pt-3 border-t border-neutral-800 leading-relaxed">
              <strong className="text-neutral-100">Explanation: </strong>
              {question.explanation}
            </div>
          )}
        </div>
      )}

      {/* Submit Button (Practice Mode) */}
      {practiceMode && !submitted && !reviewMode && (
        <button
          id="submit-answer-btn"
          type="button"
          onClick={() => onSubmit(selected)}
          disabled={!canSubmit}
          className="btn-primary w-full py-3.5 text-sm sm:text-base tracking-wide"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}
