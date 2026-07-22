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
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Upload Image
        </button>
      )}
    </CldUploadWidget>
  );
}
