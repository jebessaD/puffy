"use client";

import { useState } from "react";
import useProducts from "@/app/hooks/useProducts";
import ProductCard from "@/app/shop/ProductCard";
import ProductFilters from "@/app/shop/ProductFilters";
import Loading from "@/app/components/ui/loading";
import { ProductFilters as ProductFiltersType, Product } from "@/app/lib/types";

export default function EditPage() {
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const { products = [], isLoading, isError, mutate } = useProducts(filters);

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Error loading products
          </h2>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <main className=" mx-auto ">
      {/* Hero Section */}
      <div className=" mb-8 text-center bg-white py-12">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600 mb-8">
            Discover our collection of premium items
          </p>
          <div className="">
            {" "}
            <ProductFilters onFilterChange={setFilters} />{" "}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container px-4 py-8 mx-auto">
        {isLoading ? (
          <>
            <Loading />
            <p className="text-center text-gray-600 mt-2">
              Loading products...
            </p>
          </>
        ) : products.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                No products found
              </h3>
              <p className="mt-2 text-gray-600">Try adjusting your filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 ">
            {products.map((product: Product) => (
                product.deleteStatus ||
                <ProductCard
                  key={product.id}
                  product={product}
                  mutate={mutate}
                />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
