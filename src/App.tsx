/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { MarketAndSportsBar } from './components/MarketAndSportsBar';
import { HeroSection } from './components/HeroSection';
import { SpecialInvestigationSection } from './components/SpecialInvestigationSection';
import { VideoSection } from './components/VideoSection';
import { DistrictNewsSection } from './components/DistrictNewsSection';
import { OpinionAndPollSection } from './components/OpinionAndPollSection';
import { CategoryNewsGrid } from './components/CategoryNewsGrid';
import { ArticleModal } from './components/ArticleModal';
import { LiveTvModal } from './components/LiveTvModal';
import { SubmitNewsModal } from './components/SubmitNewsModal';
import { PrayerWeatherModal } from './components/PrayerWeatherModal';
import { BookmarksModal } from './components/BookmarksModal';
import { Footer } from './components/Footer';

import { NewsArticle, NewsCategory } from './types';
import { INITIAL_NEWS } from './data/newsData';

export default function App() {
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [currentCategory, setCurrentCategory] = useState<NewsCategory | 'all'>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isLiveTvOpen, setIsLiveTvOpen] = useState(false);
  const [isSubmitNewsOpen, setIsSubmitNewsOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('zp_bookmarked_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set(['lead-1']);
    } catch {
      return new Set(['lead-1']);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zp_bookmarked_ids', JSON.stringify(Array.from(bookmarkedIds)));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(articleId)) {
        next.delete(articleId);
      } else {
        next.add(articleId);
      }
      return next;
    });
  };

  // Filtered articles when searching or category selected
  const filteredArticles = articles.filter((article) => {
    // If search active
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchSummary = article.summary.toLowerCase().includes(q);
      const matchTag = article.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchSummary || matchTag;
    }
    // If category active
    if (currentCategory !== 'all') {
      return article.category === currentCategory;
    }
    return true;
  });

  const bookmarkedArticles = articles.filter((a) => bookmarkedIds.has(a.id));

  // Category labels map
  const categoryLabels: Record<NewsCategory, string> = {
    national: 'জাতীয় সংবাদ',
    politics: 'রাজনীতি ও নির্বাচন',
    special: 'বিশেষ অনুসন্ধানী প্রতিবেদন',
    crime: 'অপরাধ ও আদালত',
    international: 'আন্তর্জাতিক ও কূটনীতি',
    economy: 'অর্থনীতি ও ব্যবসা-বাণিজ্য',
    sports: 'খেলাধুলা ও ক্রিকেট',
    district: 'সারাদেশ ও জেলা সংবাদ',
    tech: 'তথ্যপ্রযুক্তি ও গ্যাজেট',
    entertainment: 'বিনোদন ও সংস্কৃতি',
    lifestyle: 'লাইফস্টাইল ও স্বাস্থ্য',
    opinion: 'সম্পাদকীয় ও মতামত',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-gray-900 font-sans">
      {/* 1. Top Header & Navigation */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLiveTv={() => setIsLiveTvOpen(true)}
        onOpenSubmitNews={() => setIsSubmitNewsOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        savedCount={bookmarkedIds.size}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Jamuna-style Breaking News Ticker */}
      <BreakingTicker
        onSelectHeadline={(headline) => {
          const match = articles.find((a) => a.title.includes(headline.slice(0, 15)));
          if (match) setSelectedArticle(match);
          else if (articles[0]) setSelectedArticle(articles[0]);
        }}
      />

      {/* 3. Market Rates & Live Cricket Sports Bar */}
      <MarketAndSportsBar />

      {/* 4. MAIN CONTENT AREA */}
      <main className="flex-1 pb-12">
        {/* If user searched or selected a specific category */}
        {searchQuery.trim() ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 flex items-center justify-between border-b pb-3">
              <h2 className="text-xl font-bold text-gray-900">
                অনুসন্ধানের ফলাফল: <span className="text-red-600">"{searchQuery}"</span>
              </h2>
              <span className="text-xs text-gray-500">{filteredArticles.length}টি খবর পাওয়া গেছে</span>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-red-600 font-bold">{article.categoryBn}</span>
                        <h3 className="text-base font-bold font-serif-bn text-gray-900 mt-1 group-hover:text-red-600 transition line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">{article.summary}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 text-xs text-gray-400 flex items-center justify-between border-t border-gray-100">
                      <span>{article.publishedAt}</span>
                      <span className="text-red-600 font-semibold">বিস্তারিত পড়ুন →</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center text-gray-500">
                <p className="text-base font-semibold">কোনো খবর খুঁজে পাওয়া যায়নি।</p>
                <p className="text-xs text-gray-400 mt-1">অন্য কোনো শব্দ দিয়ে চেষ্টা করুন।</p>
              </div>
            )}
          </div>
        ) : currentCategory !== 'all' ? (
          /* Specific Category Page */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 flex items-center justify-between border-b-2 border-red-600 pb-3">
              <h1 className="text-2xl font-bold font-display text-gray-900">
                {categoryLabels[currentCategory]}
              </h1>
              <button
                onClick={() => setCurrentCategory('all')}
                className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
              >
                ← প্রধান পাতায় ফিরুন
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-red-600 font-bold">{article.categoryBn}</span>
                      <h3 className="text-base font-bold font-serif-bn text-gray-900 mt-1 group-hover:text-red-600 transition line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">{article.summary}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 text-xs text-gray-400 flex items-center justify-between border-t border-gray-100">
                    <span>{article.publishedAt}</span>
                    <span className="text-red-600 font-semibold">বিস্তারিত পড়ুন →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          /* Standard Jamuna-style Rich Frontpage Layout */
          <>
            {/* Lead & Sub-Leads + Live TV box + Latest/Most Read Tabs */}
            <HeroSection
              articles={articles}
              onSelectArticle={(article) => setSelectedArticle(article)}
              onOpenLiveTv={() => setIsLiveTvOpen(true)}
              onToggleBookmark={handleToggleBookmark}
              bookmarkedIds={bookmarkedIds}
            />

            {/* Special Investigation Section (Jamuna-style Investigation 360) */}
            <SpecialInvestigationSection
              articles={articles}
              onSelectArticle={(article) => setSelectedArticle(article)}
            />

            {/* Video Hub & Bulletins */}
            <VideoSection />

            {/* National & Politics News Grid */}
            <CategoryNewsGrid
              category="national"
              categoryTitle="জাতীয় ও নীতিনির্ধারণ"
              articles={articles}
              onSelectArticle={(article) => setSelectedArticle(article)}
              onToggleBookmark={handleToggleBookmark}
              bookmarkedIds={bookmarkedIds}
            />

            {/* District News Section (সারাদেশ ও ৬৪ জেলা সংবাদ) */}
            <DistrictNewsSection
              articles={articles}
              onSelectArticle={(article) => setSelectedArticle(article)}
            />

            {/* Crime & Justice Section */}
            <CategoryNewsGrid
              category="crime"
              categoryTitle="অপরাধ ও আদালত (ক্রাইম ফাইল)"
              articles={articles}
              onSelectArticle={(article) => setSelectedArticle(article)}
              onToggleBookmark={handleToggleBookmark}
              bookmarkedIds={bookmarkedIds}
            />

            {/* Public Opinion Poll & Editorial Columns */}
            <OpinionAndPollSection
              articles={articles}
              onSelectArticle={(article) => setSelectedArticle(article)}
            />

            {/* Sports & Tech section */}
            <CategoryNewsGrid
              category="sports"
              categoryTitle="খেলাধুলা ও ক্রিকেট মাঠের খবর"
              articles={articles}
              onSelectArticle={(article) => setSelectedArticle(article)}
              onToggleBookmark={handleToggleBookmark}
              bookmarkedIds={bookmarkedIds}
            />
          </>
        )}
      </main>

      {/* 5. Rich Broadcast Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLiveTv={() => setIsLiveTvOpen(true)}
      />

      {/* Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={selectedArticle ? bookmarkedIds.has(selectedArticle.id) : false}
        onSelectRelated={(art) => setSelectedArticle(art)}
        allArticles={articles}
      />

      <LiveTvModal
        isOpen={isLiveTvOpen}
        onClose={() => setIsLiveTvOpen(false)}
      />

      <SubmitNewsModal
        isOpen={isSubmitNewsOpen}
        onClose={() => setIsSubmitNewsOpen(false)}
      />

      <PrayerWeatherModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />

      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        articles={bookmarkedArticles}
        onSelectArticle={(article) => setSelectedArticle(article)}
        onRemoveBookmark={handleToggleBookmark}
      />
    </div>
  );
}
