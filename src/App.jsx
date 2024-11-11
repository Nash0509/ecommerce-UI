import React from "react";
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
            sessionStorage.getItem("token") ? (
              <Profile />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgotPassword" element={<FotgotPass />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/bestdeals" element={<BestDeals />}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
