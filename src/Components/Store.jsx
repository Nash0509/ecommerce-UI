import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from './PizzaSlice.jsx';

export const store = configureStore(
   {
    reducer : {
        pizza :  pizzaReducer,
    }, 
   }
);