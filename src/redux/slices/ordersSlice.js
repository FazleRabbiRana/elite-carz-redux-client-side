import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:5000/';

const initialState = {
	orders: [],
	addOrderStatus: '',
	addOrderError: '',
	getOrdersStatus: '',
	getOrdersError: '',
	updateOrderStatus: '',
	updateOrderError: '',
	deleteOrderStatus: '',
	deleteOrderError: '',
}

export const ordersAdd = createAsyncThunk(
	'orders/ordersAdd',
	async (order, { rejectWithValue }) => {
		try {
			const response = await axios.post(baseURL + 'orders', order);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: {
		[ordersAdd.pending]: (state, action) => {
			return {
				...state,
				addOrderStatus: 'pending',
				addOrderError: '',
				getOrdersStatus: '',
				getOrdersError: '',
				updateOrderStatus: '',
				updateOrderError: '',
				deleteOrderStatus: '',
				deleteOrderError: '',
			};
		},
		[ordersAdd.fulfilled]: (state, action) => {
			return {
				...state,
				orders: [...state.orders, action.payload],
				addOrderStatus: 'success',
				addOrderError: '',
				getOrdersStatus: '',
				getOrdersError: '',
				updateOrderStatus: '',
				updateOrderError: '',
				deleteOrderStatus: '',
				deleteOrderError: '',
			};
		},
		[ordersAdd.rejected]: (state, action) => {
			return {
				...state,
				addOrderStatus: 'rejected',
				addOrderError: action.payload,
				getOrdersStatus: '',
				getOrdersError: '',
				updateOrderStatus: '',
				updateOrderError: '',
				deleteOrderStatus: '',
				deleteOrderError: '',
			};
		},
	},
})

export default ordersSlice.reducer;