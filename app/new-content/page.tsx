"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { sites, articles, freeStockImages, aiGeneratedImages } from "@/lib/mock-data";
import {
  Type,
  Link,
  FileText,
  Upload,
  Send,
  Save,
  Sparkles,
  CheckCircle2,
  Globe,
  Tag,
  Folder,
  Clock,
  X,
  ChevronRight,
  Wand2,
  Image as ImageIcon,
  Search,
  RefreshCw,
  Bot,
  Download,
  Check,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const inputMethods = [
  { id: "topic", label: "Topic Input", icon: Type, desc: "Start with a headline and notes" },
  { id: "url", label: "URL Input", icon: Link, desc: "Import from an existing article" },
  { id: "paste", label: "Paste Content", icon: FileText, desc: "Paste raw text directly" },
  { id: "bulk", label: "Bulk Upload", icon: Upload, desc: "Upload CSV with multiple articles" },
];

const mockDraft = {
  title: "Arctic Council Shipping Regulations: New Safety Protocols for Northern Passages",
  excerpt: "The Arctic Council convenes this week in Tromsø to discuss new shipping regulations as ice melt opens northern passages. Delegates from all eight member states will review environmental protocols...",
  body: `The Arctic Council convenes this week in Tromsø to discuss new shipping regulations as ice melt opens northern passages. Delegates from all eight member states will review environmental protocols designed to protect fragile ecosystems while enabling sustainable commerce.

Key topics on the agenda include mandatory ice-class certification for vessels traversing Arctic waters, updated emergency response procedures, and stricter ballast water treatment standards to prevent invasive species introduction.

Norwegian maritime authorities have championed the proposed framework, citing a 40% increase in northern shipping traffic over the past decade. The new regulations would require all vessels over 500 gross tons to carry specialized ice navigation equipment and maintain continuous satellite tracking.

Environmental groups have cautiously welcomed the proposals while urging delegates to consider seasonal restrictions in particularly sensitive habitats. The World Wildlife Fund presented research indicating that summer shipping corridors overlap with critical breeding grounds for several seabird species.

The council expects to publish final recommendations by autumn, with implementation targeted for the 2025 navigation season.`,
  category: "Policy",
  tags: ["arctic", "shipping", "policy", "environment", "maritime"],
  suggestedImages: [
    "https://picsum.photos/seed/ship1/400/250",
    "https://picsum.photos/seed/ship2/400/250",
    "https://picsum.photos/seed/ship3/400/250",
  ],
  readingTime: "4 min",
  wordCount: 342,
};

export default function NewContentPage() {
  const [method, setMethod] = useState("topic");
  const [headline, setHeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [targetSite, setTargetSite] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [pastedContent, setPastedContent] = useState("");
  const [showDraft, setShowDraft] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [sentToReview, setSentToReview] = useState(false);
  const [imageTab, setImageTab] = useState<"free" | "ai">("free");
  const [isSearchingImages, setIsSearchingImages] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageDetail, setShowImageDetail] = useState<typeof freeStockImages[0] | typeof aiGeneratedImages[0] | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAIPrompt, setShowAIPrompt] = useState(false);

  const handleGenerate = () => {
    setShowDraft(true);
    setDraftSaved(false);
    setSentToReview(false);
    // Auto-generate AI prompt from article topic
    setAiPrompt("A majestic icebreaker ship navigating through frozen Arctic waters at golden hour, editorial photography style, cinematic lighting, ice formations in foreground");
  };

  const handleSearchImages = () => {
    setIsSearchingImages(true);
    setTimeout(() => setIsSearchingImages(false), 1500);
  };

  const handleGenerateAI = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setIsGeneratingAI(false);
      setShowAIPrompt(true);
    }, 2000);
  };

  return (
    <PageContainer title="New Content" subtitle="Central content intake hub">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT PANEL */}
        <div className="space-y-5">
          <div className="card p-5">
            <h2 className="font-semibold text-slate-900 mb-4">Choose Input Method</h2>
            <div className="grid grid-cols-2 gap-3">
              {inputMethods.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => { setMethod(m.id); setShowDraft(false); }}
                    className={cn(
                      "p-4 rounded-lg border text-left transition-all",
                      method === m.id
                        ? "border-arctic-navy bg-arctic-navy/5"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                      method === m.id ? "bg-arctic-navy text-white" : "bg-slate-100 text-slate-600"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className={cn("text-sm font-medium", method === m.id ? "text-arctic-navy" : "text-slate-900")}>
                      {m.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{m.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card p-5">
            {method === "topic" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Enter article headline..."
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add brief notes or bullet points..."
                    className="input w-full h-32 resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Target Site</label>
                  <select
                    value={targetSite}
                    onChange={(e) => setTargetSite(e.target.value)}
                    className="input w-full"
                  >
                    <option value="">Select a site...</option>
                    {sites.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {method === "url" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Source URL</label>
                  <input
                    type="url"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder="https://example.com/article"
                    className="input w-full"
                  />
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-center">
                  <Link className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Paste a URL to import and restructure content</p>
                </div>
              </div>
            )}

            {method === "paste" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Paste Content</label>
                  <textarea
                    value={pastedContent}
                    onChange={(e) => setPastedContent(e.target.value)}
                    placeholder="Paste your article content here..."
                    className="input w-full h-64 resize-none"
                  />
                </div>
              </div>
            )}

            {method === "bulk" && (
              <div className="space-y-4">
                <div className="p-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 text-center">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-700">Upload CSV file</p>
                  <p className="text-xs text-slate-500 mt-1">Drag and drop or click to browse</p>
                  <p className="text-xs text-slate-400 mt-3">Supports .csv files up to 10MB</p>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              className="w-full mt-4 btn-primary flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Generate Draft
            </button>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div>
          {!showDraft ? (
            <div className="card p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Draft Preview</h3>
              <p className="text-sm text-slate-500 max-w-xs">
                Select an input method and generate to see your draft preview here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {draftSaved && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-800">
                  <CheckCircle2 className="w-4 h-4" />
                  Draft saved successfully
                </div>
              )}
              {sentToReview && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-sm text-blue-800">
                  <CheckCircle2 className="w-4 h-4" />
                  Sent to review queue
                </div>
              )}

              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-arctic-navy/10 text-arctic-navy rounded text-xs font-medium">
                    Draft Assistant
                  </span>
                  <span className="text-xs text-slate-400">Generated just now</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3">{mockDraft.title}</h2>

                <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    {targetSite ? sites.find((s) => s.id === targetSite)?.name : "Iceland Review"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Folder className="w-3.5 h-3.5" />
                    {mockDraft.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {mockDraft.readingTime} read
                  </span>
                  <span>{mockDraft.wordCount} words</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {mockDraft.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                  {mockDraft.body}
                </div>

                {/* IMAGE SOURCING MODULE */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Visual Sourcing
                    </h4>
                    <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
                      <button
                        onClick={() => { setImageTab("free"); handleSearchImages(); }}
                        className={cn(
                          "px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1",
                          imageTab === "free" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                        )}
                      >
                        <Search className="w-3 h-3" />
                        Free Photos
                      </button>
                      <button
                        onClick={() => setImageTab("ai")}
                        className={cn(
                          "px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1",
                          imageTab === "ai" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                        )}
                      >
                        <Bot className="w-3 h-3" />
                        AI Generated
                      </button>
                    </div>
                  </div>

                  {imageTab === "free" && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search free stock photos..."
                            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
                          />
                        </div>
                        <button
                          onClick={handleSearchImages}
                          disabled={isSearchingImages}
                          className="px-3 py-1.5 bg-arctic-navy text-white rounded-md text-xs font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                        >
                          {isSearchingImages ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              Searching...
                            </>
                          ) : (
                            <>
                              <Search className="w-3 h-3" />
                              Search
                            </>
                          )}
                        </button>
                      </div>

                      {isSearchingImages ? (
                        <div className="grid grid-cols-3 gap-3">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="aspect-video bg-slate-100 rounded-lg animate-pulse" />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-3">
                          {freeStockImages.slice(0, 6).map((img) => (
                            <div
                              key={img.id}
                              onClick={() => setSelectedImage(selectedImage === img.id ? null : img.id)}
                              className={cn(
                                "relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer transition-all group",
                                selectedImage === img.id ? "border-arctic-navy ring-2 ring-arctic-navy/20" : "border-slate-200 hover:border-slate-300"
                              )}
                            >
                              <img src={img.thumbnail} alt={img.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                              {selectedImage === img.id && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-arctic-navy rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-2 py-0.5 flex items-center justify-between">
                                <span>{img.credit}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setShowImageDetail(img); }}
                                  className="hover:text-arctic-ice"
                                >
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <Search className="w-3 h-3" />
                        Sourced from Unsplash, Pexels, Pixabay — attribution included
                      </p>
                    </div>
                  )}

                  {imageTab === "ai" && (
                    <div>
                      {!showAIPrompt ? (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 rounded-full bg-arctic-navy/10 flex items-center justify-center mx-auto mb-3">
                            <Bot className="w-6 h-6 text-arctic-navy" />
                          </div>
                          <p className="text-sm text-slate-700 mb-1">No free images match your topic?</p>
                          <p className="text-xs text-slate-500 mb-4">Generate custom visuals from your article</p>
                          <button
                            onClick={handleGenerateAI}
                            disabled={isGeneratingAI}
                            className="px-4 py-2 bg-arctic-navy text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
                          >
                            {isGeneratingAI ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Generating prompt & images...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                Auto-Generate Images
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                            <div className="flex items-center gap-2 mb-1.5">
                              <Bot className="w-4 h-4 text-blue-600" />
                              <span className="text-xs font-semibold text-blue-900">Auto-Generated Prompt</span>
                            </div>
                            <p className="text-xs text-blue-800 leading-relaxed">{aiPrompt}</p>
                            <button
                              onClick={() => setAiPrompt(aiPrompt + ", ultra-detailed, 8k resolution")}
                              className="text-xs text-blue-600 hover:underline mt-1.5"
                            >
                              Refine prompt
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {aiGeneratedImages.slice(0, 4).map((img) => (
                              <div
                                key={img.id}
                                onClick={() => setSelectedImage(selectedImage === img.id ? null : img.id)}
                                className={cn(
                                  "relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer transition-all group",
                                  selectedImage === img.id ? "border-arctic-navy ring-2 ring-arctic-navy/20" : "border-slate-200 hover:border-slate-300"
                                )}
                              >
                                <img src={img.thumbnail} alt={img.prompt.slice(0, 30)} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                {selectedImage === img.id && (
                                  <div className="absolute top-2 right-2 w-5 h-5 bg-arctic-navy rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-2 py-0.5">
                                  AI Generated
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleGenerateAI}
                              className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-md text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                            >
                              <RefreshCw className="w-3 h-3" />
                              Regenerate
                            </button>
                            <button className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-md text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                              <Download className="w-3 h-3" />
                              Download All
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDraftSaved(true)}
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button
                  onClick={() => setSentToReview(true)}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send to Review
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Schedule
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* IMAGE DETAIL MODAL */}
      {showImageDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[28rem] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Image Details</h3>
              <button
                onClick={() => setShowImageDetail(null)}
                className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden border border-slate-200 mb-4">
              <img
                src={showImageDetail.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Title</label>
                <p className="text-sm text-slate-900">{(showImageDetail as any).title || "AI Generated Image"}</p>
              </div>
              {"credit" in showImageDetail && (
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Credit</label>
                  <p className="text-sm text-slate-700">{showImageDetail.credit} (Free to use with attribution)</p>
                </div>
              )}
              {"prompt" in showImageDetail && (
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Prompt</label>
                  <p className="text-sm text-slate-700">{(showImageDetail as any).prompt}</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => { setSelectedImage(showImageDetail.id); setShowImageDetail(null); }}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Use as Featured
              </button>
              <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
