"use client";

import { useState } from "react";
import { toPng } from "html-to-image";

type DownloadTicketButtonProps = {
  title: string;
};

function createFilename(title: string) {
  const safeTitle = title
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return `memory-ticket-${safeTitle || "memory"}.png`;
}

export default function DownloadTicketButton({ title }: DownloadTicketButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  async function handleDownload() {
    if (isDownloading) return;

    const ticket = document.getElementById("memory-ticket");

    if (!ticket) {
      setError("Unable to find the memory ticket.");
      return;
    }

    setError("");
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(ticket, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = createFilename(title);
      link.href = dataUrl;
      link.click();
    } catch {
      setError("Unable to download the ticket. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        aria-busy={isDownloading}
        className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDownloading ? "Preparing PNG..." : "Download PNG"}
      </button>
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
