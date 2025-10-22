import type { FC } from "react";
import { cn } from "@/lib/utils";
import { useGetStoryDetail } from "@/hooks/api/news";

interface NewsCardProps {
  className?: string;
  newsId: number;
  onPreview: (url: string) => void;
}

const NewsCardSkeleton: FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      "group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800/60 dark:bg-neutral-900/60",
      className,
    )}
    aria-busy="true"
    aria-live="polite"
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-[linear-gradient(100deg,transparent_30%,rgba(0,0,0,0.06)_40%,transparent_60%)] dark:bg-[linear-gradient(100deg,transparent_30%,rgba(255,255,255,0.06)_40%,transparent_60%)]" />
    <div className="flex items-start gap-3">
      <div className="h-6 w-6 shrink-0 rounded-md bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex-1 space-y-2">
        <div className="h-5 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-3/5 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-4">
      <div className="h-4 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-4 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
    </div>
  </div>
);

const Icon = {
  ArrowTopRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17l10-10M9 7h8v8"
      />
    </svg>
  ),
  User: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        d="M12 12a5 5 0 100-10 5 5 0 000 10z"
      />
      <path stroke="currentColor" strokeWidth={1.5} d="M21 22a9 9 0 10-18 0" />
    </svg>
  ),
  Clock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5} />
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        d="M12 7v6l4 2"
      />
    </svg>
  ),
  Upvote: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        d="M12 4l7 8H5l7-8z"
      />
      <path stroke="currentColor" strokeWidth={1.5} d="M5 20h14" />
    </svg>
  ),
  Comment: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path stroke="currentColor" strokeWidth={1.5} d="M4 6h16v10H7l-3 3V6z" />
    </svg>
  ),
  Link: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        d="M10 14a5 5 0 007.07 0l2.12-2.12a5 5 0 10-7.07-7.07L10 6"
      />
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        d="M14 10a5 5 0 00-7.07 0L4.8 12.12a5 5 0 007.07 7.07L14 18"
      />
    </svg>
  ),
};

function getDomain(url?: string) {
  try {
    if (!url) return null;
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function timeAgo(unixSeconds?: number) {
  if (!unixSeconds) return "";
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const now = Date.now();
  const diffMs = unixSeconds * 1000 - now;
  const sec = Math.round(diffMs / 1000);
  const min = Math.round(sec / 60);
  const hour = Math.round(min / 60);
  const day = Math.round(hour / 24);

  if (Math.abs(day) >= 1) return rtf.format(day, "day");
  if (Math.abs(hour) >= 1) return rtf.format(hour, "hour");
  if (Math.abs(min) >= 1) return rtf.format(min, "minute");
  return rtf.format(sec, "second");
}

export const NewsCard: FC<NewsCardProps> = ({
  className,
  newsId,
  onPreview,
}) => {
  const { data: storyDetail, isLoading, isError } = useGetStoryDetail(newsId);

  if (isLoading) return <NewsCardSkeleton className={className} />;

  if (isError || !storyDetail) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-red-200/60 bg-red-50/70 p-5 text-red-900 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200",
          className,
        )}
        role="status"
      >
        <p className="font-medium">Couldn’t load this story.</p>
        <p className="text-sm opacity-80">Please try again or refresh.</p>
      </div>
    );
  }

  const domain = getDomain(storyDetail.url);
  const href =
    storyDetail.url ||
    `https://news.ycombinator.com/item?id=${encodeURIComponent(storyDetail.id)}`;
  const commentsCount =
    storyDetail.descendants ?? storyDetail.kids?.length ?? 0;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 p-5 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md hover:ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800/60 dark:bg-neutral-900/60 dark:hover:ring-white/10",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        {domain ? (
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
            alt=""
            className="h-4 w-4 rounded-sm"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="inline-flex h-4 w-4 items-center justify-center">
            <Icon.Link className="h-4 w-4" />
          </span>
        )}
        <span className="truncate">{domain ?? "news.ycombinator.com"}</span>
        <span aria-hidden="true">•</span>
        <time dateTime={new Date(storyDetail.time * 1000).toISOString()}>
          {timeAgo(storyDetail.time)}
        </time>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-start gap-2"
        >
          <span className="underline-offset-[6px] group-hover:no-underline">
            {storyDetail.title}
          </span>
          <Icon.ArrowTopRight className="mt-0.5 h-5 w-5 opacity-60 group-hover:opacity-90" />
        </a>
      </h3>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
        <div className=" flex items-center gap-2  max-md:hidden">
          {storyDetail.url && (
            <button
              type="button"
              onClick={() => onPreview(storyDetail.url)}
              className="inline-flex items-center gap-1 rounded-md border border-neutral-200/70 px-2 py-1 text-xs text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
            >
              Preview
            </button>
          )}
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 dark:bg-neutral-800/60">
          <Icon.Upvote className="h-4 w-4" />
          <span className="tabular-nums">{storyDetail.score}</span>
          <span className="sr-only">points</span>
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 dark:bg-neutral-800/60">
          <Icon.Comment className="h-4 w-4" />
          <span className="tabular-nums">{commentsCount}</span>
          <span className="sr-only">comments</span>
        </span>

        <span className="inline-flex items-center gap-1">
          <Icon.User className="h-4 w-4 opacity-70" />
          <span className="font-medium">{storyDetail.by}</span>
        </span>

        <span className="inline-flex items-center gap-1">
          <Icon.Clock className="h-4 w-4 opacity-70" />
          <time
            className="tabular-nums"
            dateTime={new Date(storyDetail.time * 1000).toISOString()}
            title={new Date(storyDetail.time * 1000).toLocaleString()}
          >
            {timeAgo(storyDetail.time)}
          </time>
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent dark:via-neutral-700/50" />
    </article>
  );
};
