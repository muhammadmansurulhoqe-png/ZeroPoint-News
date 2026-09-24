import React from 'react';
import { Clock, Eye, Bookmark, Share2, ChevronRight } from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';

interface CategoryNewsGridProps {
  category: NewsCategory;
  categoryTitle: string;
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onToggleBookmark: (articleId: string) => void;
  bookmarkedIds: Set<string>;
}

export const CategoryNewsGrid: React.FC<CategoryNewsGridProps> = ({
  category,
  categoryTitle,
  articles,
  onSelectArticle,
  onToggleBookmark,
  bookmarkedIds
}) => {
  const filtered = articles.filter((a) => a.category === category);

  if (filtered.length === 0) return null;

  const leadItem = filtered[0];
  const restItems = filtered.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Section Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-red-600">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-red-600 rounded-xs" />
          <span>{categoryTitle}</span>
        </h2>
        <span className="text-xs text-red-600 font-bold hover:underline cursor-pointer">
          আরও সংবাদ →
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Category Lead (7 Cols) */}
        {leadItem && (
          <div 
            onClick={() => onSelectArticle(leadItem)}
            className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={leadItem.image}
                  alt={leadItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                  {leadItem.categoryBn}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(leadItem.id);
                  }}
                  className="absolute top-3 right-3 bg-black/60 p-2 rounded-full text-white hover:bg-red-600 transition"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedIds.has(leadItem.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-gray-800">{leadItem.author.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    {leadItem.publishedAt}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-serif-bn text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {leadItem.title}
                </h3>

                <p className="mt-2.5 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {leadItem.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                {leadItem.views.toLocaleString('bn-BD')} পাঠক
              </span>
              <span className="text-red-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                বিস্তারিত পড়ুন <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        )}

        {/* Category List Items (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {restItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectArticle(item)}
              className="bg-white p-3.5 rounded-xl border border-gray-200 hover:border-red-400 shadow-xs hover:shadow-sm transition cursor-pointer flex gap-3.5 group"
            >
              <div className="w-28 h-20 sm:w-32 sm:h-22 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <h4 className="text-sm sm:text-base font-bold font-serif-bn text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                  <Clock className="w-3 h-3 text-red-500" />
                  <span>{item.publishedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
