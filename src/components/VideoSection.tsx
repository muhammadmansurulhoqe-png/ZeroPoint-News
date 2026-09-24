import React, { useState } from 'react';
import { Play, PlayCircle, Eye, Clock, X, Video, Share2 } from 'lucide-react';
import { VideoNews } from '../types';
import { VIDEO_NEWS_ITEMS } from '../data/newsData';

export const VideoSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoNews | null>(null);

  return (
    <section className="bg-gray-900 text-white py-10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg text-white">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
                ভিডিও গ্যালারি ও বুলেটিন
              </h2>
              <p className="text-xs text-gray-400">তাজা ভিডিও খবর, স্পেশাল রিপোর্ট ও টক শো</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-red-400 hover:text-red-300 cursor-pointer">
            সব ভিডিও দেখুন →
          </span>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VIDEO_NEWS_ITEMS.slice(0, 4).map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="bg-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/50 group cursor-pointer transition flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail with Play Icon & Duration */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-red-600/90 group-hover:bg-red-600 group-hover:scale-110 rounded-full flex items-center justify-center shadow-lg transition">
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                    {vid.duration}
                  </span>

                  {/* Program Tag */}
                  {vid.programName && (
                    <span className="absolute top-2 left-2 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {vid.programName}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3.5">
                  <h3 className="text-sm font-bold font-serif-bn text-gray-100 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h3>
                </div>
              </div>

              <div className="p-3.5 pt-0 flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-900">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-red-400" />
                  {vid.views} ভিউ
                </span>
                <span>{vid.publishedAt}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="bg-gray-950 rounded-xl overflow-hidden max-w-3xl w-full border border-gray-800 shadow-2xl">
            <div className="p-3 bg-gray-900 flex items-center justify-between border-b border-gray-800">
              <span className="text-sm font-bold text-white truncate max-w-[85%]">
                {activeVideo.title}
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-gray-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Animated playing simulation indicator */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <p className="mt-3 text-sm font-semibold tracking-wide bg-black/60 px-3 py-1 rounded-full border border-gray-700">
                  ভিডিও লোড হচ্ছে... (জিরো পয়েন্ট ভিডিও নেটওয়ার্ক)
                </p>
              </div>

              {/* Lower info */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
                <span className="font-mono bg-black/70 px-2 py-0.5 rounded">
                  সময়কাল: {activeVideo.duration}
                </span>
                <span className="bg-red-600 text-white px-2 py-0.5 rounded font-bold">
                  {activeVideo.programName || 'স্পেশাল বুলেটিন'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-900 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <span>{activeVideo.views} দর্শক দেখেছেন</span>
                <span>•</span>
                <span>প্রকাশকাল: {activeVideo.publishedAt}</span>
              </div>
              <button
                onClick={() => alert('ভিডিও লিংক কপি করা হয়েছে!')}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>শেয়ার করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
