import {
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { FormValues } from "../../lib/data.type";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/app/components/image-upload";
import { uploadImage } from "@/app/lib/uploadImage";
import { Loader2 } from "lucide-react";

interface ProductImagesSectionProps {
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
}


const MAX_ADDITIONAL_IMAGES = 6;

const ProductImagesSection: React.FC<ProductImagesSectionProps> = ({
  setValue,
  watch,
  errors,
}) => {
  const mainImage = watch("mainImage");
  const additionalImages = watch("additionalImages") || [];
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleMainImageChange = (url: string) => {
    setValue("mainImage", url, { shouldValidate: true });
  };

  const handleAdditionalImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    try {
      setIsUploading(true);
      const totalFiles = Math.min(
        files.length,
        MAX_ADDITIONAL_IMAGES - additionalImages.length
      );
      let completedUploads = 0;

      const uploadPromises = Array.from(files)
        .slice(0, MAX_ADDITIONAL_IMAGES - additionalImages.length)
        .map(async (file) => {
          const url = await uploadImage({
            data: file,
            folder: "products",
            type: "image",
          });
          completedUploads++;
          setUploadProgress((completedUploads / totalFiles) * 100);
          return url;
        });

      const newUrls = await Promise.all(uploadPromises);
      const newImages = [...additionalImages, ...newUrls].slice(
        0,
        MAX_ADDITIONAL_IMAGES
      );
      setValue("additionalImages", newImages);
    } catch (error) {
      console.error("Error uploading additional images:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl space-y-6">
      <h2 className="text-lg font-semibold mb-4">Product Images</h2>
      <div className="space-y-6">
        <div>
        <ImageUpload
          value={mainImage}
          onChange={handleMainImageChange}
          label="Main Product Image"
          folder="products"
        />
          {errors.mainImage && (
            <p className="text-red-500 text-sm mt-2">
              {errors.mainImage.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-gray-700">Gallery Images</label>
            <span className="text-sm text-gray-500">
              {additionalImages.length}/{MAX_ADDITIONAL_IMAGES}
            </span>
          </div>

          {additionalImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {additionalImages.map((image, index) => (
                <div key={index} className="relative group w-[80px] h-[80px]">
                  <img
                    src={image}
                    alt={`Additional image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white hover:bg-white text-black w-5 h-5 p-0"
                    onClick={() => {
                      const newImages = additionalImages.filter(
                        (_, i) => i !== index
                      );
                      setValue("additionalImages", newImages);
                    }}
                    disabled={isUploading}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}

          {MAX_ADDITIONAL_IMAGES === additionalImages.length ? (
            <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              Maximum number of images reached
            </p>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white transition-all hover:border-gray-400">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAdditionalImagesUpload}
                className="hidden"
                id="additional-images"
                max={MAX_ADDITIONAL_IMAGES}
                disabled={isUploading}
              />
              <label
                htmlFor="additional-images"
                className={`flex flex-col items-center justify-center cursor-pointer ${
                  isUploading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <p className="text-sm text-gray-600">
                      Uploading... {Math.round(uploadProgress)}%
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600">
                        Click to upload images
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        You can add up to{" "}
                        {MAX_ADDITIONAL_IMAGES - additionalImages.length} more
                        images
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImagesSection;
