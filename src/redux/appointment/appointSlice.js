import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appointService from './appointService';

const initialState = {
    appointments: [],
    appointment:[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// add new appointment details
export const createAppointment = createAsyncThunk('appointments/create', async (appointData, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await appointService.createAppointment(appointData);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all appointments
export const getAppointments = createAsyncThunk('appointments/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await appointService.getAppointments();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single appointment
export const getAppointment = createAsyncThunk('appointments/getOne', async (appointId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await appointService.getAppointment(appointId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  appointment details
export const editAppointment = createAsyncThunk('appointments/edit', async (appointId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await appointService.updateAppointment(appointId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete appointment details
export const deleteAppointment = createAsyncThunk('appointments/delete', async (appointId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await appointService.deleteAppointment(appointId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const appointmentSlice = createSlice({
	name: 'appoint',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE APPOINTMENT
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(createAppointment.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(createAppointment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.appointments.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(createAppointment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL APPOINTMENTS
			//state on waiting for response get appointments from the server
			.addCase(getAppointments.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getAppointments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.appointments = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getAppointments.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET SINGLE  APPOINTMENT DETAILS
			//state on waiting for response get patient from the server
			.addCase(getAppointment.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getAppointment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.appointment = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getAppointment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR DELETE APPOINTMENT
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deleteAppointment.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete patient was successful
			.addCase(deleteAppointment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.appointments = state.appointments.filter((appointment) => appointment._id !== action.payload.id);
			})
			//the states when request for deleting patient  is rejected and reason for rejection
			.addCase(deleteAppointment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			//STATES FOR EDIT APPOINTMENT
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(editAppointment.pending, (state) => {
				state.isLoading = true;
      })
      // states when the request is successful
			.addCase(editAppointment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.appointments = state.appointments.filter((appointment) => appointment._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(editAppointment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;
