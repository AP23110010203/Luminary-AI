import React from 'react';
import { Brain } from 'lucide-react';
import GradientText from '../ui/GradientText';
import ScrollVelocity from '../ui/ScrollVelocity';
import FallingText from '../ui/FallingText';
import AbsoluteSymbol from '../ui/AbsoluteSymbol';

export function Footer() {
  return (
    <footer className="relative z-50 border-t border-slate-800/80 bg-[#090d16]/95 text-slate-400 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#040816] border border-[#00E5FF]/40 flex items-center justify-center p-1">
              <AbsoluteSymbol className="w-5 h-5" />
            </div>
            <GradientText
              colors={['#00E5FF', '#7B61FF', '#FF9FFC', '#4F8CFF']}
              animationSpeed={7}
              showBorder={false}
              className="font-bold text-sm"
            >
              Luminary AI Study Companion
            </GradientText>
          </div>

          <div className="w-full sm:w-[400px] overflow-hidden py-1">
            <ScrollVelocity
              texts={["Structured JSON Generation powered by Google Gemini API & Zod Validation"]}
              velocity={25}
              className="text-xs text-slate-500 font-medium"
              numCopies={3}
            />
          </div>

          <div className="w-full sm:w-auto max-w-[280px]">
            <FallingText
              text="Built with ❤️ for Frontend Engineering"
              highlightWords={["Frontend", "Engineering"]}
              highlightClass="highlighted"
              trigger="click"
              gravity={0.8}
              fontSize="0.8rem"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
