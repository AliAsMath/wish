import { createSlice } from "@reduxjs/toolkit";

const initialState = { country: null, education: null, experience: 15 };

export const basicInformationSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCountry(state, action) {
      state.country = action.payload;
    },
    setEducation(state, action) {
      state.education = action.payload;
    },
    setExperience(state, action) {
      state.experience = action.payload;
    },
  },
});

export const basicInformationActions = basicInformationSlice.actions;
