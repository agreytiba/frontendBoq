import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mapsService from './mapsService';

const initialState = {
    maps: [],
    map:[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// add new map details
export const createMap = createAsyncThunk('maps/create', async (mapData, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.createMap(mapData,token);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all maps
export const getAllMaps = createAsyncThunk('maps/getAll', async (_, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.getAllMaps(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single map
export const getMap = createAsyncThunk('maps/getOne', async (mapId, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.getMap(mapId,token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  map details
export const updateMap = createAsyncThunk('maps/edit', async (mapId, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.updateMap(mapId,token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete map details
export const deleteMap = createAsyncThunk('maps/delete', async (mapId, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.deleteMap(mapId,token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const mapSlice = createSlice({
	name: 'map',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE MAP
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(createMap.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(createMap.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.maps.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(createMap.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL MAPS
			//state on waiting for response getAllMaps maps from the server
			.addCase(getAllMaps.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we getAllMaps data
			.addCase(getAllMaps.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.maps = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllMaps.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET SINGLE MAP DETAILS
			//state on waiting for response getAllMaps patient from the server
			.addCase(getMap.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we getAllMaps data
			.addCase(getMap.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.map = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getMap.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR DELETE MAP
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deleteMap.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete was successful
			.addCase(deleteMap.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.maps = state.maps.filter((map) => map._id !== action.payload.id);
			})
			//the states when request for deleting is rejected and reason for rejection
			.addCase(deleteMap.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			//STATES FOR EDIT MAP
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(updateMap.pending, (state) => {
				state.isLoading = true;
      })
      // states when the request is successful
			.addCase(updateMap.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.maps = state.maps.filter((map) => map._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(updateMap.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = mapSlice.actions;
export default mapSlice.reducer;
