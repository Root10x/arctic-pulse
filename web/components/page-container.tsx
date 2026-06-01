"use client";

import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageContainer({ children, title, subtitle, action }: PageContainerProps) {
  return (
    <div className="p-6 max-w-app mx-auto">
      {(title || action) && (
        <div className="flex items-start justify-between mb-6">
          <div>
            {title && <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>}
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
