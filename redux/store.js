import { configureStore } from "@reduxjs/toolkit";
import { basicInformationSlice } from "./slice/basic-information";
import { positionSlice } from "./slice/position";
import { personalSlice } from "./slice/personal";
import { alertSlice } from "./slice/alert";

const store = configureStore({
  reducer: {
    basicInformation: basicInformationSlice.reducer,
    position: positionSlice.reducer,
    personal: personalSlice.reducer,
    alert: alertSlice.reducer,
  },
});

export default store;
