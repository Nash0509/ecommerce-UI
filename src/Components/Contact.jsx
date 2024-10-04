import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const log = await fetch("https://ecommerce-l97b.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (log.status === 404) {
      async function abc() {
        if (!sessionStorage.getItem("token")) {
          try {
            console.log("Email : " + email);
            console.log("Pass : " + password);
            const response = await fetch(
              "https://ecommerce-l97b.onrender.com/register",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
              }
            );

            if (response.ok) {
              const data = await response.json();
              setToken(data.token);
              sessionStorage.setItem("token", data.token);
              console.log(data.token);
              localStorage.setItem("token", data.token);
              console.log("Registration successful:", data);
              toast.success("You have been registered successfully!");
              navigate("/cart/1");
            } else if (response.status === 422) {
              const data = await response.json();
              console.log(data.message);
              toast.warning("Wrong email/password...");
            } else if (response.status === 400) {
              console.log(response.message);
              toast.warning(
                "An account with this email is already registered..."
              );
            } else {
              console.log("Wrong email or the password ");
              toast.warning("Please enter a valid email...");
            }
          } catch (error) {
            console.error("Error during registration:", error);
            toast.error(
              "An error occurred during registration. Please try again."
            );
          }
        } else {
          toast.warning("You are already registered");
        }
      }
      abc();
    } else {
      console.log("Email already in use, consider logging in instead...");
      toast.warning("Email already in use ");
    }
  }

  return (
    <div
      className="bg-white h-[100vh] flex justify-center flex-col"
      style={{ alignItems: "center" }}
    >
      <form className="bg-[azure] p-[3.5rem] rounded shadow-2xl">
        <h1 className="text-[2rem] my-4 text-center text-black">Register</h1>
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 text-gray-900 rounded-lg bg-gray-200 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 text-gray-900 rounded-lg bg-gray-200 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-center">
          <button
            className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-150"
            onClick={(e) => handleRegister(e)}
          >
            Submit
          </button>
        </div>

        <h1
          className="text-sm text-center mt-6 underline text-blue-600 cursor-pointer hover:text-blue-800"
          onClick={() => {
            if (sessionStorage.getItem("token")) {
              sessionStorage.removeItem("token");
              toast.success("You have been logged out successfully!");
            } else {
              toast.warning("Log in or register first...");
            }
          }}
        >
          Logout
        </h1>
      </form>
    </div>
  );
};

export default Contact;
