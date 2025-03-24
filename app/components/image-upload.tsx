"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { useImageUpload } from "../hooks/useImageUpload";
import { Button } from "@/components/ui/button";
import { IoCloudUpload } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

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
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      
      <div className="flex gap-4 flex-wrap">
        {value && (
          <div 
            className="group relative aspect-square w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-all hover:border-gray-300"
            onClick={() => inputRef.current?.click()}
          >
            {!isUploading && (
              <>
                <Image
                  src={value}
                  alt="Uploaded image"
                  fill
                  className="object-cover cursor-pointer transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                  <IoCloudUpload className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </>
            )}

            {onRemove && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent's onClick
                  onRemove();
                }}
                className="absolute top-2 right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-all hover:bg-white hover:text-black"
              >
                <IoClose className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {!value && !isUploading && (
          <div 
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square w-full h-[150px] bg-white rounded-lg p-4 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 transition-all hover:bg-gray-50/80 hover:border-gray-300"
          >
            <IoCloudUpload className="h-10 w-10 text-gray-400" />
            <p className="text-sm font-medium text-gray-600">Click to upload</p>
            <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={isUploading}
        />
      </div>

      {isUploading && (
        <div className=" items-center gap-2 h-[150px]  py-auto">
          <div className="h-2 w-full my-auto flex-1 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-1/2 h-2 animate-pulse rounded-full bg-black"></div>
          </div>
          <div className="text-sm text-gray-500">Uploading...</div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <IoClose className="h-4 w-4" />
          {error.message}
        </p>
      )}
    </div>
  );
}
