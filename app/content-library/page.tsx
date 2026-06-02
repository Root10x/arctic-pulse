"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, Filter, ChevronDown, Eye, Copy, Trash2, FileText,
  CheckCircle2, Clock, Calendar, AlertCircle, MoreHorizontal,
  ArrowUpDown, X,
} from "lucide-react";
import { articles, sites } from "@/lib/mock-data";

const statusBadges: Record<string, { label: string; class: string }> = {
  published: { label: "Published", class: "bg-green-100 text-green-700" },
  scheduled: { label: "Scheduled", class: "bg-blue-100 text-blue-700" },
  pending_review: { label: "Pending Review", class: "bg-amber-100 text-amber-700" },
  needs_changes: { label: "Needs Changes", class: "bg-red-100 text-red-700" },
  approved: { label: "Approved", class: "bg-purple-100 text-purple-700" },
  draft: { label: "Draft", class: "bg-slate-100 text-slate-600" },
};

export default function ContentLibraryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"title" | "updatedAt" | "views">("updatedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const perPage = 10;

  let filtered = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    const matchesSite = siteFilter === "all" || a.siteId === siteFilter;
    return matchesSearch && matchesStatus && matchesSite;
  });

  filtered.sort((a, b) => {
    let cmp = 0;
    if (sortBy === "title") cmp = a.title.localeCompare(b.title);
    else if (sortBy === "updatedAt") cmp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    else if (sortBy === "views") cmp = (a.views || 0) - (b.views || 0);
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (field: "title" | "updatedAt" | "views") => {
    if (sortBy === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortDir("desc"); }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginated.map(a => a.id)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Content Library</h1>
          <p className="text-slate-500 text-sm mt-1">All articles across your publishing network</p>
        </div>
        <Link href="/new-content" className="btn-primary flex items-center gap-2">
          <FileText className="w-4 h-4" /> New Article
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
          />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="input">
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
          <option value="pending_review">Pending Review</option>
          <option value="needs_changes">Needs Changes</option>
          <option value="approved">Approved</option>
          <option value="draft">Draft</option>
        </select>
        <select value={siteFilter} onChange={(e) => { setSiteFilter(e.target.value); setPage(1); }} className="input">
          <option value="all">All Sites</option>
          {sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">{selectedIds.size} selected</span>
            <button className="btn-secondary text-red-600 border-red-200 hover:bg-red-50 text-xs">
              <Trash2 className="w-3 h-3 inline mr-1" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={paginated.length > 0 && selectedIds.size === paginated.length}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("title")}>
                <div className="flex items-center gap-1">Title <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Site</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Author</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("updatedAt")}>
                <div className="flex items-center gap-1">Updated <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("views")}>
                <div className="flex items-center gap-1">Views <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((article) => {
              const badge = statusBadges[article.status];
              return (
                <tr key={article.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selectedIds.has(article.id)} onChange={() => toggleSelect(article.id)} className="rounded border-slate-300" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{article.title}</p>
                        <p className="text-xs text-slate-400">{article.wordCount} words</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{article.siteName}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.class}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-medium text-slate-600">
                        {article.author.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <span className="text-sm text-slate-600">{article.author}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{new Date(article.updatedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{article.views?.toLocaleString() || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded" title="Duplicate">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {paginated.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-400">No articles found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} results
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-sm border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50">Previous</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = i + 1;
              return (
                <button key={p} onClick={() => setPage(p)} className={`px-3 py-1.5 text-sm rounded-md ${page === p ? "bg-arctic-navy text-white" : "border border-slate-200 hover:bg-slate-50"}`}>
                  {p}
                </button>
              );
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-sm border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
