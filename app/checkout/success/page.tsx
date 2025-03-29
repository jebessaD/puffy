import stripe from '@/lib/stripe';
import Link from 'next/link';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-4">
        {/* <XCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" /> */}
        <h1 className="text-2xl font-bold mb-2">Invalid Session</h1>
        <p className="text-gray-600 mb-6">
          No checkout session ID provided. Please check your order confirmation.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const customerEmail = session.customer_details?.email;

  return (
    <div className="max-w-md mx-auto text-center py-12 px-4">
      {/* <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" /> */}
      <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. A confirmation has been sent to{' '}
        <span className="font-semibold">{customerEmail}</span>.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}