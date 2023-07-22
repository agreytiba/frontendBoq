import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import purchaseService from './purchaseService';

const initialState = {
    purchases: [],
    purchase:[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// add new purchase details
export const createPurchase = createAsyncThunk('purchases/create', async (data, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await purchaseService.createPurchase(data);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all purchases
export const getAllPurchase = createAsyncThunk('purchases/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await purchaseService.getAllPurchase();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single purchase
export const getPurchase = createAsyncThunk('purchases/getOne', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await purchaseService.getPurchase(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  purchase details
export const updatePurchase = createAsyncThunk('purchases/edit', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await purchaseService.updatePurchase(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete purchase details
export const deletePurchase = createAsyncThunk('purchases/delete', async (id, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await purchaseService.deletePurchase(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const purchaseSlice = createSlice({
	name: 'purchase',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE PURCHASE
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(createPurchase.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(createPurchase.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.purchases.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(createPurchase.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL PURCHASES
			//state on waiting for response getAllPurchase purchases from the server
			.addCase(getAllPurchase.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we getAllPurchase data
			.addCase(getAllPurchase.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.purchases = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllPurchase.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET SINGLE PURCHASE DETAILS
			//state on waiting for response getAllPurchase patient from the server
			.addCase(getPurchase.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we getAllPurchase data
			.addCase(getPurchase.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.purchase = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getPurchase.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR DELETE PURCHASE
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deletePurchase.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete was successful
			.addCase(deletePurchase.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.purchases = state.purchases.filter((purchase) => purchase._id !== action.payload.id);
			})
			//the states when request for deleting is rejected and reason for rejection
			.addCase(deletePurchase.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			//STATES FOR EDIT  PURCHASE
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(updatePurchase.pending, (state) => {
				state.isLoading = true;
      })
      // states when the request is successful
			.addCase(updatePurchase.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.purchases = state.purchases.filter((purchase) => purchase._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(updatePurchase.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = purchaseSlice.actions;
export default purchaseSlice.reducer;
