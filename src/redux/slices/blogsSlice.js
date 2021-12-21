import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:5000/blogs';

const initialState = {
	blogs: [],
	getBlogsStatus: '',
	getBlogsError: '',
}

export const getBlogs = createAsyncThunk(
	'blogs/getBlogs',
	async (blog = '', { rejectWithValue }) => {
		try {
			const response = await axios.get(baseURL);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const blogsSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {},
	extraReducers: {
		[getBlogs.pending]: (state, action) => {
			return {
				...state,
				getBlogsStatus: 'pending',
				getBlogsError: '',
			};
		},
		[getBlogs.fulfilled]: (state, action) => {
			return {
				...state,
				blogs: action.payload,
				getBlogsStatus: 'success',
				getBlogsError: '',
			};
		},
		[getBlogs.rejected]: (state, action) => {
			return {
				...state,
				getBlogsStatus: 'rejected',
				getBlogsError: action.payload,
			};
		},
	},
});

export default blogsSlice.reducer;