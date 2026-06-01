"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { StatusBadge } from "@/components/status-badge";
import { sites, articles } from "@/lib/mock-data";
import {
  Globe,
  FileText,
  Clock,
  TrendingUp,
  TrendingDown,
  Settings,
  ExternalLink,
  ChevronRight,
  Users,
  Folder,
  LayoutTemplate,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SitesPage() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  const site = selectedSite ? sites.find((s) => s.id === selectedSite) : null;
  const siteArticles = site ? articles.filter((a) => a.siteId === site.id) : [];

  return (
    <PageContainer title="Sites" subtitle="Manage connected websites">
      {!selectedSite ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sites.map((s) => {
            const siteArticleCount = articles.filter((a) => a.siteId === s.id).length;
            const publishedCount = articles.filter((a) => a.siteId === s.id && a.status === "published").length;
            const recentArticle = articles
              .filter((a) => a.siteId === s.id)
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

            return (
              <div
                key={s.id}
                onClick={() => setSelectedSite(s.id)}
                className="card p-5 cursor-pointer hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-arctic-navy text-white flex items-center justify-center text-lg font-bold">
                    {s.logo}
                  </div>
                  <StatusBadge status={s.status} />
                </div>

                <h3 className="font-semibold text-slate-900 text-lg">{s.name}</h3>
                <p className="text-sm text-slate-500">{s.url}</p>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500">Articles</p>
                    <p className="text-lg font-semibold text-slate-900">{siteArticleCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Published</p>
                    <p className="text-lg font-semibold text-slate-900">{publishedCount}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    Last publish: {new Date(s.lastPublish).toLocaleDateString()}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500">Health</span>
                    <span className={cn(
                      "font-medium",
                      s.health > 90 ? "text-green-600" : s.health > 80 ? "text-amber-600" : "text-red-600"
                    )}>
                      {s.health}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        s.health > 90 ? "bg-green-500" : s.health > 80 ? "bg-amber-500" : "bg-red-500"
                      )}
                      style={{ width: `${s.health}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedSite(null)}
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to all sites
          </button>

          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-arctic-navy text-white flex items-center justify-center text-2xl font-bold">
                  {site?.logo}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{site?.name}</h2>
                  <p className="text-sm text-slate-500">{site?.url}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <StatusBadge status={site?.status || "active"} />
                    <span className="text-xs text-slate-500">Health: {site?.health}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="lg:col-span-3 space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Articles", value: siteArticles.length, icon: FileText },
                  { label: "Published", value: siteArticles.filter((a) => a.status === "published").length, icon: Globe },
                  { label: "In Review", value: siteArticles.filter((a) => ["pending_review", "needs_changes"].includes(a.status)).length, icon: Clock },
                  { label: "Scheduled", value: siteArticles.filter((a) => a.status === "scheduled").length, icon: TrendingUp },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="card p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-500">{stat.label}</span>
                      </div>
                      <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-900">Recent Content</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {siteArticles.slice(0, 6).map((article) => (
                    <div key={article.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-slate-100 overflow-hidden">
                          <img src={article.featuredImage} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{article.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StatusBadge status={article.status} />
                            <span className="text-xs text-slate-500">{article.author}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(article.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="card p-4">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Team
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "Erik Lindqvist", role: "Publisher" },
                    { name: "Sigrid Jonsdottir", role: "Editor" },
                    { name: "Mikael Nilsen", role: "Editor" },
                    { name: "Astrid Karlsen", role: "Contributor" },
                  ].map((u) => (
                    <div key={u.name} className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-arctic-navy text-white flex items-center justify-center text-xs font-bold">
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-4">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {["Policy", "Tourism", "Environment", "Infrastructure", "Culture", "Science"].map((cat) => (
                    <div key={cat} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition-colors cursor-pointer">
                      <span className="text-sm text-slate-700">{cat}</span>
                      <span className="text-xs text-slate-400">
                        {Math.floor(Math.random() * 40) + 5} articles
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-4">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4" />
                  Templates
                </h3>
                <div className="space-y-2">
                  {["Standard Article", "Feature Story", "News Brief", "Gallery Post", "Interview"].map((t) => (
                    <div key={t} className="p-2 rounded-md border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer">
                      <p className="text-sm text-slate-700">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
