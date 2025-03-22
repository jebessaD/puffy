import { useState } from "react";
import { uploadImage } from "../lib/uploadImage";

interface UseImageUploadOptions {
  folder: string;
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

export function useImageUpload({
  folder,
  onSuccess,
  onError,
}: UseImageUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);
      const url = await uploadImage({
        data: file,
        folder,
        type: "image",
      });
      onSuccess?.(url);
      return url;
    } catch (e) {
      const error = e instanceof Error ? e : new Error("Upload failed");
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
    error,
  };
}
