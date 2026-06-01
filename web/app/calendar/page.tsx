"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { StatusBadge } from "@/components/status-badge";
import { calendarEvents, sites } from "@/lib/mock-data";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  Globe,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return calendarEvents.filter((e) => e.date === dateStr);
  };

  const weekEvents = calendarEvents.filter((e) => {
    const d = new Date(e.date);
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return d >= start && d < end;
  });

  const dayEvents = calendarEvents.filter((e) => {
    const d = new Date(e.date);
    return (
      d.getFullYear() === currentDate.getFullYear() &&
      d.getMonth() === currentDate.getMonth() &&
      d.getDate() === currentDate.getDate()
    );
  });

  return (
    <PageContainer
      title="Publishing Calendar"
      subtitle="Visual content scheduling"
      action={
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Content
        </button>
      }
    >
      <div className="card">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={view === "month" ? prevMonth : () => setCurrentDate(new Date(currentDate.getTime() - 86400000))} className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h2 className="text-lg font-semibold text-slate-900 w-48 text-center">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
                ...(view === "day" && { day: "numeric" }),
              })}
            </h2>
            <button onClick={view === "month" ? nextMonth : () => setCurrentDate(new Date(currentDate.getTime() + 86400000))} className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
            {(["month", "week", "day"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors",
                  view === v ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {view === "month" && (
          <div className="p-5">
            <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
              {days.map((d) => (
                <div key={d} className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 text-center">
                  {d}
                </div>
              ))}
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="bg-white min-h-[120px]" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const events = getEventsForDate(day);
                const isToday = day === 5 && month === 5 && year === 2024;
                return (
                  <div
                    key={day}
                    className={cn(
                      "bg-white min-h-[120px] p-2 hover:bg-slate-50 transition-colors cursor-pointer",
                      isToday && "bg-blue-50/50"
                    )}
                    onClick={() => { setCurrentDate(new Date(year, month, day)); setView("day"); }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={cn(
                          "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                          isToday ? "bg-arctic-navy text-white" : "text-slate-700"
                        )}
                      >
                        {day}
                      </span>
                      {events.length > 0 && (
                        <span className="text-[10px] text-slate-400">{events.length} items</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 3).map((e) => (
                        <div
                          key={e.id}
                          className={cn(
                            "px-2 py-1 rounded text-[10px] font-medium truncate border-l-2",
                            e.status === "published"
                              ? "bg-green-50 text-green-700 border-green-400"
                              : e.status === "scheduled"
                              ? "bg-blue-50 text-blue-700 border-blue-400"
                              : "bg-slate-50 text-slate-600 border-slate-400"
                          )}
                        >
                          {e.time} {e.title.slice(0, 25)}...
                        </div>
                      ))}
                      {events.length > 3 && (
                        <p className="text-[10px] text-slate-400 pl-2">+{events.length - 3} more</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "week" && (
          <div className="p-5">
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 7 }, (_, i) => {
                const d = new Date(currentDate);
                d.setDate(d.getDate() - d.getDay() + i);
                const dateStr = d.toISOString().split("T")[0];
                const dayEvents = calendarEvents.filter((e) => e.date === dateStr);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-center pb-2 border-b border-slate-200">
                      <p className="text-xs text-slate-500">{days[i]}</p>
                      <p className="text-lg font-semibold text-slate-900">{d.getDate()}</p>
                    </div>
                    <div className="space-y-2">
                      {dayEvents.map((e) => (
                        <div
                          key={e.id}
                          className="p-2 rounded-md border border-slate-200 bg-white hover:shadow-sm transition-shadow cursor-pointer"
                        >
                          <p className="text-xs font-medium text-slate-900 line-clamp-2">{e.title}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span className="text-[10px] text-slate-500">{e.time}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Globe className="w-3 h-3 text-slate-400" />
                            <span className="text-[10px] text-slate-500">{e.siteName}</span>
                          </div>
                        </div>
                      ))}
                      {dayEvents.length === 0 && (
                        <div className="py-4 text-center text-xs text-slate-300">No events</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "day" && (
          <div className="p-5">
            <div className="space-y-3">
              {dayEvents.length === 0 && (
                <div className="py-16 text-center text-slate-400">
                  <CalendarDays className="w-10 h-10 mx-auto mb-3" />
                  <p>No content scheduled for this day.</p>
                </div>
              )}
              {dayEvents.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="w-16 text-center">
                    <p className="text-lg font-semibold text-slate-900">{e.time}</p>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{e.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {e.siteName}
                      </span>
                      <StatusBadge status={e.status} />
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-md transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
