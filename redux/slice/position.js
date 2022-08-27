import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const positionSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setPosition(state, action) {
      return action.payload;
    },
  },
});

export const positionActions = positionSlice.actions;
