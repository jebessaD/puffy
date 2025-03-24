import useSWR from "swr";
import { fetcher, post, put } from "../lib/fetcher";
import { FormValues } from "../lib/data.type";

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

const useProducts = (filters?: ProductFilters) => {
  // Create URL with filters if they exist
  const url = filters 
    ? `/api/products?${new URLSearchParams({
        ...(filters.category && { category: filters.category }),
        ...(filters.minPrice && { minPrice: filters.minPrice.toString() }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
        ...(filters.sortBy && { sortBy: filters.sortBy }),
        ...(filters.order && { order: filters.order })
      }).toString()}`
    : '/api/products';

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const createProduct = async (newProduct: FormValues) => {
    await post("/api/products", newProduct);
  };

  const updateProduct = async (productId: string, updatedProduct: FormValues) => {
    await put(`/api/products/${productId}`, updatedProduct);
    await mutate();
  };

  return {
    products: data?.products || [],
    isLoading,
    isError: error,
    createProduct,
    updateProduct,
    mutate,
  };
};

export default useProducts;
