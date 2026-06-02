"use client";

import { useState } from "react";
import {
  Globe, Users, Settings, Bell, Palette, FileText, Link, Plus,
  X, Check, ChevronRight, Trash2, Edit3, Brain, BarChart3,
  Search, MessageSquare, Camera, Video, ExternalLink, AlertCircle,
  CheckCircle2, Loader2, Key, Server,
} from "lucide-react";
import { sites as initialSites, users, apiConfigs as initialApiConfigs } from "@/lib/mock-data";

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "users", label: "Users", icon: Users },
  { id: "sites", label: "Connected Sites", icon: Globe },
  { id: "publishing", label: "Publishing", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "apis", label: "API Connections", icon: Link },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [sites, setSites] = useState(initialSites);
  const [showAddSite, setShowAddSite] = useState(false);
  const [newSite, setNewSite] = useState({ name: "", url: "", logo: "" });
  const [apiConfigs, setApiConfigs] = useState(initialApiConfigs);
  const [showApiModal, setShowApiModal] = useState<string | null>(null);
  const [apiForm, setApiForm] = useState({ apiKey: "", endpoint: "" });
  const [connectingApi, setConnectingApi] = useState<string | null>(null);

  const handleAddSite = () => {
    if (!newSite.name || !newSite.url) return;
    const id = newSite.name.toLowerCase().replace(/\s+/g, "-").slice(0, 3);
    setSites([...sites, {
      id,
      name: newSite.name,
      url: newSite.url,
      status: "active" as const,
      contentCount: 0,
      lastPublish: new Date().toISOString(),
      health: 100,
      logo: newSite.logo || newSite.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
    }]);
    setNewSite({ name: "", url: "", logo: "" });
    setShowAddSite(false);
  };

  const handleRemoveSite = (id: string) => {
    setSites(sites.filter(s => s.id !== id));
  };

  const handleConnectApi = (apiId: string) => {
    setConnectingApi(apiId);
    setTimeout(() => {
      setApiConfigs(prev => prev.map(a => a.id === apiId ? { ...a, status: "connected" as const, lastConnected: new Date().toISOString() } : a));
      setConnectingApi(null);
      setShowApiModal(null);
      setApiForm({ apiKey: "", endpoint: "" });
    }, 2000);
  };

  const handleDisconnectApi = (apiId: string) => {
    setApiConfigs(prev => prev.map(a => a.id === apiId ? { ...a, status: "disconnected" as const } : a));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Configure your workspace and integrations</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-48 flex-shrink-0 space-y-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id
                    ? "bg-arctic-navy text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-700">Workspace Name</label>
                  <input type="text" defaultValue="Arctic Pulse" className="input w-full mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Default Language</label>
                  <select className="input w-full mt-1">
                    <option>English</option>
                    <option>Danish</option>
                    <option>Norwegian</option>
                    <option>Swedish</option>
                    <option>Finnish</option>
                    <option>Icelandic</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Timezone</label>
                  <select className="input w-full mt-1">
                    <option>UTC+0 (Reykjavik)</option>
                    <option>UTC+1 (Copenhagen, Oslo, Stockholm)</option>
                    <option>UTC+2 (Helsinki)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Date Format</label>
                  <select className="input w-full mt-1">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button className="btn-primary">Save Changes</button>
                <button className="btn-secondary">Reset to Defaults</button>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Team Members</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Invite User
                </button>
              </div>
              <div className="space-y-3">
                {users.map((u) => (
                  <div key={u.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 bg-arctic-ice/20 rounded-full flex items-center justify-center text-sm font-medium text-arctic-navy">
                      {u.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{u.role}</span>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "sites" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Connected Sites</h2>
                <button onClick={() => setShowAddSite(true)} className="btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Connect New Site
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sites.map((site) => (
                  <div key={site.id} className="card p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-lg font-bold text-slate-600 flex-shrink-0">
                      {site.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-900">{site.name}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          site.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {site.status === "active" ? "Connected" : "Maintenance"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{site.url}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                        <span>{site.contentCount} articles</span>
                        <span>Health: {site.health}%</span>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveSite(site.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {showAddSite && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">Connect New Site</h3>
                      <button onClick={() => setShowAddSite(false)} className="p-1.5 hover:bg-slate-100 rounded-md">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Site Name</label>
                        <input
                          type="text"
                          value={newSite.name}
                          onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                          placeholder="e.g., Svalbard Review"
                          className="input w-full mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Site URL</label>
                        <input
                          type="url"
                          value={newSite.url}
                          onChange={(e) => setNewSite({ ...newSite, url: e.target.value })}
                          placeholder="https://svalbardreview.com"
                          className="input w-full mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Logo Abbreviation (optional)</label>
                        <input
                          type="text"
                          value={newSite.logo}
                          onChange={(e) => setNewSite({ ...newSite, logo: e.target.value })}
                          placeholder="SR"
                          className="input w-full mt-1"
                        />
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-700">
                          <AlertCircle className="w-3 h-3 inline mr-1" />
                          The system will verify the WordPress REST API connection after you save.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-6">
                      <button onClick={() => setShowAddSite(false)} className="btn-secondary">Cancel</button>
                      <button onClick={handleAddSite} disabled={!newSite.name || !newSite.url} className="btn-primary disabled:opacity-50">
                        Connect Site
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "publishing" && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">Publishing Defaults</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Default Author</label>
                  <select className="input w-full mt-1">
                    <option>Erik Lindqvist</option>
                    <option>Sigrid Jonsdottir</option>
                    <option>Mikael Nilsen</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Default Category</label>
                  <select className="input w-full mt-1">
                    <option>News</option>
                    <option>Feature</option>
                    <option>Analysis</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <input type="checkbox" id="auto-image" className="rounded border-slate-300" defaultChecked />
                  <label htmlFor="auto-image" className="text-sm text-slate-700">
                    Auto-select featured image from media library when available
                  </label>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <input type="checkbox" id="require-review" className="rounded border-slate-300" defaultChecked />
                  <label htmlFor="require-review" className="text-sm text-slate-700">
                    Require editorial review before publishing
                  </label>
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
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{n.label}</p>
                      <p className="text-xs text-slate-500">{n.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-slate-500">
                        <input type="checkbox" defaultChecked={n.email} className="rounded border-slate-300" /> Email
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-slate-500">
                        <input type="checkbox" defaultChecked={n.push} className="rounded border-slate-300" /> Push
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-slate-500">
                        <input type="checkbox" defaultChecked={n.slack} className="rounded border-slate-300" /> Slack
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Theme</label>
                  <div className="flex gap-3 mt-2">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Monitor },
                    ].map((t) => {
                      const Icon = t.icon;
                      return (
                        <button key={t.id} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                          <Icon className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-700">{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Accent Color</label>
                  <div className="flex gap-2 mt-2">
                    {["#0f172a", "#334155", "#38bdf8", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Density</label>
                  <div className="flex gap-2 mt-2">
                    {["Compact", "Comfortable", "Spacious"].map((d) => (
                      <button key={d} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "apis" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">API Connections</h2>
                  <p className="text-sm text-slate-500 mt-1">Manage integrations with external services</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {apiConfigs.map((api) => {
                  const statusColors = {
                    connected: "bg-green-100 text-green-700",
                    disconnected: "bg-slate-100 text-slate-600",
                    error: "bg-red-100 text-red-700",
                    pending: "bg-amber-100 text-amber-700",
                  };

                  const iconMap: Record<string, any> = {
                    brain: Brain,
                    image: Camera,
                    "bar-chart": BarChart3,
                    globe: Globe,
                    search: Search,
                    "message-square": MessageSquare,
                    camera: Camera,
                    video: Video,
                  };
                  const Icon = iconMap[api.icon] || Link;

                  return (
                    <div key={api.id} className="card p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-900">{api.name}</h3>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusColors[api.status]}`}>
                              {api.status === "connected" ? "Connected" : api.status === "disconnected" ? "Disconnected" : api.status === "error" ? "Error" : "Pending"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{api.provider}</p>
                          <p className="text-sm text-slate-600 mt-2">{api.description}</p>

                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {api.features.map(f => (
                              <span key={f} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full">{f}</span>
                            ))}
                          </div>

                          {api.lastConnected && (
                            <p className="text-xs text-slate-400 mt-2">
                              Last connected: {new Date(api.lastConnected).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {api.status === "connected" ? (
                            <button
                              onClick={() => handleDisconnectApi(api.id)}
                              className="btn-secondary text-xs flex items-center gap-1"
                            >
                              <X className="w-3 h-3" /> Disconnect
                            </button>
                          ) : (
                            <button
                              onClick={() => { setShowApiModal(api.id); setApiForm({ apiKey: "", endpoint: "" }); }}
                              className="btn-primary text-xs flex items-center gap-1"
                            >
                              <Link className="w-3 h-3" /> Connect
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* API Connection Modal */}
              {showApiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">
                        Connect {apiConfigs.find(a => a.id === showApiModal)?.name}
                      </h3>
                      <button onClick={() => setShowApiModal(null)} className="p-1.5 hover:bg-slate-100 rounded-md">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">API Key</label>
                        <div className="relative mt-1">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="password"
                            value={apiForm.apiKey}
                            onChange={(e) => setApiForm({ ...apiForm, apiKey: e.target.value })}
                            placeholder="Enter your API key"
                            className="input w-full pl-10"
                          />
                        </div>
                      </div>
                      {apiConfigs.find(a => a.id === showApiModal)?.endpoint && (
                        <div>
                          <label className="text-sm font-medium text-slate-700">Endpoint URL</label>
                          <div className="relative mt-1">
                            <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="url"
                              value={apiForm.endpoint}
                              onChange={(e) => setApiForm({ ...apiForm, endpoint: e.target.value })}
                              placeholder="https://api.example.com/v1"
                              className="input w-full pl-10"
                            />
                          </div>
                        </div>
                      )}
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-700">
                          <AlertCircle className="w-3 h-3 inline mr-1" />
                          Your API key is stored securely and never shared. Test connection will verify permissions before saving.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-6">
                      <button onClick={() => setShowApiModal(null)} className="btn-secondary">Cancel</button>
                      <button
                        onClick={() => handleConnectApi(showApiModal)}
                        disabled={!apiForm.apiKey || connectingApi === showApiModal}
                        className="btn-primary disabled:opacity-50 flex items-center gap-2"
                      >
                        {connectingApi === showApiModal ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Testing...</>
                        ) : (
                          <><CheckCircle2 className="w-4 h-4" /> Test & Connect</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Sun(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
  );
}

function Moon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  );
}

function Monitor(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
  );
}
