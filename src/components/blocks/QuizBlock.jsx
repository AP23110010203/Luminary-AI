import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, RefreshCw, AlertCircle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { useStudy } from '../../context/StudyContext';

export function QuizBlock({ quizBlockData, className = '' }) {
  const { questions = [], topic } = quizBlockData || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Synchronize state when questions prop updates from a new AI generation
  React.useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setUserAnswers([]);
    setIsCompleted(false);
  }, [questions]);

  const { logWrongAnswer } = useStudy();

  const currentQuestion = questions[currentIndex] || null;

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return; // Prevent changing answer once selected

    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      // Log wrong answer to context & storage
      logWrongAnswer(currentQuestion, topic);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        selectedIndex: index,
        correctIndex: currentQuestion.correctAnswerIndex,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      // Trigger festive confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback if confetti script blocked
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setUserAnswers([]);
    setIsCompleted(false);
  };

  if (!questions || questions.length === 0) {
    return (
      <GlassCard className="text-center py-12">
        <p className="text-slate-400">No quiz questions available for this topic.</p>
      </GlassCard>
    );
  }

  // Quiz Summary End Screen
  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <GlassCard className={`text-center py-10 px-6 ${className}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto space-y-6"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-brand-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl shadow-brand-500/20">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Quiz Completed!</h3>
            <p className="text-slate-400 text-sm">Topic: {topic || 'Study Session'}</p>
          </div>

          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="text-4xl font-extrabold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
              {score} / {questions.length}
            </div>
            <div className="text-sm font-semibold text-slate-300">
              Score: {percentage}%
            </div>
            <p className="text-xs text-slate-400">
              {percentage >= 80
                ? 'Outstanding performance! You have mastered this concept.'
                : percentage >= 50
                ? 'Good effort! Review the missed questions to achieve perfection.'
                : 'Keep practicing! Check out the wrong answers page to reinforce your learning.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center space-x-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-brand-500/25"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restart Quiz</span>
            </button>
          </div>
        </motion.div>
      </GlassCard>
    );
  }

  const isAnswered = selectedOption !== null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-semibold text-brand-400 tracking-wider">
            {topic || 'Quiz Assessment'}
          </span>
          <h3 className="text-lg font-bold text-white">Question {currentIndex + 1} of {questions.length}</h3>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="purple">Score: {score}</Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/60 h-2 rounded-full overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-brand-500 to-emerald-500 h-full rounded-full"
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <GlassCard className="space-y-6" hoverEffect={false}>
        <h4 className="text-xl font-semibold text-white leading-relaxed">
          {currentQuestion.question}
        </h4>

        {/* Options List */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctAnswerIndex;

            let borderStyle = 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700';
            let icon = null;

            if (isAnswered) {
              if (isCorrect) {
                borderStyle = 'border-emerald-500/80 bg-emerald-950/30 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
              } else if (isSelected && !isCorrect) {
                borderStyle = 'border-red-500/80 bg-red-950/30 text-red-100';
                icon = <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
              } else {
                borderStyle = 'border-slate-800/50 bg-slate-950/40 opacity-50';
              }
            }

            return (
              <motion.button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                whileTap={!isAnswered ? { scale: 0.99 } : undefined}
                className={`
                  w-full text-left p-4 rounded-xl border font-medium text-sm transition-all duration-200 
                  flex items-center justify-between space-x-3 ${borderStyle}
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-mono text-slate-300 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
                {icon}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-brand-950/30 border border-brand-500/30 rounded-xl text-sm space-y-1 text-slate-200"
            >
              <div className="flex items-center space-x-2 text-brand-300 font-semibold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Explanation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQuestion.explanation || 'No detailed explanation provided for this question.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Question Footer Button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-brand-500/20 transition-all active:scale-95"
            >
              <span>{currentIndex + 1 === questions.length ? 'View Final Results' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
