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

//get all under failure check
export const getAllFailedCheck = createAsyncThunk('maps/failedCheck', async (_, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.getAllFailedCheck(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//get all under failure check
export const getAllFailed = createAsyncThunk('maps/failed', async (_, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.getAllFailed(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//get all under imetumwa
export const getAllTypeCheck = createAsyncThunk('maps/typeCheck', async (_, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.getAllTypeCheck(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//get all under vipimo
export const getAllUnitCheck = createAsyncThunk('maps/unitCheck', async (_, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.getAllUnitCheck(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//get all under successful
export const getAllSuccess = createAsyncThunk('maps/unitSuccess', async (_, thunkAPI) => {
	try {
		  const token = thunkAPI.getState().auth.user.token
		return await mapsService.getAllPassed(token);
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
      
			// STATES FOR GET ALL MAPS UNDER MABORESHO
			//state on waiting for response getAllMaps maps from the server
			.addCase(getAllFailedCheck.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we getAllFailedCheck data
			.addCase(getAllFailedCheck.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.maps = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllFailedCheck.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
			// STATES FOR GET ALL MAPS UNDER MABORESHO
			//state on waiting for response getAllMaps maps from the server
			.addCase(getAllFailed.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we getAllFailed data
			.addCase(getAllFailed.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.maps = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllFailed.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL MAPS UNDER IMETUMWA
			//state on waiting for response getAllMaps maps from the server
			.addCase(getAllTypeCheck.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we getAllTypeCheck data
			.addCase(getAllTypeCheck.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.maps = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllTypeCheck.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL MAPS UNDER IMETUMWA
			//state on waiting for response getAllMaps maps from the server
			.addCase(getAllUnitCheck.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we getAllUnitCheck data
			.addCase(getAllUnitCheck.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.maps = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllUnitCheck.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
			// STATES FOR GET ALL MAPS UNDER IMETUMWA
			//state on waiting for response getAllMaps maps from the server
			.addCase(getAllSuccess.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we getAllSuccess data
			.addCase(getAllSuccess.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.maps = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllSuccess.rejected, (state, action) => {
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
