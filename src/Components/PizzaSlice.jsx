import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  total: 0,
  deleteItemPrice : 0
};

export const PizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.count = state.count + 1;
    },
    makeItZero: (state, action) => {
      state.count = 0;
    },
    freshData: (state, action) => {
      state.count = action.payload.count;
    },
    total: (state, action) => {
      state.total = state.total + action.payload.total;
    },
    minusOne: (state, action) => {
      state.count = state.count - 1;
      state.total = state.total - action.payload.price;
    },
    deleteItemPrice: (state, action) => {
          state.deleteItemPrice = action.payload.price;
    }
  },
});

export const { addToCart, freshData, total, minusOne, makeItZero } =
  PizzaSlice.actions;

export default PizzaSlice.reducer;
