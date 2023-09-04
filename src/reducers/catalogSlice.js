import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  err: false,
};

export const fetchCatalog = createAsyncThunk("fetchCatalog", async () => {
  const response = await fetch("/catalogStub.json");
  const data = await response.json();
  return data;
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCatalog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCatalog.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCatalog.rejected, (state, action) => {
      state.loading = false;
      state.catalog = [];
      state.err = true;
    });
  },
});

export default catalogSlice.reducer;
