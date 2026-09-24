import React, { useState } from 'react';
import { X, Send, Image, MapPin, CheckCircle2, Phone, Mail, FileText } from 'lucide-react';

interface SubmitNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitNewsModal: React.FC<SubmitNewsModalProps> = ({ isOpen, onClose }) => {
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [senderName, setSenderName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline || !description) return;
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds
      setSubmitted(false);
      setHeadline('');
      setLocation('');
      setDescription('');
      setSenderName('');
      setPhone('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-yellow-300" />
            <div>
              <h3 className="font-bold text-base font-display">সিটিজেন জার্নালিজম: সংবাদ পাঠান</h3>
              <p className="text-[11px] text-red-100">আপনার এলাকার সত্য ঘটনা সরাসরি জিরো পয়েন্ট নিউজরুমে পাঠান</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-red-800 rounded-full cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">আপনার সংবাদের তথ্য সফলভাবে পাঠানো হয়েছে!</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              জিরো পয়েন্ট নিউজরুমের সেন্ট্রাল ডেস্ক তথ্য যাচাই-বাছাই করে দ্রুত প্রয়োজনীয় ব্যবস্থা ও সম্প্রচারের সিদ্ধান্ত নেবে। বস্তুনিষ্ঠ তথ্য দেওয়ার জন্য ধন্যবাদ।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                সংবাদের শিরোনাম / মূল বিষয় *
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: মহাসড়কে তীব্র যানজট / নদীভাঙন পরিস্থিতি..."
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ঘটনার স্থান (উপজেলা / জেলা) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="যেমন: নড়িয়া, শরীয়তপুর"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg pl-8 pr-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-2.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  আপনার মোবাইল নম্বর
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="০১৭xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg pl-8 pr-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-2.5 top-3" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ঘটনার বিস্তারিত বিবরণ *
              </label>
              <textarea
                required
                rows={4}
                placeholder="ঘটনাটি কখন ঘটেছে, কী হয়েছিল, ক্ষয়ক্ষতির পরিমাণ ইত্যাদির বিশদ তথ্য লিখুন..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div className="p-3 bg-red-50/70 border border-red-200 rounded-lg text-[11px] text-red-800">
              <p className="font-semibold">গোপনীয়তা নিশ্চয়তা:</p>
              <p>আপনার পরিচয় সম্পূর্ণরূপে সুরক্ষিত ও নিউজরুমের কাছে অত্যন্ত গোপন রাখা হবে।</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>নিউজরুমে জমা দিন</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
