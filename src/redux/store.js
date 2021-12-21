import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import reviewsReducer from './slices/reviewsSlice';
import blogsReducer from './slices/blogsSlice';

export const store = configureStore({
  reducer: {
		productsState: productsReducer,
		ordersState: ordersReducer,
		reviewsState: reviewsReducer,
		blogsState: blogsReducer,
	},
});