"use client";

import { use, useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import Loading from "../components/ui/loading";
import { ProductFilters as ProductFiltersType, Product } from "../lib/types";
import { emptyImage } from "../lib/utils";
import Image from "next/image";

export default function Home() {
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
        <div className="container pt-8 mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600 mb-8">
            Discover our collection of premium items
          </p>
          <div className="p-4 pb-0 rounded-md">
            {" "}
            <ProductFilters onFilterChange={setFilters} />{" "}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container relative py-8 mx-auto ">
        {isLoading ? (
          <div className="bg-white bg-opacity-10 absolute mx-auto w-full z-10  flex-col space-y-2  justify-center flex min-h-[400px]  items-center ">
            <Loading />
            <p className="text-center   text-gray-600 ">Loading products...</p>
          </div>
        ) : (
          products.length === 0 ? (
            <div className="flex min-h-[400px]  items-center justify-center ">
              <div className="text-center">
                <Image
                  src={emptyImage}
                  className="mix-blend-multiply"
                  alt={"No products found"}
                  width={200}
                  height={200}
                  priority={false}
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  No products found
                </h3>
                <p className="mt-2 text-gray-600">Try adjusting your filters</p>
              </div>
            </div>
          ) : <></>
        )}
        {products.length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:gap-6 sm:grid-cols-3 lg:grid-cols-4 ">
            {products.map((product: Product) => (
              <ProductCard mutate={mutate} key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
