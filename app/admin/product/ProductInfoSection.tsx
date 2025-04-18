import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { FormValues } from "@/app/lib/data.type";

interface ProductInfoSectionProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const inputContent = "flex flex-col gap-1";
const inputBorderInput = "border border-gray-100 rounded py-3 p-2 outline-none focus:border-gray-400";
const errorMessageCSS = "text-red-500 text-sm";
const labelCSS = "block mb-2 font-medium text-gray-700";

export default function ProductInfoSection({
  register,
  errors,
  watch,
}: ProductInfoSectionProps) {
  const price = watch('price') || 0;
  const discount = watch('discount') || 0;

  const netPrice = price - (price * discount) / 100;

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
      <div className={`${inputContent} lg:col-span-2`}>
        <label className={labelCSS}>Product Name</label>
        <input
          {...register("name")}
          placeholder="Enter product name"
          className={inputBorderInput}
        />
        {errors.name && (
          <p className={errorMessageCSS}>{errors.name.message}</p>
        )}
      </div>

      <div className={`${inputContent} lg:col-span-2`}>
        <label className={labelCSS}>Description</label>
        <textarea
          {...register("description")}
          placeholder="Enter description"
          className={`${inputBorderInput} min-h-40`}
        />
        {errors.description && (
          <p className={errorMessageCSS}>{errors.description.message}</p>
        )}
      </div>

      <div className={`${inputContent} `}>
        <label className={labelCSS}>Price in usd {netPrice == 0 ? "" : "- $ "+netPrice} <span className="text-gray-400 line-through font-light">{discount ? `($ ${price})`: ""}</span></label>
        <input
          {...register("price")}
          type="number"
          step={0.01}
          placeholder="Enter price"
          className={inputBorderInput}
        />
        {errors.price && (
          <p className={errorMessageCSS}>{errors.price.message}</p>
        )}
      </div>

      <div className={`${inputContent} `}>
        <label className={labelCSS}>Discount in percentage <span className="text-gray-400 font-light text-sm">(Optional)</span></label>
        <input
          {...register("discount")}
          type="number"
          placeholder="Enter discount"
          className={inputBorderInput}
        />
        {errors.discount && (
          <p className={errorMessageCSS}>{errors.discount.message}</p>
        )}
      </div>

      <div className={`${inputContent} lg:col-span-2 hidden`}>
        <label className={labelCSS}>Stock Quantity</label>
        <input
          {...register("stockQuantity")}
          type="number"
          value={10000}
          placeholder="Enter stock quantity"
          className={inputBorderInput}
        />
        {errors.stockQuantity && (
          <p className={errorMessageCSS}>{errors.stockQuantity.message}</p>
        )}
      </div>
    </div>
  );
}
