import React, { useState, useEffect } from 'react';
import { 
  X, 
  Tv, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Users, 
  Send, 
  Flame, 
  Radio, 
  Sparkles, 
  ThumbsUp, 
  Heart,
  Share2,
  Calendar
} from 'lucide-react';

interface LiveTvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: string;
  location: string;
  message: string;
  timestamp: string;
}

export const LiveTvModal: React.FC<LiveTvModalProps> = ({ isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liveViewers, setLiveViewers] = useState(14850);
  const [chatInput, setChatInput] = useState('');
  const [reactionsCount, setReactionsCount] = useState({ like: 342, heart: 512, fire: 231 });
  const [clockTime, setClockTime] = useState('');

  // Sample live chat stream
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'তানভীর আহমেদ', location: 'চট্টগ্রাম', message: 'জিরো পয়েন্টের স্পষ্ট ও নিরপেক্ষ সংবাদ উপস্থাপনা চমৎকার।', timestamp: '১০:০২' },
    { id: '2', sender: 'রাশেদুল হাসান', location: 'ঢাকা', message: 'মেগা প্রকল্পগুলোর কাজ দ্রুত শেষ করা দরকার।', timestamp: '১০:০৩' },
    { id: '3', sender: 'মাসুমা আক্তার', location: 'সিলেট', message: 'লাইভ স্ট্রিমিংয়ের পিকচার কোয়ালিটি অনেক পরিষ্কার!', timestamp: '১০:০৪' },
    { id: '4', sender: 'সোহরাব হোসেন', location: 'রাজশাহী', message: 'ইনভেস্টিগেশন টিমকে অনেক অনেক শুভকামনা।', timestamp: '১০:০৫' }
  ]);

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString('bn-BD', { hour12: true }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate viewer fluctuation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setLiveViewers((prev) => prev + Math.floor(Math.random() * 9) - 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'আপনি (দর্শক)',
      location: 'বাংলাদেশ',
      message: chatInput,
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  const handleReaction = (type: 'like' | 'heart' | 'fire') => {
    setReactionsCount((prev) => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const programs = [
    { time: '০৮:০০ সকাল', title: 'জিরো পয়েন্ট সকালের সংবাদ', status: 'সম্পন্ন' },
    { time: '১০:০০ সকাল', title: 'বিশেষ বুলেটিন ও বাজারদর', status: 'এখন চলছে' },
    { time: '০১:০০ দুপুর', title: 'সারাদেশের খবরাখবর', status: 'আসন্ন' },
    { time: '০৫:০০ বিকেল', title: 'ইনভেস্টিগেশন ৩৬০ ডিগ্রি', status: 'আসন্ন' },
    { time: '০৮:০০ রাত', title: 'প্রাইম টাইম বিশেষ সংবাদ', status: 'আসন্ন' },
    { time: '১১:০০ রাত', title: 'টক শো: বাংলাদেশ কোন পথে?', status: 'আসন্ন' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-gray-950 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col my-auto max-h-[95vh]">
        
        {/* Top Header */}
        <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="font-display font-black text-white text-lg tracking-tight">
                ZERO<span className="text-red-500">POINT</span> LIVE TV
              </span>
            </div>
            <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">
              সরাসরি সম্প্রচার
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-red-400 font-mono bg-black/50 px-2.5 py-1 rounded-full border border-red-500/20">
              <Users className="w-3.5 h-3.5" />
              <span>{liveViewers.toLocaleString('bn-BD')} জন সরাসরি দেখছেন</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main TV Player Grid: Screen on left (8 cols), Chat/Schedule on right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* ================= LEFT: Broadcast Screen (8 Cols) ================= */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between relative group">
            
            {/* The Main Broadcast Video Canvas */}
            <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center bg-slate-950">
              {/* Studio Backdrop Stream Graphic */}
              <img
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1280&q=80"
                alt="Studio Anchor Feed"
                className="w-full h-full object-cover opacity-90 filter contrast-105"
              />

              {/* Broadcast Overlay Lower Thirds (Iconic Jamuna TV Style) */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded shadow flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  LIVE
                </div>
                <div className="bg-black/75 backdrop-blur-sm text-gray-200 text-xs px-2.5 py-1 rounded font-mono border border-gray-700">
                  ঢাকা নিউজরুম • {clockTime}
                </div>
              </div>

              {/* Top Right HD badge */}
              <div className="absolute top-4 right-4 bg-red-950/80 text-red-200 text-xs font-mono px-2 py-0.5 rounded border border-red-500/40">
                1080p 60FPS
              </div>

              {/* Jamuna-style Lower Third News Graphic */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-red-950/95 via-red-900/90 to-transparent pt-6 pb-2 px-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-yellow-400 text-black font-extrabold text-xs px-2 py-0.5 rounded uppercase">
                    স্পেশাল বুলেটিন
                  </span>
                  <span className="text-white text-xs font-semibold drop-shadow">
                    প্রধান অর্থনৈতিক সংস্কার ও জাতীয় কর্মসংস্থান রূপরেখা
                  </span>
                </div>
                {/* Scrolling Ticker inside player */}
                <div className="bg-black/80 text-yellow-300 text-xs py-1 px-3 rounded flex items-center gap-2 overflow-hidden border-l-4 border-yellow-400">
                  <span className="font-bold text-red-500 flex-shrink-0">ব্রেকিং:</span>
                  <p className="truncate font-medium text-gray-100">
                    রাজধানীতে নকল ওষুধ সিন্ডিকেটের ৫টি গোপন কারখানায় যৌথ অভিযান চলছে • চট্টগ্রাম বন্দরে কার্গো হ্যান্ডলিংয়ে নতুন রেকর্ড
                  </p>
                </div>
              </div>
            </div>

            {/* Broadcast Control Bar */}
            <div className="p-3 bg-gray-900 border-t border-gray-800 flex items-center justify-between text-white text-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
                  title={isMuted ? 'আনমিউট করুন' : 'মিউট করুন'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div className="text-xs text-gray-400">
                  সাউন্ড: <span className="text-gray-200 font-medium">{isMuted ? 'বন্ধ' : 'চালু (HD অডিও)'}</span>
                </div>
              </div>

              {/* Reaction Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReaction('like')}
                  className="flex items-center gap-1 text-xs bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-full text-blue-400 transition cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{reactionsCount.like}</span>
                </button>
                <button
                  onClick={() => handleReaction('heart')}
                  className="flex items-center gap-1 text-xs bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-full text-red-400 transition cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{reactionsCount.heart}</span>
                </button>
                <button
                  onClick={() => handleReaction('fire')}
                  className="flex items-center gap-1 text-xs bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-full text-amber-400 transition cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{reactionsCount.fire}</span>
                </button>
              </div>
            </div>

          </div>

          {/* ================= RIGHT: Live Chat & Daily Schedule (4 Cols) ================= */}
          <div className="lg:col-span-4 bg-gray-950 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col h-full max-h-[460px] lg:max-h-none">
            
            {/* Tab Bar: Chat vs Schedule */}
            <div className="p-3 border-b border-gray-800 bg-gray-900/60 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                লাইভ মতামত ও সম্প্রচার প্রতিক্রিয়া
              </span>
              <span className="text-[11px] text-gray-400">সক্রিয় চ্যাট</span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-gray-900/80 p-2.5 rounded-lg border border-gray-800">
                  <div className="flex items-center justify-between text-gray-400 mb-1">
                    <span className="font-semibold text-red-400">{msg.sender}</span>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-gray-500">{msg.location}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-gray-200 leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Chat Input Box */}
            <form onSubmit={handleSendMessage} className="p-2.5 bg-gray-900 border-t border-gray-800 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="লাইভ প্রতিক্রিয়া লিখুন..."
                className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition cursor-pointer"
                title="পাঠান"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Program Schedule Preview Accordion */}
            <div className="p-3 bg-gray-900/40 border-t border-gray-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-2">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                <span>আজকের পরবর্তী অনুষ্ঠানমালা</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                {programs.slice(1, 4).map((prog, i) => (
                  <div key={i} className="flex items-center justify-between text-gray-400 py-0.5">
                    <span className="font-mono text-gray-300">{prog.time}</span>
                    <span className="text-gray-200 truncate mx-2">{prog.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                        prog.status === 'এখন চলছে'
                          ? 'bg-red-900/70 text-red-300'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {prog.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
