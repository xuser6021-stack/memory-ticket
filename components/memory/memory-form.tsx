"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageUpload from "./image-upload";

type MemoryFormProps = {
  initialMemory?: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
  };
};

export default function MemoryForm({ initialMemory }: MemoryFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialMemory);
  const memoryId = initialMemory?.id;
  const [title, setTitle] = useState(initialMemory?.title ?? "");
  const [description, setDescription] = useState(initialMemory?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initialMemory?.imageUrl ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        memoryId ? `/api/memories/${memoryId}` : "/api/memories",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, imageUrl }),
        },
      );
      const data: unknown = await response.json();
      const message =
        typeof data === "object" && data !== null && "message" in data
          ? data.message
          : undefined;

      if (!response.ok) {
        setError(
          typeof message === "string"
            ? message
            : `Unable to ${isEditing ? "update" : "create"} memory`,
        );
        return;
      }

      setSuccess(
        `Memory ${isEditing ? "updated" : "created"} successfully! Redirecting...`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(memoryId ? `/dashboard/memories/${memoryId}` : "/dashboard");
      router.refresh();
    } catch {
      setError(`Unable to ${isEditing ? "update" : "create"} memory. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          aria-describedby={error ? "memory-form-error" : undefined}
          aria-invalid={Boolean(error)}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          aria-describedby={error ? "memory-form-error" : undefined}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
      </div>

      <div className="space-y-3">
        <ImageUpload onUpload={setImageUrl} />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Memory preview"
            width={800}
            height={500}
            sizes="(max-width: 768px) 100vw, 672px"
            className="h-auto w-full rounded-xl"
          />
        )}
      </div>

      {error && (
        <p id="memory-form-error" role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {success && <p role="status" className="text-sm text-green-600">{success}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="rounded-lg bg-primary px-5 py-3 text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? isEditing
            ? "Updating..."
            : "Creating..."
          : isEditing
            ? "Update Memory"
            : "Create Memory"}
      </button>
    </form>
  );
}
