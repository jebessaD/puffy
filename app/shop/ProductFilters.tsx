'use client';

import { useState } from 'react';
import type { ProductFilters } from '@/app/lib/types';
import { SlidersHorizontal } from 'lucide-react';
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

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: 'createdAt',
    order: 'desc',
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
    <div className="rounded-md p-2 py-4 w-full bg-white border-b border-slate-100 border">
      <div className="grid grid-cols-2 md:flex md:flex-row flex-col items-center md:justify-end gap-4">
        <div className="col-span-2 flex  items-center gap-2 mr-auto">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">Filters</h3>
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
        <div className="flex items-center col-span-2 gap-2">
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
        </div>

        {/* Sort By Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-700">Sort</label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleChange('sortBy', value)}
          >
            <SelectTrigger className="h-8 w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Time</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Order Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-700">Order</label>
          <Select
            value={filters.order}
            onValueChange={(value) => handleChange('order', value)}
          >
            <SelectTrigger className="h-8 w-[140px]">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
} 