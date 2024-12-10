import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [residence, setResidence] = useState("");
  const [token, setToken] = useState("");
  const [nextInvoked, setNextInvoked] = useState(false);
  const [showPasswordError, setshowPasswordError] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (DOB && residence && phone) {
      try {
        const log = await fetch("/api/v1/auth/register", {
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
            userName: name,
          }),
        });

        const data = await log.json();

        if (log.ok) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          sessionStorage.setItem("token", data.token);
          toast.success("Logged in successfully!");
          navigate("/");
        } else if (log.status === 422) {
          toast.warning(data.message);
        } else if (log.status === 409) {
          toast.error("This email already exists...");
        } else {
          toast.error("An error occured, please try again...");
        }
      } catch (error) {
        console.log(error);
        toast.error("Not able to register, please try again...");
      }
    } else {
      toast.warning("Please enter all the fields...");
    }
  }

  function handleNext(e) {
    e.preventDefault();
    setshowPasswordError(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (email && password) {
      if (emailPattern.test(email)) {
        if (passwordPattern.test(password)) {
          setNextInvoked(true);
          setshowPasswordError(false);
        } else {
          setshowPasswordError(true);
          toast.error("Please enter a valid password...");
          setshowPasswordError(true);
        }
      } else toast.error("Please enter a valid email");
    } else {
      toast.warning("Email and the password are required...");
    }
  }

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100"
      style={{ alignItems: "center" }}
    >
      <form className="bg-[azure] p-[3.5rem] rounded shadow-2xl">
        <h1 className="text-[2rem] my-4 text-center text-black">Register</h1>
        {nextInvoked == false && (
          <>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="userName"
            >
              Name
            </label>
            <input
              type="name"
              placeholder="Name"
              required
              id="name"
              value={name}
              className="w-full p-3 text-gray-900 rounded-lg bg-gray-200 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 mb-4"
              onChange={(e) => setname(e.target.value)}
            />
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
              id="email"
              value={email}
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
              value={password}
              id="password"
              className="w-full p-3 text-gray-900 rounded-lg bg-gray-200 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPasswordError && (
              <p className="text-red-700 break-word text-[0.8rem] mb-[1rem]">
                ** The password should have -
                <br />- Atleast 8 characters long
                <br />- Atleast 1 special character
                <br />- Atleast 1 number
                <br />- Atleast 1 capital letter
                <br />- Atleast 1 small letter
              </p>
            )}
          </>
        )}
        {nextInvoked && (
          <>
            {" "}
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="DOB"
            >
              DOB
            </label>
            <input
              type="date"
              placeholder="DOB"
              required
              className="w-full p-3 text-gray-900 rounded-lg bg-gray-200 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 mb-4"
              onChange={(e) => setDOB(e.target.value)}
            />
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="Phone No"
            >
              Phone No.
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
          </>
        )}

        <div className="text-center">
          {nextInvoked == false && (
            <button
              className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-150"
              onClick={(e) => handleNext(e)}
            >
              Next
            </button>
          )}
          {nextInvoked && (
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white p-1 rounded-md w-full hover:bg-blue-600 transition duration-150"
                onClick={(e) => setNextInvoked(false)}
              >
                Back
              </button>
              <button
                className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-150"
                onClick={(e) => handleRegister(e)}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="text-center mt-4 flex justify-between">
          <a
            href="/forgotPassword"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot your password?
          </a>
          <a
            onClick={() => navigate("/login")}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            LogIn
          </a>
        </div>
      </form>
    </div>
  );
};

export default Contact;
