"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText, Link, ClipboardPaste, Upload, Send, Save, Clock,
  CheckCircle2, ArrowRight, Sparkles, Loader2, ChevronRight,
} from "lucide-react";
import { sites } from "@/lib/mock-data";

const inputMethods = [
  { id: "topic", label: "Topic", icon: FileText, desc: "Enter a headline and notes" },
  { id: "url", label: "URL", icon: Link, desc: "Import from a source URL" },
  { id: "paste", label: "Paste", icon: ClipboardPaste, desc: "Paste existing content" },
  { id: "bulk", label: "Bulk Upload", icon: Upload, desc: "Upload CSV file" },
];

const mockDrafts = [
  {
    title: "Arctic Council Convenes in Tromsø for Shipping Safety Summit",
    excerpt: "The Arctic Council convenes this week in Tromsø to discuss new shipping regulations as ice melt opens northern passages...",
    body: "The Arctic Council convenes this week in Tromsø to discuss new shipping regulations as ice melt opens northern passages. Delegates from all eight member states will review environmental protocols and safety standards for vessels navigating increasingly accessible Arctic waters.\n\nThe proposed regulations address ice-class certification requirements, mandatory satellite tracking for all commercial vessels, and updated environmental protection measures. Norway and Denmark are pushing for stricter enforcement mechanisms, while Russia advocates for voluntary compliance frameworks.\n\nShipping traffic through the Northern Sea Route has increased 40% year-over-year, prompting concerns about search and rescue capabilities and pollution response readiness in remote Arctic waters.",
    suggestedCategories: ["Policy", "Shipping", "Environment"],
    suggestedTags: ["arctic council", "shipping", "tromsø", "polar code"],
    suggestedImages: [
      "https://picsum.photos/seed/ship1/400/300",
      "https://picsum.photos/seed/ship2/400/300",
      "https://picsum.photos/seed/ship3/400/300",
    ],
  },
  {
    title: "Greenland Unveils Strict Mineral Extraction Policy Framework",
    excerpt: "Greenland's new mineral extraction policy aims to balance economic development with environmental protection...",
    body: "Greenland's parliament has approved a comprehensive mineral extraction policy that establishes strict environmental oversight for mining operations across the autonomous territory. The framework introduces mandatory environmental bonds, community consent requirements, and enhanced monitoring of sensitive ecological zones.\n\nThe policy specifically targets rare earth mining operations, which have attracted significant international investment interest. Chinese and Australian mining firms are actively lobbying for exemptions to certain provisions, arguing that the new requirements could delay project timelines by 18-24 months.\n\nEnvironmental advocates have praised the framework for prioritizing indigenous hunting grounds and protecting critical habitats. The policy also establishes a revenue-sharing model that directs 30% of mining royalties to local communities.",
    suggestedCategories: ["Environment", "Policy", "Economy"],
    suggestedTags: ["greenland", "mining", "rare earth", "environment"],
    suggestedImages: [
      "https://picsum.photos/seed/mine1/400/300",
      "https://picsum.photos/seed/mine2/400/300",
      "https://picsum.photos/seed/mine3/400/300",
    ],
  },
];

