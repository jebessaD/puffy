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
    <div className="space-y-2">
      <div>
        <ImageUpload
          value={mainImage}
          onChange={handleMainImageChange}
          label="Main Product Image"
          folder="products"
        />
        {errors.mainImage && (
          <p className="text-red-500 text-sm mt-1">
            {errors.mainImage.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="font-medium">Additional Images</label>
          <span className="text-sm text-gray-500">
            {additionalImages.length}/{MAX_ADDITIONAL_IMAGES} images
          </span>
        </div>

        {MAX_ADDITIONAL_IMAGES == additionalImages.length ? (
          ""
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
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
              className={`flex flex-col items-center justify-center cursor-pointer ${isUploading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <p className="text-sm text-gray-600">
                    Uploading... {Math.round(uploadProgress)}%
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Upload upto{" "}
                    {MAX_ADDITIONAL_IMAGES - additionalImages.length} images,
                    click to upload
                  </p>
                </div>
              )}
            </label>
          </div>
        )}

        {additionalImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {additionalImages.map((image, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={image}
                  alt={`Additional image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  type="button"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white hover:bg-white text-black w-6 h-6 border border-gray-300"
                  onClick={() => {
                    const newImages = additionalImages.filter(
                      (_, i) => i !== index
                    );
                    setValue("additionalImages", newImages);
                  }}
                  disabled={isUploading}
                >
                  -
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImagesSection;
