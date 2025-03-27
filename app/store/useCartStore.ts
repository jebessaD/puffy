import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/app/lib/types";

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CheckoutProduct extends Product {
  quantity: number;
  selectedColor: string | null;
  selectedSize: string | null;
}

interface CartState {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    size?: string,
    color?: string
  ) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    size?: string,
    color?: string
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  setCheckoutProduct: (product: CheckoutProduct) => void;
  checkoutProduct?: CheckoutProduct;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (
        product: Product,
        quantity = 1,
        size?: string,
        color?: string
      ) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.size === size &&
              item.color === color
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.size === size &&
                item.color === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity, size, color }],
          };
        });
      },

      removeItem: (productId: number, size?: string, color?: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.size === size &&
                item.color === color
              )
          ),
        }));
      },

      updateQuantity: (
        productId: number,
        quantity: number,
        size?: string,
        color?: string
      ) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.size === size &&
            item.color === color
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      setCheckoutProduct: (product) => set({ checkoutProduct: product }),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => {
          const price = item.product.discount
            ? item.product.price * (1 - item.product.discount / 100)
            : item.product.price;
          return sum + price * item.quantity;
        }, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage), // ✅ FIXED: Correct storage format!
    }
  )
);
