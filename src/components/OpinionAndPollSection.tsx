import React, { useState } from 'react';
import { Vote, CheckCircle2, MessageSquare, Feather, Share2, Award } from 'lucide-react';
import { PollData, NewsArticle } from '../types';
import { INITIAL_POLL } from '../data/newsData';

interface OpinionAndPollSectionProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const OpinionAndPollSection: React.FC<OpinionAndPollSectionProps> = ({
  articles,
  onSelectArticle
}) => {
  const [poll, setPoll] = useState<PollData>(INITIAL_POLL);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Filter opinion articles
  const opinionArticles = articles.filter((a) => a.category === 'opinion').slice(0, 2);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    setSelectedOption(optionId);
    setHasVoted(true);

    setPoll((prev) => {
      const updatedOptions = prev.options.map((opt) => {
        if (opt.id === optionId) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });
      return {
        ...prev,
        options: updatedOptions,
        totalVotes: prev.totalVotes + 1,
        userVotedOptionId: optionId
      };
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= LEFT: Daily Public Poll (5 Cols) ================= */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vote className="w-5 h-5 text-yellow-300" />
                <h3 className="font-bold text-base font-display">আজকের জনমত জরিপ (অনলাইন ভোট)</h3>
              </div>
              <span className="text-[11px] bg-red-900/60 px-2 py-0.5 rounded text-red-100">
                {poll.expiresAt}
              </span>
            </div>

            {/* Poll Question */}
            <div className="p-5">
              <p className="text-base font-bold font-serif-bn text-gray-900 leading-relaxed mb-4">
                {poll.question}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {poll.options.map((opt) => {
                  const percentage = Math.round((opt.votes / poll.totalVotes) * 100);
                  const isUserPick = selectedOption === opt.id;

                  return (
                    <div key={opt.id} className="relative">
                      {!hasVoted ? (
                        <button
                          onClick={() => handleVote(opt.id)}
                          className="w-full text-left p-3.5 rounded-lg border border-gray-300 hover:border-red-500 hover:bg-red-50/40 transition flex items-center justify-between text-sm font-medium text-gray-800 cursor-pointer group"
                        >
                          <span className="group-hover:text-red-600 transition">{opt.text}</span>
                          <span className="w-4 h-4 rounded-full border border-gray-400 group-hover:border-red-600 flex-shrink-0" />
                        </button>
                      ) : (
                        <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 relative overflow-hidden">
                          {/* Progress bar background */}
                          <div
                            className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ${
                              isUserPick ? 'bg-red-200/70' : 'bg-gray-200/60'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />

                          <div className="relative flex items-center justify-between text-xs font-semibold text-gray-800">
                            <span className="flex items-center gap-1.5">
                              {isUserPick && <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />}
                              <span>{opt.text}</span>
                            </span>
                            <span className="font-mono text-sm text-red-600 font-bold ml-2">
                              {percentage}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>মোট ভোট পড়েছে: {poll.totalVotes.toLocaleString('bn-BD')} টি</span>
            {hasVoted ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                ✓ আপনার ভোট গৃহীত হয়েছে
              </span>
            ) : (
              <span className="text-red-600 font-medium">ভোট দিতে অপশনে ক্লিক করুন</span>
            )}
          </div>
        </div>

        {/* ================= RIGHT: Editorial & Opinion Columns (7 Cols) ================= */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-red-600">
            <div className="flex items-center gap-2">
              <Feather className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-bold font-display text-gray-900">
                সম্পাদকীয় <span className="text-red-600">ও মতামত</span>
              </h3>
            </div>
            <span className="text-xs text-gray-500">বিশেষজ্ঞ কলামিস্টদের দৃষ্টিভঙ্গি</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {opinionArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Author avatar & info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 font-bold font-serif-bn text-lg flex items-center justify-center border-2 border-red-200 shadow-xs">
                      {article.author.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition">
                        {article.author.name}
                      </h4>
                      <p className="text-[11px] text-gray-500">{article.author.role}</p>
                    </div>
                  </div>

                  <h3 className="text-base font-bold font-serif-bn text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3 leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>{article.readTime} পড়া</span>
                  <span className="text-red-600 font-semibold group-hover:underline">পুরো কলাম পড়ুন →</span>
                </div>
              </article>
            ))}
          </div>

          {/* Quote banner */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl text-red-500 font-serif font-black leading-none">“</span>
              <p className="text-xs sm:text-sm text-gray-200 font-serif-bn italic">
                সংবাদমাধ্যম গণতন্ত্রের চতুর্থ স্তম্ভ। সঠিক তথ্যই সমাজ পরিবর্তনের মূল শক্তি।
              </p>
            </div>
            <span className="text-xs font-semibold text-yellow-300 hidden sm:inline whitespace-nowrap">
              — জিরো পয়েন্ট সম্পাদকীয়
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
