import React, { useState, useEffect } from 'react';
import { BellRing, ChevronLeft, ChevronRight, Pause, Play, Flame } from 'lucide-react';
import { BREAKING_NEWS_ITEMS } from '../data/newsData';

interface BreakingTickerProps {
  onSelectHeadline?: (headline: string) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ onSelectHeadline }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BREAKING_NEWS_ITEMS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BREAKING_NEWS_ITEMS.length) % BREAKING_NEWS_ITEMS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BREAKING_NEWS_ITEMS.length);
  };

  return (
    <div className="w-full bg-slate-900 border-b-2 border-red-600 text-white shadow-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Left Badge: Jamuna-style Breaking News Red Tag */}
        <div className="flex-shrink-0 bg-red-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide shadow-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-300"></span>
          </span>
          <Flame className="w-4 h-4 text-yellow-300 animate-pulse hidden sm:inline" />
          <span className="uppercase tracking-wider">ব্রেকিং নিউজ</span>
        </div>

        {/* Scrolling or Rotating headline display */}
        <div 
          className="flex-1 overflow-hidden px-3 sm:px-4 py-2 cursor-pointer group"
          onClick={() => onSelectHeadline && onSelectHeadline(BREAKING_NEWS_ITEMS[currentIndex])}
        >
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-200 group-hover:text-yellow-300 transition-colors duration-200">
            <span className="text-red-500 font-bold hidden md:inline">●</span>
            <p className="truncate font-medium">
              {BREAKING_NEWS_ITEMS[currentIndex]}
            </p>
          </div>
        </div>

        {/* Right Controls: Pause/Play, Prev/Next, Indicator */}
        <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2 px-2 text-gray-400">
          <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
            {currentIndex + 1}/{BREAKING_NEWS_ITEMS.length}
          </span>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-white rounded hover:bg-slate-800 transition"
            title={isPlaying ? 'বিরতি দিন' : 'চালু করুন'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handlePrev}
            className="p-1 hover:text-white rounded hover:bg-slate-800 transition"
            title="পূর্ববর্তী"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="p-1 hover:text-white rounded hover:bg-slate-800 transition"
            title="পরবর্তী"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
