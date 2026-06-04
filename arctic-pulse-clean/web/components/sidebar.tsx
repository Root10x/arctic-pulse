"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Wand2,
  FilePlus,
  ClipboardCheck,
  Library,
  Calendar,
  Globe,
  Image,
  BarChart3,
  Settings,
  Search,
  ChevronRight,
  Activity,
  Brain,
} from "lucide-react";
import { articles } from "@/lib/mock-data";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Content Wizard", href: "/content-wizard", icon: Wand2 },
  { label: "New Content", href: "/new-content", icon: FilePlus },
  { label: "Review Queue", href: "/review-queue", icon: ClipboardCheck, badge: "pending" },
  { label: "Content Library", href: "/content-library", icon: Library },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Sites", href: "/sites", icon: Globe },
  { label: "Media Library", href: "/media-library", icon: Image },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Research", href: "/research", icon: Brain },
  { label: "Pipeline Health", href: "/pipeline-health", icon: Activity },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const pendingCount = articles.filter(a => a.status === "pending_review").length;

  return (
    <aside className="w-64 bg-arctic-navy flex flex-col flex-shrink-0">
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-arctic-ice rounded-md flex items-center justify-center">
            <span className="text-arctic-navy font-bold text-sm">AP</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm">Arctic Pulse</h1>
            <p className="text-slate-400 text-xs">Content OS</p>
          </div>
        </Link>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-arctic-ice/50"
          />
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const badgeCount = item.badge === "pending" ? pendingCount : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""} group`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {badgeCount > 0 && (
                <span className="px-1.5 py-0.5 bg-arctic-ice text-arctic-navy text-xs font-medium rounded-full">
                  {badgeCount}
                </span>
              )}
              {isActive && <ChevronRight className="w-3 h-3 text-slate-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-arctic-ice/20 rounded-full flex items-center justify-center text-arctic-ice text-xs font-medium">
            EL
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Erik Lindqvist</p>
            <p className="text-slate-400 text-xs truncate">Publisher</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
