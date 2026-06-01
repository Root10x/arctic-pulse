"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { StatusBadge } from "@/components/status-badge";
import { reviewQueueArticles, sites, articles } from "@/lib/mock-data";
import {
  CheckCircle2,
  XCircle,
  Calendar,
  Send,
  Image,
  Tag,
  Folder,
  Link2,
  MessageSquare,
  ChevronRight,
  Clock,
  User,
  FileText,
  AlertCircle,
  CheckSquare,
  Sparkles,
  RotateCcw,
  MoreHorizontal,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const filters = [
  { key: "all", label: "All Items", count: reviewQueueArticles.length },
  { key: "pending_review", label: "Pending Review", count: reviewQueueArticles.filter((a) => a.status === "pending_review").length },
  { key: "needs_changes", label: "Needs Changes", count: reviewQueueArticles.filter((a) => a.status === "needs_changes").length },
  { key: "approved", label: "Approved", count: reviewQueueArticles.filter((a) => a.status === "approved").length },
];

const suggestedLinks = [
  { title: "Arctic Council Shipping Regulations", url: "/arctic-council-shipping" },
  { title: "Greenland Mineral Policy Overview", url: "/greenland-minerals" },
  { title: "Nordic Climate Adaptation Report", url: "/nordic-climate" },
  { title: "Iceland Tourism Statistics 2024", url: "/iceland-tourism" },
];

const suggestedTags = ["arctic", "policy", "shipping", "climate", "tourism", "mining", "nordic", "sustainability", "research", "infrastructure"];

const suggestedCategories = ["Policy", "Environment", "Tourism", "Infrastructure", "Science", "Economy"];

export default function ReviewQueuePage() {
  const [selectedId, setSelectedId] = useState(reviewQueueArticles[0]?.id);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [editorContent, setEditorContent] = useState<Record<string, { title: string; body: string }>>({});
  const [activeTab, setActiveTab] = useState<"metadata" | "checklist" | "suggestions">("metadata");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [changesNote, setChangesNote] = useState("");

  const filtered = reviewQueueArticles.filter((a) => {
    const matchesFilter = activeFilter === "all" || a.status === activeFilter;
    const matchesSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.siteName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selected = reviewQueueArticles.find((a) => a.id === selectedId) || filtered[0];

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateTitle = (id: string, title: string) => {
    setEditorContent((prev) => ({ ...prev, [id]: { ...prev[id], title } }));
  };

  const updateBody = (id: string, body: string) => {
    setEditorContent((prev) => ({ ...prev, [id]: { ...prev[id], body } }));
  };

  if (!selected) {
    return (
      <PageContainer title="Review Queue" subtitle="No articles in queue">
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <CheckCircle2 className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium">All caught up!</p>
          <p className="text-sm">No articles pending review.</p>
        </div>
      </PageContainer>
    );
  }

  const currentTitle = editorContent[selected.id]?.title ?? selected.title;
  const currentBody = editorContent[selected.id]?.body ?? selected.body;

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Review Queue</h1>
          <p className="text-sm text-slate-500">Editorial approval workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} in queue
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL - Article List */}
        <div className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-100 space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search queue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
              />
            </div>
            <div className="flex gap-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                    activeFilter === f.key
                      ? "bg-arctic-navy text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedId(article.id)}
                className={cn(
                  "w-full text-left p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors",
                  selectedId === article.id && "bg-blue-50/50 border-l-2 border-l-arctic-ice"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("text-sm font-medium line-clamp-2", selectedId === article.id ? "text-arctic-navy" : "text-slate-900")}>
                    {article.title}
                  </p>
                  {article.status === "needs_changes" && <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500">{article.siteName}</span>
                  <span className="text-slate-300">·</span>
                  <StatusBadge status={article.status} />
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <User className="w-3 h-3 text-slate-400" />
                  <span className="text-xs text-slate-400">{article.author}</span>
                  <Clock className="w-3 h-3 text-slate-400 ml-1" />
                  <span className="text-xs text-slate-400">
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER PANEL - Editor */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <StatusBadge status={selected.status} />
              <span className="text-sm text-slate-500">{selected.siteName}</span>
              <span className="text-slate-300">|</span>
              <span className="text-sm text-slate-500">{selected.wordCount} words</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChangesModal(true)}
                className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                Request Changes
              </button>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                Schedule
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Approve
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <input
              type="text"
              value={currentTitle}
              onChange={(e) => updateTitle(selected.id, e.target.value)}
              className="w-full text-2xl font-bold text-slate-900 border-none focus:outline-none focus:ring-0 bg-transparent placeholder:text-slate-300 mb-4"
              placeholder="Article title..."
            />

            <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {selected.author}
              </div>
              <div className="flex items-center gap-1.5">
                <Folder className="w-4 h-4" />
                {selected.category}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {new Date(selected.createdAt).toLocaleDateString()}
              </div>
            </div>

            <textarea
              value={currentBody}
              onChange={(e) => updateBody(selected.id, e.target.value)}
              className="w-full h-[calc(100%-8rem)] resize-none border-none focus:outline-none focus:ring-0 bg-transparent text-slate-700 leading-relaxed text-base"
              placeholder="Article content..."
            />
          </div>

          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>Last saved: Just now</span>
              <span className="text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Auto-saved
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Metadata & Actions */}
        <div className="w-80 border-l border-slate-200 bg-slate-50 flex flex-col shrink-0">
          <div className="flex border-b border-slate-200">
            {(["metadata", "checklist", "suggestions"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-3 text-xs font-medium capitalize transition-colors",
                  activeTab === tab
                    ? "text-arctic-navy border-b-2 border-arctic-navy bg-white"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "metadata" && (
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Folder className="w-3.5 h-3.5" />
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-700">
                      {selected.category}
                    </span>
                    {suggestedCategories.slice(0, 2).map((c) => (
                      <button
                        key={c}
                        className="px-2 py-1 bg-white border border-dashed border-slate-300 rounded-md text-xs text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-colors"
                      >
                        + {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Tag className="w-3.5 h-3.5" />
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-arctic-ice/10 text-arctic-navy rounded-md text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {suggestedTags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        className="px-2 py-1 bg-white border border-dashed border-slate-300 text-slate-500 rounded-md text-xs hover:border-slate-400 transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Link2 className="w-3.5 h-3.5" />
                    Internal Links
                  </label>
                  <div className="space-y-2">
                    {suggestedLinks.map((link) => (
                      <div
                        key={link.url}
                        className="flex items-center gap-2 p-2 bg-white rounded-md border border-slate-200 text-xs"
                      >
                        <Link2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-slate-700 truncate flex-1">{link.title}</span>
                        <button className="text-arctic-ice hover:text-arctic-navy">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Image className="w-3.5 h-3.5" />
                    Featured Image
                  </label>
                  <div className="relative aspect-video bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src={selected.featuredImage}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 py-1.5 text-xs bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                      Replace
                    </button>
                    <button className="flex-1 py-1.5 text-xs bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "checklist" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 mb-3">Complete all checks before approval</p>
                {[
                  { key: "headline", label: "Headline Reviewed", desc: "Clear, accurate, engaging" },
                  { key: "content", label: "Content Reviewed", desc: "Fact-checked, well-structured" },
                  { key: "image", label: "Image Approved", desc: "Relevant, properly credited" },
                  { key: "links", label: "Links Verified", desc: "All internal links working" },
                  { key: "seo", label: "SEO Optimized", desc: "Meta description, keywords set" },
                  { key: "grammar", label: "Grammar & Style", desc: "No errors, consistent tone" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleCheck(item.key)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-all",
                      checklist[item.key]
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5",
                          checklist[item.key]
                            ? "bg-green-500 border-green-500"
                            : "border-slate-300"
                        )}
                      >
                        {checklist[item.key] && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            checklist[item.key] ? "text-green-800" : "text-slate-900"
                          )}
                        >
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-semibold text-slate-900">
                      {Object.values(checklist).filter(Boolean).length} / 6
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{
                        width: `${(Object.values(checklist).filter(Boolean).length / 6) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "suggestions" && (
              <div className="space-y-5">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Editorial Recommendations</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Consider adding a section on recent Arctic Council decisions to strengthen the policy angle.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Related Articles
                  </h4>
                  <div className="space-y-2">
                    {articles.slice(0, 4).map((a) => (
                      <div
                        key={a.id}
                        className="p-2.5 bg-white rounded-md border border-slate-200 text-xs hover:border-slate-300 transition-colors cursor-pointer"
                      >
                        <p className="font-medium text-slate-900 line-clamp-1">{a.title}</p>
                        <p className="text-slate-500 mt-0.5">{a.siteName}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Reading Time
                  </h4>
                  <div className="flex items-center gap-2 p-3 bg-white rounded-md border border-slate-200">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-700">
                      {Math.ceil(selected.wordCount / 200)} min read
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Tone Analysis
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: "Professional", value: 85 },
                      { label: "Accessible", value: 70 },
                      { label: "Engaging", value: 60 },
                    ].map((tone) => (
                      <div key={tone.label}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-600">{tone.label}</span>
                          <span className="text-slate-900 font-medium">{tone.value}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-arctic-ice rounded-full"
                            style={{ width: `${tone.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Schedule Publication</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Date</label>
                <input type="date" className="input w-full" defaultValue="2024-06-05" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Time</label>
                <input type="time" className="input w-full" defaultValue="10:00" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Target Site</label>
                <select className="input w-full">
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="btn-primary"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Changes Modal */}
      {showChangesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[32rem] p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Request Changes</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded border-slate-300" defaultChecked />
                Headline needs revision
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded border-slate-300" />
                Add more sources/citations
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded border-slate-300" />
                Image quality insufficient
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded border-slate-300" />
                Tone too technical
              </label>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Additional Notes</label>
                <textarea
                  value={changesNote}
                  onChange={(e) => setChangesNote(e.target.value)}
                  className="input w-full h-24 resize-none"
                  placeholder="Describe required changes..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() => setShowChangesModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowChangesModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Send Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
