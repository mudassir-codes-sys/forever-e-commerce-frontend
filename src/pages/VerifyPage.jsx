import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

function VerifyPage() {
  const { setCartItems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying Payment....");
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(null);

  const sessionId = searchParams.get("session_id");
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/verify-session/${sessionId}`
        );
        console.log(`${backendUrl}/verify-session/${sessionId}`);

        console.log("response", response);

        if (response.data.success) {
          if (response.data.paymentStatus === "paid") {
            setStatus("Payment Successful!");
            setAmount(response.data.amount);
            setCartItems([]);
          } else if (response.data.paymentStatus === "failed") {
            setStatus("failed");
          } else {
            setStatus("Payment pending..");
          }
        } else {
          setStatus(response.data.message || "Unable to verify payment.");
        }
      } catch (error) {
        setStatus("Error verifying payment.");
      } finally {
        setLoading(false);
      }
    };
    if (sessionId) verifySession();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <ClockIcon className="h-12 w-12 text-yellow-500 animate-spin" />
            <p>{status}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {status === "Payment Successful!" ? (
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            ) : (
              <XCircleIcon className="h-12 w-12 text-red-500" />
            )}
            <h1 className="text-2xl font-bold">{status}</h1>
            {amount && (
              <p className="text-gray-600">Amount Paid: ${amount.toFixed(2)}</p>
            )}
            <a
              href="/"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Home
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyPage;
