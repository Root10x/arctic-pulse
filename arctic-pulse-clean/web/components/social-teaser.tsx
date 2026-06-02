"use client";

import { useState } from "react";
import {
  Facebook, Instagram, MessageSquare, Image as ImageIcon,
  Copy, Check, RefreshCw, Hash, Link as LinkIcon,
} from "lucide-react";

interface SocialTeaserProps {
  articleTitle: string;
  articleUrl: string;
  featuredImage: string;
  excerpt: string;
}

export function SocialTeaserPreview({ articleTitle, articleUrl, featuredImage, excerpt }: SocialTeaserProps) {
  const [fbTeaser, setFbTeaser] = useState(`${articleTitle}

${excerpt.slice(0, 200)}...

Read more: ${articleUrl}`);
  const [igTeaser, setIgTeaser] = useState(`${articleTitle}

${excerpt.slice(0, 100)}...

#arctic #nordic #news`);
  const [copied, setCopied] = useState<string | null>(null);
  const [scheduleFb, setScheduleFb] = useState("");
  const [scheduleIg, setScheduleIg] = useState("");

  const handleCopy = (platform: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(platform);
    setTimeout(() => setCopied(null), 2000);
  };

  const charCount = (text: string, max: number) => {
    const count = text.length;
    return { count, over: count > max, percentage: Math.min(100, (count / max) * 100) };
  };

  const fbStats = charCount(fbTeaser, 63206); // Facebook max
  const igStats = charCount(igTeaser, 2200);  // Instagram max

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Facebook Preview */}
        <div className="card overflow-hidden">
          <div className="p-3 bg-[#1877F2] text-white flex items-center gap-2">
            <Facebook className="w-4 h-4" />
            <span className="text-sm font-medium">Facebook Teaser</span>
          </div>
          <div className="p-4 space-y-4">
            {/* Preview Card */}
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <img src={featuredImage} alt="" className="w-full h-40 object-cover" />
              <div className="p-3 bg-slate-50">
                <p className="text-xs text-slate-500 uppercase">{articleUrl}</p>
                <p className="text-sm font-medium text-slate-900 mt-0.5">{articleTitle}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{excerpt}</p>
              </div>
            </div>

            {/* Teaser Text */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase">Teaser Text</label>
              <textarea
                value={fbTeaser}
                onChange={(e) => setFbTeaser(e.target.value)}
                rows={4}
                className="input w-full mt-1 resize-none text-sm"
              />
              <div className="flex items-center justify-between mt-1">
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mr-3">
                  <div className="h-full bg-[#1877F2] rounded-full transition-all" style={{ width: `${fbStats.percentage}%` }} />
                </div>
                <span className={`text-xs ${fbStats.over ? "text-red-500" : "text-slate-400"}`}>
                  {fbStats.count}
                </span>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500">Schedule</label>
                <input
                  type="datetime-local"
                  value={scheduleFb}
                  onChange={(e) => setScheduleFb(e.target.value)}
                  className="input w-full mt-1 text-sm"
                />
              </div>
              <button
                onClick={() => handleCopy("fb", fbTeaser)}
                className="btn-secondary flex items-center gap-2 mt-5"
              >
                {copied === "fb" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === "fb" ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <LinkIcon className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-blue-700">Link preview will auto-generate from Open Graph tags</span>
            </div>
          </div>
        </div>

        {/* Instagram Preview */}
        <div className="card overflow-hidden">
          <div className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            <span className="text-sm font-medium">Instagram Teaser</span>
          </div>
          <div className="p-4 space-y-4">
            {/* Preview Card */}
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <img src={featuredImage} alt="" className="w-full h-48 object-cover" />
              <div className="p-3">
                <p className="text-sm text-slate-700 whitespace-pre-line">{igTeaser}</p>
              </div>
            </div>

            {/* Teaser Text */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase">Caption</label>
              <textarea
                value={igTeaser}
                onChange={(e) => setIgTeaser(e.target.value)}
                rows={4}
                className="input w-full mt-1 resize-none text-sm"
              />
              <div className="flex items-center justify-between mt-1">
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mr-3">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" style={{ width: `${igStats.percentage}%` }} />
                </div>
                <span className={`text-xs ${igStats.over ? "text-red-500" : "text-slate-400"}`}>
                  {igStats.count}/2200
                </span>
              </div>
            </div>

            {/* Hashtag Suggestions */}
            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Hash className="w-3 h-3" /> Suggested Hashtags
              </label>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["#arctic", "#nordic", "#news", "#politics", "#climate", "#travel", "#iceland", "#norway", "#greenland"].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setIgTeaser(prev => prev + ` ${tag}`)}
                    className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full hover:bg-slate-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500">Schedule</label>
                <input
                  type="datetime-local"
                  value={scheduleIg}
                  onChange={(e) => setScheduleIg(e.target.value)}
                  className="input w-full mt-1 text-sm"
                />
              </div>
              <button
                onClick={() => handleCopy("ig", igTeaser)}
                className="btn-secondary flex items-center gap-2 mt-5"
              >
                {copied === "ig" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === "ig" ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-amber-700">Instagram requires Business/Creator account + Facebook Page link</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
  );
}
