"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { StatusBadge } from "@/components/status-badge";
import { articles, sites } from "@/lib/mock-data";
import {
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Eye,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statuses = ["all", "published", "scheduled", "pending_review", "needs_changes", "approved", "draft"];

export default function ContentLibraryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [sortField, setSortField] = useState<"updatedAt" | "title" | "views">("updatedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = articles
    .filter((a) => {
      const matchesSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.author.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;
      const matchesSite = siteFilter === "all" || a.siteId === siteFilter;
      return matchesSearch && matchesStatus && matchesSite;
    })
    .sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortField === "updatedAt") return dir * (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
      if (sortField === "title") return dir * a.title.localeCompare(b.title);
      if (sortField === "views") return dir * ((a.views || 0) - (b.views || 0));
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(1);
  };

  return (
    <PageContainer
      title="Content Library"
      subtitle={`${filtered.length} articles across all sites`}
      action={
        <button className="btn-primary flex items-center gap-2">
          <FileText className="w-4 h-4" />
          New Article
        </button>
      }
    >
      <div className="card">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
            >
              <option value="all">All Statuses</option>
              {statuses.filter((s) => s !== "all").map((s) => (
                <option key={s} value={s}>{s.replace("_", " ")}</option>
              ))}
            </select>
            <select
              value={siteFilter}
              onChange={(e) => { setSiteFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
            >
              <option value="all">All Sites</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
              <tr>
                <th className="px-5 py-3 w-8">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th
                  className="px-5 py-3 cursor-pointer hover:text-slate-700"
                  onClick={() => toggleSort("title")}
                >
                  <div className="flex items-center gap-1">
                    Title
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-5 py-3">Site</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Author</th>
                <th
                  className="px-5 py-3 cursor-pointer hover:text-slate-700"
                  onClick={() => toggleSort("updatedAt")}
                >
                  <div className="flex items-center gap-1">
                    Last Updated
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="px-5 py-3 cursor-pointer hover:text-slate-700"
                  onClick={() => toggleSort("views")}
                >
                  <div className="flex items-center gap-1">
                    Views
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-5 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-slate-100 overflow-hidden shrink-0">
                        <img src={article.featuredImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate max-w-xs">{article.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{article.wordCount} words</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-slate-700">{article.siteName}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={article.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-arctic-navy text-white flex items-center justify-center text-[10px] font-bold">
                        {article.author.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-slate-700">{article.author}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5 text-slate-700">
                    {article.views?.toLocaleString() || "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="relative group">
                      <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-500" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-10 hidden group-hover:block">
                        <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <Eye className="w-4 h-4" /> View
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <Copy className="w-4 h-4" /> Duplicate
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginated.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-3" />
            <p className="text-sm">No articles found matching your filters.</p>
          </div>
        )}

        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "w-8 h-8 rounded-md text-sm font-medium transition-colors",
                    page === p
                      ? "bg-arctic-navy text-white"
                      : "hover:bg-slate-50 text-slate-700"
                  )}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
