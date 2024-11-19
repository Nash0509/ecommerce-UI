import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddPdt = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    dis: "",
    rating: "",
    price: "",
    image: "",
    type: "",
  });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/categories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success("Got the category");
          setTypes(res.cate);
        } else {
          toast.error("Failed to get category");
        }
      })
      .catch((err) => toast.error("Failed to get category"));
  }, []);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/addPdt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success("Product added successfully!");
          setProductData({
            name: "",
            dis: "",
            rating: "",
            price: "",
            image: "",
            type: "",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error("Error adding product. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <Card className="w-full max-w-lg shadow-xl rounded-lg">
        <CardContent>
          <Typography
            variant="h5"
            className="text-center font-bold text-gray-800 mb-6"
          >
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Product Name */}
            <TextField
              label="Product Name"
              name="name"
              variant="outlined"
              fullWidth
              value={productData.name}
              onChange={handleChange}
              required
              InputLabelProps={{
                style: { fontSize: "1rem", color: "#616161" },
              }}
            />

            {/* Description */}
            <TextField
              label="Description"
              name="dis"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={productData.dis}
              onChange={handleChange}
              required
              InputLabelProps={{
                style: { fontSize: "1rem", color: "#616161" },
              }}
            />

            {/* Price */}
            <TextField
              label="Price"
              name="price"
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{ min: "0", step: "0.01" }}
              value={productData.price}
              onChange={handleChange}
              required
              InputLabelProps={{
                style: { fontSize: "1rem", color: "#616161" },
              }}
            />

            {/* Image URL */}
            <TextField
              label="Image URL"
              name="image"
              variant="outlined"
              fullWidth
              value={productData.image}
              onChange={handleChange}
              required
              InputLabelProps={{
                style: { fontSize: "1rem", color: "#616161" },
              }}
            />

            {/* Type */}
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={productData.type}
                onChange={handleChange}
                label="Type"
              >
                {types.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-3"
              style={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPdt;
