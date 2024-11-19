import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() === "" || description.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
    // Handle form submission logic here
    console.log({ categoryName, description });
    fetch("http://localhost:8000/addType", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName, description }),
    })
    .then(res => res.json())
    .then(res => {
      if(res.success) {
        toast.success("Added category");
      }
    })
    .catch(err => toast.error("Error adding category"))
    setCategoryName("");
    setDescription("");
  };

  return (
    <Box className="min-h-[90vh] flex items-center justify-center bg-gray-100 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent>
          <Typography
            variant="h4"
            className="text-center font-semibold text-gray-800 pb-[1rem]"
          >
            Add New Category
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-2 flex-col	"
          >
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className="mb-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="w-full py-2"
            >
              Add Category
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddCategory;
