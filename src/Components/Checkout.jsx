import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiSecurePaymentLine } from "react-icons/ri";
import { HashLoader } from "react-spinners";
import { total } from "./PizzaSlice";

const Checkout = () => {
  const [load, setLoad] = useState(true);
  const [redirectWait, setRedirectWait] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("total", total);
  }, [total]);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetch("/api/v1/checkout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or expired token");
        return res.json();
      })
      .then((res) => {
        console.log(res.message);
      })
      .catch(() => {
        handleSessionExpiration();
      });
  }, []);

  const handleSessionExpiration = () => {
    navigate("/login");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("uid");
    toast.warning("Your token has expired. Please sign in again.");
  };

  const handleCheckout = async () => {
    try {
      // Fetch cart items
      setRedirectWait(true);
      const cartResponse = await fetch(
        `/api/v1/cart/${localStorage.getItem("uid")}`
      );

      if (!cartResponse.ok) {
        throw new Error("Failed to fetch cart items.");
      }

      const cartItems = await cartResponse.json();
      // Proceed to create the checkout session
      const checkoutResponse = await fetch(
        "/api/v1/checkout/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItems), // Send populated cartItems
        }
      );

      const checkoutData = await checkoutResponse.json();

      if (checkoutResponse.ok && checkoutData.url) {
        // Redirect to the Stripe checkout session
        setRedirectWait(false);
        window.location.href = checkoutData.url;
      } else {
        toast.error("Failed to initiate checkout session.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while processing your request."
      );
    }
  };

  if (load) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <HashLoader size={100} color="#4A90E2" />
        <p className="mt-4 text-gray-600 text-lg font-medium">
          Preparing your checkout...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Checkout
        </h1>
        <p className="bg-blue-500 text-white font-medium rounded-md py-3 px-4 text-center mb-4 shadow">
          Total Payment:{" "}
          <span className="font-semibold">
            Rs. {localStorage.getItem("cartTotal")}
          </span>
        </p>
        <div className="flex justify-center">
          <button
            className="flex items-center justify-center rounded-lg bg-black text-white px-6 py-3 hover:bg-gray-800 transition duration-200 shadow-lg"
            onClick={handleCheckout}
            aria-label="Proceed to payment"
            disabled={redirectWait} // Disable button during loading
          >
            {redirectWait ? (
              <div className="flex items-center">
                <span className="loader w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span className="text-lg font-semibold">Processing...</span>
              </div>
            ) : (
              <>
                <RiSecurePaymentLine size={50} className="mr-2" />
                <span className="text-lg font-semibold">Pay Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
