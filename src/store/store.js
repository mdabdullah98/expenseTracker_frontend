import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/user";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});
export default store;
