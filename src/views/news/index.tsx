import { useGetTopStories } from "@/hooks/api/news";
import { NewsCard } from "./components/news-card";
import { useMemo, useState } from "react";
import { WebPreviewPane } from "./components/preview-pane";
import { SplitView } from "./components/split-view";

function NewsListSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 p-5 ring-1 ring-black/5 dark:border-neutral-800/60 dark:bg-neutral-900/60"
          aria-busy="true"
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-[linear-gradient(100deg,transparent_30%,rgba(0,0,0,0.06)_40%,transparent_60%)] dark:bg-[linear-gradient(100deg,transparent_30%,rgba(255,255,255,0.06)_40%,transparent_60%)]" />
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="h-5 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-6 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-6 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export const NewsView = () => {
  const { data: topNewsIds, isLoading } = useGetTopStories();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const visibleIds = useMemo(
    () => (topNewsIds ?? []).slice(0, 200),
    [topNewsIds],
  );

  return (
    <SplitView
      defaultLeftPct={48}
      left={
        <div className="h-[99vh] overflow-auto p-4">
          {isLoading ? (
            <NewsListSkeleton rows={10} />
          ) : (
            <div className="mx-auto max-w-3xl space-y-3">
              {visibleIds.map((id) => (
                <NewsCard key={id} newsId={id} onPreview={setPreviewUrl} />
              ))}
              {!visibleIds.length && (
                <div className="rounded-xl border border-neutral-200/60 p-6 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                  No stories right now.
                </div>
              )}
            </div>
          )}
        </div>
      }
      right={
        <WebPreviewPane
          onClose={() => setPreviewUrl(undefined)}
          url={previewUrl}
        />
      }
    />
  );
};
