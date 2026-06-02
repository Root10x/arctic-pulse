"use client";

import { useState } from "react";
import {
  Search, Grid3X3, List, Filter, Download, Replace, Link as LinkIcon,
  X, Image as ImageIcon, ChevronLeft, ChevronRight,
} from "lucide-react";
import { mediaItems, sites } from "@/lib/mock-data";

export default function MediaLibraryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [siteFilter, setSiteFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<typeof mediaItems[0] | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filtered = mediaItems.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesSite = siteFilter === "all" || m.siteId === siteFilter;
    return matchesSearch && matchesSite;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Media Library</h1>
          <p className="text-slate-500 text-sm mt-1">Central image management for all sites</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden">
            <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-arctic-navy text-white" : "text-slate-600 hover:bg-slate-50"}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-arctic-navy text-white" : "text-slate-600 hover:bg-slate-50"}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search images..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
          />
        </div>
        <select value={siteFilter} onChange={(e) => { setSiteFilter(e.target.value); setPage(1); }} className="input">
          <option value="all">All Sites</option>
          {sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginated.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="card overflow-hidden text-left hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.url} alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    item.source === "ai-generated" ? "bg-purple-100 text-purple-700" :
                    item.source === "free-stock" ? "bg-blue-100 text-blue-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {item.source === "ai-generated" ? "AI" : item.source === "free-stock" ? "Stock" : "Upload"}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-900 truncate">{item.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.siteName}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <span>{item.dimensions}</span>
                  <span>·</span>
                  <span>{item.fileSize}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Site</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Usage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <img src={item.url} alt={item.alt} className="w-12 h-12 rounded object-cover" />
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{item.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{item.siteName}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.source === "ai-generated" ? "bg-purple-100 text-purple-700" :
                      item.source === "free-stock" ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {item.source === "ai-generated" ? "AI Generated" : item.source === "free-stock" ? "Free Stock" : "Uploaded"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{item.usageCount} articles</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedItem(item)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {paginated.length === 0 && (
        <div className="card p-8 text-center">
          <ImageIcon className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No images found matching your filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} results
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 text-sm text-slate-600">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Drawer */}
      {selectedItem && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setSelectedItem(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Image Details</h3>
              <button onClick={() => setSelectedItem(null)} className="p-1.5 hover:bg-slate-100 rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-5">
              <img src={selectedItem.url} alt={selectedItem.alt} className="w-full rounded-lg" />

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider">Title</label>
                <p className="text-sm text-slate-900 mt-1">{selectedItem.title}</p>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider">Alt Text</label>
                <input type="text" defaultValue={selectedItem.alt} className="input w-full mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Credit</label>
                  <p className="text-sm text-slate-700 mt-1">{selectedItem.credit}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Source</label>
                  <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    selectedItem.source === "ai-generated" ? "bg-purple-100 text-purple-700" :
                    selectedItem.source === "free-stock" ? "bg-blue-100 text-blue-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {selectedItem.source === "ai-generated" ? "AI Generated" : selectedItem.source === "free-stock" ? "Free Stock" : "Uploaded"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Dimensions</label>
                  <p className="text-sm text-slate-700 mt-1">{selectedItem.dimensions}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">File Size</label>
                  <p className="text-sm text-slate-700 mt-1">{selectedItem.fileSize}</p>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider">Site</label>
                <p className="text-sm text-slate-700 mt-1">{selectedItem.siteName}</p>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider">Usage</label>
                <p className="text-sm text-slate-700 mt-1">Used in {selectedItem.usageCount} articles</p>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider">Uploaded</label>
                <p className="text-sm text-slate-700 mt-1">{new Date(selectedItem.uploadedAt).toLocaleDateString()}</p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Replace className="w-4 h-4" /> Replace
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Assign
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
