"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { users, sites } from "@/lib/mock-data";
import {
  User,
  Globe,
  Bell,
  Palette,
  Shield,
  ChevronRight,
  Mail,
  Smartphone,
  Slack,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "General", icon: User },
  { id: "users", label: "Users", icon: User },
  { id: "sites", label: "Connected Sites", icon: Globe },
  { id: "publishing", label: "Publishing Defaults", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [theme, setTheme] = useState("system");

  return (
    <PageContainer title="Settings" subtitle="Manage your workspace preferences">
      <div className="flex gap-6">
        {/* LEFT NAV */}
        <div className="w-64 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  activeTab === tab.id
                    ? "bg-white text-arctic-navy font-medium shadow-sm border border-slate-200"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 min-w-0">
          {activeTab === "general" && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Workspace Name</label>
                  <input type="text" defaultValue="Arctic Pulse Content OS" className="input w-full max-w-md" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Default Language</label>
                  <select className="input w-full max-w-md">
                    <option>English</option>
                    <option>Danish</option>
                    <option>Norwegian</option>
                    <option>Swedish</option>
                    <option>Finnish</option>
                    <option>Icelandic</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Timezone</label>
                  <select className="input w-full max-w-md">
                    <option>UTC+0 (Reykjavik)</option>
                    <option>UTC+1 (Copenhagen, Oslo, Stockholm)</option>
                    <option>UTC+2 (Helsinki)</option>
                    <option>UTC-3 (Nuuk)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Date Format</label>
                  <select className="input w-full max-w-md">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-5">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">Team Members</h2>
                  <button className="btn-primary text-sm">Invite User</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <div key={u.id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-arctic-navy text-white flex items-center justify-center text-sm font-bold">
                          {u.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                          {u.role}
                        </span>
                        <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "sites" && (
            <div className="space-y-4">
              {sites.map((s) => (
                <div key={s.id} className="card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-arctic-navy text-white flex items-center justify-center text-sm font-bold">
                        {s.logo}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "px-2.5 py-1 rounded text-xs font-medium",
                        s.status === "active" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                      )}>
                        {s.status}
                      </span>
                      <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors">
                + Connect New Site
              </button>
            </div>
          )}

          {activeTab === "publishing" && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">Publishing Defaults</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Default Author</label>
                  <select className="input w-full max-w-md">
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Default Category</label>
                  <select className="input w-full max-w-md">
                    <option>Policy</option>
                    <option>Tourism</option>
                    <option>Environment</option>
                    <option>Infrastructure</option>
                    <option>Culture</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Publishing Schedule</label>
                  <select className="input w-full max-w-md">
                    <option>Publish immediately on approval</option>
                    <option>Hold for manual publish</option>
                    <option>Schedule for next available slot</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Auto-featured Image</p>
                    <p className="text-xs text-slate-500">Automatically select featured image from media library</p>
                  </div>
                  <button className="relative w-11 h-6 bg-arctic-navy rounded-full">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Require Review</p>
                    <p className="text-xs text-slate-500">All content must pass review before publishing</p>
                  </div>
                  <button className="relative w-11 h-6 bg-arctic-navy rounded-full">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Article Published", desc: "When an article goes live", email: true, push: true, slack: false },
                  { label: "Review Requested", desc: "When content needs your approval", email: true, push: true, slack: true },
                  { label: "Changes Requested", desc: "When editor sends back revisions", email: true, push: false, slack: true },
                  { label: "Schedule Conflict", desc: "When two items overlap on calendar", email: false, push: true, slack: false },
                  { label: "Site Health Alert", desc: "When a site goes down or slows", email: true, push: true, slack: true },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{n.label}</p>
                      <p className="text-xs text-slate-500">{n.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className={cn("p-2 rounded-md transition-colors", n.email ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400")}>
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className={cn("p-2 rounded-md transition-colors", n.push ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400")}>
                        <Smartphone className="w-4 h-4" />
                      </button>
                      <button className={cn("p-2 rounded-md transition-colors", n.slack ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400")}>
                        <Slack className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">Appearance</h2>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-3">Theme</label>
                <div className="flex gap-3">
                  {[
                    { id: "light", label: "Light", icon: Sun },
                    { id: "dark", label: "Dark", icon: Moon },
                    { id: "system", label: "System", icon: Monitor },
                  ].map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={cn(
                          "flex-1 p-4 rounded-lg border text-center transition-all",
                          theme === t.id
                            ? "border-arctic-navy bg-arctic-navy/5"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <Icon className={cn("w-6 h-6 mx-auto mb-2", theme === t.id ? "text-arctic-navy" : "text-slate-400")} />
                        <span className={cn("text-sm font-medium", theme === t.id ? "text-arctic-navy" : "text-slate-700")}>
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <label className="text-sm font-medium text-slate-700 block mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {["#0f172a", "#334155", "#38bdf8", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <label className="text-sm font-medium text-slate-700 block mb-3">Density</label>
                <div className="flex gap-3">
                  {["Compact", "Comfortable", "Spacious"].map((d) => (
                    <button
                      key={d}
                      className={cn(
                        "flex-1 py-2 rounded-lg border text-sm transition-colors",
                        d === "Comfortable"
                          ? "border-arctic-navy bg-arctic-navy/5 text-arctic-navy"
                          : "border-slate-200 text-slate-700 hover:border-slate-300"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
