"use client";

import { PageContainer } from "@/components/page-container";
import { StatusBadge } from "@/components/status-badge";
import {
  sites,
  articles,
  activityFeed,
  reviewQueueArticles,
} from "@/lib/mock-data";
import {
  Globe,
  FileText,
  Calendar,
  ClipboardCheck,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FilePlus,
  Settings,
  TrendingUp,
  Eye,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Total Sites",
    value: sites.length.toString(),
    icon: Globe,
    change: "+1 this month",
    trend: "up" as const,
  },
  {
    label: "Published Articles",
    value: articles.filter((a) => a.status === "published").length.toString(),
    icon: FileText,
    change: "+12 this week",
    trend: "up" as const,
  },
  {
    label: "Scheduled",
    value: articles.filter((a) => a.status === "scheduled").length.toString(),
    icon: Calendar,
    change: "+5 upcoming",
    trend: "up" as const,
  },
  {
    label: "Pending Review",
    value: reviewQueueArticles.length.toString(),
    icon: ClipboardCheck,
    change: "3 urgent",
    trend: "down" as const,
  },
];

const iconMap: Record<string, any> = {
  publish: CheckCircle2,
  draft: FilePlus,
  schedule: Calendar,
  review: AlertCircle,
};

const colorMap: Record<string, string> = {
  publish: "text-green-600 bg-green-50",
  draft: "text-blue-600 bg-blue-50",
  schedule: "text-purple-600 bg-purple-50",
  review: "text-amber-600 bg-amber-50",
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-semibold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-2 rounded-md bg-slate-50">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-amber-600" />
                )}
                <span
                  className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-amber-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Site Health Overview</h2>
              <Link href="/sites" className="text-sm text-arctic-ice hover:underline">
                View all sites
              </Link>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {sites.map((site) => (
                <div
                  key={site.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-arctic-navy text-white flex items-center justify-center text-sm font-bold">
                    {site.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 truncate">{site.name}</p>
                      <StatusBadge status={site.status} />
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-slate-500">{site.contentCount} articles</span>
                      <span className="text-xs text-slate-500">Health: {site.health}%</span>
                    </div>
                  </div>
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        site.health > 90 ? "bg-green-500" : site.health > 80 ? "bg-amber-500" : "bg-red-500"
                      }`}
                      style={{ width: `${site.health}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">Publishing Activity</h2>
            </div>
            <div className="p-5">
              <div className="flex items-end gap-2 h-40">
                {Array.from({ length: 14 }, (_, i) => {
                  const h = 20 + Math.random() * 80;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-arctic-ice/30 rounded-t-sm hover:bg-arctic-ice/50 transition-colors"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[10px] text-slate-400">
                        {["M", "T", "W", "T", "F", "S", "S"][i % 7]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-slate-500">This week</p>
                    <p className="text-lg font-semibold text-slate-900">24 articles</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Last week</p>
                    <p className="text-lg font-semibold text-slate-500">18 articles</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+33%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">Quick Actions</h2>
            </div>
            <div className="p-3 space-y-1">
              {[
                { label: "New Article", href: "/new-content", icon: FilePlus, desc: "Create content" },
                { label: "Review Queue", href: "/review-queue", icon: ClipboardCheck, desc: `${reviewQueueArticles.length} pending` },
                { label: "Schedule Content", href: "/calendar", icon: Calendar, desc: "Plan publishing" },
                { label: "Site Settings", href: "/settings", icon: Settings, desc: "Configure" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    <div className="p-2 rounded-md bg-slate-50">
                      <Icon className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{action.label}</p>
                      <p className="text-xs text-slate-500">{action.desc}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Recent Activity</h2>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="p-3 max-h-[420px] overflow-y-auto">
              {activityFeed.slice(0, 12).map((item) => {
                const Icon = iconMap[item.type] || FileText;
                const colors = colorMap[item.type] || "text-slate-600 bg-slate-50";
                return (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-slate-50 transition-colors">
                    <div className={`p-1.5 rounded-md shrink-0 ${colors}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-slate-900">
                        <span className="font-medium">{item.user}</span>{" "}
                        <span className="text-slate-500">{item.message}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{item.article}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Top Performing Content</h3>
            <div className="space-y-3">
              {articles
                .filter((a) => a.status === "published")
                .slice(0, 4)
                .map((article, i) => (
                  <div key={article.id} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 truncate">{article.title}</p>
                      <p className="text-xs text-slate-500">{article.siteName}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Eye className="w-3 h-3" />
                      {article.views?.toLocaleString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
