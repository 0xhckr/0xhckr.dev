"use client";

import { useEffect, useRef, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const GAP = 8;
const LEVEL_OPACITY = [0.06, 0.25, 0.45, 0.7, 1];

export function CommitGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/contributions")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (!cancelled) setDays(d.days ?? []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = days.length;
  const half = Math.ceil(n / 2);
  const bandBudget = Math.max(1, (size.h - Math.round(size.h * 0.3)) / 2);
  let cols = Math.max(
    1,
    Math.round(Math.sqrt((Math.max(1, half) * size.w) / bandBudget)),
  );
  let rows = Math.max(1, Math.ceil(half / cols));
  let minPitch = Math.ceil((size.w + GAP) / cols);
  let maxPitch = Math.max(1, Math.floor((bandBudget + GAP) / rows));
  while (minPitch > maxPitch && cols < half) {
    cols += 1;
    rows = Math.max(1, Math.ceil(half / cols));
    minPitch = Math.ceil((size.w + GAP) / cols);
    maxPitch = Math.max(1, Math.floor((bandBudget + GAP) / rows));
  }
  const pitch = minPitch <= maxPitch ? maxPitch : minPitch;
  const cell = Math.max(4, pitch - GAP);
  const gridW = cols * pitch - GAP;

  const totalRows = Math.max(1, Math.ceil(n / cols));
  const topRows = Math.max(1, Math.floor(totalRows / 2));
  const split = Math.min(n, topRows * cols);
  const m = n - split;
  const rowsBottom = Math.max(1, Math.ceil(m / cols));
  const bottomY = size.h - (rowsBottom * pitch - GAP);
  const rem = m % cols;

  const cells: { day: ContributionDay | null; x: number; y: number }[] =
    days.map((day, i) => {
      if (i < split) {
        return {
          day,
          x: (i % cols) * pitch,
          y: Math.floor(i / cols) * pitch,
        };
      }
      const j = i - split;
      let col: number;
      let row: number;
      if (rem > 0 && j < rem) {
        col = j;
        row = 0;
      } else if (rem > 0) {
        col = (j - rem) % cols;
        row = 1 + Math.floor((j - rem) / cols);
      } else {
        col = j % cols;
        row = Math.floor(j / cols);
      }
      return { day, x: col * pitch, y: bottomY + row * pitch };
    });

  if (rem > 0) {
    for (let col = rem; col < cols; col++) {
      cells.push({ day: null, x: col * pitch, y: bottomY });
    }
  }

  const offsetX = Math.floor((size.w - gridW) / 2);

  return (
    <div
      ref={ref}
      className="absolute inset-x-0 top-16 bottom-0 overflow-hidden"
    >
      {cells.length > 0 && size.w > 0 && size.h > 0 && (
        <svg
          width={gridW}
          height={size.h}
          viewBox={`0 0 ${gridW} ${size.h}`}
          shapeRendering="crispEdges"
          aria-hidden="true"
          className="block text-accent"
          style={{ transform: `translateX(${offsetX}px)` }}
          onMouseMove={(e) => {
            const t = e.target;
            if (!(t instanceof SVGRectElement)) {
              setHoverIdx(null);
              return;
            }
            const idx = Number(t.getAttribute("data-i"));
            setHoverIdx(cells[idx]?.day ? idx : null);
          }}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <style>{`
            .cg-cell {
              transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
            }
            .cg-cell.flipped {
              transform: scaleY(-1);
            }
            .cg-count {
              opacity: 0;
              transition: opacity 0.1s linear;
              pointer-events: none;
            }
            .cg-cell.flipped .cg-count {
              opacity: 1;
              transition: opacity 0.12s linear 0.23s;
            }
          `}</style>
          {cells.map((c, i) => {
            const base =
              !c.day || c.day.level === 0
                ? LEVEL_OPACITY[0]
                : LEVEL_OPACITY[c.day.level];
            const flipped = i === hoverIdx && !!c.day;
            const cx = c.x + cell / 2;
            const cy = c.y + cell / 2;
            return (
              <g
                key={c.day ? c.day.date : `pad-${c.x}`}
                className={flipped ? "cg-cell flipped" : "cg-cell"}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <rect
                  data-i={i}
                  x={c.x}
                  y={c.y}
                  width={cell}
                  height={cell}
                  fill="currentColor"
                  opacity={
                    hoverIdx !== null && hoverIdx !== i ? base * 0.5 : base
                  }
                  className={
                    !c.day || c.day.level === 0
                      ? "text-foreground transition-opacity duration-150"
                      : "text-accent transition-opacity duration-150"
                  }
                />
                {c.day && (
                  <text
                    className="cg-count font-mono font-bold tabular-nums"
                    x={cx}
                    y={cy}
                    transform={`translate(${cx} ${cy}) scale(1 -1) translate(${-cx} ${-cy})`}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                      fontSize: Math.max(6, Math.floor(cell * 0.48)),
                      fill:
                        c.day.level >= 3
                          ? "var(--accent-foreground)"
                          : "var(--foreground)",
                    }}
                  >
                    {c.day.count}
                  </text>
                )}
              </g>
            );
          })}
          {/*
            Static hit targets, one per day cell, layered above the flipping
            groups so hover never depends on the animated geometry — otherwise
            a slow/vertical approach loses hover mid-flip as the square
            squashes away from under the cursor.
          */}
          {cells.map(
            (c, i) =>
              c.day && (
                <rect
                  key={`hit-${c.day.date}`}
                  data-i={i}
                  x={c.x}
                  y={c.y}
                  width={cell}
                  height={cell}
                  fill="transparent"
                  stroke="none"
                />
              ),
          )}
        </svg>
      )}
    </div>
  );
}
