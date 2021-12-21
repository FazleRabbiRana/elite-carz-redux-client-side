import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:5000/reviews';

const initialState = {
	reviews: [],
	addReviewStatus: '',
	addReviewError: '',
	getReviewsStatus: '',
	getReviewsError: '',
}

export const addReview = createAsyncThunk(
	'reviews/addReview',
	async (review, { rejectWithValue }) => {
		try {
			const response = await axios.post(baseURL, review);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getReviews = createAsyncThunk(
	'reviews/getReviews',
	async (review = '', { rejectWithValue }) => {
		try {
			const response = await axios.get(baseURL);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const reviewsSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {},
	extraReducers: {
		[addReview.pending]: (state, action) => {
			return {
				...state,
				addReviewStatus: 'pending',
				addReviewError: '',
				getReviewsStatus: '',
				getReviewsError: '',
			};
		},
		[addReview.fulfilled]: (state, action) => {
			return {
				...state,
				reviews: [...state.reviews, action.payload],
				addReviewStatus: 'success',
				addReviewError: '',
				getReviewsStatus: '',
				getReviewsError: '',
			};
		},
		[addReview.rejected]: (state, action) => {
			return {
				...state,
				addReviewStatus: 'rejected',
				addReviewError: action.payload,
				getReviewsStatus: '',
				getReviewsError: '',
			};
		},
		[getReviews.pending]: (state, action) => {
			return {
				...state,
				addReviewStatus: '',
				addReviewError: '',
				getReviewsStatus: 'pending',
				getReviewsError: '',
			};
		},
		[getReviews.fulfilled]: (state, action) => {
			return {
				...state,
				reviews: action.payload,
				addReviewStatus: '',
				addReviewError: '',
				getReviewsStatus: 'success',
				getReviewsError: '',
			};
		},
		[getReviews.rejected]: (state, action) => {
			return {
				...state,
				addReviewStatus: '',
				addReviewError: '',
				getReviewsStatus: 'rejected',
				getReviewsError: action.payload,
			};
		},
	},
});

export default reviewsSlice.reducer;