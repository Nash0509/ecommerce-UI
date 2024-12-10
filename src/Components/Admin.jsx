import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { FaClipboardList, FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <Typography variant="h4" className="text-gray-800 font-bold p-4">
        Admin Dashboard
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl px-4 mt-[3rem]">
        {/* Manage Products */}
        <Card className="shadow-lg hover:shadow-2xl transition">
          <CardContent className="text-center">
            <FaClipboardList className="text-blue-500 text-4xl mb-4 mx-auto" />
            <Typography variant="h5" className="mb-4">
              Manage Products
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="w-full"
              onClick={() => navigate("/addPdt")}
            >
              Add
            </Button>
          </CardContent>
        </Card>

        {/* Add Category */}
        <Card className="shadow-lg hover:shadow-2xl transition">
          <CardContent className="text-center">
            <FaTags className="text-yellow-500 text-4xl mb-4 mx-auto" />
            <Typography variant="h5" className="mb-4">
              Add Category
            </Typography>
            <Button
              variant="contained"
              color="success"
              className="w-full"
              onClick={() => navigate("/addCategory")}
            >
              Add Category
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
