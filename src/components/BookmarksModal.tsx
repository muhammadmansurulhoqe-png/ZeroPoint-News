import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Clock } from 'lucide-react';
import { NewsArticle } from '../types';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onRemoveBookmark: (articleId: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gray-900 text-white flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h3 className="font-bold text-base font-display">সংরক্ষিত খবর ({articles.length})</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded-full cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {articles.length > 0 ? (
            articles.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-200 hover:border-red-400 transition bg-white"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => {
                    onSelectArticle(item);
                    onClose();
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-14 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-red-600 uppercase">{item.categoryBn}</span>
                    <h4 className="text-xs sm:text-sm font-bold font-serif-bn text-gray-900 line-clamp-1 hover:text-red-600 transition">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-red-500" />
                      {item.publishedAt}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveBookmark(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Bookmark className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium text-gray-600">কোনো খবর এখনও সংরক্ষিত করা হয়নি।</p>
              <p className="text-xs text-gray-400 mt-1">
                পছন্দের খবরের বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
