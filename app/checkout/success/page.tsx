"use client"; // This makes it a Client Component

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (error)
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Invalid Session</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link href="/" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
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
      <Link href="/" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Return to Home
      </Link>
    </div>
  );
}
