import useSWR from "swr";
import { fetcher, post } from "../lib/fetcher";
import { FormValues } from "../lib/data.type";

const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/products", fetcher);

  const createProduct = async (newProduct: FormValues) => {
    await post("/api/products", newProduct);
    mutate(); // Refresh data
  };

  return {
    products: data,
    isLoading,
    isError: error,
    mutate, // Allows revalidating data manually
    createProduct,
  };
};

export default useProducts;
