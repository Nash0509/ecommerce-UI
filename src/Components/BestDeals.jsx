import React from "react";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { FaRupeeSign, FaFire, FaChartLine } from "react-icons/fa";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const BestDeals = () => {
  const [trandData, setTrendData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("http://localhost:8000/getTrends")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setTrendData(res.result);
          console.log(res.result);
        }
      })
      .catch((err) => {
        toast.error("An error occuered while fetching the trend data...");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <div className="text-center mt-8">
        <h1 className="flex justify-center items-center text-3xl font-bold text-gray-800">
          Trending <FaFire className="ml-2 text-red-500" />
        </h1>
      </div>

      {/* Items Container */}
      <div className="relative w-full max-w-5xl mt-8 px-4">
        {trandData.map((pdt, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg hover:bg-gray-100 p-5 mb-6 cursor-pointer transition relative"
            onClick={() => navigate(`/product/${pdt._id}`)}
          >
            {/* Product Image */}
            <div className="flex-shrink-0">
              <img
                src={pdt.image}
                alt="Product"
                className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-lg"
              />
            </div>

            {/* Product Description */}
            <div className="flex flex-col flex-grow md:ml-8 mt-4 md:mt-0">
              <p className="text-xl font-semibold text-gray-800">{pdt.name}</p>
              <p className="text-lg flex items-center text-gray-600 mt-2">
                Price:&nbsp;
                <FaRupeeSign className="text-green-500" />
                &nbsp; {pdt.Price}
              </p>
              <div className="mt-4">
                <Button variant="contained" color="primary">
                  Add to Cart&nbsp;
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>

            {/* Watch Count */}
            <div className="absolute top-2 right-2 flex items-center gap-2 text-gray-700">
              <FaChartLine className="text-blue-500" /> {pdt.watchCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestDeals;
