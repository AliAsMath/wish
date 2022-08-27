import { createSlice } from "@reduxjs/toolkit";

const initialState = { fullName: "", phoneNumber: "" };

export const personalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setFullName(state, action) {
      state.fullName = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
  },
});

export const personalActions = personalSlice.actions;
