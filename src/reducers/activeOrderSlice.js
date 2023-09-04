import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  loading: false,
  err: false,
};

export const fetchOrder = createAsyncThunk("fetchOrder", async () => {
  const response = await fetch("/orderStub.json");
  const data = await response.json();
  return data;
});

export const activeOrderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    markProductAsApproved: (state, action) => {
      const productId = action.payload;
      state.order.products.forEach((each) => {
        if (productId === each.id) {
          each.statusCode = "APP";
        }
      });
    },

    markProductAsMissing: (state, action) => {
      const productId = action.payload.productId;
      const isProductUrgent = action.payload.isUrgent;
      state.order.products.forEach((each) => {
        if (productId === each.id) {
          each.quantity = 0;
          each.statusCode = isProductUrgent ? "MISSURG" : "MISS";
        }
      });
    },

    updatePriceAndQuantity: (state, action) => {
      const productId = action.payload.productId;
      const newDetails = action.payload.newDetails;
      state.order.products.forEach((each) => {
        if (productId === each.id) {
          if (
            newDetails.price !== each.price &&
            newDetails.quantity !== each.quantity
          ) {
            each.previous = {
              price: each.price,
              quantity: each.quantity,
            };
            each.statusCode = "PQUPDATE";
          } else if (newDetails.price !== each.price) {
            each.previous.price = each.price;
            each.statusCode = "PUPDATE";
          } else if (newDetails.quantity !== each.quantity) {
            each.previous.quantity = each.quantity;
            each.statusCode = "QUPDATE";
          }
          each.price = newDetails.price;
          each.quantity = newDetails.quantity;
        }
      });
    },

    addNewProducts: (state, action) => {
      state.order.products = [...action.payload, ...state.order.products];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.loading = false;
      state.order = {};
      state.err = true;
    });
  },
});

export const {
  markProductAsApproved,
  markProductAsMissing,
  updatePriceAndQuantity,
  addNewProducts,
} = activeOrderSlice.actions;
export default activeOrderSlice.reducer;
