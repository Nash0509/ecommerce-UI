import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Springfield, USA",
    phone: "+1 234 567 890",
    profilePic: "https://via.placeholder.com/150",
    orderHistory: [
      { id: 1, date: "2024-09-30", total: "$250", status: "Delivered" },
      { id: 2, date: "2024-09-15", total: "$120", status: "Shipped" },
      { id: 3, date: "2024-08-28", total: "$450", status: "Cancelled" },
    ],
  });

  function handleDeleteHis(index1) {
    alert("Yo this works...");

    const filteredArray = user.orderHistory.filter(
      (order, index) => index !== index1
    );

    setUser((prevUser) => ({
      ...prevUser,
      orderHistory: filteredArray,
    }));
  }

  function handleLogOut() {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mx-2",
        cancelButton:
          "bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200 mx-2",
        popup: "flex flex-col items-center",
        actions: "flex justify-center w-full",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token");
        window.location.assign('/login')
        Swal.fire("Logged out successfully!", "", "success");
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 mx-[3rem]">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Profile Picture */}
          <div className="text-center">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
            />
            <a
              href="#"
              className="underline decoration-1 text-blue-800 hover:text-blue-500"
            >
              Change Photo
            </a>
          </div>

          {/* Personal Info */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200">
                Edit Profile
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded shadow ml-4 hover:bg-red-600 transition duration-200"
                onClick={() => handleLogOut()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          <table className="w-full table-auto bg-gray-50 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {user.orderHistory.map((order, index) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">{order.total}</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2 text-center">
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="md"
                      className="hover:cursor-pointer hover:text-gray-600"
                      onClick={() => handleDeleteHis(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
