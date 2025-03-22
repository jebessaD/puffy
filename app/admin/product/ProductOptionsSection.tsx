"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Control,
  UseFormSetValue,
  UseFormWatch,
  UseFormTrigger,
} from "react-hook-form";
import { FormValues } from "../../lib/data.type";

interface ProductOptionsSectionProps {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  trigger: UseFormTrigger<FormValues>;
}

const inputContent = "flex gap-2";
const inputBorderInput = "border p-2 rounded w-full";
const labelCSS = "block mb-1 font-medium";
const iterableContentCSS = "flex flex-wrap gap-2";
const iterableSpanCSS = "bg-gray-200 px-3 py-1 rounded";

const ProductOptionsSection: React.FC<ProductOptionsSectionProps> = ({
  control,
  setValue,
  watch,
  trigger,
}) => {
  const [colorInput, setColorInput] = useState<string>("");
  const [sizeInput, setSizeInput] = useState<string>("");

  const colors = watch("color") as string[];
  const sizes = watch("size") as string[];

  const addColor = () => {
    if (colorInput.trim() !== "") {
      setValue("color", [...colors, colorInput]);
      setColorInput("");
    }
  };

  const addSize = () => {
    if (sizeInput.trim() !== "") {
      setValue("size", [...sizes, sizeInput]);
      setSizeInput("");
    }
  };

  const size = watch("size") || [];
  const color = watch("color") || [];

  const handleRemoveAdditionalSize = async () => {
    const index = size.length - 1;
    const updatedSizes = size.filter((val: string, i: number) => i !== index); // Remove the image at the specified index

    setValue("size", updatedSizes); // Update the form state

    // Trigger validation after removing
    await trigger("size");
    console.log(size);
  };

  const handleRemoveAdditionalColor = async () => {
    const index = color.length - 1;
    const updatedColors = color.filter((val: string, i: number) => i !== index); // Remove the image at the specified index

    setValue("color", updatedColors); // Update the form state

    // Trigger validation after removing
    await trigger("color");
    console.log(color);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Color Array */}
      <div>
        <label className={labelCSS}>Colors (optional)</label>
        <div className={inputContent}>
          <input
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="Add color"
            className={inputBorderInput}
          />
          <Button type="button" onClick={addColor} className="py-5">
            Add
          </Button>
        </div>
        <div className={`${iterableContentCSS} pt-2`}>
          {colors.map((color, index) => (
            <span key={index} className={iterableSpanCSS}>
              {color}
            </span>
          ))}
          {color.length > 0 && (
            <Button
              type="button"
              onClick={handleRemoveAdditionalColor} // Remove functionality
            >
              X
            </Button>
          )}
        </div>
      </div>

      {/* Size Array */}
      <div>
        <label className={labelCSS}>Sizes (optional)</label>
        <div className={inputContent}>
          <input
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            placeholder="Add size"
            className={inputBorderInput}
          />
          <Button type="button" onClick={addSize} className="py-5">
            Add
          </Button>
        </div>
        <div className={`${iterableContentCSS} mt-2`}>
          {sizes.map((size, index) => (
            <span key={index} className={iterableSpanCSS}>
              {size}
            </span>
          ))}
          {size.length > 0 && (
            <Button
              type="button"
              onClick={handleRemoveAdditionalSize} // Remove functionality
            >
              X
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductOptionsSection;
