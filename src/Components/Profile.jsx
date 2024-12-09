import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { makeItZero } from "./PizzaSlice";
import GhostLoader from "./GhostLoader";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profiledata, setProfileData] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      fetch(`/api/v1/auth/profile/${localStorage.getItem("uid")}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setProfileData(res.result[0]);
            const profile = res.result[0];
            setUser({
              name: profile.userName,
              email: profile.email,
              address: profile.residence,
              phone: profile.phone,
              DOB: profile.DOB,
              profilePic: "https://via.placeholder.com/150",
              orderHistory: profile.cart,
            });
            setLoading(false);
          } else {
            toast.error("An error occured while fetching the profle data...");
          }
        });
    } catch (err) {
      toast.error(
        "An error occured while fetching the profile data, please try again..."
      );
    }
  }, []);

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
        localStorage.removeItem("uid");
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        dispatch(makeItZero());
        navigate("/login");
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
              <strong>Name:</strong>{" "}
              <>{loading ? <GhostLoader /> : user?.name || '-'}</>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <>{loading ? <GhostLoader /> : user?.email || '-'}</>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <>{loading ? <GhostLoader /> : user?.phone || '-'}</>
            </p>
            <p>
              <strong>Address:</strong>{" "}
              <>{loading ? <GhostLoader /> : user?.address || '-'}</>
            </p>
            <p>
              <strong>DOB:</strong>{" "}
              <>{loading ? <GhostLoader /> : user?.DOB.slice(0, 10)}</>
            </p>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
                onClick={() =>
                  navigate(`/editProfile/${localStorage.getItem("uid")}`, {
                    state: { data: user },
                  })
                }
              >
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
          {profiledata?.cart?.length > 0 ? (
            <table className="w-full table-auto bg-gray-50 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.orderHistory?.map((order, index) => (
                  <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">#{order?.id ? order.id.slice(-10) : '-'}</td>
                    <td className="px-4 py-2">{order?.date ? order.date.slice(0, 10) : '-'}</td>
                    <td className="px-4 py-2">{order?.price || '-'}</td>
                    <td className="px-4 py-2">{order?.status || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center border-2 h-[10vh] bg-[#F4EFC6] rounded">
              <h3>No order history 😒</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
