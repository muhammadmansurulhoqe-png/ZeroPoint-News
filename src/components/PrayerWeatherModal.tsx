import React, { useState } from 'react';
import { X, Clock, CloudSun, Wind, Droplets, Sun, Moon, MapPin } from 'lucide-react';
import { PRAYER_TIMES } from '../data/newsData';

interface PrayerWeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerWeatherModal: React.FC<PrayerWeatherModalProps> = ({ isOpen, onClose }) => {
  const [selectedCity, setSelectedCity] = useState('ঢাকা');

  if (!isOpen) return null;

  const cities = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'সিলেট', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base font-display">নামাজের সময়সূচি ও আবহাওয়া</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded-full cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City Filter */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>বিভাগ নির্বাচন করুন:</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-2.5 py-1 text-xs rounded-full font-medium transition cursor-pointer ${
                  selectedCity === city
                    ? 'bg-red-600 text-white font-bold shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Weather card */}
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-4 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-sky-100">{selectedCity} আজকের আবহাওয়া</span>
                <h4 className="text-3xl font-extrabold mt-1">২৮° সেলসিয়াস</h4>
                <p className="text-xs text-sky-100 mt-0.5">আংশিক মেঘলা ও আর্দ্র আবহাওয়া</p>
              </div>
              <CloudSun className="w-14 h-14 text-yellow-300 drop-shadow-md" />
            </div>

            <div className="mt-4 pt-3 border-t border-sky-400/40 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-sky-200 block text-[10px]">আর্দ্রতা</span>
                <span className="font-bold">৭৬%</span>
              </div>
              <div>
                <span className="text-sky-200 block text-[10px]">বাতাস</span>
                <span className="font-bold">১২ কিমি/ঘণ্টা</span>
              </div>
              <div>
                <span className="text-sky-200 block text-[10px]">বৃষ্টির সম্ভাবনা</span>
                <span className="font-bold">২০%</span>
              </div>
            </div>
          </div>

          {/* Prayer times table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-emerald-600" />
                <span>আজকের ৫ ওয়াক্ত নামাজের সময়সূচি ({selectedCity})</span>
              </h4>
              <span className="text-[11px] text-gray-400">ইসলামিক ফাউন্ডেশন অনুসারে</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PRAYER_TIMES.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-center">
                  <span className="text-xs text-gray-500 font-medium block">{item.name}</span>
                  <span className="text-sm font-bold text-gray-900 font-mono mt-0.5 block">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
