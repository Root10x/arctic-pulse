"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { StatusBadge } from "@/components/status-badge";
import {
  researchSources,
  monitoredArticles,
  generatedTopics,
  sites,
  articles,
  freeStockImages,
  aiGeneratedImages,
} from "@/lib/mock-data";
import {
  Link2,
  FileText,
  Upload,
  Search,
  Sparkles,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Plus,
  X,
  RefreshCw,
  Zap,
  BookOpen,
  Eye,
  TrendingUp,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Bot,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const inputMethods = [
  { id: "url", label: "Parse URL", icon: Link2, desc: "Extract topics from any article URL" },
  { id: "text", label: "Paste Text", icon: FileText, desc: "Analyze raw text or notes" },
  { id: "csv", label: "Upload CSV", icon: Upload, desc: "Bulk import article data" },
];

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<"sources" | "monitor" | "topics">("topics");
  const [inputMethod, setInputMethod] = useState("url");
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSourceDetail, setShowSourceDetail] = useState<string | null>(null);
  const [showTopicDetail, setShowTopicDetail] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<typeof generatedTopics[0] | null>(null);
  const [monitorFilter, setMonitorFilter] = useState<"all" | "changes">("all");

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveTab("topics");
    }, 2000);
  };

  const filteredMonitors = monitoredArticles.filter((m) => {
    if (monitorFilter === "changes") return m.changeDetected;
    return true;
  });

  const selectedSource = researchSources.find((s) => s.id === showSourceDetail);
  const selectedTopicDetail = generatedTopics.find((t) => t.id === showTopicDetail);

  return (
    <PageContainer
      title="Research"
      subtitle="AI-powered topic discovery and content intelligence"
      action={
        <button className="btn-primary flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Run Analysis
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - Input & Sources */}
        <div className="lg:col-span-1 space-y-5">
          {/* INPUT PANEL */}
          <div className="card p-5">
            <h2 className="font-semibold text-slate-900 mb-4">Add Source</h2>
            <div className="space-y-3 mb-4">
              {inputMethods.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setInputMethod(m.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                      inputMethod === m.id
                        ? "border-arctic-navy bg-arctic-navy/5"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                        inputMethod === m.id ? "bg-arctic-navy text-white" : "bg-slate-100 text-slate-600"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={cn("text-sm font-medium", inputMethod === m.id ? "text-arctic-navy" : "text-slate-900")}>
                        {m.label}
                      </p>
                      <p className="text-xs text-slate-500">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {inputMethod === "url" && (
              <div className="space-y-3">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/article"
                  className="input w-full"
                />
                <button
                  onClick={handleProcess}
                  disabled={isProcessing || !urlInput}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Parsing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Parse & Analyze
                    </>
                  )}
                </button>
              </div>
            )}

            {inputMethod === "text" && (
              <div className="space-y-3">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste article text, notes, or research snippets here..."
                  className="input w-full h-40 resize-none"
                />
                <button
                  onClick={handleProcess}
                  disabled={isProcessing || !textInput}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Extract Topics
                    </>
                  )}
                </button>
              </div>
            )}

            {inputMethod === "csv" && (
              <div className="space-y-3">
                <div className="p-6 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-700 font-medium">Upload CSV</p>
                  <p className="text-xs text-slate-500 mt-1">Drag and drop or click to browse</p>
                  <p className="text-xs text-slate-400 mt-2">.csv up to 10MB</p>
                </div>
                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Import & Analyze
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* PARSED SOURCES LIST */}
          <div className="card">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Parsed Sources</h3>
              <span className="text-xs text-slate-500">{researchSources.length} sources</span>
            </div>
            <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
              {researchSources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => setShowSourceDetail(source.id)}
                  className="w-full text-left px-5 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{source.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">{source.siteName}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">{source.topicsExtracted} topics</span>
                      </div>
                    </div>
                    <StatusBadge status={source.status} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Monitor & Topics */}
        <div className="lg:col-span-2 space-y-5">
          {/* TABS */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 w-fit">
            {([
              { id: "topics", label: "Generated Topics", count: generatedTopics.length },
              { id: "monitor", label: "Monitored Articles", count: monitoredArticles.length },
              { id: "sources", label: "Source Analysis", count: researchSources.length },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                  activeTab === tab.id
                    ? "bg-arctic-navy text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full",
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* TOPICS VIEW */}
          {activeTab === "topics" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  AI-generated article ideas from your sources and monitored content
                </p>
                <div className="flex items-center gap-2">
                  <select className="input text-sm py-1.5">
                    <option>All Categories</option>
                    <option>Policy</option>
                    <option>Environment</option>
                    <option>Tourism</option>
                    <option>Infrastructure</option>
                    <option>Science</option>
                  </select>
                  <select className="input text-sm py-1.5">
                    <option>All Urgency</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              {generatedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="card p-5 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setShowTopicDetail(topic.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-arctic-navy/10 text-arctic-navy rounded text-xs font-medium">
                          {topic.category}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-xs font-medium",
                            topic.urgency === "high"
                              ? "bg-red-50 text-red-700"
                              : topic.urgency === "medium"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-50 text-slate-600"
                          )}
                        >
                          {topic.urgency} urgency
                        </span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                          {topic.confidence}% match
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{topic.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">{topic.excerpt}</p>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" />
                          {topic.suggestedSite}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          ~{topic.wordCountEstimate} words
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {topic.angle} angle
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {topic.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTopic(topic);
                          setShowCreateModal(true);
                        }}
                        className="px-3 py-1.5 bg-arctic-navy text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Create Article
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-md text-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Preview
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Link2 className="w-3.5 h-3.5" />
                      {topic.sourceIds.length} source{topic.sourceIds.length !== 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      {topic.monitorIds.length} monitored article{topic.monitorIds.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MONITOR VIEW */}
          {activeTab === "monitor" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  External articles being monitored for updates and new developments
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMonitorFilter("all")}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-sm transition-colors",
                      monitorFilter === "all"
                        ? "bg-arctic-navy text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setMonitorFilter("changes")}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-1.5",
                      monitorFilter === "changes"
                        ? "bg-arctic-navy text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    Changes
                  </button>
                </div>
              </div>

              {filteredMonitors.map((article) => (
                <div
                  key={article.id}
                  className={cn(
                    "card p-5",
                    article.changeDetected && "border-l-4 border-l-amber-500"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-slate-500">{article.source}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Checked {article.lastChecked.split("T")[1].slice(0, 5)}
                        </span>
                        {article.changeDetected && (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-xs font-medium flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {article.changeType?.replace("_", " ")}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 mb-2">{article.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{article.summary}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {article.topics.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
                          >
                            {t.replace("_", " ")}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-slate-100 rounded-md transition-colors shrink-0"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SOURCES ANALYSIS VIEW */}
          {activeTab === "sources" && (
            <div className="space-y-4">
              {researchSources.map((source) => (
                <div key={source.id} className="card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-xs font-medium capitalize",
                            source.type === "url"
                              ? "bg-blue-50 text-blue-700"
                              : source.type === "text"
                              ? "bg-green-50 text-green-700"
                              : "bg-purple-50 text-purple-700"
                          )}
                        >
                          {source.type}
                        </span>
                        <span className="text-xs text-slate-500">{source.siteName}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">
                          {new Date(source.dateAdded).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 mb-2">{source.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{source.summary}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">
                          <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                          {source.topicsExtracted} topics extracted
                        </span>
                      </div>
                    </div>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-slate-100 rounded-md transition-colors shrink-0"
                      >
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SOURCE DETAIL DRAWER */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-[32rem] bg-white h-full shadow-xl flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Source Details</h3>
              <button
                onClick={() => setShowSourceDetail(null)}
                className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <span
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium capitalize",
                    selectedSource.type === "url"
                      ? "bg-blue-50 text-blue-700"
                      : selectedSource.type === "text"
                      ? "bg-green-50 text-green-700"
                      : "bg-purple-50 text-purple-700"
                  )}
                >
                  {selectedSource.type}
                </span>
                <h2 className="text-xl font-semibold text-slate-900 mt-3">{selectedSource.title}</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedSource.siteName}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">AI Summary</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedSource.summary}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Extracted Topics</h4>
                <div className="space-y-2">
                  {Array.from({ length: selectedSource.topicsExtracted }, (_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {["Regulatory framework analysis", "Economic impact assessment", "Environmental protocol review", "Stakeholder position mapping", "Timeline and implementation strategy", "Comparative regional analysis"][i]}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Confidence: {85 + i * 3}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedSource.url && (
                <a
                  href={selectedSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-arctic-ice hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Original Source
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOPIC DETAIL DRAWER */}
      {selectedTopicDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-[32rem] bg-white h-full shadow-xl flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Topic Intelligence</h3>
              <button
                onClick={() => setShowTopicDetail(null)}
                className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-arctic-navy/10 text-arctic-navy rounded text-xs font-medium">
                    {selectedTopicDetail.category}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                    {selectedTopicDetail.confidence}% confidence
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900">{selectedTopicDetail.title}</h2>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Recommended Angle</h4>
                <p className="text-sm text-slate-700 capitalize">{selectedTopicDetail.angle.replace("_", " ")}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  AI-Generated Excerpt
                </h4>
                <p className="text-sm text-blue-800 leading-relaxed">{selectedTopicDetail.excerpt}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Source Intelligence</h4>
                <div className="space-y-2">
                  {selectedTopicDetail.sourceIds.map((sid) => {
                    const src = researchSources.find((s) => s.id === sid);
                    return src ? (
                      <div key={sid} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                        <Link2 className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{src.title}</p>
                          <p className="text-xs text-slate-500">{src.siteName}</p>
                        </div>
                      </div>
                    ) : null;
                  })}
                  {selectedTopicDetail.monitorIds.map((mid) => {
                    const mon = monitoredArticles.find((m) => m.id === mid);
                    return mon ? (
                      <div key={mid} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                        <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{mon.title}</p>
                          <p className="text-xs text-slate-500">{mon.source}</p>
                        </div>
                        {mon.changeDetected && (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-xs ml-auto">
                            Updated
                          </span>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Suggested Keywords</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTopicDetail.keywords.map((kw) => (
                    <span key={kw} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Related Visuals</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedTopicDetail.relatedImages.map((imgId) => {
                    const aiImg = aiGeneratedImages.find((i) => i.id === imgId);
                    const stockImg = freeStockImages.find((i) => i.id === imgId);
                    const img = aiImg || stockImg;
                    return img ? (
                      <div key={imgId} className="aspect-video rounded-lg overflow-hidden border border-slate-200 relative group">
                        <img src={img.thumbnail || img.url} alt="" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-2 py-1">
                          {aiImg ? "AI Generated" : "Free Stock"}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowTopicDetail(null);
                  setSelectedTopic(selectedTopicDetail);
                  setShowCreateModal(true);
                }}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Article from Topic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE ARTICLE MODAL */}
      {showCreateModal && selectedTopic && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[28rem] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Create Article</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Title</label>
                <input type="text" defaultValue={selectedTopic.title} className="input w-full" />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Target Site</label>
                <select defaultValue={selectedTopic.suggestedSite} className="input w-full">
                  {sites.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Category</label>
                <select defaultValue={selectedTopic.category} className="input w-full">
                  <option>Policy</option>
                  <option>Environment</option>
                  <option>Tourism</option>
                  <option>Infrastructure</option>
                  <option>Science</option>
                  <option>Culture</option>
                  <option>Economy</option>
                  <option>Technology</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Priority</label>
                <div className="flex gap-2">
                  {["low", "medium", "high"].map((p) => (
                    <button
                      key={p}
                      className={cn(
                        "flex-1 py-2 rounded-md text-sm font-medium capitalize border transition-colors",
                        p === selectedTopic.urgency
                          ? "bg-arctic-navy text-white border-arctic-navy"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-800">
                  AI will auto-generate a draft from this topic with suggested images and metadata.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-primary flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Create & Go to Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