export default function NewContentPage() {
  const router = useRouter();
  const [method, setMethod] = useState("topic");
  const [headline, setHeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [targetSite, setTargetSite] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [pastedContent, setPastedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lifecycleProgress, setLifecycleProgress] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    setLifecycleProgress(10);
    setTimeout(() => setLifecycleProgress(30), 500);
    setTimeout(() => setLifecycleProgress(60), 1200);
    setTimeout(() => setLifecycleProgress(85), 2000);
    setTimeout(() => {
      setDraft(mockDrafts[Math.floor(Math.random() * mockDrafts.length)]);
      setIsGenerating(false);
      setLifecycleProgress(100);
    }, 2800);
  };

  const handleSendToReview = () => {
    setShowSuccess(true);
    setTimeout(() => router.push("/review-queue"), 2000);
  };

  const handleSaveDraft = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">New Content</h1>
          <p className="text-slate-500 text-sm mt-1">Create and prepare content for publishing</p>
        </div>
        {draft && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-4 h-4" /> Draft ready
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-medium">
            {draft ? "Sent to Review Queue — redirecting..." : "Draft saved successfully"}
          </span>
        </div>
      )}

      {draft && (
        <div className="card p-4 bg-blue-50/50 border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-900">Content Lifecycle</h3>
            <span className="text-xs text-blue-600 font-medium">Draft Generated — 17% Complete</span>
          </div>
          <div className="flex items-center gap-1">
            {[
              { label: "Draft", done: true },
              { label: "Research", done: true },
              { label: "Review", done: false },
              { label: "Approved", done: false },
              { label: "Scheduled", done: false },
              { label: "Published", done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`flex flex-col items-center flex-1 ${step.done ? "opacity-100" : "opacity-40"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    step.done ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"
                  }`}>
                    {step.done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1">{step.label}</span>
                </div>
                {i < 5 && <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-4">
            <h3 className="text-sm font-medium text-slate-900 mb-3">Input Method</h3>
            <div className="grid grid-cols-2 gap-2">
              {inputMethods.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border text-left transition-all ${
                      method === m.id ? "border-arctic-navy bg-arctic-navy/5" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${method === m.id ? "text-arctic-navy" : "text-slate-400"}`} />
                    <div>
                      <p className={`text-sm font-medium ${method === m.id ? "text-arctic-navy" : "text-slate-700"}`}>{m.label}</p>
                      <p className="text-xs text-slate-400">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card p-4 space-y-4">
            {method === "topic" && (
              <>
                <div>
                  <label className="text-sm font-medium text-slate-700">Headline</label>
                  <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g., Arctic Council Shipping Regulations Update" className="input w-full mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Notes</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any research notes, angles, or key points..." rows={4} className="input w-full mt-1 resize-none" />
                </div>
              </>
            )}
            {method === "url" && (
              <div>
                <label className="text-sm font-medium text-slate-700">Source URL</label>
                <input type="url" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://example.com/article" className="input w-full mt-1" />
                <p className="text-xs text-slate-400 mt-1">The system will extract and summarize the content</p>
              </div>
            )}
            {method === "paste" && (
              <div>
                <label className="text-sm font-medium text-slate-700">Paste Content</label>
                <textarea value={pastedContent} onChange={(e) => setPastedContent(e.target.value)}
                  placeholder="Paste your article content here..." rows={8} className="input w-full mt-1 resize-none" />
              </div>
            )}
            {method === "bulk" && (
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Drop CSV file here or click to browse</p>
                <p className="text-xs text-slate-400 mt-1">Supports .csv with columns: title, body, site, category</p>
                <button className="btn-secondary mt-3">Select File</button>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-slate-700">Target Site</label>
              <select value={targetSite} onChange={(e) => setTargetSite(e.target.value)} className="input w-full mt-1">
                <option value="">Select a site...</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <button onClick={handleGenerate} disabled={isGenerating || (!headline && !sourceUrl && !pastedContent && method !== "bulk")}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating draft... {lifecycleProgress}%</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Generate Draft</>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          {!draft && !isGenerating && (
            <div className="card p-8 h-full flex flex-col items-center justify-center text-center border-dashed">
              <FileText className="w-12 h-12 text-slate-200 mb-3" />
              <h3 className="text-sm font-medium text-slate-400">Your draft will appear here</h3>
              <p className="text-xs text-slate-300 mt-1">Fill in the details and click Generate Draft</p>
            </div>
          )}
          {isGenerating && (
            <div className="card p-8 h-full flex flex-col items-center justify-center text-center">
              <div className="relative w-16 h-16 mb-4">
                <Loader2 className="w-16 h-16 text-arctic-navy animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-arctic-navy">{lifecycleProgress}%</span>
              </div>
              <h3 className="text-sm font-medium text-slate-700">Generating your draft...</h3>
              <p className="text-xs text-slate-400 mt-1">Analyzing sources, structuring content, and suggesting visuals</p>
              <div className="w-full max-w-xs mt-4">
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-arctic-navy rounded-full transition-all duration-300" style={{ width: `${lifecycleProgress}%` }} />
                </div>
              </div>
            </div>
          )}
          {draft && (
            <div className="card p-5 space-y-5">
              <div>
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Generated Title</label>
                <h2 className="text-lg font-semibold text-slate-900 mt-1">{draft.title}</h2>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Excerpt</label>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{draft.excerpt}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Body Content</label>
                <div className="mt-1 p-4 bg-slate-50 rounded-lg text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {draft.body}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Suggested Categories</label>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {draft.suggestedCategories.map((cat: string) => (
                      <span key={cat} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">{cat}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Suggested Tags</label>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {draft.suggestedTags.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Suggested Images</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {draft.suggestedImages.map((img: string, i: number) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden border border-slate-200">
                      <img src={img} alt={`Suggested ${i + 1}`} className="w-full h-24 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Use This</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button onClick={handleSendToReview} className="btn-primary flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send to Review
                </button>
                <button onClick={handleSaveDraft} className="btn-secondary flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Draft
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Schedule
                </button>
              </div>
              <p className="text-xs text-slate-400">
                <ArrowRight className="w-3 h-3 inline mr-1" />
                Click "Send to Review" to move this content to the editorial workflow
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
