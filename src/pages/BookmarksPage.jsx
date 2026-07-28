import React, { useState } from 'react';
import { Bookmark, Trash2, Search, Layers, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useStudy } from '../context/StudyContext';

export function BookmarksPage() {
  const { bookmarks, toggleBookmarkItem } = useStudy();
  const [search, setSearch] = useState('');

  const filtered = bookmarks.filter((item) =>
    (item.question || item.title || item.task || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Saved Bookmarks</h1>
          <p className="text-slate-400 text-sm mt-1">
            Access all bookmarked flashcards and study items across sessions in one place.
          </p>
        </div>

        <Badge variant="purple" className="py-1 px-3 text-xs">
          {bookmarks.length} Bookmarked Items
        </Badge>
      </div>

      {/* Search Input */}
      {bookmarks.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved bookmarks..."
            className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>
      )}

      {/* Bookmarks Grid */}
      {bookmarks.length === 0 ? (
        <GlassCard className="text-center py-16 space-y-4">
          <Bookmark className="w-12 h-12 text-amber-400/60 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-white">No Bookmarks Saved Yet</h3>
            <p className="text-slate-400 text-sm mt-1">
              Click the bookmark button on flashcards or study blocks to save them for quick reference.
            </p>
          </div>
        </GlassCard>
      ) : filtered.length === 0 ? (
        <GlassCard className="text-center py-12">
          <p className="text-slate-400 text-sm">No bookmarks matching "{search}".</p>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <GlassCard key={item.id} className="p-5 flex flex-col justify-between space-y-3" hoverEffect={false}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
                    {item.topic || 'Flashcard'}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                    {item.question || item.title || item.task}
                  </h3>
                </div>

                <button
                  onClick={() => toggleBookmarkItem(item)}
                  className="p-2 text-amber-400 hover:text-red-400 bg-amber-500/10 hover:bg-red-500/10 rounded-xl transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {item.answer && (
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300">
                  <span className="text-purple-300 font-semibold block mb-0.5">Answer:</span>
                  <p>{item.answer}</p>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
