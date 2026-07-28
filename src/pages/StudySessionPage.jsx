import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, HelpCircle, BookOpen, CheckSquare, Network, LayoutGrid, Sparkles, Brain, Bookmark } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useStudy } from '../context/StudyContext';

import { FlashcardBlock } from '../components/blocks/FlashcardBlock';
import { QuizBlock } from '../components/blocks/QuizBlock';
import { SummaryBlock } from '../components/blocks/SummaryBlock';
import { ChecklistBlock } from '../components/blocks/ChecklistBlock';
import { KnowledgeGraphBlock } from '../components/blocks/KnowledgeGraphBlock';

export function StudySessionPage() {
  const { activeSession } = useStudy();
  const [activeTab, setActiveTab] = useState('all');

  if (!activeSession || !activeSession.data) {
    return (
      <PageWrapper className="text-center py-16 max-w-xl mx-auto space-y-6">
        <div className="w-16 h-16 mx-auto bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400">
          <Brain className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">No Active Study Session Selected</h2>
          <p className="text-slate-400 text-sm mt-2">
            Select a study session from your Dashboard or generate a new study topic kit to start learning.
          </p>
        </div>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            to="/generate"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl"
          >
            Generate New Topic
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl"
          >
            Go to Dashboard
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const { data, topic } = activeSession;
  const graphData = data.knowledgeGraph || { topic, nodes: [], edges: [] };

  const tabs = [
    { id: 'all', label: 'All Modules', icon: LayoutGrid },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'flashcards', label: 'Flashcards', icon: Layers, count: data.flashcards?.cards?.length },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, count: data.quiz?.questions?.length },
    { id: 'summary', label: 'Summary', icon: BookOpen },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare, count: data.checklist?.items?.length },
  ];

  return (
    <PageWrapper className="space-y-8">
      {/* Session Title Header */}
      <GlassCard className="space-y-4" hoverEffect={false}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge variant="purple" className="mb-1">Active Study Room</Badge>
            <h1 className="text-3xl font-extrabold text-white">{topic}</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Generated on {new Date(activeSession.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Link
            to="/generate"
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
          >
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Generate Another Topic</span>
          </Link>
        </div>

        {/* Tab Selector Navigation Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto pt-2 pb-1 border-t border-slate-800/80">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-500/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Render Active Tab Block */}
      {activeTab === 'all' && (
        <div className="space-y-12">
          {data.summary && <SummaryBlock summaryBlockData={data.summary} />}
          <KnowledgeGraphBlock knowledgeGraphData={graphData} />
          {data.flashcards && <FlashcardBlock flashcardBlockData={data.flashcards} />}
          {data.quiz && <QuizBlock quizBlockData={data.quiz} />}
          {data.checklist && <ChecklistBlock checklistBlockData={data.checklist} />}
        </div>
      )}

      {activeTab === 'graph' && (
        <KnowledgeGraphBlock knowledgeGraphData={graphData} />
      )}

      {activeTab === 'flashcards' && data.flashcards && (
        <FlashcardBlock flashcardBlockData={data.flashcards} />
      )}

      {activeTab === 'quiz' && data.quiz && (
        <QuizBlock quizBlockData={data.quiz} />
      )}

      {activeTab === 'summary' && data.summary && (
        <SummaryBlock summaryBlockData={data.summary} />
      )}

      {activeTab === 'checklist' && data.checklist && (
        <ChecklistBlock checklistBlockData={data.checklist} />
      )}
    </PageWrapper>
  );
}
