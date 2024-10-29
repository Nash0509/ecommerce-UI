import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState();
  const [token, setToken] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (!sessionStorage.getItem("token")) {
      try {
        const log = await fetch("https://ecommerce-l97b.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: pass,
          }),
        });

        if (log.ok) {
          const res = await log.json();
          localStorage.setItem('token', res.token);
          console.log(res);
          setToken(res.token);
          sessionStorage.setItem("token", res.token);
          console.log(token);
          toast.success("Logged in successfully!");
          window.location.assign("/cart/1");
        } else if (log.status === 422) {
          const data = await log.json();
          console.log(data.message);
          toast.warning("Wrong email/password...");
        } else {
          toast.error("Wrong email/password!");
        }
      } catch (err) {
        toast.error("An error occured while logging in : " + err.message);
      }
    } else {
      toast.warning(
        "You are already logged in / Your token expired, in that case logout..."
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Log In
        </h1>

        {/* Email Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full p-3 text-gray-900 rounded-lg bg-gray-100 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            className="w-full p-3 text-gray-900 rounded-lg bg-gray-100 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-150"
            onClick={(e) => handleLogin(e)}
          >
            Submit
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot your password?
          </a>
          <a
            href="/contact"
            className="text-sm text-blue-600 hover:underline"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
