import { combineReducers, configureStore } from "@reduxjs/toolkit";
import activeOrderSlice from "./reducers/activeOrderSlice";
import catalogSlice from "./reducers/catalogSlice";

const combinedReducers = combineReducers({
  order: activeOrderSlice,
  catalog: catalogSlice,
});

export const store = configureStore({
  reducer: combinedReducers,
});
