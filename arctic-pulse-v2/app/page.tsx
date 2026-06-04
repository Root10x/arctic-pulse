"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FilePlus, ClipboardCheck, Calendar, Settings, TrendingUp,
  TrendingDown, ArrowUpRight, Globe, FileText, Clock,
  CheckCircle2, AlertCircle, Activity, Zap, Image as ImageIcon,
  MessageSquare, ArrowRight,
} from "lucide-react";
import { articles, sites, activityFeed, reviewQueueArticles, analyticsData } from "@/lib/mock-data";

export default function DashboardPage() {
  const totalArticles = articles.length;
  const publishedCount = articles.filter(a => a.status === "published").length;
  const scheduledCount = articles.filter(a => a.status === "scheduled").length;
  const pendingCount = reviewQueueArticles.length;
  const draftCount = articles.filter(a => a.status === "draft").length;

  const latestAnalytics = analyticsData[analyticsData.length - 1];
  const previousAnalytics = analyticsData[analyticsData.length - 2];
  const viewsTrend = latestAnalytics && previousAnalytics
    ? Math.round(((latestAnalytics.views - previousAnalytics.views) / previousAnalytics.views) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of your publishing network</p>
      </div>

      {/* Pipeline Status Bar */}
      <div className="card p-4 bg-blue-50/50 border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-medium text-slate-900">Automation Pipeline Status</h3>
          </div>
          <Link href="/pipeline-health" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View Details <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {[
            { label: "Ingest", status: "running", items: 3 },
            { label: "Draft", status: "running", items: 1 },
            { label: "Images", status: "warning", items: 2 },
            { label: "Review", status: "running", items: 5 },
            { label: "Publish", status: "running", items: 0 },
            { label: "Social", status: "paused", items: 0 },
          ].map((stage) => (
            <div key={stage.label} className={`p-2 rounded-lg border ${
              stage.status === "running" ? "bg-green-50 border-green-200" :
              stage.status === "warning" ? "bg-amber-50 border-amber-200" :
              "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  stage.status === "running" ? "bg-green-500" :
                  stage.status === "warning" ? "bg-amber-500" :
                  "bg-slate-400"
                }`} />
                <span className="text-xs font-medium text-slate-700">{stage.label}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{stage.items} queued</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Articles", value: totalArticles, icon: FileText, change: "+8 this week", trend: "up" as const },
          { label: "Published", value: publishedCount, icon: CheckCircle2, change: "+3 today", trend: "up" as const },
          { label: "Pending Review", value: pendingCount, icon: Clock, change: "Needs attention", trend: "neutral" as const },
          { label: "Scheduled", value: scheduledCount, icon: Calendar, change: "Next 7 days", trend: "up" as const },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                {stat.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                {stat.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                {stat.trend === "neutral" && <Activity className="w-4 h-4 text-amber-500" />}
              </div>
              <div className="mt-3">
                <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
              <p className="text-xs text-slate-400 mt-2">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "New Article", href: "/new-content", icon: FilePlus, desc: "Create content", color: "bg-arctic-navy" },
            { label: "Review Queue", href: "/review-queue", icon: ClipboardCheck, desc: `${pendingCount} pending`, color: "bg-amber-600" },
            { label: "Schedule Content", href: "/calendar", icon: Calendar, desc: "Plan publishing", color: "bg-blue-600" },
            { label: "Pipeline Health", href: "/pipeline-health", icon: Activity, desc: "Check status", color: "bg-green-600" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
              >
                <div className={`w-9 h-9 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 group-hover:text-arctic-navy">{action.label}</p>
                  <p className="text-xs text-slate-500">{action.desc}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 ml-auto flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Site Health */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900">Site Health</h2>
            <Link href="/sites" className="text-xs text-arctic-ice hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {sites.map((site) => (
              <div key={site.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-semibold text-slate-600 flex-shrink-0">
                  {site.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">{site.name}</p>
                    {site.status === "active" ? (
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Maintenance</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-slate-500">{site.contentCount} articles</span>
                    <span className="text-xs text-slate-500">Last publish: {new Date(site.lastPublish).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${site.health >= 90 ? "bg-green-500" : site.health >= 80 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${site.health}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${site.health >= 90 ? "text-green-600" : site.health >= 80 ? "text-amber-600" : "text-red-600"}`}>
                    {site.health}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activityFeed.slice(0, 8).map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  item.type === "publish" ? "bg-green-500" :
                  item.type === "draft" ? "bg-blue-500" :
                  item.type === "schedule" ? "bg-purple-500" : "bg-amber-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{item.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time} by {item.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publishing Activity Chart */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Publishing Activity (Last 30 Days)</h2>
        <div className="h-48 flex items-end gap-1">
          {analyticsData.map((d, i) => {
            const height = Math.max(10, (d.published / 6) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className="w-full bg-arctic-navy/10 hover:bg-arctic-navy/20 rounded-t transition-colors"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-slate-400">{d.date.slice(5)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
