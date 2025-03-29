export default function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="mb-6">Thank you for your purchase.</p>

      {/* Show session ID for debugging (optional) */}
      {searchParams.session_id && <p>Session ID: {searchParams.session_id}</p>}
    </div>
  );
}
