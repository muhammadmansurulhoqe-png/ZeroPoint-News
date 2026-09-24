import React from 'react';
import { 
  Tv, 
  MapPin, 
  Phone, 
  Mail, 
  Youtube, 
  Facebook, 
  Twitter, 
  Instagram, 
  ShieldCheck, 
  Smartphone,
  ChevronUp
} from 'lucide-react';
import { NewsCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: NewsCategory | 'all') => void;
  onOpenLiveTv: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenLiveTv }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-gray-400 border-t-4 border-red-600">
      
      {/* 1. Top Strip: App download & Social presence */}
      <div className="border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 text-white rounded-lg">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold">জিরো পয়েন্ট মোবাইল অ্যাপ ডাউনলোড করুন</h4>
              <p className="text-xs text-gray-500">ব্রেকিং নিউজ নোটিফিকেশন পান যেকোনো মুহূর্তে</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('শীঘ্রই গুগল প্লে স্টোরে উন্মুক্ত হচ্ছে!')}
              className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition"
            >
              <span>Google Play</span>
            </button>
            <button
              onClick={() => alert('শীঘ্রই অ্যাপল অ্যাপ স্টোরে উন্মুক্ত হচ্ছে!')}
              className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition"
            >
              <span>App Store</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Middle Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-red-600 to-red-800 text-white font-display font-extrabold px-2.5 py-1 rounded shadow-md border border-red-500">
                <span className="text-xl tracking-tighter">0°</span>
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                ZERO<span className="text-red-500">POINT</span> NEWS
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-serif-bn">
              জিরো পয়েন্ট নিউজ দেশের শীর্ষস্থানীয় স্যাটেলাইট সংবাদ চ্যানেল ও ডিজিটাল নিউজপোর্টাল। বস্তুনিষ্ঠ সাংবাদিকতা, অনুসন্ধান এবং ২৪ ঘণ্টা সরাসরি সম্প্রচারে আমরা সর্বদা অঙ্গীকারবদ্ধ।
            </p>

            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>হেড অফিস: জিরো পয়েন্ট মিডিয়া টাওয়ার, কাওরান বাজার, ঢাকা-১২১৫</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>নিউজরুম হটলাইন: +৮৮০ ২ ৯৮৭৬৫৪৩, +৮৮০ ১৭১২-০০০০০</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>ইমেইল: newsroom@zeropointnews.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a href="#youtube" className="w-8 h-8 rounded-full bg-gray-900 hover:bg-red-600 text-gray-300 hover:text-white flex items-center justify-center transition">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full bg-gray-900 hover:bg-blue-600 text-gray-300 hover:text-white flex items-center justify-center transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-full bg-gray-900 hover:bg-sky-500 text-gray-300 hover:text-white flex items-center justify-center transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-full bg-gray-900 hover:bg-pink-600 text-gray-300 hover:text-white flex items-center justify-center transition">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Category Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-gray-800 pb-2">
              সংবাদ বিভাগসমূহ
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => onSelectCategory('national')} className="text-left hover:text-red-400 transition">জাতীয়</button>
              <button onClick={() => onSelectCategory('politics')} className="text-left hover:text-red-400 transition">রাজনীতি</button>
              <button onClick={() => onSelectCategory('special')} className="text-left hover:text-red-400 transition">বিশেষ প্রতিবেদন</button>
              <button onClick={() => onSelectCategory('crime')} className="text-left hover:text-red-400 transition">অপরাধ ও আদালত</button>
              <button onClick={() => onSelectCategory('international')} className="text-left hover:text-red-400 transition">আন্তর্জাতিক</button>
              <button onClick={() => onSelectCategory('economy')} className="text-left hover:text-red-400 transition">অর্থনীতি</button>
              <button onClick={() => onSelectCategory('sports')} className="text-left hover:text-red-400 transition">খেলাধুলা</button>
              <button onClick={() => onSelectCategory('district')} className="text-left hover:text-red-400 transition">সারাদেশ</button>
              <button onClick={() => onSelectCategory('tech')} className="text-left hover:text-red-400 transition">প্রযুক্তি</button>
              <button onClick={() => onSelectCategory('entertainment')} className="text-left hover:text-red-400 transition">বিনোদন</button>
            </div>
          </div>

          {/* Editorial & Broadcast (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-gray-800 pb-2">
              সম্পাদকীয় ও প্রশাসন
            </h4>
            <div className="text-xs space-y-2 text-gray-400">
              <p><strong className="text-white">প্রধান সম্পাদক ও প্রকাশক:</strong> মুহাম্মদ মনসুরুল হক</p>
              <p><strong className="text-white">নির্বাহী সম্পাদক:</strong> মাহবুবুর রহমান</p>
              <p><strong className="text-white">হেড অব ইনভেস্টিগেশন:</strong> রেজাউল করিম সুমন</p>
              <p><strong className="text-white">প্রধান বার্তা সম্পাদক:</strong> তারিকুল ইসলাম</p>
              <div className="pt-2">
                <button
                  onClick={onOpenLiveTv}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>২৪/৭ লাইভ টিভি দেখুন</span>
                </button>
              </div>
            </div>
          </div>

          {/* Legal & Compliance (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-gray-800 pb-2">
              নীতিমালা
            </h4>
            <ul className="text-xs space-y-1.5 text-gray-400">
              <li><a href="#policy" className="hover:text-red-400 transition">সম্পাদকীয় নীতিমালা</a></li>
              <li><a href="#factcheck" className="hover:text-red-400 transition">ফ্যাক্ট চেক পলিসি</a></li>
              <li><a href="#privacy" className="hover:text-red-400 transition">গোপনীয়তা নীতি</a></li>
              <li><a href="#terms" className="hover:text-red-400 transition">ব্যবহারের শর্তাবলী</a></li>
              <li><a href="#archive" className="hover:text-red-400 transition">সংবাদ আর্কাইভ</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. Bottom Strip: Copyright & Back to Top */}
      <div className="bg-black py-4 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} জিরো পয়েন্ট নিউজ (ZeroPoint News)। সর্বস্বত্ব সংরক্ষিত। অনুমতি ছাড়া যেকোনো কনটেন্ট কপি বা পুনরুৎপাদন বেআইনি।</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition cursor-pointer"
          >
            <span>উপরে ফিরুন</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

    </footer>
  );
};
