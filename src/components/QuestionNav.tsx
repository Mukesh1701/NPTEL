interface Props {
  current: number;
  total: number;
  answered: Set<number>;
  correct?: Set<number>;
  incorrect?: Set<number>;
  onGoTo: (index: number) => void;
  reviewMode?: boolean;
}

export default function QuestionNav({
  current,
  total,
  answered,
  correct,
  incorrect,
  onGoTo,
  reviewMode = false,
}: Props) {
  return (
    <div className="bw-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          {reviewMode ? 'Review Questions' : 'Question Grid'}
        </span>
        <span className="text-xs text-neutral-400">
          {answered.size}/{total} answered
        </span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
        {Array.from({ length: total }, (_, i) => {
          let cls = 'q-pill unanswered';
          if (reviewMode) {
            if (correct?.has(i)) cls = 'q-pill correct-pill';
            else if (incorrect?.has(i)) cls = 'q-pill incorrect-pill';
            else cls = 'q-pill unanswered';
          } else {
            if (answered.has(i)) cls = 'q-pill answered';
          }
          if (i === current) cls += ' current';

          return (
            <button
              key={i}
              id={`qnav-${i + 1}`}
              type="button"
              onClick={() => onGoTo(i)}
              className={cls}
              aria-label={`Go to question ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-400">
        {!reviewMode ? (
          <>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-white" />
              <span>Current question</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-neutral-700" />
              <span>Answered ({answered.size})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-neutral-900 border border-neutral-700" />
              <span>Unanswered ({total - answered.size})</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-white" />
              <span>Correct ({correct?.size ?? 0})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-neutral-800 border border-neutral-600 line-through" />
              <span>Incorrect ({incorrect?.size ?? 0})</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
