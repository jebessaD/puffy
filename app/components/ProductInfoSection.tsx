import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductFormValues } from "../lib/schema";

interface ProductInfoSectionProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

const inputContent = "flex flex-col gap-1";
const inputBorderInput = "border p-2 rounded";
const errorMessageCSS = "text-red-500 text-sm";

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  register,
  errors,
}) => (
  <div className="flex flex-col gap-4">
    <div className={inputContent}>
      <label className="font-medium">Product Name</label>
      <input
        {...register("name")}
        placeholder="Enter product name"
        className={inputBorderInput}
      />
      {errors.name && <p className={errorMessageCSS}>{errors.name.message}</p>}
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
      <label className="font-medium">Price in usd</label>
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

    <div className={inputContent}>
      <label className="font-medium">Category</label>
      <input
        {...register("category")}
        placeholder="Enter category"
        className={inputBorderInput}
      />
      {errors.category && (
        <p className={errorMessageCSS}>{errors.category.message}</p>
      )}
    </div>
  </div>
);

export default ProductInfoSection;
