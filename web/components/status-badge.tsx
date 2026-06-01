"use client";

import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  published: "bg-green-50 text-green-700 border-green-200",
  scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  pending_review: "bg-amber-50 text-amber-700 border-amber-200",
  needs_changes: "bg-red-50 text-red-700 border-red-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-slate-50 text-slate-600 border-slate-200",
  active: "bg-green-50 text-green-700 border-green-200",
  maintenance: "bg-amber-50 text-amber-700 border-amber-200",
};

const statusLabels: Record<string, string> = {
  published: "Published",
  scheduled: "Scheduled",
  pending_review: "Pending Review",
  needs_changes: "Needs Changes",
  approved: "Approved",
  draft: "Draft",
  active: "Active",
  maintenance: "Maintenance",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status] || "bg-slate-50 text-slate-600 border-slate-200"
      )}
    >
      {statusLabels[status] || status}
    </span>
  );
}
