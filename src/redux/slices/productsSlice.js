import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:5000/products';

const initialState = {
	products: [],
	addProductStatus: '',
	addProductError: '',
	getProductsStatus: '',
	getProductsError: '',
	deleteProductStatus: '',
	deleteProductError: '',
}

export const addProduct = createAsyncThunk(
	'products/addProduct',
	async (product, { rejectWithValue }) => {
		try {
			const response = await axios.post(baseURL, product);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async (id = null, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${baseURL}`);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
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

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: {
		[addProduct.pending]: (state, action) => {
			return {
				...state,
				addProductStatus: 'pending',
				addProductError: '',
				getProductsStatus: '',
				getProductsError: '',
				deleteProductStatus: '',
				deleteProductError: '',
			};
		},
		[addProduct.fulfilled]: (state, action) => {
			return {
				...state,
				products: [...state.products, action.payload],
				addProductStatus: 'success',
				addProductError: '',
				getProductsStatus: '',
				getProductsError: '',
				deleteProductStatus: '',
				deleteProductError: '',
			};
		},
		[addProduct.rejected]: (state, action) => {
			return {
				...state,
				addProductStatus: 'rejected',
				addProductError: action.payload,
				getProductsStatus: '',
				getProductsError: '',
				deleteProductStatus: '',
				deleteProductError: '',
			};
		},
		[getProducts.pending]: (state, action) => {
			return {
				...state,
				addProductStatus: '',
				addProductError: '',
				getProductsStatus: 'pending',
				getProductsError: '',
				deleteProductStatus: '',
				deleteProductError: '',
			};
		},
		[getProducts.fulfilled]: (state, action) => {
			return {
				...state,
				products: action.payload,
				addProductStatus: '',
				addProductError: '',
				getProductsStatus: 'success',
				getProductsError: '',
				deleteProductStatus: '',
				deleteProductError: '',
			};
		},
		[getProducts.rejected]: (state, action) => {
			return {
				...state,
				addProductStatus: '',
				addProductError: '',
				getProductsStatus: 'rejected',
				getProductsError: action.payload,
				deleteProductStatus: '',
				deleteProductError: '',
			};
		},
		[deleteProduct.pending]: (state, action) => {
			return {
				...state,
				addProductStatus: '',
				addProductError: '',
				getProductsStatus: '',
				getProductsError: '',
				deleteProductStatus: 'pending',
				deleteProductError: '',
			};
		},
		[deleteProduct.fulfilled]: (state, action) => {
			const remainingProducts = state.products.filter(product => product._id !== action.payload._id);
			return {
				...state,
				products: remainingProducts,
				addProductStatus: '',
				addProductError: '',
				getProductsStatus: '',
				getProductsError: '',
				deleteProductStatus: 'success',
				deleteProductError: '',
			};
		},
		[deleteProduct.rejected]: (state, action) => {
			return {
				...state,
				addProductStatus: '',
				addProductError: '',
				getProductsStatus: '',
				getProductsError: '',
				deleteProductStatus: 'rejected',
				deleteProductError: action.payload,
			};
		},
	},
})

export default productsSlice.reducer;