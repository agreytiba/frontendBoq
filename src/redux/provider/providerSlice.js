import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import providerService from './providerService';

const initialState = {
    providers: [],
    provider:[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// add new provider details
export const AddProvider = createAsyncThunk('providers/create', async (data, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await providerService.AddProvider(data);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all providers
export const getAllProviders = createAsyncThunk('providers/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await providerService.getAllProviders();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single provider
export const getProvider = createAsyncThunk('providers/getOne', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await providerService.getProvider(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  provider details
export const updateProvider = createAsyncThunk('providers/edit', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await providerService.updateAppointment(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete provider details
export const deleteProvider = createAsyncThunk('providers/delete', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await providerService.deleteProvider(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const providerSlice = createSlice({
	name: 'provider',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE MATERIAL
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(AddProvider.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(AddProvider.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.providers.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(AddProvider.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL MATERIALS
			//state on waiting for response get providers from the server
			.addCase(getAllProviders.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getAllProviders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.providers = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllProviders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET SINGLE  MATERIAL DETAILS
			//state on waiting for response get patient from the server
			.addCase(getProvider.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getProvider.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.provider = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getProvider.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR DELETE MATERIAL
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deleteProvider.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete  provider was successful
			.addCase(deleteProvider.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.providers = state.providers.filter((provider) => provider._id !== action.payload.id);
			})
			//the states when request for deleting patient  is rejected and reason for rejection
			.addCase(deleteProvider.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			//STATES FOR EDIT MATERIAL
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(updateProvider.pending, (state) => {
				state.isLoading = true;
      })
      // states when the request is successful
			.addCase(updateProvider.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.providers = state.providers.filter((provider) => provider._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(updateProvider.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = providerSlice.actions;
export default providerSlice.reducer;
