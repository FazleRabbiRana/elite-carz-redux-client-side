import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	reviews: [],
	getReviewsStatus: '',
	getReviewsError: '',
	addReviewStatus: '',
	addReviewError: '',
}

const reviewsSlice = createSlice({
	name: 'reviews',
	initialState,
})