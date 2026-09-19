'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { ChartSpec } from '@/lib/blog';

// Validated with the dataviz palette checker against the post card surface (#070a12):
// categorical slots pass CVD and contrast checks; the ordinal blue ramp is monotone.
const SERIES = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)'];
const ORDINAL = ['var(--ordinal-1)', 'var(--ordinal-2)', 'var(--ordinal-3)', 'var(--ordinal-4)'];

const DAY_MS = 24 * 3600e3;

const fmtNumber = (n: number) => n.toLocaleString('en-US');
const fmtCompact = (n: number) => (n >= 1000 ? `${+(n / 1000).toFixed(1)}k` : String(n));
const utc = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleString('en-US', { timeZone: 'UTC', hourCycle: 'h23', ...opts });
const fmtDay = (iso: string) => utc(iso, { month: 'short', day: 'numeric' });
const fmtDateTime = (iso: string) =>
  utc(iso, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
const fmtDuration = (ms: number) => {
  const m = Math.round(ms / 60e3);
  return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60} min`;
};

// A "nice" axis maximum and step, e.g. 8,827 -> 10,000 in steps of 2,000.
function niceScale(max: number, ticks = 4) {
  const raw = max / ticks;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  return { max: Math.ceil(max / step) * step, step };
}

// Midnight-UTC timestamps between two times, for day ticks on time axes.
function dayTicks(from: number, to: number) {
  const ticks: number[] = [];
  for (let t = Math.ceil(from / DAY_MS) * DAY_MS; t <= to; t += DAY_MS) ticks.push(t);
  return ticks;
}

// Keep axis labels near the chart edges from being clipped.
const anchorAt = (x: number, width: number) =>
  x < 24 ? 'start' : x > width - 24 ? 'end' : 'middle';

// Server-rendered charts use this width and scale to fit via viewBox, so they show
// even if client JavaScript never runs; once mounted they redraw at the real width.
const FALLBACK_WIDTH = 800;

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

// Arrow keys step through data positions, so keyboard users get the same tooltip.
function stepKeys(count: number, active: number | null, set: (i: number | null) => void) {
  return (event: React.KeyboardEvent) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (delta) {
      event.preventDefault();
      set(Math.max(0, Math.min(count - 1, (active ?? (delta > 0 ? -1 : count)) + delta)));
    } else if (event.key === 'Escape') set(null);
  };
}

// A path for a bar with rounded corners on its data end only (top, or right).
function barPath(x: number, y: number, w: number, h: number, r: number, end: 'top' | 'right') {
  r = Math.max(0, Math.min(r, end === 'top' ? h : w, (end === 'top' ? w : h) / 2));
  return end === 'top'
    ? `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`
    : `M${x},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x}Z`;
}

function Tooltip({
  x,
  y,
  width,
  children,
}: {
  x: number;
  y: number;
  width: number;
  children: ReactNode;
}) {
  // Flip to the left of the pointer when it would run off the right edge.
  const flip = x > width - 180;
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 min-w-36 rounded-md border border-white/10 bg-[#0d0f14] px-2.5 py-2 text-xs shadow-lg"
      style={{ left: flip ? undefined : x + 12, right: flip ? width - x + 12 : undefined, top: y }}
    >
      {children}
    </div>
  );
}

function TooltipRow({
  color,
  label,
  value,
  line = true,
}: {
  color: string;
  label: string;
  value: string;
  line?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={line ? 'h-0.5 w-3 rounded-full' : 'h-2.5 w-2.5 rounded-sm'}
        style={{ background: color }}
      />
      <span className="font-semibold text-white tabular-nums">{value}</span>
      <span className="text-[var(--ink-secondary)]">{label}</span>
    </div>
  );
}

function Legend({ items }: { items: { label: string; color: string; shape: 'rect' | 'line' }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--ink-secondary)]">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span
            className={
              item.shape === 'line' ? 'h-0.5 w-3.5 rounded-full' : 'h-2.5 w-2.5 rounded-sm'
            }
            style={{ background: item.color }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <details className="mt-2 text-xs text-[var(--ink-secondary)]">
      <summary className="cursor-pointer select-none hover:text-white">Data table</summary>
      <div className="mt-2 max-h-72 overflow-auto rounded border border-white/10">
        <table className="w-full border-collapse tabular-nums">
          <thead className="sticky top-0 bg-[#0d0f14]">
            <tr>
              {head.map((h) => (
                <th key={h} className="px-2 py-1 text-left font-medium text-white">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-white/5">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-2 py-1 ${typeof cell === 'number' ? 'text-right' : ''}`}
                  >
                    {typeof cell === 'number' ? fmtNumber(cell) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function Frame({
  spec,
  legend,
  table,
  children,
}: {
  spec: ChartSpec;
  legend?: ReactNode;
  table?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="viz my-6 rounded-lg border border-white/10 bg-[var(--viz-surface)] p-3 md:p-4">
      {spec.title && (
        <figcaption className="text-sm font-semibold text-white">{spec.title}</figcaption>
      )}
      {spec.subtitle && <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{spec.subtitle}</p>}
      {legend && <div className="mt-2">{legend}</div>}
      <div className="mt-3">{children}</div>
      {table}
    </figure>
  );
}

function Stats({ spec }: { spec: Extract<ChartSpec, { type: 'stats' }> }) {
  return (
    <dl className="viz my-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {spec.items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-white/10 bg-[var(--viz-surface)] px-3 py-2"
        >
          <dt className="text-xs text-[var(--ink-muted)]">{item.label}</dt>
          <dd className="text-2xl font-semibold text-white">{fmtNumber(item.value)}</dd>
        </div>
      ))}
    </dl>
  );
}

