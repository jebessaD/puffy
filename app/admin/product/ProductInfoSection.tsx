import { UseFormRegister, FieldErrors, UseFormGetValues, UseFormWatch } from "react-hook-form";
import { FormValues } from "@/app/lib/data.type";

interface ProductInfoSectionProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const inputContent = "flex flex-col gap-1";
const inputBorderInput = "border p-2 rounded";
const errorMessageCSS = "text-red-500 text-sm";

export default function ProductInfoSection({
  register,
  errors,
  watch,
}: ProductInfoSectionProps) {
  const price = watch('price') || 0;
  const discount = watch('discount') || 0;

  const netPrice = price - (price * discount) / 100;

  return (
    <div className="flex flex-col gap-4">
      <div className={inputContent}>
        <label className="font-medium">Product Name</label>
        <input
          {...register("name")}
          placeholder="Enter product name"
          className={inputBorderInput}
        />
        {errors.name && (
          <p className={errorMessageCSS}>{errors.name.message}</p>
        )}
      </div>

      <div className={inputContent}>
        <label className="font-medium">Description</label>
        <textarea
          {...register("description")}
          placeholder="Enter description"
          className={`${inputBorderInput} min-h-40`}
        />
        {errors.description && (
          <p className={errorMessageCSS}>{errors.description.message}</p>
        )}
      </div>

      <div className={inputContent}>
        <label className="font-medium">Price in usd {netPrice == 0 ? "" : "- $ "+netPrice} <span className="text-gray-400 line-through font-light">{discount ? `($ ${price})`: ""}</span></label>
        <input
          {...register("price")}
          type="number"
          placeholder="Enter price"
          className={inputBorderInput}
        />
        {errors.price && (
          <p className={errorMessageCSS}>{errors.price.message}</p>
        )}
      </div>

      <div className={inputContent}>
        <label className="font-medium">Discount in percentage</label>
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

      <div className={inputContent}>
        <label className="font-medium">Stock Quantity</label>
        <input
          {...register("stockQuantity")}
          type="number"
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
