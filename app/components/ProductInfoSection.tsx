import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "../lib/data.type";

interface ProductInfoSectionProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

const inputContent = "flex flex-col gap-1";
const inputBorderInput = "border p-2 rounded";
const errorMessageCSS = "text-red-500 text-sm";

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  register, errors
}) => (
  <div className="flex flex-col gap-4">
    <div className={inputContent}>
      <label className="font-medium">Product Name</label>
      <input
        {...register("name", { required: "Name is required" })}
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
        {...register("description", { required: "Description is required" })}
        placeholder="Enter description"
        className={`${inputBorderInput} min-h-40`}
      />
      {errors.description && (
          <p className={errorMessageCSS}>{errors.description.message}</p>
        )}
    </div>

    <div className={inputContent}>
      <label className="font-medium">Price</label>
      <input
        {...register("price", { required: "Price is required" })}
        type="number"
        placeholder="Enter price"
        className={inputBorderInput}
      />
      {errors.price && (
          <p className={errorMessageCSS}>{errors.price.message}</p>
        )}
    </div>

    <div className={inputContent}>
      <label className="font-medium">Discount</label>
      <input
        {...register("discount", { required: "Discount is required" })}
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
        {...register("stockQuantity", { required: "Stock quantity is required" })}
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
        {...register("category", { required: "Category is required" })}
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
