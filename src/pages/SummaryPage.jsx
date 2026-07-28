import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useStudy } from '../context/StudyContext';
import { SummaryBlock } from '../components/blocks/SummaryBlock';
import TextPressure from '../components/ui/TextPressure';
import ShinyText from '../components/ui/ShinyText';
import FuzzyText from '../components/ui/FuzzyText';
import DecryptedText from '../components/ui/DecryptedText';

export function SummaryPage() {
  const { activeSession } = useStudy();

  const summaryData = activeSession?.data?.summary;

  console.log("React State [SummaryPage]: Current Topic:", activeSession?.topic, "Has Summary:", Boolean(summaryData));

  return (
    <PageWrapper className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="w-full max-w-xl">
          <TextPressure
            text="STUDY SUMMARY & KEY POINTS"
            minFontSize={28}
            textColor="#FFFFFF"
            width={true}
            weight={true}
            italic={false}
            flex={true}
          />
          <div className="w-full flex justify-start text-left mt-1">
            <FuzzyText color="#94a3b8" fontSize="0.875rem" baseIntensity={0.08} hoverIntensity={0.35}>
              Structured topic breakdowns, key takeaways, and collapsible sections with 1-click markdown copy.
            </FuzzyText>
          </div>
        </div>

        <Link
          to="/generate"
          className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-brand-600 to-purple-600 text-white font-medium text-xs rounded-xl shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Topic</span>
        </Link>
      </div>

      {summaryData ? (
        <SummaryBlock summaryBlockData={summaryData} />
      ) : (
        <GlassCard className="text-center py-16 space-y-4">
          <BookOpen className="w-12 h-12 text-pink-400 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-white">
              <ShinyText text="No Summary Generated" color="#e2e8f0" shineColor="#FF9FFC" speed={3} />
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              <DecryptedText text="Generate a new study session to read a structured summary." speed={30} />
            </p>
          </div>
          <Link
            to="/generate"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-600 text-white font-semibold text-sm rounded-xl"
          >
            <span>Generate Study Kit</span>
          </Link>
        </GlassCard>
      )}
    </PageWrapper>
  );
}
