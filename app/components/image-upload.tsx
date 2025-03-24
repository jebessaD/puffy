"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { useImageUpload } from "../hooks/useImageUpload";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label: string;
  folder?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  label,
  folder = "products",
}: ImageUploadProps) {
  const { upload, isUploading, error } = useImageUpload({
    folder,
    onSuccess: onChange,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await upload(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label className="font-medium">{label}</label>
        <div className="flex items-center gap-4">
          {isUploading ? (
            <Button
              type="button"
              variant="outline"
              className="w-fit"
              disabled={isUploading}
              onClick={() => inputRef.current?.click()}
            >
              Uploading...
            </Button>
          ) : (
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={isUploading}
            />
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>

      <div className="flex gap-4 flex-wrap">
        {value && (
          <div className="relative aspect-square w-[130px] overflow-hidden rounded-md border">
            {!isUploading && (
              <Image
                src={value}
                alt="Uploaded image"
                fill
                className="object-cover cursor-pointer"
                onClick={() => inputRef.current?.click()}
              />
            )}

            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="absolute w-6 h-6 text-center top-2 right-2 z-10 rounded-full bg-white text-gray-600"
              >
                &minus;
              </button>
            )}
          </div>
        )}

        {!value && !isUploading && (
          <Image
            src="/image/upload_area.png"
            alt="Upload placeholder"
            width={130}
            height={130}
            className="object-cover aspect-square cursor-pointer"
            onClick={() => inputRef.current?.click()}
          />
        )}
      </div>
    </div>
  );
}
