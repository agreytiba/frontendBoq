import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

const initialState = {
    orders: [],
    order:[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// add new order details
export const addOrder = createAsyncThunk('orders/create', async (orderData, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await orderService.addOrder(orderData);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all orders
export const getAllorders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await orderService.getAllorders();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single order
export const getOrder = createAsyncThunk('orders/getOne', async (orderId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await orderService.getOrder(orderId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  order details
export const updateOrder = createAsyncThunk('orders/edit', async (orderId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await orderService.updateOrder(orderId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete order details
export const deleteOrder = createAsyncThunk('orders/delete', async (orderId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await orderService.deleteOrder(orderId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const orderSlice = createSlice({
	name: 'order',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE order
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(addOrder.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(addOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(addOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL orderS
			//state on waiting for response get orders from the server
			.addCase(getAllorders.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getAllorders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAllorders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET SINGLE  order DETAILS
			//state on waiting for response get patient from the server
			.addCase(getOrder.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.order = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR DELETE order
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deleteOrder.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete  order was successful
			.addCase(deleteOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = state.orders.filter((order) => order._id !== action.payload.id);
			})
			//the states when request for deleting patient  is rejected and reason for rejection
			.addCase(deleteOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			//STATES FOR EDIT order
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(updateOrder.pending, (state) => {
				state.isLoading = true;
      })
      // states when the request is successful
			.addCase(updateOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = state.orders.filter((order) => order._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(updateOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
