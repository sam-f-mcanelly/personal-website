import type React from 'react';

interface TimelineItemProps {
  startDate: string;
  endDate: string;
  children: React.ReactNode;
}

export default function TimelineItem({ startDate, endDate, children }: TimelineItemProps) {
  const isCurrent = endDate === 'Present';

  return (
    <li className="group flex gap-3 pb-4 last:pb-0">
      {/* Dates */}
      <div className="w-14 md:w-16 shrink-0 pt-5 text-right text-xs md:text-sm leading-tight">
        <div className="text-neutral-accent whitespace-nowrap">{endDate}</div>
        <div className="mt-1 text-muted-foreground whitespace-nowrap">{startDate}</div>
      </div>

      {/* Line and marker */}
      <div className="relative w-4 shrink-0">
        <div className="absolute left-1/2 top-0 -bottom-4 group-last:bottom-0 w-px -translate-x-1/2 bg-green-500/30" />
        <div
          className={`relative mt-5 w-4 h-4 rounded-full border-4 ${
            isCurrent
              ? 'bg-yellow-500 border-yellow-900/50 animate-pulse'
              : 'bg-red-500 border-red-900/50'
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">{children}</div>
    </li>
  );
}
