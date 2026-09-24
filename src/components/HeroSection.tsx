import React, { useState } from 'react';
import { Play, Tv, Clock, Eye, Flame, Bookmark, ArrowRight, Radio } from 'lucide-react';
import { NewsArticle } from '../types';

interface HeroSectionProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onOpenLiveTv: () => void;
  onToggleBookmark: (articleId: string) => void;
  bookmarkedIds: Set<string>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  articles,
  onSelectArticle,
  onOpenLiveTv,
  onToggleBookmark,
  bookmarkedIds
}) => {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');

  // Find lead article or fallback to first
  const leadArticle = articles.find((a) => a.isLead) || articles[0];
  const subLeads = articles.filter((a) => a.id !== leadArticle?.id).slice(0, 2);

  // Latest news vs popular news
  const latestArticles = [...articles].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  if (!leadArticle) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= LEFT & CENTER: Lead & Sub-Leads (8 Cols) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* 1. MAIN LEAD STORY (শীর্ষ সংবাদ) */}
          <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition">
            <div className="relative overflow-hidden cursor-pointer" onClick={() => onSelectArticle(leadArticle)}>
              <img
                src={leadArticle.image}
                alt={leadArticle.title}
                className="w-full h-64 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-red-600 text-white font-bold text-xs uppercase px-2.5 py-1 rounded shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  শীর্ষ সংবাদ
                </span>
                <span className="bg-black/60 backdrop-blur-sm text-yellow-300 font-semibold text-xs px-2.5 py-1 rounded border border-yellow-400/30">
                  {leadArticle.categoryBn}
                </span>
              </div>

              {/* Bookmark Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(leadArticle.id);
                }}
                className="absolute top-4 right-4 bg-black/60 hover:bg-red-600 backdrop-blur-sm p-2 rounded-full text-white transition cursor-pointer"
                title="বুকমার্ক করুন"
              >
                <Bookmark
                  className={`w-4 h-4 ${bookmarkedIds.has(leadArticle.id) ? 'fill-yellow-400 text-yellow-400' : ''}`}
                />
              </button>

              {/* Bottom Title on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="flex items-center gap-3 text-xs text-gray-300 mb-2">
                  <span className="font-medium text-white">{leadArticle.author.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    {leadArticle.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    {leadArticle.views.toLocaleString('bn-BD')} বার পঠিত
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-bn leading-snug group-hover:text-red-300 transition-colors">
                  {leadArticle.title}
                </h1>
              </div>
            </div>

            {/* Snippet & Read Full Story */}
            <div className="p-4 sm:p-6 bg-white">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3">
                {leadArticle.summary}
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium">
                  পড়তে সময় লাগবে: {leadArticle.readTime}
                </span>
                <button
                  onClick={() => onSelectArticle(leadArticle)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 cursor-pointer group-hover:translate-x-1 transition-transform"
                >
                  <span>সম্পূর্ণ খবর পড়ুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>

          {/* 2. SUB-LEADS (২টি গুরুত্বপূর্ণ খবর পাশাপাশি) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {subLeads.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                      {article.categoryBn}
                    </span>
                    {article.isSpecialReport && (
                      <span className="absolute top-2 right-2 bg-amber-500 text-black text-[11px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        অনুসন্ধান
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                      <Clock className="w-3 h-3 text-red-500" />
                      <span>{article.publishedAt}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-serif-bn text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-gray-500 border-t border-gray-50">
                  <span>{article.author.name}</span>
                  <span className="text-red-600 font-semibold group-hover:underline">বিস্তারিত →</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Live TV Box & Latest/Popular Tab (4 Cols) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* 1. LIVE TV STREAM CARD (Jamuna-Style 24/7 Studio Stream Box) */}
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-red-600/40 text-white">
            <div className="p-3 bg-gradient-to-r from-red-700 via-red-600 to-red-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
                </span>
                <span className="font-display font-black tracking-wider text-xs uppercase">
                  ZERO POINT LIVE
                </span>
              </div>
              <span className="text-[11px] bg-black/40 px-2 py-0.5 rounded text-red-200 font-mono flex items-center gap-1">
                <Eye className="w-3 h-3 text-red-400" />
                ১২,৪৮০ জন দেখছেন
              </span>
            </div>

            {/* Broadcast Screen Mockup */}
            <div 
              className="relative aspect-video bg-black cursor-pointer group overflow-hidden"
              onClick={onOpenLiveTv}
            >
              <img
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=720&q=80"
                alt="ZeroPoint Live Studio"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

              {/* Big Red Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-red-600/90 group-hover:bg-red-600 group-hover:scale-110 rounded-full flex items-center justify-center shadow-xl transition-all border-2 border-white/80">
                  <Play className="w-6 h-6 text-white ml-1 fill-white" />
                </div>
              </div>

              {/* Lower-third ticker on screen */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-red-950/95 via-red-900/90 to-transparent p-2.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-yellow-300">
                  <Radio className="w-3 h-3 animate-pulse text-red-400" />
                  <span>এখন চলছে: জিরো পয়েন্ট স্পেশাল বুলেটিন</span>
                </div>
                <p className="text-xs text-white truncate font-medium mt-0.5">
                  দেশের সাম্প্রতিক পরিস্থিতি নিয়ে সরাসরি বিশ্লেষণ ও মাঠের খবর...
                </p>
              </div>

              {/* Top right HD tag */}
              <div className="absolute top-2 right-2 bg-black/70 text-[10px] font-mono px-1.5 py-0.5 rounded text-white border border-gray-600">
                1080p HD
              </div>
            </div>

            {/* Action Bar below video */}
            <div className="p-3 bg-slate-950 flex items-center justify-between text-xs">
              <span className="text-gray-400">২৪ ঘণ্টা অবিরাম সরাসরি সম্প্রচার</span>
              <button
                onClick={onOpenLiveTv}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 rounded transition flex items-center gap-1 cursor-pointer"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>ফুল স্ক্রিন দেখুন</span>
              </button>
            </div>
          </div>

          {/* 2. TABS: Latest vs Most Read (তাজা খবর / সর্বাধিক পঠিত) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1">
            {/* Tab Header */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              <button
                onClick={() => setActiveTab('latest')}
                className={`flex-1 py-3 text-center text-sm font-bold transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'latest'
                    ? 'border-red-600 text-red-600 bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                তাজা খবর
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`flex-1 py-3 text-center text-sm font-bold transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'popular'
                    ? 'border-red-600 text-red-600 bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                সর্বাধিক পঠিত
              </button>
            </div>

            {/* News List */}
            <div className="divide-y divide-gray-100 p-2">
              {(activeTab === 'latest' ? latestArticles : popularArticles).map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => onSelectArticle(item)}
                  className="p-3 hover:bg-red-50/50 rounded-lg transition cursor-pointer flex gap-3 group"
                >
                  {/* Number Badge (১, ২, ৩...) */}
                  <div className="flex-shrink-0 flex items-start pt-0.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        idx === 0
                          ? 'bg-red-600 text-white'
                          : idx === 1
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {(idx + 1).toLocaleString('bn-BD')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold font-serif-bn text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
                      <span className="text-red-600 font-medium">{item.categoryBn}</span>
                      <span>•</span>
                      <span>{item.publishedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
