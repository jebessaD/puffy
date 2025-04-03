"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSendEmail } from "@/app/hooks/useOrder";
import Loading from "@/app/components/ui/loading";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false); // Prevent multiple sends

  // Destructure from the hook
  const { sendEmail, isLoading, successMessage, errorMessage } = useSendEmail();

  useEffect(() => {
    async function fetchSession() {
      if (!sessionId) {
        setError("No checkout session ID provided.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        const data = await res.json();

        if (res.ok) {
          setCustomerEmail(data.customer_details?.email || "No email found");

          // Check if email was already sent
          if (!emailSent) {
            const emailHTML = generateEmailHTML(data);
            const emailDetails = {
              email: data.customer_details?.email || "No email found",
              subject: "Order Confirmation - Puffy Roll",
              html: emailHTML,
            };

            await sendEmail(emailDetails);
            setEmailSent(true); // Mark email as sent
          }
        } else {
          setError(data.error || "Failed to fetch session");
        }
      } catch (err) {
        setError("Failed to load session details");
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [sessionId]);

  // Email HTML Template function
  interface CustomerDetails {
    name?: string;
    email?: string;
  }

  interface SessionData {
    id?: string;
    customer_details?: CustomerDetails;
    amount_total?: number;
    product_data?: {
      name: string;
      image: string;
    };
  }

  const generateEmailHTML = (data: SessionData): string => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Hey ${data.customer_details?.name || "Customer"}, your order is confirmed! 🎉</h2>
        
        <p style="font-size: 16px; color: #333;">Thank you for your purchase at <strong>Puffy Roll</strong>. Below are your order details:</p>
        
        <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
          <h3 style="color: #333;">📦 Order Details</h3>
          <p><strong>Product Name:</strong> ${data.product_data?.name || "No product name"}</p>
          <div style="text-align: center; margin: 10px 0;">
            <img src="${data.product_data?.image || "#"}" alt="${data.product_data?.name || "Product Image"}" style="max-width: 100%; height: auto; border-radius: 8px;" />
          </div>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> $${(data.amount_total ? (data.amount_total / 100).toFixed(2) : "0.00")}</p>
        </div>

        <p style="font-size: 16px; text-align: center; color: #555; margin-top: 20px;">
          We appreciate your trust in Puffy Roll. If you have any questions, feel free to reach out.
        </p>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="https://puffyroll.com/orders/${data.id || "No order ID"}" 
            style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View Your Order
          </a>
        </div>

        <p style="font-size: 14px; text-align: center; color: #999; margin-top: 20px;">© 2025 Puffy Roll. All rights reserved.</p>
      </div>
    `;
  };

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (error)
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Invalid Session</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link
          href="/"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    );

  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold mb-2">🎉 Payment Successful!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase! A confirmation has been sent to{" "}
        <span className="font-semibold">{customerEmail}</span>.
      </p>
      {/* {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>} */}
      <Link
        href="/"
        className="bg-black text-white py-3 px-5 rounded hover:bg-gray-900 mt-3"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center py-12"><Loading /></p>}>
      <SuccessContent />
    </Suspense>
  );
}
