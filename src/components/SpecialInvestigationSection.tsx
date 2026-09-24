import React from 'react';
import { ShieldAlert, Flame, Eye, Clock, ArrowRight, PlayCircle } from 'lucide-react';
import { NewsArticle } from '../types';

interface SpecialInvestigationSectionProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const SpecialInvestigationSection: React.FC<SpecialInvestigationSectionProps> = ({
  articles,
  onSelectArticle
}) => {
  // Filter special reports or crime stories
  const investigativeArticles = articles
    .filter((a) => a.isSpecialReport || a.category === 'crime' || a.category === 'special')
    .slice(0, 3);

  if (investigativeArticles.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white py-10 my-8 shadow-inner border-y-2 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-extrabold text-xs uppercase tracking-widest mb-1">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>এক্সক্লুসিভ অনুসন্ধানী সেল</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
              <span>জিরো পয়েন্ট</span>
              <span className="text-red-500">ইনভেস্টিগেশন</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              মুখোশ উন্মোচনে আপসহীন সত্য— দুর্নীতির শিকড়ে আমাদের ক্যামেরার চোখ
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-red-600/30 text-red-300 text-xs font-mono px-3 py-1 rounded-full border border-red-500/40 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              অনুসন্ধান ৩৬০°
            </span>
          </div>
        </div>

        {/* Investigative Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {investigativeArticles.map((item, idx) => (
            <article
              key={item.id}
              onClick={() => onSelectArticle(item)}
              className="bg-slate-900/90 rounded-xl overflow-hidden border border-gray-800 hover:border-red-600/70 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-red-600 text-white font-bold text-[11px] px-2 py-0.5 rounded shadow">
                      গোপন অনুসন্ধান
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 text-xs bg-black/70 px-2 py-0.5 rounded text-gray-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-red-400" />
                    <span>{item.publishedAt}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs text-red-400 mb-2 font-medium">
                    <span>{item.author.role}</span>
                    <span>•</span>
                    <span>{item.author.name}</span>
                  </div>

                  <h3 className="text-lg font-bold font-serif-bn leading-snug text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-gray-400 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-gray-800/60 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1 text-gray-400">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  {item.views.toLocaleString('bn-BD')} পাঠক
                </span>
                <span className="text-red-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  পুরো অনুসন্ধান পড়ুন <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
