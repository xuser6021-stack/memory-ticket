"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function NewMemoryPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Memory
      </h1>

      <div className="space-y-6">
        <CldUploadWidget
          uploadPreset="yrtfqowv"
          onSuccess={(result: any) => {
            setImageUrl(result.info.secure_url);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="rounded-lg bg-blue-600 px-5 py-3 text-white"
            >
              Upload Image
            </button>
          )}
        </CldUploadWidget>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="rounded-xl w-full"
          />
        )}
      </div>
    </main>
  );
}