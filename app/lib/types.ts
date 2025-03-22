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
  sortBy?: "price" | "rating" | "createdAt";
  order?: "asc" | "desc";
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  asset_id: string;
  format: string;
  resource_type: string;
}

export interface SignatureResponse {
  timestamp: number;
  signature: string;
  api_key: string;
  cloud_name: string;
}
