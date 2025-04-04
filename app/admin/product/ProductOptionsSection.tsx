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
import { IoAdd } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

interface ProductOptionsSectionProps {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  trigger: UseFormTrigger<FormValues>;
}

const inputContent = "flex gap-2 relative";
const inputBorderInput =
  "border border-gray-200 p-3 rounded-lg w-full focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all outline-none";
const labelCSS = "block mb-2 font-medium text-gray-700";
const iterableContentCSS = "flex flex-wrap gap-2 min-h-[40px]";
const iterableSpanCSS =
  "group flex items-center bg-white border border-gray-200 px-3 pr-1 py-1 rounded-full text-gray-700 text-sm transition-all hover:border-gray-300";

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

  const handleRemoveAdditionalSize = async (index: number) => {
    const updatedSizes = size.filter((val: string, i: number) => i !== index); // Remove the image at the specified index

    setValue("size", updatedSizes); // Update the form state

    // Trigger validation after removing
    await trigger("size");

  };

  const handleRemoveAdditionalColor = async (index: number) => {
    const updatedColors = color.filter((val: string, i: number) => i !== index); // Remove the image at the specified index

    setValue("color", updatedColors); // Update the form state

    // Trigger validation after removing
    await trigger("color");
  };

  return (
    <div className="flex w-full gap-6 mt-4">
      {/* Color Array */}
      <div className="flex-1">
        <label className={labelCSS}>
          Colors <span className="text-gray-400 font-light text-sm">(Optional)</span>
        </label>
        <div className={inputContent}>
          <input
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="e.g., Red, Blue, Forest Green..."
            className={inputBorderInput}
          />
          <Button
            type="button"
            onClick={addColor}
            className="min-w-[44px] h-[44px] bg-black hover:bg-black/90 transition-colors"
          >
            <IoAdd className="h-5 w-5" />
          </Button>
        </div>
        <div className={`${iterableContentCSS} pt-3`}>
          {colors.map((color, index) => (
            <div key={index}>
              <span className={iterableSpanCSS}>
                {color}
                <button
                  type="button"
                  onClick={() => handleRemoveAdditionalColor(index)}
                  className="ml-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <IoClose className="h-4 w-4" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Size Array */}
      <div className="flex-1">
        <label className={labelCSS}>
          Sizes <span className="text-gray-400 font-light text-sm">(Optional)</span>
        </label>
        <div className={inputContent}>
          <input
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            placeholder="e.g., S, M, L, XL, 42, 44..."
            className={inputBorderInput}
          />
          <Button
            type="button"
            onClick={addSize}
            className="min-w-[44px] h-[44px] bg-black hover:bg-black/90 transition-colors"
          >
            <IoAdd className="h-5 w-5" />
          </Button>
        </div>
        <div className={`${iterableContentCSS} pt-3`}>
          {sizes.map((size, index) => (
            <div key={index}>
              <span className={iterableSpanCSS}>
                {size}
                <button
                  type="button"
                  onClick={() => handleRemoveAdditionalSize(index)}
                  className="ml-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <IoClose className="h-4 w-4" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOptionsSection;
