import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviews = createAsyncThunk(
  'review/fetchReviews',
  async () => {
    const response = await fetch('http://localhost:5000/reviews').then(res => res.json())
		// const data = await response.json();
		console.log(response);
    return response;
  }
)

// export const addReviews = createAsyncThunk(
//   'reviews/addReviews',
//   async () => {
//     const response = await axios.post('http://localhost:5000/reviews');
// 		const data = await response.json();
// 		console.log(data);
//     return response.data;
//   }
// )

const initialState = {
	allReviews: [],
	status: 'idle',
}

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.allReviews.push(action.payload);
    },
  },
	extraReducers: (builder) => {
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.allReviews = action.payload;
			state.status = 'success';
    })
    builder.addCase(fetchReviews.pending, (state, action) => {
      state.status = 'pending';
    })
  },
})

// Action creators are generated for each case reducer function
export const { addReview } = reviewSlice.actions;

export default reviewSlice.reducer;