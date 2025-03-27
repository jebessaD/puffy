import React from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal, FaApple, FaGoogle } from "react-icons/fa";

const paymentMethods = [
  { name: "Visa", icon: <FaCcVisa className="text-blue-600" /> },
  { name: "Mastercard", icon: <FaCcMastercard className="text-red-600" /> },
  { name: "American Express", icon: <FaCcAmex className="text-blue-500" /> },
  { name: "Discover", icon: <FaCcDiscover className="text-orange-500" /> },
  { name: "PayPal", icon: <FaCcPaypal className="text-blue-700" /> },
  { name: "Apple Pay", icon: <FaApple className="text-black" /> },
  { name: "Google Pay", icon: <FaGoogle className="text-gray-700" /> },
];

const PaymentMethods: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto text-center mt-8">
      <h3 className="text-lg font-semibold mb-4">We Accept</h3>

      <div className="flex justify-center items-center gap-6 flex-wrap  p-4 rounded-lg shadow-sm">
        {paymentMethods.map((method) => (
          <div key={method.name} className="flex flex-col items-center text-sm">
            <div className="text-3xl">{method.icon}</div>
            {/* <span className="mt-1 text-xs text-gray-700">{method.name}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
