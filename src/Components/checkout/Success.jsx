import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "./success-animation.json";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { makeItZero } from "../PizzaSlice";

const Success = () => {
  const [cartItems, setCartItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedItems);
    localStorage.removeItem("cart");

    fetch(`api/v1/cart/${localStorage.getItem("uid")}`)
      .then((res) => res.json())
      .then((res) => {
        setCartItems(res);
        if (localStorage.getItem("uid")) {
          fetch(
            `/api/v1/checkout/updateUserPurchaseStatus/${localStorage.getItem(
              "uid"
            )}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(res),
            }
          )
            .then((resp) => resp.json())
            .then((resp) => {
              if (resp.success) {
                async function handleDelete(id) {
                    try {
                      await fetch(`api/v1/deleteItem/${id}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                      })
                        .then((respo) => respo.json())
                        .then((respo) => {
                          dispatch(makeItZero());
                        });
                    } catch (err) {
                      toast.error("Its not you its us 😣, please try again...");
                    }
                  }
                  res.forEach((res) => {
                    handleDelete(res._id);
                  })
              }
            })
            .catch((err) =>
              toast.error("Error while updating the user profile cart...")
            );
        }
      })
      .catch(() => console.log("Error in fetching cart items!"));
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-50 text-gray-800">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <div className="flex justify-center">
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ width: 200, height: 200 }}
          />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mt-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your items will be delivered soon.
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Order Summary:
          </h2>
          <ul className="space-y-2">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-2 rounded shadow-sm flex justify-between items-center"
                >
                  <span>{item.name}</span>
                  <span>₹{item.Price}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Your cart was empty!</p>
            )}
          </ul>
        </div>

        <div className="mt-6">
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
