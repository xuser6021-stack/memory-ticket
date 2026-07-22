"use client";

import { useState } from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { useRouter } from "next/navigation";

type DeleteMemoryButtonProps = {
  memoryId: string;
};

export default function DeleteMemoryButton({ memoryId }: DeleteMemoryButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (isDeleting) return;

    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/memories/${memoryId}`, {
        method: "DELETE",
      });
      const data: unknown = await response.json();
      const message =
        typeof data === "object" && data !== null && "message" in data
          ? data.message
          : undefined;

      if (!response.ok) {
        setError(typeof message === "string" ? message : "Unable to delete memory");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to delete memory. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="inline-flex rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        Delete Memory
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
        <AlertDialog.Popup aria-busy={isDeleting} className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl border bg-card p-6 text-card-foreground shadow-lg">
          <div className="space-y-2">
            <AlertDialog.Title className="text-lg font-semibold">
              Delete this memory?
            </AlertDialog.Title>
            <AlertDialog.Description className="text-sm text-muted-foreground">
              This action cannot be undone.
            </AlertDialog.Description>
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <AlertDialog.Close
              disabled={isDeleting}
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </AlertDialog.Close>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : "Delete Memory"}
            </button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
