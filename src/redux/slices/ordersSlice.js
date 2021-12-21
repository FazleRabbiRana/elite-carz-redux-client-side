import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:5000/orders';

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

export const addOrder = createAsyncThunk(
	'orders/addOrder',
	async (order, { rejectWithValue }) => {
		try {
			const response = await axios.post(baseURL, order);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getOrders = createAsyncThunk(
	'orders/getOrders',
	async (email = '', { rejectWithValue }) => {
		try {
			// const response = await axios.get(baseURL + 'orders');
			const response = await axios.get(`${baseURL}?email=${email}`);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateOrder = createAsyncThunk(
	'orders/updateOrder',
	async (order, { rejectWithValue }) => {
		try {
			const { _id } = order;
			const response = await axios.put(`${baseURL}/${_id}`, order);
			return response.data;
		}
		catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
)

export const deleteOrder = createAsyncThunk(
	'orders/deleteOrder',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`${baseURL}/${id}`);
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
		[addOrder.pending]: (state, action) => {
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
		[addOrder.fulfilled]: (state, action) => {
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
		[addOrder.rejected]: (state, action) => {
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
		[getOrders.pending]: (state, action) => {
			return {
				...state,
				addOrderStatus: '',
				addOrderError: '',
				getOrdersStatus: 'pending',
				getOrdersError: '',
				updateOrderStatus: '',
				updateOrderError: '',
				deleteOrderStatus: '',
				deleteOrderError: '',
			};
		},
		[getOrders.fulfilled]: (state, action) => {
			return {
				...state,
				orders: action.payload,
				addOrderStatus: '',
				addOrderError: '',
				getOrdersStatus: 'success',
				getOrdersError: '',
				updateOrderStatus: '',
				updateOrderError: '',
				deleteOrderStatus: '',
				deleteOrderError: '',
			};
		},
		[getOrders.rejected]: (state, action) => {
			return {
				...state,
				addOrderStatus: '',
				addOrderError: '',
				getOrdersStatus: 'rejected',
				getOrdersError: action.payload,
				updateOrderStatus: '',
				updateOrderError: '',
				deleteOrderStatus: '',
				deleteOrderError: '',
			};
		},
		[updateOrder.pending]: (state, action) => {
			return {
				...state,
				addOrderStatus: '',
				addOrderError: '',
				getOrdersStatus: '',
				getOrdersError: '',
				updateOrderStatus: 'pending',
				updateOrderError: '',
				deleteOrderStatus: '',
				deleteOrderError: '',
			};
		},
		[updateOrder.fulfilled]: (state, action) => {
			const updatedOrder = state.orders.map(order => order._id === action.payload._id ? action.payload : order);

			return {
				...state,
				orders: updatedOrder,
				addOrderStatus: '',
				addOrderError: '',
				getOrdersStatus: '',
				getOrdersError: '',
				updateOrderStatus: 'success',
				updateOrderError: '',
				deleteOrderStatus: '',
				deleteOrderError: '',
			};
		},
		[updateOrder.rejected]: (state, action) => {
			return {
				...state,
				addOrderStatus: '',
				addOrderError: '',
				getOrdersStatus: '',
				getOrdersError: '',
				updateOrderStatus: 'rejected',
				updateOrderError: action.payload,
				deleteOrderStatus: '',
				deleteOrderError: '',
			};
		},
		[deleteOrder.pending]: (state, action) => {
			return {
				...state,
				addOrderStatus: '',
				addOrderError: '',
				getOrdersStatus: '',
				getOrdersError: '',
				updateOrderStatus: '',
				updateOrderError: '',
				deleteOrderStatus: 'pending',
				deleteOrderError: '',
			};
		},
		[deleteOrder.fulfilled]: (state, action) => {
			const remainingOrders = state.orders.filter(order => order._id !== action.payload._id);
			return {
				...state,
				orders: remainingOrders,
				addOrderStatus: '',
				addOrderError: '',
				getOrdersStatus: '',
				getOrdersError: '',
				updateOrderStatus: '',
				updateOrderError: '',
				deleteOrderStatus: 'success',
				deleteOrderError: '',
			};
		},
		[deleteOrder.rejected]: (state, action) => {
			return {
				...state,
				addOrderStatus: '',
				addOrderError: '',
				getOrdersStatus: '',
				getOrdersError: '',
				updateOrderStatus: '',
				updateOrderError: '',
				deleteOrderStatus: 'rejected',
				deleteOrderError: action.payload,
			};
		},
	},
})

export default ordersSlice.reducer;