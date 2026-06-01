"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { mediaItems, sites } from "@/lib/mock-data";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Replace,
  Link2,
  X,
  ImageIcon,
  Calendar,
  HardDrive,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MediaLibraryPage() {
  const [search, setSearch] = useState("");
  const [siteFilter, setSiteFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<typeof mediaItems[0] | null>(null);

  const filtered = mediaItems.filter((m) => {
    const matchesSearch = !search || m.title.toLowerCase().includes(search.toLowerCase());
    const matchesSite = siteFilter === "all" || m.siteId === siteFilter;
    return matchesSearch && matchesSite;
  });

  return (
    <PageContainer
      title="Media Library"
      subtitle={`${filtered.length} assets across all sites`}
      action={
        <button className="btn-primary flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Upload Media
        </button>
      }
    >
      <div className="card">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={siteFilter}
              onChange={(e) => setSiteFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-arctic-ice/50"
            >
              <option value="all">All Sites</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  view === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  view === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {view === "grid" ? (
          <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group-hover:border-slate-300 transition-colors relative">
                  <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-1.5 bg-white rounded-md shadow-sm">
                      <Maximize2 className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-medium text-slate-900 truncate">{item.title}</p>
                  <p className="text-[10px] text-slate-500">{item.siteName}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-5 py-3">Preview</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Site</th>
                  <th className="px-5 py-3">Dimensions</th>
                  <th className="px-5 py-3">Size</th>
                  <th className="px-5 py-3">Usage</th>
                  <th className="px-5 py-3">Uploaded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3">
                      <div className="w-12 h-12 rounded-md bg-slate-100 overflow-hidden">
                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-5 py-3 font-medium text-slate-900">{item.title}</td>
                    <td className="px-5 py-3 text-slate-700">{item.siteName}</td>
                    <td className="px-5 py-3 text-slate-500">{item.dimensions}</td>
                    <td className="px-5 py-3 text-slate-500">{item.fileSize}</td>
                    <td className="px-5 py-3 text-slate-700">{item.usageCount} articles</td>
                    <td className="px-5 py-3 text-slate-500">
                      {new Date(item.uploadedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-96 bg-white h-full shadow-xl flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Media Details</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                <img src={selectedItem.url} alt={selectedItem.alt} className="w-full h-full object-cover" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Title
                </label>
                <p className="text-sm text-slate-900">{selectedItem.title}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Alt Text
                </label>
                <input
                  type="text"
                  defaultValue={selectedItem.alt}
                  className="input w-full"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Credit
                </label>
                <p className="text-sm text-slate-900">{selectedItem.credit}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Dimensions
                  </label>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Maximize2 className="w-4 h-4 text-slate-400" />
                    {selectedItem.dimensions}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                    File Size
                  </label>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <HardDrive className="w-4 h-4 text-slate-400" />
                    {selectedItem.fileSize}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Site
                </label>
                <p className="text-sm text-slate-900">{selectedItem.siteName}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Usage History
                </label>
                <p className="text-sm text-slate-700">Used in {selectedItem.usageCount} articles</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Uploaded
                </label>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {new Date(selectedItem.uploadedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 space-y-2">
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <Replace className="w-4 h-4" />
                Replace Image
              </button>
              <div className="flex gap-2">
                <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Assign
                </button>
                <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
