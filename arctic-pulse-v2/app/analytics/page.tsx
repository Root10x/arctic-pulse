"use client";

import { useState } from "react";
import {
  Eye, FileText, MousePointerClick, Globe, TrendingUp, TrendingDown,
  ArrowUpRight, BarChart3, PieChart, Activity,
} from "lucide-react";
import {
  analyticsData, topContent, siteComparison, topCategories,
} from "@/lib/mock-data";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const totalViews = analyticsData.reduce((sum, d) => sum + d.views, 0);
  const totalPublished = analyticsData.reduce((sum, d) => sum + d.published, 0);
  const avgEngagement = Math.round(analyticsData.reduce((sum, d) => sum + d.engagement, 0) / analyticsData.length);

  const latest = analyticsData[analyticsData.length - 1];
  const previous = analyticsData[analyticsData.length - 8];
  const viewsTrend = previous ? Math.round(((latest.views - previous.views) / previous.views) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Performance across your publishing network</p>
        </div>
        <div className="flex items-center gap-2">
          {["7d", "30d", "90d"].map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 text-sm rounded-md ${timeRange === r ? "bg-arctic-navy text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {r === "7d" ? "Last 7 days" : r === "30d" ? "Last 30 days" : "Last 90 days"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, change: `${viewsTrend > 0 ? "+" : ""}${viewsTrend}%`, trend: viewsTrend >= 0 ? "up" as const : "down" as const },
          { label: "Articles Published", value: totalPublished.toString(), icon: FileText, change: "+12 this month", trend: "up" as const },
          { label: "Avg Engagement", value: `${avgEngagement}%`, icon: MousePointerClick, change: "+4% vs last month", trend: "up" as const },
          { label: "Active Sites", value: "7", icon: Globe, change: "All operational", trend: "up" as const },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div className="mt-3">
                <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
              <p className={`text-xs mt-2 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Trend */}
        <div className="lg:col-span-2 card p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Traffic Trend</h3>
          <div className="h-64 flex items-end gap-1">
            {analyticsData.map((d, i) => {
              const height = Math.max(5, (d.views / 12000) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="relative w-full">
                    <div
                      className="w-full bg-arctic-navy/10 hover:bg-arctic-navy/20 rounded-t transition-colors"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{d.date.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Categories */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Top Categories</h3>
          <div className="space-y-3">
            {topCategories.map((cat, i) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700">{cat.name}</span>
                  <span className="text-slate-500">{cat.count} articles</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-arctic-navy rounded-full" style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Publishing Activity */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Publishing Activity</h3>
          <div className="h-48 flex items-end gap-2">
            {analyticsData.filter((_, i) => i % 3 === 0).map((d, i) => {
              const height = Math.max(5, (d.published / 6) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-blue-500/20 rounded-t" style={{ height: `${height}%` }} />
                  <span className="text-[10px] text-slate-400">{d.date.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Engagement Rate</h3>
          <div className="h-48 flex items-end gap-1">
            {analyticsData.filter((_, i) => i % 2 === 0).map((d, i) => {
              const height = Math.max(5, (d.engagement / 100) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-green-500/20 rounded-t" style={{ height: `${height}%` }} />
                  <span className="text-[10px] text-slate-400">{d.date.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Content */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Top Performing Content</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Rank</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Title</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Site</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Views</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((article, i) => (
                <tr key={article.id} className="border-b border-slate-50">
                  <td className="py-3 pr-4 text-sm font-medium text-slate-500">#{article.rank}</td>
                  <td className="py-3 pr-4 text-sm text-slate-900">{article.title}</td>
                  <td className="py-3 pr-4 text-sm text-slate-500">{article.siteName}</td>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-900">{article.views?.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-sm text-slate-500">{article.engagement}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Site Comparison */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Site Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Site</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Monthly Views</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Articles</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Avg Engagement</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase py-2 pr-4">Growth</th>
              </tr>
            </thead>
            <tbody>
              {siteComparison.map((site) => (
                <tr key={site.id} className="border-b border-slate-50">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
                        {site.logo}
                      </div>
                      <span className="text-sm text-slate-900">{site.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-slate-700">{site.monthlyViews.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-sm text-slate-700">{site.monthlyArticles}</td>
                  <td className="py-3 pr-4 text-sm text-slate-700">{site.avgEngagement}%</td>
                  <td className="py-3 pr-4">
                    <span className={`text-sm font-medium ${site.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {site.growth >= 0 ? "+" : ""}{site.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Source Note */}
      <div className="card p-4 bg-blue-50/50 border-blue-200">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-slate-900">Analytics Data Sources</h4>
            <p className="text-xs text-slate-500 mt-1">
              Current data is simulated for demonstration. To connect real analytics, configure your data sources in Settings → API Connections.
              Supported integrations: Google Analytics 4, Google Search Console, and WordPress native stats.
            </p>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2">Configure Data Sources →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
