import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import productReducer from './slices/productSlice';
import reviewReducer from './slices/reviewSlice';

export const store = configureStore({
  reducer: {
		ordersState: ordersReducer,

		reviews: reviewReducer,
		products: productReducer
	},
});