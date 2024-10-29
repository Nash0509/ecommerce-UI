import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [residence, setResidence] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const log = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        phone: phone,
        DOB: DOB,
        residence: residence,
      }),
    });

    if (log.status === 404) {
      toast.warning("No account with this email exists, please register...");
      navigate("/contact");
    } else {
      toast.error("There was an error while logging in, please try again...");
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
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="DOB"
        >
          DOB
        </label>
        <input
          type="text"
          placeholder="DOB"
          required
          className="w-full p-3 text-gray-900 rounded-lg bg-gray-200 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 mb-4"
          onChange={(e) => setDOB(e.target.value)}
        />
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="Phone No"
        >
          Phone No
        </label>
        <input
          type="number"
          placeholder="Phone No"
          required
          className="w-full p-3 text-gray-900 rounded-lg bg-gray-200 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 mb-4"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="Residence"
        >
          Residence
        </label>
        <input
          type="text"
          placeholder="Residence"
          required
          className="w-full p-3 text-gray-900 rounded-lg bg-gray-200 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 mb-4"
          onChange={(e) => setResidence(e.target.value)}
        />

        <div className="text-center">
          <button
            className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-150"
            onClick={(e) => handleRegister(e)}
          >
            Submit
          </button>
        </div>
        <div className="text-center mt-4 flex justify-between">
          <a
            href="/forgotPassword"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot your password?
          </a>
          <a href="/login" className="text-sm text-blue-600 hover:underline">
            LogIn
          </a>
        </div>
      </form>
    </div>
  );
};

export default Contact;
