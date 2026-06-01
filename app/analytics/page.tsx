"use client";

import { PageContainer } from "@/components/page-container";
import { analyticsData, topContent, siteComparison, topCategories, articles } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  FileText,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const pieColors = ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0", "#38bdf8"];

export default function AnalyticsPage() {
  const totalViews = analyticsData.reduce((sum, d) => sum + d.views, 0);
  const totalPublished = articles.filter((a) => a.status === "published").length;
  const avgEngagement = Math.floor(analyticsData.reduce((sum, d) => sum + d.engagement, 0) / analyticsData.length);
  const viewsTrend = Math.floor((analyticsData[analyticsData.length - 1].views - analyticsData[0].views) / analyticsData[0].views * 100);

  return (
    <PageContainer title="Analytics" subtitle="Performance overview across all sites">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {[
          {
            label: "Total Views",
            value: totalViews.toLocaleString(),
            icon: Eye,
            change: `${viewsTrend > 0 ? "+" : ""}${viewsTrend}%`,
            trend: viewsTrend >= 0 ? "up" : "down" as const,
          },
          {
            label: "Articles Published",
            value: totalPublished.toString(),
            icon: FileText,
            change: "+12 this month",
            trend: "up" as const,
          },
          {
            label: "Avg Engagement",
            value: `${avgEngagement}%`,
            icon: MousePointerClick,
            change: "+4% vs last month",
            trend: "up" as const,
          },
          {
            label: "Active Sites",
            value: "7",
            icon: Globe,
            change: "All operational",
            trend: "up" as const,
          },
        ].map((stat) => {
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
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span className={cn("text-xs font-medium", stat.trend === "up" ? "text-green-600" : "text-red-600")}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Traffic Trend</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3 h-3 rounded-full bg-arctic-navy" />
              Views
              <span className="w-3 h-3 rounded-full bg-arctic-ice ml-2" />
              Unique Visitors
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="views" stroke="#0f172a" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                <Area type="monotone" dataKey="uniqueVisitors" stroke="#38bdf8" fillOpacity={1} fill="url(#colorUnique)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Top Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {topCategories.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {topCategories.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pieColors[i % pieColors.length] }} />
                  <span className="text-slate-700">{cat.name}</span>
                </div>
                <span className="text-slate-500">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Publishing Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                <Bar dataKey="published" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Engagement Rate</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                <Line type="monotone" dataKey="engagement" stroke="#38bdf8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Top Content</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {topContent.map((article, i) => (
              <div key={article.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 line-clamp-1">{article.title}</p>
                    <p className="text-xs text-slate-500">{article.siteName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">{Math.floor(article.views).toLocaleString()}</p>
                  <p className="text-xs text-slate-500">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Site Comparison</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {siteComparison.map((site) => (
              <div key={site.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-arctic-navy text-white flex items-center justify-center text-xs font-bold">
                      {site.logo}
                    </div>
                    <span className="text-sm font-medium text-slate-900">{site.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {site.growth >= 0 ? (
                      <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                    )}
                    <span className={cn("text-xs font-medium", site.growth >= 0 ? "text-green-600" : "text-red-600")}>
                      {site.growth > 0 ? "+" : ""}{site.growth}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-slate-500">Views</p>
                    <p className="font-medium text-slate-900">{site.monthlyViews.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Articles</p>
                    <p className="font-medium text-slate-900">{site.monthlyArticles}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Engagement</p>
                    <p className="font-medium text-slate-900">{site.avgEngagement}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
