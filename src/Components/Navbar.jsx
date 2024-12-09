import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { freshData } from "./PizzaSlice";
import { useNavigate } from "react-router-dom";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

// Styled Badge for the cart icon
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

// Filter options for Autocomplete
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.title,
});

const Navbar = () => {
  const [searchBy, setSearchBy] = useState("");
  const [category, setCategory] = useState([]); // State for category data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart data
    if (sessionStorage.getItem("token")) {
      fetch(`/api/v1/cart/${localStorage.getItem("uid")}`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(freshData({ count: res.length }));
        })
        .catch((err) => console.log(err.message));
    }

    // Fetch categories
    fetch("/api/v1/category")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Update state with categories
          setCategory(res.cate.map((catego) => ({ title: catego })));
        }
      })
      .catch((err) => console.log(err.message));
  }, [dispatch]);

  const count = useSelector((store) => store.pizza.count);

  return (
    <div className="bg-black text-white p-5 flex items-center justify-between">
      <div className="text-5xl font-bold text-yellow-400">
        <Link to="/">BuyNest</Link>
      </div>

      {/* Search bar (visible on large screens) */}
      <div className="hidden lg:block relative flex-1 max-w-md">
        <Autocomplete
          id="filter-demo"
          options={category}
          getOptionLabel={(option) => option.title}
          filterOptions={filterOptions}
          onChange={(event, selectedOption) => {
            if (selectedOption) {
              navigate(`/category/${selectedOption.title}`);
              setSearchBy("");
            }
          }}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              label="Search"
              variant="outlined"
              sx={{
                input: { color: "white" },
                "& .MuiInputLabel-root": { color: "white" },
              }}
              style={{
                backgroundColor: "rgb(50, 50, 50)",
                fontSize: "1.25rem",
                color: "white",
                borderRadius: "5px",
              }}
              className="w-full"
              {...params}
              onChange={(e) => setSearchBy(e.target.value)}
            />
          )}
        />
      </div>

      {/* Navigation links and Cart icon */}
      <div className="flex items-center space-x-8">
        <ul className="flex space-x-8 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/bestdeals" className="hover:text-yellow-400 transition">
              Best <span className="text-yellow-400">deals</span>
            </Link>
          </li>
          <li>
            <IconButton onClick={() => navigate("/cart/1")} aria-label="cart">
              <StyledBadge badgeContent={count} color="secondary">
                <ShoppingCartIcon className="text-white text-3xl" />
              </StyledBadge>
            </IconButton>
          </li>
          {sessionStorage.getItem("token") ? (
            <li>
              <Link to="/profile" className="hover:text-yellow-400 transition">
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-yellow-400 transition">
                Login
              </Link>
            </li>
          )}
          {localStorage.getItem("isAdmin") && localStorage.getItem("token") && (
            <li>
              <Link to="/admin" className="hover:text-yellow-400 transition">
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
