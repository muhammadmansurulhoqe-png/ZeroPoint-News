import React, { useState } from 'react';
import { MapPin, ChevronRight, Clock, Building2, Filter } from 'lucide-react';
import { NewsArticle } from '../types';
import { DIVISIONS_AND_DISTRICTS, Division } from '../data/districts';

interface DistrictNewsSectionProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const DistrictNewsSection: React.FC<DistrictNewsSectionProps> = ({
  articles,
  onSelectArticle
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Filter district articles
  const districtArticles = articles.filter((a) => {
    if (selectedDivision === 'all') {
      return a.category === 'district' || a.division !== undefined;
    }
    if (selectedDistrict !== 'all') {
      return a.district === selectedDistrict;
    }
    return a.division === selectedDivision;
  });

  // Current active division object
  const currentDivObj = DIVISIONS_AND_DISTRICTS.find((d) => d.id === selectedDivision);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-6 border-b-2 border-red-600 gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 text-white p-1.5 rounded">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900">
              সারাদেশ <span className="text-red-600">ও জেলা সংবাদ</span>
            </h2>
            <p className="text-xs text-gray-500">৬৪ জেলার তৃণমূলের খবরাখবর ও প্রত্যন্ত অঞ্চলের মানুষের কথা</p>
          </div>
        </div>

        {/* District dropdown filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium hidden sm:inline">জেলা বেছে নিন:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={selectedDivision === 'all'}
            className="text-xs bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50 disabled:bg-gray-100"
          >
            <option value="all">সব জেলা</option>
            {currentDivObj?.districts.map((dist) => (
              <option key={dist.id} value={dist.id}>
                {dist.nameBn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Division Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-6">
        <button
          onClick={() => {
            setSelectedDivision('all');
            setSelectedDistrict('all');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition cursor-pointer whitespace-nowrap ${
            selectedDivision === 'all'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          সব বিভাগ
        </button>

        {DIVISIONS_AND_DISTRICTS.map((div) => {
          const isActive = selectedDivision === div.id;
          return (
            <button
              key={div.id}
              onClick={() => {
                setSelectedDivision(div.id);
                setSelectedDistrict('all');
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {div.nameBn}
            </button>
          );
        })}
      </div>

      {/* District News Content Grid */}
      {districtArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {districtArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                    {article.author.location || 'সারাদেশ'}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                    <Clock className="w-3 h-3 text-red-500" />
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.author.name}</span>
                  </div>

                  <h3 className="text-base font-bold font-serif-bn text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between text-xs text-red-600 font-semibold border-t border-gray-50 mt-2">
                <span>সম্পূর্ণ সংবাদ</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
          <p className="text-sm font-medium">এই নির্বাচিত জেলা/বিভাগের কোনো খবর এই মুহূর্তে নেই।</p>
          <button
            onClick={() => {
              setSelectedDivision('all');
              setSelectedDistrict('all');
            }}
            className="mt-2 text-xs text-red-600 font-bold hover:underline cursor-pointer"
          >
            সব বিভাগের সংবাদ দেখুন
          </button>
        </div>
      )}
    </section>
  );
};