const M = { top: 6, right: 8, bottom: 22, left: 40 };

function YAxis({
  max,
  step,
  h,
  w,
  y,
}: {
  max: number;
  step: number;
  h: number;
  w: number;
  y: (v: number) => number;
}) {
  const ticks = [];
  for (let v = 0; v <= max; v += step) ticks.push(v);
  return (
    <g>
      {ticks.map((v) => (
        <g key={v}>
          <line
            x1={M.left}
            x2={w - M.right}
            y1={y(v)}
            y2={y(v)}
            stroke={v === 0 ? 'var(--axis)' : 'var(--grid)'}
            shapeRendering="crispEdges"
          />
          <text
            x={M.left - 6}
            y={y(v)}
            dy="0.32em"
            textAnchor="end"
            className="fill-[var(--ink-muted)] text-[10px] tabular-nums"
          >
            {fmtCompact(v)}
          </text>
        </g>
      ))}
      <line x1={M.left} x2={M.left} y1={M.top} y2={h - M.bottom} stroke="transparent" />
    </g>
  );
}

function DayAxis({
  ticks,
  x,
  h,
  w,
}: {
  ticks: number[];
  x: (t: number) => number;
  h: number;
  w: number;
}) {
  return (
    <g>
      {ticks.map((t) => (
        <text
          key={t}
          x={x(t)}
          y={h - 6}
          textAnchor={anchorAt(x(t), w)}
          className="fill-[var(--ink-muted)] text-[10px]"
        >
          {fmtDay(new Date(t).toISOString())}
        </text>
      ))}
    </g>
  );
}

