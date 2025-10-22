import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  defaultLeftPct?: number;
}

export function SplitView({
  left,
  right,
  className,
  defaultLeftPct = 50,
}: SplitViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftPct, setLeftPct] = useState(defaultLeftPct);
  const draggingRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.min(
        Math.max(e.clientX - rect.left, 200),
        rect.width - 200,
      ); // min 200px each side
      setLeftPct(Math.round((x / rect.width) * 100));
    };
    const onUp = () => (draggingRef.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-screen w-full overflow-hidden rounded-xl border border-neutral-200/60 bg-white/60 ring-1 ring-black/5 dark:border-neutral-800/60 dark:bg-neutral-900/60",
        "grid grid-cols-1 md:grid-cols-[var(--left)12px_1fr]",
        className,
      )}
      style={
        {
          // @ts-ignore
          "--left": `${leftPct}%`,
        } as React.CSSProperties
      }
    >
      <div className="min-w-0 overflow-auto">{left}</div>

      <div
        className="hidden md:block cursor-col-resize select-none bg-gradient-to-b from-transparent via-neutral-300/60 to-transparent hover:via-neutral-400/80 dark:via-neutral-700/60 dark:hover:via-neutral-600"
        onMouseDown={() => (draggingRef.current = true)}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize preview"
      />

      <div className="hidden min-w-0 overflow-hidden md:block">{right}</div>
    </div>
  );
}
