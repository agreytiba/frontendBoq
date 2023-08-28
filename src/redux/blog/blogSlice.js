import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from './blogService';

const initialState = {
	blogPosts: [],
	blogPost: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// add new blogPost details
export const createBlogPost = createAsyncThunk('blogPosts/create', async (blogPostData, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await blogService.createBlogPost(blogPostData,token);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all blogPosts
export const getBlogPosts = createAsyncThunk('blogPosts/getAll', async (_, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await blogService.getBlogPosts(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single blogPost
export const getBlogPost = createAsyncThunk('blogPosts/getOne', async (id, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await blogService.getBlogPost(id,token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  blogPost details
export const updateBlogPost = createAsyncThunk('blogPosts/edit', async (id, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await blogService.updateBlogPost(id,token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete blogPost details
export const deleteBlogPost = createAsyncThunk('blogPosts/delete', async (id, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await blogService.deleteBlogPost(id,token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			// STATES FOR CREATE blogPost
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(createBlogPost.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(createBlogPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.blogPosts.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(createBlogPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// STATES FOR GET ALL blogPosts
			//state on waiting for response getBlogPosts blogPosts from the server
			.addCase(getBlogPosts.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we getBlogPosts data
			.addCase(getBlogPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.blogPosts = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getBlogPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// STATES FOR GET SINGLE blogPost DETAILS
			//state on waiting for response getBlogPosts patient from the server
			.addCase(getBlogPost.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we getBlogPosts data
			.addCase(getBlogPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.blogPost = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getBlogPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// STATES FOR DELETE blogPost
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deleteBlogPost.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete was successful
			.addCase(deleteBlogPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.blogPosts = state.blogPosts.filter((blogPost) => blogPost._id !== action.payload.id);
			})
			//the states when request for deleting is rejected and reason for rejection
			.addCase(deleteBlogPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			//STATES FOR EDIT blogPost
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(updateBlogPost.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request is successful
			.addCase(updateBlogPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.blogPosts = state.blogPosts.filter((blogPost) => blogPost._id !== action.payload.id);
			})
			//states when the request is rejected with reason for rejection
			.addCase(updateBlogPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
