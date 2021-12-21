import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'https://shrouded-sierra-72899.herokuapp.com/blogs';

const initialState = {
	blogs: [],
	getBlogsStatus: '',
	getBlogsError: '',
	getSingleBlogStatus: '',
	getSingleBlogError: '',
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

export const getSingleBlog = createAsyncThunk(
	'blogs/getSingleBlog',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${baseURL}/${id}`);
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
				getSingleBlogStatus: '',
				getSingleBlogError: '',
			};
		},
		[getBlogs.fulfilled]: (state, action) => {
			return {
				...state,
				blogs: action.payload,
				getBlogsStatus: 'success',
				getBlogsError: '',
				getSingleBlogStatus: '',
				getSingleBlogError: '',
			};
		},
		[getBlogs.rejected]: (state, action) => {
			return {
				...state,
				getBlogsStatus: 'rejected',
				getBlogsError: action.payload,
				getSingleBlogStatus: '',
				getSingleBlogError: '',
			};
		},
		[getSingleBlog.pending]: (state, action) => {
			return {
				...state,
				getBlogsStatus: '',
				getBlogsError: '',
				getSingleBlogStatus: 'pending',
				getSingleBlogError: '',
			};
		},
		[getSingleBlog.fulfilled]: (state, action) => {
			return {
				...state,
				blogs: action.payload,
				getBlogsStatus: '',
				getBlogsError: '',
				getSingleBlogStatus: 'success',
				getSingleBlogError: '',
			};
		},
		[getSingleBlog.rejected]: (state, action) => {
			return {
				...state,
				getBlogsStatus: '',
				getBlogsError: '',
				getSingleBlogStatus: 'rejected',
				getSingleBlogError: action.payload,
			};
		},
	},
});

export default blogsSlice.reducer;