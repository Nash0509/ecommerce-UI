import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
   count : 0,
   total : 0,
}

export const PizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers : {
       addToCart : (state, action) => {

        state.count = state.count +1;

       },
       freshData : (state, action) => {
          
       state.count = action.payload.count;

       },
       total : (state, action) => {
        state.total = action.payload.total;
       },
       minusOne : (state, action) => {
       state.count = state.count - 1;
       }
    },
})

export const {addToCart, freshData, total, minusOne} = PizzaSlice.actions;

export default PizzaSlice.reducer;