import { useEffect, useState } from "react";

export function WebPreviewPane({
  url,
  onClose,
}: {
  url?: string;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [url]);

  const domain = (() => {
    try {
      return url ? new URL(url).hostname.replace(/^www\./, "") : "";
    } catch {
      return "";
    }
  })();

  if (!url) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-500 dark:text-neutral-400">
        <p>Select an article to preview →</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-neutral-200/70 px-4 py-2 text-sm dark:border-neutral-800">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          className="h-4 w-4 rounded-sm"
        />
        <span className="truncate text-neutral-600 dark:text-neutral-300">
          {domain}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onClose}
            className=" inline-flex items-center gap-1 rounded-md border border-neutral-200/70 px-2 py-1 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
          >
            Close
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-neutral-200/70 px-2 py-1 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
            title="Open in new tab"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17l10-10M9 7h8v8"
                fill="none"
              />
            </svg>
            Open
          </a>
        </div>
      </div>

      {!loaded && (
        <div className="relative">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-[linear-gradient(100deg,transparent_30%,rgba(0,0,0,0.06)_40%,transparent_60%)] dark:bg-[linear-gradient(100deg,transparent_30%,rgba(255,255,255,0.06)_40%,transparent_60%)]" />
          <div className="h-10 border-b border-neutral-200/70 dark:border-neutral-800" />
          <div className="h-[calc(100dvh-80px-40px)] bg-neutral-100/60 dark:bg-neutral-800/40" />
        </div>
      )}

      <iframe
        key={url}
        src={url}
        title={domain || "Article preview"}
        className="h-full w-full flex-1"
        onLoad={() => setLoaded(true)}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        allow="fullscreen"
      />
    </div>
  );
}
