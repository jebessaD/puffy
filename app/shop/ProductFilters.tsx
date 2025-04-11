"use client";

import { useState } from "react";
import type { ProductFilters } from "@/app/lib/types";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ProductFiltersProps {
  onFilterChange: (filters: ProductFilters) => void;
}

export default function ProductFilters({
  onFilterChange,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: "createdAt",
    order: "desc",
    search: "",
  });

  const handleChange = (name: string, value: string | number | undefined) => {
    const newFilters = {
      ...filters,
      [name]: value || undefined,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="rounded-md w-full p-4 flex justify-between ">
      <div className=" w-full justify-between items-center gap-4 ">
        <div className="mx-auto md:w-2/3 md:space-x-3 relative flex gap-2 md:flex-row flex-col justify-center items-center">
          {" "}
          {/* Increased gap and width */}
          <div className="relative flex items-center flex-grow w-full">
            <span className="absolute left-4 text-gray-400">
              <Search size={24} /> {/* Increased icon size */}
            </span>
            <Input
              type="search"
              placeholder="Search..."
              value={filters.search || ""}
              onChange={(e) => handleChange("search", e.target.value)}
              className="pl-12 h-12 w-full text-lg" /* Increased height, padding, and text size */
            />
          </div>
          <div className="flex bg items-center gap-2 w-full md:w-auto ">
            <label className="text-sm font-medium text-gray-700 text-nowrap">
              Sort By
            </label>
            <Select
              value={`${filters.sortBy}-${filters.order}`}
              onValueChange={(value) => {
                const [sortBy, order] = value.split("-");

                const newFilters: ProductFilters = {
                  ...filters,
                  sortBy: sortBy as "price" | "rating" | "createdAt",
                  order: order as "asc" | "desc",
                };

                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
            >
              <SelectTrigger className="h-12 w-full md:max-w-[220px]">
                {" "}
                {/* Increased height and width */}
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt-desc">Newer to Older</SelectItem>
                <SelectItem value="createdAt-asc">Older to Newer</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
        </div>

        {/* Category Filter */}
        {/* <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-700">Category</label>
          <Select
            value={filters.category}
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger className="h-8 w-[140px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        {/* Price Range Filter */}
        {/* <div className="flex items-center col-span-2 gap-2">
          <label className="text-xs font-medium text-gray-700">Price</label>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                handleChange('minPrice', e.target.value ? (value < 0 ? 0 : value) : undefined);
              }}
              className="h-8 sm:w-20 w-full"
              min={0}
            />
            <span className="text-xs text-gray-500">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                handleChange('maxPrice', e.target.value ? (value < 0 ? 0 : value) : undefined);
              }}
              className="h-8 sm:w-20 w-full"
              min={0}
            />
          </div>
        </div> */}

        {/* Order Filter */}
      </div>
    </div>
  );
}
