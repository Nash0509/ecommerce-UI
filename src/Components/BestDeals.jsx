import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { FaRupeeSign, FaFire, FaChartLine } from "react-icons/fa";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Skeleton Loader component
const ProductSkeleton = () => (
  <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-5 mb-6 cursor-pointer transition relative animate-pulse">
    <div className="flex-shrink-0">
      <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-300 rounded-lg"></div>
    </div>
    <div className="flex flex-col flex-grow md:ml-8 mt-4 md:mt-0">
      <div className="h-6 w-48 bg-gray-300 mb-2"></div>
      <div className="h-6 w-32 bg-gray-300"></div>
      <div className="mt-4">
        <div className="h-8 w-40 bg-gray-300"></div>
      </div>
    </div>
    <div className="absolute top-2 right-2 flex items-center gap-2 text-gray-700">
      <div className="w-12 h-6 bg-gray-300"></div>
    </div>
  </div>
);

const BestDeals = () => {
  const [trendData, setTrendData] = useState([]); // Store all fetched data
  const [displayData, setDisplayData] = useState([]); // Store only the data to be displayed
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Check if more data can be shown
  const [itemsToShow, setItemsToShow] = useState(10); // Track how many items to display
  const navigate = useNavigate();

  // Fetch all data initially
  useEffect(() => {
    setLoading(true);
    fetch("/api/v1/trends/getTrends")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setTrendData(res.result);
          setDisplayData(res.result.slice(0, 10));
        }
      })
      .catch(() => {
        toast.error("An error occurred while fetching the trend data...");
      })
      .finally(() => setLoading(false));
  }, []);

  // Lazy loading logic when user scrolls
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // If there are more items to show, load the next 10
      if (trendData.length > itemsToShow) {
        setItemsToShow((prev) => prev + 10);
        setDisplayData((prevData) => [
          ...prevData,
          ...trendData.slice(prevData.length, prevData.length + 10),
        ]);
      } else {
        setHasMore(false);
      }
    }
  }, [trendData, itemsToShow]);

  // Attach scroll event listener
  useEffect(() => {
    if (!loading) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [loading, handleScroll]);

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
        {/* Skeleton Loader while data is loading */}
        {trendData.length === 0 && loading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : (
          displayData.map((pdt, index) => (
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
                <p className="text-xl font-semibold text-gray-800">
                  {pdt.name}
                </p>
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
          ))
        )}

        {/* Loader at the bottom when more data is loading */}
        {loading && hasMore && (
          <div className="flex justify-center items-center mt-4">
            <HashLoader color="#3498db" size={50} />
          </div>
        )}
        {hasMore === false && !loading && (
          <div className="flex justify-center items-center mt-4 text-gray-500">
            No more products to load.
          </div>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