function Columns({ spec }: { spec: Extract<ChartSpec, { type: 'columns' }> }) {
  const [ref, measured] = useWidth();
  const width = measured || FALLBACK_WIDTH;
  const [active, setActive] = useState<number | null>(null);
  const h = 200;
  const n = spec.x.length;
  const totals = spec.x.map((_, i) => spec.series.reduce((sum, s) => sum + s.values[i], 0));
  const { max, step } = niceScale(Math.max(...totals));
  const band = (width - M.left - M.right) / n;
  const barW = Math.min(24, band * 0.7);
  const y = (v: number) => h - M.bottom - (v / max) * (h - M.top - M.bottom);
  const xBand = (i: number) => M.left + i * band;
  const start = Date.parse(spec.x[0]);
  const bucketMs = Date.parse(spec.x[1]) - start;
  const days = dayTicks(start, start + n * bucketMs);
  const xTime = (t: number) => M.left + ((t - start) / bucketMs) * band;

  return (
    <Frame
      spec={spec}
      legend={
        <Legend
          items={spec.series.map((s, i) => ({ label: s.name, color: SERIES[i], shape: 'rect' }))}
        />
      }
      table={
        <DataTable
          head={['Bucket start (UTC)', ...spec.series.map((s) => s.name), 'Total']}
          rows={spec.x.map((x, i) => [
            fmtDateTime(x),
            ...spec.series.map((s) => s.values[i]),
            totals[i],
          ])}
        />
      }
    >
      <div ref={ref} className="relative">
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${h}`}
          tabIndex={0}
          role="img"
          aria-label={`${spec.title}. Use the arrow keys to read each bucket.`}
          className="block outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded"
          onKeyDown={stepKeys(n, active, setActive)}
          onPointerLeave={() => setActive(null)}
          onBlur={() => setActive(null)}
        >
          <YAxis max={max} step={step} h={h} w={width} y={y} />
          <DayAxis ticks={days} x={xTime} h={h} w={width} />
          {spec.x.map((_, i) => {
            let base = 0;
            const top = spec.series.findLastIndex((s) => s.values[i] > 0);
            return (
              <g key={i} opacity={active === null || active === i ? 1 : 0.45}>
                {spec.series.map((s, j) => {
                  const v = s.values[i];
                  if (!v) return null;
                  const y0 = y(base);
                  base += v;
                  // 2px surface gap between stacked segments.
                  const segH = y0 - y(base) - (base - v > 0 ? 2 : 0);
                  return (
                    <path
                      key={j}
                      d={barPath(
                        xBand(i) + (band - barW) / 2,
                        y(base),
                        barW,
                        Math.max(segH, 1),
                        j === top ? 4 : 0,
                        'top'
                      )}
                      style={{ fill: SERIES[j] }}
                    />
                  );
                })}
                <rect
                  x={xBand(i)}
                  y={M.top}
                  width={band}
                  height={h - M.top - M.bottom}
                  fill="transparent"
                  onPointerEnter={() => setActive(i)}
                />
              </g>
            );
          })}
        </svg>
        {active !== null && (
          <Tooltip x={xBand(active) + band / 2} y={8} width={width}>
            <div className="mb-1 text-[var(--ink-muted)]">
              {fmtDateTime(spec.x[active])} to{' '}
              {utc(new Date(Date.parse(spec.x[active]) + bucketMs).toISOString(), {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            {spec.series.map((s, j) => (
              <TooltipRow
                key={s.name}
                color={SERIES[j]}
                label={s.name}
                value={fmtNumber(s.values[active])}
              />
            ))}
          </Tooltip>
        )}
      </div>
    </Frame>
  );
}

function StepLines({ spec }: { spec: Extract<ChartSpec, { type: 'lines' }> }) {
  const [ref, measured] = useWidth();
  const width = measured || FALLBACK_WIDTH;
  const [active, setActive] = useState<number | null>(null);
  const h = 220;
  const times = spec.x.map((x) => Date.parse(x));
  const t0 = times[0];
  const t1 = times.at(-1)!;
  const { max, step } = niceScale(Math.max(...spec.series.flatMap((s) => s.values)));
  const x = (t: number) => M.left + ((t - t0) / (t1 - t0)) * (width - M.left - M.right - 44);
  const y = (v: number) => h - M.bottom - (v / max) * (h - M.top - M.bottom);
  const last = times.length - 1;

  // The value at time t is the one from the latest commit at or before t.
  const indexAt = (px: number) => {
    let i = 0;
    while (i < last && x(times[i + 1]) <= px) i++;
    return i;
  };

  return (
    <Frame
      spec={spec}
      legend={
        <Legend
          items={spec.series.map((s, i) => ({
            label: `${s.name} ${fmtNumber(s.values[last])}`,
            color: SERIES[i],
            shape: 'line',
          }))}
        />
      }
      table={
        <DataTable
          head={['Commit time (UTC)', ...spec.series.map((s) => s.name)]}
          rows={spec.x.map((t, i) => [fmtDateTime(t), ...spec.series.map((s) => s.values[i])])}
        />
      }
    >
      <div ref={ref} className="relative">
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${h}`}
          tabIndex={0}
          role="img"
          aria-label={`${spec.title}. Use the arrow keys to step through commits.`}
          className="block outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded"
          onKeyDown={stepKeys(times.length, active, setActive)}
          onPointerMove={(e) =>
            setActive(indexAt(e.clientX - e.currentTarget.getBoundingClientRect().left))
          }
          onPointerLeave={() => setActive(null)}
          onBlur={() => setActive(null)}
        >
          <YAxis max={max} step={step} h={h} w={width} y={y} />
          <DayAxis ticks={dayTicks(t0, t1)} x={x} h={h} w={width} />
          {active !== null && (
            <line
              x1={x(times[active])}
              x2={x(times[active])}
              y1={M.top}
              y2={h - M.bottom}
              stroke="var(--axis)"
            />
          )}
          {spec.series.map((s, j) => {
            const d = s.values
              .map((v, i) => (i === 0 ? `M${x(times[0])},${y(v)}` : `H${x(times[i])}V${y(v)}`))
              .join('');
            return (
              <g key={s.name}>
                <path
                  d={d}
                  fill="none"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{ stroke: SERIES[j] }}
                />
                <circle
                  cx={x(times[active ?? last])}
                  cy={y(s.values[active ?? last])}
                  r={4}
                  strokeWidth={2}
                  style={{ fill: SERIES[j], stroke: 'var(--viz-surface)' }}
                />
              </g>
            );
          })}
          {/* End label for the series the text is about; the legend carries the others. */}
          <text
            x={x(t1) + 8}
            y={y(spec.series.at(-1)!.values[last])}
            dy="0.32em"
            className="fill-white text-[11px] font-semibold tabular-nums"
          >
            {fmtNumber(spec.series.at(-1)!.values[last])}
          </text>
        </svg>
        {active !== null && (
          <Tooltip x={x(times[active])} y={8} width={width}>
            <div className="mb-1 text-[var(--ink-muted)]">{fmtDateTime(spec.x[active])}</div>
            {spec.series.map((s, j) => (
              <TooltipRow
                key={s.name}
                color={SERIES[j]}
                label={s.name}
                value={fmtNumber(s.values[active])}
              />
            ))}
          </Tooltip>
        )}
      </div>
    </Frame>
  );
}

