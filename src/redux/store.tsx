import { configureStore } from "@reduxjs/toolkit";
import formSliceReducer from "./form";
const store = configureStore({
  reducer: {
    formSliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
