import Head from "next/head";

export default function CancelPage() {
  return (
    <>
      <Head>
        <title>Payment Cancelled</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
        <p className="mt-4 text-gray-700">
          Your payment was unsuccessful. Please try again or contact support if
          you need further assistance.
        </p>
      </div>
    </>
  );
}