function Gantt({ spec }: { spec: Extract<ChartSpec, { type: 'gantt' }> }) {
  const [ref, measured] = useWidth();
  const width = measured || FALLBACK_WIDTH;
  const [active, setActive] = useState<number | null>(null);
  const rowH = 11;
  const barH = 7;
  const top = 4;
  const h = top + spec.rows.length * rowH + M.bottom;
  const starts = spec.rows.map((r) => Date.parse(r.start));
  const ends = spec.rows.map((r) => Date.parse(r.end));
  const t0 = Math.min(...starts);
  const t1 = Math.max(...ends);
  const left = 34;
  const x = (t: number) => left + ((t - t0) / (t1 - t0)) * (width - left - M.right);
  const hours: number[] = [];
  for (let t = Math.ceil(t0 / (6 * 3600e3)) * 6 * 3600e3; t <= t1; t += 6 * 3600e3) hours.push(t);

  return (
    <Frame
      spec={spec}
      legend={
        <Legend
          items={spec.series.map((s, i) => ({ label: s, color: SERIES[i], shape: 'rect' }))}
        />
      }
      table={
        <DataTable
          head={['PR', 'Title', 'Opened (UTC)', 'Closed (UTC)', 'Open for', 'Outcome']}
          rows={spec.rows.map((r, i) => [
            r.label,
            r.title,
            fmtDateTime(r.start),
            fmtDateTime(r.end),
            fmtDuration(ends[i] - starts[i]),
            spec.series[r.series],
          ])}
        />
      }
    >
      <div ref={ref} className="relative">
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${h}`}
          tabIndex={0}
          role="img"
          aria-label={`${spec.title}. Use the arrow keys to read each pull request.`}
          className="block outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded"
          onKeyDown={stepKeys(spec.rows.length, active, setActive)}
          onPointerLeave={() => setActive(null)}
          onBlur={() => setActive(null)}
        >
          {hours.map((t) => {
            const midnight = t % DAY_MS === 0;
            return (
              <g key={t}>
                <line
                  x1={x(t)}
                  x2={x(t)}
                  y1={top}
                  y2={h - M.bottom}
                  stroke={midnight ? 'var(--axis)' : 'var(--grid)'}
                  shapeRendering="crispEdges"
                />
                <text
                  x={x(t)}
                  y={h - 6}
                  textAnchor={anchorAt(x(t), width)}
                  className="fill-[var(--ink-muted)] text-[10px]"
                >
                  {midnight
                    ? fmtDay(new Date(t).toISOString())
                    : utc(new Date(t).toISOString(), { hour: '2-digit', minute: '2-digit' })}
                </text>
              </g>
            );
          })}
          {spec.rows.map((r, i) => {
            const rowY = top + i * rowH;
            const x0 = x(starts[i]);
            const w = Math.max(x(ends[i]) - x0, 3);
            return (
              <g key={r.label} opacity={active === null || active === i ? 1 : 0.45}>
                <text
                  x={left - 6}
                  y={rowY + rowH / 2}
                  dy="0.32em"
                  textAnchor="end"
                  className="fill-[var(--ink-muted)] text-[9px] tabular-nums"
                >
                  {r.label}
                </text>
                <rect
                  x={x0}
                  y={rowY + (rowH - barH) / 2}
                  width={w}
                  height={barH}
                  rx={2}
                  style={{ fill: SERIES[r.series] }}
                />
                <rect
                  x={0}
                  y={rowY}
                  width={width}
                  height={rowH}
                  fill="transparent"
                  onPointerEnter={() => setActive(i)}
                />
              </g>
            );
          })}
        </svg>
        {active !== null && (
          <Tooltip x={x(ends[active])} y={top + active * rowH + rowH} width={width}>
            <div className="mb-1 max-w-64 text-white">
              <span className="text-[var(--ink-muted)]">{spec.rows[active].label}</span>{' '}
              {spec.rows[active].title}
            </div>
            <TooltipRow
              color={SERIES[spec.rows[active].series]}
              label={spec.series[spec.rows[active].series]}
              value={fmtDuration(ends[active] - starts[active])}
              line={false}
            />
            <div className="mt-1 text-[var(--ink-muted)]">
              {fmtDateTime(spec.rows[active].start)} to {fmtDateTime(spec.rows[active].end)}
            </div>
          </Tooltip>
        )}
      </div>
    </Frame>
  );
}

function SegmentBar({ spec }: { spec: Extract<ChartSpec, { type: 'bar' }> }) {
  const [ref, measured] = useWidth();
  const width = measured || FALLBACK_WIDTH;
  const [active, setActive] = useState<number | null>(null);
  const h = 24;
  const total = spec.segments.reduce((sum, s) => sum + s.value, 0);
  const gaps = (spec.segments.length - 1) * 2;
  const scale = (width - gaps) / total;
  const segments = spec.segments.map((s, i) => {
    const before = spec.segments.slice(0, i).reduce((sum, p) => sum + p.value, 0);
    return { ...s, x: before * scale + i * 2, w: s.value * scale, color: ORDINAL[i] };
  });

  return (
    <Frame
      spec={spec}
      legend={
        <Legend
          items={spec.segments.map((s, i) => ({
            label: `${s.label} ${s.value}`,
            color: ORDINAL[i],
            shape: 'rect',
          }))}
        />
      }
      table={
        <DataTable head={['Column', 'Cards']} rows={spec.segments.map((s) => [s.label, s.value])} />
      }
    >
      <div ref={ref} className="relative">
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${h}`}
          tabIndex={0}
          role="img"
          aria-label={`${spec.title}. Use the arrow keys to read each column.`}
          className="block outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded"
          onKeyDown={stepKeys(segments.length, active, setActive)}
          onPointerLeave={() => setActive(null)}
          onBlur={() => setActive(null)}
        >
          {segments.map((s, i) => (
            <path
              key={s.label}
              d={barPath(s.x, 0, s.w, h, i === segments.length - 1 ? 4 : 0, 'right')}
              opacity={active === null || active === i ? 1 : 0.45}
              style={{ fill: s.color }}
              onPointerEnter={() => setActive(i)}
            />
          ))}
        </svg>
        {active !== null && (
          <Tooltip x={segments[active].x + segments[active].w / 2} y={h + 4} width={width}>
            <TooltipRow
              color={segments[active].color}
              label={segments[active].label}
              value={`${segments[active].value} (${Math.round((segments[active].value / total) * 100)}%)`}
              line={false}
            />
          </Tooltip>
        )}
      </div>
    </Frame>
  );
}

export default function Chart({ spec }: { spec: ChartSpec }) {
  switch (spec.type) {
    case 'stats':
      return <Stats spec={spec} />;
    case 'columns':
      return <Columns spec={spec} />;
    case 'lines':
      return <StepLines spec={spec} />;
    case 'gantt':
      return <Gantt spec={spec} />;
    case 'bar':
      return <SegmentBar spec={spec} />;
  }
}
