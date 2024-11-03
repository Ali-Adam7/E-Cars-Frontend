"use client";

import { Car } from "@/DTO/Car";
import { createSlice } from "@reduxjs/toolkit";
const initial: Car[] = [];
const cartSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    initialize: (state, action) => (state = action.payload),
    addToCart: (state, action) => {
      const carId = action.payload.id;
      const index = state.findIndex((car) => car.id === carId);
      if (index === -1) state.push(action.payload);
      else if (state[index]?.quantity >= 1) state[index].quantity = state[index].quantity + 1;
      return state;
    },
    removeFromCart: (state, action) => {
      const carId = action.payload;
      const index = state.findIndex((car) => car.id === carId);

      if (state[index].quantity > 1) state[index].quantity -= 1;
      else state.splice(index, 1);

      return state;
    },
    emptyCart: (state) => (state = initial),
  },
});
export const { initialize, addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
