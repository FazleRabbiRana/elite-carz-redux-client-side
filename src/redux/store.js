import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import reviewsReducer from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
		ordersState: ordersReducer,
		reviewsState: reviewsReducer,
	},
});