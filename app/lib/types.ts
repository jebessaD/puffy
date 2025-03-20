export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  stockQuantity: number;
  category: string;
  color: string[];
  size: string[];
  mainImage: string;
  additionalImages: string[];
  averageRating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
  reviews?: Review[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  productId: number;
  createdAt: Date;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  sortBy?: 'price' | 'rating' | 'createdAt';
  order?: 'asc' | 'desc';
} 