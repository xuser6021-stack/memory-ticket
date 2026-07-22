"use client";

import { useState } from "react";
import ImageUpload from "./image-upload";

export default function MemoryForm() {
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
      </div>

      <div className="space-y-3">
        <ImageUpload onUpload={setImageUrl} />
        {imageUrl && (
          <img src={imageUrl} alt="Memory preview" className="w-full rounded-xl" />
        )}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        Create Memory
      </button>
    </form>
  );
}
