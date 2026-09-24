import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Trophy, Coins, Award } from 'lucide-react';
import { MARKET_DATA } from '../data/newsData';

export const MarketAndSportsBar: React.FC = () => {
  return (
    <div className="bg-white border-y border-gray-200 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Sports Live Card (5 Cols) */}
          <div className="md:col-span-5 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 rounded-lg p-2.5 flex items-center gap-3">
            <div className="bg-red-600 text-white p-2 rounded-md flex-shrink-0 shadow-xs">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-red-700 uppercase tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                  জিরো পয়েন্ট স্পোর্টস স্কোর
                </span>
                <span className="text-[10px] text-gray-500 font-medium">টি-টোয়েন্টি সিরিজ</span>
              </div>
              <p className="text-xs font-bold text-gray-900 truncate">
                {MARKET_DATA.cricketMatch.teams}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold truncate">
                {MARKET_DATA.cricketMatch.status}
              </p>
            </div>
          </div>

          {/* Market & Currency Ticker (7 Cols) */}
          <div className="md:col-span-7 flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Gold */}
            <div className="bg-amber-50/70 border border-amber-200/70 rounded-lg px-3 py-1.5 flex items-center gap-2 flex-1 min-w-[130px]">
              <Coins className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 font-medium">{MARKET_DATA.gold.title}</p>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">{MARKET_DATA.gold.price}</span>
                  <span className="text-[10px] text-red-600 font-bold flex items-center">
                    <TrendingUp className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* USD */}
            <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-lg px-3 py-1.5 flex items-center gap-2 flex-1 min-w-[110px]">
              <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 font-medium">{MARKET_DATA.usd.title}</p>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">{MARKET_DATA.usd.price}</span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center">
                    <TrendingUp className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Saudi Riyal */}
            <div className="bg-blue-50/70 border border-blue-200/70 rounded-lg px-3 py-1.5 flex items-center gap-2 flex-1 min-w-[110px]">
              <Coins className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 font-medium">{MARKET_DATA.saudiRiyal.title}</p>
                <p className="font-bold text-gray-900">{MARKET_DATA.saudiRiyal.price}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
