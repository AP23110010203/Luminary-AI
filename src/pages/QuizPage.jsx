import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useStudy } from '../context/StudyContext';
import { QuizBlock } from '../components/blocks/QuizBlock';
import TextPressure from '../components/ui/TextPressure';
import ShinyText from '../components/ui/ShinyText';
import FuzzyText from '../components/ui/FuzzyText';
import DecryptedText from '../components/ui/DecryptedText';

export function QuizPage() {
  const { activeSession } = useStudy();

  const quizData = activeSession?.data?.quiz;

  console.log("React State [QuizPage]: Current Topic:", activeSession?.topic, "Questions Count:", quizData?.questions?.length);

  return (
    <PageWrapper className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="w-full max-w-xl">
          <TextPressure
            text="ASSESSMENT QUIZ ARENA"
            minFontSize={28}
            textColor="#FFFFFF"
            width={true}
            weight={true}
            italic={false}
            flex={true}
          />
          <div className="w-full flex justify-start text-left mt-1">
            <FuzzyText color="#94a3b8" fontSize="0.875rem" baseIntensity={0.08} hoverIntensity={0.35}>
              Test your knowledge with multiple choice questions, real-time score tracking, and option explanations.
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

      {quizData ? (
        <QuizBlock quizBlockData={quizData} />
      ) : (
        <GlassCard className="text-center py-16 space-y-4">
          <HelpCircle className="w-12 h-12 text-brand-400 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-white">
              <ShinyText text="No Quiz Available" color="#e2e8f0" shineColor="#00E5FF" speed={3} />
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              <DecryptedText text="Generate a study topic or select an active session from your Dashboard to start a quiz." speed={30} />
            </p>
          </div>
          <Link
            to="/generate"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-600 text-white font-semibold text-sm rounded-xl"
          >
            <span>Generate Assessment Quiz</span>
          </Link>
        </GlassCard>
      )}
    </PageWrapper>
  );
}
