import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Share2, 
  Bookmark, 
  Printer, 
  Clock, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Sparkles,
  ChevronRight,
  User,
  Heart
} from 'lucide-react';
import { NewsArticle, Comment } from '../types';
import { INITIAL_COMMENTS } from '../data/newsData';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
  onSelectRelated: (article: NewsArticle) => void;
  allArticles: NewsArticle[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onToggleBookmark,
  isBookmarked,
  onSelectRelated,
  allArticles
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Reset audio on article switch
  useEffect(() => {
    setIsPlayingAudio(false);
  }, [article?.id]);

  if (!article) return null;

  // Filter comments for this article or general
  const articleComments = comments.filter((c) => c.articleId === article.id);

  // Related articles in same category
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      articleId: article.id,
      userName: newCommentName.trim() || 'সম্মানিত পাঠক',
      userLocation: 'বাংলাদেশ',
      commentText: newCommentText.trim(),
      timestamp: 'এইমাত্র',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
  };

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const fontSizeClass = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-loose',
    xlarge: 'text-xl sm:text-2xl leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-bold text-xs uppercase px-2 py-0.5 rounded">
              {article.categoryBn}
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">• জিরো পয়েন্ট নিউজ বিশেষ প্রতিবেদন</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size adjustments */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs text-gray-700">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded font-medium cursor-pointer ${fontSize === 'normal' ? 'bg-white shadow-xs font-bold text-red-600' : ''}`}
                title="সাধারণ ফন্ট"
              >
                অ
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded font-medium cursor-pointer ${fontSize === 'large' ? 'bg-white shadow-xs font-bold text-red-600' : ''}`}
                title="বড় ফন্ট"
              >
                অ+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded font-medium cursor-pointer ${fontSize === 'xlarge' ? 'bg-white shadow-xs font-bold text-red-600' : ''}`}
                title="আরও বড় ফন্ট"
              >
                অ++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100 transition cursor-pointer"
              title="বুকমার্ক করুন"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-500' : ''}`} />
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100 transition cursor-pointer hidden sm:block"
              title="প্রিন্ট করুন"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          
          {/* Article Header */}
          <div className="mb-6">
            {article.subtitle && (
              <p className="text-sm sm:text-base font-semibold text-red-600 mb-2">
                {article.subtitle}
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-bn text-gray-900 leading-tight">
              {article.title}
            </h1>

            {/* Meta Row: Author, Date, Reading time, Audio Player */}
            <div className="mt-4 pt-4 border-t border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center font-serif-bn">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{article.author.name}</p>
                  <p className="text-xs text-gray-500">{article.author.role} • {article.author.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-red-500" />
                  {article.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-blue-500" />
                  {article.views.toLocaleString('bn-BD')} পাঠক
                </span>
              </div>
            </div>

            {/* Audio Reader Simulation Bar */}
            <div className="mt-4 bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-xl border border-red-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition shadow-sm cursor-pointer"
                >
                  {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <div>
                  <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-red-600" />
                    <span>সংবাদটি শুনুন (অডিও পাঠক)</span>
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {isPlayingAudio ? 'অডিও সংবাদ পাঠক চালু আছে...' : 'ক্লিক করে এই সংবাদের অডিও শুনুন'}
                  </p>
                </div>
              </div>

              {/* Animated audio waves */}
              {isPlayingAudio && (
                <div className="flex items-center gap-1 px-3">
                  <span className="w-1 h-3 bg-red-600 animate-pulse" />
                  <span className="w-1 h-6 bg-red-600 animate-pulse delay-75" />
                  <span className="w-1 h-4 bg-red-600 animate-pulse delay-150" />
                  <span className="w-1 h-7 bg-red-600 animate-pulse delay-100" />
                  <span className="w-1 h-2 bg-red-600 animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-6">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto max-h-[460px] object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="mt-2 text-xs text-gray-500 italic text-center">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Article Body Content */}
          <div className={`text-gray-800 space-y-4 font-serif-bn ${fontSizeClass}`}>
            <p className="font-semibold text-gray-900 border-l-4 border-red-600 pl-4 py-1 italic bg-red-50/40 rounded-r">
              {article.summary}
            </p>

            {article.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <span className="text-xs font-bold text-gray-700 mr-2">ট্যাগসমূহ:</span>
            <div className="inline-flex flex-wrap gap-2 mt-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-xs px-2.5 py-1 rounded-md transition cursor-pointer font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-red-600" />
              <span>সংবাদটি শেয়ার করুন:</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'কপি হয়েছে' : 'লিংক কপি'}</span>
              </button>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
              >
                ফেসবুক
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition"
              >
                হোয়াটসঅ্যাপ
              </a>
            </div>
          </div>

          {/* ================= Comments Section ================= */}
          <div className="mt-10 pt-6 border-t-2 border-red-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-display text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-600" />
                <span>পাঠকের মতামত ও মন্তব্য ({articleComments.length})</span>
              </h3>
              <span className="text-xs text-gray-500">শালীন ভাষায় গঠনমূলক মন্তব্য করুন</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="আপনার নাম..."
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <textarea
                placeholder="আপনার গঠনমূলক মতামত লিখুন..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                rows={3}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-red-500 mb-3"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>মন্তব্য প্রকাশ করুন</span>
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-3">
              {articleComments.length > 0 ? (
                articleComments.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-gray-900">{c.userName}</span>
                      <span className="text-gray-400">{c.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-serif-bn">
                      {c.commentText}
                    </p>
                    <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                      <span>{c.userLocation}</span>
                      <button
                        onClick={() => handleLikeComment(c.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>লাইক ({c.likes})</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic text-center py-4">
                  এখনও কোনো মন্তব্য করা হয়নি। আপনার মতামত দিয়ে প্রথম হোন!
                </p>
              )}
            </div>
          </div>

          {/* Related Stories */}
          {relatedArticles.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold font-display text-gray-900 mb-4">
                সম্পর্কিত আরও খবর
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs sm:text-sm font-bold font-serif-bn text-gray-900 group-hover:text-red-600 transition line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 mt-1 block">
                        {rel.publishedAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
