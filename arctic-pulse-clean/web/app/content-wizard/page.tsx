"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight, ChevronLeft, FileText, Globe, Calendar, Image as ImageIcon,
  MessageSquare, Check, Sparkles, Loader2, Clock, Send, Eye,
} from "lucide-react";
import { sites } from "@/lib/mock-data";
import { SocialTeaserPreview } from "@/components/social-teaser";

const steps = [
  { id: "topic", label: "Topic", icon: FileText },
  { id: "target", label: "Target Site", icon: Globe },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "image", label: "Image", icon: ImageIcon },
  { id: "social", label: "Social", icon: MessageSquare },
  { id: "preview", label: "Preview", icon: Eye },
];

const mockImages = [
  { id: "img1", url: "https://picsum.photos/seed/wizard1/400/300", source: "unsplash", credit: "John Doe", relevance: 95 },
  { id: "img2", url: "https://picsum.photos/seed/wizard2/400/300", source: "unsplash", credit: "Jane Smith", relevance: 88 },
  { id: "img3", url: "https://picsum.photos/seed/wizard3/400/300", source: "pexels", credit: "Mike Johnson", relevance: 82 },
  { id: "img4", url: "https://picsum.photos/seed/wizard4/400/300", source: "ai", credit: "AI Generated", relevance: 100 },
];

export default function ContentWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [targetSite, setTargetSite] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("09:00");
  const [selectedImage, setSelectedImage] = useState("");
  const [socialEnabled, setSocialEnabled] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState<any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setDraft({
        title: `${topic}: Arctic Council Discusses New Shipping Regulations`,
        excerpt: "The Arctic Council convenes this week in Tromsø to discuss new shipping regulations as ice melt opens northern passages...",
        body: "The Arctic Council convenes this week in Tromsø to discuss new shipping regulations as ice melt opens northern passages. Delegates from all eight member states will review environmental protocols and safety standards for vessels navigating increasingly accessible Arctic waters.\n\nThe proposed regulations address ice-class certification requirements, mandatory satellite tracking for all commercial vessels, and updated environmental protection measures.",
        category: "Policy",
        tags: ["arctic council", "shipping", "tromsø"],
        wordCount: 1240,
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleSubmit = () => {
    router.push("/review-queue");
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "topic":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Article Topic or Headline</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Arctic Council Shipping Regulations Update"
                className="input w-full mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Research Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add key points, angles, or source URLs..."
                rows={4}
                className="input w-full mt-1 resize-none"
              />
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-700">
                The system will research this topic and generate a draft article with suggested images.
              </p>
            </div>
          </div>
        );

      case "target":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Target Website</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {sites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => setTargetSite(site.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      targetSite === site.id
                        ? "border-arctic-navy bg-arctic-navy/5"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600">
                        {site.logo}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${targetSite === site.id ? "text-arctic-navy" : "text-slate-900"}`}>
                          {site.name}
                        </p>
                        <p className="text-xs text-slate-500">{site.contentCount} articles · {site.health}% health</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Publish Date</label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="input w-full mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Publish Time</label>
                <input
                  type="time"
                  value={publishTime}
                  onChange={(e) => setPublishTime(e.target.value)}
                  className="input w-full mt-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <input type="checkbox" id="draft-review" className="rounded border-slate-300" defaultChecked />
              <label htmlFor="draft-review" className="text-sm text-slate-700">Send to review queue before publishing</label>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-xs text-amber-700">
                <Clock className="w-3 h-3 inline mr-1" />
                If scheduled, the article will be queued for automatic publishing at the specified time after editorial approval.
              </p>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-700">Suggested Images</h3>
              <span className="text-xs text-slate-500">Free stock photos found for this topic</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mockImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.id)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img.id ? "border-arctic-navy" : "border-transparent"
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white">{img.source === "ai" ? "AI Generated" : `${img.source} · ${img.credit}`}</span>
                      <span className="text-[10px] text-green-400">{img.relevance}% match</span>
                    </div>
                  </div>
                  {selectedImage === img.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-arctic-navy rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button className="btn-secondary w-full flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Generate Custom AI Image
            </button>
          </div>
        );

      case "social":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <input
                type="checkbox"
                id="social-toggle"
                checked={socialEnabled}
                onChange={(e) => setSocialEnabled(e.target.checked)}
                className="rounded border-slate-300"
              />
              <label htmlFor="social-toggle" className="text-sm text-slate-700 font-medium">
                Create social media teasers for this article
              </label>
            </div>
            {socialEnabled && draft && (
              <SocialTeaserPreview
                articleTitle={draft.title}
                articleUrl={`https://${sites.find(s => s.id === targetSite)?.url || "example.com"}/${draft.title.toLowerCase().replace(/\s+/g, "-")}`}
                featuredImage={mockImages.find(i => i.id === selectedImage)?.url || mockImages[0].url}
                excerpt={draft.excerpt}
              />
            )}
            {!draft && socialEnabled && (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
                <p className="text-sm text-slate-400">Generate a draft first to preview social teasers</p>
              </div>
            )}
          </div>
        );

      case "preview":
        return (
          <div className="space-y-4">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-arctic-navy animate-spin mb-3" />
                <p className="text-sm text-slate-500">Generating your article...</p>
              </div>
            ) : draft ? (
              <div className="space-y-4">
                <div className="card p-4">
                  <h3 className="text-lg font-semibold text-slate-900">{draft.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{draft.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{draft.category}</span>
                    <span className="text-xs text-slate-400">{draft.wordCount} words</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="card p-3">
                    <p className="text-xs text-slate-500">Target Site</p>
                    <p className="text-sm font-medium text-slate-900">{sites.find(s => s.id === targetSite)?.name || "Not selected"}</p>
                  </div>
                  <div className="card p-3">
                    <p className="text-xs text-slate-500">Publish Schedule</p>
                    <p className="text-sm font-medium text-slate-900">{publishDate || "Immediate"} {publishTime}</p>
                  </div>
                </div>
                {selectedImage && (
                  <div className="card p-3">
                    <p className="text-xs text-slate-500 mb-2">Featured Image</p>
                    <img src={mockImages.find(i => i.id === selectedImage)?.url} alt="" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
                {socialEnabled && (
                  <div className="card p-3 bg-blue-50/50 border-blue-200">
                    <p className="text-xs text-blue-700">✓ Facebook and Instagram teasers will be created</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <button onClick={handleGenerate} className="btn-primary flex items-center gap-2 mx-auto">
                  <Sparkles className="w-4 h-4" /> Generate Preview
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Create New Content</h1>
        <p className="text-slate-500 text-sm mt-1">Step-by-step content creation wizard</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className={`flex flex-col items-center flex-1 ${i <= currentStep ? "opacity-100" : "opacity-40"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  i < currentStep ? "bg-green-500 text-white" :
                  i === currentStep ? "bg-arctic-navy text-white" :
                  "bg-slate-200 text-slate-500"
                }`}>
                  {i < currentStep ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-[10px] text-slate-500 mt-1">{step.label}</span>
              </div>
              {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">{steps[currentStep].label}</h2>
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
            className="btn-primary flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!draft}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Send to Review Queue
          </button>
        )}
      </div>
    </div>
  );
}
