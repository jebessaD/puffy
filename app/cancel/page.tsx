import Head from "next/head";

export default function CancelPage() {
  return (
    <>
      <Head>
        <title>Payment Cancelled</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <h1>Payment Cancelled</h1>
        <p>
          Your payment was unsuccessful. Please try again or contact support if
          you need further assistance.
        </p>
      </div>
    </>
  );
}
