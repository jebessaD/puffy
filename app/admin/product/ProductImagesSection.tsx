import {
  UseFormSetValue,
  UseFormWatch,
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";
import { FormValues } from "../../lib/data.type";
import React from "react";
import { ImageUpload } from "@/app/components/image-upload";

interface ProductImagesSectionProps {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
}

const ProductImagesSection: React.FC<ProductImagesSectionProps> = ({
  setValue,
  watch,
  errors,
}) => {
  const mainImage = watch("mainImage");
  const additionalImages = watch("additionalImages") || [];

  return (
    <div className="space-y-6">
      <div>
        <ImageUpload
          value={mainImage}
          onChange={async (url: string) => {
            setValue("mainImage", url);
          }}
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
        <label className="font-medium">Additional Images</label>
        <div className="flex flex-wrap gap-4">
          {[...additionalImages, ""].slice(0, 6).map((image, index) => (
            <ImageUpload
              key={`${image}-${index}`}
              value={image}
              label=""
              folder="products"
              onChange={(url: string) => {
                let newImages = [...additionalImages];

                if (url) {
                  newImages[index] = url;
                } else {
                  newImages.splice(index, 1);
                }

                newImages = newImages.filter(Boolean).slice(0, 6);
                setValue("additionalImages", newImages);
              }}
              onRemove={() => {
                let newImages = [...additionalImages];
                newImages.splice(index, 1);
                setValue("additionalImages", newImages);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImagesSection;
