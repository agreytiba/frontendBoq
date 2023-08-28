import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import savedPreService from './savedPreService';

const initialState = {
    savedPres: [],
    savedpre:[],
	isErrorSaved: false,
	isSuccessSaved: false,
	isLoadingSaved: false,
	messageSaved:''
};

// add new savedpre details
export const setSavedPre = createAsyncThunk('savedPres/create', async (data, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await savedPreService.setSavedPre(data);
	} catch (error) {
		const messageSaved =
			'error'(error.response && error.response.data && error.response.data.messageSaved) ||
			error.messageSaved ||
			error.toString();
		return thunkAPI.rejectWithValue(messageSaved);
	}
});

// Get all savedPres
export const getAllSavedPre = createAsyncThunk('savedPres/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await savedPreService.getAllSavedPre();
	} catch (error) {
		const messageSaved =
			(error.response && error.response.data && error.response.data.messageSaved) || error.messageSaved || error.toString();
		return thunkAPI.rejectWithValue(messageSaved);
	}
});
// Get single savedpre
export const getSavedPre = createAsyncThunk('savedPres/getOne', async (id,thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await savedPreService.getSavedPre(id);
	} catch (error) {
		const messageSaved =
			(error.response && error.response.data && error.response.data.messageSaved) || error.messageSaved || error.toString();
		return thunkAPI.rejectWithValue(messageSaved);
	}
});
//edit  savedpre details
export const updateSavedPre = createAsyncThunk('savedPres/edit', async ({ id,quantity,materialId}, thunkAPI) => {
  try {
    //   const token = thunkAPI.getState().auth.user.token
    return await savedPreService.updateSavedPre(id, quantity,materialId);
  } catch (error) {
    const messageSaved =
      (error.response && error.response.data && error.response.data.messageSaved) || error.messageSaved || error.toString();
    return thunkAPI.rejectWithValue(messageSaved);
  }
});
// Delete savedpre details
export const deleteSavedPre = createAsyncThunk('savedPres/delete', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await savedPreService.deleteSavedPre(id);
	} catch (error) {
		const messageSaved =
			(error.response && error.response.data && error.response.data.messageSaved) || error.messageSaved || error.toString();
		return thunkAPI.rejectWithValue(messageSaved);
	}
});

export const savedPreSlice = createSlice({
	name: 'savedpre',
	initialState,
  reducers: {
		Reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE SAVED PRE
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(setSavedPre.pending, (state) => {
				state.isLoadingSaved = true;
			})
			// state on  success fullfilled of request
			.addCase(setSavedPre.fulfilled, (state, action) => {
				state.isLoadingSaved = false;
				state.isSuccessSaved = true;
				state.savedPres.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(setSavedPre.rejected, (state, action) => {
				state.isLoadingSaved = false;
				state.isErrorSaved = true;
				state.messageSaved = action.payload;
      })
      
			// STATES FOR GET ALL  SAVED PRES
			//state on waiting for response get savedPres from the server
			.addCase(getAllSavedPre.pending, (state) => {
				state.isLoadingSaved = true;
      })
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getAllSavedPre.fulfilled, (state, action) => {
				state.isLoadingSaved = false;
				state.isSuccessSaved = true;
				state.savedPres = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllSavedPre.rejected, (state, action) => {
				state.isLoadingSaved = false;
				state.isErrorSaved = true;
				state.messageSaved = action.payload;
      })
      
			// STATES FOR GET SINGLE SAVED PRE DETAILS
			//state on waiting for response get patient from the server
			.addCase(getSavedPre.pending, (state) => {
				state.isLoadingSaved = true;
			})
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getSavedPre.fulfilled, (state, action) => {
				state.isLoadingSaved = false;
				state.isSuccessSaved = true;
				state.savedpre = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getSavedPre.rejected, (state, action) => {
				state.isLoadingSaved = false;
				state.isErrorSaved = true;
				state.messageSaved = action.payload;
      })
      
			// STATES FOR DELETE SAVED PRE
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deleteSavedPre.pending, (state) => {
				state.isLoadingSaved = true;
			})
			// states when the request for delete  savedpre was successful
			.addCase(deleteSavedPre.fulfilled, (state, action) => {
				state.isLoadingSaved = false;
				state.isSuccessSaved = true;
				state.savedPres = state.savedPres.filter((savedpre) => savedpre._id !== action.payload.id);
			})
			//the states when request for deleting patient  is rejected and reason for rejection
			.addCase(deleteSavedPre.rejected, (state, action) => {
				state.isLoadingSaved = false;
				state.isErrorSaved = true;
				state.messageSaved = action.payload;
      })
      
			//STATES FOR EDIT SAVED PRE
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(updateSavedPre.pending, (state) => {
				state.isLoadingSaved = true;
      })
      // states when the request is successful
			.addCase(updateSavedPre.fulfilled, (state, action) => {
				state.isLoadingSaved = false;
				state.isSuccessSaved = true;
				state.savedPres = state.savedPres.filter((savedpre) => savedpre._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(updateSavedPre.rejected, (state, action) => {
				state.isLoadingSaved = false;
				state.isErrorSaved = true;
				state.messageSaved = action.payload;
			});
	}
});

export const { Reset } = savedPreSlice.actions;
export default savedPreSlice.reducer;
