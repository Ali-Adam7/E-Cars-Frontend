"use client";

import { Car } from "@/DTO/Car";
import { createSlice } from "@reduxjs/toolkit";
const initial: Car[] = [];
const ordrSlice = createSlice({
  name: "order",
  initialState: initial,
  reducers: {
    setOrder: (state, action) => (state = action.payload),
  },
});
export const { setOrder } = ordrSlice.actions;
export default ordrSlice.reducer;
