import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/app/lib/types";
import { ShippingAddress } from "../lib/schema";

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
  checkoutProducts: CheckoutProduct[];
  shippingAddress?: ShippingAddress;
  
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
  clearShippingAddress: () => void;

  totalItems: () => number;
  totalPrice: () => number;

  setCheckoutProducts: (products: CheckoutProduct[]) => void;
  setShippingAddress: (address: ShippingAddress) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      checkoutProducts: [],
      shippingAddress: undefined,

      addItem: (product, quantity = 1, size, color) => {
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

      removeItem: (productId, size, color) => {
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

      updateQuantity: (productId, quantity, size, color) => {
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

      setCheckoutProducts: (products) => {
        set(() => ({
          checkoutProducts: products, 
        }));
      },
      

      clearCart: () => set({ items: [], checkoutProducts: [] }),
      setShippingAddress: (address) => set({ shippingAddress: address }),
      clearShippingAddress: () => set({ shippingAddress: undefined }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

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
      storage: createJSONStorage(() => localStorage),
    }
  )
);
