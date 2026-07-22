"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageUpload from "./image-upload";

export default function MemoryForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/memories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageUrl }),
      });
      const data: unknown = await response.json();
      const message =
        typeof data === "object" && data !== null && "message" in data
          ? data.message
          : undefined;

      if (!response.ok) {
        setError(
          typeof message === "string" ? message : "Unable to create memory",
        );
        return;
      }

      setSuccess("Memory created successfully! Redirecting...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to create memory. Please try again.");
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
            unoptimized
            className="h-auto w-full rounded-xl"
          />
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {success && <p className="text-sm text-green-600">{success}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating..." : "Create Memory"}
      </button>
    </form>
  );
}
