"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store/useCartStore';

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Clear cart on success
    clearCart();

    // Optional: You might want to verify the payment with your backend here
  }, [clearCart]);

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-6">Thank you for your purchase.</p>
      <button 
        onClick={() => router.push('/')}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
}