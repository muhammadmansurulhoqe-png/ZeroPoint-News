import React, { useState } from 'react';
import { 
  Tv, 
  Search, 
  Bookmark, 
  Calendar, 
  Clock, 
  CloudSun, 
  Send, 
  Menu, 
  X, 
  Youtube, 
  Facebook, 
  Twitter, 
  Instagram,
  Radio,
  FileText,
  Volume2
} from 'lucide-react';
import { NewsCategory } from '../types';

interface HeaderProps {
  currentCategory: NewsCategory | 'all';
  onSelectCategory: (category: NewsCategory | 'all') => void;
  onOpenLiveTv: () => void;
  onOpenSubmitNews: () => void;
  onOpenPrayerModal: () => void;
  onOpenBookmarks: () => void;
  savedCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenLiveTv,
  onOpenSubmitNews,
  onOpenPrayerModal,
  onOpenBookmarks,
  savedCount,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: { id: NewsCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'প্রচ্ছদ' },
    { id: 'national', label: 'জাতীয়' },
    { id: 'politics', label: 'রাজনীতি' },
    { id: 'special', label: 'বিশেষ প্রতিবেদন' },
    { id: 'crime', label: 'অপরাধ ও আদালত' },
    { id: 'international', label: 'আন্তর্জাতিক' },
    { id: 'economy', label: 'অর্থনীতি' },
    { id: 'sports', label: 'খেলাধুলা' },
    { id: 'district', label: 'সারাদেশ' },
    { id: 'tech', label: 'প্রযুক্তি' },
    { id: 'entertainment', label: 'বিনোদন' },
    { id: 'lifestyle', label: 'লাইফস্টাইল' },
    { id: 'opinion', label: 'মতামত' },
  ];

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      {/* 1. TOP BAR: Date, Weather, Prayer, Citizen Reporter, Socials */}
      <div className="bg-gray-900 text-gray-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Bengali & Gregorian Date & Location */}
          <div className="flex items-center gap-3 divide-x divide-gray-700">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-red-500" />
              <span className="font-medium text-gray-200">বৃহস্পতিবার, ৯ আশ্বিন ১৪৩১</span>
              <span className="text-gray-400">| ২৪ সেপ্টেম্বর ২০২৬</span>
            </div>
            <button 
              onClick={onOpenPrayerModal}
              className="pl-3 flex items-center gap-1 text-gray-300 hover:text-red-400 transition"
              title="নামাজের সময়সূচি ও আবহাওয়া দেখুন"
            >
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>ঢাকা ২৮° সে. (মেঘলা)</span>
              <span className="text-gray-500">|</span>
              <Clock className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              <span className="hover:underline">নামাজের সময়</span>
            </button>
          </div>

          {/* Right: Quick actions & Social Media */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSubmitNews}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 font-medium transition cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>সংবাদ পাঠান (সিটিজেন)</span>
            </button>

            <button 
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1 text-gray-300 hover:text-white transition cursor-pointer"
              title="সংরক্ষিত খবর"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>বুকমার্ক ({savedCount})</span>
            </button>

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-700">
              <a href="#youtube" className="text-gray-400 hover:text-red-500 transition" title="YouTube চ্যানেল">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="#facebook" className="text-gray-400 hover:text-blue-500 transition" title="Facebook পেজ">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-sky-400 transition" title="X একাউন্ট">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#instagram" className="text-gray-400 hover:text-pink-500 transition" title="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER: Jamuna-Style Bold TV Channel Logo & Live TV Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo area */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onSelectCategory('all')} 
              className="text-left group flex items-center gap-3 focus:outline-none cursor-pointer"
            >
              {/* Bold Icon badge */}
              <div className="relative bg-gradient-to-br from-red-600 to-red-800 text-white font-display font-extrabold px-3 py-1.5 rounded shadow-md flex items-center gap-1.5 border border-red-500">
                <span className="text-2xl sm:text-3xl tracking-tighter">0°</span>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping absolute -top-1 -right-1" />
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full absolute -top-1 -right-1" />
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
                    ZERO<span className="text-red-600">POINT</span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-red-600 uppercase bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                    NEWS
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-500 tracking-wide flex items-center gap-1">
                  <span>জিরো পয়েন্ট নিউজ</span>
                  <span className="text-red-500">•</span>
                  <span className="text-gray-400">সবার আগে সঠিক তথ্য</span>
                </p>
              </div>
            </button>
          </div>

          {/* Right Action Cluster: Search & Live TV Button */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="খবর অনুসন্ধান করুন..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-56 lg:w-64 pl-9 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2 text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live TV Button (Iconic Jamuna-TV style red on-air button) */}
            <button
              onClick={onOpenLiveTv}
              className="relative group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <Tv className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide">লাইভ টিভি</span>
              <span className="hidden sm:inline text-[11px] bg-red-900/60 px-1.5 py-0.5 rounded text-red-100 font-mono">
                24/7
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-md transition"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="খবর অনুসন্ধান করুন..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION CATEGORY MENU: Sticky Red/Dark Accent Nav */}
      <nav className="bg-red-700 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex items-center space-x-1 py-1">
              {categories.map((cat) => {
                const isActive = currentCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`whitespace-nowrap px-3 py-2 rounded text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-red-900 text-yellow-300 shadow-inner'
                        : 'text-white hover:bg-red-800 hover:text-red-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg px-4 py-3 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ক্যাটাগরি সমূহ</p>
          <div className="grid grid-cols-2 gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded text-sm font-medium ${
                  currentCategory === cat.id
                    ? 'bg-red-50 text-red-700 font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-200 flex flex-col gap-2 text-sm">
            <button
              onClick={() => {
                onOpenLiveTv();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-red-600 font-semibold py-1.5"
            >
              <Tv className="w-4 h-4" />
              <span>২৪/৭ লাইভ টিভি দেখুন</span>
            </button>
            <button
              onClick={() => {
                onOpenSubmitNews();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gray-700 py-1.5"
            >
              <Send className="w-4 h-4 text-red-500" />
              <span>সিটিজেন সাংবাদিকতা (সংবাদ পাঠান)</span>
            </button>
            <button
              onClick={() => {
                onOpenPrayerModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gray-700 py-1.5"
            >
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>নামাজের সময়সূচি ও আবহাওয়া</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
