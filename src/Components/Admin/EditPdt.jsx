import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditPdt = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    dis: "",
    Price: 0,
    image: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/product/${id}`);
        const data = await response.json();
        setProduct({
          name: data.name || "",
          dis: data.dis || "",
          Price: data.Price || 0,
          image: data.image || ""
        });
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch product data.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "Price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/patchPdt/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({product}),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Product updated successfully!");
        navigate(-1);
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="dis"
            value={product.dis}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            name="Price"
            value={product.Price}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="py-2 px-6 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPdt;
