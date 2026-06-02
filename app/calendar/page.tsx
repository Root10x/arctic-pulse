"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  Clock, Globe, FileText, Plus,
} from "lucide-react";
import { calendarEvents, sites } from "@/lib/mock-data";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const statusColors: Record<string, string> = {
  scheduled: "bg-blue-500",
  published: "bg-green-500",
  draft: "bg-slate-400",
};

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };

  const dayEvents = getEventsForDate(currentDate.getDate());

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Publishing Calendar</h1>
          <p className="text-slate-500 text-sm mt-1">Visual scheduling for all sites</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden">
            {(["month", "week", "day"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-sm capitalize ${view === v ? "bg-arctic-navy text-white" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {v}
              </button>
            ))}
          </div>
          <Link href="/new-content" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> New
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          className="p-1.5 hover:bg-slate-100 rounded-md"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h2 className="text-lg font-medium text-slate-900">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <button
          onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
          className="p-1.5 hover:bg-slate-100 rounded-md"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {view === "month" && (
        <div className="card p-4">
          <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
            {days.map(d => (
              <div key={d} className="bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 text-center">{d}</div>
            ))}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="bg-white min-h-[100px]" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const events = getEventsForDate(day);
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              return (
                <div
                  key={day}
                  onClick={() => { setCurrentDate(new Date(year, month, day)); setView("day"); }}
                  className="bg-white min-h-[100px] p-2 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className={`text-sm font-medium mb-1 ${isToday ? "w-6 h-6 bg-arctic-navy text-white rounded-full flex items-center justify-center" : "text-slate-700"}`}>
                    {day}
                  </div>
                  {events.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-400">{events.length} items</div>
                      {events.slice(0, 2).map((e, idx) => (
                        <div key={idx} className={`text-[10px] px-1.5 py-0.5 rounded text-white ${statusColors[e.status]} truncate`}>
                          {e.time} {e.title.slice(0, 20)}...
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-[10px] text-slate-400 pl-1">+{events.length - 2} more</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "week" && (
        <div className="card p-4">
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }, (_, i) => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() - d.getDay() + i);
              const dateStr = d.toISOString().split("T")[0];
              const dayEvents = calendarEvents.filter(e => e.date === dateStr);
              return (
                <div key={i} className="space-y-2">
                  <div className="text-center pb-2 border-b border-slate-100">
                    <p className="text-xs text-slate-500">{days[i]}</p>
                    <p className="text-lg font-medium text-slate-900">{d.getDate()}</p>
                  </div>
                  <div className="space-y-2">
                    {dayEvents.map(e => (
                      <div key={e.id} className="p-2 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className={`w-2 h-2 rounded-full ${statusColors[e.status]} mb-1`} />
                        <p className="text-xs font-medium text-slate-700 truncate">{e.title}</p>
                        <p className="text-[10px] text-slate-400">{e.time} · {e.siteName}</p>
                      </div>
                    ))}
                    {dayEvents.length === 0 && (
                      <p className="text-xs text-slate-300 text-center py-4">No events</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "day" && (
        <div className="card p-5">
          <h3 className="text-lg font-medium text-slate-900 mb-4">
            {currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h3>
          {dayEvents.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-8">No content scheduled for this day.</p>
          )}
          <div className="space-y-3">
            {dayEvents.map(e => (
              <div key={e.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className={`w-3 h-3 rounded-full ${statusColors[e.status]} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{e.title}</p>
                  <p className="text-xs text-slate-500">{e.siteName}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {e.time}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    e.status === "published" ? "bg-green-100 text-green-700" :
                    e.status === "scheduled" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {e.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
