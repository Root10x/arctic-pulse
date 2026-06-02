"use client";

import { useState } from "react";
import {
  Globe, FileText, Clock, TrendingUp, Users, FolderOpen,
  LayoutTemplate, ChevronRight, ArrowLeft, Activity,
} from "lucide-react";
import { articles, sites } from "@/lib/mock-data";

export default function SitesPage() {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  const selectedSite = sites.find(s => s.id === selectedSiteId);
  const siteArticles = selectedSite ? articles.filter(a => a.siteId === selectedSite.id) : [];

  if (selectedSite) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedSiteId(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="w-4 h-4" /> Back to Sites
        </button>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-arctic-navy rounded-xl flex items-center justify-center text-white text-xl font-bold">
            {selectedSite.logo}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{selectedSite.name}</h1>
            <p className="text-slate-500 text-sm">{selectedSite.url}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              selectedSite.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}>
              {selectedSite.status === "active" ? "Active" : "Maintenance"}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Activity className="w-3 h-3" /> Health: {selectedSite.health}%
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Articles", value: siteArticles.length, icon: FileText },
            { label: "Published", value: siteArticles.filter(a => a.status === "published").length, icon: Globe },
            { label: "In Review", value: siteArticles.filter(a => ["pending_review", "needs_changes"].includes(a.status)).length, icon: Clock },
            { label: "Scheduled", value: siteArticles.filter(a => a.status === "scheduled").length, icon: TrendingUp },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-slate-600" />
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Content</h3>
            <div className="space-y-3">
              {siteArticles.slice(0, 6).map(article => (
                <div key={article.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{article.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{article.author} · {new Date(article.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${
                    article.status === "published" ? "bg-green-100 text-green-700" :
                    article.status === "scheduled" ? "bg-blue-100 text-blue-700" :
                    article.status === "pending_review" ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {article.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Team</h3>
              <div className="space-y-3">
                {[
                  { name: "Erik Lindqvist", role: "Publisher" },
                  { name: "Sigrid Jonsdottir", role: "Editor" },
                  { name: "Mikael Nilsen", role: "Editor" },
                  { name: "Astrid Karlsen", role: "Contributor" },
                ].map((u) => (
                  <div key={u.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                      {u.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm text-slate-700">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {["Policy", "Tourism", "Environment", "Infrastructure", "Culture", "Science"].map(cat => (
                  <div key={cat} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{cat}</span>
                    <span className="text-slate-400 text-xs">{Math.floor(Math.random() * 40) + 5} articles</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Templates</h3>
              <div className="space-y-2">
                {["Standard Article", "Feature Story", "News Brief", "Gallery Post", "Interview"].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-600 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <LayoutTemplate className="w-4 h-4 text-slate-400" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Sites</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your connected websites</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site) => {
          const siteArticleCount = articles.filter(a => a.siteId === site.id).length;
          const publishedCount = articles.filter(a => a.siteId === site.id && a.status === "published").length;
          const recentArticle = articles
            .filter(a => a.siteId === site.id)
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

          return (
            <button
              key={site.id}
              onClick={() => setSelectedSiteId(site.id)}
              className="card p-5 text-left hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-lg font-bold text-slate-600">
                  {site.logo}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">{site.name}</h3>
              <p className="text-sm text-slate-500">{site.url}</p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{siteArticleCount}</p>
                  <p className="text-xs text-slate-500">Articles</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{publishedCount}</p>
                  <p className="text-xs text-slate-500">Published</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Last publish: {new Date(site.lastPublish).toLocaleDateString()}</span>
                  <span className={site.health >= 90 ? "text-green-600" : site.health >= 80 ? "text-amber-600" : "text-red-600"}>
                    {site.health}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${site.health >= 90 ? "bg-green-500" : site.health >= 80 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${site.health}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
