'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/lib/types';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, removeItem, items } = useCart();
  const { toast } = useToast();

  // Check if product is in cart
  const isInCart = items.some(item => item.product.id === product.id);

  // Default image URL if mainImage is not provided or invalid
  const imageUrl = product.mainImage
    ? product.mainImage.startsWith('http')
      ? product.mainImage
      : `/${product.mainImage}`
    : 'https://picsum.photos/seed/product/400/400';

  // Calculate discounted price if discount exists
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleCartClick = () => {
    if (product.stockQuantity > 0) {
      if (isInCart) {
        removeItem(product.id);
        toast({
          title: "Removed from cart",
          description: "Product removed from cart.",
          variant: "default",
        });
      } else {
        addItem(product);
        toast({
          title: "Added to cart",
          description: "Product added to cart.",
          variant: "default",
        });
      }
    } else {
      toast({
        title: "Error!",
        description: "Product is out of stock.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="group relative overflow-hidden rounded border border-gray-100 bg-white transition-all lg:hover:border-gray-200">
      {/* Image Container */}
      <div className="relative bg-white aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 lg:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

      </div>

      {/* Content Container with Background - Move transform to this div */}
      <div className="relative flex flex-col bg-white transform transition-transform duration-300 lg:group-hover:-translate-y-[42px]">

        {/* Product Info - Remove transform from here */}
        <div className="p-4 relative h-48 border-t border-slate-50 lg:h-full lg:pb-8 lg:pt-4">
          {/* Main Content */}
          <div className="space-y-2">
            <div className=" flex justify-between">
              <h3 className="text-lg  text-gray-900">
                {product.name}
              </h3>
              {/* Stock Status */}
              {/* <div>
                {product.stockQuantity > 0 ? (
                  <span className="text-sm text-green-600">In Stock ({product.stockQuantity})</span>
                ) : (
                  <span className="text-sm text-red-600">Out of Stock</span>
                )}
              </div> */}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col mb-2 gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {discountedPrice.toFixed(2) ? `${discountedPrice.toFixed(2)}` : ""}
                </span>
                {product.discount ? (
                  <div className='flex text-xs items-center gap-2'>
                    <span className="text-gray-500 line-through">
                      ${product?.price?.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-red-100 px-2 py-px text-xs font-medium text-red-600">
                      -{product.discount}%
                    </span>
                  </div>
                ) : <div className='h-4'></div>}
              </div>

              {/* Rating */}
              {product.averageRating > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600">
                    {product.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.numReviews})
                  </span>
                </div>
              )}
            </div>



            {/* Category */}
            {/* <div>
              <span className="text-sm text-gray-500">{product.category}</span>
            </div> */}
          </div>

          {/* Add to Cart Button - Positioned absolutely */}
          <button
            onClick={handleCartClick}
            disabled={product.stockQuantity === 0}
            className={`
    absolute left-4 right-4 px-4 py-2 rounded-sm mb-4 mt-auto font-medium
    transform transition-all duration-300
    ${isInCart
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-black text-white hover:bg-gray-800'
              }
    opacity-100 lg:opacity-0 lg:group-hover:opacity-100
    translate-y-4 lg:translate-y-2 lg:group-hover:translate-y-4
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
  `}
          >
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </div>
          </button>

        </div>
      </div>
    </div>
  );
} 