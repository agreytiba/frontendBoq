import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import foundationService from './foundationService';

const initialState = {
    foundations: [],
    foundation:[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// add new foundation details
export const createFoudation = createAsyncThunk('foundations/create', async (data, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await foundationService.createFoudation(data);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all foundations
export const getFoudations = createAsyncThunk('foundations/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await foundationService.getFoudations();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single foundation
export const getFoudation = createAsyncThunk('foundations/getOne', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await foundationService.getFoudation(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  foundation details
export const updateFoudation = createAsyncThunk('foundations/edit', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await foundationService.updateFoudation(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete foundation details
export const deleteFoudation = createAsyncThunk('foundations/delete', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await foundationService.deleteFoudation(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const foundationSlice = createSlice({
	name: 'found',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE APPOINTMENT
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(createFoudation.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(createFoudation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.foundations.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(createFoudation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL APPOINTMENTS
			//state on waiting for response get foundations from the server
			.addCase(getFoudations.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getFoudations.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.foundations = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getFoudations.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET SINGLE  APPOINTMENT DETAILS
			//state on waiting for response get patient from the server
			.addCase(getFoudation.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getFoudation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.foundation = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getFoudation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR DELETE APPOINTMENT
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deleteFoudation.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete patient was successful
			.addCase(deleteFoudation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.foundations = state.foundations.filter((foundation) => foundation._id !== action.payload.id);
			})
			//the states when request for deleting patient  is rejected and reason for rejection
			.addCase(deleteFoudation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			//STATES FOR EDIT APPOINTMENT
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(updateFoudation.pending, (state) => {
				state.isLoading = true;
      })
      // states when the request is successful
			.addCase(updateFoudation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.foundations = state.foundations.filter((foundation) => foundation._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(updateFoudation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = foundationSlice.actions;
export default foundationSlice.reducer;
