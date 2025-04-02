import useSWR from "swr";
import { fetcher, post, put, deleteData } from "../lib/fetcher";
import { FormValues } from "../lib/data.type";

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
  isDeleted?: boolean;
}

const useProducts = (filters?: ProductFilters) => {
  // Create URL with filters if they exist
  const url = filters
    ? `/api/products?${new URLSearchParams({
        ...(filters.category && { category: filters.category }),
        ...(filters.minPrice && { minPrice: filters.minPrice.toString() }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
        ...(filters.sortBy && { sortBy: filters.sortBy }),
        ...(filters.order && { order: filters.order }),
        ...(filters.search && { search: filters.search }),
      }).toString()}`
    : "/api/products";

  // Use SWR with `keepPreviousData` to prevent clearing the existing data while fetching
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    keepPreviousData: true, // Prevents clearing old data while fetching new
    revalidateOnFocus: false, // Optional: Avoids unnecessary refetch on window focus
  });

  const createProduct = async (newProduct: FormValues) => {
    await post("/api/products", newProduct);
  };

  const updateProduct = async (
    productId: number,
    updatedProduct: FormValues
  ) => {
    await put(`/api/products/${productId}`, updatedProduct);
  };

  const deleteProduct = async (productId: number) => {
    await deleteData(`/api/products/${productId}`);
  }
  return {
    products: data?.products || [], // Old products remain while fetching new ones
    isLoading,
    isError: error,
    createProduct,
    updateProduct,
    deleteProduct,
    mutate,
  };
};

export default useProducts;
