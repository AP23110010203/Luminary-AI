import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Shuffle, CheckCircle, RotateCw, ChevronLeft, ChevronRight, Sparkles, HelpCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { useStudy } from '../../context/StudyContext';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export function FlashcardBlock({ flashcardBlockData, className = '' }) {
  const { cards: rawCards = [], topic } = flashcardBlockData || {};
  const [cards, setCards] = useState(rawCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Synchronize state when rawCards prop updates from a new AI generation
  React.useEffect(() => {
    setCards(rawCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  }, [rawCards]);

  const { bookmarks, toggleBookmarkItem, isBookmarked, masteredCards, toggleMasteredCard } = useStudy();

  const currentCard = cards[currentIndex] || null;

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  // Bind keyboard shortcuts: Space to flip, ArrowLeft for prev, ArrowRight for next
  useKeyboardShortcuts({
    ' ': handleFlip,
    'ArrowLeft': handlePrev,
    'ArrowRight': handleNext,
  });

  if (!currentCard) {
    return (
      <GlassCard className="text-center py-12">
        <p className="text-slate-400">No flashcards available in this study block.</p>
      </GlassCard>
    );
  }

  const bookmarked = isBookmarked(currentCard.id);
  const isMastered = Boolean(masteredCards[currentCard.id]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Header & Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">{topic || 'Flashcards'}</span>
            <Badge variant="purple">{cards.length} Cards</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Use <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300 font-mono text-[10px]">Space</kbd> to flip • <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300 font-mono text-[10px]">→</kbd> to navigate
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShuffle}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors border border-slate-700"
            title="Shuffle deck"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>

          <button
            onClick={() => toggleBookmarkItem(currentCard)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
              bookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
            <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/60 h-2 rounded-full overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-brand-500 to-purple-500 h-full rounded-full"
          animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* 3D Animated Flip Card Container */}
      <div className="perspective-1000 min-h-[280px] sm:min-h-[320px] relative">
        <motion.div
          className="w-full h-full relative cursor-pointer select-none"
          onClick={handleFlip}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT FACE */}
          <GlassCard
            glow={!isFlipped}
            className={`
              w-full min-h-[280px] sm:min-h-[320px] flex flex-col justify-between p-8 
              backface-hidden border-brand-500/30 bg-slate-900/80
              ${isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'}
            `}
            hoverEffect={false}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Card {currentIndex + 1} of {cards.length}</span>
              <Badge variant={currentCard.difficulty === 'hard' ? 'red' : currentCard.difficulty === 'easy' ? 'emerald' : 'amber'}>
                {currentCard.difficulty || 'medium'}
              </Badge>
            </div>

            <div className="my-auto py-6 text-center">
              <span className="text-xs uppercase tracking-wider text-brand-400 font-semibold mb-2 block">
                {currentCard.topic || 'Question'}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
                {currentCard.question}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHint(!showHint);
                }}
                className="flex items-center space-x-1 text-slate-400 hover:text-brand-300 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? currentCard.hint || 'No hint available' : 'Show Hint'}</span>
              </button>

              <div className="flex items-center space-x-1 text-brand-400">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click to Flip</span>
              </div>
            </div>
          </GlassCard>

          {/* BACK FACE */}
          <GlassCard
            glow={isFlipped}
            className={`
              w-full min-h-[280px] sm:min-h-[320px] flex flex-col justify-between p-8 
              absolute inset-0 border-purple-500/40 bg-purple-950/20 backdrop-blur-xl
              ${!isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'}
            `}
            style={{ transform: 'rotateY(180deg)', backfaceHidden: 'hidden' }}
            hoverEffect={false}
          >
            <div className="flex items-center justify-between text-xs text-purple-300">
              <span className="font-semibold">Answer</span>
              <span className="text-slate-400 font-mono">Card {currentIndex + 1} of {cards.length}</span>
            </div>

            <div className="my-auto py-6 text-center">
              <p className="text-lg sm:text-xl font-medium text-purple-100 leading-relaxed whitespace-pre-line">
                {currentCard.answer}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-purple-500/20 text-xs text-slate-400">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMasteredCard(currentCard.id);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg transition-colors ${
                  isMastered
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <CheckCircle className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-400' : ''}`} />
                <span>{isMastered ? 'Mastered!' : 'Mark Mastered'}</span>
              </button>

              <div className="flex items-center space-x-1 text-purple-400">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Flip Back</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Pagination Footer Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-xl font-medium text-sm transition-colors border border-slate-700"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          {currentIndex + 1} / {cards.length}
        </span>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium text-sm transition-colors shadow-lg shadow-brand-500/20"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
