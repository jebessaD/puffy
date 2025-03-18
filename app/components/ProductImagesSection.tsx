import {
  UseFormSetValue,
  UseFormWatch,
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { FormValues } from "../lib/data.type";
import React from "react";
import { Button } from "@/components/ui/button";
import ErrorMessage from "./InputErrorDisplay";

interface ProductImagesSectionProps {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
}

const labelCSS = "block mb-1 font-medium";

const ProductImagesSection: React.FC<ProductImagesSectionProps> = ({
  control,
  setValue,
  watch,
  errors,
  register,
}) => {
  const mainImage = watch("mainImage");
  const additionalImages = watch("additionalImages");

  const handleMainImageInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const url = e.target.value;
    setValue("mainImage", url);
  };

  const [additionalImageInput, setAdditionalImageInput] =
    React.useState<string>("");

  const handleAddAdditionalImage = () => {
    if (additionalImageInput.trim() !== "") {
      setValue("additionalImages", [...additionalImages, additionalImageInput]);
      setAdditionalImageInput(""); // Clear input after adding
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image URL (String Only) */}
      <div>
        <label className={labelCSS}>Main Image URL (String)</label>
        <input
          type="text"
          {...register("mainImage", {
            required: "Main Image is required",
            onChange: (e) => handleMainImageInputChange,
          })}
          placeholder="Enter main image URL"
          className="border p-2 rounded w-full"
        />
        <ErrorMessage errors={errors} fieldName="mainImage" />
      </div>

      {/* Additional Images URLs (Strings Only) */}
      <div>
        <label className={labelCSS}>Additional Image URLs (Strings)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={additionalImageInput}
            onChange={(e) => setAdditionalImageInput(e.target.value)}
            placeholder="Enter additional image URL"
            className="border p-2 rounded w-full"
          />
          <Button
            type="button"
            onClick={handleAddAdditionalImage}
            className="py-5"
          >
            Add
          </Button>
        </div>
        <ErrorMessage errors={errors} fieldName="additionalImages" />

        <div className="flex flex-col gap-1 mt-2">
          {additionalImages.map((img, index) => (
            <div
              key={index}
              className="border px-3 py-2 rounded bg-gray-100 text-sm"
            >
              {img}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImagesSection;
