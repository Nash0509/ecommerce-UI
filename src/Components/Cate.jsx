import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { HashLoader } from "react-spinners";
import { FaRupeeSign } from "react-icons/fa";

const Cate = () => {
  const [res, setRes] = useState([]);
  const [load, setLoad] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoad(true);
    const timeoutId = setTimeout(() => {
      if (
        id == "Electronics" ||
        id == "Luxury" ||
        id == "Sports" ||
        id == "Clothing"
      ) {
        fetch(`/api/v1/product/${id.toLowerCase()}`)
          .then((response) => response.json())
          .then((data) => {
            setRes(data);
            setLoad(false);
          })
          .catch(() => setLoad(false));
      } else {
        fetch(`/api/v1/category/${id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setRes(data.result);
            }
            setLoad(false);
          })
          .catch(() => setLoad(false));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [id]);

  if (load) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <HashLoader size={100} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {res.length === 0 ? (
        <div className="h-[90vh] flex justify-center items-center text-2xl font-bold text-gray-600">
          Currently no items to show in {id}...
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Category Title */}
          <h1 className="text-center text-3xl font-bold bg-black text-white py-3 rounded shadow-lg mb-8">
            {id}
          </h1>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {res.map((pdt, index) => (
              <div
                key={index}
                className="bg-white rounded shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-center"
                onClick={() => navigate(`/product/${pdt._id}`)}
              >
                {/* Product Image */}
                <img
                  src={pdt.image}
                  alt={`${id}-product`}
                  className="w-48 h-48 object-cover mb-4"
                />

                {/* Product Details */}
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    {pdt.name}
                  </p>
                  <p className="text-lg text-gray-600 flex items-center justify-center mt-2">
                    Price:&nbsp;
                    <FaRupeeSign />
                    &nbsp;{pdt.Price}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4 flex items-center"
                >
                  Add to Cart&nbsp;
                  <ShoppingCartIcon />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cate;
