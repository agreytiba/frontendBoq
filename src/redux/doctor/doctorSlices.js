import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import doctorService from './doctorServices';

const initialState = {
    doctors: [],
    doctor:[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// add new doctor details
export const createDoctor = createAsyncThunk('doctors/create', async (doctorData, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await doctorService.createDoctor(doctorData);
	} catch (error) {
		const message =
			'error'(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get all doctors
export const getDoctors = createAsyncThunk('doctors/getAll', async (_, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await doctorService.getDoctors();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Get single doctor
export const getDoctor = createAsyncThunk('doctors/getOne', async (doctorId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await doctorService.getDoctor(doctorId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
//edit  doctor details
export const editDoctor = createAsyncThunk('doctors/edit', async (doctorId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await doctorService.updateDoctor(doctorId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete doctor details
export const deleteDoctor = createAsyncThunk('doctors/delete', async (doctorId, thunkAPI) => {
	try {
		//   const token = thunkAPI.getState().auth.user.token
		return await doctorService.deleteDoctor(doctorId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const doctorSlice = createSlice({
	name: 'doctor',
	initialState,
  reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
    builder
      
			// STATES FOR CREATE DOCTOR
			// state on waiting for reqeust to be fullfulled or rejected
			.addCase(createDoctor.pending, (state) => {
				state.isLoading = true;
			})
			// state on  success fullfilled of request
			.addCase(createDoctor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.doctors.push(action.payload);
			})
			// state on  when the request rejected
			.addCase(createDoctor.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET ALL DOCTORS
			//state on waiting for response get patient from the server
			.addCase(getDoctors.pending, (state) => {
				state.isLoading = true;
      })
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getDoctors.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.doctors = action.payload;
      })
			//state when the request is rejected and capture the to display to user
			.addCase(getDoctors.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR GET SINGLE  DOCTOR DETAILS
			//state on waiting for response get patient from the server
			.addCase(getDoctor.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request fullfilles and when code [200k] we get data
			.addCase(getDoctor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.doctor = action.payload;
			})
			//state when the request is rejected and capture the to display to user
			.addCase(getDoctor.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			// STATES FOR DELETE DOCTOR
			//  state on waiting of request to be fullifilled or rejected
			.addCase(deleteDoctor.pending, (state) => {
				state.isLoading = true;
			})
			// states when the request for delete patient was successful
			.addCase(deleteDoctor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.doctors = state.doctors.filter((doctor) => doctor._id !== action.payload.id);
			})
			//the states when request for deleting patient  is rejected and reason for rejection
			.addCase(deleteDoctor.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
      })
      
			//STATES FOR EDIT DOCTOR
			//  state on waiting for the request to be fullfilled  or rejected
			.addCase(editDoctor.pending, (state) => {
				state.isLoading = true;
      })
      // states when the request is successful
			.addCase(editDoctor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.doctors = state.doctors.filter((doctor) => doctor._id !== action.payload.id);
      })
      //states when the request is rejected with reason for rejection
			.addCase(editDoctor.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = doctorSlice.actions;
export default doctorSlice.reducer;
