import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEnable: false,
  message: null,
  type: "error",
};

export const alertSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAlert(state, action) {
      return {
        isEnable: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },

    closeAlert(state) {
      state.isEnable = false;
    },
  },
});

export const alertActions = alertSlice.actions;
