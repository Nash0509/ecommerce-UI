import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./PizzaSlice";
import { toast } from "react-toastify";
import Slider from "react-slick";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaCheck, FaRupeeSign, FaTrash, FaEdit } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "#1f2937",
  border: "2px solid #374151",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
};

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(3);
  const [reviewInput, setReviewInput] = useState("");
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productRes = await fetch(`http://localhost:8000/product/${id}`);
        const productData = await productRes.json();
        setProduct(productData);

        const reviewRes = await fetch(
          `https://ecommerce-l97b.onrender.com/reviews/${id}`
        );
        const reviewData = await reviewRes.json();
        const averageRating =
          reviewData.reduce((acc, review) => acc + review.rating, 0) /
          reviewData.length;

        setReviews(reviewData.map((review) => review.review));
        setRating(averageRating || 3);
        setTotalRatings(reviewData.length);

        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch product data.");
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      toast.info("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/pdt/${id}/${product.Price}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: product.Price,
            uid: localStorage.getItem("uid"),
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        dispatch(addToCart({ price: product.Price }));
        toast.success("Item added to cart!");
      }
    } catch (error) {
      toast.error("Failed to add item to cart.");
    }
    setModalOpen(false);
  };

  const handleReviewSubmit = async () => {
    try {
      await fetch(`https://ecommerce-l97b.onrender.com/review/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: reviewInput, rating }),
      });
      toast.success("Thank you for your feedback!");
    } catch {
      toast.error("Failed to submit your review.");
    }
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/deletePdt/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success("Deleted successfully");
          navigate("/");
        }
      })
      .catch(() => {
        toast.error("Error while deleting");
      });

    setDeleteModalOpen(false);
  };

  const handleEdit = () => {
    navigate(`/edit-product/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <HashLoader size={100} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto relative">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-[40%] rounded-lg shadow-md"
        />
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.dis}</p>
          <div className="flex items-center text-2xl font-semibold text-blue-600">
            <FaRupeeSign />
            <span>{product.Price}</span>
          </div>
          <div>
            <Rating value={rating} readOnly />
            <p className="text-sm text-gray-500">{totalRatings} ratings</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-3 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add to Cart <AiOutlineShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Customer Reviews
        </h2>
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={2}
          slidesToScroll={1}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg shadow-md text-gray-700 text-center"
            >
              <p>{review}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* Review Form */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Leave Your Feedback
        </h2>
        <div className="flex flex-col gap-4 items-center">
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
          <textarea
            className="w-full md:w-1/2 p-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            rows="4"
            placeholder="Write your review..."
            onChange={(e) => setReviewInput(e.target.value)}
          ></textarea>
          <button
            onClick={handleReviewSubmit}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" className="text-white text-center">
            Confirm Add to Cart
          </Typography>
          <div className="flex justify-around mt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Admin Icons */}
      {isAdmin && (
        <div className="flex flex-col gap-4 absolute top-6 right-8">
          <FaTrash
            className="text-red-600 cursor-pointer"
            size={24}
            onClick={() => setDeleteModalOpen(true)}
          />
          <FaEdit
            className="text-blue-600 cursor-pointer"
            size={24}
            onClick={handleEdit}
          />
        </div>
      )}

      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" className="text-white text-center">
            Are you sure you want to delete this product?
          </Typography>
          <div className="flex justify-around mt-6">
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Product;
