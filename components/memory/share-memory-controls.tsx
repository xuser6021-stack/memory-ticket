"use client";

import { useState } from "react";

type ShareMemoryControlsProps = {
  memoryId: string;
  shareId: string;
  initialIsPublic: boolean;
};

export default function ShareMemoryControls({
  memoryId,
  shareId,
  initialIsPublic,
}: ShareMemoryControlsProps) {
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  async function updateSharing() {
    if (isUpdating) return;

    const nextIsPublic = !isPublic;
    setMessage("");
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/memories/${memoryId}/share`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublic: nextIsPublic }),
      });
      const data: unknown = await response.json();
      const responseMessage =
        typeof data === "object" && data !== null && "message" in data
          ? data.message
          : undefined;

      if (!response.ok) {
        setMessage(
          typeof responseMessage === "string"
            ? responseMessage
            : "Unable to update sharing settings",
        );
        return;
      }

      setIsPublic(nextIsPublic);
      setMessage(nextIsPublic ? "Public sharing enabled." : "Public sharing disabled.");
    } catch {
      setMessage("Unable to update sharing settings. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function copyShareLink() {
    if (!isPublic) return;

    try {
      await navigator.clipboard.writeText(`${window.location.origin}/ticket/${shareId}`);
      setMessage("Share link copied.");
    } catch {
      setMessage("Unable to copy the share link.");
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={isPublic}
        onClick={updateSharing}
        disabled={isUpdating}
        className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isUpdating ? "Updating..." : isPublic ? "Sharing On" : "Sharing Off"}
      </button>
      <button
        type="button"
        onClick={copyShareLink}
        disabled={!isPublic}
        className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        Copy Share Link
      </button>
      {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
