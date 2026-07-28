import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, RefreshCw, Trash2, HelpCircle, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useStudy } from '../context/StudyContext';

export function WrongAnswersPage() {
  const { wrongAnswers, removeWrongAnswer } = useStudy();
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleTestOption = (qId, optionIdx) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  return (
    <PageWrapper className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Wrong Answers Review Hub</h1>
          <p className="text-slate-400 text-sm mt-1">
            Targeted review arena for quiz questions missed in previous assessments.
          </p>
        </div>

        <Badge variant="red" className="py-1 px-3 text-xs">
          {wrongAnswers.length} Questions to Master
        </Badge>
      </div>

      {wrongAnswers.length === 0 ? (
        <GlassCard className="text-center py-16 space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-white">No Missed Questions!</h3>
            <p className="text-slate-400 text-sm mt-1">
              You haven't answered any quiz questions incorrectly yet. Keep up the great study momentum!
            </p>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {wrongAnswers.map((questionObj) => {
            const userChoice = selectedOptions[questionObj.id];
            const isAnswered = userChoice !== undefined;

            return (
              <GlassCard key={questionObj.id} className="space-y-4 border-red-500/20" hoverEffect={false}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase text-red-400 tracking-wider">
                      {questionObj.topic || 'Review Question'}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 leading-relaxed">
                      {questionObj.question}
                    </h3>
                  </div>

                  <button
                    onClick={() => removeWrongAnswer(questionObj.id)}
                    className="p-2 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors shrink-0"
                    title="Mark Mastered & Remove"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </button>
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {questionObj.options.map((opt, idx) => {
                    const isCorrect = idx === questionObj.correctAnswerIndex;
                    const isSelected = userChoice === idx;

                    let bgClass = 'bg-slate-900/80 border-slate-800 hover:border-slate-700';

                    if (isAnswered) {
                      if (isCorrect) {
                        bgClass = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        bgClass = 'bg-red-950/40 border-red-500/60 text-red-200';
                      } else {
                        bgClass = 'bg-slate-950/40 border-slate-800/40 opacity-40';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleTestOption(questionObj.id, idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${bgClass}`}
                      >
                        <span className="font-mono text-slate-400 mr-2">[{String.fromCharCode(65 + idx)}]</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Reveal */}
                {isAnswered && (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-1">
                    <span className="text-brand-300 font-semibold flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explanation:</span>
                    </span>
                    <p className="leading-relaxed">{questionObj.explanation}</p>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => removeWrongAnswer(questionObj.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium"
                      >
                        Mark Mastered
                      </button>
                    </div>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      )}
    </PageWrapper>
  );
}
