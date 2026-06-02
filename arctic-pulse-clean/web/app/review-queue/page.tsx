"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2, Clock, AlertCircle, Send, Calendar, MessageSquare,
  ChevronRight, Check, X, Image as ImageIcon, Link as LinkIcon,
  Tag, FolderOpen, Loader2, ArrowRight, Eye, Edit3, ThumbsUp,
  ThumbsDown, RotateCcw, ExternalLink,
} from "lucide-react";
import { articles, sites, lifecycleStages } from "@/lib/mock-data";

type StatusFilter = "all" | "pending_review" | "needs_changes" | "approved";

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  pending_review: { label: "Pending Review", color: "text-amber-700", bg: "bg-amber-50", icon: Clock },
  needs_changes: { label: "Needs Changes", color: "text-red-700", bg: "bg-red-50", icon: AlertCircle },
  approved: { label: "Approved", color: "text-green-700", bg: "bg-green-50", icon: CheckCircle2 },
};

export default function ReviewQueuePage() {
  const router = useRouter();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [changesNote, setChangesNote] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("09:00");
  const [localArticles, setLocalArticles] = useState(articles);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const reviewArticles = localArticles.filter(a => ["pending_review", "needs_changes", "approved"].includes(a.status));

  const filtered = reviewArticles.filter(a => {
    const matchesFilter = filter === "all" || a.status === filter;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.siteName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selected = localArticles.find(a => a.id === selectedId) || filtered[0] || null;

  const handleApprove = () => {
    if (!selected) return;
    setLocalArticles(prev => prev.map(a => a.id === selected.id ? { ...a, status: "approved" as const } : a));
    setShowSuccess("Article approved — ready to schedule or publish");
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleRequestChanges = () => {
    if (!selected || !changesNote.trim()) return;
    setLocalArticles(prev => prev.map(a => a.id === selected.id ? { ...a, status: "needs_changes" as const } : a));
    setShowChangesModal(false);
    setChangesNote("");
    setShowSuccess("Changes requested — article sent back to author");
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleSchedule = () => {
    if (!selected) return;
    setLocalArticles(prev => prev.map(a => a.id === selected.id ? { ...a, status: "scheduled" as const, scheduledAt: new Date(`${scheduleDate}T${scheduleTime}`).toISOString() } : a));
    setShowScheduleModal(false);
    setShowSuccess("Article scheduled — added to publishing calendar");
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handlePublishNow = () => {
    if (!selected) return;
    setLocalArticles(prev => prev.map(a => a.id === selected.id ? { ...a, status: "published" as const } : a));
    setShowPublishModal(false);
    setShowSuccess("Article published — live on site");
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const checklistItems = [
    { label: "Headline Reviewed", checked: selected?.lifecycle.history.some(h => h.stage === "review") || false },
    { label: "Content Reviewed", checked: selected?.status === "approved" || selected?.status === "scheduled" || selected?.status === "published" },
    { label: "Image Approved", checked: !!selected?.featuredImage },
    { label: "Links Verified", checked: true },
    { label: "SEO Metadata Set", checked: selected?.tags.length > 0 },
    { label: "Category Assigned", checked: !!selected?.category },
  ];

  const completedChecks = checklistItems.filter(i => i.checked).length;
  const checklistProgress = Math.round((completedChecks / checklistItems.length) * 100);

  return (
    <div className="space-y-4">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-medium">{showSuccess}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Review Queue</h1>
          <p className="text-slate-500 text-sm mt-1">Editorial approval workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{filtered.length} items</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {(["all", "pending_review", "needs_changes", "approved"] as StatusFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f
                ? "bg-arctic-navy text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f === "all" ? "All" : f === "pending_review" ? "Pending" : f === "needs_changes" ? "Needs Changes" : "Approved"}
          </button>
        ))}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="input ml-auto w-64"
        />
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-280px)]">
        {/* Left: Article List */}
        <div className="lg:col-span-3 card overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-100 bg-slate-50/50">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Articles</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map((article) => {
              const config = statusConfig[article.status];
              const StatusIcon = config.icon;
              const isSelected = selected?.id === article.id;
              return (
                <button
                  key={article.id}
                  onClick={() => setSelectedId(article.id)}
                  className={`w-full text-left p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                    isSelected ? "bg-blue-50 border-l-2 border-l-arctic-navy" : "border-l-2 border-l-transparent"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <StatusIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isSelected ? "text-arctic-navy" : "text-slate-900"}`}>
                        {article.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{article.siteName}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                          {config.label}
                        </span>
                        <span className="text-[10px] text-slate-400">{article.wordCount} words</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-400">No articles found</p>
              </div>
            )}
          </div>
        </div>

        {/* Center: Editor */}
        <div className="lg:col-span-6 card overflow-hidden flex flex-col">
          {selected ? (
            <>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[selected.status].bg} ${statusConfig[selected.status].color}`}>
                    {statusConfig[selected.status].label}
                  </span>
                  <span className="text-xs text-slate-400">{selected.siteName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <input
                  type="text"
                  defaultValue={selected.title}
                  className="w-full text-xl font-semibold text-slate-900 border-none focus:outline-none focus:ring-0 bg-transparent"
                />
                <textarea
                  defaultValue={selected.excerpt}
                  rows={2}
                  className="w-full text-sm text-slate-500 border-none focus:outline-none focus:ring-0 bg-transparent resize-none"
                />
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selected.body}</p>
                </div>

                {/* Content Lifecycle Tracker */}
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-slate-900">Content Lifecycle Progress</h4>
                    <span className="text-xs font-medium text-blue-600">{selected.lifecycle.progress}% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${selected.lifecycle.progress}%` }} />
                  </div>
                  <div className="space-y-2">
                    {selected.lifecycle.history.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-600">{h.note}</span>
                        <span className="text-slate-400 ml-auto">{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    ))}
                    {selected.status === "pending_review" && (
                      <div className="flex items-center gap-2 text-xs text-amber-600">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Awaiting editorial review...</span>
                      </div>
                    )}
                    {selected.status === "approved" && (
                      <div className="flex items-center gap-2 text-xs text-blue-600">
                        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Ready to schedule or publish</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2">
                {selected.status === "pending_review" && (
                  <>
                    <button onClick={handleApprove} className="btn-primary flex items-center gap-2">
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button onClick={() => setShowChangesModal(true)} className="btn-secondary flex items-center gap-2 text-amber-700 border-amber-200 hover:bg-amber-50">
                      <MessageSquare className="w-4 h-4" /> Request Changes
                    </button>
                  </>
                )}
                {selected.status === "needs_changes" && (
                  <>
                    <button onClick={handleApprove} className="btn-primary flex items-center gap-2">
                      <Check className="w-4 h-4" /> Approve After Changes
                    </button>
                    <span className="text-xs text-amber-600 ml-2">Author has been notified of requested changes</span>
                  </>
                )}
                {selected.status === "approved" && (
                  <>
                    <button onClick={() => setShowScheduleModal(true)} className="btn-primary flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Schedule
                    </button>
                    <button onClick={() => setShowPublishModal(true)} className="btn-secondary flex items-center gap-2 text-green-700 border-green-200 hover:bg-green-50">
                      <ExternalLink className="w-4 h-4" /> Publish Now
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <ClipboardPaste className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-sm text-slate-400">Select an article to review</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Metadata Panel */}
        <div className="lg:col-span-3 card overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-100 bg-slate-50/50">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Publishing Intelligence</p>
          </div>
          {selected ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Review Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-slate-900">Review Checklist</h4>
                  <span className="text-xs text-slate-500">{completedChecks}/{checklistItems.length}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${checklistProgress}%` }} />
                </div>
                <div className="space-y-2">
                  {checklistItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        item.checked ? "bg-green-500 border-green-500" : "border-slate-300"
                      }`}>
                        {item.checked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-xs ${item.checked ? "text-slate-500 line-through" : "text-slate-700"}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-2">Featured Image</h4>
                <div className="relative rounded-lg overflow-hidden border border-slate-200">
                  <img src={selected.featuredImage} alt="Featured" className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="px-2 py-1 bg-white text-xs rounded text-slate-700">Replace</button>
                    <button className="px-2 py-1 bg-white text-xs rounded text-slate-700">Remove</button>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-500">Category</label>
                  <div className="flex items-center gap-2 mt-1">
                    <FolderOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm text-slate-700">{selected.category}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Tags</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded">{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Author</label>
                  <p className="text-sm text-slate-700 mt-0.5">{selected.author}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Word Count</label>
                  <p className="text-sm text-slate-700 mt-0.5">{selected.wordCount} words</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Created</label>
                  <p className="text-sm text-slate-700 mt-0.5">{new Date(selected.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Editorial Suggestions */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="text-xs font-medium text-amber-800 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Suggestions
                </h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-amber-700 flex items-start gap-1.5">
                    <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    Consider adding a subheading after paragraph 2
                  </li>
                  <li className="text-xs text-amber-700 flex items-start gap-1.5">
                    <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    Image alt text could be more descriptive
                  </li>
                  <li className="text-xs text-amber-700 flex items-start gap-1.5">
                    <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    Add internal link to related article on permafrost
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <p className="text-sm text-slate-400">Select an article to view metadata</p>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Schedule Publication</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Date</label>
                <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="input w-full mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Time</label>
                <input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="input w-full mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Site</label>
                <p className="text-sm text-slate-500 mt-1">{selected.siteName}</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button onClick={() => setShowScheduleModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleSchedule} disabled={!scheduleDate} className="btn-primary disabled:opacity-50">Schedule</button>
            </div>
          </div>
        </div>
      )}

      {/* Request Changes Modal */}
      {showChangesModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Request Changes</h3>
            <p className="text-sm text-slate-500 mb-3">Article: <span className="text-slate-700 font-medium">{selected.title}</span></p>
            <textarea
              value={changesNote}
              onChange={(e) => setChangesNote(e.target.value)}
              placeholder="Describe what needs to be changed..."
              rows={4}
              className="input w-full resize-none"
            />
            <div className="flex items-center justify-end gap-2 mt-4">
              <button onClick={() => setShowChangesModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleRequestChanges} disabled={!changesNote.trim()} className="btn-secondary text-amber-700 border-amber-200 hover:bg-amber-50 disabled:opacity-50">
                Send Back to Author
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Now Modal */}
      {showPublishModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Publish Now</h3>
            <p className="text-sm text-slate-500 mb-4">
              This will immediately publish <span className="text-slate-700 font-medium">{selected.title}</span> to {selected.siteName}.
            </p>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 mb-4">
              <p className="text-xs text-amber-700">This action cannot be undone. The article will go live immediately.</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setShowPublishModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={handlePublishNow} className="btn-primary bg-green-600 hover:bg-green-700">Publish Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
