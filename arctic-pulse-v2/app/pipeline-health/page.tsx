"use client";

import { useState } from "react";
import {
  Activity, CheckCircle2, AlertCircle, XCircle, RefreshCw,
  Globe, Brain, Camera, BarChart3, MessageSquare, Clock,
  ChevronRight, Loader2, Server, Wifi, WifiOff,
} from "lucide-react";
import { apiConfigs, sites } from "@/lib/mock-data";

const pipelineStages = [
  { id: "ingest", label: "Content Ingest", status: "healthy", lastRun: "2 min ago", items: 3 },
  { id: "draft", label: "Draft Generation", status: "healthy", lastRun: "5 min ago", items: 1 },
  { id: "image", label: "Image Sourcing", status: "warning", lastRun: "12 min ago", items: 2 },
  { id: "review", label: "Editorial Review", status: "healthy", lastRun: "1 min ago", items: 5 },
  { id: "publish", label: "WordPress Publishing", status: "healthy", lastRun: "8 min ago", items: 0 },
  { id: "social", label: "Social Teasers", status: "paused", lastRun: "1 hour ago", items: 0 },
];

const recentErrors = [
  { id: 1, stage: "Image Sourcing", message: "Unsplash API rate limit exceeded", time: "12 min ago", severity: "warning" },
  { id: 2, stage: "Social Teasers", message: "Instagram API token expired", time: "1 hour ago", severity: "error" },
  { id: 3, stage: "Draft Generation", message: "OpenAI API timeout — retry successful", time: "25 min ago", severity: "resolved" },
];

export default function PipelineHealthPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "warning": return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case "error": return <XCircle className="w-5 h-5 text-red-500" />;
      case "paused": return <Clock className="w-5 h-5 text-slate-400" />;
      default: return <Activity className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const classes = {
      healthy: "bg-green-100 text-green-700",
      warning: "bg-amber-100 text-amber-700",
      error: "bg-red-100 text-red-700",
      paused: "bg-slate-100 text-slate-500",
    };
    return (
      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${classes[status as keyof typeof classes]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Pipeline Health</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor your content automation pipeline</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Checking..." : "Refresh Status"}
        </button>
      </div>

      {/* Pipeline Stages */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Pipeline Stages</h2>
        <div className="space-y-3">
          {pipelineStages.map((stage, i) => (
            <div key={stage.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {getStatusIcon(stage.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900">{stage.label}</p>
                  {getStatusBadge(stage.status)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Last run: {stage.lastRun} · {stage.items} items queued
                </p>
              </div>
              {stage.status === "warning" && (
                <button className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              )}
              {stage.status === "error" && (
                <button className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Fix
                </button>
              )}
              {stage.status === "paused" && (
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Resume
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Status */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">API Connections</h2>
          <div className="space-y-3">
            {apiConfigs.map((api) => (
              <div key={api.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  api.status === "connected" ? "bg-green-500" : "bg-red-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{api.name}</p>
                  <p className="text-xs text-slate-500">{api.provider}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  api.status === "connected" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {api.status === "connected" ? "Online" : "Offline"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Site Health */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Site Publishing Status</h2>
          <div className="space-y-3">
            {sites.map((site) => (
              <div key={site.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  site.status === "active" ? "bg-green-500" : "bg-amber-500"
                }`} />
                <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
                  {site.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{site.name}</p>
                  <p className="text-xs text-slate-500">{site.contentCount} articles · Health {site.health}%</p>
                </div>
                {site.status === "active" ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-amber-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error Log */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Recent Events</h2>
        <div className="space-y-2">
          {recentErrors.map((err) => (
            <div key={err.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
              err.severity === "error" ? "bg-red-50 border-red-100" :
              err.severity === "warning" ? "bg-amber-50 border-amber-100" :
              "bg-green-50 border-green-100"
            }`}>
              {err.severity === "error" ? <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> :
               err.severity === "warning" ? <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" /> :
               <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">{err.message}</p>
                <p className="text-xs text-slate-500">{err.stage} · {err.time}</p>
              </div>
              {err.severity !== "resolved" && (
                <button className="text-xs text-slate-600 hover:text-slate-800 font-medium flex items-center gap-1 flex-shrink-0">
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Articles This Week", value: "24", change: "+8 vs last week", color: "text-green-600" },
          { label: "Avg Pipeline Time", value: "18 min", change: "-3 min vs last week", color: "text-green-600" },
          { label: "Success Rate", value: "97.3%", change: "+1.2% vs last week", color: "text-green-600" },
          { label: "API Calls Today", value: "1,247", change: "Within budget", color: "text-blue-600" },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
