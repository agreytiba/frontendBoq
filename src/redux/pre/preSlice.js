import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import preService from './preService';

const initialState = {
    pres: [],
    pre:[],
	isErrorPre: false,
	isSuccessPre: false,
	isLoadingPre: false,
	messagePre:''
};

// add new pre details
export const addPre = createAsyncThunk('pres/create', async (data, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await preService.addPre(data);
	} catch (error) {
		const messagePre =
			'error'(error.response && error.response.data && error.response.data.messagePre) ||
			error.messagePre ||
			error.toString();
		return thunkAPI.rejectWithValue(messagePre);
	}
});

// Get all pres
export const getAllPre = createAsyncThunk('pres/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await preService.getAllPre();
	} catch (error) {
		const messagePre =
			(error.response && error.response.data && error.response.data.messagePre) || error.messagePre || error.toString();
		return thunkAPI.rejectWithValue(messagePre);
	}
});
// Get single pre
export const getPre = createAsyncThunk('pres/getOne', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await preService.getPre(id);
	} catch (error) {
		const messagePre =
			(error.response && error.response.data && error.response.data.messagePre) || error.messagePre || error.toString();
		return thunkAPI.rejectWithValue(messagePre);
	}
});
//edit  pre details
export const updatePre = createAsyncThunk('pres/edit', async ({ id, newRate }, thunkAPI) => {
  try {
    //   const token = thunkAPI.getState().auth.user.token
    return await preService.updatePre(id, newRate);
  } catch (error) {
    const messagePre =
      (error.response && error.response.data && error.response.data.messagePre) || error.messagePre || error.toString();
    return thunkAPI.rejectWithValue(messagePre);
  }
});
// Delete pre details
export const deletePre = createAsyncThunk('pres/delete', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await preService.deletePre(id);
	} catch (error) {
		const messagePre =
			(error.response && error.response.data && error.response.data.messagePre) || error.messagePre || error.toString();
		return thunkAPI.rejectWithValue(messagePre);
	}
});

export const preSlice = createSlice({
	name: 'pre',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE PRE
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(addPre.pending, (state) => {
				state.isLoadingPre = true;
			})
			// state on  success fullfilled of request
			.addCase(addPre.fulfilled, (state, action) => {
				state.isLoadingPre = false;
				state.isSuccessPre = true;
				state.pres.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(addPre.rejected, (state, action) => {
				state.isLoadingPre = false;
				state.isErrorPre = true;
				state.messagePre = action.payload;
      })
      
			// STATES FOR GET ALL PRES
			//state on waiting for response get pres from the server
			.addCase(getAllPre.pending, (state) => {
				state.isLoadingPre = true;
      })
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getAllPre.fulfilled, (state, action) => {
				state.isLoadingPre = false;
				state.isSuccessPre = true;
				state.pres = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllPre.rejected, (state, action) => {
				state.isLoadingPre = false;
				state.isErrorPre = true;
				state.messagePre = action.payload;
      })
      
			// STATES FOR GET SINGLE  PRE DETAILS
			//state on waiting for response get patient from the server
			.addCase(getPre.pending, (state) => {
				state.isLoadingPre = true;
			})
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getPre.fulfilled, (state, action) => {
				state.isLoadingPre = false;
				state.isSuccessPre = true;
				state.pre = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getPre.rejected, (state, action) => {
				state.isLoadingPre = false;
				state.isErrorPre = true;
				state.messagePre = action.payload;
      })
      
			// STATES FOR DELETE PRE
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deletePre.pending, (state) => {
				state.isLoadingPre = true;
			})
			// states when the request for delete  pre was successful
			.addCase(deletePre.fulfilled, (state, action) => {
				state.isLoadingPre = false;
				state.isSuccessPre = true;
				state.pres = state.pres.filter((pre) => pre._id !== action.payload.id);
			})
			//the states when request for deleting patient  is rejected and reason for rejection
			.addCase(deletePre.rejected, (state, action) => {
				state.isLoadingPre = false;
				state.isErrorPre = true;
				state.messagePre = action.payload;
      })
      
			//STATES FOR EDIT PRE
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(updatePre.pending, (state) => {
				state.isLoadingPre = true;
      })
      // states when the request is successful
			.addCase(updatePre.fulfilled, (state, action) => {
				state.isLoadingPre = false;
				state.isSuccessPre = true;
				state.pres = state.pres.filter((pre) => pre._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(updatePre.rejected, (state, action) => {
				state.isLoadingPre = false;
				state.isErrorPre = true;
				state.messagePre = action.payload;
			});
	}
});

export const { reset } = preSlice.actions;
export default preSlice.reducer;
