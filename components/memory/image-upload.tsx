"use client";

import { CldUploadWidget } from "next-cloudinary";

type ImageUploadProps = {
  onUpload: (imageUrl: string) => void;
};

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset="yrtfqowv"
      onSuccess={(result) => {
        const imageUrl =
          result.info && typeof result.info === "object" && "secure_url" in result.info
            ? result.info.secure_url
            : undefined;

        if (typeof imageUrl === "string") {
          onUpload(imageUrl);
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="rounded-lg bg-primary px-5 py-3 text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Upload Image
        </button>
      )}
    </CldUploadWidget>
  );
}
