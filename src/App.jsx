import React from "react";
import { useEffect, useState } from "react";
import Contact from "./Components/Contact";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Product from "./Components/Product";
import Cate from "./Components/Cate";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Profile from "./Components/Profile";
import NotFound from "./Components/NotFound";
import FotgotPass from "./Components/FotgotPass";
import BestDeals from "./Components/BestDeals";
import Admin from "./Components/Admin";
import AddPdt from "./Components/Admin/AddPdt";
import UpdateStocks from "./Components/Admin/UpdateStocks";
import AddCategory from "./Components/Admin/AddCategory";
import DeletePdt from "./Components/Admin/DeletePdt";
import UpdatePdt from "./Components/Admin/UpdatePdt";

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return token ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/category/:id" element={<Cate />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgotPassword" element={<FotgotPass />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/bestdeals" element={<BestDeals />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addPdt" element={<AddPdt />} />
        <Route path="/updateStocks" element={<UpdateStocks />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/deletePdt" element={<DeletePdt />} />
        <Route path="/updatePdt" element={<UpdatePdt />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
