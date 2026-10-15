import { useNavigate } from 'react-router-dom';
import { COURSE_CONFIG, getQuestionsByWeek } from '../data/questionBank';
import { loadProgress } from '../utils/storage';

const WEEK_TOPICS: Record<number, string> = {
  1: 'Listening, Personality, Thinking Hats & Communication',
  2: 'Positivity, Johari Window, Voice & Telephonic Etiquette',
  3: 'Proxemics, Haptics, Chronemics & Listening Barriers',
  4: 'Negotiation Skills, WATNA/ZOPA, Culture & Needs',
  5: 'Communication Breakdown & Business Writing Principles',
  6: 'Business Letters, Formats, Meeting Minutes & Adjustment',
  7: 'Data Collection, Report Preparation, Sampling & Circumlocution',
  8: 'Group Discussion, Team Roles, Report Structure & Bibliography',
  9: 'Week 9 Assignments (Coming Soon)',
  10: 'Week 10 Assignments (Coming Soon)',
  11: 'Week 11 Assignments (Coming Soon)',
  12: 'Week 12 Assignments (Coming Soon)',
};

export default function HomePage() {
  const navigate = useNavigate();
  const progress = loadProgress();
  const allWeeklyQuestions = Array.from({ length: 12 }, (_, i) => getQuestionsByWeek(i + 1));
  const totalQuestions = allWeeklyQuestions.flat().length;
  const weeksWithProgress = Object.keys(progress.weekProgress).length;
  const overallPct =
    progress.totalQuestionsAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalQuestionsAnswered) * 100)
      : null;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-fade-in">
      {/* Hero Banner in Monochrome Black & White */}
      <div className="bw-card p-6 sm:p-10 mb-8 border border-neutral-700 bg-neutral-950">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-white/10 text-white border border-white/20">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          {COURSE_CONFIG.subtitle}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          {COURSE_CONFIG.name}
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed mb-4">
          Interactive assignment practice system for NPTEL Soft Skills. Test your knowledge across weekly modules and simulate full exam conditions.
        </p>

        <p className="text-neutral-400 text-xs sm:text-sm mb-8">
          Offered via <strong className="text-white font-medium">{COURSE_CONFIG.institution}</strong> · 12 Weekly Modules
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            id="start-practicing-btn"
            type="button"
            onClick={() => navigate('/week/1')}
            className="btn-primary py-3 px-6 text-sm sm:text-base"
          >
            Start Practicing Week 1 →
          </button>
          <button
            id="mock-exam-hero-btn"
            type="button"
            onClick={() => navigate('/mock-exam')}
            className="btn-secondary py-3 px-6 text-sm sm:text-base"
          >
            Full Mock Exam ({totalQuestions} Qs)
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
        <div className="bw-card p-4 sm:p-5">
          <div className="text-xs text-neutral-400 font-medium mb-1">Available Qs</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalQuestions}</div>
          <div className="text-[11px] text-neutral-500 mt-1">Week 1 Active</div>
        </div>

        <div className="bw-card p-4 sm:p-5">
          <div className="text-xs text-neutral-400 font-medium mb-1">Weeks Practiced</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{weeksWithProgress}/12</div>
          <div className="text-[11px] text-neutral-500 mt-1">Session progress</div>
        </div>

        <div className="bw-card p-4 sm:p-5">
          <div className="text-xs text-neutral-400 font-medium mb-1">Answered</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {progress.totalQuestionsAnswered}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">Current session</div>
        </div>

        <div className="bw-card p-4 sm:p-5">
          <div className="text-xs text-neutral-400 font-medium mb-1">Accuracy</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {overallPct !== null ? `${overallPct}%` : '—'}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            {progress.totalCorrect} correct
          </div>
        </div>
      </div>

      {/* Notice about Reload */}
      <div className="mb-8 p-3.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 text-xs flex items-center gap-2">
        <span className="text-white font-bold">ℹ Note:</span>
        Practice data is session-based. Reloading the page will cleanly reset all progress and answers.
      </div>

      {/* Weekly Assignment Cards */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Weekly Assignments
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Select an assignment to begin practicing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, i) => {
            const weekNum = i + 1;
            const qs = allWeeklyQuestions[i];
            const hasQuestions = qs.length > 0;
            const wp = progress.weekProgress[weekNum];
            const bestScore = wp?.bestScore ?? null;

            return (
              <button
                key={weekNum}
                id={`week-${weekNum}-card`}
                type="button"
                onClick={() => navigate(`/week/${weekNum}`)}
                className={`bw-card p-5 text-left transition-all ${
                  hasQuestions
                    ? 'hover:border-white hover:bg-neutral-900/60 cursor-pointer'
                    : 'opacity-65 hover:opacity-85 border-dashed cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-xs ${
                      hasQuestions ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    W{weekNum}
                  </span>

                  {hasQuestions ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 uppercase tracking-wider">
                      Ready
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      Coming Soon
                    </span>
                  )}
                </div>

                <div className="font-bold text-white text-sm sm:text-base mb-1">
                  Week {weekNum}
                </div>

                <div className="text-xs text-neutral-400 line-clamp-2 min-h-[32px] mb-3">
                  {WEEK_TOPICS[weekNum]}
                </div>

                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium">
                    {qs.length} question{qs.length !== 1 ? 's' : ''}
                  </span>

                  {bestScore !== null ? (
                    <span className="font-bold text-white">{bestScore}%</span>
                  ) : hasQuestions ? (
                    <span className="text-neutral-300 font-semibold group-hover:underline">
                      Practice →
                    </span>
                  ) : (
                    <span className="text-neutral-600">Pending</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mock Exam Section */}
      <div className="bw-card p-6 sm:p-8 border border-neutral-700 bg-neutral-950">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-white text-black">
              Full Mock Exam
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Course Simulation Test
            </h3>
            <p className="text-sm text-neutral-300 max-w-xl leading-relaxed">
              Take all {totalQuestions} questions under exam conditions without instant answers. Review detailed results and solutions at the end.
            </p>
          </div>

          <button
            id="start-mock-exam-btn"
            type="button"
            onClick={() => navigate('/mock-exam')}
            className="btn-primary w-full md:w-auto py-3 px-8 text-sm sm:text-base flex-shrink-0"
          >
            Start Mock Exam →
          </button>
        </div>
      </div>
    </div>
  );
}
