"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, Brain, Layers, Eye, Sparkles, ChevronRight, CheckCircle2,
  Clock, AlertCircle, TrendingUp, ExternalLink, Zap, BarChart3,
  ArrowRight, Loader2, Tag, Send, Plus, X, Globe, FileText,
  Rss, Link as LinkIcon, Hash, FolderOpen, BookOpen,
} from "lucide-react";
import {
  researchTopics, monitoredSources, researchSources, monitoredArticles, generatedTopics,
} from "@/lib/mock-data";

const tabs = [
  { id: "topics", label: "Research Topics", icon: Brain, count: researchTopics.length },
  { id: "sources", label: "Sources", icon: Layers, count: researchSources.length },
  { id: "monitored", label: "Monitored", icon: Eye, count: monitoredArticles.length },
  { id: "generated", label: "Generated", icon: Sparkles, count: generatedTopics.length },
];

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState("topics");
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<typeof researchTopics[0] | null>(null);
  const [selectedGenerated, setSelectedGenerated] = useState<typeof generatedTopics[0] | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredTopics = researchTopics.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSources = researchSources.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.siteName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMonitored = monitoredArticles.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.source.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGenerated = generatedTopics.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleGenerateDraft = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowCreateModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Research Module</h1>
          <p className="text-slate-500 text-sm mt-1">Discover, monitor, and generate content ideas from sources</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Research Topic
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Research Topics", value: researchTopics.length, icon: Brain, color: "bg-blue-50 text-blue-600" },
          { label: "Sources", value: researchSources.length, icon: Layers, color: "bg-green-50 text-green-600" },
          { label: "Monitored", value: monitoredArticles.length, icon: Eye, color: "bg-amber-50 text-amber-600" },
          { label: "Generated", value: generatedTopics.length, icon: Sparkles, color: "bg-purple-50 text-purple-600" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs & Search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-arctic-navy text-white" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>{tab.count}</span>
              </button>
            );
          })}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search research..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
          />
        </div>
      </div>

      {/* TAB: Research Topics */}
      {activeTab === "topics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left card p-4 hover:shadow-md transition-shadow ${
                  selectedTopic?.id === topic.id ? "ring-2 ring-arctic-navy" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{topic.title}</h3>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full">{topic.category}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{topic.contextSummary}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400">Suggested: {topic.suggestedSite}</span>
                      <span className="text-xs text-slate-400">{topic.sourceCount} sources</span>
                      <span className="text-xs text-green-600 font-medium">{topic.confidence}% confidence</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="card p-5 h-fit">
            {selectedTopic ? (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Selected Topic</span>
                  <h3 className="text-base font-semibold text-slate-900 mt-1">{selectedTopic.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">{selectedTopic.category}</span>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">{selectedTopic.confidence}% confidence</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Angle</span>
                  <p className="text-sm text-slate-700 mt-0.5">{selectedTopic.angle}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Context</span>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{selectedTopic.contextSummary}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Suggested Site</span>
                  <p className="text-sm text-slate-700 mt-0.5">{selectedTopic.suggestedSite}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Sources ({selectedTopic.sourceCount})</span>
                  <div className="space-y-1 mt-1">
                    {selectedTopic.sources.map((s, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Related Trends</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTopic.relatedTrends.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <Link href="/new-content" className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                    <Send className="w-4 h-4" /> Create Draft
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Select a topic to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: Sources */}
      {activeTab === "sources" && (
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Monitored Sources</h3>
            <div className="space-y-3">
              {monitoredSources.map((source) => (
                <div key={source.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {source.type === "feed" ? <Rss className="w-5 h-5 text-green-600" /> : <Globe className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900">{source.name}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        source.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {source.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{source.articlesFound} articles found · Last scan: {source.lastScan}</p>
                  </div>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Research Sources</h3>
            <div className="space-y-3">
              {filteredSources.map((source) => (
                <div key={source.id} className="flex items-start gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {source.type === "url" ? <Globe className="w-5 h-5 text-blue-600" /> :
                     source.type === "csv" ? <BarChart3 className="w-5 h-5 text-purple-600" /> :
                     <FileText className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{source.title}</p>
                    <p className="text-xs text-slate-500">{source.siteName} · {source.topicsExtracted} topics extracted</p>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{source.summary}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${
                    source.status === "parsed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {source.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: Monitored Articles */}
      {activeTab === "monitored" && (
        <div className="space-y-3">
          {filteredMonitored.map((article) => (
            <div key={article.id} className="card p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">{article.title}</h3>
                    {article.changeDetected && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        article.changeType === "major_update" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {article.changeType === "major_update" ? "Major Update" : "New Development"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{article.source} · Checked {article.lastChecked}</p>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{article.summary}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {article.topics.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <Link href="/new-content" className="p-1.5 text-slate-400 hover:text-arctic-navy hover:bg-blue-50 rounded">
                    <Send className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: Generated Topics */}
      {activeTab === "generated" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {filteredGenerated.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedGenerated(topic)}
                className={`w-full text-left card p-4 hover:shadow-md transition-shadow ${
                  selectedGenerated?.id === topic.id ? "ring-2 ring-arctic-navy" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{topic.title}</h3>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full">{topic.category}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        topic.urgency === "high" ? "bg-red-100 text-red-700" :
                        topic.urgency === "medium" ? "bg-amber-100 text-amber-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {topic.urgency} urgency
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{topic.excerpt}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400">{topic.wordCountEstimate} words est.</span>
                      <span className="text-xs text-green-600 font-medium">{topic.confidence}% confidence</span>
                      <span className="text-xs text-slate-400">For: {topic.suggestedSite}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="card p-5 h-fit">
            {selectedGenerated ? (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Generated Topic</span>
                  <h3 className="text-base font-semibold text-slate-900 mt-1">{selectedGenerated.title}</h3>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full">{selectedGenerated.category}</span>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">{selectedGenerated.confidence}% confidence</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    selectedGenerated.urgency === "high" ? "bg-red-100 text-red-700" :
                    selectedGenerated.urgency === "medium" ? "bg-amber-100 text-amber-700" :
                    "bg-green-100 text-green-700"
                  }`}>{selectedGenerated.urgency} urgency</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Angle</span>
                  <p className="text-sm text-slate-700 mt-0.5 capitalize">{selectedGenerated.angle}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Excerpt</span>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{selectedGenerated.excerpt}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Keywords</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedGenerated.keywords.map((k) => (
                      <span key={k} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{k}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Suggested Site</span>
                  <p className="text-sm text-slate-700 mt-0.5">{selectedGenerated.suggestedSite}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Word Count Estimate</span>
                  <p className="text-sm text-slate-700 mt-0.5">{selectedGenerated.wordCountEstimate} words</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <Link href="/new-content" className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                    <Send className="w-4 h-4" /> Create Draft
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Sparkles className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Select a generated topic to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">New Research Topic</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1.5 hover:bg-slate-100 rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Topic or Keyword</label>
                <input type="text" placeholder="e.g., Arctic shipping regulations" className="input w-full mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Target Site</label>
                <select className="input w-full mt-1">
                  <option>All Sites</option>
                  <option>Greenland Review</option>
                  <option>Nordic Current</option>
                  <option>Norway Review</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Category</label>
                <select className="input w-full mt-1">
                  <option>Policy</option>
                  <option>Tourism</option>
                  <option>Environment</option>
                  <option>Infrastructure</option>
                </select>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700">The system will scan sources and generate research insights for this topic.</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleGenerateDraft} disabled={isGenerating} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Researching...</> : <><Brain className="w-4 h-4" /> Start Research</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
