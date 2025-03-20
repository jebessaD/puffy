'use client';

import { useState } from 'react';
import useProducts from './hooks/useProducts';
import ProductCard from './components/ProductCard';
import ProductFilters from './components/ProductFilters';
import Loading from './components/ui/loading';
import { ProductFilters as ProductFiltersType, Product } from './lib/types';

export default function Home() {
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const { products = [], isLoading, isError } = useProducts(filters);

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error loading products</h2>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
        <p className="mt-2 text-gray-600">Discover our collection of premium items</p>
      </div>

      {/* Filters Section */}
      <div className="my-12 rounded-lg bg-white ">
        <ProductFilters onFilterChange={setFilters} />
      </div>

      {/* Product Grid */}
      <div>
        {isLoading ? (
          <>
            <Loading />
            <p className='text-center text-gray-600 mt-2'>Loading products...</p>
          </>
        ) : products.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-600">Try adjusting your filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}